import type { Ch13FigureId } from "@/content/form2/science/interactive-types";
import type { SpotlightShape } from "./spotlight-shapes";

/**
 * Overlay geometry for the three interactive Chapter 13 photographs — the
 * meteoroid's journey, the impact crater, and the anatomy of a comet.
 *
 * Same contract as `ch9-approved-figure-geometry.ts`: the artwork carries no
 * words, so BM and DLP render the SAME WebP, and every coordinate lives here
 * once, keyed by the concept id content also uses. Coordinates are percentages
 * of the artwork (0-100), so a region tracks its subject at every width —
 * phone, desktop and inside the enlarge overlay.
 */

export type Ch13FigureGeometry = {
  /** Intrinsic aspect ratio — all three files are 1774 x 887. */
  aspect: string;
  /** How strongly everything outside the selected region dims, 0-1. */
  dim: number;
  /** The region each concept lights up, keyed by the id content uses. */
  regions: Record<string, SpotlightShape[]>;
};

/**
 * Measured off the shipped WebP files (1774 x 887).
 *
 * `meteoroid-journey` is one scene read left to right: the rocky meteoroid
 * alone in space at the top left; the glowing entry — the large fireball, the
 * trail of burning fragments to its right, and the smaller fireball dropping
 * towards the ground; then the dark fragment sitting in its pit on the surface.
 * The meteor region deliberately takes in all three glowing shapes: every one
 * of them is a meteor, whether it burns up or survives.
 *
 * `impact-crater` teaches one concept — "a large impact can form a crater" —
 * so its single region covers the whole visible crater: the excavated floor
 * and the rim thrown up around it. The chapter no longer asks a Form 2 learner
 * to name the floor, the rim and the disturbed rock layers separately, so
 * those three shapes now light up together as one region instead of three.
 *
 * `comet-anatomy` teaches HEAD and TAIL, the textbook's own vocabulary, not
 * "nucleus" and "coma" — so the head region nests the same two shapes the
 * artwork always had (the solid core inside the bright glow around it), just
 * taught as a single concept. The tail region takes in both the blue gas tail
 * and the pale dust tail; the solar-wind region is the band of arrows between
 * the Sun's limb and the head, not the Sun itself.
 */
export const CH13_FIGURE_GEOMETRY: Record<Ch13FigureId, Ch13FigureGeometry> = {
  "meteoroid-journey": {
    aspect: "2 / 1",
    dim: 0.62,
    regions: {
      meteoroid: [{ id: "ch13-meteoroid", kind: "ellipse", cx: 11.8, cy: 12.5, rx: 5.5, ry: 9 }],
      meteor: [
        {
          id: "ch13-meteor-fireball",
          kind: "polygon",
          points: "25,12 36,12 48,26 55,37 53,47 45,47 38,36",
        },
        { id: "ch13-meteor-fragments", kind: "polygon", points: "60,32 64.5,31 83,59 80,64" },
        {
          id: "ch13-meteor-lower",
          kind: "polygon",
          points: "62,53 67,53 74,65 73.5,73 68,73 65,63",
        },
      ],
      meteorite: [{ id: "ch13-meteorite", kind: "ellipse", cx: 80.5, cy: 85, rx: 11, ry: 9 }],
    },
  },
  "impact-crater": {
    aspect: "2 / 1",
    dim: 0.6,
    regions: {
      crater: [
        { id: "ch13-crater-floor", kind: "ellipse", cx: 51, cy: 55, rx: 21, ry: 11 },
        { id: "ch13-rim-back", kind: "ellipse", cx: 50, cy: 35, rx: 30, ry: 5.5 },
        { id: "ch13-rim-left", kind: "ellipse", cx: 21, cy: 54, rx: 5, ry: 15 },
        { id: "ch13-rim-right", kind: "ellipse", cx: 80.5, cy: 55, rx: 5, ry: 15.5 },
      ],
    },
  },
  "comet-anatomy": {
    aspect: "2 / 1",
    dim: 0.62,
    regions: {
      head: [
        { id: "ch13-nucleus", kind: "ellipse", cx: 53.6, cy: 55.4, rx: 2.6, ry: 4.6 },
        { id: "ch13-coma", kind: "ellipse", cx: 53.5, cy: 55, rx: 7, ry: 12 },
      ],
      tail: [{ id: "ch13-tail", kind: "polygon", points: "57,47 100,1 100,86 59,61" }],
      "solar-wind": [
        { id: "ch13-solar-wind", kind: "rect", x: 10.5, y: 28, w: 38.5, h: 46, rx: 3 },
      ],
    },
  },
};

/** The order each figure's concepts are taught in. */
export const CH13_FIGURE_ORDER: Record<Ch13FigureId, readonly string[]> = {
  "meteoroid-journey": ["meteoroid", "meteor", "meteorite"],
  "impact-crater": ["crater"],
  "comet-anatomy": ["head", "tail", "solar-wind"],
};
