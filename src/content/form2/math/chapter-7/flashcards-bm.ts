import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "7.1",
    "title": "Satah Cartes",
    "formula": "coordinate = (x, y)",
    "example": "(3, -2) means x=3 and y=-2",
    "skill": "gerak pada paksi-x dahulu, kemudian paksi-y"
  },
  {
    "no": "7.2",
    "title": "Jarak antara Dua Titik",
    "formula": "horizontal or vertical distance = difference of coordinates",
    "example": "from (2, 5) to (2, 9), distance = 4 units",
    "skill": "bandingkan koordinat yang berubah"
  },
  {
    "no": "7.3",
    "title": "Titik Tengah",
    "formula": "midpoint = ((x1 + x2)/2, (y1 + y2)/2)",
    "example": "midpoint of (2,4) and (6,8) is (4,6)",
    "skill": "puratakan nilai x dan nilai y secara berasingan"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c7-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 7",
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

export const mathF2C7FlashcardsBM: Flashcard[] = buildFlashcards(makeSeeds());
