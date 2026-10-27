import type { JourneyStage } from "./journey";

export const COMPANION_RETURN_PATH = "/companion";

/**
 * Where the Cosmic Companion button goes.
 * A fictional preview stays on the portal. A finished journey opens the card.
 * A new or unfinished journey needs the cosmic_companion entitlement; otherwise
 * the student goes to the same Upgrade page as the header, and can return here.
 */
export type CompanionEntry =
  | { kind: "upgrade"; to: "/upgrade"; search: { next: typeof COMPANION_RETURN_PATH } }
  | { kind: "journey"; to: "/companion/portal"; search: { preview?: JourneyStage } }
  | { kind: "card"; to: "/nova" };

export function companionEntry(input: {
  entitled: boolean;
  stage: JourneyStage;
  preview?: JourneyStage;
}): CompanionEntry {
  if (input.preview) {
    return { kind: "journey", to: "/companion/portal", search: { preview: input.preview } };
  }
  if (input.stage === "selected") return { kind: "card", to: "/nova" };
  if (input.stage === "waiting" || input.stage === "ready") {
    return { kind: "journey", to: "/companion/portal", search: {} };
  }
  if (!input.entitled) {
    return { kind: "upgrade", to: "/upgrade", search: { next: COMPANION_RETURN_PATH } };
  }
  return { kind: "journey", to: "/companion/portal", search: {} };
}
