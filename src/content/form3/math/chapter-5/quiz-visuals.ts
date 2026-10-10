import type { GeometryPanel } from "@/features/quiz/visuals/mathGeometryVisual";
import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { diagram, label, path, t, triangle } from "../quiz-geometry";
const tri = (
  names: [string, string, string],
  ab: string,
  bc: string,
  ac: string,
  angle?: string,
  at: "A" | "C" = "A",
) =>
  diagram(
    t("Segi tiga bersudut tegak", "Right-angled triangle"),
    triangle(t(names.join("")), names, ab, bc, ac, angle, at),
  );
const pqr = (
  a: string,
  b: string,
  c: string,
  angle?: string,
  at: "A" | "C" = "A",
) => tri(["P", "Q", "R"], a, b, c, angle, at);
const special = (angle: string) => tri(["A", "B", "C"], "", "", "", angle);
function hexagon(target: "angle" | "length"): GeometryPanel {
  const points = Array.from(
    { length: 6 },
    (_, i) =>
      [
        150 + 78 * Math.cos((i * Math.PI) / 3),
        125 - 78 * Math.sin((i * Math.PI) / 3),
      ] as [number, number],
  );
  return {
    title: t("PQRSTU"),
    description: t(
      "Heksagon sekata; P,Q,R,S,T,U mengikut turutan. PS menyambungkan bucu bertentangan.",
      "Regular hexagon with consecutive vertices P,Q,R,S,T,U. PS joins opposite vertices.",
    ),
    paths: [
      path(points, true),
      path([points[0], points[3]], false, true),
      ...(target === "angle" ? [path([points[0], points[4], points[3]])] : []),
    ],
    arcs:
      target === "angle"
        ? [{ centre: points[4], radius: 23, start: -120, end: -30 }]
        : [],
    labels: [
      ...points.map(([x, y], i) =>
        label(x + (x - 150) * 0.18, y + (y - 125) * 0.18 + 5, "PQRSTU"[i]),
      ),
      ...(target === "length"
        ? [label(238, 85, "6 cm"), label(150, 113, "PS = ?")]
        : [label(110, 176, "?")]),
    ],
  };
}
const rect = (target: "tan" | "length"): GeometryPanel => ({
  title: t("PQRS"),
  description: t(
    "Segi empat tepat PQRS dengan pepenjuru QS.",
    "Rectangle PQRS with diagonal QS.",
  ),
  paths: [
    path(
      [
        [65, 70],
        [235, 70],
        [235, 190],
        [65, 190],
      ],
      true,
    ),
    path(
      [
        [235, 70],
        [65, 190],
      ],
      false,
      true,
    ),
    path([
      [80, 70],
      [80, 85],
      [65, 85],
    ]),
  ],
  arcs:
    target === "tan"
      ? [{ centre: [235, 70], radius: 32, start: 145, end: 180 }]
      : [],
  labels: [
    label(53, 60, "P"),
    label(248, 60, "Q"),
    label(248, 203, "R"),
    label(53, 203, "S"),
    label(150, 48, "12 cm"),
    label(263, 135, "7 cm"),
    ...(target === "tan" ? [label(192, 86, "θ")] : [label(142, 135, "QS = ?")]),
  ],
});
const abc = (hyp: string) => tri(["A", "B", "C"], "21 cm", "?", hyp, "θ");
export const MATH_F3_C5_QUIZ_VISUALS: Partial<
  Record<number, MathQuestionVisual>
> = {
  1: special("θ"),
  2: special("θ"),
  3: special("θ"),
  4: special("θ"),
  6: special("30°"),
  7: special("60°"),
  8: special("45°"),
  9: special("45°"),
  10: special("30°"),
  11: special("60°"),
  17: pqr("15 cm", "8 cm", "?"),
  18: pqr("15 cm", "8 cm", "?", "θ", "C"),
  21: pqr("?", "?", "20 cm", "θ"),
  22: pqr("?", "12 cm", "20 cm"),
  23: pqr("?", "12 cm", "20 cm", "θ"),
  24: tri(["A", "B", "C"], "?", "3", "8", "θ"),
  32: pqr("?", "2.5 m", "?", "50°"),
  33: tri(["C", "H", "G"], "5 cm", "8 cm", "?"),
  34: tri(["C", "G", "F"], "√89 cm", "4 cm", "?", "θ"),
  35: tri(["C", "G", "F"], "√89 cm", "4 cm", "?", "?"),
  36: diagram(t("Tangga lipat", "Folding ladder"), {
    title: t("PQR"),
    description: t(
      "PQ = QR. T ialah titik tengah PR. QT tegak lurus PR. Sudut PQR ialah 38°.",
      "PQ = QR. T is the midpoint of PR. QT is perpendicular to PR. Angle PQR is 38°.",
    ),
    paths: [
      path(
        [
          [65, 195],
          [150, 45],
          [235, 195],
        ],
        true,
      ),
      path(
        [
          [150, 45],
          [150, 195],
        ],
        false,
        true,
      ),
      path([
        [150, 180],
        [165, 180],
        [165, 195],
      ]),
    ],
    arcs: [{ centre: [150, 45], radius: 42, start: 60, end: 120 }],
    labels: [
      label(53, 204, "P"),
      label(150, 31, "Q"),
      label(247, 204, "R"),
      label(145, 210, "T"),
      label(110, 116, "PQ = ?"),
      label(150, 103, "38°"),
      label(150, 232, "PR = 1.4 m"),
    ],
  }),
  37: diagram(t("Sudut dongak", "Angle of elevation"), {
    ...triangle(
      t("Garis pandang dari mata", "Line of sight from eye"),
      ["", "", ""],
      "d = ?",
      "",
      "145 m",
      "55°",
    ),
    description: t(
      "Sudut 55° pada mata di kiri, diukur dari garis mengufuk; garis condong ialah garis pandang 145 m.",
      "The 55° angle is at the eye on the left, measured from the horizontal; the sloping line is the 145 m line of sight.",
    ),
  }),
  38: diagram(t("Sudut tunduk", "Angle of depression"), {
    title: t("Rumah api dan kapal", "Lighthouse and ship"),
    description: t(
      "Garis mengufuk melalui hujung rumah api selari dengan permukaan laut. Sudut tunduk 41° di hujung rumah api.",
      "The horizontal through the lighthouse top is parallel to sea level. The depression angle is 41° at the top.",
    ),
    paths: [
      path(
        [
          [60, 45],
          [60, 190],
          [245, 190],
        ],
        true,
      ),
      path(
        [
          [60, 45],
          [255, 45],
        ],
        false,
        true,
      ),
      path([
        [60, 175],
        [75, 175],
        [75, 190],
      ]),
    ],
    arcs: [{ centre: [60, 45], radius: 42, start: 0, end: 38 }],
    labels: [
      label(28, 127, "h = ?"),
      label(160, 218, "200 m"),
      label(109, 63, "41°"),
      label(245, 183, t("Kapal", "Ship")),
    ],
  }),
  39: tri(["Q", "R", "P"], "?", "", "10 cm", "60°"),
  40: tri(["P", "R", "S"], "15 cm", "√75 cm", "?"),
  41: diagram(
    t("Pepenjuru segi empat tepat", "Rectangle diagonal"),
    rect("tan"),
  ),
  42: diagram(
    t("Pepenjuru segi empat tepat", "Rectangle diagonal"),
    rect("length"),
  ),
  43: diagram(
    t("Sudut dalam heksagon", "Angle in a hexagon"),
    hexagon("angle"),
  ),
  44: diagram(t("Pepenjuru heksagon", "Hexagon diagonal"), hexagon("length")),
  45: diagram(t("Titik tengah sisi", "Side midpoint"), {
    title: t("ABCD"),
    description: t(
      "Segi empat tepat ABCD. N ialah titik tengah BC.",
      "Rectangle ABCD. N is the midpoint of BC.",
    ),
    paths: [
      path(
        [
          [65, 45],
          [235, 45],
          [235, 195],
          [65, 195],
        ],
        true,
      ),
    ],
    circles: [{ centre: [235, 120], radius: 3 }],
    labels: [
      label(52, 37, "A"),
      label(247, 37, "B"),
      label(247, 210, "C"),
      label(52, 210, "D"),
      label(150, 28, "8 cm"),
      label(267, 180, "16 cm"),
      label(252, 125, "N"),
      label(150, 230, "BN = ?"),
    ],
  }),
  46: diagram(t("Titik pada sisi", "Point on a side"), {
    title: t("ABCD"),
    description: t(
      "M terletak pada AD; AD = 16 cm dan MD ialah satu perempat AD.",
      "M lies on AD; AD = 16 cm and MD is one quarter of AD.",
    ),
    paths: [
      path(
        [
          [65, 45],
          [235, 45],
          [235, 195],
          [65, 195],
        ],
        true,
      ),
    ],
    circles: [{ centre: [65, 157.5], radius: 3 }],
    labels: [
      label(52, 37, "A"),
      label(247, 37, "B"),
      label(247, 210, "C"),
      label(52, 210, "D"),
      label(39, 150, "M"),
      label(115, 100, "AM = ?"),
      label(150, 225, "AD = 16 cm"),
      label(157, 173, "MD = AD/4"),
    ],
  }),
  50: pqr("?", "18 cm", "?", "θ"),
  51: abc("?"),
  52: tri(["A", "B", "C"], "?", "?", "?", "θ"),
  53: tri(["A", "B", "C"], "4", "3", "5", "θ"),
  54: (() => {
    const d: [number, number] = [45, 190],
      p: [number, number] = [215, 190],
      e: [number, number] = [215, 190 - (170 * 5) / 12],
      f: [number, number] = [215 + (170 * 25) / 144, 190];
    const u = [-12 / 13, 5 / 13],
      v = [5 / 13, 12 / 13],
      r = 14;
    return diagram(
      t("Serenjang pada hipotenus", "Perpendicular to the hypotenuse"),
      {
        title: t("DEF"),
        description: t(
          "D,P,F segaris. DEF tegak di E. EP tegak lurus DF. DP = 12 cm; EP = 5 cm.",
          "D,P,F are collinear. DEF is right-angled at E. EP is perpendicular to DF. DP = 12 cm; EP = 5 cm.",
        ),
        paths: [
          path([d, e, f], true),
          path([e, p], false, true),
          path([
            [200, 190],
            [200, 175],
            [215, 175],
          ]),
          path([
            [e[0] + r * u[0], e[1] + r * u[1]],
            [e[0] + r * (u[0] + v[0]), e[1] + r * (u[1] + v[1])],
            [e[0] + r * v[0], e[1] + r * v[1]],
          ]),
        ],
        labels: [
          label(33, 208, "D"),
          label(e[0], e[1] - 14, "E"),
          label(f[0] + 14, 208, "F"),
          label(215, 211, "P"),
          label(130, 221, "12 cm"),
          label(256, 157, "5 cm"),
          label(100, 176, "θ"),
        ],
      },
    );
  })(),
  55: diagram(
    t("Segi tiga serupa", "Similar triangles"),
    triangle(
      t("Segi tiga kecil", "Small triangle"),
      ["A", "B", "C"],
      "4",
      "3",
      "5",
      "θ",
    ),
    triangle(
      t("Segi tiga besar", "Large triangle"),
      ["P", "Q", "R"],
      "8",
      "6",
      "10",
      "θ",
    ),
  ),
};
