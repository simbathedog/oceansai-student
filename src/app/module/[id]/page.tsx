"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

type Block =
  | { type: "text"; md: string }
  | { type: "example"; md: string }
  | { type: "mcq"; stem: string; choices: string[]; answer: number };

type Lesson = { id: string; title: string; order: number; content: { blocks: Block[] } };
type ModuleTx = { id: string; title: string; lessons: Lesson[] };

export default function ModulePage() {
  const { id } = useParams<{ id: string }>();
  const base = process.env.NEXT_PUBLIC_API_BASE as string;
  const [mod, setMod] = useState<ModuleTx | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(base + "/catalog/modules/" + id + "?view=textbook", { cache: "no-store" });
        const j = await r.json();
        setMod(j.data);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, base]);

  async function submitMcq(lessonId: string, blockIndex: number, choice: number) {
    setResult("Submitting...");
    try {
      const r = await fetch(base + "/me/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, moduleId: id, response: { blockIndex, choice } }),
      });
      const j = await r.json();
      if (j.ok) setResult("✓ " + (j.data?.feedback?.auto ?? "Submitted"));
      else setResult("✗ " + (j.error ?? "Error"));
    } catch {
      setResult("✗ Network error");
    }
  }

  if (loading) return <main className="p-6">Loading…</main>;
  if (!mod)    return <main className="p-6">Not found.</main>;

  return (
    <main className="space-y-6">
      <Link href="/" className="underline text-sm">&larr; Back</Link>
      <h1 className="text-2xl font-semibold">{mod.title}</h1>

      {mod.lessons.map((lesson) => (
        <section key={lesson.id} className="border rounded-xl p-4 space-y-3">
          <h2 className="text-xl font-medium">{lesson.title}</h2>
          {lesson.content.blocks.map((b, idx) => {
            if (b.type === "text" || b.type === "example") {
              return (
                <div key={idx} className={b.type === "example" ? "bg-gray-50 p-3 rounded-lg" : ""}>
                  <ReactMarkdown className="prose">{b.md}</ReactMarkdown>
                </div>
              );
            }
            if (b.type === "mcq") {
              return (
                <div key={idx}>
                  <div className="font-medium">{b.stem}</div>
                  <div className="mt-2 space-y-1">
                    {b.choices.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => submitMcq(lesson.id, idx, i)}
                        className="border rounded-lg px-3 py-2 text-left w-full hover:bg-gray-50"
                      >
                        {String.fromCharCode(65 + i)}. {c}
                      </button>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </section>
      ))}

      {result && <div className="p-3 text-sm bg-gray-100 rounded-lg">{result}</div>}
    </main>
  );
}