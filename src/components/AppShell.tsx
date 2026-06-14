import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Brain,
  Compass,
  Flame,
  Home,
  LayoutDashboard,
  Library,
  LogIn,
  LogOut,
  Rocket,
  Sparkles,
  Video,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { useProgress, getRank } from "@/hooks/use-progress";
import { useAuth } from "@/context/auth-context";

const navItems = [
  { label: "Utama",      short: "Utama",   to: "/",           icon: Home,            accent: "#6366F1", accentGlow: "rgba(99,102,241,0.55)",  accentBg: "rgba(99,102,241,0.22)",  line: "linear-gradient(90deg,#818CF8,#C084FC)" },
  { label: "Papan Pemuka", short: "Misi",  to: "/dashboard",  icon: LayoutDashboard, accent: "#8B5CF6", accentGlow: "rgba(139,92,246,0.55)",  accentBg: "rgba(139,92,246,0.22)",  line: "linear-gradient(90deg,#A78BFA,#7C3AED)" },
  { label: "Nota",       short: "Belajar", to: "/notes",      icon: BookOpen,        accent: "#3B82F6", accentGlow: "rgba(59,130,246,0.55)",  accentBg: "rgba(59,130,246,0.22)",  line: "linear-gradient(90deg,#60A5FA,#2563EB)" },
  { label: "Kad Imbas",  short: "Kad",     to: "/flashcards", icon: Library,         accent: "#A855F7", accentGlow: "rgba(168,85,247,0.55)",  accentBg: "rgba(168,85,247,0.22)",  line: "linear-gradient(90deg,#C084FC,#9333EA)" },
  { label: "Kuiz",       short: "Kuiz",    to: "/quizzes",    icon: Brain,           accent: "#F59E0B", accentGlow: "rgba(245,158,11,0.55)",  accentBg: "rgba(245,158,11,0.22)",  line: "linear-gradient(90deg,#FBBF24,#D97706)" },
  { label: "Peta Minda", short: "Peta",    to: "/notes",      icon: Compass,         accent: "#10B981", accentGlow: "rgba(16,185,129,0.5)",   accentBg: "rgba(16,185,129,0.18)",  line: "linear-gradient(90deg,#34D399,#059669)" },
  { label: "Video",      short: "Video",   to: "/notes",      icon: Video,           accent: "#EC4899", accentGlow: "rgba(236,73,153,0.5)",   accentBg: "rgba(236,73,153,0.18)",  line: "linear-gradient(90deg,#F472B6,#DB2777)" },
  { label: "Cikgu Kecerdasan Buatan", short: "Cikgu", to: "/dashboard", icon: Sparkles, accent: "#06B6D4", accentGlow: "rgba(6,182,212,0.5)", accentBg: "rgba(6,182,212,0.18)", line: "linear-gradient(90deg,#22D3EE,#0284C7)" },
] as const;

function isActive(pathname: string, to: string, label: string) {
  if (label === "Peta Minda" || label === "Video" || label === "Cikgu Kecerdasan Buatan") return false;
  return to === "/" ? pathname === "/" : pathname.startsWith(to);
}

function SidebarBottom() {
  const { progress } = useProgress();
  const { user, signOut, isConfigured } = useAuth();
  const rank = getRank(progress.xp);

  return (
    <div className="mt-auto space-y-3">
      {/* User profile card when signed in */}
      {user ? (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3 space-y-2.5">
          <div className="flex items-center gap-2.5">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name ?? "Avatar"}
                className="h-8 w-8 shrink-0 rounded-xl object-cover ring-1 ring-white/10"
              />
            ) : (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-xs font-bold text-white">
                {(user.name ?? user.email ?? "?")[0].toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-white">{user.name ?? "Student"}</p>
              <p className="truncate text-[10px] text-white/40">{user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => void signOut()}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-white/50 transition-colors hover:bg-white/[0.08] hover:text-white/80"
          >
            <LogOut className="h-3 w-3" />
            Sign out
          </button>
        </div>
      ) : isConfigured ? (
        <Link
          to="/login"
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.09] bg-white/[0.04] px-3 py-2.5 text-xs font-semibold text-white/50 transition-colors hover:bg-white/[0.08] hover:text-white"
        >
          <LogIn className="h-3.5 w-3.5" />
          Sign in to sync progress
        </Link>
      ) : null}

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

      {/* ── Mobile Bottom Nav — Space Theme ──────────────────── */}
      <nav className="space-nav-shell mobile-nav-shell fixed left-3 right-3 z-[80] rounded-[1.25rem] px-1.5 lg:hidden">
        <div className="mx-auto flex h-full max-w-md items-center justify-between gap-0.5">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.to, item.label);
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`space-nav-item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${active ? "space-nav-item-active" : ""}`}
                style={active ? {
                  "--nav-accent-bg":   `linear-gradient(135deg, ${item.accentBg}, ${item.accentBg.replace("0.22", "0.16")})`,
                  "--nav-accent-glow": item.accentGlow,
                  "--nav-accent-line": item.line,
                } as React.CSSProperties : undefined}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className="relative h-5 w-5 transition-transform"
                  style={active ? { color: item.accent, filter: `drop-shadow(0 0 6px ${item.accentGlow})` } : undefined}
                />
                <span
                  className="space-nav-label"
                  style={active ? { color: item.accent } : undefined}
                >
                  {item.short}
                </span>
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
  const { user } = useAuth();
  const rank = getRank(progress.xp);
  return (
    <div className="flex items-center gap-2">
      {user?.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={user.name ?? "Avatar"}
          className="h-6 w-6 rounded-lg object-cover ring-1 ring-white/10"
        />
      ) : (
        <span className="text-base leading-none">{rank.emoji}</span>
      )}
      <span className="hidden text-xs font-bold md:inline" style={{ color: rank.color }}>{rank.name}</span>
    </div>
  );
}
