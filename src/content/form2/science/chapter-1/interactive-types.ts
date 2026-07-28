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

export interface ClassificationBranch {
  id: string;
  label: string;
  detail?: string;
  chips?: string[];
  chipGroups?: { label: string; chips: string[] }[];
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

export interface SciF2C1Content {
  blogHighlight: { title: string; body: string; imagePath: string };
  keywords: { term: string; definition: string }[];
  habitats: FlipCardItem[];
  importance: ImportanceItem[];
  historyFact: string;
  conservationMethods: ConservationMethod[];
  endemicSpecies: string[];
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
