import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { toast } from "sonner";

const TIPS: Record<string, string> = {
  "/notes": "Tap a section to expand it — and don't forget to mark it read!",
  "/flashcards": "Flip cards with Space. Mark hard cards to see them more often.",
  "/quizzes": "Pace yourself — quizzes track accuracy, not speed.",
  "/mindmaps": "Pinch to zoom, tap a node to expand, hit Reset to recenter.",
  "/companion": "Your companion evolves as you earn XP. Stay consistent!",
};

const SESSION_KEY = "academy:companion-tip-shown";

/**
 * Surfaces a single contextual companion tip per route per session.
 * Reuses the existing sonner toaster so it's unobtrusive.
 */
export function CompanionTip() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const tip = TIPS[pathname];
    if (!tip) return;
    let shown: string[] = [];
    try {
      shown = JSON.parse(window.sessionStorage.getItem(SESSION_KEY) ?? "[]");
    } catch {}
    if (shown.includes(pathname)) return;
    const t = setTimeout(() => {
      toast(`🛰️ Cikgu says`, { description: tip, duration: 4200 });
      try {
        window.sessionStorage.setItem(SESSION_KEY, JSON.stringify([...shown, pathname]));
      } catch {}
    }, 800);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
