import type { SpotlightShape } from "@/components/notes/blocks/spotlight-shapes";

/**
 * Authored geometry for the villus `spotlight` diagram, eyeballed against
 * `chapter3_villus_absorption.webp`: one large finger-shaped villus, a red
 * blood-capillary network winding up its left/centre, a single central green
 * lacteal, and two streams of small dots (orange = glucose/amino acids,
 * green = fatty acids/glycerol) crossing the wall into each route.
 */
const ellipse = (id: string, cx: number, cy: number, rx: number, ry: number): SpotlightShape => ({
  id,
  kind: "ellipse",
  cx,
  cy,
  rx,
  ry,
});

export const VILLUS_SHAPES: Record<string, SpotlightShape[]> = {
  villus: [ellipse("villus", 50, 50, 14, 46)],
  wall: [ellipse("wall-left", 39, 50, 4, 42), ellipse("wall-right", 61, 50, 4, 42)],
  blood: [ellipse("blood", 47, 55, 9, 40)],
  lacteal: [ellipse("lacteal", 50, 55, 3, 42)],
  lumen: [ellipse("lumen", 25, 30, 15, 15)],
  absorption: [
    ellipse("absorption-glucose", 36, 38, 10, 12),
    ellipse("absorption-fat", 64, 56, 9, 10),
  ],
};
