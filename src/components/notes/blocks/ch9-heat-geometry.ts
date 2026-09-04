/**
 * Deterministic overlay geometry for the Chapter 9 (Heat) scenes.
 *
 * Chapter 9's artwork was already approved and must not be regenerated, so the
 * teaching layer is drawn over it instead: airflow on the coastline photographs,
 * a convection loop and radiation path on the kitchen scene, a bending strip on
 * the fire-alarm apparatus, and absorption/emission arrows on the two cans.
 *
 * Every coordinate below is in the artwork's own pixel space (1672 x 941). The
 * overlay `<svg>` carries that as its `viewBox` and is stretched over the same
 * box as the `<img>`, so a coordinate here is a position on the picture at every
 * viewport — nothing is a desktop-only pixel position.
 *
 * The airflow directions in particular are derived from ONE fact per figure —
 * which side is warmer — rather than typed in per case, because "the sea breeze
 * and the land breeze ended up pointing the same way" is precisely the error a
 * hand-drawn version makes.
 */

/** Every Chapter 9 raster is this size, so one viewBox serves them all. */
export const CH9_ART = { width: 1672, height: 941 } as const;
export const CH9_ART_ASPECT = "16 / 9";

export type Arrow = { x1: number; y1: number; x2: number; y2: number };

/** SVG `rotate()` degrees for the direction of an arrow. */
export function arrowDeg(a: Arrow): number {
  return (Math.atan2(a.y2 - a.y1, a.x2 - a.x1) * 180) / Math.PI;
}

// ---------------------------------------------------------------------------
// Sea breeze / land breeze, drawn on the coastline photographs
// ---------------------------------------------------------------------------

/**
 * The coastline as both photographs frame it: open sea on the LEFT, beach and
 * land on the RIGHT, horizon a little under two thirds up.
 *
 * The old schematic put land on the left and sea on the right — the mirror of
 * the photographs it sat beside — which is why the two are merged here into one
 * figure instead of shown as a picture plus an unrelated diagram.
 */
export const COAST = {
  seaX: 400,
  landX: 1150,
  /** Height of the surface wind, below the horizon and over the shore. */
  surfaceY: 775,
  /**
   * Height of the return flow, high in clear sky — far enough above the tops
   * of the rising and sinking columns to leave room for the label that sits
   * on the warm one.
   */
  aloftY: 185,
  /** Vertical extent of the rising and sinking columns. */
  columnTop: 300,
  columnBottom: 715,
} as const;

export type BreezeFlow = {
  /** Surface wind, blowing from the cooler side to the warmer side. */
  surface: Arrow;
  /** Warm air rising over the warmer side. */
  rising: Arrow;
  /** Cooler air sinking over the cooler side. */
  sinking: Arrow;
  /** Return flow aloft, closing the circulation. */
  aloft: Arrow;
  /** x of the column the warm air rises up. */
  warmX: number;
  /** x of the column the cool air sinks down. */
  coolX: number;
};

/**
 * All four arrows of one breeze, derived from which side is warmer.
 *
 * Warm air rises over the warmer side; the surface wind blows from the cooler
 * side toward the warmer side to replace it; the flow returns aloft and sinks
 * over the cooler side. Deriving every arrow from `warmerSide` is what makes it
 * impossible for the day and night cases to end up pointing the same way.
 *
 * A breeze is named after where the wind comes FROM, so a sea breeze — warm land
 * during the day — blows sea to land at the surface, and a land breeze — warm
 * sea at night — blows land to sea.
 */
export function breezeFlow(warmerSide: "land" | "sea"): BreezeFlow {
  const { seaX, landX, surfaceY, aloftY, columnTop, columnBottom } = COAST;
  const warmX = warmerSide === "land" ? landX : seaX;
  const coolX = warmerSide === "land" ? seaX : landX;
  return {
    surface: { x1: coolX, y1: surfaceY, x2: warmX, y2: surfaceY },
    rising: { x1: warmX, y1: columnBottom, x2: warmX, y2: columnTop },
    sinking: { x1: coolX, y1: columnTop, x2: coolX, y2: columnBottom },
    aloft: { x1: warmX, y1: aloftY, x2: coolX, y2: aloftY },
    warmX,
    coolX,
  };
}

// ---------------------------------------------------------------------------
// Kitchen scene: convection inside the pan, radiation out to the hand
// ---------------------------------------------------------------------------

/** The pan, the burner and the raised hand, measured off the kitchen artwork. */
export const KITCHEN = {
  /** The body of the pan — where a cut-away convection loop belongs. */
  pan: { x: 528, y: 415, w: 508, h: 280 },
  /** The flame, directly under the middle of the pan. */
  flameX: 782,
  /** The palm of the raised hand, which the radiation reaches. */
  hand: { x: 1245, y: 560 },
} as const;

/**
 * One closed convection loop inside the pan: fluid heated over the flame rises
 * up the middle, spreads out at the surface, and sinks down the cooler sides.
 * Drawn as a single continuous path per side, because a current is a loop —
 * two unrelated arrows would not say that.
 */
export function convectionLoop(): { d: string; arrows: (Arrow & { key: string })[] } {
  const { pan, flameX } = KITCHEN;
  const top = pan.y + 26;
  const bottom = pan.y + pan.h - 26;
  const left = pan.x + 46;
  const right = pan.x + pan.w - 46;
  return {
    d:
      `M${flameX},${bottom} C${flameX},${top + 30} ${flameX},${top} ${flameX},${top} ` +
      `C${flameX - 90},${top} ${left},${top + 10} ${left},${(top + bottom) / 2} ` +
      `C${left},${bottom - 10} ${flameX - 90},${bottom} ${flameX},${bottom} ` +
      `C${flameX + 90},${bottom} ${right},${bottom - 10} ${right},${(top + bottom) / 2} ` +
      `C${right},${top + 10} ${flameX + 90},${top} ${flameX},${top}`,
    arrows: [
      // Rising up the middle, over the flame.
      { key: "rise", x1: flameX, y1: bottom - 40, x2: flameX, y2: top + 40 },
      // Sinking down each cooler side.
      { key: "sink-left", x1: left, y1: top + 60, x2: left, y2: bottom - 60 },
      { key: "sink-right", x1: right, y1: top + 60, x2: right, y2: bottom - 60 },
    ],
  };
}

/**
 * Radiation from the hot pan to the raised hand: straight, spreading rays with
 * nothing drawn between them. The empty space is the point — radiation needs no
 * medium, so putting particles in the gap would contradict the caption.
 */
export function radiationRays(): Arrow[] {
  const { pan, hand } = KITCHEN;
  const wallX = pan.x + pan.w;
  return [-92, 0, 92].map((spread) => ({
    x1: wallX + 8,
    y1: pan.y + pan.h / 2 + spread * 0.45,
    x2: hand.x - 30,
    y2: hand.y + spread,
  }));
}

// ---------------------------------------------------------------------------
// Bimetallic strip in the fire-alarm circuit
// ---------------------------------------------------------------------------

/**
 * The fire-alarm apparatus, measured off the artwork.
 *
 * The raster draws the strip straight, which is the room-temperature state; the
 * heated state is drawn over it. `mask` is the rectangle the baked strip
 * occupies, painted out in the heated state so the bent strip replaces it rather
 * than doubling it. It starts clear of the mounting block so the clamp survives.
 */
export const FIRE_ALARM = {
  /** Where the strip is bolted down — the bend pivots here. */
  pivotX: 492,
  /** The strip's free end when straight. */
  freeX: 1196,
  /** Top of the copper layer, the boundary between the metals, and the underside. */
  copperY: 232,
  seamY: 290,
  ironY: 333,
  /** The contact screw's knob: what the strip closes onto. */
  contact: { x: 1148, y: 366 },
  /** Flat navy the artwork uses behind the strip. */
  backdrop: "#193778",
  mask: { x: 488, y: 224, w: 716, h: 118 },
  /** The bell, and the circuit wire that only carries current once closed. */
  bell: { x: 1428, y: 640, r: 130 },
  cell: { x: 168, y: 600 },
} as const;

/** How far the free end drops when heated — just past the contact. */
const FIRE_ALARM_DROP = FIRE_ALARM.contact.y - FIRE_ALARM.ironY + 4;

/**
 * The two metal layers of the strip in one state.
 *
 * Copper expands faster than iron, so copper must lie on the OUTSIDE of the
 * bend — the longer arc — which puts it on top of a strip that bends downward.
 * Deriving both layers from one curve means the drawing cannot contradict that:
 * the layer named as the faster one is always the outer one.
 */
export function stripLayers(heated: boolean): { copper: string; iron: string; endY: number } {
  const { pivotX, freeX, copperY, seamY, ironY } = FIRE_ALARM;
  const drop = heated ? FIRE_ALARM_DROP : 0;
  const midX = pivotX + (freeX - pivotX) * 0.55;
  // One quadratic shared by both layers, offset to each metal's own thickness.
  const band = (top: number, bottom: number) =>
    `M${pivotX},${top} Q${midX},${top + drop * 0.32} ${freeX},${top + drop} ` +
    `L${freeX},${bottom + drop} Q${midX},${bottom + drop * 0.32} ${pivotX},${bottom} Z`;
  return {
    copper: band(copperY, seamY),
    iron: band(seamY, ironY),
    endY: ironY + drop,
  };
}

/** True when the strip's free end has reached the contact screw. */
export function contactClosed(heated: boolean): boolean {
  return stripLayers(heated).endY >= FIRE_ALARM.contact.y;
}

// ---------------------------------------------------------------------------
// Heat absorption and emission: matte black beside shiny silver
// ---------------------------------------------------------------------------

/** The two cans and the heat source between them, measured off the artwork. */
export const CANS = {
  dark: { x: 215, y: 300, w: 440, h: 435 },
  shiny: { x: 1020, y: 300, w: 430, h: 435 },
  source: { x: 830, y: 775 },
} as const;

/**
 * Exactly midway between the two facing surfaces.
 *
 * The incoming rays start here rather than at the heater's own centre,
 * because the two cans are not quite equidistant from it in the artwork and
 * the experiment's controlled variable is that both receive the SAME
 * radiation. Rays of visibly different lengths would quietly offer the wrong
 * reason for the result.
 */
const RAY_ORIGIN_X = (CANS.dark.x + CANS.dark.w + CANS.shiny.x) / 2;

export type SurfaceRay = Arrow & { key: string; strong: boolean };

/**
 * Radiation arriving at both cans, and what each surface does with it.
 *
 * The incoming rays are identical in number and length on both sides — the
 * experiment's controlled variable is that both cans receive the same radiation,
 * and a figure that drew more arrows arriving at the black can would be teaching
 * the wrong reason for the result. What differs is the outcome: three rays enter
 * the matte black surface, while the shiny one lets one in and turns two away.
 */
export function absorptionRays(): SurfaceRay[] {
  const { dark, shiny, source } = CANS;
  const offsets = [-70, 0, 70];
  const rays: SurfaceRay[] = [];
  // `dir` is the direction radiation travels from the source to that can.
  for (const [side, can, dir] of [
    ["dark", dark, -1],
    ["shiny", shiny, 1],
  ] as const) {
    // The face the radiation lands on is the one turned toward the source.
    const face = dir < 0 ? can.x + can.w : can.x;
    offsets.forEach((dy, i) => {
      const y = can.y + can.h * 0.55 + dy;
      // Incoming: the same three rays from the source to each can's near face.
      rays.push({
        key: `${side}-in-${i}`,
        x1: RAY_ORIGIN_X + dir * 96,
        y1: source.y - 40 + dy * 0.35,
        x2: face - dir * 10,
        y2: y,
        strong: true,
      });
      // Absorbed: continues into the can. The matte surface takes all three;
      // the shiny one takes only the middle ray and turns the others away.
      const absorbed = side === "dark" || dy === 0;
      rays.push({
        key: `${side}-${absorbed ? "abs" : "ref"}-${i}`,
        x1: face - dir * 6,
        y1: y,
        ...(absorbed
          ? { x2: face + dir * 92, y2: y }
          : { x2: face - dir * 118, y2: y - 130 }),
        strong: absorbed,
      });
    });
  }
  return rays;
}

/**
 * Radiation leaving each can once both are filled with the same hot water.
 * The matte black surface emits three strong rays, the shiny one a single weak
 * ray — the same ranking as absorption, which is the point the two modes make
 * together.
 */
export function emissionRays(): SurfaceRay[] {
  const { dark, shiny } = CANS;
  const rays: SurfaceRay[] = [];
  for (const [side, can, dir] of [
    ["dark", dark, -1],
    ["shiny", shiny, 1],
  ] as const) {
    // Rays leave through the OUTER face, away from the other can, so the two
    // sets never overlap in the middle of the picture.
    const face = dir < 0 ? can.x : can.x + can.w;
    const offsets = side === "dark" ? [-90, 0, 90] : [0];
    offsets.forEach((dy, i) => {
      rays.push({
        key: `${side}-out-${i}`,
        x1: face + dir * 10,
        y1: can.y + can.h * 0.5 + dy,
        x2: face + dir * (side === "dark" ? 175 : 105),
        y2: can.y + can.h * 0.5 + dy * 1.5,
        strong: side === "dark",
      });
    });
  }
  return rays;
}
