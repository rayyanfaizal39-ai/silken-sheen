import { useState } from "react";

export function HalfLifeCalculator({
  lang,
  defaultOriginalMass = 80,
  defaultHalfLife = 5.2,
  defaultElapsedTime = 20.8,
}: {
  lang: "en" | "bm";
  defaultOriginalMass?: number;
  defaultHalfLife?: number;
  defaultElapsedTime?: number;
}) {
  const bm = lang === "bm";
  const [massRaw, setMassRaw] = useState(String(defaultOriginalMass));
  const [halfLifeRaw, setHalfLifeRaw] = useState(String(defaultHalfLife));
  const [elapsedRaw, setElapsedRaw] = useState(String(defaultElapsedTime));

  const mass = parseFloat(massRaw);
  const halfLife = parseFloat(halfLifeRaw);
  const elapsed = parseFloat(elapsedRaw);
  const valid = !isNaN(mass) && !isNaN(halfLife) && !isNaN(elapsed) && halfLife !== 0;
  const numHalfLives = valid ? elapsed / halfLife : null;
  const remaining = valid && numHalfLives !== null ? mass * Math.pow(0.5, numHalfLives) : null;

  return (
    <div className="mt-3 flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{bm ? "Jisim asal (g)" : "Original mass (g)"}</label>
        <input
          type="number"
          inputMode="decimal"
          value={massRaw}
          onChange={(e) => setMassRaw(e.target.value)}
          className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{bm ? "Separuh hayat (jam)" : "Half-life (hours)"}</label>
        <input
          type="number"
          inputMode="decimal"
          value={halfLifeRaw}
          onChange={(e) => setHalfLifeRaw(e.target.value)}
          className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{bm ? "Masa berlalu (jam)" : "Elapsed time (hours)"}</label>
        <input
          type="number"
          inputMode="decimal"
          value={elapsedRaw}
          onChange={(e) => setElapsedRaw(e.target.value)}
          className="w-28 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="rounded-xl border border-primary/35 bg-primary/15 px-4 py-2.5 font-display text-sm font-bold text-foreground" aria-live="polite">
        {remaining !== null && numHalfLives !== null
          ? `${remaining.toFixed(3)} g ${bm ? "baki" : "remaining"} (${numHalfLives.toFixed(1)} ${bm ? "separuh hayat" : "half-lives"})`
          : "—"}
      </div>
    </div>
  );
}
