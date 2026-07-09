import { Link } from "@tanstack/react-router";
import {
  Home,
  LayoutDashboard,
  NotebookPen,
  Network,
  ClipboardCheck,
  Layers,
  Activity,
  Sparkles,
  Trophy,
  Users,
  LogIn,
  Rocket,
} from "lucide-react";
import type { ReactNode } from "react";

interface NavItem {
  label: string;
  to: string;
  icon: ReactNode;
  active?: boolean;
}

const NAV: NavItem[] = [
  { label: "Home", to: "/", icon: <Home className="h-4 w-4" />, active: true },
  { label: "Dashboard", to: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Notes", to: "/notes", icon: <NotebookPen className="h-4 w-4" /> },
  { label: "Mind Maps", to: "/mindmaps", icon: <Network className="h-4 w-4" /> },
  { label: "Quizzes", to: "/quizzes", icon: <ClipboardCheck className="h-4 w-4" /> },
  { label: "Flashcards", to: "/flashcards", icon: <Layers className="h-4 w-4" /> },
  { label: "AI Tracker", to: "/tracker", icon: <Activity className="h-4 w-4" /> },
  { label: "Cosmic Companion", to: "/companion", icon: <Sparkles className="h-4 w-4" /> },
  { label: "Leaderboard", to: "/leaderboard", icon: <Trophy className="h-4 w-4" /> },
  { label: "Parent Dashboard", to: "/parent", icon: <Users className="h-4 w-4" /> },
];

export function CommandSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="flex h-full w-full flex-col bg-[#050b1a]/85 backdrop-blur-2xl border-r border-white/[0.06]">
      {/* Brand */}
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="relative">
          <div className="absolute inset-0 rounded-xl bg-cyan-400/40 blur-lg" aria-hidden />
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.55)]">
            <Rocket className="h-4 w-4" />
          </div>
        </div>
        <div className="leading-tight">
          <p className="font-display text-sm font-bold tracking-wide text-white">AcadeMY</p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">Command Deck</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-2 overflow-y-auto">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all " +
              (item.active
                ? "bg-gradient-to-r from-cyan-500/20 to-indigo-500/10 text-white ring-1 ring-cyan-400/30 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                : "text-slate-400 hover:text-white hover:bg-white/[0.04]")
            }
          >
            <span
              className={
                "flex h-7 w-7 items-center justify-center rounded-md " +
                (item.active
                  ? "bg-cyan-400/20 text-cyan-300"
                  : "bg-white/[0.03] text-slate-500 group-hover:text-cyan-300 group-hover:bg-cyan-400/10")
              }
            >
              {item.icon}
            </span>
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Sign in card */}
      <div className="p-4">
        <Link
          to="/login"
          onClick={onNavigate}
          className="group block rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-transparent p-4 hover:border-cyan-400/40 transition-all"
        >
          <div className="flex items-center gap-2 text-cyan-300">
            <LogIn className="h-4 w-4" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
              Sync progress
            </span>
          </div>
          <p className="mt-2 text-sm font-semibold text-white">Sign in, Captain</p>
          <p className="mt-1 text-xs text-slate-400">
            Save your XP, streaks &amp; badges across devices.
          </p>
        </Link>
      </div>
    </aside>
  );
}
