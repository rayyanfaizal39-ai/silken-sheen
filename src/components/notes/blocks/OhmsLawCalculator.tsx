import { useState } from "react";

type FieldKey = "v" | "i" | "r";

export function OhmsLawCalculator({ lang }: { lang: "en" | "bm" }) {
  const [values, setValues] = useState<Record<FieldKey, string>>({ v: "", i: "", r: "" });

  function update(key: FieldKey, raw: string) {
    setValues((prev) => ({ ...prev, [key]: raw }));
  }

  const v = parseFloat(values.v);
  const i = parseFloat(values.i);
  const r = parseFloat(values.r);
  const filledCount = [values.v, values.i, values.r].filter((raw) => raw.trim() !== "" && !isNaN(parseFloat(raw))).length;

  let result = lang === "bm" ? "Isikan mana-mana dua nilai" : "Fill in any two values";
  if (filledCount >= 2) {
    if (isNaN(v)) result = `V = ${(i * r).toFixed(2)} V`;
    else if (isNaN(i)) result = `I = ${(v / r).toFixed(3)} A`;
    else if (isNaN(r)) result = `R = ${(v / i).toFixed(2)} Ω`;
    else result = `V = ${(i * r).toFixed(2)} V`;
  }

  return (
    <div className="mt-3 flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{lang === "bm" ? "Voltan (V)" : "Voltage (V)"}</label>
        <input
          type="number"
          inputMode="decimal"
          value={values.v}
          onChange={(e) => update("v", e.target.value)}
          placeholder="—"
          className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{lang === "bm" ? "Arus (A)" : "Current (A)"}</label>
        <input
          type="number"
          inputMode="decimal"
          value={values.i}
          onChange={(e) => update("i", e.target.value)}
          placeholder="—"
          className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{lang === "bm" ? "Rintangan (Ω)" : "Resistance (Ω)"}</label>
        <input
          type="number"
          inputMode="decimal"
          value={values.r}
          onChange={(e) => update("r", e.target.value)}
          placeholder="—"
          className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="rounded-xl border border-primary/35 bg-primary/15 px-4 py-2.5 font-display text-sm font-bold text-foreground" aria-live="polite">
        {result}
      </div>
    </div>
  );
}
