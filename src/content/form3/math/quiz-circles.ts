import type {
  GeometryPanel,
  GeometryPoint,
} from "@/features/quiz/visuals/mathGeometryVisual";
import type { VisualText } from "@/features/quiz/visuals/mathQuestionVisual";
import { diagram, label, path, t } from "./quiz-geometry";
const rad = (a: number) => (a * Math.PI) / 180;
export const circlePoint = (
  a: number,
  centre: GeometryPoint = [150, 125],
  radius = 75,
): GeometryPoint => [
  centre[0] + radius * Math.cos(rad(a)),
  centre[1] - radius * Math.sin(rad(a)),
];
export function angleMark(
  points: Record<string, GeometryPoint>,
  a: string,
  v: string,
  b: string,
  text: string,
  radius = 25,
) {
  const p = points[v];
  const start =
    (Math.atan2(points[a][1] - p[1], points[a][0] - p[0]) * 180) / Math.PI;
  let end =
    (Math.atan2(points[b][1] - p[1], points[b][0] - p[0]) * 180) / Math.PI;
  while (end - start > 180) end -= 360;
  while (end - start < -180) end += 360;
  const middle = rad((start + end) / 2);
  return {
    arc: { centre: p, radius, start, end },
    label: label(
      p[0] + (radius + 15) * Math.cos(middle),
      p[1] + (radius + 15) * Math.sin(middle) + 4,
      text,
    ),
  };
}
/** Each angle is drawn from its actual rays; labels contain only givens or unknowns. */
export function circleDiagram(
  vertices: Record<string, number>,
  edges: string[],
  angles: [string, string, string, string][] = [],
  notes: VisualText[] = [],
  extra: Record<string, GeometryPoint> = {},
  centre: GeometryPoint = [150, 125],
  radius = 75,
) {
  const points: Record<string, GeometryPoint> = {
    O: centre,
    ...Object.fromEntries(
      Object.entries(vertices).map(([n, a]) => [
        n,
        circlePoint(a, centre, radius),
      ]),
    ),
    ...extra,
  };
  const marks = angles.map(([a, v, b, text]) =>
    angleMark(points, a, v, b, text),
  );
  const p: GeometryPanel = {
    title: t("Bulatan dan garis berkaitan", "Circle and related lines"),
    description: t(
      `Titik pada lilitan: ${Object.keys(vertices).join(", ")}. Garis dilukis antara titik yang dinamakan; sudut diberi ditanda pada bucunya.`,
      `Points on the circumference: ${Object.keys(vertices).join(", ")}. Lines join the named points; given angles are marked at their vertices.`,
    ),
    circles: [{ centre, radius }],
    paths: edges.map((e) => path(e.split("").map((n) => points[n]))),
    arcs: marks.map((m) => m.arc),
    labels: [
      ...Object.entries(vertices).map(([n, a]) =>
        label(
          centre[0] + (radius + 14) * Math.cos(rad(a)),
          centre[1] - (radius + 14) * Math.sin(rad(a)) + 5,
          n,
        ),
      ),
      ...(edges.some((e) => e.includes("O"))
        ? [label(centre[0] - 12, centre[1] + 17, "O")]
        : []),
      ...Object.entries(extra).map(([n, p]) => label(p[0] + 7, p[1] + 13, n)),
      ...marks.map((m) => m.label),
      ...notes.map((n, i) => label(150, 220 + i * 17, n)),
    ],
  };
  return diagram(t("Rajah soalan", "Question diagram"), p);
}
/** True tangent endpoints calculated from the radius and centre–external-point angle. */
export function twoTangents(
  names: [string, string, string],
  halfCentreAngle: number,
  given?: [string, string, string, string],
  notes: VisualText[] = [],
  arcPoint?: [string, number],
  radius = 50,
) {
  const [external, upper, lower] = names,
    centre: GeometryPoint = [95, 120];
  const px = centre[0] + radius / Math.cos(rad(halfCentreAngle));
  const vertices: Record<string, number> = {
    [upper]: halfCentreAngle,
    [lower]: -halfCentreAngle,
    ...(arcPoint ? { [arcPoint[0]]: arcPoint[1] } : {}),
  };
  return circleDiagram(
    vertices,
    [
      `O${upper}`,
      `O${lower}`,
      `O${external}`,
      `${external}${upper}`,
      `${external}${lower}`,
      ...(arcPoint ? [`${upper}${arcPoint[0]}${lower}`] : []),
    ],
    given ? [given] : [],
    notes,
    { [external]: [px, 120] },
    centre,
    radius,
  );
}
export function tangentTriangle(
  names: [string, string, string],
  angleAtExternal: number,
  given: [string, string, string, string][],
  notes: string[] = [],
) {
  const [o, contact, external] = names;
  // Centre O and external point to its right. The radius at the contact is perpendicular to the tangent.
  const central = 90 - angleAtExternal;
  const visual = twoTangents(
    [external, contact, "Z"],
    central,
    undefined,
    notes,
    undefined,
    Math.min(50, 140 * Math.cos(rad(central))),
  );
  const panel = visual.panels[0];
  panel.description = t(
    `${o} ialah pusat bulatan. ${external}${contact} ialah tangen pada ${contact}; jejari ${o}${contact} serenjang dengan tangen.`,
    `${o} is the circle centre. ${external}${contact} is tangent at ${contact}; radius ${o}${contact} is perpendicular to the tangent.`,
  );
  panel.paths = panel.paths!.filter((p) =>
    p.points.every(
      (pt) =>
        Math.abs(
          pt[1] -
            (120 +
              visual.panels[0].circles![0].radius * Math.sin(rad(central))),
        ) > 1e-6,
    ),
  );
  panel.labels = panel.labels.filter((l) => l.text !== "Z");
  const centre = panel.circles![0].centre,
    radius = panel.circles![0].radius;
  const points = {
    [o]: centre,
    [contact]: circlePoint(central, centre, radius),
    [external]: [
      centre[0] + radius / Math.cos(rad(central)),
      120,
    ] as GeometryPoint,
  };
  const marks = given.map(([a, v, b, text]) =>
    angleMark(points, a, v, b, text, 18),
  );
  panel.arcs = marks.map((m) => m.arc);
  panel.labels.push(...marks.map((m) => m.label));
  const P = points[contact],
    O = centre,
    E = points[external];
  const u = [(O[0] - P[0]) / radius, (O[1] - P[1]) / radius],
    d = Math.hypot(E[0] - P[0], E[1] - P[1]),
    v = [(E[0] - P[0]) / d, (E[1] - P[1]) / d];
  panel.paths!.push(
    path([
      [P[0] + u[0] * 9, P[1] + u[1] * 9],
      [P[0] + (u[0] + v[0]) * 9, P[1] + (u[1] + v[1]) * 9],
      [P[0] + v[0] * 9, P[1] + v[1] * 9],
    ]),
  );
  return visual;
}
