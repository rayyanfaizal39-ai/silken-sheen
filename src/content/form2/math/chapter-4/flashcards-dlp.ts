import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "4.1",
    "title": "Regular Polygons",
    "formula": "regular polygon: all sides and angles are equal",
    "example": "regular pentagon has 5 equal sides",
    "skill": "identify sides, vertices and equal angles"
  },
  {
    "no": "4.2",
    "title": "Interior and Exterior Angles",
    "formula": "sum of interior angles = (n - 2) x 180°",
    "example": "hexagon: (6 - 2) x 180° = 720°",
    "skill": "use n for number of sides"
  },
  {
    "no": "4.3",
    "title": "Angles of Regular Polygons",
    "formula": "exterior angle = 360°/n",
    "example": "regular octagon exterior angle = 45°",
    "skill": "divide angle sums by number of equal angles"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c4-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 4",
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

export const mathF2C4FlashcardsDLP: Flashcard[] = buildFlashcards(makeSeeds());
