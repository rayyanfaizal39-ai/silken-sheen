import type { ChapterContent } from "./types";
import type { MindNode } from "@/components/MindMap";
import { englishF1C1Notes } from "@/data/english-f1-c1-notes";
import { englishF1C2Notes } from "@/data/english-f1-c2-notes";
import { englishF1C3Notes } from "@/data/english-f1-c3-notes";
import { englishF1C4Notes } from "@/data/english-f1-c4-notes";
import { englishF1C1MindMap } from "@/data/english-f1-c1-mindmap";
import { englishF1C2MindMap } from "@/data/english-f1-c2-mindmap";
import { englishF1C3MindMap } from "@/data/english-f1-c3-mindmap";
import { englishF1C4MindMap } from "@/data/english-f1-c4-mindmap";
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
import { mathF1C1NotesBM } from "@/data/math-f1-c1-notes-bm";
import { mathF1C1NotesDLP } from "@/data/math-f1-c1-notes-dlp";
import { mathF1C2NotesBM } from "@/data/math-f1-c2-notes-bm";
import { mathF1C2NotesDLP } from "@/data/math-f1-c2-notes-dlp";
import { mathF1C3NotesBM } from "@/data/math-f1-c3-notes-bm";
import { mathF1C3NotesDLP } from "@/data/math-f1-c3-notes-dlp";
import { mathF1C4NotesBM } from "@/data/math-f1-c4-notes-bm";
import { mathF1C4NotesDLP } from "@/data/math-f1-c4-notes-dlp";
import { mathF1C5NotesBM } from "@/data/math-f1-c5-notes-bm";
import { mathF1C5NotesDLP } from "@/data/math-f1-c5-notes-dlp";
import { mathF1C6NotesBM } from "@/data/math-f1-c6-notes-bm";
import { mathF1C6NotesDLP } from "@/data/math-f1-c6-notes-dlp";
import { mathF1C7NotesBM } from "@/data/math-f1-c7-notes-bm";
import { mathF1C7NotesDLP } from "@/data/math-f1-c7-notes-dlp";
import { mathF1C8NotesBM } from "@/data/math-f1-c8-notes-bm";
import { mathF1C8NotesDLP } from "@/data/math-f1-c8-notes-dlp";
import { mathF1C9NotesBM } from "@/data/math-f1-c9-notes-bm";
import { mathF1C9NotesDLP } from "@/data/math-f1-c9-notes-dlp";
import { mathF1C10NotesBM } from "@/data/math-f1-c10-notes-bm";
import { mathF1C10NotesDLP } from "@/data/math-f1-c10-notes-dlp";
import { mathF1C11NotesBM } from "@/data/math-f1-c11-notes-bm";
import { mathF1C11NotesDLP } from "@/data/math-f1-c11-notes-dlp";
import { mathF1C12NotesBM } from "@/data/math-f1-c12-notes-bm";
import { mathF1C12NotesDLP } from "@/data/math-f1-c12-notes-dlp";
import { mathF1C13NotesBM } from "@/data/math-f1-c13-notes-bm";
import { mathF1C13NotesDLP } from "@/data/math-f1-c13-notes-dlp";

// Geografi F1 mind maps
import { geoF1C1MindMap } from "@/data/geo-f1-c1-mindmap";
import { geoF1C2MindMap } from "@/data/geo-f1-c2-mindmap";
import { geoF1C3MindMap } from "@/data/geo-f1-c3-mindmap";
import { geoF1C4MindMap } from "@/data/geo-f1-c4-mindmap";
import { geoF1C5MindMap } from "@/data/geo-f1-c5-mindmap";
import { geoF1C6MindMap } from "@/data/geo-f1-c6-mindmap";
import { geoF1C7MindMap } from "@/data/geo-f1-c7-mindmap";
import { geoF1C8MindMap } from "@/data/geo-f1-c8-mindmap";
import { geoF1C9MindMap } from "@/data/geo-f1-c9-mindmap";
import { geoF1C10MindMap } from "@/data/geo-f1-c10-mindmap";
import { geoF1C11MindMap } from "@/data/geo-f1-c11-mindmap";
import { geoF1C12MindMap } from "@/data/geo-f1-c12-mindmap";
import { geoF1C13MindMap } from "@/data/geo-f1-c13-mindmap";

// Mind maps
import { mengenaliSejarahMindMap } from "@/data/mengenaliSejarahMindMap";
import { zamanAirBatuMindMap } from "@/data/sejarah-f1-c2-mindmap";
import { zamanPrasejarahMindMap } from "@/data/zamanPrasejarahMindMap";
import { mengenaliTamadunMindMap } from "@/data/sejarah-f1-c4-mindmap";
import { tamadunAwalDuniaMindMap } from "@/data/sejarah-f1-c5-mindmap";
import { peningkatanTamadunYunaniRomMindMap } from "@/data/sejarah-f1-c6-mindmap";
import { tamadunIndiaChinaMindMap } from "@/data/sejarah-f1-c7-mindmap";
import { tamadunIslamSumbanganMindMap } from "@/data/sejarah-f1-c8-mindmap";
import { scienceF1C1MindMapBM } from "@/data/science-f1-c1-mindmap-bm";
import { scienceF1C1MindMapDLP } from "@/data/science-f1-c1-mindmap-dlp";
import { scienceF1C2MindMapBM } from "@/data/science-f1-c2-mindmap-bm";
import { scienceF1C2MindMapDLP } from "@/data/science-f1-c2-mindmap-dlp";
import { scienceF1C3MindMapBM } from "@/data/science-f1-c3-mindmap-bm";
import { scienceF1C3MindMapDLP } from "@/data/science-f1-c3-mindmap-dlp";
import { scienceF1C4MindMapBM } from "@/data/science-f1-c4-mindmap-bm";
import { scienceF1C4MindMapDLP } from "@/data/science-f1-c4-mindmap-dlp";
import { scienceF1C5MindMapBM } from "@/data/science-f1-c5-mindmap-bm";
import { scienceF1C5MindMapDLP } from "@/data/science-f1-c5-mindmap-dlp";
import { scienceF1C6MindMapBM } from "@/data/science-f1-c6-mindmap-bm";
import { scienceF1C6MindMapDLP } from "@/data/science-f1-c6-mindmap-dlp";
import { scienceF1C7MindMapBM } from "@/data/science-f1-c7-mindmap-bm";
import { scienceF1C7MindMapDLP } from "@/data/science-f1-c7-mindmap-dlp";
import { scienceF1C8MindMapBM } from "@/data/science-f1-c8-mindmap-bm";
import { scienceF1C8MindMapDLP } from "@/data/science-f1-c8-mindmap-dlp";
import { scienceF1C9MindMapBM } from "@/data/science-f1-c9-mindmap-bm";
import { scienceF1C9MindMapDLP } from "@/data/science-f1-c9-mindmap-dlp";

function englishFlashcardsFor(chapterKey: string) {
  return allFlashcards.filter((f) => f.subjectId === "english" && f.chapter === chapterKey);
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

  // Mathematics Form 1
  {
    id: "math-f1-c1-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 1",
    title: "Nombor Nisbah",
    lang: "bm",
    notes: mathF1C1NotesBM,
  },
  {
    id: "math-f1-c1-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 1",
    title: "Rational Numbers",
    lang: "dlp",
    notes: mathF1C1NotesDLP,
  },
  {
    id: "math-f1-c2-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 2",
    title: "Faktor dan Gandaan",
    lang: "bm",
    notes: mathF1C2NotesBM,
  },
  {
    id: "math-f1-c2-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 2",
    title: "Factors and Multiples",
    lang: "dlp",
    notes: mathF1C2NotesDLP,
  },
  {
    id: "math-f1-c3-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 3",
    title: "Kuasa Dua, Punca Kuasa Dua, Kuasa Tiga dan Punca Kuasa Tiga",
    lang: "bm",
    notes: mathF1C3NotesBM,
  },
  {
    id: "math-f1-c3-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 3",
    title: "Squares, Square Roots, Cubes and Cube Roots",
    lang: "dlp",
    notes: mathF1C3NotesDLP,
  },
  {
    id: "math-f1-c4-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 4",
    title: "Nisbah, Kadar dan Kadaran",
    lang: "bm",
    notes: mathF1C4NotesBM,
  },
  {
    id: "math-f1-c4-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 4",
    title: "Ratio, Rate and Proportion",
    lang: "dlp",
    notes: mathF1C4NotesDLP,
  },
  {
    id: "math-f1-c5-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 5",
    title: "Ungkapan Algebra",
    lang: "bm",
    notes: mathF1C5NotesBM,
  },
  {
    id: "math-f1-c5-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 5",
    title: "Algebraic Expressions",
    lang: "dlp",
    notes: mathF1C5NotesDLP,
  },
  {
    id: "math-f1-c6-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 6",
    title: "Persamaan Linear",
    lang: "bm",
    notes: mathF1C6NotesBM,
  },
  {
    id: "math-f1-c6-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 6",
    title: "Linear Equations",
    lang: "dlp",
    notes: mathF1C6NotesDLP,
  },
  {
    id: "math-f1-c7-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 7",
    title: "Ketaksamaan Linear",
    lang: "bm",
    notes: mathF1C7NotesBM,
  },
  {
    id: "math-f1-c7-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 7",
    title: "Linear Inequalities",
    lang: "dlp",
    notes: mathF1C7NotesDLP,
  },
  {
    id: "math-f1-c8-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 8",
    title: "Garis dan Sudut",
    lang: "bm",
    notes: mathF1C8NotesBM,
  },
  {
    id: "math-f1-c8-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 8",
    title: "Lines and Angles",
    lang: "dlp",
    notes: mathF1C8NotesDLP,
  },
  {
    id: "math-f1-c9-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 9",
    title: "Poligon Asas",
    lang: "bm",
    notes: mathF1C9NotesBM,
  },
  {
    id: "math-f1-c9-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 9",
    title: "Basic Polygons",
    lang: "dlp",
    notes: mathF1C9NotesDLP,
  },
  {
    id: "math-f1-c10-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 10",
    title: "Perimeter dan Luas",
    lang: "bm",
    notes: mathF1C10NotesBM,
  },
  {
    id: "math-f1-c10-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 10",
    title: "Perimeter and Area",
    lang: "dlp",
    notes: mathF1C10NotesDLP,
  },
  {
    id: "math-f1-c11-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 11",
    title: "Pengenalan Set",
    lang: "bm",
    notes: mathF1C11NotesBM,
  },
  {
    id: "math-f1-c11-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 11",
    title: "Introduction to Sets",
    lang: "dlp",
    notes: mathF1C11NotesDLP,
  },
  {
    id: "math-f1-c12-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 12",
    title: "Pengendalian Data",
    lang: "bm",
    notes: mathF1C12NotesBM,
  },
  {
    id: "math-f1-c12-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 12",
    title: "Data Handling",
    lang: "dlp",
    notes: mathF1C12NotesDLP,
  },
  {
    id: "math-f1-c13-bm",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 13",
    title: "Teorem Pythagoras",
    lang: "bm",
    notes: mathF1C13NotesBM,
  },
  {
    id: "math-f1-c13-dlp",
    subjectId: "math",
    form: "Form 1",
    chapterKey: "Chapter 13",
    title: "Pythagoras' Theorem",
    lang: "dlp",
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
    title: "Grammar — Word Wizardry",
    notes: englishF1C1Notes,
    mindMap: { data: englishF1C1MindMap, title: "Grammar — Word Wizardry" },
    flashcards: englishFlashcardsFor("Chapter 1"),
    quiz: englishQuizzesFor("Chapter 1"),
  },
  {
    id: "english-f1-c2",
    subjectId: "english",
    form: "Form 1",
    chapterKey: "Chapter 2",
    title: "Vocabulary — Word Explorer",
    notes: englishF1C2Notes,
    mindMap: { data: englishF1C2MindMap, title: "Vocabulary — Word Explorer" },
    flashcards: englishFlashcardsFor("Chapter 2"),
    quiz: englishQuizzesFor("Chapter 2"),
  },
  {
    id: "english-f1-c3",
    subjectId: "english",
    form: "Form 1",
    chapterKey: "Chapter 3",
    title: "Reading — Detective Skills",
    notes: englishF1C3Notes,
    mindMap: { data: englishF1C3MindMap, title: "Reading — Detective Skills" },
    flashcards: englishFlashcardsFor("Chapter 3"),
    quiz: englishQuizzesFor("Chapter 3"),
  },
  {
    id: "english-f1-c4",
    subjectId: "english",
    form: "Form 1",
    chapterKey: "Chapter 4",
    title: "Writing — Story Architect",
    notes: englishF1C4Notes,
    mindMap: { data: englishF1C4MindMap, title: "Writing — Story Architect" },
    flashcards: englishFlashcardsFor("Chapter 4"),
    quiz: englishQuizzesFor("Chapter 4"),
  },
];

export function getChapter(
  subjectId: string,
  chapterKey: string,
  lang?: "bm" | "dlp",
): ChapterContent | undefined {
  return chapters.find(
    (c) =>
      c.subjectId === subjectId &&
      c.chapterKey === chapterKey &&
      (lang ? c.lang === lang : !c.lang || c.lang === lang),
  );
}

/** All chapter content rows for a given subject (used to surface "available" flags). */
export function getChaptersForSubject(subjectId: string, lang?: "bm" | "dlp"): ChapterContent[] {
  return chapters.filter(
    (c) => c.subjectId === subjectId && (lang ? !c.lang || c.lang === lang : true),
  );
}
