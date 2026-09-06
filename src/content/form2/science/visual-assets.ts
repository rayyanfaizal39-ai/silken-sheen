/**
 * Production artwork for Science Form 2 Chapters 7, 9 and 10.
 *
 * The files ship as WebP under `public/science/form2/chapter-N/`, the path
 * Chapter 8 established (`src/components/notes/chapter8/chapter8-assets.ts`).
 * The source PNGs are inputs, not production assets: nothing here references a
 * `.png`, and a test asserts it stays that way.
 *
 * Every image is language-neutral — not one carries baked-in text — so the BM
 * and DLP chapters reference the same file, and the labels, captions and alt
 * text come from chapter content instead. Both languages import from here, so
 * a path can never drift between them.
 */

const DIR = "/science/form2";

export const SCIENCE_F2_CH7_IMAGES = {
  chargeTransfer: `${DIR}/chapter-7/07_01_electrostatic_charge_transfer.webp`,
  dailyLife: `${DIR}/chapter-7/07_02_electrostatics_daily_life.webp`,
  meterPlacement: `${DIR}/chapter-7/07_03_ammeter_voltmeter_placement.webp`,
  electromagnetUses: `${DIR}/chapter-7/07_04_electromagnet_applications.webp`,
  /**
   * The three apparatus photographs behind "magnetic fields from an electric
   * current". Deliberately apparatus only — no battery, no circuit, no arrows,
   * no field lines, no pole letters — because every one of those has to change
   * when the learner reverses the current, and a raster cannot. They are drawn
   * over the picture instead; see `ch7-field-geometry.ts`.
   */
  straightWireApparatus: `${DIR}/chapter-7/07_05_straight_current_carrying_wire_apparatus.webp`,
  circularLoopApparatus: `${DIR}/chapter-7/07_06_current_carrying_circular_loop_apparatus.webp`,
  solenoidApparatus: `${DIR}/chapter-7/07_07_current_carrying_solenoid_apparatus.webp`,
} as const;

export const SCIENCE_F2_CH9_IMAGES = {
  greenBuilding: `${DIR}/chapter-9/09_01_green_building.webp`,
  seaBreeze: `${DIR}/chapter-9/09_02_sea_breeze.webp`,
  landBreeze: `${DIR}/chapter-9/09_03_land_breeze.webp`,
  bimetallicAlarm: `${DIR}/chapter-9/09_04_bimetallic_fire_alarm.webp`,
  conductorInsulator: `${DIR}/chapter-9/09_05_conductor_vs_insulator.webp`,
  kitchenHeatTransfer: `${DIR}/chapter-9/09_06_conduction_convection_radiation_kitchen.webp`,
  /**
   * The Chapter 9 visual pass. `heatHero` leads the chapter page; the rest are
   * either contextual scenes or the base a deterministic SVG teaching layer is
   * drawn on (see `ch9-heat-geometry.ts`). None carries baked-in text, so both
   * languages use the same file.
   */
  heatHero: `${DIR}/chapter-9/09_07_heat_chapter_hero.webp`,
  heatVsTemperature: `${DIR}/chapter-9/09_08_heat_vs_temperature.webp`,
  polarBear: `${DIR}/chapter-9/09_09_polar_bear_insulation.webp`,
  expansionUses: `${DIR}/chapter-9/09_10_expansion_contraction_applications.webp`,
  absorptionEmission: `${DIR}/chapter-9/09_11_heat_absorption_emission_black_vs_shiny.webp`,
} as const;

export const SCIENCE_F2_CH10_IMAGES = {
  bellJar: `${DIR}/chapter-10/10_01_vacuum_bell_jar.webp`,
  tuningFork: `${DIR}/chapter-10/10_02_tuning_fork_water_ripples.webp`,
  reflectionAbsorption: `${DIR}/chapter-10/10_03_reflection_vs_absorption.webp`,
  sonarEcholocation: `${DIR}/chapter-10/10_04_sonar_and_bat_echolocation.webp`,
  echoCave: `${DIR}/chapter-10/10_05_echo_cave.webp`,
  instruments: `${DIR}/chapter-10/10_06_musical_instruments_vibrating_parts.webp`,
} as const;

/**
 * Intrinsic aspect ratios, so the frame reserves the right box before the file
 * arrives and nothing on the page moves as it loads. Eighteen of the nineteen
 * are 1672 x 941; the bell jar is 1448 x 1086.
 */
export const SCIENCE_F2_VISUAL_ASPECT = {
  /** 1672 x 941. */
  wide: "16 / 9",
  /** 1448 x 1086 — the vacuum bell jar. */
  upright: "4 / 3",
} as const;

/**
 * Every file in the pack, for membership checks. Typed as plain strings on
 * purpose: callers ask "is this src one of ours?" about a `string` from chapter
 * content, and a literal-union element type turns that ordinary question into a
 * type error.
 */
export const SCIENCE_F2_VISUAL_ASSETS: string[] = [
  ...Object.values(SCIENCE_F2_CH7_IMAGES),
  ...Object.values(SCIENCE_F2_CH9_IMAGES),
  ...Object.values(SCIENCE_F2_CH10_IMAGES),
];
