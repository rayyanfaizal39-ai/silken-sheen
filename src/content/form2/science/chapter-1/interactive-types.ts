import type { AnnotatedImageBlock } from "../interactive-types";

/**
 * Shape for the interactive learning experience layered on top of
 * Science Form 2 Chapter 1 (Biodiversity)'s structured notes. Kept generic
 * enough that later Form 2 Science chapters can reuse the same shape and the
 * same components (FlipCardGrid, ClassificationTree, DichotomousStarMap,
 * SelfReflectionChecklist) with their own data.
 */

export interface FlipCardItem {
  id: string;
  icon: string;
  label: string;
  fact: string;
  /** Object path inside the academy-notes-images bucket, e.g. "form2-science/chapter-1/habitat-sea.jpg". */
  imagePath?: string;
}

export interface ImportanceItem {
  icon: string;
  title: string;
  description: string;
}

export interface ConservationMethod {
  id: "in-situ" | "ex-situ";
  label: string;
  description: string;
}

export interface CheckYourselfItem {
  question: string;
  hint: string;
}

export interface VertebrateGroup {
  name: string;
  traits: string[];
  examples: string[];
}

/**
 * A two-level split inside one classification branch, e.g. the textbook's
 * invertebrate hierarchy: "Tanpa kaki" -> { "Badan tanpa segmen", "Badan bersegmen" }.
 * Use this when the taxonomy genuinely nests; use `chipGroups` for a flat split.
 */
export interface ClassificationSubGroup {
  /** First level, e.g. "Tanpa kaki" / "Without legs". */
  label: string;
  /** Defining characteristics shared by everything under this sub-group. */
  detail?: string;
  /** Second level, e.g. "Badan tanpa segmen" / "Badan bersegmen". */
  groups: { label: string; chips: string[] }[];
}

export interface ClassificationBranch {
  id: string;
  label: string;
  detail?: string;
  chips?: string[];
  chipGroups?: { label: string; chips: string[] }[];
  subGroups?: ClassificationSubGroup[];
  vertebrateGroups?: VertebrateGroup[];
}

export interface CompareColumn {
  icon: string;
  label: string;
  rows: { term: string; value: string }[];
}

export interface DichotomousLeaf {
  type: "leaf";
  organism: string;
}

export interface DichotomousQuestion {
  type: "question";
  question: string;
  choices: [
    { label: string; next: DichotomousNode },
    { label: string; next: DichotomousNode },
  ];
}

export type DichotomousNode = DichotomousLeaf | DichotomousQuestion;

export interface MiniQuizTrueFalse {
  type: "true-false";
  question: string;
  answer: boolean;
  explanation: string;
}

export interface MiniQuizMultipleChoice {
  type: "multiple-choice";
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export type MiniQuizItem = MiniQuizTrueFalse | MiniQuizMultipleChoice;

/** One human activity and the chain of consequences it sets off (DSKP SP 1.1.2 scope). */
export interface HumanImpactItem {
  icon: string;
  activity: string;
  /** Cause -> effect sequence, rendered as an arrow chain. */
  chain: string[];
}

/** Endemic and threatened are different ideas; each is taught on its own terms. */
export interface SpeciesConcept {
  id: "endemic" | "threatened";
  label: string;
  definition: string;
  examples: string[];
}

export interface SciF2C1Content {
  blogHighlight: { title: string; body: string; imagePath: string };
  /** Reference illustrations for the classification sections. Labels live here,
   *  never inside the artwork, so BM and DLP share the same image files. */
  classificationImages?: {
    animalOverview?: AnnotatedImageBlock;
    vertebrateGroups?: AnnotatedImageBlock;
    invertebrateGroups?: AnnotatedImageBlock;
    plantGroups?: AnnotatedImageBlock;
    /** Visual reference shown alongside the interactive dichotomous key. */
    keyOrganismSet?: AnnotatedImageBlock;
  };
  keywords: { term: string; definition: string }[];
  habitats: FlipCardItem[];
  importance: ImportanceItem[];
  historyFact: string;
  conservationMethods: ConservationMethod[];
  humanImpact: HumanImpactItem[];
  speciesConcepts: SpeciesConcept[];
  /** Explicit warning that endemic does not automatically mean threatened. */
  speciesCaution: string;
  checkYourself11: CheckYourselfItem[];
  animalBranches: ClassificationBranch[];
  plantBranches: ClassificationBranch[];
  cotyledonCompare: CompareColumn[];
  dichotomousOrganisms: string[];
  dichotomousKey: DichotomousQuestion;
  checkYourself12: CheckYourselfItem[];
  reflectionItems: string[];
  miniQuiz: MiniQuizItem[];
}
