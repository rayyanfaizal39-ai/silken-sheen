import { Link, useRouterState } from "@tanstack/react-router";
import { AcademyLogo } from "@/components/AcademyLogo";

const links = [
  { to: "/home", label: "Home" },
  { to: "/subjects", label: "Subjects" },
  { to: "/notes", label: "Notes" },
  { to: "/mindmaps", label: "Mind Maps" },
  { to: "/quizzes", label: "Quizzes" },
  { to: "/flashcards", label: "Flashcards" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/upgrade", label: "Upgrade" },
] as const;

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (pathname === "/") return null;

  return (
    <header className="site-header sticky top-0 z-50 w-full">
      <div className="glass-strong border-b border-white/5">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-4">
          <Link
            to="/"
            aria-label="AcadeMY home"
            className="group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
          >
            <AcademyLogo className="h-auto w-[128px] transition-opacity group-hover:opacity-90 sm:w-[168px]" />
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816] ${
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
            className="px-5 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold hover:scale-105 transition-transform glow-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
