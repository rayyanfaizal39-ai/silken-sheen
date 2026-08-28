import type { PlacedAnnotation } from "./AnnotatedImage";

/**
 * How an instructional image names its parts.
 *
 * `numbers` is deliberately last-resort: making a student map a pin to a legend
 * and back is the slowest way to read a diagram, so it is reserved for artwork
 * genuinely too dense to label in place.
 */
export type AnnotationMode =
  | "labels"
  | "callouts"
  | "hybrid"
  | "numbers"
  /**
   * Nothing is drawn on the artwork; the names sit in a compact list beneath.
   * For observational visuals where the student is meant to look and classify —
   * printing every answer on the picture would remove the activity.
   */
  | "clean"
  /**
   * Invisible tap/click areas over artwork that **already carries its own
   * printed labels**. Nothing is drawn on top until a region is picked, and
   * then only a highlight ring — so professionally labelled artwork is never
   * defaced with a second set of chips or numbered pins. The names sit in a
   * clickable list beneath, which is also the phone and keyboard reading
   * surface.
   */
  | "regions";

/** Share of the frame width taken by ONE callout gutter. */
export const CALLOUT_GUTTER = 23;
/** Share of the frame width left for the artwork in callout mode. */
export const CALLOUT_ART = 100 - CALLOUT_GUTTER * 2;

export type PlacedCallout = {
  annotation: PlacedAnnotation;
  side: "left" | "right";
  /** Vertical position of the label, as a percentage of frame height. */
  labelY: number;
  /** The anchor point, converted from artwork space into frame space. */
  anchorX: number;
  anchorY: number;
};

/**
 * Spreads callout labels down each gutter so none overlaps its neighbour, while
 * keeping them as close as possible to the part they point at.
 *
 * Runs as a pure function of the authored coordinates — no DOM measurement — so
 * the layout is identical on the server, before hydration, and at every width.
 */
export function layoutCallouts(annotations: PlacedAnnotation[]): PlacedCallout[] {
  const sides: Record<"left" | "right", PlacedAnnotation[]> = { left: [], right: [] };
  for (const annotation of annotations) {
    sides[annotation.x < 50 ? "left" : "right"].push(annotation);
  }

  const placed: PlacedCallout[] = [];

  (["left", "right"] as const).forEach((side) => {
    const group = [...sides[side]].sort((a, b) => a.y - b.y);
    if (group.length === 0) return;

    // Minimum vertical breathing room between two labels in the same gutter.
    // Capped at 100/n so a full gutter always fits between the two edges.
    const gap = Math.max(8, Math.min(20, 92 / group.length, 100 / group.length));
    const half = gap / 2;
    const top = half;
    const bottom = 100 - half;

    const ys = group.map((a) => a.y);
    // Push down so nothing overlaps its predecessor...
    for (let i = 1; i < ys.length; i += 1) {
      ys[i] = Math.max(ys[i], ys[i - 1] + gap);
    }
    // ...then pull the chain back up from a last label clamped to the bottom
    // edge, so overflow is absorbed by the whole column rather than piling two
    // labels onto the same spot.
    ys[ys.length - 1] = Math.min(ys[ys.length - 1], bottom);
    for (let i = ys.length - 2; i >= 0; i -= 1) {
      ys[i] = Math.min(ys[i], ys[i + 1] - gap);
    }
    // A group that is now above the top edge is pushed down once more; the gap
    // cap guarantees this pass cannot re-introduce an overlap.
    ys[0] = Math.max(ys[0], top);
    for (let i = 1; i < ys.length; i += 1) {
      ys[i] = Math.max(ys[i], ys[i - 1] + gap);
    }

    group.forEach((annotation, i) => {
      placed.push({
        annotation,
        side,
        labelY: ys[i],
        anchorX: CALLOUT_GUTTER + (annotation.x * CALLOUT_ART) / 100,
        anchorY: annotation.y,
      });
    });
  });

  return placed;
}

/**
 * Callout gutters sit outside the artwork, so the frame is wider than the
 * picture. This converts an artwork width cap into the frame width cap that
 * keeps the picture itself at the intended size.
 */
export function calloutFrameMaxWidth(artMaxWidth: string): string {
  return `calc((${artMaxWidth}) / ${(CALLOUT_ART / 100).toFixed(4)})`;
}

/**
 * Would direct labels collide once the artwork is phone-sized?
 *
 * Worked out from the authored coordinates and the label text, in percentage
 * space, against a nominal 330px-wide phone rendering — deterministic, so the
 * answer is the same on the server, before hydration and after. Count alone is
 * not enough: two long compound labels sitting side by side collide where four
 * short ones spread down the picture do not.
 */
export function labelsCollideWhenSmall(
  annotations: { label: string; x: number; y: number }[],
  aspect: number,
): boolean {
  const NOMINAL_W = 330;
  const NOMINAL_H = NOMINAL_W / aspect;
  const CHAR_W = 5.6;
  const LINE_H = 13.5;
  const MAX_W = NOMINAL_W * 0.46;

  const boxes = annotations.map((a) => {
    const textW = Math.min(MAX_W, a.label.length * CHAR_W);
    const lines = Math.max(1, Math.ceil((a.label.length * CHAR_W) / MAX_W));
    const w = ((textW + 16) / NOMINAL_W) * 100;
    const h = ((lines * LINE_H + 6) / NOMINAL_H) * 100;
    // Mirrors the edge-aware anchoring the chips themselves use.
    const left = a.x < 15 ? a.x : a.x > 85 ? a.x - w : a.x - w / 2;
    const top = a.y < 12 ? a.y : a.y > 88 ? a.y - h : a.y - h / 2;
    return { left, top, right: left + w, bottom: top + h };
  });

  for (let i = 0; i < boxes.length; i += 1) {
    for (let j = i + 1; j < boxes.length; j += 1) {
      const a = boxes[i];
      const b = boxes[j];
      if (a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom) {
        return true;
      }
    }
  }
  return false;
}
