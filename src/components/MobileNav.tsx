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

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/10 px-4 pb-safe-offset-2 pt-2">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {mobileLinks.map((link) => {
          const active = pathname === link.to;
          const Icon = link.icon;

          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
                active
                  ? "text-primary scale-110"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "animate-pulse-glow" : ""}`} />
              <span className="text-[10px] font-medium leading-none">{link.label}</span>
              {active && (
                <div className="absolute -top-1 w-1 h-1 rounded-full bg-primary glow-blue" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
