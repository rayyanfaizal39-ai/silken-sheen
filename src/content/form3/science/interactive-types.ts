import type { FlipCardItem, MiniQuizItem } from "@/content/form2/science/chapter-1/interactive-types";
import type { ScienceInteractiveCard, ScienceInteractiveMatcherPair } from "@/content/form2/science/interactive-types";

export type ScienceF3ToggleOption = {
  id: string;
  label: string;
  body: string;
};

export type ScienceF3ToggleBlock = {
  title: string;
  instruction: string;
  options: ScienceF3ToggleOption[];
};

export type ScienceF3BloodCheckerBlock = {
  title: string;
  instruction: string;
};

export type ScienceF3InteractiveSection = {
  number: string;
  title: string;
  intro?: string;
  cards?: ScienceInteractiveCard[];
  flipCards?: FlipCardItem[];
  accordions?: ScienceInteractiveCard[];
  toggle?: ScienceF3ToggleBlock;
  matcher?: {
    title: string;
    instruction: string;
    pairs: ScienceInteractiveMatcherPair[];
  };
  bloodChecker?: ScienceF3BloodCheckerBlock;
  comparison?: {
    title: string;
    columns: ScienceInteractiveCard[];
  };
  checks: { question: string; hint: string }[];
};

export type ScienceF3InteractiveContent = {
  chapter: 1 | 2 | 3;
  blogHighlight: { title: string; body: string };
  keywords: string[];
  sections: ScienceF3InteractiveSection[];
  reflectionItems: string[];
  miniQuiz: MiniQuizItem[];
};
