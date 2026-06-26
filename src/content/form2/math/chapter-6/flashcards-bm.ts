import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "6.1",
    "title": "Sifat Bentuk 3D",
    "formula": "faces, edges and vertices describe solids",
    "example": "cube: 6 faces, 12 edges, 8 vertices",
    "skill": "kira muka, tepi dan bucu secara sistematik"
  },
  {
    "no": "6.2",
    "title": "Bentangan Bentuk 3D",
    "formula": "net = flat pattern that folds into a solid",
    "example": "cube net has 6 congruent squares",
    "skill": "bayangkan lipatan tanpa muka bertindih"
  },
  {
    "no": "6.3",
    "title": "Luas Permukaan dan Isi Padu",
    "formula": "volume of prism = cross-sectional area x length",
    "example": "cuboid volume = l x w x h",
    "skill": "bezakan luas permukaan daripada isi padu"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c6-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 6",
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

export const mathF2C6FlashcardsBM: Flashcard[] = buildFlashcards(makeSeeds());
