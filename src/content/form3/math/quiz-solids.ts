import type {
  GeometryPanel,
  GeometryPoint,
} from "@/features/quiz/visuals/mathGeometryVisual";
import { diagram, label, path, t } from "./quiz-geometry";
/** An oblique drawing of the solid; its screen angles are not true object angles. */
export function cuboid(
  width: string,
  depth: string,
  height: string,
  vertices = false,
) {
  const w = Number.parseFloat(width) || (vertices ? 2 : 7),
    d = Number.parseFloat(depth) || (vertices ? 2 : 4),
    h = Number.parseFloat(height) || (vertices ? 2 : 5);
  const unit = Math.min(140 / w, 110 / h, 140 / d),
    wide = w * unit,
    high = h * unit,
    dx = d * unit * 0.36,
    dy = d * unit * 0.25;
  const pts: Record<string, GeometryPoint> = {
    P: [65, 190],
    Q: [65 + wide, 190],
    R: [65 + wide + dx, 190 - dy],
    S: [65 + dx, 190 - dy],
    T: [65, 190 - high],
    U: [65 + wide, 190 - high],
    V: [65 + wide + dx, 190 - high - dy],
    W: [65 + dx, 190 - high - dy],
  };
  return diagram(t("Kuboid", "Cuboid"), {
    title: t("Depan: PQUT; kanan: QRVU", "Front: PQUT; right: QRVU"),
    description: t(
      "PQRS ialah muka bawah; T, U, V dan W masing-masing di atas P, Q, R dan S. Garis sempang menunjukkan sisi terlindung. Lebar dilihat dari depan dan kedalaman dari kanan.",
      "PQRS is the bottom face; T, U, V and W are directly above P, Q, R and S respectively. Dashed lines show hidden edges. Width is viewed from the front and depth from the right.",
    ),
    paths: [
      ...[
        "PQU T P".replaceAll(" ", ""),
        "UVW TU".replaceAll(" ", ""),
        "QRVU",
      ].map((e) => path(e.split("").map((n) => pts[n]))),
      ...["PS", "SR", "SW"].map((e) =>
        path(
          e.split("").map((n) => pts[n]),
          false,
          true,
        ),
      ),
    ],
    labels: [
      ...(vertices
        ? Object.entries(pts).map(([n, p]) =>
            label(
              p[0] + (n === "R" || n === "V" ? 12 : -12),
              p[1] + (n === "P" || n === "Q" ? 17 : -7),
              n,
            ),
          )
        : []),
      label(139, 222, t(`lebar ${width}`, `width ${width}`)),
      label(247, 187, t(`dalam ${depth}`, `depth ${depth}`)),
      label(38, 137, height),
    ],
  });
}
export function views(
  width: string,
  depth: string,
  height: string,
  title = t("Pelan dan dongakan", "Plan and elevations"),
) {
  const w = Number.parseFloat(width) || 8,
    d = Number.parseFloat(depth) || 5,
    h = Number.parseFloat(height) || 3;
  const unit = Math.min(180 / Math.max(w, d), 130 / Math.max(d, h));
  const panel = (
    title: ReturnType<typeof t>,
    horizontal: string,
    vertical: string,
    span: number,
    rise: number,
  ): GeometryPanel => {
    const x = (300 - span * unit) / 2,
      y = 190 - rise * unit;
    return {
      title,
      description: t(
        "Segi empat tepat dengan ukuran sisi seperti dilabel.",
        "Rectangle with side dimensions as labelled.",
      ),
      paths: [
        path(
          [
            [x, y],
            [x + span * unit, y],
            [x + span * unit, 190],
            [x, 190],
          ],
          true,
        ),
      ],
      labels: [
        label(150, y - 14, horizontal),
        label(x - 25, y + (rise * unit) / 2, vertical),
      ],
    };
  };
  const front = panel(
    t("Dongakan depan", "Front elevation"),
    width,
    height,
    w,
    h,
  );
  const plan = panel(t("Pelan", "Plan"), width, depth, w, d);
  const side = panel(t("Dongakan sisi", "Side elevation"), depth, height, d, h);
  return diagram(title, plan, front, side);
}
export function triangularPrism() {
  const a: GeometryPoint = [45, 175],
    b: GeometryPoint = [180, 175],
    c: GeometryPoint = [112.5, 85],
    d: GeometryPoint = [125, 125],
    e: GeometryPoint = [260, 125],
    f: GeometryPoint = [192.5, 35];
  return diagram(t("Prisma tegak", "Right prism"), {
    title: t("Keratan rentas depan sama kaki", "Isosceles front cross-section"),
    description: t(
      "Segi tiga depan bertapak 6 cm dan tinggi 4 cm diulang sepanjang kedalaman 8 cm. Rabung di atas tengah tapak. Pandangan depan ke muka segi tiga; pandangan kanan sepanjang arah lebar.",
      "The front triangle of base 6 cm and height 4 cm is repeated through depth 8 cm. The ridge is above the base midpoint. The front view faces the triangle; the right view looks along the width.",
    ),
    paths: [
      path([a, b, c], true),
      path([c, f, e, b]),
      path([f, d], false, true),
      path([a, d, e], false, true),
      path([c, [112.5, 175]], false, true),
      path([
        [112.5, 164],
        [123.5, 164],
        [123.5, 175],
      ]),
    ],
    labels: [
      label(108, 204, t("lebar 6 cm", "width 6 cm")),
      label(243, 172, t("dalam 8 cm", "depth 8 cm")),
      label(91, 140, "4 cm"),
      label(105, 229, t("Depan → segi tiga", "Front → triangle")),
    ],
  });
}
export function steppedPrism() {
  // Profile is extruded without changing its width/height through a constant depth.
  const profile: GeometryPoint[] = [
    [40, 190],
    [190, 190],
    [190, 140],
    [140, 140],
    [140, 65],
    [40, 65],
  ];
  const off: GeometryPoint = [55, -35],
    back = profile.map(([x, y]): GeometryPoint => [x + off[0], y + off[1]]);
  return diagram(t("Prisma bertangga", "Stepped prism"), {
    title: t(
      "Takuk merentasi seluruh kedalaman",
      "Notch through the full depth",
    ),
    description: t(
      "Lebar depan 6 cm, kedalaman 4 cm, tinggi maksimum 5 cm. Bahagian rendah sebelah kanan lebarnya 2 cm dan tingginya 2 cm. Takuk atas merentasi kedalaman penuh.",
      "Front width 6 cm, depth 4 cm, maximum height 5 cm. The lower right section is 2 cm wide and 2 cm high. The upper notch extends through the full depth.",
    ),
    paths: [
      path(profile, true),
      path(back.slice(1)),
      path([back[5], back[0], back[1]], false, true),
      ...profile.map((p, i) => path([p, back[i]], false, i === 0)),
    ],
    labels: [
      label(115, 216, t("lebar 6 cm", "width 6 cm")),
      label(270, 168, "4 cm"),
      label(21, 130, "5 cm"),
      label(165, 160, "2 cm"),
      label(216, 130, "2 cm"),
      label(142, 231, t("Depan → muka bertangga", "Front → stepped face")),
    ],
  });
}
export function planeNormal() {
  return diagram(t("Satah dan garis", "Plane and line"), {
    title: t("Satah α", "Plane α"),
    description: t(
      "PQ dan PR ialah garis bersilang dalam satah α; XP melalui titik persilangan P.",
      "PQ and PR intersect in plane α; XP passes through their intersection P.",
    ),
    paths: [
      path(
        [
          [45, 190],
          [215, 190],
          [265, 120],
          [95, 120],
        ],
        true,
      ),
      path([
        [130, 150],
        [130, 40],
      ]),
      path([
        [75, 150],
        [220, 150],
      ]),
      path([
        [110, 180],
        [150, 120],
      ]),
    ],
    labels: [
      label(118, 166, "P"),
      label(235, 150, "Q"),
      label(163, 125, "R"),
      label(130, 30, "X"),
      label(243, 184, "α"),
    ],
  });
}
export function layout() {
  return diagram(
    t("Susunan unjuran sudut pertama", "First-angle projection layout"),
    {
      title: t("Cari kedudukan pandangan", "Locate the views"),
      description: t(
        "Petak atas tengah berlabel F ialah dongakan depan. Tiga kedudukan lain berlabel A, B dan C. Gunakan arah pandangan dalam soalan.",
        "The upper central box labelled F is the front elevation. The other three positions are labelled A, B and C. Use the viewing direction stated in the question.",
      ),
      paths: [
        path(
          [
            [20, 130],
            [280, 130],
          ],
          false,
          true,
        ),
        ...[
          [35, 65],
          [115, 65],
          [215, 65],
          [115, 165],
        ].map(([x, y]) =>
          path(
            [
              [x, y],
              [x + 50, y],
              [x + 50, y + 40],
              [x, y + 40],
            ],
            true,
          ),
        ),
      ],
      labels: [
        label(60, 91, "A"),
        label(140, 91, "F"),
        label(240, 91, "B"),
        label(140, 191, "C"),
      ],
    },
  );
}
export function cylinder() {
  const ellipse = (y: number, start = 0, end = 360): GeometryPoint[] =>
    Array.from({ length: 37 }, (_, i) => {
      const a = ((start + ((end - start) * i) / 36) * Math.PI) / 180;
      return [150 + 55 * Math.cos(a), y + 17 * Math.sin(a)];
    });
  return diagram(t("Silinder tegak", "Upright cylinder"), {
    title: t("Paksi tegak", "Vertical axis"),
    description: t(
      "Silinder tegak: diameter 4 cm dan tinggi 6 cm. Pandangan atas sepanjang paksi tegak; dongakan dari sisi mengufuk.",
      "Upright cylinder: diameter 4 cm and height 6 cm. The top view is along the vertical axis; an elevation looks horizontally from the side.",
    ),
    paths: [
      path(ellipse(65)),
      path(ellipse(190, 0, 180)),
      path(ellipse(190, 180, 360), false, true),
      path([
        [95, 65],
        [95, 190],
      ]),
      path([
        [205, 65],
        [205, 190],
      ]),
      path(
        [
          [95, 65],
          [205, 65],
        ],
        false,
        true,
      ),
    ],
    labels: [
      label(150, 37, t("diameter 4 cm", "diameter 4 cm")),
      label(241, 134, "6 cm"),
    ],
  });
}
/** An equilateral triangle tilted about AB: AB=AC=BC=4, horizontal C coordinates (2,2). */
export function inclinedTriangle() {
  const project = ([x, y, z]: number[]): GeometryPoint => [
    60 + 35 * x + 14 * y,
    190 - 12 * y - 30 * z,
  ];
  const A = project([4, 0, 0]),
    B = project([0, 0, 0]),
    C = project([2, 2, Math.sqrt(8)]),
    D = project([2, 2, 0]);
  return diagram(
    t("Muka condong dan pelan", "Inclined face and plan"),
    {
      title: t("Segi tiga sama sisi condong", "Inclined equilateral triangle"),
      description: t(
        "AB, AC dan BC masing-masing 4 cm. C berada di atas titik unjurannya D; AB terletak dalam satah mengufuk. Sudut sebenar ABC ialah 60°.",
        "AB, AC and BC are each 4 cm. C lies above its projection D; AB lies in the horizontal plane. The true angle ABC is 60°.",
      ),
      paths: [
        path([A, B, C], true),
        path([C, D], false, true),
        path([B, D, A], false, true),
      ],
      labels: [
        label(216, 196, "A"),
        label(46, 198, "B"),
        label(C[0] + 12, C[1] - 7, "C"),
        label(D[0] + 10, D[1] + 18, "D"),
        label(133, 217, "AB = AC = BC = 4 cm"),
      ],
    },
    {
      title: t("Pelan", "Plan"),
      description: t(
        "A dan B tidak berubah; C diunjurkan kepada D. Sudut ABD dalam pelan ialah 45°.",
        "A and B are unchanged; C projects to D. Angle ABD in the plan is 45°.",
      ),
      paths: [
        path(
          [
            [60, 185],
            [200, 185],
            [130, 115],
          ],
          true,
        ),
      ],
      arcs: [{ centre: [60, 185], radius: 25, start: -45, end: 0 }],
      labels: [
        label(46, 197, "B"),
        label(216, 197, "A"),
        label(130, 99, "D/C"),
        label(103, 178, "45°"),
      ],
    },
  );
}
export function inclinedRod() {
  return diagram(t("Batang dan unjurannya", "Rod and its projection"), {
    title: t("AB di atas satah mengufuk", "AB above a horizontal plane"),
    description: t(
      "AB ialah batang condong. C ialah unjuran B pada satah mengufuk yang melalui A; BC tegak. AC ialah panjang pelan.",
      "AB is an inclined rod. C is B’s projection onto the horizontal plane through A; BC is vertical. AC is the plan length.",
    ),
    paths: [
      path(
        [
          [60, 185],
          [220, 185],
          [220, 25],
        ],
        true,
      ),
      path([
        [206, 185],
        [206, 171],
        [220, 171],
      ]),
    ],
    labels: [
      label(47, 198, "A"),
      label(233, 198, "C"),
      label(233, 30, "B"),
      label(137, 216, "AC = 14 cm"),
      label(104, 89, "AB = 14√2 cm"),
      label(250, 118, "h = ?"),
    ],
  });
}
export function overlappingVertices() {
  return diagram(
    t("Bucu dan unjuran", "Vertices and projection"),
    {
      title: t(
        "T dan P pada satu garis unjuran",
        "T and P on one projection line",
      ),
      description: t(
        "T berada betul-betul di atas P. Dalam pandangan atas, kedua-duanya diunjurkan kepada titik P/T yang sama.",
        "T is directly above P. In the top view both project to the same point P/T.",
      ),
      paths: [
        path(
          [
            [45, 190],
            [215, 190],
            [265, 135],
            [95, 135],
          ],
          true,
        ),
        path([
          [130, 155],
          [130, 45],
        ]),
      ],
      labels: [
        label(130, 32, "T"),
        label(113, 169, "P"),
        label(235, 217, t("Satah pelan", "Plan plane")),
      ],
    },
    {
      title: t("Pelan", "Plan"),
      description: t(
        "Label P/T menandakan titik unjuran bertindih.",
        "P/T labels the coincident projected point.",
      ),
      circles: [{ centre: [150, 125], radius: 3 }],
      labels: [label(150, 151, "P/T")],
    },
  );
}
