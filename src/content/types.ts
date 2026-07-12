import type { MindNode } from "@/components/MindMap";
import type {
  Form,
  ScienceChapter2Notes,
  Flashcard,
  QuizQuestion,
} from "@/data/content";
import type { Subtopic } from "@/data/sejarah-f1-subtopics";
import type { EnglishChapterData } from "@/data/english-types";
import type { Bab7Content } from "@/content/form1/science/chapter-7/bab7-content";
import type { Chapter1Content } from "@/content/form1/science/chapter-1/chapter1-content";
import type { Chapter5Content } from "@/content/form1/science/chapter-5/chapter5-content";

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
  /** Bab 7 (Udara/Air) chunked, bilingual learning experience — replaces generic StructuredNotes when present. */
  bab7Data?: { en: Bab7Content; bm: Bab7Content };
  /** Bab 1 (Pengenalan kepada Penyiasatan Saintifik) chunked, bilingual learning experience. */
  chapter1Data?: { en: Chapter1Content; bm: Chapter1Content };
  /** Bab 5 (Jirim/Matter) chunked, bilingual learning experience. */
  chapter5Data?: { en: Chapter5Content; bm: Chapter5Content };
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
    notes:
      !!c?.notes ||
      !!c?.englishData ||
      !!c?.bab7Data ||
      !!c?.chapter1Data ||
      !!c?.chapter5Data ||
      !!c?.subtopics?.length,
    flashcards: !!c?.flashcards?.length,
    quiz: !!c?.quiz?.length,
    mindMap: !!c?.mindMap,
    video: !!c?.video,
  };
}
