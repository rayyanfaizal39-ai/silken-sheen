import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "7.1",
    "title": "Cartesian Plane",
    "formula": "coordinate = (x, y)",
    "example": "(3, -2) means x=3 and y=-2",
    "skill": "move along x-axis first, then y-axis"
  },
  {
    "no": "7.2",
    "title": "Distance Between Two Points",
    "formula": "horizontal or vertical distance = difference of coordinates",
    "example": "from (2, 5) to (2, 9), distance = 4 units",
    "skill": "compare the changing coordinate"
  },
  {
    "no": "7.3",
    "title": "Midpoint",
    "formula": "midpoint = ((x1 + x2)/2, (y1 + y2)/2)",
    "example": "midpoint of (2,4) and (6,8) is (4,6)",
    "skill": "average x-values and y-values separately"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c7-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 7",
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

export const mathF2C7FlashcardsDLP: Flashcard[] = buildFlashcards(makeSeeds());
