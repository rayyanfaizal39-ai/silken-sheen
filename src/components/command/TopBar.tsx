import { Link } from "@tanstack/react-router";
import { Search, Sparkles, Menu, Bell } from "lucide-react";
import { useSignInModal } from "@/context/sign-in-modal";

export function CommandTopBar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const { open: openSignIn } = useSignInModal();

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/[0.06] bg-[#050b1a]/70 px-4 py-3 backdrop-blur-xl md:px-6">
      <button
        type="button"
        onClick={onOpenSidebar}
        aria-label="Open navigation"
        className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-2xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          type="search"
          placeholder="Search notes, quizzes, chapters…"
          className="w-full rounded-full border border-white/[0.06] bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-cyan-400/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-cyan-400/20"
        />
      </div>

      {/* Level chip */}
      <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
          Lv 1
        </span>
        <span className="h-3 w-px bg-white/10" />
        <span className="text-slate-400">Space Cadet</span>
      </div>

      {/* Upgrade CTA */}
      <Link
        to="/upgrade"
        className="group hidden sm:inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-gradient-to-r from-amber-400/20 via-orange-400/10 to-transparent px-3.5 py-1.5 text-xs font-semibold text-amber-200 hover:border-amber-300/60 transition-all"
      >
        <Sparkles className="h-3.5 w-3.5" />
        Upgrade
      </Link>

      <button
        type="button"
        aria-label="Notifications"
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
      </button>

      {/* Sign in */}
      <button
        type="button"
        onClick={openSignIn}
        className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_30px_-10px_rgba(56,189,248,0.7)] hover:brightness-110 transition-all"
      >
        Sign In
      </button>
    </header>
  );
}
