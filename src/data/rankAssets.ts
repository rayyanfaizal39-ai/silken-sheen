export interface SpaceRank {
  id: string;
  name: string;
  emoji: string;
  minXp: number;
  maxXp: number;
  image: string;
  color: string;
  glowColor: string;
  description: string;
}

/** The single source of truth for the visible Cosmic Journey progression. */
export const RANKS: SpaceRank[] = [
  { id: "space-cadet", name: "Space Cadet", emoji: "🚀", minXp: 0, maxXp: 1499, image: "/ranks/space_cadet.png", color: "#60A5FA", glowColor: "rgba(59,130,246,0.45)", description: "Every journey begins with a single launch" },
  { id: "moon-explorer", name: "Moon Explorer", emoji: "🌙", minXp: 1500, maxXp: 3999, image: "/ranks/moon_explorer.png", color: "#22D3EE", glowColor: "rgba(34,211,238,0.48)", description: "Exploring new frontiers of knowledge" },
  { id: "planet-voyager", name: "Planet Voyager", emoji: "🪐", minXp: 4000, maxXp: 7999, image: "/ranks/planet_voyager.png", color: "#2DD4BF", glowColor: "rgba(45,212,191,0.5)", description: "Orbiting whole worlds of discovery" },
  { id: "star-captain", name: "Star Captain", emoji: "⭐", minXp: 8000, maxXp: 14999, image: "/ranks/star_captain.png", color: "#FBBF24", glowColor: "rgba(251,191,36,0.52)", description: "Commanding constellations of skill" },
  { id: "galaxy-guardian", name: "Galaxy Guardian", emoji: "🌌", minXp: 15000, maxXp: 29999, image: "/ranks/galaxy-guardian.png", color: "#A78BFA", glowColor: "rgba(139,92,246,0.55)", description: "Protector of knowledge across the universe" },
  { id: "cosmic-legend", name: "Cosmic Legend", emoji: "🌟", minXp: 30000, maxXp: Infinity, image: "/ranks/cosmic-legend.png", color: "#F0ABFC", glowColor: "rgba(192,132,252,0.6)", description: "Among the rarest minds in the universe" },
];

export const rankAssets = Object.fromEntries(RANKS.map((rank) => [rank.name, rank.image]));

export function getRank(xp: number): SpaceRank {
  const safeXp = Math.max(0, xp);
  for (let index = RANKS.length - 1; index >= 0; index -= 1) {
    if (safeXp >= RANKS[index].minXp) return RANKS[index];
  }
  return RANKS[0];
}

export function getNextRank(xp: number): SpaceRank | null {
  const currentIndex = RANKS.findIndex((rank) => rank.id === getRank(xp).id);
  return currentIndex < RANKS.length - 1 ? RANKS[currentIndex + 1] : null;
}

export function getRankProgress(xp: number): number {
  const rank = getRank(xp);
  if (rank.maxXp === Infinity) return 100;
  const range = rank.maxXp - rank.minXp + 1;
  return Math.min(100, Math.max(0, Math.round(((xp - rank.minXp) / range) * 100)));
}

export function getRankAsset(rank: string): string | undefined {
  return RANKS.find((item) => item.name === rank)?.image;
}

export function getRankGlow(rank: string): string {
  return RANKS.find((item) => item.name === rank)?.glowColor ?? "rgba(59,130,246,0.36)";
}

// ─── Rank artwork geometry (measured, presentation-only) ─────────────────────
//
// Every /ranks/*.png is a 1536×1024 landscape canvas. `object-contain` in a
// square letterboxes that canvas, and the opaque companion only occupies part
// of the letterboxed area — a different fraction per file. Sizing the wrapper
// from the file's intrinsic dimensions therefore makes one rank look larger
// than another.
//
// `fill` is the opaque bounding box's longest side as a fraction of the square
// (alpha > 12). `centerX` / `centerY` are that box's center inside the same
// square. Consumers keep a fixed wrapper and scale + translate the image so
// the artwork, not the transparent padding, fills the wrapper and stays
// centered. Re-measure if the artwork is replaced.
//
// This is display metadata only: it never changes the asset, the rank
// thresholds, or any progression logic.
const ARTWORK_TARGET_FILL = 0.9;

const RANK_ARTWORK_GEOMETRY: Record<string, { fill: number; centerX: number; centerY: number }> = {
  "Space Cadet": { fill: 0.5039, centerX: 0.4925, centerY: 0.4759 },
  "Moon Explorer": { fill: 0.4271, centerX: 0.498, centerY: 0.4714 },
  "Planet Voyager": { fill: 0.4056, centerX: 0.499, centerY: 0.4587 },
  "Star Captain": { fill: 0.4805, centerX: 0.4733, centerY: 0.4707 },
  "Galaxy Guardian": { fill: 0.5397, centerX: 0.4977, centerY: 0.4912 },
  "Cosmic Legend": { fill: 0.526, centerX: 0.4948, centerY: 0.4974 },
};

const FALLBACK_ARTWORK_GEOMETRY = { fill: 0.48, centerX: 0.5, centerY: 0.5 };

/**
 * Fraction of a square image box that the visible artwork occupies under
 * `object-contain`. Falls back to the mid-range value for an unknown rank so a
 * new asset renders at a sane size rather than collapsing or exploding.
 */
export function getRankArtworkSquareFill(rank: string): number {
  return (RANK_ARTWORK_GEOMETRY[rank] ?? FALLBACK_ARTWORK_GEOMETRY).fill;
}

export type RankArtworkFit = {
  scale: number;
  translateX: number;
  translateY: number;
};

/**
 * Transform that makes every rank's opaque artwork fill the same fraction of a
 * fixed square `object-contain` box, centered, without cropping opaque pixels.
 * Translate percentages are applied after scale, with the origin at the center.
 */
export function getRankArtworkFit(rank: string): RankArtworkFit {
  const geometry = RANK_ARTWORK_GEOMETRY[rank] ?? FALLBACK_ARTWORK_GEOMETRY;
  const scale = ARTWORK_TARGET_FILL / geometry.fill;
  return {
    scale,
    translateX: (0.5 - geometry.centerX) * scale * 100,
    translateY: (0.5 - geometry.centerY) * scale * 100,
  };
}
