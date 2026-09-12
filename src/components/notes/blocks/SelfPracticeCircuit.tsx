import { useState } from "react";
import type { SelfPracticeFigure } from "@/content/form2/science/interactive-types";
import { CircuitWorkedDiagram } from "./CircuitWorkedDiagram";
import { conceptButtonClass } from "./InteractiveFigureCard";

/**
 * One circuit problem — a worked example OR a self-practice figure, both
 * built from the same shape so the strict UX rule holds everywhere: QUESTION
 * → DIAGRAM → THINK → SOLUTION, never solution-first.
 *
 * The circuit and the question are drawn immediately and unconditionally — a
 * learner needs to see the apparatus and read what is being asked before
 * they can attempt anything. What stays hidden until requested is the
 * WORKING: a worked example gates it behind an optional "what type of
 * circuit is this?" check (`figure.identifyCircuit`) plus an always-available
 * "Start solution" that never forces an answer; a self-practice figure gates
 * it behind progressive hints instead. Revealing the solution turns on the
 * SAME circuit diagram's step highlighting — the figure never swaps to a
 * second, different picture.
 */
export function SelfPracticeCircuit({
  figure,
  lang,
}: {
  figure: SelfPracticeFigure;
  lang?: string;
}) {
  const [hintsShown, setHintsShown] = useState(0);
  const [circuitAnswer, setCircuitAnswer] = useState<number | null>(null);
  const [solutionShown, setSolutionShown] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const hints = figure.hints ?? [];
  const steps = figure.solution.steps ?? [];
  const activeStep = solutionShown ? (steps[Math.min(stepIndex, steps.length - 1)] ?? null) : null;
  const highlight = activeStep?.highlight ?? [];
  const gate = figure.identifyCircuit;
  const chosenOption = circuitAnswer !== null ? gate?.options[circuitAnswer] : null;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <h4 className="font-display mb-2 text-[13px] font-bold text-foreground">
        {figure.figureLabel}
      </h4>

      {figure.questionIntro && (
        <p className="mb-2.5 text-[13px] leading-relaxed text-foreground">{figure.questionIntro}</p>
      )}

      <CircuitWorkedDiagram spec={figure.circuit} highlight={highlight} />

      <div className="mt-2.5 rounded-xl border border-border bg-card/55 px-3 py-2">
        {figure.questionsLabel && (
          <p className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground">
            {figure.questionsLabel}
          </p>
        )}
        <ul className="mt-0.5 flex flex-col gap-0.5">
          {figure.questions.map((q) => (
            <li key={q} className="text-[12.5px] leading-relaxed text-foreground">
              {q}
            </li>
          ))}
        </ul>
      </div>

      {gate && !solutionShown && (
        <div className="mt-2.5 rounded-xl border border-border bg-card/55 px-3 py-2.5">
          <p className="text-[12.5px] font-semibold leading-relaxed text-foreground">
            {gate.prompt}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label={gate.prompt}>
            {gate.options.map((option, i) => {
              const isChosen = circuitAnswer === i;
              return (
                <button
                  key={option.label}
                  type="button"
                  aria-pressed={isChosen}
                  onClick={() => setCircuitAnswer(i)}
                  className={conceptButtonClass(isChosen)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          {chosenOption && (
            <p
              aria-live="polite"
              className={`mt-2 text-[12px] font-semibold leading-relaxed ${
                chosenOption.isCorrect ? "text-emerald-500" : "text-amber-500"
              }`}
            >
              {chosenOption.isCorrect ? gate.correctFeedback : gate.incorrectFeedback}
            </p>
          )}
        </div>
      )}

      {!solutionShown && (
        <div className="mt-2.5 flex flex-wrap gap-1.5" role="group" aria-label={figure.hintsLabel}>
          {hints.map((_, i) => {
            const shown = i < hintsShown;
            const isNext = i === hintsShown;
            if (shown || !isNext) return null;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setHintsShown(i + 1)}
                className={conceptButtonClass(false)}
              >
                {figure.hintsLabel} {i + 1}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setSolutionShown(true)}
            className={conceptButtonClass(false)}
          >
            {gate?.startSolutionLabel ?? figure.showSolutionLabel}
          </button>
        </div>
      )}

      {hintsShown > 0 && (
        <ol className="mt-2 flex flex-col gap-1.5">
          {hints.slice(0, hintsShown).map((hint, i) => (
            <li
              key={hint}
              className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-1.5 text-[12px] leading-relaxed text-foreground"
            >
              <b className="text-amber-500">
                {figure.hintsLabel} {i + 1}:
              </b>{" "}
              {hint}
            </li>
          ))}
        </ol>
      )}

      {solutionShown && (
        <div className="mt-2.5 rounded-xl border border-primary/25 bg-primary/5 px-3 py-2.5">
          <p className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground">
            {figure.solution.givenLabel}
          </p>
          <ul className="mt-0.5 mb-2 flex flex-col gap-0.5">
            {figure.solution.given.map((g) => (
              <li key={g} className="text-[12.5px] leading-relaxed text-foreground">
                {g}
              </li>
            ))}
          </ul>

          {steps.length > 0 && (
            <>
              <div
                className="flex flex-wrap gap-1.5"
                role="group"
                aria-label={figure.solution.circuit?.stepLabel ?? "Step"}
              >
                {steps.map((step, i) => {
                  const isActive = i === stepIndex;
                  return (
                    <button
                      key={step.label}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setStepIndex(i)}
                      className={`min-h-11 cursor-pointer rounded-full border-2 px-3 py-1.5 text-[11.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isActive
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card/55 text-muted-foreground hover:border-primary"
                      }`}
                    >
                      {step.label}
                    </button>
                  );
                })}
              </div>
              {activeStep && (
                <div className="mt-2 flex flex-col">
                  {[
                    { label: figure.solution.formulaLabel, value: activeStep.formula },
                    { label: figure.solution.substituteLabel, value: activeStep.substitute },
                    {
                      label: figure.solution.answerLabel,
                      value: activeStep.answer,
                      emphasis: true,
                    },
                  ].map((row, i) => (
                    <div
                      key={row.label}
                      className={`flex flex-wrap items-baseline gap-x-2 gap-y-0.5 px-1 py-1.5 ${
                        i > 0 ? "border-t border-border/60" : ""
                      } ${row.emphasis ? "rounded-lg bg-primary/10 px-2" : ""}`}
                    >
                      <span
                        className={`text-[10.5px] font-bold uppercase tracking-wide ${
                          row.emphasis ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {row.label}
                      </span>
                      <span
                        className={`text-[13px] leading-relaxed ${
                          row.emphasis ? "font-bold text-primary" : "text-foreground"
                        }`}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
