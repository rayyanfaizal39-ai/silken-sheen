import { useEffect, useMemo, useState } from "react";
import { MousePointerClick, Sparkles } from "lucide-react";
import type { ScienceInteractiveSection } from "@/content/form2/science/interactive-types";

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
  effects: "/science/form2/chapter-8/01_effects_of_force.png",
  buoyancy: "/science/form2/chapter-8/02_buoyancy_everyday_life.png",
  levers: "/science/form2/chapter-8/03_levers_everyday_life.png",
  pressure: "/science/form2/chapter-8/04_pressure_contact_area.png",
  types: "/science/form2/chapter-8/05_types_of_forces.png",
  "action-reaction": "/science/form2/chapter-8/06_action_reaction.png",
  atmosphere: "/science/form2/chapter-8/07_atmospheric_pressure_altitude.png",
};

export const CHAPTER8_HOTSPOT_GEOMETRY: Record<Chapter8FigureKind, Pick<Hotspot, "id" | "x" | "y" | "w" | "h">[]> = {
  types: [
    { id: "gravitational", x: 12.5, y: 50, w: 23, h: 88 },
    { id: "frictional", x: 37.5, y: 50, w: 23, h: 88 },
    { id: "elastic", x: 62.5, y: 50, w: 23, h: 88 },
    { id: "magnetic", x: 87.5, y: 50, w: 23, h: 88 },
  ],
  "action-reaction": [{ id: "pair", x: 50, y: 49, w: 25, h: 45 }],
  effects: [
    { id: "moves", x: 25, y: 25, w: 47, h: 45 },
    { id: "stops", x: 75, y: 25, w: 47, h: 45 },
    { id: "speed", x: 25, y: 75, w: 47, h: 45 },
    { id: "direction", x: 75, y: 75, w: 47, h: 45 },
  ],
  buoyancy: [
    { id: "boat", x: 17, y: 51, w: 31, h: 84 },
    { id: "jacket", x: 50, y: 51, w: 31, h: 84 },
    { id: "log-anchor", x: 83, y: 51, w: 31, h: 84 },
  ],
  levers: [
    { id: "first", x: 17, y: 51, w: 31, h: 84 },
    { id: "second", x: 50, y: 51, w: 31, h: 84 },
    { id: "third", x: 83, y: 51, w: 31, h: 84 },
  ],
  pressure: [
    { id: "heel", x: 25, y: 52, w: 47, h: 86 },
    { id: "shoe", x: 75, y: 52, w: 47, h: 86 },
  ],
  atmosphere: [
    { id: "foot", x: 20, y: 79, w: 22, h: 34 },
    { id: "summit", x: 57, y: 14, w: 18, h: 26 },
  ],
};

const UI = {
  en: {
    instruction: "Interactive — Tap a concept to explore.",
    prompt: "Choose a scene to reveal the scientific relationship.",
    controls: "Concepts in the figure",
    alt: {
      types: "Four everyday scenes showing gravitational, frictional, elastic and magnetic forces.",
      "action-reaction": "Two students on roller skates moving apart after pushing one another.",
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
  },
  bm: {
    instruction: "Interaktif — Tekan konsep untuk meneroka.",
    prompt: "Pilih satu situasi untuk melihat hubungan saintifiknya.",
    controls: "Konsep dalam rajah",
    alt: {
      types: "Empat situasi harian yang menunjukkan daya graviti, geseran, kenyal dan magnet.",
      "action-reaction": "Dua murid berkasut roda bergerak menjauhi satu sama lain selepas saling menolak.",
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
  },
} as const;

function titleFrom(note: string, fallback: string) {
  return note.split(/[.—–]/)[0]?.trim() || fallback;
}

function concepts(kind: Chapter8FigureKind, section: ScienceInteractiveSection, lang: Lang): Hotspot[] {
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
    const trolley = section.accordions?.[2];
    return withGeometry([{ id: "pair", label: trolley?.title.replace(/^\S+\s*/, "") ?? section.title, note: trolley?.body ?? section.intro ?? "" }]);
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
    const cards = section.cards ?? [];
    return withGeometry([
      { id: "heel", label: copy.heel, note: cards[0]?.body ?? section.intro },
      { id: "shoe", label: copy.shoe, note: cards[1]?.body ?? section.intro },
    ]);
  }
  const levels = section.altitudePressure?.levels ?? [];
  return withGeometry(levels.map((item) => ({ id: item.id, label: item.label, note: item.note })));
}

function ScientificOverlay({ kind, active }: { kind: Chapter8FigureKind; active: string | null }) {
  if (!active) return null;
  if (kind === "action-reaction") {
    return (
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <defs><marker id="ch8-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="currentColor" /></marker></defs>
        <g className="text-amber-300" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#ch8-arrow)">
          <line x1="45" y1="42" x2="27" y2="42" /><line x1="55" y1="42" x2="73" y2="42" />
        </g>
      </svg>
    );
  }
  if (kind === "pressure") {
    const heel = active === "heel";
    return <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true"><line x1={heel ? 29 : 63} y1="87" x2={heel ? 34 : 89} y2="87" className="stroke-amber-300" strokeWidth={heel ? 2.4 : 3.2} strokeLinecap="round" /><path d={heel ? "M31,81 L31,91" : "M66,81 L66,91 M86,81 L86,91"} className="stroke-white" strokeWidth="0.7" /></svg>;
  }
  if (kind === "atmosphere") {
    const summit = active === "summit";
    return <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true"><rect x={summit ? 54 : 15} y="3" width={summit ? 7 : 10} height={summit ? 12 : 76} rx="2" className="fill-sky-300/25 stroke-sky-200" strokeWidth="0.7" /><path d={summit ? "M57.5,4 L57.5,14" : "M20,4 L20,78"} className="stroke-white/80" strokeWidth="0.8" strokeDasharray="2 2" /></svg>;
  }
  if (kind === "levers") {
    const labels: Record<string, { x: number; y: number; t: string }[]> = {
      first: [{ x: 17, y: 70, t: "F" }, { x: 29, y: 44, t: "L" }, { x: 7, y: 46, t: "E" }],
      second: [{ x: 39, y: 75, t: "F" }, { x: 52, y: 53, t: "L" }, { x: 64, y: 56, t: "E" }],
      third: [{ x: 71, y: 66, t: "F" }, { x: 91, y: 73, t: "L" }, { x: 77, y: 52, t: "E" }],
    };
    return <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" role="img" aria-label="F, L and E markers">{(labels[active] ?? []).map((p) => <g key={p.t} transform={`translate(${p.x} ${p.y})`}><circle r="3.5" className="fill-slate-950/90 stroke-amber-300" strokeWidth="0.8" /><text textAnchor="middle" dominantBaseline="central" fontSize="4.2" fontWeight="800" className="fill-white">{p.t}</text></g>)}</svg>;
  }
  if (kind === "types" && active === "gravitational") {
    return <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true"><path d="M13,29 L13,55" className="stroke-amber-300" strokeWidth="1.2" /><path d="M10.8,52 L13,57 L15.2,52 Z" className="fill-amber-300" /></svg>;
  }
  return null;
}

export function Chapter8ContextFigure({ kind, section, lang }: { kind: Chapter8FigureKind; section: ScienceInteractiveSection; lang: Lang }) {
  const [active, setActive] = useState<string | null>(null);
  const [cue, setCue] = useState(true);
  useEffect(() => { const timer = window.setTimeout(() => setCue(false), 1200); return () => window.clearTimeout(timer); }, []);
  const copy = UI[lang];
  const items = useMemo(() => concepts(kind, section, lang), [kind, section, lang]);
  const selected = items.find((item) => item.id === active) ?? null;

  return (
    <figure data-ch8-figure={kind} className="ch8-figure m-0 mx-auto w-full max-w-[840px] rounded-[1.4rem] border border-sky-300/20 bg-gradient-to-b from-slate-800/80 to-slate-950/65 p-2.5 shadow-[0_24px_70px_rgba(2,8,23,0.24)] sm:p-4">
      <figcaption className="mb-3 flex items-center gap-2 text-[12.5px] font-medium text-slate-200"><Sparkles className="h-4 w-4 text-amber-300" aria-hidden="true" />{copy.instruction}</figcaption>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900">
        <img src={CHAPTER8_VISUAL_ASSETS[kind]} alt={copy.alt[kind]} width="1672" height="941" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain" />
        <ScientificOverlay kind={kind} active={active} />
        {items.map((item, index) => {
          const on = active === item.id;
          return <button key={item.id} type="button" aria-label={item.label} aria-pressed={on} onClick={() => setActive(on ? null : item.id)} className={`ch8-image-hotspot absolute rounded-2xl border-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/90 ${on ? "border-amber-300 bg-amber-300/10 shadow-[inset_0_0_0_2px_rgba(255,255,255,.45)]" : "border-white/0 bg-transparent hover:border-white/70"} ${cue && index === 0 ? "ch8-hotspot-cue" : ""}`} style={{ left: `${item.x - item.w / 2}%`, top: `${item.y - item.h / 2}%`, width: `${item.w}%`, height: `${item.h}%` }} />;
        })}
      </div>
      <div role="group" aria-label={copy.controls} className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => <button key={item.id} type="button" aria-pressed={active === item.id} onClick={() => setActive(active === item.id ? null : item.id)} className={`min-h-11 flex-auto rounded-full border px-3 py-2 text-[12px] font-semibold transition-[transform,background-color,border-color] duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:flex-none ${active === item.id ? "border-amber-300 bg-amber-300 text-slate-950" : "border-white/20 bg-white/5 text-slate-100 hover:border-white/45 hover:bg-white/10"}`}>{item.label}</button>)}
      </div>
      <div aria-live="polite" className={`mt-3 min-h-[4.5rem] border-l-2 px-3 py-2 ${selected ? "border-amber-300 bg-amber-300/8" : "border-sky-300/35 bg-white/[0.025]"}`}>
        {selected ? <><p className="text-[13px] font-bold text-amber-200">{selected.label}</p><p className="mt-1 text-[13px] leading-relaxed text-slate-100">{selected.note}</p></> : <p className="flex items-center gap-2 text-[13px] leading-relaxed text-slate-300"><MousePointerClick className="h-4 w-4 shrink-0" aria-hidden="true" />{copy.prompt}</p>}
      </div>
    </figure>
  );
}

export const CHAPTER8_SECTION_FIGURES: Partial<Record<number, Chapter8FigureKind>> = {
  0: "types", 2: "action-reaction", 3: "effects", 4: "buoyancy", 5: "levers", 7: "pressure", 9: "atmosphere",
};
