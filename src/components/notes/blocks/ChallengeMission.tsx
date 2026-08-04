import { useState, type ReactNode } from "react";
import type { MathLang } from "./mathNotesChrome";
import { chrome } from "./mathNotesChrome";
import { MATH_AMBER } from "./mathTheme";

/**
 * Chapter-end KBAT-style challenge question, single "Show Answer" reveal.
 * Optional `diagram` renders between the question and the reveal button
 * (see StepsCard for the same pattern).
 */
export function ChallengeMission({
  lang,
  question,
  diagram,
  answer,
}: {
  lang: MathLang;
  question: string;
  diagram?: ReactNode;
  answer: string;
}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div
      className="mt-4 rounded-2xl border p-5 sm:p-6"
      style={{ background: "rgba(255,185,55,0.06)", borderColor: "rgba(255,185,55,0.3)" }}
    >
      <div
        className="font-display mb-2.5 inline-flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-wider"
        style={{ color: MATH_AMBER }}
      >
        🏆 KBAT
      </div>
      <p className="text-[14px] leading-relaxed text-slate-400">{question}</p>
      {diagram}
      <button
        type="button"
        onClick={() => setRevealed((r) => !r)}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold"
        style={{ borderColor: "rgba(255,185,55,0.4)", color: MATH_AMBER }}
      >
        👁️ {revealed ? chrome("hideAnswer", lang) : chrome("showAnswer", lang)}
      </button>
      {revealed && (
        <p className="mt-3 border-t border-white/[0.08] pt-3 text-[13px] leading-relaxed text-slate-400">
          {answer}
        </p>
      )}
    </div>
  );
}
