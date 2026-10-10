/**
 * Declarative data displays for Maths objective quiz questions.
 *
 * A question carries plain data (never JSX or image files); the quiz screen
 * renders it with small static SVG/table components (MathQuestionVisual).
 * BM and DLP questions share ONE visual object, so both languages always read
 * identical data. Text is either language-neutral (a plain string such as
 * "1A", "2021" or "41–50") or a { bm, dlp } pair.
 */
import { describeMathIndicesVisual, type MathIndicesVisual } from "./mathIndicesVisual";
import { describeMathStandardFormVisual, type MathStandardFormVisual } from "./mathStandardFormVisual";

import { describeMathFinanceVisual, type MathFinanceVisual } from "./mathFinanceVisual";
import { describeMathGeometryVisual, type MathGeometryVisual } from "./mathGeometryVisual";
import { describeMathInequalityVisual, type MathInequalityVisual } from "./mathInequalityVisual";

export type MathVisualLang = "bm" | "dlp";
export type LocalizedText = Record<MathVisualLang, string>;
export type VisualText = string | LocalizedText;

export type MathQuestionVisual =
  | MathInequalityVisual
  | MathGeometryVisual
  | MathFinanceVisual
  | MathIndicesVisual
  | MathStandardFormVisual
  | {
      kind: "frequency-table";
      title: LocalizedText;
      valueHeading: LocalizedText;
      frequencyHeading: LocalizedText;
      rows: { value: VisualText; frequency: number }[];
    }
  | {
      kind: "bar-chart";
      title: LocalizedText;
      yLabel: LocalizedText;
      bars: { label: VisualText; value: number }[];
    }
  | {
      kind: "histogram";
      title: LocalizedText;
      xLabel: LocalizedText;
      yLabel: LocalizedText;
      classes: { label: string; frequency: number }[];
    }
  | {
      kind: "line-graph" | "frequency-polygon";
      title: LocalizedText;
      xLabel: LocalizedText;
      yLabel: LocalizedText;
      xLabels: VisualText[];
      series: { name?: VisualText; values: number[] }[];
      /** Print each point's value beside it (default true). Trend-only graphs turn it off. */
      showValues?: boolean;
    }
  | {
      kind: "pie-chart";
      title: LocalizedText;
      /** Each sector is drawn at `angle` degrees and labelled with `text` (e.g. "40%", "144°", "x"). */
      sectors: { label: VisualText; angle: number; text: string }[];
    }
  | {
      kind: "number-line";
      title: LocalizedText;
      min: number;
      max: number;
      ticks: { value: number; label?: VisualText }[];
      /** Optional equally styled points; none of them is treated as the answer. */
      points?: { value: number; label?: VisualText }[];
      /** Movement is stored as direction + step count so accessibility text never needs a hidden answer. */
      movement?: {
        from: number;
        direction: "left" | "right";
        steps: number;
        label: LocalizedText;
      };
      /** A span marks two positions while leaving the distance for the student to determine. */
      span?: { from: number; to: number; label: LocalizedText };
    }
  | {
      kind: "dot-plot";
      title: LocalizedText;
      xLabel: LocalizedText;
      /** Number line from min to max in steps of 1; one dot per value. */
      min: number;
      max: number;
      values: number[];
    }
  | {
      kind: "stem-leaf";
      title: LocalizedText;
      values: number[];
      key: LocalizedText;
    };

export const textFor = (text: VisualText, lang: MathVisualLang) =>
  typeof text === "string" ? text : text[lang];

/** 0-based axis: a 1/2/5 × 10ⁿ step giving at most six intervals up to the largest value. */
export function axisScale(maxValue: number): { step: number; top: number } {
  for (let power = 1; ; power *= 10) {
    for (const base of [1, 2, 2.5, 5]) {
      const step = base * power;
      if (Number.isInteger(step) && Math.ceil(maxValue / step) <= 6) {
        return { step, top: Math.max(step, Math.ceil(maxValue / step) * step) };
      }
    }
  }
}

/** Counts per value, smallest value first. */
export function dotPlotCounts(values: readonly number[]): [number, number][] {
  const counts = new Map<number, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()].sort(([a], [b]) => a - b);
}

/** Stem → sorted leaves for two-digit whole numbers, including empty stems in between. */
export function stemLeafRows(values: readonly number[]): [number, number[]][] {
  const stems = values.map((value) => Math.floor(value / 10));
  const rows: [number, number[]][] = [];
  for (let stem = Math.min(...stems); stem <= Math.max(...stems); stem += 1) {
    rows.push([
      stem,
      values
        .filter((value) => Math.floor(value / 10) === stem)
        .map((value) => value % 10)
        .sort((a, b) => a - b),
    ]);
  }
  return rows;
}

const KIND_NAMES: Record<MathQuestionVisual["kind"], LocalizedText> = {
  "inequality-reference-axis": { bm: "Garis nombor rujukan", dlp: "Reference number line" },
  "inequality-tracks": { bm: "Ketaksamaan pada garis nombor", dlp: "Inequalities on number lines" },
  "inequality-options": { bm: "Empat pilihan garis nombor", dlp: "Four number-line choices" },
  "geometry-diagram": { bm: "Rajah geometri", dlp: "Geometry diagram" },
  "finance-model": { bm: "Model kewangan", dlp: "Finance model" },
  "place-value": { bm: "Nilai tempat", dlp: "Place value" },
  "standard-form-parts": { bm: "Bentuk piawai", dlp: "Standard form" },
  "standard-form-operation": { bm: "Operasi bentuk piawai", dlp: "Standard form operation" },
  "right-triangle": { bm: "Segitiga bersudut tegak", dlp: "Right-angled triangle" },
  "measurement-model": { bm: "Model ukuran", dlp: "Measurement model" },
  "distance-comparison": { bm: "Perbandingan jarak", dlp: "Distance comparison" },
  "storage-capacity": { bm: "Kapasiti storan", dlp: "Storage capacity" },
  "index-notation": { bm: "Tatatanda indeks", dlp: "Index notation" },
  "factor-groups": { bm: "Pendaraban berulang", dlp: "Repeated multiplication" },
  "index-equations": { bm: "Persamaan indeks", dlp: "Index equations" },
  "unit-cube": { bm: "Kubus unit", dlp: "Unit cube" },
  "fraction-area": { bm: "Model luas pecahan", dlp: "Fractional area model" },
  "frequency-table": { bm: "Jadual kekerapan", dlp: "Frequency table" },
  "bar-chart": { bm: "Carta palang", dlp: "Bar chart" },
  histogram: { bm: "Histogram", dlp: "Histogram" },
  "line-graph": { bm: "Graf garis", dlp: "Line graph" },
  "frequency-polygon": { bm: "Poligon kekerapan", dlp: "Frequency polygon" },
  "pie-chart": { bm: "Carta pai", dlp: "Pie chart" },
  "number-line": { bm: "Garis nombor", dlp: "Number line" },
  "dot-plot": { bm: "Plot titik", dlp: "Dot plot" },
  "stem-leaf": { bm: "Plot batang-dan-daun", dlp: "Stem-and-leaf plot" },
};

/**
 * Screen-reader text for a visual: its type, title and every data value, so
 * the question can be answered without seeing the chart. It lists data only
 * and never states which option is correct.
 */
export function describeMathQuestionVisual(visual: MathQuestionVisual, lang: MathVisualLang) {
  const bm = lang === "bm";
  const head = `${KIND_NAMES[visual.kind][lang]}: ${visual.title[lang]}.`;
  const pairs = (items: [VisualText, number | string][]) =>
    items.map(([label, value]) => `${textFor(label, lang)}: ${value}`).join("; ");
  switch (visual.kind) {
    case "inequality-reference-axis":
    case "inequality-tracks":
    case "inequality-options":
      return describeMathInequalityVisual(visual, lang);
    case "geometry-diagram":
      return describeMathGeometryVisual(visual, lang);
    case "finance-model":
      return describeMathFinanceVisual(visual, lang);
    case "place-value":
    case "standard-form-parts":
    case "standard-form-operation":
    case "right-triangle":
    case "measurement-model":
    case "distance-comparison":
    case "storage-capacity":
      return describeMathStandardFormVisual(visual, lang);
    case "index-notation":
    case "factor-groups":
    case "index-equations":
    case "unit-cube":
    case "fraction-area":
      return describeMathIndicesVisual(visual, lang);
    case "frequency-table":
      return `${head} ${pairs(visual.rows.map((row) => [row.value, row.frequency]))}.`;
    case "bar-chart":
      return `${head} ${pairs(visual.bars.map((bar) => [bar.label, bar.value]))}.`;
    case "histogram":
      return `${head} ${pairs(visual.classes.map((entry) => [entry.label, entry.frequency]))}.`;
    case "line-graph":
    case "frequency-polygon":
      return `${head} ${visual.series
        .map(
          (series) =>
            `${series.name ? `${textFor(series.name, lang)} — ` : ""}${pairs(
              visual.xLabels.map((label, index) => [label, series.values[index]]),
            )}`,
        )
        .join(". ")}.`;
    case "pie-chart":
      return `${head} ${pairs(visual.sectors.map((sector) => [sector.label, sector.text]))}.`;
    case "number-line": {
      const tickText = visual.ticks
        .map((tick) => tick.label === undefined ? String(tick.value) : textFor(tick.label, lang))
        .join(", ");
      const points = visual.points?.length
        ? ` ${bm ? "Titik ditanda" : "Marked points"}: ${visual.points
            .map((point) =>
              point.label === undefined ? String(point.value) : textFor(point.label, lang),
            )
            .join(", ")}.`
        : "";
      const movement = visual.movement
        ? ` ${bm ? "Bermula pada" : "Starts at"} ${visual.movement.from}; ${visual.movement.label[lang]}.`
        : "";
      const span = visual.span
        ? ` ${bm ? "Titik hujung" : "End points"}: ${visual.span.from} ${bm ? "dan" : "and"} ${visual.span.to}. ${visual.span.label[lang]}.`
        : "";
      return `${head} ${bm ? "Tanda skala" : "Scale marks"}: ${tickText}.${points}${movement}${span}`;
    }
    case "dot-plot":
      return `${head} ${dotPlotCounts(visual.values)
        .map(
          ([value, count]) => `${value}: ${count} ${bm ? "titik" : count === 1 ? "dot" : "dots"}`,
        )
        .join("; ")}.`;
    case "stem-leaf":
      return `${head} ${stemLeafRows(visual.values)
        .map(
          ([stem, leaves]) =>
            `${bm ? "batang" : "stem"} ${stem}, ${bm ? "daun" : "leaves"} ${
              leaves.length ? leaves.join(" ") : bm ? "tiada" : "none"
            }`,
        )
        .join("; ")}. ${visual.key[lang]}.`;
  }
}
