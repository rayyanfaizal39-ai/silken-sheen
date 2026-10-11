import { MathIndexText } from "./MathIndexText";
import {
  describeMathEquationVisual,
  type MathEquationVisual as EquationData,
} from "@/features/quiz/visuals/mathEquationVisual";
import { textFor, type MathVisualLang } from "@/features/quiz/visuals/mathQuestionVisual";

/**
 * Small responsive balance scales and labelled item cards. Static only;
 * no answer steps, motion, external requests or calculated coordinates.
 */
export function MathEquationVisual({ visual, lang }: {
  visual: EquationData;
  lang: MathVisualLang;
}) {
  const name = visual.title[lang];
  const t = (text: Parameters<typeof textFor>[0]) => textFor(text, lang);
  if (visual.kind === "equation-balance") {
    return (
      <figure
        data-math-visual={visual.kind}
        role="img"
        aria-label={describeMathEquationVisual(visual, lang)}
        className="mx-auto w-full max-w-[390px] rounded-2xl border border-violet-400/20 bg-slate-950/40 p-3 sm:p-4"
      >
        <figcaption className="mb-2 text-center text-xs font-semibold text-slate-200">{name}</figcaption>
        <div className="space-y-3" aria-hidden="true">
          {visual.rows.map((row, index) => (
            <div key={index}>
              {row.label && (
                <p className="mb-1 text-center text-xs text-amber-200">{t(row.label)}</p>
              )}
              <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
                <div className="min-w-0 rounded-lg border border-violet-400/30 bg-violet-500/10 px-1.5 py-2 text-center text-sm font-semibold text-white sm:text-base">
                  <MathIndexText text={row.left} lang={lang} />
                </div>
                <span className="text-lg font-bold text-amber-300">=</span>
                <div className="min-w-0 rounded-lg border border-sky-400/30 bg-sky-500/10 px-1.5 py-2 text-center text-sm font-semibold text-white sm:text-base">
                  <MathIndexText text={row.right} lang={lang} />
                </div>
              </div>
              <svg viewBox="0 0 320 45" className="mt-0.5 w-full" aria-hidden="true">
                <line x1="49" x2="271" y1="10" y2="10" stroke="#fbbf24" strokeWidth="2" />
                <line x1="78" x2="78" y1="10" y2="22" stroke="#c4b5fd" strokeWidth="1.5" />
                <line x1="242" x2="242" y1="10" y2="22" stroke="#7dd3fc" strokeWidth="1.5" />
                <line x1="51" x2="105" y1="22" y2="22" stroke="#c4b5fd" strokeWidth="2.5" />
                <line x1="215" x2="269" y1="22" y2="22" stroke="#7dd3fc" strokeWidth="2.5" />
                <path d="M160 10 L148 38 L172 38 Z" fill="#fbbf24" fillOpacity=".25"
                  stroke="#fbbf24" strokeWidth="1.5" />
              </svg>
            </div>
          ))}
        </div>
      </figure>
    );
  }

  const palette = ["#a78bfa", "#38bdf8", "#fbbf24", "#34d399"];
  const allNames = [...new Set(visual.scenes.flatMap((scene) =>
    scene.items.map((item) => t(item.text))))];
  return (
    <figure
      data-math-visual={visual.kind}
      role="img"
      aria-label={describeMathEquationVisual(visual, lang)}
      className="mx-auto w-full max-w-[420px] rounded-2xl border border-white/15 bg-slate-950/40 p-3 sm:p-4"
    >
      <figcaption className="mb-3 text-center text-xs font-semibold text-slate-200">{name}</figcaption>
      <div className="space-y-3" aria-hidden="true">
        {visual.scenes.map((scene, index) => (
          <div key={index} className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
            {scene.label && <p className="mb-2 text-center text-xs font-semibold text-amber-200">
              {t(scene.label)}
            </p>}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {scene.items.map((item, i) => {
                const shade = palette[allNames.indexOf(t(item.text)) % palette.length];
                return (
                  <div key={i} className="flex flex-wrap justify-center gap-1">
                    {Array.from({ length: item.count }, (_, n) => (
                      <div key={n} data-equation-item={t(item.text)}
                        className="flex min-h-11 min-w-11 max-w-[110px] items-center justify-center rounded-lg border px-2 py-1 text-center text-xs font-semibold"
                        style={{ borderColor: shade, color: shade, backgroundColor: `${shade}15` }}>
                        <MathIndexText text={t(item.text)} lang={lang} />
                      </div>
                    ))}
                  </div>
                );
              })}
              {scene.result && (
                <div className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-2.5 py-2 text-center text-sm font-semibold text-amber-200">
                  {t(scene.result)}
                </div>
              )}
            </div>
          </div>
        ))}
        {visual.note && <p className="text-center text-xs text-slate-300">{t(visual.note)}</p>}
      </div>
    </figure>
  );
}
