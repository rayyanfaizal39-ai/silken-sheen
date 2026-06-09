import type { ChapterContent } from "./types";
import type { MindNode } from "@/components/MindMap";
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

function geography(chapterNum: number): ChapterContent {
  const chapterKey = `Chapter ${chapterNum}`;
  return {
    id: `geography-f1-c${chapterNum}`,
    subjectId: "geography",
    form: "Form 1",
    chapterKey,
    title: GEOGRAPHY_F1_CHAPTER_TITLES[chapterNum],
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
  ...Array.from({ length: 13 }, (_, index) => geography(index + 1)),

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
