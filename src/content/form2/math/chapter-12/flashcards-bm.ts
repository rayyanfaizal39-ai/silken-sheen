import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "12.1",
    "title": "Min",
    "formula": "mean = sum of data / number of data",
    "example": "2, 4, 9 has mean 5",
    "skill": "jumlahkan semua nilai sebelum membahagi"
  },
  {
    "no": "12.2",
    "title": "Median",
    "formula": "median = middle value after data is arranged",
    "example": "3, 5, 8 has median 5",
    "skill": "susun data dahulu"
  },
  {
    "no": "12.3",
    "title": "Mod",
    "formula": "mode = value with highest frequency",
    "example": "2, 4, 4, 7 has mode 4",
    "skill": "kira kekerapan dengan teliti"
  },
  {
    "no": "12.4",
    "title": "Memilih Sukatan yang Sesuai",
    "formula": "outliers affect mean strongly",
    "example": "median may be better when data has an extreme value",
    "skill": "pilih min, median atau mod mengikut konteks"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c12-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 12",
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

export const mathF2C12FlashcardsBM: Flashcard[] = buildFlashcards(makeSeeds());
