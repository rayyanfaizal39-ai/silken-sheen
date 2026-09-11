import { useState } from "react";
import type { GuidedCalculationBlock } from "@/content/form2/science/interactive-types";
import { CircuitWorkedDiagram } from "./CircuitWorkedDiagram";

/**
 * A Given -> Find -> Formula -> Substitute -> Answer worked example.
 *
 * Generic across chapters: any KSSM numeric problem is taught in exactly this
 * shape, so a calculator that only returns a final number (as the chapter's
 * existing calculators do) sits alongside one of these rather than replacing
 * it — the calculator lets a learner check their own numbers, this shows the
 * method that got there.
 *
 * When a block carries `circuit` + `steps`, a small circuit diagram and a
 * Step 1/2/3 selector replace the flat formula/substitute/answer rows: the
 * SAME given/find data, but the working is now tied to a picture instead of
 * only a formula. Every other chapter's guided calculation has neither field
 * and renders exactly as before.
 */
export function GuidedCalculation({ block }: { block: GuidedCalculationBlock }) {
  const steps = block.circuit && block.steps && block.steps.length > 0 ? block.steps : null;
  const [stepIndex, setStepIndex] = useState(0);
  const activeStep = steps ? (steps[Math.min(stepIndex, steps.length - 1)] ?? steps[0]) : null;

  const rows: { label: string; value: string; emphasis?: boolean }[] = activeStep
    ? [
        { label: block.formulaLabel, value: activeStep.formula },
        { label: block.substituteLabel, value: activeStep.substitute },
        { label: block.answerLabel, value: activeStep.answer, emphasis: true },
      ]
    : [
        { label: block.findLabel, value: block.find },
        { label: block.formulaLabel, value: block.formula },
        { label: block.substituteLabel, value: block.substitute },
        { label: block.answerLabel, value: block.answer, emphasis: true },
      ];

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <h4 className="font-display text-[13px] font-bold text-foreground">{block.title}</h4>

      <div className="mt-2 rounded-xl border border-border bg-card/55 px-3 py-2">
        <p className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground">
          {block.givenLabel}
        </p>
        <ul className="mt-0.5 flex flex-col gap-0.5">
          {block.given.map((g) => (
            <li key={g} className="text-[12.5px] leading-relaxed text-foreground">
              {g}
            </li>
          ))}
        </ul>
      </div>

      {steps && block.circuit && (
        <div className="mt-2.5">
          <CircuitWorkedDiagram spec={block.circuit} highlight={activeStep!.highlight} />
          <div
            className="mt-2 flex flex-wrap justify-center gap-1.5"
            role="group"
            aria-label={block.circuit.stepLabel}
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
        </div>
      )}

      <div className="mt-2 flex flex-col">
        {rows.map((row, i) => (
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
    </div>
  );
}
