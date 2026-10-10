import type { MathGeometryVisual, GeometryPanel, GeometryPoint } from "@/features/quiz/visuals/mathGeometryVisual";
import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";

/**
 * Form 1 Chapter 8 — Lines and Angles.
 *
 * These are topologically correct, static SVGs. For angle problems the original
 * given measures/variables appear beside the relevant regions, never computed
 * values. The existing renderer explicitly labels each drawing "not to scale".
 * A single shared object serves both BM and DLP question banks.
 */
const t = (bm: string, dlp: string) => ({ bm, dlp });
const p = (x: number, y: number): GeometryPoint => [x, y];
const polar = (x: number, y: number, r: number, deg: number): GeometryPoint =>
  p(x + r * Math.cos(deg * Math.PI / 180), y + r * Math.sin(deg * Math.PI / 180));
const base = t(
  "Nilai sudut yang diketahui sahaja ditunjukkan. Rajah tidak mengikut skala.",
  "Only given angle values are shown. Diagram not to scale.",
);
const make = (bm: string, dlp: string, ...panels: GeometryPanel[]): MathGeometryVisual => ({
  kind: "geometry-diagram",
  title: t(bm, dlp),
  panels,
});
const panel = (
  paths: GeometryPanel["paths"], labels: GeometryPanel["labels"],
  arcs?: GeometryPanel["arcs"],
): GeometryPanel => ({
  title: t("Rajah sudut", "Angle diagram"),
  description: base,
  paths,
  labels,
  ...(arcs ? { arcs } : {}),
});

// Angles measured clockwise from the right-hand ray: reflex arcs really sweep > 180°.
const angle = (measure: number): MathGeometryVisual => {
  const origin = p(145, 124);
  return make(t("Sudut", "Angle").bm + " " + measure + "°",
    "Angle " + measure + "°",
    panel([
      { points: [origin, p(258, 124)] },
      { points: [origin, polar(145, 124, 110, measure)] },
    ], [{ at: polar(145, 124, 70, measure / 2), text: measure + "°" }],
    [{ centre: origin, radius: 42, start: 0, end: measure }]));
};

// Two rays divide the UPPER side of a straight line; the sum is left unsolved.
const straight = (
  bm: string, dlp: string, a: string, b: string, tilt: "left" | "right" = "left",
): MathGeometryVisual => make(bm, dlp, panel(
  [
    { points: [p(23, 179), p(276, 179)] },
    { points: [p(150, 179), tilt === "left" ? p(102, 47) : p(208, 47)] },
  ],
  [{ at: p(92, 142), text: a }, { at: p(214, 142), text: b }],
));
const straightThree = (
  bm: string, dlp: string, a: string, b: string, c: string,
): MathGeometryVisual => make(bm, dlp, panel(
  [
    { points: [p(20, 183), p(280, 183)] },
    { points: [p(150, 183), p(103, 53)] },
    { points: [p(150, 183), p(215, 68)] },
  ],
  [
    { at: p(68, 143), text: a },
    { at: p(155, 98), text: b },
    { at: p(239, 143), text: c },
  ],
));
// Arc sectors meet at a common point; supplied values remain unchanged.
const around = (bm: string, dlp: string, labels: string[], sectors: number[]): MathGeometryVisual => {
  if (labels.length !== sectors.length) throw new Error("All sectors need labels");
  let start = 0;
  const paths: NonNullable<GeometryPanel["paths"]> = [];
  const arcs: NonNullable<GeometryPanel["arcs"]> = [];
  const texts: GeometryPanel["labels"] = [];
  const center = p(150, 121);
  for (let i = 0; i < sectors.length; i++) {
    paths.push({ points: [center, polar(150, 121, 95, start)] });
    arcs.push({ centre: center, radius: 40, start, end: start + sectors[i] });
    texts.push({ at: polar(150, 121, 66, start + sectors[i] / 2), text: labels[i] });
    start += sectors[i];
  }
  return make(bm, dlp, panel(paths, texts, arcs));
};
const crossing = (
  bm: string, dlp: string, top?: string, right?: string, bottom?: string,
  left?: string, endpointLabels = false,
): MathGeometryVisual => make(bm, dlp, panel([
  { points: [p(50, 43), p(247, 202)] },
  { points: [p(53, 197), p(245, 43)] },
], [
  ...(top ? [{ at: p(151, 68), text: top }] : []),
  ...(right ? [{ at: p(221, 125), text: right }] : []),
  ...(bottom ? [{ at: p(150, 184), text: bottom }] : []),
  ...(left ? [{ at: p(84, 124), text: left }] : []),
  ...(endpointLabels ? [
    { at: p(34, 37), text: "A" },
    { at: p(267, 215), text: "B" },
    { at: p(265, 34), text: "C" },
    { at: p(35, 216), text: "D" },
    { at: p(150, 130), text: "O" },
  ] : []),
));
type AnglePosition =
  | "corresponding-acute" | "corresponding-obtuse"
  | "cointerior-left" | "cointerior-right" | "alternate" | "top-left-mirrored";
const parallel = (
  bm: string, dlp: string, a: string, b: string, position: AnglePosition,
  third?: string,
): MathGeometryVisual => {
  const mirror = position === "top-left-mirrored";
  const guides = mirror
    ? [{ points: [p(216, 21), p(84, 219)] }]
    : [{ points: [p(94, 21), p(218, 219)] }];
  const pos: Record<AnglePosition, [GeometryPoint, GeometryPoint]> = {
    "corresponding-acute": [p(80, 57), p(137, 146)],
    "corresponding-obtuse": [p(190, 57), p(246, 146)],
    "cointerior-left": [p(99, 113), p(148, 133)],
    "cointerior-right": [p(180, 116), p(227, 137)],
    alternate: [p(175, 116), p(146, 134)],
    "top-left-mirrored": [p(99, 57), p(59, 149)],
  };
  const [first, second] = pos[position];
  return make(bm, dlp, panel([
    { points: [p(20, 76), p(281, 76)] },
    { points: [p(20, 166), p(281, 166)] },
    ...guides,
    // Matching arrow marks show the lines are parallel, not angle measures.
    { points: [p(251, 68), p(261, 76), p(251, 84)] },
    { points: [p(251, 158), p(261, 166), p(251, 174)] },
  ], [
    { at: first, text: a }, { at: second, text: b },
    ...(third ? [{ at: p(229, 136), text: third }] : []),
  ]));
};

const elevation = (bm: string, dlp: string, measure: string, depression = false):
  MathGeometryVisual => make(bm, dlp, panel(depression ? [
  { points: [p(52, 46), p(277, 46)], dashed: true },
  { points: [p(52, 46), p(52, 191)] },
  { points: [p(52, 46), p(269, 191)] },
  { points: [p(30, 191), p(279, 191)] },
] : [
  { points: [p(45, 190), p(277, 190)], dashed: true },
  { points: [p(45, 190), p(261, 62)] },
  { points: [p(261, 62), p(261, 190)] },
], depression ? [
  { at: p(112, 72), text: measure },
  { at: p(255, 175), text: t("Bot", "Boat") },
  { at: p(50, 27), text: t("Pemerhati", "Observer") },
] : [
  { at: p(96, 173), text: measure },
  { at: p(261, 46), text: t("Puncak", "Top") },
  { at: p(44, 215), text: "A" },
]));

/** No model includes an answer such as x=, a solved angle, or an angle category. */
export const MATH_F1_C8_QUIZ_VISUALS = {
  // Foundation: only explicitly-given angles and a straight-line reference.
  angle145: angle(145),
  angle250: angle(250),
  angle55: angle(55),
  pair47: make("Dua sudut dengan ukuran yang diberi", "Two angles with given measures",
    angle(47).panels[0],
    { ...angle(47).panels[0], title: t("Sudut kedua", "Second angle") }),
  straightReference: straight("Sudut pada garis lurus", "Angles on a straight line", "a", "b"),

  // Practice: geometry questions benefit from an actual labelled diagram.
  straight75: straight("Dua sudut pada garis lurus", "Two angles on a straight line", "75°", "x", "left"),
  straight40_60: straightThree("Tiga sudut pada garis lurus", "Three angles on a straight line",
    "40°", "60°", "y"),
  fullTurn90_120_80: around("Empat sudut pada satu titik", "Four angles at one point",
    ["90°", "120°", "80°", "z"], [90, 120, 80, 70]),
  complement38: make("Sudut pelengkap", "Complementary angles", panel(
    [{ points: [p(72, 185), p(72, 54)] }, { points: [p(72, 185), p(252, 185)] },
      { points: [p(72, 185), p(176, 76)] },
      { points: [p(72, 170), p(90, 170), p(90, 185)] }],
    [{ at: p(104, 125), text: "38°" }, { at: p(184, 159), text: "?" }])),
  supplement115: straight("Sudut penggenap", "Supplementary angles", "115°", "?", "right"),
  conjugate135: around("Sudut konjugat pada satu titik", "Conjugate angles about a point",
    ["135°", "?"], [135, 225]),
  opposite65: crossing("Sudut bertentang bucu", "Vertically opposite angles", "65°", undefined, "x"),
  opposite3a120: crossing("Sudut bertentang bucu", "Vertically opposite angles", "3a", undefined, "120°"),
  opposite55: crossing("Empat sudut daripada dua garis", "Four angles from intersecting lines",
    "55°", "?", "?", "?"),
  adjacent148: straight("Sudut bersebelahan", "Adjacent angles", "148°", "y", "right"),
  opposite2x80: crossing("Sudut bertentang bucu", "Vertically opposite angles",
    "(2x + 10)°", undefined, "80°"),
  complementX15: make("Dua sudut pelengkap", "Two complementary angles", panel(
    [{ points: [p(72, 185), p(72, 54)] }, { points: [p(72, 185), p(252, 185)] },
      { points: [p(72, 185), p(176, 76)] },
      { points: [p(72, 170), p(90, 170), p(90, 185)] }],
    [{ at: p(107, 124), text: "(x + 15)°" }, { at: p(190, 155), text: "40°" }])),
  supplement3y70: straight("Dua sudut penggenap", "Two supplementary angles",
    "(3y − 10)°", "70°", "right"),
  corresponding110: parallel("Sudut sepadan", "Corresponding angles", "110°", "x",
    "corresponding-obtuse"),
  alternate65: parallel("Sudut selang-seli", "Alternate angles", "65°", "x", "alternate"),
  cointerior75: parallel("Sudut pedalaman sebelah", "Co-interior angles", "75°", "x",
    "cointerior-right"),
  corresponding5x80: parallel("Sudut sepadan", "Corresponding angles",
    "(5x − 20)°", "80°", "corresponding-acute"),
  alternate4y85: parallel("Sudut selang-seli", "Alternate angles",
    "(4y + 5)°", "85°", "alternate"),
  cointerior3z75: parallel("Sudut pedalaman sebelah", "Co-interior angles",
    "(3z + 15)°", "75°", "cointerior-left"),
  straightX20_50: straightThree("Tiga sudut pada garis lurus", "Three angles on a straight line",
    "(x + 20)°", "50°", "(x − 10)°"),
  corresponding120: parallel("Sudut sepadan pada dua garis selari",
    "Corresponding angles in parallel lines", "120°", "x", "corresponding-obtuse"),
  straight2x5_3x5: straight("Dua sudut pada garis lurus", "Two angles on a straight line",
    "(2x + 5)°", "(3x − 5)°", "left"),
  fullTurn200: around("Dua sudut pada satu putaran lengkap", "Two angles in a complete turn",
    ["200°", "y"], [200, 160]),
  crossing40: crossing("Empat sudut pada persilangan", "Four intersecting angles",
    "40°", "y", "40°", "z"),
  cointerior2p4p: parallel("Dua sudut pedalaman sebelah", "Two co-interior angles",
    "2p", "4p", "cointerior-right"),

  // Challenge: given algebraic angles, real-world elevations and transversals.
  correspondingExpr: parallel("Sudut sepadan dengan ungkapan", "Corresponding algebraic angles",
    "(2x + 15)°", "(3x − 10)°", "corresponding-acute"),
  straight3x_1x60: straightThree("Tiga sudut pada garis lurus", "Three angles on a straight line",
    "(3x + 5)°", "(x + 15)°", "60°"),
  opposite5a2a: crossing("Sudut bertentang bucu", "Vertically opposite angles",
    "(5a − 30)°", undefined, "(2a + 15)°"),
  cointerior3x2x: parallel("Sudut pedalaman yang bersebelahan", "Co-interior angles",
    "(3x + 10)°", "(2x + 20)°", "cointerior-left"),
  elevation35: elevation("Sudut dongak dari tanah", "Angle of elevation from the ground",
    "35°"),
  depression40: elevation("Sudut tunduk dari atas menara", "Angle of depression from a tower",
    "40°", true),
  cointerior6x130: parallel("Sudut pedalaman yang bersebelahan", "Co-interior angles",
    "(6x − 10)°", "130°", "cointerior-right"),
  straight3y2y: straight("Sudut bersebelahan pada garis lurus", "Adjacent angles on a straight line",
    "(3y + 20)°", "(2y + 40)°", "left"),
  parallelA75: parallel("Sudut di A dan B", "Angles at A and B",
    "75°", "x", "alternate", "y"),
  lighthouse35: elevation("Rumah api dan bot", "Lighthouse and boat",
    "35°", true),
  corresponding125: parallel("Sudut sepadan di A dan B", "Corresponding angles at A and B",
    "125°", "x", "top-left-mirrored"),
  parallelAcute72: parallel("Sudut daripada garis selari", "Angles formed by parallel lines",
    "72°", "?", "corresponding-acute"),
  cointerior4p2p: parallel("Sudut pedalaman pada sisi yang sama", "Co-interior angles",
    "(4p + 10)°", "(2p + 20)°", "cointerior-left"),
  crossing2m3m: crossing("Empat sudut di titik persilangan", "Four angles at an intersection",
    "2m", "3m", "2m", "3m"),
  carCloser: make("Sudut tunduk kepada dua kedudukan kereta",
    "Depression angles to two positions of a car", panel([
    { points: [p(54, 44), p(276, 44)], dashed: true },
    { points: [p(54, 44), p(54, 202)] },
    { points: [p(54, 44), p(271, 202)] },
    { points: [p(54, 44), p(183, 202)] },
    { points: [p(30, 202), p(284, 202)] },
  ], [
    { at: p(121, 67), text: "28°" },
    { at: p(122, 100), text: "?" },
    { at: p(258, 221), text: t("Kereta jauh", "Far car") },
    { at: p(173, 221), text: t("Kereta dekat", "Near car") },
  ])),
  straightX30_2x10_x20: straightThree("Tiga sudut pada satu garis lurus",
    "Three angles on one straight line", "(x + 30)°", "(2x − 10)°", "(x + 20)°"),
  parallel85: parallel("Sudut tirus dan sudut cakah", "Acute and obtuse angles",
    "85°", "?", "corresponding-acute"),
  elevationCompare: make("Dua titik melihat puncak yang sama",
    "Two points viewing the same tower", panel([
    { points: [p(24, 200), p(276, 200)] },
    { points: [p(264, 60), p(264, 200)] },
    { points: [p(28, 200), p(264, 60)] },
    { points: [p(125, 200), p(264, 60)] },
  ], [
    { at: p(40, 185), text: "25°" },
    { at: p(151, 182), text: "40°" },
    { at: p(29, 222), text: "A" },
    { at: p(125, 222), text: "B" },
    { at: p(263, 46), text: "C" },
  ])),
  pointFourExpressions: around("Empat sudut pada satu titik", "Four angles about a point",
    ["(3a + 10)°", "(2a + 20)°", "(4a − 10)°", "(a + 20)°"], [80, 100, 90, 90]),
  pointThreeExpressions: around("Tiga sudut pada satu titik", "Three angles at one point",
    ["2x", "3x", "(x + 60)°"], [105, 140, 115]),
  conjugateFourTimes: around("Sudut dan konjugatnya", "An angle and its conjugate",
    ["x", "4x"], [72, 288]),
  opposite4x2x: crossing("Sudut bertentang bucu dan bersebelahan",
    "Vertically opposite and adjacent angles",
    "(4x − 15)°", "?", "(2x + 25)°"),
  crossingABCD: crossing("Garis lurus AB dan CD bersilang di O",
    "Straight lines AB and CD intersect at O", "3x", "2x", undefined, "?", true),
} satisfies Record<string, MathQuestionVisual>;
