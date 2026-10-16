import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import type { GeometryPanel, GeometryPoint } from "@/features/quiz/visuals/mathGeometryVisual";

/**
 * Chapter 6 (3D shapes) stimuli. Prisms use one consistent oblique projection
 * (receding edges at 45°, drawn at half length); round solids use an upright
 * view with a flattened base ellipse. Hidden edges are dashed, front and back
 * faces keep their true proportions, and only the question's givens are labelled.
 */
const t = (bm: string, dlp: string) => ({ bm, dlp });
type P = GeometryPoint;
type Path = NonNullable<GeometryPanel["paths"]>[number];
type Labels = GeometryPanel["labels"];
const r1 = (n: number) => Math.round(n * 10) / 10;
const add = (p: P, q: P): P => [r1(p[0] + q[0]), r1(p[1] + q[1])];
const mid = (p: P, q: P): P => [r1((p[0] + q[0]) / 2), r1((p[1] + q[1]) / 2)];
const RECEDE = Math.SQRT1_2 / 2; // half-length receding axis at 45°

const solid = (
  title: ReturnType<typeof t>,
  description: ReturnType<typeof t>,
  paths: Path[],
  labels: Labels,
  arcs: GeometryPanel["arcs"] = [],
): MathQuestionVisual => ({
  kind: "geometry-diagram",
  title,
  panels: [
    {
      title: t("Ukuran yang diberi", "Given measurements"),
      description,
      paths,
      arcs,
      labels,
    },
  ],
});

/**
 * Right prism drawn from its front face. `front` lists the face's vertices with
 * index 0 bottom-left and index 1 bottom-right; `depth` is the receding offset.
 * The back-bottom-left vertex and its three edges are hidden (all faces here have
 * left sides steeper than 45°, so the left face is turned away from the viewer).
 */
function prism(front: P[], depth: P): Path[] {
  const back = front.map((p) => add(p, depth));
  const visibleBackEdges: Path[] = [];
  for (let i = 1; i < back.length; i++) {
    const j = (i + 1) % back.length;
    if (j !== 0) visibleBackEdges.push({ points: [back[i], back[j]] });
  }
  return [
    { points: front, closed: true, fill: true },
    ...front.slice(1).map((p, k) => ({ points: [p, back[k + 1]] })),
    ...visibleBackEdges,
    { points: [front[0], back[0]], dashed: true },
    { points: [back[0], back[1]], dashed: true },
    { points: [back[0], back[back.length - 1]], dashed: true },
  ];
}

/** Fit a prism whose front face spans `w × h` (cm) with receding length `d` (cm) into the panel. */
function fit(w: number, h: number, d: number) {
  const s = Math.min(200 / (w + d * RECEDE), 150 / (h + d * RECEDE));
  const dd = d * s * RECEDE;
  const x0 = r1((300 - (w * s + dd)) / 2);
  const y0 = r1(128 + (h * s + dd) / 2);
  return { s, x0, y0, depth: [r1(dd), r1(-dd)] as P };
}

/** Cuboid to true proportions: length along the front, height up, width receding. */
export function cuboid(l: number, w: number, h: number): MathQuestionVisual {
  const { s, x0, y0, depth } = fit(l, h, w);
  const front: P[] = [
    [x0, y0],
    [r1(x0 + l * s), y0],
    [r1(x0 + l * s), r1(y0 - h * s)],
    [x0, r1(y0 - h * s)],
  ];
  const back = front.map((p) => add(p, depth));
  return solid(
    t("Kuboid", "Cuboid"),
    t(
      "Panjang, lebar dan tinggi diberi; rusuk tersembunyi ditunjukkan putus-putus.",
      "Length, width and height are given; hidden edges are dashed.",
    ),
    prism(front, depth),
    [
      { at: [mid(front[0], front[1])[0], y0 + 20], text: `${l} cm` },
      {
        at: [add(mid(front[1], back[1]), [10, 10])[0], add(mid(front[1], back[1]), [10, 10])[1]],
        text: `${w} cm`,
        anchor: "start",
      },
      { at: [x0 - 8, r1(y0 - (h * s) / 2 + 5)], text: `${h} cm`, anchor: "end" },
    ],
  );
}

/** Isosceles triangular prism: triangle base `b`, triangle height `h`, prism length `len`. */
function triangularPrism(b: number, h: number, len: number) {
  const { s, x0, y0, depth } = fit(b, h, len);
  const apex: P = [r1(x0 + (b * s) / 2), r1(y0 - h * s)];
  const front: P[] = [[x0, y0], [r1(x0 + b * s), y0], apex];
  const foot: P = [apex[0], y0];
  return solid(
    t("Prisma segi tiga", "Triangular prism"),
    t(
      "Tapak dan tinggi segi tiga serta panjang prisma diberi.",
      "The triangle's base and height and the prism's length are given.",
    ),
    [...prism(front, depth), { points: [apex, foot], dashed: true }],
    [
      { at: [r1(x0 + (b * s) / 2), y0 + 20], text: `${b} cm` },
      // Low and right of the height line: the only spot no hidden edge crosses.
      { at: [apex[0] + 6, y0 - 10], text: `${h} cm`, anchor: "start" },
      {
        at: [
          add(mid(front[1], add(front[1], depth)), [10, 10])[0],
          add(mid(front[1], add(front[1], depth)), [10, 10])[1],
        ],
        text: `${len} cm`,
        anchor: "start",
      },
    ],
  );
}

/** Prism with an isosceles-trapezium cross-section; the prism length is the unknown. */
function trapeziumPrism(top: number, bottom: number, h: number) {
  const len = 10; // drawn length only; the question asks for it, so it is labelled "?"
  const { s, x0, y0, depth } = fit(bottom, h, len);
  const inset = ((bottom - top) / 2) * s;
  const front: P[] = [
    [x0, y0],
    [r1(x0 + bottom * s), y0],
    [r1(x0 + bottom * s - inset), r1(y0 - h * s)],
    [r1(x0 + inset), r1(y0 - h * s)],
  ];
  const foot: P = [front[3][0], y0];
  return solid(
    t("Prisma bertapak trapezium", "Trapezium prism"),
    t(
      "Sisi selari dan tinggi trapezium diberi; panjang prisma ditanda ?.",
      "The trapezium's parallel sides and height are given; the prism's length is marked ?.",
    ),
    [...prism(front, depth), { points: [front[3], foot], dashed: true }],
    [
      { at: [mid(front[0], front[1])[0], y0 + 20], text: `${bottom} cm` },
      { at: [mid(front[2], front[3])[0], front[3][1] - 8], text: `${top} cm` },
      { at: [front[3][0] + 6, y0 - 10], text: `${h} cm`, anchor: "start" },
      {
        at: [
          add(mid(front[1], add(front[1], depth)), [10, 10])[0],
          add(mid(front[1], add(front[1], depth)), [10, 10])[1],
        ],
        text: "?",
        anchor: "start",
      },
    ],
  );
}

/**
 * Half-cylinder lying on its rectangular face: semicircular ends of radius r, length len.
 * The curved surface faces the viewer for 0° ≤ θ < 135°, so the silhouette tangent is at θ = 135°
 * and the arc beyond it, the back diameter and the far bottom edge are hidden.
 */
function halfCylinder(r: number, len: number) {
  const s = Math.min(200 / (2 * r + len * RECEDE), 140 / (r + len * RECEDE));
  const R = r1(r * s);
  const dd = r1(len * s * RECEDE);
  const C: P = [r1((300 - (2 * R + dd)) / 2 + R), r1(120 + (R + dd) / 2)];
  const Cb: P = [r1(C[0] + dd), r1(C[1] - dd)];
  const onArc = (c: P, deg: number): P => [
    r1(c[0] + R * Math.cos((deg * Math.PI) / 180)),
    r1(c[1] + R * Math.sin((deg * Math.PI) / 180)),
  ];
  return solid(
    t("Separuh silinder", "Half-cylinder"),
    t(
      "Silinder dipotong dua sama besar melalui diameternya; jejari dan panjang diberi.",
      "A cylinder cut into two equal halves through its diameter; the radius and length are given.",
    ),
    [
      { points: [onArc(C, 180), onArc(C, 0)] },
      { points: [onArc(C, 0), onArc(Cb, 0)] },
      { points: [onArc(C, 225), onArc(Cb, 225)] },
      { points: [onArc(C, 180), onArc(Cb, 180)], dashed: true },
      { points: [onArc(Cb, 180), onArc(Cb, 0)], dashed: true },
      { points: [C, onArc(C, 315)] },
    ],
    [
      { at: [r1(C[0] + R * 0.35 + 6), r1(C[1] - R * 0.35 + 14)], text: `${r} cm`, anchor: "start" },
      { at: add(mid(onArc(C, 0), onArc(Cb, 0)), [10, 10]), text: `${len} cm`, anchor: "start" },
    ],
    [
      { centre: C, radius: R, start: 180, end: 360 },
      { centre: Cb, radius: R, start: 225, end: 360 },
      { centre: Cb, radius: R, start: 180, end: 225, dashed: true },
    ],
  );
}

/** Polyline approximation of an ellipse arc (SVG angles, degrees; 0° right, 90° down). */
function ellipse(c: P, rx: number, ry: number, from: number, to: number, steps = 24): P[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const a = ((from + ((to - from) * i) / steps) * Math.PI) / 180;
    return [r1(c[0] + rx * Math.cos(a)), r1(c[1] + ry * Math.sin(a))] as P;
  });
}
/** A horizontal circle seen from slightly above: near half solid, far half dashed. */
const base = (c: P, rx: number, ry: number): Path[] => [
  { points: ellipse(c, rx, ry, 0, 180) },
  { points: ellipse(c, rx, ry, 180, 360), dashed: true },
];

function cone(r: number, slant: number) {
  const h = Math.sqrt(slant * slant - r * r);
  const s = Math.min(90 / r, 150 / h);
  const rx = r1(r * s),
    ry = r1(rx * 0.28);
  const apex: P = [150, r1(120 - (h * s) / 2)];
  const c: P = [150, r1(120 + (h * s) / 2)];
  const right: P = [c[0] + rx, c[1]];
  return solid(
    t("Kon", "Cone"),
    t("Jejari tapak dan tinggi sendeng diberi.", "The base radius and the slant height are given."),
    [...base(c, rx, ry), { points: [[c[0] - rx, c[1]], apex, right] }, { points: [c, right] }],
    [
      { at: [r1(c[0] + rx / 2), c[1] + 17], text: `${r} cm` },
      {
        at: [r1((apex[0] + right[0]) / 2 + 10), r1((apex[1] + right[1]) / 2)],
        text: `${slant} cm`,
        anchor: "start",
      },
    ],
  );
}

function hemisphere(r: number) {
  const R = 100,
    ry = 26;
  const c: P = [150, 168];
  return solid(
    t("Hemisfera", "Hemisphere"),
    t(
      "Hemisfera padu dengan tapak bulat; jejari diberi.",
      "A solid hemisphere with a circular base; the radius is given.",
    ),
    [...base(c, R, ry), { points: [c, [c[0] + R, c[1]]] }],
    [{ at: [c[0] + R / 2, c[1] + 17], text: `${r} cm` }],
    [{ centre: c, radius: R, start: 180, end: 360 }],
  );
}

/** Cone standing on a cylinder of the same radius. */
function coneOnCylinder(r: number, hCyl: number, hCone: number) {
  const s = 168 / (hCyl + hCone);
  const rx = r1(r * s),
    ry = r1(rx * 0.28);
  const bottom: P = [150, r1(110 + ((hCyl + hCone) * s) / 2)];
  const joint: P = [150, r1(bottom[1] - hCyl * s)];
  const apex: P = [150, r1(joint[1] - hCone * s)];
  return solid(
    t("Gabungan kon dan silinder", "Cone on a cylinder"),
    t(
      "Kon dan silinder berkongsi jejari yang sama; tinggi setiap bahagian diberi.",
      "The cone and cylinder share the same radius; each part's height is given.",
    ),
    [
      ...base(bottom, rx, ry),
      ...base(joint, rx, ry),
      {
        points: [
          [joint[0] - rx, joint[1]],
          [bottom[0] - rx, bottom[1]],
        ],
      },
      {
        points: [
          [joint[0] + rx, joint[1]],
          [bottom[0] + rx, bottom[1]],
        ],
      },
      { points: [[joint[0] - rx, joint[1]], apex, [joint[0] + rx, joint[1]]] },
      { points: [apex, joint], dashed: true },
      { points: [bottom, [bottom[0] + rx, bottom[1]]] },
    ],
    [
      { at: [r1(bottom[0] + rx / 2), r1(bottom[1] + ry + 17)], text: `${r} cm` },
      {
        at: [r1(bottom[0] - rx - 8), r1((joint[1] + bottom[1]) / 2 + 5)],
        text: `${hCyl} cm`,
        anchor: "end",
      },
      // Outside the narrow cone, named so it cannot be read as the slant edge.
      {
        at: [r1(apex[0] + rx * 0.55 + 8), r1((apex[1] + joint[1]) / 2 + 5)],
        text: t(`tinggi ${hCone} cm`, `height ${hCone} cm`),
        anchor: "start",
      },
    ],
  );
}

function openCylinder(r: number, h: number, open = true) {
  const s = Math.min(95 / r, 150 / h);
  const rx = r1(r * s),
    ry = r1(rx * 0.26);
  const top: P = [150, r1(120 - (h * s) / 2)];
  const bottom: P = [150, r1(120 + (h * s) / 2)];
  return solid(
    open ? t("Silinder tanpa penutup", "Open cylinder") : t("Silinder", "Cylinder"),
    open
      ? t(
          "Bahagian atas terbuka (tiada penutup); tapak tertutup. Jejari dan tinggi diberi.",
          "The top is open (no lid); the base is closed. Radius and height are given.",
        )
      : t(
          "Silinder tertutup; jejari dan tinggi diberi.",
          "A closed cylinder; the radius and height are given.",
        ),
    [
      { points: ellipse(top, rx, ry, 0, 360, 48) },
      ...base(bottom, rx, ry),
      {
        points: [
          [top[0] - rx, top[1]],
          [bottom[0] - rx, bottom[1]],
        ],
      },
      {
        points: [
          [top[0] + rx, top[1]],
          [bottom[0] + rx, bottom[1]],
        ],
      },
      { points: [top, [top[0] + rx, top[1]]] },
    ],
    [
      { at: [r1(top[0] + rx / 2), r1(top[1] - ry - 6)], text: `${r} cm` },
      { at: [r1(top[0] + rx + 8), 125], text: `${h} cm`, anchor: "start" },
    ],
  );
}

/** Called with the BM stem of a Chapter 6 seed. */
export function solidVisualForSeed(bm: string): MathQuestionVisual | undefined {
  const box =
    /^Kotak \d+ berukuran (\d+) cm × (\d+) cm × (\d+) cm\. Cari luas permukaannya\.$/.exec(bm);
  if (box) return cuboid(Number(box[1]), Number(box[2]), Number(box[3]));
  const closed =
    /^Silinder tertutup \d+ berjejari (\d+) cm dan tinggi (\d+) cm\. Cari luas permukaan\./.exec(
      bm,
    );
  if (closed) return openCylinder(Number(closed[1]), Number(closed[2]), false);
  switch (bm) {
    case "Cari isi padu silinder berjejari 7 cm dan tinggi 5 cm. Gunakan π = 22/7.":
      return openCylinder(7, 5, false);
    case "Sebuah kuboid berukuran 6 cm × 4 cm × 3 cm. Cari isi padunya.":
      return cuboid(6, 4, 3);
    case "Cari luas permukaan kuboid 5 cm × 3 cm × 2 cm.":
      return cuboid(5, 3, 2);
    case "Sebuah prisma segi tiga mempunyai tapak segi tiga 8 cm, tinggi segi tiga 5 cm dan panjang prisma 12 cm. Cari isi padu.":
      return triangularPrism(8, 5, 12);
    case "Sebuah prisma mempunyai isi padu 960 cm³. Keratan rentasnya trapezium dengan sisi selari 8 cm dan 12 cm serta tinggi 6 cm. Cari panjang prisma.":
      return trapeziumPrism(8, 12, 6);
    case "Sebuah silinder berjari-jari 7 cm dan tinggi 12 cm dipotong separuh mengikut diameternya. Cari isi padu satu bahagian. Gunakan π = 22/7.":
      return halfCylinder(7, 12);
    case "Sebuah kon padu mempunyai jejari 6 cm dan tinggi sendeng 10 cm. Cari jumlah luas permukaannya dalam sebutan π.":
      return cone(6, 10);
    case "Sebuah hemisfera padu mempunyai jejari 7 cm. Cari jumlah luas permukaannya. Gunakan π = 22/7.":
      return hemisphere(7);
    case "Sebuah gabungan pepejal terdiri daripada kon di atas silinder. Kedua-duanya berjejari 3 cm; tinggi silinder 10 cm dan tinggi kon 4 cm. Cari isi padu dalam sebutan π.":
      return coneOnCylinder(3, 10, 4);
    case "Sebuah bekas silinder tanpa penutup berjejari 7 cm dan tinggi 10 cm. Cari luas permukaan luarnya. Gunakan π = 22/7.":
      return openCylinder(7, 10);
  }
  return undefined;
}
