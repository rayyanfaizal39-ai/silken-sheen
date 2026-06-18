import type { CSSProperties } from "react";
import { ArrowLeft, CheckCircle2, Lock, Sparkles } from "lucide-react";
import { getSubjectChapters } from "@/data/content";
import { useProgress, chapterActivityKey, chapterProgressPct } from "@/hooks/use-progress";
import { getChapter } from "@/content/registry";
import { ScienceLangBar } from "@/components/ScienceLanguagePicker";

// ─── Types ────────────────────────────────────────────────────────────────────

type WorldTool  = { icon: string; name: string; hint: string };
type WorldBadge = { emoji: string; name: string; desc: string };

type WorldConfig = {
  id: string;
  worldName: string;
  worldSubtitle: string;
  eyebrow: string;
  color: string;
  glow: string;
  from: string;
  to: string;
  bgClass: string;
  planetArtClass: string;
  chapterLabel: string;
  sectionLabel: string;
  ctaLabel: string;
  backLabel: string;
  ambientSymbols: string[];
  identityBar: string;          // ticker strip of recognisable symbols
  statsLabels: [string, string, string];
  tools: [WorldTool, WorldTool, WorldTool];
  badges: [WorldBadge, WorldBadge, WorldBadge];
};

// ─── World configurations ─────────────────────────────────────────────────────

const WORLDS: Record<string, WorldConfig> = {
  math: {
    id: "math",
    worldName: "Mathematics Galaxy",
    worldSubtitle: "An infinite universe of numbers, formulas, and elegant solutions waiting to be discovered",
    eyebrow: "🧮 Mission Control",
    color: "#FBBF24", glow: "rgba(251,191,36,0.55)", from: "#FBBF24", to: "#F59E0B",
    bgClass: "world-scene-math", planetArtClass: "planet-art-math",
    chapterLabel: "Station", sectionLabel: "Galaxy Stations", ctaLabel: "Launch Mission", backLabel: "Exit Galaxy",
    ambientSymbols: ["π", "∑", "∞", "√", "∫", "x²", "2π", "θ"],
    identityBar: "π   ·   ∑   ·   ∞   ·   √   ·   ∫   ·   θ   ·   Δ   ·   x²   ·   2π   ·   ±",
    statsLabels: ["Formula Mastery", "Missions Complete", "Galaxy Progress"],
    tools: [
      { icon: "📐", name: "Formula Notes",   hint: "Master every equation" },
      { icon: "🃏", name: "Equation Cards",  hint: "Rapid-fire recall" },
      { icon: "🚀", name: "Galaxy Challenge", hint: "Prove your precision" },
    ],
    badges: [
      { emoji: "🧭", name: "Number Navigator",  desc: "Complete your first station" },
      { emoji: "🌟", name: "Formula Explorer",   desc: "Complete half the galaxy" },
      { emoji: "⚡", name: "Equation Master",    desc: "Complete all stations" },
    ],
  },

  science: {
    id: "science",
    worldName: "Science Discovery World",
    worldSubtitle: "Where curiosity meets experiment and every observation reveals a new truth about the universe",
    eyebrow: "🧪 Research Station",
    color: "#38BDF8", glow: "rgba(56,189,248,0.55)", from: "#38BDF8", to: "#0EA5E9",
    bgClass: "world-scene-science", planetArtClass: "planet-art-science",
    chapterLabel: "Lab", sectionLabel: "Research Labs", ctaLabel: "Enter Lab", backLabel: "Exit Lab",
    ambientSymbols: ["H₂O", "⚛", "O₂", "CO₂", "DNA", "pH", "Fe", "NaCl"],
    identityBar: "H₂O   ·   O₂   ·   CO₂   ·   ⚛   ·   DNA   ·   pH   ·   Fe   ·   NaCl   ·   H⁺",
    statsLabels: ["Research Progress", "Experiments Done", "Discoveries Made"],
    tools: [
      { icon: "🧫", name: "Lab Notes",       hint: "Scientific concepts" },
      { icon: "🧪", name: "Discovery Cards", hint: "Rapid recall" },
      { icon: "🔬", name: "Research Quiz",   hint: "Test your theories" },
    ],
    badges: [
      { emoji: "🔬", name: "Young Scientist",    desc: "Enter your first lab" },
      { emoji: "🧬", name: "Research Specialist", desc: "Complete half the labs" },
      { emoji: "⚗️", name: "Discovery Master",   desc: "Complete all labs" },
    ],
  },

  english: {
    id: "english",
    worldName: "English Language Universe",
    worldSubtitle: "A boundless cosmos of stories, words, grammar, and the infinite power of human expression",
    eyebrow: "📖 Story Archive",
    color: "#C084FC", glow: "rgba(192,132,252,0.55)", from: "#C084FC", to: "#A855F7",
    bgClass: "world-scene-english", planetArtClass: "planet-art-english",
    chapterLabel: "Zone", sectionLabel: "Language Zones", ctaLabel: "Enter Zone", backLabel: "Exit Universe",
    ambientSymbols: ["❝", "A", "Z", "...", "→", "!", "?", "✦"],
    identityBar: "❝  Vocabulary  ·  Grammar  ·  Reading  ·  Writing  ·  Expression  ·  Communication  ❞",
    statsLabels: ["Reading Progress", "Vocabulary Growth", "Grammar Mastery"],
    tools: [
      { icon: "📖", name: "Story Notes",   hint: "Language concepts" },
      { icon: "🔤", name: "Word Cards",    hint: "Vocabulary mastery" },
      { icon: "✏️", name: "Language Quiz", hint: "Test your skills" },
    ],
    badges: [
      { emoji: "📚", name: "Reading Explorer",    desc: "Begin your first zone" },
      { emoji: "🏆", name: "Vocabulary Champion", desc: "Complete half the zones" },
      { emoji: "✍️", name: "Grammar Hero",        desc: "Complete all zones" },
    ],
  },

  geography: {
    id: "geography",
    worldName: "Geography Explorer World",
    worldSubtitle: "Chart unknown territories, decode Earth's systems, and conquer every terrain from pole to pole",
    eyebrow: "🌍 Field Headquarters",
    color: "#34D399", glow: "rgba(52,211,153,0.55)", from: "#34D399", to: "#10B981",
    bgClass: "world-scene-geography", planetArtClass: "planet-art-geo",
    chapterLabel: "Expedition", sectionLabel: "Expeditions", ctaLabel: "Launch Expedition", backLabel: "Return to Base",
    ambientSymbols: ["N", "S", "E", "W", "↑", "°N", "°E", "km²"],
    identityBar: "N  ↑  ·  ARAH  ·  PETA  ·  BENTUK MUKA BUMI  ·  SALIRAN  ·  PENDUDUK  ·  S  ↓",
    statsLabels: ["Regions Explored", "Map Skills", "Expedition Progress"],
    tools: [
      { icon: "🗒️", name: "Field Notes",      hint: "Geographical concepts" },
      { icon: "🧭", name: "Explorer Cards",   hint: "Test knowledge" },
      { icon: "🌏", name: "Navigation Quiz",  hint: "Challenge yourself" },
    ],
    badges: [
      { emoji: "🌤", name: "Weather Analyst", desc: "Begin your first expedition" },
      { emoji: "🗺", name: "Map Explorer",    desc: "Complete half the expeditions" },
      { emoji: "🌍", name: "Earth Expert",    desc: "Complete all expeditions" },
    ],
  },

  sejarah: {
    id: "sejarah",
    worldName: "Sejarah Time Journey",
    worldSubtitle: "Travel through centuries, witness empires rise and fall, and uncover Malaysia's greatest legacies",
    eyebrow: "🏛 History Vault",
    color: "#FB923C", glow: "rgba(251,146,60,0.55)", from: "#FB923C", to: "#F97316",
    bgClass: "world-scene-sejarah", planetArtClass: "planet-art-sejarah",
    chapterLabel: "Era", sectionLabel: "Historical Eras", ctaLabel: "Travel Through Time", backLabel: "Return to Present",
    ambientSymbols: ["1957", "BCE", "AD", "⚔", "📜", "Abad", "1400", "🏛"],
    identityBar: "PRASEJARAH   ·   TAMADUN AWAL   ·   YUNANI & ROM   ·   TAMADUN ISLAM   ·   MALAYSIA MERDEKA",
    statsLabels: ["Eras Visited", "Civilisations Studied", "Timeline Progress"],
    tools: [
      { icon: "📜", name: "Historical Notes", hint: "Learn from the past" },
      { icon: "🏛", name: "Era Cards",        hint: "Test your memory" },
      { icon: "⏳", name: "Timeline Quiz",    hint: "Prove your mastery" },
    ],
    badges: [
      { emoji: "🏛", name: "History Explorer",     desc: "Enter your first era" },
      { emoji: "📜", name: "Civilisation Expert",  desc: "Complete half the eras" },
      { emoji: "⏳", name: "Time Traveller",        desc: "Complete all eras" },
    ],
  },

  bm: {
    id: "bm",
    worldName: "Bahasa Melayu Nusantara",
    worldSubtitle: "Jelajah dunia sastera, kuasai bahasa kebangsaan, dan warisi budaya bangsa yang agung dan mulia",
    eyebrow: "📝 Dewan Bahasa",
    color: "#F472B6", glow: "rgba(244,114,182,0.55)", from: "#F472B6", to: "#EC4899",
    bgClass: "world-scene-bm", planetArtClass: "planet-art-bm",
    chapterLabel: "Daerah", sectionLabel: "Daerah Pembelajaran", ctaLabel: "Mula Perjalanan", backLabel: "Kembali",
    ambientSymbols: ["ب", "Kata", "Prosa", "Sajak", "Cerpen", "Tata", "Puisi", "BM"],
    identityBar: "TATABAHASA   ·   KOSA KATA   ·   PENULISAN   ·   SASTERA   ·   PUISI   ·   CERPEN   ·   PERIBAHASA",
    statsLabels: ["Kemajuan Bahasa", "Kemahiran Penulisan", "Penguasaan Sastera"],
    tools: [
      { icon: "📝", name: "Nota Bahasa",     hint: "Kuasai bahasa" },
      { icon: "📋", name: "Kad Kosa Kata",   hint: "Hafal perkataan" },
      { icon: "✍",  name: "Kuiz Tatabahasa", hint: "Uji kemahiran" },
    ],
    badges: [
      { emoji: "📖", name: "Bahasa Champion",  desc: "Masuki daerah pertama" },
      { emoji: "✍",  name: "Penulisan Expert", desc: "Selesai separuh daerah" },
      { emoji: "🎭", name: "Sastera Explorer", desc: "Selesai semua daerah" },
    ],
  },
};

// ─── World-specific chapter location names ────────────────────────────────────

const LOCATIONS: Record<string, Record<string, string>> = {
  math: {
    "Chapter 1":  "Nombor Nisbah Station",
    "Chapter 2":  "Faktor & Gandaan Station",
    "Chapter 3":  "Kuasa Dua Station",
    "Chapter 4":  "Nisbah & Kadaran Station",
    "Chapter 5":  "Algebra Station",
    "Chapter 6":  "Persamaan Linear Station",
    "Chapter 7":  "Ketaksamaan Station",
    "Chapter 8":  "Geometri Station",
    "Chapter 9":  "Poligon Station",
    "Chapter 10": "Perimeter & Luas Station",
    "Chapter 11": "Set Station",
    "Chapter 12": "Data Station",
    "Chapter 13": "Pythagoras Station",
  },
  science: {
    "Chapter 1": "Scientific Investigation Lab",
    "Chapter 2": "Cell Biology Lab",
    "Chapter 3": "Coordination Lab",
    "Chapter 4": "Reproduction Lab",
    "Chapter 5": "Matter Lab",
    "Chapter 6": "Periodic Table Lab",
    "Chapter 7": "Air Research Lab",
    "Chapter 8": "Light & Optics Lab",
    "Chapter 9": "Earth Sciences Lab",
  },
  english: {
    "Chapter 1": "Grammar Centre",
    "Chapter 2": "Vocabulary Zone",
    "Chapter 3": "Reading Hub",
    "Chapter 4": "Writing Studio",
  },
  geography: {
    "Chapter 1":  "Direction Expedition",
    "Chapter 2":  "Position Expedition",
    "Chapter 3":  "Sketch Map Expedition",
    "Chapter 4":  "Malaysia Map Expedition",
    "Chapter 5":  "Earth Systems Expedition",
    "Chapter 6":  "Terrain Expedition",
    "Chapter 7":  "Rivers Expedition",
    "Chapter 8":  "Population Expedition",
    "Chapter 9":  "Settlement Expedition",
    "Chapter 10": "Southeast Asia Expedition",
    "Chapter 11": "ASEAN People Expedition",
    "Chapter 12": "Water Sources Expedition",
    "Chapter 13": "Waste Systems Expedition",
  },
  sejarah: {
    "Chapter 1": "Mengenali Sejarah Era",
    "Chapter 2": "Zaman Air Batu Era",
    "Chapter 3": "Zaman Prasejarah Era",
    "Chapter 4": "Tamadun Awal Era",
    "Chapter 5": "Tamadun Dunia Era",
    "Chapter 6": "Yunani & Rom Era",
    "Chapter 7": "India & China Era",
    "Chapter 8": "Tamadun Islam Era",
  },
  bm: {
    "Bab 2": "Kata Adjektif Daerah",
  },
};

// ─── Ambient symbol positions ─────────────────────────────────────────────────

const SLOTS = [
  { top: "5%",  left: "1.5%",  cls: "particle-float-1", op: 0.14, fs: "1rem"    },
  { top: "12%", right: "2.5%", cls: "particle-float-2", op: 0.11, fs: "0.85rem" },
  { top: "28%", left: "1%",    cls: "particle-float-3", op: 0.13, fs: "0.9rem"  },
  { top: "44%", right: "1.5%", cls: "particle-float-1", op: 0.10, fs: "0.8rem"  },
  { top: "59%", left: "2%",    cls: "particle-float-2", op: 0.14, fs: "1.05rem" },
  { top: "73%", right: "3%",   cls: "particle-float-3", op: 0.11, fs: "0.85rem" },
  { top: "85%", left: "1.5%",  cls: "particle-float-1", op: 0.12, fs: "0.9rem"  },
  { top: "20%", left: "48%",   cls: "particle-float-2", op: 0.07, fs: "0.8rem"  },
];

// ─── Hero art: Mathematics (coordinate plane + formulas) ──────────────────────

function MathHeroArt({ color }: { color: string }) {
  const dim = "rgba(251,191,36,";
  return (
    <div className="relative hidden h-36 w-52 shrink-0 overflow-hidden rounded-2xl sm:block"
      style={{ border: `1px solid ${color}28`, background: "rgba(0,0,0,0.3)" }}>
      {/* Y axis */}
      <div className="absolute top-0 bottom-0" style={{ left: "50%", width: 1, background: `${dim}0.35)` }} />
      {/* X axis */}
      <div className="absolute left-0 right-0" style={{ top: "55%", height: 1, background: `${dim}0.35)` }} />
      {/* Grid lines vertical */}
      {[22, 36, 64, 78].map(p => (
        <div key={`v${p}`} className="absolute top-0 bottom-0" style={{ left: `${p}%`, width: 1, background: `${dim}0.10)` }} />
      ))}
      {/* Grid lines horizontal */}
      {[20, 38, 72, 88].map(p => (
        <div key={`h${p}`} className="absolute left-0 right-0" style={{ top: `${p}%`, height: 1, background: `${dim}0.10)` }} />
      ))}
      {/* Parabola suggestion */}
      <div className="absolute" style={{
        bottom: "22%", left: "18%", right: "18%", height: 36,
        border: `1.5px solid ${color}55`, borderBottom: "none", borderRadius: "50% 50% 0 0",
      }} />
      {/* Arrow tips on axes */}
      <div className="absolute" style={{ left: "50%", top: 4, transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderBottom: `7px solid ${color}55` }} />
      <div className="absolute" style={{ right: 4, top: "55%", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: `7px solid ${color}55` }} />
      {/* Central π */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-black leading-none" style={{ fontSize: "2.4rem", color, opacity: 0.82 }}>π</span>
        <span className="mt-1 font-black tracking-[0.25em]" style={{ fontSize: "0.6rem", color, opacity: 0.45 }}>∑ · ∞ · ∫ · √</span>
      </div>
    </div>
  );
}

// ─── Hero art: Science (atom orbital) ────────────────────────────────────────

function ScienceHeroArt({ color }: { color: string }) {
  return (
    <div className="relative hidden h-36 w-52 shrink-0 items-center justify-center sm:flex">
      {/* Outer orbit ring (tilted ellipse) */}
      <div className="absolute rounded-[50%]" style={{
        width: 160, height: 56,
        border: `1.5px solid ${color}45`,
        transform: "rotate(-30deg)",
        animation: "orbit-spin-cw 6s linear infinite",
      }} />
      {/* Second orbit ring */}
      <div className="absolute rounded-[50%]" style={{
        width: 130, height: 48,
        border: `1.5px solid ${color}35`,
        transform: "rotate(30deg)",
        animation: "orbit-spin-ccw 9s linear infinite",
      }} />
      {/* Third orbit ring */}
      <div className="absolute rounded-[50%]" style={{
        width: 100, height: 36,
        border: `1px dashed ${color}28`,
        transform: "rotate(80deg)",
        animation: "orbit-spin-cw 12s linear infinite",
      }} />
      {/* Nucleus */}
      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full"
        style={{ background: `radial-gradient(circle, ${color}55, ${color}22)`, boxShadow: `0 0 22px ${color}70` }}>
        <span style={{ fontSize: "0.65rem", fontWeight: 900, color, letterSpacing: "0.05em" }}>⚛</span>
      </div>
      {/* Electron dots */}
      {["H₂O", "O₂", "CO₂"].map((label, i) => (
        <div key={label} className="absolute rounded-full text-center"
          style={{
            width: 28, height: 28,
            background: `${color}18`,
            border: `1px solid ${color}35`,
            top: `${[12, 64, 38][i]}%`,
            left: `${[8, 18, 72][i]}%`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
          <span style={{ fontSize: "0.45rem", color, fontWeight: 700, opacity: 0.8 }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Hero art: English (open book + quotes) ───────────────────────────────────

function EnglishHeroArt({ color }: { color: string }) {
  return (
    <div className="relative hidden h-36 w-52 shrink-0 items-center justify-center sm:flex">
      {/* Left page */}
      <div className="absolute rounded-l-xl rounded-r-none"
        style={{ left: "8%", top: "10%", width: "40%", height: "80%", background: `${color}10`, border: `1px solid ${color}30`, borderRight: "none" }}>
        {[20, 35, 50, 65, 80].map(p => (
          <div key={p} className="absolute left-3 right-3" style={{ top: `${p}%`, height: 1, background: `${color}28` }} />
        ))}
      </div>
      {/* Right page */}
      <div className="absolute rounded-r-xl rounded-l-none"
        style={{ right: "8%", top: "10%", width: "40%", height: "80%", background: `${color}10`, border: `1px solid ${color}30`, borderLeft: "none" }}>
        {[20, 35, 50, 65, 80].map(p => (
          <div key={p} className="absolute left-3 right-3" style={{ top: `${p}%`, height: 1, background: `${color}28` }} />
        ))}
      </div>
      {/* Spine */}
      <div className="absolute" style={{ left: "48%", top: "10%", width: 4, height: "80%", background: `${color}40` }} />
      {/* Quote marks overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span style={{ fontSize: "3rem", color, opacity: 0.55, fontFamily: "Georgia, serif", lineHeight: 1 }}>❝</span>
      </div>
    </div>
  );
}

// ─── Hero art: Geography (topographic + compass) ──────────────────────────────

function GeoHeroArt({ color }: { color: string }) {
  return (
    <div className="relative hidden h-36 w-52 shrink-0 items-center justify-center sm:flex">
      {/* Topographic contour rings */}
      {[44, 60, 76, 92, 108, 124].map((size, i) => (
        <div key={size} className="absolute rounded-[50%]"
          style={{
            width: size, height: size * 0.65,
            border: `1px solid ${color}${["55", "44", "38", "2e", "22", "18"][i]}`,
            bottom: `${5 + i * 3}%`,
            left: "50%",
            transform: "translateX(-50%)",
          }} />
      ))}
      {/* Compass rose */}
      <div className="absolute top-4 right-6 flex h-14 w-14 items-center justify-center">
        <div className="absolute inset-0 rounded-full" style={{ border: `1px solid ${color}35` }} />
        {/* Cardinal directions */}
        {[
          { label: "N", top: "2px",  left: "50%", transform: "translateX(-50%)" },
          { label: "S", bottom: "2px", left: "50%", transform: "translateX(-50%)" },
          { label: "E", right: "4px", top: "50%",  transform: "translateY(-50%)" },
          { label: "W", left: "4px",  top: "50%",  transform: "translateY(-50%)" },
        ].map(({ label, ...pos }) => (
          <span key={label} className="absolute font-black" style={{ fontSize: "0.55rem", color, opacity: label === "N" ? 0.95 : 0.55, ...pos }}>
            {label}
          </span>
        ))}
        {/* Cross lines */}
        <div className="absolute" style={{ top: "50%", left: "10%", right: "10%", height: 1, background: `${color}40` }} />
        <div className="absolute" style={{ left: "50%", top: "10%", bottom: "10%", width: 1, background: `${color}40` }} />
        <div className="absolute h-1 w-1 rounded-full" style={{ background: color, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      </div>
    </div>
  );
}

// ─── Hero art: Sejarah (timeline) ─────────────────────────────────────────────

function SejarahHeroArt({ color }: { color: string }) {
  const eras = [
    { label: "BCE",  year: "5000" },
    { label: "Prasejarah", year: "500" },
    { label: "Tamadun", year: "1400" },
    { label: "Islam",  year: "1957" },
  ];
  return (
    <div className="relative hidden h-36 w-52 shrink-0 items-center justify-center sm:flex">
      {/* Arch silhouette bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2"
        style={{ width: 80, height: 52, border: `1.5px solid ${color}40`, borderBottom: "none", borderRadius: "40px 40px 0 0" }} />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2"
        style={{ width: 52, height: 36, border: `1px solid ${color}28`, borderBottom: "none", borderRadius: "26px 26px 0 0" }} />
      {/* Timeline bar */}
      <div className="absolute" style={{ top: "28%", left: "6%", right: "6%", height: 2, background: `linear-gradient(90deg, ${color}18, ${color}70, ${color}18)` }}>
        {/* Era dots */}
        {eras.map((era, i) => (
          <div key={era.label} className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: `${(i / (eras.length - 1)) * 100}%`, transform: "translate(-50%, -50%)" }}>
            <div className="h-2 w-2 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
            <span className="absolute font-bold whitespace-nowrap" style={{ fontSize: "0.42rem", color, opacity: 0.7, top: 10 }}>{era.year}</span>
            <span className="absolute font-semibold whitespace-nowrap" style={{ fontSize: "0.4rem", color: "rgba(255,255,255,0.35)", bottom: 10 }}>{era.label}</span>
          </div>
        ))}
      </div>
      {/* Decorative scroll year */}
      <div className="absolute top-2 right-3 text-right">
        <span className="font-display font-black" style={{ fontSize: "1.6rem", color, opacity: 0.65 }}>1957</span>
        <span className="block font-bold tracking-widest" style={{ fontSize: "0.45rem", color, opacity: 0.4 }}>MERDEKA</span>
      </div>
    </div>
  );
}

// ─── Hero art: BM (songket pattern) ──────────────────────────────────────────

function BMHeroArt({ color }: { color: string }) {
  return (
    <div className="relative hidden h-36 w-52 shrink-0 overflow-hidden rounded-2xl sm:block"
      style={{ border: `1px solid ${color}28`, background: "rgba(0,0,0,0.25)" }}>
      {/* Songket diagonal lines */}
      {Array.from({ length: 10 }, (_, i) => (
        <div key={`d1-${i}`} className="absolute" style={{
          top: 0, bottom: 0, left: `${i * 24 - 40}px`,
          width: 1, background: `${color}25`,
          transform: "rotate(45deg) scaleY(3)",
          transformOrigin: "top center",
        }} />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <div key={`d2-${i}`} className="absolute" style={{
          top: 0, bottom: 0, left: `${i * 24 - 40}px`,
          width: 1, background: `${color}18`,
          transform: "rotate(-45deg) scaleY(3)",
          transformOrigin: "top center",
        }} />
      ))}
      {/* Border diamonds */}
      <div className="absolute inset-x-0 top-2 flex justify-around">
        {["◆", "◆", "◆", "◆", "◆"].map((d, i) => (
          <span key={i} style={{ fontSize: "0.55rem", color, opacity: 0.35 }}>{d}</span>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-2 flex justify-around">
        {["◆", "◆", "◆", "◆", "◆"].map((d, i) => (
          <span key={i} style={{ fontSize: "0.55rem", color, opacity: 0.35 }}>{d}</span>
        ))}
      </div>
      {/* Central letterform */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-black leading-none" style={{ fontSize: "2rem", color, opacity: 0.75 }}>بـم</span>
        <span className="mt-1 font-black tracking-[0.3em]" style={{ fontSize: "0.5rem", color, opacity: 0.45 }}>BAHASA · SASTERA · BUDAYA</span>
      </div>
    </div>
  );
}

// ─── Hero art switcher ────────────────────────────────────────────────────────

function WorldHeroArt({ config }: { config: WorldConfig }) {
  switch (config.id) {
    case "math":      return <MathHeroArt      color={config.color} />;
    case "science":   return <ScienceHeroArt   color={config.color} />;
    case "english":   return <EnglishHeroArt   color={config.color} />;
    case "geography": return <GeoHeroArt       color={config.color} />;
    case "sejarah":   return <SejarahHeroArt   color={config.color} />;
    case "bm":        return <BMHeroArt        color={config.color} />;
    default:          return <MathHeroArt      color={config.color} />;
  }
}

// ─── Study tools row ──────────────────────────────────────────────────────────

function StudyToolsRow({ config }: { config: WorldConfig }) {
  return (
    <div className="mt-5 grid grid-cols-3 gap-2">
      {config.tools.map((tool, i) => (
        <div
          key={tool.name}
          className="animate-slide-up rounded-2xl border border-white/[0.06] p-3 text-center"
          style={{
            background: `linear-gradient(135deg, ${config.from}0c, rgba(0,0,0,0.4))`,
            animationDelay: `${i * 70}ms`,
          }}
        >
          <div className="mb-1 text-xl">{tool.icon}</div>
          <p className="text-[10px] font-bold leading-tight text-white/80">{tool.name}</p>
          <p className="mt-0.5 hidden text-[9px] text-white/32 md:block">{tool.hint}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Achievements row ─────────────────────────────────────────────────────────

function AchievementsRow({
  config,
  completedCount,
  total,
}: {
  config: WorldConfig;
  completedCount: number;
  total: number;
}) {
  const unlocked = [
    completedCount >= 1,
    completedCount >= Math.ceil(total / 2),
    completedCount >= total && total > 0,
  ];
  return (
    <div className="mt-6 mb-1">
      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: config.color }}>
        Achievements
      </p>
      <div className="grid grid-cols-3 gap-2">
        {config.badges.map((badge, i) => (
          <div
            key={badge.name}
            className="rounded-2xl border p-3 text-center transition-all"
            style={{
              border: `1px solid ${unlocked[i] ? `${config.color}40` : "rgba(255,255,255,0.05)"}`,
              background: unlocked[i] ? `${config.from}12` : "rgba(255,255,255,0.02)",
            }}
          >
            <div className="mb-1 text-xl" style={{ filter: unlocked[i] ? "none" : "grayscale(1)", opacity: unlocked[i] ? 1 : 0.35 }}>
              {badge.emoji}
            </div>
            <p className="text-[10px] font-bold" style={{ color: unlocked[i] ? config.color : "rgba(255,255,255,0.3)" }}>
              {badge.name}
            </p>
            <p className="mt-0.5 hidden text-[9px] text-white/25 md:block">{badge.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Progress stats strip ─────────────────────────────────────────────────────

function WorldStats({
  config,
  completedCount,
  total,
  overallPct,
}: {
  config: WorldConfig;
  completedCount: number;
  total: number;
  overallPct: number;
}) {
  const values = [
    `${total > 0 ? Math.round((completedCount / total) * 100) : 0}%`,
    `${completedCount} / ${total}`,
    `${overallPct}%`,
  ];
  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      {config.statsLabels.map((label, i) => (
        <div
          key={label}
          className="rounded-2xl border border-white/[0.05] p-3 text-center"
          style={{ background: `${config.from}09` }}
        >
          <p className="font-display text-lg font-black leading-none" style={{ color: config.color }}>
            {values[i]}
          </p>
          <p className="mt-1 text-[9px] font-bold uppercase tracking-wide text-white/35">{label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Chapter map types ───────────────────────────────────────────────────────

type ChapterEntry = ReturnType<typeof getSubjectChapters>[number];
type ProgressMap  = ReturnType<typeof useProgress>["progress"];

type MapProps = {
  chapters: ChapterEntry[];
  config: WorldConfig;
  subjectId: string;
  form?: "Form 1" | "Form 2" | "Form 3" | "All";
  scienceLang?: "bm" | "dlp";
  progress: ProgressMap;
  onSelect: (key: string) => void;
};

// ─── Path node (circular marker sitting on the path line) ────────────────────

function PathNode({
  chapter, index, config, pct, isComplete, isStarted,
}: {
  chapter: ChapterEntry;
  index: number;
  config: WorldConfig;
  pct: number;
  isComplete: boolean;
  isStarted: boolean;
}) {
  const C = 2 * Math.PI * 22; // SVG circle circumference, r=22

  return (
    <div
      className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-all duration-500"
      style={{
        background: isComplete
          ? `radial-gradient(circle, ${config.from}55, ${config.to}22)`
          : isStarted
          ? `${config.from}1a`
          : "rgba(0,0,0,0.45)",
        border: `2px solid ${
          isComplete        ? config.color :
          isStarted         ? `${config.color}65` :
          chapter.available ? `${config.color}28` :
                              "rgba(255,255,255,0.08)"
        }`,
        boxShadow: isComplete
          ? `0 0 22px ${config.glow}, 0 0 7px ${config.color}`
          : isStarted
          ? `0 0 14px ${config.glow}60`
          : "none",
      }}
    >
      {/* Progress ring */}
      {isStarted && !isComplete && (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 56 56"
          style={{ transform: "rotate(-90deg)" }}>
          <circle cx="28" cy="28" r="22" fill="none"
            stroke={`${config.color}20`} strokeWidth="2.5" />
          <circle
            cx="28" cy="28" r="22" fill="none"
            stroke={config.color} strokeWidth="2.5"
            strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)}
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* Centre icon */}
      {!chapter.available ? (
        <Lock className="h-4 w-4 text-white/20" />
      ) : isComplete ? (
        <CheckCircle2 className="h-5 w-5" style={{ color: config.color }} />
      ) : (
        <span className="relative z-10 font-display text-sm font-black"
          style={{ color: isStarted ? config.color : "rgba(255,255,255,0.28)" }}>
          {index + 1}
        </span>
      )}

      {/* NEW dot */}
      {chapter.isNew && chapter.available && !isComplete && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-nova-yellow text-[7px] font-black text-black">
          N
        </span>
      )}
    </div>
  );
}

// ─── Location card (compact info card extending from each path node) ──────────

function LocationCard({
  chapter, index, config, subjectId, form = "Form 1", scienceLang, progress, onSelect, align,
}: {
  chapter: ChapterEntry;
  index: number;
  config: WorldConfig;
  subjectId: string;
  form?: "Form 1" | "Form 2" | "Form 3" | "All";
  scienceLang?: "bm" | "dlp";
  progress: ProgressMap;
  onSelect: (key: string) => void;
  align: "left" | "right";
}) {
  const pct        = chapterProgressPct(progress.chapterActivity[chapterActivityKey(subjectId, chapter.key)]);
  const isComplete = pct >= 100;
  const isStarted  = pct > 0;
  const location   = LOCATIONS[subjectId]?.[chapter.key];

  const chapterContent = getChapter(
    subjectId,
    chapter.key,
    scienceLang,
    form === "All" ? "Form 1" : form,
  );
  const notesCount = chapterContent?.notes?.sections?.length ?? 0;
  const cardCount  = chapterContent?.flashcards?.length ?? 0;
  const quizCount  = chapterContent?.quiz?.length ?? 0;

  return (
    <button
      type="button"
      onClick={() => chapter.available && onSelect(chapter.key)}
      disabled={!chapter.available}
      className={[
        "w-full rounded-2xl border transition-all duration-300",
        chapter.available
          ? "cursor-pointer hover:border-white/[0.14] focus-visible:outline-none focus-visible:ring-2"
          : "opacity-38 cursor-not-allowed",
      ].join(" ")}
      style={{
        background: `linear-gradient(${align === "left" ? "135deg" : "225deg"}, ${config.from}0d, rgba(0,0,0,0.50))`,
        border: "1px solid rgba(255,255,255,0.06)",
        "--tw-ring-color": config.color,
      } as CSSProperties}
      onMouseEnter={(e) => {
        if (!chapter.available) return;
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${config.color}35`;
        el.style.boxShadow   = `0 12px 40px -12px ${config.glow}`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "";
        el.style.boxShadow   = "";
      }}
    >
      <div className={`p-3 md:p-4 ${align === "right" ? "text-right" : "text-left"}`}>
        {/* World location name */}
        {location && chapter.available && (
          <p className="mb-0.5 text-[9px] font-black uppercase tracking-[0.18em]"
            style={{ color: config.color, opacity: 0.6 }}>
            {location}
          </p>
        )}

        {/* KSSM chapter title */}
        <h3 className="font-display text-xs font-bold leading-snug text-white sm:text-sm">
          {chapter.label}
        </h3>

        {/* Status line */}
        <p className="mt-1 text-[9px] font-bold"
          style={{ color: isComplete ? config.color : isStarted ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.2)" }}>
          {isComplete
            ? "✓ Complete"
            : isStarted
            ? `${pct}% in progress`
            : chapter.available
            ? "Not started"
            : "Coming soon"}
        </p>

        {/* Content chips */}
        {chapter.available && (notesCount > 0 || cardCount > 0 || quizCount > 0) && (
          <div className={`mt-1.5 flex flex-wrap gap-1 ${align === "right" ? "justify-end" : "justify-start"}`}>
            {notesCount > 0 && <span className="chapter-chip">📄 {notesCount}</span>}
            {cardCount  > 0 && <span className="chapter-chip">🃏 {cardCount}</span>}
            {quizCount  > 0 && <span className="chapter-chip">🧠 {quizCount}q</span>}
          </div>
        )}

        {/* Mini progress fill */}
        {chapter.available && isStarted && (
          <div
            className={`mt-2 h-[2px] overflow-hidden rounded-full bg-white/[0.07] ${align === "right" ? "ml-auto" : ""}`}
            style={{ width: "72%" }}
          >
            <div className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${pct}%`,
                background: `linear-gradient(90deg, ${config.from}, ${config.to})`,
              }} />
          </div>
        )}
      </div>
    </button>
  );
}

// ─── Vertical winding path map ────────────────────────────────────────────────
// Math · Science · English · Geography · BM
// Desktop: chapters alternate left / right of a centre path line
// Mobile:  single column with path line on the left

const PATH_DASH: Record<string, string> = {
  math:      "5px, 10px",
  science:   "2px,  7px",
  english:   "10px, 6px",
  geography: "3px,  8px",
  bm:        "7px,  5px",
};

function VerticalPathMap({ chapters, config, subjectId, form, scienceLang, progress, onSelect }: MapProps) {
  const [dashOn, dashOff] = (PATH_DASH[config.id] ?? "5px, 9px").split(",").map((s) => s.trim());
  const pathLine = `repeating-linear-gradient(to bottom, ${config.color}60 0px, ${config.color}60 ${dashOn}, transparent ${dashOn}, transparent calc(${dashOn} + ${dashOff}))`;

  return (
    <div className="relative py-2">
      {/* Desktop centre path */}
      <div className="absolute top-7 bottom-7 hidden sm:block"
        style={{ left: "50%", width: 2, transform: "translateX(-50%)", background: pathLine }} />
      {/* Mobile left path */}
      <div className="absolute top-7 bottom-7 sm:hidden"
        style={{ left: 27, width: 2, background: pathLine }} />

      <div className="space-y-4">
        {chapters.map((chapter, i) => {
          const pct        = chapterProgressPct(progress.chapterActivity[chapterActivityKey(subjectId, chapter.key)]);
          const isComplete = pct >= 100;
          const isStarted  = pct > 0;
          const cardLeft   = i % 2 === 0; // even → card on left (desktop)

          return (
            <div key={chapter.key} className="animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>

              {/* Mobile: path left, card right */}
              <div className="flex items-center gap-3 sm:hidden">
                <PathNode chapter={chapter} index={i} config={config} pct={pct} isComplete={isComplete} isStarted={isStarted} />
                <div className="flex-1">
                  <LocationCard chapter={chapter} index={i} config={config} subjectId={subjectId}
                    form={form} scienceLang={scienceLang} progress={progress} onSelect={onSelect} align="left" />
                </div>
              </div>

              {/* Desktop: alternating sides */}
              <div className="hidden items-center sm:flex">
                {cardLeft ? (
                  <>
                    <div className="w-[calc(50%-28px)] pr-5">
                      <LocationCard chapter={chapter} index={i} config={config} subjectId={subjectId}
                        form={form} scienceLang={scienceLang} progress={progress} onSelect={onSelect} align="right" />
                    </div>
                    <PathNode chapter={chapter} index={i} config={config} pct={pct} isComplete={isComplete} isStarted={isStarted} />
                    <div className="w-[calc(50%-28px)]" />
                  </>
                ) : (
                  <>
                    <div className="w-[calc(50%-28px)]" />
                    <PathNode chapter={chapter} index={i} config={config} pct={pct} isComplete={isComplete} isStarted={isStarted} />
                    <div className="w-[calc(50%-28px)] pl-5">
                      <LocationCard chapter={chapter} index={i} config={config} subjectId={subjectId}
                        form={form} scienceLang={scienceLang} progress={progress} onSelect={onSelect} align="left" />
                    </div>
                  </>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Horizontal timeline map ──────────────────────────────────────────────────
// Sejarah only — chapters are historical eras on a chronological timeline

const SEJARAH_ERA_LABELS = [
  "Prasejarah", "Zaman Batu", "Prasejarah", "Tamadun Awal",
  "Tamadun Dunia", "Zaman Klasik", "Zaman Pertengahan", "Tamadun Islam",
];

function SejarahTimelineMap({ chapters, config, subjectId, scienceLang, progress, onSelect }: MapProps) {
  const NODE_W   = 164;
  const totalW   = Math.max(chapters.length * NODE_W, 640);

  return (
    <div className="-mx-2 overflow-x-auto pb-6">
      <div className="relative inline-flex flex-col" style={{ width: totalW, minWidth: "100%", paddingTop: 8 }}>

        {/* Era epoch labels */}
        <div className="flex w-full">
          {chapters.map((c, i) => (
            <div key={`era-${c.key}`} className="flex justify-center" style={{ width: NODE_W }}>
              <p className="mb-1 text-[7.5px] font-black uppercase tracking-widest"
                style={{ color: config.color, opacity: 0.48 }}>
                {SEJARAH_ERA_LABELS[i] ?? "Era"}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline bar + nodes row */}
        <div className="relative flex w-full items-center" style={{ height: 60 }}>
          {/* Baseline bar */}
          <div className="absolute top-1/2 -translate-y-1/2" style={{
            left: NODE_W / 2, right: NODE_W / 2, height: 2,
            background: `linear-gradient(90deg, transparent, ${config.color}55, transparent)`,
          }} />

          {/* Completed segment fills */}
          {chapters.map((c, i) => {
            if (i >= chapters.length - 1) return null;
            const thisPct = chapterProgressPct(progress.chapterActivity[chapterActivityKey(subjectId, c.key)]);
            const nextKey = chapters[i + 1].key;
            const nextPct = chapterProgressPct(progress.chapterActivity[chapterActivityKey(subjectId, nextKey)]);
            if (!(thisPct >= 100 && nextPct > 0)) return null;
            return (
              <div key={`seg-${c.key}`} className="absolute top-1/2 -translate-y-1/2 h-0.5 transition-all"
                style={{
                  left: (i + 0.5) * NODE_W, width: NODE_W,
                  background: `linear-gradient(90deg, ${config.color}, ${config.color}80)`,
                  boxShadow: `0 0 8px ${config.glow}`,
                }} />
            );
          })}

          {/* Nodes */}
          {chapters.map((c, i) => {
            const pct        = chapterProgressPct(progress.chapterActivity[chapterActivityKey(subjectId, c.key)]);
            const isComplete = pct >= 100;
            const isStarted  = pct > 0;
            return (
              <div key={`node-${c.key}`} className="absolute flex justify-center"
                style={{ left: (i + 0.5) * NODE_W - 28, width: 56 }}>
                <PathNode chapter={c} index={i} config={config} pct={pct} isComplete={isComplete} isStarted={isStarted} />
              </div>
            );
          })}
        </div>

        {/* Era cards below */}
        <div className="flex w-full">
          {chapters.map((c, i) => {
            const pct = chapterProgressPct(progress.chapterActivity[chapterActivityKey(subjectId, c.key)]);
            return (
              <div key={`card-${c.key}`} className="animate-slide-up px-1.5 pt-3"
                style={{ width: NODE_W, animationDelay: `${i * 50}ms` }}>
                <button
                  type="button"
                  onClick={() => c.available && onSelect(c.key)}
                  disabled={!c.available}
                  className={[
                    "w-full rounded-2xl border p-2.5 text-center transition-all duration-300",
                    c.available ? "cursor-pointer hover:border-white/[0.14]" : "opacity-38 cursor-not-allowed",
                  ].join(" ")}
                  style={{ background: `linear-gradient(180deg, ${config.from}0d, rgba(0,0,0,0.5))`, border: "1px solid rgba(255,255,255,0.06)" }}
                  onMouseEnter={(e) => { if (c.available) (e.currentTarget as HTMLElement).style.borderColor = `${config.color}35`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ""; }}
                >
                  {LOCATIONS[subjectId]?.[c.key] && c.available && (
                    <p className="mb-0.5 text-[7.5px] font-black uppercase tracking-widest"
                      style={{ color: config.color, opacity: 0.55 }}>
                      {LOCATIONS[subjectId][c.key]}
                    </p>
                  )}
                  <p className="text-[10px] font-bold leading-snug text-white/85">{c.label}</p>
                  <p className="mt-1 text-[9px] font-semibold"
                    style={{ color: pct >= 100 ? config.color : pct > 0 ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.2)" }}>
                    {pct >= 100 ? "✓ Complete" : pct > 0 ? `${pct}%` : c.available ? "Not started" : "Coming soon"}
                  </p>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

// ─── Chapter path map dispatcher ─────────────────────────────────────────────

function ChapterPathMap(props: MapProps) {
  if (props.subjectId === "sejarah") return <SejarahTimelineMap {...props} />;
  return <VerticalPathMap {...props} />;
}

// ─── LEGACY ChapterCard kept for type compatibility ───────────────────────────
// (not rendered; replaced by ChapterPathMap — keeping to avoid future confusion)

function ChapterCard({
  chapter,
  index,
  config,
  subjectId,
  form = "Form 1",
  scienceLang,
  progress,
  onSelect,
}: {
  chapter: ChapterEntry;
  index: number;
  config: WorldConfig;
  subjectId: string;
  form?: "Form 1" | "Form 2" | "Form 3" | "All";
  scienceLang?: "bm" | "dlp";
  progress: ProgressMap;
  onSelect: (key: string) => void;
}) {
  const pct        = chapterProgressPct(progress.chapterActivity[chapterActivityKey(subjectId, chapter.key)]);
  const isComplete = pct >= 100;
  const isStarted  = pct > 0;
  const location   = LOCATIONS[subjectId]?.[chapter.key];

  const chapterContent = getChapter(
    subjectId,
    chapter.key,
    scienceLang,
    form === "All" ? "Form 1" : form,
  );
  const notesCount  = chapterContent?.notes?.sections?.length ?? 0;
  const cardCount   = chapterContent?.flashcards?.length ?? 0;
  const quizCount   = chapterContent?.quiz?.length ?? 0;

  return (
    <button
      type="button"
      onClick={() => chapter.available && onSelect(chapter.key)}
      disabled={!chapter.available}
      className={[
        "group relative overflow-hidden rounded-3xl border text-left transition-all duration-300 animate-slide-up backdrop-blur-xl",
        chapter.available
          ? "cursor-pointer hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2"
          : "opacity-45 cursor-not-allowed",
      ].join(" ")}
      style={{
        background: `linear-gradient(135deg, ${config.from}0e, rgba(0,0,0,0.55))`,
        border: `1px solid rgba(255,255,255,${chapter.available ? "0.07" : "0.03"})`,
        animationDelay: `${index * 45}ms`,
        "--tw-ring-color": config.color,
      } as CSSProperties}
      onMouseEnter={(e) => {
        if (!chapter.available) return;
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${config.color}38`;
        el.style.boxShadow   = `0 18px 55px -18px ${config.glow}`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "";
        el.style.boxShadow   = "";
      }}
    >
      {/* Accent top bar */}
      <div className="h-[3px] w-full" style={{
        background: chapter.available ? `linear-gradient(90deg, ${config.from}, ${config.to})` : "rgba(255,255,255,0.04)",
        opacity: isComplete ? 1 : isStarted ? 0.6 : 0.25,
      }} />

      <div className="p-4">
        {/* Label row */}
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="inline-block rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-widest"
            style={{ background: `${config.from}20`, color: config.color }}>
            {config.chapterLabel} {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex shrink-0 items-center gap-1.5">
            {chapter.isNew && chapter.available && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-nova-yellow to-orange-400 px-2 py-0.5 text-[8px] font-bold text-black">
                <Sparkles className="h-2 w-2" /> NEW
              </span>
            )}
            {isComplete  && <CheckCircle2 className="h-4 w-4" style={{ color: config.color }} />}
            {!chapter.available && <Lock className="h-4 w-4 text-white/25" />}
          </div>
        </div>

        {/* Location name (world-specific) */}
        {location && chapter.available && (
          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: config.color, opacity: 0.65 }}>
            {location}
          </p>
        )}

        {/* KSSM chapter title */}
        <h3 className="font-display text-sm font-bold leading-snug text-white">{chapter.label}</h3>

        {/* Content chips */}
        {chapter.available && (notesCount > 0 || cardCount > 0 || quizCount > 0) && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {notesCount > 0 && (
              <span className="chapter-chip">📄 {notesCount} notes</span>
            )}
            {cardCount > 0 && (
              <span className="chapter-chip">🃏 {cardCount} cards</span>
            )}
            {quizCount > 0 && (
              <span className="chapter-chip">🧠 {quizCount} Qs</span>
            )}
          </div>
        )}

        {!chapter.available && (
          <p className="mt-1.5 text-[10px] font-semibold text-amber-400/70">Coming Soon</p>
        )}

        {/* Progress bar */}
        {chapter.available && (
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[9px] font-bold uppercase tracking-wide">
              <span style={{ color: isComplete ? config.color : isStarted ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.2)" }}>
                {isComplete ? "Complete ✓" : isStarted ? "In Progress" : "Not Started"}
              </span>
              <span style={{ color: pct > 0 ? config.color : "rgba(255,255,255,0.2)" }}>{pct}%</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${pct}%`,
                  background: `linear-gradient(90deg, ${config.from}, ${config.to})`,
                  boxShadow: pct > 0 ? `0 0 8px ${config.glow}` : "none",
                }} />
            </div>
          </div>
        )}
      </div>
    </button>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function SubjectWorldPage({
  subjectId,
  form = "Form 1",
  scienceLang,
  isBilingualSubject,
  onSelectChapter,
  onBack,
  onChangeLang,
}: {
  subjectId: string;
  form?: "Form 1" | "Form 2" | "Form 3" | "All";
  scienceLang?: "bm" | "dlp";
  isBilingualSubject?: boolean;
  onSelectChapter: (key: string) => void;
  onBack: () => void;
  onChangeLang?: () => void;
}) {
  const config   = WORLDS[subjectId] ?? WORLDS.math;
  const chapters = getSubjectChapters(subjectId, scienceLang, form);
  const { progress } = useProgress();

  const completedCount = chapters.filter(
    (c) => chapterProgressPct(progress.chapterActivity[chapterActivityKey(subjectId, c.key)]) >= 100,
  ).length;

  // Average progress across all available chapters
  const availableChapters = chapters.filter((c) => c.available);
  const overallPct = availableChapters.length > 0
    ? Math.round(
        availableChapters.reduce((sum, c) => sum + chapterProgressPct(progress.chapterActivity[chapterActivityKey(subjectId, c.key)]), 0)
        / availableChapters.length,
      )
    : 0;

  return (
    <div
      className={`relative isolate min-h-screen overflow-x-hidden text-white ${config.bgClass}`}
      style={{ paddingBottom: "calc(var(--mobile-content-bottom, 90px) + 3rem)" }}
    >
      {/* Star field */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.75) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundPosition: "0 0, 31px 27px",
          backgroundSize: "62px 62px, 89px 89px",
        }} />

      {/* Ambient viewport symbols */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {SLOTS.map((slot, i) => (
          <span key={i} className={`absolute select-none font-black ${slot.cls}`}
            style={{
              top: slot.top, left: slot.left, right: slot.right,
              color: config.color, opacity: slot.op, fontSize: slot.fs,
              fontFamily: "var(--font-display)",
            }}>
            {config.ambientSymbols[i % config.ambientSymbols.length]}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-6 sm:px-8">

        {/* ══════════════════════════════════════════════════════
            WORLD HERO
        ══════════════════════════════════════════════════════ */}
        <div className="relative mb-6 overflow-hidden rounded-[2rem] border border-white/[0.08]"
          style={{
            background: `linear-gradient(135deg, ${config.from}14, rgba(0,0,0,0.65))`,
            boxShadow: `0 0 110px -35px ${config.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
          }}>
          {/* Ambient radial glow */}
          <div className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(circle at 80% 20%, ${config.from}20, transparent 55%)` }} />
          {/* Star micro-dots */}
          <div className="pointer-events-none absolute inset-0 opacity-15"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

          <div className="relative p-5 md:p-7">
            {/* Back + completion */}
            <div className="mb-5 flex items-center justify-between gap-4">
              <button type="button" onClick={onBack}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-black/30 px-4 py-2 text-xs font-bold text-white/55 backdrop-blur-sm transition-all hover:bg-white/[0.10] hover:text-white">
                <ArrowLeft className="h-3.5 w-3.5" />
                {config.backLabel}
              </button>
              {completedCount > 0 && (
                <span className="rounded-xl px-3 py-1.5 text-[11px] font-bold"
                  style={{ background: `${config.from}22`, color: config.color }}>
                  ✓ {completedCount}/{chapters.length} complete
                </span>
              )}
            </div>

            {/* Hero content + art */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <p className="mb-2 text-[11px] font-black uppercase tracking-[0.22em]" style={{ color: config.color }}>
                  {config.eyebrow}
                </p>
                <h1 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                  {config.worldName}
                </h1>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/40">
                  {config.worldSubtitle}
                </p>
              </div>
              <WorldHeroArt config={config} />
            </div>

            {/* Study tools */}
            <StudyToolsRow config={config} />
          </div>

          {/* Identity ticker bar */}
          <div className="border-t border-white/[0.05] px-6 py-2.5"
            style={{ background: `${config.from}09` }}>
            <p className="truncate text-center text-[10px] font-bold tracking-[0.18em]"
              style={{ color: config.color, opacity: 0.55 }}>
              {config.identityBar}
            </p>
          </div>
        </div>

        {/* Science lang bar */}
        {isBilingualSubject && scienceLang && onChangeLang && (
          <div className="mb-5">
            <ScienceLangBar lang={scienceLang} onChange={onChangeLang} />
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            WORLD STATS + ACHIEVEMENTS (side by side on desktop)
        ══════════════════════════════════════════════════════ */}
        <div className="mb-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/[0.06] p-4"
            style={{ background: `linear-gradient(135deg, ${config.from}0a, rgba(0,0,0,0.4))` }}>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: config.color }}>
              World Progress
            </p>
            <WorldStats
              config={config}
              completedCount={completedCount}
              total={chapters.length}
              overallPct={overallPct}
            />
          </div>
          <div className="rounded-[1.5rem] border border-white/[0.06] p-4"
            style={{ background: `linear-gradient(135deg, ${config.from}0a, rgba(0,0,0,0.4))` }}>
            <AchievementsRow config={config} completedCount={completedCount} total={chapters.length} />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            CHAPTER / LOCATION MAP
        ══════════════════════════════════════════════════════ */}
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${config.from}45, transparent)` }} />
          <p className="shrink-0 text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: config.color }}>
            {config.sectionLabel}
          </p>
          <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, ${config.from}45, transparent)` }} />
        </div>

        {chapters.length === 0 ? (
          <div className="rounded-3xl border border-white/[0.05] bg-white/[0.02] py-20 text-center">
            <p className="text-white/35">No content available for this world yet.</p>
          </div>
        ) : (
          <ChapterPathMap
            chapters={chapters}
            config={config}
            subjectId={subjectId}
            form={form}
            scienceLang={scienceLang}
            progress={progress}
            onSelect={onSelectChapter}
          />
        )}
      </div>
    </div>
  );
}
