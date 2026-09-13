import { useEffect, useMemo, useRef, useState } from "react";
import { MousePointerClick, Sparkles } from "lucide-react";
import type { ScienceInteractiveSection } from "@/content/form2/science/interactive-types";
import {
  CHAPTER8_IMAGES,
  chapter8ImageAspect,
  chapter8ImageSize,
  type Chapter8ImageKey,
} from "./chapter8-assets";
import { CHAPTER8_FIGURE_WIDTH, type Chapter8FigureVariant } from "./Chapter8PhotoFigure";

type Lang = "en" | "bm";
export type Chapter8FigureKind =
  | "types"
  | "action-reaction"
  | "effects"
  | "buoyancy"
  | "levers"
  | "pressure"
  | "atmosphere";

type Hotspot = {
  id: string;
  label: string;
  note: string;
  /** One short concrete example, shown under `note` — "types" only. */
  example?: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export const CHAPTER8_VISUAL_ASSETS: Record<Chapter8FigureKind, string> = {
  // The approved five-panel scene, which teaches all five effects together.
  // It replaced a four-panel scene that had no panel for the fifth.
  effects: CHAPTER8_IMAGES.effectsOfForce,
  buoyancy: CHAPTER8_IMAGES.buoyancy,
  levers: CHAPTER8_IMAGES.levers,
  pressure: CHAPTER8_IMAGES.pressure,
  // The approved six-panel scene, one panel per core force. It replaced artwork
  // that showed only four examples, one of them magnetic force — which is
  // enrichment here, not one of the six.
  types: CHAPTER8_IMAGES.typesOfForces,
  // The approved triptych, showing the three situations this section teaches.
  // It replaced the palms-touching photograph, which showed one unnamed contact
  // pair and none of the three.
  "action-reaction": CHAPTER8_IMAGES.actionReactionPairs,
  atmosphere: CHAPTER8_IMAGES.atmosphere,
};

/** Which artwork each figure kind draws, so sizing and aspect follow the file. */
export const CHAPTER8_FIGURE_IMAGE_KEYS: Record<Chapter8FigureKind, Chapter8ImageKey> = {
  effects: "effectsOfForce",
  buoyancy: "buoyancy",
  levers: "levers",
  pressure: "pressure",
  types: "typesOfForces",
  "action-reaction": "actionReactionPairs",
  atmosphere: "atmosphere",
};

/**
 * Hit regions as percentages of the artwork, measured from the shipped images.
 *
 * Each asset is drawn with `object-contain` inside a frame that carries the
 * artwork's OWN ratio — 16:9 for the pack, 8:3 for the action–reaction triptych
 * — so there is no letterboxing and these percentages map straight onto the
 * rendered pixels at any width.
 *
 * The values hug the painted subject. They used to run ~88% of the frame height
 * on artwork whose panels only occupy ~65-73%, which is what made the selection
 * highlight look like a broken hitbox floating past the edge of the picture.
 */
export const CHAPTER8_HOTSPOT_GEOMETRY: Record<
  Chapter8FigureKind,
  Pick<Hotspot, "id" | "x" | "y" | "w" | "h">[]
> = {
  // Six portrait cards on science-f2-ch8-types-of-forces (1672x941), measured
  // off the shipped file: borders every 16.45% from x 1.1, y 17.1-81.0. One
  // panel per core force, in the chapter's own order — there is no magnetic
  // panel, because magnetic force is enrichment here rather than a core type.
  types: [
    { id: "gravitational", x: 8.9, y: 49.05, w: 15.6, h: 63.9 },
    { id: "weight", x: 25.25, y: 49.05, w: 15.5, h: 63.9 },
    { id: "normal", x: 41.6, y: 49.05, w: 15.8, h: 63.9 },
    { id: "frictional", x: 58.1, y: 49.05, w: 15.8, h: 63.9 },
    { id: "elastic", x: 74.55, y: 49.05, w: 15.7, h: 63.9 },
    { id: "buoyant", x: 91.15, y: 49.05, w: 15.7, h: 63.9 },
  ],
  // The three drawn panels of the triptych, measured on
  // science-f2-ch8-action-reaction-pairs (2048x768): borders at x 1.3-32.5,
  // 33.8-66.2 and 67.5-98.6, y 1.5-96.5.
  "action-reaction": [
    { id: "book", x: 16.9, y: 49, w: 31.2, h: 95 },
    { id: "floating", x: 50.0, y: 49, w: 32.4, h: 95 },
    { id: "trolleys", x: 83.05, y: 49, w: 31.1, h: 95 },
  ],
  // Five portrait cards on science-f2-ch8-effects-of-force (1672x941), measured
  // off the shipped file: borders every 19.6% from x 1.3, y 15.7-77.8. All five
  // effects are panels on one scene, so none of them is taught by words alone.
  effects: [
    { id: "moves", x: 10.8, y: 46.75, w: 19.0, h: 62.1 },
    { id: "stops", x: 30.5, y: 46.75, w: 19.0, h: 62.1 },
    { id: "speed", x: 50.1, y: 46.75, w: 18.8, h: 62.1 },
    { id: "direction", x: 69.6, y: 46.75, w: 19.0, h: 62.1 },
    { id: "shape", x: 89.2, y: 46.75, w: 19.0, h: 62.1 },
  ],
  // three landscape cards, y 17.9-82.4
  buoyancy: [
    { id: "boat", x: 17.6, y: 50.1, w: 32.3, h: 64.5 },
    { id: "jacket", x: 50.4, y: 50.1, w: 31.4, h: 64.5 },
    { id: "log-anchor", x: 83.5, y: 50.1, w: 32.1, h: 64.5 },
  ],
  levers: [
    { id: "first", x: 17.6, y: 50.1, w: 32.3, h: 64.5 },
    { id: "second", x: 50.4, y: 50.1, w: 31.4, h: 64.5 },
    { id: "third", x: 83.5, y: 50.1, w: 32.1, h: 64.5 },
  ],
  pressure: [
    { id: "heel", x: 25.7, y: 49.6, w: 46, h: 82 },
    { id: "shoe", x: 74.5, y: 49.6, w: 46, h: 82 },
  ],
  // measured on the hikers themselves — the summit box used to sit above the climber
  atmosphere: [
    { id: "foot", x: 21.6, y: 86.5, w: 13, h: 19 },
    { id: "summit", x: 57.9, y: 27.4, w: 11, h: 13 },
  ],
};

/**
 * Display width per figure. Multi-panel scenes get the wider cap because their
 * panels have to stay readable; single scenes are held narrower so the picture
 * does not dominate the lesson card.
 */
export const CHAPTER8_FIGURE_VARIANTS: Record<Chapter8FigureKind, Chapter8FigureVariant> = {
  // six and five panels respectively, so they need every pixel of width they
  // can have before their panels stop being readable
  types: "panorama",
  effects: "panorama",
  levers: "wide",
  buoyancy: "wide",
  pressure: "wide",
  // three situations side by side in an 8:3 frame — see CHAPTER8_FIGURE_WIDTH
  "action-reaction": "panorama",
  atmosphere: "single",
};

/**
 * Readability floors, per figure.
 *
 * A multi-panel scene squeezed onto a phone stops being legible long before it
 * stops fitting: six panels across 375px is about 58px each. So these figures
 * keep a minimum width and let their OWN wrapper scroll sideways instead of
 * shrinking further. The wrapper is the only thing that scrolls, so the page
 * never gains body-level overflow, nothing is ever cropped, and the selected
 * panel is scrolled into view so it can never be the one left off-screen.
 *
 * The floors are set so each panel lands near 110px wide: more panels, more
 * floor.
 */
const FIGURE_MIN_WIDTH: Partial<Record<Chapter8FigureKind, number>> = {
  types: 680,
  effects: 600,
  "action-reaction": 560,
};

/** Figures whose hit region really is a drawn panel, so a hairline edge reads as deliberate. */
const PANEL_KINDS = new Set<Chapter8FigureKind>([
  "types",
  "effects",
  "buoyancy",
  "levers",
  "pressure",
  "action-reaction",
]);

/** The panel order both approved scenes are painted in, left to right. */
export const TYPES_PANEL_ORDER = [
  "gravitational",
  "weight",
  "normal",
  "frictional",
  "elastic",
  "buoyant",
] as const;

export const EFFECTS_PANEL_ORDER = ["moves", "stops", "speed", "direction", "shape"] as const;

/**
 * One force vector drawn over a selected panel of the types-of-forces scene.
 *
 * Percentages of the frame, like every other overlay here, and always axis
 * aligned: this viewBox is stretched to the frame, so a diagonal vector would
 * be skewed and an SVG marker would be skewed with it. `opposing` colours the
 * vector differently — used for the one acting AGAINST the motion, so friction
 * reads as resistance rather than as a second push.
 *
 * No text is drawn. The force's name is the control label and the explanation
 * beneath it, both from chapter content in the reader's own language.
 */
export type ForceCue = { x1: number; y1: number; x2: number; y2: number; opposing?: boolean };

/**
 * The arrowhead for one cue, sized so it reads as roughly square once this
 * stretched viewBox is mapped onto a 16:9 frame (one x-unit is about 1.8
 * y-units there, hence the different half-widths).
 */
export function forceCueHead(cue: ForceCue): string {
  const { x1, y1, x2, y2 } = cue;
  if (x1 === x2) {
    const back = y2 > y1 ? y2 - 4 : y2 + 4;
    return `M${x2 - 1.9},${back} L${x2},${y2} L${x2 + 1.9},${back} Z`;
  }
  const back = x2 > x1 ? x2 - 1.3 : x2 + 1.3;
  return `M${back},${y2 - 4} L${x2},${y2} L${back},${y2 + 4} Z`;
}

/**
 * Which cue each force gets, keyed by the same ids as the panels.
 *
 * Only where a vector genuinely helps. Weight and normal force sit on adjacent
 * panels and are the pair learners most often conflate, so one points firmly
 * down into the ground and the other firmly up off the table — the opposite
 * senses are the whole distinction. Elastic force gets two inward vectors,
 * because a stretched band pulls back towards its unstretched length from both
 * ends; a single arrow would read as a push.
 */
export const TYPES_FORCE_CUES: Record<string, ForceCue[]> = {
  // the red ball falling toward the Earth
  gravitational: [{ x1: 8.4, y1: 41, x2: 8.4, y2: 55 }],
  // the rock's weight, acting down into the ground
  weight: [{ x1: 25.2, y1: 50, x2: 25.2, y2: 64 }],
  // the table pushing up on the book
  normal: [{ x1: 41.6, y1: 54, x2: 41.6, y2: 40 }],
  // the boy's push along the ground, and friction acting the other way
  frictional: [
    { x1: 56.5, y1: 64, x2: 63.5, y2: 64 },
    { x1: 62.0, y1: 71, x2: 55.0, y2: 71, opposing: true },
  ],
  // A stretched band pulls back towards its unstretched length, from both ends.
  // Set just below the band rather than on it: the band itself is yellow, and
  // the two vectors are separated by a clear gap so they read as a pair pulling
  // inward rather than as one smear across the middle.
  elastic: [
    { x1: 69.5, y1: 52, x2: 72.3, y2: 52 },
    { x1: 79.6, y1: 52, x2: 76.8, y2: 52 },
  ],
  // the water pushing up on the duck
  buoyant: [{ x1: 91.1, y1: 58, x2: 91.1, y2: 44 }],
};

/**
 * Figures where choosing a panel also dims its siblings.
 *
 * An outline alone is a colour-and-border signal; dimming the rest is what
 * actually makes the chosen panel read as the subject on a scene this wide. The
 * three-panel and multi-panel approved scenes all do it; the older figures are
 * left as the remediation set them.
 */
const DIMMING_KINDS = new Set<Chapter8FigureKind>(["types", "effects", "action-reaction"]);

/**
 * F / L / E marker positions, measured on 03_levers_everyday_life.png.
 *
 * Percentages of the artwork, so they stay pinned to the object at every width.
 * Second class is the one that must be unambiguous: the wheel is the fulcrum,
 * the tray contents are the load between it and the effort, and the effort is
 * where the hands grip the handles.
 */
export type LeverClassId = "first" | "second" | "third";
type LeverMarker = { t: "F" | "L" | "E"; x: number; y: number };

/**
 * The single source of truth for every visual part of a selected lever class.
 * A class id resolves to its contextual scene and to the exact F/L/E markers
 * drawn over that scene; the button, panel and explanation all consume this
 * same object below.
 */
export const CHAPTER8_LEVER_STATES: Record<
  LeverClassId,
  { id: LeverClassId; scene: "seesaw" | "wheelbarrow" | "fishing-rod"; markers: LeverMarker[] }
> = {
  first: {
    id: "first",
    scene: "seesaw",
    // pivot bolt centre; girl raised (load); boy pressing down (effort)
    markers: [
      { t: "F", x: 17.1, y: 59.5 },
      { t: "L", x: 8.3, y: 51.3 },
      { t: "E", x: 26.8, y: 62.0 },
    ],
  },
  second: {
    id: "second",
    scene: "wheelbarrow",
    // wheel axle, soil in the tray, hands on the handles
    markers: [
      { t: "F", x: 58.8, y: 70.8 },
      { t: "L", x: 54.5, y: 56.5 },
      { t: "E", x: 41.8, y: 48.5 },
    ],
  },
  third: {
    id: "third",
    scene: "fishing-rod",
    // existing validated interpretation: rod butt, forward hand, fish
    markers: [
      { t: "F", x: 73.4, y: 54.5 },
      { t: "E", x: 76.0, y: 47.5 },
      { t: "L", x: 93.8, y: 66.5 },
    ],
  },
};

export const CHAPTER8_LEVER_MARKERS: Record<string, LeverMarker[]> = {
  first: CHAPTER8_LEVER_STATES.first.markers,
  second: CHAPTER8_LEVER_STATES.second.markers,
  third: CHAPTER8_LEVER_STATES.third.markers,
};

function isLeverClassId(value: string | null): value is LeverClassId {
  return value === "first" || value === "second" || value === "third";
}

export type ActionReactionSituationId = "book" | "floating" | "trolleys";

/**
 * One force arrow drawn over the action–reaction triptych.
 *
 * The shaft lives in the artwork's own pixel space (2048x768). The frame takes
 * the artwork's 8:3 ratio rather than 16:9, so that space scales UNIFORMLY —
 * which is what lets the arrowheads stay round and lets two arrows be compared
 * as equal in length whatever the display width.
 *
 * The label does not: it is HTML positioned in percentages, for the same reason
 * the lever markers are. Text inside a scaled SVG shrinks with the picture, and
 * on a phone "Normal force" baked into this viewBox would render at about 9px.
 *
 * `id` names a force in chapter content — no label text is ever written here,
 * so one geometry serves BM and DLP.
 */
export type ActionReactionArrow = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  labelX: number;
  labelY: number;
};

/**
 * The force pair for each situation, as one list per situation so the two arrows
 * can only ever be drawn together: equal in length, opposite in direction.
 *
 * Book and floating block are vertical pairs whose tails meet at the object's
 * centre, with a small gap so they read as two vectors rather than one line.
 * The trolleys are a horizontal pair whose tails flank the spring and whose
 * heads point outwards over DIFFERENT trolleys — the one thing this situation
 * must not show is both arrows on the same trolley.
 *
 * Every pair is 190 units long on both sides. For the floating block that is
 * the whole point: at equilibrium the buoyant force EQUALS the weight, so
 * drawing the upward arrow longer would teach a sinking or rising object.
 */
export const ACTION_REACTION_SITUATIONS: Record<ActionReactionSituationId, ActionReactionArrow[]> =
  {
    // book centred on x 336; its top face is y 296 and the table slab y 392-449,
    // so the downward arrow lands in the open gap between the table legs
    book: [
      { id: "normal", x1: 336, y1: 350, x2: 336, y2: 160, labelX: 16.4, labelY: 15 },
      { id: "weight", x1: 336, y1: 372, x2: 336, y2: 562, labelX: 16.4, labelY: 80 },
    ],
    // block centred on x 1014, waterline y 296
    floating: [
      { id: "buoyant", x1: 1014, y1: 281, x2: 1014, y2: 91, labelX: 49.5, labelY: 7 },
      { id: "weight", x1: 1014, y1: 303, x2: 1014, y2: 493, labelX: 49.5, labelY: 71 },
    ],
    // spring spans x 1610-1733; blue trolley 1405-1600, red trolley 1743-1974
    trolleys: [
      { id: "reaction", x1: 1596, y1: 286, x2: 1406, y2: 286, labelX: 73.3, labelY: 30 },
      { id: "action", x1: 1747, y1: 286, x2: 1937, y2: 286, labelX: 90.7, labelY: 30 },
    ],
  };

/** Shaft length of an arrow, for the equal-magnitude assertions. */
export function actionReactionArrowLength(arrow: ActionReactionArrow): number {
  return Math.hypot(arrow.x2 - arrow.x1, arrow.y2 - arrow.y1);
}

export function isActionReactionSituationId(
  value: string | null,
): value is ActionReactionSituationId {
  return value === "book" || value === "floating" || value === "trolleys";
}

export const ATMOSPHERE_HAZE_GEOMETRY = {
  foot: { x: 21.6, top: 2, bottom: 78, width: 25 },
  summit: { x: 57.9, top: 2, bottom: 22, width: 17 },
} as const;

/** Panel bounds used to assert markers never spill into a neighbouring scene. */
export const CHAPTER8_LEVER_PANELS: Record<string, { x0: number; x1: number }> = {
  first: { x0: 1.5, x1: 33.8 },
  second: { x0: 34.7, x1: 66.1 },
  third: { x0: 67.5, x1: 99.6 },
};

/**
 * "Types of Forces" is the one figure with its own selector wording ("force"
 * instead of the generic "concept"/"scene") — every other kind keeps the
 * shared copy below. The figcaption instruction and the empty-state prompt
 * must never read as two competing instructions, so "types" gets one short
 * nudge rather than a second full sentence.
 */
function instructionFor(kind: Chapter8FigureKind, lang: Lang): string {
  if (kind === "types") {
    return lang === "bm"
      ? "Interaktif — Tekan daya untuk meneroka."
      : "Interactive — Tap a force to explore.";
  }
  return UI[lang].instruction;
}
function promptFor(kind: Chapter8FigureKind, lang: Lang): string {
  if (kind === "types") {
    return lang === "bm" ? "Tekan satu daya di atas." : "Tap a force above.";
  }
  return UI[lang].prompt;
}

const UI = {
  en: {
    instruction: "Interactive — Tap a concept to explore.",
    prompt: "Choose a scene to reveal the scientific relationship.",
    controls: "Concepts in the figure",
    alt: {
      types:
        "Six examples of force: gravitational force, weight, normal force, frictional force, elastic force and buoyant force.",
      "action-reaction":
        "Three force-pair situations: a book on a table, a floating wooden block, and two trolleys separated by a compressed spring.",
      effects:
        "Five effects of force: starting motion, stopping motion, changing speed, changing direction, and changing shape and size.",
      buoyancy: "A boat, a person in a life jacket, and a floating log above a sinking anchor.",
      levers: "A seesaw, wheelbarrow and fishing rod used as levers in everyday life.",
      pressure:
        "A high heel and a broad shoe pressing into the same ground with different contact areas.",
      atmosphere: "Two hikers at the foot and summit of a mountain, comparing the air above them.",
    },
    boat: "The boat floats while the water provides an upward buoyant force.",
    jacket: "The life jacket adds buoyant support and helps the person remain afloat.",
    anchor:
      "The log floats while the anchor sinks because floating or sinking depends on the balance of forces and density, not on mass alone.",
    heel: "Small contact area",
    shoe: "Large contact area",
    heelNote:
      "The narrow heel presses on a small contact area, so the same weight produces a greater pressure on the ground.",
    shoeNote:
      "The broad sole spreads the same weight over a large contact area, so the pressure on the ground is lower.",
  },
  bm: {
    instruction: "Interaktif — Tekan konsep untuk meneroka.",
    prompt: "Pilih satu situasi untuk melihat hubungan saintifiknya.",
    controls: "Konsep dalam rajah",
    alt: {
      types:
        "Enam contoh daya: daya graviti, berat, daya normal, daya geseran, daya kenyal dan daya apungan.",
      "action-reaction":
        "Tiga situasi pasangan daya: sebuah buku di atas meja, sebuah blok kayu yang terapung, dan dua troli yang dipisahkan oleh spring termampat.",
      effects:
        "Lima kesan daya: memulakan gerakan, menghentikan gerakan, mengubah kelajuan, mengubah arah, dan mengubah bentuk dan saiz.",
      buoyancy:
        "Sebuah bot, seorang memakai jaket keselamatan, dan kayu terapung di atas sauh yang tenggelam.",
      levers:
        "Jongkang-jongket, kereta sorong dan joran yang digunakan sebagai tuas dalam kehidupan harian.",
      pressure:
        "Kasut tumit tinggi dan kasut tapak lebar menekan tanah yang sama dengan luas sentuhan berbeza.",
      atmosphere: "Dua pendaki di kaki dan puncak gunung untuk membandingkan udara di atas mereka.",
    },
    boat: "Bot terapung apabila air mengenakan daya apungan ke atas.",
    jacket: "Jaket keselamatan menambah sokongan apungan dan membantu seseorang kekal terapung.",
    anchor:
      "Kayu terapung manakala sauh tenggelam kerana terapung atau tenggelam bergantung pada keseimbangan daya dan ketumpatan, bukan jisim semata-mata.",
    heel: "Luas sentuhan kecil",
    shoe: "Luas sentuhan besar",
    heelNote:
      "Tumit yang kecil menekan pada luas sentuhan yang kecil, jadi berat yang sama menghasilkan tekanan yang lebih besar pada tanah.",
    shoeNote:
      "Tapak yang lebar menyebarkan berat yang sama pada luas sentuhan yang besar, jadi tekanan pada tanah menjadi lebih rendah.",
  },
} as const;

/** Exported so the label/note wiring can be asserted without driving the UI. */
export function chapter8Concepts(
  kind: Chapter8FigureKind,
  section: ScienceInteractiveSection,
  lang: Lang,
): Hotspot[] {
  const copy = UI[lang];
  const geometry = CHAPTER8_HOTSPOT_GEOMETRY[kind];
  const withGeometry = (items: Omit<Hotspot, "x" | "y" | "w" | "h">[]) =>
    items.map((item) => ({ ...item, ...geometry.find((point) => point.id === item.id)! }));

  // One state per painted panel, read from the section's own cards so the label
  // and the definition exist once per language. Magnetic force is deliberately
  // absent: the artwork has no magnetic panel, and it is enrichment here rather
  // than one of the six core types. It stays as a note beneath the figure.
  if (kind === "types") {
    const byId = Object.fromEntries((section.flipCards ?? []).map((item) => [item.id, item]));
    return withGeometry(
      TYPES_PANEL_ORDER.map((id) => ({
        id,
        label: byId[id]?.label ?? id,
        note: byId[id]?.fact ?? "",
        example: byId[id]?.example ?? "",
      })),
    );
  }
  if (kind === "effects") {
    const byId = Object.fromEntries((section.flipCards ?? []).map((item) => [item.id, item]));
    return withGeometry(
      EFFECTS_PANEL_ORDER.map((id) => ({
        id,
        label: byId[id]?.label ?? id,
        note: byId[id]?.fact ?? "",
      })),
    );
  }
  if (kind === "action-reaction") {
    // One control per situation the artwork actually paints, read from the
    // section's own block so the labels and the one-sentence explanations exist
    // once per language. The accordions below keep their fuller treatment —
    // including the trolleys' equal-distance claim, which does not follow from
    // equal and opposite forces alone and so is not attached to this figure.
    return withGeometry(
      (section.actionReactionPairs?.situations ?? []).map((item) => ({
        id: item.id,
        label: item.label,
        note: item.note,
      })),
    );
  }
  if (kind === "buoyancy") {
    const block = section.buoyancySchematic!;
    return withGeometry([
      { id: "boat", label: lang === "bm" ? "Bot" : "Boat", note: copy.boat },
      {
        id: "jacket",
        label: lang === "bm" ? "Jaket keselamatan" : "Life jacket",
        note: copy.jacket,
      },
      {
        id: "log-anchor",
        label: lang === "bm" ? "Kayu dan sauh" : "Log and anchor",
        note: `${copy.anchor} ${block.sinkingNote}`,
      },
    ]);
  }
  if (kind === "levers") {
    return withGeometry(
      (section.leverClasses?.classes ?? []).map((item) => ({
        id: item.id,
        label: item.name,
        note: `${item.note} ${item.examples}`,
      })),
    );
  }
  if (kind === "pressure") {
    // The explanation describes the shoes the learner is actually looking at.
    // The section's own apparatus and investigation blocks stay below.
    return withGeometry([
      { id: "heel", label: copy.heel, note: copy.heelNote },
      { id: "shoe", label: copy.shoe, note: copy.shoeNote },
    ]);
  }
  const levels = section.altitudePressure?.levels ?? [];
  return withGeometry(levels.map((item) => ({ id: item.id, label: item.label, note: item.note })));
}

/**
 * The science drawn on top of the photograph once a concept is chosen.
 *
 * Every overlay uses `preserveAspectRatio="none"` so its 0-100 coordinates are
 * literally percentages of the frame. The lever markers are HTML rather than SVG
 * for the same reason: an SVG square viewBox inside a 16:9 box is letterboxed by
 * default, which is what threw the old F/L/E labels off their objects.
 */
function ScientificOverlay({ kind, active }: { kind: Chapter8FigureKind; active: string | null }) {
  if (!active) return null;

  if (kind === "pressure") {
    // Mark the ground contact itself: a short strip under the heel, a wide one
    // under the sole.
    const heel = active === "heel";
    return (
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <line
          data-contact={heel ? "small" : "large"}
          x1={heel ? 18.4 : 59.4}
          y1={heel ? 74.5 : 70.5}
          x2={heel ? 20.6 : 88.4}
          y2={heel ? 74.5 : 70.5}
          className="stroke-amber-300"
          strokeWidth={heel ? 2.6 : 3.4}
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (kind === "atmosphere") {
    // Soft, feathered atmospheric haze above the chosen hiker. The curved path,
    // transparent end stops and blur deliberately avoid any UI-container edge.
    const summit = active === "summit";
    const geometry = ATMOSPHERE_HAZE_GEOMETRY[summit ? "summit" : "foot"];
    const { x, top, bottom, width } = geometry;
    const hazePath = [
      `M ${x} ${top}`,
      `C ${x - width * 0.42} ${top + 7}, ${x - width * 0.5} ${bottom - 12}, ${x - width * 0.32} ${bottom}`,
      `C ${x - width * 0.12} ${bottom + 2}, ${x + width * 0.12} ${bottom + 2}, ${x + width * 0.32} ${bottom}`,
      `C ${x + width * 0.5} ${bottom - 12}, ${x + width * 0.42} ${top + 7}, ${x} ${top} Z`,
    ].join(" ");
    return (
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="ch8-air-haze"
            gradientUnits="userSpaceOnUse"
            x1={x}
            y1={top}
            x2={x}
            y2={bottom}
          >
            <stop offset="0%" stopColor="rgb(186,230,253)" stopOpacity="0" />
            <stop offset="24%" stopColor="rgb(224,242,254)" stopOpacity="0.28" />
            <stop offset="72%" stopColor="rgb(186,230,253)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="rgb(224,242,254)" stopOpacity="0.1" />
          </linearGradient>
          <filter id="ch8-air-feather" x="-45%" y="-15%" width="190%" height="130%">
            <feGaussianBlur stdDeviation="2.8" />
          </filter>
        </defs>
        <path
          data-air-haze={summit ? "summit" : "foot"}
          d={hazePath}
          fill="url(#ch8-air-haze)"
          filter="url(#ch8-air-feather)"
        />
      </svg>
    );
  }

  if (kind === "types") {
    const cues = active ? TYPES_FORCE_CUES[active] : undefined;
    if (!cues) return null;
    return (
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* Both class names are written out in full rather than composed, so
            Tailwind can actually see them. */}
        {cues.map((cue, index) => (
          <g key={index} data-force-cue={active} data-force-opposing={cue.opposing || undefined}>
            <path
              d={`M${cue.x1},${cue.y1} L${cue.x2},${cue.y2}`}
              fill="none"
              className={cue.opposing ? "stroke-rose-300" : "stroke-amber-300"}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d={forceCueHead(cue)}
              className={cue.opposing ? "fill-rose-300" : "fill-amber-300"}
            />
          </g>
        ))}
      </svg>
    );
  }

  return null;
}

/**
 * Every figure is a single raster drawn edge to edge.
 *
 * The action–reaction scene used to be composited from three copies of an older
 * separated-hands artwork, with two clipped halves slid inward to fake palms
 * meeting. It is now the approved three-situation triptych, a plain image like
 * every other figure here. `width`/`height` come from the file rather than being
 * assumed 16:9, so a panorama reserves a panorama-shaped box and nothing shifts
 * as it loads.
 */
function Chapter8Artwork({ kind, alt }: { kind: Chapter8FigureKind; alt: string }) {
  const size = chapter8ImageSize(CHAPTER8_FIGURE_IMAGE_KEYS[kind]);
  return (
    <img
      src={CHAPTER8_VISUAL_ASSETS[kind]}
      alt={alt}
      width={size.width}
      height={size.height}
      /* the section's primary teaching visual, so it is not deferred */
      loading="eager"
      decoding="async"
      className="absolute inset-0 h-full w-full object-contain"
    />
  );
}

/**
 * The two force arrows for the selected action–reaction situation.
 *
 * Shafts are SVG in the artwork's own 2048x768 space, scaled UNIFORMLY because
 * the frame carries the artwork's own ratio — which is what makes the pair
 * provably equal in length and keeps the arrowheads round. The labels are HTML
 * in percentages for the same reason the lever markers are: text inside a
 * scaled SVG shrinks with the picture, and on a phone these would be unreadable.
 *
 * No label text is written here. Each arrow's `id` names a force in the
 * section's own content, so one geometry serves BM and DLP.
 */
function ActionReactionForces({
  situation,
  forces,
}: {
  situation: ActionReactionSituationId;
  forces: { id: string; label: string }[];
}) {
  const arrows = ACTION_REACTION_SITUATIONS[situation];
  const size = chapter8ImageSize("actionReactionPairs");
  return (
    <>
      <svg
        viewBox={`0 0 ${size.width} ${size.height}`}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="ch8-pair-arrow"
            markerWidth="5"
            markerHeight="5"
            refX="3.8"
            refY="2.5"
            orient="auto"
          >
            <path d="M0,0 L5,2.5 L0,5 Z" className="fill-amber-300" />
          </marker>
        </defs>
        <g
          className="stroke-amber-300"
          strokeWidth="11"
          strokeLinecap="round"
          markerEnd="url(#ch8-pair-arrow)"
        >
          {arrows.map((arrow) => (
            <line
              key={arrow.id}
              data-arrow={arrow.id}
              data-arrow-situation={situation}
              x1={arrow.x1}
              y1={arrow.y1}
              x2={arrow.x2}
              y2={arrow.y2}
            />
          ))}
        </g>
      </svg>
      {arrows.map((arrow) => (
        <span
          key={arrow.id}
          data-arrow-label={arrow.id}
          aria-hidden="true"
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-amber-300/70 bg-slate-950/85 px-2 py-0.5 text-[10px] font-bold leading-none text-amber-100 shadow-[0_2px_8px_rgba(2,8,23,0.6)] sm:text-[12px]"
          style={{ left: `${arrow.labelX}%`, top: `${arrow.labelY}%` }}
        >
          {forces.find((force) => force.id === arrow.id)?.label ?? ""}
        </span>
      ))}
    </>
  );
}

/** F / L / E markers, positioned in percentages so they never drift off the object. */
function LeverMarkers({ state }: { state: (typeof CHAPTER8_LEVER_STATES)[LeverClassId] | null }) {
  if (!state) return null;
  return (
    <div
      className="pointer-events-none absolute inset-0"
      role="img"
      aria-label="F, L and E markers"
    >
      {state.markers.map((point) => (
        <span
          key={point.t}
          data-lever-marker={point.t}
          data-lever-class={state.id}
          /* 22px below sm: on the wheelbarrow the fulcrum and load markers are
             only ~31px apart at 390, so a 26px badge left almost no gap. */
          className="absolute flex h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300 bg-slate-950/90 text-[11px] font-extrabold leading-none text-white shadow-[0_2px_8px_rgba(2,8,23,0.55)] sm:h-7 sm:w-7 sm:text-sm"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
        >
          {point.t}
        </span>
      ))}
    </div>
  );
}

export function Chapter8ContextFigure({
  kind,
  section,
  lang,
  initialSelection = null,
}: {
  kind: Chapter8FigureKind;
  section: ScienceInteractiveSection;
  lang: Lang;
  initialSelection?: string | null;
}) {
  const [active, setActive] = useState<string | null>(initialSelection);
  const [cue, setCue] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setCue(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);
  const copy = UI[lang];
  const items = useMemo(() => chapter8Concepts(kind, section, lang), [kind, section, lang]);
  const leverState =
    kind === "levers" && isLeverClassId(active) ? CHAPTER8_LEVER_STATES[active] : null;
  const selected = items.find((item) => item.id === (leverState?.id ?? active)) ?? null;
  const selectedId = selected?.id ?? null;
  const selectedGeometry = selected;

  const imageKey = CHAPTER8_FIGURE_IMAGE_KEYS[kind];
  const aspect = chapter8ImageAspect(imageKey);
  /* A frame narrower than this stops carrying its own artwork legibly, so it
     keeps its width and scrolls inside its own wrapper instead. */
  const minWidth = FIGURE_MIN_WIDTH[kind];
  const situation = isActionReactionSituationId(selectedId) ? selectedId : null;
  const situationForces =
    (situation &&
      section.actionReactionPairs?.situations.find((item) => item.id === situation)?.forces) ||
    [];

  /* Keep the chosen situation on screen when the panorama is scrolling: picking
     a control must never highlight a panel the reader cannot see. */
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const wrapper = scrollRef.current;
    if (!wrapper || !selectedGeometry || !minWidth) return;
    const frame = wrapper.firstElementChild as HTMLElement | null;
    if (!frame) return;
    const centre = (frame.clientWidth * selectedGeometry.x) / 100;
    // Assigned, and deliberately NOT smoothed. Both
    // scrollTo({ behavior: "smooth" }) and a CSS `scroll-behavior: smooth` on
    // this wrapper are silently no-ops in some engines (and under
    // prefers-reduced-motion), which left the chosen panel off-screen — the one
    // thing this must never do. A plain assignment always lands.
    wrapper.scrollLeft = centre - wrapper.clientWidth / 2;
  }, [selectedGeometry, minWidth]);

  const frame = (
    <div
      className={`relative mx-auto w-full overflow-hidden rounded-2xl bg-slate-900 ${aspect ? "" : "aspect-video"}`}
      style={{
        maxWidth: `${CHAPTER8_FIGURE_WIDTH[CHAPTER8_FIGURE_VARIANTS[kind]]}px`,
        ...(aspect ? { aspectRatio: aspect } : {}),
        ...(minWidth ? { minWidth: `${minWidth}px` } : {}),
      }}
      data-ch8-figure-variant={CHAPTER8_FIGURE_VARIANTS[kind]}
      data-ch8-figure-aspect={aspect}
    >
      <Chapter8Artwork kind={kind} alt={copy.alt[kind]} />

      {/* The situations that are NOT selected dim, so the chosen one reads as
          full brightness rather than merely outlined. Panel-shaped artwork
          only — a single scene has nothing to dim against. */}
      {selectedGeometry && DIMMING_KINDS.has(kind) && (
        <span
          aria-hidden="true"
          data-ch8-dim={selectedGeometry.id}
          className="pointer-events-none absolute inset-0 bg-slate-950/45"
          style={{
            clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, ${selectedGeometry.x - selectedGeometry.w / 2}% 0%, ${selectedGeometry.x - selectedGeometry.w / 2}% 100%, ${selectedGeometry.x + selectedGeometry.w / 2}% 100%, ${selectedGeometry.x + selectedGeometry.w / 2}% 0%, 0% 0%)`,
          }}
        />
      )}

      {/* Selection is a soft glow pinned to the subject — never a filled hitbox. */}
      {selectedGeometry && (
        <span
          aria-hidden="true"
          data-ch8-selection={selectedGeometry.id}
          data-lever-panel={leverState?.scene}
          className={`pointer-events-none absolute rounded-2xl shadow-[0_0_30px_8px_rgba(252,211,77,0.16)] ${
            PANEL_KINDS.has(kind) ? "ring-1 ring-amber-300/70" : ""
          }`}
          style={{
            left: `${selectedGeometry.x - selectedGeometry.w / 2}%`,
            top: `${selectedGeometry.y - selectedGeometry.h / 2}%`,
            width: `${selectedGeometry.w}%`,
            height: `${selectedGeometry.h}%`,
          }}
        />
      )}

      <ScientificOverlay kind={kind} active={selectedId} />
      {kind === "levers" && <LeverMarkers state={leverState} />}
      {situation && <ActionReactionForces situation={situation} forces={situationForces} />}

      {items.map((item, index) => {
        const on = selectedId === item.id;
        return (
          <button
            key={item.id}
            type="button"
            data-ch8-hotspot={item.id}
            aria-label={item.label}
            aria-pressed={on}
            onClick={() => setActive(on ? null : item.id)}
            /* The hit region itself paints nothing: no border, no background,
               no hover box. Keyboard users still get a focus ring, and it is
               sized to the subject rather than to a floating rectangle. */
            className={`ch8-image-hotspot absolute rounded-2xl border-0 bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${cue && index === 0 ? "ch8-hotspot-cue" : ""}`}
            style={{
              left: `${item.x - item.w / 2}%`,
              top: `${item.y - item.h / 2}%`,
              width: `${item.w}%`,
              height: `${item.h}%`,
            }}
          />
        );
      })}
    </div>
  );

  return (
    <figure
      data-ch8-figure={kind}
      className="ch8-figure m-0 mx-auto w-full max-w-[840px] rounded-[1.4rem] border border-sky-300/20 bg-gradient-to-b from-slate-800/80 to-slate-950/65 p-2.5 shadow-[0_24px_70px_rgba(2,8,23,0.24)] sm:p-4"
    >
      <figcaption className="mb-3 flex items-center gap-2 text-[12.5px] font-medium text-slate-200">
        <Sparkles className="h-4 w-4 text-amber-300" aria-hidden="true" />
        {instructionFor(kind, lang)}
      </figcaption>
      {/* Pressure's whole point is that the weight is held constant and only
          the contact area changes — without this cue a learner can read the
          heel/shoe comparison as "different force AND different area". */}
      {kind === "pressure" && (
        <p className="mb-2 inline-flex w-fit items-center gap-1 rounded-full border border-amber-300/40 bg-amber-300/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-200">
          {lang === "bm" ? "Daya sama — hanya luas berubah" : "Same force — only area changes"}
        </p>
      )}
      {/* Capped and centred so the artwork supports the lesson instead of
          filling the viewport. Hotspots and overlays are positioned inside the
          frame, so they follow the picture at any display size. A frame with a
          readability floor overflows its column by design; the scroll is scoped
          to this wrapper so the page itself never scrolls sideways. */}
      {minWidth ? (
        <div ref={scrollRef} className="w-full overflow-x-auto" data-ch8-figure-scroll={kind}>
          {frame}
        </div>
      ) : (
        frame
      )}
      <div role="group" aria-label={copy.controls} className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            data-ch8-control={item.id}
            data-lever-button={
              kind === "levers" ? CHAPTER8_LEVER_STATES[item.id as LeverClassId]?.scene : undefined
            }
            aria-pressed={selectedId === item.id}
            onClick={() => setActive(selectedId === item.id ? null : item.id)}
            className={`min-h-11 flex-auto rounded-full border px-3 py-2 text-[12px] font-semibold transition-[transform,background-color,border-color] duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:flex-none ${selectedId === item.id ? "border-amber-300 bg-amber-300 text-slate-950" : "border-white/20 bg-white/5 text-slate-100 hover:border-white/45 hover:bg-white/10"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        aria-live="polite"
        data-lever-explanation-class={leverState?.id}
        className={`mt-3 min-h-[4.5rem] border-l-2 px-3 py-2 ${selected ? "border-amber-300 bg-amber-300/8" : "border-sky-300/35 bg-white/[0.025]"}`}
      >
        {selected ? (
          <>
            <p className="text-[13px] font-bold text-amber-200">{selected.label}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-100">{selected.note}</p>
            {selected.example && (
              <p className="mt-1 text-[12.5px] italic leading-relaxed text-slate-300">
                {selected.example}
              </p>
            )}
          </>
        ) : (
          <p className="flex items-center gap-2 text-[13px] leading-relaxed text-slate-300">
            <MousePointerClick className="h-4 w-4 shrink-0" aria-hidden="true" />
            {promptFor(kind, lang)}
          </p>
        )}
      </div>

    </figure>
  );
}

/**
 * Which figure (if any) belongs to a given section — derived from the
 * section's own shape, not its position in the chapter's section array.
 *
 * A lookup keyed by array index broke twice: once when a new section
 * ("Measuring Force") was inserted and every later index had to be
 * recomputed by hand, and again when a test that renders one section in
 * isolation (so it is array index 0 within that render) silently looked up
 * the wrong figure for every section except the true first one. Deriving the
 * kind from fields that are already unique to that section's content — the
 * exact set of force ids for "types" vs "effects" (both carry `flipCards`),
 * and a single distinguishing field for everything else — means the mapping
 * is correct regardless of where the section sits or how it is rendered.
 */
export function chapter8FigureForSection(
  section: ScienceInteractiveSection,
): Chapter8FigureKind | undefined {
  if (section.actionReactionPairs) return "action-reaction";
  if (section.buoyancySchematic) return "buoyancy";
  if (section.leverClasses) return "levers";
  if (section.pressureApparatus) return "pressure";
  if (section.altitudePressure) return "atmosphere";
  if (section.flipCards) {
    const ids = new Set(section.flipCards.map((c) => c.id));
    const matches = (order: readonly string[]) =>
      ids.size === order.length && order.every((id) => ids.has(id));
    if (matches(TYPES_PANEL_ORDER)) return "types";
    if (matches(EFFECTS_PANEL_ORDER)) return "effects";
  }
  return undefined;
}
