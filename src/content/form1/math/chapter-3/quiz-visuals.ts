import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";

/**
 * Form 1 Chapter 3 (Squares, Square Roots, Cubes and Cube Roots).
 * Only questions that benefit from a geometric or repeated-factor model get one.
 * Unknown lengths/areas/volumes stay as question marks: do not solve the MCQ
 * in the diagram. The same object is used for the BM and DLP counterparts.
 */
type GeometryModel = Extract<MathQuestionVisual, { kind: "geometry-model" }>;
type GeometryShape = GeometryModel["models"][number];
const geometry = (title: GeometryModel["title"], ...models: GeometryShape[]): GeometryModel => ({
  kind: "geometry-model", title, models,
});
const squareWithArea = (area: string, side: string) => geometry(
  { bm: "Segi empat sama — cari panjang sisi", dlp: "Square — find the side length" },
  { shape: "square", area, side },
);
const cubeWithVolume = (volume: string, side: string) => geometry(
  { bm: "Kubus — cari panjang sisi", dlp: "Cube — find the side length" },
  { shape: "cube", volume, side },
);
const product = (bm: string, dlp: string, ...factors: string[]): MathQuestionVisual => ({
  kind: "factor-groups",
  title: { bm, dlp },
  rows: [{ operation: "product", groups: factors.map((factor) => [factor]) }],
});

export const MATH_F1_C3_QUIZ_VISUALS = {
  // Foundation: reading indices, concrete repeated multiplication and bounds.
  indexSquare: {
    kind: "index-notation",
    title: { bm: "Tatatanda kuasa dua", dlp: "Square notation" },
    base: "a", exponent: "2",
  },
  squareFour: product("Pendaraban dua faktor yang sama", "Two equal factors", "4", "4"),
  indexCube: {
    kind: "index-notation",
    title: { bm: "Tatatanda kuasa tiga", dlp: "Cube notation" },
    base: "a", exponent: "3",
  },
  cubeTwo: product("Pendaraban tiga faktor yang sama", "Three equal factors", "2", "2", "2"),
  negativeCubeFive: product(
    "Faktor negatif dalam kuasa tiga", "Negative factors in a cube", "−5", "−5", "−5",
  ),
  cubeRootEight: cubeWithVolume("8 unit³", "? unit"),
  sqrt54Bounds: {
    kind: "number-line",
    title: { bm: "Bandingkan 54 dengan kuasa dua sempurna", dlp: "Compare 54 with perfect squares" },
    min: 49, max: 64,
    ticks: [{ value: 49 }, { value: 54 }, { value: 64 }],
    points: [{ value: 54 }],
  },

  // Practice: fraction areas, powers and geometric inverse operations.
  rootFraction16of25: {
    kind: "fraction-area",
    title: { bm: "Model luas pecahan 16/25", dlp: "Fractional area model for 16/25" },
    divisions: 5, shadedRows: 4, shadedColumns: 4, side: "?",
  },
  cubeThree: product("Tiga faktor yang sama", "Three equal factors", "3", "3", "3"),
  negativeCubeFour: product(
    "Tiga faktor negatif", "Three negative factors", "−4", "−4", "−4",
  ),
  squareArea49: squareWithArea("49 cm²", "? cm"),
  cubeVolume216: cubeWithVolume("216 cm³", "? cm"),
  sqrt80Bounds: {
    kind: "number-line",
    title: { bm: "Nombor 80 antara dua kuasa dua", dlp: "80 between two perfect squares" },
    min: 64, max: 81,
    ticks: [{ value: 64 }, { value: 80 }, { value: 81 }],
    points: [{ value: 80 }],
  },
  rootFraction25of36: {
    kind: "fraction-area",
    title: { bm: "Model luas pecahan 25/36", dlp: "Fractional area model for 25/36" },
    divisions: 6, shadedRows: 5, shadedColumns: 5, side: "?",
  },

  // Challenge: authentic areas, volumes and a comparison of two equal areas.
  squareArea144: squareWithArea("144 cm²", "? cm"),
  cubeVolume512: cubeWithVolume("512 cm³", "? cm"),
  squareSide9: geometry(
    { bm: "Segi empat sama — cari luas", dlp: "Square — find the area" },
    { shape: "square", side: "9 cm", area: "?" },
  ),
  cubeSide6: geometry(
    { bm: "Kubus — cari isipadu", dlp: "Cube — find the volume" },
    { shape: "cube", side: "6 cm", volume: "?" },
  ),
  squareGarden169: geometry(
    { bm: "Taman berbentuk segi empat sama", dlp: "Square-shaped garden" },
    { shape: "square", area: "169 m²", side: "? m" },
  ),
  cubeBox343: cubeWithVolume("343 cm³", "? cm"),
  equalAreaRectangleSquare: geometry(
    { bm: "Dua bentuk dengan luas yang sama", dlp: "Two shapes with equal area" },
    {
      shape: "rectangle", label: { bm: "Segi empat tepat", dlp: "Rectangle" },
      width: "18 cm", height: "8 cm",
    },
    {
      shape: "square", label: { bm: "Segi empat sama", dlp: "Square" },
      side: "? cm",
    },
  ),
  squareFloor81: geometry(
    { bm: "Lantai segi empat sama — cari perimeter", dlp: "Square floor — find the perimeter" },
    { shape: "square", area: "81 m²", side: "? m" },
  ),
  cubeUnitBlocks64: geometry(
    { bm: "64 kubus unit membentuk sebuah kubus", dlp: "64 unit cubes form one cube" },
    { shape: "cube", volume: "64 cm³", side: "? cm" },
  ),
  negativeSquareSix: product(
    "Dua faktor negatif dalam kuasa dua", "Two negative factors in a square", "−6", "−6",
  ),
} satisfies Record<string, MathQuestionVisual>;
