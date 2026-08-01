import { useState } from "react";

export function TransformerCalculator({
  lang,
  defaultVp = 240,
  defaultNp = 120,
  defaultNs = 20,
}: {
  lang: "en" | "bm";
  defaultVp?: number;
  defaultNp?: number;
  defaultNs?: number;
}) {
  const [vpRaw, setVpRaw] = useState(String(defaultVp));
  const [npRaw, setNpRaw] = useState(String(defaultNp));
  const [nsRaw, setNsRaw] = useState(String(defaultNs));

  const vp = parseFloat(vpRaw);
  const np = parseFloat(npRaw);
  const ns = parseFloat(nsRaw);
  const valid = !isNaN(vp) && !isNaN(np) && !isNaN(ns) && np !== 0;
  const vs = valid ? (vp * ns) / np : null;

  return (
    <div className="mt-3 flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{lang === "bm" ? "Voltan primer, Vp (V)" : "Primary voltage, Vp (V)"}</label>
        <input
          type="number"
          inputMode="decimal"
          value={vpRaw}
          onChange={(e) => setVpRaw(e.target.value)}
          className="w-28 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{lang === "bm" ? "Lilitan primer, Np" : "Primary turns, Np"}</label>
        <input
          type="number"
          inputMode="decimal"
          value={npRaw}
          onChange={(e) => setNpRaw(e.target.value)}
          className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{lang === "bm" ? "Lilitan sekunder, Ns" : "Secondary turns, Ns"}</label>
        <input
          type="number"
          inputMode="decimal"
          value={nsRaw}
          onChange={(e) => setNsRaw(e.target.value)}
          className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="rounded-xl border border-primary/35 bg-primary/15 px-4 py-2.5 font-display text-sm font-bold text-foreground" aria-live="polite">
        {vs !== null ? `Vs = ${vs.toFixed(2)} V` : "Vs = —"}
      </div>
    </div>
  );
}
