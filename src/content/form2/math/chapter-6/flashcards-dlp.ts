import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "6.1",
    "title": "Properties of 3D Shapes",
    "formula": "faces, edges and vertices describe solids",
    "example": "cube: 6 faces, 12 edges, 8 vertices",
    "skill": "count faces, edges and vertices systematically"
  },
  {
    "no": "6.2",
    "title": "Nets of 3D Shapes",
    "formula": "net = flat pattern that folds into a solid",
    "example": "cube net has 6 congruent squares",
    "skill": "visualise folding without overlapping faces"
  },
  {
    "no": "6.3",
    "title": "Surface Area and Volume",
    "formula": "volume of prism = cross-sectional area x length",
    "example": "cuboid volume = l x w x h",
    "skill": "separate surface area from volume"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c6-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 6",
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

export const mathF2C6FlashcardsDLP: Flashcard[] = buildFlashcards(makeSeeds());
