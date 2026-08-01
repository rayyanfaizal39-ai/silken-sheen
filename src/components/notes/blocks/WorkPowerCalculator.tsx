import { useState } from "react";

export function WorkPowerCalculator({
  lang,
  defaultForce = 20,
  defaultDisplacement = 5,
  defaultTime = 10,
}: {
  lang: "en" | "bm";
  defaultForce?: number;
  defaultDisplacement?: number;
  defaultTime?: number;
}) {
  const [forceRaw, setForceRaw] = useState(String(defaultForce));
  const [dispRaw, setDispRaw] = useState(String(defaultDisplacement));
  const [timeRaw, setTimeRaw] = useState(String(defaultTime));

  const force = parseFloat(forceRaw);
  const disp = parseFloat(dispRaw);
  const time = parseFloat(timeRaw);
  const valid = !isNaN(force) && !isNaN(disp) && !isNaN(time) && time !== 0;
  const work = valid ? force * disp : null;
  const power = valid ? (force * disp) / time : null;

  return (
    <div className="mt-3 flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{lang === "bm" ? "Daya, F (N)" : "Force, F (N)"}</label>
        <input
          type="number"
          inputMode="decimal"
          value={forceRaw}
          onChange={(e) => setForceRaw(e.target.value)}
          className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{lang === "bm" ? "Sesaran, s (m)" : "Displacement, s (m)"}</label>
        <input
          type="number"
          inputMode="decimal"
          value={dispRaw}
          onChange={(e) => setDispRaw(e.target.value)}
          className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{lang === "bm" ? "Masa, t (s)" : "Time, t (s)"}</label>
        <input
          type="number"
          inputMode="decimal"
          value={timeRaw}
          onChange={(e) => setTimeRaw(e.target.value)}
          className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="rounded-xl border border-primary/35 bg-primary/15 px-4 py-2.5 font-display text-sm font-bold text-foreground" aria-live="polite">
        {work !== null && power !== null ? `W = ${work.toFixed(1)} J, P = ${power.toFixed(2)} W` : "—"}
      </div>
    </div>
  );
}
