import { Link, useRouterState } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/subjects", label: "Subjects" },
  { to: "/notes", label: "Notes" },
  { to: "/quizzes", label: "Quizzes" },
  { to: "/flashcards", label: "Flashcards" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-strong border-b border-white/5">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                <span className="text-white">Acade</span>
                <span
                  className="text-nova-yellow"
                  style={{
                    textShadow: "0 0 12px rgba(250,204,21,0.7), 0 0 24px rgba(250,204,21,0.4)",
                  }}
                >
                  MY
                </span>
              </span>
            </Link>
          </div>

          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      active
                        ? "bg-white/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            to="/login"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold hover:scale-105 transition-transform glow-blue"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
