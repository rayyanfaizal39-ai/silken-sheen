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
  }[];
  circles?: { centre: GeometryPoint; radius: number }[];
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
};
export function describeMathGeometryVisual(
  visual: MathGeometryVisual,
  lang: MathVisualLang,
) {
  return `${visual.title[lang]}. ${visual.panels.map((p) => `${p.title[lang]}. ${p.description[lang]}. ${p.labels.map((l) => textFor(l.text, lang)).join("; ")}`).join(". ")}. ${lang === "bm" ? "Rajah tidak mengikut skala" : "Diagram not to scale"}.`;
}
