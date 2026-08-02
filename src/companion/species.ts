// ─── Companion species registry ────────────────────────────────────────────
// Shared artwork registry for every companion ID already supported by saved
// progress. Missing stage art falls back safely inside CompanionImage.

import type { CompanionId, CompanionStageId } from "@/hooks/use-progress";

export interface CompanionSpeciesDef {
  id: CompanionId;
  name: string;
  /** Real artwork per evolution stage. */
  images: Partial<Record<CompanionStageId, string>>;
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

const LUNA: CompanionSpeciesDef = {
  id: "luna",
  name: "Luna",
  images: {
    egg: "/companions/nova/luna/luna-egg.png",
    blobling: "/companions/nova/luna/luna-blobling.png",
    sprout: "/companions/nova/luna/luna-sprout.png",
    cadet: "/companions/nova/luna/luna-cadet.png",
    guardian: "/companions/nova/luna/luna-guardian.png",
  },
  fallbackEmoji: NOVA.fallbackEmoji,
};

const TERRA: CompanionSpeciesDef = {
  id: "terra",
  name: "Terra",
  images: {
    egg: "/companions/nova/terra/terra-egg.png",
    blobling: "/companions/nova/terra/terra-blobling.png",
    sprout: "/companions/nova/terra/terra sprout.png",
    cadet: "/companions/nova/terra/terra-cadet.png",
    guardian: "/companions/nova/terra/terra-guardian.png",
  },
  fallbackEmoji: NOVA.fallbackEmoji,
};

const COMET: CompanionSpeciesDef = {
  id: "comet",
  name: "Comet",
  images: {
    egg: "/companions/nova/comet/comet-egg.png",
    blobling: "/companions/nova/comet/comet-blobing.png",
    sprout: "/companions/nova/comet/comet-sprout.png",
    guardian: "/companions/nova/comet/comet-guardian.png",
  },
  fallbackEmoji: NOVA.fallbackEmoji,
};

const NEBULA: CompanionSpeciesDef = {
  id: "nebula",
  name: "Nebula",
  images: {
    egg: "/companions/nova/nebula/nebula-egg.png",
    blobling: "/companions/nova/nebula/nebula-blobling.png",
    sprout: "/companions/nova/nebula/nebula-sprout.png",
    cadet: "/companions/nova/nebula/nebula-cadet.png",
    guardian: "/companions/nova/nebula/nebula-guardian.png",
  },
  fallbackEmoji: NOVA.fallbackEmoji,
};

/** Existing companion artwork registry shared by the dashboard and homepage. */
export const COMPANION_SPECIES: Record<CompanionId, CompanionSpeciesDef | undefined> = {
  nova: NOVA,
  luna: LUNA,
  terra: TERRA,
  comet: COMET,
  nebula: NEBULA,
};

export function getCompanionSpecies(id: CompanionId): CompanionSpeciesDef {
  return COMPANION_SPECIES[id] ?? NOVA;
}

/** The student's custom nickname, or the species name if they haven't renamed it. */
export function getCompanionDisplayName(companion: { id: CompanionId; name?: string }): string {
  return companion.name?.trim() || getCompanionSpecies(companion.id).name;
}
