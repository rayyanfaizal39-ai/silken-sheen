import {
  textFor,
  type LocalizedText,
  type MathVisualLang,
  type VisualText,
} from "./mathQuestionVisual";
export type Coordinate = [number, number];
export type CoordinateDomain = [number, number, number, number]; // xmin, xmax, ymin, ymax
export type CoordinateLine = {
  a: number;
  b: number;
  c: number;
  label?: VisualText;
  dashed?: boolean;
};
export type MathCoordinateVisual = {
  kind: "coordinate-plane";
  title: LocalizedText;
  description: LocalizedText;
  domain: CoordinateDomain;
  step: number;
  points?: { at: Coordinate; name: string; offset?: Coordinate }[];
  lines?: CoordinateLine[];
  paths?: { points: Coordinate[]; closed?: boolean; dashed?: boolean }[];
  circles?: { centre: Coordinate; radius: number; dashed?: boolean }[];
};
/** Intersect ax + by = c with the visible rectangle, including vertical lines. */
export function clipCoordinateLine(
  { a, b, c }: CoordinateLine,
  [xmin, xmax, ymin, ymax]: CoordinateDomain,
): [Coordinate, Coordinate] | undefined {
  if (
    ![a, b, c, xmin, xmax, ymin, ymax].every(Number.isFinite) ||
    (a === 0 && b === 0)
  )
    return;
  const points: Coordinate[] = [];
  const add = (x: number, y: number) => {
    const eps = 1e-8;
    if (x < xmin - eps || x > xmax + eps || y < ymin - eps || y > ymax + eps)
      return;
    if (
      !points.some((p) => Math.abs(p[0] - x) < eps && Math.abs(p[1] - y) < eps)
    )
      points.push([x, y]);
  };
  if (b !== 0) {
    add(xmin, (c - a * xmin) / b);
    add(xmax, (c - a * xmax) / b);
  }
  if (a !== 0) {
    add((c - b * ymin) / a, ymin);
    add((c - b * ymax) / a, ymax);
  }
  return points.length >= 2 ? [points[0], points[1]] : undefined;
}
/** One scale for BOTH coordinates: distance, slope angles and circles remain faithful. */
export function coordinateTransform([
  xmin,
  xmax,
  ymin,
  ymax,
]: CoordinateDomain) {
  const scale = Math.min(220 / (xmax - xmin), 220 / (ymax - ymin));
  const left = (300 - (xmax - xmin) * scale) / 2;
  const top = (280 - (ymax - ymin) * scale) / 2;
  return {
    scale,
    point: ([x, y]: Coordinate): Coordinate => [
      left + (x - xmin) * scale,
      top + (ymax - y) * scale,
    ],
  };
}
export function describeMathCoordinateVisual(
  visual: MathCoordinateVisual,
  lang: MathVisualLang,
) {
  const points = visual.points
    ?.map((p) => `${p.name} (${p.at.join(", ")})`)
    .join("; ");
  const lines = visual.lines
    ?.filter((l) => l.label)
    .map((l) => textFor(l.label!, lang))
    .join("; ");
  const circles = visual.circles
    ?.map(
      (c) =>
        `${lang === "bm" ? "Bulatan berpusat" : "Circle centred at"} (${c.centre.join(", ")}), ${lang === "bm" ? "jejari" : "radius"} ${c.radius}${c.dashed ? (lang === "bm" ? ", putus-putus" : ", dashed") : ""}`,
    )
    .join("; ");
  return `${visual.title[lang]}. ${visual.description[lang]}. ${lang === "bm" ? "Skala unit yang sama pada kedua-dua paksi" : "Equal unit scales on both axes"}. ${points || ""}. ${lines || ""}. ${circles || ""}`;
}
