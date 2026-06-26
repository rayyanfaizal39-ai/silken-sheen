import type { Difficulty, QuizQuestion } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type QuizSeed = [Difficulty, string, [string, string, string, string], number, string];

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

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `math-f2-c13-dlp-q${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    difficulty,
    chapter: "Chapter 13",
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
      "A final check avoids common mistakes in Chapter 13. Reference example: " + t.example + ".",
    ]);
  }
  return seeds;
}

export const mathF2C13QuizzesDLP: QuizQuestion[] = buildQuiz(makeSeeds());
