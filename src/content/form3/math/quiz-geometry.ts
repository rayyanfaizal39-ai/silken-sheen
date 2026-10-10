import type {
  GeometryPanel,
  GeometryPoint,
  MathGeometryVisual,
} from "@/features/quiz/visuals/mathGeometryVisual";
import type {
  LocalizedText,
  VisualText,
} from "@/features/quiz/visuals/mathQuestionVisual";
export const t = (bm: string, dlp = bm): LocalizedText => ({ bm, dlp });
export const label = (
  x: number,
  y: number,
  text: VisualText,
): GeometryPanel["labels"][number] => ({ at: [x, y], text });
export const path = (
  points: GeometryPoint[],
  closed = false,
  dashed = false,
): NonNullable<GeometryPanel["paths"]>[number] => ({
  points,
  closed,
  dashed,
  fill: closed,
});
export const diagram = (
  title: LocalizedText,
  ...panels: GeometryPanel[]
): MathGeometryVisual => ({ kind: "geometry-diagram", title, panels });
export function rectangle(
  title: LocalizedText,
  width: string,
  height: string,
  extra: VisualText[] = [],
  aspect = 1.6,
): GeometryPanel {
  const w = Math.min(180, 140 * aspect),
    h = w / aspect,
    x = (300 - w) / 2,
    y = 95;
  return {
    title,
    description: t(
      "Segi empat tepat; sisi mengufuk dan menegak seperti dilabel.",
      "Rectangle; horizontal and vertical sides as labelled.",
    ),
    paths: [
      path(
        [
          [x, y],
          [x + w, y],
          [x + w, y + h],
          [x, y + h],
        ],
        true,
      ),
    ],
    labels: [
      label(150, y - 12, width),
      label(x - 22, y + h / 2, height),
      ...extra.map((s, i) => label(150, 25 + i * 20, s)),
    ],
  };
}
/** A at left, B at right angle, C above B; side values never include computed answers. */
export function triangle(
  title: LocalizedText,
  names: [string, string, string],
  ab: string,
  bc: string,
  ac: string,
  angle?: string,
  at: "A" | "C" = "A",
): GeometryPanel {
  const numeric = (value: string) => {
    const m = /^(√)?(\d+(?:\.\d+)?)/.exec(value);
    return m ? (m[1] ? Math.sqrt(Number(m[2])) : Number(m[2])) : undefined;
  };
  const base = numeric(ab),
    height = numeric(bc),
    degrees = angle?.endsWith("°") ? numeric(angle) : undefined;
  const ratio =
    base && height
      ? height / base
      : degrees
        ? at === "A"
          ? Math.tan((degrees * Math.PI) / 180)
          : 1 / Math.tan((degrees * Math.PI) / 180)
        : 145 / 185;
  const w = Math.min(185, 145 / ratio),
    h = w * ratio,
    left = 240 - w,
    top = 190 - h;
  const alpha = (Math.atan2(h, w) * 180) / Math.PI;
  const angleCentre: GeometryPoint = at === "A" ? [left, 190] : [240, top];
  const middle = ((at === "A" ? -alpha / 2 : 135 - alpha / 2) * Math.PI) / 180;
  return {
    title,
    description: t(
      `Segi tiga ${names.join("")} bersudut tegak di ${names[1]}${angle ? `; sudut ditanda di ${at === "A" ? names[0] : names[2]}` : ""}.`,
      `Triangle ${names.join("")} is right-angled at ${names[1]}${angle ? `; marked angle at ${at === "A" ? names[0] : names[2]}` : ""}.`,
    ),
    paths: [
      path(
        [
          [left, 190],
          [240, 190],
          [240, top],
        ],
        true,
      ),
      path([
        [225, 190],
        [225, 175],
        [240, 175],
      ]),
    ],
    arcs: angle
      ? [
          {
            centre: angleCentre,
            radius: 32,
            start: at === "A" ? -alpha : 90,
            end: at === "A" ? 0 : 180 - alpha,
          },
        ]
      : [],
    labels: [
      label(left - 14, 198, names[0]),
      label(250, 211, names[1]),
      label(250, top - 9, names[2]),
      label(240 - w / 2, 220, ab),
      label(269, 190 - h / 2, bc),
      label(240 - w / 2 - 18, 190 - h / 2 - 16, ac),
      ...(angle
        ? [
            label(
              angleCentre[0] + 48 * Math.cos(middle),
              angleCentre[1] + 48 * Math.sin(middle) + 4,
              angle,
            ),
          ]
        : []),
    ],
  };
}
export function segment(
  title: LocalizedText,
  distance: string,
  scale?: string,
): GeometryPanel {
  return {
    title,
    description: t(
      "Hai titik hujung dihubungkan oleh satu garis.",
      "Two endpoints joined by a line.",
    ),
    paths: [
      path([
        [45, 140],
        [255, 140],
      ]),
    ],
    circles: [
      { centre: [45, 140], radius: 3 },
      { centre: [255, 140], radius: 3 },
    ],
    labels: [
      label(150, 120, distance),
      ...(scale ? [label(150, 65, scale)] : []),
    ],
  };
}
export function grid(
  title: LocalizedText,
  square: VisualText,
  units = 3,
  step = 32,
): GeometryPanel {
  const x = (300 - units * step) / 2,
    y = 90;
  return {
    title,
    description: t(
      `Sisi bentuk meliputi ${units} petak pada grid segi empat sama.`,
      `A shape side spans ${units} squares on a square grid.`,
    ),
    grid: { origin: [x, y], columns: units, rows: units, step },
    paths: [
      path(
        [
          [x, y],
          [x + units * step, y],
          [x + units * step, y + units * step],
          [x, y + units * step],
        ],
        true,
      ),
    ],
    labels: [
      label(
        150,
        55,
        t(
          `Sisi petak = ${typeof square === "string" ? square : square.bm}`,
          `Square side = ${typeof square === "string" ? square : square.dlp}`,
        ),
      ),
      label(
        150,
        235,
        t(`${units} petak sepanjang sisi`, `${units} squares along a side`),
      ),
    ],
  };
}
