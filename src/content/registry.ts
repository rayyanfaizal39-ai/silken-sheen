import type { ChapterContent } from "./types";
import type { MindNode } from "@/components/MindMap";
import { englishF1C1Notes } from "@/content/form1/english/chapter-1/notes";
import { englishF1C2Notes } from "@/content/form1/english/chapter-2/notes";
import {
  flashcards as allFlashcards,
  quizzes as allQuizzes,
  scienceF1C2NotesBM,
  scienceF1C2NotesDLP,
  scienceF1C3NotesBM,
  scienceF1C3NotesDLP,
  scienceF1C4NotesBM,
  scienceF1C4NotesDLP,
  scienceF1C5NotesBM,
  scienceF1C5NotesDLP,
  scienceF1C6NotesBM,
  scienceF1C6NotesDLP,
  scienceF1C7NotesBM,
  scienceF1C7NotesDLP,
  scienceF1C8NotesBM,
  scienceF1C8NotesDLP,
  scienceF1C9NotesBM,
  scienceF1C9NotesDLP,
  sejarahChapterFromId,
} from "@/data/content";
import { getSejarahF1Subtopics } from "@/data/sejarah-f1-subtopics";
import { getGeographyF1Subtopics } from "@/data/geography-f1-subtopics";
import { mathF1C1NotesBM } from "@/content/form1/math/chapter-1/notes-bm";
import { mathF1C1NotesDLP } from "@/content/form1/math/chapter-1/notes-dlp";
import { mathF1C2NotesBM } from "@/content/form1/math/chapter-2/notes-bm";
import { mathF1C2NotesDLP } from "@/content/form1/math/chapter-2/notes-dlp";
import { mathF1C3NotesBM } from "@/content/form1/math/chapter-3/notes-bm";
import { mathF1C3NotesDLP } from "@/content/form1/math/chapter-3/notes-dlp";
import { mathF1C4NotesBM } from "@/content/form1/math/chapter-4/notes-bm";
import { mathF1C4NotesDLP } from "@/content/form1/math/chapter-4/notes-dlp";
import { mathF1C5NotesBM } from "@/content/form1/math/chapter-5/notes-bm";
import { mathF1C5NotesDLP } from "@/content/form1/math/chapter-5/notes-dlp";
import { mathF1C6NotesBM } from "@/content/form1/math/chapter-6/notes-bm";
import { mathF1C6NotesDLP } from "@/content/form1/math/chapter-6/notes-dlp";
import { mathF1C7NotesBM } from "@/content/form1/math/chapter-7/notes-bm";
import { mathF1C7NotesDLP } from "@/content/form1/math/chapter-7/notes-dlp";
import { mathF1C8NotesBM } from "@/content/form1/math/chapter-8/notes-bm";
import { mathF1C8NotesDLP } from "@/content/form1/math/chapter-8/notes-dlp";
import { mathF1C9NotesBM } from "@/content/form1/math/chapter-9/notes-bm";
import { mathF1C9NotesDLP } from "@/content/form1/math/chapter-9/notes-dlp";
import { mathF1C10NotesBM } from "@/content/form1/math/chapter-10/notes-bm";
import { mathF1C10NotesDLP } from "@/content/form1/math/chapter-10/notes-dlp";
import { mathF1C11NotesBM } from "@/content/form1/math/chapter-11/notes-bm";
import { mathF1C11NotesDLP } from "@/content/form1/math/chapter-11/notes-dlp";
import { mathF1C12NotesBM } from "@/content/form1/math/chapter-12/notes-bm";
import { mathF1C12NotesDLP } from "@/content/form1/math/chapter-12/notes-dlp";
import { mathF1C13NotesBM } from "@/content/form1/math/chapter-13/notes-bm";
import { mathF1C13NotesDLP } from "@/content/form1/math/chapter-13/notes-dlp";
import { sejarahF2C1Notes } from "@/content/form2/sejarah/chapter-1/notes";
import { sejarahF2C2Notes } from "@/content/form2/sejarah/chapter-2/notes";
import { sejarahF2C3Notes } from "@/content/form2/sejarah/chapter-3/notes";
import { sejarahF2C4Notes } from "@/content/form2/sejarah/chapter-4/notes";
import { sejarahF2C5Notes } from "@/content/form2/sejarah/chapter-5/notes";
import { sejarahF2C6Notes } from "@/content/form2/sejarah/chapter-6/notes";
import { sejarahF2C7Notes } from "@/content/form2/sejarah/chapter-7/notes";
import { sejarahF2C8Notes } from "@/content/form2/sejarah/chapter-8/notes";
import { sejarahF2C9Notes } from "@/content/form2/sejarah/chapter-9/notes";
import { sejarahF2C10Notes } from "@/content/form2/sejarah/chapter-10/notes";
import { sejarahF2C1MindMap } from "@/content/form2/sejarah/chapter-1/mindmap";
import { sejarahF2C2MindMap } from "@/content/form2/sejarah/chapter-2/mindmap";
import { sejarahF2C3MindMap } from "@/content/form2/sejarah/chapter-3/mindmap";
import { sejarahF2C4MindMap } from "@/content/form2/sejarah/chapter-4/mindmap";
import { sejarahF2C5MindMap } from "@/content/form2/sejarah/chapter-5/mindmap";
import { sejarahF2C6MindMap } from "@/content/form2/sejarah/chapter-6/mindmap";
import { organizeSejarahF2Notes } from "@/content/form2/sejarah/notes-structure";

// Geografi F1 mind maps
import { geoF1C1MindMap } from "@/content/form1/geography/chapter-1/mindmap";
import { geoF1C2MindMap } from "@/content/form1/geography/chapter-2/mindmap";
import { geoF1C3MindMap } from "@/content/form1/geography/chapter-3/mindmap";
import { geoF1C4MindMap } from "@/content/form1/geography/chapter-4/mindmap";
import { geoF1C5MindMap } from "@/content/form1/geography/chapter-5/mindmap";
import { geoF1C6MindMap } from "@/content/form1/geography/chapter-6/mindmap";
import { geoF1C7MindMap } from "@/content/form1/geography/chapter-7/mindmap";
import { geoF1C8MindMap } from "@/content/form1/geography/chapter-8/mindmap";
import { geoF1C9MindMap } from "@/content/form1/geography/chapter-9/mindmap";
import { geoF1C10MindMap } from "@/content/form1/geography/chapter-10/mindmap";
import { geoF1C11MindMap } from "@/content/form1/geography/chapter-11/mindmap";
import { geoF1C12MindMap } from "@/content/form1/geography/chapter-12/mindmap";
import { geoF1C13MindMap } from "@/content/form1/geography/chapter-13/mindmap";

// Geografi F2
import { geoF2C1MindMap } from "@/content/form2/geography/chapter-1/mindmap";
import { geographyF2C1Notes } from "@/content/form2/geography/chapter-1/notes";
import { geoF2C2MindMap } from "@/content/form2/geography/chapter-2/mindmap";
import { geographyF2C2Notes } from "@/content/form2/geography/chapter-2/notes";
import { geoF2C3MindMap } from "@/content/form2/geography/chapter-3/mindmap";
import { geographyF2C3Notes } from "@/content/form2/geography/chapter-3/notes";
import { geoF2C4MindMap } from "@/content/form2/geography/chapter-4/mindmap";
import { geographyF2C4Notes } from "@/content/form2/geography/chapter-4/notes";
import { geoF2C5MindMap } from "@/content/form2/geography/chapter-5/mindmap";
import { geographyF2C5Notes } from "@/content/form2/geography/chapter-5/notes";
import { geoF2C6MindMap } from "@/content/form2/geography/chapter-6/mindmap";
import { geographyF2C6Notes } from "@/content/form2/geography/chapter-6/notes";
import { geoF2C7MindMap } from "@/content/form2/geography/chapter-7/mindmap";
import { geographyF2C7Notes } from "@/content/form2/geography/chapter-7/notes";
import { geoF2C8MindMap } from "@/content/form2/geography/chapter-8/mindmap";
import { geographyF2C8Notes } from "@/content/form2/geography/chapter-8/notes";
import { geoF2C9MindMap } from "@/content/form2/geography/chapter-9/mindmap";
import { geographyF2C9Notes } from "@/content/form2/geography/chapter-9/notes";
import { geoF2C10MindMap } from "@/content/form2/geography/chapter-10/mindmap";
import { geographyF2C10Notes } from "@/content/form2/geography/chapter-10/notes";

// Mind maps
import { mengenaliSejarahMindMap } from "@/data/mengenaliSejarahMindMap";
import { zamanAirBatuMindMap } from "@/content/form1/sejarah/chapter-2/mindmap";
import { zamanPrasejarahMindMap } from "@/data/zamanPrasejarahMindMap";
import { mengenaliTamadunMindMap } from "@/content/form1/sejarah/chapter-4/mindmap";
import { tamadunAwalDuniaMindMap } from "@/content/form1/sejarah/chapter-5/mindmap";
import { peningkatanTamadunYunaniRomMindMap } from "@/content/form1/sejarah/chapter-6/mindmap";
import { tamadunIndiaChinaMindMap } from "@/content/form1/sejarah/chapter-7/mindmap";
import { tamadunIslamSumbanganMindMap } from "@/content/form1/sejarah/chapter-8/mindmap";
import { scienceF1C1MindMapBM } from "@/content/form1/science/chapter-1/mindmap-bm";
import { scienceF1C1MindMapDLP } from "@/content/form1/science/chapter-1/mindmap-dlp";
import { scienceF1C2MindMapBM } from "@/content/form1/science/chapter-2/mindmap-bm";
import { scienceF1C2MindMapDLP } from "@/content/form1/science/chapter-2/mindmap-dlp";
import { scienceF1C3MindMapBM } from "@/content/form1/science/chapter-3/mindmap-bm";
import { scienceF1C3MindMapDLP } from "@/content/form1/science/chapter-3/mindmap-dlp";
import { scienceF1C4MindMapBM } from "@/content/form1/science/chapter-4/mindmap-bm";
import { scienceF1C4MindMapDLP } from "@/content/form1/science/chapter-4/mindmap-dlp";
import { scienceF1C5MindMapBM } from "@/content/form1/science/chapter-5/mindmap-bm";
import { scienceF1C5MindMapDLP } from "@/content/form1/science/chapter-5/mindmap-dlp";
import { scienceF1C6MindMapBM } from "@/content/form1/science/chapter-6/mindmap-bm";
import { scienceF1C6MindMapDLP } from "@/content/form1/science/chapter-6/mindmap-dlp";
import { scienceF1C7MindMapBM } from "@/content/form1/science/chapter-7/mindmap-bm";
import { scienceF1C7MindMapDLP } from "@/content/form1/science/chapter-7/mindmap-dlp";
import { scienceF1C8MindMapBM } from "@/content/form1/science/chapter-8/mindmap-bm";
import { scienceF1C8MindMapDLP } from "@/content/form1/science/chapter-8/mindmap-dlp";
import { scienceF1C9MindMapBM } from "@/content/form1/science/chapter-9/mindmap-bm";
import { scienceF1C9MindMapDLP } from "@/content/form1/science/chapter-9/mindmap-dlp";

// Mathematics F1 mind maps (BM)
import { mathF1C1MindMapBM } from "@/content/form1/math/chapter-1/mindmap-bm";
import { mathF1C2MindMapBM } from "@/content/form1/math/chapter-2/mindmap-bm";
import { mathF1C3MindMapBM } from "@/content/form1/math/chapter-3/mindmap-bm";
import { mathF1C4MindMapBM } from "@/content/form1/math/chapter-4/mindmap-bm";
import { mathF1C5MindMapBM } from "@/content/form1/math/chapter-5/mindmap-bm";
import { mathF1C6MindMapBM } from "@/content/form1/math/chapter-6/mindmap-bm";
import { mathF1C7MindMapBM } from "@/content/form1/math/chapter-7/mindmap-bm";
import { mathF1C8MindMapBM } from "@/content/form1/math/chapter-8/mindmap-bm";
import { mathF1C9MindMapBM } from "@/content/form1/math/chapter-9/mindmap-bm";
import { mathF1C10MindMapBM } from "@/content/form1/math/chapter-10/mindmap-bm";
import { mathF1C11MindMapBM } from "@/content/form1/math/chapter-11/mindmap-bm";
import { mathF1C12MindMapBM } from "@/content/form1/math/chapter-12/mindmap-bm";
import { mathF1C13MindMapBM } from "@/content/form1/math/chapter-13/mindmap-bm";

// Sains F2 Bab 1 (Biodiversiti / Biodiversity)
import { scienceF2C1NotesBM } from "@/content/form2/science/chapter-1/notes-bm";
import { scienceF2C1NotesDLP } from "@/content/form2/science/chapter-1/notes-dlp";
import { scienceF2C1MindMapBM } from "@/content/form2/science/chapter-1/mindmap-bm";
import { scienceF2C1MindMapDLP } from "@/content/form2/science/chapter-1/mindmap-dlp";
import { scienceF2C1QuizzesBM } from "@/content/form2/science/chapter-1/quizzes-bm";
import { scienceF2C1QuizzesDLP } from "@/content/form2/science/chapter-1/quizzes-dlp";
import { scienceF2C1FlashcardsBM } from "@/content/form2/science/chapter-1/flashcards-bm";
import { scienceF2C1FlashcardsDLP } from "@/content/form2/science/chapter-1/flashcards-dlp";

// Sains F2 Bab 2 (Ekosistem / Ecosystem)
import { scienceF2C2NotesBM } from "@/content/form2/science/chapter-2/notes-bm";
import { scienceF2C2NotesDLP } from "@/content/form2/science/chapter-2/notes-dlp";
import { scienceF2C2MindMapBM } from "@/content/form2/science/chapter-2/mindmap-bm";
import { scienceF2C2MindMapDLP } from "@/content/form2/science/chapter-2/mindmap-dlp";
import { scienceF2C2QuizzesBM } from "@/content/form2/science/chapter-2/quizzes-bm";
import { scienceF2C2QuizzesDLP } from "@/content/form2/science/chapter-2/quizzes-dlp";
import { scienceF2C2FlashcardsBM } from "@/content/form2/science/chapter-2/flashcards-bm";
import { scienceF2C2FlashcardsDLP } from "@/content/form2/science/chapter-2/flashcards-dlp";

// Sains F2 Bab 3 (Nutrisi / Nutrition)
import { scienceF2C3NotesBM } from "@/content/form2/science/chapter-3/notes-bm";
import { scienceF2C3NotesDLP } from "@/content/form2/science/chapter-3/notes-dlp";
import { scienceF2C3MindMapBM } from "@/content/form2/science/chapter-3/mindmap-bm";
import { scienceF2C3MindMapDLP } from "@/content/form2/science/chapter-3/mindmap-dlp";
import { scienceF2C3QuizzesBM } from "@/content/form2/science/chapter-3/quizzes-bm";
import { scienceF2C3QuizzesDLP } from "@/content/form2/science/chapter-3/quizzes-dlp";
import { scienceF2C3FlashcardsBM } from "@/content/form2/science/chapter-3/flashcards-bm";
import { scienceF2C3FlashcardsDLP } from "@/content/form2/science/chapter-3/flashcards-dlp";
import { scienceF2C4NotesBM } from "@/content/form2/science/chapter-4/notes-bm";
import { scienceF2C4NotesDLP } from "@/content/form2/science/chapter-4/notes-dlp";
import { scienceF2C4MindMapBM } from "@/content/form2/science/chapter-4/mindmap-bm";
import { scienceF2C4MindMapDLP } from "@/content/form2/science/chapter-4/mindmap-dlp";
import { scienceF2C4QuizzesBM } from "@/content/form2/science/chapter-4/quizzes-bm";
import { scienceF2C4QuizzesDLP } from "@/content/form2/science/chapter-4/quizzes-dlp";
import { scienceF2C4FlashcardsBM } from "@/content/form2/science/chapter-4/flashcards-bm";
import { scienceF2C4FlashcardsDLP } from "@/content/form2/science/chapter-4/flashcards-dlp";
import { scienceF2C5NotesBM } from "@/content/form2/science/chapter-5/notes-bm";
import { scienceF2C5NotesDLP } from "@/content/form2/science/chapter-5/notes-dlp";
import { scienceF2C5MindMapBM } from "@/content/form2/science/chapter-5/mindmap-bm";
import { scienceF2C5MindMapDLP } from "@/content/form2/science/chapter-5/mindmap-dlp";
import { scienceF2C5QuizzesBM } from "@/content/form2/science/chapter-5/quizzes-bm";
import { scienceF2C5QuizzesDLP } from "@/content/form2/science/chapter-5/quizzes-dlp";
import { scienceF2C5FlashcardsBM } from "@/content/form2/science/chapter-5/flashcards-bm";
import { scienceF2C5FlashcardsDLP } from "@/content/form2/science/chapter-5/flashcards-dlp";

// Mathematics F1 mind maps (DLP)
import { mathF1C1MindMapDLP } from "@/content/form1/math/chapter-1/mindmap-dlp";
import { mathF1C2MindMapDLP } from "@/content/form1/math/chapter-2/mindmap-dlp";
import { mathF1C3MindMapDLP } from "@/content/form1/math/chapter-3/mindmap-dlp";
import { mathF1C4MindMapDLP } from "@/content/form1/math/chapter-4/mindmap-dlp";
import { mathF1C5MindMapDLP } from "@/content/form1/math/chapter-5/mindmap-dlp";
import { mathF1C6MindMapDLP } from "@/content/form1/math/chapter-6/mindmap-dlp";
import { mathF1C7MindMapDLP } from "@/content/form1/math/chapter-7/mindmap-dlp";
import { mathF1C8MindMapDLP } from "@/content/form1/math/chapter-8/mindmap-dlp";
import { mathF1C9MindMapDLP } from "@/content/form1/math/chapter-9/mindmap-dlp";
import { mathF1C10MindMapDLP } from "@/content/form1/math/chapter-10/mindmap-dlp";
import { mathF1C11MindMapDLP } from "@/content/form1/math/chapter-11/mindmap-dlp";
import { mathF1C12MindMapDLP } from "@/content/form1/math/chapter-12/mindmap-dlp";
import { mathF1C13MindMapDLP } from "@/content/form1/math/chapter-13/mindmap-dlp";

function englishFlashcardsFor(chapterKey: string) {
  return allFlashcards.filter((f) => f.subjectId === "english" && f.chapter === chapterKey);
}

function bmFlashcardsFor(chapterKey: string) {
  return allFlashcards.filter((f) => f.subjectId === "bm" && f.chapter === chapterKey);
}
function englishQuizzesFor(chapterKey: string) {
  return allQuizzes.filter((q) => q.subjectId === "english" && q.chapter === chapterKey);
}

function sejarahFlashcardsFor(chapterNum: number) {
  return allFlashcards.filter(
    (f) => f.subjectId === "sejarah" && sejarahChapterFromId(f.id) === chapterNum,
  );
}
function sejarahQuizzesFor(chapterNum: number) {
  return allQuizzes.filter(
    (q) => q.subjectId === "sejarah" && sejarahChapterFromId(q.id) === chapterNum,
  );
}

function sejarah(
  num: number,
  title: string,
  youtubeId: string,
  mindMapData: MindNode,
  mindMapTitle: string,
): ChapterContent {
  const chapterKey = `Chapter ${num}`;
  return {
    id: `sejarah-f1-c${num}`,
    subjectId: "sejarah",
    form: "Form 1",
    chapterKey,
    title,
    video: {
      youtubeId,
      title: `Sejarah Tingkatan 1 Bab ${num} - ${title}`,
      captionLang: "ms",
      hint: "Hidupkan sari kata untuk pemahaman lebih baik! 💡",
    },
    mindMap: { data: mindMapData, title: mindMapTitle },
    flashcards: sejarahFlashcardsFor(num),
    quiz: sejarahQuizzesFor(num),
    subtopics: getSejarahF1Subtopics(chapterKey),
  };
}

const GEOGRAPHY_F1_CHAPTER_TITLES: Record<number, string> = {
  1: "Arah",
  2: "Kedudukan",
  3: "Peta Lakar",
  4: "Lakaran Peta Malaysia",
  5: "Bumi",
  6: "Bentuk Muka Bumi",
  7: "Saliran",
  8: "Penduduk di Malaysia",
  9: "Petempatan di Malaysia",
  10: "Bentuk Muka Bumi dan Saliran di Asia Tenggara",
  11: "Penduduk dan Petempatan di Asia Tenggara",
  12: "Sumber Air",
  13: "Sisa Domestik",
};

function geographyFlashcardsFor(chapterNum: number) {
  const chapterKey = `Chapter ${chapterNum}`;
  return allFlashcards.filter((f) => f.subjectId === "geography" && f.chapter === chapterKey);
}

function geographyQuizzesFor(chapterNum: number) {
  const chapterKey = `Chapter ${chapterNum}`;
  return allQuizzes.filter((q) => q.subjectId === "geography" && q.chapter === chapterKey);
}

function geographyF2FlashcardsFor(chapterNum: number) {
  const chapterKey = `Chapter ${chapterNum}`;
  return allFlashcards.filter(
    (f) => f.subjectId === "geography" && f.form === "Form 2" && f.chapter === chapterKey,
  );
}

function geographyF2QuizzesFor(chapterNum: number) {
  const chapterKey = `Chapter ${chapterNum}`;
  return allQuizzes.filter(
    (q) => q.subjectId === "geography" && q.form === "Form 2" && q.chapter === chapterKey,
  );
}

function sejarahF2FlashcardsFor(chapterNum: number) {
  const chapterKey = `Chapter ${chapterNum}`;
  return allFlashcards.filter(
    (f) => f.subjectId === "sejarah" && f.form === "Form 2" && f.chapter === chapterKey,
  );
}

function sejarahF2QuizzesFor(chapterNum: number) {
  const chapterKey = `Chapter ${chapterNum}`;
  return allQuizzes.filter(
    (q) => q.subjectId === "sejarah" && q.form === "Form 2" && q.chapter === chapterKey,
  );
}

function geography(
  chapterNum: number,
  mindMapData?: MindNode,
  mindMapTitle?: string,
): ChapterContent {
  const chapterKey = `Chapter ${chapterNum}`;
  return {
    id: `geography-f1-c${chapterNum}`,
    subjectId: "geography",
    form: "Form 1",
    chapterKey,
    title: GEOGRAPHY_F1_CHAPTER_TITLES[chapterNum],
    ...(mindMapData && mindMapTitle ? { mindMap: { data: mindMapData, title: mindMapTitle } } : {}),
    flashcards: geographyFlashcardsFor(chapterNum),
    quiz: geographyQuizzesFor(chapterNum),
    subtopics: getGeographyF1Subtopics(chapterKey),
  };
}
export const chapters: ChapterContent[] = [
  // Sejarah Form 1
  sejarah(1, "Mengenali Sejarah", "dZuhYNHdQ7U", mengenaliSejarahMindMap, "Mengenali Sejarah"),
  sejarah(2, "Zaman Air Batu", "cLgCMnVoJ5g", zamanAirBatuMindMap, "Zaman Air Batu"),
  sejarah(3, "Zaman Prasejarah", "LAAafdFO3Zo", zamanPrasejarahMindMap, "Zaman Prasejarah"),
  sejarah(4, "Mengenali Tamadun", "fdU9wX5oGAI", mengenaliTamadunMindMap, "Mengenali Tamadun"),
  sejarah(5, "Tamadun Awal Dunia", "UXeM03mYPO4", tamadunAwalDuniaMindMap, "Tamadun Awal Dunia"),
  sejarah(
    6,
    "Tamadun Yunani dan Rom",
    "gSXFJYisA6w",
    peningkatanTamadunYunaniRomMindMap,
    "Peningkatan Tamadun Yunani dan Rom",
  ),
  sejarah(
    7,
    "Tamadun India dan China",
    "aeLoGzzm85o",
    tamadunIndiaChinaMindMap,
    "Tamadun India dan China",
  ),
  sejarah(
    8,
    "Tamadun Islam",
    "RIDZG6LTY5Y",
    tamadunIslamSumbanganMindMap,
    "Tamadun Islam dan Sumbangannya",
  ),

  // Sejarah Form 2
  {
    id: "sejarah-f2-c1",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 1",
    title: "Kerajaan Alam Melayu",
    notes: sejarahF2C1Notes,
    mindMap: { data: sejarahF2C1MindMap, title: "Kerajaan Alam Melayu yang Masyhur" },
    flashcards: sejarahF2FlashcardsFor(1),
  },
  {
    id: "sejarah-f2-c2",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 2",
    title: "Sistem Pemerintahan dan Kegiatan Ekonomi",
    notes: sejarahF2C2Notes,
    mindMap: {
      data: sejarahF2C2MindMap,
      title: "Sistem Pemerintahan dan Ekonomi Kerajaan Alam Melayu",
    },
    flashcards: sejarahF2FlashcardsFor(2),
  },
  {
    id: "sejarah-f2-c3",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 3",
    title: "Sosiobudaya Masyarakat Kerajaan Alam Melayu",
    notes: sejarahF2C3Notes,
    mindMap: { data: sejarahF2C3MindMap, title: "Sosiobudaya Kerajaan Alam Melayu" },
    flashcards: sejarahF2FlashcardsFor(3),
  },
  {
    id: "sejarah-f2-c4",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 4",
    title: "Agama, Kepercayaan dan Keunikan Warisan Masyarakat Kerajaan Alam Melayu",
    notes: sejarahF2C4Notes,
    mindMap: {
      data: sejarahF2C4MindMap,
      title: "Keunikan Warisan Masyarakat Kerajaan Alam Melayu",
    },
    flashcards: sejarahF2FlashcardsFor(4),
    quiz: sejarahF2QuizzesFor(4),
  },
  {
    id: "sejarah-f2-c5",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 5",
    title: "Kesultanan Melayu Melaka",
    notes: sejarahF2C5Notes,
    mindMap: { data: sejarahF2C5MindMap, title: "Kesultanan Melayu Melaka" },
    flashcards: sejarahF2FlashcardsFor(5),
    quiz: sejarahF2QuizzesFor(5),
  },
  {
    id: "sejarah-f2-c6",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 6",
    title: "Kesultanan Johor Riau",
    notes: sejarahF2C6Notes,
    mindMap: { data: sejarahF2C6MindMap, title: "Kesultanan Johor Riau" },
    flashcards: sejarahF2FlashcardsFor(6),
    quiz: sejarahF2QuizzesFor(6),
  },
  {
    id: "sejarah-f2-c7",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 7",
    title: "Kesultanan Melayu Pahang, Perak, Terengganu dan Selangor",
    notes: sejarahF2C7Notes,
  },
  {
    id: "sejarah-f2-c8",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 8",
    title: "Kerajaan Kedah, Kelantan, Negeri Sembilan dan Perlis",
    notes: sejarahF2C8Notes,
  },
  {
    id: "sejarah-f2-c9",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 9",
    title: "Warisan Kerajaan Kedah, Kelantan, Negeri Sembilan dan Perlis",
    notes: sejarahF2C9Notes,
  },
  {
    id: "sejarah-f2-c10",
    subjectId: "sejarah",
    form: "Form 2",
    chapterKey: "Chapter 10",
    title: "Sarawak dan Sabah",
    notes: sejarahF2C10Notes,
  },

  // Geography Form 1
  geography(1, geoF1C1MindMap, "Arah"),
  geography(2, geoF1C2MindMap, "Kedudukan"),
  geography(3, geoF1C3MindMap, "Peta Lakar"),
  geography(4, geoF1C4MindMap, "Lakaran Peta Malaysia"),
  geography(5, geoF1C5MindMap, "Bumi"),
  geography(6, geoF1C6MindMap, "Bentuk Muka Bumi"),
  geography(7, geoF1C7MindMap, "Saliran"),
  geography(8, geoF1C8MindMap, "Penduduk di Malaysia"),
  geography(9, geoF1C9MindMap, "Petempatan di Malaysia"),
  geography(10, geoF1C10MindMap, "Bentuk Muka Bumi dan Saliran di Asia Tenggara"),
  geography(11, geoF1C11MindMap, "Penduduk dan Petempatan di Asia Tenggara"),
  geography(12, geoF1C12MindMap, "Sumber Air"),
  geography(13, geoF1C13MindMap, "Sisa Domestik"),

  // Geography Form 2
  {
    id: "geography-f2-c1",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 1",
    title: "Skala dan Jarak",
    notes: geographyF2C1Notes,
    mindMap: { data: geoF2C1MindMap, title: "Skala dan Jarak" },
    flashcards: geographyF2FlashcardsFor(1),
    quiz: geographyF2QuizzesFor(1),
  },
  {
    id: "geography-f2-c2",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 2",
    title: "Peta Topografi",
    notes: geographyF2C2Notes,
    mindMap: { data: geoF2C2MindMap, title: "Peta Topografi" },
    flashcards: geographyF2FlashcardsFor(2),
    quiz: geographyF2QuizzesFor(2),
  },
  {
    id: "geography-f2-c3",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 3",
    title: "Pengaruh Pergerakan Bumi terhadap Cuaca dan Iklim",
    notes: geographyF2C3Notes,
    mindMap: { data: geoF2C3MindMap, title: "Pengaruh Pergerakan Bumi terhadap Cuaca dan Iklim" },
    flashcards: geographyF2FlashcardsFor(3),
    quiz: geographyF2QuizzesFor(3),
  },
  {
    id: "geography-f2-c4",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 4",
    title: "Cuaca dan Iklim di Malaysia",
    notes: geographyF2C4Notes,
    mindMap: { data: geoF2C4MindMap, title: "Cuaca dan Iklim di Malaysia" },
    flashcards: geographyF2FlashcardsFor(4),
    quiz: geographyF2QuizzesFor(4),
  },
  {
    id: "geography-f2-c5",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 5",
    title: "Pengangkutan di Malaysia",
    notes: geographyF2C5Notes,
    mindMap: { data: geoF2C5MindMap, title: "Pengangkutan di Malaysia" },
    flashcards: geographyF2FlashcardsFor(5),
    quiz: geographyF2QuizzesFor(5),
  },
  {
    id: "geography-f2-c6",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 6",
    title: "Telekomunikasi di Malaysia",
    notes: geographyF2C6Notes,
    mindMap: { data: geoF2C6MindMap, title: "Telekomunikasi di Malaysia" },
    flashcards: geographyF2FlashcardsFor(6),
    quiz: geographyF2QuizzesFor(6),
  },
  {
    id: "geography-f2-c7",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 7",
    title: "Kepelbagaian Iklim dan Pengaruhnya terhadap Kegiatan Manusia di Asia",
    notes: geographyF2C7Notes,
    mindMap: { data: geoF2C7MindMap, title: "Kepelbagaian Iklim di Asia" },
    flashcards: geographyF2FlashcardsFor(7),
    quiz: geographyF2QuizzesFor(7),
  },
  {
    id: "geography-f2-c8",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 8",
    title: "Jenis dan Kemajuan Pengangkutan di Asia",
    notes: geographyF2C8Notes,
    mindMap: { data: geoF2C8MindMap, title: "Jenis dan Kemajuan Pengangkutan di Asia" },
    flashcards: geographyF2FlashcardsFor(8),
    quiz: geographyF2QuizzesFor(8),
  },
  {
    id: "geography-f2-c9",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 9",
    title: "Pemanasan Global",
    notes: geographyF2C9Notes,
    mindMap: { data: geoF2C9MindMap, title: "Pemanasan Global" },
    flashcards: geographyF2FlashcardsFor(9),
    quiz: geographyF2QuizzesFor(9),
  },
  {
    id: "geography-f2-c10",
    subjectId: "geography",
    form: "Form 2",
    chapterKey: "Chapter 10",
    title: "Teknologi Hijau",
    notes: geographyF2C10Notes,
    mindMap: { data: geoF2C10MindMap, title: "Teknologi Hijau" },
    flashcards: geographyF2FlashcardsFor(10),
    quiz: geographyF2QuizzesFor(10),
  },

  // Mathematics Form 1
  {
    id: "math-f1-c1-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 1",
    title: "Nombor Nisbah",
    lang: "bm",
    mindMap: { data: mathF1C1MindMapBM, title: "Nombor Nisbah" },
    notes: mathF1C1NotesBM,
  },
  {
    id: "math-f1-c1-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 1",
    title: "Rational Numbers",
    lang: "dlp",
    mindMap: { data: mathF1C1MindMapDLP, title: "Rational Numbers" },
    notes: mathF1C1NotesDLP,
  },
  {
    id: "math-f1-c2-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 2",
    title: "Faktor dan Gandaan",
    lang: "bm",
    mindMap: { data: mathF1C2MindMapBM, title: "Faktor dan Gandaan" },
    notes: mathF1C2NotesBM,
  },
  {
    id: "math-f1-c2-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 2",
    title: "Factors and Multiples",
    lang: "dlp",
    mindMap: { data: mathF1C2MindMapDLP, title: "Factors and Multiples" },
    notes: mathF1C2NotesDLP,
  },
  {
    id: "math-f1-c3-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 3",
    title: "Kuasa Dua, Punca Kuasa Dua, Kuasa Tiga dan Punca Kuasa Tiga",
    lang: "bm",
    mindMap: { data: mathF1C3MindMapBM, title: "Kuasa Dua, Punca Kuasa Dua, Kuasa Tiga & Punca Kuasa Tiga" },
    notes: mathF1C3NotesBM,
  },
  {
    id: "math-f1-c3-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 3",
    title: "Squares, Square Roots, Cubes and Cube Roots",
    lang: "dlp",
    mindMap: { data: mathF1C3MindMapDLP, title: "Squares, Square Roots, Cubes and Cube Roots" },
    notes: mathF1C3NotesDLP,
  },
  {
    id: "math-f1-c4-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 4",
    title: "Nisbah, Kadar dan Kadaran",
    lang: "bm",
    mindMap: { data: mathF1C4MindMapBM, title: "Nisbah, Kadar dan Kadaran" },
    notes: mathF1C4NotesBM,
  },
  {
    id: "math-f1-c4-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 4",
    title: "Ratio, Rate and Proportion",
    lang: "dlp",
    mindMap: { data: mathF1C4MindMapDLP, title: "Ratio, Rate and Proportion" },
    notes: mathF1C4NotesDLP,
  },
  {
    id: "math-f1-c5-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 5",
    title: "Ungkapan Algebra",
    lang: "bm",
    mindMap: { data: mathF1C5MindMapBM, title: "Ungkapan Algebra" },
    notes: mathF1C5NotesBM,
  },
  {
    id: "math-f1-c5-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 5",
    title: "Algebraic Expressions",
    lang: "dlp",
    mindMap: { data: mathF1C5MindMapDLP, title: "Algebraic Expressions" },
    notes: mathF1C5NotesDLP,
  },
  {
    id: "math-f1-c6-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 6",
    title: "Persamaan Linear",
    lang: "bm",
    mindMap: { data: mathF1C6MindMapBM, title: "Persamaan Linear" },
    notes: mathF1C6NotesBM,
  },
  {
    id: "math-f1-c6-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 6",
    title: "Linear Equations",
    lang: "dlp",
    mindMap: { data: mathF1C6MindMapDLP, title: "Linear Equations" },
    notes: mathF1C6NotesDLP,
  },
  {
    id: "math-f1-c7-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 7",
    title: "Ketaksamaan Linear",
    lang: "bm",
    mindMap: { data: mathF1C7MindMapBM, title: "Ketaksamaan Linear" },
    notes: mathF1C7NotesBM,
  },
  {
    id: "math-f1-c7-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 7",
    title: "Linear Inequalities",
    lang: "dlp",
    mindMap: { data: mathF1C7MindMapDLP, title: "Linear Inequalities" },
    notes: mathF1C7NotesDLP,
  },
  {
    id: "math-f1-c8-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 8",
    title: "Garis dan Sudut",
    lang: "bm",
    mindMap: { data: mathF1C8MindMapBM, title: "Garis dan Sudut" },
    notes: mathF1C8NotesBM,
  },
  {
    id: "math-f1-c8-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 8",
    title: "Lines and Angles",
    lang: "dlp",
    mindMap: { data: mathF1C8MindMapDLP, title: "Lines and Angles" },
    notes: mathF1C8NotesDLP,
  },
  {
    id: "math-f1-c9-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 9",
    title: "Poligon Asas",
    lang: "bm",
    mindMap: { data: mathF1C9MindMapBM, title: "Poligon Asas" },
    notes: mathF1C9NotesBM,
  },
  {
    id: "math-f1-c9-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 9",
    title: "Basic Polygons",
    lang: "dlp",
    mindMap: { data: mathF1C9MindMapDLP, title: "Basic Polygons" },
    notes: mathF1C9NotesDLP,
  },
  {
    id: "math-f1-c10-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 10",
    title: "Perimeter dan Luas",
    lang: "bm",
    mindMap: { data: mathF1C10MindMapBM, title: "Perimeter dan Luas" },
    notes: mathF1C10NotesBM,
  },
  {
    id: "math-f1-c10-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 10",
    title: "Perimeter and Area",
    lang: "dlp",
    mindMap: { data: mathF1C10MindMapDLP, title: "Perimeter and Area" },
    notes: mathF1C10NotesDLP,
  },
  {
    id: "math-f1-c11-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 11",
    title: "Pengenalan Set",
    lang: "bm",
    mindMap: { data: mathF1C11MindMapBM, title: "Pengenalan Set" },
    notes: mathF1C11NotesBM,
  },
  {
    id: "math-f1-c11-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 11",
    title: "Introduction to Sets",
    lang: "dlp",
    mindMap: { data: mathF1C11MindMapDLP, title: "Introduction to Sets" },
    notes: mathF1C11NotesDLP,
  },
  {
    id: "math-f1-c12-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 12",
    title: "Pengendalian Data",
    lang: "bm",
    mindMap: { data: mathF1C12MindMapBM, title: "Pengendalian Data" },
    notes: mathF1C12NotesBM,
  },
  {
    id: "math-f1-c12-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 12",
    title: "Data Handling",
    lang: "dlp",
    mindMap: { data: mathF1C12MindMapDLP, title: "Data Handling" },
    notes: mathF1C12NotesDLP,
  },
  {
    id: "math-f1-c13-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 13",
    title: "Teorem Pythagoras",
    lang: "bm",
    mindMap: { data: mathF1C13MindMapBM, title: "Teorem Pythagoras" },
    notes: mathF1C13NotesBM,
  },
  {
    id: "math-f1-c13-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 13",
    title: "Pythagoras' Theorem",
    lang: "dlp",
    mindMap: { data: mathF1C13MindMapDLP, title: "Pythagoras' Theorem" },
    notes: mathF1C13NotesDLP,
  },

  // Science Form 1 (bilingual)
  {
    id: "science-f1-c1-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 1",
    title: "Pengenalan kepada Penyiasatan Saintifik",
    lang: "bm",
    mindMap: { data: scienceF1C1MindMapBM, title: "Pengenalan kepada Penyiasatan Saintifik" },
  },
  {
    id: "science-f1-c1-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 1",
    title: "Introduction to Scientific Investigation",
    lang: "dlp",
    mindMap: { data: scienceF1C1MindMapDLP, title: "Introduction to Scientific Investigation" },
  },
  {
    id: "science-f1-c2-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 2",
    title: "Sel sebagai Unit Asas Kehidupan",
    lang: "bm",
    mindMap: { data: scienceF1C2MindMapBM, title: "Sel sebagai Unit Asas Hidupan" },
    notes: scienceF1C2NotesBM,
  },
  {
    id: "science-f1-c2-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 2",
    title: "Cell as the Basic Unit of Life",
    lang: "dlp",
    mindMap: { data: scienceF1C2MindMapDLP, title: "Cells as the Basic Unit of Life" },
    notes: scienceF1C2NotesDLP,
  },
  {
    id: "science-f1-c3-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 3",
    title: "Koordinasi dan Tindak Balas",
    lang: "bm",
    mindMap: { data: scienceF1C3MindMapBM, title: "Homeostasis dalam Benda Hidup" },
    notes: scienceF1C3NotesBM,
  },
  {
    id: "science-f1-c3-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 3",
    title: "Coordination and Response",
    lang: "dlp",
    mindMap: { data: scienceF1C3MindMapDLP, title: "Homeostasis" },
    notes: scienceF1C3NotesDLP,
  },
  {
    id: "science-f1-c4-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 4",
    title: "Pembiakan",
    lang: "bm",
    mindMap: { data: scienceF1C4MindMapBM, title: "Pembiakan" },
    notes: scienceF1C4NotesBM,
  },
  {
    id: "science-f1-c4-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 4",
    title: "Reproduction",
    lang: "dlp",
    mindMap: { data: scienceF1C4MindMapDLP, title: "Reproduction" },
    notes: scienceF1C4NotesDLP,
  },
  {
    id: "science-f1-c5-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 5",
    title: "Jirim",
    lang: "bm",
    mindMap: { data: scienceF1C5MindMapBM, title: "Jirim" },
    notes: scienceF1C5NotesBM,
  },
  {
    id: "science-f1-c5-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 5",
    title: "Matter",
    lang: "dlp",
    mindMap: { data: scienceF1C5MindMapDLP, title: "Matter" },
    notes: scienceF1C5NotesDLP,
  },
  {
    id: "science-f1-c6-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 6",
    title: "Jadual Berkala",
    lang: "bm",
    mindMap: { data: scienceF1C6MindMapBM, title: "Bab 6: Jadual Berkala" },
    notes: scienceF1C6NotesBM,
  },
  {
    id: "science-f1-c6-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 6",
    title: "Periodic Table",
    lang: "dlp",
    mindMap: { data: scienceF1C6MindMapDLP, title: "Periodic Table" },
    notes: scienceF1C6NotesDLP,
  },
  {
    id: "science-f1-c7-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 7",
    title: "Udara",
    lang: "bm",
    mindMap: { data: scienceF1C7MindMapBM, title: "Bab 7: Udara" },
    notes: scienceF1C7NotesBM,
  },
  {
    id: "science-f1-c7-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 7",
    title: "Air",
    lang: "dlp",
    mindMap: { data: scienceF1C7MindMapDLP, title: "Air (Chapter 7)" },
    notes: scienceF1C7NotesDLP,
  },
  {
    id: "science-f1-c8-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 8",
    title: "Cahaya dan Optik",
    lang: "bm",
    mindMap: { data: scienceF1C8MindMapBM, title: "Sains Tingkatan 1 : Bab 8 Cahaya dan Optik" },
    notes: scienceF1C8NotesBM,
  },
  {
    id: "science-f1-c8-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 8",
    title: "Light and Optics",
    lang: "dlp",
    mindMap: { data: scienceF1C8MindMapDLP, title: "Light and Optics" },
    notes: scienceF1C8NotesDLP,
  },
  {
    id: "science-f1-c9-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 9",
    title: "Bumi",
    lang: "bm",
    mindMap: { data: scienceF1C9MindMapBM, title: "Bumi (Earth)" },
    notes: scienceF1C9NotesBM,
  },
  {
    id: "science-f1-c9-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 9",
    title: "Earth",
    lang: "dlp",
    mindMap: { data: scienceF1C9MindMapDLP, title: "Chapter 9: Earth" },
    notes: scienceF1C9NotesDLP,
  },

  // English Form 1
  {
    id: "english-f1-c1",
    subjectId: "english",
    form: "Form 1",
    chapterKey: "Chapter 1",
    title: "Paper 1 - Reading & Language Awareness",
    englishData: englishF1C1Notes,
    flashcards: englishFlashcardsFor("Chapter 1"),
    quiz: englishQuizzesFor("Chapter 1"),
  },
  {
    id: "english-f1-c2",
    subjectId: "english",
    form: "Form 1",
    chapterKey: "Chapter 2",
    title: "Paper 2 - Writing",
    englishData: englishF1C2Notes,
    flashcards: englishFlashcardsFor("Chapter 2"),
    quiz: englishQuizzesFor("Chapter 2"),
  },

  // Bahasa Melayu Form 1 — Flashcards-only decks (no notes/quiz/mindmap registered here)
  {
    id: "bm-f1-karangan-pendek",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Karangan Pendek",
    title: "Karangan Pendek",
    flashcards: bmFlashcardsFor("Karangan Pendek"),
  },
  {
    id: "bm-f1-karangan-panjang",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Karangan Panjang",
    title: "Karangan Panjang",
    flashcards: bmFlashcardsFor("Karangan Panjang"),
  },
  {
    id: "bm-f1-penanda-wacana",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Penanda Wacana",
    title: "Penanda Wacana",
    flashcards: bmFlashcardsFor("Penanda Wacana"),
  },
  {
    id: "bm-f1-peribahasa",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Peribahasa",
    title: "Peribahasa Wajib Hafal",
    flashcards: bmFlashcardsFor("Peribahasa"),
  },
  {
    id: "bm-f1-komsas",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "KOMSAS",
    title: "KOMSAS",
    flashcards: bmFlashcardsFor("KOMSAS"),
  },
  {
    id: "bm-f1-kosa-kata",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Kosa Kata Menarik",
    title: "Kosa Kata Menarik",
    flashcards: bmFlashcardsFor("Kosa Kata Menarik"),
  },
  {
    id: "bm-f1-frasa-menarik",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Frasa Menarik",
    title: "Frasa Menarik",
    flashcards: bmFlashcardsFor("Frasa Menarik"),
  },
  {
    id: "bm-f1-tingkatkan-karangan",
    subjectId: "bm",
    form: "Form 1",
    chapterKey: "Tingkatkan Karangan",
    title: "Kemahiran Tingkatkan Karangan",
    flashcards: bmFlashcardsFor("Tingkatkan Karangan"),
  },

  // Science Form 2 — Chapter 1 (Biodiversiti / Biodiversity), fully populated
  {
    id: "science-f2-c1-bm",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 1",
    title: "Bab 1: Biodiversiti",
    lang: "bm",
    mindMap: { data: scienceF2C1MindMapBM, title: "Biodiversiti" },
    notes: scienceF2C1NotesBM,
    flashcards: scienceF2C1FlashcardsBM,
    quiz: scienceF2C1QuizzesBM,
  },
  {
    id: "science-f2-c1-dlp",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 1",
    title: "Chapter 1: Biodiversity",
    lang: "dlp",
    mindMap: { data: scienceF2C1MindMapDLP, title: "Biodiversity" },
    notes: scienceF2C1NotesDLP,
    flashcards: scienceF2C1FlashcardsDLP,
    quiz: scienceF2C1QuizzesDLP,
  },

  // Science Form 2 — Chapter 2 (Ekosistem / Ecosystem), fully populated
  {
    id: "science-f2-c2-bm",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 2",
    title: "Bab 2: Ekosistem",
    lang: "bm",
    mindMap: { data: scienceF2C2MindMapBM, title: "Ekosistem" },
    notes: scienceF2C2NotesBM,
    flashcards: scienceF2C2FlashcardsBM,
    quiz: scienceF2C2QuizzesBM,
  },
  {
    id: "science-f2-c2-dlp",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 2",
    title: "Chapter 2: Ecosystem",
    lang: "dlp",
    mindMap: { data: scienceF2C2MindMapDLP, title: "Ecosystem" },
    notes: scienceF2C2NotesDLP,
    flashcards: scienceF2C2FlashcardsDLP,
    quiz: scienceF2C2QuizzesDLP,
  },

  // Science Form 2 — Chapter 3 (Nutrisi / Nutrition), fully populated
  {
    id: "science-f2-c3-bm",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 3",
    title: "Bab 3: Nutrisi",
    lang: "bm",
    mindMap: { data: scienceF2C3MindMapBM, title: "Nutrisi" },
    notes: scienceF2C3NotesBM,
    flashcards: scienceF2C3FlashcardsBM,
    quiz: scienceF2C3QuizzesBM,
  },
  {
    id: "science-f2-c3-dlp",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 3",
    title: "Chapter 3: Nutrition",
    lang: "dlp",
    mindMap: { data: scienceF2C3MindMapDLP, title: "Nutrition" },
    notes: scienceF2C3NotesDLP,
    flashcards: scienceF2C3FlashcardsDLP,
    quiz: scienceF2C3QuizzesDLP,
  },

  // Science Form 2 — Chapter 4 (Kesihatan Manusia / Human Health), fully populated
  {
    id: "science-f2-c4-bm",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 4",
    title: "Bab 4: Kesihatan Manusia",
    lang: "bm",
    mindMap: { data: scienceF2C4MindMapBM, title: "Kesihatan Manusia" },
    notes: scienceF2C4NotesBM,
    flashcards: scienceF2C4FlashcardsBM,
    quiz: scienceF2C4QuizzesBM,
  },
  {
    id: "science-f2-c4-dlp",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 4",
    title: "Chapter 4: Human Health",
    lang: "dlp",
    mindMap: { data: scienceF2C4MindMapDLP, title: "Human Health" },
    notes: scienceF2C4NotesDLP,
    flashcards: scienceF2C4FlashcardsDLP,
    quiz: scienceF2C4QuizzesDLP,
  },

  // Science Form 2 — Chapter 5 (Air dan Larutan / Water and Solution), fully populated
  {
    id: "science-f2-c5-bm",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 5",
    title: "Bab 5: Air dan Larutan",
    lang: "bm",
    mindMap: { data: scienceF2C5MindMapBM, title: "Air dan Larutan" },
    notes: scienceF2C5NotesBM,
    flashcards: scienceF2C5FlashcardsBM,
    quiz: scienceF2C5QuizzesBM,
  },
  {
    id: "science-f2-c5-dlp",
    subjectId: "science",
    form: "Form 2",
    chapterKey: "Chapter 5",
    title: "Chapter 5: Water and Solution",
    lang: "dlp",
    mindMap: { data: scienceF2C5MindMapDLP, title: "Water and Solution" },
    notes: scienceF2C5NotesDLP,
    flashcards: scienceF2C5FlashcardsDLP,
    quiz: scienceF2C5QuizzesDLP,
  },

  // Science Form 2 (bilingual) — empty containers, structure-only (Chapters 6-13)
  ...Array.from({ length: 8 }, (_, i): ChapterContent => {
    const n = i + 6;
    return {
      id: `science-f2-c${n}-bm`,
      subjectId: "science",
      form: "Form 2",
      chapterKey: `Chapter ${n}`,
      title: `Bab ${n}`,
      lang: "bm",
    };
  }),
  ...Array.from({ length: 8 }, (_, i): ChapterContent => {
    const n = i + 6;
    return {
      id: `science-f2-c${n}-dlp`,
      subjectId: "science",
      form: "Form 2",
      chapterKey: `Chapter ${n}`,
      title: `Chapter ${n}`,
      lang: "dlp",
    };
  }),
];

export function getChapter(
  subjectId: string,
  chapterKey: string,
  lang?: "bm" | "dlp",
  form: ChapterContent["form"] = "Form 1",
): ChapterContent | undefined {
  const chapter = chapters.find(
    (c) =>
      c.subjectId === subjectId &&
      c.form === form &&
      c.chapterKey === chapterKey &&
      (lang ? c.lang === lang : !c.lang || c.lang === lang),
  );
  if (chapter?.subjectId === "sejarah" && chapter.form === "Form 2" && chapter.notes) {
    return { ...chapter, notes: organizeSejarahF2Notes(chapter.notes) };
  }
  return chapter;
}

/** All chapter content rows for a given subject (used to surface "available" flags). */
export function getChaptersForSubject(subjectId: string, lang?: "bm" | "dlp"): ChapterContent[] {
  return chapters.filter(
    (c) => c.subjectId === subjectId && (lang ? !c.lang || c.lang === lang : true),
  );
}
