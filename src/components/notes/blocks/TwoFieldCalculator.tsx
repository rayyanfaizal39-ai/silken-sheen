import { useState } from "react";

export function TwoFieldCalculator({
  fieldA,
  fieldB,
  operation,
  resultLabel,
  resultUnit,
}: {
  fieldA: { label: string; unit: string; default?: number };
  fieldB: { label: string; unit: string; default?: number };
  operation: "multiply" | "divide";
  resultLabel: string;
  resultUnit: string;
}) {
  const [aRaw, setARaw] = useState(fieldA.default !== undefined ? String(fieldA.default) : "");
  const [bRaw, setBRaw] = useState(fieldB.default !== undefined ? String(fieldB.default) : "");

  const a = parseFloat(aRaw);
  const b = parseFloat(bRaw);
  const valid = !isNaN(a) && !isNaN(b) && (operation === "multiply" || b !== 0);
  const result = valid ? (operation === "multiply" ? a * b : a / b) : null;

  return (
    <div className="mt-3 flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">
          {fieldA.label} ({fieldA.unit})
        </label>
        <input
          type="number"
          inputMode="decimal"
          value={aRaw}
          onChange={(e) => setARaw(e.target.value)}
          className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">
          {fieldB.label} ({fieldB.unit})
        </label>
        <input
          type="number"
          inputMode="decimal"
          value={bRaw}
          onChange={(e) => setBRaw(e.target.value)}
          className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="rounded-xl border border-primary/35 bg-primary/15 px-4 py-2.5 font-display text-sm font-bold text-foreground" aria-live="polite">
        {result !== null ? `${resultLabel} = ${result.toFixed(2)} ${resultUnit}` : `— ${resultUnit}`}
      </div>
    </div>
  );
}
