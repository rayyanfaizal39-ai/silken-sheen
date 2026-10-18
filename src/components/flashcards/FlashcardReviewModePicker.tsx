import { ArrowLeft } from "lucide-react";
import {
  REVIEW_MODE_COPY,
  type FlashcardReviewMode,
} from "@/features/flashcards/structuredFlashcard";

export type ReviewModeOption = {
  mode: FlashcardReviewMode;
  total: number;
  /** Cards whose saved mastery says the learner knew them last time. */
  known: number;
};

/**
 * Second step inside a subtopic: Concept, Practice or Challenge Review. Uses
 * the same glass panel and card language as the flashcard set picker.
 */
export function FlashcardReviewModePicker({
  chapterTitle,
  subtopicTitle,
  lang,
  options,
  onBack,
  onSelect,
}: {
  chapterTitle: string;
  subtopicTitle: string;
  lang: "bm" | "dlp";
  options: ReviewModeOption[];
  onBack: () => void;
  onSelect: (mode: FlashcardReviewMode) => void;
}) {
  const bm = lang === "bm";
  return (
    <div className="animate-fade-up">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm transition-all hover:-translate-x-0.5 hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {bm ? "Kembali" : "Back"}
        </button>
        <span className="text-sm font-semibold text-muted-foreground">{chapterTitle}</span>
      </div>

      <div className="glass-strong rounded-3xl p-6 sm:p-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
            {bm ? "Pilih Mod Ulang Kaji" : "Choose Review Mode"}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{subtopicTitle}</h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {options.map((option, index) => {
            const copy = REVIEW_MODE_COPY[option.mode][lang];
            const cardsLabel = bm ? `${option.total} kad` : `${option.total} cards`;
            return (
              <button
                key={option.mode}
                type="button"
                onClick={() => onSelect(option.mode)}
                aria-label={`${copy.title}, ${cardsLabel}`}
                data-review-mode={option.mode}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_32px_oklch(0.63_0.22_295_/_0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 animate-slide-up"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-3xl transition-opacity group-hover:opacity-40" />
                <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-xl font-black shadow-lg">
                  <span aria-hidden="true">{REVIEW_MODE_COPY[option.mode].icon}</span>
                </div>
                <h3 className="relative font-display text-2xl font-bold">{copy.title}</h3>
                <p className="relative mt-1 text-sm font-semibold text-accent">{cardsLabel}</p>
                <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                  {copy.purpose}
                </p>
                <div className="relative mt-5">
                  <div
                    className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
                    aria-hidden="true"
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      style={{
                        width: `${option.total ? (option.known / option.total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {bm
                      ? `${option.known} daripada ${option.total} diketahui`
                      : `${option.known} of ${option.total} known`}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
