import { useState } from "react";
import type { ExperimentStep, PredictOption } from "@/content/form1/science/chapter-7/bab7-content";

const AIM_LABEL: Record<"en" | "bm", string> = { en: "Aim", bm: "Tujuan" };

export function PredictReveal({
  aim,
  steps,
  predictQuestion,
  predictOptions,
  predictFeedback,
  lang,
}: {
  aim: string;
  steps: ExperimentStep[];
  predictQuestion: string;
  predictOptions: PredictOption[];
  predictFeedback: string;
  lang: "en" | "bm";
}) {
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <div>
      <p className="mb-5 text-[13.5px] leading-relaxed text-muted-foreground">
        <b className="text-foreground">{AIM_LABEL[lang]}:</b> {aim}
      </p>

      <div className="mb-5 flex flex-wrap gap-3.5">
        {steps.map((s) => (
          <div
            key={s.caption}
            className="min-w-[150px] flex-1 rounded-2xl border border-border bg-secondary/40 p-4 text-center"
          >
            <span className="mb-2 block text-2xl">{s.emoji}</span>
            <div className="text-xs leading-snug text-muted-foreground">{s.caption}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5">
        <div className="mb-3.5 text-sm font-semibold text-foreground">🤔 {predictQuestion}</div>
        <div className="flex flex-wrap gap-2.5">
          {predictOptions.map((opt, i) => {
            const showState = picked !== null;
            const isThisPicked = picked === i;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => setPicked(i)}
                className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                  showState && isThisPicked && opt.correct
                    ? "border-emerald-400 bg-emerald-500/15 text-emerald-300"
                    : showState && isThisPicked && !opt.correct
                      ? "border-red-400 bg-red-500/15 text-red-300"
                      : "border-border bg-secondary/40 text-foreground"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <div className="mt-3.5 text-sm leading-relaxed text-muted-foreground animate-fade-up">
            ✅ {predictFeedback}
          </div>
        )}
      </div>
    </div>
  );
}
