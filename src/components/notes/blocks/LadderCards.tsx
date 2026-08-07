import type { ReactNode } from "react";
import { chrome, type MathLang } from "./mathNotesChrome";
import { MATH_VIOLET } from "./mathTheme";

/**
 * Violet-gradient card matching FormulaCard's visual language, but hosting
 * an interactive reveal (DivisionLadder/FactorGroupChecker) instead of a
 * static formula. The child component supplies its own intro text (via its
 * `introText` prop) and its own reveal button.
 */
export function LadderCard({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <div
      className="mt-4 rounded-2xl border p-5 sm:p-6"
      style={{
        background: "linear-gradient(135deg, rgba(139,107,255,0.12), rgba(79,176,255,0.08))",
        borderColor: "rgba(139,107,255,0.3)",
      }}
    >
      <div
        className="font-display mb-3 text-[11px] font-bold uppercase tracking-wider"
        style={{ color: MATH_VIOLET }}
      >
        {eyebrow}
      </div>
      {children}
    </div>
  );
}

/**
 * Worked-example card matching StepsCard's outer container, but hosting a
 * DivisionLadder/FactorGroupChecker (which supplies its own reveal button)
 * instead of a calc/why step list.
 */
export function LadderWorkedExample({
  lang,
  question,
  children,
}: {
  lang: MathLang;
  question: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
      <div
        className="font-display mb-1.5 text-[11.5px] font-bold uppercase tracking-wider"
        style={{ color: MATH_VIOLET }}
      >
        {chrome("workedExample", lang)}
      </div>
      <div className="mb-1 text-[14.5px] leading-relaxed text-[#eef1fb]">{question}</div>
      {children}
    </div>
  );
}
