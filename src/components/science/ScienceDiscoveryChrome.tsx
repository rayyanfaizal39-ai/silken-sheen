import {
  ArrowLeft,
  Atom,
  BrainCircuit,
  BookOpenCheck,
  Clock3,
  Dna,
  Earth,
  Eye,
  FlaskConical,
  Gauge,
  Lightbulb,
  Microscope,
  Orbit,
  ScanLine,
  Sparkles,
  Telescope,
  VenusAndMars,
  Wind,
} from "lucide-react";

type Lang = "bm" | "dlp";

export const SCIENCE_LAB_META = [
  { modules: 11, minutes: 24, experiments: 3, difficulty: "Foundation" },
  { modules: 10, minutes: 22, experiments: 2, difficulty: "Foundation" },
  { modules: 8, minutes: 19, experiments: 2, difficulty: "Core" },
  { modules: 10, minutes: 23, experiments: 2, difficulty: "Core" },
  { modules: 9, minutes: 20, experiments: 3, difficulty: "Core" },
  { modules: 9, minutes: 21, experiments: 2, difficulty: "Core" },
  { modules: 9, minutes: 20, experiments: 2, difficulty: "Core" },
  { modules: 9, minutes: 22, experiments: 3, difficulty: "Advanced" },
  { modules: 9, minutes: 23, experiments: 2, difficulty: "Advanced" },
] as const;

const LAB_ICONS = [Microscope, Dna, BrainCircuit, VenusAndMars, Atom, FlaskConical, Wind, Telescope, Earth];

export function ScienceLabIllustration({ chapter, compact = false }: { chapter: number; compact?: boolean }) {
  const Icon = LAB_ICONS[(chapter - 1) % LAB_ICONS.length] ?? Microscope;
  return (
    <div className={`science-lab-illustration ${compact ? "is-compact" : ""}`} aria-hidden="true">
      <svg className="science-lab-orbits" viewBox="0 0 220 170" role="presentation">
        <defs>
          <linearGradient id={`lab-ring-${chapter}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4FDFFF" stopOpacity="0.86" />
            <stop offset="1" stopColor="#8BB8FF" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <ellipse cx="110" cy="85" rx="82" ry="34" fill="none" stroke={`url(#lab-ring-${chapter})`} strokeWidth="1.4" />
        <ellipse cx="110" cy="85" rx="64" ry="58" fill="none" stroke="#4FDFFF" strokeOpacity="0.22" strokeWidth="1" transform="rotate(34 110 85)" />
        <circle cx="35" cy="76" r="3" fill="#4FDFFF" />
        <circle cx="172" cy="43" r="2.5" fill="#A8EEFF" />
        <circle cx="149" cy="123" r="2" fill="#4FDFFF" fillOpacity="0.7" />
      </svg>
      <div className="science-lab-icon-core">
        <Icon strokeWidth={1.45} />
      </div>
      <ScanLine className="science-lab-scan" />
    </div>
  );
}

function ProgressRing({ value, label }: { value: number; label: string }) {
  const safe = Math.max(0, Math.min(100, Math.round(value)));
  const circumference = 2 * Math.PI * 30;
  return (
    <div className="science-progress-stat">
      <div className="science-progress-ring">
        <svg viewBox="0 0 72 72" aria-hidden="true">
          <circle cx="36" cy="36" r="30" className="science-progress-track" />
          <circle
            cx="36"
            cy="36"
            r="30"
            className="science-progress-value"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - safe / 100)}
          />
        </svg>
        <span>{safe}%</span>
      </div>
      <p>{label}</p>
    </div>
  );
}

export function ScienceDiscoveryChapterHeader({
  chapterKey,
  title,
  lang,
  readingProgress,
  chapterProgress,
  isRead,
  embedded = false,
  onBack,
  onChangeLang,
}: {
  chapterKey: string;
  title: string;
  lang: Lang;
  readingProgress: number;
  chapterProgress: number;
  isRead: boolean;
  embedded?: boolean;
  onBack?: () => void;
  onChangeLang?: () => void;
}) {
  const chapter = Number(chapterKey.match(/\d+/)?.[0] ?? 1);
  const meta = SCIENCE_LAB_META[chapter - 1] ?? SCIENCE_LAB_META[0];
  const bm = lang === "bm";
  const effectiveProgress = isRead ? 100 : Math.max(chapterProgress, readingProgress);
  const mastered = Math.min(meta.modules, Math.floor((meta.modules * effectiveProgress) / 100));
  const experiments = Math.min(meta.experiments, Math.floor((meta.experiments * effectiveProgress) / 100));

  return (
    <section id={embedded ? "notes" : "chapter-overview"} className="science-discovery-hero" data-lang={lang}>
      <div className="science-discovery-stars" aria-hidden="true" />
      <div className="science-discovery-particle science-particle-one" aria-hidden="true" />
      <div className="science-discovery-particle science-particle-two" aria-hidden="true" />
      {!embedded && onBack && onChangeLang && (
        <div className="science-discovery-hero-topline">
          <button type="button" className="science-discovery-control" onClick={onBack}>
            <ArrowLeft /> {bm ? "Kembali ke makmal" : "Back to laboratories"}
          </button>
          <button type="button" className="science-discovery-control" onClick={onChangeLang}>
            <Orbit /> {lang === "dlp" ? "DLP · English" : "BM · Bahasa Melayu"}
          </button>
        </div>
      )}

      <div className="science-discovery-hero-grid">
        <div className="science-discovery-hero-copy">
          <div className="science-live-status"><span /> {bm ? "STESEN PENYELIDIKAN AKTIF" : "RESEARCH STATION ONLINE"}</div>
          <p className="science-lab-kicker">{bm ? "Makmal Penyelidikan" : "Research Laboratory"} {String(chapter).padStart(2, "0")}</p>
          <h1>{title}</h1>
          <p className="science-discovery-intro">
            {bm
              ? "Masuki modul penyelidikan, perhatikan bukti dan bina kefahaman saintifik anda."
              : "Enter the research modules, examine the evidence, and build your scientific understanding."}
          </p>
          <div className="science-hero-metadata">
            <span><Clock3 /> {meta.minutes} {bm ? "min bacaan" : "min read"}</span>
            <span><Sparkles /> {meta.modules} {bm ? "penemuan" : "discoveries"}</span>
            <span><Gauge /> {bm ? (meta.difficulty === "Foundation" ? "Asas" : meta.difficulty === "Core" ? "Teras" : "Lanjutan") : meta.difficulty}</span>
          </div>
        </div>
        <ScienceLabIllustration chapter={chapter} />
      </div>

      <div className="science-progress-console">
        <div className="science-console-heading">
          <div><span>{bm ? "TELEMETRI MAKMAL" : "LAB TELEMETRY"}</span><h2>{bm ? "Kemajuan Penyelidikan" : "Research Progress"}</h2></div>
          <p>{Math.round(effectiveProgress)}% {bm ? "diselaraskan" : "synchronised"}</p>
        </div>
        <div className="science-progress-grid">
          <ProgressRing value={effectiveProgress} label={bm ? "Kemajuan" : "Research"} />
          <div className="science-progress-datum"><BrainCircuit /><strong>{mastered}/{meta.modules}</strong><span>{bm ? "Konsep Dikuasai" : "Concepts Mastered"}</span></div>
          <div className="science-progress-datum"><Eye /><strong>{mastered}</strong><span>{bm ? "Penemuan Dibuka" : "Discoveries Unlocked"}</span></div>
          <div className="science-progress-datum"><FlaskConical /><strong>{experiments}/{meta.experiments}</strong><span>{bm ? "Eksperimen Selesai" : "Experiments Completed"}</span></div>
          <ProgressRing value={readingProgress} label={bm ? "Bacaan" : "Reading"} />
        </div>
      </div>
    </section>
  );
}

export function MiniInvestigation({ lang }: { lang: "en" | "bm" }) {
  const bm = lang === "bm";
  return (
    <aside className="science-mini-investigation">
      <div className="science-mini-investigation-heading">
        <div className="science-mini-icon"><Microscope /></div>
        <div>
          <p>{bm ? "JEDA RASA INGIN TAHU" : "CURIOSITY CHECKPOINT"}</p>
          <h3>{bm ? "Penyiasatan Mini" : "Mini Investigation"}</h3>
        </div>
      </div>
      <p className="science-mini-question">
        {bm
          ? "Apakah hubungan yang dapat anda kenal pasti antara pemerhatian dalam modul penyelidikan ini?"
          : "What connections can you identify between the observations in this research module?"}
      </p>
      <details>
        <summary><Lightbulb /> {bm ? "Dedahkan Panduan" : "Reveal Answer"}</summary>
        <p>
          {bm
            ? "Semak semula konsep dan bukti di atas, kemudian bandingkan dengan penjelasan anda sendiri."
            : "Revisit the concepts and evidence above, then compare them with your own explanation."}
        </p>
      </details>
    </aside>
  );
}

const DISCOVERY_MODES = {
  en: ["Observation", "Discovery", "Key Concept", "Real Life Connection", "Science Fact", "Remember This", "Experiment Tip"],
  bm: ["Pemerhatian", "Penemuan", "Konsep Utama", "Hubungan Dunia Sebenar", "Fakta Sains", "Ingat Ini", "Tip Eksperimen"],
} as const;

export function ResearchModuleMeta({
  index,
  total,
  title,
  lang,
}: {
  index: number;
  total: number;
  title: string;
  lang: "en" | "bm";
}) {
  const bm = lang === "bm";
  const mode = DISCOVERY_MODES[lang][index % DISCOVERY_MODES[lang].length];
  const minutes = Math.max(3, Math.round(22 / total));
  return (
    <div className="science-module-meta">
      <span className="science-module-mode"><Sparkles /> {mode}</span>
      <span><BookOpenCheck /> {bm ? "Objektif" : "Objective"}: {title}</span>
      <span><Clock3 /> {minutes} min</span>
    </div>
  );
}
