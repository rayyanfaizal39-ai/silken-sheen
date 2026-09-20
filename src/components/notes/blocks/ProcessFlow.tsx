import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { ProcessFlowBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";

/**
 * An ordered process a learner steps through — detect, track, assess, warn,
 * deflect. A row of numbered step buttons joined by arrows (a column on a
 * phone), with one explanation panel that always stays in the same place.
 *
 * Each button carries its step number as well as its name, so the order reads
 * without relying on the arrows, and the selected step is marked by fill,
 * border weight and `aria-pressed` rather than colour alone.
 */
export function ProcessFlow({ block, lang }: { block: ProcessFlowBlock; lang?: string }) {
  const [active, setActive] = useState(block.steps[0]?.id ?? "");
  const index = Math.max(
    0,
    block.steps.findIndex((step) => step.id === active),
  );
  const selected = block.steps[index];

  return (
    <div
      className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5"
      data-process-flow=""
    >
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-3" />

      <ol className="flex flex-col items-stretch sm:flex-row sm:items-stretch">
        {block.steps.map((step, i) => {
          const isActive = step.id === active;
          return (
            <li
              key={step.id}
              className="flex flex-col items-stretch sm:flex-1 sm:flex-row sm:items-center"
            >
              <button
                type="button"
                aria-pressed={isActive}
                aria-label={`${block.stepLabel} ${i + 1}: ${step.label}`}
                onClick={() => setActive(step.id)}
                className={conceptButtonClass(
                  isActive,
                  "w-full flex-row gap-2 py-2.5 sm:min-h-[6rem] sm:flex-col sm:gap-1",
                )}
              >
                {step.icon && (
                  <span aria-hidden="true" className="text-lg leading-none">
                    {step.icon}
                  </span>
                )}
                <span className="flex flex-col items-start sm:items-center">
                  <span className="text-[10px] font-bold uppercase tracking-wide opacity-75">
                    {block.stepLabel} {i + 1}
                  </span>
                  <span className="text-center">{step.label}</span>
                </span>
              </button>
              {i < block.steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="flex justify-center py-0.5 text-primary sm:px-0.5 sm:py-0"
                >
                  <ChevronDown className="h-4 w-4 sm:hidden" />
                  <ChevronRight className="hidden h-4 w-4 sm:block" />
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {selected && (
        <div
          aria-live="polite"
          className="mt-3 rounded-xl border border-primary/35 bg-primary/8 px-3 py-2.5"
        >
          <p className="font-display text-[13px] font-bold text-primary">
            {block.stepLabel} {index + 1}: {selected.label}
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-foreground">{selected.note}</p>
        </div>
      )}
    </div>
  );
}
