import type { Difficulty, QuizQuestion } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type QuizSeed = [Difficulty, string, [string, string, string, string], number, string];

const topics: Topic[] = [
  {
    "no": "7.1",
    "title": "Cartesian Plane",
    "formula": "coordinate = (x, y)",
    "example": "(3, -2) means x=3 and y=-2",
    "skill": "move along x-axis first, then y-axis"
  },
  {
    "no": "7.2",
    "title": "Distance Between Two Points",
    "formula": "horizontal or vertical distance = difference of coordinates",
    "example": "from (2, 5) to (2, 9), distance = 4 units",
    "skill": "compare the changing coordinate"
  },
  {
    "no": "7.3",
    "title": "Midpoint",
    "formula": "midpoint = ((x1 + x2)/2, (y1 + y2)/2)",
    "example": "midpoint of (2,4) and (6,8) is (4,6)",
    "skill": "average x-values and y-values separately"
  }
];

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `math-f2-c7-dlp-q${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    difficulty,
    chapter: "Chapter 7",
    lang: "dlp",
    question,
    options,
    answerIndex,
    explanation,
  }));
}

function topic(index: number) {
  return topics[index % topics.length];
}

function makeSeeds(): QuizSeed[] {
  const seeds: QuizSeed[] = [];
  for (let i = 0; i < 30; i++) {
    const t = topic(i);
    seeds.push([
      "Easy",
      `What is the main focus of ${t.no} ${t.title}? (Check ${i + 1})`,
      [
        t.skill,
        `copying the title without calculation`,
        `changing every value to zero`,
        `ignoring the given information`,
      ],
      0,
      `This subtopic focuses on the skill to ${t.skill}.`,
    ]);
  }
  for (let i = 0; i < 30; i++) {
    const t = topic(i + 1);
    seeds.push([
      "Medium",
      `Which formula best matches ${t.no} ${t.title}? (Practice ${i + 1})`,
      [
        t.formula,
        `answer = question / title`,
        `total = 0 for every case`,
        `final value = initial value only`,
      ],
      0,
      `The matching formula is ${t.formula}; then substitute the given values.`,
    ]);
  }
  for (let i = 0; i < 30; i++) {
    const t = topic(i + 2);
    seeds.push([
      "Hard",
      `In a word problem on ${t.no} ${t.title}, what is the best check after getting an answer? (Challenge ${i + 1})`,
      [
        `check the formula, signs, units and simplest form`,
        `erase all working steps`,
        `choose the longest option`,
        `change the topic to another chapter`,
      ],
      0,
      "A final check avoids common mistakes in Chapter 7. Reference example: " + t.example + ".",
    ]);
  }
  return seeds;
}

export const mathF2C7QuizzesDLP: QuizQuestion[] = buildQuiz(makeSeeds());
