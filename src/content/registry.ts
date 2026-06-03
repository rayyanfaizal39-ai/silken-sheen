import type { ChapterContent } from "./types";
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

// Mind maps
import { mengenaliSejarahMindMap } from "@/data/mengenaliSejarahMindMap";
import { zamanAirBatuMindMap } from "@/data/sejarah-f1-c2-mindmap";
import { zamanPrasejarahMindMap } from "@/data/zamanPrasejarahMindMap";
import { mengenaliTamadunMindMap } from "@/data/sejarah-f1-c4-mindmap";
import { tamadunAwalDuniaMindMap } from "@/data/sejarah-f1-c5-mindmap";
import { peningkatanTamadunYunaniRomMindMap } from "@/data/sejarah-f1-c6-mindmap";
import { tamadunIndiaChinaMindMap } from "@/data/sejarah-f1-c7-mindmap";
import { tamadunIslamSumbanganMindMap } from "@/data/sejarah-f1-c8-mindmap";

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

function sejarah(num: number, title: string, youtubeId: string, mindMapData: any, mindMapTitle: string): ChapterContent {
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

export const chapters: ChapterContent[] = [
  // Sejarah Form 1
  sejarah(1, "Mengenali Sejarah", "dZuhYNHdQ7U", mengenaliSejarahMindMap, "Mengenali Sejarah"),
  sejarah(2, "Zaman Air Batu", "cLgCMnVoJ5g", zamanAirBatuMindMap, "Zaman Air Batu"),
  sejarah(3, "Zaman Prasejarah", "LAAafdFO3Zo", zamanPrasejarahMindMap, "Zaman Prasejarah"),
  sejarah(4, "Mengenali Tamadun", "fdU9wX5oGAI", mengenaliTamadunMindMap, "Mengenali Tamadun"),
  sejarah(5, "Tamadun Awal Dunia", "UXeM03mYPO4", tamadunAwalDuniaMindMap, "Tamadun Awal Dunia"),
  sejarah(6, "Tamadun Yunani dan Rom", "gSXFJYisA6w", peningkatanTamadunYunaniRomMindMap, "Peningkatan Tamadun Yunani dan Rom"),
  sejarah(7, "Tamadun India dan China", "aeLoGzzm85o", tamadunIndiaChinaMindMap, "Tamadun India dan China"),
  sejarah(8, "Tamadun Islam", "RIDZG6LTY5Y", tamadunIslamSumbanganMindMap, "Tamadun Islam dan Sumbangannya"),

  // Science Form 1 Chapter 2 (bilingual)
  {
    id: "science-f1-c2-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 2",
    title: "Sel sebagai Unit Asas Kehidupan",
    lang: "bm",
    notes: scienceF1C2NotesBM,
  },
  {
    id: "science-f1-c2-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 2",
    title: "Cell as the Basic Unit of Life",
    lang: "dlp",
    notes: scienceF1C2NotesDLP,
  },
  {
    id: "science-f1-c3-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 3",
    title: "Koordinasi dan Tindak Balas",
    lang: "bm",
    notes: scienceF1C3NotesBM,
  },
  {
    id: "science-f1-c3-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 3",
    title: "Coordination and Response",
    lang: "dlp",
    notes: scienceF1C3NotesDLP,
  },
  {
    id: "science-f1-c4-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 4",
    title: "Pembiakan",
    lang: "bm",
    notes: scienceF1C4NotesBM,
  },
  {
    id: "science-f1-c4-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 4",
    title: "Reproduction",
    lang: "dlp",
    notes: scienceF1C4NotesDLP,
  },
  {
    id: "science-f1-c5-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 5",
    title: "Jirim",
    lang: "bm",
    notes: scienceF1C5NotesBM,
  },
  {
    id: "science-f1-c5-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 5",
    title: "Matter",
    lang: "dlp",
    notes: scienceF1C5NotesDLP,
  },
  {
    id: "science-f1-c6-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 6",
    title: "Jadual Berkala",
    lang: "bm",
    notes: scienceF1C6NotesBM,
  },
  {
    id: "science-f1-c6-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 6",
    title: "Periodic Table",
    lang: "dlp",
    notes: scienceF1C6NotesDLP,
  },
  {
    id: "science-f1-c7-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 7",
    title: "Udara",
    lang: "bm",
    notes: scienceF1C7NotesBM,
  },
  {
    id: "science-f1-c7-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 7",
    title: "Air",
    lang: "dlp",
    notes: scienceF1C7NotesDLP,
  },
  {
    id: "science-f1-c8-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 8",
    title: "Cahaya dan Optik",
    lang: "bm",
    notes: scienceF1C8NotesBM,
  },
  {
    id: "science-f1-c8-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 8",
    title: "Light and Optics",
    lang: "dlp",
    notes: scienceF1C8NotesDLP,
  },
  {
    id: "science-f1-c9-bm",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 9",
    title: "Bumi",
    lang: "bm",
    notes: scienceF1C9NotesBM,
  },
  {
    id: "science-f1-c9-dlp",
    subjectId: "science",
    form: "Form 1",
    chapterKey: "Chapter 9",
    title: "Earth",
    lang: "dlp",
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
