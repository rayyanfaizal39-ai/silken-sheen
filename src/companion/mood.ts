// ─── Companion mood ─────────────────────────────────────────────────────────
// Display-only for V1 — no gameplay effects. Derived purely from existing
// progress data (streak + closeness to next evolution), so it needs no new
// storage of its own.

import type { CompanionStageId, Progress } from "@/hooks/use-progress";
import { getCompanionLevelProgress } from "@/hooks/use-progress";

export type CompanionMood = "happy" | "sleepy" | "excited";

export const MOOD_EMOJI: Record<CompanionMood, string> = {
  happy: "😊",
  sleepy: "😴",
  excited: "🤩",
};

export const MOOD_LABEL: Record<CompanionMood, string> = {
  happy: "Happy",
  sleepy: "Sleepy",
  excited: "Excited",
};

function moodMessage(mood: CompanionMood, name: string): string {
  switch (mood) {
    case "excited":
      return `${name} can't wait to evolve.`;
    case "sleepy":
      return `${name} needs more study energy.`;
    default:
      return `${name} is enjoying today's progress.`;
  }
}

export function getCompanionMood(progress: Progress, stage: CompanionStageId): CompanionMood {
  const companionProgress = getCompanionLevelProgress(progress.xp);

  if (
    companionProgress.currentStage.id === stage &&
    companionProgress.nextStage &&
    companionProgress.remainingXp <= 150
  ) {
    return "excited";
  }
  if (progress.streak === 0) return "sleepy";
  return "happy";
}

export function getCompanionMoodMessage(mood: CompanionMood, name: string): string {
  return moodMessage(mood, name);
}
