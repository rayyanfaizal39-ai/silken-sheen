import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "11.1",
    "title": "Pantulan",
    "formula": "object and image are the same distance from mirror line",
    "example": "reflection in x-axis maps (x, y) to (x, -y)",
    "skill": "gunakan garis cermin dan jarak serenjang yang sama"
  },
  {
    "no": "11.2",
    "title": "Putaran",
    "formula": "rotation needs centre, angle and direction",
    "example": "90° clockwise about O changes orientation but not size",
    "skill": "nyatakan pusat, sudut dan arah"
  },
  {
    "no": "11.3",
    "title": "Translasi",
    "formula": "translation vector = (movement in x, movement in y)",
    "example": "vector (3, -2) moves 3 right and 2 down",
    "skill": "gerakkan setiap titik dengan vektor yang sama"
  },
  {
    "no": "11.4",
    "title": "Kekongruenan",
    "formula": "isometry preserves shape and size",
    "example": "object and image are congruent after reflection, rotation or translation",
    "skill": "semak bentuk sama dan saiz sama"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c11-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 11",
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

export const mathF2C11FlashcardsBM: Flashcard[] = buildFlashcards(makeSeeds());
