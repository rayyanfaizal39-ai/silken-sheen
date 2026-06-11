import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Brain,
  Compass,
  Flame,
  Home,
  LayoutDashboard,
  Library,
  Rocket,
  Sparkles,
  Video,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { useProgress, getRank } from "@/hooks/use-progress";

const navItems = [
  { label: "Home", short: "Home", to: "/", icon: Home, accent: "#6366F1" },
  { label: "Dashboard", short: "Dash", to: "/dashboard", icon: LayoutDashboard, accent: "#8B5CF6" },
  { label: "Notes", short: "Notes", to: "/notes", icon: BookOpen, accent: "#3B82F6" },
  { label: "Flashcards", short: "Cards", to: "/flashcards", icon: Library, accent: "#A855F7" },
  { label: "Quizzes", short: "Quiz", to: "/quizzes", icon: Brain, accent: "#F59E0B" },
  { label: "Mind Maps", short: "Maps", to: "/notes", icon: Compass, accent: "#10B981" },
  { label: "Videos", short: "Video", to: "/notes", icon: Video, accent: "#EC4899" },
  { label: "AI Tutor", short: "AI", to: "/dashboard", icon: Sparkles, accent: "#06B6D4" },
] as const;

function isActive(pathname: string, to: string, label: string) {
  if (label === "Mind Maps" || label === "Videos" || label === "AI Tutor") return false;
  return to === "/" ? pathname === "/" : pathname.startsWith(to);
}

function SidebarBottom() {
  const { progress } = useProgress();
  const rank = getRank(progress.xp);
  return (
    <div className="mt-auto space-y-3">
      {/* Live rank chip */}
      {progress.xp > 0 && (
        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-3 py-2.5">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-lg"
            style={{ background: `${rank.color}22` }}
          >
            {rank.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold" style={{ color: rank.color }}>{rank.name}</p>
            <p className="text-[10px] text-white/40">{progress.xp.toLocaleString()} XP</p>
          </div>
          {progress.streak > 0 && (
            <div className="flex items-center gap-1 rounded-xl bg-orange-500/15 px-2 py-1">
              <Flame className="h-3 w-3 text-orange-400" />
              <span className="text-[10px] font-bold text-orange-300">{progress.streak}</span>
            </div>
          )}
        </div>
      )}

      {/* Start Learning card */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 p-4">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-[0_0_24px_rgba(99,102,241,0.5)]">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <p className="text-sm font-bold text-white">Ready to learn?</p>
        <p className="mt-1 text-xs leading-5 text-white/50">
          Keep your streak alive every day.
        </p>
        <Link
          to="/notes"
          className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-2 text-xs font-bold text-[#050816] transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Start Learning
        </Link>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="relative min-h-svh overflow-hidden bg-[#050816] text-white">
      {/* Space background */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#050816]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.24),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.20),transparent_30%),radial-gradient(circle_at_72%_70%,rgba(16,185,129,0.10),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35] [background-image:radial-gradient(circle,rgba(255,255,255,0.72)_1px,transparent_1px)] [background-size:42px_42px]" />

      {/* ── Desktop Sidebar ───────────────────────────────────── */}
      <aside className="fixed left-0 top-0 z-[60] hidden h-svh w-[236px] flex-col border-r border-white/[0.07] bg-[#080E1C]/90 px-4 py-6 shadow-[2px_0_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl lg:flex">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 rounded-2xl p-1 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-[0_0_28px_rgba(99,102,241,0.6)]">
            <Rocket className="h-4.5 w-4.5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Acade<span className="text-nova-yellow">MY</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="mt-8 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.to, item.label);
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${
                  active
                    ? "bg-white/[0.09] text-white"
                    : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {/* Active left accent bar */}
                {active && (
                  <span
                    className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full"
                    style={{ background: item.accent, boxShadow: `0 0 12px ${item.accent}` }}
                  />
                )}
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors ${active ? "text-white" : "text-white/40 group-hover:text-white/70"}`}
                  style={active ? { color: item.accent } : undefined}
                />
                <span className="truncate">{item.label}</span>
                {active && (
                  <span
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-25"
                    style={{ background: `radial-gradient(ellipse at left center, ${item.accent}60, transparent 70%)` }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <SidebarBottom />
      </aside>

      {/* ── Main content area ─────────────────────────────────── */}
      <div className="relative z-10 lg:ml-[236px]">
        {/* Top header */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/[0.06] bg-[#050816]/80 px-4 py-3 backdrop-blur-2xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            {/* Mobile brand */}
            <Link to="/" className="flex items-center gap-2 lg:hidden">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                <Rocket className="h-3.5 w-3.5" />
              </span>
              <span className="font-display text-base font-bold">
                Acade<span className="text-nova-yellow">MY</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Live streak */}
            <HeaderStreak />
            {/* Profile link */}
            <Link
              to="/dashboard"
              className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.06] px-3 py-2 text-sm transition-colors hover:bg-white/[0.10]"
            >
              <RankBadge />
            </Link>
          </div>
        </header>

        <main className="app-main page-content min-h-svh">{children}</main>
      </div>

      {/* ── Mobile Bottom Nav ─────────────────────────────────── */}
      <nav className="mobile-nav-shell fixed left-3 right-3 z-[80] rounded-2xl px-2 lg:hidden">
        <div className="mx-auto flex h-full max-w-md items-center justify-between">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.to, item.label);
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`mobile-nav-item relative flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${
                  active ? "mobile-nav-item-active" : "text-slate-400 hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-5 w-5" style={active ? { color: item.accent } : undefined} />
                <span className="text-[10px] font-semibold leading-none">{item.short}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function HeaderStreak() {
  const { progress } = useProgress();
  if (progress.streak <= 0) return null;
  return (
    <div className="hidden items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.06] px-3 py-2 sm:flex">
      <Flame className="h-4 w-4 text-orange-400" />
      <span className="text-sm font-bold">{progress.streak}</span>
      <span className="text-xs text-white/40">day{progress.streak !== 1 ? "s" : ""}</span>
    </div>
  );
}

function RankBadge() {
  const { progress } = useProgress();
  const rank = getRank(progress.xp);
  return (
    <div className="flex items-center gap-2">
      <span className="text-base leading-none">{rank.emoji}</span>
      <span className="hidden text-xs font-bold md:inline" style={{ color: rank.color }}>{rank.name}</span>
    </div>
  );
}
