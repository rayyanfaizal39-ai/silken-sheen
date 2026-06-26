import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "10.1",
    "title": "Kecerunan",
    "formula": "m = vertical change / horizontal change",
    "example": "rise 8, run 4 gives m = 2",
    "skill": "bandingkan perubahan menegak dan mengufuk"
  },
  {
    "no": "10.2",
    "title": "Kecerunan daripada Koordinat",
    "formula": "m = (y2 - y1)/(x2 - x1)",
    "example": "A(2,3), B(6,11), m=2",
    "skill": "kekalkan susunan titik yang sama pada pengangka dan penyebut"
  },
  {
    "no": "10.3",
    "title": "Aplikasi Kecerunan",
    "formula": "positive, negative, zero or undefined gradient",
    "example": "horizontal line has gradient 0",
    "skill": "tafsir kecuraman dan arah"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c10-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 10",
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

export const mathF2C10FlashcardsBM: Flashcard[] = buildFlashcards(makeSeeds());
