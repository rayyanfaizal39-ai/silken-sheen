import type { Difficulty, QuizQuestion } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type QuizSeed = [Difficulty, string, [string, string, string, string], number, string];

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

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `math-f2-c2-dlp-q${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    difficulty,
    chapter: "Chapter 2",
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
      "A final check avoids common mistakes in Chapter 2. Reference example: " + t.example + ".",
    ]);
  }
  return seeds;
}

export const mathF2C2QuizzesDLP: QuizQuestion[] = buildQuiz(makeSeeds());
