import type { LightningFormationBlock } from "@/content/form2/science/interactive-types";
import { InteractiveFigureCard } from "./InteractiveFigureCard";
import {
  LIGHTNING_ART_ASPECT,
  LIGHTNING_DIM_OPACITY,
  LIGHTNING_STAGES,
} from "./ch7-approved-figure-geometry";

/**
 * How lightning forms, taught on the approved night scene as the four ordered
 * stages the textbook gives: friction between the cloud and the surrounding
 * air, the charge separation that follows, the positive charge that separation
 * induces on the ground, and the sudden discharge.
 *
 * The stages are ordered controls rather than a free set of hotspots because
 * lightning is a SEQUENCE — each stage is the cause of the next — and each
 * lights up the part of the picture its own sentence is about, so a learner
 * reading "the lower part of the cloud becomes negatively charged" is looking
 * at the lower part of the cloud while they read it.
 *
 * This figure is about formation only. The lightning conductor, refuelling
 * safety and the Faraday cage are separate applications and keep their own
 * teaching in the section around it; nothing here stands in for them.
 */
export function LightningFormation({
  block,
  lang,
}: {
  block: LightningFormationBlock;
  lang?: string;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <InteractiveFigureCard
        lang={lang}
        instruction={block.instruction}
        prompt={block.prompt}
        // A process opens on its first stage: friction is where the sequence
        // starts, and an unselected process figure reads as broken.
        initialActive={block.stages[0]?.id ?? null}
        concepts={block.stages.map((stage) => ({
          id: stage.id,
          label: stage.label,
          icon: stage.icon,
          note: stage.note,
          spotlightCaption: stage.spotlightCaption,
          spotlightShapes: LIGHTNING_STAGES[stage.id],
        }))}
        image={{
          src: block.image.src,
          alt: block.image.alt,
          aspect: block.image.aspect ?? LIGHTNING_ART_ASPECT,
          size: block.image.size ?? "panel",
          caption: block.image.caption,
          legendLabel: block.image.legendLabel,
          annotationMode: "spotlight",
          // One scene, not a set of panels: the unselected parts still carry
          // the context that makes the selected part make sense, so they dim
          // rather than black out.
          spotlightDimOpacity: LIGHTNING_DIM_OPACITY,
          priority: true,
        }}
      />

      {/* The four stages read back as one account, so a learner who has stepped
          through the picture can revise the mechanism without it. */}
      <div className="rounded-xl border border-border bg-secondary/30 px-3 py-2">
        <p className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground">
          {block.summaryLabel}
        </p>
        <ul className="mt-1 flex flex-col gap-0.5">
          {block.summary.map((line) => (
            <li
              key={line}
              className="text-[12.5px] leading-relaxed text-foreground before:mr-1.5 before:text-primary before:content-['•']"
            >
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
