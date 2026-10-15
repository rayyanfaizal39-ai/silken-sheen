import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import type { GeometryPanel, GeometryPoint } from "@/features/quiz/visuals/mathGeometryVisual";

/**
 * Chapter 5 (Circles) stimuli. Every figure is constructed from the question's
 * own measurements (to scale inside the 300 × 240 panel), labels only what the
 * question gives, and marks the unknown with "?" without ever drawing its value.
 */
const t = (bm: string, dlp: string) => ({ bm, dlp });
type P = GeometryPoint;
type Labels = GeometryPanel["labels"];
const r1 = (n: number) => Math.round(n * 10) / 10;
const pt = (x: number, y: number): P => [r1(x), r1(y)];

const single = (
  title: ReturnType<typeof t>,
  panelTitle: ReturnType<typeof t>,
  description: ReturnType<typeof t>,
  panel: Omit<GeometryPanel, "title" | "description">,
): MathQuestionVisual => ({
  kind: "geometry-diagram",
  title,
  panels: [{ title: panelTitle, description, ...panel }],
});

/** Small right-angle marker at `corner`, with arms along unit directions u and v. */
const rightAngle = (corner: P, u: P, v: P, size = 11): GeometryPanel["paths"] => [
  {
    points: [
      pt(corner[0] + u[0] * size, corner[1] + u[1] * size),
      pt(corner[0] + (u[0] + v[0]) * size, corner[1] + (u[1] + v[1]) * size),
      pt(corner[0] + v[0] * size, corner[1] + v[1] * size),
    ],
  },
];

/**
 * Circle with centre O, a horizontal chord AB at perpendicular distance d below O,
 * the perpendicular OP and the radius OA. Measurements are in cm; the figure is to scale.
 */
export function chordFigure(opts: {
  radius: number;
  distance: number;
  labels: { radius?: string; distance?: string; chord?: string; halfChord?: string };
  showRadius?: boolean;
  description: ReturnType<typeof t>;
}): MathQuestionVisual {
  const { radius, distance, labels } = opts;
  const scale = 92 / radius;
  const O: P = [150, 112];
  const R = radius * scale;
  const dy = distance * scale;
  const half = Math.sqrt(R * R - dy * dy);
  const A = pt(O[0] - half, O[1] + dy);
  const B = pt(O[0] + half, O[1] + dy);
  const Pf = pt(O[0], O[1] + dy);
  const out: Labels = [
    { at: [O[0] + 4, O[1] - 7], text: "O", anchor: "start" },
    { at: [A[0] - 8, A[1] + 6], text: "A", anchor: "end" },
    { at: [B[0] + 8, B[1] + 6], text: "B", anchor: "start" },
    { at: [Pf[0] + 3, Pf[1] + 17], text: "P", anchor: "start" },
  ];
  if (labels.distance)
    out.push({ at: [O[0] + 7, (O[1] + Pf[1]) / 2 + 5], text: labels.distance, anchor: "start" });
  if (labels.radius)
    out.push({
      at: [(O[0] + A[0]) / 2 - 8, (O[1] + A[1]) / 2 - 4],
      text: labels.radius,
      anchor: "end",
    });
  // Below the circle and named, so the chord length is never read as labelling P.
  if (labels.chord) out.push({ at: [O[0], r1(O[1] + R + 22)], text: `AB = ${labels.chord}` });
  if (labels.halfChord) out.push({ at: [(A[0] + Pf[0]) / 2, A[1] + 20], text: labels.halfChord });
  return single(
    t("Perentas dan jarak dari pusat", "Chord and distance from the centre"),
    t("O ialah pusat bulatan", "O is the centre of the circle"),
    opts.description,
    {
      circles: [{ centre: O, radius: r1(R) }],
      paths: [
        { points: [A, B] },
        { points: [O, Pf] },
        ...(opts.showRadius === false ? [] : [{ points: [O, A] }]),
        ...rightAngle(Pf, [1, 0], [0, -1])!,
      ],
      labels: out,
    },
  );
}

/** Circle with two parallel chords on opposite sides of O (radius 10, chords 16 and 12). */
function parallelChords(radius: number, d1: number, d2: number, c1: string, c2: string, r: string) {
  const scale = 92 / radius;
  const O: P = [150, 118];
  const chord = (d: number): [P, P] => {
    const h = Math.sqrt(radius * radius - d * d) * scale;
    return [pt(O[0] - h, O[1] + d * scale), pt(O[0] + h, O[1] + d * scale)];
  };
  const top = chord(-d1);
  const bottom = chord(d2);
  return single(
    t("Dua perentas selari", "Two parallel chords"),
    t("O ialah pusat bulatan", "O is the centre of the circle"),
    t(
      "Kedua-dua perentas selari dan berada pada sisi bertentangan pusat; jarak dari pusat tidak ditanda.",
      "The chords are parallel, on opposite sides of the centre; distances from the centre are not marked.",
    ),
    {
      circles: [{ centre: O, radius: 92 }],
      paths: [{ points: top }, { points: bottom }, { points: [O, [O[0] + 92, O[1]]] }],
      labels: [
        { at: [O[0] - 4, O[1] + 4], text: "O", anchor: "end" },
        { at: [O[0], top[0][1] - 8], text: c1 },
        { at: [O[0], bottom[0][1] + 20], text: c2 },
        { at: [O[0] + 46, O[1] - 7], text: r },
      ],
    },
  );
}

/** A sector drawn as two radii and its arc only (no full circle), for perimeter questions. */
function sectorOnly(angle: number, radius: string) {
  const O: P = [96, 186];
  const R = 140;
  const end = pt(
    O[0] + R * Math.cos((-angle * Math.PI) / 180),
    O[1] + R * Math.sin((-angle * Math.PI) / 180),
  );
  return single(
    t("Sektor bulatan", "Circle sector"),
    t(`Sektor ${angle}°`, `${angle}° sector`),
    t(
      "Sempadan sektor ialah dua jejari dan satu lengkok. Panjang lengkok tidak ditanda.",
      "The sector's boundary is two radii and one arc. The arc length is not marked.",
    ),
    {
      arcs: [{ centre: O, radius: R, start: -angle, end: 0 }],
      paths: [
        { points: [O, [O[0] + R, O[1]]] },
        { points: [O, end] },
        ...(angle === 90 ? rightAngle(O, [1, 0], [0, -1], 14)! : []),
      ],
      labels: [
        { at: [O[0] - 6, O[1] + 16], text: "O", anchor: "end" },
        { at: [O[0] + R / 2, O[1] + 20], text: radius },
        { at: [O[0] - 10, O[1] - R / 2], text: radius, anchor: "end" },
        { at: [O[0] + 28, O[1] - 22], text: `${angle}°`, anchor: "start" },
      ],
    },
  );
}

/** Full circle with a highlighted minor arc of `angle`°, for arc-length questions. */
function arcInCircle(angle: number, radius: string) {
  const O: P = [150, 120];
  const R = 92;
  const end = pt(
    O[0] + R * Math.cos((-angle * Math.PI) / 180),
    O[1] + R * Math.sin((-angle * Math.PI) / 180),
  );
  return single(
    t("Lengkok bulatan", "Arc of a circle"),
    t(`Lengkok ${angle}°`, `${angle}° arc`),
    t(
      "Lengkok yang ditanda (biru) dicangkum oleh sudut pusat yang diberi. Panjangnya tidak ditanda.",
      "The marked (blue) arc is subtended by the given central angle. Its length is not marked.",
    ),
    {
      circles: [{ centre: O, radius: R }],
      arcs: [{ centre: O, radius: R, start: -angle, end: 0 }],
      paths: [{ points: [O, [O[0] + R, O[1]]] }, { points: [O, end] }],
      labels: [
        { at: [O[0] - 6, O[1] + 16], text: "O", anchor: "end" },
        { at: [O[0] + R / 2, O[1] + 20], text: radius },
        { at: [O[0] + 22, O[1] - 12], text: `${angle}°`, anchor: "start" },
      ],
    },
  );
}

const squareWithCircle = single(
  t("Bulatan terterap dalam segi empat sama", "Circle inscribed in a square"),
  t("Segi empat sama bersisi 14 cm", "Square of side 14 cm"),
  t(
    "Bulatan menyentuh keempat-empat sisi. Kawasan yang dicari ialah di dalam segi empat sama tetapi di luar bulatan.",
    "The circle touches all four sides. The required region is inside the square but outside the circle.",
  ),
  {
    paths: [
      {
        points: [
          [75, 45],
          [225, 45],
          [225, 195],
          [75, 195],
        ],
        closed: true,
        fill: true,
      },
    ],
    circles: [{ centre: [150, 120], radius: 75 }],
    labels: [{ at: [150, 35], text: "14 cm" }],
  },
);

/** Rectangle 7 cm wide (horizontal) and 12 cm tall with a semicircle of diameter 12 cm on its right end. */
const rectangleSemicircle = single(
  t("Segi empat tepat dan semibulatan", "Rectangle and semicircle"),
  t("Bentuk gabungan", "Composite shape"),
  t(
    "Diameter semibulatan ialah sisi 12 cm segi empat tepat (garis putus-putus).",
    "The semicircle's diameter is the 12 cm side of the rectangle (dashed).",
  ),
  {
    paths: [
      {
        points: [
          [154, 48],
          [70, 48],
          [70, 192],
          [154, 192],
        ],
      },
      {
        points: [
          [154, 48],
          [154, 192],
        ],
        dashed: true,
      },
    ],
    arcs: [{ centre: [154, 120], radius: 72, start: -90, end: 90 }],
    labels: [
      { at: [112, 38], text: "7 cm" },
      { at: [62, 124], text: "12 cm", anchor: "end" },
    ],
  },
);

/** Capsule: an 18 cm × 8 cm rectangle with a semicircle of diameter 8 cm on each end (9 px per cm). */
const capsule = single(
  t("Bentuk kapsul", "Capsule shape"),
  t("Segi empat tepat dengan dua semibulatan", "Rectangle with two semicircles"),
  t(
    "Setiap semibulatan berdiameter 8 cm, sama dengan lebar segi empat tepat.",
    "Each semicircle has diameter 8 cm, equal to the rectangle's width.",
  ),
  {
    paths: [
      {
        points: [
          [69, 84],
          [231, 84],
        ],
      },
      {
        points: [
          [69, 156],
          [231, 156],
        ],
      },
      {
        points: [
          [69, 84],
          [69, 156],
        ],
        dashed: true,
      },
      {
        points: [
          [231, 84],
          [231, 156],
        ],
        dashed: true,
      },
    ],
    arcs: [
      { centre: [69, 120], radius: 36, start: 90, end: 270 },
      { centre: [231, 120], radius: 36, start: -90, end: 90 },
    ],
    labels: [
      { at: [150, 74], text: "18 cm" },
      { at: [77, 124], text: "8 cm", anchor: "start" },
    ],
  },
);

const annulus = single(
  t("Gelang (dua bulatan sepusat)", "Annulus (two concentric circles)"),
  t("Kawasan di antara dua bulatan", "Region between the two circles"),
  t(
    "Bulatan dalam (putus-putus) bukan sebahagian daripada gelang.",
    "The inner (dashed) circle is not part of the annulus.",
  ),
  {
    circles: [
      { centre: [150, 120], radius: 100 },
      { centre: [150, 120], radius: 60, fill: false, dashed: true },
    ],
    paths: [
      {
        points: [
          [150, 120],
          [250, 120],
        ],
      },
      {
        points: [
          [150, 120],
          [150, 60],
        ],
      },
    ],
    labels: [
      { at: [214, 112], text: "10 cm" },
      { at: [156, 98], text: "6 cm", anchor: "start" },
    ],
  },
);

/** 20 cm square with a 10 cm quarter-circle at each corner; the quarter-circles meet at the side midpoints. */
const fourQuarters = single(
  t("Empat suku bulatan dalam segi empat sama", "Four quarter-circles in a square"),
  t("Segi empat sama bersisi 20 cm", "Square of side 20 cm"),
  t(
    "Setiap suku bulatan berpusat di satu bucu dengan jejari 10 cm. Kawasan yang dicari berada di tengah.",
    "Each quarter-circle is centred at a corner with radius 10 cm. The required region is in the middle.",
  ),
  {
    paths: [
      {
        points: [
          [60, 30],
          [240, 30],
          [240, 210],
          [60, 210],
        ],
        closed: true,
        fill: true,
      },
    ],
    arcs: [
      { centre: [60, 30], radius: 90, start: 0, end: 90 },
      { centre: [240, 30], radius: 90, start: 90, end: 180 },
      { centre: [240, 210], radius: 90, start: 180, end: 270 },
      { centre: [60, 210], radius: 90, start: 270, end: 360 },
    ],
    labels: [
      { at: [150, 20], text: "20 cm" },
      { at: [52, 79], text: "10 cm", anchor: "end" },
    ],
  },
);

/** 90° sector of radius 14 cm with the chord joining the ends of its radii (the triangle's hypotenuse). */
const sectorTriangle = single(
  t("Sektor dan segi tiga", "Sector and triangle"),
  t("Sektor 90°", "90° sector"),
  t(
    "Segi tiga dibentuk oleh dua jejari dan perentas (putus-putus). Kawasan dicari di antara perentas dan lengkok.",
    "The triangle is formed by two radii and the chord (dashed). The required region lies between the chord and the arc.",
  ),
  {
    arcs: [{ centre: [80, 196], radius: 150, start: -90, end: 0 }],
    paths: [
      {
        points: [
          [80, 196],
          [230, 196],
        ],
      },
      {
        points: [
          [80, 196],
          [80, 46],
        ],
      },
      {
        points: [
          [80, 46],
          [230, 196],
        ],
        dashed: true,
      },
      ...rightAngle([80, 196], [1, 0], [0, -1], 14)!,
    ],
    labels: [
      { at: [155, 216], text: "14 cm" },
      { at: [72, 124], text: "14 cm", anchor: "end" },
      { at: [70, 212], text: "O", anchor: "end" },
    ],
  },
);

/** Circle of radius 12 cm with a 60° sector removed (removed arc dashed). */
const sectorRemoved = (() => {
  const O: P = [150, 120];
  const R = 95;
  const end = pt(
    O[0] + R * Math.cos((-60 * Math.PI) / 180),
    O[1] + R * Math.sin((-60 * Math.PI) / 180),
  );
  return single(
    t("Bulatan dengan sektor dipotong", "Circle with a sector removed"),
    t("Sektor 60° dibuang", "60° sector removed"),
    t(
      "Lengkok putus-putus menandakan sektor yang dipotong; bahagian lain kekal.",
      "The dashed arc marks the removed sector; the rest remains.",
    ),
    {
      arcs: [
        { centre: O, radius: R, start: 0, end: 300 },
        { centre: O, radius: R, start: -60, end: 0, dashed: true },
      ],
      paths: [{ points: [O, [O[0] + R, O[1]]] }, { points: [O, end] }],
      labels: [
        { at: [O[0] - 6, O[1] + 16], text: "O", anchor: "end" },
        { at: [O[0] + R / 2, O[1] + 20], text: "12 cm" },
        { at: [O[0] + 26, O[1] - 14], text: "60°", anchor: "start" },
      ],
    },
  );
})();

const chordGiven = t(
  "Hanya ukuran yang diberi ditanda; nilai yang dicari bertanda ?.",
  "Only the given measurements are labelled; the unknown is marked ?.",
);

/** Called with the BM stem of a Chapter 5 seed. */
export function circleVisualForSeed(bm: string): MathQuestionVisual | undefined {
  switch (bm) {
    case "O ialah pusat bulatan. Garis OP berserenjang dengan perentas AB di P. Jika AB = 18 cm, cari AP.":
      return chordFigure({
        radius: 12,
        distance: 6,
        labels: { chord: "18 cm", halfChord: "?" },
        showRadius: false,
        description: t(
          "O ialah pusat dan OP ⟂ AB. Hanya panjang AB diberi.",
          "O is the centre and OP ⟂ AB. Only AB is given.",
        ),
      });
    case "AB ialah perentas 16 cm. OP berserenjang dengan AB di P dan OP = 6 cm. Cari jejari OA.":
      return chordFigure({
        radius: 10,
        distance: 6,
        labels: { chord: "16 cm", distance: "6 cm", radius: "?" },
        description: chordGiven,
      });
    case "Jejari sebuah bulatan 13 cm. Sebuah perentas berjarak 5 cm dari pusat. Cari panjang perentas itu.":
      return chordFigure({
        radius: 13,
        distance: 5,
        labels: { radius: "13 cm", distance: "5 cm", chord: "?" },
        description: chordGiven,
      });
    case "Perentas 30 cm terletak 8 cm dari pusat. Berapakah jejari bulatan?":
      return chordFigure({
        radius: 17,
        distance: 8,
        labels: { chord: "30 cm", distance: "8 cm", radius: "?" },
        description: chordGiven,
      });
    case "Jejari bulatan ialah 10 cm dan perentasnya 12 cm. Cari jarak perentas dari pusat.":
      return chordFigure({
        radius: 10,
        distance: 8,
        labels: { radius: "10 cm", chord: "12 cm", distance: "?" },
        description: chordGiven,
      });
    case "AB ialah perentas 24 cm dalam bulatan berpusat O. OP berserenjang dengan AB dan OP = 5 cm. Cari diameter bulatan.":
      return chordFigure({
        radius: 13,
        distance: 5,
        labels: { chord: "24 cm", distance: "5 cm" },
        description: t(
          "Perentas dan jarak serenjang diberi; diameter tidak ditanda.",
          "The chord and perpendicular distance are given; the diameter is not marked.",
        ),
      });
    case "Sebuah perentas 48 cm berada 7 cm dari pusat. Cari luas bulatan dalam sebutan π.":
      return chordFigure({
        radius: 25,
        distance: 7,
        labels: { chord: "48 cm", distance: "7 cm" },
        description: t(
          "Perentas dan jarak dari pusat diberi; jejari tidak ditanda.",
          "The chord and its distance from the centre are given; the radius is not marked.",
        ),
      });
    case "Dua perentas selari panjangnya 16 cm dan 12 cm dalam bulatan berjejari 10 cm. Cari beza jarak mereka dari pusat.":
      return parallelChords(10, 6, 8, "16 cm", "12 cm", "10 cm");
    case "Cari panjang lengkok 90° bagi bulatan berjejari 14 cm. Gunakan π = 22/7.":
      return arcInCircle(90, "14 cm");
    case "Cari perimeter sebuah sektor 90° berjejari 14 cm. Gunakan π = 22/7.":
      return sectorOnly(90, "14 cm");
    case "Sebuah segi empat sama bersisi 14 cm mengandungi bulatan terterap. Cari luas di luar bulatan tetapi di dalam segi empat sama. Gunakan π = 22/7.":
      return squareWithCircle;
    case "Sebuah bentuk terdiri daripada segi empat tepat 12 cm × 7 cm dan sebuah semibulatan berdiameter 12 cm pada satu hujung. Cari luas dalam sebutan π.":
      return rectangleSemicircle;
    case "Sebuah gelang dibentuk oleh dua bulatan sepusat berjejari 10 cm dan 6 cm. Cari luas gelang dalam sebutan π.":
      return annulus;
    case "Sebuah segi empat sama bersisi 20 cm mempunyai empat suku bulatan berjejari 10 cm, satu di setiap bucu. Cari luas di luar keempat-empat suku bulatan dalam sebutan π.":
      return fourQuarters;
    case "Sektor 90° berjejari 14 cm mengandungi segi tiga bersudut tegak yang dibentuk oleh dua jejarinya. Cari luas sektor di luar segi tiga. Gunakan π = 22/7.":
      return sectorTriangle;
    case "Sebuah bentuk kapsul terdiri daripada segi empat tepat 18 cm × 8 cm dan dua semibulatan berdiameter 8 cm. Cari luas dalam sebutan π.":
      return capsule;
    case "Daripada bulatan berjejari 12 cm, sektor 60° dipotong. Cari luas bahagian yang tinggal dalam sebutan π.":
      return sectorRemoved;
  }
  return undefined;
}
