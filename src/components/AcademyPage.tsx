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
  Rocket,
  Target,
} from "lucide-react";

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
    <div className="relative hidden min-h-[220px] overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#050816]/50 lg:block">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_32%,rgba(99,102,241,0.28),transparent_32%),radial-gradient(circle_at_20%_78%,rgba(59,130,246,0.16),transparent_34%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(255,255,255,0.85)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute left-8 top-8 h-11 w-11 rounded-full bg-[radial-gradient(circle_at_34%_27%,#FED7AA_0%,#F97316_42%,#7C2D12_100%)] shadow-[0_0_28px_rgba(249,115,22,0.38)]" />
      <div className="absolute right-8 top-7 h-16 w-16 rounded-full bg-[radial-gradient(circle_at_31%_24%,#E0F2FE_0%,#8B5CF6_38%,#1E1B4B_100%)] opacity-85 shadow-[0_0_40px_rgba(139,92,246,0.4)]">
        <span className="absolute left-[-15%] top-1/2 h-[22%] w-[130%] -translate-y-1/2 rotate-[-18deg] rounded-full border border-[#BAE6FD]/35" />
      </div>
      <div className="absolute bottom-8 left-10 h-12 w-12 rounded-full bg-[radial-gradient(circle_at_35%_26%,#D1FAE5_0%,#10B981_42%,#064E3B_100%)] opacity-75 shadow-[0_0_32px_rgba(16,185,129,0.34)]" />
      <div className="absolute bottom-9 left-8 h-16 w-[72%] -rotate-[20deg] rounded-full bg-[#8B5CF6]/18 blur-2xl" />
      <div className="animate-float absolute right-10 top-12 h-36 w-36 rotate-[-18deg] rounded-[2.5rem] border border-white/[0.10] bg-gradient-to-br from-white via-[#CBD5E1] to-[#64748B] shadow-[0_24px_60px_rgba(0,0,0,0.38)]">
        <div className="absolute left-7 top-5 h-16 w-16 rounded-full bg-gradient-to-br from-white to-[#94A3B8] p-2 shadow-[0_12px_28px_rgba(0,0,0,0.28)]">
          <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_34%_22%,#F8FBFF_0%,#60A5FA_34%,#020617_100%)]" />
        </div>
        <div className="absolute bottom-7 left-8 h-10 w-16 rounded-2xl bg-[#CBD5E1]" />
        <div className="absolute -bottom-6 left-2 h-8 w-28 rounded-full bg-gradient-to-r from-[#8B5CF6]/0 via-[#8B5CF6]/80 to-[#60A5FA]/90 blur-sm" />
        <Rocket className="absolute bottom-3 right-3 h-12 w-12 rotate-[28deg] text-[#1E1B4B]" />
      </div>
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
  const learning = emphasis === "learning";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group rounded-3xl border border-white/[0.08] bg-[#101827]/58 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-[#101827]/86 hover:shadow-[0_20px_60px_rgba(99,102,241,0.20)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816] ${
        learning ? "min-w-[260px] p-6 text-left" : "min-w-[180px] p-5"
      }`}
    >
      <div
        className={`relative flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 ${
          learning ? "h-24 w-24" : "mx-auto h-24 w-24"
        }`}
        style={{
          background: `radial-gradient(circle at 32% 25%, rgba(255,255,255,0.78), ${planet.color} 35%, #101827 78%)`,
          boxShadow: `0 0 38px ${planet.glow}`,
        }}
      >
        <span className="absolute h-[112px] w-[40px] rotate-[-58deg] rounded-full border border-white/35 transition-transform group-hover:rotate-[-45deg]" />
        <Icon className="relative z-10 h-9 w-9 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]" />
      </div>
      <p className={`${learning ? "mt-6 text-xl" : "mt-4 text-sm"} font-bold`}>
        {title ?? planet.name}
      </p>
      <p className="text-xs font-semibold text-[#94A3B8]">{subtitle ?? planet.label}</p>
      {counts && (
        <div
          className={`mt-4 grid gap-1.5 text-center ${learning ? "grid-cols-2" : "grid-cols-3"}`}
        >
          {[
            ["Ch", counts.chapters],
            ["Cards", counts.flashcards],
            ...(learning ? [] : ([["Quiz", counts.quizzes]] as Array<[string, number]>)),
          ].map(([label, value]) => (
            <span key={label} className="rounded-2xl bg-white/[0.05] px-2 py-2">
              <span className="block text-sm font-bold text-white">{value}</span>
              <span className="block text-[10px] font-semibold text-[#94A3B8]">{label}</span>
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
  return (
    <Link
      to={to}
      search={{ subject: subjectId, form: 1 }}
      className="group min-w-[128px] text-center"
    >
      <div
        className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
        style={{
          background: `radial-gradient(circle at 32% 25%, rgba(255,255,255,0.78), ${planet.color} 35%, #101827 78%)`,
          boxShadow: `0 0 38px ${planet.glow}`,
        }}
      >
        <span className="absolute h-[112px] w-[40px] rotate-[-58deg] rounded-full border border-white/35 transition-transform group-hover:rotate-[-45deg]" />
        <Icon className="relative z-10 h-9 w-9 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]" />
      </div>
      <p className="mt-4 text-sm font-bold">{planet.name}</p>
      <p className="text-xs font-semibold text-[#94A3B8]">{planet.label}</p>
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
