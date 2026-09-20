import type { Ch9SpotlightFigureBlock } from "@/content/form2/science/interactive-types";
import { InteractiveFigureCard } from "./InteractiveFigureCard";
import { CH9_FIGURE_GEOMETRY } from "./ch9-approved-figure-geometry";

/**
 * One approved Chapter 9 photograph, taught as a row of selectable regions.
 *
 * Three figures share this component because they share a shape: a picture that
 * paints several named things, a control per thing, and one explanation panel.
 * Writing it once means the three cannot drift apart in behaviour — and it is
 * why the geometry lives in `ch9-approved-figure-geometry.ts` keyed by concept
 * id rather than in each block: content supplies every word, the module supplies
 * every coordinate, and BM and DLP therefore get identical hotspots from one
 * file each.
 *
 * `InteractiveFigureCard` does the rest: the "interactive" badge, touch-sized
 * keyboard-reachable controls with `aria-pressed`, the enlarge affordance, and
 * `spotlight` mode — which keeps the chosen region at full brightness with an
 * outline while its siblings dim, so the selected state is never carried by
 * colour alone.
 */
export function Chapter9SpotlightFigure({
  block,
  lang,
}: {
  block: Ch9SpotlightFigureBlock;
  lang?: string;
}) {
  const geometry = CH9_FIGURE_GEOMETRY[block.figure];

  return (
    <InteractiveFigureCard
      lang={lang}
      instruction={block.instruction}
      prompt={block.prompt}
      // Opening on the first region: these figures are ordered sets, so an
      // unselected one reads as broken rather than as an invitation.
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
        // Per-figure floor: below it the frame scrolls inside its own wrapper
        // rather than shrinking the artwork past reading size.
        minWidth: geometry.minWidth,
        size: block.size ?? "panel",
        caption: block.caption,
        legendLabel: block.legendLabel,
        annotationMode: "spotlight",
        spotlightDimOpacity: geometry.dim,
        spotlightCaptionEdge: geometry.captionEdge,
        // Each of these leads the concept it teaches, so it is above the fold
        // whenever its section is open; deferring it would show an empty box
        // where the figure the reader came for should be.
        priority: true,
      }}
    />
  );
}
