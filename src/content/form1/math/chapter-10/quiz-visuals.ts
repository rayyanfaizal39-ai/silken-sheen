import type { GeometryPoint, GeometryPanel, MathGeometryVisual } from "@/features/quiz/visuals/mathGeometryVisual";
import type { MathQuestionVisual, VisualText } from "@/features/quiz/visuals/mathQuestionVisual";

/** Form 1 Ch10: measurements, perimeter, area, and composites.
 * Every diagram displays supplied dimensions; no answer areas or perimeters.
 * Static bilingual vector illustrations use the existing mobile quiz renderer.
 */
const t = (bm: string, dlp: string) => ({ bm, dlp });
type Point = GeometryPoint;
const p = (x: number, y: number): Point => [x, y];
const desc = t("Ukuran yang diberikan sahaja; rajah tidak mengikut skala.",
  "Given dimensions only; diagram not to scale.");
const draw = (bm: string, dlp: string, paths: GeometryPanel["paths"],
  labels: { at: Point; text: VisualText }[], options?: {
    grid?: GeometryPanel["grid"]; description?: ReturnType<typeof t>;
    title?: ReturnType<typeof t>;
  }): MathGeometryVisual => ({
  kind: "geometry-diagram", title: t(bm, dlp), panels: [{
    title: options?.title ?? t("Rajah ukuran", "Measurement diagram"),
    description: options?.description ?? desc, paths, labels, ...(options?.grid ? { grid: options.grid } : {}),
  }],
});
const edge = (vertices: Point[]): GeometryPanel["paths"] => [{ points: vertices, closed: true, fill: true }];
const rect = (bm: string, dlp: string, length: string, width: string, settings?: {
  w?: number; h?: number; annotation?: string; diagonal?: boolean; omitLabels?: boolean;
}): MathGeometryVisual => {
  const w = settings?.w ?? 200, h = settings?.h ?? 128;
  const x = 150 - w / 2, y = 124 - h / 2;
  const paths: NonNullable<GeometryPanel["paths"]> = edge([
    p(x, y), p(x + w, y), p(x + w, y + h), p(x, y + h),
  ]);
  if (settings?.diagonal) paths.push({ points: [p(x, y), p(x + w, y + h)] });
  return draw(bm, dlp, paths, [
    ...(!settings?.omitLabels ? [
      { at: p(150, y - 12), text: length },
      { at: p(x + w + 19, 124), text: width },
    ] : []),
    ...(settings?.annotation ? [{ at: p(150, 129), text: settings.annotation }] : []),
  ]);
};
const square = (bm: string, dlp: string, side: string): MathGeometryVisual =>
  rect(bm, dlp, side, side, { w: 145, h: 145 });
const tri = (bm: string, dlp: string, base: string, height: string, extra?: {
  right?: boolean; sideLabels?: string[]; areaLabel?: string;
}): MathGeometryVisual => {
  const pts = extra?.right
    ? [p(66, 191), p(66, 56), p(257, 191)]
    : [p(164, 56), p(41, 191), p(270, 191)];
  const foot = extra?.right ? p(66, 191) : p(164, 191);
  return draw(bm, dlp, [
    ...edge(pts),
    { points: [pts[1 === (extra?.right ? 1 : 0) ? 1 : 0], foot], dashed: true },
  ], [
    { at: p(160, 214), text: base },
    { at: extra?.right ? p(44, 115) : p(179, 125), text: height },
    ...(extra?.sideLabels?.map((text, i) => ({
      at: [p(97, 85), p(207, 117), p(103, 171)][i] ?? p(130, 85), text,
    })) ?? []),
    ...(extra?.areaLabel ? [{ at: p(162, 162), text: extra.areaLabel }] : []),
  ]);
};
const para = (bm: string, dlp: string, base: string, height: string, slant?: string,
  area?: string): MathGeometryVisual =>
  draw(bm, dlp, [
    ...edge([p(94, 62), p(263, 62), p(217, 189), p(48, 189)]),
    { points: [p(94, 62), p(94, 189)], dashed: true },
  ], [
    { at: p(133, 213), text: base },
    { at: p(107, 126), text: height },
    ...(slant ? [{ at: p(246, 128), text: slant }] : []),
    ...(area ? [{ at: p(170, 143), text: area }] : []),
  ]);
const trapezoid = (bm: string, dlp: string, top: string, bottom: string,
  height: string, area?: string): MathGeometryVisual =>
  draw(bm, dlp, [
    ...edge([p(92, 65), p(216, 65), p(265, 191), p(35, 191)]),
    { points: [p(92, 65), p(92, 191)], dashed: true },
  ], [
    { at: p(154, 48), text: top },
    { at: p(150, 214), text: bottom },
    { at: p(105, 125), text: height },
    ...(area ? [{ at: p(172, 145), text: area }] : []),
  ]);
const kite = (bm: string, dlp: string, d1: string, d2: string,
  area?: string): MathGeometryVisual =>
  draw(bm, dlp, [
    ...edge([p(150, 35), p(263, 122), p(150, 209), p(37, 122)]),
    { points: [p(150, 35), p(150, 209)], dashed: true },
    { points: [p(37, 122), p(263, 122)], dashed: true },
  ], [
    { at: p(179, 65), text: d1 },
    { at: p(202, 113), text: d2 },
    ...(area ? [{ at: p(195, 161), text: area }] : []),
  ]);
const hexagon = (bm: string, dlp: string, side: string): MathGeometryVisual => {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (60 * i - 90) * Math.PI / 180;
    return p(150 + 95 * Math.cos(a), 120 + 91 * Math.sin(a));
  });
  return draw(bm, dlp, edge(pts), [{ at: p(233, 85), text: side }]);
};
const two = (bm: string, dlp: string, a: MathGeometryVisual,
  b: MathGeometryVisual): MathGeometryVisual => ({
  kind: "geometry-diagram", title: t(bm, dlp),
  panels: [{ ...a.panels[0], title: t("Bahagian A", "Part A") },
    { ...b.panels[0], title: t("Bahagian B", "Part B") }],
});
const LCut = (bm: string, dlp: string, length: string, height: string,
  notchWidth: string, notchHeight: string, label?: string): MathGeometryVisual =>
  draw(bm, dlp, edge([
    p(52, 43), p(244, 43), p(244, 119), p(184, 119), p(184, 193), p(52, 193),
  ]), [
    { at: p(150, 28), text: length }, { at: p(29, 125), text: height },
    { at: p(212, 134), text: notchWidth },
    { at: p(262, 87), text: notchHeight },
    ...(label ? [{ at: p(104, 124), text: label }] : []),
  ]);
const rectHole = (bm: string, dlp: string, length: string, width: string,
  holeL: string, holeW: string): MathGeometryVisual =>
  draw(bm, dlp, [
    ...edge([p(40, 40), p(259, 40), p(259, 208), p(40, 208)]),
    { points: [p(111, 94), p(190, 94), p(190, 152), p(111, 152)], closed: true, dashed: true },
  ], [
    { at: p(146, 26), text: length }, { at: p(281, 124), text: width },
    { at: p(150, 112), text: holeL }, { at: p(150, 132), text: holeW },
  ], { description: t("Segi empat kecil ialah lubang yang dikeluarkan; luas baki belum dikira.",
    "The smaller rectangle is a cut-out; remaining area has not been calculated.") });
const roofHouse = draw("Rumah dengan bumbung segi tiga", "House with a triangular roof", [
  ...edge([p(65, 106), p(236, 106), p(236, 199), p(65, 199)]),
  { points: [p(65, 106), p(151, 43), p(236, 106)], closed: true },
  { points: [p(151, 43), p(151, 106)], dashed: true },
], [
  { at: p(148, 220), text: "8 cm" },
  { at: p(256, 154), text: "5 cm" },
  { at: p(165, 73), text: "3 cm" },
]);
const tiles = (bm: string, dlp: string, length: string, width: string,
  tileSide: string): MathGeometryVisual =>
  draw(bm, dlp,
    edge([p(52, 51), p(244, 51), p(244, 179), p(52, 179)]), [
      { at: p(150, 37), text: length },
      { at: p(268, 112), text: width },
      { at: p(150, 214), text: t("Satu jubin: " + tileSide,
        "One tile: " + tileSide) },
    ], { grid: { origin: p(52, 51), columns: 12, rows: 8, step: 16 },
      description: t("Jubin segi empat sama; kira jumlah melalui pembahagian ukuran.",
        "Square tiles; work out the number using the dimensions.") });
const fieldInsidePath = draw("Laluan di bahagian dalam padang", "Path inside a field", [
  ...edge([p(50, 45), p(250, 45), p(250, 200), p(50, 200)]),
  { points: [p(63, 57), p(237, 57), p(237, 188), p(63, 188)], closed: true, dashed: true },
], [
  { at: p(150, 30), text: "20 m" },
  { at: p(277, 126), text: "15 m" },
  { at: p(89, 81), text: "1 m" },
]);
const gardenOutsidePath = draw("Laluan di sekeliling taman", "Path around a garden", [
  ...edge([p(40, 36), p(259, 36), p(259, 209), p(40, 209)]),
  { points: [p(77, 76), p(222, 76), p(222, 178), p(77, 178)], closed: true, dashed: true },
], [
  { at: p(149, 99), text: "10 m" },
  { at: p(235, 128), text: "8 m" },
  { at: p(151, 63), text: "2 m" },
]);
const doorwayTrim = draw("Jalur tepi lantai dengan bukaan pintu", "Edge strip excluding a doorway", [
  { points: [p(56, 45), p(168, 45)] },
  { points: [p(208, 45), p(249, 45), p(249, 191), p(56, 191), p(56, 45)] },
], [
  { at: p(150, 29), text: "5 m" },
  { at: p(273, 125), text: "4 m" },
  { at: p(188, 67), text: t("Pintu 1 m", "Door 1 m") },
]);
const wallTriangle = tri("Tembok segi tiga", "Triangular wall", "10 m", "4 m");
const q = (value: string) => value;

export const MATH_F1_C10_QUIZ_VISUALS = {
  // Foundation: shape and measurement concepts; avoid unhelpful unit/conversion pictures.
  perimeterConcept: rect("Keliling tepi bentuk", "Along the boundary of a shape",
    "l", "w"),
  areaConcept: rect("Ruang di dalam bentuk", "Region inside a shape", "l", "w"),
  perimeterUnits: rect("Keliling segi empat tepat", "Rectangle boundary", "8 cm", "4 cm"),
  areaUnits: rect("Ruang dua dimensi", "Two-dimensional region", "8 cm", "4 cm"),
  perimeterRectangle: rect("Keliling segi empat tepat", "Perimeter of a rectangle", "l", "w"),
  perimeterSquare: square("Keliling segi empat sama", "Perimeter of a square", "s"),
  areaTriangle: tri("Tapak dan tinggi serenjang", "Base and perpendicular height", "b", "h"),
  areaParallelogram: para("Tapak dan tinggi serenjang", "Base and perpendicular height", "b", "h"),
  areaTrapezium: trapezoid("Dua sisi selari dan tinggi", "Parallel sides and height", "a", "b", "h"),
  areaKite: kite("Dua pepenjuru", "Two diagonals", "d₁", "d₂"),
  triangleCorrectHeight: tri("Tinggi ialah serenjang kepada tapak", "Height is perpendicular to the base",
    "b", "h", { sideLabels: ["s"] }),
  boundaryVsArea: two("Bandingkan keliling dan luas", "Compare perimeter and area",
    rect("Keliling", "Perimeter", "l", "w"), rect("Luas", "Area", "l", "w")),
  trapeziumParallelSides: trapezoid("Dua sisi selari", "Two parallel sides", "a", "b", "h"),
  kiteDiagonals: kite("Pepenjuru bersilang", "Intersecting diagonals", "d₁", "d₂"),
  gridArea: draw("Anggaran kawasan pada petak", "Area estimate on a square grid",
    [{ points: [p(65, 53), p(201, 59), p(243, 127), p(210, 189),
      p(75, 180)], closed: true, fill: true }], [], {
      grid: { origin: p(53, 42), rows: 9, columns: 12, step: 17 },
    }),
  rectangleSixFour: rect("Ukur keliling", "Find the perimeter", "6 cm", "4 cm"),
  squareFive: square("Ukur keliling", "Find the perimeter", "5 cm"),
  triThreeFourFive: tri("Tiga sisi diketahui", "Three known sides", "4 cm", "3 cm",
    { right: true, sideLabels: ["5 cm"] }),
  compositeConcept: roofHouse,
  triangleVsParallelogram: two("Bandingkan dua bentuk", "Compare two shapes",
    tri("Segi tiga", "Triangle", "b", "h"), para("Segi empat selari", "Parallelogram", "b", "h")),
  rectanglePerimeter30: rect("Keliling segi empat tepat", "Perimeter of a rectangle",
    "8 cm", "w", { annotation: "P = 30 cm" }),
  hexSideThree: hexagon("Enam sisi sama", "Six equal sides", "3 cm"),
  kiteRhombus: kite("Pepenjuru bentuk empat sisi", "Diagonals of a quadrilateral", "d₁", "d₂"),

  // Practice: show given dimensions, leave unknown length/area uncomputed.
  practiceRectNineFive: rect("Segi empat tepat", "Rectangle", "9 cm", "5 cm"),
  practiceTriTenSeven: tri("Tapak dan tinggi segi tiga", "Triangle base and height", "10 cm", "7 cm"),
  practiceParaTwelveEight: para("Tinggi serenjang bukan sisi condong",
    "Perpendicular height is not the sloping side", "12 cm", "8 cm", "10 cm"),
  practiceTrapElevenSeven: trapezoid("Dua sisi selari", "Two parallel sides",
    "11 cm", "7 cm", "6 cm"),
  practiceKiteFourteenEight: kite("Dua pepenjuru", "Two diagonals", "14 cm", "8 cm"),
  practiceTriUnknownBase: tri("Tapak yang belum diketahui", "Unknown base",
    "b", "8 cm", { areaLabel: "40 cm²" }),
  practiceTrapUnknownHeight: trapezoid("Tinggi yang belum diketahui", "Unknown height",
    "6 cm", "12 cm", "h", "45 cm²"),
  practiceKiteUnknownDiagonal: kite("Pepenjuru yang belum diketahui", "Unknown diagonal",
    "15 cm", "d₂", "60 cm²"),
  practiceParaUnknownBase: para("Tapak yang belum diketahui", "Unknown base",
    "b", "9 cm", undefined, "72 cm²"),
  practiceRectMeters: rect("Segi empat tepat dalam meter", "Rectangle measured in metres",
    "5 m", "3 m"),
  practiceRectPerimeter40: rect("Keliling dan lebar diketahui", "Given perimeter and width",
    "l", "7 cm", { annotation: "P = 40 cm" }),
  practiceEqualTri36: tri("Tiga sisi sama", "Three equal sides", "s", "h",
    { sideLabels: ["s", "s"] }),
  practiceSquareEight: square("Ukur keliling dan luas", "Find perimeter and area", "8 cm"),
  practiceRightSixEight: tri("Dua sisi serenjang", "Two perpendicular sides",
    "8 cm", "6 cm", { right: true }),
  practicePerimeterCompare: two("Keliling sama", "Same perimeter",
    rect("Segi empat tepat", "Rectangle", "8 cm", "6 cm"),
    square("Segi empat sama", "Square", "s")),
  practiceTrapTwentyFourteen: trapezoid("Taman trapezium", "Trapezium plot",
    "20 m", "14 m", "8 m"),
  practiceTriLinearBase: tri("Ungkapan tapak dan tinggi diberi", "Given base and height expression",
    "(2x + 4) cm", "6 cm", { areaLabel: "36 cm²" }),
  practiceFootballPitch: rect("Padang bola sepak", "Football pitch",
    "105 m", "68 m", { w: 219, h: 142 }),
  practiceRectArea120: rect("Luas diketahui", "Given area",
    "15 cm", "w", { annotation: "A = 120 cm²" }),
  practiceTrapGarden: trapezoid("Taman berbentuk trapezium", "Trapezium garden",
    "30 m", "20 m", "12 m"),
  practiceKiteDouble: kite("Satu pepenjuru dua kali yang lain",
    "One diagonal is twice the other", "16 cm", "d₂", "64 cm²"),
  practiceRectTripleWidth: rect("Panjang tiga kali lebar", "Length is three times the width",
    "3w", "w", { annotation: "P = 48 cm" }),
  practiceParaFifteenNine: para("Tapak dan tinggi serenjang", "Base and perpendicular height",
    "15 cm", "9 cm"),
  practiceTwoRects: two("Banding dua segi empat tepat", "Compare two rectangles",
    rect("A", "A", "12 cm", "3 cm", { w: 228, h: 58 }),
    rect("B", "B", "6 cm", "6 cm", { w: 147, h: 147 })),
  practiceTriUnknownHeight: tri("Tinggi segi tiga", "Triangle height",
    "12 cm", "h", { areaLabel: "54 cm²" }),
  practiceHexPerimeter42: hexagon("Segi enam sekata", "Regular hexagon", "s"),
  practiceTrapUnknownH: trapezoid("Tinggi trapezium", "Trapezium height",
    "8 cm", "4 cm", "h", "36 cm²"),
  practiceKiteTwentyEleven: kite("Pepenjuru layang-layang", "Kite diagonals", "20 cm", "11 cm"),

  // Challenge: exact composite topology and all supplied measurements.
  challengeLTwoSections: two("Bilik bentuk L dengan dua bahagian tidak bertindih",
    "L-shaped room: two non-overlapping sections",
    rect("Bahagian panjang", "Long section", "10 m", "6 m"),
    rect("Bahagian kecil", "Smaller section", "4 m", "3 m")),
  challengeHouseRoof: roofHouse,
  challengeBoardHole: rectHole("Papan dengan potongan segi empat", "Board with rectangular hole",
    "12 cm", "9 cm", "4 cm", "3 cm"),
  challengeFarmTrap: trapezoid("Ladang trapezium", "Trapezium farm",
    "50 m", "30 m", "20 m"),
  challengeTileSixFour: tiles("Lantai dengan jubin 0.5 m", "Floor with 0.5 m tiles",
    "6 m", "4 m", "0.5 m"),
  challengeWallPaint: wallTriangle,
  challengeCompositeTrap: two("Trapezium di atas segi empat tepat",
    "Trapezium above a rectangle",
    rect("Bahagian segi empat", "Rectangular part", "8 cm", "6 cm"),
    trapezoid("Bahagian trapezium", "Trapezium part", "4 cm", "8 cm", "3 cm")),
  challengeKiteLand: kite("Tanah berbentuk layang-layang", "Kite-shaped land", "100 m", "80 m"),
  challengeTriExpr: tri("Tapak berungkapan", "Algebraic base", "(x + 2) cm", "6 cm",
    { areaLabel: "24 cm²" }),
  challengeLCutCorner: LCut("Segi empat dengan penjuru dipotong", "Rectangle with corner removed",
    "6 cm", "4 cm", "2 cm", "2 cm"),
  challengeRectSquarePerimeter: two("Keliling sama", "Same perimeter",
    rect("Segi empat tepat A", "Rectangle A", "8 cm", "6 cm"),
    square("Segi empat sama B", "Square B", "s")),
  challengeTwoRectSameArea: two("Luas sama: banding keliling", "Equal areas: compare perimeters",
    rect("A", "A", "9 cm", "4 cm", { w: 215, h: 92 }),
    rect("B", "B", "6 cm", "6 cm", { w: 145, h: 145 })),
  challengeDoorArea: rectHole("Kawasan pintu tidak berkarpet", "Doorway area not carpeted",
    "5 m", "4 m", "1 m", "0.5 m"),
  challengeArea48: rect("Luas diketahui", "Area given",
    "l", "6 cm", { annotation: "A = 48 cm²" }),
  challengeFence40: rect("Panjang dan lebar belum ditetapkan", "Length and width not yet selected",
    "l", "w", { annotation: "P = 40 m" }),
  challengeTrapHeightShorter: trapezoid("Tinggi sama dengan sisi pendek", "Height equals shorter side",
    "6 cm", "10 cm", "6 cm"),
  challengeTriTwiceHeight: tri("Tapak dua kali tinggi", "Base twice the height",
    "2h", "h", { areaLabel: "100 cm²" }),
  challengeLawnPond: two("Padang dan kolam", "Lawn and pond",
    rect("Rumput", "Lawn", "15 m", "10 m"),
    kite("Kolam", "Pond", "6 m", "4 m")),
  challengeTriPerimeter36: tri("Tiga sisi segi tiga", "Three triangle sides",
    "x cm", "h", { sideLabels: ["(x + 4) cm", "(2x − 4) cm"],
      areaLabel: "P = 36 cm" }),
  challengeTriEqualsRect: two("Luas dua bentuk sama", "Equal areas of two shapes",
    rect("Segi empat tepat", "Rectangle", "8 cm", "6 cm"),
    tri("Segi tiga", "Triangle", "16 cm", "h")),
  challengeRightFiveTwelveThirteen: tri("Tiga sisi segi tiga bersudut tegak",
    "Three sides of a right triangle", "12 cm", "5 cm",
    { right: true, sideLabels: ["13 cm"] }),
  challengeInsidePath: fieldInsidePath,
  challengeOutsidePath: gardenOutsidePath,
  challengeSameAreaSquareRect: two("Luas 100 cm² bagi kedua-duanya",
    "Both areas 100 cm²",
    square("Segi empat sama", "Square", "10 cm"),
    rect("Segi empat tepat", "Rectangle", "20 cm", "w",
      { w: 219, h: 70 })),
  challengeTilingCost: tiles("Lantai dengan jubin 40 cm", "Floor with 40 cm tiles",
    "4.8 m", "3.2 m", "40 cm"),
  challengeCompositeTrapRect: two("Dua kawasan tidak bertindih", "Two non-overlapping regions",
    rect("Segi empat tepat", "Rectangle", "12 cm", "4 cm"),
    trapezoid("Trapezium", "Trapezium", "6 cm", "12 cm", "5 cm")),
  challengeParaTriangleEqual: two("Luas sama", "Equal areas",
    para("Segi empat selari", "Parallelogram", "12 cm", "5 cm"),
    tri("Segi tiga", "Triangle", "10 cm", "h")),
  challengeTrapArea60: trapezoid("Tinggi dan satu sisi selari", "Height and one parallel side",
    "8 cm", "b", "6 cm", "60 cm²"),
  challengeKiteArea54: kite("Satu pepenjuru diketahui", "One given diagonal",
    "12 cm", "d₂", "54 cm²"),
  challengeDoorTrim: doorwayTrim,
} satisfies Record<string, MathQuestionVisual>;
