import type { Difficulty, QuizQuestion } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type QuizSeed = [Difficulty, string, [string, string, string, string], number, string];

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

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `math-f2-c12-dlp-q${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    difficulty,
    chapter: "Chapter 12",
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
      "A final check avoids common mistakes in Chapter 12. Reference example: " + t.example + ".",
    ]);
  }
  return seeds;
}

export const mathF2C12QuizzesDLP: QuizQuestion[] = buildQuiz(makeSeeds());
