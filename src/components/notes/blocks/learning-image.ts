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

export type LearningImageSize =
  | "compact"
  | "standard"
  | "wide"
  | "portrait"
  /** Contextual artwork — see the second group in LEARNING_IMAGE_VARIANTS. */
  | "scene"
  | "sceneTall"
  | "panel"
  | "pair"
  /** Text-in-artwork diagrams — see the third group in LEARNING_IMAGE_VARIANTS. */
  | "diagram";

type Variant = {
  /** Hard ceiling on rendered width, in px. */
  maxWidth: number;
  /**
   * Height budget as a CSS `min()` expression — viewport-aware. Omit (see
   * `minWidth`) for artwork that must be sized by width alone.
   */
  heightBudget?: string;
  /**
   * Hard floor on rendered width, in px — for artwork whose own embedded
   * text must stay legible no matter how narrow the viewport is. Below this
   * width the frame keeps its width and its wrapper scrolls horizontally
   * instead of the artwork continuing to shrink. Implies no `heightBudget`:
   * a vh-based cap would fight the floor on short viewports, so a variant
   * with `minWidth` is sized by width alone and lets height follow the
   * aspect ratio.
   */
  minWidth?: number;
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

  // --- Contextual artwork ----------------------------------------------
  // A second, tighter group for photographic/illustrated scenes that give a
  // concept its everyday context. They sit *beside* a precise diagram rather
  // than replacing it, so they must stay visibly smaller than the diagram
  // variants above — a recognition picture should never be the biggest thing
  // in the lesson. The numbers are the Chapter 8 display caps generalised
  // (see Chapter8PhotoFigure): 600px lands a 16:9 scene at ~338px tall and
  // 660px at ~371px, inside the intended 340-380px visual-height band.

  /** One scene or object, 16:9-ish. */
  scene: { maxWidth: 600, heightBudget: "min(40vh, 350px)" },
  /**
   * A near-square contextual scene. A 4:3 picture under `scene` would be held
   * to ~467px by the width cap and read as an afterthought, so it gets its own
   * cap; the height budget still binds first, at ~507 x 380.
   */
  sceneTall: { maxWidth: 560, heightBudget: "min(46vh, 380px)" },
  /** A comparison or multi-panel scene that needs the extra width to read. */
  panel: { maxWidth: 660, heightBudget: "min(44vh, 380px)" },
  /** One half of a matched pair shown side by side on desktop. */
  pair: { maxWidth: 460, heightBudget: "min(34vh, 300px)" },

  // --- Text-in-artwork diagrams ------------------------------------------
  // A third group for artwork that bakes its own labels and explanatory text
  // into the picture (a titration set-up, say) rather than relying on
  // `AnnotatedImage`'s own label/callout layer. A vh-based height cap would
  // shrink that baked-in text below reading size on any laptop with a modest
  // window height, so this group sizes by width alone and gives it a floor.

  /** Wide labelled apparatus/process artwork. Width-only; see `minWidth`. */
  diagram: { maxWidth: 900, minWidth: 760 },
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
  if (!variant.heightBudget) return `${variant.maxWidth}px`;
  const ratio = parseAspectRatio(aspect);
  return `min(${variant.maxWidth}px, calc(${variant.heightBudget} * ${ratio.toFixed(4)}))`;
}

/**
 * The `min-width` value for a figure, if its variant sets a readability
 * floor. Pair with a horizontally-scrolling wrapper: below this width the
 * frame keeps its size and overflows sideways rather than shrinking further.
 */
export function learningImageMinWidth(size: LearningImageSize): number | undefined {
  return LEARNING_IMAGE_VARIANTS[size].minWidth;
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
