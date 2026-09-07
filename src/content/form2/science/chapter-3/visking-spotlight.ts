import type { SpotlightShape } from "@/components/notes/blocks/spotlight-shapes";

/**
 * Authored geometry for the Visking-tubing `spotlight` diagram, eyeballed
 * against `chapter3_visking_tubing.webp`: two boiling tubes side by side,
 * each holding a tied Visking bag. Left (P/starch) shows beads confined
 * inside the bag with no arrows crossing the membrane — the shape for
 * "Starch tube" deliberately stays inside the tube boundary so it can never
 * be read as starch escaping. Right (Q/glucose) shows dots both inside and
 * outside the bag, with arrows through the membrane.
 */
const ellipse = (id: string, cx: number, cy: number, rx: number, ry: number): SpotlightShape => ({
  id,
  kind: "ellipse",
  cx,
  cy,
  rx,
  ry,
});

export const VISKING_SHAPES: Record<string, SpotlightShape[]> = {
  P: [ellipse("tube-P", 29, 50, 13, 48)],
  Q: [ellipse("tube-Q", 68, 50, 13, 48)],
  tubing: [ellipse("bag-P", 29, 55, 6, 32), ellipse("bag-Q", 68, 55, 6, 32)],
  water: [ellipse("water-P", 29, 50, 13, 48), ellipse("water-Q", 68, 50, 13, 48)],
};
