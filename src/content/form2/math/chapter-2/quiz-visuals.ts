import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import type { GeometryPanel, GeometryPoint } from "@/features/quiz/visuals/mathGeometryVisual";

/** Shared BM/DLP stimuli for existing Chapter 2 objectives; the answer is never drawn. */
const t = (bm: string, dlp: string) => ({ bm, dlp });
type P = GeometryPoint;
const rectangle = (
  key: string,
  bm: string,
  dlp: string,
  width: string,
  height: string,
  area?: string,
  isSquare = false,
): [string, MathQuestionVisual] => [key, {
  kind: "geometry-diagram",
  title: t(bm, dlp),
  panels: [{
    title: isSquare ? t("Segi empat sama", "Square") : t("Segi empat tepat", "Rectangle"),
    description: t("Label hanya menunjukkan maklumat yang diberi; rajah tidak mengikut skala.",
      "Labels show only the givens; diagram not to scale."),
    paths: [{ points: (isSquare
      ? [[80, 56], [220, 56], [220, 196], [80, 196]]
      : [[40, 56], [212, 56], [212, 183], [40, 183]]) as P[], closed: true, fill: true }],
    labels: [
      { at: [isSquare ? 150 : 126, 43], text: width },
      // Start-anchored just right of the right edge so long labels never cross it.
      { at: [isSquare ? 228 : 220, 124], text: height, anchor: "start" },
      ...(area ? [{ at: [126, 127] as P, text: area }] : []),
    ],
  }],
}];
const square = (key: string, bm: string, dlp: string, side: string): [string, MathQuestionVisual] =>
  rectangle(key, bm, dlp, side, side, undefined, true);

const removedSquare: MathQuestionVisual = {
  kind: "geometry-diagram",
  title: t("Kawasan berbentuk bingkai", "Square frame region"),
  panels: [{
    title: t("Segi empat sama di dalam segi empat sama", "Square inside a square"),
    description: t("Segi empat sama kecil dikeluarkan dari tengah yang besar. Cari luas baki; nilai luas tidak ditulis.",
      "The inner square is removed from the outer square. Find the remaining area; area values are not shown."),
    paths: [
      { points: [[48, 27], [250, 27], [250, 229], [48, 229]], closed: true, fill: true },
      { points: [[110, 88], [190, 88], [190, 168], [110, 168]], closed: true, dashed: true },
    ],
    labels: [
      { at: [151, 22], text: "x + 5 m" },
      { at: [151, 137], text: "x m" },
    ],
  }],
};

const entries: [string, MathQuestionVisual][] = [
  rectangle("F5", "Kembangan sebagai luas", "Expansion as area", "x + 2", "x + 3"),
  square("F7", "Kuasa dua binomial sebagai luas", "Squared binomial as area", "a + 5"),
  rectangle("P6", "Luas segi empat tepat beralgebra", "Algebraic rectangle area", "3x + 2 cm", "x + 4 cm"),
  square("P7", "Luas segi empat sama beralgebra", "Algebraic square area", "2y − 3 cm"),
  ["C4", removedSquare],
  rectangle("C25", "Cari panjang daripada luas", "Find length from area", "?", "x + 2", "A = x² + 6x + 8"),
];

/** Both question languages reference the same diagram object for each objective ID. */
export const MATH_F2_C2_QUIZ_VISUALS: Readonly<Record<string, MathQuestionVisual>> =
  Object.fromEntries(entries);
