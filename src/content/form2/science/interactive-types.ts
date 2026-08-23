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

/** One organism in a food web. `tier` 0 = producer, 1 = primary consumer, 2 = secondary, 3 = tertiary. */
export type FoodWebNode = {
  id: string;
  label: string;
  tier: number;
  icon?: string;
};

/**
 * A worked food web: several interconnected food chains. Edges are directed and
 * point from the organism that is eaten to the organism that eats it, i.e. in the
 * direction energy actually flows.
 */
export type FoodWebBlock = {
  title: string;
  instruction: string;
  nodes: FoodWebNode[];
  edges: { from: string; to: string }[];
  /** Row captions, lowest tier first. */
  tierLabels: string[];
  chainsLabel: string;
  arrowNote: string;
  tapHint: string;
};

/** A cause -> effect teaching chain, rendered as an arrow sequence. */
export type CauseEffectItem = {
  icon?: string;
  title: string;
  chain: string[];
  /** Optional closing line, e.g. the matching solution or a caution. */
  note?: string;
};

export type CauseEffectBlock = {
  title: string;
  instruction?: string;
  items: CauseEffectItem[];
};

/** One organism's adaptation, taught as adaptation -> function -> survival benefit. */
export type AdaptationOrganism = {
  kind: "animal" | "plant";
  name: string;
  adaptation: string;
  role: string;
  benefit: string;
};

export type AdaptationCase = {
  id: string;
  habitat: string;
  challenge: string;
  organisms: AdaptationOrganism[];
  imagePath?: string;
};

/** Satisfies SP 2.3.2's verb: justify WHY an adaptation matters, not just name the climate. */
export type AdaptationBlock = {
  title: string;
  instruction: string;
  labels: {
    challenge: string;
    adaptation: string;
    role: string;
    benefit: string;
    animal: string;
    plant: string;
  };
  cases: AdaptationCase[];
};

/** One tier of a food/nutrition pyramid, base first. A tier can hold more than one food group
 * (e.g. vegetables + fruit sharing the base) so the diagram can separate groups without adding
 * a visual level. */
export type PyramidGroup = {
  label: string;
  servings?: string;
};

export type PyramidTier = {
  id: string;
  groups: PyramidGroup[];
  note: string;
  icon?: string;
};

export type PyramidBlock = {
  title: string;
  instruction: string;
  /** Base tier first, apex last. */
  tiers: PyramidTier[];
  /** Footnote shown below the pyramid, e.g. daily water guidance. */
  baseNote?: string;
  /** Footnote for the apex — e.g. guidance to limit ultra-processed foods. */
  limitNote?: string;
  sourceLabel: string;
};

/** One organ/gland in the digestive tract diagram. Accessory organs (liver, gall bladder,
 * pancreas) are not part of the alimentary canal, so they are drawn branching off the tract
 * rather than in-line with it. */
export type DigestiveOrgan = {
  id: string;
  label: string;
  note?: string;
  kind: "tract" | "accessory";
  /** For accessory organs: the tract organ id it connects to. */
  connectsTo?: string;
};

export type DigestiveSystemBlock = {
  title: string;
  instruction: string;
  organs: DigestiveOrgan[];
  tractLabel: string;
  accessoryLabel: string;
};

export type ViskingTube = {
  id: string;
  label: string;
  contents: string;
};

export type ViskingExperimentBlock = {
  title: string;
  instruction: string;
  tubes: ViskingTube[];
  surroundLabel: string;
  testLabel: string;
  resultCorrect: string;
  resultIncorrect: string;
  note: string;
};

export type VillusPathway = {
  id: string;
  label: string;
  destination: string;
  cargo: string;
};

export type VillusDiagramBlock = {
  title: string;
  instruction: string;
  pathways: VillusPathway[];
  wallLabel: string;
  lumenLabel: string;
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
  foodWeb?: FoodWebBlock;
  causeEffect?: CauseEffectBlock;
  adaptations?: AdaptationBlock;
  pyramid?: PyramidBlock;
  digestiveSystem?: DigestiveSystemBlock;
  viskingExperiment?: ViskingExperimentBlock;
  villusDiagram?: VillusDiagramBlock;
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
