import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "13.1",
    "title": "Experimental Probability",
    "formula": "experimental probability = event frequency / total trials",
    "example": "28 heads in 50 tosses gives 14/25",
    "skill": "use actual results from trials"
  },
  {
    "no": "13.2",
    "title": "Sample Space and Events",
    "formula": "S = set of all possible outcomes",
    "example": "dice sample space is {1,2,3,4,5,6}",
    "skill": "list all outcomes without repeats"
  },
  {
    "no": "13.3",
    "title": "Theoretical Probability",
    "formula": "P(A) = n(A) / n(S)",
    "example": "even number on a dice has probability 3/6 = 1/2",
    "skill": "count favourable outcomes and total outcomes"
  },
  {
    "no": "13.4",
    "title": "Complement of an Event",
    "formula": "P(A') = 1 - P(A)",
    "example": "if P(win)=1/5, P(not win)=4/5",
    "skill": "subtract from 1"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c13-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 13",
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

export const mathF2C13FlashcardsDLP: Flashcard[] = buildFlashcards(makeSeeds());
