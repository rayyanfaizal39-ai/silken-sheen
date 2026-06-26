import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "9.1",
    "title": "Speed",
    "formula": "speed = distance / time",
    "example": "120 km in 2 h gives 60 km/h",
    "skill": "use matching distance and time units"
  },
  {
    "no": "9.2",
    "title": "Average Speed",
    "formula": "average speed = total distance / total time",
    "example": "180 km in 3 h gives 60 km/h",
    "skill": "use total distance and total time"
  },
  {
    "no": "9.3",
    "title": "Acceleration",
    "formula": "acceleration = change in speed / time",
    "example": "from 10 m/s to 25 m/s in 5 s gives 3 m/s^2",
    "skill": "subtract initial speed from final speed"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c9-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 9",
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

export const mathF2C9FlashcardsDLP: Flashcard[] = buildFlashcards(makeSeeds());
