import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = [
  {
    "no": "5.1",
    "title": "Properties of Circles",
    "formula": "diameter = 2 x radius",
    "example": "radius 7 cm gives diameter 14 cm",
    "skill": "recognise centre, radius, diameter, chord, arc and sector"
  },
  {
    "no": "5.2",
    "title": "Circumference of a Circle",
    "formula": "C = 2πr = πd",
    "example": "r = 7 cm, C = 44 cm using π = 22/7",
    "skill": "choose radius or diameter formula correctly"
  },
  {
    "no": "5.3",
    "title": "Area of a Circle",
    "formula": "A = πr^2",
    "example": "r = 7 cm, A = 154 cm^2 using π = 22/7",
    "skill": "square the radius before multiplying by pi"
  }
];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c5-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 5",
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

export const mathF2C5FlashcardsDLP: Flashcard[] = buildFlashcards(makeSeeds());
