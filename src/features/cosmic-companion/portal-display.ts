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

export type PortalBackground = "portal" | "egg" | "none";

export type PortalDisplay = {
  kind: PortalDisplayKind;
  background: PortalBackground;
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
  };
};

const PORTAL_COPY: Record<
  Exclude<PortalDisplayKind, "selected" | "loading" | "error">,
  Omit<PortalDisplay, "kind" | "background" | "portrait">
> = {
  new: {
    label: "COSMIC COMPANION",
    headline: "Your Cosmic Companion Awaits",
    support: "A companion as unique as you.",
    cta: "Discover My Companion",
  },
  unfinished: {
    label: "COSMIC COMPANION",
    headline: "Your Story Is Still Unfolding",
    support: "Your saved answers are waiting where you left off.",
    cta: "Continue My Journey",
  },
  waiting: {
    label: "COSMIC COMPANION",
    headline: "Your Portrait Is Being Crafted",
    support: "Your permanent portrait is on its way.",
    cta: "Check My Journey",
  },
  ready: {
    label: "COSMIC COMPANION",
    headline: "Your Portraits Are Ready",
    support: "Two portraits of the same companion — choose one.",
    cta: "Choose My Portrait",
  },
};

/**
 * Resolve dashboard portal copy + background from journey stage and optional owner card.
 * `artOptions` length 2 (same companion) means choice is pending even when status.ready is false.
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
      background: "portal",
      label: "COSMIC COMPANION",
      headline: "Your Cosmic Companion",
      support: "Loading your journey…",
      cta: "",
    };
  }
  if (input.problem) {
    return {
      kind: "error",
      background: "portal",
      label: "COSMIC COMPANION",
      headline: "Your Cosmic Companion",
      support: "We could not load your companion status.",
      cta: "Retry",
    };
  }

  if (input.stage === "selected" && input.card?.artworkUrl) {
    const companionName = input.card.companion?.name?.trim() || input.card.username;
    return {
      kind: "selected",
      background: "none",
      label: "COSMIC COMPANION",
      headline: companionName,
      support: "Stage 1 · Origin",
      cta: "View My Card",
      portrait: {
        artworkUrl: input.card.artworkUrl,
        companionName,
        rarity: input.card.rarity,
        username: input.card.username,
      },
    };
  }

  // Portrait chosen on server but signed URL not yet available — keep portal, prompt view.
  if (input.stage === "selected") {
    return {
      kind: "selected",
      background: "portal",
      label: "COSMIC COMPANION",
      headline: input.card?.companion?.name?.trim() || input.card?.username || "Your Companion",
      support: "Stage 1 · Origin",
      cta: "View My Card",
      portrait: input.card?.artworkUrl
        ? {
            artworkUrl: input.card.artworkUrl,
            companionName: input.card.companion?.name?.trim() || input.card.username,
            rarity: input.card.rarity,
            username: input.card.username,
          }
        : undefined,
    };
  }

  const portraitsReady =
    (input.stage === "waiting" || input.stage === "ready") &&
    (input.card?.artOptions?.length ?? 0) >= 2 &&
    !input.card?.artworkUrl;

  if (portraitsReady || input.stage === "ready") {
    return { kind: "ready", background: "egg", ...PORTAL_COPY.ready };
  }
  if (input.stage === "waiting") {
    return { kind: "waiting", background: "egg", ...PORTAL_COPY.waiting };
  }
  if (input.stage === "unfinished") {
    return { kind: "unfinished", background: "egg", ...PORTAL_COPY.unfinished };
  }
  return { kind: "new", background: "portal", ...PORTAL_COPY.new };
}

export const PORTAL_IMAGE = {
  portal: "/images/cosmic-companion-portal.webp",
  egg: "/images/cosmic-companion-egg-waiting.webp",
} as const;
