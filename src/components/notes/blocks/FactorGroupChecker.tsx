import { useState } from "react";
import type { MathLang } from "./mathNotesChrome";
import { chrome } from "./mathNotesChrome";
import { MATH_GREEN, MATH_RED, MATH_VIOLET } from "./mathTheme";

function factorize(n: number): number[] {
  let cur = n;
  let p = 2;
  const factors: number[] = [];
  while (cur > 1) {
    if (cur % p === 0) {
      factors.push(p);
      cur /= p;
    } else {
      p++;
    }
  }
  return factors;
}

/**
 * Extends the division ladder for Chapter 3: after prime-factorising,
 * visually groups the resulting factors into pairs (size=2, perfect square
 * check) or triples (size=3, perfect cube check). Matched groups render in
 * green-dashed brackets; unpaired leftover factors render in red. Reveals
 * the root value if perfect, or a clear "not a perfect square/cube" state.
 * Everything is computed dynamically from `n`.
 */
export function FactorGroupChecker({
  lang,
  n,
  size,
  symbol,
  reveal,
  introText,
}: {
  lang: MathLang;
  n: number;
  size: 2 | 3;
  symbol: string;
  reveal: "method" | "answer";
  introText?: string;
}) {
  const [revealed, setRevealed] = useState(false);

  const factors = factorize(n);
  let cur = n;
  const rows = factors.map((f) => {
    const row = { divisor: f, value: cur };
    cur = cur / f;
    return row;
  });

  const counts = new Map<number, number>();
  for (const f of factors) counts.set(f, (counts.get(f) ?? 0) + 1);

  let isPerfect = true;
  let rootValue = 1;
  const groupChips: { key: string; primes: number[] }[] = [];
  const leftoverChips: { key: string; prime: number }[] = [];
  [...counts.keys()]
    .sort((a, b) => a - b)
    .forEach((k) => {
      const c = counts.get(k) ?? 0;
      const groups = Math.floor(c / size);
      const leftover = c % size;
      if (leftover > 0) isPerfect = false;
      rootValue *= Math.pow(k, groups);
      for (let g = 0; g < groups; g++) {
        groupChips.push({ key: `${k}-g${g}`, primes: Array(size).fill(k) });
      }
      for (let l = 0; l < leftover; l++) {
        leftoverChips.push({ key: `${k}-l${l}`, prime: k });
      }
    });

  const kind = size === 2 ? { en: "square", bm: "dua" } : { en: "cube", bm: "tiga" };
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
          <table className="w-full border-collapse font-mono text-sm">
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-white/[0.06]">
                  <td
                    className="w-10 py-1.5 pr-2 text-right font-bold"
                    style={{ color: MATH_VIOLET }}
                  >
                    {r.divisor}
                  </td>
                  <td className="px-3 py-1.5 text-center text-[#eef1fb]">{r.value}</td>
                </tr>
              ))}
              <tr>
                <td className="w-10" />
                <td className="px-3 pt-1.5 text-center font-bold" style={{ color: MATH_GREEN }}>
                  {cur}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
            {groupChips.map((g) => (
              <span
                key={g.key}
                className="flex items-center gap-1 rounded-lg border border-dashed px-2 py-1.5"
                style={{ borderColor: "rgba(74,222,128,0.5)" }}
              >
                {g.primes.map((p, pi) => (
                  <span
                    key={pi}
                    className="font-mono flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold"
                    style={{ background: "rgba(74,222,128,0.15)", color: MATH_GREEN }}
                  >
                    {p}
                  </span>
                ))}
              </span>
            ))}
            {leftoverChips.map((l) => (
              <span
                key={l.key}
                className="font-mono flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold"
                style={{ background: "rgba(248,113,113,0.15)", color: MATH_RED }}
              >
                {l.prime}
              </span>
            ))}
          </div>
          <p className="mt-3 text-center text-[11.5px] text-slate-400">
            {isPerfect
              ? lang === "en"
                ? `Every factor pairs up — ${n} IS a perfect ${kind.en}`
                : `Setiap faktor berpasangan — ${n} ADALAH kuasa ${kind.bm} sempurna`
              : lang === "en"
                ? `An unpaired factor (red) remains — ${n} is NOT a perfect ${kind.en}`
                : `Faktor tidak berpasangan (merah) berbaki — ${n} BUKAN kuasa ${kind.bm} sempurna`}
          </p>

          {isPerfect ? (
            <div
              className="font-display mt-3 inline-block rounded-lg px-3 py-1.5 text-[13px] font-bold"
              style={{ background: "rgba(74,222,128,0.1)", color: MATH_GREEN }}
            >
              {symbol}
              {n} = {rootValue}
            </div>
          ) : (
            <div
              className="font-display mt-3 inline-block rounded-lg px-3 py-1.5 text-[13px] font-bold"
              style={{ background: "rgba(248,113,113,0.1)", color: MATH_RED }}
            >
              {n} {size === 2 ? chrome("notPerfectSquare", lang) : chrome("notPerfectCube", lang)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
