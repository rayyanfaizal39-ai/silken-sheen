import type { AnnotationMode } from "@/components/notes/blocks/annotation-layout";
import type { LearningImageSize } from "@/components/notes/blocks/learning-image";
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
  /** Per-language alt text for `imagePath`. Falls back to the habitat name. */
  imageAlt?: string;
  /** Intrinsic aspect ratio of `imagePath`, e.g. "16 / 9". */
  imageAspect?: string;
  /** Rendered footprint of `imagePath`. */
  imageSize?: LearningImageSize;
  /** Localisable annotations drawn against `imagePath`. */
  imageAnnotations?: { id: string; label: string; note?: string; x: number; y: number }[];
  /** How those annotations are presented. Defaults to callouts. */
  imageAnnotationMode?: AnnotationMode;
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

/**
 * A reference illustration with localisable annotations. No text is baked into
 * the artwork — `alt`, `caption` and every annotation label live here so BM and
 * DLP share the same image file.
 */
export type AnnotatedImageBlock = {
  /** Resolved asset URL (a `src/assets` import) or notes-bucket object path. */
  src: string;
  alt: string;
  /** Rendered footprint. Omit to derive one from the aspect ratio. */
  size?: LearningImageSize;
  /** Intrinsic aspect ratio of the artwork, e.g. "3 / 2". */
  aspect?: string;
  caption?: string;
  legendLabel?: string;
  /**
   * How the parts are named. Prefer `labels` or `callouts` so a student reads
   * the diagram in one pass; `numbers` is a last resort for very dense artwork.
   */
  annotationMode?: AnnotationMode;
  /** Key pinned inside the artwork, e.g. what each arrow colour represents. */
  imageKey?: { color: string; label: string }[];
  annotations: { id: string; label: string; note?: string; x: number; y: number }[];
};

/**
 * Positions only. The label for each marker is read from the block's own data
 * (organ / tube / pathway), so annotating an illustration never duplicates a
 * string that already exists in chapter content.
 */
export type DiagramImage = {
  src: string;
  alt: string;
  size?: LearningImageSize;
  aspect?: string;
  caption?: string;
  legendLabel?: string;
  /** How the annotations are presented. Defaults to callouts. */
  annotationMode?: AnnotationMode;
  /** Key pinned inside the artwork, e.g. what each arrow colour represents. */
  imageKey?: { color: string; label: string }[];
  /** Maps an existing item id in the block to a position on the artwork. */
  points: { id: string; x: number; y: number }[];
  /** Extra markers for parts of the artwork the block data does not already name. */
  extra?: { id: string; label: string; note?: string; x: number; y: number }[];
};

/**
 * One reaction an enzyme catalyses. Protease has three, on three different
 * substrates in three different organs, so stages are modelled per reaction
 * rather than per enzyme.
 */
export type EnzymeStage = {
  /** Optional heading when an enzyme acts more than once, e.g. "In the stomach". */
  stageLabel?: string;
  /** Short enzyme name printed over the reaction arrow. */
  enzymeLabel: string;
  substrate: string;
  product: string;
  sourceLabel: string;
  /** Where the enzyme is secreted. */
  source: string;
  siteLabel: string;
  /** Where the enzyme acts. */
  site: string;
};

export type EnzymeEntry = {
  id: string;
  name: string;
  summary: string;
  /** Colour used for this enzyme's tab and reaction arrows. */
  accent: string;
  stages: EnzymeStage[];
  note?: string;
};

export type EnzymeExplorerBlock = {
  title: string;
  instruction?: string;
  enzymes: EnzymeEntry[];
};

/** One curve or marker on the antibody-response graph. */
export type ImmuneResponseItem = { id: string; label: string; note: string };

export type ImmuneResponseGraphBlock = {
  title: string;
  instruction?: string;
  xAxisLabel: string;
  yAxisLabel: string;
  immuneLevelLabel: string;
  items: ImmuneResponseItem[];
  hint: string;
};

/** One line of the body's defence. `group` drives the specific / non-specific split. */
export type DefenceLine = {
  id: string;
  name: string;
  /** The structures or cells involved, e.g. "Kulit, membran mukus". */
  parts: string;
  note: string;
  group: "non-specific" | "specific";
};

export type DefenceLinesBlock = {
  title: string;
  instruction?: string;
  pathogenLabel: string;
  nonSpecificLabel: string;
  specificLabel: string;
  lines: DefenceLine[];
  hint: string;
};

/** One cell of the active/passive x natural/artificial immunity grid. */
export type ImmunityCell = {
  id: string;
  row: "active" | "passive";
  column: "natural" | "artificial";
  name: string;
  /** How it is acquired, e.g. "Selepas sembuh daripada jangkitan". */
  source: string;
  /** How quickly it acts and how long it lasts. */
  duration: string;
  note: string;
};

export type ImmunityMatrixBlock = {
  title: string;
  instruction?: string;
  activeLabel: string;
  passiveLabel: string;
  naturalLabel: string;
  artificialLabel: string;
  cells: ImmunityCell[];
  hint: string;
};

/** One term shown in the ecological terms relationship diagram. */
export type EcologicalTerm = {
  term: string;
  definition: string;
};

/**
 * Ecological terms, drawn as three separate relationships rather than one
 * ladder: habitat is a place, not a level of organisation.
 */
export type EcologicalTermsBlock = {
  title: string;
  instruction?: string;
  levelsLabel: string;
  placeLabel: string;
  ecosystemLabel: string;
  species: EcologicalTerm;
  population: EcologicalTerm;
  /** `short` is the compact restatement used in the ecosystem equation row. */
  community: EcologicalTerm & { short: string };
  habitat: EcologicalTerm;
  nonLiving: EcologicalTerm;
  ecosystem: EcologicalTerm;
  note?: string;
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
  /** When present the anatomical illustration replaces the schematic drawing. */
  image?: DiagramImage;
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
  /** When present the apparatus illustration replaces the schematic drawing. */
  image?: DiagramImage;
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
  /** When present the cross-section illustration replaces the schematic drawing. */
  image?: DiagramImage;
};

/**
 * One investigated factor inside a MiniExperimentBlock — a self-contained
 * manipulated-variable study with its own hypothesis and variable set.
 *
 * Kept generic rather than water-specific: every KSSM science chapter carries
 * compulsory experiments with exactly this shape, so later chapters reuse the
 * block instead of re-authoring one.
 */
export type MiniExperimentPart = {
  id: string;
  /** Short tab label, e.g. "Kelembapan udara". */
  label: string;
  icon?: string;
  /** The question the part investigates. */
  question: string;
  hypothesis: string;
  manipulated: string;
  responding: string;
  /** Held-constant variables, already joined into one readable phrase. */
  controlled: string;
  /** Materials + apparatus, kept to one short line each. */
  materials: string;
  apparatus: string;
  /** Three to five short steps. */
  method: string[];
  observation: string;
  conclusion: string;
};

export type MiniExperimentBlock = {
  title: string;
  /** The shared aim across every part. */
  aim: string;
  instruction?: string;
  aimLabel: string;
  hypothesisLabel: string;
  manipulatedLabel: string;
  respondingLabel: string;
  controlledLabel: string;
  materialsLabel: string;
  apparatusLabel: string;
  methodLabel: string;
  observationLabel: string;
  conclusionLabel: string;
  parts: MiniExperimentPart[];
};

/** A yes / no / partial answer for one criterion in a ComparisonMatrixBlock. */
export type ComparisonMatrixValue = "yes" | "no" | "partial";

export type ComparisonMatrixRow = {
  id: string;
  label: string;
  icon?: string;
  /** One value per column, in the same order as `columns`. */
  values: ComparisonMatrixValue[];
  note: string;
};

/**
 * Generic "which method does what" table. Rows are the options being compared,
 * columns are the criteria. Reusable wherever a chapter needs a capability grid.
 */
export type ComparisonMatrixBlock = {
  title: string;
  instruction?: string;
  /** Column headings, e.g. "Membuang pepejal tak larut?". */
  columns: string[];
  rows: ComparisonMatrixRow[];
  yesLabel: string;
  noLabel: string;
  partialLabel: string;
  hint: string;
};

/**
 * A method or option explained through the same three facets every time, so
 * learners can compare across options rather than reading three unlike stories.
 */
export type MethodCard = {
  id: string;
  name: string;
  icon?: string;
  /** WHAT IS IT? */
  what: string;
  /** HOW DOES IT WORK? */
  how: string;
  /** WHEN / WHY IS IT USEFUL? */
  when: string;
};

export type MethodCardsBlock = {
  title: string;
  instruction?: string;
  whatLabel: string;
  howLabel: string;
  whenLabel: string;
  cards: MethodCard[];
};

/**
 * Two concepts that learners routinely fuse into one, shown side by side with
 * the distinguishing question stated first.
 */
export type ConceptContrastSide = {
  id: string;
  /** The concept name, e.g. "Keterlarutan". */
  term: string;
  /** The one-line question it answers, e.g. "BERAPA BANYAK boleh larut?". */
  question: string;
  definition: string;
  /** Two or three concrete illustrations. */
  examples: string[];
  icon?: string;
};

export type ConceptContrastBlock = {
  title: string;
  instruction?: string;
  left: ConceptContrastSide;
  right: ConceptContrastSide;
  /** The takeaway shown under both columns. */
  keyPoint: string;
};

/** A clickable label on the capillary-action diagram. */
export type CapillaryLabel = {
  id: "cohesion" | "adhesion" | "capillary";
  label: string;
  note: string;
};

export type CapillaryDiagramBlock = {
  title: string;
  instruction?: string;
  labels: CapillaryLabel[];
  /** Caption under the tube, e.g. "Air bergerak dari akar ke daun". */
  caption: string;
  hint: string;
};

/** A clickable part of the electrolysis diagram. */
export type ElectrolysisLabel = {
  id: "anode" | "cathode" | "oxygen" | "hydrogen";
  label: string;
  note: string;
};

export type ElectrolysisDiagramBlock = {
  title: string;
  instruction?: string;
  labels: ElectrolysisLabel[];
  /** The volume-ratio caption, e.g. "Isi padu hidrogen : oksigen = 2 : 1". */
  ratioCaption: string;
  hint: string;
};

/** One mixture type in the solution / suspension / colloid visual. */
export type MixtureKind = {
  id: "solution" | "suspension" | "colloid";
  name: string;
  /**
   * Does a light beam pass through? Drives the beam drawing.
   *
   * "between" is for the colloid: the source places it between a solution and a
   * suspension but does not state a light-path behaviour for it, so the beam is
   * drawn as intermediate and no specific claim is made in the copy.
   */
  lightPasses: "yes" | "no" | "between";
  appearance: string;
  filtration: string;
  example: string;
  note: string;
};

export type MixtureComparisonBlock = {
  title: string;
  instruction?: string;
  appearanceLabel: string;
  lightLabel: string;
  filtrationLabel: string;
  exampleLabel: string;
  kinds: MixtureKind[];
  hint: string;
};

/** One stage of the water-supply system. */
export type TreatmentStage = {
  id: string;
  name: string;
  icon?: string;
  /** What the stage does — shown when the stage is selected. */
  fn: string;
  /** Optional chemical added at this stage. */
  chemical?: string;
};

export type WaterTreatmentFlowBlock = {
  title: string;
  instruction?: string;
  stages: TreatmentStage[];
  chemicalLabel: string;
  hint: string;
};

/**
 * One row of an indicator colour table.
 *
 * `acid` / `neutral` / `alkali` are the colour NAMES a learner reads; the
 * matching `*Swatch` values are CSS colours used only to tint the cell, so the
 * table can be read either by word or at a glance. A swatch is never the sole
 * carrier of meaning — the word always appears.
 */
export type IndicatorRow = {
  id: string;
  name: string;
  acid: string;
  neutral: string;
  alkali: string;
  acidSwatch: string;
  neutralSwatch: string;
  alkaliSwatch: string;
  /** Shown when the row is selected. */
  note: string;
};

export type IndicatorTableBlock = {
  title: string;
  instruction?: string;
  indicatorLabel: string;
  acidLabel: string;
  neutralLabel: string;
  alkaliLabel: string;
  rows: IndicatorRow[];
  hint: string;
};

/** One of the four dry / aqueous panels. */
export type DryAqueousPanel = {
  id: string;
  /** e.g. "Asid etanoik glasial" */
  substance: string;
  /** Whether water is present — drives the water drop and the litmus result. */
  withWater: boolean;
  /** "blue" or "red" litmus paper being tested. */
  litmus: "blue" | "red";
  /** Colour the paper ends up: same as `litmus` when unchanged. */
  result: "blue" | "red";
  resultText: string;
  note: string;
};

export type DryVsAqueousBlock = {
  title: string;
  instruction?: string;
  withoutWaterLabel: string;
  withWaterLabel: string;
  acidColumnLabel: string;
  alkaliColumnLabel: string;
  /** The single sentence the whole schematic exists to make land. */
  keyMessage: string;
  panels: DryAqueousPanel[];
  hint: string;
};

/** A clickable part of the titration schematic. */
export type TitrationLabel = {
  id: "burette" | "acid" | "flask" | "indicator" | "endpoint";
  label: string;
  note: string;
};

export type TitrationSchematicBlock = {
  title: string;
  instruction?: string;
  labels: TitrationLabel[];
  /** Colour-change caption, e.g. "Merah jambu → tidak berwarna". */
  endpointCaption: string;
  hint: string;
};

/** One substance in a strong-vs-weak comparison. */
export type StrengthEntry = {
  id: string;
  name: string;
  /** Approximate pH at the stated concentration. */
  ph: string;
  strength: "strong" | "weak";
  kind: "acid" | "alkali";
  note: string;
};

/**
 * Strong vs weak acids and alkalis compared at equal concentration.
 *
 * The equal-concentration condition is a required field rather than prose,
 * because it is the whole reason the comparison means anything: without it,
 * a pH difference could just as easily be a concentration difference.
 */
export type StrengthComparisonBlock = {
  title: string;
  instruction?: string;
  /** Stated prominently above the pairs. */
  conditionLabel: string;
  condition: string;
  strongLabel: string;
  weakLabel: string;
  acidGroupLabel: string;
  alkaliGroupLabel: string;
  entries: StrengthEntry[];
  keyPoint: string;
  hint: string;
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
  ecologicalTerms?: EcologicalTermsBlock;
  enzymeExplorer?: EnzymeExplorerBlock;
  immuneResponseGraph?: ImmuneResponseGraphBlock;
  defenceLines?: DefenceLinesBlock;
  immunityMatrix?: ImmunityMatrixBlock;
  miniExperiment?: MiniExperimentBlock;
  comparisonMatrix?: ComparisonMatrixBlock;
  methodCards?: MethodCardsBlock;
  conceptContrast?: ConceptContrastBlock;
  capillaryDiagram?: CapillaryDiagramBlock;
  electrolysisDiagram?: ElectrolysisDiagramBlock;
  mixtureComparison?: MixtureComparisonBlock;
  waterTreatmentFlow?: WaterTreatmentFlowBlock;
  indicatorTable?: IndicatorTableBlock;
  dryVsAqueous?: DryVsAqueousBlock;
  titrationSchematic?: TitrationSchematicBlock;
  strengthComparison?: StrengthComparisonBlock;
  /** Standalone annotated reference illustrations for this section. */
  images?: AnnotatedImageBlock[];
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
