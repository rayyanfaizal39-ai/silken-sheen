/**
 * Isometric transformations on the Cartesian plane (Form 2 Chapter 11).
 * The flashcard bank computes every image from these functions, so the
 * printed answers, the diagrams and the tests all share one source.
 */

export type Pt = [number, number];
export type Turn = "cw" | "acw";

const clean = (n: number) => (Object.is(n, -0) ? 0 : Math.round(n * 1000) / 1000);
const pt = (x: number, y: number): Pt => [clean(x), clean(y)];

/** Reflection in the vertical line x = a (the y-axis when a = 0). */
export const reflectInX = (a: number) => ([x, y]: Pt): Pt => pt(2 * a - x, y);
/** Reflection in the horizontal line y = b (the x-axis when b = 0). */
export const reflectInY = (b: number) => ([x, y]: Pt): Pt => pt(x, 2 * b - y);
/** Reflection in the line y = x. */
export const reflectInYEqualsX = ([x, y]: Pt): Pt => pt(y, x);

/**
 * Rotation by `degrees` (a multiple of 90) about `centre`. Anticlockwise is
 * the positive mathematical direction; clockwise turns the other way.
 */
export const rotate = (degrees: 90 | 180 | 270, turn: Turn, centre: Pt = [0, 0]) => ([x, y]: Pt): Pt => {
  const quarterTurns = ((turn === "acw" ? degrees : 360 - degrees) / 90) % 4;
  let [dx, dy] = [x - centre[0], y - centre[1]];
  for (let i = 0; i < quarterTurns; i++) [dx, dy] = [-dy, dx];
  return pt(centre[0] + dx, centre[1] + dy);
};

export const translate = ([h, k]: Pt) => ([x, y]: Pt): Pt => pt(x + h, y + k);

export const vectorBetween = (from: Pt, to: Pt): Pt => pt(to[0] - from[0], to[1] - from[1]);

/** Twice the signed area: positive when the vertices run anticlockwise. */
export function signedArea(points: Pt[]): number {
  return points.reduce((sum, [x1, y1], i) => {
    const [x2, y2] = points[(i + 1) % points.length];
    return sum + x1 * y2 - x2 * y1;
  }, 0);
}

export const distance = (a: Pt, b: Pt) => Math.hypot(b[0] - a[0], b[1] - a[1]);

/** Sorted side lengths, used to compare polygons for congruence by sides. */
export const sideLengths = (points: Pt[]) =>
  points.map((p, i) => distance(p, points[(i + 1) % points.length]));

/** "−3" with a true minus sign, as printed in the textbook. */
export const num = (n: number) => (n < 0 ? `−${-n}` : `${n}`);
export const coord = ([x, y]: Pt) => `(${num(x)}, ${num(y)})`;
/** A translation written as a vector, e.g. (3, −2). */
export const vec = coord;
