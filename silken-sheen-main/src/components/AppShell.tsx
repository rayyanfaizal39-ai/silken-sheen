import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  Brain,
  CircleUserRound,
  Compass,
  Flame,
  Home,
  LayoutDashboard,
  Library,
  Search,
  Sparkles,
  Video,
} from "lucide-react";
import type { ReactNode } from "react";
import { AcademyLogo } from "@/components/AcademyLogo";

const navItems = [
  { label: "Home", short: "Home", to: "/", icon: Home },
  { label: "Dashboard", short: "Dash", to: "/dashboard", icon: LayoutDashboard },
  { label: "Notes", short: "Notes", to: "/notes", icon: BookOpen },
  { label: "Flashcards", short: "Cards", to: "/flashcards", icon: Library },
  { label: "Quizzes", short: "Quiz", to: "/quizzes", icon: Brain },
  { label: "Mind Maps", short: "Maps", to: "/notes", icon: Compass },
  { label: "Videos", short: "Video", to: "/notes", icon: Video },
  { label: "AI Tutor", short: "AI", to: "/dashboard", icon: Sparkles },
] as const;

function isActive(pathname: string, to: string, label: string) {
  if (label === "Mind Maps" || label === "Videos" || label === "AI Tutor") return false;
  return to === "/" ? pathname === "/" : pathname.startsWith(to);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="relative min-h-svh overflow-hidden bg-[#050816] text-white">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#050816]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.24),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.20),transparent_30%),radial-gradient(circle_at_72%_70%,rgba(16,185,129,0.10),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 [background-image:radial-gradient(circle,rgba(255,255,255,0.72)_1px,transparent_1px)] [background-size:42px_42px]" />

      <aside className="fixed left-0 top-0 z-50 hidden h-svh w-[236px] border-r border-white/[0.08] bg-[#0B1220]/82 px-4 py-6 shadow-[18px_0_70px_rgba(0,0,0,0.22)] backdrop-blur-2xl lg:flex lg:flex-col">
        <Link
          to="/"
          aria-label="AcadeMY home"
          className="rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
        >
          <AcademyLogo className="h-auto w-[168px]" />
        </Link>

        <nav className="mt-9 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.to, item.label);
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${
                  active
                    ? "bg-white/[0.11] text-white shadow-[0_0_28px_rgba(99,102,241,0.35)]"
                    : "text-[#94A3B8] hover:translate-x-1 hover:bg-white/[0.07] hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
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
            Pick a mode and keep your streak alive.
          </p>
          <Link
            to="/notes"
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-2.5 text-sm font-bold text-[#050816] transition-transform hover:scale-[1.03]"
          >
            Start Learning
          </Link>
        </div>
      </aside>

      <div className="relative z-10 lg:ml-[236px]">
        <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#050816]/78 px-4 py-4 backdrop-blur-2xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              aria-label="AcadeMY home"
              className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] lg:hidden"
            >
              <AcademyLogo variant="icon" className="h-9 w-9" />
            </Link>
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
              type="button"
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
            </Link>
          </div>
        </header>

        <main className="app-main min-h-svh">{children}</main>
      </div>

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
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-semibold leading-none">{item.short}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
