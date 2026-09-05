import type { SpotlightShape } from "@/components/notes/blocks/spotlight-shapes";

/**
 * Authored geometry for the pond-ecosystem `spotlight` figure (SP 2.3.1),
 * eyeballed against `chapter2_pond_ecosystem.webp` itself.
 *
 * Positions are percentages of the artwork's width (x, cx, rx) and height
 * (y, cy, ry) independently — the same convention `regions` mode already
 * used here. Kept in ONE place, in a language-neutral file, so BM and DLP
 * cannot drift onto different shapes for the same organism: only the text
 * (`label`, `note`, `spotlightCaption`) differs between the two content
 * files that import this.
 */

const ellipse = (id: string, cx: number, cy: number, rx: number, ry: number): SpotlightShape => ({
  id,
  kind: "ellipse",
  cx,
  cy,
  rx,
  ry,
});

const rect = (
  id: string,
  x: number,
  y: number,
  w: number,
  h: number,
  rx?: number,
): SpotlightShape => ({ id, kind: "rect", x, y, w, h, rx });

/** The one large dragonfly in the upper-left sky — SPECIES targets this alone. */
export const POND_HERO_DRAGONFLY: SpotlightShape[] = [ellipse("dragonfly-hero", 26, 14, 13, 9)];

/** The other six dragonflies of the same species, scattered mid-sky. */
export const POND_DRAGONFLY_SWARM: SpotlightShape[] = [
  ellipse("dragonfly-2", 49, 19, 4, 3),
  ellipse("dragonfly-3", 58, 13, 4, 3),
  ellipse("dragonfly-4", 68, 17, 4, 3),
  ellipse("dragonfly-5", 52, 24, 4, 3),
  ellipse("dragonfly-6", 61, 25, 4, 3),
  ellipse("dragonfly-7", 67, 26, 4, 3),
];

/** POPULATION = every dragonfly of that species living in this pond. */
export const POND_ALL_DRAGONFLIES: SpotlightShape[] = [
  ...POND_HERO_DRAGONFLY,
  ...POND_DRAGONFLY_SWARM,
];

/** Plants: water hyacinth, bank reeds, submerged stalks. */
export const POND_PLANTS: SpotlightShape[] = [
  ellipse("hyacinth-left", 27, 38, 23, 8),
  ellipse("hyacinth-right", 80, 37, 14, 6),
  ellipse("reed-left", 6, 20, 7, 22),
  ellipse("reed-right", 93, 29, 7, 16),
  ellipse("stalk-1", 33, 74, 3, 13),
  ellipse("stalk-2", 47, 70, 3, 12),
  ellipse("stalk-3", 83, 78, 4, 17),
  ellipse("stalk-4", 89, 82, 4, 16),
  ellipse("bank-grass", 10, 88, 6, 8),
];

/** The three water snails on the bank grass, bottom-left. */
export const POND_SNAILS: SpotlightShape[] = [
  ellipse("snail-1", 9, 59, 2.5, 3),
  ellipse("snail-2", 13, 72, 2.5, 3),
  ellipse("snail-3", 17, 85, 2.5, 3),
];

export const POND_TADPOLES: SpotlightShape[] = [ellipse("tadpoles", 34, 73, 10, 11)];
export const POND_FISH: SpotlightShape[] = [ellipse("fish", 64, 75, 9, 14)];
export const POND_LARVAE: SpotlightShape[] = [ellipse("larvae", 83, 56, 16, 6)];

/** COMMUNITY = every living population in the pond, together. */
export const POND_COMMUNITY_SHAPES: SpotlightShape[] = [
  ...POND_ALL_DRAGONFLIES,
  ...POND_PLANTS,
  ...POND_SNAILS,
  ...POND_TADPOLES,
  ...POND_FISH,
  ...POND_LARVAE,
];

/** HABITAT = the pond itself: water, muddy bed and its edge — not the sky above it. */
export const POND_HABITAT_SHAPE: SpotlightShape[] = [rect("pond-body", 0.5, 31, 99, 68, 3)];

/** Non-living scenery used only for the ECOSYSTEM pulse (never dimmed on its own). */
const POND_SKY_SHAPE: SpotlightShape = rect("sky", 0, 0, 100, 31);
const POND_SUN_SHAPE: SpotlightShape = ellipse("sun", 92, 8, 8, 8);
export const POND_NON_LIVING_SHAPES: SpotlightShape[] = [
  ...POND_HABITAT_SHAPE,
  POND_SKY_SHAPE,
  POND_SUN_SHAPE,
];
