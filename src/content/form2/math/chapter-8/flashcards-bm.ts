import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "8.1",
    "title": "Fungsi",
    "formula": "f(x) gives the output for input x",
    "example": "if f(x)=2x+1, f(3)=7",
    "skill": "gantikan nilai x yang diberi"
  },
  {
    "no": "8.2",
    "title": "Jadual Nilai",
    "formula": "ordered pair = (x, y)",
    "example": "y = x + 2 gives (0,2), (1,3), (2,4)",
    "skill": "kira y untuk setiap x"
  },
  {
    "no": "8.3",
    "title": "Melukis Graf Fungsi",
    "formula": "linear graph is straight; quadratic graph is curved",
    "example": "y = 2x + 1 is a straight line",
    "skill": "plot titik dengan tepat dan sambung dengan betul"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c8-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 8",
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

export const mathF2C8FlashcardsBM: Flashcard[] = buildFlashcards(makeSeeds());
