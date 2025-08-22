/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy',
            value:
              "default-src 'self'; img-src 'self' data: https:; font-src 'self' data:; " +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' vercel.live; " +
              "style-src 'self' 'unsafe-inline'; " +
              "connect-src 'self'  https://vitals.vercel-insights.com https://analytics.vercel-insights.com; " +
              "frame-ancestors 'none'; base-uri 'self'; form-action 'self'" },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};
export default nextConfig;