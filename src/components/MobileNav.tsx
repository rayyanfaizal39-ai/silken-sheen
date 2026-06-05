import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, Layout, Brain, Sparkles } from "lucide-react";

const mobileLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/subjects", label: "Subjects", icon: Layout },
  { to: "/notes", label: "Notes", icon: BookOpen },
  { to: "/quizzes", label: "Quizzes", icon: Brain },
  { to: "/flashcards", label: "Cards", icon: Sparkles },
] as const;

export function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (pathname === "/") return null;

  return (
    <nav className="mobile-nav-shell md:hidden fixed left-3 right-3 z-[80] rounded-2xl px-2">
      <div className="max-w-md mx-auto flex h-full items-center justify-between">
        {mobileLinks.map((link) => {
          const active = pathname === link.to;
          const Icon = link.icon;

          return (
            <Link
              key={link.to}
              to={link.to}
              className={`mobile-nav-item relative flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816] ${
                active ? "mobile-nav-item-active" : "text-slate-400 hover:text-white"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold leading-none">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
