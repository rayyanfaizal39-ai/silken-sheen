import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";

/**
 * Number-line visuals for the Form 1 Chapter 1 (Rational Numbers) objective quizzes.
 * These are intentionally selective: only questions where position, direction or
 * distance on a number line is part of the mathematical idea receive a visual.
 * BM and DLP pairs share the same data object.
 */
const integerTicks = (min: number, max: number) =>
  Array.from({ length: max - min + 1 }, (_, index) => ({ value: min + index }));

export const MATH_F1_C1_QUIZ_VISUALS = {
  rightOfZero: {
    kind: "number-line",
    title: { bm: "Garis nombor integer", dlp: "Integer number line" },
    min: -3,
    max: 3,
    ticks: integerTicks(-3, 3),
  },
  compareNegativeIntegers: {
    kind: "number-line",
    title: { bm: "Kedudukan integer negatif", dlp: "Positions of negative integers" },
    min: -10,
    max: 0,
    ticks: [
      { value: -10 },
      { value: -8 },
      { value: -5 },
      { value: -2 },
      { value: 0 },
    ],
    points: [{ value: -10 }, { value: -8 }, { value: -5 }, { value: -2 }],
  },
  compareNegativeFractions: {
    kind: "number-line",
    title: { bm: "Kedudukan pecahan negatif", dlp: "Positions of negative fractions" },
    min: -2,
    max: 0,
    ticks: [
      { value: -2, label: "−2" },
      { value: -1, label: "−1" },
      { value: -0.75, label: "−3/4" },
      { value: -0.5, label: "−1/2" },
      { value: 0, label: "0" },
    ],
    points: [{ value: -2 }, { value: -1 }, { value: -0.75 }, { value: -0.5 }],
  },
  moveLeftEight: {
    kind: "number-line",
    title: { bm: "Pergerakan pada garis nombor", dlp: "Movement on a number line" },
    min: -12,
    max: 0,
    ticks: integerTicks(-12, 0),
    movement: {
      from: -3,
      direction: "left",
      steps: 8,
      label: { bm: "8 langkah ke kiri", dlp: "8 steps left" },
    },
  },
  moveRightSix: {
    kind: "number-line",
    title: { bm: "Pergerakan pada garis nombor", dlp: "Movement on a number line" },
    min: -10,
    max: 0,
    ticks: integerTicks(-10, 0),
    movement: {
      from: -9,
      direction: "right",
      steps: 6,
      label: { bm: "6 langkah ke kanan", dlp: "6 steps right" },
    },
  },
  distanceMinus7To4: {
    kind: "number-line",
    title: { bm: "Jarak pada garis nombor", dlp: "Distance on a number line" },
    min: -8,
    max: 5,
    ticks: integerTicks(-8, 5),
    points: [{ value: -7 }, { value: 4 }],
    span: {
      from: -7,
      to: 4,
      label: { bm: "Jarak ? unit", dlp: "Distance ? units" },
    },
  },
} satisfies Record<string, MathQuestionVisual>;
