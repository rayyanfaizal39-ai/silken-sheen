export type Form = "Form 1" | "Form 2" | "Form 3";

export interface Subject {
  id: string;
  name: string;
  emoji: string;
  color: string; // tailwind gradient classes
  description: string;
  tagline: string;
}

export interface Note {
  id: string;
  subjectId: string;
  form: Form;
  chapter: string;
  title: string;
  summary: string;
  keywords: string[];
  lang?: "bm" | "dlp";
}

export interface ScienceNotesSubsection {
  title?: string;
  content?: string;
  bulletPoints?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  formula?: string;
}

export interface ScienceNotesSection {
  title: string;
  subsections?: ScienceNotesSubsection[];
  content?: string;
}

export interface StructuredNotes {
  quickRevision: string[];
  sections: ScienceNotesSection[];
  keyExamFacts: string[];
  keyTerms?: string[];
  chapterSummary?: string;
}

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface QuizQuestion {
  id: string;
  subjectId: string;
  form: Form;
  difficulty: Difficulty;
  chapter?: string;
  lang?: "bm" | "dlp";
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
}

export interface Flashcard {
  id: string;
  subjectId: string;
  form: Form;
  chapter?: string;
  lang?: "bm" | "dlp";
  front: string;
  back: string;
}

export interface SejarahChapter {
  num: number;
  title: string;
  available: boolean;
  isNew?: boolean;
  videoUrl?: string;
  mindMapId?: string;
}

export interface ChapterItem {
  key: string;
  label: string;
  available: boolean;
  isNew?: boolean;
  videoUrl?: string;
  mindMapId?: string;
  structuredNotes?: {
    bm?: StructuredNotes;
    dlp?: StructuredNotes;
  };
}
