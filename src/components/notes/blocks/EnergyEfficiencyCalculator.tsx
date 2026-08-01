import { useState } from "react";

export function EnergyEfficiencyCalculator({
  lang,
  defaultUsefulOutput = 8,
  defaultInputSupplied = 100,
}: {
  lang: "en" | "bm";
  defaultUsefulOutput?: number;
  defaultInputSupplied?: number;
}) {
  const [usefulRaw, setUsefulRaw] = useState(String(defaultUsefulOutput));
  const [inputRaw, setInputRaw] = useState(String(defaultInputSupplied));

  const useful = parseFloat(usefulRaw);
  const input = parseFloat(inputRaw);
  const valid = !isNaN(useful) && !isNaN(input) && input !== 0;
  const efficiency = valid ? (useful / input) * 100 : null;

  return (
    <div className="mt-3 flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{lang === "bm" ? "Output berguna (J)" : "Useful output (J)"}</label>
        <input
          type="number"
          inputMode="decimal"
          value={usefulRaw}
          onChange={(e) => setUsefulRaw(e.target.value)}
          className="w-28 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{lang === "bm" ? "Input dibekalkan (J)" : "Input supplied (J)"}</label>
        <input
          type="number"
          inputMode="decimal"
          value={inputRaw}
          onChange={(e) => setInputRaw(e.target.value)}
          className="w-28 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="rounded-xl border border-primary/35 bg-primary/15 px-4 py-2.5 font-display text-sm font-bold text-foreground" aria-live="polite">
        {efficiency !== null ? `${efficiency.toFixed(1)} %` : "— %"}
      </div>
    </div>
  );
}
