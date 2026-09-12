import { useState } from "react";
import type { RecognitionChallengeBlock } from "@/content/form2/science/interactive-types";
import { CircuitWorkedDiagram } from "./CircuitWorkedDiagram";
import { conceptButtonClass } from "./InteractiveFigureCard";

/**
 * A very short "which circuit is it?" checkpoint — two unlabelled diagrams,
 * two short questions, immediate feedback. Deliberately not a quiz page: its
 * only job is to make a learner identify series vs parallel BEFORE they ever
 * reach a formula, since picking the right relationship depends entirely on
 * getting this right first.
 */
export function CircuitRecognitionChallenge({ block }: { block: RecognitionChallengeBlock }) {
  const [seriesPick, setSeriesPick] = useState<"a" | "b" | null>(null);
  const [parallelPick, setParallelPick] = useState<"a" | "b" | null>(null);

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <h3 className="font-display mb-2 text-base font-bold text-foreground">{block.title}</h3>
      {block.instruction && (
        <p className="mb-2.5 text-[13px] leading-relaxed text-muted-foreground">
          {block.instruction}
        </p>
      )}

      <div className="grid gap-2.5 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card/55 p-2.5">
          {/* Deliberately neutral: "A", not "Series"/"Parallel" — naming the
              circuit here would give the answer away before the question is
              even asked. */}
          <p className="mb-1 text-center text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            {block.options.find((o) => o.id === "a")?.label ?? "A"}
          </p>
          <CircuitWorkedDiagram spec={block.diagramA} highlight={[]} />
        </div>
        <div className="rounded-xl border border-border bg-card/55 p-2.5">
          <p className="mb-1 text-center text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            {block.options.find((o) => o.id === "b")?.label ?? "B"}
          </p>
          <CircuitWorkedDiagram spec={block.diagramB} highlight={[]} />
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2.5">
        <div className="rounded-xl border border-border bg-card/55 px-3 py-2.5">
          <p className="text-[12.5px] font-semibold leading-relaxed text-foreground">
            {block.seriesPrompt}
          </p>
          <div
            className="mt-1.5 flex flex-wrap gap-1.5"
            role="group"
            aria-label={block.seriesPrompt}
          >
            {block.options.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={seriesPick === option.id}
                onClick={() => setSeriesPick(option.id)}
                className={conceptButtonClass(seriesPick === option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
          {seriesPick && (
            <p
              aria-live="polite"
              className={`mt-1.5 text-[12px] font-semibold leading-relaxed ${
                block.options.find((o) => o.id === seriesPick)!.isSeries
                  ? "text-emerald-500"
                  : "text-amber-500"
              }`}
            >
              {block.options.find((o) => o.id === seriesPick)!.isSeries
                ? block.seriesCorrectFeedback
                : block.incorrectFeedback}
            </p>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card/55 px-3 py-2.5">
          <p className="text-[12.5px] font-semibold leading-relaxed text-foreground">
            {block.parallelPrompt}
          </p>
          <div
            className="mt-1.5 flex flex-wrap gap-1.5"
            role="group"
            aria-label={block.parallelPrompt}
          >
            {block.options.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={parallelPick === option.id}
                onClick={() => setParallelPick(option.id)}
                className={conceptButtonClass(parallelPick === option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
          {parallelPick && (
            <p
              aria-live="polite"
              className={`mt-1.5 text-[12px] font-semibold leading-relaxed ${
                !block.options.find((o) => o.id === parallelPick)!.isSeries
                  ? "text-emerald-500"
                  : "text-amber-500"
              }`}
            >
              {!block.options.find((o) => o.id === parallelPick)!.isSeries
                ? block.parallelCorrectFeedback
                : block.incorrectFeedback}
            </p>
          )}
        </div>
      </div>

      <p className="mt-2.5 rounded-xl border border-primary/25 bg-primary/10 px-3 py-1.5 text-center text-[12px] font-semibold text-primary">
        {block.reminderNote}
      </p>
    </div>
  );
}
