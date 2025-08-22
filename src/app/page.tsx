'use client';

import { useEffect, useState } from 'react';

type LessonRef = { id: string; title: string; order: number };
type ModuleOutline = { module:{ id:string; title:string; slug:string }, lessons: LessonRef[] };

export default function Page() {
  const [mods, setMods] = useState<ModuleOutline[]>([]);
  const base = process.env.NEXT_PUBLIC_API_BASE!;

  useEffect(() => {
    (async () => {
      const res = await fetch(\\/catalog/grades/3/subjects/math/modules\, { cache: 'no-store' });
      const json = await res.json();
      setMods(json.data || []);
    })();
  }, [base]);

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Grade 3 · Mathematics</h1>
      <ul className="space-y-4">
        {mods.map(m => (
          <li key={m.module.id} className="border rounded-xl p-4">
            <div className="font-medium">{m.module.title}</div>
            <div className="text-sm text-gray-500">Lessons: {m.lessons.length}</div>
            <a href={/module/} className="inline-block mt-2 underline">Open textbook</a>
          </li>
        ))}
      </ul>
    </main>
  );
}