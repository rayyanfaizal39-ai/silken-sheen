import { useState } from "react";

type Lang = "en" | "bm";

const COPY = {
  en: {
    zeroDenominator: (label: string, unit: string) => `${label} must be greater than 0 ${unit}.`,
    outOfRange: "Those values are too large to calculate here.",
  },
  bm: {
    zeroDenominator: (label: string, unit: string) => `${label} mesti lebih besar daripada 0 ${unit}.`,
    outOfRange: "Nilai itu terlalu besar untuk dikira di sini.",
  },
} as const;

/**
 * Shared two-input formula calculator.
 *
 * Only the divide mode has a denominator, so only divide guards field B against
 * zero -- banning zero outright would reject a legitimate multiplication such as
 * a moment with zero force. Non-finite values are screened on the way in and the
 * result is checked again on the way out, because a number input accepts things
 * like 1e400 and because two finite operands can still overflow when multiplied.
 *
 * Exported pure so the guards can be tested without rendering.
 */
export function twoFieldResult(
  aRaw: string,
  bRaw: string,
  operation: "multiply" | "divide",
  fieldB: { label: string; unit: string },
  resultLabel: string,
  resultUnit: string,
  lang: Lang,
): string {
  const copy = COPY[lang];
  const num = (raw: string) => {
    const n = parseFloat(raw);
    return Number.isFinite(n) ? n : NaN;
  };

  const a = num(aRaw);
  const b = num(bRaw);
  // Neutral placeholder, unchanged from before: no language leaks into other subjects.
  if (isNaN(a) || isNaN(b)) return `— ${resultUnit}`;

  // A zero (or negative) denominator has no meaningful result for these formulas.
  if (operation === "divide" && !(b > 0)) return copy.zeroDenominator(fieldB.label, fieldB.unit);

  const value = operation === "multiply" ? a * b : a / b;
  if (!Number.isFinite(value)) return copy.outOfRange;

  return `${resultLabel} = ${value.toFixed(2)} ${resultUnit}`;
}

export function TwoFieldCalculator({
  fieldA,
  fieldB,
  operation,
  resultLabel,
  resultUnit,
  lang = "en",
}: {
  fieldA: { label: string; unit: string; default?: number };
  fieldB: { label: string; unit: string; default?: number };
  operation: "multiply" | "divide";
  resultLabel: string;
  resultUnit: string;
  lang?: Lang;
}) {
  const [aRaw, setARaw] = useState(fieldA.default !== undefined ? String(fieldA.default) : "");
  const [bRaw, setBRaw] = useState(fieldB.default !== undefined ? String(fieldB.default) : "");

  const result = twoFieldResult(aRaw, bRaw, operation, fieldB, resultLabel, resultUnit, lang);

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
      <div
        className="rounded-xl border border-primary/35 bg-primary/15 px-4 py-2.5 font-display text-sm font-bold text-foreground"
        aria-live="polite"
      >
        {result}
      </div>
    </div>
  );
}
