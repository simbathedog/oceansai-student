"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type LessonRef = { id: string; title: string; order: number };
type ModuleOutline = { module: { id: string; title: string; slug: string }, lessons: LessonRef[] };

export default function Page() {
  const [mods, setMods] = useState<ModuleOutline[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const base = process.env.NEXT_PUBLIC_API_BASE as string;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(base + "/catalog/grades/3/subjects/math/modules", { cache: "no-store" });
        const json = await res.json();
        setMods(json.data || []);
      } catch (e: any) {
        setError("Could not load modules.");
      } finally {
        setLoading(false);
      }
    })();
  }, [base]);

  if (loading) {
    return (
      <main className="space-y-6">
        <h1 className="text-2xl font-semibold">Grade 3 · Mathematics</h1>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-xl p-4 animate-pulse">
              <div className="h-5 w-52 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return <main className="p-6">⚠️ {error}</main>;
  }

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Grade 3 · Mathematics</h1>
      <ul className="space-y-4">
        {mods.map((m) => (
          <li key={m.module.id} className="border rounded-xl p-4 hover:shadow-sm transition">
            <div className="font-medium">{m.module.title}</div>
            <div className="text-sm text-gray-500">Lessons: {m.lessons.length}</div>
            <Link href={"/module/" + m.module.id} className="inline-block mt-2 underline">
              Open textbook
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}