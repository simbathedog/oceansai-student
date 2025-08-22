"use client";
import { useEffect, useState } from "react";

export default function ApiStatus() {
  const base = process.env.NEXT_PUBLIC_API_BASE as string;
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    async function ping() {
      try {
        const r = await fetch(base + "/catalog/ping", { cache: "no-store" });
        setOk(r.ok);
      } catch {
        setOk(false);
      }
    }

    ping();
    timer = setInterval(ping, 20000); // poll every 20s
    return () => clearInterval(timer);
  }, [base]);

  const color =
    ok === null ? "bg-gray-300" : ok ? "bg-green-500" : "bg-red-500";
  const label = ok === null ? "…" : ok ? "API OK" : "API Down";

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={"inline-block w-2.5 h-2.5 rounded-full " + color} />
      {label}
    </div>
  );
}