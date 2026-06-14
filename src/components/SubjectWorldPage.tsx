import type { CSSProperties } from "react";
import { ArrowLeft, CheckCircle2, Lock, Sparkles } from "lucide-react";
import { getSubjectChapters } from "@/data/content";
import { useProgress, chapterActivityKey, chapterProgressPct } from "@/hooks/use-progress";
import { getChapter } from "@/content/registry";
import { ScienceLangBar } from "@/components/ScienceLanguagePicker";

// ─── World identity configurations ───────────────────────────────────────────
type MissionCategory = { icon: string; label: string; desc: string };

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
  planetArtClass: string;   // reuses existing planet-art-* CSS
  chapterLabel: string;
  sectionLabel: string;
  ctaLabel: string;
  backLabel: string;
  missionCategories: MissionCategory[];
  ambientSymbols: string[];
  heroSymbol: string;       // large decorative character for hero ornament
};

const WORLDS: Record<string, WorldConfig> = {
  math: {
    id: "math",
    worldName: "Mathematics Galaxy",
    worldSubtitle: "An infinite universe of numbers, formulas, and elegant solutions waiting to be discovered",
    eyebrow: "🧮 Mission Control",
    color: "#FBBF24",
    glow: "rgba(251,191,36,0.55)",
    from: "#FBBF24",
    to: "#F59E0B",
    bgClass: "world-scene-math",
    planetArtClass: "planet-art-math",
    chapterLabel: "Mission",
    sectionLabel: "Formula Missions",
    ctaLabel: "Launch Mission",
    backLabel: "Exit Galaxy",
    missionCategories: [
      { icon: "🚀", label: "Formula Missions", desc: "Master core equations" },
      { icon: "🛰", label: "Problem Challenges", desc: "Apply your knowledge" },
      { icon: "⭐", label: "Equation Mastery", desc: "Perfect precision" },
    ],
    ambientSymbols: ["π", "∑", "∞", "√", "∫", "x²", "2π", "θ", "Δ"],
    heroSymbol: "π",
  },
  science: {
    id: "science",
    worldName: "Science Laboratory Planet",
    worldSubtitle: "Where curiosity meets discovery and every experiment unveils a new truth about the universe",
    eyebrow: "🧪 Research Station",
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.55)",
    from: "#38BDF8",
    to: "#0EA5E9",
    bgClass: "world-scene-science",
    planetArtClass: "planet-art-science",
    chapterLabel: "Experiment",
    sectionLabel: "Research Missions",
    ctaLabel: "Run Experiment",
    backLabel: "Exit Lab",
    missionCategories: [
      { icon: "🧬", label: "Discoveries", desc: "Uncover scientific truths" },
      { icon: "⚡", label: "Experiments", desc: "Test your hypotheses" },
      { icon: "🔬", label: "Research Missions", desc: "Dive deep into science" },
    ],
    ambientSymbols: ["H₂O", "⚛", "O₂", "CO₂", "DNA", "pH", "Fe", "NaCl"],
    heroSymbol: "⚛",
  },
  english: {
    id: "english",
    worldName: "Language Universe",
    worldSubtitle: "A boundless cosmos of words, stories, and the infinite power of human expression",
    eyebrow: "📖 Story Archive",
    color: "#C084FC",
    glow: "rgba(192,132,252,0.55)",
    from: "#C084FC",
    to: "#A855F7",
    bgClass: "world-scene-english",
    planetArtClass: "planet-art-english",
    chapterLabel: "Quest",
    sectionLabel: "Reading Quests",
    ctaLabel: "Begin Quest",
    backLabel: "Exit Universe",
    missionCategories: [
      { icon: "📚", label: "Reading Quests", desc: "Journey through literature" },
      { icon: "🔤", label: "Vocabulary Missions", desc: "Expand your word power" },
      { icon: "📝", label: "Grammar Adventures", desc: "Master the rules" },
    ],
    ambientSymbols: ["❝", "A", "Z", "...", "→", "!", "?", "✦", "Aa"],
    heroSymbol: "❝",
  },
  geography: {
    id: "geography",
    worldName: "Explorer Planet",
    worldSubtitle: "Chart unknown territories, discover civilizations, and conquer every terrain on Earth",
    eyebrow: "🌍 Field HQ",
    color: "#34D399",
    glow: "rgba(52,211,153,0.55)",
    from: "#34D399",
    to: "#10B981",
    bgClass: "world-scene-geography",
    planetArtClass: "planet-art-geo",
    chapterLabel: "Expedition",
    sectionLabel: "Expeditions",
    ctaLabel: "Begin Expedition",
    backLabel: "Return to Base",
    missionCategories: [
      { icon: "🧭", label: "Expeditions", desc: "Explore world geography" },
      { icon: "🏔", label: "Terrain Exploration", desc: "Conquer landscapes" },
      { icon: "🌦", label: "Weather Missions", desc: "Decode Earth's atmosphere" },
    ],
    ambientSymbols: ["N", "S", "E", "W", "↑", "°N", "°E", "km²"],
    heroSymbol: "N",
  },
  sejarah: {
    id: "sejarah",
    worldName: "Time Traveller Realm",
    worldSubtitle: "Travel through centuries, witness empires rise and fall, and uncover Malaysia's hidden legacies",
    eyebrow: "🏛️ History Vault",
    color: "#FB923C",
    glow: "rgba(251,146,60,0.55)",
    from: "#FB923C",
    to: "#F97316",
    bgClass: "world-scene-sejarah",
    planetArtClass: "planet-art-sejarah",
    chapterLabel: "Era",
    sectionLabel: "Time Missions",
    ctaLabel: "Travel Through Time",
    backLabel: "Return to Present",
    missionCategories: [
      { icon: "⏳", label: "Time Missions", desc: "Journey through history" },
      { icon: "🏺", label: "Civilization Discovery", desc: "Uncover ancient worlds" },
      { icon: "📜", label: "Historical Journeys", desc: "Follow the path of empires" },
    ],
    ambientSymbols: ["1957", "1400", "BCE", "AD", "Abad", "⚔", "📜"],
    heroSymbol: "⏳",
  },
  bm: {
    id: "bm",
    worldName: "Nusantara Language Realm",
    worldSubtitle: "Jelajah dunia sastera, kuasai bahasa kebangsaan, dan warisi budaya bangsa yang agung",
    eyebrow: "📝 Dewan Sastera",
    color: "#F472B6",
    glow: "rgba(244,114,182,0.55)",
    from: "#F472B6",
    to: "#EC4899",
    bgClass: "world-scene-bm",
    planetArtClass: "planet-art-bm",
    chapterLabel: "Bab",
    sectionLabel: "Perjalanan Bahasa",
    ctaLabel: "Mula Perjalanan",
    backLabel: "Kembali",
    missionCategories: [
      { icon: "📖", label: "Perjalanan Bahasa", desc: "Jelajahi dunia BM" },
      { icon: "🎭", label: "Pengembaraan Sastera", desc: "Selami karya Nusantara" },
      { icon: "✍", label: "Cabaran Penulisan", desc: "Asah kemahiran menulis" },
    ],
    ambientSymbols: ["BM", "Kata", "Prosa", "Sajak", "Cerpen", "Tata", "Puisi"],
    heroSymbol: "ب",
  },
};

// ─── Ambient symbol positions (viewport-edge floating particles) ──────────────
const SYMBOL_SLOTS: Array<{ top: string; left?: string; right?: string; cls: string; opacity: number; fontSize: string }> = [
  { top: "4%",  left: "1.5%",  cls: "particle-float-1", opacity: 0.16, fontSize: "1rem"    },
  { top: "11%", right: "2.5%", cls: "particle-float-2", opacity: 0.12, fontSize: "0.85rem" },
  { top: "26%", left: "1%",    cls: "particle-float-3", opacity: 0.14, fontSize: "0.9rem"  },
  { top: "41%", right: "1.5%", cls: "particle-float-1", opacity: 0.11, fontSize: "0.8rem"  },
  { top: "57%", left: "2%",    cls: "particle-float-2", opacity: 0.15, fontSize: "1.05rem" },
  { top: "71%", right: "3%",   cls: "particle-float-3", opacity: 0.12, fontSize: "0.85rem" },
  { top: "83%", left: "1.5%",  cls: "particle-float-1", opacity: 0.13, fontSize: "0.9rem"  },
  { top: "19%", left: "47%",   cls: "particle-float-2", opacity: 0.08, fontSize: "0.8rem"  },
];

// ─── Science atom ornament ────────────────────────────────────────────────────
function ScienceAtomOrb({ color, glow }: { color: string; glow: string }) {
  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      {/* Electron orbit rings */}
      <div className="science-orbit-1 opacity-60" />
      <div className="science-orbit-2 absolute opacity-45" />
      {/* Nucleus */}
      <div
        className="absolute h-4 w-4 rounded-full"
        style={{ background: color, boxShadow: `0 0 18px ${glow}, 0 0 6px ${color}` }}
      />
    </div>
  );
}

// ─── Geography globe ornament ─────────────────────────────────────────────────
function GeoGlobeOrb({ color }: { color: string }) {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      {/* Globe circles */}
      <div className="absolute h-16 w-16 rounded-full border-2 opacity-35" style={{ borderColor: color }} />
      <div className="absolute h-16 w-4 rounded-full border opacity-22" style={{ borderColor: color }} />
      <div
        className="absolute rounded-full border opacity-20"
        style={{ borderColor: color, width: "64px", height: "2px", top: "25%" }}
      />
      <div
        className="absolute rounded-full border opacity-20"
        style={{ borderColor: color, width: "64px", height: "2px", top: "50%" }}
      />
      <span
        className="relative z-10 font-display text-lg font-black"
        style={{ color, opacity: 0.85 }}
      >
        N
      </span>
    </div>
  );
}

// ─── Sejarah arch ornament ────────────────────────────────────────────────────
function SejarahArchOrb({ color }: { color: string }) {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      {/* Ancient arch */}
      <div
        className="absolute bottom-1"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          width: "52px",
          height: "40px",
          border: `2px solid ${color}55`,
          borderBottom: "none",
          borderRadius: "26px 26px 0 0",
        }}
      />
      {/* Inner arch */}
      <div
        className="absolute bottom-1"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          width: "36px",
          height: "28px",
          border: `1px solid ${color}30`,
          borderBottom: "none",
          borderRadius: "18px 18px 0 0",
        }}
      />
      <span
        className="relative z-10 -mt-3 font-display text-[11px] font-black tracking-widest"
        style={{ color, opacity: 0.75 }}
      >
        1957
      </span>
    </div>
  );
}

// ─── Hero ornament switcher ───────────────────────────────────────────────────
function WorldHeroOrnament({ config }: { config: WorldConfig }) {
  if (config.id === "science") {
    return <ScienceAtomOrb color={config.color} glow={config.glow} />;
  }
  if (config.id === "geography") {
    return <GeoGlobeOrb color={config.color} />;
  }
  if (config.id === "sejarah") {
    return <SejarahArchOrb color={config.color} />;
  }

  // Math, English, BM — large hero symbol with glow box
  return (
    <div
      className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15"
      style={{
        background: `linear-gradient(135deg, ${config.from}20, rgba(0,0,0,0.3))`,
        boxShadow: `0 0 36px ${config.glow}`,
      }}
    >
      {config.id === "math" ? (
        <span
          className="font-display text-4xl font-black leading-none"
          style={{ color: config.color, opacity: 0.85 }}
        >
          π
        </span>
      ) : config.id === "english" ? (
        <span
          className="font-display text-5xl leading-none"
          style={{ color: config.color, opacity: 0.7 }}
        >
          ❝
        </span>
      ) : (
        <span
          className="font-display text-2xl font-black leading-none"
          style={{ color: config.color, opacity: 0.85 }}
        >
          BM
        </span>
      )}
    </div>
  );
}

// ─── Mission category tiles ───────────────────────────────────────────────────
function MissionTiles({ config }: { config: WorldConfig }) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-3">
      {config.missionCategories.map((cat, i) => (
        <div
          key={cat.label}
          className="animate-slide-up relative overflow-hidden rounded-2xl border border-white/[0.07] p-3 text-center md:p-4"
          style={{
            background: `linear-gradient(135deg, ${config.from}0d, rgba(0,0,0,0.35))`,
            animationDelay: `${i * 80}ms`,
          }}
        >
          <div className="mb-1 text-xl md:text-2xl">{cat.icon}</div>
          <p className="text-[10px] font-bold text-white/75 md:text-[11px]">{cat.label}</p>
          <p className="mt-0.5 hidden text-[9px] text-white/35 md:block">{cat.desc}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Single mission card ──────────────────────────────────────────────────────
type ChapterEntry = ReturnType<typeof getSubjectChapters>[number];
type ProgressMap = ReturnType<typeof useProgress>["progress"];

function MissionCard({
  chapter,
  index,
  config,
  subjectId,
  scienceLang,
  progress,
  onSelect,
}: {
  chapter: ChapterEntry;
  index: number;
  config: WorldConfig;
  subjectId: string;
  scienceLang?: "bm" | "dlp";
  progress: ProgressMap;
  onSelect: (key: string) => void;
}) {
  const pct = chapterProgressPct(
    progress.chapterActivity[chapterActivityKey(subjectId, chapter.key)],
  );
  const isComplete = pct >= 100;
  const isStarted = pct > 0;

  // feature counts for this chapter
  const chapterContent = getChapter(subjectId, chapter.key, scienceLang);
  const notesCount = chapterContent?.notes?.sections?.length ?? 0;
  const cardCount = chapterContent?.flashcards?.length ?? 0;
  const quizCount = chapterContent?.quiz?.length ?? 0;

  return (
    <button
      type="button"
      onClick={() => chapter.available && onSelect(chapter.key)}
      disabled={!chapter.available}
      className={[
        "mission-card group relative overflow-hidden rounded-3xl border text-left transition-all duration-300",
        "animate-slide-up backdrop-blur-xl",
        chapter.available
          ? "border-white/[0.07] cursor-pointer hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2"
          : "border-white/[0.04] opacity-50 cursor-not-allowed",
      ].join(" ")}
      style={{
        background: `linear-gradient(135deg, ${config.from}0e, rgba(0,0,0,0.55))`,
        animationDelay: `${index * 50}ms`,
        "--tw-ring-color": config.color,
      } as CSSProperties}
      onMouseEnter={(e) => {
        if (chapter.available) {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = `${config.color}35`;
          el.style.boxShadow = `0 18px 55px -18px ${config.glow}`;
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "";
        el.style.boxShadow = "";
      }}
    >
      {/* Accent bar */}
      <div
        className="h-[3px] w-full"
        style={{
          background: chapter.available
            ? `linear-gradient(90deg, ${config.from}, ${config.to})`
            : "rgba(255,255,255,0.05)",
          opacity: isComplete ? 1 : isStarted ? 0.65 : 0.28,
        }}
      />

      <div className="p-4">
        {/* Number badge + status */}
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <span
            className="inline-block rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-widest"
            style={{ background: `${config.from}22`, color: config.color }}
          >
            {config.chapterLabel} {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex shrink-0 items-center gap-1.5">
            {chapter.isNew && chapter.available && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-nova-yellow to-orange-400 px-2 py-0.5 text-[8px] font-bold text-black">
                <Sparkles className="h-2 w-2" /> NEW
              </span>
            )}
            {isComplete && <CheckCircle2 className="h-4 w-4" style={{ color: config.color }} />}
            {!chapter.available && <Lock className="h-4 w-4 text-white/28" />}
          </div>
        </div>

        {/* Chapter name */}
        <h3 className="font-display text-sm font-bold leading-snug text-white">{chapter.label}</h3>

        {/* Content counts */}
        {chapter.available && (notesCount > 0 || cardCount > 0 || quizCount > 0) && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {notesCount > 0 && (
              <span className="chapter-chip" style={{ color: "rgba(255,255,255,0.45)" }}>
                📄 {notesCount} notes
              </span>
            )}
            {cardCount > 0 && (
              <span className="chapter-chip" style={{ color: "rgba(255,255,255,0.45)" }}>
                🃏 {cardCount}
              </span>
            )}
            {quizCount > 0 && (
              <span className="chapter-chip" style={{ color: "rgba(255,255,255,0.45)" }}>
                🧠 {quizCount} Qs
              </span>
            )}
          </div>
        )}

        {!chapter.available && (
          <p className="mt-1.5 text-[10px] font-semibold text-amber-400/70">Coming Soon</p>
        )}

        {/* Progress */}
        {chapter.available && (
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[9px] font-bold uppercase tracking-wide">
              <span
                style={{
                  color: isComplete
                    ? config.color
                    : isStarted
                    ? "rgba(255,255,255,0.45)"
                    : "rgba(255,255,255,0.22)",
                }}
              >
                {isComplete ? "Complete ✓" : isStarted ? "In Progress" : "Not Started"}
              </span>
              <span style={{ color: pct > 0 ? config.color : "rgba(255,255,255,0.22)" }}>
                {pct}%
              </span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${pct}%`,
                  background: `linear-gradient(90deg, ${config.from}, ${config.to})`,
                  boxShadow: pct > 0 ? `0 0 8px ${config.glow}` : "none",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </button>
  );
}

// ─── Main SubjectWorldPage ────────────────────────────────────────────────────
export function SubjectWorldPage({
  subjectId,
  scienceLang,
  isBilingualSubject,
  onSelectChapter,
  onBack,
  onChangeLang,
}: {
  subjectId: string;
  scienceLang?: "bm" | "dlp";
  isBilingualSubject?: boolean;
  onSelectChapter: (key: string) => void;
  onBack: () => void;
  onChangeLang?: () => void;
}) {
  const config = WORLDS[subjectId] ?? WORLDS.math;
  const chapters = getSubjectChapters(subjectId, scienceLang);
  const { progress } = useProgress();
  const completedCount = chapters.filter(
    (c) => chapterProgressPct(progress.chapterActivity[chapterActivityKey(subjectId, c.key)]) >= 100,
  ).length;

  return (
    <div
      className={`relative isolate min-h-screen overflow-x-hidden text-white ${config.bgClass}`}
      style={{ paddingBottom: "calc(var(--mobile-content-bottom, 90px) + 3rem)" }}
    >
      {/* ── World-specific star field ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundPosition: "0 0, 32px 28px",
          backgroundSize: "58px 58px, 84px 84px",
        }}
      />

      {/* ── Ambient floating symbols — fixed to viewport edges ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {SYMBOL_SLOTS.map((slot, i) => (
          <span
            key={i}
            className={`absolute select-none font-black ${slot.cls}`}
            style={{
              top: slot.top,
              left: slot.left,
              right: slot.right,
              color: config.color,
              opacity: slot.opacity,
              fontSize: slot.fontSize,
              fontFamily: "var(--font-display)",
            }}
          >
            {config.ambientSymbols[i % config.ambientSymbols.length]}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-6 sm:px-8">

        {/* ══════════════════════════════════════════
            WORLD HEADER
        ══════════════════════════════════════════ */}
        <div
          className="relative mb-8 overflow-hidden rounded-[2rem] border border-white/[0.09]"
          style={{
            background: `linear-gradient(135deg, ${config.from}14, rgba(0,0,0,0.60))`,
            boxShadow: `0 0 100px -30px ${config.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
          }}
        >
          {/* Ambient radial glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at 75% 25%, ${config.from}22, transparent 55%)`,
            }}
          />
          {/* Planet art pattern (reused, scaled up) */}
          <div
            className={`pointer-events-none absolute inset-0 opacity-[0.12] ${config.planetArtClass}`}
          />
          {/* Star micro-grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "38px 38px",
            }}
          />

          <div className="relative p-5 md:p-7">
            {/* Back + progress row */}
            <div className="mb-5 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-black/30 px-4 py-2 text-xs font-bold text-white/60 backdrop-blur-sm transition-all hover:bg-white/[0.10] hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {config.backLabel}
              </button>
              {completedCount > 0 && (
                <span
                  className="rounded-xl px-3 py-1.5 text-[11px] font-bold"
                  style={{ background: `${config.from}20`, color: config.color }}
                >
                  ✓ {completedCount}/{chapters.length} complete
                </span>
              )}
            </div>

            {/* Main content row */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                {/* Eyebrow */}
                <p
                  className="mb-2 text-[11px] font-black uppercase tracking-[0.22em]"
                  style={{ color: config.color }}
                >
                  {config.eyebrow}
                </p>

                {/* World name */}
                <h1 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                  {config.worldName}
                </h1>

                {/* Subtitle */}
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/40">
                  {config.worldSubtitle}
                </p>
              </div>

              {/* Hero ornament (desktop) */}
              <div className="hidden shrink-0 sm:flex sm:items-center sm:justify-center">
                <WorldHeroOrnament config={config} />
              </div>
            </div>

            {/* Mission category tiles */}
            <MissionTiles config={config} />
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SCIENCE LANG BAR
        ══════════════════════════════════════════ */}
        {isBilingualSubject && scienceLang && onChangeLang && (
          <div className="mb-6">
            <ScienceLangBar lang={scienceLang} onChange={onChangeLang} />
          </div>
        )}

        {/* ══════════════════════════════════════════
            MISSION LIST
        ══════════════════════════════════════════ */}
        {/* Section divider */}
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${config.from}40, transparent)` }} />
          <p
            className="shrink-0 text-[11px] font-black uppercase tracking-[0.2em]"
            style={{ color: config.color }}
          >
            {config.sectionLabel}
          </p>
          <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, ${config.from}40, transparent)` }} />
        </div>

        {chapters.length === 0 ? (
          <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] py-20 text-center">
            <p className="text-white/40">No missions available for this world yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((c, i) => (
              <MissionCard
                key={c.key}
                chapter={c}
                index={i}
                config={config}
                subjectId={subjectId}
                scienceLang={scienceLang}
                progress={progress}
                onSelect={onSelectChapter}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
