import { useState } from "react";

type FieldKey = "v" | "i" | "r";

type Lang = "en" | "bm";

const COPY = {
  en: {
    prompt: "Fill in any two values",
    zeroCurrent: "Current must be greater than 0 A to calculate resistance.",
    zeroResistance: "Resistance must be greater than 0 Ω to calculate current.",
    outOfRange: "Those values are too large to calculate here.",
  },
  bm: {
    prompt: "Isikan mana-mana dua nilai",
    zeroCurrent: "Arus mesti lebih besar daripada 0 A untuk mengira rintangan.",
    zeroResistance: "Rintangan mesti lebih besar daripada 0 Ω untuk mengira arus.",
    outOfRange: "Nilai itu terlalu besar untuk dikira di sini.",
  },
} as const;

/**
 * Which quantity gets solved is decided by which box the learner left empty,
 * so only the two division branches can meet a zero denominator. Those are
 * guarded individually: V = I x R stays valid at I = 0 or R = 0, and banning
 * zero outright there would reject a correct calculation.
 *
 * Exported pure so the guard can be tested without rendering.
 */
export function ohmsLawResult(values: Record<FieldKey, string>, lang: Lang): string {
  const copy = COPY[lang];

  // A number input accepts things like 1e400, which parse to Infinity. Treat
  // anything non-finite as not entered rather than carrying it into a formula.
  const num = (raw: string) => {
    const n = parseFloat(raw);
    return Number.isFinite(n) ? n : NaN;
  };
  const show = (n: number, digits: number, unit: string) =>
    Number.isFinite(n) ? `${n.toFixed(digits)} ${unit}` : null;

  const v = num(values.v);
  const i = num(values.i);
  const r = num(values.r);
  const filledCount = [values.v, values.i, values.r].filter(
    (raw) => raw.trim() !== "" && !isNaN(num(raw)),
  ).length;

  if (filledCount < 2) return copy.prompt;

  // V = I x R -- no denominator, so zero inputs are legitimate here.
  if (isNaN(v)) {
    const out = show(i * r, 2, "V");
    return out ? `V = ${out}` : copy.outOfRange;
  }

  // I = V / R
  if (isNaN(i)) {
    if (!(r > 0)) return copy.zeroResistance;
    const out = show(v / r, 3, "A");
    return out ? `I = ${out}` : copy.outOfRange;
  }

  // R = V / I
  if (isNaN(r)) {
    if (!(i > 0)) return copy.zeroCurrent;
    const out = show(v / i, 2, "Ω");
    return out ? `R = ${out}` : copy.outOfRange;
  }

  const product = show(i * r, 2, "V");
  return product ? `V = ${product}` : copy.outOfRange;
}

export function OhmsLawCalculator({ lang }: { lang: Lang }) {
  const [values, setValues] = useState<Record<FieldKey, string>>({ v: "", i: "", r: "" });

  function update(key: FieldKey, raw: string) {
    setValues((prev) => ({ ...prev, [key]: raw }));
  }

  const result = ohmsLawResult(values, lang);

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
