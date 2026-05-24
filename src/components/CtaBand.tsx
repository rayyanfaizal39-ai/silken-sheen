import { Link } from "@tanstack/react-router";

export function CtaBand() {
  return (
    <section className="py-24 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl glass-strong p-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-nova-yellow/10 -z-10" />
        <h2 className="font-display text-4xl sm:text-5xl font-bold">
          Ready to <span className="gradient-text">shine brighter?</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Join AcadeMY and turn your study sessions into wins. Form 1, 2 or 3 — we've got you.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            to="/login"
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold glow-purple hover:scale-105 transition-transform"
          >
            Create free account
          </Link>
          <Link
            to="/quizzes"
            className="px-7 py-3.5 rounded-full glass text-foreground font-semibold hover:bg-white/10 transition-colors"
          >
            Try a quiz first
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-4 sm:px-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} AcadeMY. Made for Malaysian students.</p>
        <p className="italic">"Study Smarter, Shine Brighter."</p>
      </div>
    </footer>
  );
}
