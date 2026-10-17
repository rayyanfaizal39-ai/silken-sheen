import type {
  GeometryPanel,
  GeometryPoint,
  MathGeometryVisual,
} from "@/features/quiz/visuals/mathGeometryVisual";
import type { LocalizedText, VisualText } from "@/features/quiz/visuals/mathQuestionVisual";

/**
 * Compact textbook circle diagrams for the Chapter 5 flashcard bank, indexed
 * like MATH_F2_C5_BANK. Each one shows only the givens (and "?" for what is
 * asked), never the answer. Cards whose question a diagram would not help are
 * left without one.
 */

type Panel = GeometryPanel;
type Label = Panel["labels"][number];

const W = 180;
const O: GeometryPoint = [90, 72];
const R = 60;
const TOP: GeometryPoint = [90, O[1] - R];
const LEFT: GeometryPoint = [O[0] - R, 72];
const RIGHT: GeometryPoint = [O[0] + R, 72];
const BELOW_Y = 154;

const at = (angle: number, radius = R): GeometryPoint => {
  const t = (angle * Math.PI) / 180;
  return [round(O[0] + radius * Math.cos(t)), round(O[1] + radius * Math.sin(t))];
};
const round = (n: number) => Math.round(n * 100) / 100;
const text = (dlp: string, bm: string): LocalizedText => ({ dlp, bm });
const label = (x: number, y: number, value: VisualText, anchor?: Label["anchor"]): Label =>
  anchor ? { at: [x, y], text: value, anchor } : { at: [x, y], text: value };

// Reusable marks. Radius is drawn straight up from O, diameter horizontally,
// so their labels never meet.
const centre = { label: label(84, 88, "O", "end") };
const radiusUp = (value: VisualText, dashed = false) => ({
  path: { points: [O, TOP], ...(dashed ? { dashed } : {}) },
  label: label(96, 42, value, "start"),
});
const diameterAcross = (value: VisualText | null, dashed = false) => ({
  path: { points: [LEFT, RIGHT], ...(dashed ? { dashed } : {}) },
  label: value === null ? null : label(122, 65, value),
});
const below = (value: VisualText) => label(O[0], BELOW_Y, value);

function figure(
  title: LocalizedText,
  description: LocalizedText,
  body: Omit<Panel, "title" | "description" | "viewBox">,
  { scaleNote = true, panelTitle = title }: { scaleNote?: boolean; panelTitle?: LocalizedText } = {},
): MathGeometryVisual {
  const lowest = Math.max(...body.labels.map(l => l.at[1]));
  return {
    kind: "geometry-diagram",
    layout: "compact",
    ...(scaleNote ? {} : { notToScale: false }),
    title,
    panels: [{ title: panelTitle, description, ...body, viewBox: [W, lowest > 140 ? 160 : 142] }],
  };
}

const CIRCLE = text("Circle with centre O", "Bulatan berpusat O");
const NO_CAPTION = text("", "");

// ── 5.1 vocabulary sketches (unmeasured, so no scale note) ──────────────────

function namedPart(part: "radius" | "diameter" | "chord" | "arc"): MathGeometryVisual {
  const sketch = { scaleNote: false, panelTitle: NO_CAPTION };
  if (part === "radius") {
    const end = at(-35);
    return figure(CIRCLE, text("A line from centre O to the circumference is marked ?.", "Garis dari pusat O ke lilitan ditanda ?."), {
      circles: [{ centre: O, radius: R }],
      paths: [{ points: [O, end] }],
      dots: [O],
      labels: [label(107, 47, "?"), centre.label],
    }, sketch);
  }
  if (part === "diameter") {
    return figure(CIRCLE, text("A line through centre O joining two points on the circle is marked ?.", "Garis melalui pusat O yang menyambungkan dua titik pada bulatan ditanda ?."), {
      circles: [{ centre: O, radius: R }],
      paths: [{ points: [LEFT, RIGHT] }],
      dots: [O],
      labels: [label(122, 65, "?"), label(90, 90, "O")],
    }, sketch);
  }
  if (part === "chord") {
    const [a, b] = [at(200), at(340)];
    return figure(CIRCLE, text("A line joins two points on the circle without passing through centre O; it is marked ?.", "Garis menyambungkan dua titik pada bulatan tanpa melalui pusat O; ia ditanda ?."), {
      circles: [{ centre: O, radius: R }],
      paths: [{ points: [a, b] }],
      dots: [O, a, b],
      labels: [label(90, 44, "?"), label(90, 90, "O")],
    }, sketch);
  }
  return figure(CIRCLE, text("A curved part of the circumference is highlighted and marked ?.", "Sebahagian lilitan yang melengkung diserlahkan dan ditanda ?."), {
    circles: [{ centre: O, radius: R, fill: "none" }],
    arcs: [{ centre: O, radius: R, start: -50, end: 50 }],
    dots: [O, at(-50), at(50)],
    labels: [label(158, 77, "?", "start"), centre.label],
  }, sketch);
}

// ── Formula and comparison sketches (5.2 / 5.3 concepts) ────────────────────

function aroundCircle(): MathGeometryVisual {
  return figure(CIRCLE, text("The distance all the way round the circle is traced and marked ?.", "Jarak sekeliling bulatan dikesan dan ditanda ?."), {
    circles: [{ centre: O, radius: R, fill: "none" }],
    arcs: [{ centre: O, radius: R + 7, start: -90, end: 240 }],
    dots: [O, TOP],
    labels: [label(163, 77, "?", "start"), centre.label],
  }, { scaleNote: false, panelTitle: NO_CAPTION });
}

function letteredRadius(shaded: boolean): MathGeometryVisual {
  const r = radiusUp("r");
  return figure(CIRCLE, text("Circle with centre O and radius r.", "Bulatan berpusat O dengan jejari r."), {
    circles: [{ centre: O, radius: R, ...(shaded ? { fill: "shade" as const } : {}) }],
    paths: [r.path],
    dots: [O],
    labels: [r.label, centre.label],
  }, { scaleNote: false, panelTitle: NO_CAPTION });
}

function letteredDiameter(): MathGeometryVisual {
  return figure(CIRCLE, text("Circle with centre O and diameter d.", "Bulatan berpusat O dengan diameter d."), {
    circles: [{ centre: O, radius: R }],
    paths: [{ points: [LEFT, RIGHT] }],
    dots: [O],
    labels: [label(122, 65, "d"), label(90, 90, "O")],
  }, { scaleNote: false, panelTitle: NO_CAPTION });
}

function radiusAndDiameter(): MathGeometryVisual {
  return figure(CIRCLE, text("Shaded circle with centre O, radius r and diameter d.", "Bulatan berlorek berpusat O, jejari r dan diameter d."), {
    circles: [{ centre: O, radius: R, fill: "shade" }],
    paths: [{ points: [O, TOP] }, { points: [LEFT, RIGHT] }],
    dots: [O],
    labels: [label(96, 42, "r", "start"), label(58, 65, "d"), label(84, 88, "O", "end")],
  }, { scaleNote: false, panelTitle: NO_CAPTION });
}

/** Two concentric circles of radius r and 2r: compare circumference or area. */
function doubledRadius(shaded: boolean): MathGeometryVisual {
  const inner = R / 2;
  return figure(
    text("Radius r and radius 2r", "Jejari r dan jejari 2r"),
    text("Two circles with the same centre O: the inner radius is r and the outer radius is 2r.", "Dua bulatan sepusat O: jejari dalam r dan jejari luar 2r."),
    {
      circles: shaded
        ? [{ centre: O, radius: R }, { centre: O, radius: inner, fill: "shade" }]
        : [{ centre: O, radius: R, fill: "none" }, { centre: O, radius: inner, fill: "none" }],
      paths: [{ points: [O, [O[0] + inner, O[1]]] }, { points: [O, TOP], dashed: true }],
      dots: [O],
      labels: [label(105, 66, "r"), label(96, 30, "2r", "start"), centre.label],
    },
    { scaleNote: false, panelTitle: NO_CAPTION },
  );
}

// ── Measured diagrams (practice and challenge) ──────────────────────────────

type Unit = "cm" | "mm" | "m";
type Shape = "circle" | "plate" | "wheel" | "mat" | "sign";

const SHAPE_TITLE: Record<Shape, LocalizedText> = {
  circle: CIRCLE,
  plate: text("Circular plate", "Pinggan bulat"),
  wheel: text("Wheel", "Roda"),
  mat: text("Circular mat", "Tikar bulat"),
  sign: text("Circular sign", "Papan tanda bulat"),
};

/** Radius given (drawn up from O); the asked-for quantity labelled beneath. */
function givenRadius(r: number, unit: Unit, asked: "d" | "C" | "A", shape: Shape = "circle"): MathGeometryVisual {
  const radius = radiusUp(`${r} ${unit}`);
  const diameter = diameterAcross(null, true);
  const shaded = asked === "A";
  return figure(
    SHAPE_TITLE[shape],
    text(
      `${shaded ? "Shaded circle" : "Circle"} with centre O and radius ${r} ${unit}${asked === "d" ? "; the dashed diameter d is unknown" : ""}.`,
      `${shaded ? "Bulatan berlorek" : "Bulatan"} berpusat O dengan jejari ${r} ${unit}${asked === "d" ? "; diameter d yang bergaris putus tidak diketahui" : ""}.`,
    ),
    {
      circles: [{ centre: O, radius: R, ...(shaded ? { fill: "shade" as const } : asked === "C" ? { fill: "none" as const } : {}) }],
      paths: asked === "d" ? [radius.path, diameter.path] : [radius.path],
      dots: [O],
      labels: [radius.label, centre.label, below(`${asked} = ?`)],
    },
    { panelTitle: shape === "circle" ? NO_CAPTION : SHAPE_TITLE[shape] },
  );
}

/** Diameter given (drawn across O); radius, circumference or area asked. */
function givenDiameter(d: number, unit: Unit, asked: "r" | "edge" | "C" | "A", shape: Shape = "circle"): MathGeometryVisual {
  const diameter = diameterAcross(`${d} ${unit}`);
  const wantsRadius = asked === "r" || asked === "edge";
  const radius = radiusUp(asked === "r" ? "r = ?" : "?", true);
  const shaded = asked === "A";
  const circles: Panel["circles"] = [
    { centre: O, radius: R, ...(shaded ? { fill: "shade" as const } : asked === "C" ? { fill: "none" as const } : {}) },
  ];
  if (shape === "wheel") circles.push({ centre: O, radius: 7, fill: "none" });
  return figure(
    SHAPE_TITLE[shape],
    text(
      `${shaded ? "Shaded circle" : "Circle"} with centre O and diameter ${d} ${unit}${wantsRadius ? "; the dashed line from O to the edge is unknown" : ""}.`,
      `${shaded ? "Bulatan berlorek" : "Bulatan"} berpusat O dengan diameter ${d} ${unit}${wantsRadius ? "; garis putus dari O ke tepi tidak diketahui" : ""}.`,
    ),
    {
      circles,
      paths: wantsRadius ? [diameter.path, radius.path] : [diameter.path],
      dots: [O],
      labels: [
        diameter.label!,
        ...(wantsRadius ? [radius.label] : []),
        label(84, 88, "O", "end"),
        ...(wantsRadius ? [] : [below(`${asked} = ?`)]),
      ],
    },
    { panelTitle: shape === "circle" ? NO_CAPTION : SHAPE_TITLE[shape] },
  );
}

/** One lap of a circular path: the traced arc starts at the marked point. */
function runningPath(r: number): MathGeometryVisual {
  const title = text("Circular running path", "Laluan larian bulat");
  const lap = R + 7;
  // Chevron at the end of the lap arc, pointing along the direction of travel.
  const end = 240, t = (end * Math.PI) / 180;
  const [px, py] = at(end, lap);
  const along = [-Math.sin(t), Math.cos(t)], out = [Math.cos(t), Math.sin(t)];
  const chevron: GeometryPoint[] = [
    [round(px - along[0] * 6 + out[0] * 4), round(py - along[1] * 6 + out[1] * 4)],
    [px, py],
    [round(px - along[0] * 6 - out[0] * 4), round(py - along[1] * 6 - out[1] * 4)],
  ];
  return figure(
    title,
    text(`Circular path with centre O and radius ${r} m; one lap starts at the marked point.`, `Laluan bulat berpusat O dengan jejari ${r} m; satu pusingan bermula di titik bertanda.`),
    {
      circles: [{ centre: O, radius: R, fill: "none" }],
      arcs: [{ centre: O, radius: lap, start: -90, end }],
      paths: [{ points: [O, RIGHT] }, { points: chevron }],
      dots: [O, TOP],
      labels: [label(122, 65, `${r} m`), label(84, 88, "O", "end"), below(text("1 lap = ?", "1 pusingan = ?"))],
    },
  );
}

/** Circular garden with a central pond; the shaded ring is the planting area. */
function gardenWithPond(r: number, pond: number): MathGeometryVisual {
  const inner = 30;
  return figure(
    text("Circular garden with pond", "Taman bulat dengan kolam"),
    text(
      `Garden of radius ${r} m with a circular pond of radius ${pond} m at its centre O; the shaded ring is the planting area.`,
      `Taman berjejari ${r} m dengan kolam bulat berjejari ${pond} m di pusat O; gelang berlorek ialah kawasan tanaman.`,
    ),
    {
      rings: [{ centre: O, outer: R, inner }],
      circles: [{ centre: O, radius: R, fill: "none" }, { centre: O, radius: inner, fill: "none", tone: "accent" }],
      // The ring is too narrow for a label, so the garden radius runs up to the
      // right and is labelled just beyond the circle, textbook style.
      paths: [{ points: [O, at(-40)] }, { points: [O, [O[0] - inner, O[1]]] }],
      dots: [O],
      labels: [label(140, 28, `${r} m`, "start"), label(78, 86, `${pond} m`), label(97, 87, "O", "start")],
    },
  );
}

// ── Bank index → diagram ────────────────────────────────────────────────────

const ENTRIES: Array<[number, MathGeometryVisual]> = [
  // 5.1 concepts
  [0, namedPart("radius")],
  [1, namedPart("diameter")],
  [2, namedPart("chord")],
  [3, namedPart("arc")],
  // 5.1 practice: radius ↔ diameter
  ...([[4, 3], [7, 6], [10, 9], [13, 14]] as const).map(([i, r]) => [i, givenRadius(r, "cm", "d")] as [number, MathGeometryVisual]),
  ...([[5, 8], [8, 14], [11, 20], [14, 30]] as const).map(([i, d]) => [i, givenDiameter(d, "mm", "r")] as [number, MathGeometryVisual]),
  ...([[6, 10], [9, 16], [12, 24]] as const).map(([i, d]) => [i, givenDiameter(d, "cm", "edge", "plate")] as [number, MathGeometryVisual]),
  // 5.1 challenge: circular signs
  ...([5, 7, 9, 11, 13] as const).map((r, k) => [15 + k, givenRadius(r, "cm", "d", "sign")] as [number, MathGeometryVisual]),
  // 5.2 concepts
  [20, aroundCircle()],
  [21, letteredRadius(false)],
  [22, letteredDiameter()],
  [23, doubledRadius(false)],
  // 5.2 practice: circumference from radius, or of a wheel from its diameter
  ...([[24, 3], [26, 5], [28, 7], [30, 9], [32, 11], [34, 14]] as const).map(([i, r]) => [i, givenRadius(r, "cm", "C")] as [number, MathGeometryVisual]),
  ...([[25, 8], [27, 12], [29, 16], [31, 20], [33, 24]] as const).map(([i, d]) => [i, givenDiameter(d, "cm", "C", "wheel")] as [number, MathGeometryVisual]),
  // 5.2 challenge: laps of a circular path
  ...([3, 4, 5, 6, 7] as const).map((r, k) => [35 + k, runningPath(r)] as [number, MathGeometryVisual]),
  // 5.3 concepts (#42, on units, has no useful diagram)
  [40, letteredRadius(true)],
  [41, radiusAndDiameter()],
  [43, doubledRadius(true)],
  // 5.3 practice: area from radius, or of a mat from its diameter
  ...([[44, 2], [46, 4], [48, 6], [50, 8], [52, 10], [54, 14]] as const).map(([i, r]) => [i, givenRadius(r, "cm", "A")] as [number, MathGeometryVisual]),
  ...([[45, 6], [47, 10], [49, 14], [51, 18], [53, 24]] as const).map(([i, d]) => [i, givenDiameter(d, "cm", "A", "mat")] as [number, MathGeometryVisual]),
  // 5.3 challenge: garden with a pond
  ...([3, 4, 5, 6, 7] as const).map((r, k) => [55 + k, gardenWithPond(r, 1)] as [number, MathGeometryVisual]),
];

export const MATH_F2_C5_VISUALS: ReadonlyMap<number, MathGeometryVisual> = new Map(ENTRIES);
