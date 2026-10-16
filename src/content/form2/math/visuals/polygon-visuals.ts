import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import type { GeometryPanel, GeometryPoint } from "@/features/quiz/visuals/mathGeometryVisual";

/**
 * Chapter 4 (Polygons) stimuli built from the TRUE interior angles, including the
 * value of each unknown, so no corner is drawn misleadingly. The angle labels show
 * only the question's givens and algebraic unknowns, never the solved value.
 */
const t = (bm: string, dlp: string) => ({ bm, dlp });
type P = GeometryPoint;
const r1 = (n: number) => Math.round(n * 10) / 10;
const rad = (deg: number) => (deg * Math.PI) / 180;

/**
 * Vertices of a convex polygon with the given interior angles (degrees, in drawing
 * order, clockwise on screen). The first n − 2 sides use `sides`; the last two are
 * solved so the outline closes. Result is scaled into the 300 × 240 panel.
 */
export function polygonFromAngles(interior: number[], sides: number[], startHeading = 0): P[] {
  const n = interior.length;
  const sum = interior.reduce((a, b) => a + b, 0);
  if (Math.abs(sum - (n - 2) * 180) > 1e-9) throw new Error(`Angles must total ${(n - 2) * 180}°`);
  // Side k runs from vertex k to k+1; turning at vertex k+1 adds its exterior angle.
  const headings = [startHeading];
  for (let k = 1; k < n; k++) headings.push(headings[k - 1] + (180 - interior[k]));
  const dir = (h: number): P => [Math.cos(rad(h)), Math.sin(rad(h))];
  let x = 0,
    y = 0;
  for (let k = 0; k < n - 2; k++) {
    const [dx, dy] = dir(headings[k]);
    x += sides[k] * dx;
    y += sides[k] * dy;
  }
  // Solve a·u + b·v = −(x, y) for the last two side lengths.
  const [ux, uy] = dir(headings[n - 2]);
  const [vx, vy] = dir(headings[n - 1]);
  const det = ux * vy - uy * vx;
  const a = (-x * vy + y * vx) / det;
  const b = (-y * ux + x * uy) / det;
  if (!(a > 0 && b > 0)) throw new Error("Chosen side lengths do not close the polygon");
  const lengths = [...sides.slice(0, n - 2), a, b];
  const raw: P[] = [[0, 0]];
  for (let k = 0; k < n - 1; k++) {
    const [dx, dy] = dir(headings[k]);
    const [px, py] = raw[k];
    raw.push([px + lengths[k] * dx, py + lengths[k] * dy]);
  }
  const xs = raw.map((p) => p[0]),
    ys = raw.map((p) => p[1]);
  const w = Math.max(...xs) - Math.min(...xs),
    h = Math.max(...ys) - Math.min(...ys);
  const s = Math.min(210 / w, 170 / h);
  const ox = 150 - (s * (Math.max(...xs) + Math.min(...xs))) / 2;
  const oy = 122 - (s * (Math.max(...ys) + Math.min(...ys))) / 2;
  return raw.map(([px, py]) => [r1(ox + s * px), r1(oy + s * py)]);
}

/** Interior angle (degrees) at each vertex of a drawn polygon — used by tests. */
export function drawnInteriorAngles(points: P[]): number[] {
  return points.map((p, i) => {
    const a = points[(i + points.length - 1) % points.length];
    const b = points[(i + 1) % points.length];
    const u = [a[0] - p[0], a[1] - p[1]],
      v = [b[0] - p[0], b[1] - p[1]];
    return (
      (Math.acos((u[0] * v[0] + u[1] * v[1]) / Math.hypot(u[0], u[1]) / Math.hypot(v[0], v[1])) *
        180) /
      Math.PI
    );
  });
}

/** Label each corner inside the polygon, pulled toward the centroid. */
function cornerLabels(points: P[], texts: string[], inset = 30): GeometryPanel["labels"] {
  const cx = points.reduce((s, p) => s + p[0], 0) / points.length;
  const cy = points.reduce((s, p) => s + p[1], 0) / points.length;
  return points.map((p, i) => {
    const d = Math.hypot(cx - p[0], cy - p[1]);
    return {
      at: [r1(p[0] + ((cx - p[0]) / d) * inset), r1(p[1] + ((cy - p[1]) / d) * inset + 5)] as P,
      text: texts[i],
    };
  });
}

function anglePolygon(
  title: ReturnType<typeof t>,
  description: ReturnType<typeof t>,
  trueAngles: number[],
  sides: number[],
  texts: string[],
  startHeading = 0,
  names: string[] = [],
): MathQuestionVisual {
  const points = polygonFromAngles(trueAngles, sides, startHeading);
  const cx = points.reduce((s, p) => s + p[0], 0) / points.length;
  const cy = points.reduce((s, p) => s + p[1], 0) / points.length;
  const outside = names.map((name, i) => {
    const [px, py] = points[i];
    const d = Math.hypot(px - cx, py - cy);
    return {
      at: [r1(px + ((px - cx) / d) * 14), r1(py + ((py - cy) / d) * 14 + 5)] as P,
      text: name,
    };
  });
  return {
    kind: "geometry-diagram",
    title,
    panels: [
      {
        title: t("Rajah maklumat diberi", "Diagram of given information"),
        description,
        paths: [{ points, closed: true, fill: true }],
        labels: [...cornerLabels(points, texts), ...outside],
      },
    ],
  };
}

/**
 * Pentagon ABCDE with exterior angles marked at A–D: each side is extended (dashed)
 * past its vertex and the exterior angle sits between the extension and the next side.
 */
function exteriorPentagon(): MathQuestionVisual {
  const exterior = [50, 60, 70, 80, 100]; // A–E; the value at E is what students derive
  const interior = exterior.map((e) => 180 - e);
  const points = polygonFromAngles(interior, [1, 1, 1], -100);
  const names = ["A", "B", "C", "D", "E"];
  const n = points.length;
  const paths: NonNullable<GeometryPanel["paths"]> = [{ points, closed: true, fill: true }];
  const labels: GeometryPanel["labels"] = [];
  const cx = points.reduce((s, p) => s + p[0], 0) / n,
    cy = points.reduce((s, p) => s + p[1], 0) / n;
  points.forEach((p, i) => {
    const d = Math.hypot(p[0] - cx, p[1] - cy);
    labels.push({
      at: [r1(p[0] + ((p[0] - cx) / d) * 14), r1(p[1] + ((p[1] - cy) / d) * 14 + 5)],
      text: names[i],
    });
    if (i === 4) {
      labels.push(...cornerLabels(points, ["", "", "", "", "?"]).filter((l) => l.text));
      return;
    }
    // Extend the incoming side (from the previous vertex) beyond this vertex.
    const prev = points[(i + n - 1) % n];
    const len = Math.hypot(p[0] - prev[0], p[1] - prev[1]);
    const ux = (p[0] - prev[0]) / len,
      uy = (p[1] - prev[1]) / len;
    const ext: P = [r1(p[0] + ux * 34), r1(p[1] + uy * 34)];
    paths.push({ points: [p, ext], dashed: true });
    const next = points[(i + 1) % n];
    const nl = Math.hypot(next[0] - p[0], next[1] - p[1]);
    const bx = ux + (next[0] - p[0]) / nl,
      by = uy + (next[1] - p[1]) / nl;
    const bl = Math.hypot(bx, by);
    labels.push({
      at: [r1(p[0] + (bx / bl) * 26), r1(p[1] + (by / bl) * 26 + 5)],
      text: `${exterior[i]}°`,
    });
  });
  return {
    kind: "geometry-diagram",
    title: t("Sudut peluaran pentagon", "Exterior angles of a pentagon"),
    panels: [
      {
        title: t("Pentagon ABCDE", "Pentagon ABCDE"),
        description: t(
          "Empat sudut peluaran ditanda pada sisi yang dipanjangkan; sudut pedalaman di E ditanda ?.",
          "Four exterior angles are marked on the extended sides; the interior angle at E is marked ?.",
        ),
        paths,
        labels,
      },
    ],
  };
}

const notToScale = t(
  "Sudut yang diberi ditanda; sudut yang dicari ditanda dengan pemboleh ubah.",
  "Given angles are marked; the unknown is marked with a variable.",
);

/** Called with the BM stem of a Chapter 4 seed. */
export function polygonVisualForSeed(bm: string): MathQuestionVisual | undefined {
  switch (bm) {
    case "Tiga sudut sebuah segi empat ialah 80°, 95° dan 105°. Cari sudut keempat.":
      return anglePolygon(
        t("Sudut segi empat", "Quadrilateral angles"),
        t(
          "Hanya tiga sudut diberi; sudut keempat ialah x°.",
          "Only three angles are given; the fourth is x°.",
        ),
        [80, 95, 105, 80],
        [1, 1],
        ["80°", "95°", "105°", "x°"],
      );
    case "Sudut sebuah pentagon ialah 100°, 110°, 120°, 90° dan x°. Cari x.":
      return anglePolygon(
        t("Sudut pentagon", "Pentagon angles"),
        t("Empat sudut diketahui dan satu ialah x°.", "Four angles are known and one is x°."),
        [100, 110, 120, 90, 120],
        [1, 1, 1],
        ["100°", "110°", "120°", "90°", "x°"],
        36,
      );
    case "Sudut sebuah heksagon ialah 110°, 125°, 130°, 115°, x° dan x°. Cari x.":
      return anglePolygon(
        t("Sudut heksagon", "Hexagon angles"),
        notToScale,
        [110, 125, 130, 115, 120, 120],
        [1, 1, 1, 1],
        ["110°", "125°", "130°", "115°", "x°", "x°"],
        30,
      );
    case "Sudut sebuah segi empat ialah x°, (x + 10)°, (x + 20)° dan (x + 30)°. Cari x.":
      return anglePolygon(
        t("Sudut segi empat beralgebra", "Algebraic quadrilateral angles"),
        notToScale,
        [75, 85, 95, 105],
        [1, 1],
        ["x°", "(x + 10)°", "(x + 20)°", "(x + 30)°"],
      );
    case "Sudut sebuah pentagon ialah x°, (x + 10)°, (2x − 20)°, 110° dan 120°. Cari sudut terbesar.":
      return anglePolygon(
        t("Sudut pentagon beralgebra", "Algebraic pentagon angles"),
        notToScale,
        [80, 90, 140, 110, 120],
        [0.9, 0.7, 0.5],
        ["x°", "(x + 10)°", "(2x − 20)°", "110°", "120°"],
        0,
      );
    case "Poligon ABCD mempunyai sudut A = 2x°, B = (x + 20)°, C = 100° dan D = 90°. Cari sudut A.":
      return anglePolygon(
        t("Sudut sisi empat ABCD", "Angles of quadrilateral ABCD"),
        notToScale,
        [100, 70, 100, 90],
        [1.2, 1],
        ["2x°", "(x + 20)°", "100°", "90°"],
        0,
        ["A", "B", "C", "D"],
      );
    case "ABCDE ialah pentagon. Sudut luar di A, B, C dan D masing-masing 50°, 60°, 70° dan 80°. Cari sudut pedalaman di E.":
      return exteriorPentagon();
  }
  return undefined;
}
