import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "8.1",
    "title": "Functions",
    "formula": "f(x) gives the output for input x",
    "example": "if f(x)=2x+1, f(3)=7",
    "skill": "substitute the given x-value"
  },
  {
    "no": "8.2",
    "title": "Tables of Values",
    "formula": "ordered pair = (x, y)",
    "example": "y = x + 2 gives (0,2), (1,3), (2,4)",
    "skill": "calculate y for each x"
  },
  {
    "no": "8.3",
    "title": "Drawing Graphs of Functions",
    "formula": "linear graph is straight; quadratic graph is curved",
    "example": "y = 2x + 1 is a straight line",
    "skill": "plot points accurately and join correctly"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c8-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 8",
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

export const mathF2C8FlashcardsDLP: Flashcard[] = buildFlashcards(makeSeeds());
