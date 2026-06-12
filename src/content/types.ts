import type { MindNode } from "@/components/MindMap";
import type {
  Form,
  ScienceChapter2Notes,
  Flashcard,
  QuizQuestion,
} from "@/data/content";
import type { Subtopic } from "@/data/sejarah-f1-subtopics";
import type { EnglishChapterData } from "@/data/english-types";

/**
 * Generic structured notes shape. Reuses ScienceChapter2Notes
 * (quickRevision / sections / keyExamFacts) since it's already general-purpose.
 */
export type StructuredNotes = ScienceChapter2Notes;

export type VideoBlock = {
  youtubeId: string;
  title: string;
  /** Caption language hint for the YouTube player (e.g. "ms", "en"). */
  captionLang?: string;
  /** Short caption shown beneath the player. */
  hint?: string;
};

/**
 * A single chapter's content. Drop one of these into the registry and
 * the notes/flashcards/quizzes pages will pick it up automatically.
 */
export type ChapterContent = {
  id: string; // e.g. "sejarah-f1-c1", "science-f1-c2-bm"
  subjectId: string; // matches subjects[].id
  form: Form;
  chapterKey: string; // e.g. "Chapter 1", matches getSubjectChapters().key
  /** Display title (used in headings & feature bar). */
  title: string;
  /** Optional Science language scope. */
  lang?: "bm" | "dlp";
  video?: VideoBlock;
  mindMap?: { data: MindNode; title: string };
  notes?: StructuredNotes;
  /** English-specific learning experience — replaces generic StructuredNotes for English chapters. */
  englishData?: EnglishChapterData;
  flashcards?: Flashcard[];
  quiz?: QuizQuestion[];
  subtopics?: Subtopic[];
};

export type ChapterFeatureKey =
  | "notes"
  | "flashcards"
  | "quiz"
  | "mindMap"
  | "video";

export function getChapterFeatures(c: ChapterContent | undefined): Record<ChapterFeatureKey, boolean> {
  return {
    notes: !!c?.notes || !!c?.englishData || !!c?.subtopics?.length,
    flashcards: !!c?.flashcards?.length,
    quiz: !!c?.quiz?.length,
    mindMap: !!c?.mindMap,
    video: !!c?.video,
  };
}
