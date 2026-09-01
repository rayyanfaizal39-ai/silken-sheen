/**
 * The Chapter 8 production artwork.
 *
 * All sixteen images ship as WebP converted from the supplied pack at quality 93
 * (see SCIENCE_F2_CH08_VISUAL_REFINEMENT_REPORT.md for the fidelity check). The
 * source PNGs are inputs, not production assets, and are deliberately not served
 * from this path — a test asserts nothing references a Chapter 8 `.png`.
 *
 * Every file is 1672x941 (14 is 1671x941), i.e. 16:9, and is drawn with
 * `object-contain` inside an `aspect-video` box. Overlay coordinates are
 * therefore percentages of the frame and stay attached at any width.
 */
const DIR = "/science/form2/chapter-8";

export const CHAPTER8_IMAGES = {
  effects: `${DIR}/01_effects_of_force.webp`,
  buoyancy: `${DIR}/02_buoyancy_everyday_life.webp`,
  levers: `${DIR}/03_levers_everyday_life.webp`,
  pressure: `${DIR}/04_pressure_contact_area.webp`,
  types: `${DIR}/05_types_of_forces.webp`,
  actionReaction: `${DIR}/06_action_reaction_palms_touching.webp`,
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
} as const;

export type Chapter8ImageKey = keyof typeof CHAPTER8_IMAGES;

/** Natural pixel size, used to reserve space so the artwork cannot shift layout. */
export const CHAPTER8_IMAGE_SIZE = { width: 1672, height: 941 } as const;

export const CHAPTER8_IMAGE_LIST = Object.values(CHAPTER8_IMAGES);
