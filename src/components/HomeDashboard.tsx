import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  Compass,
  FlaskConical,
  Flame,
  GraduationCap,
  Home,
  Languages,
  LayoutDashboard,
  Library,
  Medal,
  NotebookTabs,
  PlayCircle,
  Rocket,
  Search,
  Sparkles,
  Target,
  Trophy,
  Video,
} from "lucide-react";

const navItems = [
  { label: "Home", to: "/", icon: Home },
  { label: "My Progress", to: "/dashboard", icon: LayoutDashboard },
  { label: "Notes", to: "/notes", icon: NotebookTabs },
  { label: "Flashcards", to: "/flashcards", icon: Library },
  { label: "Quizzes", to: "/quizzes", icon: Brain },
  { label: "Mind Maps", to: "/notes", icon: Compass },
  { label: "Videos", to: "/notes", icon: Video },
  { label: "AI Tutor", to: "/dashboard", icon: Sparkles },
  { label: "Achievements", to: "/dashboard", icon: Medal },
] as const;

const subjects = [
  {
    name: "Science",
    label: "Sains",
    id: "science",
    color: "#3B82F6",
    glow: "rgba(59, 130, 246, 0.52)",
    icon: FlaskConical,
  },
  {
    name: "Sejarah",
    label: "Sejarah",
    id: "sejarah",
    color: "#F97316",
    glow: "rgba(249, 115, 22, 0.5)",
    icon: GraduationCap,
  },
  {
    name: "Geography",
    label: "Geografi",
    id: "geography",
    color: "#10B981",
    glow: "rgba(16, 185, 129, 0.48)",
    icon: Compass,
  },
  {
    name: "English",
    label: "English",
    id: "english",
    color: "#A855F7",
    glow: "rgba(168, 85, 247, 0.5)",
    icon: Languages,
  },
  {
    name: "Math",
    label: "Matematik",
    id: "math",
    color: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.48)",
    icon: Target,
  },
  {
    name: "Bahasa Melayu",
    label: "BM",
    id: "bm",
    color: "#EC4899",
    glow: "rgba(236, 72, 153, 0.5)",
    icon: BookOpen,
  },
] as const;

const continueCards = [
  {
    subject: "Science",
    chapter: "Chapter 2: Cell as Basic Unit",
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
    <div className="relative min-h-svh overflow-hidden bg-[#050816] text-white">
      <SpaceBackdrop />
      <aside className="fixed left-0 top-0 z-40 hidden h-svh w-[220px] border-r border-white/[0.08] bg-[#0B1220]/78 px-4 py-6 backdrop-blur-2xl lg:flex lg:flex-col">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-[0_0_34px_rgba(99,102,241,0.55)]">
            <Rocket className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold">AcadeMy</span>
        </Link>

        <nav className="mt-9 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.to === "/" && item.label === "Home";
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "bg-white/[0.10] text-white shadow-[0_0_28px_rgba(99,102,241,0.35)]"
                    : "text-[#94A3B8] hover:bg-white/[0.07] hover:text-white hover:translate-x-1"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${active ? "text-[#8B5CF6]" : "group-hover:text-[#6366F1]"}`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto overflow-hidden rounded-3xl border border-white/[0.08] bg-[#101827]/80 p-4 shadow-[0_18px_55px_rgba(0,0,0,0.35)]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#EC4899]">
            <Sparkles className="h-5 w-5" />
          </div>
          <p className="text-sm font-bold">Hi Student</p>
          <p className="mt-2 text-xs leading-5 text-[#94A3B8]">
            Ready to continue your learning journey?
          </p>
          <Link
            to="/notes"
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-2.5 text-sm font-bold text-[#050816] transition-transform hover:scale-[1.03]"
          >
            Let&apos;s Go
          </Link>
        </div>
      </aside>

      <main className="relative z-10 pb-28 lg:ml-[220px] lg:pb-10">
        <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#050816]/70 px-4 py-4 backdrop-blur-2xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
              <input
                aria-label="Search"
                placeholder="Search notes, topics, videos..."
                className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.06] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#6366F1]/60 focus:bg-white/[0.09] focus:shadow-[0_0_30px_rgba(99,102,241,0.22)]"
              />
            </div>
            <Link
              to="/dashboard"
              className="hidden items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.06] px-4 py-3 text-sm font-bold sm:flex"
            >
              <Flame className="h-4 w-4 text-[#F97316]" />7 day
            </Link>
            <button
              aria-label="Notifications"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.06] transition-colors hover:bg-white/[0.10]"
            >
              <Bell className="h-5 w-5 text-[#94A3B8]" />
            </button>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.06] px-2 py-2 sm:px-3"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]">
                <CircleUserRound className="h-5 w-5" />
              </span>
              <span className="hidden text-sm font-semibold md:inline">Student</span>
              <ChevronDown className="hidden h-4 w-4 text-[#94A3B8] md:inline" />
            </Link>
          </div>
        </header>

        <div className="grid gap-6 px-4 pt-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-6">
            <section className="grid min-h-[410px] gap-7 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:grid-cols-[1.05fr_0.95fr] md:p-9">
              <div className="relative z-10 flex flex-col justify-center">
                <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase text-[#94A3B8]">
                  <Sparkles className="h-3.5 w-3.5 text-[#8B5CF6]" />
                  Premium KSSM Learning
                </p>
                <h1 className="font-display text-5xl font-bold leading-[0.95] sm:text-6xl xl:text-7xl">
                  <span className="block">Work Smarter.</span>
                  <span className="mt-2 block bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
                    Achieve More.
                  </span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-8 text-[#94A3B8]">
                  AcadeMy helps Malaysian students master KSSM subjects with smart notes, mind maps,
                  quizzes, videos and AI-powered learning.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/notes"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-6 py-3.5 text-sm font-bold shadow-[0_0_38px_rgba(99,102,241,0.45)] transition-transform hover:scale-[1.03]"
                  >
                    Start Learning
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.06] px-6 py-3.5 text-sm font-bold transition-colors hover:bg-white/[0.10]"
                  >
                    My Progress
                  </Link>
                </div>
              </div>
              <AstronautScene />
            </section>

            <section className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6">
              <div className="flex gap-5 overflow-x-auto pb-3 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:pb-0">
                {subjects.map((subject, index) => {
                  const Icon = subject.icon;
                  return (
                    <Link
                      key={subject.id}
                      to="/notes"
                      search={{ subject: subject.id, form: 1 }}
                      className="group min-w-[128px] text-center"
                      style={{ animationDelay: `${index * 120}ms` }}
                    >
                      <div
                        className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `radial-gradient(circle at 32% 25%, rgba(255,255,255,0.78), ${subject.color} 35%, #101827 78%)`,
                          boxShadow: `0 0 38px ${subject.glow}`,
                        }}
                      >
                        <span className="absolute h-[112px] w-[40px] rotate-[-58deg] rounded-full border border-white/35 transition-transform group-hover:rotate-[-45deg]" />
                        <Icon className="relative z-10 h-9 w-9 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]" />
                      </div>
                      <p className="mt-4 text-sm font-bold">{subject.name}</p>
                      <p className="text-xs font-semibold text-[#94A3B8]">{subject.label}</p>
                    </Link>
                  );
                })}
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
                    You unlocked a focused learning streak. Keep your momentum today.
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
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.08]">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#6366F1] to-[#10B981]" />
              </div>
              <button className="mt-5 w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#050816] transition-transform hover:scale-[1.02]">
                Claim Daily Reward
              </button>
            </div>
          </aside>
        </div>
      </main>

      <nav className="fixed bottom-3 left-3 right-3 z-50 rounded-3xl border border-white/[0.08] bg-[#0B1220]/88 px-2 py-2 backdrop-blur-2xl lg:hidden">
        <div className="grid grid-cols-5 gap-1">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.to}
                className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-bold text-[#94A3B8] transition-colors hover:bg-white/[0.07] hover:text-white"
              >
                <Icon className="h-5 w-5" />
                {item.label === "Flashcards" ? "Cards" : item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
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

function AstronautScene() {
  return (
    <div className="relative min-h-[330px] overflow-hidden rounded-[1.75rem] bg-[radial-gradient(circle_at_70%_35%,rgba(99,102,241,0.14),transparent_31%),radial-gradient(circle_at_22%_72%,rgba(59,130,246,0.08),transparent_34%)] md:min-h-full">
      <div className="absolute right-0 top-10 h-56 w-56 rounded-full bg-[#6366F1]/8 blur-3xl" />
      <div className="absolute bottom-8 left-8 h-44 w-64 rounded-full bg-[#3B82F6]/8 blur-3xl animate-float-slow" />
      <div className="absolute left-[14%] top-[11%] h-24 w-36 rotate-[-18deg] rounded-full bg-[#8B5CF6]/9 blur-2xl" />

      <svg
        className="absolute inset-0 h-full w-full opacity-80"
        viewBox="0 0 420 420"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="sceneStar" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[
          [38, 74, 1.8, "0s"],
          [91, 184, 1.2, "1.1s"],
          [128, 42, 1.4, "0.4s"],
          [265, 66, 1.7, "1.7s"],
          [338, 124, 1.1, "0.8s"],
          [371, 238, 1.5, "1.4s"],
          [56, 302, 1.3, "1.9s"],
          [314, 333, 1.2, "0.2s"],
          [209, 373, 1.5, "1.2s"],
        ].map(([cx, cy, r, delay]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="url(#sceneStar)">
            <animate
              attributeName="opacity"
              values="0.25;0.9;0.32"
              dur="3.8s"
              begin={delay}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      <div className="animate-float-slow absolute left-[9%] top-[13%] h-10 w-10 rounded-full bg-[radial-gradient(circle_at_34%_27%,#FED7AA_0%,#F97316_42%,#7C2D12_100%)] shadow-[0_0_28px_rgba(249,115,22,0.38)] sm:h-12 sm:w-12">
        <span className="absolute inset-2 rounded-full border border-white/15" />
      </div>
      <div className="animate-float absolute right-[7%] top-[10%] h-14 w-14 rounded-full bg-[radial-gradient(circle_at_31%_24%,#E0F2FE_0%,#8B5CF6_38%,#1E1B4B_100%)] opacity-80 shadow-[0_0_40px_rgba(139,92,246,0.4)] blur-[0.2px] sm:h-16 sm:w-16">
        <span className="absolute left-[-15%] top-1/2 h-[22%] w-[130%] -translate-y-1/2 rotate-[-18deg] rounded-full border border-[#BAE6FD]/35" />
      </div>
      <div className="animate-float-slow absolute bottom-[10%] left-[14%] h-11 w-11 rounded-full bg-[radial-gradient(circle_at_35%_26%,#D1FAE5_0%,#10B981_42%,#064E3B_100%)] opacity-68 shadow-[0_0_32px_rgba(16,185,129,0.34)] blur-[0.35px] sm:h-12 sm:w-12">
        <span className="absolute inset-x-[-18%] top-[45%] h-[18%] rotate-[18deg] rounded-full border border-[#A7F3D0]/30" />
      </div>

      <div className="absolute bottom-[9%] left-[8%] h-20 w-[62%] -rotate-[19deg] rounded-full bg-[#8B5CF6]/18 blur-3xl" />

      <div className="animate-float absolute left-[63%] top-[44%] h-[318px] w-[318px] -translate-x-1/2 -translate-y-1/2 sm:h-[365px] sm:w-[365px] xl:h-[405px] xl:w-[405px]">
        <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle_at_58%_47%,rgba(255,255,255,0.10),rgba(139,92,246,0.13)_30%,transparent_67%)] blur-xl" />
        <svg
          className="relative h-full w-full drop-shadow-[0_26px_54px_rgba(0,0,0,0.42)]"
          viewBox="0 0 420 420"
          role="img"
          aria-label="Premium 3D astronaut riding a purple and blue rocket"
        >
          <defs>
            <radialGradient id="astronautSuit" cx="34%" cy="25%" r="78%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#F5F8FD" />
              <stop offset="58%" stopColor="#D9E2F0" />
              <stop offset="82%" stopColor="#9AA8BD" />
              <stop offset="100%" stopColor="#56657B" />
            </radialGradient>
            <radialGradient id="suitWarmth" cx="42%" cy="25%" r="74%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="54%" stopColor="#C7D2FE" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#1E293B" stopOpacity="0.48" />
            </radialGradient>
            <radialGradient id="helmetGlass" cx="37%" cy="24%" r="82%">
              <stop offset="0%" stopColor="#F8FBFF" />
              <stop offset="18%" stopColor="#BAE6FD" />
              <stop offset="42%" stopColor="#3B82F6" />
              <stop offset="70%" stopColor="#172554" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
            <linearGradient id="helmetReflection" x1="137" x2="214" y1="91" y2="153">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.86" />
              <stop offset="38%" stopColor="#DBEAFE" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="helmetRim" x1="122" x2="227" y1="80" y2="168">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="52%" stopColor="#D7E3F5" />
              <stop offset="100%" stopColor="#8393A9" />
            </linearGradient>
            <linearGradient id="rocketBody" x1="64" x2="326" y1="269" y2="170">
              <stop offset="0%" stopColor="#4338CA" />
              <stop offset="35%" stopColor="#8B5CF6" />
              <stop offset="68%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#F8FAFC" />
            </linearGradient>
            <linearGradient id="rocketShade" x1="128" x2="322" y1="264" y2="201">
              <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.46" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.34" />
            </linearGradient>
            <linearGradient id="flameTrail" x1="0" x2="198" y1="350" y2="255">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0" />
              <stop offset="44%" stopColor="#8B5CF6" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="plasmaCore" x1="18" x2="190" y1="348" y2="262">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0" />
              <stop offset="45%" stopColor="#C084FC" stopOpacity="0.78" />
              <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.92" />
            </linearGradient>
            <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                result="purpleGlow"
                values="0.54 0 0 0 0.16 0 0.28 0 0 0.10 0 0 0.92 0 0.40 0 0 0 0.82 0"
              />
              <feMerge>
                <feMergeNode in="purpleGlow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="premiumShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow
                dx="0"
                dy="16"
                stdDeviation="14"
                floodColor="#020617"
                floodOpacity="0.42"
              />
            </filter>
            <filter id="helmetGloss" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="12"
                stdDeviation="12"
                floodColor="#60A5FA"
                floodOpacity="0.22"
              />
              <feDropShadow
                dx="0"
                dy="-2"
                stdDeviation="4"
                floodColor="#FFFFFF"
                floodOpacity="0.18"
              />
            </filter>
            <filter id="motionBlur" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="7 2" />
            </filter>
          </defs>

          <g opacity="0.72">
            <circle cx="86" cy="93" r="2" fill="#FFFFFF" />
            <circle cx="338" cy="92" r="2.4" fill="#FFFFFF" />
            <circle cx="359" cy="246" r="1.7" fill="#C4B5FD" />
            <circle cx="69" cy="231" r="1.8" fill="#BFDBFE" />
          </g>

          <g filter="url(#softGlow)">
            <path
              d="M4 356 C52 314 105 284 174 260 C144 295 91 335 21 382 C6 390 -7 375 4 356Z"
              fill="url(#flameTrail)"
              opacity="0.76"
              filter="url(#motionBlur)"
            />
            <path
              d="M34 335 C78 304 119 282 170 270 C139 301 96 333 48 359 C35 366 24 347 34 335Z"
              fill="url(#plasmaCore)"
              opacity="0.82"
            />
            <circle cx="58" cy="326" r="2.2" fill="#DBEAFE" opacity="0.78" />
            <circle cx="89" cy="306" r="1.8" fill="#C084FC" opacity="0.68" />
            <circle cx="118" cy="289" r="1.4" fill="#FFFFFF" opacity="0.75" />
            <circle cx="30" cy="354" r="1.5" fill="#93C5FD" opacity="0.62" />
          </g>

          <g filter="url(#premiumShadow)" transform="rotate(-24 214 238)">
            <path
              d="M105 240 C125 190 237 147 316 166 C339 172 354 190 355 212 C309 251 211 291 127 291 C110 281 100 262 105 240Z"
              fill="url(#rocketBody)"
            />
            <path
              d="M123 269 C176 279 265 246 338 190 C346 200 351 209 355 218 C317 252 219 296 131 291 C126 287 123 280 123 269Z"
              fill="url(#rocketShade)"
            />
            <path d="M311 166 C344 172 360 190 355 218 C339 202 319 192 289 188Z" fill="#EFF6FF" />
            <path d="M132 224 C103 222 75 233 55 254 C89 262 111 276 129 291Z" fill="#4F46E5" />
            <path d="M188 279 C177 313 180 337 195 356 C212 326 235 304 261 289Z" fill="#2563EB" />
            <ellipse cx="228" cy="219" rx="24" ry="20" fill="#111827" opacity="0.28" />
            <ellipse cx="228" cy="216" rx="19" ry="15" fill="#DBEAFE" />
            <ellipse cx="225" cy="213" rx="11" ry="8" fill="#60A5FA" />
          </g>

          <g filter="url(#premiumShadow)" transform="rotate(-5 188 204)">
            <path
              d="M155 171 C137 193 128 229 139 256 C151 286 193 298 221 278 C248 259 251 218 236 190 C220 159 180 145 155 171Z"
              fill="url(#astronautSuit)"
            />
            <path
              d="M157 179 C146 198 140 228 149 251 C159 275 190 283 212 268 C231 254 235 224 224 199 C213 176 177 160 157 179Z"
              fill="url(#suitWarmth)"
              opacity="0.95"
            />
            <path
              d="M156 172 C130 158 108 164 93 187 C112 195 128 211 140 230 C142 207 149 188 156 172Z"
              fill="url(#astronautSuit)"
            />
            <path
              d="M219 252 C244 261 266 257 286 242 C277 225 262 214 238 208 C243 227 237 242 219 252Z"
              fill="url(#astronautSuit)"
            />
            <path
              d="M160 271 C148 293 145 315 151 337 C175 331 191 316 199 290 C185 290 172 284 160 271Z"
              fill="url(#astronautSuit)"
            />
            <path
              d="M214 272 C226 289 241 302 263 307 C270 284 266 263 251 245 C242 260 230 268 214 272Z"
              fill="url(#astronautSuit)"
            />
            <path
              d="M144 215 C164 229 198 231 224 217"
              fill="none"
              stroke="#FFFFFF"
              strokeLinecap="round"
              strokeWidth="5"
              opacity="0.36"
            />
            <path
              d="M103 188 C113 180 129 181 144 195"
              fill="none"
              stroke="#FFFFFF"
              strokeLinecap="round"
              strokeWidth="5"
              opacity="0.4"
            />
            <path
              d="M236 218 C253 222 266 230 275 242"
              fill="none"
              stroke="#FFFFFF"
              strokeLinecap="round"
              strokeWidth="5"
              opacity="0.34"
            />
            <rect x="158" y="219" width="65" height="47" rx="18" fill="#D7E0ED" opacity="0.92" />
            <rect x="172" y="230" width="37" height="21" rx="9" fill="#0F172A" opacity="0.3" />
            <circle cx="181" cy="238" r="3.5" fill="#6366F1" />
            <circle cx="194" cy="238" r="3.5" fill="#10B981" />
            <circle cx="207" cy="238" r="3.5" fill="#EC4899" />

            <circle cx="178" cy="121" r="66" fill="url(#helmetRim)" />
            <circle cx="177" cy="119" r="58" fill="url(#astronautSuit)" />
            <ellipse
              cx="181"
              cy="124"
              rx="44"
              ry="35"
              fill="url(#helmetGlass)"
              filter="url(#helmetGloss)"
            />
            <ellipse cx="183" cy="130" rx="31" ry="22" fill="#020617" opacity="0.2" />
            <path
              d="M148 111 C159 91 194 84 215 105 C203 99 175 101 156 118 C151 123 144 119 148 111Z"
              fill="url(#helmetReflection)"
            />
            <path
              d="M151 105 C164 89 194 85 211 100"
              fill="none"
              stroke="#FFFFFF"
              strokeLinecap="round"
              strokeWidth="8"
              opacity="0.58"
            />
            <path
              d="M151 132 C166 151 198 151 214 134"
              fill="none"
              stroke="#BAE6FD"
              strokeLinecap="round"
              strokeWidth="5"
              opacity="0.34"
            />
            <path
              d="M211 91 C229 111 228 139 211 157"
              fill="none"
              stroke="#0F172A"
              strokeLinecap="round"
              strokeWidth="7"
              opacity="0.22"
            />
            <path
              d="M134 119 C128 84 153 55 188 59"
              fill="none"
              stroke="#FFFFFF"
              strokeLinecap="round"
              strokeWidth="5"
              opacity="0.32"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function SpaceBackdrop() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.24),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.20),transparent_30%),radial-gradient(circle_at_72%_70%,rgba(16,185,129,0.10),transparent_28%)]" />
      <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(circle,rgba(255,255,255,0.72)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute left-[22%] top-[18%] h-72 w-72 rounded-full bg-[#6366F1]/12 blur-3xl" />
      <div className="absolute right-[8%] top-[34%] h-96 w-96 rounded-full bg-[#8B5CF6]/10 blur-3xl" />
    </>
  );
}
