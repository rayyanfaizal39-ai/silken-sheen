import { useState } from "react";

export function ElectricityCostCalculator({
  lang,
  defaultPowerKw = 2,
  defaultTimeH = 0.167,
  defaultRateSen = 21,
}: {
  lang: "en" | "bm";
  defaultPowerKw?: number;
  defaultTimeH?: number;
  defaultRateSen?: number;
}) {
  const [powerRaw, setPowerRaw] = useState(String(defaultPowerKw));
  const [timeRaw, setTimeRaw] = useState(String(defaultTimeH));
  const [rateRaw, setRateRaw] = useState(String(defaultRateSen));

  const power = parseFloat(powerRaw);
  const time = parseFloat(timeRaw);
  const rate = parseFloat(rateRaw);
  const valid = !isNaN(power) && !isNaN(time) && !isNaN(rate);
  const kwh = valid ? power * time : null;
  const cost = valid ? (power * time * rate) : null;

  return (
    <div className="mt-3 flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{lang === "bm" ? "Kuasa (kW)" : "Power (kW)"}</label>
        <input
          type="number"
          inputMode="decimal"
          value={powerRaw}
          onChange={(e) => setPowerRaw(e.target.value)}
          className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{lang === "bm" ? "Masa (jam)" : "Time (hours)"}</label>
        <input
          type="number"
          inputMode="decimal"
          step="0.01"
          value={timeRaw}
          onChange={(e) => setTimeRaw(e.target.value)}
          className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{lang === "bm" ? "Kadar (sen/unit)" : "Rate (sen/unit)"}</label>
        <input
          type="number"
          inputMode="decimal"
          value={rateRaw}
          onChange={(e) => setRateRaw(e.target.value)}
          className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="rounded-xl border border-primary/35 bg-primary/15 px-4 py-2.5 font-display text-sm font-bold text-foreground" aria-live="polite">
        {kwh !== null && cost !== null
          ? `${kwh.toFixed(3)} ${lang === "bm" ? "kWj" : "kWh"} → ${cost.toFixed(1)} sen`
          : "— sen"}
      </div>
    </div>
  );
}
