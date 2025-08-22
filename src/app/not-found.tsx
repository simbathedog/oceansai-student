import Link from "next/link";
export default function NotFound() {
  return (
    <main className="p-6 space-y-3">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p>We couldn&apos;t find that page.</p>
      <Link href="/" className="underline">Go home</Link>
    </main>
  );
}