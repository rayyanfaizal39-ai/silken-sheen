import type { LessonSpotlightFigureBlock } from "@/content/form2/science/interactive-types";
import { InteractiveFigureCard } from "./InteractiveFigureCard";
import { CH13_FIGURE_GEOMETRY } from "./ch13-approved-figure-geometry";

/**
 * One approved Chapter 13 photograph, taught as a row of selectable regions —
 * the same shape as `Chapter9SpotlightFigure`, drawn from Chapter 13's own
 * geometry module.
 *
 * `InteractiveFigureCard` supplies the interactive badge, 44px keyboard-
 * reachable controls with `aria-pressed`, the enlarge affordance, and
 * `spotlight` mode, which keeps the chosen region bright with an outline while
 * the rest dims — so the selection is never carried by colour alone.
 *
 * No `minWidth`: these 2:1 scenes stay legible at phone width, and a
 * sideways-scrolling figure is exactly what the mobile pass rules out.
 *
 * A figure with exactly one concept (the impact crater, taught as one idea
 * rather than a set of anatomy terms) hides the button row: a lone button
 * would imply there is something else to look at, when the whole point is a
 * single statement under a single spotlight.
 */
export function Chapter13SpotlightFigure({
  block,
  lang,
}: {
  block: LessonSpotlightFigureBlock;
  lang?: string;
}) {
  const geometry = CH13_FIGURE_GEOMETRY[block.figure];

  return (
    <div data-ch13-figure={block.figure}>
      <InteractiveFigureCard
        lang={lang}
        instruction={block.instruction}
        showControls={block.concepts.length > 1}
        // Ordered stages and parts: opening on the first reads as a start
        // point, where an empty selection reads as broken.
        initialActive={block.concepts[0]?.id ?? null}
        concepts={block.concepts.map((concept) => ({
          id: concept.id,
          label: concept.label,
          icon: concept.icon,
          note: concept.note,
          spotlightCaption: concept.spotlightCaption,
          spotlightShapes: geometry.regions[concept.id],
        }))}
        image={{
          src: block.src,
          alt: block.alt,
          aspect: geometry.aspect,
          size: "wide",
          caption: block.caption,
          annotationMode: "spotlight",
          spotlightDimOpacity: geometry.dim,
          spotlightCaptionEdge: "auto",
          priority: true,
        }}
      />
    </div>
  );
}
