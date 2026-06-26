import type { Difficulty, QuizQuestion } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type QuizSeed = [Difficulty, string, [string, string, string, string], number, string];

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

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `math-f2-c3-dlp-q${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    difficulty,
    chapter: "Chapter 3",
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
      "A final check avoids common mistakes in Chapter 3. Reference example: " + t.example + ".",
    ]);
  }
  return seeds;
}

export const mathF2C3QuizzesDLP: QuizQuestion[] = buildQuiz(makeSeeds());
