import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "12.1",
    "title": "Mean",
    "formula": "mean = sum of data / number of data",
    "example": "2, 4, 9 has mean 5",
    "skill": "add all values before dividing"
  },
  {
    "no": "12.2",
    "title": "Median",
    "formula": "median = middle value after data is arranged",
    "example": "3, 5, 8 has median 5",
    "skill": "arrange data first"
  },
  {
    "no": "12.3",
    "title": "Mode",
    "formula": "mode = value with highest frequency",
    "example": "2, 4, 4, 7 has mode 4",
    "skill": "count frequencies carefully"
  },
  {
    "no": "12.4",
    "title": "Choosing a Suitable Measure",
    "formula": "outliers affect mean strongly",
    "example": "median may be better when data has an extreme value",
    "skill": "choose mean, median or mode based on context"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c12-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 12",
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

export const mathF2C12FlashcardsDLP: Flashcard[] = buildFlashcards(makeSeeds());
