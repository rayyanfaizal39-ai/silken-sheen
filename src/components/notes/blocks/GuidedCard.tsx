import { useState, type ReactNode } from "react";
import type { MathLang } from "./mathNotesChrome";
import { chrome } from "./mathNotesChrome";
import { MATH_BLUE, MATH_ORANGE } from "./mathTheme";

/**
 * "Try It Yourself" dashed-border card — question plus a single "Show
 * Answer" reveal button. Optional `diagram` renders between the question and
 * the reveal button (see StepsCard for the same pattern).
 */
export function GuidedCard({
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
      className="mt-4 rounded-2xl border border-dashed p-4 sm:p-5"
      style={{ borderColor: "rgba(79,176,255,0.35)" }}
    >
      <div
        className="font-display mb-2 inline-flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-wider"
        style={{ color: MATH_BLUE }}
      >
        🤝 {chrome("tryItYourself", lang)}
      </div>
      <p className="text-[14px] leading-relaxed text-slate-400">{question}</p>
      {diagram}
      <button
        type="button"
        onClick={() => setRevealed((r) => !r)}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full border bg-transparent px-3.5 py-1.5 text-xs font-semibold"
        style={{ borderColor: "rgba(255,159,67,0.4)", color: MATH_ORANGE }}
      >
        👁️ {revealed ? chrome("hideAnswer", lang) : chrome("showAnswer", lang)}
      </button>
      {revealed && (
        <p className="mt-3 border-t border-white/[0.08] pt-3 text-[13px] leading-relaxed text-[#ffd4a8]">
          {answer}
        </p>
      )}
    </div>
  );
}
