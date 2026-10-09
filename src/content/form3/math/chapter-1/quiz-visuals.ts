import type { MathIndicesVisual } from "@/features/quiz/visuals/mathIndicesVisual";

const title = (bm: string, dlp: string) => ({ bm, dlp });
const repeat = (factor: string, count: number) =>
  Array.from({ length: count }, () => factor);
const product = (groups: string[][], label?: string) => ({
  operation: "product" as const,
  groups,
  label,
});
const quotient = (numerator: string[], denominator: string[]) => ({
  operation: "quotient" as const,
  groups: [numerator, denominator],
});
const factorsTitle = title("Pendaraban berulang", "Repeated multiplication");
const equationsTitle = title("Persamaan indeks", "Index equations");
const notation = {
  kind: "index-notation",
  title: title("Tatatanda indeks", "Index notation"),
  base: "a",
  exponent: "n",
} as const;

/** Keyed by the preserved question number; shared by BM and DLP. No solutions. */
export const MATH_F3_C1_QUIZ_VISUALS: Partial<
  Record<number, MathIndicesVisual>
> = {
  1: notation,
  2: notation,
  3: {
    kind: "factor-groups",
    title: factorsTitle,
    rows: [product([repeat("5", 6)])],
  },
  4: {
    kind: "factor-groups",
    title: factorsTitle,
    rows: [product([repeat("(-2)", 3)])],
  },
  5: {
    kind: "factor-groups",
    title: factorsTitle,
    rows: [product([repeat("4", 3)], "4^3")],
  },
  11: {
    kind: "factor-groups",
    title: factorsTitle,
    rows: [product([repeat("7", 2), repeat("7", 3)], "7^2 × 7^3")],
  },
  12: {
    kind: "factor-groups",
    title: title("Pembahagian", "Division"),
    rows: [quotient(repeat("4", 5), repeat("4", 2))],
  },
  13: {
    kind: "factor-groups",
    title: factorsTitle,
    rows: [product([repeat("3", 4), repeat("3", 4)], "(3^4)^2")],
  },
  15: {
    kind: "unit-cube",
    title: title("Punca kuasa tiga bagi 8", "Cube root of 8"),
    divisions: 2,
    volume: 8,
    edge: "x",
  },
  16: {
    kind: "factor-groups",
    title: factorsTitle,
    rows: [
      product([
        ["2", "k", "k"],
        ["4", "k", "k", "k"],
      ]),
    ],
  },
  21: {
    kind: "factor-groups",
    title: factorsTitle,
    rows: [
      product([repeat("m", 3), repeat("n", 2), repeat("m", 4), repeat("n", 5)]),
    ],
  },
  22: {
    kind: "factor-groups",
    title: title("Pembahagian", "Division"),
    rows: [quotient(["25", "x^2", "y^3"], ["5", "x", "y"])],
  },
  24: {
    kind: "factor-groups",
    title: factorsTitle,
    rows: [
      product(
        [
          ["5", "m^4", "n^3"],
          ["5", "m^4", "n^3"],
        ],
        "(5m^4n^3)^2",
      ),
    ],
  },
  28: {
    kind: "factor-groups",
    title: title("Pembahagian", "Division"),
    rows: [quotient(repeat("2", 3), repeat("2", 5))],
  },
  34: {
    kind: "fraction-area",
    title: title("(2/4)^2", "(2/4)^2"),
    divisions: 4,
    shadedRows: 2,
    shadedColumns: 2,
    side: "2/4",
  },
  38: {
    kind: "factor-groups",
    title: title("Bandingkan", "Compare"),
    rows: [
      product([repeat("4", 2), repeat("4", 2), repeat("4", 2)], "(4^2)^3"),
      product([repeat("4", 3), repeat("4", 3)], "(4^3)^2"),
    ],
  },
  41: {
    kind: "index-equations",
    title: equationsTitle,
    rows: [
      { left: "25^m × 5^n", right: "5^8" },
      { left: "2^m × 2^(-n)", right: "2" },
    ],
  },
  42: {
    kind: "index-equations",
    title: equationsTitle,
    rows: [
      { left: "16(4^x)", right: "16^y" },
      { left: "3(9^x)", right: "27^y" },
    ],
  },
  48: {
    kind: "index-equations",
    title: title("Lengkapkan", "Complete"),
    rows: [{ left: "5^6", right: "5^? × 5^5" }],
  },
  49: {
    kind: "index-equations",
    title: title("Lengkapkan", "Complete"),
    rows: [{ left: "5^12 ÷ 5^?", right: "5^2" }],
  },
  50: {
    kind: "index-equations",
    title: title("Lengkapkan", "Complete"),
    rows: [{ left: "(5^?)^3", right: "5^9" }],
  },
  53: {
    kind: "index-equations",
    title: title("Lengkapkan rajah", "Complete the diagram"),
    rows: [
      { left: "5^9", right: "5^p × 5^5" },
      { left: "(1/5)^q", right: "5^(-3)" },
      { left: "5^r", right: "1/(5^3)" },
    ],
  },
  54: {
    kind: "index-equations",
    title: equationsTitle,
    rows: [
      { label: "Chong", left: "16(4^x)", right: "16^y" },
      { label: "Navin", left: "3(9^x)", right: "27^y" },
    ],
  },
  58: {
    kind: "index-equations",
    title: title("Langkah yang diberikan", "Given working"),
    rows: [{ left: "(-2)^3", right: "(-2) × 3 = -6" }],
  },
};
