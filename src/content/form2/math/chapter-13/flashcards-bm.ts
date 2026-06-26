import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "13.1",
    "title": "Kebarangkalian Eksperimen",
    "formula": "experimental probability = event frequency / total trials",
    "example": "28 heads in 50 tosses gives 14/25",
    "skill": "gunakan keputusan sebenar daripada percubaan"
  },
  {
    "no": "13.2",
    "title": "Ruang Sampel dan Peristiwa",
    "formula": "S = set of all possible outcomes",
    "example": "dice sample space is {1,2,3,4,5,6}",
    "skill": "senaraikan semua keputusan tanpa ulangan"
  },
  {
    "no": "13.3",
    "title": "Kebarangkalian Teori",
    "formula": "P(A) = n(A) / n(S)",
    "example": "even number on a dice has probability 3/6 = 1/2",
    "skill": "kira keputusan memihak dan jumlah keputusan"
  },
  {
    "no": "13.4",
    "title": "Peristiwa Pelengkap",
    "formula": "P(A') = 1 - P(A)",
    "example": "if P(win)=1/5, P(not win)=4/5",
    "skill": "tolak daripada 1"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c13-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 13",
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

export const mathF2C13FlashcardsBM: Flashcard[] = buildFlashcards(makeSeeds());
