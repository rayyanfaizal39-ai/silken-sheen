import type {
  GeometryPanel,
  GeometryPoint,
  MathGeometryVisual,
} from "@/features/quiz/visuals/mathGeometryVisual";
import { textFor, type LocalizedText, type VisualText } from "@/features/quiz/visuals/mathQuestionVisual";

/**
 * Compact textbook diagrams for the Chapter 6 flashcard bank, indexed like
 * MATH_F2_C6_BANK. Solids are true-proportion cabinet (oblique) drawings:
 * the front face keeps its real shape, depth recedes up and to the right at
 * half scale, and hidden edges are dashed. Nets are unit-square grids, so
 * every square is congruent. Labels show only givens or "?", never answers.
 */

type Panel = GeometryPanel;
type Label = Panel["labels"][number];
type Path = NonNullable<Panel["paths"]>[number];
export type V3 = [number, number, number];
export type NetCell = [column: number, row: number];

const W = 180;
const DRAW_W = 116;
const DRAW_H = 100;
const TOP = 12;
const round = (n: number) => Math.round(n * 100) / 100;
const text = (dlp: string, bm: string): LocalizedText => ({ dlp, bm });
const label = (x: number, y: number, value: VisualText, anchor?: Label["anchor"]): Label =>
  anchor ? { at: [round(x), round(y)], text: value, anchor } : { at: [round(x), round(y)], text: value };

// ── Cabinet projection ──────────────────────────────────────────────────────

const DEPTH = 0.5;
const C = Math.SQRT1_2;
/** Direction towards the viewer: right, up and in front of the solid. */
const VIEW: V3 = [DEPTH * C, DEPTH * C, 1];
const flat = ([x, y, z]: V3): GeometryPoint => [x - z * DEPTH * C, -y + z * DEPTH * C];

const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const mean = (points: V3[]): V3 =>
  points.reduce<V3>((s, p) => [s[0] + p[0] / points.length, s[1] + p[1] / points.length, s[2] + p[2] / points.length], [0, 0, 0]);

export interface Solid {
  vertices: V3[];
  faces: number[][];
}

/** Faces whose outward normal points towards the viewer are visible. */
export function visibleFaces(solid: Solid): boolean[] {
  const centre = mean(solid.vertices);
  return solid.faces.map(face => {
    const [a, b, c] = face.map(i => solid.vertices[i]);
    let normal = cross(sub(b, a), sub(c, a));
    if (dot(normal, sub(mean(face.map(i => solid.vertices[i])), centre)) < 0) normal = [-normal[0], -normal[1], -normal[2]];
    return dot(normal, VIEW) > 1e-9;
  });
}

/** Maps solid coordinates onto the canvas, scaled to fit and centred. */
function fitter(points: GeometryPoint[], maxW = DRAW_W, maxH = DRAW_H) {
  const xs = points.map(p => p[0]), ys = points.map(p => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const scale = Math.min(maxW / (x1 - x0 || 1), maxH / (y1 - y0 || 1));
  const left = (W - (x1 - x0) * scale) / 2;
  const at = ([x, y]: GeometryPoint): GeometryPoint => [round(left + (x - x0) * scale), round(TOP + (y - y0) * scale)];
  return { at, bottom: TOP + (y1 - y0) * scale };
}

interface Drawn {
  paths: Path[];
  dots?: GeometryPoint[];
  labels: Label[];
  bottom: number;
}

/**
 * Draws a convex solid: hidden edges dashed, visible faces as closed outlines.
 * `mark` adds labels/highlights using the same canvas mapping.
 */
function drawSolid(
  solid: Solid,
  mark: (at: (p: V3) => GeometryPoint) => { paths?: Path[]; dots?: GeometryPoint[]; labels?: Label[] } = () => ({}),
  shadeFace?: number,
): Drawn {
  const fit = fitter(solid.vertices.map(flat));
  const at = (p: V3) => fit.at(flat(p));
  const seen = visibleFaces(solid);
  const edges = new Map<string, { a: number; b: number; visible: boolean }>();
  solid.faces.forEach((face, f) =>
    face.forEach((a, i) => {
      const b = face[(i + 1) % face.length];
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      const edge = edges.get(key) ?? { a, b, visible: false };
      edge.visible ||= seen[f];
      edges.set(key, edge);
    }),
  );
  const hidden: Path[] = [...edges.values()]
    .filter(e => !e.visible)
    .map(e => ({ points: [at(solid.vertices[e.a]), at(solid.vertices[e.b])], dashed: true }));
  const faces: Path[] = solid.faces.flatMap((face, f) =>
    seen[f] ? [{ points: face.map(i => at(solid.vertices[i])), closed: true, ...(f === shadeFace ? { shade: true } : {}) }] : [],
  );
  const extra = mark(at);
  return {
    paths: [...hidden, ...faces, ...(extra.paths ?? [])],
    ...(extra.dots ? { dots: extra.dots } : {}),
    labels: extra.labels ?? [],
    bottom: fit.bottom,
  };
}

/** A prism whose cross-section (x, y) is the front face, `depth` deep. */
export function prism(section: Array<[number, number]>, depth: number): Solid {
  const n = section.length;
  return {
    vertices: [...section.map(([x, y]): V3 => [x, y, 0]), ...section.map(([x, y]): V3 => [x, y, -depth])],
    faces: [
      section.map((_, i) => i),
      section.map((_, i) => n + i),
      ...section.map((_, i) => [i, (i + 1) % n, n + ((i + 1) % n), n + i]),
    ],
  };
}

/** A pyramid on a horizontal base polygon (x, z), apex above the base centre. */
export function pyramid(base: Array<[number, number]>, height: number): Solid {
  const n = base.length;
  const cx = base.reduce((s, p) => s + p[0] / n, 0), cz = base.reduce((s, p) => s + p[1] / n, 0);
  return {
    vertices: [...base.map(([x, z]): V3 => [x, 0, z]), [cx, height, cz]],
    faces: [base.map((_, i) => i), ...base.map((_, i) => [i, (i + 1) % n, n])],
  };
}

/** Regular n-gon of circumradius 1 standing on a flat bottom edge. */
export function regularSection(n: number): Array<[number, number]> {
  return Array.from({ length: n }, (_, k) => {
    const a = -Math.PI / 2 + Math.PI / n + (2 * Math.PI * k) / n;
    return [Math.cos(a), Math.sin(a)];
  });
}

const box = (l: number, w: number, h: number) => prism([[0, 0], [l, 0], [l, h], [0, h]], w);

// ── Figures ─────────────────────────────────────────────────────────────────

function figure(
  title: LocalizedText,
  description: LocalizedText,
  drawn: Drawn,
  caption: LocalizedText = text("", ""),
): MathGeometryVisual {
  const lowest = Math.max(drawn.bottom, ...drawn.labels.map(l => l.at[1]));
  // Only measured diagrams need the "not to scale" reminder.
  const measured = drawn.labels.some(l => /\d/.test(textFor(l.text, "dlp")));
  return {
    kind: "geometry-diagram",
    layout: "compact",
    ...(measured ? {} : { notToScale: false }),
    title,
    panels: [{
      title: caption,
      description,
      paths: drawn.paths,
      ...(drawn.dots ? { dots: drawn.dots } : {}),
      labels: drawn.labels,
      viewBox: [W, Math.ceil(lowest + 10)],
    }],
  };
}

const SOLID_NAMES = {
  cube: text("Cube", "Kubus"),
  cuboid: text("Cuboid", "Kuboid"),
  prism: text("Prism", "Prisma"),
  pyramid: text("Pyramid", "Piramid"),
  cylinder: text("Cylinder", "Silinder"),
  cone: text("Cone", "Kon"),
};
const HIDDEN = text("Hidden edges are dashed.", "Tepi tersembunyi digaris putus.");
const describe = (dlp: string, bm: string) => text(`${dlp} ${HIDDEN.dlp}`, `${bm} ${HIDDEN.bm}`);

/** Cube with an optional label under the front bottom edge. */
function cube(side?: VisualText, mark?: "edge" | "vertex"): MathGeometryVisual {
  const drawn = drawSolid(box(1, 1, 1), at => {
    const [a, b] = [at([0, 0, 0]), at([1, 0, 0])];
    const below = (value: VisualText) => label((a[0] + b[0]) / 2, a[1] + 16, value);
    if (mark === "edge") return { paths: [{ points: [a, b], tone: "accent" }], labels: [below("?")] };
    if (mark === "vertex") return { dots: [b], labels: [label(b[0] + 5, b[1] + 14, "?", "start")] };
    return { labels: side ? [below(side)] : [] };
  });
  const given = typeof side === "string" ? side : null;
  return figure(
    SOLID_NAMES.cube,
    mark === "edge"
      ? describe("A cube with one edge highlighted and marked ?.", "Kubus dengan satu tepi diserlahkan dan ditanda ?.")
      : mark === "vertex"
        ? describe("A cube with one corner point marked ?.", "Kubus dengan satu titik penjuru ditanda ?.")
        : describe(given ? `A cube of side ${given}.` : side ? "A cube of side s." : "A cube.", given ? `Kubus bersisi ${given}.` : side ? "Kubus bersisi s." : "Kubus."),
    drawn,
  );
}

/**
 * Cuboid drawn to its true proportions: length across the front, height up
 * the front, width receding. Labels sit beside the matching edges.
 */
function cuboid(l: number, w: number, h: number, labels?: { l: VisualText; w: VisualText; h: VisualText }): MathGeometryVisual {
  const drawn = drawSolid(box(l, w, h), at => {
    if (!labels) return {};
    const [o, x, y, z] = [at([0, 0, 0]), at([l, 0, 0]), at([0, h, 0]), at([l, 0, -w])];
    return {
      labels: [
        label((o[0] + x[0]) / 2, o[1] + 16, labels.l),
        label(o[0] - 6, (o[1] + y[1]) / 2 + 4, labels.h, "end"),
        label((x[0] + z[0]) / 2 + 7, (x[1] + z[1]) / 2 + 9, labels.w, "start"),
      ],
    };
  });
  const dims = labels && [labels.l, labels.w, labels.h].every(v => typeof v === "string") ? (labels as Record<string, string>) : null;
  return figure(
    SOLID_NAMES.cuboid,
    dims
      ? describe(`A cuboid ${dims.l} long, ${dims.w} wide and ${dims.h} high.`, `Kuboid panjang ${dims.l}, lebar ${dims.w} dan tinggi ${dims.h}.`)
      : labels
        ? describe("A cuboid with length, width and height marked.", "Kuboid dengan panjang, lebar dan tinggi ditanda.")
        : describe("A cuboid.", "Kuboid."),
    drawn,
  );
}

/** Right prism with a regular n-sided cross-section as its front face. */
function regularPrism(n: number): MathGeometryVisual {
  const name = { 3: ["triangular", "segi tiga"], 4: ["square", "segi empat sama"], 5: ["pentagonal", "pentagon"], 6: ["hexagonal", "heksagon"], 7: ["heptagonal", "heptagon"] }[n]!;
  return figure(
    SOLID_NAMES.prism,
    describe(`A ${name[0]} prism: its ${n}-sided cross-section faces the front.`, `Prisma ${name[1]}: keratan rentas ${n} sisi menghadap ke hadapan.`),
    drawSolid(prism(regularSection(n), 3.2), () => ({})),
  );
}

/** Prism with a trapezium (quadrilateral) cross-section. */
function trapeziumPrism(): MathGeometryVisual {
  return figure(
    SOLID_NAMES.prism,
    describe("A prism whose cross-section is a quadrilateral (trapezium).", "Prisma dengan keratan rentas sisi empat (trapezium)."),
    drawSolid(prism([[0, 0], [2.4, 0], [1.8, 1.3], [0.5, 1.3]], 2.2), () => ({})),
  );
}

function squarePyramid(): MathGeometryVisual {
  return figure(
    SOLID_NAMES.pyramid,
    describe("A pyramid with a square base.", "Piramid bertapak segi empat sama."),
    drawSolid(pyramid([[0, 0], [2, 0], [2, -2], [0, -2]], 2), () => ({})),
  );
}

function pentagonalPyramid(): MathGeometryVisual {
  const base = regularSection(5).map(([x, y]): [number, number] => [x, y]);
  return figure(
    SOLID_NAMES.pyramid,
    describe("A pyramid with a pentagonal base.", "Piramid bertapak pentagon."),
    drawSolid(pyramid(base, 2), () => ({})),
  );
}

/** Upright cylinder or cone: ellipse ends, hidden back half of the base dashed. */
function roundSolid(kind: "cylinder" | "cone"): MathGeometryVisual {
  const rx = 42, ry = 13, h = kind === "cylinder" ? 78 : 86, cx = W / 2;
  const topY = TOP + ry, baseY = TOP + (kind === "cylinder" ? ry : 0) + h;
  const ellipse = (cy: number, from: number, to: number, steps = 24): GeometryPoint[] =>
    Array.from({ length: steps + 1 }, (_, i) => {
      const t = from + ((to - from) * i) / steps;
      return [round(cx + rx * Math.cos(t)), round(cy + ry * Math.sin(t))];
    });
  const front = ellipse(baseY, 0, Math.PI), back = ellipse(baseY, Math.PI, 2 * Math.PI);
  const paths: Path[] = [{ points: back, dashed: true }, { points: front }];
  if (kind === "cylinder") {
    paths.push(
      { points: ellipse(topY, 0, 2 * Math.PI, 48).slice(0, -1), closed: true },
      { points: [[cx - rx, topY], [cx - rx, baseY]] },
      { points: [[cx + rx, topY], [cx + rx, baseY]] },
    );
  } else {
    const apex: GeometryPoint = [cx, TOP];
    paths.push({ points: [[cx - rx, baseY], apex, [cx + rx, baseY]] });
  }
  return figure(
    SOLID_NAMES[kind],
    kind === "cylinder"
      ? describe("An upright cylinder.", "Silinder tegak.")
      : describe("An upright cone.", "Kon tegak."),
    { paths, labels: [], bottom: baseY + ry },
  );
}

/** Prism with the cross-section face shaded at the front. */
function triangularPrismEnds(): MathGeometryVisual {
  return figure(
    SOLID_NAMES.prism,
    describe("A triangular prism with its front end face shaded.", "Prisma segi tiga dengan muka hujung hadapan berlorek."),
    drawSolid(prism(regularSection(3), 3.2), () => ({}), 0),
  );
}

// ── Nets ────────────────────────────────────────────────────────────────────

const NETS = {
  cross: [[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [1, 2]],
  offset: [[0, 1], [1, 1], [2, 1], [3, 1], [0, 0], [3, 2]],
  zigzag: [[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [2, 2]],
  twoThreeOne: [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [3, 2]],
  stairs33: [[0, 0], [1, 0], [2, 0], [2, 1], [3, 1], [4, 1]],
  stairs222: [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]],
  /** Both flaps fold onto the same face: not a cube net. */
  overlapping: [[0, 1], [1, 1], [2, 1], [3, 1], [0, 0], [2, 0]],
  /** Only five squares. */
  fiveSquares: [[0, 1], [1, 1], [2, 1], [3, 1], [1, 0]],
} satisfies Record<string, NetCell[]>;
export const CHAPTER_6_NETS: Readonly<Record<keyof typeof NETS, readonly NetCell[]>> = NETS;

/** Square net: congruent squares; the label sits under the lowest left square. */
function squareNet(cells: readonly NetCell[], edge?: VisualText): Drawn {
  const cols = Math.max(...cells.map(c => c[0])) + 1, rows = Math.max(...cells.map(c => c[1])) + 1;
  const a = Math.min(30, DRAW_W / cols, DRAW_H / rows);
  const left = (W - cols * a) / 2;
  const corner = ([c, r]: NetCell): GeometryPoint => [round(left + c * a), round(TOP + r * a)];
  const paths: Path[] = cells.map(cell => {
    const [x, y] = corner(cell);
    return { points: [[x, y], [round(x + a), y], [round(x + a), round(y + a)], [x, round(y + a)]], closed: true };
  });
  const lowest = [...cells].sort((p, q) => q[1] - p[1] || p[0] - q[0])[0];
  const [x, y] = corner(lowest);
  return { paths, labels: edge ? [label(x + a / 2, y + a + 15, edge)] : [], bottom: TOP + rows * a };
}

function cubeNet(cells: readonly NetCell[], edge: VisualText | undefined, description: LocalizedText, caption?: LocalizedText) {
  return figure(text("Net", "Bentangan"), description, squareNet(cells, edge), caption);
}

/** Triangular prism net with one triangle missing: three rectangles, one triangle. */
function incompletePrismNet(): MathGeometryVisual {
  const a = 30, b = 52, left = (W - 3 * a) / 2, top = TOP + a * Math.sin(Math.PI / 3);
  const rect = (i: number): Path => {
    const x = left + i * a;
    return { points: [[x, top], [x + a, top], [x + a, top + b], [x, top + b]].map(([px, py]) => [round(px), round(py)]) as GeometryPoint[], closed: true };
  };
  const apex: GeometryPoint = [round(left + 1.5 * a), TOP];
  return figure(
    text("Net", "Bentangan"),
    text("Part of a triangular prism net: three rectangles in a row and one triangle on the middle rectangle.", "Sebahagian bentangan prisma segi tiga: tiga segi empat tepat sebaris dan satu segi tiga pada segi empat tepat tengah."),
    {
      paths: [rect(0), rect(1), rect(2), { points: [[round(left + a), round(top)], apex, [round(left + 2 * a), round(top)]], closed: true }],
      labels: [],
      bottom: top + b,
    },
  );
}

// ── Bank index → diagram ────────────────────────────────────────────────────

const sideNet = (cells: readonly NetCell[], s: number) =>
  cubeNet(cells, `${s} cm`, text(`A cube net of six congruent squares, each of side ${s} cm.`, `Bentangan kubus enam segi empat sama kongruen, setiap satu bersisi ${s} cm.`));

const ENTRIES: Array<[number, MathGeometryVisual]> = [
  // 6.1 concepts (#3 asks to name the cylinder, so it has no picture)
  [0, cube()],
  [1, cube(undefined, "edge")],
  [2, cube(undefined, "vertex")],
  // 6.1 practice: count faces, edges and vertices from the solid
  [4, cube()],
  [5, cuboid(5, 3, 2.5)],
  [6, regularPrism(3)],
  [7, squarePyramid()],
  [8, regularPrism(5)],
  [9, regularPrism(6)],
  [10, cuboid(5, 3, 2.5)],
  [11, pentagonalPyramid()],
  [12, regularPrism(6)],
  [14, trapeziumPrism()],
  // 6.1 challenge: n-sided prisms, n = 3 … 7
  ...[3, 4, 5, 6, 7].map((n, k) => [15 + k, regularPrism(n)] as [number, MathGeometryVisual]),
  // 6.2 concepts
  [20, cubeNet(NETS.cross, undefined, text("Six squares laid flat in a cross shape.", "Enam segi empat sama dibentang rata berbentuk palang."))],
  [21, cube()],
  [22, regularPrism(3)],
  [23, cubeNet(NETS.overlapping, undefined, text("Six squares: a row of four with two squares above the first and third.", "Enam segi empat sama: empat sebaris dengan dua segi empat sama di atas yang pertama dan ketiga."), text("Not a cube net", "Bukan bentangan kubus"))],
  // 6.2 practice
  [24, cuboid(5, 3, 2.5)],
  [25, cubeNet(NETS.cross, "?", text("A cube net; the side of one square is marked ?.", "Bentangan kubus; sisi satu segi empat sama ditanda ?."))],
  [26, roundSolid("cylinder")],
  [27, roundSolid("cylinder")],
  [28, roundSolid("cone")],
  [29, squarePyramid()],
  [30, cubeNet(NETS.fiveSquares, undefined, text("Five squares: a row of four with one square above the second.", "Lima segi empat sama: empat sebaris dengan satu segi empat sama di atas yang kedua."))],
  [31, incompletePrismNet()],
  [32, sideNet(NETS.cross, 3)],
  [33, cuboid(2, 3, 5, { l: "2 cm", w: "3 cm", h: "5 cm" })],
  [34, triangularPrismEnds()],
  // 6.2 challenge: gift-box nets, each a different valid layout
  ...([[NETS.offset, 2], [NETS.zigzag, 3], [NETS.twoThreeOne, 4], [NETS.stairs33, 5], [NETS.stairs222, 6]] as const).map(
    ([cells, s], k) => [35 + k, sideNet(cells, s)] as [number, MathGeometryVisual],
  ),
  // 6.3 concepts (#40 compares measures in words; no picture)
  [41, cuboid(5, 3, 2.5, { l: text("l", "p"), w: text("w", "l"), h: text("h", "t") })],
  [42, cube("s")],
  [43, regularPrism(3)],
  // 6.3 practice
  ...[2, 3, 4, 5, 2, 3, 4, 5].map((s, k) => [44 + k, cube(`${s} cm`)] as [number, MathGeometryVisual]),
  ...([[3, 4, 5], [2, 5, 7], [4, 6, 8]] as const).map(
    ([l, w, h], k) => [52 + k, cuboid(l, w, h, { l: `${l} cm`, w: `${w} cm`, h: `${h} cm` })] as [number, MathGeometryVisual],
  ),
  // 6.3 challenge: closed packages, length × width × height
  ...([[2, 3, 4], [3, 4, 5], [4, 5, 6], [3, 5, 8], [5, 6, 9]] as const).map(
    ([l, w, h], k) => [55 + k, cuboid(l, w, h, { l: `${l} cm`, w: `${w} cm`, h: `${h} cm` })] as [number, MathGeometryVisual],
  ),
];

export const MATH_F2_C6_VISUALS: ReadonlyMap<number, MathGeometryVisual> = new Map(ENTRIES);
