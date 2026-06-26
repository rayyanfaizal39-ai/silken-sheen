import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "3.1",
    "title": "Algebraic Formulae",
    "formula": "subject of formula = variable written alone",
    "example": "A = lw, if l = 5 and w = 3 then A = 15",
    "skill": "substitute values accurately"
  },
  {
    "no": "3.2",
    "title": "Changing the Subject of a Formula",
    "formula": "if y = mx + c, then x = (y - c)/m",
    "example": "P = 2l + 2w, l = (P - 2w)/2",
    "skill": "use inverse operations on both sides"
  },
  {
    "no": "3.3",
    "title": "Application of Formulae",
    "formula": "replace variables with given values",
    "example": "v = u + at, with u=4, a=2, t=5 gives v=14",
    "skill": "identify variables and units"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c3-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 3",
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

export const mathF2C3FlashcardsDLP: Flashcard[] = buildFlashcards(makeSeeds());
