import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { t, diagram, label, path } from "../quiz-geometry";
import {
  coordinates,
  equation,
  point,
  squareCoordinates,
} from "../quiz-coordinates";
const square = (names = ["A", "B", "C", "D"], rectangle = false) =>
  diagram(
    t(
      rectangle ? "Segi empat tepat diberi" : "Segi empat sama diberi",
      rectangle ? "Given rectangle" : "Given square",
    ),
    {
      title: t(names.join("")),
      description: t(
        "Bucu mengikut urutan. Hanya sisi diberi ditunjukkan.",
        "Vertices in order. Only the given sides are shown.",
      ),
      paths: [
        path(
          [
            [70, 190],
            [230, 190],
            [230, rectangle ? 90 : 30],
            [70, rectangle ? 90 : 30],
          ],
          true,
        ),
      ],
      labels: [
        label(58, 208, names[0]),
        label(242, 208, names[1]),
        label(242, rectangle ? 80 : 20, names[2]),
        label(58, rectangle ? 80 : 20, names[3]),
      ],
    },
  );
const pair = (names = ["A", "B"], distance?: string) =>
  diagram(t("Titik tetap diberi", "Given fixed points"), {
    title: t(names.join(", ")),
    description: t(
      "Dua titik tetap; tiada lokus jawapan dilukis.",
      "Two fixed points; the answer locus is not drawn.",
    ),
    circles: [
      { centre: [65, 140], radius: 3 },
      { centre: [235, 140], radius: 3 },
    ],
    paths: distance
      ? [
          path([
            [65, 140],
            [235, 140],
          ]),
        ]
      : [],
    labels: [
      label(65, 165, names[0]),
      label(235, 165, names[1]),
      ...(distance ? [label(150, 120, distance)] : []),
    ],
  });
const fixedRadius = (r: string) =>
  diagram(t("Jarak tetap dari O", "Fixed distance from O"), {
    title: t("OP = " + r),
    description: t(
      "Segmen OP menunjukkan jarak diberi. Lokus belum dilukis.",
      "Segment OP shows the given distance. The locus is not drawn.",
    ),
    paths: [
      path([
        [75, 150],
        [225, 95],
      ]),
    ],
    circles: [
      { centre: [75, 150], radius: 3 },
      { centre: [225, 95], radius: 3 },
    ],
    labels: [label(60, 168, "O"), label(240, 85, "P"), label(150, 104, r)],
  });
const straight = (names: string, r?: string) =>
  diagram(t("Garis lurus tanpa had", "Infinite straight line"), {
    title: t(names),
    description: t(
      "Garis berterusan di kedua-dua arah. Segmen putus-putus, jika ditunjukkan, berserenjang dengannya.",
      "The line continues in both directions. The dashed segment, if shown, is perpendicular to it.",
    ),
    paths: [
      path([
        [25, 160],
        [275, 160],
      ]),
      ...(r
        ? [
            path(
              [
                [150, 160],
                [150, 70],
              ],
              false,
              true,
            ),
            path([
              [150, 148],
              [162, 148],
              [162, 160],
            ]),
          ]
        : []),
    ],
    labels: [
      label(45, 183, names[0]),
      label(255, 183, names[1]),
      label(23, 164, "←"),
      label(278, 164, "→"),
      ...(r ? [label(168, 115, r), label(150, 55, "X")] : []),
    ],
  });
const intersect = diagram(t("Dua garis bersilang", "Two intersecting lines"), {
  title: t("l₁, l₂"),
  description: t(
    "Dua garis lurus bersilang; pembahagi dua sudut belum dilukis.",
    "Two straight lines intersect; the angle bisectors are not drawn.",
  ),
  paths: [
    path([
      [35, 160],
      [265, 160],
    ]),
    path([
      [50, 215],
      [250, 45],
    ]),
  ],
  labels: [label(260, 184, "l₁"), label(254, 33, "l₂")],
});
const parallel = diagram(t("Dua garis selari", "Two parallel lines"), {
  title: t("l₁, l₂"),
  description: t(
    "Dua garis selari; lokus belum dilukis.",
    "Two parallel lines; the locus is not drawn.",
  ),
  paths: [
    path([
      [25, 75],
      [275, 75],
    ]),
    path([
      [25, 175],
      [275, 175],
    ]),
  ],
  labels: [label(260, 60, "l₁"), label(260, 200, "l₂")],
});
const rotation = (sized = false) =>
  diagram(t("Putaran 360°", "360° rotation"), {
    title: t("Segi empat tepat", "Rectangle"),
    description: t(
      sized
        ? "Segi empat tepat 3 cm × 5 cm; sisi 5 cm ialah paksi putaran."
        : "Satu sisi segi empat tepat ialah paksi putaran.",
      sized
        ? "A 3 cm × 5 cm rectangle; the 5 cm side is the rotation axis."
        : "One side of the rectangle is the rotation axis.",
    ),
    paths: [
      path(
        [
          [105, 185],
          [195, 185],
          [195, 35],
          [105, 35],
        ],
        true,
      ),
      path(
        [
          [105, 205],
          [105, 15],
        ],
        false,
        true,
      ),
    ],

    labels: [
      label(150, 218, sized ? "3 cm" : t("sisi", "side")),
      label(220, 110, sized ? "5 cm" : ""),
      label(63, 20, t("paksi", "axis")),
      label(63, 133, "↻ 360°"),
    ],
  });
const square8 = () => squareCoordinates(8);
export const MATH_F3_C8_QUIZ_VISUALS: Record<number, MathQuestionVisual> = {
  4: fixedRadius("r > 0"),
  5: pair(),
  6: straight("AB", "r > 0"),
  7: parallel,
  8: intersect,
  9: fixedRadius("3 cm"),
  10: rotation(),
  11: diagram(t("Separuh bulatan dan paksi", "Semicircle and axis"), {
    title: t("Putaran 360°", "360° rotation"),
    description: t(
      "Diameter ialah paksi putaran.",
      "The diameter is the rotation axis.",
    ),
    arcs: [{ centre: [150, 145], radius: 85, start: 180, end: 360 }],
    paths: [
      path(
        [
          [45, 145],
          [255, 145],
        ],
        false,
        true,
      ),
    ],
    labels: [
      label(150, 170, t("diameter / paksi", "diameter / axis")),
      label(150, 215, "360°"),
    ],
  }),
  14: diagram(t("Bandul", "Pendulum"), {
    title: t("Dua kedudukan bandul", "Two positions of a pendulum"),
    description: t(
      "Titik gantung tetap; tali sama panjang dalam dua kedudukan.",
      "Fixed suspension point; equal string lengths in the two positions.",
    ),
    paths: [
      path([
        [150, 30],
        [80, 165],
      ]),
      path([
        [150, 30],
        [220, 165],
      ]),
    ],
    circles: [
      { centre: [80, 165], radius: 6 },
      { centre: [220, 165], radius: 6 },
    ],
    labels: [label(150, 20, t("titik tetap", "fixed point"))],
  }),
  15: straight("AB", "r > 0"),
  16: intersect,
  17: pair(),
  18: straight("CD", "1.5 cm"),
  20: coordinates(
    t("Empat titik calon diberi.", "Four given candidate points."),
    {
      points: [
        point("A", 3, 4),
        point("B", 3, 3, [8, 16]),
        point("C", 0, 4),
        point("D", 6, 0, [-10, -10]),
      ],
      domain: [-2, 8, -2, 8],
    },
  ),
  21: diagram(t("Segi tiga sama sisi", "Equilateral triangle"), {
    title: t("PQR"),
    description: t(
      "Segi tiga PQR mempunyai tiga sisi sama panjang.",
      "Triangle PQR has three equal sides.",
    ),
    paths: [
      path(
        [
          [60, 190],
          [240, 190],
          [150, 34.115],
        ],
        true,
      ),
    ],
    labels: [label(48, 209, "P"), label(252, 209, "R"), label(150, 22, "Q")],
  }),
  22: straight("AB", "3"),
  23: square(undefined, true),
  24: diagram(t("Sudut diberi", "Given angle"), {
    title: t("∠QPN"),
    description: t(
      "X terhad di bahagian dalam sudut QPN.",
      "X is restricted to the interior of angle QPN.",
    ),
    paths: [
      path([
        [65, 185],
        [260, 185],
      ]),
      path([
        [65, 185],
        [215, 45],
      ]),
    ],
    labels: [label(50, 204, "P"), label(265, 207, "Q"), label(230, 39, "N")],
  }),
  25: square(),
  26: coordinates(
    t(
      "Segi empat sama bersisi 8; jarak X dari A ialah 5.",
      "Square of side 8; X is 5 units from A.",
    ),
    { ...square8(), circles: [{ centre: [0, 0], radius: 5 }] },
  ),
  27: pair(["M", "N"]),
  28: coordinates(
    t(
      "Tiga titik pada satu garis diberi.",
      "Three given points lie on one line.",
    ),
    { points: [point("P", -2, -2), point("Q", 4, 4)] },
  ),
  29: coordinates(
    t(
      "Garis y = x diberi. Cari sudutnya.",
      "The line y = x is given. Find its angle.",
    ),
    {
      lines: [equation(-1, 1, 0, "y = x")],
      points: [point("P", -2, -2), point("Q", 4, 4)],
    },
  ),
  30: coordinates(
    t(
      "Sempadan jarak 5 ditunjukkan putus-putus; tidak termasuk dalam kawasan.",
      "The distance-5 boundary is dashed; it is excluded from the region.",
    ),
    { circles: [{ centre: [0, 0], radius: 5, dashed: true }] },
  ),
  31: square(),
  32: square(),
  33: straight("BC", "4"),
  34: square(),
  35: pair(["P", "Q"], "5 cm"),
  36: pair(["P", "Q"], "5 cm"),
  37: straight("CD", "1.5 cm"),
  38: coordinates(
    t(
      "Segi empat sama bersisi 8; jarak X dari D ialah 5 dan dari BC ialah 3.",
      "Square of side 8; X is 5 units from D and 3 from BC.",
    ),
    { ...square8(), circles: [{ centre: [0, 8], radius: 5 }] },
  ),
  39: diagram(t("Empat petak sama", "Four equal squares"), {
    title: t("Sisi setiap petak = 2 cm", "Each small square has side 2 cm"),
    description: t(
      "Empat petak membentuk segi empat sama; M di pusat.",
      "Four squares form a square; M is at the centre.",
    ),
    grid: { origin: [70, 30], columns: 2, rows: 2, step: 80 },
    paths: [
      path(
        [
          [70, 30],
          [230, 30],
          [230, 190],
          [70, 190],
        ],
        true,
      ),
    ],
    circles: [{ centre: [150, 110], radius: 3 }],
    labels: [label(165, 103, "M"), label(150, 218, "2 cm + 2 cm")],
  }),
  40: square(["P", "R", "T", "V"]),
  41: coordinates(
    t(
      "Calon E, F, G dan H; bulatan putus-putus menandakan had jarak yang dikecualikan.",
      "Candidates E, F, G and H; the dashed circle marks the excluded distance boundary.",
    ),
    {
      domain: [-2, 8, -2, 8],
      points: [
        point("E", 2, 4),
        point("F", 4, 2),
        point("G", 4, 6),
        point("H", 6, 4),
      ],
      circles: [{ centre: [0, 0], radius: 5, dashed: true }],
    },
  ),
  42: coordinates(
    t(
      "Empat titik calon dan sempadan jarak 5 yang dikecualikan.",
      "Four candidate points and the excluded distance-5 boundary.",
    ),
    {
      points: [
        point("E", 3, 3),
        point("F", -3, 3),
        point("G", -4, -4),
        point("H", 2, -2),
      ],
      circles: [{ centre: [0, 0], radius: 5, dashed: true }],
    },
  ),
  43: coordinates(
    t(
      "Segi empat sama bersisi 8; jarak X dari A ialah 7.",
      "Square of side 8; X is 7 units from A.",
    ),
    { ...square8(), circles: [{ centre: [0, 0], radius: 7 }] },
  ),
  44: coordinates(
    t(
      "Jarak X dari O ialah 5; tiada kedudukan jawapan ditanda.",
      "X is 5 units from O; no solution points are marked.",
    ),
    { circles: [{ centre: [0, 0], radius: 5 }] },
  ),
  45: coordinates(
    t(
      "Titik A dan B diberi. X terletak di atas paksi-x.",
      "Given points A and B. X lies above the x-axis.",
    ),
    {
      points: [point("A", -3, 0, [-8, -10]), point("B", 3, 0, [8, -10])],
      circles: [{ centre: [-3, 0], radius: 5 }],
      domain: [-10, 6, -6, 10],
      step: 2,
    },
  ),
  46: coordinates(
    t(
      "Dua bulatan menunjukkan jarak 5 dari P dan Q; tiada persilangan dilabel.",
      "Two circles show distance 5 from P and Q; intersections are not labelled.",
    ),
    {
      domain: [-6, 12, -9, 9],
      step: 3,
      points: [point("P", 0, 0), point("Q", 6, 0)],
      circles: [
        { centre: [0, 0], radius: 5 },
        { centre: [6, 0], radius: 5 },
      ],
    },
  ),
  47: coordinates(
    t(
      "Jarak X dari O ialah 5; X mesti berada di atas paksi-x.",
      "X is 5 units from O and must lie above the x-axis.",
    ),
    { circles: [{ centre: [0, 0], radius: 5 }] },
  ),
  48: coordinates(
    t(
      "Segi empat sama bersisi 6; jarak X dari A ialah 5.",
      "Square of side 6; X is 5 units from A.",
    ),
    { ...squareCoordinates(6), circles: [{ centre: [0, 0], radius: 5 }] },
  ),
  49: rotation(true),
  50: coordinates(
    t(
      "Dua garis diberi; jarak X dari O ialah 5.",
      "Two given lines; X is 5 units from O.",
    ),
    {
      domain: [-8, 8, -6, 10],
      lines: [equation(0, 1, 0, "y = 0"), equation(0, 1, 6, "y = 6")],
      circles: [{ centre: [0, 0], radius: 5 }],
    },
  ),
};
