import { useState } from "react";
import type { MathLang } from "./mathNotesChrome";
import { chrome } from "./mathNotesChrome";
import { MATH_VIOLET } from "./mathTheme";

export interface WorkedStep {
  calc: string;
  why?: string;
}

/**
 * Step-by-step worked example. A single "Show Answer" button reveals every
 * step at once — no per-step tapping, no separate hint/solution buttons.
 */
export function StepsCard({
  lang,
  question,
  steps,
}: {
  lang: MathLang;
  question: string;
  steps: WorkedStep[];
}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
      <div
        className="font-display mb-1.5 text-[11.5px] font-bold uppercase tracking-wider"
        style={{ color: MATH_VIOLET }}
      >
        {chrome("workedExample", lang)}
      </div>
      <div className="mb-4 text-[14.5px] leading-relaxed text-[#eef1fb]">{question}</div>
      <button
        type="button"
        onClick={() => setRevealed((r) => !r)}
        className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold"
        style={{ borderColor: "rgba(139,107,255,0.4)", color: MATH_VIOLET }}
      >
        👁️ {revealed ? chrome("hideAnswer", lang) : chrome("showAnswer", lang)}
      </button>
      {revealed && (
        <div className="mt-4 flex flex-col">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex gap-3.5 py-3 ${i > 0 ? "border-t border-white/[0.06]" : ""}`}
            >
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[12.5px] font-bold"
                style={{
                  background: "rgba(139,107,255,0.15)",
                  borderColor: "rgba(139,107,255,0.4)",
                  color: MATH_VIOLET,
                }}
              >
                {i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display text-[15.5px] leading-relaxed text-[#eef1fb]">
                  {s.calc}
                </div>
                {s.why && (
                  <div className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{s.why}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
