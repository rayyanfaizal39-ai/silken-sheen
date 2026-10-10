import type { GeometryPoint, GeometryPanel, MathGeometryVisual } from "@/features/quiz/visuals/mathGeometryVisual";
import type { MathQuestionVisual, VisualText } from "@/features/quiz/visuals/mathQuestionVisual";

/** KSSM Form 1 Chapter 9: polygons, triangle angles, quadrilaterals and symmetry.
 * Shared BM/DLP declarative SVGs. Labels carry question givens, not solutions.
 * Diagonal/symmetry counting questions do NOT draw the counted diagonals/axes.
 */
const t = (bm: string, dlp: string) => ({ bm, dlp });
type P = GeometryPoint;
const pt = (x: number, y: number): P => [x, y];
const tri: P[] = [pt(152, 32), pt(45, 202), pt(259, 202)];
const right: P[] = [pt(52, 199), pt(52, 43), pt(258, 199)];
const scalene: P[] = [pt(182, 37), pt(45, 201), pt(260, 196)];
const obtuse: P[] = [pt(120, 151), pt(33, 196), pt(268, 196)];
const square: P[] = [pt(82, 45), pt(219, 45), pt(219, 188), pt(82, 188)];
const rectangle: P[] = [pt(44, 62), pt(259, 62), pt(259, 187), pt(44, 187)];
const parallelogram: P[] = [pt(82, 57), pt(267, 57), pt(219, 187), pt(34, 187)];
const rhombus: P[] = [pt(149, 37), pt(258, 119), pt(149, 201), pt(40, 119)];
const trapezium: P[] = [pt(79, 70), pt(220, 70), pt(266, 190), pt(35, 190)];
const kite: P[] = [pt(150, 35), pt(247, 98), pt(150, 207), pt(53, 98)];
const generalQuad: P[] = [pt(56, 55), pt(252, 72), pt(228, 195), pt(35, 175)];
const reg = (n: number): P[] => Array.from({ length: n }, (_, i) => {
  const angle = (-90 + i * 360 / n) * Math.PI / 180;
  return pt(150 + 100 * Math.cos(angle), 120 + 95 * Math.sin(angle));
});
const base = t("Hanya nilai yang diberi ditandakan; rajah tidak mengikut skala.",
  "Only supplied values are labelled; diagram not to scale.");
const shape = (bm: string, dlp: string, vertices: P[], angles: (VisualText | undefined)[] = [],
  opts?: { points?: boolean; sideLabels?: { side: number; text: VisualText }[];
    extensions?: P[][]; interiorPaths?: P[][]; description?: ReturnType<typeof t> },
): MathGeometryVisual => {
  const centroid = pt(vertices.reduce((s, a) => s + a[0], 0) / vertices.length,
    vertices.reduce((s, a) => s + a[1], 0) / vertices.length);
  const labels: GeometryPanel["labels"] = [];
  angles.forEach((value, i) => {
    if (value === undefined) return;
    const v = vertices[i];
    const fraction = .26;
    labels.push({ at: pt(v[0] + (centroid[0] - v[0]) * fraction,
      v[1] + (centroid[1] - v[1]) * fraction), text: value });
  });
  if (opts?.points) vertices.forEach((v, i) => labels.push({
    at: pt(v[0] + (v[0] - centroid[0]) * .19,
      v[1] + (v[1] - centroid[1]) * .19 + 4),
    text: String.fromCharCode(65 + i),
  }));
  opts?.sideLabels?.forEach(({ side, text }) => {
    const a = vertices[side], b = vertices[(side + 1) % vertices.length];
    const m = pt((a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
    labels.push({ at: pt(m[0] + (m[0] - centroid[0]) * .21,
      m[1] + (m[1] - centroid[1]) * .21), text });
  });
  const paths: NonNullable<GeometryPanel["paths"]> = [
    { points: vertices, closed: true, fill: true },
    ...(opts?.extensions ?? []).map(points => ({ points, dashed: true })),
    ...(opts?.interiorPaths ?? []).map(points => ({ points })),
  ];
  return { kind: "geometry-diagram", title: t(bm, dlp),
    panels: [{ title: t("Rajah geometri", "Geometry diagram"),
      description: opts?.description ?? base, paths, labels }] };
};
const triangle = (bm: string, dlp: string, angles: (VisualText | undefined)[] = [],
  coords: P[] = tri, extra?: Parameters<typeof shape>[4]) =>
  shape(bm, dlp, coords, angles, extra);
const quad = (bm: string, dlp: string, angles: (VisualText | undefined)[] = [],
  coords: P[] = generalQuad, extra?: Parameters<typeof shape>[4]) =>
  shape(bm, dlp, coords, angles, extra);
const triangleExt = (bm: string, dlp: string, angleA: VisualText | undefined,
  angleB: VisualText | undefined, exterior: VisualText, sideMark?: string) => {
  // C at bottom right; BC extends horizontally right to D.
  const a = pt(140, 43), b = pt(58, 184), c = pt(225, 184);
  const fig = triangle(bm, dlp, [angleA, angleB], [a, b, c], {
    extensions: [[c, pt(281, 184)]],
  });
  fig.panels[0].labels.push(
    { at: pt(235, 142), text: exterior },
    { at: pt(140, 27), text: "A" },
    { at: pt(49, 206), text: "B" },
    { at: pt(222, 207), text: "C" },
    { at: pt(287, 204), text: "D" },
  );
  if (sideMark) fig.panels[0].labels.push({ at: pt(148, 208), text: sideMark });
  return fig;
};
const rectangleShapeVisual = quad("Rajah segi empat", "Quadrilateral diagram", [], rectangle);
const squareShapeVisual = quad("Rajah segi empat", "Quadrilateral diagram", [], square);
export const MATH_F1_C9_QUIZ_VISUALS = {
  // Foundation: visual polygon vocabulary and symmetry figures without named answers.
  polygonExample: shape("Contoh bentuk tertutup", "Example of a closed shape", reg(5)),
  threeSides: shape("Kira sisi", "Count the sides", reg(3)),
  fiveSides: shape("Kira sisi", "Count the sides", reg(5)),
  sixSides: shape("Kira sisi", "Count the sides", reg(6)),
  eightSides: shape("Kira sisi", "Count the sides", reg(8)),
  tenSides: shape("Kira sisi", "Count the sides", reg(10)),
  regularShape: shape("Bandingkan panjang sisi dan sudut", "Compare side lengths and angles", reg(6)),
  equilateralShape: triangle("Rajah segi tiga", "Triangle diagram", [], reg(3)),
  isoscelesShape: triangle("Rajah segi tiga", "Triangle diagram", [], tri),
  scaleneShape: triangle("Rajah segi tiga", "Triangle diagram", [], scalene),
  rightShape: triangle("Rajah segi tiga", "Triangle diagram", ["90°"], right),
  hypotenuseShape: triangle("Sisi pada segi tiga bersudut tegak", "Sides of a right triangle",
    ["90°"], right, { sideLabels: [{ side: 1, text: "a" }, { side: 2, text: "b" }, { side: 0, text: "c" }] }),
  rectangleShape: rectangleShapeVisual,
  squareShape: squareShapeVisual,
  parallelogramShape: quad("Rajah segi empat", "Quadrilateral diagram", [], parallelogram),
  rhombusShape: quad("Rajah segi empat", "Quadrilateral diagram", [], rhombus),
  trapeziumShape: quad("Rajah segi empat", "Quadrilateral diagram", [], trapezium),
  kiteShape: quad("Rajah segi empat", "Quadrilateral diagram", [], kite),
  triangleSymmetry: triangle("Kira paksi simetri", "Count symmetry axes", [], reg(3)),
  squareSymmetry: quad("Kira paksi simetri", "Count symmetry axes", [], square),
  isoscelesSymmetry: triangle("Kira paksi simetri", "Count symmetry axes", [], tri),
  parallelogramSymmetry: quad("Kira paksi simetri", "Count symmetry axes", [], parallelogram),
  rhombusSymmetry: quad("Kira paksi simetri", "Count symmetry axes", [], rhombus),
  kiteSymmetry: quad("Kira paksi simetri", "Count symmetry axes", [], kite),
  obtuseTriangle: triangle("Salah satu sudut cakah", "One obtuse angle", ["110°"], obtuse),
  rectangleSymmetry: quad("Kira paksi simetri", "Count symmetry axes", [], rectangle),
  squareVsRectangle: {
    kind: "geometry-diagram", title: t("Bandingkan dua segi empat", "Compare two quadrilaterals"),
    panels: [squareShapeVisual.panels[0], rectangleShapeVisual.panels[0]],
  },
  sevenSides: shape("Kira sisi", "Count sides", reg(7)),
  nineSides: shape("Kira sisi", "Count sides", reg(9)),
  diagonalExample: quad("Tembereng dari satu bucu ke bucu bukan bersebelahan",
    "Segment between non-adjacent vertices", [], rectangle,
    { points: true, interiorPaths: [[rectangle[0], rectangle[2]]] }),

  // Practice: given angles only; students still compute every missing value.
  triangleInterior: triangle("Tiga sudut dalam", "Three interior angles", ["a", "b", "c"]),
  quadInterior: quad("Empat sudut dalam", "Four interior angles", ["a", "b", "c", "d"]),
  triangle55_75: triangle("Cari sudut C", "Find angle C", ["55°", "75°", "?"], tri, { points: true }),
  quad90_85_95: quad("Cari sudut S", "Find angle S", ["90°", "85°", "95°", "?"], rectangle,
    { points: true }),
  quadDiagonals: quad("Lukis pepenjuru yang mungkin", "Identify possible diagonals", [],
    generalQuad, { points: true }),
  pentagonDiagonals: shape("Lukis pepenjuru yang mungkin", "Identify possible diagonals",
    reg(5), [], { points: true }),
  hexagonDiagonals: shape("Lukis pepenjuru yang mungkin", "Identify possible diagonals",
    reg(6), [], { points: true }),
  triangle2q60: triangle("Sudut PQR", "Angles of PQR", ["2q", "q", "60°"], tri,
    { points: true }),
  isoApex50: triangle("Sudut di bucu dan tapak", "Apex and base angles", ["50°", "?", "?"]),
  isoBase40: triangle("Dua sudut tapak yang diberi", "Two given base angles",
    ["?", "40°", "40°"]),
  parallelA65: quad("Sudut segi empat selari", "Angles of a parallelogram",
    ["65°", "?", "?", "?"], parallelogram, { points: true }),
  ext125Interior60: triangleExt("Sudut peluaran segi tiga", "Exterior angle of a triangle",
    "60°", "?", "125°"),
  rightAngle38: triangle("Satu sudut tegak dan satu sudut tirus",
    "Right angle and one acute angle", ["90°", "38°", "?"], right),
  kite11070: quad("Sudut layang-layang", "Angles in a kite",
    ["110°", "x", "70°", "x"], kite, { points: true }),
  quad75_95_110: quad("Sudut segi empat", "Quadrilateral angles",
    ["75°", "95°", "110°", "?"]),
  triangleExpr: triangle("Tiga ungkapan sudut", "Three angle expressions",
    ["3x°", "(2x + 10)°", "(x + 20)°"]),
  quadExpr: quad("Empat ungkapan sudut", "Four angle expressions",
    ["(2a + 10)°", "90°", "(3a − 5)°", "85°"]),
  trapezium65_100: quad("Dua sisi selari", "Two parallel sides",
    ["65°", "100°", undefined, "?"], trapezium, { points: true }),
  equilateralInterior: triangle("Tiga sudut", "Three angles", ["a", "a", "a"], reg(3)),
  allEqualQuad: quad("Empat sudut sama", "Four equal angles", ["a", "a", "a", "a"], rectangle),
  exteriorExpressions: triangleExt("Sudut peluaran", "Exterior angle",
    "(2x + 15)°", "(x + 10)°", "100°"),
  obtuse115_35: triangle("Sudut segi tiga cakah", "Obtuse triangle angles",
    ["115°", "35°", "?"], obtuse),
  parallelExpr: quad("Sudut bersebelahan dalam segi empat selari", "Adjacent parallelogram angles",
    ["(4k + 10)°", "(2k + 50)°", undefined, undefined], parallelogram),
  isoExpr: triangle("Dua sisi sama", "Two equal sides", ["?", "(3x − 5)°", "(2x + 10)°"]),
  rhombusP58: quad("Sudut rombus", "Rhombus angles", ["58°", "?", "?", "?"], rhombus),
  quadOpposite100: quad("Dua pasangan sudut bertentangan", "Two pairs of opposite angles",
    ["100°", "x", "100°", "x"]),
  exterior140_80: triangleExt("Sudut peluaran di C", "Exterior angle at C", "?", "80°", "140°"),
  triangleLinear: triangle("Sudut segi tiga", "Triangle angles",
    ["x°", "(x + 10)°", "(x + 20)°"]),
  rectangleAC: (() => {
    const figure = quad("Pepenjuru AC dalam segi empat tepat", "Diagonal AC in a rectangle",
      [], rectangle, {
      points: true, interiorPaths: [[rectangle[0], rectangle[2]]],
      description: t("Sudut BAC = 35°, sudut ACB tidak diketahui. Sisi bertentangan adalah selari.",
        "Angle BAC = 35°, angle ACB unknown. Opposite sides are parallel."),
    });
    figure.panels[0].labels.push(
      { at: pt(103, 80), text: "35°" }, { at: pt(210, 170), text: "?" },
    );
    return figure;
  })(),

  // Challenge: diagrammatic problems with unknown symbolic angles/sides.
  triChallengeExpr: triangle("Ungkapan sudut", "Angle expressions",
    ["(3x + 5)°", "(2x − 10)°", "(x + 35)°"], tri, { points: true }),
  quadChallengeExpr: quad("Ungkapan sudut", "Angle expressions",
    ["(2x + 10)°", "(x + 20)°", "(3x − 5)°", "(4x − 5)°"], generalQuad, { points: true }),
  isoExtension115: triangleExt("Dua sisi sama dan garis lanjutan", "Equal sides and extended base",
    "?", "?", "115°"),
  ext50_70: triangleExt("Sudut peluaran di C", "Exterior angle at C", "50°", "70°", "?"),
  isoExprY: triangle("Sudut puncak dan dua tapak", "Apex and two base angles",
    ["(4y − 20)°", "(y + 25)°", "(y + 25)°"]),
  parallelOppositeExpr: quad("Sudut bertentangan", "Opposite parallelogram angles",
    ["(5m − 15)°", undefined, "(3m + 25)°", undefined], parallelogram),
  triangleRatio234: triangle("Nisbah sudut 2 : 3 : 4", "Angle ratio 2 : 3 : 4",
    ["2x", "3x", "4x"], scalene),
  quadRatio1234: quad("Nisbah sudut 1 : 2 : 3 : 4", "Angle ratio 1 : 2 : 3 : 4",
    ["x", "2x", "3x", "4x"]),
  rhombusAngle70: quad("Sudut rombus", "Rhombus angles",
    ["?", "70°", "?", "?"], rhombus, { points: true }),
  extAtA: (() => {
    const vertices = [pt(78, 122), pt(238, 43), pt(221, 196)];
    const fig = triangle("Sudut dalaman dan peluaran di A", "Interior and exterior angles at A",
      ["(6t − 10)°"], vertices, {
      points: true, extensions: [[vertices[0], pt(18, 152)]],
    });
    fig.panels[0].labels.push({ at: pt(90, 164), text: "(4t + 20)°" });
    return fig;
  })(),
  ext130Equal: triangleExt("Sudut peluaran dan dua sudut tapak sama",
    "Exterior angle and two equal base angles", "x", "x", "130°"),
  rightExpr: triangle("Sudut tirus dalam segi tiga bersudut tegak",
    "Acute angles in a right triangle", ["90°", "(2x + 5)°", "(3x − 10)°"], right),
  sixFoldShape: shape("Poligon dengan simetri", "Polygon with symmetry", reg(6)),
  quadPExpr: quad("Sudut segi empat", "Quadrilateral angles",
    ["3p", "2p", "4p", "p"]),
  exteriorB115: (() => {
    const fig = triangle("Sudut peluaran di B", "Exterior angle at B",
      ["55°", "?"], tri, { points: true, extensions: [[tri[1], pt(30, 226)]] });
    fig.panels[0].labels.push({ at: pt(22, 188), text: "115°" });
    return fig;
  })(),
  parallelPExpr: quad("Sudut bersebelahan segi empat selari",
    "Adjacent parallelogram angles", ["(7n − 5)°", "(3n + 45)°", undefined, undefined],
    parallelogram, { points: true }),
  isoSide8_8_6: triangle("Sisi dan sudut segi tiga", "Triangle sides and angle",
    ["?", "70°", "70°"], tri, { sideLabels: [
      { side: 0, text: "8 cm" }, { side: 1, text: "6 cm" },
      { side: 2, text: "8 cm" },
    ] }),
  trapeziumExpr: quad("Dua sudut pada sisi rentas", "Angles along one transversal",
    ["(2x + 10)°", undefined, undefined, "(3x − 20)°"],
    trapezium, { points: true }),
  diagonalSplit: quad("Satu pepenjuru membahagi dua segi tiga",
    "One diagonal divides a quadrilateral", [], generalQuad,
    { interiorPaths: [[generalQuad[0], generalQuad[2]]] }),
  rightRatio4to1: triangle("Dua sudut tirus", "Two acute angles",
    ["90°", "x", "4x"], right),
  quadOppositeRelations: quad("Sudut sepasang sama", "Equal opposite angles",
    ["2x", "x", "2x", "x"]),
  isoApexTwice: triangle("Sudut puncak dua kali sudut tapak", "Apex twice each base angle",
    ["2x", "x", "x"]),
  quad75_105_75: quad("Sudut segi empat PQRS", "Angles of PQRS",
    ["75°", "105°", "75°", "?"], generalQuad, { points: true }),
  equalLegRight: triangle("Sisi tegak sama", "Equal perpendicular legs",
    ["90°", "x", "x"], right),
  parallelDifference40: quad("Beza dua sudut bersebelahan", "Difference between adjacent angles",
    ["x", "y", "x", "y"], parallelogram),
  rightTrapezium: quad("Sisi AB selari dengan CD", "AB parallel to CD",
    ["90°", undefined, undefined, "90°"],
    [pt(74, 66), pt(215, 66), pt(266, 191), pt(74, 191)], { points: true }),
  extAlgebra110: triangleExt("Sudut peluaran C", "Exterior angle at C",
    "(4k + 10)°", "(3k − 5)°", "110°"),
  isoABCABBC: triangle("AB = BC dalam segi tiga", "AB = BC in triangle",
    ["40°", "?", "40°"], tri, { points: true }),
  kiteP80R60: quad("Sudut layang-layang PQRS", "Angles in kite PQRS",
    ["80°", "?", "60°", "?"], kite, { points: true }),
} satisfies Record<string, MathQuestionVisual>;
