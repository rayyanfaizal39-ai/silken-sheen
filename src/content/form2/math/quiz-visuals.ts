import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import type { GeometryPanel } from "@/features/quiz/visuals/mathGeometryVisual";
import { chordFigure, circleVisualForSeed } from "./visuals/circle-visuals";
import { coordinateShapeVisualForSeed, outward, transformationVisualForSeed } from "./visuals/coordinate-visuals";
import { motionVisualForSeed } from "./visuals/motion-visuals";
import { polygonVisualForSeed } from "./visuals/polygon-visuals";
import { solidVisualForSeed } from "./visuals/solid-visuals";

/**
 * Answer-neutral BM/DLP visuals for the ACTUAL paired Form 2 Mathematics bank.
 * Seed-text matching is deliberate: a revised mathematical premise must not
 * silently retain an obsolete diagram. Unsupported questions remain text only.
 */
const t = (bm: string, dlp: string) => ({ bm, dlp });
const plane = (title: ReturnType<typeof t>, description: ReturnType<typeof t>,
  domain: [number, number, number, number],
  points: { at: [number, number]; name: string }[],
  paths: { points: [number, number][]; closed?: boolean }[] = []): MathQuestionVisual => ({
    kind: "coordinate-plane", title, description, domain, step: 2, paths,
    points: points.map((p) => ({ ...p, offset: outward(p.at) })),
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
        { at: [243, 238], text: t("Masa", "Time") },
      ],
    }],
  };
};
/** A midpoint prompt: plot *only* the two given endpoints, not its answer M. */
const midpointStimulus = (a: [number, number], b: [number, number]): MathQuestionVisual => ({
  kind: "coordinate-plane",
  title: t("Titik tengah segmen", "Midpoint of a segment"),
  description: t("A dan B diberi. Tentukan M tanpa ia ditanda pada rajah.",
    "Endpoints A and B are given. Determine midpoint M, which is not marked."),
  domain: [
    Math.min(-1, a[0], b[0]) - 2, Math.max(1, a[0], b[0]) + 2,
    Math.min(-1, a[1], b[1]) - 2, Math.max(1, a[1], b[1]) + 2,
  ],
  step: 2,
  points: [{ at: a, name: "A", offset: outward(a) }, { at: b, name: "B", offset: outward(b) }],
  paths: [{ points: [a, b] }],
});

/** Two stages of a journey; no time, total or computed result is drawn. */
const twoLegJourney = (distA: number, speedA: number, distB: number, speedB: number): MathQuestionVisual => ({
  kind: "geometry-diagram",
  title: t("Dua bahagian perjalanan", "Two journey sections"),
  panels: [
    { title: t("Laluan A", "Route A"),
      description: t("Jarak dan laju bagi bahagian pertama.", "Distance and speed of the first section."),
      paths: [{ points: [[60, 121], [250, 121]] }],
      labels: [
        { at: [153, 94], text: `${distA} km` },
        { at: [153, 167], text: `${speedA} km/h` },
      ],
    },
    { title: t("Laluan B", "Route B"),
      description: t("Jarak dan laju bagi bahagian kedua.", "Distance and speed of the second section."),
      paths: [{ points: [[60, 121], [250, 121]] }],
      labels: [
        { at: [153, 94], text: `${distB} km` },
        { at: [153, 167], text: `${speedB} km/h` },
      ],
    },
  ],
});
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
    case 4:
      return polygonVisualForSeed(bmQuestion);
    case 5:
      if (bmQuestion === "Garis OP dari pusat bulatan O berserenjang dengan perentas AB di P. Apakah hubungan AP dengan PB?")
        return chordFigure({
          radius: 10, distance: 5.5, labels: {}, showRadius: false,
          description: t("O ialah pusat dan OP berserenjang dengan perentas AB di P. Bandingkan AP dengan PB.",
            "O is the centre and OP is perpendicular to chord AB at P. Compare AP and PB."),
        });
      return circleVisualForSeed(bmQuestion);
    case 6:
      return solidVisualForSeed(bmQuestion);
    case 7: {
      const shape = coordinateShapeVisualForSeed(bmQuestion);
      if (shape) return shape;
      const midpoint = /^M ialah titik tengah segmen \d+ dengan hujung \((-?\d+),(-?\d+)\) dan \((-?\d+),(-?\d+)\)\. Cari M\.$/.exec(bmQuestion);
      if (midpoint) return midpointStimulus(
        [Number(midpoint[1]), Number(midpoint[2])],
        [Number(midpoint[3]), Number(midpoint[4])],
      );
      if (bmQuestion === "Sebuah robot bergerak dari (-3,4) ke (5,10), kemudian ke (11,2). Cari jumlah jarak.") return robot;
      if (bmQuestion === "Sebuah segi tiga bersudut tegak mempunyai bucu (-1,2), (7,2) dan (-1,8). Cari panjang hipotenus.") return rightTriangle;
      break;
    }
    case 8:
      if (bmQuestion === "Graf y=2x+1 dan y=2x−4 mempunyai hubungan apa?") return parallel;
      if (bmQuestion === "Sebuah graf melalui (0,6) dan (3,0). Apakah kecerunannya?") return slopeLine;
      break;
    case 9: {
      const legs = /^Laluan A \d+ ialah (\d+) km pada (\d+) km\/h, diikuti laluan B (\d+) km pada (\d+) km\/h\. Berapa minitkah keseluruhan perjalanan\?$/.exec(bmQuestion);
      if (legs) return twoLegJourney(
        Number(legs[1]), Number(legs[2]), Number(legs[3]), Number(legs[4]),
      );
      break;
    }
    case 10:
      if (bmQuestion === "Kecerunan graf jarak-masa mewakili apa?") return graph(true);
      if (bmQuestion === "Luas di bawah graf laju-masa mewakili apa?") return graph(false);
      return motionVisualForSeed(bmQuestion);
    case 11: {
      const m = /^Pantulkan titik P\d+\((-?\d+),(-?\d+)\) pada paksi-x\.$/.exec(bmQuestion);
      if (m) {
        const x = Number(m[1]), y = Number(m[2]);
        return plane(t("Pantulan pada paksi-x", "Reflection in the x-axis"),
          t("Titik asal ditanda, titik imej tidak ditunjukkan.",
            "The original point is marked; the image point is not plotted."),
          [-10, 10, -10, 10], [{ at: [x, y], name: "P" }]);
      }
      return transformationVisualForSeed(bmQuestion);
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
      const marbles = /^Sebuah beg \d+ mengandungi (\d+) guli merah dan (\d+) guli biru\. Cari kebarangkalian memilih guli bukan merah\.$/.exec(bmQuestion);
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
