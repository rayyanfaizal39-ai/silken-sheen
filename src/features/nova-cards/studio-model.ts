import type { NovaTraits } from "./model";
export type StudioDraft = { answers: number[]; username: string; revision: number };
export type StudioState = {
  active: boolean;
  enabled: boolean;
  draft: StudioDraft;
  publicId: string | null;
  identity: { version: string; answers: number[]; traits: NovaTraits } | null;
  selected: "a" | "b" | null;
  xp: number;
  earnedStage: number;
  origin: {
    status: string;
    revealAfter: string;
    ready: boolean;
    errorCode: string | null;
    completed: number;
  } | null;
  candidates: { candidate: "a" | "b"; url: string }[];
  evolutions: { stage: number; status: string; errorCode: string | null }[];
};
export const AWAKENING_TITLE = "YOUR NOVA IS AWAKENING";
export const AWAKENING_DESCRIPTION =
  "Somewhere in the Nova Universe, your magical companion is taking shape.";
export const AWAKENING_RETURN = "Return tomorrow to discover your two unique Origin cards.";
export const ARRIVED = "Your Nova has arrived! Discover your companion.";
export function studioStatus(s: StudioState): string {
  if (s.selected) return "Your permanent Nova is saved. Continue your learning journey.";
  if (s.origin?.ready && s.active) return ARRIVED;
  if (s.origin?.status === "failed")
    return "Your Nova is taking longer than expected. We’re checking the generation; your identity and answers are safe.";
  if (s.origin) return "Your Nova is awakening. Return to Nova Studio to check its arrival.";
  return "Discover your companion in Nova Studio.";
}
