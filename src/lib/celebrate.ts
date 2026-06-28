import { toast } from "sonner";

type CelebrateKind = "xp" | "chapter" | "deck" | "quiz" | "badge";

const ICONS: Record<CelebrateKind, string> = {
  xp: "✨",
  chapter: "📘",
  deck: "🃏",
  quiz: "🧠",
  badge: "🏅",
};

/**
 * Lightweight reward feedback — replaces noisy fullscreen overlays for
 * everyday wins. Pair with the existing UnlockCelebration for rank-ups.
 */
export function celebrate(kind: CelebrateKind, message: string, xp?: number) {
  toast(`${ICONS[kind]} ${message}`, {
    description: xp ? `+${xp} XP earned` : undefined,
    duration: 2400,
  });
}
