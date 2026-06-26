import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "4.1",
    "title": "Poligon Sekata",
    "formula": "regular polygon: all sides and angles are equal",
    "example": "regular pentagon has 5 equal sides",
    "skill": "kenal pasti sisi, bucu dan sudut yang sama"
  },
  {
    "no": "4.2",
    "title": "Sudut Pedalaman dan Sudut Peluaran",
    "formula": "sum of interior angles = (n - 2) x 180°",
    "example": "hexagon: (6 - 2) x 180° = 720°",
    "skill": "gunakan n sebagai bilangan sisi"
  },
  {
    "no": "4.3",
    "title": "Sudut Poligon Sekata",
    "formula": "exterior angle = 360°/n",
    "example": "regular octagon exterior angle = 45°",
    "skill": "bahagikan jumlah sudut dengan bilangan sudut sama"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c4-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 4",
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

export const mathF2C4FlashcardsBM: Flashcard[] = buildFlashcards(makeSeeds());
