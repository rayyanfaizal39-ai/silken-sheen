import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Flame, Sparkles } from "lucide-react";

export function CtaBand() {
  return (
    <section className="px-4 py-24 sm:px-8">
      <div className="study-cta-card relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/65 p-8 text-center shadow-2xl backdrop-blur-2xl sm:p-12">
        <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-nova-yellow/15 blur-3xl" />
        <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-primary via-accent to-nova-yellow text-white shadow-[0_24px_70px_-30px_oklch(0.88_0.2_95_/_0.95)]">
          <Sparkles className="h-7 w-7" />
        </div>
        <h2 className="relative mx-auto max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
          Ready to unlock your next <span className="study-gradient-text">study streak?</span>
        </h2>
        <p className="relative mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          Choose a chapter, collect XP, and let AcadeMY make revision feel lighter, faster, and more alive.
        </p>
        <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/login"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-accent to-nova-yellow bg-[length:200%_100%] px-7 py-3.5 text-sm font-black text-slate-950 shadow-xl transition-all duration-300 hover:bg-[position:100%_0] hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-nova-yellow/80"
          >
            Create free account
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/quizzes"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-7 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-white/[0.12] hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
          >
            <BookOpen className="h-4 w-4" />
            Try a quiz first
          </Link>
        </div>
        <div className="relative mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs font-bold text-slate-200">
          <Flame className="h-3.5 w-3.5 text-nova-yellow" />
          XP, badges, flashcards, and AI help included
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mt-12 border-t border-white/5 px-4 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} AcadeMY. Made for Malaysian students.</p>
        <p className="italic">"Belajar Lebih Bijak, Bersinar Lebih Terang."</p>
      </div>
    </footer>
  );
}
