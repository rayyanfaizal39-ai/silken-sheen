import type { SpotlightShape } from "./spotlight-shapes";

/**
 * Overlay geometry for the three approved Chapter 9 photographs — the three
 * methods of heat transfer, the Sun warming the Earth, and heat conductors
 * versus heat insulators.
 *
 * All three are language-neutral: not one carries a baked-in word, so BM and
 * DLP render the SAME WebP and every label, caption and explanation comes from
 * chapter content. That only holds if the geometry is shared too — a hotspot
 * authored twice is a hotspot that eventually drifts between the two languages
 * — so every coordinate lives here, once, keyed by the concept id that content
 * also uses.
 *
 * Coordinates are percentages of the artwork (0-100): `x` a share of the width
 * and `y` a share of the height, measured independently, exactly as
 * `SpotlightOverlay` consumes them. A shape therefore tracks its subject at
 * every rendered width — phone, desktop, and inside the enlarge overlay — with
 * no pixel maths and no resize listener. Nothing here is a fixed page-level
 * position, and nothing here is language dependent.
 */

/** Which approved Chapter 9 figure a block is drawn on. */
export type Ch9FigureId = "heat-transfer" | "sun-earth" | "conductor-insulator";

export type Ch9FigureGeometry = {
  /** Intrinsic aspect ratio — must match the artwork or the frame letterboxes it. */
  aspect: string;
  /**
   * How strongly the scrim dims everything outside the selected region, 0-1.
   * Peer panels sit low: the comparison between them is half the teaching, so
   * the ones not selected must stay readable rather than disappear.
   */
  dim: number;
  /**
   * `"top"` pins the floating caption inside the selected shape's own top edge
   * — right for a grid of adjacent panels, where "the open space below" is
   * usually the start of the next panel. `"auto"` floats it into whichever side
   * has more room, which suits a single open scene.
   */
  captionEdge: "auto" | "top";
  /**
   * Readability floor in px. Below this the frame keeps its width and
   * scrolls inside its own wrapper rather than shrinking further, because
   * what makes these scenes legible is how much each one packs in — a
   * three-panel comparison at 270px gives each panel 90px, which is not a
   * readable apparatus drawing. The floors below land each subject near
   * 170px: more subjects, more floor.
   */
  minWidth: number;
  /** The region each concept lights up, keyed by the id content uses. */
  regions: Record<string, SpotlightShape[]>;
};

/**
 * Measured off the shipped WebP files.
 *
 * `heat-transfer` (1944x809) is a triptych whose three panels are drawn with
 * rounded borders at x 0.5-32.8, 34.0-65.8 and 67.0-99.3, y 1.5-97 — so each
 * method gets the panel it actually occupies rather than an even third.
 *
 * `sun-earth` (1774x887) is one continuous scene rather than panels, so its
 * three regions are read off the artwork itself: the Sun's disc and corona end
 * at x 24, the four rays run from there to the arrowheads at x 74, and the
 * Earth's lit limb reaches its leftmost point at x 78. The vacuum band deliberately spans the rays
 * AND the dark space around them — "no medium is required" is a claim about the
 * emptiness, not just about the arrows drawn through it — but it stops at the
 * limb, because the Earth is the thing that receives the radiation, not part of
 * the gap it crossed.
 *
 * `conductor-insulator` (1774x887) is a two-by-two set of everyday objects, and
 * each region hugs the OBJECT rather than its quadrant so the learner's eye
 * lands on the thing being named — the wooden handle in particular is a small
 * part of its panel.
 */
export const CH9_FIGURE_GEOMETRY: Record<Ch9FigureId, Ch9FigureGeometry> = {
  "heat-transfer": {
    aspect: "1944 / 809",
    dim: 0.45,
    captionEdge: "top",
    // three panels, each a whole apparatus drawing
    minWidth: 520,
    regions: {
      conduction: [{ id: "ch9-conduction", kind: "rect", x: 0.6, y: 2, w: 32, h: 95, rx: 1.5 }],
      convection: [{ id: "ch9-convection", kind: "rect", x: 34.1, y: 2, w: 31.6, h: 95, rx: 1.5 }],
      radiation: [{ id: "ch9-radiation", kind: "rect", x: 67.1, y: 2, w: 32.1, h: 95, rx: 1.5 }],
    },
  },
  "sun-earth": {
    aspect: "2 / 1",
    dim: 0.6,
    captionEdge: "auto",
    // one open scene: two big bodies and the rays between them
    minWidth: 420,
    regions: {
      // the Sun's disc and its corona, cut by the left edge of the frame
      sun: [{ id: "ch9-sun", kind: "rect", x: 0, y: 2, w: 24, h: 96, rx: 2 }],
      // the dark gap the four rays cross, stopping at the Earth's limb — the
      // region must NOT reach into the Earth, or "no medium here" would be
      // painted over the very body that receives the radiation
      vacuum: [{ id: "ch9-vacuum", kind: "rect", x: 24, y: 20, w: 52, h: 56, rx: 3 }],
      // the Earth's disc from its lit limb to the right edge of the frame
      earth: [{ id: "ch9-earth", kind: "rect", x: 76, y: 17, w: 23.5, h: 79, rx: 2 }],
    },
  },
  "conductor-insulator": {
    aspect: "2 / 1",
    dim: 0.5,
    captionEdge: "auto",
    // four everyday objects in a two-by-two set
    minWidth: 480,
    regions: {
      // frying pan from its left rim to the tip of its handle; the gas burner
      // beneath it is the heat source, not the conductor, so it is excluded
      pan: [{ id: "ch9-pan", kind: "rect", x: 3.5, y: 18, w: 46.5, h: 23, rx: 2 }],
      // the iron, from the nose of the glowing sole plate to its back edge
      iron: [{ id: "ch9-iron", kind: "rect", x: 13.5, y: 55, w: 30.5, h: 32.5, rx: 2 }],
      // the wood beyond the metal ferrule, and the hand holding it — the hand
      // is the point: this is the part that can be gripped safely
      handle: [{ id: "ch9-handle", kind: "rect", x: 73.5, y: 21, w: 13.5, h: 12, rx: 1.5 }],
      // the polystyrene box, its open lid, and the heat radiating at its walls
      cooler: [{ id: "ch9-cooler", kind: "rect", x: 55, y: 44, w: 41, h: 49, rx: 2 }],
    },
  },
};

/** The order each figure's regions are painted in, left to right / top to bottom. */
export const CH9_FIGURE_ORDER: Record<Ch9FigureId, readonly string[]> = {
  "heat-transfer": ["conduction", "convection", "radiation"],
  "sun-earth": ["sun", "vacuum", "earth"],
  "conductor-insulator": ["pan", "iron", "handle", "cooler"],
};
