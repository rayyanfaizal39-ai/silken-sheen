import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "5.1",
    "title": "Sifat Bulatan",
    "formula": "diameter = 2 x radius",
    "example": "radius 7 cm gives diameter 14 cm",
    "skill": "kenal pusat, jejari, diameter, perentas, lengkok dan sektor"
  },
  {
    "no": "5.2",
    "title": "Lilitan Bulatan",
    "formula": "C = 2πr = πd",
    "example": "r = 7 cm, C = 44 cm using π = 22/7",
    "skill": "pilih formula jejari atau diameter dengan betul"
  },
  {
    "no": "5.3",
    "title": "Luas Bulatan",
    "formula": "A = πr^2",
    "example": "r = 7 cm, A = 154 cm^2 using π = 22/7",
    "skill": "kuasakan dua jejari sebelum mendarab pi"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c5-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 5",
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

export const mathF2C5FlashcardsBM: Flashcard[] = buildFlashcards(makeSeeds());
