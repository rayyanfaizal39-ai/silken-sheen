import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Rocket,
  Flame,
  Sparkles,
  ArrowRight,
  Play,
  BookOpen,
  Calculator,
  Atom,
  Scroll,
  Globe2,
  Languages,
  X,
  Trophy,
  Users,
  ShieldCheck,
  Star,
} from "lucide-react";
import { CommandSidebar } from "@/components/command/Sidebar";
import { CommandTopBar } from "@/components/command/TopBar";
import { MissionTile } from "@/components/command/MissionTile";
import { UpgradePanel } from "@/components/command/UpgradePanel";
import { CinematicStars } from "@/components/landing/CinematicStars";
import { OrbitalBackdrop } from "@/components/home/OrbitalBackdrop";
import { useSignInModal } from "@/context/sign-in-modal";

// Static marketing subjects — DO NOT import from @/data/content or
// @/content/registry (they pull the entire KSSM content graph and blow up
// the SSR Worker on cold start; that's what killed the previous
// /command-center-preview route).
const SUBJECTS = [
  { id: "bahasa-melayu", title: "Bahasa Melayu", subtitle: "Tatabahasa & karangan", chapters: 24, icon: Languages, gradient: "from-rose-500 to-pink-500", accent: "rose-300" },
  { id: "english", title: "English", subtitle: "Grammar, essays & literature", chapters: 22, icon: BookOpen, gradient: "from-emerald-500 to-teal-500", accent: "emerald-300" },
  { id: "mathematics", title: "Mathematics", subtitle: "Algebra, geometry & statistics", chapters: 39, icon: Calculator, gradient: "from-sky-500 to-indigo-500", accent: "sky-300" },
  { id: "science", title: "Science", subtitle: "Bio, chemistry & physics", chapters: 26, icon: Atom, gradient: "from-cyan-400 to-blue-500", accent: "cyan-300" },
  { id: "sejarah", title: "Sejarah", subtitle: "Malaysia & world history", chapters: 30, icon: Scroll, gradient: "from-amber-500 to-orange-500", accent: "amber-300" },
  { id: "geography", title: "Geography", subtitle: "Physical & human geography", chapters: 20, icon: Globe2, gradient: "from-violet-500 to-fuchsia-500", accent: "violet-300" },
];

export function CommandCenterHome() {
  const [mobileNav, setMobileNav] = useState(false);
  const { open: openSignIn } = useSignInModal();

  // Ensure body doesn't scroll when mobile sidebar open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileNav ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNav]);

  return (
    <div className="relative min-h-screen bg-[#020617] text-white">
      {/* Cinematic backdrop layers (client-only motion, SSR-safe) */}
      <OrbitalBackdrop />
      <CinematicStars />

      <div className="relative flex min-h-screen">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0 sticky top-0 h-screen">
          <CommandSidebar />
        </div>

        {/* Mobile drawer */}
        {mobileNav && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileNav(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <div className="relative h-full w-72 animate-in slide-in-from-left duration-200">
              <CommandSidebar onNavigate={() => setMobileNav(false)} />
              <button
                type="button"
                aria-label="Close"
                onClick={() => setMobileNav(false)}
                className="absolute top-4 right-4 rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Main column */}
        <div className="flex-1 min-w-0 flex flex-col">
          <CommandTopBar onOpenSidebar={() => setMobileNav(true)} />

          <main className="flex-1 px-4 py-8 md:px-8 md:py-10 space-y-10">
            <Hero onSignIn={openSignIn} />

            {/* Subjects */}
            <section>
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
                    Mission board
                  </p>
                  <h2 className="mt-1 font-display text-2xl md:text-3xl font-bold text-white">
                    Pick your next mission
                  </h2>
                </div>
                <Link
                  to="/subjects"
                  className="hidden sm:inline-flex items-center gap-1 text-xs text-cyan-300 hover:text-cyan-200"
                >
                  All subjects <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {SUBJECTS.map((s) => (
                  <MissionTile
                    key={s.id}
                    to="/subjects"
                    title={s.title}
                    subtitle={s.subtitle}
                    chapters={s.chapters}
                    icon={s.icon}
                    gradient={s.gradient}
                    accent={s.accent}
                  />
                ))}
              </div>
            </section>

            <SocialProof />

            <UpgradePanel />

            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Hero ---------------- */

function Hero({ onSignIn }: { onSignIn: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#0b1327]/80 via-[#0a1428]/60 to-[#050b1a]/80 p-6 md:p-10 backdrop-blur-xl">
      {/* Aurora */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-[100px]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-indigo-500/25 blur-[100px]" aria-hidden />

      <div className="relative grid gap-8 lg:grid-cols-[1.4fr,1fr] items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
            <Sparkles className="h-3.5 w-3.5" />
            Command Center · KSSM Form 1–3
          </div>

          <h1 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-white">
            Welcome aboard,
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Captain.
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base md:text-lg text-slate-300/90">
            Your mission control for Malaysian secondary school. Notes, mind maps,
            quizzes, flashcards and Cikgu AI — all powered by the AcadeMY Brain.
          </p>

          {/* Streak + level strip */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1.5 text-xs text-orange-200">
              <Flame className="h-3.5 w-3.5" />
              <span className="font-semibold">0-day streak</span>
              <span className="text-orange-200/70">· start today</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1.5 text-xs text-cyan-200">
              <Star className="h-3.5 w-3.5" />
              <span className="font-semibold">Lv 1 · Space Cadet</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/subjects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_-15px_rgba(56,189,248,0.75)] hover:brightness-110 transition-all"
            >
              <Rocket className="h-4 w-4" />
              Start your mission
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={onSignIn}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-slate-200 hover:bg-white/[0.08] transition-all"
            >
              <Play className="h-3.5 w-3.5" />
              Sign in to sync
            </button>
          </div>
        </div>

        {/* Right: cinematic status card */}
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 blur-2xl" aria-hidden />
          <div className="relative rounded-3xl border border-white/[0.08] bg-[#050c1c]/80 p-6 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Flight status
              </p>
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <StatChip label="XP" value="0" />
              <StatChip label="Streak" value="0d" />
              <StatChip label="Badges" value="0" />
            </div>

            {/* Level ring */}
            <div className="mt-6">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Level 1</span>
                <span>0 / 100 XP</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <div className="h-full w-[3%] rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(56,189,248,0.7)]" />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
              <p className="text-xs text-slate-400">Today's daily challenge</p>
              <p className="mt-1 text-sm font-semibold text-white">
                Answer 5 quizzes · +50 XP
              </p>
              <Link
                to="/quizzes"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-cyan-200"
              >
                Launch now <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] py-3">
      <p className="font-display text-xl font-bold text-white">{value}</p>
      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
    </div>
  );
}

/* ---------------- Social proof ---------------- */

function SocialProof() {
  const items = [
    { icon: Users, value: "12,000+", label: "Malaysian students learning" },
    { icon: Trophy, value: "94%", label: "Report better exam confidence" },
    { icon: ShieldCheck, value: "KSSM aligned", label: "Form 1 – 3 syllabus" },
  ];
  return (
    <section className="grid gap-3 sm:grid-cols-3">
      {items.map(({ icon: Icon, value, label }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <p className="font-display text-lg font-bold text-white">{value}</p>
            <p className="text-xs text-slate-400">{label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] pt-6 pb-4 text-xs text-slate-500">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} AcadeMY · Malaysia's Interstellar Learning Platform</p>
        <nav className="flex items-center gap-4">
          <Link to="/privacy" className="hover:text-slate-300">Privacy</Link>
          <Link to="/terms" className="hover:text-slate-300">Terms</Link>
          <Link to="/contact" className="hover:text-slate-300">Contact</Link>
          <a href="mailto:support@myacademy.my" className="hover:text-slate-300">
            support@myacademy.my
          </a>
        </nav>
      </div>
    </footer>
  );
}
