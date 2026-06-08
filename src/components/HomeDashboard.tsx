import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Compass,
  FlaskConical,
  GraduationCap,
  Library,
  NotebookTabs,
  PlayCircle,
  Sparkles,
  Trophy,
} from "lucide-react";
import { AstronautScene } from "@/components/AstronautScene";
import { SubjectPlanetLink } from "@/components/AcademyPage";

const continueCards = [
  {
    subject: "Science",
    chapter: "Bab 7: Udara",
    pct: 72,
    color: "#3B82F6",
    icon: FlaskConical,
    id: "science",
  },
  {
    subject: "Bahasa Melayu",
    chapter: "Tatabahasa dan Karangan",
    pct: 58,
    color: "#EC4899",
    icon: BookOpen,
    id: "bm",
  },
  {
    subject: "Sejarah",
    chapter: "Zaman Air Batu",
    pct: 43,
    color: "#F97316",
    icon: GraduationCap,
    id: "sejarah",
  },
  {
    subject: "Geography",
    chapter: "Arah dan Kedudukan",
    pct: 64,
    color: "#10B981",
    icon: Compass,
    id: "geography",
  },
] as const;

const quickAccess = [
  {
    title: "Notes",
    description: "Smart KSSM summaries",
    to: "/notes",
    icon: NotebookTabs,
    color: "#3B82F6",
  },
  {
    title: "Flashcards",
    description: "Fast active recall",
    to: "/flashcards",
    icon: Library,
    color: "#8B5CF6",
  },
  {
    title: "Quizzes",
    description: "Practice with instant feedback",
    to: "/quizzes",
    icon: Brain,
    color: "#F59E0B",
  },
  {
    title: "Mind Maps",
    description: "See topics connected",
    to: "/notes",
    icon: Compass,
    color: "#10B981",
  },
  {
    title: "Videos",
    description: "Learn chapter by chapter",
    to: "/notes",
    icon: PlayCircle,
    color: "#EC4899",
  },
] as const;

const goals = [
  { label: "Study 2 Chapters", done: true },
  { label: "Complete Flashcards", done: true },
  { label: "Take Quiz", done: false },
] as const;

export function HomeDashboard() {
  return (
    <section className="px-4 py-6 pb-[calc(var(--mobile-content-bottom)+1rem)] sm:px-6 lg:px-8 lg:pb-10">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-6">
          <section className="relative isolate min-h-[460px] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#070A18] shadow-[0_28px_90px_rgba(0,0,0,0.45)] md:min-h-[520px]">
            {/* Unified cosmic scene — background, planets, astronaut all share one canvas */}
            <AstronautScene />

            {/* Soft left-side legibility scrim so type stays crisp over the scene */}
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(7,10,24,0.92)_0%,rgba(7,10,24,0.78)_38%,rgba(7,10,24,0.18)_62%,transparent_82%)]"
              aria-hidden
            />

            {/* Midground content — title + CTAs sit on the same canvas as the astronaut */}
            <div className="relative z-20 flex min-h-[460px] flex-col justify-center px-6 py-10 md:min-h-[520px] md:px-12 md:py-14">
              <div className="max-w-xl">
                <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.06] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/75 backdrop-blur-xl">
                  <Sparkles className="h-3.5 w-3.5 text-[#A78BFA]" />
                  Premium KSSM Learning
                </p>
                <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl xl:text-7xl">
                  <span className="block">Work Smarter.</span>
                  <span className="mt-2 block bg-gradient-to-r from-[#818CF8] via-[#A78BFA] to-[#F472B6] bg-clip-text text-transparent">
                    Achieve More.
                  </span>
                </h1>
                <p className="mt-6 max-w-md text-base leading-7 text-white/65">
                  AcadeMy helps Malaysian students master KSSM subjects with smart notes, mind
                  maps, quizzes, videos and AI-powered learning.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/notes"
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-7 py-4 text-sm font-bold text-white shadow-[0_20px_50px_-10px_rgba(99,102,241,0.6)] transition-transform hover:scale-[1.03]"
                  >
                    Start Learning
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/[0.12] bg-white/[0.05] px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/[0.10]"
                  >
                    My Progress
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating glass cards near astronaut — anchor it into the scene */}
            <div className="pointer-events-none absolute right-4 top-10 z-30 hidden items-center gap-3 rounded-2xl border border-white/[0.10] bg-white/[0.06] p-3 shadow-2xl backdrop-blur-2xl md:right-8 md:top-12 md:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6366F1]/25">
                <span className="h-2.5 w-2.5 rounded-full bg-[#A78BFA]" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/45">
                  Daily Streak
                </p>
                <p className="text-sm font-extrabold text-white">12 Days</p>
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-6 right-6 z-30 hidden rounded-2xl border border-white/[0.10] bg-white/[0.06] p-3 shadow-2xl backdrop-blur-2xl md:bottom-10 md:right-12 md:block">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-bold uppercase tracking-wide text-white/65">
                  Math Mastery
                </span>
              </div>
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/[0.10]">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
              </div>
            </div>

            {/* Bottom fade into the page surface */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070A18] to-transparent"
              aria-hidden
            />
          </section>


          <section className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
                  Choose Subject
                </p>
                <h2 className="font-display text-2xl font-bold">Clear Learning Worlds</h2>
              </div>
              <Link
                to="/subjects"
                className="hidden rounded-2xl border border-white/[0.08] px-4 py-2 text-sm font-bold text-[#94A3B8] transition-colors hover:text-white sm:inline-flex"
              >
                View All
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {(["science", "math", "english", "geography", "sejarah", "bm"] as const).map((id) => (
                <SubjectPlanetLink key={id} subjectId={id} to="/notes" />
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold">Continue Learning</h2>
              <Link
                to="/notes"
                className="rounded-2xl border border-white/[0.08] px-4 py-2 text-sm font-bold text-[#94A3B8] transition-colors hover:text-white"
              >
                View All
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {continueCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.subject}
                    to="/notes"
                    search={{ subject: card.id, form: 1 }}
                    className="group rounded-3xl border border-white/[0.08] bg-[#101827]/78 p-4 transition-all hover:-translate-y-1 hover:bg-[#101827]"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-2xl"
                        style={{ background: `${card.color}24`, color: card.color }}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-bold">{card.subject}</p>
                          <span className="text-xs font-bold text-[#94A3B8]">{card.pct}%</span>
                        </div>
                        <p className="mt-1 truncate text-xs text-[#94A3B8]">{card.chapter}</p>
                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.08]">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${card.pct}%`, background: card.color }}
                          />
                        </div>
                      </div>
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] transition-transform group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {quickAccess.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  to={item.to}
                  className="group rounded-3xl border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl transition-all hover:-translate-y-1 hover:bg-[#101827]/80"
                >
                  <span
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: `${item.color}22`, color: item.color }}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#94A3B8]">{item.description}</p>
                </Link>
              );
            })}
          </section>
        </div>

        <aside className="space-y-6">
          <ProgressPanel />
          <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/68 p-5 backdrop-blur-2xl">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F59E0B]/20 text-[#F59E0B]">
                <Trophy className="h-7 w-7" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold">Great job!</h2>
                <p className="mt-1 text-sm leading-6 text-[#94A3B8]">
                  Keep your momentum today with a focused chapter sprint.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/68 p-5 backdrop-blur-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Daily Goals</h2>
              <span className="text-xs font-bold text-[#94A3B8]">2/3</span>
            </div>
            <div className="space-y-3">
              {goals.map((goal) => (
                <div
                  key={goal.label}
                  className="flex items-center gap-3 rounded-2xl bg-white/[0.05] p-3"
                >
                  <CheckCircle2
                    className={`h-5 w-5 ${goal.done ? "text-[#10B981]" : "text-[#94A3B8]"}`}
                  />
                  <span className="text-sm font-semibold">{goal.label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function ProgressPanel() {
  return (
    <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/68 p-5 backdrop-blur-2xl">
      <h2 className="font-display text-xl font-bold">Your Progress</h2>
      <div className="my-7 flex justify-center">
        <div
          className="relative grid h-44 w-44 place-items-center rounded-full"
          style={{
            background: "conic-gradient(#6366F1 0deg 268deg, rgba(255,255,255,0.08) 268deg 360deg)",
          }}
        >
          <div className="grid h-32 w-32 place-items-center rounded-full bg-[#101827] shadow-inner">
            <div className="text-center">
              <p className="font-display text-4xl font-bold">74%</p>
              <p className="text-xs font-bold text-[#94A3B8]">Complete</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-3">
        {[
          ["Chapters Completed", "18/24"],
          ["Study Time", "12h 40m"],
          ["Quiz Accuracy", "86%"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-2xl bg-white/[0.05] px-4 py-3"
          >
            <span className="text-sm text-[#94A3B8]">{label}</span>
            <span className="font-bold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
