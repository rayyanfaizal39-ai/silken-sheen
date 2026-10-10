import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import type { MathInequalityVisual } from "@/features/quiz/visuals/mathInequalityVisual";

const t = (bm: string, dlp: string) => ({ bm, dlp });
type Axis = Extract<MathInequalityVisual, { kind: "inequality-reference-axis" }>;
type Tracks = Extract<MathInequalityVisual, { kind: "inequality-tracks" }>;
type Options = Extract<MathInequalityVisual, { kind: "inequality-options" }>;
type Track = Tracks["tracks"][number];
type Choice = Options["options"][number];

const axis = (
  bm: string, dlp: string, min: number, max: number, step: number, ...markers: number[]
): Axis => ({
  kind: "inequality-reference-axis", title: t(bm, dlp), min, max, step, markers,
});
const tracks = (
  bm: string, dlp: string, min: number, max: number, step: number, ...conditions: Track[]
): Tracks => ({
  kind: "inequality-tracks", title: t(bm, dlp), min, max, step, tracks: conditions,
});
const options = (
  bm: string, dlp: string, min: number, max: number, step: number,
  boundary: number, ...choices: Choice[]
): Options => ({
  kind: "inequality-options", title: t(bm, dlp), min, max, step, boundary,
  options: choices,
});
const rightOpen = { direction: "right", inclusive: false } as const;
const leftOpen = { direction: "left", inclusive: false } as const;
const rightClosed = { direction: "right", inclusive: true } as const;
const leftClosed = { direction: "left", inclusive: true } as const;

/**
 * Form 1 Mathematics Chapter 7 (Linear Inequalities).
 *
 * For question types that ask WHICH number-line representation is correct,
 * show all four candidate diagrams in the SAME order as existing A–D answers,
 * with no highlighted candidate. Word-problem references mark thresholds but
 * deliberately show neither inclusion nor direction. When original conditions
 * are already written as inequalities, plot each given condition on its OWN
 * track; never calculate, shade or label the compound intersection.
 *
 * BM and DLP refer to exactly these shared objects.
 */
export const MATH_F1_C7_QUIZ_VISUALS = {
  // Foundation: threshold situations and number-line option illustrations.
  minMark50: axis("Markah lulus minimum", "Minimum passing mark", 40, 60, 5, 50),
  speedLimit110: axis("Had laju yang diberi", "Given speed limit", 90, 120, 10, 110),
  ageExceeds12: axis("Umur rujukan", "Reference age", 9, 16, 1, 12),
  temperature25: axis("Suhu rujukan", "Reference temperature", 21, 29, 2, 25),
  compareNegatives: axis("Kedudukan integer pada garis nombor", "Positions of integers on a number line",
    -8, 5, 1, -5, -3),
  optionsLessMinus2: options(
    "Empat pilihan rajah untuk x < −2", "Four diagrams for x < −2",
    -5, 1, 1, -2, rightOpen, leftOpen, leftClosed, rightClosed,
  ),
  optionsGte1: options(
    "Empat pilihan rajah untuk x ≥ 1", "Four diagrams for x ≥ 1",
    -2, 4, 1, 1, rightOpen, leftOpen, leftClosed, rightClosed,
  ),
  atMostMinus1: tracks("Syarat pada garis nombor", "Given condition on a number line",
    -4, 4, 1, { label: "x ≤ −1", upper: -1, includeUpper: true }),
  notLessThanSeven: axis("Nilai rujukan 7", "Reference value 7", 3, 11, 1, 7),

  // Practice: already-given solution regions, with no prelisted integer answer.
  greaterThan3: tracks("Nombor bulat bagi x > 3", "Integers for x > 3",
    -1, 8, 1, { label: "x > 3", lower: 3 }),
  atMostTwo: tracks("Nombor bulat bagi x ≤ 2", "Integers for x ≤ 2",
    -3, 6, 1, { label: "x ≤ 2", upper: 2, includeUpper: true }),
  betweenMinusOneFour: tracks("Satu julat yang diberi", "One given interval",
    -3, 6, 1, { label: "−1 < x ≤ 4", lower: -1, upper: 4, includeUpper: true }),
  betweenTwoSeven: tracks("Satu julat yang diberi", "One given interval",
    0, 9, 1, { label: "2 ≤ x < 7", lower: 2, upper: 7, includeLower: true }),
  betweenOneFive: tracks("Satu julat yang diberi", "One given interval",
    -1, 7, 1, { label: "1 < x < 5", lower: 1, upper: 5 }),
  optionsAtNine: options(
    "Empat pilihan rajah untuk penyelesaian", "Four candidate solution diagrams",
    6, 12, 1, 9, rightOpen, rightClosed, leftOpen, leftClosed,
  ),
  greaterThanMinus3: tracks("Nombor bulat bagi x > −3", "Integers for x > −3",
    -6, 3, 1, { label: "x > −3", lower: -3 }),
  lessThanFive: tracks("Nombor bulat bagi x < 5", "Integers for x < 5",
    0, 8, 1, { label: "x < 5", upper: 5 }),

  // Challenge: separate *given* conditions to let students find the common region.
  betweenGivenMinusOneThree: tracks("Dua syarat serentak", "Two simultaneous conditions",
    -3, 5, 1,
    { label: "x > −1", lower: -1 },
    { label: "x ≤ 3", upper: 3, includeUpper: true },
  ),
  bothGreaterTwoFive: tracks("Dua syarat ke kanan", "Two rightward conditions",
    0, 8, 1,
    { label: "x > 2", lower: 2 },
    { label: "x > 5", lower: 5 },
  ),
  bothLessFourOne: tracks("Dua syarat ke kiri", "Two leftward conditions",
    -2, 7, 1,
    { label: "x ≤ 4", upper: 4, includeUpper: true },
    { label: "x ≤ 1", upper: 1, includeUpper: true },
  ),
  disjointFiveTwo: tracks("Dua syarat serentak", "Two simultaneous conditions",
    0, 8, 1,
    { label: "x > 5", lower: 5 },
    { label: "x < 2", upper: 2 },
  ),
  disjointFourOne: tracks("Dua syarat serentak", "Two simultaneous conditions",
    -1, 7, 1,
    { label: "x ≥ 4", lower: 4, includeLower: true },
    { label: "x ≤ 1", upper: 1, includeUpper: true },
  ),
  ticketFiveTwenty: axis("Harga tiket: dua nilai rujukan", "Ticket price: two reference values",
    0, 25, 5, 5, 20),
  participantAge12To18: axis("Umur peserta: dua nilai rujukan", "Participant ages: two reference values",
    10, 20, 2, 12, 18),
  schoolbagOneFive: axis("Jisim beg sekolah", "School bag weight",
    0, 6, 1, 1, 5),
  bothGreaterTwoMinusOne: tracks("Dua syarat ke kanan", "Two rightward conditions",
    -3, 5, 1,
    { label: "x ≥ 2", lower: 2, includeLower: true },
    { label: "x > −1", lower: -1 },
  ),
  bothLessThreeSeven: tracks("Dua syarat ke kiri", "Two leftward conditions",
    0, 9, 1,
    { label: "x < 3", upper: 3 },
    { label: "x ≤ 7", upper: 7, includeUpper: true },
  ),
  betweenMinusFourMinusOne: tracks("Dua syarat serentak", "Two simultaneous conditions",
    -6, 2, 1,
    { label: "x > −4", lower: -4 },
    { label: "x ≤ −1", upper: -1, includeUpper: true },
  ),
  youngWorkers18to25: axis("Umur pekerja yang diberi", "Given worker-age bounds",
    16, 28, 2, 18, 25),
  compareOpenClosed: tracks("Dua julat untuk dibandingkan", "Two intervals to compare",
    0, 7, 1,
    { label: "2 < x < 5", lower: 2, upper: 5 },
    { label: "2 ≤ x ≤ 5", lower: 2, upper: 5, includeLower: true, includeUpper: true },
  ),
  ropeThreeEight: axis("Had panjang tali", "Rope length bounds",
    1, 10, 1, 3, 8),
  betweenZeroFive: tracks("Dua syarat serentak", "Two simultaneous conditions",
    -2, 7, 1,
    { label: "x > 0", lower: 0 },
    { label: "x ≤ 5", upper: 5, includeUpper: true },
  ),
} satisfies Record<string, MathQuestionVisual>;
