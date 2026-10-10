import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import {
  diagram,
  grid,
  label,
  path,
  rectangle,
  segment,
  t,
  triangle,
} from "../quiz-geometry";
const drawing = t("Lukisan", "Drawing"),
  object = t("Objek", "Object");
const scale = (s: string) => t(`Skala 1:${s}`, `Scale 1:${s}`);
const plan = (w: string, h: string, s: string) =>
  diagram(
    t("Pelan berskala", "Scale plan"),
    rectangle(drawing, w, h, [scale(s)]),
  );
const map = (distance: string, s: string) =>
  diagram(
    t("Jarak pada peta", "Map distance"),
    segment(t("Peta", "Map"), distance, s),
  );
const grids = (a: string, b: string) =>
  diagram(
    t("Grid sepadan", "Corresponding grids"),
    grid(
      drawing,
      a,
      3,
      (32 * parseFloat(a)) / Math.max(parseFloat(a), parseFloat(b)),
    ),
    grid(
      object,
      b,
      3,
      (32 * parseFloat(b)) / Math.max(parseFloat(a), parseFloat(b)),
    ),
  );
export const MATH_F3_C4_QUIZ_VISUALS: Partial<
  Record<number, MathQuestionVisual>
> = {
  8: diagram(
    t("Panjang sepadan", "Corresponding lengths"),
    segment(drawing, "P′Q′ = 2 cm"),
    segment(object, "PQ = 4 cm"),
  ),
  9: diagram(
    t("Panjang sepadan", "Corresponding lengths"),
    segment(drawing, "K′L′ = 9 cm"),
    segment(object, "KL = 3 cm"),
  ),
  10: map("2 cm", "1 cm : 10 km"),
  11: map("3 cm", "1 : 300 000"),
  14: diagram(
    t("Grid sama saiz", "Equal-sized grids"),
    grid(drawing, t("sama", "equal"), 2),
    grid(object, t("sama", "equal"), 4),
  ),
  15: grids("0.5 cm", "1 cm"),
  16: diagram(
    t("Segi empat sama", "Square"),
    rectangle(object, "6 cm", "6 cm", [scale("1/3")], 1),
    rectangle(drawing, "?", "?", [], 1),
  ),
  18: plan("7 cm", "5 cm", "400"),
  19: diagram(
    t("Panjang sepadan", "Corresponding lengths"),
    segment(drawing, "?", "1:200"),
    segment(object, "40 m"),
  ),
  21: grids("2 cm", "1 cm"),
  22: grids("0.5 cm", "1 cm"),
  23: diagram(
    t("Sisi sepadan", "Corresponding sides"),
    triangle(drawing, ["K′", "L′", "N′"], "1.5 cm", "2 cm", "?"),
    segment(object, "KN = 5 cm"),
  ),
  24: map("2 cm", "1 cm : 10 km"),
  25: diagram(
    t("Poster", "Poster"),
    rectangle(object, "24 cm", "8 cm", [scale("4")]),
    rectangle(drawing, "?", "?"),
  ),
  26: diagram(
    t("Poster", "Poster"),
    rectangle(object, "24 cm", "8 cm", [scale("4")]),
    rectangle(drawing, "?", "?"),
  ),
  27: map("2.5 cm", "1 : 400 000"),
  28: diagram(
    t("Segi tiga berskala", "Scaled triangle"),
    triangle(drawing, ["A′", "B′", "C′"], "", "", "18 cm"),
    segment(object, "AC = ?", "1 : 1/3"),
  ),
  29: plan("7 cm", "5 cm", "400"),
  30: (() => {
    const points = Array.from(
      { length: 10 },
      (_, i) =>
        [
          150 + 68 * Math.cos(((-108 + i * 36) * Math.PI) / 180),
          130 + 68 * Math.sin(((-108 + i * 36) * Math.PI) / 180),
        ] as [number, number],
    );
    return diagram(t("Poligon sekata", "Regular polygon"), {
      title: object,
      description: t(
        "Poligon sekata dengan sudut peluaran 36° dan sisi 10 cm.",
        "Regular polygon with exterior angle 36° and side 10 cm.",
      ),
      paths: [path(points, true)],
      labels: [
        label(150, 28, scale("5")),
        label(150, 220, "10 cm"),
        label(150, 48, t("Sudut peluaran = 36°", "Exterior angle = 36°")),
      ],
    });
  })(),
  31: diagram(
    t("Bilik", "Room"),
    rectangle(object, "5.2 m", "3.5 m", [scale("50")]),
  ),
  32: plan("6 cm", "3 cm", "2000"),
  33: plan("6 cm", "3 cm", "2000"),
  34: map("4 cm", "1 cm : 50 km"),
  35: map("? cm", "1 : 2 000 000"),
  37: plan("3 cm", "2 cm", "400"),
  38: diagram(t("Bangunan berbentuk kuboid", "Cuboid-shaped building"), {
    title: object,
    description: t(
      "Kuboid dengan panjang 12 m, lebar 8 m dan tinggi 3.75 m.",
      "Cuboid with length 12 m, width 8 m and height 3.75 m.",
    ),
    paths: [
      path(
        [
          [75, 110],
          [205, 110],
          [205, 195],
          [75, 195],
        ],
        true,
      ),
      path([
        [75, 110],
        [110, 65],
        [240, 65],
        [205, 110],
      ]),
      path([
        [205, 195],
        [240, 150],
        [240, 65],
      ]),
      path(
        [
          [75, 195],
          [110, 150],
          [240, 150],
        ],
        false,
        true,
      ),
      path(
        [
          [110, 65],
          [110, 150],
        ],
        false,
        true,
      ),
    ],
    labels: [
      label(140, 220, "12 m"),
      label(245, 181, "8 m"),
      label(42, 155, "3.75 m"),
    ],
  }),
  39: grids("1 cm", "1.5 cm"),
  40: grids("1 cm", "0.5 cm"),
  41: diagram(
    t("Luas sepadan", "Corresponding areas"),
    {
      ...triangle(t("Lukisan P", "Drawing P"), ["", "", ""], "", "", ""),
      description: t(
        "Segi tiga P dengan luas diberi.",
        "Triangle P with the stated area.",
      ),
      labels: [label(150, 150, "112.5 cm²")],
    },
    {
      ...triangle(t("Objek Q", "Object Q"), ["", "", ""], "", "", ""),
      description: t(
        "Segi tiga Q yang serupa dengan P, dengan luas diberi.",
        "Triangle Q similar to P, with the stated area.",
      ),
      paths: [
        path(
          [
            [132, 174],
            [169, 174],
            [169, 145],
          ],
          true,
        ),
      ],
      labels: [label(150, 204, "4.5 cm²")],
    },
  ),
  42: diagram(t("Bulatan berskala", "Scaled circle"), {
    title: drawing,
    description: t(
      "Bulatan berpusat O dengan diameter 6 cm.",
      "Circle centred at O with diameter 6 cm.",
    ),
    circles: [{ centre: [150, 135], radius: 62 }],
    paths: [
      path([
        [88, 135],
        [212, 135],
      ]),
    ],
    labels: [
      label(150, 25, scale("3")),
      label(150, 120, "6 cm"),
      label(150, 157, "O"),
    ],
  }),
  43: map("5.4 cm", "1 cm : 150 km"),
  44: diagram(
    t("Perbandingan jubin", "Tile comparison"),
    rectangle(t("Jubin A", "Tile A"), "30 cm", "30 cm", ["RM2.80"], 1),
    rectangle(t("Jubin B", "Tile B"), "50 cm", "50 cm", ["RM6"], 1),
  ),
  45: diagram(t("Kolam bulat", "Circular pond"), {
    title: drawing,
    description: t(
      "Jejari dari O ke lilitan ialah 2 cm.",
      "The radius from O to the circumference is 2 cm.",
    ),
    circles: [{ centre: [150, 135], radius: 62 }],
    paths: [
      path([
        [150, 135],
        [212, 135],
      ]),
    ],
    labels: [
      label(150, 25, scale("2000")),
      label(183, 120, "2 cm"),
      label(145, 153, "O"),
    ],
  }),
  46: plan("12 cm", "7 cm", "1000"),
  47: diagram(
    t("Saiz kertas dan padang", "Paper and field sizes"),
    rectangle(t("Kertas A4", "A4 paper"), "29.7 cm", "21 cm"),
    rectangle(object, "120 m", "70 m"),
  ),
  48: diagram(
    t("Kawasan untuk khemah", "Tent area"),
    rectangle(t("Padang", "Field"), "120 m", "70 m", [
      t("Gunakan separuh luas", "Use half the area"),
    ]),
    rectangle(t("Satu khemah", "One tent"), "5 m", "4 m"),
  ),
  50: diagram(
    t("Segi empat tepat serupa", "Similar rectangles"),
    rectangle(t("S"), "5 cm", "3 cm"),
    rectangle(t("T"), "10 cm", "6 cm"),
  ),
  51: diagram(
    t("Segi empat tepat serupa", "Similar rectangles"),
    rectangle(t("S"), "5 cm", "3 cm"),
    rectangle(t("T"), "10 cm", "6 cm"),
  ),
  55: diagram(
    t("Perbandingan luas", "Area comparison"),
    rectangle(
      t("Bilik stor pada lukisan", "Storeroom drawing"),
      "3 cm",
      "2 cm",
      [scale("400")],
    ),
    rectangle(t("Tapak kedai", "Shop footprint"), "12 m", "8 m"),
  ),
};
