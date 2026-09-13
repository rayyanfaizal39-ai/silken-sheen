import type { AnnotationMode } from "@/components/notes/blocks/annotation-layout";
import type { LearningImageSize } from "@/components/notes/blocks/learning-image";
import type { ImageAnnotation, OverlayHeading } from "@/components/notes/blocks/AnnotatedImage";
import type {
  SpotlightShape,
  SpotlightPulseGroup,
} from "@/components/notes/blocks/spotlight-shapes";
import type { FlipCardItem, MiniQuizItem } from "./chapter-1/interactive-types";

/**
 * One labelled fact under a card/panel's main body. `value` is either a
 * single line, or an array rendered as a real bullet list — use the array
 * form for genuine point-form content (e.g. a disease's examples, or a
 * defence line's textbook sub-points) rather than folding several items into
 * one comma-separated sentence.
 */
export type Fact = { label: string; value: string | string[] };

export type ScienceInteractiveCard = {
  title: string;
  body: string;
  detail?: string;
  /**
   * Short labelled facts under `body`, e.g. splitting a food class into what
   * it contains, its examples/sources and its function rather than one dense
   * paragraph. Rendered as a compact list, not prose — keep each `value` to
   * one line, or an array for a genuine bullet list.
   */
  facts?: Fact[];
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
  /**
   * Accessible name for the track. Defaults to "pH scale" so the chemistry
   * chapters that introduced this block keep their wording; any other subject
   * must supply its own, because "pH scale" is nonsense on a star chart.
   */
  ariaLabel?: string;
  /**
   * Labels drawn beneath the track, one per scale point. Defaults to the raw
   * `value` numbers, which only mean something when the value IS the quantity
   * (as with pH). Elsewhere the indices are meaningless and must be replaced.
   */
  tickLabels?: string[];
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

/**
 * One characteristic compared across every planet, from Jadual 12.2.
 *
 * `values` is positional and must line up with `planets`. Keeping one
 * characteristic on screen at a time is what makes a ten-row, eight-column
 * table usable on a phone.
 */
export type PlanetComparisonCharacteristic = {
  id: string;
  label: string;
  /** Shown once in the header instead of repeated on every value. */
  unit?: string;
  values: string[];
  /** The comparison the row is meant to make, in one line. */
  note?: string;
};

/** Rajah 13.2 — the four stages of a meteoroid's journey, named by where it is. */
export type MeteoroidEntryStage = {
  id: string;
  label: string;
  body: string;
};

export type MeteoroidEntryBlock = {
  title: string;
  instruction: string;
  figureLabel: string;
  spaceLabel: string;
  atmosphereLabel: string;
  groundLabel: string;
  stages: MeteoroidEntryStage[];
};

/** Rajah 13.3 — an asteroid orbit that reaches outside the belt. */
export type AsteroidCrossingOrbit = {
  id: string;
  label: string;
  rx: number;
  ry: number;
  offsetX: number;
  rotate: number;
};

/** Gambar foto 13.1 + Rajah 13.3 — the belt, and the orbits that cross Earth's. */
export type AsteroidBeltBlock = {
  title: string;
  instruction: string;
  beltFigureLabel: string;
  crossingFigureLabel: string;
  beltToggleLabel: string;
  crossingToggleLabel: string;
  sunLabel: string;
  venusLabel: string;
  earthLabel: string;
  marsLabel: string;
  jupiterLabel: string;
  beltLabel: string;
  beltBody: string;
  crossingBody: string;
  crossingOrbits: AsteroidCrossingOrbit[];
  scaleNote: string;
};

/** Rajah 13.4 — comet orbit, speed near and far from the Sun, tail direction. */
export type CometOrbitBlock = {
  title: string;
  instruction: string;
  figureLabel: string;
  positionLabel: string;
  sunLabel: string;
  nearSunLabel: string;
  farSunLabel: string;
  nearSpeedLabel: string;
  farSpeedLabel: string;
  nearBody: string;
  farBody: string;
  tailRule: string;
  scaleNote: string;
};

export type PlanetComparisonBlock = {
  title: string;
  instruction: string;
  /** Planet names in order from the Sun; column order for every characteristic. */
  planets: string[];
  /** Name of the reference planet, highlighted so every row reads "vs Earth". */
  earth: string;
  characteristics: PlanetComparisonCharacteristic[];
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

/** One food item within a region that itself needs its own serving guidance
 * (e.g. protein's fish / chicken-meat-eggs / nuts each carry a different
 * textbook serving count) — rendered as a small stacked sub-list instead of
 * one collapsed "1–2 servings" line. */
export type PyramidGroupItem = {
  label: string;
  servings: string;
};

/**
 * One selectable region of the food-pyramid illustration — a real food group
 * with its own serving guidance, a short teaching explanation, and the SVG hit
 * area/highlight shape that places it on the artwork. The illustration itself
 * is a single shared, text-free image (see `PyramidBlock.image`); every label
 * and number a learner reads comes from here, not from pixels baked into the
 * picture, so BM and DLP can share one asset.
 */
export type PyramidRegion = {
  /** Stable id, also used as the React key and the `active` selection value. */
  id: string;
  /** Display label, e.g. "Vegetables" — shown in the detail card and as the accessible name of its hotspot. */
  label: string;
  /** Single serving line. Omit when `items` is set — the per-item servings replace one shared count. */
  servings?: string;
  /** When a region's guidance splits by food (protein's fish vs. meat vs. nuts), list each with its own count instead of one shared `servings` line. */
  items?: PyramidGroupItem[];
  /** Short heading for the detail card — what this group IS or does (e.g. "Main energy source"), distinct from the label already shown. */
  detailTitle: string;
  /** One or two sentences on why this group matters — teaches something the pyramid face doesn't already show, not a repeat of its serving counts. */
  note: string;
  /**
   * The hotspot's shape, as an SVG `points` string in 0–100 percentages of the
   * artwork's width/height (matching the image's own aspect ratio) — both the
   * clickable hit area and the highlighted/dimmed silhouette when selected.
   */
  polygon: string;
};

/** The shared, text-free pyramid illustration. One asset serves both BM and DLP. */
export type PyramidImageBlock = {
  /** Bundled asset URL (a `src/assets` import). */
  src: string;
  alt: string;
  /** Intrinsic aspect ratio, e.g. "3 / 2" — must match the artwork exactly so percentage hotspots stay aligned at every size. */
  aspect: string;
  /** Rendered footprint. Omit to derive one from the aspect ratio. */
  size?: LearningImageSize;
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
  /** Load eagerly — for a figure that leads its section, so is above the fold. */
  priority?: boolean;
  /**
   * How the parts are named. Prefer `labels` or `callouts` so a student reads
   * the diagram in one pass; `numbers` is a last resort for very dense artwork.
   */
  annotationMode?: AnnotationMode;
  /** `spotlight` mode only — see `AnnotatedImageProps.spotlightDimOpacity`. */
  spotlightDimOpacity?: number;
  /** `spotlight` mode only — see `AnnotatedImageProps.spotlightCaptionEdge`. */
  spotlightCaptionEdge?: "auto" | "top";
  /** See `AnnotatedImageProps.overlayHeadings`. */
  overlayHeadings?: OverlayHeading[];
  /** Key pinned inside the artwork, e.g. what each arrow colour represents. */
  imageKey?: { color: string; label: string }[];
  annotations: ImageAnnotation[];
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
  /** `spotlight` mode only — see `AnnotatedImageProps.spotlightDimOpacity`. */
  spotlightDimOpacity?: number;
  /** See `AnnotatedImageProps.overlayHeadings`. */
  overlayHeadings?: OverlayHeading[];
  /** Key pinned inside the artwork, e.g. what each arrow colour represents. */
  imageKey?: { color: string; label: string }[];
  /**
   * Maps an existing item id in the block to a position on the artwork.
   * `w` / `h` size the hit area in `regions` mode; omit them elsewhere.
   * The `spotlight*` fields are read only in `annotationMode: "spotlight"` —
   * see `ImageAnnotation` for what each does.
   */
  points: {
    id: string;
    x: number;
    y: number;
    w?: number;
    h?: number;
    spotlightShapes?: SpotlightShape[];
    spotlightCaption?: string;
    spotlightTint?: string;
    spotlightGroupHalo?: boolean;
    spotlightPulseGroups?: SpotlightPulseGroup[];
  }[];
  /** Extra markers for parts of the artwork the block data does not already name. */
  extra?: {
    id: string;
    label: string;
    note?: string;
    x: number;
    y: number;
    w?: number;
    h?: number;
    /** Place this extra straight after the concept with this id. */
    insertAfter?: string;
    spotlightShapes?: SpotlightShape[];
    spotlightCaption?: string;
    spotlightTint?: string;
    spotlightGroupHalo?: boolean;
    spotlightPulseGroups?: SpotlightPulseGroup[];
  }[];
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

/** One substrate -> product arrow in a reaction pathway, e.g. "Starch -> Maltose" via amylase. */
export type ReactionStep = {
  substrate: string;
  enzyme: string;
  /** Where this enzyme is secreted/acts, kept to a short phrase, e.g. "Salivary glands + pancreas". */
  organs: string;
};

/** One food class's full digestion pathway, read top to bottom in one glance. */
export type ReactionColumn = {
  id: string;
  title: string;
  icon?: string;
  steps: ReactionStep[];
  /** The final absorbed product, e.g. "Glucose" or "Amino acid". */
  finalProduct: string;
};

/**
 * The three digestion pathways (carbohydrate/protein/fat) as parallel static
 * columns — substrate, enzyme, product, with the secreting organ named under
 * each arrow. Deliberately NOT tabbed: the whole point is that a learner sees
 * all three pathways, and how they differ in length, in one glance (textbook
 * page 64's own layout), rather than clicking between them and losing the
 * comparison.
 */
export type ReactionFlowBlock = {
  title: string;
  instruction?: string;
  columns: ReactionColumn[];
};

/** One body system's contribution in the assimilation flow, e.g. "Digestive system". */
export type SystemFlowStage = {
  icon?: string;
  label: string;
  role: string;
};

/** One outcome of assimilation once nutrients reach body cells, e.g. glucose -> energy. */
export type SystemFlowOutcome = {
  label: string;
  result: string;
};

/**
 * The three-system-cooperation diagram: three systems feed into one
 * convergence point (body cells), which then fans out into the outcomes each
 * absorbed nutrient is used for. A single visual funnel-in/fan-out shape,
 * rather than an unrelated row of cards, is what actually shows that the
 * systems *cooperate* rather than just each doing their own separate thing.
 */
export type SystemFlowBlock = {
  title: string;
  instruction?: string;
  systems: SystemFlowStage[];
  convergeLabel: string;
  convergeNote?: string;
  outcomes: SystemFlowOutcome[];
};

/** One line item in a worked calorific-value calculation. */
export type CalorieLineItem = {
  id: string;
  food: string;
  quantity: string;
  /** When a per-unit value is given (e.g. "60 kcal each x 2"), shown as the multiplication itself. */
  perUnitKcal?: number;
  multiplier?: number;
  kcal: number;
};

/**
 * A worked "food + quantity -> kcal, then total" calculation, rendered as a
 * real running sum rather than a sentence — SP 3.2.2 explicitly requires
 * learners to be able to estimate a meal's calorific value, which a prose
 * paragraph does not visibly demonstrate how to do.
 */
export type CalorieWorkedExampleBlock = {
  title: string;
  instruction?: string;
  items: CalorieLineItem[];
  totalLabel: string;
  note?: string;
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
  /**
   * The one-sentence key idea shown immediately when this line is selected,
   * e.g. "Stops pathogens entering the body." Read first, before `facts`, so a
   * learner gets the point before the mechanism.
   */
  note: string;
  /**
   * The deeper, textbook-faithful breakdown shown below `note` — e.g. the
   * structures involved and how each one acts. Point form, never a second
   * paragraph folded into `note`.
   */
  facts?: Fact[];
  group: "non-specific" | "specific";
};

export type DefenceLinesBlock = {
  title: string;
  instruction?: string;
  /**
   * Approved instructional artwork for the three lines. When present it
   * REPLACES the drawn card row — the two are never stacked — and each line
   * becomes a concept button carrying its own note and its specific /
   * non-specific grouping.
   */
  image?: DiagramImage;
  pathogenLabel: string;
  nonSpecificLabel: string;
  specificLabel: string;
  lines: DefenceLine[];
  hint: string;
};

/** Figure fields for a `ConceptSelectorBlock` — everything `InteractiveFigureCard` needs except the concepts themselves. */
export type ConceptFigureImage = {
  src: string;
  alt: string;
  size?: LearningImageSize;
  aspect?: string;
  caption?: string;
  legendLabel?: string;
  annotationMode?: AnnotationMode;
  imageKey?: { color: string; label: string }[];
};

/**
 * A row of selectable concepts with one shared explanation panel — optionally
 * led by an image whose regions match the same concepts.
 *
 * `image` is deliberately optional: a language with no approved artwork for
 * this figure still gets the identical tap-a-concept-see-an-explanation
 * interaction, just without a picture above the buttons. This is the "image
 * first when we have one, buttons and panel always" shape several chapters
 * need (e.g. the four disease-transmission routes), without forcing every
 * language onto the same image.
 */
export type ConceptSelectorBlock = {
  title?: string;
  instruction?: string;
  prompt?: string;
  image?: ConceptFigureImage;
  concepts: ImageAnnotation[];
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
  /**
   * Short caption under this cell's mini antibody-response chart, e.g. "Level
   * rises further after a second infection." The chart shape itself is
   * derived from `row` (active = two-stage rise, passive = decline) rather
   * than authored per cell, so BM and DLP always draw the same curve.
   */
  graphNote: string;
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
/**
 * One node of a shallow classification tree.
 *
 * `children` exists so a chapter can state that a branch has sub-types WITHOUT
 * flattening them into siblings of the other branches — the mistake this block
 * was added to stop: mutualism, commensalism and parasitism are kinds of
 * symbiosis, while prey-predator and competition are not, and a flat row of
 * five cards silently teaches that all five sit at the same level.
 */
export type ConceptTreeNode = {
  id: string;
  label: string;
  /** One short line saying what this node is. */
  note?: string;
  icon?: string;
  children?: ConceptTreeNode[];
};

/** A classification a learner must be able to see, not just read in prose. */
export type ConceptTreeBlock = {
  title: string;
  instruction?: string;
  root: ConceptTreeNode;
};

/** One cause and everything it leads to — a row of an impact table. */
export type ImpactRow = {
  id: string;
  icon?: string;
  /** The activity or event, e.g. "Deforestation". */
  cause: string;
  /** Its consequences, one fact per entry. Never a single run-on sentence. */
  effects: string[];
};

/**
 * A "this activity → these effects" table. A real table from `sm` up, where the
 * shared column heading is what makes the rows comparable, and stacked cards on
 * a phone, where a two-column table would either overflow or shrink past
 * reading size.
 */
export type ImpactTableBlock = {
  title: string;
  instruction?: string;
  /** Heading over the activity column. */
  causeLabel: string;
  /** Heading over the effects column. */
  effectLabel: string;
  rows: ImpactRow[];
};

/** One row of a vitamin or mineral reference table (KSSM Table 3.1 / 3.2). */
export type NutrientRow = {
  id: string;
  /** e.g. "Vitamin A" / "Calcium". */
  name: string;
  icon?: string;
  source: string;
  importance: string;
  deficiency: string;
};

/**
 * A real reference table (a `<table>` from `sm` up, one card per row on a
 * phone) for a fixed set of named nutrients — the textbook's own Table 3.1
 * (vitamins) and Table 3.2 (minerals) shape. Generic so any chapter with a
 * "name / source / importance / deficiency" nutrient table can reuse it.
 */
export type NutrientTableBlock = {
  title: string;
  instruction?: string;
  nameLabel: string;
  sourceLabel: string;
  importanceLabel: string;
  deficiencyLabel: string;
  rows: NutrientRow[];
};

/** One row of the disease / symptoms / pathogen / vector / way-of-infection reference table (KSSM Table 4.2). */
export type DiseaseReferenceRow = {
  id: string;
  icon?: string;
  disease: string;
  /** Rendered as a bullet list — a disease's symptoms are never one comma-run sentence. */
  symptoms: string[];
  pathogen: string;
  vector: string;
  wayOfInfection: string;
};

/**
 * The chapter's own disease reference table (KSSM Table 4.2) — disease,
 * symptoms, pathogen, vector and way of infection, read across one row. A
 * real `<table>` from `sm` up; one stacked card per disease on a phone.
 */
export type DiseaseReferenceTableBlock = {
  title: string;
  instruction?: string;
  diseaseLabel: string;
  symptomsLabel: string;
  pathogenLabel: string;
  vectorLabel: string;
  wayOfInfectionLabel: string;
  rows: DiseaseReferenceRow[];
};

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
  /** The shared text-free illustration. */
  image: PyramidImageBlock;
  /** Exactly six selectable regions: grains, vegetables, fruits, protein, dairy, apex. */
  regions: PyramidRegion[];
  /** Which `regions[].id` is selected on first load — the base/grains tier, per the pyramid's own teaching intent (eat the most of the widest tier). */
  defaultRegionId: string;
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
  /** Short one-line summary. Always populated, even when `points` gives the full detail,
   * so nothing depends on `points` for a bare minimum explanation. */
  note?: string;
  /**
   * The textbook's own point-form facts for this organ, e.g. each bullet under
   * "Duodenum". Rendered as a real list rather than folded into one paragraph
   * — a wall of prose is exactly what SP 3.3.1's own textbook page avoids.
   */
  points?: string[];
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
  /**
   * Ordered organ ids (mouth → ... → anus) rendered as a row of stage buttons
   * directly under the diagram. Picking a stage drives the SAME active-organ
   * state as tapping the diagram itself — the same highlight, the same note
   * panel — so "the journey of food" is the diagram's own organ order read
   * out loud, not a second, disconnected stepper.
   */
  journey?: string[];
  journeyTitle?: string;
  journeyInstruction?: string;
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
  /**
   * The manipulated-variable values actually tested, in order, e.g.
   * ["0.5 A", "1.0 A", "1.5 A", "2.0 A", "2.5 A"] — lets the learner step
   * through them and see a qualitative (rank-only, never a fabricated count)
   * response indicator move. Omit for a part with no interactive stepper.
   */
  values?: string[];
  /**
   * How the responding variable is actually observed/measured in this
   * investigation, e.g. "pressure can be related to the depth of indentation
   * produced..." — the textbook's operational-definition question, kept
   * separate from `hypothesis` because it answers a different exam question.
   */
  operationalDefinition?: string;
};

/**
 * The approved apparatus photograph an investigation is carried out on, and the
 * words its generated response layer needs.
 *
 * The picture is not an illustration beside the investigation — it IS the
 * investigation's apparatus, and it responds: selecting a piece of apparatus
 * highlights the real thing, and moving the manipulated variable redraws the
 * coil, the field cue and the pins clinging to the iron core. The apparatus
 * names and roles are NOT repeated here: they are read from the section's own
 * `apparatusDiagram.parts`, so the eight labels exist once per language.
 */
export type ExperimentApparatusImage = {
  /** Public WebP path, from `SCIENCE_F2_CH7_IMAGES`. */
  src: string;
  /** Meaningful alt text, written per language. */
  alt: string;
  /**
   * One qualitative line per tested value, weakest response to strongest, read
   * out as the manipulated variable is stepped. Rank only — the source gives no
   * pin dataset, so these must never state a measured number of pins.
   */
  responseLabels: string[];
  /** Accessible name for the coil-turn readout drawn on the artwork, e.g. "Coil turns". */
  turnsLabel: string;
};

export type MiniExperimentBlock = {
  title: string;
  /** The shared aim across every part. */
  aim: string;
  instruction?: string;
  /**
   * The approved apparatus photograph. When present it becomes the
   * investigation's primary apparatus visual, sitting between the variables and
   * the manipulated-variable control, and the section's separate apparatus
   * schematic is no longer drawn — one concept, one primary visual.
   */
  apparatusImage?: ExperimentApparatusImage;
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
  /** Shown only for a part that supplies `operationalDefinition`. */
  operationalDefinitionLabel?: string;
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

/**
 * One charge pairing in the attraction/repulsion interaction — Chapter 7's
 * electrostatic force rule taught as a picture rather than only the sentence
 * "like charges repel, unlike charges attract".
 */
export type PolarityPair = {
  id: string;
  /** e.g. "+ and −". */
  label: string;
  leftCharge: "+" | "-";
  rightCharge: "+" | "-";
  outcome: "attract" | "repel";
  note: string;
};

export type PolarityInteractionBlock = {
  title: string;
  instruction?: string;
  /** Exactly the three cases: +/−, +/+, −/−. */
  pairs: PolarityPair[];
  attractLabel: string;
  repelLabel: string;
};

/**
 * The approved, text-free photograph a Chapter 7 concept is taught on.
 *
 * The artwork is language-neutral, so BM and DLP name the SAME file here and
 * every word a learner reads — label, caption, alt text, explanation — comes
 * from the block's own stages in the reader's language. The overlay geometry
 * that makes the picture respond is not a field at all: it lives in
 * `ch7-approved-figure-geometry.ts`, keyed by the same stage ids, so the two
 * languages cannot drift into different hotspots.
 */
export type ApprovedFigureImage = {
  /** Public WebP path, from `SCIENCE_F2_CH7_IMAGES`. */
  src: string;
  /** Meaningful alt text, written per language. */
  alt: string;
  /** Rendered footprint. */
  size?: LearningImageSize;
  /** Intrinsic aspect ratio — must match the artwork so percentage geometry stays aligned. */
  aspect: string;
  caption?: string;
  legendLabel?: string;
};

/** One state of the electroscope's gold leaf. */
export type ElectroscopeStage = {
  id: "uncharged" | "charged" | "diverged";
  label: string;
  note: string;
  /** Short phrase floated on the artwork beside the highlighted panel. Falls back to `label`. */
  spotlightCaption?: string;
};

export type ElectroscopeBlock = {
  title: string;
  instruction?: string;
  /**
   * The approved three-panel photograph. When present it is the PRIMARY (and
   * only) visual: the block's own schematic is not drawn, so a learner never
   * meets the same three stages twice in two different drawings. Omit for a
   * language or chapter with no approved artwork and the schematic still
   * teaches all three stages.
   */
  image?: ApprovedFigureImage;
  /** Neutral prompt shown before a stage is picked. Only used with `image`. */
  prompt?: string;
  stages: ElectroscopeStage[];
};

/** One stage in the formation of lightning. */
export type LightningStage = {
  id: "friction" | "separation" | "induced" | "discharge";
  label: string;
  /** One sentence, textbook-faithful: what happens at this stage and why. */
  note: string;
  icon?: string;
  /** Short phrase floated on the artwork beside the highlighted region. Falls back to `label`. */
  spotlightCaption?: string;
};

/**
 * How lightning forms, taught on the approved scene as four ordered stages.
 *
 * Deliberately about FORMATION only. The lightning conductor, refuelling
 * safety, the Faraday cage and dry-weather clothing are separate applications
 * of electrostatic charge and keep their own teaching elsewhere in the section
 * — this block must never be made to stand in for them.
 */
export type LightningFormationBlock = {
  title: string;
  instruction?: string;
  prompt?: string;
  image: ApprovedFigureImage;
  /** The four stages, in the order lightning actually forms. */
  stages: LightningStage[];
  /** Heading over the summary the four stages add up to. */
  summaryLabel: string;
  /** The textbook's own account, one short line per stage. */
  summary: string[];
};

/** One of the two opposite directions drawn on the current-direction figure. */
export type CurrentDirectionMode = {
  id: "electron" | "conventional";
  label: string;
  note: string;
  /** Compact one-line summary shown inside that mode's own row, e.g. "Negative → Positive". */
  directionSummary: string;
};

/**
 * Electron flow vs conventional current, drawn as two separate, always-visible
 * horizontal lanes rather than two arrows sharing one conductor — the layout
 * that made the two directions hard to tell apart. Selecting a mode brightens
 * its own lane and dims (never hides) the other, so the contrast stays on
 * screen regardless of which is selected.
 */
export type CurrentDirectionBlock = {
  title: string;
  instruction?: string;
  modes: CurrentDirectionMode[];
  /** "These two directions are opposite." */
  keyPoint: string;
  /** Terminal word shown under the − symbol, e.g. "Negative terminal" / "Terminal negatif". */
  negativeTerminalLabel: string;
  /** Terminal word shown under the + symbol, e.g. "Positive terminal" / "Terminal positif". */
  positiveTerminalLabel: string;
  /** Heading over the "opposite directions" contrast strip, e.g. "OPPOSITE DIRECTIONS" / "ARAH BERTENTANGAN". */
  contrastLabel: string;
};

/** One row of Table 7.1 — a component's standard circuit symbol and purpose. */
export type CircuitSymbol = {
  id: string;
  name: string;
  purpose: string;
};

export type CircuitSymbolsBlock = {
  title: string;
  instruction?: string;
  symbols: CircuitSymbol[];
};

/** The Ohm's Law triangle — tap V, I or R to see its rearrangement. */
export type OhmsTriangleBlock = {
  title: string;
  instruction?: string;
  vFormula: string;
  iFormula: string;
  rFormula: string;
};

/**
 * A small two-panel comparison: dry conditions let electrostatic charge
 * accumulate, humid air helps it dissipate. Kept separate from the daily-life
 * multi-panel photograph because that image never depicted this concept at
 * all — a small deterministic diagram closes the gap without a new asset.
 */
export type DryHumidComparisonBlock = {
  title: string;
  dryLabel: string;
  humidLabel: string;
  dryCaption: string;
  humidCaption: string;
  /** The one-sentence core concept, shown under both panels. */
  note: string;
};

/**
 * One Given → Find → Formula → Substitute → Answer worked example. Generic so
 * any chapter's numeric problems can use the same compact teaching shape
 * instead of hiding the working inside a check-yourself hint.
 *
 * `steps` + `circuit` are optional: when both are set, the block additionally
 * renders a small deterministic circuit diagram (see `CircuitWorkedDiagram`)
 * and a step selector, so tapping "Step 1/2/3" highlights the part of the
 * circuit that step's formula is about, alongside that step's own
 * formula/substitute/answer. The flat `find`/`formula`/`substitute`/`answer`
 * fields above stay authored regardless — they are what every other chapter's
 * guided calculation still renders, and what already-passing tests assert on.
 */
export type GuidedCalculationStep = {
  /** e.g. "Step 1". */
  label: string;
  formula: string;
  substitute: string;
  answer: string;
  /** Which parts of the linked `circuit` diagram light up while this step is active. */
  highlight: CircuitDiagramPart[];
};

/**
 * A part of a `CircuitWorkedDiagram` a guided-calculation step can highlight.
 * `"r1"`/`"r2"`/`"r3"` etc. address a resistor (and, on the parallel diagram,
 * its whole branch) by its `CircuitResistorSpec.id`; `"source"`/`"loop"`
 * address the cell and the main wire.
 */
export type CircuitDiagramPart = "source" | "loop" | `r${number}`;

/** One resistor drawn on a `CircuitWorkedDiagram` — its id is also its highlight key. */
export type CircuitResistorSpec = {
  /** e.g. "r1" — matches the `CircuitDiagramPart` a step highlights it with. */
  id: `r${number}`;
  /** e.g. "R₁ = 2 Ω". */
  label: string;
};

/**
 * The small series/parallel circuit a stepped guided calculation (or a
 * self-practice figure) is illustrated on. Two resistors draws the Ohm's-Law
 * worked-example shape; three draws the Formative-Practice Figure 1 shape —
 * the diagram itself does not care how many, as long as every id is unique.
 */
export type CircuitWorkedExampleSpec = {
  kind: "series" | "parallel";
  supplyLabel: string;
  resistors: CircuitResistorSpec[];
  /** Accessible name for the step selector, e.g. "Step" / "Langkah". */
  stepLabel: string;
  /**
   * Draw an ammeter in the main loop/trunk and a voltmeter branch across every
   * resistor — the Figure 7.12/7.13 "how is it actually wired" shape. Defaults
   * to false, for a plainer source-and-resistors figure (e.g. a self-practice
   * question that only asks for effective resistance, current and voltage,
   * not meter placement).
   */
  showMeters?: boolean;
  /**
   * Rendered footprint. "large" is for a diagram that IS the section's own
   * visual focus (a standalone concept teaching block, or a worked example) —
   * bigger, higher-contrast, thicker strokes. Defaults to the original
   * compact footprint used inside a guided calculation.
   */
  size?: "compact" | "large";
};

export type GuidedCalculationBlock = {
  title: string;
  givenLabel: string;
  findLabel: string;
  formulaLabel: string;
  substituteLabel: string;
  answerLabel: string;
  given: string[];
  find: string;
  formula: string;
  substitute: string;
  answer: string;
  /** When set alongside `circuit`, a step selector replaces the flat formula/substitute/answer rows. */
  steps?: GuidedCalculationStep[];
  circuit?: CircuitWorkedExampleSpec;
};

/**
 * One row of the "Remember the Units" memory card — a physical quantity's
 * own symbol, its unit's name, and the unit's own symbol, kept as three
 * separate fields so a chapter can never collapse "R = Ω" (the quantity is
 * not its unit; see `UnitsMemoryBlock`'s own doc).
 */
export type UnitsMemoryItem = {
  /** The quantity's symbol, e.g. "I". */
  quantitySymbol: string;
  /** The unit's name, e.g. "ampere". */
  unitName: string;
  /** The unit's own symbol, e.g. "A". */
  unitSymbol: string;
};

/**
 * A compact memory aid pinning down current/voltage/resistance against their
 * units — added because "R = Ω" is a common but wrong shorthand a learner
 * picks up from compressed notes: R is the quantity (resistance), Ω is only
 * the unit it is measured in. Each item keeps the three facts separate so the
 * card can never be misread as equating a quantity with its unit.
 */
export type UnitsMemoryBlock = {
  title: string;
  items: UnitsMemoryItem[];
};

/**
 * One self-practice figure — a circuit a learner must work out themselves,
 * with progressive hints before the worked solution is revealed.
 *
 * The circuit (`circuit`) is drawn immediately and unconditionally: a learner
 * needs to see the apparatus to answer the question at all. What stays
 * hidden until requested is the WORKING — the hints, then the full
 * Given/steps/answer breakdown in `solution`, reusing the exact same stepped
 * shape (and the same `circuit`) a worked example uses, so revealing the
 * solution highlights the same figure rather than switching to a new one.
 */
export type SelfPracticeFigure = {
  /** e.g. "Figure 1" / "Rajah 1". */
  figureLabel: string;
  /**
   * The QUESTION itself, in full sentences, rendered before the diagram —
   * e.g. "Two resistors, R₁ = 2 Ω and R₂ = 2 Ω, are connected in series to a
   * 6 V supply." Required so a worked example or self-practice figure never
   * opens on "Given" without first stating what is actually being asked.
   */
  questionIntro?: string;
  circuit: CircuitWorkedExampleSpec;
  questionsLabel?: string;
  /** e.g. ["a. the effective resistance", "b. the current in the circuit", ...]. */
  questions: string[];
  /**
   * A worked example's own "identify the circuit first" gate — absent for a
   * self-practice figure, which uses `hints` instead.
   */
  identifyCircuit?: CircuitTypeGate;
  /** Accessible group label for the hint buttons, e.g. "Hint" / "Petunjuk". */
  hintsLabel?: string;
  /** Exactly as many hints as the figure needs — revealed one at a time, in order. Omit for a worked example. */
  hints?: string[];
  showSolutionLabel: string;
  /** The full worked solution, sharing `circuit`'s own geometry via its steps' highlights. */
  solution: GuidedCalculationBlock;
};

export type SelfPracticeBlock = {
  /** e.g. "Try It Yourself" / "Cuba Sendiri". */
  title: string;
  instruction?: string;
  figures: SelfPracticeFigure[];
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
  /**
   * Approved instructional artwork for cohesion / adhesion / capillary action. When present it REPLACES
   * this block's schematic drawing entirely — the two are never stacked —
   * and the block's own labels become the figure's concept buttons.
   */
  image?: DiagramImage;
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
  /**
   * Approved instructional artwork for the electrodes and the two gases. When present it REPLACES
   * this block's schematic drawing entirely — the two are never stacked —
   * and the block's own labels become the figure's concept buttons.
   */
  image?: DiagramImage;
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
  /**
   * Approved instructional artwork for solution / suspension / colloid. When present it REPLACES
   * this block's schematic drawing entirely — the two are never stacked —
   * and the block's own labels become the figure's concept buttons.
   */
  image?: DiagramImage;
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
  /**
   * Approved instructional artwork for the treatment stages. When present it REPLACES
   * this block's schematic drawing entirely — the two are never stacked —
   * and the block's own labels become the figure's concept buttons.
   */
  image?: DiagramImage;
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
  /**
   * Approved instructional artwork for the four dry / aqueous cases. When
   * present it REPLACES the drawn panels — the two are never stacked — and each
   * case becomes a concept button carrying its own note.
   */
  image?: DiagramImage;
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
  /**
   * Approved instructional artwork for the titration apparatus and end point. When present it REPLACES
   * this block's schematic drawing entirely — the two are never stacked —
   * and the block's own labels become the figure's concept buttons.
   */
  image?: DiagramImage;
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

/** A clickable part of the meter-placement circuit schematic. */
export type CircuitMeterLabel = {
  id: "cell" | "switch" | "bulb" | "ammeter" | "voltmeter";
  label: string;
  note: string;
};

/**
 * The one diagram that settles how each meter joins a circuit.
 *
 * Drawn rather than described because the whole teaching point is topological:
 * the ammeter sits *in* the loop, the voltmeter sits *across* a component on
 * its own branch. A sentence can be misremembered; a picture of the branch
 * cannot be, provided the branch is actually drawn as a branch.
 */
export type CircuitMeterDiagramBlock = {
  title: string;
  instruction?: string;
  labels: CircuitMeterLabel[];
  /** e.g. "Ammeter — bersiri · Voltmeter — selari". */
  ruleCaption: string;
  hint: string;
};

/** One side of the series/parallel comparison. */
export type CircuitKind = {
  id: "series" | "parallel";
  name: string;
  /** "Satu laluan" / "One path" etc. */
  pathSummary: string;
  currentRule: string;
  voltageRule: string;
  resistanceRule: string;
  /** Point-form, not one flowing sentence — the textbook itself lists these. */
  advantages: string[];
  disadvantages: string[];
  note: string;
};

export type SeriesParallelBlock = {
  title: string;
  instruction?: string;
  currentLabel: string;
  voltageLabel: string;
  resistanceLabel: string;
  advantageLabel: string;
  disadvantageLabel: string;
  kinds: CircuitKind[];
  hint: string;
  /**
   * Small side-by-side diagrams for the two circuits, so the
   * Current/Voltage/Resistance property selector highlights something real on
   * BOTH pictures at once rather than only changing the caption underneath
   * them. Optional so a plain text-only comparison still renders without it.
   */
  circuits?: { series: CircuitWorkedExampleSpec; parallel: CircuitWorkedExampleSpec };
  /**
   * The bottom explanation, one sentence per selected property — replaces a
   * single static caption that used to read the same regardless of what was
   * selected. Each sentence contrasts series against parallel for exactly
   * that property.
   */
  propertyExplanations?: { current: string; voltage: string; resistance: string };
};

/** One compact "quantity — formula — teaching point" card under a circuit's own diagram. */
export type CircuitRelationshipCard = {
  /** e.g. "Current" / "Arus". */
  label: string;
  formula: string;
  teachingPoint: string;
};

/**
 * A standalone teaching block for ONE circuit type (series or parallel) —
 * large diagram first, then its I/V/R relationships as three compact cards,
 * then the already-correct advantages/disadvantages kept secondary. This is
 * deliberately separate from `SeriesParallelBlock` (the later side-by-side
 * comparison): a learner meets series (or parallel) as its own concept before
 * ever being asked to compare the two.
 */
export type CircuitConceptSection = {
  /** Short, strong visual tag, e.g. "ONE PATH" / "SATU LALUAN". */
  tag: string;
  title: string;
  circuit: CircuitWorkedExampleSpec;
  explanation: string;
  relationships: CircuitRelationshipCard[];
  advantagesLabel: string;
  disadvantagesLabel: string;
  advantages: string[];
  disadvantages: string[];
};

/** One tappable option in the recognition challenge — points at one of the two diagrams. */
export type RecognitionOption = {
  id: "a" | "b";
  label: string;
  /** Whether this diagram (a or b) is actually the series circuit. */
  isSeries: boolean;
};

/**
 * A short "which circuit is it?" checkpoint — two unlabelled diagrams, a
 * question for each, immediate feedback. Deliberately tiny (two short
 * questions, not a graded quiz page): its only job is to make a learner
 * identify series vs parallel BEFORE they ever reach a formula, since picking
 * the right relationship depends entirely on getting this right first.
 */
export type RecognitionChallengeBlock = {
  title: string;
  instruction?: string;
  diagramA: CircuitWorkedExampleSpec;
  diagramB: CircuitWorkedExampleSpec;
  options: RecognitionOption[];
  seriesPrompt: string;
  parallelPrompt: string;
  seriesCorrectFeedback: string;
  parallelCorrectFeedback: string;
  incorrectFeedback: string;
  /** e.g. "Identify the circuit before choosing a formula." */
  reminderNote: string;
};

/** The short divider heading that opens the Numerical Problems part of 7.2. */
export type NumericalProblemsIntroBlock = {
  title: string;
  instruction: string;
  unitsMemory: UnitsMemoryBlock;
};

/** One option in a worked example's "identify the circuit first" gate. */
export type CircuitTypeOption = {
  label: string;
  isCorrect: boolean;
};

/**
 * The optional "what type of circuit is this?" gate a worked example (not a
 * self-practice figure) shows before its solution — answering it, or tapping
 * past it, both lead to the same `startSolutionLabel` control, because the
 * rule is QUESTION → DIAGRAM → THINK → SOLUTION, never solution-first, but a
 * learner must never be trapped by a forced quiz either.
 */
export type CircuitTypeGate = {
  prompt: string;
  options: CircuitTypeOption[];
  correctFeedback: string;
  incorrectFeedback: string;
  startSolutionLabel: string;
};

/** One selectable feature of the magnet-field schematic. */
export type MagnetFieldFeature = {
  id: "direction" | "density" | "no-cross" | "neutral";
  label: string;
  note: string;
  /**
   * The magnet arrangement this feature can only be shown on. A neutral point
   * exists between two LIKE poles and nowhere else, so its explanation must
   * never appear beside a bar or horseshoe magnet: picking such a feature
   * switches the diagram to the arrangement that has it, and switching away
   * from that arrangement clears the feature. Omit for a property every
   * arrangement demonstrates.
   */
  requiresShape?: MagnetShape["id"];
};

/** A magnet whose field pattern the learner can switch to. */
export type MagnetShape = {
  id: "bar" | "horseshoe" | "magnadur" | "like-poles";
  name: string;
  note: string;
};

export type MagnetFieldDiagramBlock = {
  title: string;
  instruction?: string;
  shapeLabel: string;
  featureLabel: string;
  shapes: MagnetShape[];
  features: MagnetFieldFeature[];
  hint: string;
};

/** One conductor shape in the current-carrying field-pattern schematic. */
export type ConductorPattern = {
  id: "straight" | "loop" | "solenoid";
  name: string;
  /** What the pattern looks like. */
  pattern: string;
  /** How the direction is found. */
  direction: string;
  note: string;
  /**
   * The apparatus photograph this conductor is taught on. `src` comes from
   * `visual-assets.ts` so BM and DLP cannot drift onto different files — the
   * artwork carries no text at all, and the words below it are the only thing
   * that differs between the two languages. The teaching arrows, field lines
   * and pole letters are not in the picture: they are drawn over it.
   */
  image: { src: string; alt: string; caption?: string };
  /**
   * Short "what should you notice?" recap points for this conductor —
   * a plain-language summary read after the interaction, not new science.
   */
  notice?: string[];
};

export type CurrentFieldPatternsBlock = {
  title: string;
  instruction?: string;
  patternLabel: string;
  directionLabel: string;
  /** The distinction the source makes: reversing current flips direction, not pattern. */
  keyPoint: string;
  /** Right-hand grip rule, stated current -> field. */
  gripRule: { title: string; steps: string[] };
  conductors: ConductorPattern[];
  hint: string;
  /** Heading over each conductor's `notice` list, e.g. "What should you notice?". */
  noticeLabel?: string;
};

/** A clickable part of the electromagnet experiment apparatus. */
export type ApparatusPart = {
  id: string;
  label: string;
  note: string;
};

export type ApparatusDiagramBlock = {
  title: string;
  instruction?: string;
  parts: ApparatusPart[];
  caption: string;
  hint: string;
};

/** One worked example on the force-arrow figure (SP: force has magnitude, direction, point of application). */
export type ForceExample = {
  id: string;
  label: string;
  /** What the arrow represents, e.g. "10 N". */
  magnitude: string;
  /** Where the force is applied, in learner words. */
  applicationPoint: string;
  note: string;
};

export type ForceDiagramBlock = {
  title: string;
  instruction?: string;
  /** Labels for the three properties an arrow encodes. */
  magnitudeLabel: string;
  directionLabel: string;
  applicationLabel: string;
  examples: ForceExample[];
  caption: string;
  hint: string;
};

/** Spring-balance buoyancy schematic: real weight, apparent weight, and the difference. */
export type BuoyancySchematicBlock = {
  title: string;
  instruction?: string;
  realWeightLabel: string;
  apparentWeightLabel: string;
  buoyantForceLabel: string;
  formula: string;
  /** Sample readings used only to label the drawing; not experiment results. */
  realWeight: string;
  apparentWeight: string;
  buoyantForce: string;
  /** The two equilibrium states, kept separate so floating is never stated as F > W. */
  floatingNote: string;
  sinkingNote: string;
  caption: string;
  hint: string;
  /** One question-first worked example: F = W1 - W2, shown before any self-check asks for it. */
  workedExample?: { title: string; given: string; working: string; answer: string };
};

/** One lever class, with the order of fulcrum / load / effort along the bar. */
export type LeverClass = {
  id: "first" | "second" | "third";
  name: string;
  /** Which of fulcrum | load | effort sits in the middle. */
  middle: "fulcrum" | "load" | "effort";
  examples: string;
  note: string;
};

export type LeverClassesBlock = {
  title: string;
  instruction?: string;
  fulcrumLabel: string;
  loadLabel: string;
  effortLabel: string;
  classes: LeverClass[];
  /** Load x load distance = Effort x effort distance. */
  formula: string;
  workedExample: { title: string; given: string; working: string; answer: string };
  hint: string;
};

export type MomentDiagramBlock = {
  title: string;
  instruction?: string;
  formula: string;
  pivotLabel: string;
  forceLabel: string;
  distanceLabel: string;
  /** Why the distance must be measured perpendicular to the force. */
  perpendicularNote: string;
  situations: { id: string; label: string; note: string }[];
  caption: string;
  hint: string;
  /** Compact clockwise/anticlockwise sense strip, drawn as a small deterministic SVG. */
  senseLabels?: { clockwise: string; anticlockwise: string };
};

export type GasParticlesBlock = {
  title: string;
  instruction?: string;
  /** Particle count is fixed across states -- only volume or temperature changes. */
  particleCount: number;
  states: { id: "normal" | "compressed" | "heated"; label: string; note: string }[];
  caption: string;
  hint: string;
};

export type DepthPressureBlock = {
  title: string;
  instruction?: string;
  /** Depth labels top -> bottom; jet length grows with depth. */
  levels: { id: string; label: string; note: string }[];
  /**
   * Real-world applications of "deeper means higher pressure" — dam, submarine,
   * diver. `image` names approved artwork for the ones that have it; the others
   * are taught by their text alone, and the depth-and-jet figure above stays the
   * primary visual for the concept itself either way.
   */
  applications: {
    id: string;
    label: string;
    note: string;
    image?: { key: string; alt: string };
  }[];
  caption: string;
  hint: string;
  /** Heading over the application controls, e.g. "Where this matters". */
  applicationsLabel?: string;
};

/**
 * One of the three situations the action–reaction triptych paints.
 *
 * `id` (`book` | `floating` | `trolleys`) also selects the force-arrow geometry
 * in `Chapter8ContextFigure`, so the picture is language-neutral: this supplies
 * every word and that supplies every coordinate.
 */
export type ActionReactionSituation = {
  id: string;
  /** Control label, e.g. "Book on table". */
  label: string;
  /** One sentence on why the two forces here are equal and opposite. */
  note: string;
  /**
   * The two forces drawn on the artwork. Each `id` names an arrow in the
   * geometry for this situation, so a label can never end up on the wrong
   * vector. Exactly two per situation — a pair is the whole idea.
   */
  forces: { id: string; label: string }[];
};

/**
 * The three textbook action–reaction situations, taught on one approved image.
 *
 * Deliberately NOT called a third-law block: the remediated section teaches
 * "Action–Reaction Force Pair", and this pass must not reintroduce a Newton's
 * Third Law heading the chapter had already moved away from.
 */
export type ActionReactionPairsBlock = {
  situations: ActionReactionSituation[];
};

export type AltitudePressureBlock = {
  title: string;
  instruction?: string;
  /** Fixed molecule count; only their distribution with height carries meaning. */
  particleCount: number;
  airAboveLabel: string;
  levels: { id: "summit" | "foot"; label: string; note: string }[];
  caption: string;
  hint: string;
};

/** Conduction: energy passed along a fixed lattice, particles never migrate. */
export type ConductionDiagramBlock = {
  title: string;
  instruction?: string;
  /** Particle count is fixed; only vibration amplitude changes along the bar. */
  particleCount: number;
  hotLabel: string;
  coldLabel: string;
  /** The point learners get wrong: energy travels, particles stay put. */
  mechanismNote: string;
  stages: { id: string; label: string; note: string }[];
  caption: string;
  hint: string;
};

/**
 * The photograph a Chapter 9 figure teaches on.
 *
 * Chapter 9's artwork was approved before this visual pass and is not to be
 * regenerated, so these blocks draw their teaching layer over it instead of
 * replacing it. `src` comes from `visual-assets.ts` so BM and DLP cannot drift
 * onto different files; the artwork carries no text, and the words below it are
 * the only thing that differs between the two languages.
 */
export type HeatFigureImage = { src: string; alt: string; caption?: string };
/** Convection loop and radiation-through-vacuum, the two non-solid transfer modes. */
export type ConvectionRadiationBlock = {
  title: string;
  instruction?: string;
  modes: {
    id: "convection" | "radiation";
    label: string;
    note: string;
    /** Density chain for convection; medium statement for radiation. */
    detail: string;
  }[];
  warmLabel: string;
  coolLabel: string;
  caption: string;
  hint: string;
  /** The kitchen scene the two modes are drawn on. */
  image: HeatFigureImage;
};

/** Sea and land breeze. Arrow directions are derived from which side is warmer. */
export type BreezeDiagramBlock = {
  title: string;
  instruction?: string;
  breezes: {
    id: "sea" | "land";
    label: string;
    /** Which surface is the warmer one at this time of day. */
    warmerSide: "land" | "sea";
    timeOfDay: string;
    note: string;
    /** The coastline at this time of day — the surface the airflow is drawn on. */
    image: HeatFigureImage;
  }[];
  landLabel: string;
  seaLabel: string;
  risesLabel: string;
  caption: string;
  hint: string;
};

/** Expansion and contraction across the three states. */
export type ExpansionParticlesBlock = {
  title: string;
  instruction?: string;
  states: { id: "solid" | "liquid" | "gas"; label: string; note: string }[];
  heatedLabel: string;
  cooledLabel: string;
  /** Guards the misconception the standard warns about. */
  misconceptionNote: string;
  caption: string;
  hint: string;
};

/** Bimetallic strip in a fire-alarm circuit. */
export type BimetallicStripBlock = {
  title: string;
  instruction?: string;
  /** The metal that expands more, drawn on the outside of the bend. */
  fasterMetal: string;
  slowerMetal: string;
  states: { id: "room" | "heated"; label: string; note: string }[];
  contactLabel: string;
  alarmLabel: string;
  /** Shown on the figure when the circuit is complete and when it is not. */
  circuitClosedLabel: string;
  circuitOpenLabel: string;
  caption: string;
  hint: string;
  /** The fire-alarm apparatus the two states are drawn on. */
  image: HeatFigureImage;
};

/** Dark/dull versus white/shiny, absorption and emission kept separate. */
export type SurfaceComparisonBlock = {
  title: string;
  instruction?: string;
  modes: { id: "absorb" | "emit"; label: string; note: string }[];
  darkLabel: string;
  shinyLabel: string;
  betterLabel: string;
  poorerLabel: string;
  caption: string;
  hint: string;
  /** The two-can comparison the absorption and emission arrows are drawn on. */
  image: HeatFigureImage;
};

/**
 * Sound through the three states of matter.
 *
 * `speedRank` drives the visual ordering so a state can never be drawn with a
 * particle spacing that contradicts the speed the source assigns it.
 */
export type SoundMediaBlock = {
  title: string;
  instruction?: string;
  states: {
    id: "solid" | "liquid" | "gas";
    label: string;
    /** 1 = fastest. Textbook p.227: solid > liquid > gas. */
    speedRank: 1 | 2 | 3;
    speedLabel: string;
    note: string;
  }[];
  caption: string;
  hint: string;
};

/** Echo: outgoing sound, a hard reflecting surface, and the returning sound. */
export type EchoDiagramBlock = {
  title: string;
  instruction?: string;
  sourceLabel: string;
  surfaceLabel: string;
  outgoingLabel: string;
  reflectedLabel: string;
  places: string[];
  caption: string;
  hint: string;
};

/**
 * Doppler wavefronts around a moving source.
 *
 * Wavefront geometry is computed from the source's motion rather than authored,
 * so the compressed-ahead / spread-behind relationship cannot be drawn backwards.
 */
export type DopplerWavefrontsBlock = {
  title: string;
  instruction?: string;
  /** Which observer's experience is being explained right now. */
  observers: {
    id: "ahead" | "behind";
    label: string;
    /** Whether the observed frequency rises or falls for this observer. */
    effect: "higher" | "lower";
    note: string;
  }[];
  sourceLabel: string;
  emittedNote: string;
  caption: string;
  hint: string;
};

/** Sonar and bat echolocation — both must show an outgoing and a returning pulse. */
export type EcholocationBlock = {
  title: string;
  instruction?: string;
  modes: {
    id: "sonar" | "bat";
    label: string;
    /** The medium the pulse actually travels through. */
    medium: "water" | "air";
    emitterLabel: string;
    targetLabel: string;
    note: string;
  }[];
  outgoingLabel: string;
  returningLabel: string;
  caption: string;
  hint: string;
};

/** Hearing ranges on a logarithmic frequency scale. */
export type HearingRangeBlock = {
  title: string;
  instruction?: string;
  /** Exact source values only — never adjusted for visual spacing. */
  entries: {
    id: string;
    label: string;
    minHz: number;
    maxHz: number;
    /** Marks the human row so it can be used as the reference band. */
    human?: boolean;
  }[];
  ultrasoundLabel: string;
  caption: string;
  hint: string;
};

/**
 * The life cycle of a star, as three diverging pathways.
 *
 * The shape is deliberately a list of branches rather than a list of steps: the
 * source figure (Rajah 11.1) forks at the star's size and never rejoins, so a
 * step list would be the wrong data structure and would invite exactly the
 * single-chain reading this block exists to prevent.
 */
export type StellarLifecycleBlock = {
  title: string;
  instruction?: string;
  /** The common origin every branch grows from. */
  originLabel: string;
  originNote: string;
  branches: {
    id: "medium" | "large" | "superlarge";
    /** The star category that opens this branch, in the source's own wording. */
    label: string;
    /** Stage labels in order, ending at the branch's final outcome. */
    stages: string[];
    note: string;
  }[];
  outcomeLabel: string;
  caption: string;
  hint: string;
};

/**
 * Conceptual nesting from Earth out to the universe.
 *
 * Each tier simply contains the previous one. Radii are fixed presentation
 * values, never derived from real sizes — the source figure is itself labelled
 * "Gambar tidak mengikut skala", and pretending otherwise would teach a false
 * proportion.
 */
export type CosmicScaleBlock = {
  title: string;
  instruction?: string;
  /** Innermost first. */
  tiers: { id: string; label: string; note: string }[];
  notToScaleLabel: string;
  caption: string;
  hint: string;
};

/** Where the Solar System sits inside the Milky Way. */
export type MilkyWayLocatorBlock = {
  title: string;
  instruction?: string;
  galaxyLabel: string;
  solarSystemLabel: string;
  centreLabel: string;
  armLabel: string;
  facts: string[];
  caption: string;
  hint: string;
};

/** Relative sizes of the source's three star-size categories. */
export type StarSizeCompareBlock = {
  title: string;
  instruction?: string;
  /** Largest first; `relative` is a drawing ratio, not a measured value. */
  sizes: { id: string; label: string; relative: number; note: string }[];
  caption: string;
  hint: string;
};

export type ScienceInteractiveSection = {
  number: string;
  title: string;
  /**
   * The Standard Kandungan this section sits under, in the textbook's own
   * words, e.g. "2.1 Energy Flow in an Ecosystem".
   *
   * The shell shows only the section's own title, so a learner deep in
   * "Producers, Consumers and Decomposers" had no way to see which numbered
   * part of the chapter they were in. Repeat it on every section of the same
   * standard; the shared heading is the point.
   */
  standardTitle?: string;
  intro?: string;
  cards?: ScienceInteractiveCard[];
  flipCards?: FlipCardItem[];
  accordions?: ScienceInteractiveCard[];
  tabs?: ScienceInteractiveCard[];
  /**
   * Optional heading + short intro rendered directly above `tabs`, for a
   * subsection that needs a real visible title of its own without becoming a
   * separate top-level section — e.g. "Organic Solvents" leading the tab row
   * of individual solvents, inside a section still titled after the broader
   * topic. Omit to render `tabs` bare, as chapters that already led into
   * their tabs with a `cards` block or plain `intro` continue to do.
   */
  tabsHeading?: { title: string; instruction?: string };
  phSlider?: PhSliderBlock;
  calculators?: CalculatorBlock[];
  buoyancy?: BuoyancyBlock;
  waveVisualizer?: WaveVisualizerBlock;
  galaxyCards?: GalaxyCardsBlock;
  planets?: PlanetSpheresBlock;
  planetComparison?: PlanetComparisonBlock;
  meteoroidEntry?: MeteoroidEntryBlock;
  asteroidBelt?: AsteroidBeltBlock;
  cometOrbit?: CometOrbitBlock;
  foodWeb?: FoodWebBlock;
  causeEffect?: CauseEffectBlock;
  adaptations?: AdaptationBlock;
  pyramid?: PyramidBlock;
  digestiveSystem?: DigestiveSystemBlock;
  viskingExperiment?: ViskingExperimentBlock;
  villusDiagram?: VillusDiagramBlock;
  ecologicalTerms?: EcologicalTermsBlock;
  conceptTree?: ConceptTreeBlock;
  impactTable?: ImpactTableBlock;
  /** One or more named-nutrient reference tables — a section needing both a
   * vitamin and a mineral table (Table 3.1 + 3.2) renders two, in order. */
  nutrientTables?: NutrientTableBlock[];
  diseaseReferenceTable?: DiseaseReferenceTableBlock;
  conceptSelector?: ConceptSelectorBlock;
  enzymeExplorer?: EnzymeExplorerBlock;
  reactionFlow?: ReactionFlowBlock;
  systemFlow?: SystemFlowBlock;
  calorieExample?: CalorieWorkedExampleBlock;
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
  circuitMeterDiagram?: CircuitMeterDiagramBlock;
  seriesParallel?: SeriesParallelBlock;
  circuitConceptSeries?: CircuitConceptSection;
  circuitConceptParallel?: CircuitConceptSection;
  circuitRecognition?: RecognitionChallengeBlock;
  numericalProblemsIntro?: NumericalProblemsIntroBlock;
  /** Guided "question → diagram → identify circuit → solution" worked examples, rendered in order. */
  workedExamples?: SelfPracticeFigure[];
  magnetFieldDiagram?: MagnetFieldDiagramBlock;
  currentFieldPatterns?: CurrentFieldPatternsBlock;
  apparatusDiagram?: ApparatusDiagramBlock;
  polarityInteraction?: PolarityInteractionBlock;
  electroscope?: ElectroscopeBlock;
  lightningFormation?: LightningFormationBlock;
  currentDirection?: CurrentDirectionBlock;
  circuitSymbols?: CircuitSymbolsBlock;
  ohmsTriangle?: OhmsTriangleBlock;
  /** One or more Given → Find → Formula → Substitute → Answer worked examples. */
  guidedCalculations?: GuidedCalculationBlock[];
  unitsMemory?: UnitsMemoryBlock;
  selfPractice?: SelfPracticeBlock;
  dryHumidComparison?: DryHumidComparisonBlock;
  forceDiagram?: ForceDiagramBlock;
  buoyancySchematic?: BuoyancySchematicBlock;
  leverClasses?: LeverClassesBlock;
  momentDiagram?: MomentDiagramBlock;
  gasParticles?: GasParticlesBlock;
  depthPressure?: DepthPressureBlock;
  actionReactionPairs?: ActionReactionPairsBlock;
  pressureApparatus?: ApparatusDiagramBlock;
  altitudePressure?: AltitudePressureBlock;
  conductionDiagram?: ConductionDiagramBlock;
  convectionRadiation?: ConvectionRadiationBlock;
  breezeDiagram?: BreezeDiagramBlock;
  expansionParticles?: ExpansionParticlesBlock;
  bimetallicStrip?: BimetallicStripBlock;
  surfaceComparison?: SurfaceComparisonBlock;
  soundMedia?: SoundMediaBlock;
  echoDiagram?: EchoDiagramBlock;
  dopplerWavefronts?: DopplerWavefrontsBlock;
  echolocation?: EcholocationBlock;
  hearingRange?: HearingRangeBlock;
  stellarLifecycle?: StellarLifecycleBlock;
  cosmicScale?: CosmicScaleBlock;
  milkyWayLocator?: MilkyWayLocatorBlock;
  starSizeCompare?: StarSizeCompareBlock;
  /**
   * Contextual artwork rendered at the TOP of the section, before its teaching
   * cards and before any precise diagram.
   *
   * This is the "recognise it, then understand it" slot: a student meets the
   * everyday scene first and the mechanism second. `images` below is the
   * opposite slot — a reference figure that only makes sense once the section
   * has explained itself — so a section may legitimately use both.
   */
  contextImages?: AnnotatedImageBlock[];
  /**
   * Two matched contextual figures that only teach as a comparison — day
   * versus night, before versus after. Side by side from `sm` up, stacked on a
   * phone. Rendered in the same leading position as `contextImages`.
   */
  contextImagePair?: AnnotatedImageBlock[];
  /**
   * Three or more matched contextual figures that only teach as one set — the
   * three kinds of symbiosis, say. Same footprint and aspect for every member,
   * so no single picture reads as the important one; each keeps its own
   * caption, which is where the language-specific definition lives.
   */
  contextImageSet?: AnnotatedImageBlock[];
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
  /**
   * Compact "🧠 Ingat / Remember" callout for a core textbook definition or
   * rule worth pausing on. Rendered via `ScienceRemember`. May carry its own
   * `**markers**` for the specific term it defines.
   */
  remember?: string;
  /**
   * Compact "💡 Penjelasan Ringkas / Quick Explanation" callout for a short,
   * textbook-backed clarifier. Rendered via `ScienceQuickExplanation`. May
   * carry its own `**markers**`.
   */
  quickExplanation?: string;
  checks: { question: string; hint: string }[];
  /**
   * Visible heading for this section's Check-yourself list, replacing the
   * default "Check yourself — <number>".
   *
   * Several sections legitimately share one Standard Pembelajaran number, so
   * the default heading can appear twice in a chapter and read as a numbering
   * mistake. This overrides the WORDS only — `number` is the curriculum
   * reference and is never renumbered to make a heading unique.
   */
  checksTitle?: string;
};

export type ScienceF2InteractiveContent = {
  chapter: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  blogHighlight: {
    title: string;
    body: string;
    imagePath: string;
    /**
     * What the enrichment picture shows, per language. Falls back to the card
     * title, which describes the story rather than the image — fine while the
     * artwork was generic chapter decoration, not once it depicts something.
     */
    imageAlt?: string;
  };
  keywords: string[];
  sections: ScienceInteractiveSection[];
  reflectionItems: string[];
  miniQuiz: MiniQuizItem[];
};
