import type { LocalizedText, MathVisualLang } from "./mathQuestionVisual";

export type MotionPoint = [time: number, value: number];

/**
 * A distance-time or speed-time graph drawn to a true linear scale from 0.
 * Only supplied readings are tick-labelled; gradients, areas and other
 * computed results are never written on the graph.
 */
export type MathMotionGraphVisual = {
  kind: "motion-graph";
  title: LocalizedText;
  description: LocalizedText;
  xLabel: LocalizedText;
  yLabel: LocalizedText;
  /** Axis extents in data units; both axes start at 0. */
  xMax: number;
  yMax: number;
  /** Values printed on each axis; every other point stays unlabelled. */
  xTicks: number[];
  yTicks: number[];
  /** One polyline per continuous section of the graph, in data coordinates. */
  segments: MotionPoint[][];
  /** Optional region under the graph to shade, closed back to the time axis. */
  shade?: MotionPoint[];
};

/** Plot area inside a 320 × 220 viewBox, shared by the renderer and its tests. */
export const MOTION_GRAPH_FRAME = { left: 52, right: 300, top: 18, bottom: 176 } as const;

export function motionGraphTransform(visual: Pick<MathMotionGraphVisual, "xMax" | "yMax">) {
  const { left, right, top, bottom } = MOTION_GRAPH_FRAME;
  return ([t, v]: MotionPoint): [number, number] => [
    left + (t / visual.xMax) * (right - left),
    bottom - (v / visual.yMax) * (bottom - top),
  ];
}

const formatValue = (value: number) => String(value).replace("-", "−");

export function describeMathMotionGraphVisual(visual: MathMotionGraphVisual, lang: MathVisualLang) {
  const bm = lang === "bm";
  const points = visual.segments
    .map((segment) => segment.map(([t, v]) => `(${formatValue(t)}, ${formatValue(v)})`).join(" → "))
    .join(bm ? "; kemudian " : "; then ");
  return `${visual.title[lang]}. ${visual.description[lang]}. ${bm ? "Paksi mengufuk" : "Horizontal axis"}: ${visual.xLabel[lang]}; ${bm ? "paksi mencancang" : "vertical axis"}: ${visual.yLabel[lang]}. ${bm ? "Graf melalui" : "Graph passes through"} ${points}.`;
}
