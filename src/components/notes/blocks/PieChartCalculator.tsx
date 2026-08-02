import { useState } from "react";

export function PieChartCalculator({
  valueField,
  totalField,
}: {
  valueField: { label: string; default?: number };
  totalField: { label: string; default?: number };
}) {
  const [valueRaw, setValueRaw] = useState(valueField.default !== undefined ? String(valueField.default) : "");
  const [totalRaw, setTotalRaw] = useState(totalField.default !== undefined ? String(totalField.default) : "");

  const value = parseFloat(valueRaw);
  const total = parseFloat(totalRaw);
  const valid = !isNaN(value) && !isNaN(total) && total !== 0;
  const percent = valid ? (value / total) * 100 : null;
  const angle = valid ? (percent! / 100) * 360 : null;

  return (
    <div className="mt-3 flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{valueField.label}</label>
        <input
          type="number"
          inputMode="decimal"
          value={valueRaw}
          onChange={(e) => setValueRaw(e.target.value)}
          className="w-32 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{totalField.label}</label>
        <input
          type="number"
          inputMode="decimal"
          value={totalRaw}
          onChange={(e) => setTotalRaw(e.target.value)}
          className="w-32 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="rounded-xl border border-primary/35 bg-primary/15 px-4 py-2.5 font-display text-sm font-bold text-foreground" aria-live="polite">
        {percent !== null && angle !== null ? `${percent.toFixed(1)}% → ${angle.toFixed(1)}°` : "— % → — °"}
      </div>
    </div>
  );
}
