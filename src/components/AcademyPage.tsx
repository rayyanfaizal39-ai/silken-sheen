import { Link } from "@tanstack/react-router";
import type { ComponentType, ReactNode } from "react";
import {
  BookOpen,
  Brain,
  CheckCircle2,
  Compass,
  FlaskConical,
  GraduationCap,
  Languages,
  Target,
  ArrowRight,
} from "lucide-react";
import astronautRocket from "@/assets/premium-astronaut-rocket.png";
import { SubjectWorldArt } from "@/components/SubjectWorldArt";
import { PlanetEnvironment, type PlanetSubjectId } from "@/components/PlanetEnvironment";
import { getSubjectFormStats } from "@/content/registry";

// ─── Subject identity system ─────────────────────────────────────────────────
// Each subject has a fully unique visual identity: palette, art, atmosphere,
// world name, floating symbols, and subject-specific CTAs.
export const subjectPlanetStyles = {
  science: {
    name: "Science",
    label: "Sains",
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.55)",
    icon: FlaskConical,
    gradient: "from-sky-900 via-blue-900 to-teal-950",
    artClass: "planet-art-science",
    accentFrom: "#38BDF8",
    accentTo: "#0EA5E9",
    ring: "rgba(56,189,248,0.25)",
    tagline: "Explore the universe of life & matter",
    worldName: "Science Laboratory Planet",
    worldEyebrow: "🧪 Lab in Space",
    cta: "Run Experiment",
    atmosphere: "Exploration · Discovery · Experimentation",
    symbols: ["H₂O", "⚛", "DNA"],
  },
  sejarah: {
    name: "Sejarah",
    label: "Sejarah",
    color: "#FB923C",
    glow: "rgba(251,146,60,0.55)",
    icon: GraduationCap,
    gradient: "from-orange-950 via-amber-900 to-red-950",
    artClass: "planet-art-sejarah",
    accentFrom: "#FB923C",
    accentTo: "#F97316",
    ring: "rgba(251,146,60,0.25)",
    tagline: "Journey through Malaysia's rich past",
    worldName: "Time Traveller Realm",
    worldEyebrow: "🏛️ History Vault",
    cta: "Travel Through Time",
    atmosphere: "Mystery · History · Legacy",
    symbols: ["1957", "BCE", "📜"],
  },
  geography: {
    name: "Geography",
    label: "Geografi",
    color: "#34D399",
    glow: "rgba(52,211,153,0.55)",
    icon: Compass,
    gradient: "from-emerald-950 via-teal-900 to-cyan-950",
    artClass: "planet-art-geo",
    accentFrom: "#34D399",
    accentTo: "#10B981",
    ring: "rgba(52,211,153,0.25)",
    tagline: "Discover landscapes and peoples of Earth",
    worldName: "Explorer Planet",
    worldEyebrow: "🌍 Field Expedition",
    cta: "Begin Expedition",
    atmosphere: "Exploration · Adventure · Discovery",
    symbols: ["N", "S·E", "W"],
  },
  english: {
    name: "English",
    label: "English",
    color: "#C084FC",
    glow: "rgba(192,132,252,0.55)",
    icon: Languages,
    gradient: "from-violet-950 via-purple-900 to-indigo-950",
    artClass: "planet-art-english",
    accentFrom: "#C084FC",
    accentTo: "#A855F7",
    ring: "rgba(192,132,252,0.25)",
    tagline: "Master the language of the world",
    worldName: "Language Universe",
    worldEyebrow: "📖 Story Archive",
    cta: "Begin Your Story",
    atmosphere: "Storytelling · Communication · Creativity",
    symbols: ["ABC", "❝❞", "Vocab"],
  },
  math: {
    name: "Mathematics",
    label: "Matematik",
    color: "#FBBF24",
    glow: "rgba(251,191,36,0.55)",
    icon: Target,
    gradient: "from-amber-950 via-yellow-900 to-orange-950",
    artClass: "planet-art-math",
    accentFrom: "#FBBF24",
    accentTo: "#F59E0B",
    ring: "rgba(251,191,36,0.25)",
    tagline: "Solve problems with precision & logic",
    worldName: "Mathematics Galaxy",
    worldEyebrow: "🧮 Mission Control",
    cta: "Launch Mission",
    atmosphere: "Precision · Logic · Discovery",
    symbols: ["π", "∑", "∞"],
  },
  bm: {
    name: "Bahasa Melayu",
    label: "BM",
    color: "#F472B6",
    glow: "rgba(244,114,182,0.55)",
    icon: BookOpen,
    gradient: "from-rose-950 via-pink-900 to-fuchsia-950",
    artClass: "planet-art-bm",
    accentFrom: "#F472B6",
    accentTo: "#EC4899",
    ring: "rgba(244,114,182,0.25)",
    tagline: "Kuasai bahasa dan kesusasteraan Melayu",
    worldName: "Nusantara Language Realm",
    worldEyebrow: "📝 Dewan Sastera",
    cta: "Mula Belajar",
    atmosphere: "Budaya · Bahasa · Identiti",
    symbols: ["BM", "Tata", "Puisi"],
  },
} as const;

export type SubjectPlanetId = keyof typeof subjectPlanetStyles;

// ─── Planet card inner content ────────────────────────────────────────────────
// The subject's real shape (its world illustration) is the primary identity here —
// not an emoji, not floating text. The lucide icon is kept only as a small corner
// accent so the category still reads at a glance.
export function PlanetCardArt({ subjectId, planet }: { subjectId: SubjectPlanetId; planet: typeof subjectPlanetStyles[SubjectPlanetId] }) {
  const Icon = planet.icon;
  return (
    <div className={`relative h-[130px] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${planet.gradient}`}>
      {/* Ambient orb glow */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at 70% 35%, ${planet.accentFrom}50, transparent 65%)`,
        }}
      />
      {/* Subject art pattern */}
      <div className={`planet-art ${planet.artClass} absolute inset-0 opacity-30`} />
      {/* Star field */}
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle,rgba(255,255,255,0.9)_1px,transparent_1px),radial-gradient(circle,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-position:0_0,22px_18px] [background-size:38px_38px,58px_58px]" />

      {/* World illustration — the subject's actual recognisable shape */}
      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <SubjectWorldArt subjectId={subjectId} color={planet.color} width={196} height={118} />
      </div>

      {/* Small category icon badge — secondary accent, not the main identity */}
      <div
        className="absolute left-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-lg border border-white/15"
        style={{ background: `${planet.accentFrom}33`, boxShadow: `0 0 14px ${planet.glow}` }}
      >
        <Icon className="h-3.5 w-3.5" style={{ color: planet.color }} />
      </div>

      {/* Atmospheric ring */}
      <div
        className="absolute inset-[-4px] rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${planet.ring}` }}
      />
      {/* Shine sweep */}
      <div className="planet-card-shine absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}

// ─── Form coverage pills — shown on every subject card so Form 1/2/3 read as
// equal parts of the subject before it's even opened, instead of implying
// the subject is just "Form 1 + N chapters". Chapter counts come straight
// from the content registry (real per-form data, never a hardcoded number);
// a form with zero registered chapters reads "Soon" rather than "0".
function FormChapterPills({
  subjectId,
  planet,
}: {
  subjectId: string;
  planet: (typeof subjectPlanetStyles)[SubjectPlanetId];
}) {
  const formStats = getSubjectFormStats(subjectId);
  return (
    <div className="mt-3">
      <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/35">
        Learning Journey · {formStats.length} Forms
      </p>
      <div className="flex items-stretch gap-1.5">
        {formStats.map((stat) => {
          const ready = stat.chapterCount > 0;
          return (
            <div
              key={stat.form}
              className="flex-1 rounded-lg border px-1.5 py-1.5 text-center"
              style={{
                borderColor: ready ? `${planet.accentFrom}30` : "rgba(255,255,255,0.06)",
                background: ready ? `${planet.accentFrom}12` : "rgba(255,255,255,0.03)",
              }}
            >
              <span className="block text-[9px] font-bold uppercase tracking-wide text-white/40">
                {stat.form.replace("Form ", "F")}
              </span>
              <span
                className="block text-xs font-bold"
                style={{ color: ready ? planet.color : "rgba(255,255,255,0.35)" }}
              >
                {ready ? `${stat.chapterCount} Ch` : "Soon"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── SubjectPlanetLink (used on Home, Subjects pages) ────────────────────────
export function SubjectPlanetLink({
  subjectId,
  to = "/notes",
}: {
  subjectId: SubjectPlanetId;
  to?: "/notes" | "/mindmaps" | "/flashcards" | "/quizzes";
}) {
  const planet = subjectPlanetStyles[subjectId];
  return (
    <Link
      to={to}
      search={{ subject: subjectId, form: 1 }}
      className="academy-card group relative block h-full overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#0D1525]/80 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
      style={{
        boxShadow: `0 0 0 0 ${planet.glow}`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px -15px ${planet.glow}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 transparent";
      }}
    >
      {/* Planet art header */}
      <div className="p-3 pb-0">
        <PlanetCardArt subjectId={subjectId} planet={planet} />
      </div>

      {/* Info section */}
      <div className="p-4 pt-3">
        <div>
          <h3 className="font-display text-lg font-bold leading-tight text-white">{planet.name}</h3>
          <p className="mt-0.5 text-xs font-medium text-white/45">{planet.tagline}</p>
        </div>

        <FormChapterPills subjectId={subjectId} planet={planet} />

        {/* CTA — subject-specific label */}
        <div
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-white transition-all duration-200 group-hover:scale-[1.02]"
          style={{
            background: `linear-gradient(135deg, ${planet.accentFrom}, ${planet.accentTo})`,
            boxShadow: `0 4px 20px -4px ${planet.glow}`,
          }}
        >
          {planet.cta}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

// ─── SubjectPlanetButton (used in ChapterPicker/picker modals) ───────────────
export function SubjectPlanetButton({
  subjectId,
  title,
  subtitle,
  ctaLabel,
  emphasis = "default",
  onClick,
}: {
  subjectId: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  emphasis?: "default" | "learning";
  onClick: () => void;
}) {
  const planet = subjectPlanetStyles[subjectId as SubjectPlanetId] ?? subjectPlanetStyles.science;
  const pid = subjectId as SubjectPlanetId;

  return (
    <button
      type="button"
      onClick={onClick}
      className="academy-card group relative h-full w-full overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#0D1525]/80 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px -15px ${planet.glow}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Planet art header */}
      <div className="p-3 pb-0">
        <PlanetCardArt subjectId={pid} planet={planet} />
      </div>

      {/* Info section */}
      <div className="p-4 pt-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-bold leading-tight text-white">
              {title ?? planet.name}
            </h3>
            <p className="mt-0.5 text-xs text-white/45">{subtitle ?? planet.label}</p>
          </div>
        </div>

        <FormChapterPills subjectId={subjectId} planet={planet} />

        {ctaLabel && (
          <div
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-white transition-transform group-hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, ${planet.accentFrom}, ${planet.accentTo})`,
              boxShadow: `0 4px 20px -4px ${planet.glow}`,
            }}
          >
            {ctaLabel}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        )}
      </div>
    </button>
  );
}

// ─── Subject world banner — rendered when entering a subject ──────────────────
export function SubjectWorldBanner({ subjectId }: { subjectId: SubjectPlanetId }) {
  const planet = subjectPlanetStyles[subjectId];
  const Icon = planet.icon;
  return (
    <div
      className={`relative mb-6 overflow-hidden rounded-[2rem] border border-white/[0.10] bg-gradient-to-br ${planet.gradient}`}
      style={{ boxShadow: `0 0 70px -20px ${planet.glow}` }}
    >
      {/* World art pattern */}
      <div className={`planet-art ${planet.artClass} absolute inset-0 opacity-20`} />
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 78% 22%, ${planet.accentFrom}38, transparent 52%)`,
        }}
      />
      {/* Fine star field */}
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative z-10 flex items-center justify-between gap-4 p-5 md:p-7">
        <div className="min-w-0">
          <p
            className="mb-2 text-[11px] font-black uppercase tracking-[0.2em]"
            style={{ color: planet.color }}
          >
            {planet.worldEyebrow}
          </p>
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            {planet.worldName}
          </h2>
          <p className="mt-1.5 text-xs font-semibold tracking-wide text-white/38">
            {planet.atmosphere}
          </p>
        </div>

        {/* World illustration — replaces the plain icon orb as the banner's identity */}
        <div className="flex shrink-0 items-center gap-3">
          <SubjectWorldArt
            subjectId={subjectId}
            color={planet.color}
            width={132}
            height={92}
            className="hidden sm:block"
          />
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 shadow-2xl md:h-14 md:w-14"
            style={{
              background: `linear-gradient(135deg, ${planet.accentFrom}28, rgba(255,255,255,0.05))`,
              boxShadow: `0 0 32px ${planet.glow}`,
            }}
          >
            <Icon className="h-6 w-6 md:h-7 md:w-7" style={{ color: planet.color }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page shell ───────────────────────────────────────────────────────────────
export function AcademyPageShell({
  children,
  className = "max-w-7xl",
  subjectId,
}: {
  children: ReactNode;
  className?: string;
  /** When set, the page keeps that subject's planet atmosphere instead of the generic backdrop. */
  subjectId?: PlanetSubjectId;
}) {
  return (
    <section className="relative isolate min-h-svh overflow-x-clip px-4 pb-[calc(var(--mobile-content-bottom)+1rem)] pt-7 text-white sm:px-8 sm:pt-10 md:py-14">
      {subjectId ? <PlanetEnvironment subjectId={subjectId} /> : <AcademyBackdrop />}
      <div className={`relative z-10 mx-auto w-full ${className}`}>{children}</div>
    </section>
  );
}

// ─── Hero block ───────────────────────────────────────────────────────────────
export function AcademyHero({
  eyebrow,
  title,
  gradientTitle,
  description,
  stats,
  icon: Icon = Brain,
}: {
  eyebrow?: string;
  title: string;
  gradientTitle: string;
  description: string;
  stats?: Array<{ label: string; value: string | number; tone?: string }>;
  icon?: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="academy-surface mb-7 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-6 md:p-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.42fr)] lg:items-center">
        <div>
          <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
            <Icon className="h-3.5 w-3.5 text-[#8B5CF6]" />
            SMART LEARNING
          </p>
          {eyebrow && <p className="mb-2 text-sm font-semibold text-[#94A3B8]">{eyebrow}</p>}
          <h1 className="font-display text-4xl font-bold leading-[0.98] sm:text-5xl lg:text-6xl">
            {title && `${title} `}
            <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
              {gradientTitle}
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#94A3B8]">{description}</p>
        </div>
        <LearningHeroIllustration />
      </div>
      {stats && stats.length > 0 && (
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/[0.08] bg-[#101827]/78 p-4 shadow-[0_18px_55px_rgba(0,0,0,0.24)]"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">{stat.label}</p>
              <p className={`mt-1 font-display text-3xl font-bold ${stat.tone ?? "text-white"}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LearningHeroIllustration() {
  return (
    <div className="relative hidden min-h-[240px] overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#050816]/50 lg:block">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_32%,rgba(99,102,241,0.28),transparent_32%),radial-gradient(circle_at_20%_78%,rgba(59,130,246,0.16),transparent_34%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(255,255,255,0.85)_1px,transparent_1px)] [background-size:34px_34px]" />
      <img
        src={astronautRocket}
        alt="Premium 3D astronaut riding a rocket through a purple blue nebula"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#050816]/80 to-transparent" />
    </div>
  );
}

// ─── Panel + Section header ───────────────────────────────────────────────────
export function AcademyPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`academy-surface rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

export function AcademySectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">{eyebrow}</p>
        <h2 className="font-display text-2xl font-bold leading-tight">{title}</h2>
      </div>
      {description && (
        <p className="max-w-sm text-sm leading-6 text-[#94A3B8] sm:text-right">{description}</p>
      )}
    </div>
  );
}

// ─── Mini metric ──────────────────────────────────────────────────────────────
export function MiniMetric({
  label,
  value,
  done,
}: {
  label: string;
  value: string | number;
  done?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/[0.05] px-4 py-3">
      <span className="flex items-center gap-2 text-sm text-[#94A3B8]">
        {done && <CheckCircle2 className="h-4 w-4 text-[#10B981]" />}
        {label}
      </span>
      <span className="font-bold text-white">{value}</span>
    </div>
  );
}

// ─── Backdrop ─────────────────────────────────────────────────────────────────
function AcademyBackdrop() {
  return (
    <>
      <div className="absolute inset-0 -z-20 bg-[#050816]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.24),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.20),transparent_30%),radial-gradient(circle_at_72%_70%,rgba(16,185,129,0.10),transparent_28%)]" />
      <div className="absolute inset-0 -z-10 opacity-35 [background-image:radial-gradient(circle,rgba(255,255,255,0.72)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute left-[18%] top-[12%] -z-10 h-72 w-72 rounded-full bg-[#6366F1]/12 blur-3xl" />
      <div className="absolute right-[8%] top-[34%] -z-10 h-96 w-96 rounded-full bg-[#8B5CF6]/10 blur-3xl" />
    </>
  );
}
