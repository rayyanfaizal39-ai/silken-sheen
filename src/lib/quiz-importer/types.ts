import type { Difficulty, Form, QuizQuestion } from "@/data/types";

export type QuizLanguage = "bm" | "dlp";
export type QuizSetId = "chapter" | "set-a" | "set-b" | "set-c";

export interface QuizDestination {
  language: QuizLanguage;
  form: Form;
  subjectId: string;
  chapterKey: string;
  quizSet: QuizSetId;
  difficulty: Difficulty;
}

export interface ImportedQuizOption {
  id: string;
  text: string;
}

export interface ImportedQuizQuestion {
  id: string;
  question: string;
  options: ImportedQuizOption[];
  correctOptionId: string | null;
  explanation: string;
  parserWarnings: string[];
}

export interface QuizParseResult {
  questions: ImportedQuizQuestion[];
  warnings: string[];
  format: "json" | "text";
}

export type QuizValidationField = "question" | "options" | "correctAnswer" | "explanation";

export interface QuizValidationIssue {
  code: string;
  field: QuizValidationField;
  message: string;
  severity: "error" | "warning";
  optionId?: string;
}

export interface QuizQuestionValidation {
  questionId: string;
  issues: QuizValidationIssue[];
  valid: boolean;
}

export interface QuizDuplicateMatch {
  questionId: string;
  matchedQuestionId: string;
  matchedQuestion: string;
  source: "existing" | "import";
  kind: "exact" | "near";
  similarity: number;
}

export interface QuizExportPackage {
  questions: QuizQuestion[];
  source: string;
  destinationPath: string;
  downloadFileName: string;
  exportName: string;
}
