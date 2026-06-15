// ─── Pop Mart character & cosmetics catalog ─────────────────────────────────────
// Characters are vinyl-toy collectibles unlocked via the Market or auto-unlocked
// on chess rank-up. Slots: character skin, headgear, expression, companion.

import type { AvatarConfig } from "@/hooks/use-progress";

export type AvatarSlot = "helmet" | "suit" | "visor" | "pet";

export type Rarity = "common" | "rare" | "epic" | "legendary";

export interface RarityMeta {
  id: Rarity;
  label: string;
  color: string;
  glow: string;
  order: number;
}

export const RARITIES: Record<Rarity, RarityMeta> = {
  common: {
    id: "common",
    label: "Common",
    color: "#94A3B8",
    glow: "rgba(148,163,184,0.5)",
    order: 0,
  },
  rare: { id: "rare", label: "Rare", color: "#38BDF8", glow: "rgba(56,189,248,0.55)", order: 1 },
  epic: { id: "epic", label: "Epic", color: "#A855F7", glow: "rgba(168,85,247,0.6)", order: 2 },
  legendary: {
    id: "legendary",
    label: "Legendary",
    color: "#FBBF24",
    glow: "rgba(251,191,36,0.65)",
    order: 3,
  },
};

export const RARITY_ORDER: Rarity[] = ["common", "rare", "epic", "legendary"];

export interface AvatarItem {
  id: string;
  slot: AvatarSlot;
  name: string;
  cost: number; // Stardust; 0 = starter (owned by default)
  rarity: Rarity;
  /** Primary / secondary colours consumed by the SVG renderer. */
  colors: { base: string; trim: string };
  /** Short flavour line shown in the Market. */
  blurb: string;
}

export const AVATAR_SLOTS: { slot: AvatarSlot; label: string }[] = [
  { slot: "suit", label: "Character" },
  { slot: "helmet", label: "Headgear" },
  { slot: "visor", label: "Expression" },
  { slot: "pet", label: "Companion" },
];

export const AVATAR_ITEMS: AvatarItem[] = [
  // ── Character skins (suit slot) ──────────────────────────────────────────────
  {
    id: "suit-molly",
    slot: "suit",
    name: "Molly",
    cost: 0,
    rarity: "common",
    colors: { base: "#6366F1", trim: "#A78BFA" },
    blurb: "The original Pop Mart sweetheart.",
  },
  {
    id: "suit-molly-pink",
    slot: "suit",
    name: "Molly Sakura",
    cost: 90,
    rarity: "rare",
    colors: { base: "#EC4899", trim: "#F9A8D4" },
    blurb: "Cherry-blossom limited edition.",
  },
  {
    id: "suit-labubu",
    slot: "suit",
    name: "Labubu",
    cost: 0,
    rarity: "rare",
    colors: { base: "#10B981", trim: "#6EE7B7" },
    blurb: "Wild forest sprite with pointy ears.",
  },
  {
    id: "suit-labubu-pink",
    slot: "suit",
    name: "Labubu Blossom",
    cost: 0,
    rarity: "rare",
    colors: { base: "#F472B6", trim: "#FBCFE8" },
    blurb: "Cotton-candy forest sprite.",
  },
  {
    id: "suit-dimoo",
    slot: "suit",
    name: "Dimoo",
    cost: 0,
    rarity: "epic",
    colors: { base: "#38BDF8", trim: "#BAE6FD" },
    blurb: "Dreamy star-gazer with heart of gold.",
  },
  {
    id: "suit-dimoo-star",
    slot: "suit",
    name: "Dimoo Starfall",
    cost: 0,
    rarity: "epic",
    colors: { base: "#8B5CF6", trim: "#DDD6FE" },
    blurb: "Cosmic night-sky edition.",
  },
  {
    id: "suit-skullpanda",
    slot: "suit",
    name: "Skullpanda",
    cost: 0,
    rarity: "epic",
    colors: { base: "#7C3AED", trim: "#C4B5FD" },
    blurb: "Gothic collector's dream.",
  },
  {
    id: "suit-skullpanda-neon",
    slot: "suit",
    name: "Skullpanda Neon",
    cost: 0,
    rarity: "epic",
    colors: { base: "#0F172A", trim: "#22D3EE" },
    blurb: "Cyber-punk underground edition.",
  },
  {
    id: "suit-crybaby",
    slot: "suit",
    name: "Crybaby",
    cost: 0,
    rarity: "legendary",
    colors: { base: "#FBBF24", trim: "#FDE68A" },
    blurb: "Tears of pure emotion.",
  },
  {
    id: "suit-crybaby-blue",
    slot: "suit",
    name: "Crybaby Azure",
    cost: 0,
    rarity: "legendary",
    colors: { base: "#3B82F6", trim: "#BAE6FD" },
    blurb: "Rain-cloud edition, extremely rare.",
  },
  {
    id: "suit-golden",
    slot: "suit",
    name: "Golden Queen",
    cost: 0,
    rarity: "legendary",
    colors: { base: "#F59E0B", trim: "#FEF08A" },
    blurb: "Reserved for the absolute elite. ♛",
  },

  // ── Headgear (helmet slot) ────────────────────────────────────────────────────
  {
    id: "helmet-classic",
    slot: "helmet",
    name: "Ribbon Bow",
    cost: 0,
    rarity: "common",
    colors: { base: "#E5E7EB", trim: "#CBD5E1" },
    blurb: "Classic Pop Mart signature bow.",
  },
  {
    id: "helmet-gold",
    slot: "helmet",
    name: "Royal Crown",
    cost: 100,
    rarity: "rare",
    colors: { base: "#FBBF24", trim: "#FCD34D" },
    blurb: "Fit for a Pop Mart royalty.",
  },
  {
    id: "helmet-crimson",
    slot: "helmet",
    name: "Party Hat",
    cost: 80,
    rarity: "rare",
    colors: { base: "#EF4444", trim: "#FCA5A5" },
    blurb: "It's always a celebration.",
  },
  {
    id: "helmet-carbon",
    slot: "helmet",
    name: "Cat Ears",
    cost: 160,
    rarity: "epic",
    colors: { base: "#334155", trim: "#94A3B8" },
    blurb: "Mochi neko vibes.",
  },

  // ── Expression (visor slot) ────────────────────────────────────────────────────
  {
    id: "visor-aqua",
    slot: "visor",
    name: "Happy Eyes",
    cost: 0,
    rarity: "common",
    colors: { base: "#1A1A1A", trim: "#94A3B8" },
    blurb: "Big round eyes, pure joy.",
  },
  {
    id: "visor-star",
    slot: "visor",
    name: "Star Eyes",
    cost: 60,
    rarity: "rare",
    colors: { base: "#FBBF24", trim: "#FDE68A" },
    blurb: "You're literally starstruck.",
  },
  {
    id: "visor-heart",
    slot: "visor",
    name: "Heart Eyes",
    cost: 90,
    rarity: "rare",
    colors: { base: "#EF4444", trim: "#FECACA" },
    blurb: "Head over heels for studying.",
  },
  {
    id: "visor-wink",
    slot: "visor",
    name: "Wink",
    cost: 120,
    rarity: "epic",
    colors: { base: "#6366F1", trim: "#A78BFA" },
    blurb: "One eye open, always watching.",
  },

  // ── Companion (pet slot) ───────────────────────────────────────────────────────
  {
    id: "pet-none",
    slot: "pet",
    name: "Solo",
    cost: 0,
    rarity: "common",
    colors: { base: "transparent", trim: "transparent" },
    blurb: "Flying solo.",
  },
  {
    id: "pet-star",
    slot: "pet",
    name: "Lucky Star",
    cost: 110,
    rarity: "rare",
    colors: { base: "#FBBF24", trim: "#FDE68A" },
    blurb: "Your shining sidekick.",
  },
  {
    id: "pet-flower",
    slot: "pet",
    name: "Bloom Buddy",
    cost: 150,
    rarity: "epic",
    colors: { base: "#EC4899", trim: "#FBCFE8" },
    blurb: "Flowers wherever you go.",
  },
  {
    id: "pet-moon",
    slot: "pet",
    name: "Moon Pal",
    cost: 200,
    rarity: "epic",
    colors: { base: "#8B5CF6", trim: "#DDD6FE" },
    blurb: "Lights your path at night.",
  },
  {
    id: "pet-rainbow",
    slot: "pet",
    name: "Rainbow Arc",
    cost: 260,
    rarity: "legendary",
    colors: { base: "#EC4899", trim: "#FBBF24" },
    blurb: "Colour the world around you.",
  },
];

export function getItem(id: string): AvatarItem | undefined {
  return AVATAR_ITEMS.find((i) => i.id === id);
}

export function itemsForSlot(slot: AvatarSlot): AvatarItem[] {
  return AVATAR_ITEMS.filter((i) => i.slot === slot);
}

/** Highest rarity among the equipped cosmetics — used to tint the chamber. */
export function loadoutRarity(config: AvatarConfig): RarityMeta {
  const equipped = [config.suit, config.helmet, config.visor, config.pet]
    .map((id) => getItem(id)?.rarity ?? "common")
    .sort((a, b) => RARITIES[b].order - RARITIES[a].order);
  return RARITIES[equipped[0] ?? "common"];
}

/** Resolve the equipped items of a config into their catalog entries. */
export function resolveAvatar(config: AvatarConfig) {
  return {
    suit:   getItem(config.suit)   ?? getItem("suit-molly")!,
    helmet: getItem(config.helmet) ?? getItem("helmet-classic")!,
    visor:  getItem(config.visor)  ?? getItem("visor-aqua")!,
    pet:    getItem(config.pet)    ?? getItem("pet-none")!,
  };
}
