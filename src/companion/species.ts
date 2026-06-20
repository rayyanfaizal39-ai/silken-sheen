// ─── Companion species registry ────────────────────────────────────────────
// V1 ships Nova only. Adding a new species later means adding one entry here
// (image set + fallback emoji) — no changes needed in CompanionImage,
// CompanionWidget, or the /companion page itself.

import type { CompanionId, CompanionStageId } from "@/hooks/use-progress";

export interface CompanionSpeciesDef {
  id: CompanionId;
  name: string;
  /** Real artwork per evolution stage. */
  images: Record<CompanionStageId, string>;
  /** Shown if the matching image fails to load (missing/broken asset). */
  fallbackEmoji: Record<CompanionStageId, string>;
}

const NOVA: CompanionSpeciesDef = {
  id: "nova",
  name: "Nova",
  images: {
    egg: "/companions/nova/nova-egg.png",
    blobling: "/companions/nova/nova-blobling.png",
    sprout: "/companions/nova/nova-sprout.png",
    cadet: "/companions/nova/nova-cadet.png",
    guardian: "/companions/nova/nova-guardian.png",
  },
  fallbackEmoji: {
    egg: "🥚",
    blobling: "🐣",
    sprout: "🌱",
    cadet: "🚀",
    guardian: "🛡️",
  },
};

/** Only Nova is registered for V1. Future species get added here. */
export const COMPANION_SPECIES: Record<CompanionId, CompanionSpeciesDef | undefined> = {
  nova: NOVA,
  luna: undefined,
  terra: undefined,
  comet: undefined,
  nebula: undefined,
};

export function getCompanionSpecies(id: CompanionId): CompanionSpeciesDef {
  return COMPANION_SPECIES[id] ?? NOVA;
}

/** The student's custom nickname, or the species name if they haven't renamed it. */
export function getCompanionDisplayName(companion: { id: CompanionId; name?: string }): string {
  return companion.name?.trim() || getCompanionSpecies(companion.id).name;
}
