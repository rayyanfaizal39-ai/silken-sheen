/**
 * Shared sizing system for learner-facing instructional images inside Notes.
 *
 * Single source of truth so a new chapter cannot reintroduce the poster-sized
 * artwork problem: an image dropped into a notes column with `w-full` and no
 * cap renders at the full column width, and for a tall aspect ratio its height
 * then exceeds the viewport.
 *
 * The fix is expressed as a **width** cap only. Given an intrinsic aspect ratio
 * R and a height budget H, the widest the figure may be is `H * R`; capping the
 * width at `min(variantWidth, H * R)` bounds the height without ever setting an
 * explicit height. That matters because `aspect-ratio` plus a clamped height
 * would letterbox the artwork inside its frame — this way the frame always hugs
 * the picture, at every viewport, with no measurement and no layout shift.
 */

export type LearningImageSize = "compact" | "standard" | "wide" | "portrait";

type Variant = {
  /** Hard ceiling on rendered width, in px. */
  maxWidth: number;
  /** Height budget as a CSS `min()` expression — viewport-aware. */
  heightBudget: string;
};

/**
 * Deliberately conservative: the notes column is ~830px on a 1440px screen, so
 * every variant stays visibly inside it rather than touching both edges.
 */
export const LEARNING_IMAGE_VARIANTS: Record<LearningImageSize, Variant> = {
  /** Single organism, simple apparatus, reference strips. */
  compact: { maxWidth: 520, heightBudget: "min(46vh, 380px)" },
  /** Default: classification sets, standard diagrams. */
  standard: { maxWidth: 700, heightBudget: "min(52vh, 470px)" },
  /** Multi-stage processes: nutrient cycles, pathway rows. */
  wide: { maxWidth: 780, heightBudget: "min(55vh, 500px)" },
  /** Tall anatomy. Width-constrained hard, because height follows width. */
  portrait: { maxWidth: 460, heightBudget: "min(58vh, 540px)" },
};

/** Parses `"3 / 4"`, `"16/9"` or `"1.5"` into a width ÷ height number. */
export function parseAspectRatio(aspect: string): number {
  const [w, h] = aspect.split("/").map((part) => Number(part.trim()));
  if (Number.isFinite(w) && Number.isFinite(h) && h > 0) return w / h;
  return Number.isFinite(w) && w > 0 ? w : 1.5;
}

/**
 * The `max-width` value for a figure. `100%` of the parent still applies via
 * `width: 100%`, so phones simply use the full inner card width.
 */
export function learningImageMaxWidth(size: LearningImageSize, aspect: string): string {
  const variant = LEARNING_IMAGE_VARIANTS[size];
  const ratio = parseAspectRatio(aspect);
  return `min(${variant.maxWidth}px, calc(${variant.heightBudget} * ${ratio.toFixed(4)}))`;
}

/**
 * Picks a sensible variant when content does not name one, so images added to
 * future chapters are bounded by default rather than filling the column.
 */
export function defaultLearningImageSize(aspect: string): LearningImageSize {
  const ratio = parseAspectRatio(aspect);
  if (ratio < 0.95) return "portrait";
  if (ratio >= 1.7) return "wide";
  return "standard";
}
