import { useState } from "react";
import type { MathLang } from "./mathNotesChrome";
import { chrome } from "./mathNotesChrome";
import { MATH_GREEN, MATH_ORANGE, MATH_RED, MATH_VIOLET } from "./mathTheme";

export type Difficulty = "easy" | "medium" | "hard";

export interface PracticeQuestion {
  question: string;
  answer: string;
}

const DIFF_ORDER: Difficulty[] = ["easy", "medium", "hard"];
const DIFF_COLOR: Record<Difficulty, string> = {
  easy: MATH_GREEN,
  medium: MATH_ORANGE,
  hard: MATH_RED,
};
const DIFF_LABEL_KEY: Record<Difficulty, "easy" | "medium" | "hard"> = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
};

/**
 * Easy/Medium/Hard practice question tabs. Each question uses the same
 * single "Show Answer" reveal pattern.
 */
export function DifficultyTabs({
  lang,
  questions,
}: {
  lang: MathLang;
  questions: Record<Difficulty, PracticeQuestion>;
}) {
  const [active, setActive] = useState<Difficulty>("easy");
  const [revealed, setRevealed] = useState<Record<Difficulty, boolean>>({
    easy: false,
    medium: false,
    hard: false,
  });
  const q = questions[active];

  return (
    <div className="mt-5">
      <div className="font-display mb-3 flex items-center gap-2 text-[15px] font-bold text-[#eef1fb]">
        ✏️ {chrome("practice", lang)}
      </div>
      <div className="mb-3.5 flex gap-1.5">
        {DIFF_ORDER.map((d) => {
          const isActive = d === active;
          return (
            <button
              key={d}
              type="button"
              onClick={() => setActive(d)}
              className="flex-1 rounded-[10px] border py-2 text-center text-xs font-bold"
              style={
                isActive
                  ? {
                      background: `${DIFF_COLOR[d]}1f`,
                      borderColor: DIFF_COLOR[d],
                      color: DIFF_COLOR[d],
                    }
                  : {
                      background: "rgba(255,255,255,0.02)",
                      borderColor: "rgba(255,255,255,0.08)",
                      color: "#6b7593",
                    }
              }
            >
              {chrome(DIFF_LABEL_KEY[d], lang)}
            </button>
          );
        })}
      </div>
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
        <p className="mb-3 text-[14px] leading-relaxed text-[#eef1fb]">{q.question}</p>
        <button
          type="button"
          onClick={() => setRevealed((r) => ({ ...r, [active]: !r[active] }))}
          className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11.5px] font-semibold"
          style={{ borderColor: "rgba(139,107,255,0.3)", color: MATH_VIOLET }}
        >
          👁️ {revealed[active] ? chrome("hideAnswer", lang) : chrome("showAnswer", lang)}
        </button>
        {revealed[active] && (
          <p className="mt-3 border-t border-white/[0.08] pt-3 text-[13px] leading-relaxed text-slate-400">
            {q.answer}
          </p>
        )}
      </div>
    </div>
  );
}
