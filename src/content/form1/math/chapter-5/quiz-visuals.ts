import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";

type TileVisual = Extract<MathQuestionVisual, { kind: "algebra-tiles" }>;
type TileGroup = TileVisual["groups"][number];
type FactorVisual = Extract<MathQuestionVisual, { kind: "factor-groups" }>;

const t = (bm: string, dlp: string) => ({ bm, dlp });
const group = (
  symbol: string, count: number, operation: TileGroup["operation"] = "start",
): TileGroup => ({ symbol, count, operation });
const tiles = (bm: string, dlp: string, ...groups: TileGroup[]): TileVisual => ({
  kind: "algebra-tiles", title: t(bm, dlp), groups,
});
const jars = (jars: 1 | 3, loose?: { count: number; operation: "add" | "subtract" }) => ({
  kind: "algebra-jars" as const,
  title: t("Balang yang mengandungi n gula-gula", "Jars each containing n sweets"),
  jars, perJar: "n", ...(loose ? { loose } : {}),
});
const factors = (
  bm: string, dlp: string,
  operation: FactorVisual["rows"][number]["operation"],
  groups: string[][],
): FactorVisual => ({
  kind: "factor-groups", title: t(bm, dlp), rows: [{ operation, groups }],
});

/**
 * Only the original unsimplified algebra is visualized. No model contains the
 * answer or substitutes a new question. Identical keys are used in BM and DLP.
 */
export const MATH_F1_C5_QUIZ_VISUALS = {
  // Foundation: turn verbal expressions and abstract term identity into models.
  sweetsPlusSix: jars(1, { count: 6, operation: "add" }),
  sweetsMinusOne: jars(1, { count: 1, operation: "subtract" }),
  threeJars: jars(3),
  fourTerms: tiles("Sebutan dalam ungkapan asal", "Terms in the original expression",
    group("ab", 3), group("x", 5, "add"), group("y", 2, "subtract"), group("1", 7, "add")),
  xComparedSquare: tiles("Bandingkan x dengan x²", "Compare x and x²",
    group("x", 1), group("x²", 1, "compare")),
  aComparedB: tiles("Bandingkan dua jenis sebutan", "Compare two term types",
    group("a", 2), group("b", 2, "compare")),
  twiceYMinusFive: tiles("Dua y, kemudian tolak lima unit", "Two y tiles, then subtract five units",
    group("y", 2), group("1", 5, "subtract")),

  // Practice: preserve each signed group; students combine like terms themselves.
  twiceXPlusOne: tiles("Nilai x = 3; hitung ungkapan", "Given x = 3; evaluate the expression",
    group("x", 2), group("1", 1, "add")),
  threeXPlusTwoX: tiles("Kumpulan sebutan x", "Groups of x terms",
    group("x", 3), group("x", 2, "add")),
  nineYMinusFourY: tiles("Kumpulan sebutan y", "Groups of y terms",
    group("y", 9), group("y", 4, "subtract")),
  sevenAbMinusFourAb: tiles("Kumpulan sebutan ab", "Groups of ab terms",
    group("ab", 7), group("ab", 4, "subtract")),
  sixXThreeXMinusTwoX: tiles("Tiga kumpulan sebutan x", "Three x-term groups",
    group("x", 6), group("x", 3, "add"), group("x", 2, "subtract")),
  fourMFiveNMinusM: tiles("Dua jenis pemboleh ubah", "Two different variables",
    group("m", 4), group("n", 5, "add"), group("m", 1, "subtract")),
  twoAThreeBFourAMinusB: tiles("Kumpulan sebutan a dan b", "Groups of a and b terms",
    group("a", 2), group("b", 3, "add"), group("a", 4, "add"), group("b", 1, "subtract")),
  fiveXSevenMinusTwoXFour: tiles("Pemboleh ubah dan pemalar", "Variables and constants",
    group("x", 5), group("1", 7, "add"), group("x", 2, "subtract"), group("1", 4, "subtract")),
  nineAbMinusFiveAbPlusAb: tiles("Tiga kumpulan sebutan ab", "Three groups of ab terms",
    group("ab", 9), group("ab", 5, "subtract"), group("ab", 1, "add")),
  threeXFiveXMinusX: tiles("Tiga kumpulan sebutan x", "Three groups of x terms",
    group("x", 3), group("x", 5, "add"), group("x", 1, "subtract")),

  // Challenge: expanded factors help with indices without spelling out results.
  aCubed: factors("Tiga faktor a", "Three a factors", "product",
    [["a"], ["a"], ["a"]]),
  aSquareTimesCube: factors("Dua kumpulan kuasa a", "Two groups of a powers", "product",
    [["a", "a"], ["a", "a", "a"]]),
  aFifthDividedSquare: factors("Kuasa a dalam pengangka dan penyebut",
    "Powers of a in numerator and denominator", "quotient",
    [["a", "a", "a", "a", "a"], ["a", "a"]]),
  twoATimesThreeA: factors("Darab dua sebutan algebra", "Multiply two algebraic terms", "product",
    [["2", "a"], ["3", "a"]]),
  fourXTimesTwoXSquare: factors("Darab sebutan x dan x²", "Multiply x and x² terms", "product",
    [["4", "x"], ["2", "x", "x"]]),
  threeAbSquareTimesFourACubedB: factors(
    "Darab sebutan dengan dua pemboleh ubah", "Multiply terms with two variables", "product",
    [["3", "a", "b", "b"], ["4", "a", "a", "a", "b"]]),
  twentyMNOverFiveMN: factors("Pemfaktoran sebelum pembahagian",
    "Factors before division", "quotient",
    [["20", "m⁴", "n³"], ["5", "m²", "n"]]),
  repeatedAPlusB: factors("Tiga faktor binomial sama", "Three identical binomial factors",
    "product", [["(a + b)"], ["(a + b)"], ["(a + b)"]]),

  rectangleThreeXByTwoX: {
    kind: "geometry-diagram",
    title: t("Luas segi empat tepat dengan sisi algebra",
      "Area of a rectangle with algebraic sides"),
    panels: [{
      title: t("Segi empat tepat", "Rectangle"),
      description: t("Panjang = 3x, lebar = 2x; luas belum dicari.",
        "Length = 3x, width = 2x; area not evaluated."),
      paths: [{ points: [[54, 56], [245, 56], [245, 188], [54, 188]], closed: true, fill: true }],
      labels: [
        { at: [150, 41], text: "3x" },
        { at: [265, 126], text: "2x" },
        { at: [150, 127], text: t("Luas = ?", "Area = ?") },
      ],
    }],
  },
  cubeSideA: {
    kind: "geometry-diagram",
    title: t("Isipadu kubus dengan sisi a", "Volume of a cube with side a"),
    panels: [{
      title: t("Kubus", "Cube"),
      description: t("Semua rusuk mempunyai panjang a; isipadu belum dicari.",
        "All edges have length a; volume not evaluated."),
      paths: [
        { points: [[60, 92], [166, 92], [166, 199], [60, 199]], closed: true, fill: true },
        { points: [[60, 92], [117, 39], [225, 39], [166, 92]], closed: true, fill: true },
        { points: [[166, 92], [225, 39], [225, 146], [166, 199]], closed: true, fill: true },
      ],
      labels: [
        { at: [110, 218], text: "a" },
        { at: [240, 102], text: "a" },
        { at: [111, 150], text: t("Isipadu = ?", "Volume = ?") },
      ],
    }],
  },
} satisfies Record<string, MathQuestionVisual>;
