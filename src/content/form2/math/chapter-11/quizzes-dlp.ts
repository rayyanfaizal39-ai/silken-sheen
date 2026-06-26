import type { Difficulty, QuizQuestion } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type QuizSeed = [Difficulty, string, [string, string, string, string], number, string];

const topics: Topic[] = [
  {
    "no": "11.1",
    "title": "Reflection",
    "formula": "object and image are the same distance from mirror line",
    "example": "reflection in x-axis maps (x, y) to (x, -y)",
    "skill": "use a mirror line and equal perpendicular distances"
  },
  {
    "no": "11.2",
    "title": "Rotation",
    "formula": "rotation needs centre, angle and direction",
    "example": "90° clockwise about O changes orientation but not size",
    "skill": "state centre, angle and direction"
  },
  {
    "no": "11.3",
    "title": "Translation",
    "formula": "translation vector = (movement in x, movement in y)",
    "example": "vector (3, -2) moves 3 right and 2 down",
    "skill": "move every point by the same vector"
  },
  {
    "no": "11.4",
    "title": "Congruence",
    "formula": "isometry preserves shape and size",
    "example": "object and image are congruent after reflection, rotation or translation",
    "skill": "check same shape and same size"
  }
];

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `math-f2-c11-dlp-q${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    difficulty,
    chapter: "Chapter 11",
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
      "A final check avoids common mistakes in Chapter 11. Reference example: " + t.example + ".",
    ]);
  }
  return seeds;
}

export const mathF2C11QuizzesDLP: QuizQuestion[] = buildQuiz(makeSeeds());
