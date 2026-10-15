import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import type { GeometryPanel, GeometryPoint } from "@/features/quiz/visuals/mathGeometryVisual";

/**
 * Answer-neutral BM/DLP visuals for the ACTUAL paired Form 2 Mathematics bank.
 * Seed-text matching is deliberate: a revised mathematical premise must not
 * silently retain an obsolete diagram. Unsupported questions remain text only.
 */
const t = (bm: string, dlp: string) => ({ bm, dlp });
type P = GeometryPoint;
const shape = (
  title: ReturnType<typeof t>,
  description: ReturnType<typeof t>,
  points: P[],
  labels: GeometryPanel["labels"],
  extras: NonNullable<GeometryPanel["paths"]> = [],
): MathQuestionVisual => ({
  kind: "geometry-diagram",
  title,
  panels: [{
    title: t("Rajah maklumat diberi", "Diagram of given information"),
    description,
    paths: [{ points, closed: true, fill: true }, ...extras],
    labels,
  }],
});

const areaTriangle: MathQuestionVisual = {
  kind: "geometry-diagram",
  title: t("Dua segi tiga, luas kekal", "Two triangles, equal areas"),
  panels: [
    {
      title: t("Asal", "Original"),
      description: t("Luas A = bh/2, tapak b, tinggi h.", "Area A = bh/2, base b, height h."),
      paths: [
        { points: [[54, 201], [246, 201], [140, 56]], closed: true, fill: true },
        { points: [[140, 56], [140, 201]], dashed: true },
      ],
      labels: [
        { at: [150, 224], text: "b" }, { at: [126, 121], text: "h" },
      ],
    },
    {
      title: t("Selepas perubahan", "After the change"),
      description: t("Tapak menjadi b/2 tetapi luas mesti kekal. Tinggi baharu tidak diberikan.",
        "Base becomes b/2, but area remains equal. The new height is unknown."),
      paths: [
        { points: [[92, 201], [209, 201], [142, 56]], closed: true, fill: true },
        { points: [[142, 56], [142, 201]], dashed: true },
      ],
      labels: [
        { at: [149, 225], text: "b/2" }, { at: [129, 119], text: "?" },
      ],
    },
  ],
};
const quad = shape(
  t("Sudut segi empat", "Quadrilateral angles"),
  t("Hanya tiga sudut diberi. Rajah tidak mengikut skala.", "Only three angles are given. Diagram not to scale."),
  [[45, 65], [254, 57], [264, 211], [63, 211]],
  [
    { at: [82, 89], text: "80°" },
    { at: [216, 89], text: "95°" },
    { at: [224, 180], text: "105°" },
    { at: [102, 178], text: "x°" },
  ],
);
const pentagon = shape(
  t("Sudut pentagon", "Pentagon angles"),
  t("Empat sudut diketahui dan satu tidak diketahui. Rajah tidak mengikut skala.",
    "Four angles are known and one is unknown. Diagram not to scale."),
  [[150, 30], [261, 109], [229, 216], [71, 216], [39, 109]],
  [
    { at: [150, 67], text: "100°" },
    { at: [226, 119], text: "110°" },
    { at: [202, 186], text: "120°" },
    { at: [100, 188], text: "90°" },
    { at: [82, 119], text: "x°" },
  ],
);
const chord: MathQuestionVisual = {
  kind: "geometry-diagram",
  title: t("Perentas dan pusat bulatan", "Circle chord and centre"),
  panels: [{
    title: t("Perentas AB", "Chord AB"),
    description: t("O ialah pusat, OP berserenjang dengan AB pada P; cari hubungan AP dengan PB.",
      "O is the centre, OP is perpendicular to AB at P; compare AP and PB."),
    circles: [{ centre: [150, 120], radius: 91 }],
    paths: [
      { points: [[69, 162], [231, 162]] },
      { points: [[150, 120], [150, 162]] },
      { points: [[150, 150], [163, 150], [163, 162]] },
    ],
    labels: [
      { at: [149, 112], text: "O" }, { at: [57, 166], text: "A" },
      { at: [243, 166], text: "B" }, { at: [151, 187], text: "P" },
    ],
  }],
};
const sector90 = (radius: string): MathQuestionVisual => ({
  kind: "geometry-diagram",
  title: t("Sektor bulatan", "Circle sector"),
  panels: [{
    title: t("Sektor 90°", "90° sector"),
    description: t("Sudut pusat dan jejari diberi. Panjang lengkok dan luas tidak ditanda.",
      "The central angle and radius are given. Arc length and area are not labelled."),
    circles: [{ centre: [145, 148], radius: 92 }],
    paths: [
      { points: [[145, 148], [145, 56]] }, { points: [[145, 148], [237, 148]] },
      { points: [[145, 133], [160, 133], [160, 148]] },
    ],
    labels: [
      { at: [126, 172], text: "O" },
      { at: [178, 122], text: "90°" },
      { at: [98, 101], text: radius },
    ],
  }],
});
const cuboid = (a: string, b: string, c: string): MathQuestionVisual => ({
  kind: "geometry-diagram",
  title: t("Kuboid", "Cuboid"),
  panels: [{
    title: t("Ukuran tiga matra", "Three-dimensional measurements"),
    description: t("Panjang, lebar dan tinggi diberikan; rajah tidak mengikut skala.",
      "Length, width and height given; diagram not to scale."),
    paths: [
      { points: [[60, 112], [198, 112], [198, 212], [60, 212]], closed: true },
      { points: [[60, 112], [104, 66], [242, 66], [198, 112]] },
      { points: [[198, 112], [242, 66], [242, 164], [198, 212]] },
      { points: [[60, 212], [104, 164], [242, 164]], dashed: true },
      { points: [[104, 66], [104, 164]], dashed: true },
    ],
    labels: [
      { at: [128, 235], text: a },
      { at: [234, 206], text: b },
      { at: [40, 163], text: c },
    ],
  }],
});
const plane = (title: ReturnType<typeof t>, description: ReturnType<typeof t>,
  domain: [number, number, number, number],
  points: { at: [number, number]; name: string }[],
  paths: { points: [number, number][]; closed?: boolean }[] = []): MathQuestionVisual => ({
    kind: "coordinate-plane", title, description, domain, step: 2, points, paths,
  });
const robot = plane(
  t("Laluan robot", "Robot route"),
  t("Robot bergerak melalui A, B, C mengikut urutan; jarak belum dikira.",
    "Robot travels through A, B, C in order; lengths have not been calculated."),
  [-5, 13, 0, 12],
  [{ at: [-3, 4], name: "A" }, { at: [5, 10], name: "B" }, { at: [11, 2], name: "C" }],
  [{ points: [[-3, 4], [5, 10], [11, 2]] }],
);
const rightTriangle = plane(
  t("Segi tiga koordinat", "Coordinate triangle"),
  t("Semua bucu yang diberi diplot; panjang hipotenus belum ditanda.",
    "All given vertices are plotted; the hypotenuse length is unlabelled."),
  [-3, 10, 0, 10],
  [{ at: [-1, 2], name: "A" }, { at: [7, 2], name: "B" }, { at: [-1, 8], name: "C" }],
  [{ points: [[-1, 2], [7, 2], [-1, 8]], closed: true }],
);
const parallel: MathQuestionVisual = {
  kind: "coordinate-plane",
  title: t("Dua graf garis lurus", "Two straight-line graphs"),
  description: t("Dua persamaan yang diberi ditunjukkan tanpa menyatakan hubungannya.",
    "Both given equations are shown without naming their relationship."),
  domain: [-5, 5, -8, 8], step: 2,
  lines: [
    { a: 2, b: -1, c: -1, label: "y = 2x + 1" },
    { a: 2, b: -1, c: 4, label: "y = 2x − 4" },
  ],
};
const slopeLine = plane(
  t("Dua titik pada graf", "Two points on a graph"),
  t("Cari kecerunan daripada dua titik yang diberi; nilainya tidak dilabel.",
    "Find the gradient from the two supplied points; it is not labelled."),
  [-1, 5, -1, 8],
  [{ at: [0, 6], name: "A" }, { at: [3, 0], name: "B" }],
  [{ points: [[0, 6], [3, 0]] }],
);
const graph = (distance: boolean): MathQuestionVisual => {
  const graphPaths: NonNullable<GeometryPanel["paths"]> = distance
    ? [
        { points: [[56, 45], [56, 223], [260, 223]] },
        { points: [[56, 205], [235, 80]] },
      ]
    : [
        { points: [[56, 45], [56, 223], [260, 223]] },
        { points: [[57, 135], [242, 135], [242, 223], [57, 223]], closed: true, fill: true },
      ];
  return {
    kind: "geometry-diagram",
    title: distance ? t("Graf jarak-masa", "Distance-time graph") : t("Graf laju-masa", "Speed-time graph"),
    panels: [{
      title: t("Graf skematik", "Schematic graph"),
      description: distance
        ? t("Segmen menaik pada graf jarak-masa. Tiada nilai kecerunan ditulis.",
            "An increasing distance-time segment. Its gradient is not labelled.")
        : t("Rantau di bawah segmen laju seragam. Luasnya tidak dinyatakan.",
            "The region under a constant-speed section. Its area is not given."),
      paths: graphPaths,
      labels: [
        { at: [36, 32], text: distance ? t("Jarak", "Distance") : t("Laju", "Speed") },
        { at: [243, 244], text: t("Masa", "Time") },
      ],
    }],
  };
};
const statTable = (values: number[], frequencies: number[], mode: boolean): MathQuestionVisual => ({
  kind: "frequency-table",
  title: mode ? t("Jadual kekerapan: cari mod", "Frequency table: find the mode")
    : t("Jadual kekerapan: cari min", "Frequency table: find the mean"),
  valueHeading: t("Nilai", "Value"),
  frequencyHeading: t("Kekerapan", "Frequency"),
  rows: values.map((value, i) => ({ value: String(value), frequency: frequencies[i] })),
});

/** Called when the paired bank is built, not at render time. */
export function mathF2VisualForSeed(chapter: number, bmQuestion: string): MathQuestionVisual | undefined {
  switch (chapter) {
    case 3:
      if (bmQuestion === "Diberi A = bh/2. Tapak dikurangkan separuh tetapi luas hendak dikekalkan. Apakah perlu berlaku kepada tinggi?") return areaTriangle;
      break;
    case 4:
      if (bmQuestion === "Tiga sudut sebuah segi empat ialah 80°, 95° dan 105°. Cari sudut keempat.") return quad;
      if (bmQuestion === "Sudut sebuah pentagon ialah 100°, 110°, 120°, 90° dan x°. Cari x.") return pentagon;
      break;
    case 5:
      if (bmQuestion === "Garis OP dari pusat bulatan O berserenjang dengan perentas AB di P. Apakah hubungan AP dengan PB?") return chord;
      if (bmQuestion === "Cari panjang lengkok 90° bagi bulatan berjejari 14 cm. Gunakan π = 22/7.") return sector90("14 cm");
      if (bmQuestion === "Cari perimeter sebuah sektor 90° berjejari 14 cm. Gunakan π = 22/7.") return sector90("14 cm");
      break;
    case 6:
      if (bmQuestion === "Sebuah kuboid berukuran 6 cm × 4 cm × 3 cm. Cari isi padunya.") return cuboid("6 cm", "4 cm", "3 cm");
      if (bmQuestion === "Cari luas permukaan kuboid 5 cm × 3 cm × 2 cm.") return cuboid("5 cm", "3 cm", "2 cm");
      break;
    case 7:
      if (bmQuestion === "Sebuah robot bergerak dari (-3,4) ke (5,10), kemudian ke (11,2). Cari jumlah jarak.") return robot;
      if (bmQuestion === "Sebuah segi tiga bersudut tegak mempunyai bucu (-1,2), (7,2) dan (-1,8). Cari panjang hipotenus.") return rightTriangle;
      break;
    case 8:
      if (bmQuestion === "Graf y=2x+1 dan y=2x−4 mempunyai hubungan apa?") return parallel;
      if (bmQuestion === "Sebuah graf melalui (0,6) dan (3,0). Apakah kecerunannya?") return slopeLine;
      break;
    case 10:
      if (bmQuestion === "Kecerunan graf jarak-masa mewakili apa?") return graph(true);
      if (bmQuestion === "Luas di bawah graf laju-masa mewakili apa?") return graph(false);
      break;
    case 11: {
      const m = /^Pantulkan titik P\d+\((-?\d+),(-?\d+)\) pada paksi-x\.$/.exec(bmQuestion);
      if (m) {
        const x = Number(m[1]), y = Number(m[2]);
        return plane(t("Pantulan pada paksi-x", "Reflection in the x-axis"),
          t("Titik asal ditanda, titik imej tidak ditunjukkan.",
            "The original point is marked; the image point is not plotted."),
          [-9, 9, -9, 9], [{ at: [x, y], name: "P" }]);
      }
      break;
    }
    case 12: {
      const mean = /^Nilai ([\d,]+) mempunyai kekerapan ([\d,]+)\. Cari min bagi jadual \d+\.$/.exec(bmQuestion);
      const mode = /^Jadual \d+ mempunyai nilai ([\d,]+) dan kekerapan ([\d,]+)\. Cari mod\.$/.exec(bmQuestion);
      const match = mean ?? mode;
      if (match) {
        const values = match[1].split(",").map(Number);
        const frequencies = match[2].split(",").map(Number);
        if (values.length === frequencies.length && values.length >= 2 &&
            values.every(Number.isFinite) && frequencies.every((f) => Number.isInteger(f) && f >= 0))
          return statTable(values, frequencies, Boolean(mode));
      }
      break;
    }
    case 13: {
      const marbles = /^Sebuah beg \\d+ mengandungi (\\d+) guli merah dan (\\d+) guli biru\\. Cari kebarangkalian memilih guli bukan merah\\.$/.exec(bmQuestion);
      if (marbles) {
        const red = Number(marbles[1]), blue = Number(marbles[2]);
        if (red > 0 && blue > 0 && red + blue <= 30)
          return {
            kind: "item-arrays",
            title: t("Kandungan beg guli", "Marbles in the bag"),
            groups: [
              { label: t("Merah", "Red"), count: red },
              { label: t("Biru", "Blue"), count: blue },
            ],
          };
      }
      break;
    }
  }
  return undefined;
}
