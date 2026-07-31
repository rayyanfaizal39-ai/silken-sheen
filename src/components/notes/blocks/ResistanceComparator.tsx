import { useState } from "react";

export function ResistanceComparator({
  lang,
  defaultR1 = 2,
  defaultR2 = 2,
}: {
  lang: "en" | "bm";
  defaultR1?: number;
  defaultR2?: number;
}) {
  const [r1Raw, setR1Raw] = useState(String(defaultR1));
  const [r2Raw, setR2Raw] = useState(String(defaultR2));

  const r1 = parseFloat(r1Raw);
  const r2 = parseFloat(r2Raw);
  const valid = !isNaN(r1) && !isNaN(r2) && r1 > 0 && r2 > 0;
  const seriesValue = valid ? r1 + r2 : null;
  const parallelValue = valid ? 1 / (1 / r1 + 1 / r2) : null;

  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] uppercase tracking-wide text-muted-foreground">R₁ (Ω)</label>
          <input
            type="number"
            inputMode="decimal"
            value={r1Raw}
            onChange={(e) => setR1Raw(e.target.value)}
            className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] uppercase tracking-wide text-muted-foreground">R₂ (Ω)</label>
          <input
            type="number"
            inputMode="decimal"
            value={r2Raw}
            onChange={(e) => setR2Raw(e.target.value)}
            className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-3" aria-live="polite">
        <div className="rounded-xl border border-primary/35 bg-primary/15 px-4 py-2.5 font-display text-sm font-bold text-foreground">
          {lang === "bm" ? "Bersiri" : "Series"}: {seriesValue !== null ? `${seriesValue.toFixed(2)} Ω` : "—"}
        </div>
        <div className="rounded-xl border border-accent/35 bg-accent/15 px-4 py-2.5 font-display text-sm font-bold text-foreground">
          {lang === "bm" ? "Selari" : "Parallel"}: {parallelValue !== null ? `${parallelValue.toFixed(2)} Ω` : "—"}
        </div>
      </div>
    </div>
  );
}
