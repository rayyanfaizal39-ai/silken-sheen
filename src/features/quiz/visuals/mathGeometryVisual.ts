import {
  textFor,
  type LocalizedText,
  type MathVisualLang,
  type VisualText,
} from "./mathQuestionVisual";

export type GeometryPoint = [number, number];
/** Coordinates control presentation; labels contain only givens and unknowns. */
export type GeometryPanel = {
  title: LocalizedText;
  description: LocalizedText;
  paths?: {
    points: GeometryPoint[];
    closed?: boolean;
    dashed?: boolean;
    fill?: boolean;
    /** Stronger tint marking a face or region the question is about. */
    shade?: boolean;
    /**
     * "accent" draws a sky-blue line (e.g. one highlighted edge or an image
     * shape, tinted blue when closed); "muted" a slate line (axes, mirrors).
     */
    tone?: "accent" | "muted";
  }[];
  circles?: {
    centre: GeometryPoint;
    radius: number;
    /** "none" leaves the inside clear, "shade" marks an area; default is a faint tint. */
    fill?: "none" | "shade";
    /** "accent" draws a sky-blue outline (e.g. a pond), "muted" a slate guide line, instead of gold. */
    tone?: "accent" | "muted";
    dashed?: boolean;
  }[];
  /** Shaded ring between two concentric circles (the region left over). */
  rings?: { centre: GeometryPoint; outer: number; inner: number }[];
  /** Small solid points, e.g. a circle's centre. */
  dots?: GeometryPoint[];
  arcs?: {
    centre: GeometryPoint;
    radius: number;
    start: number;
    end: number;
  }[];
  labels: {
    at: GeometryPoint;
    text: VisualText;
    anchor?: "start" | "middle" | "end";
    /** Colour matching an accent (image) or muted (axis) element. */
    tone?: "accent" | "muted";
    /** "sm" for secondary text such as axis numbers. */
    size?: "sm";
  }[];
  grid?: { origin: GeometryPoint; columns: number; rows: number; step: number };
  /** Canvas [width, height] the coordinates are drawn in; defaults to 300 × 240. */
  viewBox?: [number, number];
};
export type MathGeometryVisual = {
  kind: "geometry-diagram";
  title: LocalizedText;
  panels: GeometryPanel[];
  /**
   * "compact" draws a small textbook-style figure sized to its content: thin
   * outline, panel title as the caption, labels beneath. Omit for the standard
   * layout used by quizzes and other chapters.
   */
  layout?: "compact";
  /**
   * "natural" draws the compact figure at its viewBox size (1 unit = 1px,
   * shrinking only to fit), so text keeps one size however the canvas is cropped.
   */
  size?: "natural";
  /** false omits the "not to scale" note, e.g. for unmeasured vocabulary sketches. */
  notToScale?: boolean;
};
export function describeMathGeometryVisual(
  visual: MathGeometryVisual,
  lang: MathVisualLang,
) {
  const scale = visual.notToScale === false ? "" : ` ${lang === "bm" ? "Rajah tidak mengikut skala" : "Diagram not to scale"}.`;
  return `${visual.title[lang]}. ${visual.panels.map((p) => `${p.title[lang] ? `${p.title[lang]}. ` : ""}${p.description[lang]}. ${p.labels.map((l) => textFor(l.text, lang)).join("; ")}`).join(". ")}.${scale}`;
}
