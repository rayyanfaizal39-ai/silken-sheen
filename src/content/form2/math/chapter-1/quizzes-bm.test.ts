import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { mathF2C1QuizzesDLP } from "./quizzes-dlp";
import {
  mathF2C1ChallengeQuizzesBM,
  mathF2C1FoundationQuizzesBM,
  mathF2C1PracticeQuizzesBM,
  mathF2C1QuizzesBM,
} from "./quizzes-bm";

const expectedAnswers = {
  foundation: [
    "Aturan atau corak tertentu bagi nombor atau objek",
    "21",
    "Tolak 3",
    "48",
    "10",
    "34",
    "63",
    "8",
    "21",
    "1",
    "1, 4, 6, 4, 1",
    "Susunan nombor atau objek yang mengikut suatu pola",
    "22",
    "33",
    "1 250",
    "9",
    "18",
    "24",
    "T₅",
    "4n",
    "5, 10, 15, 20, …",
    "Tambah 7",
    "Bahagi nombor sebelumnya dengan 2",
    "2, 5, 8, 11, …",
    "12",
    "2.5",
    "−6",
    "8",
    "−3",
    "11",
  ],
  practice: [
    "46, 54",
    "53, 35",
    "121.5",
    "40",
    "16",
    "34",
    "T₆",
    "T₆",
    "5n + 1",
    "4n − 6",
    "23",
    "8",
    "34, 55",
    "21",
    "6",
    "1, 6, 15, 20, 15, 6, 1",
    "13, 23, 33, 43",
    "+10",
    "2½",
    "0.2",
    "2, 8, 32, 128, …",
    "243, 81, 27, 9, …",
    "29",
    "24",
    "9:10 pagi",
    "4 jam",
    "2:15 petang",
    "16",
    "6",
    "Pola +7 dan Tₙ = 7n",
  ],
  challenge: [
    "48, 63",
    "10, 2",
    "54, 58",
    "68",
    "95",
    "40",
    "127",
    "28",
    "7n + 4",
    "22 − 4n",
    "67",
    "T₉",
    "−23",
    "T₈",
    "5n − 1",
    "99",
    "Salah; sebutan seterusnya ialah 13",
    "30",
    "6",
    "76",
    "9:20 pagi",
    "11:35 pagi",
    "2:30 petang",
    "62",
    "Corak 20",
    "Ya, kerana T₁₅ = −5 + 14(7) = 93",
    "Kedua-duanya bertambah dengan nilai yang sama",
    "26",
    "4",
    "T₃",
  ],
} as const;

const objectiveBanks = [
  ["foundation", mathF2C1FoundationQuizzesBM, expectedAnswers.foundation],
  ["practice", mathF2C1PracticeQuizzesBM, expectedAnswers.practice],
  ["challenge", mathF2C1ChallengeQuizzesBM, expectedAnswers.challenge],
] as const;

describe("Matematik Tingkatan 2 Bab 1 bank kuiz BM dikurasi", () => {
  it.each(objectiveBanks)("mengekalkan %s sebagai Objective 30-soalan berasingan", (_, bank) => {
    expect(bank).toHaveLength(30);
  });

  it("mengandungi tepat 90 soalan sah dengan ID dan teks unik", () => {
    expect(mathF2C1QuizzesBM).toHaveLength(90);
    expect(new Set(mathF2C1QuizzesBM.map(({ id }) => id)).size).toBe(90);
    expect(new Set(mathF2C1QuizzesBM.map(({ question }) => question)).size).toBe(90);

    mathF2C1QuizzesBM.forEach((question) => {
      expect(question.subjectId).toBe("math");
      expect(question.form).toBe("Form 2");
      expect(question.chapter).toBe("Chapter 1");
      expect(question.lang).toBe("bm");
      expect(question.options).toHaveLength(4);
      expect(question.answerIndex).toBeGreaterThanOrEqual(0);
      expect(question.answerIndex).toBeLessThan(4);
      expect(question.explanation?.trim()).toBeTruthy();
    });
  });

  it.each(objectiveBanks)("mengesahkan semua jawapan Matematik bagi %s", (_, bank, answers) => {
    expect(bank.map(({ options, answerIndex }) => options[answerIndex])).toEqual(answers);
  });

  it("mengekalkan peningkatan kesukaran yang ditetapkan", () => {
    expect(mathF2C1FoundationQuizzesBM.every(({ difficulty }) => difficulty === "Easy")).toBe(true);
    expect(mathF2C1PracticeQuizzesBM.every(({ difficulty }) => difficulty === "Medium")).toBe(true);
    expect(
      mathF2C1ChallengeQuizzesBM.slice(0, 15).every(({ difficulty }) => difficulty === "Medium"),
    ).toBe(true);
    expect(
      mathF2C1ChallengeQuizzesBM.slice(15).every(({ difficulty }) => difficulty === "Hard"),
    ).toBe(true);
  });

  it("membuang prompt legacy BM", () => {
    const questions = new Set(mathF2C1QuizzesBM.map(({ question }) => question));
    expect(questions.has("Apakah maksud corak?")).toBe(false);
    expect(questions.has("Operasi manakah boleh membentuk corak nombor?")).toBe(false);
    expect(questions.has("Formula selang masa dalam nota ialah")).toBe(false);
  });

  it("mengasingkan metadata dan teks bank BM daripada DLP", () => {
    expect(mathF2C1QuizzesDLP.every(({ lang }) => lang === "dlp")).toBe(true);
    const dlpQuestions = new Set(mathF2C1QuizzesDLP.map(({ question }) => question));
    expect(mathF2C1QuizzesBM.some(({ question }) => dlpQuestions.has(question))).toBe(false);
  });
});

describe("Kontrak pemilihan Objective Matematik Tingkatan 2 Bab 1 BM", () => {
  const routeSource = readFileSync(
    new URL("../../../../routes/quizzes.tsx", import.meta.url),
    "utf8",
  );

  it("memilih bank BM hanya untuk laluan kandungan BM Bab 1", () => {
    expect(routeSource).toContain("const MATH_F2_C1_BM_OBJECTIVE_BANK");
    expect(routeSource).toContain('scienceLang === "bm"');
    expect(routeSource).toContain("MATH_F2_C1_BM_OBJECTIVE_BANK[mathObjectiveId]");
    expect(routeSource).toContain("MATH_F2_C1_DLP_OBJECTIVE_BANK[mathObjectiveId]");
    expect(routeSource).toContain("isForm2Chapter1DlpObjective || isForm2Chapter1BmObjective");
  });

  it("mengekalkan pengendali skor, penerangan, keputusan dan retry sedia ada", () => {
    expect(routeSource).toContain("function answerMathObjective(i: number)");
    expect(routeSource).toContain("i === currentMathQuestion.answerIndex");
    expect(routeSource).toContain("current.explanation");
    expect(routeSource).toContain("function nextMathObjectiveQuestion()");
    expect(routeSource).toContain("onRetry={() =>");
    expect(routeSource).toContain('setMathObjectivePhase("intro")');
  });
});
