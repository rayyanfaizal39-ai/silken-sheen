/**
 * Geometry primitives for `spotlight` mode — see `AnnotatedImage`'s
 * `spotlightShapes`. Coordinates are percentages of the artwork's width (x,
 * cx, rx) and height (y, cy, ry) independently, exactly like the `x`/`y`/`w`/`h`
 * hit areas `regions` mode already uses, so authored numbers come straight
 * from eyeballing the rendered artwork.
 *
 * Every shape carries a stable `id` so React can key it across a selection
 * change. Two concepts that both light up the same physical thing (e.g. every
 * dragonfly is part of both "population" and "community") should reuse that
 * shape's id — reconciliation then morphs it smoothly instead of cutting it,
 * which is what actually sells "population is species, plus more" as one idea
 * rather than two unrelated pictures.
 */
export type SpotlightShape =
  | { id: string; kind: "ellipse"; cx: number; cy: number; rx: number; ry: number }
  | { id: string; kind: "rect"; x: number; y: number; w: number; h: number; rx?: number };

/** One temporary colour group in the `spotlightPulseGroups` sweep (ecosystem). */
export type SpotlightPulseGroup = {
  shapes: SpotlightShape[];
  tone: "a" | "b";
};

/** Bounding box of a set of shapes, in the same 0-100 percentage space. */
export function spotlightBounds(shapes: SpotlightShape[]) {
  let minX = 100;
  let minY = 100;
  let maxX = 0;
  let maxY = 0;
  for (const shape of shapes) {
    if (shape.kind === "ellipse") {
      minX = Math.min(minX, shape.cx - shape.rx);
      maxX = Math.max(maxX, shape.cx + shape.rx);
      minY = Math.min(minY, shape.cy - shape.ry);
      maxY = Math.max(maxY, shape.cy + shape.ry);
    } else {
      minX = Math.min(minX, shape.x);
      maxX = Math.max(maxX, shape.x + shape.w);
      minY = Math.min(minY, shape.y);
      maxY = Math.max(maxY, shape.y + shape.h);
    }
  }
  if (minX > maxX) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  return { minX, minY, maxX, maxY };
}
