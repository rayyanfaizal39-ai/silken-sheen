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
} from "lucide-react";
import astronautRocket from "@/assets/premium-astronaut-rocket.png";

const subjectPlanetStyles = {
  science: {
    name: "Science",
    label: "Sains",
    color: "#3B82F6",
    glow: "rgba(59, 130, 246, 0.52)",
    icon: FlaskConical,
  },
  sejarah: {
    name: "Sejarah",
    label: "Sejarah",
    color: "#F97316",
    glow: "rgba(249, 115, 22, 0.5)",
    icon: GraduationCap,
  },
  geography: {
    name: "Geography",
    label: "Geografi",
    color: "#10B981",
    glow: "rgba(16, 185, 129, 0.48)",
    icon: Compass,
  },
  english: {
    name: "English",
    label: "English",
    color: "#A855F7",
    glow: "rgba(168, 85, 247, 0.5)",
    icon: Languages,
  },
  math: {
    name: "Mathematics",
    label: "Matematik",
    color: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.48)",
    icon: Target,
  },
  bm: {
    name: "Bahasa Melayu",
    label: "BM",
    color: "#EC4899",
    glow: "rgba(236, 72, 153, 0.5)",
    icon: BookOpen,
  },
} as const;

export type SubjectPlanetId = keyof typeof subjectPlanetStyles;

export function AcademyPageShell({
  children,
  className = "max-w-7xl",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className="relative isolate min-h-svh overflow-hidden px-4 pb-[calc(var(--mobile-content-bottom)+1rem)] pt-10 text-white sm:px-8 md:py-14">
      <AcademyBackdrop />
      <div className={`relative z-10 mx-auto w-full ${className}`}>{children}</div>
    </section>
  );
}

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
    <div className="mb-7 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:p-8">
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
              <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
                {stat.label}
              </p>
              <p className={`mt-1 font-display text-3xl font-bold ${stat.tone ?? "text-white"}`}>
                {stat.value}
              </p>
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

export function AcademyPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-6 ${className}`}
    >
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
    <div className="mb-5 flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">{eyebrow}</p>
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      {description && (
        <p className="hidden max-w-sm text-right text-sm text-[#94A3B8] sm:block">{description}</p>
      )}
    </div>
  );
}

export function SubjectPlanetButton({
  subjectId,
  title,
  subtitle,
  counts,
  ctaLabel,
  emphasis = "default",
  onClick,
}: {
  subjectId: string;
  title?: string;
  subtitle?: string;
  counts?: { chapters: number; flashcards: number; quizzes: number };
  ctaLabel?: string;
  emphasis?: "default" | "learning";
  onClick: () => void;
}) {
  const planet = subjectPlanetStyles[subjectId as SubjectPlanetId] ?? subjectPlanetStyles.science;
  const Icon = planet.icon;
  const contentTotal = (counts?.flashcards ?? 0) + (counts?.quizzes ?? 0);
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative min-h-[245px] overflow-hidden rounded-3xl border border-white/[0.08] bg-[#101827]/72 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-[#101827]/92 hover:shadow-[0_22px_70px_rgba(99,102,241,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
    >
      <div
        className="absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-25 blur-2xl transition-opacity group-hover:opacity-45"
        style={{ background: planet.color }}
      />
      <span
        className="absolute right-5 top-5 h-28 w-12 rotate-[-58deg] rounded-full border border-white/20"
        style={{ boxShadow: `0 0 34px ${planet.glow}` }}
      />
      <div
        className="relative flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${planet.color}33, rgba(255,255,255,0.08))`,
          color: planet.color,
          boxShadow: `0 0 32px ${planet.glow}`,
        }}
      >
        <Icon className="relative z-10 h-9 w-9 drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]" />
      </div>
      <p className="relative mt-5 font-display text-2xl font-bold leading-tight">
        {title ?? planet.name}
      </p>
      <p className="relative mt-1 text-sm font-semibold text-[#94A3B8]">
        {subtitle ?? planet.label}
      </p>
      {counts && (
        <div className="relative mt-5 grid grid-cols-2 gap-2">
          {[
            ["Chapters", counts.chapters],
            ["Cards / Questions", contentTotal],
          ].map(([label, value]) => (
            <span
              key={label}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.05] px-3 py-2"
            >
              <span className="block text-lg font-bold text-white">{value}</span>
              <span className="block text-[10px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                {label}
              </span>
            </span>
          ))}
        </div>
      )}
      {ctaLabel && (
        <span className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-4 py-3 text-sm font-bold text-white shadow-[0_0_28px_rgba(99,102,241,0.30)] transition-transform group-hover:scale-[1.02]">
          {ctaLabel}
        </span>
      )}
    </button>
  );
}

export function SubjectPlanetLink({
  subjectId,
  to = "/notes",
}: {
  subjectId: SubjectPlanetId;
  to?: "/notes" | "/flashcards" | "/quizzes";
}) {
  const planet = subjectPlanetStyles[subjectId];
  const Icon = planet.icon;
  const chapterCount =
    subjectId === "math" || subjectId === "geography"
      ? 13
      : subjectId === "science"
        ? 9
        : subjectId === "sejarah"
          ? 8
          : subjectId === "english"
            ? 4
            : 1;
  return (
    <Link
      to={to}
      search={{ subject: subjectId, form: 1 }}
      className="group relative block min-h-[245px] overflow-hidden rounded-3xl border border-white/[0.08] bg-[#101827]/72 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-[#101827]/92 hover:shadow-[0_22px_70px_rgba(99,102,241,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
    >
      <div
        className="absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-25 blur-2xl transition-opacity group-hover:opacity-45"
        style={{ background: planet.color }}
      />
      <span
        className="absolute right-5 top-5 h-28 w-12 rotate-[-58deg] rounded-full border border-white/20"
        style={{ boxShadow: `0 0 34px ${planet.glow}` }}
      />
      <div
        className="relative flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${planet.color}33, rgba(255,255,255,0.08))`,
          color: planet.color,
          boxShadow: `0 0 32px ${planet.glow}`,
        }}
      >
        <Icon className="h-9 w-9 drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]" />
      </div>
      <p className="relative mt-5 font-display text-2xl font-bold leading-tight">{planet.name}</p>
      <p className="relative mt-1 text-sm font-semibold text-[#94A3B8]">{planet.label}</p>
      <div className="relative mt-5 grid grid-cols-2 gap-2">
        <span className="rounded-2xl border border-white/[0.07] bg-white/[0.05] px-3 py-2">
          <span className="block text-lg font-bold text-white">{chapterCount}</span>
          <span className="block text-[10px] font-semibold uppercase tracking-wide text-[#94A3B8]">
            Chapters
          </span>
        </span>
        <span className="rounded-2xl border border-white/[0.07] bg-white/[0.05] px-3 py-2">
          <span className="block text-lg font-bold text-white">Ready</span>
          <span className="block text-[10px] font-semibold uppercase tracking-wide text-[#94A3B8]">
            Content
          </span>
        </span>
      </div>
      <span className="relative mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-4 py-3 text-sm font-bold text-white shadow-[0_0_28px_rgba(99,102,241,0.30)] transition-transform group-hover:scale-[1.02]">
        Start Learning
      </span>
    </Link>
  );
}

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
