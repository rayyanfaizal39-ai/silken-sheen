import type { ReactNode } from "react";
import type { MathLang } from "./mathNotesChrome";
import { chrome } from "./mathNotesChrome";
import { MATH_BLUE } from "./mathTheme";

/**
 * "The Idea" block that opens every subtopic — thin left accent bar, no heavy
 * colour fill, plain-language explanation before any formula/interactivity.
 */
export function LessonIntro({
  lang,
  tag,
  paragraphs,
  children,
}: {
  lang: MathLang;
  /** Overrides the default "The Idea" label, e.g. for a named method sub-block. */
  tag?: string;
  paragraphs: string[];
  children?: ReactNode;
}) {
  return (
    <div
      className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6"
      style={{ borderLeft: `3px solid ${MATH_BLUE}` }}
    >
      <div
        className="font-display mb-2.5 inline-flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-wider"
        style={{ color: MATH_BLUE }}
      >
        📖 {tag ?? chrome("theIdea", lang)}
      </div>
      <div className="space-y-3">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[14.5px] leading-relaxed text-slate-400">
            {p}
          </p>
        ))}
      </div>
      {children}
    </div>
  );
}
