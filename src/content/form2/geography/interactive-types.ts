import type { GridReferenceBlock } from "@/components/notes/blocks/GridReferenceReader";
import type { ZoneExplorerBlock } from "@/components/notes/blocks/ZoneExplorer";

export type GeoInteractiveCard = {
  title: string;
  body: string;
  detail?: string;
};

export type GeoFlipCardItem = {
  id: string;
  icon: string;
  label: string;
  fact: string;
};

export type GeoAccordionItem = {
  title: string;
  body: string;
};

export type GeoTabItem = {
  title: string;
  body: string;
};

/**
 * A single independently-scoped toggle group. Sections can render more than one of
 * these (e.g. a monsoon-wind toggle AND a separate day/night breeze toggle in the same
 * subtopic) — each renders as its own component instance, so state never leaks between
 * groups the way a global DOM-query-based toggle would.
 */
export type GeoTabGroup = {
  title: string;
  instruction?: string;
  tabs: GeoTabItem[];
};

export type GeoCheckItem = {
  question: string;
  hint: string;
};

export type GeoMiniQuizItem =
  | {
      type: "true-false";
      question: string;
      answer: boolean;
      explanation: string;
    }
  | {
      type: "multiple-choice";
      question: string;
      options: string[];
      answerIndex: number;
      explanation: string;
    };

export type GeoCalculatorBlock = {
  type: "two-field";
  title: string;
  instruction: string;
  fieldA: { label: string; unit: string; default?: number };
  fieldB: { label: string; unit: string; default?: number };
  operation: "multiply" | "divide";
  resultLabel: string;
  resultUnit: string;
};

export type GeoInteractiveSection = {
  number: string;
  title: string;
  intro?: string;
  cards?: GeoInteractiveCard[];
  flipCards?: GeoFlipCardItem[];
  zoneExplorer?: ZoneExplorerBlock;
  accordions?: GeoAccordionItem[];
  tabGroups?: GeoTabGroup[];
  calculators?: GeoCalculatorBlock[];
  gridReference?: GridReferenceBlock;
  sequence?: {
    title: string;
    instruction: string;
    steps: { title: string; body: string; detail?: string }[];
  };
  checks: GeoCheckItem[];
};

export type GeoF2InteractiveContent = {
  chapter: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  blogHighlight: {
    title: string;
    body: string;
    imagePath: string;
  };
  keywords: string[];
  sections: GeoInteractiveSection[];
  reflectionItems: string[];
  miniQuiz: GeoMiniQuizItem[];
};
