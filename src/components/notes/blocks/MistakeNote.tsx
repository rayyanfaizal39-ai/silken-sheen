import type { MathLang } from "./mathNotesChrome";
import { chrome } from "./mathNotesChrome";
import { MATH_GREEN, MATH_RED } from "./mathTheme";

/**
 * Compact two-line common-mistake note — one ❌ (wrong) line, one ✅ (right)
 * line. Not a heavy two-column grid.
 */
export function MistakeNote({
  lang,
  wrong,
  right,
}: {
  lang: MathLang;
  wrong: string;
  right: string;
}) {
  return (
    <div
      className="mt-4 rounded-xl border p-4 sm:p-5"
      style={{ background: "rgba(248,113,113,0.06)", borderColor: "rgba(248,113,113,0.25)" }}
    >
      <div
        className="font-display mb-2.5 inline-flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-wider"
        style={{ color: MATH_RED }}
      >
        ⚠️ {chrome("watchOut", lang)}
      </div>
      <p className="text-[13.5px] leading-relaxed">
        <b className="mr-1.5 font-bold" style={{ color: MATH_RED }}>
          ❌
        </b>
        <span className="text-slate-400">{wrong}</span>
      </p>
      <p className="mt-1.5 text-[13.5px] leading-relaxed">
        <b className="mr-1.5 font-bold" style={{ color: MATH_GREEN }}>
          ✅
        </b>
        <span className="text-slate-400">{right}</span>
      </p>
    </div>
  );
}
