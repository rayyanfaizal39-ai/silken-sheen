import type { JourneyStage } from "./journey";
import type { NovaCard } from "@/features/nova-cards/model";

/** Dashboard Cosmic Companion hero presentation (visual only). */
export type PortalDisplayKind =
  | "loading"
  | "new"
  | "unfinished"
  | "waiting"
  | "ready"
  | "selected"
  | "error";

/** Compact illustration mark — never a full-bleed cinematic background. */
export type PortalMark = "portal" | "egg" | "dual" | "none";

export type PortalDisplay = {
  kind: PortalDisplayKind;
  mark: PortalMark;
  label: string;
  headline: string;
  support: string;
  cta: string;
  /** Selected permanent portrait only — real signed owner URL. */
  portrait?: {
    artworkUrl: string;
    companionName: string;
    rarity: string;
    username: string;
    species?: string;
    element?: string;
    personality?: string;
  };
};

const PORTAL_COPY: Record<
  Exclude<PortalDisplayKind, "selected" | "loading" | "error">,
  Omit<PortalDisplay, "kind" | "mark" | "portrait">
> = {
  new: {
    label: "COSMIC COMPANION",
    headline: "Discover My Companion",
    support: "Begin your journey to discover a companion uniquely yours.",
    cta: "Start My Journey",
  },
  unfinished: {
    label: "COSMIC COMPANION",
    headline: "Your Story Is Still Unfolding",
    support: "Your saved answers are waiting where you left off.",
    cta: "Continue My Journey",
  },
  waiting: {
    label: "COSMIC COMPANION",
    headline: "Your Companion Is Being Crafted",
    support: "Your unique portrait is on its way.",
    cta: "Check My Journey",
  },
  ready: {
    label: "COSMIC COMPANION",
    headline: "Your Portraits Are Ready",
    support: "Choose the portrait you'll keep forever.",
    cta: "Choose My Portrait",
  },
};

function portraitFromCard(card: NovaCard) {
  const companionName = card.companion?.name?.trim() || card.username;
  return {
    artworkUrl: card.artworkUrl!,
    companionName,
    rarity: card.rarity,
    username: card.username,
    species: card.companion?.species,
    element: card.companion?.element,
    personality: card.companion?.personality,
  };
}

/**
 * Resolve dashboard portal copy + mark from journey stage and optional owner card.
 * `artOptions` length ≥ 2 (same companion) means choice is pending even when status.ready is false.
 */
export function resolvePortalDisplay(input: {
  ready: boolean;
  stage: JourneyStage;
  problem: boolean;
  card: NovaCard | null;
}): PortalDisplay {
  if (!input.ready) {
    return {
      kind: "loading",
      mark: "portal",
      label: "COSMIC COMPANION",
      headline: "Your Cosmic Companion",
      support: "Loading your journey…",
      cta: "",
    };
  }
  if (input.problem) {
    return {
      kind: "error",
      mark: "portal",
      label: "COSMIC COMPANION",
      headline: "Your Cosmic Companion",
      support: "We could not load your companion status.",
      cta: "Retry",
    };
  }

  if (input.stage === "selected" && input.card?.artworkUrl) {
    const portrait = portraitFromCard(input.card);
    return {
      kind: "selected",
      mark: "none",
      label: "COSMIC COMPANION",
      headline: portrait.companionName,
      support: "Stage 1 · Origin",
      cta: "View My Card",
      portrait,
    };
  }

  if (input.stage === "selected") {
    return {
      kind: "selected",
      mark: "none",
      label: "COSMIC COMPANION",
      headline: input.card?.companion?.name?.trim() || input.card?.username || "Your Companion",
      support: "Stage 1 · Origin",
      cta: "View My Card",
    };
  }

  const portraitsReady =
    (input.stage === "waiting" || input.stage === "ready") &&
    (input.card?.artOptions?.length ?? 0) >= 2 &&
    !input.card?.artworkUrl;

  if (portraitsReady || input.stage === "ready") {
    return { kind: "ready", mark: "dual", ...PORTAL_COPY.ready };
  }
  if (input.stage === "waiting") {
    return { kind: "waiting", mark: "egg", ...PORTAL_COPY.waiting };
  }
  if (input.stage === "unfinished") {
    return { kind: "unfinished", mark: "portal", ...PORTAL_COPY.unfinished };
  }
  return { kind: "new", mark: "portal", ...PORTAL_COPY.new };
}
