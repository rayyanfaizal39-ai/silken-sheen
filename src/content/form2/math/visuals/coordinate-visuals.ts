import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import type {
  Coordinate,
  MathCoordinateVisual,
} from "@/features/quiz/visuals/mathCoordinateVisual";

/**
 * Chapter 7 (coordinate figures) and Chapter 11 (isometric transformations).
 * Only the object, the given centre or mirror line, and any image the question
 * already states are plotted. A transformed point that is the answer is never
 * drawn, and transformation grids use one fixed window so it gives no hint.
 */
const t = (bm: string, dlp: string) => ({ bm, dlp });
const int = String.raw`(-?\d+)`;
const pair = String.raw`\(${int},${int}\)`;
const xy = (m: RegExpExecArray, i: number): Coordinate => [Number(m[i]), Number(m[i + 1])];
const minus = (n: number) => String(n).replace("-", "−");

/** The ±10 window holds every object, image and mirror line in the Chapter 11 bank. */
const TRANSFORM_WINDOW: MathCoordinateVisual["domain"] = [-10, 10, -10, 10];

/**
 * Name placement pointing away from the origin. Axis tick numbers sit beside
 * the axes, so an outward label never lands on them (the renderer's default,
 * up-and-right, collides with the y-axis numbers for points just left of it).
 */
export const outward = ([x, y]: Coordinate): Coordinate => [x < 0 ? -8 : 8, y < 0 ? 16 : -8];

function plane(
  title: ReturnType<typeof t>,
  description: ReturnType<typeof t>,
  points: MathCoordinateVisual["points"],
  extra: Partial<Pick<MathCoordinateVisual, "lines" | "paths">> = {},
  domain = TRANSFORM_WINDOW,
): MathCoordinateVisual {
  const placed = points?.map((p) => ({ ...p, offset: p.offset ?? outward(p.at) }));
  return {
    kind: "coordinate-plane",
    title,
    description,
    domain,
    step: 2,
    points: placed,
    ...extra,
  };
}

const originMark = { at: [0, 0] as Coordinate, name: "O", offset: [5, 14] as Coordinate };
const objectOnly = t(
  "Titik objek ditanda; titik imej tidak ditunjukkan.",
  "The object point is marked; the image is not plotted.",
);

/** Called with the BM stem of a Chapter 11 seed. */
export function transformationVisualForSeed(bm: string): MathQuestionVisual | undefined {
  let m: RegExpExecArray | null;

  if (
    (m = new RegExp(`^Titik A\\d+${pair} ditranslasi oleh vektor ${pair}\\. Cari imejnya\\.$`).exec(
      bm,
    ))
  )
    return plane(t("Translasi titik", "Translating a point"), objectOnly, [
      { at: xy(m, 1), name: "A" },
    ]);

  if (
    (m = new RegExp(
      `^Titik G\\d+${pair} dipetakan kepada G′${pair} oleh translasi\\. Cari vektornya\\.$`,
    ).exec(bm))
  )
    return plane(
      t("Objek dan imej translasi", "Object and translated image"),
      t(
        "G dan imejnya G′ ditanda; vektor translasi tidak dilukis.",
        "G and its image G′ are marked; the translation vector is not drawn.",
      ),
      [
        { at: xy(m, 1), name: "G" },
        { at: xy(m, 3), name: "G′" },
      ],
    );

  if ((m = new RegExp(`^Putarkan titik B\\d+${pair} sebanyak 180° pada asalan\\.$`).exec(bm)))
    return plane(t("Putaran 180° pada asalan", "180° rotation about the origin"), objectOnly, [
      { at: xy(m, 1), name: "B" },
      originMark,
    ]);

  if ((m = new RegExp(`^Pantulkan C\\d+${pair} pada garis x=${int}\\.$`).exec(bm))) {
    const k = Number(m[3]);
    return plane(
      t("Pantulan pada garis menegak", "Reflection in a vertical line"),
      t(
        "Titik objek dan garis cermin ditanda; imej tidak ditunjukkan.",
        "The object and mirror line are marked; the image is not plotted.",
      ),
      [{ at: xy(m, 1), name: "C" }],
      { lines: [{ a: 1, b: 0, c: k, dashed: true, label: `x = ${minus(k)}` }] },
    );
  }

  if ((m = new RegExp(`^Pantulkan D\\d+${pair} pada garis y=${int}\\.$`).exec(bm))) {
    const k = Number(m[3]);
    return plane(
      t("Pantulan pada garis mengufuk", "Reflection in a horizontal line"),
      t(
        "Titik objek dan garis cermin ditanda; imej tidak ditunjukkan.",
        "The object and mirror line are marked; the image is not plotted.",
      ),
      [{ at: xy(m, 1), name: "D" }],
      { lines: [{ a: 0, b: 1, c: k, dashed: true, label: `y = ${minus(k)}` }] },
    );
  }

  if ((m = new RegExp(`^Putarkan E\\d+${pair} 90° lawan arah jam pada asalan\\.$`).exec(bm)))
    return plane(
      t("Putaran 90° lawan arah jam pada asalan", "90° anticlockwise rotation about the origin"),
      objectOnly,
      [{ at: xy(m, 1), name: "E" }, originMark],
    );

  if ((m = new RegExp(`^Putarkan F\\d+${pair} 90° ikut arah jam pada asalan\\.$`).exec(bm)))
    return plane(
      t("Putaran 90° ikut arah jam pada asalan", "90° clockwise rotation about the origin"),
      objectOnly,
      [{ at: xy(m, 1), name: "F" }, originMark],
    );

  if (
    (m = new RegExp(
      `^Titik H\\d+${pair} dipetakan kepada H′${pair}\\. Jika transformasinya translasi, cari imej titik J${pair}\\.$`,
    ).exec(bm))
  )
    return plane(
      t("Translasi H ke H′", "Translation from H to H′"),
      t(
        "H, H′ dan J ditanda; imej J tidak ditunjukkan.",
        "H, H′ and J are marked; the image of J is not plotted.",
      ),
      [
        { at: xy(m, 1), name: "H" },
        { at: xy(m, 3), name: "H′" },
        { at: xy(m, 5), name: "J" },
      ],
    );

  if (
    (m = new RegExp(`^P${pair} dipantulkan kepada P′${pair}\\. Apakah garis cermin\\?$`).exec(bm))
  )
    return plane(
      t("Objek dan imej pantulan", "Object and reflected image"),
      t(
        "P dan imejnya P′ ditanda; garis cermin tidak dilukis.",
        "P and its image P′ are marked; the mirror line is not drawn.",
      ),
      [
        { at: xy(m, 1), name: "P" },
        { at: xy(m, 3), name: "P′" },
      ],
    );

  if (
    (m = new RegExp(
      `^Titik K\\d+${pair} dipetakan kepada ${pair} oleh putaran berpusat di asalan\\. Nyatakan putaran\\.$`,
    ).exec(bm))
  )
    return plane(
      t("Objek dan imej putaran", "Object and rotated image"),
      t(
        "K, imejnya K′ dan pusat O ditanda; sudut dan arah tidak ditunjukkan.",
        "K, its image K′ and the centre O are marked; the angle and direction are not shown.",
      ),
      [{ at: xy(m, 1), name: "K" }, { at: xy(m, 3), name: "K′" }, originMark],
    );

  if (
    (m = new RegExp(
      `^Titik L\\d+${pair} ditranslasi oleh ${pair}, kemudian dipantulkan pada paksi-x\\. Cari imej akhir\\.$`,
    ).exec(bm))
  )
    return plane(t("Translasi kemudian pantulan", "Translation then reflection"), objectOnly, [
      { at: xy(m, 1), name: "L" },
    ]);

  if (
    (m = new RegExp(
      `^Titik M\\d+${pair} diputar 90° ikut arah jam, kemudian ditranslasi oleh \\(3,−2\\)\\. Cari imej akhir\\.$`,
    ).exec(bm))
  )
    return plane(t("Putaran kemudian translasi", "Rotation then translation"), objectOnly, [
      { at: xy(m, 1), name: "M" },
      originMark,
    ]);

  return undefined;
}

/** A window around the given vertices with a 2-unit margin, rounded out to even numbers. */
function windowAround(vertices: Coordinate[]): MathCoordinateVisual["domain"] {
  const xs = vertices.map((p) => p[0]),
    ys = vertices.map((p) => p[1]);
  // When every vertex is non-negative, stop just below 0 so no lone −2 ticks crowd the origin.
  const lo = (v: number) => (v >= 0 ? -1 : Math.floor((v - 2) / 2) * 2);
  const hi = (v: number) => Math.ceil((Math.max(0, v) + 2) / 2) * 2;
  return [lo(Math.min(...xs)), hi(Math.max(...xs)), lo(Math.min(...ys)), hi(Math.max(...ys))];
}

/** Called with the BM stem of a Chapter 7 seed. */
export function coordinateShapeVisualForSeed(bm: string): MathQuestionVisual | undefined {
  let m: RegExpExecArray | null;

  if (
    (m = new RegExp(
      `^Segi tiga koordinat \\d+ mempunyai A${pair}, B${pair}, C${pair}\\. Cari perimeter\\.$`,
    ).exec(bm))
  ) {
    const v: Coordinate[] = [xy(m, 1), xy(m, 3), xy(m, 5)];
    return plane(
      t("Segi tiga pada satah", "Triangle on the plane"),
      t(
        "Bucu diplot; panjang sisi tidak dilabel.",
        "The vertices are plotted; side lengths are not labelled.",
      ),
      v.map((at, i) => ({ at, name: "ABC"[i] })),
      { paths: [{ points: v, closed: true }] },
      windowAround(v),
    );
  }

  if (
    (m = new RegExp(
      `^Sisi empat \\d+ mempunyai bucu berturutan ${pair}, ${pair}, ${pair} dan ${pair}\\. Cari luasnya\\.$`,
    ).exec(bm))
  ) {
    const v: Coordinate[] = [xy(m, 1), xy(m, 3), xy(m, 5), xy(m, 7)];
    return plane(
      t("Sisi empat pada satah", "Quadrilateral on the plane"),
      t(
        "Bucu diplot mengikut tertib; luas tidak dilabel.",
        "The vertices are plotted in order; the area is not labelled.",
      ),
      v.map((at, i) => ({ at, name: "PQRS"[i] })),
      { paths: [{ points: v, closed: true }] },
      windowAround(v),
    );
  }

  return undefined;
}

/** Chapter 10: a line segment through the two given points; its gradient is not written. */
export function gradientLineVisualForSeed(bm: string): MathQuestionVisual | undefined {
  const m = new RegExp(`^Garis \\d+ melalui ${pair} dan ${pair}\\. Cari kecerunan\\.$`).exec(bm);
  if (!m) return undefined;
  const v: Coordinate[] = [xy(m, 1), xy(m, 3)];
  return plane(
    t("Dua titik pada garis lurus", "Two points on a straight line"),
    t(
      "Kedua-dua titik diplot; kecerunan tidak dilabel.",
      "Both points are plotted; the gradient is not labelled.",
    ),
    [
      { at: v[0], name: "A" },
      { at: v[1], name: "B" },
    ],
    { paths: [{ points: v }] },
    windowAround(v),
  );
}
