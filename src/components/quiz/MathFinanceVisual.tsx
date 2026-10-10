import { MathIndexText } from "./MathIndexText";
import {
  describeMathFinanceVisual,
  type MathFinanceVisual as FinanceData,
} from "@/features/quiz/visuals/mathFinanceVisual";
import type { MathVisualLang } from "@/features/quiz/visuals/mathQuestionVisual";

/** Responsive given-data diagrams; neither dimensions nor colour encode an answer. */
export function MathFinanceVisual({
  visual,
  lang,
}: {
  visual: FinanceData;
  lang: MathVisualLang;
}) {
  const timeline = visual.layout === "timeline";
  const comparison = visual.layout === "comparison";
  return (
    <figure
      data-math-visual={visual.kind}
      data-finance-layout={visual.layout}
      role="img"
      aria-label={describeMathFinanceVisual(visual, lang)}
      className="mx-auto w-full max-w-[360px]"
    >
      <figcaption className="pb-3 text-center text-xs font-semibold text-slate-400">
        {visual.title[lang]}
      </figcaption>
      <div
        aria-hidden="true"
        className="rounded-2xl border border-violet-300/20 bg-violet-400/5 p-3"
      >
        {timeline ? (
          <ol className="relative ml-2 border-l-2 border-violet-400/40 pl-5">
            {visual.entries.map((entry, i) => (
              <li key={i} className="relative pb-4 last:pb-0">
                <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-violet-300 bg-[#0B1220]" />
                <p className="text-xs text-slate-400">{entry.label[lang]}</p>
                <p className="mt-1 break-words text-sm font-semibold text-white">
                  <MathIndexText text={entry.value[lang]} lang={lang} />
                </p>
              </li>
            ))}
          </ol>
        ) : comparison ? (
          <div className="grid grid-cols-2 gap-2">
            {visual.entries.map((entry, i) => (
              <div
                key={i}
                className="min-w-0 rounded-xl border border-white/10 bg-white/[0.04] p-3"
              >
                <p className="mb-2 break-words text-xs font-semibold text-violet-200">
                  {entry.label[lang]}
                </p>
                <p className="whitespace-pre-line break-words text-sm leading-6 text-white">
                  <MathIndexText text={entry.value[lang]} lang={lang} />
                </p>
              </div>
            ))}
          </div>
        ) : (
          <dl className="space-y-2">
            {visual.entries.map((entry, i) => (
              <div
                key={i}
                className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-white/10 pb-2"
              >
                <dt className="min-w-0 break-words text-xs text-slate-400">
                  {entry.label[lang]}
                </dt>
                <dd className="min-w-0 break-words text-sm font-semibold text-white">
                  <MathIndexText text={entry.value[lang]} lang={lang} />
                </dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-amber-300/20 bg-amber-400/10 p-3">
          <span className="break-words text-xs font-semibold text-amber-100">
            {visual.target[lang]}
          </span>
          <span className="text-2xl font-bold text-amber-300">?</span>
        </div>
      </div>
    </figure>
  );
}
