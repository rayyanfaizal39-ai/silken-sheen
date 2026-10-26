import { revealCountdown, type RevealCountdown } from "./reveal-countdown";

/**
 * One-companion craft reveal phases for the profile page.
 * Authorization to show portrait URLs must still be enforced server-side;
 * this only labels what the UI should present from saved studio + card state.
 */
export type CraftRevealPhase =
  | "selected"
  | "choose"
  | "scheduled"
  | "approval"
  | "preparing"
  | "unscheduled";

export function craftRevealPhase(input: {
  hasPermanentArtwork: boolean;
  artOptionCount: number;
  /** Server flag: both craft options exist, without exposing paths. */
  craftOptionsReady?: boolean;
  revealAfter: string | null | undefined;
  now: number;
}): { phase: CraftRevealPhase; countdown: RevealCountdown } {
  const countdown = revealCountdown(input.revealAfter, input.now);
  if (input.hasPermanentArtwork) {
    return { phase: "selected", countdown };
  }
  const prepared = input.artOptionCount >= 2 || Boolean(input.craftOptionsReady);
  if (prepared && countdown.kind === "counting") {
    return { phase: "scheduled", countdown };
  }
  if (prepared && countdown.kind === "open") {
    return { phase: "choose", countdown };
  }
  if (prepared && countdown.kind === "unknown") {
    return { phase: "unscheduled", countdown };
  }
  if (!prepared && countdown.kind === "open") {
    return { phase: "approval", countdown };
  }
  return { phase: "preparing", countdown };
}

/** True only when the UI may offer the existing two-portrait pick. */
export function craftPortraitsChoosable(phase: CraftRevealPhase): boolean {
  return phase === "choose";
}
