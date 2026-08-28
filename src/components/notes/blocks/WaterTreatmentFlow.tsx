import { useState } from "react";
import type { WaterTreatmentFlowBlock } from "@/content/form2/science/interactive-types";
import type { ImageAnnotation } from "./AnnotatedImage";
import {
  conceptButtonClass,
  InteractiveBadge,
  InteractiveFigureCard,
  mergeConcepts,
} from "./InteractiveFigureCard";

/**
 * The water-supply system as a clickable flow rather than a passive picture.
 *
 * Stage order is the examinable part, so the stages stay in a single reading
 * order and wrap instead of collapsing into a grid that could be read in any
 * direction. Arrows are drawn as separate elements between chips so a wrapped
 * row never leaves a dangling arrow at the end of a line.
 */
export function WaterTreatmentFlow({
  block,
  lang,
}: {
  block: WaterTreatmentFlowBlock;
  lang?: string;
}) {
  // Approved artwork replaces the chip flow. Every stage stays a button in the
  // authored order — including the two the artwork does not depict, which keep
  // their explanation without drawing a region on the picture.
  if (block.image) {
    const concepts: ImageAnnotation[] = block.stages.map((stage) => {
      const point = block.image!.points.find((p) => p.id === stage.id);
      return {
        id: stage.id,
        label: stage.name,
        icon: stage.icon,
        note: stage.fn,
        x: point?.x,
        y: point?.y,
        w: point?.w,
        h: point?.h,
        facts: stage.chemical
          ? [{ label: block.chemicalLabel, value: stage.chemical }]
          : undefined,
      };
    });
    const withExtras = mergeConcepts(concepts, block.image.extra);
    return (
      <InteractiveFigureCard
        lang={lang}
        instruction={block.instruction}
        prompt={block.hint}
        concepts={withExtras}
        image={{
          src: block.image.src,
          alt: block.image.alt,
          size: block.image.size ?? "wide",
          aspect: block.image.aspect ?? "2 / 1",
          caption: block.image.caption,
          legendLabel: block.image.legendLabel ?? block.title,
          annotationMode: block.image.annotationMode ?? "regions",
          imageKey: block.image.imageKey,
        }}
      />
    );
  }

  const [activeId, setActiveId] = useState<string | null>(null);
  const activeStage = block.stages.find((s) => s.id === activeId) ?? null;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <ol className="flex flex-wrap items-stretch gap-1">
        {block.stages.map((stage, i) => {
          const isActive = stage.id === activeId;
          return (
            <li key={stage.id} className="flex items-stretch gap-1">
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveId(isActive ? null : stage.id)}
                className={conceptButtonClass(isActive)}
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
