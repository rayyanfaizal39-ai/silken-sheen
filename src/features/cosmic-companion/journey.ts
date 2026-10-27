/**
 * Where a student is in the permanent discovery journey, and how the dashboard and portal
 * describe it. The Studio itself decides which screen to show from the server's saved state;
 * this only labels the way in. Locks (one submission, one permanent choice, no retakes) are
 * enforced server-side, never by these labels.
 */
export const JOURNEY_STAGES = ["new", "unfinished", "waiting", "ready", "selected"] as const;
export type JourneyStage = (typeof JOURNEY_STAGES)[number];

/** The `getNovaDashboardStatus` result, most advanced state first. `unfinished` means answers
 * are saved but not submitted; the Studio resumes them rather than restarting. */
export function journeyStage(status: {
  selected: boolean;
  ready: boolean;
  pending: boolean;
  unfinished?: boolean;
}): JourneyStage {
  if (status.selected) return "selected";
  if (status.ready) return "ready";
  if (status.pending) return "waiting";
  if (status.unfinished) return "unfinished";
  return "new";
}

export const JOURNEY_CTA: Record<JourneyStage, { label: string; note: string }> = {
  new: { label: "Discover My Companion", note: "Begin your 12-question journey." },
  unfinished: {
    label: "Continue My Discovery",
    note: "Your saved answers are waiting where you left off.",
  },
  waiting: {
    label: "See My Companion",
    note: "Your portrait is being crafted.",
  },
  ready: { label: "See My Companion", note: "Your portrait is being crafted." },
  selected: { label: "Enter My Cosmic Portal", note: "Visit your permanent Cosmic Companion." },
};

/** Fictional Studio scene for each stage. Used only when a preview is explicitly requested. */
export const PREVIEW_SCENE: Record<JourneyStage, string> = {
  new: "welcome",
  unfinished: "resume",
  waiting: "waiting",
  ready: "reveal",
  selected: "selected",
};

export function parseJourneyPreview(value: unknown): JourneyStage | undefined {
  return JOURNEY_STAGES.find((stage) => stage === value);
}
