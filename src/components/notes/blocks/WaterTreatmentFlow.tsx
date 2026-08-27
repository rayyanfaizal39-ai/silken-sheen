import { useState } from "react";
import type { WaterTreatmentFlowBlock } from "@/content/form2/science/interactive-types";

/**
 * The water-supply system as a clickable flow rather than a passive picture.
 *
 * Stage order is the examinable part, so the stages stay in a single reading
 * order and wrap instead of collapsing into a grid that could be read in any
 * direction. Arrows are drawn as separate elements between chips so a wrapped
 * row never leaves a dangling arrow at the end of a line.
 */
export function WaterTreatmentFlow({ block }: { block: WaterTreatmentFlowBlock }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeStage = block.stages.find((s) => s.id === activeId) ?? null;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="mb-2.5 text-[13px] leading-relaxed text-muted-foreground">
          {block.instruction}
        </p>
      )}

      <ol className="flex flex-wrap items-stretch gap-1">
        {block.stages.map((stage, i) => {
          const isActive = stage.id === activeId;
          return (
            <li key={stage.id} className="flex items-stretch gap-1">
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveId(isActive ? null : stage.id)}
                className={`flex min-h-[36px] items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[11.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card/55 text-foreground hover:border-primary"
                }`}
              >
                <span
                  className={`text-[9.5px] font-bold ${
                    isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </span>
                {stage.icon && <span aria-hidden="true">{stage.icon}</span>}
                {stage.name}
              </button>
              {i < block.stages.length - 1 && (
                <span
                  aria-hidden="true"
                  className="self-center text-[11px] text-muted-foreground/60"
                >
                  →
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div
        aria-live="polite"
        className={`mt-2.5 min-h-[3rem] rounded-xl border px-3 py-2 text-[12px] leading-relaxed ${
          activeStage
            ? "border-primary/25 bg-primary/10 text-foreground"
            : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {activeStage ? (
          <>
            <p>
              <b className="text-primary">{activeStage.name}</b> — {activeStage.fn}
            </p>
            {activeStage.chemical && (
              <p className="mt-1 text-[11.5px] text-muted-foreground">
                <span className="font-bold uppercase tracking-wide">{block.chemicalLabel}:</span>{" "}
                {activeStage.chemical}
              </p>
            )}
          </>
        ) : (
          block.hint
        )}
      </div>
    </div>
  );
}
