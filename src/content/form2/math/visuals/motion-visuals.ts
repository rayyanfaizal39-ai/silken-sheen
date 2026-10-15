import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import type {
  MathMotionGraphVisual,
  MotionPoint,
} from "@/features/quiz/visuals/mathMotionGraphVisual";

/**
 * Chapter 10 (Gradient) graphs drawn from the exact values in each question.
 * Axes start at 0 on a linear scale; only the stated readings are tick-labelled.
 * Gradients, areas and distances asked for are never written on the graph.
 */
const t = (bm: string, dlp: string) => ({ bm, dlp });
const num = String.raw`(-?\d+(?:\.\d+)?)`;
const n = (value: string) => Number(value);

const distanceAxes = {
  title: t("Graf jarak-masa", "Distance-time graph"),
  xLabel: t("Masa (jam)", "Time (h)"),
  yLabel: t("Jarak (km)", "Distance (km)"),
};
const speedAxes = {
  title: t("Graf laju-masa", "Speed-time graph"),
  xLabel: t("Masa (s)", "Time (s)"),
  yLabel: t("Laju (m/s)", "Speed (m/s)"),
};

function graph(
  axes: typeof distanceAxes,
  description: ReturnType<typeof t>,
  segments: MotionPoint[][],
  shade?: MotionPoint[],
): MathMotionGraphVisual {
  const points = segments.flat();
  const ts = points.map(([time]) => time);
  const vs = points.map(([, value]) => value);
  return {
    kind: "motion-graph",
    ...axes,
    description,
    xMax: Math.max(...ts) * 1.15,
    yMax: Math.max(...vs) * 1.2,
    xTicks: [...new Set(ts.filter((value) => value !== 0))],
    yTicks: [...new Set(vs.filter((value) => value !== 0))],
    segments,
    ...(shade ? { shade } : {}),
  };
}

const under = (segment: MotionPoint[]): MotionPoint[] => [
  [segment[0][0], 0],
  ...segment,
  [segment[segment.length - 1][0], 0],
];

/** Called with the BM stem of a Chapter 10 seed. */
export function motionVisualForSeed(bm: string): MathQuestionVisual | undefined {
  let m: RegExpExecArray | null;

  m = new RegExp(
    `^Pada graf jarak-masa \\d+, jarak meningkat secara lurus daripada 0 kepada ${num} km dalam ${num} jam\\. Cari kecerunan\\.$`,
  ).exec(bm);
  if (m)
    return graph(
      distanceAxes,
      t(
        "Jarak bertambah secara seragam; kecerunan tidak ditulis.",
        "Distance increases uniformly; the gradient is not written.",
      ),
      [
        [
          [0, 0],
          [n(m[2]), n(m[1])],
        ],
      ],
    );

  m = new RegExp(
    `^Graf laju-masa \\d+ berubah secara lurus daripada ${num} m/s kepada ${num} m/s dalam ${num} s\\. Cari kecerunan\\.$`,
  ).exec(bm);
  if (m)
    return graph(
      speedAxes,
      t(
        "Laju berubah secara seragam; kecerunan tidak ditulis.",
        "Speed changes uniformly; the gradient is not written.",
      ),
      [
        [
          [0, n(m[1])],
          [n(m[3]), n(m[2])],
        ],
      ],
    );

  m = new RegExp(
    `^Graf jarak-masa \\d+ melalui \\(${num} jam, ${num} km\\) dan \\(${num} jam, ${num} km\\)\\. Cari laju pada segmen itu\\.$`,
  ).exec(bm);
  if (m)
    return graph(
      distanceAxes,
      t(
        "Hanya segmen di antara dua titik yang diberi dilukis.",
        "Only the segment between the two given points is drawn.",
      ),
      [
        [
          [n(m[1]), n(m[2])],
          [n(m[3]), n(m[4])],
        ],
      ],
    );

  m = new RegExp(
    `^Pada graf laju-masa \\d+, laju berubah sekata daripada ${num} m/s kepada ${num} m/s dalam ${num} s\\. Cari jarak\\.$`,
  ).exec(bm);
  if (m) {
    const segment: MotionPoint[] = [
      [0, n(m[1])],
      [n(m[3]), n(m[2])],
    ];
    return graph(
      speedAxes,
      t(
        "Kawasan berlorek ialah rantau di bawah graf; luasnya tidak ditulis.",
        "The shaded region lies under the graph; its area is not written.",
      ),
      [segment],
      under(segment),
    );
  }

  m = new RegExp(
    `^Graf laju-masa \\d+: laju berubah sekata daripada ${num} kepada ${num} m/s dalam ${num} s, kemudian kekal ${num} m/s selama ${num} s\\. Cari jumlah jarak\\.$`,
  ).exec(bm);
  if (m && n(m[4]) === n(m[2])) {
    const t1 = n(m[3]),
      t2 = t1 + n(m[5]);
    const segment: MotionPoint[] = [
      [0, n(m[1])],
      [t1, n(m[2])],
      [t2, n(m[4])],
    ];
    return graph(
      speedAxes,
      t(
        "Laju meningkat secara seragam kemudian kekal malar; jumlah luas tidak ditulis.",
        "Speed increases uniformly then stays constant; the total area is not written.",
      ),
      [segment],
      under(segment),
    );
  }

  m = new RegExp(
    `^Graf laju-masa \\d+ berubah daripada ${num} kepada ${num} m/s dalam ${num} s, kemudian daripada \\2 kepada 0 dalam ${num} s\\. Cari jarak keseluruhan\\.$`,
  ).exec(bm);
  if (m) {
    const t1 = n(m[3]),
      t2 = t1 + n(m[4]);
    const segment: MotionPoint[] = [
      [0, n(m[1])],
      [t1, n(m[2])],
      [t2, 0],
    ];
    return graph(
      speedAxes,
      t(
        "Dua bahagian graf; luas di bawahnya tidak ditulis.",
        "Two sections of the graph; the area beneath is not written.",
      ),
      [segment],
      under(segment),
    );
  }

  return undefined;
}
