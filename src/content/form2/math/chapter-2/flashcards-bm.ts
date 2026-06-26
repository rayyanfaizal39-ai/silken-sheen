import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "2.1",
    "title": "Kembangan",
    "formula": "a(b + c) = ab + ac",
    "example": "3x(2x - 5) = 6x^2 - 15x",
    "skill": "darab setiap sebutan dalam kurungan"
  },
  {
    "no": "2.2",
    "title": "Pemfaktoran Ungkapan Algebra",
    "formula": "a^2 - b^2 = (a + b)(a - b)",
    "example": "x^2 + 5x + 6 = (x + 2)(x + 3)",
    "skill": "faktorkan menggunakan FSTB, beza dua kuasa dua atau kaedah silang"
  },
  {
    "no": "2.3",
    "title": "Pendaraban dan Pembahagian Pecahan Algebra",
    "formula": "a/b ÷ c/d = a/b x d/c",
    "example": "(2x)/5 ÷ (4x^2)/15 = 3/(2x)",
    "skill": "faktorkan, batalkan faktor sepunya dan darab"
  },
  {
    "no": "2.4",
    "title": "Penambahan dan Penolakan Pecahan Algebra",
    "formula": "a/c + b/c = (a + b)/c",
    "example": "x/3 + x/4 = 7x/12",
    "skill": "gunakan GSTK sebelum menambah atau menolak"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c2-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 2",
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

export const mathF2C2FlashcardsBM: Flashcard[] = buildFlashcards(makeSeeds());
