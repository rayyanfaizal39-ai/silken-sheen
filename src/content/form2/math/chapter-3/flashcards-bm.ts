import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "3.1",
    "title": "Rumus Algebra",
    "formula": "subject of formula = variable written alone",
    "example": "A = lw, if l = 5 and w = 3 then A = 15",
    "skill": "gantikan nilai dengan tepat"
  },
  {
    "no": "3.2",
    "title": "Menukar Perkara Rumus",
    "formula": "if y = mx + c, then x = (y - c)/m",
    "example": "P = 2l + 2w, l = (P - 2w)/2",
    "skill": "gunakan operasi songsang pada kedua-dua belah"
  },
  {
    "no": "3.3",
    "title": "Aplikasi Rumus",
    "formula": "replace variables with given values",
    "example": "v = u + at, with u=4, a=2, t=5 gives v=14",
    "skill": "kenal pasti pemboleh ubah dan unit"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c3-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 3",
    lang: "bm",
    front,
    back,
  }));
}

function topic(index: number) {
  return topics[index % topics.length];
}

function makeSeeds(): FlashcardSeed[] {
  const cards: FlashcardSeed[] = [];
  for (let i = 0; i < 20; i++) {
    const t = topic(i);
    cards.push([
      `Konsep ${t.no}: ${t.title} (${i + 1})`,
      `${t.title} memerlukan murid untuk ${t.skill}.`,
    ]);
  }
  for (let i = 0; i < 20; i++) {
    const t = topic(i + 1);
    cards.push([
      `Formula ${t.no}: ${t.title} (${i + 1})`,
      t.formula,
    ]);
  }
  for (let i = 0; i < 20; i++) {
    const t = topic(i + 2);
    cards.push([
      `Pola contoh ${t.no}: ${t.title} (${i + 1})`,
      `${t.example}. Petua: tulis formula, gantikan nilai, kemudian semak jawapan akhir.`,
    ]);
  }
  return cards;
}

export const mathF2C3FlashcardsBM: Flashcard[] = buildFlashcards(makeSeeds());
