import { useEffect, useMemo, useState } from "react";
import { MousePointerClick, Sparkles } from "lucide-react";
import type { ScienceInteractiveSection } from "@/content/form2/science/interactive-types";
import { CHAPTER8_IMAGES } from "./chapter8-assets";
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
  x: number;
  y: number;
  w: number;
  h: number;
};

export const CHAPTER8_VISUAL_ASSETS: Record<Chapter8FigureKind, string> = {
  effects: CHAPTER8_IMAGES.effects,
  buoyancy: CHAPTER8_IMAGES.buoyancy,
  levers: CHAPTER8_IMAGES.levers,
  pressure: CHAPTER8_IMAGES.pressure,
  types: CHAPTER8_IMAGES.types,
  "action-reaction": CHAPTER8_IMAGES.actionReaction,
  atmosphere: CHAPTER8_IMAGES.atmosphere,
};

/**
 * Hit regions as percentages of the artwork, measured from the shipped images.
 *
 * Every asset is 1672x941 (16:9) and is drawn with `object-contain` inside an
 * `aspect-video` box, so there is no letterboxing and these percentages map
 * straight onto the rendered pixels at any width.
 *
 * The values hug the painted subject. They used to run ~88% of the frame height
 * on artwork whose panels only occupy ~65-73%, which is what made the selection
 * highlight look like a broken hitbox floating past the edge of the picture.
 */
export const CHAPTER8_HOTSPOT_GEOMETRY: Record<Chapter8FigureKind, Pick<Hotspot, "id" | "x" | "y" | "w" | "h">[]> = {
  // four portrait cards, x 1.8-24.4 / 26.1-49.0 / 51.3-74.2 / 75.9-98.9, y 12.5-85.9
  types: [
    { id: "gravitational", x: 13.1, y: 49.2, w: 22.6, h: 73.4 },
    { id: "frictional", x: 37.5, y: 49.2, w: 22.9, h: 73.4 },
    { id: "elastic", x: 62.8, y: 49.2, w: 22.9, h: 73.4 },
    { id: "magnetic", x: 87.4, y: 49.2, w: 23, h: 73.4 },
  ],
  // the contact region between the two skaters' hands
  "action-reaction": [{ id: "pair", x: 50.4, y: 31.9, w: 13, h: 15 }],
  effects: [
    { id: "moves", x: 25.9, y: 27.0, w: 47, h: 43 },
    { id: "stops", x: 74.9, y: 27.0, w: 47, h: 43 },
    { id: "speed", x: 25.9, y: 72.5, w: 47, h: 43 },
    { id: "direction", x: 74.9, y: 72.5, w: 47, h: 43 },
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
  types: "wide",
  effects: "wide",
  levers: "wide",
  buoyancy: "wide",
  pressure: "wide",
  "action-reaction": "single",
  atmosphere: "single",
};

/** Figures whose hit region really is a drawn panel, so a hairline edge reads as deliberate. */
const PANEL_KINDS = new Set<Chapter8FigureKind>(["types", "effects", "buoyancy", "levers", "pressure"]);

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

/**
 * The action–reaction pair, as one list so the two arrows can only ever be drawn
 * together: each leaves a skater's palm, they share a line, they are equal in
 * length, and they point opposite ways.
 */
export const ACTION_REACTION_ARROWS = [
  { id: "left", x1: 49.9, x2: 43.9, y: 31.9 },
  { id: "right", x1: 50.9, x2: 56.9, y: 31.9 },
] as const;

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

const UI = {
  en: {
    instruction: "Interactive — Tap a concept to explore.",
    prompt: "Choose a scene to reveal the scientific relationship.",
    controls: "Concepts in the figure",
    alt: {
      types: "Four everyday scenes showing gravitational, frictional, elastic and magnetic forces.",
      "action-reaction": "Two students on roller skates pressing their palms together at the centre.",
      effects: "Four scenes showing a force starting motion, stopping motion, changing speed and changing direction.",
      buoyancy: "A boat, a person in a life jacket, and a floating log above a sinking anchor.",
      levers: "A seesaw, wheelbarrow and fishing rod used as levers in everyday life.",
      pressure: "A high heel and a broad shoe pressing into the same ground with different contact areas.",
      atmosphere: "Two hikers at the foot and summit of a mountain, comparing the air above them.",
    },
    magnetic: { label: "Magnetic force", note: "The magnet attracts the paper clips." },
    boat: "The boat floats while the water provides an upward buoyant force.",
    jacket: "The life jacket adds buoyant support and helps the person remain afloat.",
    anchor: "The log floats while the anchor sinks because floating or sinking depends on the balance of forces and density, not on mass alone.",
    heel: "Small contact area", shoe: "Large contact area",
    heelNote: "The narrow heel presses on a small contact area, so the same weight produces a greater pressure on the ground.",
    shoeNote: "The broad sole spreads the same weight over a large contact area, so the pressure on the ground is lower.",
    // Figure chrome for the skater photo. The validated force statement is taken
    // from the section intro; this only says what the picture shows.
    pairLabel: "Action–reaction force pair",
    pairNote: "Each student exerts a force on the other, and the two forces act on different students.",
  },
  bm: {
    instruction: "Interaktif — Tekan konsep untuk meneroka.",
    prompt: "Pilih satu situasi untuk melihat hubungan saintifiknya.",
    controls: "Konsep dalam rajah",
    alt: {
      types: "Empat situasi harian yang menunjukkan daya graviti, geseran, kenyal dan magnet.",
      "action-reaction": "Dua murid berkasut roda menekan tapak tangan mereka bersama-sama di tengah.",
      effects: "Empat situasi yang menunjukkan daya memulakan gerakan, menghentikan gerakan, mengubah kelajuan dan mengubah arah.",
      buoyancy: "Sebuah bot, seorang memakai jaket keselamatan, dan kayu terapung di atas sauh yang tenggelam.",
      levers: "Jongkang-jongket, kereta sorong dan joran yang digunakan sebagai tuas dalam kehidupan harian.",
      pressure: "Kasut tumit tinggi dan kasut tapak lebar menekan tanah yang sama dengan luas sentuhan berbeza.",
      atmosphere: "Dua pendaki di kaki dan puncak gunung untuk membandingkan udara di atas mereka.",
    },
    magnetic: { label: "Daya magnet", note: "Magnet menarik klip kertas." },
    boat: "Bot terapung apabila air mengenakan daya apungan ke atas.",
    jacket: "Jaket keselamatan menambah sokongan apungan dan membantu seseorang kekal terapung.",
    anchor: "Kayu terapung manakala sauh tenggelam kerana terapung atau tenggelam bergantung pada keseimbangan daya dan ketumpatan, bukan jisim semata-mata.",
    heel: "Luas sentuhan kecil", shoe: "Luas sentuhan besar",
    heelNote: "Tumit yang kecil menekan pada luas sentuhan yang kecil, jadi berat yang sama menghasilkan tekanan yang lebih besar pada tanah.",
    shoeNote: "Tapak yang lebar menyebarkan berat yang sama pada luas sentuhan yang besar, jadi tekanan pada tanah menjadi lebih rendah.",
    pairLabel: "Pasangan daya tindakan–tindak balas",
    pairNote: "Setiap murid mengenakan daya pada murid yang satu lagi, dan kedua-dua daya itu bertindak pada murid yang berbeza.",
  },
} as const;

/** Exported so the label/note wiring can be asserted without driving the UI. */
export function chapter8Concepts(kind: Chapter8FigureKind, section: ScienceInteractiveSection, lang: Lang): Hotspot[] {
  const copy = UI[lang];
  const geometry = CHAPTER8_HOTSPOT_GEOMETRY[kind];
  const withGeometry = (items: Omit<Hotspot, "x" | "y" | "w" | "h">[]) =>
    items.map((item) => ({ ...item, ...geometry.find((point) => point.id === item.id)! }));

  if (kind === "types") {
    const byId = Object.fromEntries((section.flipCards ?? []).map((item) => [item.id, item]));
    return withGeometry([
      { id: "gravitational", label: byId.gravitational?.label ?? "", note: byId.gravitational?.fact ?? "" },
      { id: "frictional", label: byId.frictional?.label ?? "", note: byId.frictional?.fact ?? "" },
      { id: "elastic", label: byId.elastic?.label ?? "", note: byId.elastic?.fact ?? "" },
      { id: "magnetic", label: copy.magnetic.label, note: copy.magnetic.note },
    ]);
  }
  if (kind === "effects") {
    const byId = Object.fromEntries((section.flipCards ?? []).map((item) => [item.id, item]));
    return withGeometry(["moves", "stops", "speed", "direction"].map((id) => ({
      id, label: byId[id]?.label ?? id, note: byId[id]?.fact ?? "",
    })));
  }
  if (kind === "action-reaction") {
    // The picture shows two skaters, so it is described with the section's own
    // general statement plus what the scene shows. The trolley example keeps its
    // own place in the accordions below and is not borrowed for this image —
    // it also carries an equal-distance claim that does not follow from equal
    // and opposite forces alone.
    return withGeometry([{
      id: "pair",
      label: copy.pairLabel,
      note: `${copy.pairNote} ${section.intro ?? ""}`.trim(),
    }]);
  }
  if (kind === "buoyancy") {
    const block = section.buoyancySchematic!;
    return withGeometry([
      { id: "boat", label: lang === "bm" ? "Bot" : "Boat", note: copy.boat },
      { id: "jacket", label: lang === "bm" ? "Jaket keselamatan" : "Life jacket", note: copy.jacket },
      { id: "log-anchor", label: lang === "bm" ? "Kayu dan sauh" : "Log and anchor", note: `${copy.anchor} ${block.sinkingNote}` },
    ]);
  }
  if (kind === "levers") {
    return withGeometry((section.leverClasses?.classes ?? []).map((item) => ({ id: item.id, label: item.name, note: `${item.note} ${item.examples}` })));
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

  if (kind === "action-reaction") {
    // Both arrows appear together, equal length, pointing away from the hands.
    return (
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <marker id="ch8-arrow" markerUnits="userSpaceOnUse" markerWidth="1.8" markerHeight="1.8" refX="1.55" refY="0.9" orient="auto">
            <path d="M0,0 L1.8,0.9 L0,1.8 Z" fill="currentColor" />
          </marker>
        </defs>
        <g className="text-amber-300" stroke="currentColor" strokeWidth="0.35" strokeLinecap="round" markerEnd="url(#ch8-arrow)">
          {ACTION_REACTION_ARROWS.map((arrow) => (
            <line key={arrow.id} data-arrow={arrow.id} x1={arrow.x1} y1={arrow.y} x2={arrow.x2} y2={arrow.y} />
          ))}
        </g>
      </svg>
    );
  }

  if (kind === "pressure") {
    // Mark the ground contact itself: a short strip under the heel, a wide one
    // under the sole.
    const heel = active === "heel";
    return (
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <line
          data-contact={heel ? "small" : "large"}
          x1={heel ? 18.4 : 59.4} y1={heel ? 74.5 : 70.5} x2={heel ? 20.6 : 88.4} y2={heel ? 74.5 : 70.5}
          className="stroke-amber-300" strokeWidth={heel ? 2.6 : 3.4} strokeLinecap="round"
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
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="ch8-air-haze" gradientUnits="userSpaceOnUse" x1={x} y1={top} x2={x} y2={bottom}>
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

  if (kind === "types" && active === "gravitational") {
    return (
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M13,46 L13,64" className="stroke-amber-300" strokeWidth="1.2" />
        <path d="M10.8,61 L13,66 L15.2,61 Z" className="fill-amber-300" />
      </svg>
    );
  }

  return null;
}

/**
 * Every figure is a single raster drawn edge to edge.
 *
 * The action–reaction scene used to be composited from three copies of the old
 * separated-hands artwork, with two clipped halves slid inward to fake the palms
 * meeting. The supplied pack now includes artwork that already shows the moment
 * of contact, so that composite is gone and this is a plain image again.
 */
function Chapter8Artwork({ kind, alt }: { kind: Chapter8FigureKind; alt: string }) {
  return (
    <img
      src={CHAPTER8_VISUAL_ASSETS[kind]}
      alt={alt}
      width="1672"
      height="941"
      /* the section's primary teaching visual, so it is not deferred */
      loading="eager"
      decoding="async"
      className="absolute inset-0 h-full w-full object-contain"
    />
  );
}

/** F / L / E markers, positioned in percentages so they never drift off the object. */
function LeverMarkers({ state }: { state: (typeof CHAPTER8_LEVER_STATES)[LeverClassId] | null }) {
  if (!state) return null;
  return (
    <div className="pointer-events-none absolute inset-0" role="img" aria-label="F, L and E markers">
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
  useEffect(() => { const timer = window.setTimeout(() => setCue(false), 1200); return () => window.clearTimeout(timer); }, []);
  const copy = UI[lang];
  const items = useMemo(() => chapter8Concepts(kind, section, lang), [kind, section, lang]);
  const leverState = kind === "levers" && isLeverClassId(active) ? CHAPTER8_LEVER_STATES[active] : null;
  const selected = items.find((item) => item.id === (leverState?.id ?? active)) ?? null;
  const selectedId = selected?.id ?? null;
  const selectedGeometry = selected;

  return (
    <figure data-ch8-figure={kind} className="ch8-figure m-0 mx-auto w-full max-w-[840px] rounded-[1.4rem] border border-sky-300/20 bg-gradient-to-b from-slate-800/80 to-slate-950/65 p-2.5 shadow-[0_24px_70px_rgba(2,8,23,0.24)] sm:p-4">
      <figcaption className="mb-3 flex items-center gap-2 text-[12.5px] font-medium text-slate-200"><Sparkles className="h-4 w-4 text-amber-300" aria-hidden="true" />{copy.instruction}</figcaption>
      {/* Capped and centred so the artwork supports the lesson instead of
          filling the viewport. Hotspots and overlays are positioned inside this
          same box, so they follow the picture at any display size. */}
      <div
        className="relative mx-auto aspect-video w-full overflow-hidden rounded-2xl bg-slate-900"
        style={{ maxWidth: `${CHAPTER8_FIGURE_WIDTH[CHAPTER8_FIGURE_VARIANTS[kind]]}px` }}
        data-ch8-figure-variant={CHAPTER8_FIGURE_VARIANTS[kind]}
      >
        <Chapter8Artwork kind={kind} alt={copy.alt[kind]} />

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
              style={{ left: `${item.x - item.w / 2}%`, top: `${item.y - item.h / 2}%`, width: `${item.w}%`, height: `${item.h}%` }}
            />
          );
        })}
      </div>
      <div role="group" aria-label={copy.controls} className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => <button key={item.id} type="button" data-ch8-control={item.id} data-lever-button={kind === "levers" ? CHAPTER8_LEVER_STATES[item.id as LeverClassId]?.scene : undefined} aria-pressed={selectedId === item.id} onClick={() => setActive(selectedId === item.id ? null : item.id)} className={`min-h-11 flex-auto rounded-full border px-3 py-2 text-[12px] font-semibold transition-[transform,background-color,border-color] duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:flex-none ${selectedId === item.id ? "border-amber-300 bg-amber-300 text-slate-950" : "border-white/20 bg-white/5 text-slate-100 hover:border-white/45 hover:bg-white/10"}`}>{item.label}</button>)}
      </div>
      <div aria-live="polite" data-lever-explanation-class={leverState?.id} className={`mt-3 min-h-[4.5rem] border-l-2 px-3 py-2 ${selected ? "border-amber-300 bg-amber-300/8" : "border-sky-300/35 bg-white/[0.025]"}`}>
        {selected ? <><p className="text-[13px] font-bold text-amber-200">{selected.label}</p><p className="mt-1 text-[13px] leading-relaxed text-slate-100">{selected.note}</p></> : <p className="flex items-center gap-2 text-[13px] leading-relaxed text-slate-300"><MousePointerClick className="h-4 w-4 shrink-0" aria-hidden="true" />{copy.prompt}</p>}
      </div>
    </figure>
  );
}

export const CHAPTER8_SECTION_FIGURES: Partial<Record<number, Chapter8FigureKind>> = {
  0: "types", 2: "action-reaction", 3: "effects", 4: "buoyancy", 5: "levers", 7: "pressure", 9: "atmosphere",
};
