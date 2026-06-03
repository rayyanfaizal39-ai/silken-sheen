import type { Form, Subject, Note, ScienceNotesSubsection, ScienceNotesSection, StructuredNotes, Difficulty, QuizQuestion, Flashcard, SejarahChapter, ChapterItem } from "./types";
import { subjects, scienceF1C2NotesBM, scienceF1C2NotesDLP, scienceF1C3NotesBM, scienceF1C3NotesDLP, scienceF1C4NotesBM, scienceF1C4NotesDLP, scienceF1C5NotesBM, scienceF1C5NotesDLP, scienceF1C6NotesBM, scienceF1C6NotesDLP, scienceF1C7NotesBM, scienceF1C7NotesDLP } from "./subjects";

export const sejarahForm1Chapters: SejarahChapter[] = [
  {
    num: 1,
    title: "Mengenali Sejarah",
    available: true,
    videoUrl: "https://www.youtube.com/embed/dZuhYNHdQ7U?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1",
    mindMapId: "mengenaliSejarah",
  },
  {
    num: 2,
    title: "Zaman Air Batu",
    available: true,
    videoUrl: "https://www.youtube.com/embed/cLgCMnVoJ5g?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1",
    mindMapId: "zamanAirBatu",
  },
  {
    num: 3,
    title: "Zaman Prasejarah",
    available: true,
    videoUrl: "https://www.youtube.com/embed/3Hx4FX1avMU?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1",
    mindMapId: "zamanPrasejarah",
  },
  {
    num: 4,
    title: "Mengenali Tamadun",
    available: true,
    videoUrl: "https://www.youtube.com/embed/fdU9wX5oGAI?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1",
    mindMapId: "mengenaliTamadun",
  },
  {
    num: 5,
    title: "Tamadun Awal Dunia",
    available: true,
    videoUrl: "https://www.youtube.com/embed/UXeM03mYPO4?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1",
    mindMapId: "tamadunAwalDunia",
  },
  {
    num: 6,
    title: "Tamadun Yunani dan Tamadun Rom",
    available: true,
    videoUrl: "https://www.youtube.com/embed/gSXFJYisA6w?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1",
    mindMapId: "peningkatanTamadunYunaniRom",
  },
  {
    num: 7,
    title: "Tamadun India dan China",
    available: true,
    videoUrl: "https://www.youtube.com/embed/aeLoGzzm85o?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1",
    mindMapId: "tamadunIndiaChina",
  },
  {
    num: 8,
    title: "Tamadun Islam",
    available: true,
    videoUrl: "https://www.youtube.com/embed/RIDZG6LTY5Y?cc_load_policy=1&cc_lang_pref=ms&rel=0&modestbranding=1",
    mindMapId: "tamadunIslamSumbangan",
  },
];

export function sejarahChapterFromId(id: string): number | null {
  const m = id.match(/^sej-f1-c(\d+)-/);
  return m ? parseInt(m[1], 10) : null;
}

export function geographyChapterFromId(id: string): number | null {
  const m = id.match(/^geo-f1-c(\d+)-/);
  return m ? parseInt(m[1], 10) : null;
}

const otherSubjectChapters: Record<string, ChapterItem[]> = {
  bm: [{ key: "Bab 2", label: "Bab 2: Kata Adjektif", available: true }],
  english: [
    { key: "Chapter 1", label: "Chapter 1: Grammar", available: true },
    { key: "Chapter 2", label: "Chapter 2: Vocabulary", available: true },
    { key: "Chapter 3", label: "Chapter 3: Reading", available: true },
    { key: "Chapter 4", label: "Chapter 4: Writing", available: true },
    { key: "Unit 3", label: "Unit 3: Present Perfect Tense", available: true },
  ],
  math: [
    { key: "Chapter 1", label: "Chapter 1: Rational Numbers", available: true },
    { key: "Chapter 3", label: "Chapter 3: Algebraic Expressions", available: true },
    { key: "Chapter 5", label: "Chapter 5: Pythagoras' Theorem", available: true },
  ],
  science: [
    { key: "Chapter 1", label: "Chapter 1: Introduction to Scientific Investigation", available: true },
    { key: "Chapter 2", label: "Chapter 2: Cell as the Basic Unit of Life", available: true },
    { key: "Chapter 5", label: "Chapter 5: Matter", available: true },
  ],
  geography: [
    { key: "Chapter 1", label: "Chapter 1: Arah", available: true },
    { key: "Chapter 2", label: "Chapter 2: Kedudukan", available: true },
    { key: "Chapter 3", label: "Chapter 3: Peta Lakar", available: true },
    { key: "Chapter 4", label: "Chapter 4: Lakaran Peta Malaysia", available: true },
    { key: "Chapter 5", label: "Chapter 5: Bumi", available: true },
    { key: "Chapter 6", label: "Chapter 6: Bentuk Muka Bumi", available: true },
    { key: "Chapter 7", label: "Chapter 7: Saliran", available: true },
    { key: "Chapter 8", label: "Chapter 8: Penduduk Di Malaysia", available: true },
    { key: "Chapter 9", label: "Chapter 9: Petempatan Di Malaysia", available: true },
    { key: "Chapter 10", label: "Chapter 10: Bentuk Muka Bumi dan Saliran di Asia Tenggara", available: true },
    { key: "Chapter 11", label: "Chapter 11: Penduduk dan Petempatan di Asia Tenggara", available: true },
    { key: "Chapter 12", label: "Chapter 12: Sumber Air", available: true },
    { key: "Chapter 13", label: "Chapter 13: Sisa Domestik", available: true },
  ],
};

export const scienceForm1ChaptersBilingual: Array<{ num: number; bm: string; dlp: string }> = [
  { num: 1, bm: "Pengenalan kepada Penyiasatan Saintifik", dlp: "Introduction to Scientific Investigation" },
  { num: 2, bm: "Sel sebagai Unit Asas Kehidupan", dlp: "Cell as the Basic Unit of Life" },
  { num: 3, bm: "Koordinasi dan Gerak Balas (Homeostasis)", dlp: "Coordination and Response (Homeostasis)" },
  { num: 4, bm: "Pembiakan", dlp: "Reproduction" },
  { num: 5, bm: "Jirim", dlp: "Matter" },
  { num: 6, bm: "Jadual Berkala", dlp: "Periodic Table" },
  { num: 7, bm: "Udara", dlp: "Air" },
  { num: 8, bm: "Cahaya dan Optik", dlp: "Light and Optics" },
  { num: 9, bm: "Bumi", dlp: "Earth" },
];

export const englishCategories = [
  { id: 1, name: "Grammar" },
  { id: 2, name: "Vocabulary" },
  { id: 3, name: "Reading" },
  { id: 4, name: "Writing" },
];

export function getSubjectChapters(subjectId: string, scienceLang?: "bm" | "dlp"): ChapterItem[] {
  if (subjectId === "sejarah") {
    return sejarahForm1Chapters.map((c) => ({
      key: `Chapter ${c.num}`,
      label: `Chapter ${c.num}: ${c.title}`,
      available: c.available,
      isNew: c.isNew,
      videoUrl: c.videoUrl,
      mindMapId: c.mindMapId,
    }));
  }
  if (subjectId === "english") {
    const cats = englishCategories.map((c) => ({
      key: `Chapter ${c.id}`,
      label: `Chapter ${c.id}: ${c.name}`,
      available: true,
      isNew: false,
    }));
    return [
      ...cats,
      { key: "Unit 3", label: "Unit 3: Present Perfect Tense", available: true }
    ];
  }
  if (subjectId === "science" && scienceLang) {
    const prefix = scienceLang === "bm" ? "Bab" : "Chapter";
    return scienceForm1ChaptersBilingual.map((c) => ({
      key: `Chapter ${c.num}`,
      label: `${prefix} ${c.num}: ${scienceLang === "bm" ? c.bm : c.dlp}`,
      available: c.num <= 7,
      isNew: c.num === 4,
      structuredNotes:
        c.num === 2
          ? {
              bm: scienceF1C2NotesBM,
              dlp: scienceF1C2NotesDLP,
            }
          : c.num === 3
            ? {
                bm: scienceF1C3NotesBM,
                dlp: scienceF1C3NotesDLP,
              }
            : c.num === 4
              ? {
                  bm: scienceF1C4NotesBM,
                  dlp: scienceF1C4NotesDLP,
                }
              : c.num === 5
                ? {
                    bm: scienceF1C5NotesBM,
                    dlp: scienceF1C5NotesDLP,
                  }
              : c.num === 6
                ? {
                    bm: scienceF1C6NotesBM,
                    dlp: scienceF1C6NotesDLP,
                  }
                : c.num === 7
                  ? {
                      bm: scienceF1C7NotesBM,
                      dlp: scienceF1C7NotesDLP,
                    }
            : undefined,
    }));
  }

  return otherSubjectChapters[subjectId] ?? [];
}

export function getItemChapterKey(item: { id: string; subjectId: string; chapter?: string }): string | null {
  if (item.subjectId === "sejarah") {
    const n = sejarahChapterFromId(item.id);
    return n ? `Chapter ${n}` : null;
  }
  if (item.subjectId === "geography") {
    const n = geographyChapterFromId(item.id);
    return n ? `Chapter ${n}` : null;
  }
  return item.chapter ?? null;
}

export const badges = [
  { id: "starter", name: "First Steps", emoji: "🚀", desc: "Complete your first quiz" },
  { id: "streak3", name: "On Fire", emoji: "🔥", desc: "3-day streak" },
  { id: "scholar", name: "Scholar", emoji: "🎓", desc: "Earn 500 XP" },
  { id: "master", name: "Quiz Master", emoji: "🏆", desc: "Score 100% on a Hard quiz" },
];
