import type { NovaTraits } from "./model";
import type { CompanionCandidateSpec } from "../../../supabase/functions/_shared/companion-matcher";
export type StudioDraft = { answers: number[]; username: string; revision: number };
export type StudioState = {
  active: boolean;
  /** Whether submissions are open. Independent of AI artwork generation. */
  enabled: boolean;
  draft: StudioDraft;
  publicId: string | null;
  identity: { version: string; answers: number[]; traits: NovaTraits } | null;
  selected: "a" | "b" | null;
  origin: {
    status: string;
    revealAfter: string;
    ready: boolean;
    errorCode: string | null;
    completed: number;
  } | null;
  candidates: { candidate: "a" | "b"; url: string }[];
  /** The signed-in account this state belongs to; a change means another student signed in. */
  account?: string;
  /** "cosmic-companion" for matched cards, "legacy" for older single-identity cards. */
  kind?: "cosmic-companion" | "legacy" | null;
  /** Both matched companions: only at the reveal, before the permanent choice. */
  companions?: CompanionCandidateSpec[];
  /** The permanently chosen companion, once chosen. */
  companion?: CompanionCandidateSpec | null;
  /** Short-lived signed URL of the chosen companion's approved artwork. */
  companionArtworkUrl?: string;
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
