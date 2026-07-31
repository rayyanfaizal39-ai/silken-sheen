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
};

export type CalculatorBlock =
  | { type: "ohms-law"; title: string; instruction: string }
  | {
      type: "resistance-comparator";
      title: string;
      instruction: string;
      defaultR1?: number;
      defaultR2?: number;
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
  calculator?: CalculatorBlock;
  matcher?: {
    title: string;
    instruction: string;
    pairs: ScienceInteractiveMatcherPair[];
  };
  sequence?: {
    title: string;
    instruction: string;
    steps: ScienceInteractiveCard[];
  };
  comparison?: {
    title: string;
    columns: ScienceInteractiveCard[];
  };
  checks: { question: string; hint: string }[];
};

export type ScienceF2InteractiveContent = {
  chapter: 2 | 3 | 4 | 5 | 6 | 7;
  blogHighlight: { title: string; body: string; imagePath: string };
  keywords: string[];
  sections: ScienceInteractiveSection[];
  reflectionItems: string[];
  miniQuiz: MiniQuizItem[];
};
