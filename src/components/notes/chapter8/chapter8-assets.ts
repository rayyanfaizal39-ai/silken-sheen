/**
 * The Chapter 8 production artwork.
 *
 * The original pack ships as WebP converted at quality 93 (see
 * SCIENCE_F2_CH08_VISUAL_REFINEMENT_REPORT.md for the fidelity check); the three
 * later approved figures are converted at quality 90. The source PNGs are
 * inputs, not production assets, and are deliberately not served from this path
 * — a test asserts nothing references a Chapter 8 `.png`.
 *
 * Most files are 1672x941 (14 is 1671x941), i.e. 16:9, and are drawn with
 * `object-contain` inside an `aspect-video` box, so overlay coordinates are
 * percentages of the frame and stay attached at any width. The one exception is
 * the action–reaction triptych, which is 2048x768 (8:3); its frame takes that
 * ratio instead of 16:9 precisely so it is not letterboxed and its percentages
 * keep mapping straight onto the rendered pixels. See `CHAPTER8_IMAGE_SIZES`.
 */
const DIR = "/science/form2/chapter-8";

export const CHAPTER8_IMAGES = {
  buoyancy: `${DIR}/02_buoyancy_everyday_life.webp`,
  levers: `${DIR}/03_levers_everyday_life.webp`,
  pressure: `${DIR}/04_pressure_contact_area.webp`,
  atmosphere: `${DIR}/07_atmospheric_pressure_altitude.webp`,
  pushBox: `${DIR}/08_force_push_box.webp`,
  hammerNail: `${DIR}/09_force_hammer_nail.webp`,
  springBalance: `${DIR}/10_buoyant_force_spring_balance.webp`,
  floating: `${DIR}/11_floating_object.webp`,
  sinking: `${DIR}/12_sinking_object.webp`,
  momentDoor: `${DIR}/13_moment_opening_door.webp`,
  momentSpanner: `${DIR}/14_moment_spanner.webp`,
  momentAngle: `${DIR}/15_moment_force_at_angle.webp`,
  liquidPressure: `${DIR}/16_liquid_pressure_tank.webp`,

  /**
   * The later approved figures, each of which replaced an earlier visual that
   * did not match the teaching the remediation had settled on:
   *
   *  - `typesOfForces` replaced `05_types_of_forces.webp`. The old artwork
   *    showed four examples — one of them magnetic force, which is enrichment
   *    here rather than one of the six core types — so two of the six had no
   *    panel at all. The new artwork paints all six, in the chapter's own order.
   *  - `effectsOfForce` replaced `01_effects_of_force.webp` AND the separate
   *    before/after plasticine figure. The old four-panel scene had no panel for
   *    the fifth effect, which is why that effect needed a figure of its own;
   *    one five-panel scene teaches all five together instead.
   *  - `actionReactionPairs` replaced `06_action_reaction_palms_touching.webp`.
   *    The palms photograph showed one unnamed contact pair, where the triptych
   *    shows the three situations the section actually teaches.
   *
   * None of the replaced files is registered or rendered any more.
   *
   * Every one of these is language-neutral — not one carries a baked-in word —
   * so BM and DLP reference the same file and every label, arrow and
   * explanation is drawn by the UI from chapter content.
   */
  typesOfForces: `${DIR}/science-f2-ch8-types-of-forces.webp`,
  effectsOfForce: `${DIR}/science-f2-ch8-effects-of-force.webp`,
  actionReactionPairs: `${DIR}/science-f2-ch8-action-reaction-pairs.webp`,
  diverLiquidPressure: `${DIR}/science-f2-ch8-diver-liquid-pressure.webp`,
} as const;

export type Chapter8ImageKey = keyof typeof CHAPTER8_IMAGES;

/**
 * Natural pixel size for the 16:9 pack — used to reserve space so the artwork
 * cannot shift layout, and as the `pixel` overlay viewBox.
 */
export const CHAPTER8_IMAGE_SIZE = { width: 1672, height: 941 } as const;

/** Artwork whose natural size is NOT the pack's 1672x941. */
const CHAPTER8_IMAGE_SIZE_OVERRIDES: Partial<
  Record<Chapter8ImageKey, { width: number; height: number }>
> = {
  /** Three side-by-side situations, so the artwork is a panorama rather than 16:9. */
  actionReactionPairs: { width: 2048, height: 768 },
};

/** The natural size of one image. Reserves the right box before the file arrives. */
export function chapter8ImageSize(image: Chapter8ImageKey): { width: number; height: number } {
  return CHAPTER8_IMAGE_SIZE_OVERRIDES[image] ?? CHAPTER8_IMAGE_SIZE;
}

/**
 * The CSS `aspect-ratio` for one image, or `undefined` when it is the pack's
 * 16:9 and the shared `aspect-video` class already covers it. A frame that does
 * not match its artwork letterboxes it, and every percentage hotspot on that
 * artwork then points at the wrong place — so this is not cosmetic.
 */
export function chapter8ImageAspect(image: Chapter8ImageKey): string | undefined {
  const override = CHAPTER8_IMAGE_SIZE_OVERRIDES[image];
  return override ? `${override.width} / ${override.height}` : undefined;
}

export const CHAPTER8_IMAGE_LIST = Object.values(CHAPTER8_IMAGES);
