import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "10.1",
    "title": "Gradient",
    "formula": "m = vertical change / horizontal change",
    "example": "rise 8, run 4 gives m = 2",
    "skill": "compare vertical and horizontal changes"
  },
  {
    "no": "10.2",
    "title": "Gradient from Coordinates",
    "formula": "m = (y2 - y1)/(x2 - x1)",
    "example": "A(2,3), B(6,11), m=2",
    "skill": "keep the same point order in numerator and denominator"
  },
  {
    "no": "10.3",
    "title": "Application of Gradient",
    "formula": "positive, negative, zero or undefined gradient",
    "example": "horizontal line has gradient 0",
    "skill": "interpret steepness and direction"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c10-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 10",
    lang: "dlp",
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
      `Concept ${t.no}: ${t.title} (${i + 1})`,
      `${t.title} requires students to ${t.skill}.`,
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
      `Worked-example pattern ${t.no}: ${t.title} (${i + 1})`,
      `${t.example}. Tip: write the formula, substitute values, then check the final answer.`,
    ]);
  }
  return cards;
}

export const mathF2C10FlashcardsDLP: Flashcard[] = buildFlashcards(makeSeeds());
