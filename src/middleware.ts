import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Skip for Production
  if (process.env.VERCEL_ENV === 'production') return NextResponse.next();

  const creds = process.env.PREVIEW_BASIC_AUTH; // "user:pass"
  if (!creds) return NextResponse.next();

  const header = req.headers.get('authorization') || '';
  const expected = 'Basic ' + Buffer.from(creds).toString('base64');
  if (header !== expected) {
    return new NextResponse('Authentication required.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm=\"Preview\"' },
    });
  }
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next|favicon.ico|robots.txt).*)'] };