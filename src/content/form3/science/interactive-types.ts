import type { FlipCardItem, MiniQuizItem } from "@/content/form2/science/chapter-1/interactive-types";
import type { ScienceInteractiveCard, ScienceInteractiveMatcherPair } from "@/content/form2/science/interactive-types";
import type { ZoneExplorerBlock } from "@/components/notes/blocks/ZoneExplorer";

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

/** A single entry in an ordered, tap-to-reveal ranked list (e.g. a reactivity series). */
export type ScienceF3RankedItem = {
  symbol: string;
  name: string;
  fact: string;
  /** Visually distinguishes an item from the rest of the ranking, e.g. a non-metal reference point. */
  highlight?: boolean;
};

export type ScienceF3LadderBlock = {
  title: string;
  instruction: string;
  items: ScienceF3RankedItem[];
};

export type ScienceF3SequenceBlock = {
  title: string;
  instruction: string;
  steps: { title: string; body: string; detail?: string }[];
};

export type ScienceF3CalculatorBlock =
  | {
      type: "transformer";
      title: string;
      instruction: string;
      defaultVp?: number;
      defaultNp?: number;
      defaultNs?: number;
    }
  | {
      type: "energy-efficiency";
      title: string;
      instruction: string;
      defaultUsefulOutput?: number;
      defaultInputSupplied?: number;
    }
  | {
      type: "electricity-cost";
      title: string;
      instruction: string;
      defaultPowerKw?: number;
      defaultTimeH?: number;
      defaultRateSen?: number;
    }
  | {
      type: "work-power";
      title: string;
      instruction: string;
      defaultForce?: number;
      defaultDisplacement?: number;
      defaultTime?: number;
    }
  | {
      type: "energy-type";
      title: string;
      instruction: string;
      defaultGpeMass?: number;
      defaultGpeHeight?: number;
      defaultEpeForce?: number;
      defaultEpeExtension?: number;
      defaultKeMass?: number;
      defaultKeVelocity?: number;
    }
  | {
      type: "half-life";
      title: string;
      instruction: string;
      defaultOriginalMass?: number;
      defaultHalfLife?: number;
      defaultElapsedTime?: number;
    };

/** A named grid of flip cards with its own lead-in instruction — for sections that need more than one distinct flip-card set (e.g. sun layers, then sun surface phenomena, in the same subtopic). */
export type ScienceF3FlipCardGroup = {
  title: string;
  instruction: string;
  items: FlipCardItem[];
};

export type ScienceF3InteractiveSection = {
  number: string;
  title: string;
  intro?: string;
  cards?: ScienceInteractiveCard[];
  flipCards?: FlipCardItem[];
  flipCardGroups?: ScienceF3FlipCardGroup[];
  accordions?: ScienceInteractiveCard[];
  toggles?: ScienceF3ToggleBlock[];
  matcher?: {
    title: string;
    instruction: string;
    pairs: ScienceInteractiveMatcherPair[];
  };
  bloodChecker?: ScienceF3BloodCheckerBlock;
  ladder?: ScienceF3LadderBlock;
  sequence?: ScienceF3SequenceBlock;
  calculators?: ScienceF3CalculatorBlock[];
  zoneExplorer?: {
    title: string;
    instruction: string;
    block: ZoneExplorerBlock;
  };
  comparison?: {
    title: string;
    columns: ScienceInteractiveCard[];
  };
  checks: { question: string; hint: string }[];
};

export type ScienceF3InteractiveContent = {
  chapter: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  blogHighlight: { title: string; body: string };
  keywords: string[];
  sections: ScienceF3InteractiveSection[];
  reflectionItems: string[];
  miniQuiz: MiniQuizItem[];
};
