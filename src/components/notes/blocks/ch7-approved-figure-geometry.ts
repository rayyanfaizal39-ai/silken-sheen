import type { SpotlightShape } from "./spotlight-shapes";

/**
 * Overlay geometry for the three approved Chapter 7 photographs — the
 * electroscope, lightning formation, and the electromagnet-strength
 * investigation apparatus.
 *
 * The artwork is language-neutral: not one of the three carries a baked-in
 * word, so BM and DLP render the SAME WebP file and every label, caption and
 * explanation comes from chapter content. That only holds if the geometry is
 * shared too — a hotspot authored twice is a hotspot that eventually drifts
 * between the two languages — so every coordinate lives here, once.
 *
 * Two coordinate spaces are used, each matching the component that consumes it:
 *
 *  - **Percentages of the artwork (0-100)**, for `spotlight` shapes handed to
 *    `SpotlightOverlay` / `AnnotatedImage`. `x` is a share of the width and `y`
 *    a share of the height, measured independently, so a shape tracks its
 *    structure at every rendered width — phone, desktop, and inside the
 *    enlarge overlay — with no pixel maths and no resize listener.
 *  - **The artwork's own pixel space**, for the generated teaching layer drawn
 *    over the investigation apparatus (coil turns, field cue, attracted pins).
 *    The overlay `<svg>` carries that size as its `viewBox` and is stretched
 *    over the same box as the `<img>`, so raster and overlay scale as one.
 *
 * Nothing here is a fixed page-level position, and nothing here is language
 * dependent.
 */

// ---------------------------------------------------------------------------
// 1. Electroscope — three panels of one photograph
// ---------------------------------------------------------------------------

/** 1672 x 941. */
export const ELECTROSCOPE_ART_ASPECT = "16 / 9";

/**
 * The artwork is a triptych: a neutral electroscope, a positively charged rod
 * touching the metal cap while electrons leave the electroscope, and the
 * electroscope left positively charged with its gold leaf diverged. The
 * dividers sit at roughly 31.5% and 67.6% of the width, so each stage gets the
 * panel it actually occupies rather than an even third.
 *
 * Keyed by the stage ids Chapter 7 already uses (`uncharged` / `charged` /
 * `diverged`), so content supplies the words and this supplies the region.
 */
export const ELECTROSCOPE_PANELS: Record<string, SpotlightShape[]> = {
  uncharged: [
    { id: "electroscope-neutral", kind: "rect", x: 0.6, y: 1.5, w: 30.2, h: 97, rx: 1.5 },
  ],
  // Wide enough to reach the far end of the charged rod, which runs up to the
  // panel's own right-hand edge — clipping its tip would cut the "+" charges
  // that are the reason the panel exists.
  charged: [
    { id: "electroscope-charging", kind: "rect", x: 32.2, y: 1.5, w: 35.2, h: 97, rx: 1.5 },
  ],
  diverged: [
    { id: "electroscope-diverged", kind: "rect", x: 68.5, y: 1.5, w: 30.9, h: 97, rx: 1.5 },
  ],
};

/**
 * Peer panels, so the two that are not selected must stay readable rather than
 * disappear — the comparison between the three is half the teaching. Well
 * below `SpotlightOverlay`'s 0.78 near-blackout default.
 */
export const ELECTROSCOPE_DIM_OPACITY = 0.45;

// ---------------------------------------------------------------------------
// 2. Lightning formation — four stages of one scene
// ---------------------------------------------------------------------------

/** 1536 x 1024. */
export const LIGHTNING_ART_ASPECT = "3 / 2";

/**
 * The four stages the scene depicts, in the order lightning actually forms.
 * Each highlights the part of the picture its own sentence is about:
 *
 *  - `friction` — the airflow arrows sweeping past the cloud on both sides.
 *    Friction is between the cloud and the SURROUNDING AIR, so it is the air
 *    that is lit up, not a second cloud.
 *  - `separation` — two bands rather than the individual charge glyphs, because
 *    the point being taught is that the UPPER PART of the cloud is positive
 *    while the LOWER PART is negative; lighting up the regions says that, where
 *    lighting up nine circles would only say "here are some charges".
 *  - `induced` — the row of positive charges on the ground under the cloud.
 *  - `discharge` — the bolt itself, traced as a polygon wide enough to take in
 *    its branches without swallowing the sky around them.
 */
export const LIGHTNING_STAGES: Record<string, SpotlightShape[]> = {
  friction: [
    { id: "lightning-airflow-left", kind: "rect", x: 0, y: 8, w: 25.5, h: 37, rx: 2 },
    { id: "lightning-airflow-right", kind: "rect", x: 74.5, y: 8, w: 25.5, h: 37, rx: 2 },
  ],
  separation: [
    { id: "lightning-upper-cloud", kind: "rect", x: 30, y: 7, w: 40, h: 22.5, rx: 3 },
    { id: "lightning-lower-cloud", kind: "rect", x: 24.5, y: 34, w: 51, h: 16.5, rx: 3 },
  ],
  induced: [{ id: "lightning-ground", kind: "rect", x: 29.5, y: 83.5, w: 41, h: 9.5, rx: 3 }],
  discharge: [
    {
      id: "lightning-bolt",
      kind: "polygon",
      // Narrow at the strike point so the row of induced ground charges either
      // side of it stays outside the bolt's own highlight.
      points: "46,46 55,46 58,58 62,68 60,78 53,90 48,90 41,78 38,68 42,58",
    },
  ],
};

/**
 * One night scene rather than a set of panels, but its unselected parts still
 * carry the context that makes the selected part make sense — the cloud has to
 * stay visible while the ground charge is lit. Lighter than the near-blackout
 * default, heavier than the electroscope's peer-panel value.
 */
export const LIGHTNING_DIM_OPACITY = 0.55;

// ---------------------------------------------------------------------------
// 3. Electromagnet-strength investigation apparatus
// ---------------------------------------------------------------------------

/** The artwork's intrinsic size. Every pixel coordinate below lives in this space. */
export const ELECTROMAGNET_ART = { width: 1672, height: 941 } as const;
export const ELECTROMAGNET_ART_ASPECT = "16 / 9";

/**
 * Where each named piece of apparatus sits on the photograph, keyed by the part
 * ids Chapter 7's `apparatusDiagram` already uses. The labels and the one-line
 * roles stay in chapter content, in the reader's own language; this only says
 * WHERE each one is, so selecting a part lights up the real thing rather than
 * adding a second, competing label set to a finished picture.
 *
 * The retort stand is four shapes, not one box: its pole, base, horizontal arm
 * and the clamp collar gripping the iron core are in four different places, and
 * one rectangle around all of them would cover most of the right-hand half of
 * the picture — including the coil and the Petri dish it is meant to be
 * distinguished from.
 */
export const ELECTROMAGNET_PARTS: Record<string, SpotlightShape[]> = {
  supply: [{ id: "em-supply", kind: "rect", x: 1.6, y: 32, w: 21.2, h: 29.5, rx: 1.5 }],
  switch: [{ id: "em-switch", kind: "rect", x: 23.6, y: 47, w: 11.4, h: 15.5, rx: 1.5 }],
  ammeter: [{ id: "em-ammeter", kind: "rect", x: 36.2, y: 40, w: 11.6, h: 22, rx: 1.5 }],
  rheostat: [{ id: "em-rheostat", kind: "rect", x: 52.6, y: 39, w: 19.2, h: 23.5, rx: 1.5 }],
  coil: [{ id: "em-coil", kind: "rect", x: 78.7, y: 36.8, w: 6.1, h: 23, rx: 1.5 }],
  rod: [{ id: "em-rod", kind: "rect", x: 79.8, y: 14.5, w: 3.9, h: 53, rx: 1.5 }],
  pins: [{ id: "em-pins", kind: "ellipse", cx: 81, cy: 77.6, rx: 9.2, ry: 7.4 }],
  stand: [
    { id: "em-stand-pole", kind: "rect", x: 92.2, y: 0, w: 3, h: 66, rx: 1 },
    { id: "em-stand-base", kind: "rect", x: 85, y: 61, w: 12, h: 13.5, rx: 1 },
    { id: "em-stand-arm", kind: "rect", x: 83.5, y: 24.2, w: 13.6, h: 6.8, rx: 1 },
    { id: "em-stand-collar", kind: "rect", x: 78.4, y: 24.5, w: 6.5, h: 8.6, rx: 1 },
  ],
};

/**
 * Enough to make one part unmistakable while leaving the rest of the circuit
 * legible — a learner picking out the ammeter still needs to see that it sits
 * on the same loop as the coil.
 */
export const ELECTROMAGNET_DIM_OPACITY = 0.62;

/**
 * The iron core, in the artwork's own pixel space: the generated teaching layer
 * hangs off it, so the coil band, field cue and attracted pins are all measured
 * from these four numbers rather than each carrying its own copy.
 */
export const ELECTROMAGNET_CORE = {
  /** Centre line of the rod. */
  x: 1366,
  left: 1334,
  right: 1400,
  /** Lower end of the rod, where pins collect. */
  bottomY: 626,
  /** The band the copper coil occupies. */
  coilTopY: 353,
  coilBottomY: 560,
  /** Outer edges of the coil, wider than the rod it is wound around. */
  coilLeft: 1318,
  coilRight: 1412,
} as const;

/** The five tested values every part of this investigation steps through. */
export const ELECTROMAGNET_STEPS = 5;

/**
 * How many turns the coil overlay draws at each step of the coil-turn
 * investigation. These are the investigation's own manipulated values (10, 20,
 * 30, 40, 50 turns), drawn honestly rather than stylised: the overlay's job is
 * to make "more turns" something a learner watches happen.
 */
export const COIL_TURNS_BY_STEP = [10, 20, 30, 40, 50] as const;

/** Turns held constant while CURRENT is the manipulated variable. */
export const COIL_TURNS_CONTROLLED = 10;

/**
 * One turn of the coil overlay, as a foreshortened ellipse on the rod. Wound
 * wire reads as a stack of ellipses rather than a spiral because the artwork
 * itself is drawn that way, and matching it keeps the overlay from looking
 * like a different object bolted on.
 */
export type CoilTurn = { cy: number; ry: number };

/**
 * Lays `turns` loops evenly down the coil band. Pitch — and therefore the
 * stroke each loop can carry without merging into its neighbours — falls out of
 * the count, so 50 turns genuinely reads as denser wire than 10 rather than as
 * the same drawing with a number changed beside it.
 */
export function coilTurnLayout(turns: number): { turns: CoilTurn[]; strokeWidth: number } {
  const { coilTopY, coilBottomY } = ELECTROMAGNET_CORE;
  const band = coilBottomY - coilTopY;
  const pitch = band / turns;
  // Each loop is drawn slightly taller than its own pitch so consecutive loops
  // touch, the way real wound wire does, at every density.
  const ry = Math.max(2.2, pitch * 0.62);
  const strokeWidth = Math.min(7.5, Math.max(2.4, pitch * 0.42));
  return {
    turns: Array.from({ length: turns }, (_, index) => ({
      cy: coilTopY + pitch * (index + 0.5),
      ry,
    })),
    strokeWidth,
  };
}

/**
 * One pin clinging to the magnetised core: where it touches the iron and which
 * way it hangs, in artwork pixels and degrees (0 = pointing right, 90 = down).
 */
export type AttractedPin = { id: string; x: number; y: number; deg: number };

/**
 * Every slot a pin can occupy, in the order they fill.
 *
 * All of them touch the BARE IRON below the coil, or the core's lower end
 * itself — never the copper winding. Pins are attracted to the magnetised iron,
 * and a pin drawn hanging off the wire would teach the wrong thing however good
 * it looked.
 *
 * The order matters more than the positions: a stronger field must never look
 * like a rearrangement of the same pins, so each step KEEPS every pin the step
 * below it drew and adds new ones — further up the exposed core and splayed
 * further out from the tip. That is the qualitative claim the investigation
 * actually supports — a stronger electromagnet attracts more pins — and it is
 * the only claim this layer makes. No step is labelled with a count, because
 * the source gives no pin dataset to label it with.
 */
const PIN_SLOTS: AttractedPin[] = [
  { id: "pin-tip-a", x: 1358, y: 626, deg: 100 },
  { id: "pin-tip-b", x: 1374, y: 626, deg: 80 },
  { id: "pin-tip-left", x: 1340, y: 620, deg: 124 },
  { id: "pin-tip-right", x: 1392, y: 620, deg: 56 },
  { id: "pin-low-left", x: 1334, y: 608, deg: 142 },
  { id: "pin-low-right", x: 1400, y: 608, deg: 38 },
  { id: "pin-tip-centre", x: 1366, y: 628, deg: 90 },
  { id: "pin-mid-left", x: 1334, y: 594, deg: 156 },
  { id: "pin-mid-right", x: 1400, y: 594, deg: 24 },
  { id: "pin-tip-outer-left", x: 1348, y: 626, deg: 110 },
  { id: "pin-tip-outer-right", x: 1384, y: 626, deg: 70 },
  { id: "pin-high-left", x: 1334, y: 580, deg: 166 },
];

/** How many of the slots are filled at each of the five steps. */
const PINS_BY_STEP = [2, 4, 6, 9, 12] as const;

/** The pins clinging to the core at `step` (0-4), weakest field to strongest. */
export function attractedPins(step: number): AttractedPin[] {
  const clamped = Math.min(PINS_BY_STEP.length - 1, Math.max(0, step));
  return PIN_SLOTS.slice(0, PINS_BY_STEP[clamped]);
}

/** Length and head size of a drawn pin, in artwork pixels. */
export const PIN_SHAPE = { length: 52, headRadius: 7 } as const;

/**
 * The field cue: nested arcs around the core's lower end, one more (and one
 * brighter) per step. Secondary to the pins — the responding variable is the
 * number of pins attracted, so the pins have to be what a learner watches —
 * but a field that visibly strengthens is what makes the extra pins read as a
 * consequence rather than a coincidence.
 */
export function fieldCueRings(step: number): { r: number; opacity: number }[] {
  const clamped = Math.min(ELECTROMAGNET_STEPS - 1, Math.max(0, step));
  const count = clamped + 2;
  return Array.from({ length: count }, (_, index) => ({
    r: 58 + index * 32,
    // A stronger field is both wider AND brighter, so the cue does not rely on
    // counting rings alone.
    opacity: (0.44 + clamped * 0.1) * (1 - index / (count + 1.4)),
  }));
}
