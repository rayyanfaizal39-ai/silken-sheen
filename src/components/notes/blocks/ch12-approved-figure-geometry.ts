import type { Ch12FigureId } from "@/content/form2/science/interactive-types";
import type { SpotlightShape } from "./spotlight-shapes";

/**
 * Overlay geometry for the three approved Chapter 12 figures — the solar
 * system overview, the eight-planet sheet, and the characteristics of Earth.
 *
 * Same contract as `ch13-approved-figure-geometry.ts`: the artwork carries no
 * words, so BM and DLP render the SAME WebP, and every coordinate lives here
 * once, keyed by the concept id content also uses.
 *
 * All three files are 1672 x 941. Coordinates are authored in those source
 * pixels — read straight off the artwork — and converted to the 0-100
 * percentages every overlay uses, so a region tracks its subject at every
 * rendered width.
 */

export const CH12_ART_WIDTH = 1672;
export const CH12_ART_HEIGHT = 941;

/** A clickable area on the artwork: centre and size, as percentages. */
export type Ch12HitArea = { x: number; y: number; w: number; h: number };

export type Ch12FigureGeometry = {
  /** Intrinsic aspect ratio. */
  aspect: string;
  /** How strongly everything outside the selected region dims, 0-1. */
  dim: number;
  /** The shapes each concept keeps bright, keyed by the id content uses. */
  regions: Record<string, SpotlightShape[]>;
  /**
   * The area that selects each concept when tapped on the artwork. Larger than
   * the drawn subject on purpose — tiny Mercury must not need a precise tap —
   * but never reaching into a neighbour's subject.
   */
  hitAreas: Record<string, Ch12HitArea>;
};

const round = (n: number) => Math.round(n * 100) / 100;
const clamp = (n: number, max: number) => Math.min(max, Math.max(0, n));
const pctX = (px: number) => round((clamp(px, CH12_ART_WIDTH) / CH12_ART_WIDTH) * 100);
const pctY = (px: number) => round((clamp(px, CH12_ART_HEIGHT) / CH12_ART_HEIGHT) * 100);

function circle(id: string, cx: number, cy: number, r: number): SpotlightShape {
  return {
    id,
    kind: "ellipse",
    cx: pctX(cx),
    cy: pctY(cy),
    rx: round((r / CH12_ART_WIDTH) * 100),
    ry: round((r / CH12_ART_HEIGHT) * 100),
  };
}

/**
 * A planet together with its tilted ring (Saturn, Uranus), as a polygon.
 * Traced in source pixels and only then converted, because a rotated SVG
 * ellipse would skew inside the stretched 0-100 overlay viewBox.
 */
function tilted(
  id: string,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  degrees: number,
): SpotlightShape {
  const t = (degrees * Math.PI) / 180;
  const steps = 36;
  const points = Array.from({ length: steps }, (_, i) => {
    const a = (i / steps) * 2 * Math.PI;
    const x = cx + rx * Math.cos(a) * Math.cos(t) - ry * Math.sin(a) * Math.sin(t);
    const y = cy + rx * Math.cos(a) * Math.sin(t) + ry * Math.sin(a) * Math.cos(t);
    return `${pctX(x)},${pctY(y)}`;
  }).join(" ");
  return { id, kind: "polygon", points };
}

function polygon(id: string, points: [number, number][]): SpotlightShape {
  return { id, kind: "polygon", points: points.map(([x, y]) => `${pctX(x)},${pctY(y)}`).join(" ") };
}

function hit(cx: number, cy: number, w: number, h: number): Ch12HitArea {
  return {
    x: pctX(cx),
    y: pctY(cy),
    w: round((w / CH12_ART_WIDTH) * 100),
    h: round((h / CH12_ART_HEIGHT) * 100),
  };
}

/**
 * `solar-system` — the Sun on the left edge and the planets in one row along
 * y ≈ 461, with the asteroid belt as a crescent of separate rocks between Mars
 * and Jupiter. Each planet's hit area is a vertical band reaching roughly
 * halfway to its neighbours. The belt's band starts exactly where Mars's ends
 * and covers the thick of the crescent, so neither can swallow a tap meant for
 * the other; the belt's thin arms curving back past Mars are one button away
 * beneath the picture.
 *
 * `eight-planets` — two rows of four: Mercury, Venus, Earth, Mars on top;
 * Jupiter, Saturn, Uranus, Neptune below. Hit areas tile each row.
 *
 * `earth-characteristics` — six circles around a central Earth: gravity top
 * left, water top right, the atmosphere's UV protection middle left, oxygen
 * middle right, sunlight for photosynthesis bottom left, suitable temperature
 * bottom right. Only the circles are selectable; the central Earth is context.
 */
export const CH12_FIGURE_GEOMETRY: Record<Ch12FigureId, Ch12FigureGeometry> = {
  "solar-system": {
    aspect: "1672 / 941",
    dim: 0.5,
    regions: {
      mercury: [circle("ch12-ss-mercury", 213, 461, 36)],
      venus: [circle("ch12-ss-venus", 320, 461, 56)],
      earth: [circle("ch12-ss-earth", 448, 461, 66)],
      mars: [circle("ch12-ss-mars", 575, 461, 51)],
      "asteroid-belt": [
        polygon("ch12-ss-asteroid-belt", [
          [560, 222],
          [645, 282],
          [715, 372],
          [752, 462],
          [735, 565],
          [668, 655],
          [565, 728],
          [478, 740],
          [548, 655],
          [622, 562],
          [650, 468],
          [628, 372],
          [568, 285],
        ]),
      ],
      jupiter: [circle("ch12-ss-jupiter", 893, 461, 132)],
      saturn: [tilted("ch12-ss-saturn", 1180, 462, 202, 88, -23)],
      uranus: [tilted("ch12-ss-uranus", 1415, 470, 108, 60, -66)],
      neptune: [circle("ch12-ss-neptune", 1580, 461, 70)],
    },
    hitAreas: {
      mercury: hit(213, 461, 110, 200),
      venus: hit(322, 461, 106, 220),
      earth: hit(448, 461, 140, 240),
      mars: hit(575, 461, 104, 200),
      "asteroid-belt": hit(694, 481, 128, 520),
      jupiter: hit(893, 461, 290, 300),
      saturn: hit(1180, 462, 330, 260),
      uranus: hit(1415, 470, 130, 260),
      neptune: hit(1578, 461, 180, 220),
    },
  },
  "eight-planets": {
    aspect: "1672 / 941",
    dim: 0.5,
    regions: {
      mercury: [circle("ch12-ep-mercury", 245, 250, 98)],
      venus: [circle("ch12-ep-venus", 627, 247, 138)],
      earth: [circle("ch12-ep-earth", 1033, 250, 144)],
      mars: [circle("ch12-ep-mars", 1435, 250, 120)],
      jupiter: [circle("ch12-ep-jupiter", 255, 618, 212)],
      saturn: [tilted("ch12-ep-saturn", 728, 632, 300, 152, -25)],
      uranus: [tilted("ch12-ep-uranus", 1128, 642, 192, 128, -59)],
      neptune: [circle("ch12-ep-neptune", 1478, 643, 134)],
    },
    hitAreas: {
      mercury: hit(245, 250, 400, 380),
      venus: hit(627, 250, 380, 400),
      earth: hit(1033, 250, 400, 400),
      mars: hit(1435, 250, 380, 400),
      jupiter: hit(255, 620, 440, 420),
      saturn: hit(727, 632, 540, 330),
      uranus: hit(1128, 642, 260, 360),
      neptune: hit(1478, 643, 320, 340),
    },
  },
  "earth-characteristics": {
    aspect: "1672 / 941",
    dim: 0.45,
    regions: {
      gravity: [circle("ch12-ec-gravity", 552, 165, 158)],
      water: [circle("ch12-ec-water", 1122, 165, 158)],
      oxygen: [circle("ch12-ec-oxygen", 1338, 437, 165)],
      sunlight: [circle("ch12-ec-sunlight", 538, 737, 160)],
      atmosphere: [circle("ch12-ec-atmosphere", 333, 433, 163)],
      temperature: [circle("ch12-ec-temperature", 1134, 740, 160)],
    },
    hitAreas: {
      gravity: hit(552, 165, 320, 320),
      water: hit(1122, 165, 320, 320),
      oxygen: hit(1338, 437, 330, 330),
      sunlight: hit(538, 737, 320, 320),
      atmosphere: hit(333, 433, 326, 326),
      temperature: hit(1134, 740, 320, 320),
    },
  },
};

/** The order each figure's concepts are taught in — also the order of its controls. */
export const CH12_FIGURE_ORDER: Record<Ch12FigureId, readonly string[]> = {
  "solar-system": [
    "mercury",
    "venus",
    "earth",
    "mars",
    "asteroid-belt",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
  ],
  "eight-planets": ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"],
  "earth-characteristics": ["gravity", "water", "oxygen", "sunlight", "atmosphere", "temperature"],
};
