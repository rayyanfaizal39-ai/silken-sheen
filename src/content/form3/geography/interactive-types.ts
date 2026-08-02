import type {
  GeoInteractiveCard,
  GeoFlipCardItem,
  GeoAccordionItem,
  GeoTabItem,
  GeoTabGroup,
  GeoCheckItem,
  GeoMiniQuizItem,
  GeoCalculatorBlock,
  GeoInteractiveSection,
} from "@/content/form2/geography/interactive-types";
import type { ZoneExplorerBlock } from "@/components/notes/blocks/ZoneExplorer";

export type {
  GeoInteractiveCard,
  GeoFlipCardItem,
  GeoAccordionItem,
  GeoTabItem,
  GeoTabGroup,
  GeoCheckItem,
  GeoMiniQuizItem,
  GeoCalculatorBlock,
  GeoInteractiveSection,
};

/** Two-input calculator that live-computes BOTH percentage and angle from a
 * sector value and a total, using % = value/total × 100 and angle = %/100 × 360.
 * Kept separate from `GeoCalculatorBlock` (single-output two-field calculator)
 * since this one always produces a pair of results. */
export type GeoPieCalculatorBlock = {
  title: string;
  instruction: string;
  valueField: { label: string; default?: number };
  totalField: { label: string; default?: number };
};

/** Same {id,label,match} shape as ScienceInteractiveMatcherPair — kept as a
 * structurally-equivalent local type so geography content doesn't import
 * from the science content domain. */
export type GeoMatcherPair = {
  id: string;
  label: string;
  match: string;
};

export type GeoF3InteractiveSection = GeoInteractiveSection & {
  pieCalculator?: GeoPieCalculatorBlock;
  /** Extra explorers beyond the single `zoneExplorer` inherited above — a
   * subtopic like 3.2 (bentuk muka bumi + saliran + tanih + iklim) needs more
   * than one tab-based comparison in the same section. */
  zoneExplorers?: { heading: string; block: ZoneExplorerBlock }[];
  /** Drag-free click-to-match pairing (e.g. mineral → Logam/Bukan Logam). */
  matcher?: {
    title: string;
    instruction: string;
    pairs: GeoMatcherPair[];
  };
  /** Pill-switch panels for binary comparisons (e.g. boleh baharu vs tidak
   * boleh baharu). Array so a section can host more than one toggle group. */
  toggles?: {
    title: string;
    instruction: string;
    options: { id: string; label: string; body: string }[];
  }[];
  /** Switches between related accordion groups while showing only one group. */
  accordionToggle?: {
    title: string;
    instruction: string;
    groups: {
      id: string;
      label: string;
      items: GeoAccordionItem[];
    }[];
  };
  /** Switches between related flip-card sets while keeping only one visible. */
  flipCardToggle?: {
    title: string;
    instruction: string;
    groups: {
      id: string;
      label: string;
      items: GeoFlipCardItem[];
    }[];
  };
};

export type GeoF3InteractiveContent = {
  chapter: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  blogHighlight: {
    title: string;
    body: string;
  };
  keywords: string[];
  sections: GeoF3InteractiveSection[];
  reflectionItems: string[];
  miniQuiz: GeoMiniQuizItem[];
};
