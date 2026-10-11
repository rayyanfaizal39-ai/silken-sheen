import type {
  MathGeometryVisual,
  GeometryPoint,
} from "@/features/quiz/visuals/mathGeometryVisual";
import { diagram, label, path, t } from "../quiz-geometry";
import {
  circleDiagram as c,
  circlePoint,
  twoTangents as tt,
  tangentTriangle as rt,
  angleMark,
} from "../quiz-circles";
const extend = (
  a: GeometryPoint,
  b: GeometryPoint,
  f = 0.35,
): GeometryPoint => [b[0] + f * (b[0] - a[0]), b[1] + f * (b[1] - a[1])];
const cyclic = { P: 0, Q: 60, R: 120, S: 250 };
const rsT = extend(circlePoint(120), circlePoint(250), 0.12);
function commonTangents(distance: number, r1: number, r2: number) {
  const centres: GeometryPoint[] = [
    [85, 125],
    [85 + distance, 125],
  ];
  return diagram(t("Tangen sepunya", "Common tangents"), {
    title: t("Dua bulatan", "Two circles"),
    description: t(
      "Kedudukan bulatan seperti dalam soalan.",
      "Circle positions as stated in the question.",
    ),
    circles: [
      { centre: centres[0], radius: r1 },
      { centre: centres[1], radius: r2 },
    ],
    labels: [label(85, 125, "O₁"), label(85 + distance, 125, "O₂")],
  });
}
function externalTangent() {
  const c1: GeometryPoint = [90, 140],
    c2: GeometryPoint = [90 + 20 * Math.sqrt(48), 120],
    p: GeometryPoint = [90, 60],
    q: GeometryPoint = [90 + 20 * Math.sqrt(48), 60],
    e: GeometryPoint = [90, 120];
  const mark = angleMark({ A: c1, B: c2, E: e }, "B", "A", "E", "x", 23);
  return diagram(t("Tangen sepunya luar", "Common external tangent"), {
    title: t("Jejari serenjang tangen", "Radii perpendicular to tangent"),
    description: t(
      "O₁P = 4 cm, O₂Q = 3 cm dan O₁O₂ = 7 cm. E berada pada O₁P dan O₂E selari dengan tangen PQ. x ialah sudut EO₁O₂.",
      "O₁P = 4 cm, O₂Q = 3 cm and O₁O₂ = 7 cm. E lies on O₁P and O₂E is parallel to tangent PQ. x is angle EO₁O₂.",
    ),
    circles: [
      { centre: c1, radius: 80 },
      { centre: c2, radius: 60 },
    ],
    paths: [
      path([
        [50, 60],
        [295, 60],
      ]),
      path([p, c1, c2, q]),
      path([e, c2], false, true),
      path([
        [90, 70],
        [100, 70],
        [100, 60],
      ]),
      path([
        [90 + 20 * Math.sqrt(48), 70],
        [238.56, 70],
        [238.56, 60],
      ]),
    ],
    arcs: [mark.arc],
    labels: [
      label(74, 155, "O₁"),
      label(240, 136, "O₂"),
      label(85, 47, "P"),
      label(231, 47, "Q"),
      label(75, 121, "E"),
      label(113, 85, "4 cm"),
      label(251, 94, "3 cm"),
      label(173, 157, "7 cm"),
      mark.label,
    ],
  });
}
export const MATH_F3_C6_QUIZ_VISUALS: Partial<
  Record<number, MathGeometryVisual>
> = {
  54: c(
    { A: 0, B: 104, C: 230 },
    ["ABC", "CA", "TAS"],
    [
      ["A", "C", "B", "52°"],
      ["T", "A", "B", "x"],
    ],
    [],
    { T: [225, 25], S: [225, 220] },
  ),
  1: c({ A: 0, B: 190, C: 110, D: 270 }, ["AB", "BC", "AD", "DC"]),
  2: c({ P: 40, Q: 180, R: 320 }, ["PO", "OR", "PQ", "QR"]),
  3: c(
    { A: 0, B: 115, C: 180 },
    ["AC", "AB", "BC"],
    [],
    [t("AC: diameter", "AC: diameter")],
  ),
  4: c({ A: 20, B: 110, C: 200, D: 300 }, ["ABCD A".replaceAll(" ", "")]),
  5: c({ A: 20, B: 110, C: 200, D: 300 }, ["ABCDA"]),
  6: c(cyclic, ["PQRSP", "RST"], [], [], { T: rsT }),
  7: rt(["O", "B", "A"], 45, []),
  8: rt(["O", "B", "A"], 45, []),
  9: tt(["P", "Q", "R"], 55),
  10: c({ M: 0, K: 120, L: 240 }, ["MK", "KL", "LM", "PMN"], [], [], {
    P: [225, 30],
    N: [225, 215],
  }),
  11: c(
    { P: 40, Q: 180, R: 320 },
    ["PO", "OR", "PQ", "QR"],
    [["P", "O", "R", "80°"]],
  ),
  12: c(
    { P: 35, Q: 180, R: 325 },
    ["PO", "OR", "PQ", "QR"],
    [["P", "Q", "R", "35°"]],
  ),
  13: commonTangents(130, 40, 30),
  14: commonTangents(90, 50, 40),
  15: commonTangents(70, 50, 40),
  16: rt(["O", "B", "A"], 45, []),
  17: c({ P: 35, Q: 325 }, ["PO", "OQ"]),
  18: c({ P: 35, Q: 325 }, ["PO", "OQ"]),
  19: c(
    { P: 0, Q: 90, R: 180, S: 270 },
    ["PR", "QS", "PQ", "QR", "PS"],
    [["Q", "P", "R", "45°"]],
  ),
  21: c(
    { K: 100, L: 190, M: 270, N: 38 },
    ["KLMNK"],
    [
      ["L", "K", "N", "104°"],
      ["L", "M", "N", "8x°"],
    ],
  ),
  22: c(
    { K: 100, L: 190, M: 296, N: 38 },
    ["KLMNK"],
    [
      ["K", "N", "M", "98°"],
      ["K", "L", "M", "4y°"],
    ],
  ),
  23: c(
    cyclic,
    ["PQRSP"],
    [
      ["P", "Q", "R", "4y°"],
      ["P", "S", "R", "2y°"],
    ],
  ),
  24: c(
    cyclic,
    ["PQRSP", "RST"],
    [
      ["P", "Q", "R", "4y°"],
      ["P", "S", "R", "2y°"],
    ],
    [],
    { T: rsT },
  ),
  25: rt(["O", "B", "A"], 48, [["A", "O", "B", "42°"]]),
  26: tt(["Q", "P", "R"], 24, ["O", "Q", "P", "66°"]),
  27: tt(["Q", "P", "R"], 55, undefined, ["QP = 14 cm"]),
  28: rt(["O", "P", "Q"], 24, [["O", "Q", "P", "24°"]], ["QP = 14 cm"]),
  29: tt(["P", "Q", "R"], 60, ["Q", "S", "R", "60°"], [], ["S", 180]),
  30: tt(["T", "P", "S"], 48, ["P", "Q", "S", "48°"], [], ["Q", 180]),
  31: c(
    { P: 42, Q: 180, S: 318 },
    ["PO", "OS", "PQ", "QS"],
    [["P", "O", "S", "84°"]],
  ),
  32: c(
    { P: 0, Q: 90, R: 160, S: 300 },
    ["PQRSP", "PR", "QS"],
    [
      ["Q", "P", "R", "35°"],
      ["P", "S", "Q", "45°"],
    ],
    [t("lengkok RS = 2 × QR", "arc RS = 2 × QR")],
  ),
  33: c(
    { A: 0, B: 60, C: 160, D: 320 },
    ["ABCDA", "BD"],
    [
      ["A", "D", "B", "30°"],
      ["A", "B", "D", "20°"],
    ],
  ),
  34: c(
    { P: 0, S: 60, R: 80, Q: 220 },
    ["PO", "OS", "OR", "PS", "PQ", "QR"],
    [["S", "O", "R", "20°"]],
    ["OP = OS = PS"],
  ),
  35: c(
    { K: 0, L: 55, M: 110, N: 250 },
    ["KLMNK"],
    [["K", "N", "M", "55°"]],
    ["KL = LM"],
  ),
  36: c(
    { R: 35, S: 325, Q: 180 },
    ["RO", "OS", "RQ", "QS"],
    [["R", "O", "S", "70°"]],
    ["d = 16 cm"],
  ),
  37: c(
    { P: 0, Q: 60, R: 120, S: 240 },
    ["PQRSP", "PR", "QS"],
    [["P", "S", "Q", "30°"]],
    ["PQ = QR"],
  ),
  38: externalTangent(),
  39: tt(["Y", "V", "W"], 60, undefined, ["WY = 1.2 m; d = 50 cm"]),
  40: rt(
    ["O", "V", "Y"],
    (Math.atan(0.25 / 1.2) * 180) / Math.PI,
    [],
    ["OV = 0.25 m; VY = 1.2 m"],
  ),
  41: c({ Q: 0, S: 180, R: 50 }, ["QS", "OR", "SR"], [["Q", "O", "R", "50°"]]),
  42: c({ Q: 0, S: 180, P: 50 }, ["QS", "QP", "PS"], [["P", "S", "Q", "25°"]]),
  43: c(
    { Q: 0, S: 180, P: 110 },
    ["QS", "QP", "PS"],
    [["P", "Q", "S", "35°"]],
    ["QS = 16 cm"],
  ),
  44: c(
    { P: 0, R: 180, Q: 80 },
    ["PR", "PQ", "QR"],
    [["P", "R", "Q", "40°"]],
    ["PR = 16 cm"],
  ),
  45: c(
    { A: 200, B: 0, C: 79, D: 158 },
    ["ABCDA", "OB", "OD", "DCE"],
    [["B", "O", "D", "158°"]],
    [],
    { E: extend(circlePoint(158), circlePoint(79)) },
  ),
  46: c(
    { P: 0, Q: 108, R: 180, S: 252 },
    ["PQRSP", "QS", "RST"],
    [
      ["Q", "P", "S", "72°"],
      ["Q", "S", "R", "36°"],
    ],
    [],
    { T: extend(circlePoint(180), circlePoint(252), 0.25) },
  ),
  47: c(
    { A: 0, B: 72, C: 144, D: 180 },
    ["ABCDA", "BD", "AC"],
    [["B", "C", "D", "126°"]],
    [t("AD: diameter; lengkok AB = BC", "AD: diameter; arc AB = BC")],
  ),
  48: tt(
    ["P", "Q", "R"],
    60,
    ["Q", "S", "R", "60°"],
    ["OQ = OR = 5 cm"],
    ["S", 180],
  ),
  49: rt(["O", "Q", "P"], 35, [], ["OQ = 5 cm; PQ = ?"]),
  50: rt(["O", "P", "R"], 25, [["O", "R", "P", "25°"]], ["OP = 3 cm"]),
  51: rt(["O", "P", "S"], 65, [["P", "O", "S", "25°"]], ["OP = 3 cm"]),
  52: c(
    { M: 0, K: 120, L: 240 },
    ["MK", "KL", "LM", "PMN"],
    [["K", "L", "M", "60°"]],
    [],
    { P: [225, 30], N: [225, 215] },
  ),
  53: c(
    { L: 0, A: 108, B: 240 },
    ["LABL", "KL"],
    [["K", "L", "A", "54°"]],
    [],
    { K: [225, 30] },
  ),
  55: c(
    { A: 0, B: 70, C: 140, D: 190 },
    ["ABCDA", "AC", "AT"],
    [
      ["A", "B", "C", "110°"],
      ["C", "A", "D", "25°"],
    ],
    [],
    { T: [225, 215] },
  ),
};
