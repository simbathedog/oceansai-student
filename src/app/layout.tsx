import "./globals.css";
import Link from "next/link";
import ApiStatus from "../components/ApiStatus";
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: "OceansAI Student",
  description: "Grade 3 Mathematics – OceansAI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-white text-gray-900">
        <header className="border-b">
          <div className="max-w-3xl mx-auto p-4 flex items-center justify-between">
            <Link href="/" className="font-semibold">OceansAI</Link>
            <div className="flex items-center gap-4">
              <ApiStatus />
              <a
                href="https://github.com/simbathedog/oceansai-student"
                target="_blank" rel="noreferrer"
                className="text-sm underline"
              >
                GitHub
              </a>
            </div>
          </div>
        </header>
        <main className="max-w-3xl mx-auto p-6">{children}</main>
<Analytics />
</body>
    </html>
  );
}