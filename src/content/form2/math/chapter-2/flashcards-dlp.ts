import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "2.1",
    "title": "Expansion",
    "formula": "a(b + c) = ab + ac",
    "example": "3x(2x - 5) = 6x^2 - 15x",
    "skill": "multiply every term inside brackets"
  },
  {
    "no": "2.2",
    "title": "Factorisation of Algebraic Expressions",
    "formula": "a^2 - b^2 = (a + b)(a - b)",
    "example": "x^2 + 5x + 6 = (x + 2)(x + 3)",
    "skill": "factorise using HCF, difference of squares or cross method"
  },
  {
    "no": "2.3",
    "title": "Multiplication and Division of Algebraic Fractions",
    "formula": "a/b ÷ c/d = a/b x d/c",
    "example": "(2x)/5 ÷ (4x^2)/15 = 3/(2x)",
    "skill": "factorise, cancel common factors and multiply"
  },
  {
    "no": "2.4",
    "title": "Addition and Subtraction of Algebraic Fractions",
    "formula": "a/c + b/c = (a + b)/c",
    "example": "x/3 + x/4 = 7x/12",
    "skill": "use LCM before adding or subtracting"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c2-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 2",
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

export const mathF2C2FlashcardsDLP: Flashcard[] = buildFlashcards(makeSeeds());
