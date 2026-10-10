import { MathIndexText } from "./MathIndexText";
import {
  describeMathAlgebraVisual,
  type MathAlgebraVisual as AlgebraData,
} from "@/features/quiz/visuals/mathAlgebraVisual";
import { textFor, type MathVisualLang } from "@/features/quiz/visuals/mathQuestionVisual";

/** Static algebra diagrams: terms are NOT combined or evaluated before answering. */
export function MathAlgebraVisual({
  visual,
  lang,
}: {
  visual: AlgebraData;
  lang: MathVisualLang;
}) {
  const bm = lang === "bm";
  const title = visual.title[lang];
  if (visual.kind === "algebra-jars") {
    const positions = visual.jars === 1 ? [47] : [28, 125, 222];
    const loose = visual.loose;
    return (
      <figure data-math-visual={visual.kind} role="img"
        aria-label={describeMathAlgebraVisual(visual, lang)}
        className="mx-auto w-full max-w-[360px] rounded-2xl border border-violet-400/20 bg-slate-950/40 p-3 sm:p-4">
        <figcaption className="mb-2 text-center text-xs font-semibold text-slate-300">{title}</figcaption>
        <svg viewBox="0 0 320 160" className="block w-full" aria-hidden="true">
          {positions.map((x, index) => (
            <g key={index}>
              <rect x={x + 8} y="42" width="64" height="88" rx="11" fill="#8b5cf6"
                fillOpacity=".22" stroke="#c4b5fd" strokeWidth="2" />
              <rect x={x + 13} y="32" width="54" height="15" rx="5" fill="#a78bfa"
                stroke="#ddd6fe" strokeWidth="1" />
              <text x={x + 40} y="93" fill="#f5f3ff" textAnchor="middle"
                fontSize="29" fontWeight="700">{visual.perJar}</text>
            </g>
          ))}
          {loose && (
            <g>
              <text x="148" y="88" textAnchor="middle" fill="#fcd34d"
                fontSize="26" fontWeight="700">{loose.operation === "add" ? "+" : "−"}</text>
              {Array.from({ length: loose.count }, (_, index) => (
                <circle key={index} cx={190 + (index % 3) * 31}
                  cy={69 + Math.floor(index / 3) * 30} r="10"
                  fill="#fbbf24" fillOpacity=".77" stroke="#fde68a" strokeWidth="1.4" />
              ))}
            </g>
          )}
          <text x="160" y="151" fill="#94a3b8" textAnchor="middle" fontSize="11">
            {bm ? "Setiap balang mengandungi kuantiti tidak diketahui" : "Each jar contains an unknown quantity"}
          </text>
        </svg>
      </figure>
    );
  }

  const palette = ["#a78bfa", "#38bdf8", "#fbbf24", "#4ade80"];
  const symbols = [...new Set(visual.groups.map((group) => group.symbol))];
  const opName = (op: "start" | "add" | "subtract" | "compare") =>
    op === "add" ? "+" : op === "subtract" ? "−" : op === "compare" ? (bm ? "lwn." : "vs.") : "";
  return (
    <figure data-math-visual={visual.kind} role="img"
      aria-label={describeMathAlgebraVisual(visual, lang)}
      className="mx-auto w-full max-w-[380px] rounded-2xl border border-violet-400/20 bg-slate-950/40 p-3 sm:p-4">
      <figcaption className="mb-3 text-center text-xs font-semibold text-slate-300">{title}</figcaption>
      <div className="flex flex-wrap items-center justify-center gap-2" aria-hidden="true">
        {visual.groups.map((group, index) => {
          const colour = palette[symbols.indexOf(group.symbol) % palette.length];
          return (
            <div key={index} className="flex max-w-full items-center gap-2">
              {group.operation !== "start" && (
                <span className="shrink-0 text-lg font-bold text-slate-200">{opName(group.operation)}</span>
              )}
              <div className="rounded-xl border border-white/15 bg-white/[0.03] px-2 py-2">
                {group.label && (
                  <p className="mb-1 text-center text-[11px] text-slate-300">
                    {textFor(group.label, lang)}
                  </p>
                )}
                <div className="flex flex-wrap justify-center gap-1">
                  {Array.from({ length: group.count }, (_, tileIndex) => (
                    <span key={tileIndex} data-algebra-tile={group.symbol}
                      className="inline-flex min-h-8 min-w-8 items-center justify-center rounded-md border px-1.5 py-1 text-sm font-semibold"
                      style={{ backgroundColor: `${colour}20`, borderColor: colour, color: colour }}>
                      <MathIndexText text={group.symbol} lang={lang} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-center text-[11px] text-slate-400">
        {bm ? "Kumpulkan sebutan sendiri untuk mencari jawapan." : "Combine the terms yourself to find the answer."}
      </p>
    </figure>
  );
}
