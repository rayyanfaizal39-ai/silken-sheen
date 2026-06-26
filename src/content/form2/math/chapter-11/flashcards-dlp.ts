import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "11.1",
    "title": "Reflection",
    "formula": "object and image are the same distance from mirror line",
    "example": "reflection in x-axis maps (x, y) to (x, -y)",
    "skill": "use a mirror line and equal perpendicular distances"
  },
  {
    "no": "11.2",
    "title": "Rotation",
    "formula": "rotation needs centre, angle and direction",
    "example": "90° clockwise about O changes orientation but not size",
    "skill": "state centre, angle and direction"
  },
  {
    "no": "11.3",
    "title": "Translation",
    "formula": "translation vector = (movement in x, movement in y)",
    "example": "vector (3, -2) moves 3 right and 2 down",
    "skill": "move every point by the same vector"
  },
  {
    "no": "11.4",
    "title": "Congruence",
    "formula": "isometry preserves shape and size",
    "example": "object and image are congruent after reflection, rotation or translation",
    "skill": "check same shape and same size"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c11-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 11",
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

export const mathF2C11FlashcardsDLP: Flashcard[] = buildFlashcards(makeSeeds());
