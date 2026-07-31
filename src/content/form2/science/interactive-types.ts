import type { FlipCardItem, MiniQuizItem } from "./chapter-1/interactive-types";

export type ScienceInteractiveCard = {
  title: string;
  body: string;
  detail?: string;
};

export type ScienceInteractiveMatcherPair = {
  id: string;
  label: string;
  match: string;
};

export type PhScalePoint = {
  value: number;
  name: string;
  description: string;
};

export type PhSliderBlock = {
  title: string;
  instruction: string;
  scale: PhScalePoint[];
  /** CSS gradient override for the track — defaults to the pH red→violet gradient. */
  gradient?: string;
  /** Prefix shown before the value in the readout, e.g. "pH". Omit to show just the name/description. */
  unitLabel?: string;
  initialValue?: number;
};

export type CalculatorBlock =
  | { type: "ohms-law"; title: string; instruction: string }
  | {
      type: "resistance-comparator";
      title: string;
      instruction: string;
      defaultR1?: number;
      defaultR2?: number;
    }
  | {
      type: "two-field";
      title: string;
      instruction: string;
      fieldA: { label: string; unit: string; default?: number };
      fieldB: { label: string; unit: string; default?: number };
      operation: "multiply" | "divide";
      resultLabel: string;
      resultUnit: string;
    }
  | {
      type: "au-light-year";
      title: string;
      instruction: string;
      defaultKm?: number;
    };

export type BuoyancyMaterial = {
  id: string;
  label: string;
  icon: string;
  /** g/cm³ — compared against water's 1.0 g/cm³. */
  density: number;
};

export type BuoyancyBlock = {
  title: string;
  instruction: string;
  materials: BuoyancyMaterial[];
};

export type WaveVisualizerBlock = {
  title: string;
  instruction: string;
};

export type GalaxyCard = {
  id: string;
  /** Resolved image path (bundled asset import or Supabase-bucket-relative string). */
  image: string;
  name: string;
  example: string;
};

export type GalaxyCardsBlock = {
  title: string;
  instruction: string;
  cards: GalaxyCard[];
};

export type PlanetSphere = {
  id: string;
  name: string;
  /** CSS `background` value for the radial-gradient sphere — no image needed. */
  gradient: string;
  /** Sphere diameter in px. */
  size: number;
  rings?: boolean;
  fact: string;
  facts: { label: string; value: string }[];
};

export type PlanetSpheresBlock = {
  title: string;
  instruction: string;
  planets: PlanetSphere[];
};

export type ScienceInteractiveSection = {
  number: string;
  title: string;
  intro?: string;
  cards?: ScienceInteractiveCard[];
  flipCards?: FlipCardItem[];
  accordions?: ScienceInteractiveCard[];
  tabs?: ScienceInteractiveCard[];
  phSlider?: PhSliderBlock;
  calculators?: CalculatorBlock[];
  buoyancy?: BuoyancyBlock;
  waveVisualizer?: WaveVisualizerBlock;
  galaxyCards?: GalaxyCardsBlock;
  planets?: PlanetSpheresBlock;
  matcher?: {
    title: string;
    instruction: string;
    pairs: ScienceInteractiveMatcherPair[];
  };
  sequence?: {
    title: string;
    instruction: string;
    /** Resolved image path shown as a banner above the journey stepper. */
    bannerImage?: string;
    steps: ScienceInteractiveCard[];
  };
  comparison?: {
    title: string;
    columns: ScienceInteractiveCard[];
  };
  checks: { question: string; hint: string }[];
};

export type ScienceF2InteractiveContent = {
  chapter: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  blogHighlight: { title: string; body: string; imagePath: string };
  keywords: string[];
  sections: ScienceInteractiveSection[];
  reflectionItems: string[];
  miniQuiz: MiniQuizItem[];
};
