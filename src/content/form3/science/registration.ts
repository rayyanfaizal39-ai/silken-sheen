import type { ChapterContent } from "@/content/types";
import { scienceF3Chapters } from "./chapter-data";
import { buildScienceF3MindMap } from "./mindmap-builder";

import { scienceF3C1NotesBM } from "./chapter-1/notes-bm";
import { scienceF3C1NotesDLP } from "./chapter-1/notes-dlp";
import { scienceF3C1QuizzesBM } from "./chapter-1/quizzes-bm";
import { scienceF3C1QuizzesDLP } from "./chapter-1/quizzes-dlp";
import { scienceF3C1FlashcardsBM } from "./chapter-1/flashcards-bm";
import { scienceF3C1FlashcardsDLP } from "./chapter-1/flashcards-dlp";
import { scienceF3C2NotesBM } from "./chapter-2/notes-bm";
import { scienceF3C2NotesDLP } from "./chapter-2/notes-dlp";
import { scienceF3C2QuizzesBM } from "./chapter-2/quizzes-bm";
import { scienceF3C2QuizzesDLP } from "./chapter-2/quizzes-dlp";
import { scienceF3C2FlashcardsBM } from "./chapter-2/flashcards-bm";
import { scienceF3C2FlashcardsDLP } from "./chapter-2/flashcards-dlp";
import { scienceF3C3NotesBM } from "./chapter-3/notes-bm";
import { scienceF3C3NotesDLP } from "./chapter-3/notes-dlp";
import { scienceF3C3QuizzesBM } from "./chapter-3/quizzes-bm";
import { scienceF3C3QuizzesDLP } from "./chapter-3/quizzes-dlp";
import { scienceF3C3FlashcardsBM } from "./chapter-3/flashcards-bm";
import { scienceF3C3FlashcardsDLP } from "./chapter-3/flashcards-dlp";
import { scienceF3C4NotesBM } from "./chapter-4/notes-bm";
import { scienceF3C4NotesDLP } from "./chapter-4/notes-dlp";
import { scienceF3C4QuizzesBM } from "./chapter-4/quizzes-bm";
import { scienceF3C4QuizzesDLP } from "./chapter-4/quizzes-dlp";
import { scienceF3C4FlashcardsBM } from "./chapter-4/flashcards-bm";
import { scienceF3C4FlashcardsDLP } from "./chapter-4/flashcards-dlp";
import { scienceF3C5NotesBM } from "./chapter-5/notes-bm";
import { scienceF3C5NotesDLP } from "./chapter-5/notes-dlp";
import { scienceF3C5QuizzesBM } from "./chapter-5/quizzes-bm";
import { scienceF3C5QuizzesDLP } from "./chapter-5/quizzes-dlp";
import { scienceF3C5FlashcardsBM } from "./chapter-5/flashcards-bm";
import { scienceF3C5FlashcardsDLP } from "./chapter-5/flashcards-dlp";
import { scienceF3C6NotesBM } from "./chapter-6/notes-bm";
import { scienceF3C6NotesDLP } from "./chapter-6/notes-dlp";
import { scienceF3C6QuizzesBM } from "./chapter-6/quizzes-bm";
import { scienceF3C6QuizzesDLP } from "./chapter-6/quizzes-dlp";
import { scienceF3C6FlashcardsBM } from "./chapter-6/flashcards-bm";
import { scienceF3C6FlashcardsDLP } from "./chapter-6/flashcards-dlp";
import { scienceF3C7NotesBM } from "./chapter-7/notes-bm";
import { scienceF3C7NotesDLP } from "./chapter-7/notes-dlp";
import { scienceF3C7QuizzesBM } from "./chapter-7/quizzes-bm";
import { scienceF3C7QuizzesDLP } from "./chapter-7/quizzes-dlp";
import { scienceF3C7FlashcardsBM } from "./chapter-7/flashcards-bm";
import { scienceF3C7FlashcardsDLP } from "./chapter-7/flashcards-dlp";
import { scienceF3C8NotesBM } from "./chapter-8/notes-bm";
import { scienceF3C8NotesDLP } from "./chapter-8/notes-dlp";
import { scienceF3C8QuizzesBM } from "./chapter-8/quizzes-bm";
import { scienceF3C8QuizzesDLP } from "./chapter-8/quizzes-dlp";
import { scienceF3C8FlashcardsBM } from "./chapter-8/flashcards-bm";
import { scienceF3C8FlashcardsDLP } from "./chapter-8/flashcards-dlp";
import { scienceF3C9NotesBM } from "./chapter-9/notes-bm";
import { scienceF3C9NotesDLP } from "./chapter-9/notes-dlp";
import { scienceF3C9QuizzesBM } from "./chapter-9/quizzes-bm";
import { scienceF3C9QuizzesDLP } from "./chapter-9/quizzes-dlp";
import { scienceF3C9FlashcardsBM } from "./chapter-9/flashcards-bm";
import { scienceF3C9FlashcardsDLP } from "./chapter-9/flashcards-dlp";
import { scienceF3C10NotesBM } from "./chapter-10/notes-bm";
import { scienceF3C10NotesDLP } from "./chapter-10/notes-dlp";
import { scienceF3C10QuizzesBM } from "./chapter-10/quizzes-bm";
import { scienceF3C10QuizzesDLP } from "./chapter-10/quizzes-dlp";
import { scienceF3C10FlashcardsBM } from "./chapter-10/flashcards-bm";
import { scienceF3C10FlashcardsDLP } from "./chapter-10/flashcards-dlp";

const notes = [
  [scienceF3C1NotesBM, scienceF3C1NotesDLP],
  [scienceF3C2NotesBM, scienceF3C2NotesDLP],
  [scienceF3C3NotesBM, scienceF3C3NotesDLP],
  [scienceF3C4NotesBM, scienceF3C4NotesDLP],
  [scienceF3C5NotesBM, scienceF3C5NotesDLP],
  [scienceF3C6NotesBM, scienceF3C6NotesDLP],
  [scienceF3C7NotesBM, scienceF3C7NotesDLP],
  [scienceF3C8NotesBM, scienceF3C8NotesDLP],
  [scienceF3C9NotesBM, scienceF3C9NotesDLP],
  [scienceF3C10NotesBM, scienceF3C10NotesDLP],
] as const;

const quizzes = [
  [scienceF3C1QuizzesBM, scienceF3C1QuizzesDLP],
  [scienceF3C2QuizzesBM, scienceF3C2QuizzesDLP],
  [scienceF3C3QuizzesBM, scienceF3C3QuizzesDLP],
  [scienceF3C4QuizzesBM, scienceF3C4QuizzesDLP],
  [scienceF3C5QuizzesBM, scienceF3C5QuizzesDLP],
  [scienceF3C6QuizzesBM, scienceF3C6QuizzesDLP],
  [scienceF3C7QuizzesBM, scienceF3C7QuizzesDLP],
  [scienceF3C8QuizzesBM, scienceF3C8QuizzesDLP],
  [scienceF3C9QuizzesBM, scienceF3C9QuizzesDLP],
  [scienceF3C10QuizzesBM, scienceF3C10QuizzesDLP],
] as const;

const flashcards = [
  [scienceF3C1FlashcardsBM, scienceF3C1FlashcardsDLP],
  [scienceF3C2FlashcardsBM, scienceF3C2FlashcardsDLP],
  [scienceF3C3FlashcardsBM, scienceF3C3FlashcardsDLP],
  [scienceF3C4FlashcardsBM, scienceF3C4FlashcardsDLP],
  [scienceF3C5FlashcardsBM, scienceF3C5FlashcardsDLP],
  [scienceF3C6FlashcardsBM, scienceF3C6FlashcardsDLP],
  [scienceF3C7FlashcardsBM, scienceF3C7FlashcardsDLP],
  [scienceF3C8FlashcardsBM, scienceF3C8FlashcardsDLP],
  [scienceF3C9FlashcardsBM, scienceF3C9FlashcardsDLP],
  [scienceF3C10FlashcardsBM, scienceF3C10FlashcardsDLP],
] as const;

export const scienceF3ChapterContent: ChapterContent[] = scienceF3Chapters.flatMap(
  (chapter, index) =>
    (["bm", "dlp"] as const).map((lang, langIndex) => ({
      id: `science-f3-c${chapter.chapter}-${lang}`,
      subjectId: "science",
      form: "Form 3",
      chapterKey: `Chapter ${chapter.chapter}`,
      title: chapter.title[lang],
      lang,
      mindMap: {
        data: buildScienceF3MindMap(chapter.chapter, lang),
        title: chapter.title[lang],
      },
      notes: notes[index][langIndex],
      quiz: quizzes[index][langIndex],
      flashcards: flashcards[index][langIndex],
    })),
);
