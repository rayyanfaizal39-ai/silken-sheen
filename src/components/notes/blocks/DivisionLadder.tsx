import { useState } from "react";
import type { MathLang } from "./mathNotesChrome";
import { chrome } from "./mathNotesChrome";
import { MATH_GREEN, MATH_VIOLET } from "./mathTheme";

export type LadderMode = "factorise" | "hcf" | "lcm";

function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}

interface LadderRow {
  divisor: number;
  values: number[];
}

/** Single-number trial-division prime factorisation, e.g. 60 -> 2,2,3,5. */
function factoriseRows(n: number): { rows: LadderRow[]; remainder: number[] } {
  const rows: LadderRow[] = [];
  let cur = n;
  let p = 2;
  while (cur > 1) {
    if (cur % p === 0) {
      rows.push({ divisor: p, values: [cur] });
      cur = cur / p;
    } else {
      p++;
    }
  }
  return { rows, remainder: [cur] };
}

/** Common-division ladder for HCF: only divide by a prime that divides ALL numbers. */
export function hcfLadderRows(numbers: number[]): {
  rows: LadderRow[];
  remainder: number[];
  hcf: number;
} {
  let current = numbers.slice();
  const rows: LadderRow[] = [];
  for (;;) {
    let divisor: number | null = null;
    for (let d = 2; d <= Math.min(...current); d++) {
      if (current.every((v) => v % d === 0) && isPrime(d)) {
        divisor = d;
        break;
      }
    }
    if (divisor === null) break;
    rows.push({ divisor, values: current.slice() });
    current = current.map((v) => v / (divisor as number));
  }
  const hcf = rows.reduce((a, r) => a * r.divisor, 1);
  return { rows, remainder: current, hcf };
}

/** Common-division ladder for LCM: divide by a prime dividing AT LEAST ONE number. */
export function lcmLadderRows(numbers: number[]): {
  rows: LadderRow[];
  remainder: number[];
  lcm: number;
} {
  let current = numbers.slice();
  const rows: LadderRow[] = [];
  let p = 2;
  while (!current.every((v) => v === 1)) {
    while (!current.some((v) => v > 1 && v % p === 0)) p++;
    rows.push({ divisor: p, values: current.slice() });
    current = current.map((v) => (v > 1 && v % p === 0 ? v / p : v));
  }
  const lcm = rows.reduce((a, r) => a * r.divisor, 1);
  return { rows, remainder: current, lcm };
}

function LadderTable({ rows, remainder }: { rows: LadderRow[]; remainder: number[] }) {
  return (
    <table className="w-full border-collapse font-mono text-sm">
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-white/[0.06]">
            <td className="w-10 py-1.5 pr-2 text-right font-bold" style={{ color: MATH_VIOLET }}>
              {r.divisor}
            </td>
            {r.values.map((v, vi) => (
              <td key={vi} className="px-3 py-1.5 text-center text-[#eef1fb]">
                {v}
              </td>
            ))}
          </tr>
        ))}
        <tr>
          <td className="w-10" />
          {remainder.map((v, vi) => (
            <td
              key={vi}
              className="px-3 pt-1.5 text-center font-bold"
              style={{ color: MATH_GREEN }}
            >
              {v}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

/**
 * Repeated-division method table. Three variants, all computed dynamically:
 * "factorise" (single-number prime factorisation), "hcf" (common-division
 * ladder using only primes shared by every number) and "lcm" (common-division
 * ladder using any prime dividing at least one number).
 */
export function DivisionLadder({
  lang,
  mode,
  numbers,
  reveal,
  introText,
}: {
  lang: MathLang;
  mode: LadderMode;
  numbers: number[];
  reveal: "method" | "answer";
  introText?: string;
}) {
  const [revealed, setRevealed] = useState(false);

  let rows: LadderRow[];
  let remainder: number[];
  let resultLabel: string;
  if (mode === "factorise") {
    const r = factoriseRows(numbers[0]);
    rows = r.rows;
    remainder = r.remainder;
    resultLabel = `${numbers[0]} = ${rows.map((row) => row.divisor).join(" × ")}`;
  } else if (mode === "hcf") {
    const r = hcfLadderRows(numbers);
    rows = r.rows;
    remainder = r.remainder;
    resultLabel = `HCF = ${rows.map((row) => row.divisor).join(" × ")} = ${r.hcf}`;
  } else {
    const r = lcmLadderRows(numbers);
    rows = r.rows;
    remainder = r.remainder;
    resultLabel = `LCM = ${rows.map((row) => row.divisor).join(" × ")} = ${r.lcm}`;
  }

  const btnLabel = revealed
    ? chrome("hideMethod", lang)
    : reveal === "answer"
      ? chrome("showAnswerAndMethod", lang)
      : chrome("showMethod", lang);

  return (
    <div className="mt-4">
      {introText && <p className="mb-3 text-[13px] leading-relaxed text-slate-400">{introText}</p>}
      <button
        type="button"
        onClick={() => setRevealed((r) => !r)}
        className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold"
        style={{ background: "rgba(139,107,255,0.12)", color: MATH_VIOLET }}
      >
        👁️ {btnLabel}
      </button>
      {revealed && (
        <div className="mt-3.5 rounded-2xl border border-white/[0.08] bg-[#0c1128] p-4 sm:p-5">
          <LadderTable rows={rows} remainder={remainder} />
          <div
            className="font-display mt-3 inline-block rounded-lg px-3 py-1.5 text-[13px] font-bold"
            style={{ background: "rgba(74,222,128,0.1)", color: MATH_GREEN }}
          >
            {resultLabel}
          </div>
        </div>
      )}
    </div>
  );
}
