import { useState } from "react";

const KM_PER_AU = 1.5e8;
const KM_PER_LY = 9.5e12;

export function AuLightYearCalculator({ defaultKm }: { defaultKm?: number }) {
  const [raw, setRaw] = useState(defaultKm !== undefined ? String(defaultKm) : "");

  const km = parseFloat(raw);
  const valid = !isNaN(km) && km > 0;
  const au = valid ? km / KM_PER_AU : null;
  const ly = valid ? km / KM_PER_LY : null;

  return (
    <div className="mt-3 flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">Distance (km)</label>
        <input
          type="number"
          inputMode="decimal"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder="e.g. 227900000"
          className="w-40 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="rounded-xl border border-primary/35 bg-primary/15 px-4 py-2.5 font-display text-sm font-bold text-foreground" aria-live="polite">
        {au !== null && ly !== null ? (
          <>
            {au.toExponential(2)} A.U. · {ly.toExponential(2)} ly
          </>
        ) : (
          "Enter a distance"
        )}
      </div>
    </div>
  );
}
