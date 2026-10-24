import type {
  GeometryPanel,
  GeometryPoint,
  MathGeometryVisual,
} from "@/features/quiz/visuals/mathGeometryVisual";
import type { LocalizedText, VisualText } from "@/features/quiz/visuals/mathQuestionVisual";
import { num, type Pt } from "./transformations";

/**
 * A small builder for Chapter 11 transformation diagrams. Shapes are placed in
 * mathematical coordinates (y up, equal x and y scales); `build` scales them
 * to a compact canvas and crops the viewBox to the drawn content and labels,
 * so no diagram carries empty space.
 *
 * Styling convention: the object is gold, the image sky-blue, mirror lines
 * and axes slate, and anything unknown is labelled "?".
 */

type Panel = GeometryPanel;
type Path = NonNullable<Panel["paths"]>[number];
type Arc = NonNullable<Panel["arcs"]>[number];
type Label = Panel["labels"][number];
export type Role = "object" | "image" | "other";

const PAD = 8;
const MAX_W = 232;
const MAX_H = 210;
const CHAR_W = 7.6;
const SMALL_CHAR_W = 5.8;

const tone = (role: Role): Path["tone"] => (role === "image" ? "accent" : role === "other" ? "muted" : undefined);
const labelTone = (role: Role): Label["tone"] => (role === "image" ? "accent" : role === "other" ? "muted" : undefined);
const round = (n: number) => Math.round(n * 100) / 100;
const textOf = (t: VisualText) => (typeof t === "string" ? [t] : [t.dlp, t.bm]);

type El =
  | { kind: "grid"; x0: number; x1: number; y0: number; y1: number; axes: boolean; lines: boolean }
  | { kind: "sides"; pts: Pt[]; names: Array<VisualText | undefined>; role: Role }
  | { kind: "poly"; pts: Pt[]; role: Role; dashed?: boolean; names?: VisualText[]; open?: boolean }
  | { kind: "seg"; a: Pt; b: Pt; role: Role; dashed?: boolean }
  | { kind: "line"; p: Pt; q: Pt; name?: VisualText; nameAt?: "start" | "end" }
  | { kind: "arrow"; a: Pt; b: Pt; role: Role; name?: VisualText }
  | { kind: "point"; p: Pt; role: Role; name?: VisualText; towards?: [number, number] }
  | { kind: "turn"; c: Pt; r: number; from: number; to: number; name?: VisualText }
  | { kind: "circle"; c: Pt; r: number; guide: boolean }
  | { kind: "ticks"; a: Pt; b: Pt; n: number; role: Role }
  | { kind: "angle"; v: Pt; p1: Pt; p2: Pt; name?: VisualText; role: Role }
  | { kind: "right"; v: Pt; p1: Pt; p2: Pt; role: Role }
  | { kind: "text"; p: Pt; text: VisualText; dx: number; dy: number; anchor?: Label["anchor"]; role?: Role };

export class Diagram {
  private els: El[] = [];
  constructor(private readonly opts: { maxUnit?: number; width?: number; height?: number } = {}) {}

  /** Square grid over [x0, x1] × [y0, y1]; with axes, numbered every 2 units. */
  grid(x0: number, x1: number, y0: number, y1: number, axes = true, lines = true) {
    this.els.push({ kind: "grid", x0, x1, y0, y1, axes, lines });
    return this;
  }
  /** Closed polygon; `names` label each vertex, pushed outward from the centre. */
  poly(pts: Pt[], role: Role = "object", names?: VisualText[], dashed?: boolean) {
    this.els.push({ kind: "poly", pts, role, names, dashed });
    return this;
  }
  /** Open polyline (e.g. a clock hand). */
  polyline(pts: Pt[], role: Role = "object", names?: VisualText[]) {
    this.els.push({ kind: "poly", pts, role, names, open: true });
    return this;
  }
  /** Labels each side i (from vertex i to i + 1), placed outside the polygon. */
  sides(pts: Pt[], names: Array<VisualText | undefined>, role: Role = "object") {
    this.els.push({ kind: "sides", pts, names, role });
    return this;
  }
  seg(a: Pt, b: Pt, role: Role = "other", dashed = false) {
    this.els.push({ kind: "seg", a, b, role, dashed });
    return this;
  }
  /** A mirror line through p and q, extended across the drawing. */
  line(p: Pt, q: Pt, name?: VisualText, nameAt: "start" | "end" = "end") {
    this.els.push({ kind: "line", p, q, name, nameAt });
    return this;
  }
  arrow(a: Pt, b: Pt, role: Role = "other", name?: VisualText) {
    this.els.push({ kind: "arrow", a, b, role, name });
    return this;
  }
  point(p: Pt, name?: VisualText, role: Role = "object", towards?: [number, number]) {
    this.els.push({ kind: "point", p, role, name, towards });
    return this;
  }
  /** Arc of radius r about c from angle `from` to `to` (degrees, anticlockwise positive) with an arrowhead. */
  turn(c: Pt, r: number, from: number, to: number, name?: VisualText) {
    this.els.push({ kind: "turn", c, r, from, to, name });
    return this;
  }
  /** A circle: solid gold, or a dashed slate guide (e.g. a path of rotation). */
  circle(c: Pt, r: number, guide = false) {
    this.els.push({ kind: "circle", c, r, guide });
    return this;
  }
  ticks(a: Pt, b: Pt, n: number, role: Role = "object") {
    this.els.push({ kind: "ticks", a, b, n, role });
    return this;
  }
  angle(v: Pt, p1: Pt, p2: Pt, name?: VisualText, role: Role = "object") {
    this.els.push({ kind: "angle", v, p1, p2, name, role });
    return this;
  }
  right(v: Pt, p1: Pt, p2: Pt, role: Role = "object") {
    this.els.push({ kind: "right", v, p1, p2, role });
    return this;
  }
  text(p: Pt, text: VisualText, dx = 0, dy = 0, anchor?: Label["anchor"], role?: Role) {
    this.els.push({ kind: "text", p, text, dx, dy, anchor, role });
    return this;
  }

  /**
   * Lays the figure out to fit about 196 × 168 units of drawing; if labels
   * outside the drawing push the canvas past 232 × 210, the drawing is scaled
   * down and laid out again.
   */
  build(
    title: LocalizedText,
    description: LocalizedText,
    options: { caption?: LocalizedText; measured?: boolean } = {},
  ): MathGeometryVisual {
    let [width, height] = [this.opts.width ?? 196, this.opts.height ?? 168];
    let visual = this.render(title, description, options, width, height);
    for (let attempt = 0; attempt < 4; attempt++) {
      const [w, h] = visual.panels[0].viewBox!;
      if (w <= MAX_W && h <= MAX_H) break;
      width = Math.max(80, width - Math.max(0, w - MAX_W) - 2);
      height = Math.max(80, height - Math.max(0, h - MAX_H) - 2);
      visual = this.render(title, description, options, width, height);
    }
    return visual;
  }

  private render(
    title: LocalizedText,
    description: LocalizedText,
    { caption, measured = false }: { caption?: LocalizedText; measured?: boolean },
    width: number,
    height: number,
  ): MathGeometryVisual {
    // 1. World bounds from geometry (mirror lines are clipped to these).
    const world: Pt[] = [];
    for (const e of this.els) {
      if (e.kind === "grid") world.push([e.x0, e.y0], [e.x1, e.y1]);
      else if (e.kind === "poly" || e.kind === "sides") world.push(...e.pts);
      else if (e.kind === "line") world.push(e.p, e.q);
      else if (e.kind === "seg" || e.kind === "arrow") world.push(e.a, e.b);
      else if (e.kind === "point" || e.kind === "text") world.push(e.p);
      else if (e.kind === "turn" || e.kind === "circle") world.push([e.c[0] - e.r, e.c[1] - e.r], [e.c[0] + e.r, e.c[1] + e.r]);
      else if (e.kind === "ticks" || e.kind === "angle" || e.kind === "right") world.push(e.kind === "ticks" ? e.a : e.v);
    }
    const gridEl = this.els.find((e): e is Extract<El, { kind: "grid" }> => e.kind === "grid");
    const xs = world.map(p => p[0]), ys = world.map(p => p[1]);
    let [wx0, wx1, wy0, wy1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    if (!gridEl) [wx0, wx1, wy0, wy1] = [wx0 - 0.4, wx1 + 0.4, wy0 - 0.4, wy1 + 0.4];
    const u = Math.min(this.opts.maxUnit ?? 30, width / (wx1 - wx0 || 1), height / (wy1 - wy0 || 1));
    const at = ([x, y]: Pt): GeometryPoint => [(x - wx0) * u, (wy1 - y) * u];

    const paths: Path[] = [], arcs: Arc[] = [], labels: Label[] = [], dots: GeometryPoint[] = [];
    const circles: NonNullable<Panel["circles"]> = [];
    let grid: Panel["grid"];
    const head = (tip: GeometryPoint, dir: [number, number], role: Role) => {
      const len = Math.hypot(dir[0], dir[1]) || 1, [ux, uy] = [dir[0] / len, dir[1] / len];
      paths.push({
        points: [[tip[0] - 6 * ux - 3.5 * uy, tip[1] - 6 * uy + 3.5 * ux], tip, [tip[0] - 6 * ux + 3.5 * uy, tip[1] - 6 * uy - 3.5 * ux]],
        ...(tone(role) ? { tone: tone(role) } : {}),
      });
    };
    const addLabel = (p: GeometryPoint, text: VisualText, role: Role = "object", anchor?: Label["anchor"], size?: "sm") =>
      labels.push({ at: p, text, ...(anchor ? { anchor } : {}), ...(labelTone(role) ? { tone: labelTone(role) } : {}), ...(size ? { size } : {}) });
    const screenAngle = (deg: number) => -deg;

    for (const e of this.els) {
      if (e.kind === "grid") {
        if (e.lines) grid = { origin: at([e.x0, e.y1]), columns: e.x1 - e.x0, rows: e.y1 - e.y0, step: u };
        if (e.axes) {
          if (e.y0 <= 0 && e.y1 >= 0) {
            paths.push({ points: [at([e.x0, 0]), at([e.x1, 0])], tone: "muted" });
            addLabel([at([e.x1, 0])[0] + 7, at([e.x1, 0])[1] + 4], "x", "other", undefined, "sm");
          }
          if (e.x0 <= 0 && e.x1 >= 0) {
            paths.push({ points: [at([0, e.y0]), at([0, e.y1])], tone: "muted" });
            addLabel([at([0, e.y1])[0], at([0, e.y1])[1] - 5], "y", "other", undefined, "sm");
          }
          // Even ticks are numbered; the last tick is left to the axis letter.
          for (let x = Math.ceil(e.x0 / 2) * 2; x < e.x1; x += 2)
            if (x !== 0 && e.y0 <= 0 && e.y1 >= 0) addLabel([at([x, 0])[0], at([x, 0])[1] + 11], num(x), "other", undefined, "sm");
          for (let y = Math.ceil(e.y0 / 2) * 2; y < e.y1; y += 2)
            if (y !== 0 && e.x0 <= 0 && e.x1 >= 0) addLabel([at([0, y])[0] - 4, at([0, y])[1] + 3.5], num(y), "other", "end", "sm");
          if (e.x0 <= 0 && e.x1 >= 0 && e.y0 <= 0 && e.y1 >= 0) addLabel([at([0, 0])[0] - 4, at([0, 0])[1] + 11], "O", "other", "end", "sm");
        }
      } else if (e.kind === "poly") {
        const pts = e.pts.map(at);
        paths.push({ points: pts, ...(e.open ? {} : { closed: true }), ...(e.dashed ? { dashed: true } : {}), ...(tone(e.role) ? { tone: tone(e.role) } : {}) });
        if (e.names) {
          const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length, cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
          e.names.forEach((name, i) => {
            if (!name) return;
            const [px, py] = pts[i], len = Math.hypot(px - cx, py - cy) || 1;
            addLabel([px + ((px - cx) / len) * 10, py + ((py - cy) / len) * 10 + 4], name, e.role);
          });
        }
      } else if (e.kind === "sides") {
        const pts = e.pts.map(at);
        const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length, cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
        e.names.forEach((name, i) => {
          if (!name) return;
          const [a, b] = [pts[i], pts[(i + 1) % pts.length]];
          const [mx, my] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
          const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
          let [nx, ny] = [-(b[1] - a[1]) / len, (b[0] - a[0]) / len];
          if (nx * (mx - cx) + ny * (my - cy) < 0) [nx, ny] = [-nx, -ny];
          const anchor = Math.abs(nx) > 0.5 ? (nx > 0 ? "start" : "end") : undefined;
          addLabel([mx + nx * 6, my + ny * (ny > 0 ? 13 : 6) + (anchor ? 4 : 0)], name, e.role, anchor);
        });
      } else if (e.kind === "seg") {
        paths.push({ points: [at(e.a), at(e.b)], ...(e.dashed ? { dashed: true } : {}), ...(tone(e.role) ? { tone: tone(e.role) } : {}) });
      } else if (e.kind === "line") {
        // Clip the infinite line to the world box.
        const [dx, dy] = [e.q[0] - e.p[0], e.q[1] - e.p[1]];
        const ts: number[] = [];
        for (const [x, y] of [[wx0, null], [wx1, null], [null, wy0], [null, wy1]] as Array<[number | null, number | null]>) {
          const t = x !== null ? (dx ? (x - e.p[0]) / dx : NaN) : dy ? (y! - e.p[1]) / dy : NaN;
          if (!Number.isFinite(t)) continue;
          const [px, py] = [e.p[0] + t * dx, e.p[1] + t * dy];
          if (px >= wx0 - 1e-9 && px <= wx1 + 1e-9 && py >= wy0 - 1e-9 && py <= wy1 + 1e-9) ts.push(t);
        }
        const [t0, t1] = [Math.min(...ts), Math.max(...ts)];
        const a = at([e.p[0] + t0 * dx, e.p[1] + t0 * dy]), b = at([e.p[0] + t1 * dx, e.p[1] + t1 * dy]);
        paths.push({ points: [a, b], dashed: true, tone: "muted" });
        if (e.name) {
          const end = e.nameAt === "start" ? a : b, other = e.nameAt === "start" ? b : a;
          const len = Math.hypot(end[0] - other[0], end[1] - other[1]) || 1;
          const [ux, uy] = [(end[0] - other[0]) / len, (end[1] - other[1]) / len];
          const horizontal = Math.abs(ux) > Math.abs(uy);
          addLabel(
            horizontal ? [end[0] + ux * 4, end[1] - 5] : [end[0] + 5, end[1] + uy * 4 + (uy > 0 ? 9 : 0)],
            e.name, "other", horizontal ? (ux > 0 ? "end" : "start") : "start",
          );
        }
      } else if (e.kind === "arrow") {
        const a = at(e.a), b = at(e.b);
        paths.push({ points: [a, b], ...(tone(e.role) ? { tone: tone(e.role) } : {}) });
        head(b, [b[0] - a[0], b[1] - a[1]], e.role);
        if (e.name) {
          const [mx, my] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
          const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
          let [nx, ny] = [-(b[1] - a[1]) / len, (b[0] - a[0]) / len];
          if (ny > 0) [nx, ny] = [-nx, -ny];
          addLabel([mx + nx * 9, my + ny * 9 + 4], e.name, e.role, Math.abs(nx) > 0.6 ? (nx > 0 ? "start" : "end") : undefined);
        }
      } else if (e.kind === "point") {
        const p = at(e.p);
        dots.push(p);
        if (e.name) {
          const [tx, ty] = e.towards ?? [1, 1];
          const len = Math.hypot(tx, ty) || 1;
          const [ox, oy] = [(tx / len) * 7, (-ty / len) * 7];
          addLabel([p[0] + ox, p[1] + oy + (oy < 0 ? -1 : 9)], e.name, e.role, Math.abs(ox) > 3 ? (ox > 0 ? "start" : "end") : undefined);
        }
      } else if (e.kind === "turn") {
        const c = at(e.c), r = e.r * u;
        arcs.push({ centre: c, radius: r, start: screenAngle(e.from), end: screenAngle(e.to) });
        const t = (e.to * Math.PI) / 180, sign = e.to > e.from ? 1 : -1;
        const tip: GeometryPoint = [c[0] + r * Math.cos(t), c[1] - r * Math.sin(t)];
        head(tip, [-Math.sin(t) * sign, -Math.cos(t) * sign], "image");
        if (e.name) {
          const mid = ((e.from + e.to) / 2) * (Math.PI / 180);
          addLabel([c[0] + (r + 9) * Math.cos(mid), c[1] - (r + 9) * Math.sin(mid) + 4], e.name, "image");
        }
      } else if (e.kind === "circle") {
        circles.push({ centre: at(e.c), radius: e.r * u, fill: "none", ...(e.guide ? { tone: "muted" as const, dashed: true } : {}) });
      } else if (e.kind === "ticks") {
        const a = at(e.a), b = at(e.b), len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
        const [ux, uy] = [(b[0] - a[0]) / len, (b[1] - a[1]) / len], [nx, ny] = [-uy, ux];
        const [mx, my] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        for (let i = 0; i < e.n; i++) {
          const off = (i - (e.n - 1) / 2) * 3.5;
          paths.push({
            points: [[mx + ux * off - nx * 4, my + uy * off - ny * 4], [mx + ux * off + nx * 4, my + uy * off + ny * 4]],
            ...(tone(e.role) ? { tone: tone(e.role) } : {}),
          });
        }
      } else if (e.kind === "angle") {
        const v = at(e.v);
        const ang = (p: Pt) => (Math.atan2(p[1] - e.v[1], p[0] - e.v[0]) * 180) / Math.PI;
        let [a1, a2] = [ang(e.p1), ang(e.p2)];
        let diff = (((a2 - a1) % 360) + 360) % 360;
        if (diff > 180) { [a1, a2] = [a2, a1]; diff = 360 - diff; }
        const r = 11;
        arcs.push({ centre: v, radius: r, start: screenAngle(a1), end: screenAngle(a1 + diff) });
        if (e.name) {
          const mid = ((a1 + diff / 2) * Math.PI) / 180;
          addLabel([v[0] + (r + 10) * Math.cos(mid), v[1] - (r + 10) * Math.sin(mid) + 4], e.name, e.role);
        }
      } else if (e.kind === "right") {
        const v = at(e.v), unit = (p: Pt) => {
          const q = at(p), len = Math.hypot(q[0] - v[0], q[1] - v[1]) || 1;
          return [(q[0] - v[0]) / len, (q[1] - v[1]) / len];
        };
        const [a, b] = [unit(e.p1), unit(e.p2)], s = 7;
        paths.push({
          points: [[v[0] + a[0] * s, v[1] + a[1] * s], [v[0] + (a[0] + b[0]) * s, v[1] + (a[1] + b[1]) * s], [v[0] + b[0] * s, v[1] + b[1] * s]],
          ...(tone(e.role) ? { tone: tone(e.role) } : {}),
        });
      } else if (e.kind === "text") {
        const p = at(e.p);
        addLabel([p[0] + e.dx, p[1] + e.dy], e.text, e.role ?? "object", e.anchor);
      }
    }

    // Axis numbers give way: drop any that would touch another label or sit
    // on a vertex or point of the figure.
    const corners = [...paths.filter(p => p.tone !== "muted").flatMap(p => p.points), ...dots];
    const main = labelBoxes(labels.filter(l => l.size !== "sm"));
    for (let i = labels.length - 1; i >= 0; i--) {
      if (labels[i].size !== "sm") continue;
      const [b] = labelBoxes([labels[i]]);
      const hitsLabel = main.some(m => m.x0 < b.x1 + 1 && b.x0 < m.x1 + 1 && m.y0 < b.y1 + 1 && b.y0 < m.y1 + 1);
      const hitsCorner = corners.some(([x, y]) => x > b.x0 - 3 && x < b.x1 + 3 && y > b.y0 - 3 && y < b.y1 + 3);
      if (hitsLabel || hitsCorner) labels.splice(i, 1);
    }

    // 2. Crop to everything drawn, including estimated label boxes.
    const bx: number[] = [], by: number[] = [];
    const take = (p: GeometryPoint) => { bx.push(p[0]); by.push(p[1]); };
    paths.forEach(p => p.points.forEach(take));
    dots.forEach(take);
    arcs.forEach(a => { take([a.centre[0] - a.radius, a.centre[1] - a.radius]); take([a.centre[0] + a.radius, a.centre[1] + a.radius]); });
    circles.forEach(c => { take([c.centre[0] - c.radius, c.centre[1] - c.radius]); take([c.centre[0] + c.radius, c.centre[1] + c.radius]); });
    if (grid) { take(grid.origin); take([grid.origin[0] + grid.columns * grid.step, grid.origin[1] + grid.rows * grid.step]); }
    for (const box of labelBoxes(labels)) { take([box.x0, box.y0]); take([box.x1, box.y1]); }
    const [ox, oy] = [PAD - Math.min(...bx), PAD - Math.min(...by)];
    const shift = ([x, y]: GeometryPoint): GeometryPoint => [round(x + ox), round(y + oy)];
    const viewBox: [number, number] = [Math.ceil(Math.max(...bx) - Math.min(...bx) + 2 * PAD), Math.ceil(Math.max(...by) - Math.min(...by) + 2 * PAD)];

    return {
      kind: "geometry-diagram",
      layout: "compact",
      size: "natural",
      ...(measured ? {} : { notToScale: false }),
      title,
      panels: [{
        title: caption ?? { dlp: "", bm: "" },
        description,
        ...(grid ? { grid: { ...grid, origin: shift(grid.origin), step: round(grid.step) } } : {}),
        paths: paths.map(p => ({ ...p, points: p.points.map(shift) })),
        ...(circles.length ? { circles: circles.map(c => ({ ...c, centre: shift(c.centre), radius: round(c.radius) })) } : {}),
        ...(arcs.length ? { arcs: arcs.map(a => ({ ...a, centre: shift(a.centre), radius: round(a.radius), start: round(a.start), end: round(a.end) })) } : {}),
        ...(dots.length ? { dots: dots.map(shift) } : {}),
        labels: labels.map(l => ({ ...l, at: shift(l.at) })),
        viewBox,
      }],
    };
  }
}

/** Approximate rendered boxes of labels (13px bold, or 10px when small). */
export function labelBoxes(labels: Label[]) {
  return labels.map(l => {
    const w = Math.max(...textOf(l.text).map(t => t.length)) * (l.size === "sm" ? SMALL_CHAR_W : CHAR_W);
    const h = l.size === "sm" ? 8 : 10;
    const x0 = l.anchor === "start" ? l.at[0] : l.anchor === "end" ? l.at[0] - w : l.at[0] - w / 2;
    return { x0, x1: x0 + w, y0: l.at[1] - h, y1: l.at[1] + 1, label: l };
  });
}
