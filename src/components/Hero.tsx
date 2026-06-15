import { Link } from "@tanstack/react-router";
import { useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react";
import { studyHref } from "@/lib/study-routing";

type SubjectId = "math" | "science" | "sejarah" | "geography" | "bm" | "english";
type StudyType = "notes" | "quizzes" | "flashcards";

type PlanetTheme = {
  id: SubjectId;
  label: string;
  description: string;
  emoji: string;
  color: string;
  from: string;
  via: string;
  to: string;
  glow: string;
  ring: string;
  art: "math" | "science" | "history" | "geo" | "bm" | "english";
};

const PLANETS: PlanetTheme[] = [
  {
    id: "math",
    label: "Mathematics",
    description: "Algebra • Geometry • Numbers",
    emoji: "📐",
    color: "from-indigo-500 to-purple-600",
    from: "#38bdf8",
    via: "#2563eb",
    to: "#4f46e5",
    glow: "rgba(56, 189, 248, 0.56)",
    ring: "rgba(125, 211, 252, 0.35)",
    art: "math",
  },
  {
    id: "science",
    label: "Science",
    description: "Biology • Chemistry • Physics",
    emoji: "🔬",
    color: "from-emerald-500 to-teal-600",
    from: "#34d399",
    via: "#10b981",
    to: "#0f766e",
    glow: "rgba(52, 211, 153, 0.52)",
    ring: "rgba(110, 231, 183, 0.34)",
    art: "science",
  },
  {
    id: "sejarah",
    label: "Sejarah",
    description: "Tamadun • Warisan • Malaysia",
    emoji: "🏛️",
    color: "from-amber-500 to-yellow-500",
    from: "#fde047",
    via: "#f59e0b",
    to: "#92400e",
    glow: "rgba(250, 204, 21, 0.5)",
    ring: "rgba(253, 224, 71, 0.32)",
    art: "history",
  },
  {
    id: "geography",
    label: "Geografi",
    description: "Maps • Earth • Environment",
    emoji: "🌏",
    color: "from-cyan-500 to-emerald-500",
    from: "#22d3ee",
    via: "#14b8a6",
    to: "#16a34a",
    glow: "rgba(34, 211, 238, 0.48)",
    ring: "rgba(125, 211, 252, 0.32)",
    art: "geo",
  },
  {
    id: "bm",
    label: "Bahasa Melayu",
    description: "Tatabahasa • Karangan • Bahasa",
    emoji: "📘",
    color: "from-rose-500 to-orange-500",
    from: "#fb7185",
    via: "#ef4444",
    to: "#ea580c",
    glow: "rgba(251, 113, 133, 0.48)",
    ring: "rgba(253, 164, 175, 0.32)",
    art: "bm",
  },
  {
    id: "english",
    label: "English",
    description: "Grammar • Reading • Writing",
    emoji: "🇬🇧",
    color: "from-sky-500 to-blue-600",
    from: "#c084fc",
    via: "#8b5cf6",
    to: "#6d28d9",
    glow: "rgba(192, 132, 252, 0.5)",
    ring: "rgba(216, 180, 254, 0.34)",
    art: "english",
  },
];

const FORM_OPTIONS = [
  { label: "Form 1", value: "1" },
  { label: "Form 2", value: "2" },
  { label: "Form 3", value: "3" },
];

const STUDY_OPTIONS: { label: string; value: StudyType }[] = [
  { label: "Notes", value: "notes" },
  { label: "Quizzes", value: "quizzes" },
  { label: "Flashcards", value: "flashcards" },
];

export function Hero() {
  const [selectedSubject, setSelectedSubject] = useState<PlanetTheme | null>(null);
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [revealedSubject, setRevealedSubject] = useState<SubjectId | null>(null);

  function closeModal() {
    setSelectedSubject(null);
    setSelectedForm(null);
  }

  function selectPlanet(planet: PlanetTheme) {
    const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
    if (canHover || revealedSubject === planet.id) {
      setSelectedSubject(planet);
      return;
    }
    setRevealedSubject(planet.id);
  }

  return (
    <section className="subject-orbit-hero relative isolate overflow-hidden px-4 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-40 lg:pt-44">
      <div className="study-world-nebula absolute inset-0 -z-20" />
      <div className="study-world-stars absolute inset-0 -z-10" />
      <div className="study-world-particles absolute inset-0 -z-10" />
      <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-background via-background/80 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="study-hero-copy mx-auto max-w-4xl animate-fade-up text-center">
          <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-300">
            Study Worlds
          </p>

          <h1 className="font-display text-5xl font-bold leading-[0.98] text-white sm:text-6xl lg:text-7xl">
            Work Smarter. <span className="study-gradient-text">Achieve More.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Explore your study worlds, master every chapter, and learn at your own pace.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <StudyButton to="/quizzes" variant="primary">
              Start Learning
            </StudyButton>
            <StudyButton to="/dashboard" variant="secondary">
              Continue Learning
            </StudyButton>
          </div>
        </div>

        <div className="mt-16 animate-study-rise sm:mt-20">
          <h2 className="mb-4 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            Choose Your Study World
          </h2>
          <p className="mx-auto mb-4 max-w-xl text-center text-sm leading-6 text-slate-400">
            Hover or tap a subject to discover where your next chapter can take you.
          </p>

          <div className="simple-orbit-stage">
            <div className="simple-orbit-ring simple-orbit-ring-outer" />
            <div className="simple-orbit-ring simple-orbit-ring-inner" />
            <div className="simple-academy-core" aria-hidden="true">
              <Sparkles className="h-8 w-8 text-nova-yellow" />
              <span>AcadeMY</span>
              <small>Learning Universe</small>
            </div>

            {PLANETS.map((planet, index) => (
              <SubjectPlanet
                key={planet.id}
                planet={planet}
                index={index}
                revealed={revealedSubject === planet.id}
                onSelect={() => selectPlanet(planet)}
              />
            ))}
          </div>
        </div>

        <LearningJourney />
      </div>

      {selectedSubject && (
        <StudyWorldModal
          subject={selectedSubject}
          selectedForm={selectedForm}
          onChooseForm={setSelectedForm}
          onClose={closeModal}
        />
      )}
    </section>
  );
}

function StudyButton({
  to,
  variant,
  children,
}: {
  to: "/quizzes" | "/dashboard";
  variant: "primary" | "secondary";
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className={
        variant === "primary"
          ? "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-accent to-nova-yellow bg-[length:200%_100%] px-7 py-3.5 text-sm font-bold text-slate-950 shadow-[0_18px_55px_-20px_oklch(0.88_0.2_95_/_0.9)] transition-all duration-300 hover:bg-[position:100%_0] hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-nova-yellow/80"
          : "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-7 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-white/[0.12] hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
      }
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function SubjectPlanet({
  planet,
  index,
  revealed,
  onSelect,
}: {
  planet: PlanetTheme;
  index: number;
  revealed: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`${planet.label} study world`}
      aria-expanded={revealed}
      className={`simple-subject-planet simple-subject-planet-${index} group ${revealed ? "is-revealed" : ""}`}
      style={
        {
          "--planet-from": planet.from,
          "--planet-via": planet.via,
          "--planet-to": planet.to,
          "--planet-glow": planet.glow,
          "--planet-ring": planet.ring,
          animationDelay: `${index * 0.18}s`,
        } as CSSProperties
      }
    >
      <span className={`simple-planet-orb bg-gradient-to-br ${planet.color} simple-planet-art-${planet.art}`}>
        <span className="simple-planet-sheen" />
        <span className="relative z-10 text-4xl drop-shadow-sm">{planet.emoji}</span>
      </span>
      <span className="simple-planet-panel">
        <span className="simple-planet-label">{planet.label}</span>
        <span className="simple-planet-description">{planet.description}</span>
        <span className="simple-planet-enter">Enter World</span>
      </span>
    </button>
  );
}

const JOURNEY_STEPS = [
  "Choose Subject",
  "Choose Form",
  "Learn With Notes",
  "Practice Quizzes",
  "Master Flashcards",
];

function LearningJourney() {
  return (
    <div className="learning-journey mx-auto mt-8 max-w-6xl">
      <p className="text-center text-xs font-extrabold uppercase tracking-[0.22em] text-cyan-300">
        Your Learning Journey
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-5">
        {JOURNEY_STEPS.map((step, index) => (
          <div key={step} className="learning-journey-step">
            <span className="learning-journey-number">{index + 1}</span>
            <span>{step}</span>
            {index < JOURNEY_STEPS.length - 1 && (
              <ArrowRight className="learning-journey-arrow h-4 w-4" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StudyWorldModal({
  subject,
  selectedForm,
  onChooseForm,
  onClose,
}: {
  subject: PlanetTheme;
  selectedForm: string | null;
  onChooseForm: (form: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-8">
      <button
        type="button"
        aria-label="Close study world chooser"
        className="absolute inset-0 bg-slate-950/72 backdrop-blur-md"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 text-white shadow-2xl"
        style={{ boxShadow: `0 30px 90px -45px ${subject.glow}` }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-slate-300 transition hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-4">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br ${subject.color} text-3xl shadow-lg`}
          >
            <span>{subject.emoji}</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
              Study World
            </p>
            <h3 className="font-display text-3xl font-bold">{subject.label}</h3>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {FORM_OPTIONS.map((form) => (
            <button
              key={form.value}
              type="button"
              onClick={() => onChooseForm(form.value)}
              className={`rounded-2xl border px-4 py-4 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 ${
                selectedForm === form.value
                  ? "border-white/30 bg-white text-slate-950"
                  : "border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1]"
              }`}
            >
              {form.label}
            </button>
          ))}
        </div>

        <div className="mt-8 animate-fade-up">
          <h4 className="font-display text-2xl font-bold">What do you want to study?</h4>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {STUDY_OPTIONS.map((option) => (
              <a
                key={option.value}
                href={selectedForm ? studyHref(option.value, subject.id, selectedForm) : undefined}
                aria-disabled={!selectedForm}
                className={`group rounded-2xl border border-white/10 px-4 py-4 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 ${
                  selectedForm
                    ? "bg-white/[0.06] text-white hover:-translate-y-0.5 hover:bg-white/[0.1]"
                    : "pointer-events-none bg-white/[0.035] text-slate-500"
                }`}
              >
                {option.label}
                <ArrowRight className="mt-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
