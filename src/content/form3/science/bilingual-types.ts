/**
 * Bilingual mirror of interactive-types.ts. Chapters 7-10 are authored once,
 * in one file per chapter, with every string as { dlp, bm } instead of two
 * hand-duplicated files — projectF3Interactive() (project-bilingual.ts)
 * turns one of these into a plain ScienceF3InteractiveContent per language,
 * so registration.ts / ScienceF3InteractiveNotesBlock never need to know
 * this type exists.
 */

export type Bilingual = { dlp: string; bm: string };

export type ScienceF3BilingualCard = {
  title: Bilingual;
  body: Bilingual;
  detail?: Bilingual;
};

export type ScienceF3BilingualFlipCardItem = {
  id: string;
  icon: string;
  label: Bilingual;
  fact: Bilingual;
};

export type ScienceF3BilingualFlipCardGroup = {
  title: Bilingual;
  instruction: Bilingual;
  items: ScienceF3BilingualFlipCardItem[];
};

export type ScienceF3BilingualMatcherPair = {
  id: string;
  label: Bilingual;
  match: Bilingual;
};

export type ScienceF3BilingualToggleOption = {
  id: string;
  label: Bilingual;
  body: Bilingual;
};

export type ScienceF3BilingualToggleBlock = {
  title: Bilingual;
  instruction: Bilingual;
  options: ScienceF3BilingualToggleOption[];
};

export type ScienceF3BilingualSequenceStep = {
  title: Bilingual;
  body: Bilingual;
  detail?: Bilingual;
};

export type ScienceF3BilingualSequenceBlock = {
  title: Bilingual;
  instruction: Bilingual;
  steps: ScienceF3BilingualSequenceStep[];
};

export type ScienceF3BilingualCalculatorBlock =
  | { type: "transformer"; title: Bilingual; instruction: Bilingual; defaultVp?: number; defaultNp?: number; defaultNs?: number }
  | { type: "energy-efficiency"; title: Bilingual; instruction: Bilingual; defaultUsefulOutput?: number; defaultInputSupplied?: number }
  | { type: "electricity-cost"; title: Bilingual; instruction: Bilingual; defaultPowerKw?: number; defaultTimeH?: number; defaultRateSen?: number }
  | { type: "work-power"; title: Bilingual; instruction: Bilingual; defaultForce?: number; defaultDisplacement?: number; defaultTime?: number }
  | {
      type: "energy-type";
      title: Bilingual;
      instruction: Bilingual;
      defaultGpeMass?: number;
      defaultGpeHeight?: number;
      defaultEpeForce?: number;
      defaultEpeExtension?: number;
      defaultKeMass?: number;
      defaultKeVelocity?: number;
    }
  | { type: "half-life"; title: Bilingual; instruction: Bilingual; defaultOriginalMass?: number; defaultHalfLife?: number; defaultElapsedTime?: number };

export type ScienceF3BilingualZone = {
  name: Bilingual;
  description?: Bilingual;
  facts?: { label: Bilingual; value: Bilingual }[];
  examples?: Bilingual[];
  activities?: Bilingual[];
};

export type ScienceF3BilingualZoneExplorer = {
  title: Bilingual;
  instruction: Bilingual;
  examplesLabel?: Bilingual;
  activitiesLabel?: Bilingual;
  zones: ScienceF3BilingualZone[];
};

export type ScienceF3BilingualSection = {
  number: string;
  title: Bilingual;
  intro?: Bilingual;
  cards?: ScienceF3BilingualCard[];
  flipCards?: ScienceF3BilingualFlipCardItem[];
  flipCardGroups?: ScienceF3BilingualFlipCardGroup[];
  accordions?: ScienceF3BilingualCard[];
  toggles?: ScienceF3BilingualToggleBlock[];
  matcher?: { title: Bilingual; instruction: Bilingual; pairs: ScienceF3BilingualMatcherPair[] };
  sequence?: ScienceF3BilingualSequenceBlock;
  calculators?: ScienceF3BilingualCalculatorBlock[];
  zoneExplorer?: ScienceF3BilingualZoneExplorer;
  comparison?: { title: Bilingual; columns: ScienceF3BilingualCard[] };
  checks: { question: Bilingual; hint: Bilingual }[];
};

export type ScienceF3BilingualMiniQuizItem =
  | { type: "true-false"; question: Bilingual; answer: boolean; explanation: Bilingual }
  | { type: "multiple-choice"; question: Bilingual; options: Bilingual[]; answerIndex: number; explanation: Bilingual };

export type ScienceF3BilingualContent = {
  chapter: 7 | 8 | 9 | 10;
  blogHighlight: { title: Bilingual; body: Bilingual };
  keywords: Bilingual[];
  sections: ScienceF3BilingualSection[];
  reflectionItems: Bilingual[];
  miniQuiz: ScienceF3BilingualMiniQuizItem[];
};
