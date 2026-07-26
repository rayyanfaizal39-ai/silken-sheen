import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { QuizPreviewEditor } from "@/components/admin/quiz-importer/QuizPreviewEditor";
import {
  createQuizExportPackage,
  convertToExistingQuizSchema,
} from "./convertToExistingQuizSchema";
import { detectQuizDuplicates } from "./detectQuizDuplicates";
import { createImportedQuestion } from "./normaliseImportedQuiz";
import { parseNotebookLmQuiz } from "./parseNotebookLmQuiz";
import type { QuizDestination } from "./types";
import { validateImportedQuestion, validateImportedQuiz } from "./validateImportedQuiz";

const destination: QuizDestination = {
  language: "bm",
  form: "Form 1",
  subjectId: "science",
  chapterKey: "Chapter 3",
  quizSet: "chapter",
  difficulty: "Medium",
};

const PLAIN_TEXT = `Question: Apakah maksud homeostasis?
A. Proses pembiakan
B. Pengekalan persekitaran dalaman yang stabil
C. Pergerakan organisma
D. Penghasilan cahaya
Correct Answer: B
Explanation: Homeostasis mengekalkan keadaan dalaman badan.`;

function jsonQuestion(index: number, correctAnswer = "B") {
  return {
    question: `JSON question ${index}`,
    options: [`Option A ${index}`, `Option B ${index}`, `Option C ${index}`, `Option D ${index}`],
    correctAnswer,
    explanation: `Explanation ${index}`,
  };
}

describe("parseNotebookLmQuiz", () => {
  it("parses correctly formatted plain text", () => {
    const result = parseNotebookLmQuiz(PLAIN_TEXT);
    expect(result.format).toBe("text");
    expect(result.questions).toHaveLength(1);
    expect(result.questions[0].question).toBe("Apakah maksud homeostasis?");
    expect(result.questions[0].options.map((option) => option.text)).toEqual([
      "Proses pembiakan",
      "Pengekalan persekitaran dalaman yang stabil",
      "Pergerakan organisma",
      "Penghasilan cahaya",
    ]);
    expect(result.questions[0].correctOptionId).toBe(result.questions[0].options[1].id);
  });

  it("supports Malay Jawapan labels", () => {
    const result = parseNotebookLmQuiz(PLAIN_TEXT.replace("Correct Answer: B", "Jawapan: B"));
    expect(result.questions[0].correctOptionId).toBe(result.questions[0].options[1].id);
  });

  it("parses a JSON array with common field names", () => {
    const result = parseNotebookLmQuiz(
      JSON.stringify([
        {
          prompt: "Pilih planet ketiga.",
          choices: ["Utarid", "Zuhrah", "Bumi", "Marikh"],
          answerIndex: 2,
          reason: "Bumi ialah planet ketiga.",
        },
      ]),
    );
    expect(result.format).toBe("json");
    expect(result.questions[0].question).toBe("Pilih planet ketiga.");
    expect(result.questions[0].correctOptionId).toBe(result.questions[0].options[2].id);
    expect(result.questions[0].explanation).toBe("Bumi ialah planet ketiga.");
  });

  it("maps one standard JSON object to one complete question card", () => {
    const rawJson = JSON.stringify([jsonQuestion(1)]);
    const result = parseNotebookLmQuiz(rawJson);
    const question = result.questions[0];

    expect(result.format).toBe("json");
    expect(result.questions).toHaveLength(1);
    expect(question.question).toBe("JSON question 1");
    expect(question.question).not.toContain(rawJson);
    expect(question.options.map((option) => option.text)).toEqual([
      "Option A 1",
      "Option B 1",
      "Option C 1",
      "Option D 1",
    ]);
    expect(question.correctOptionId).toBe(question.options[1].id);
    expect(question.explanation).toBe("Explanation 1");
  });

  it("creates exactly twenty-eight questions from a root JSON array", () => {
    const rawJson = JSON.stringify(
      Array.from({ length: 28 }, (_, index) => jsonQuestion(index + 1)),
    );
    const result = parseNotebookLmQuiz(rawJson);

    expect(result.format).toBe("json");
    expect(result.questions).toHaveLength(28);
    expect(new Set(result.questions.map((question) => question.id)).size).toBe(28);
    expect(
      result.questions.every((question) => question.options.every((option) => option.text)),
    ).toBe(true);
    expect(
      result.questions.every(
        (question) => !question.question.includes("{") && !question.question.includes("["),
      ),
    ).toBe(true);
    expect(result.questions[27].explanation).toBe("Explanation 28");
  });

  it("removes a Markdown JSON code fence before parsing", () => {
    const result = parseNotebookLmQuiz(
      `\`\`\`json\n${JSON.stringify([jsonQuestion(1)], null, 2)}\n\`\`\``,
    );

    expect(result.format).toBe("json");
    expect(result.questions).toHaveLength(1);
    expect(result.questions[0].question).toBe("JSON question 1");
  });

  it('accepts an object containing a "questions" array', () => {
    const result = parseNotebookLmQuiz(
      JSON.stringify({ questions: [jsonQuestion(1), jsonQuestion(2)] }),
    );

    expect(result.format).toBe("json");
    expect(result.questions).toHaveLength(2);
    expect(result.questions.map((question) => question.question)).toEqual([
      "JSON question 1",
      "JSON question 2",
    ]);
  });

  it.each([
    ["A", 0],
    ["B", 1],
    ["C", 2],
    ["D", 3],
  ])("maps correctAnswer %s to option index %i", (letter, expectedIndex) => {
    const result = parseNotebookLmQuiz(JSON.stringify([jsonQuestion(1, letter)]));
    const question = result.questions[0];

    expect(question.correctOptionId).toBe(question.options[expectedIndex].id);
  });

  it("reports the JSON syntax error without creating a raw-text question", () => {
    const result = parseNotebookLmQuiz('[{"question":"Broken",}]');

    expect(result.format).toBe("json");
    expect(result.questions).toHaveLength(0);
    expect(result.warnings.join(" ")).toMatch(/JSON parsing failed:/);
  });

  it("renders the 28-question UI summary as 28 valid and 0 invalid", () => {
    const parsed = parseNotebookLmQuiz(
      JSON.stringify(Array.from({ length: 28 }, (_, index) => jsonQuestion(index + 1))),
    );
    const validations = validateImportedQuiz(parsed.questions);
    const html = renderToStaticMarkup(
      createElement(QuizPreviewEditor, {
        questions: parsed.questions,
        validations,
        duplicates: [],
        onChange: () => undefined,
      }),
    );

    expect(validations.filter((validation) => validation.valid)).toHaveLength(28);
    expect(html).toContain("<span>Total detected</span><strong>28</strong>");
    expect(html).toContain('<span>Valid</span><strong class="success">28</strong>');
    expect(html).toContain('<span>Invalid</span><strong class="danger">0</strong>');
    expect(html.match(/id="quiz-question-/g)).toHaveLength(28);
  });

  it("accepts the common JSON answers field", () => {
    const result = parseNotebookLmQuiz(
      JSON.stringify([
        {
          text: "Pilih B.",
          choices: ["A", "B", "C", "D"],
          answers: "B",
        },
      ]),
    );
    expect(result.questions[0].correctOptionId).toBe(result.questions[0].options[1].id);
  });

  it("never guesses a missing correct answer", () => {
    const result = parseNotebookLmQuiz(PLAIN_TEXT.replace("Correct Answer: B\n", ""));
    expect(result.questions[0].correctOptionId).toBeNull();
    expect(result.questions[0].parserWarnings.join(" ")).toMatch(/No correct answer/i);
  });

  it("preserves a multi-line explanation", () => {
    const result = parseNotebookLmQuiz(
      `${PLAIN_TEXT}\nBaris kedua menerangkan sebabnya.\nBaris ketiga juga dikekalkan.`,
    );
    expect(result.questions[0].explanation).toContain("Baris kedua");
    expect(result.questions[0].explanation).toContain("Baris ketiga");
  });

  it("parses twenty-eight numbered questions", () => {
    const input = Array.from(
      { length: 28 },
      (_, index) => `${index + 1}. Soalan nombor ${index + 1}?
A) Pilihan A
B) Pilihan B
C) Pilihan C
D) Pilihan D
Answer: A
Explanation: Penerangan ${index + 1}.`,
    ).join("\n\n");
    const result = parseNotebookLmQuiz(input);
    expect(result.questions).toHaveLength(28);
    expect(result.questions[27].question).toBe("Soalan nombor 28?");
  });

  it("supports numbered option formats", () => {
    const result = parseNotebookLmQuiz(`Question: Pilih jawapan.
1) Satu
2) Dua
3. Tiga
4. Empat
Answer: D`);
    expect(result.questions[0].options.map((option) => option.text)).toEqual([
      "Satu",
      "Dua",
      "Tiga",
      "Empat",
    ]);
    expect(result.questions[0].correctOptionId).toBe(result.questions[0].options[3].id);
  });

  it("flags ambiguous numeric correct answers", () => {
    const result = parseNotebookLmQuiz(
      JSON.stringify([
        {
          question: "Ambiguous?",
          options: ["A", "B", "C", "D"],
          correctAnswer: 2,
        },
      ]),
    );
    expect(result.questions[0].correctOptionId).toBeNull();
    expect(result.questions[0].parserWarnings.join(" ")).toMatch(/ambiguous/i);
  });
});

describe("quiz importer validation", () => {
  it("rejects a missing option", () => {
    const question = createImportedQuestion({
      question: "Soalan?",
      options: ["A", "", "C", "D"],
    });
    question.correctOptionId = question.options[0].id;
    const result = validateImportedQuestion(question);
    expect(result.valid).toBe(false);
    expect(result.issues.some((issue) => issue.code === "option_required")).toBe(true);
  });

  it("rejects duplicate options after harmless punctuation differences", () => {
    const question = createImportedQuestion({
      question: "Soalan?",
      options: ["Jawapan betul", "Jawapan betul!", "C", "D"],
    });
    question.correctOptionId = question.options[0].id;
    const result = validateImportedQuestion(question);
    expect(result.issues.some((issue) => issue.code === "duplicate_option")).toBe(true);
  });
});

describe("duplicate detection", () => {
  it("finds exact and near duplicate questions", () => {
    const imported = [
      createImportedQuestion({
        question: "Apakah maksud homeostasis?",
        options: ["A", "B"],
      }),
      createImportedQuestion({
        question: "Apakah maksud homeostasis dalam badan?",
        options: ["A", "B"],
      }),
    ];
    const matches = detectQuizDuplicates(imported, [
      { id: "existing-1", question: "Apakah maksud homeostasis!" },
    ]);
    expect(matches[0]).toMatchObject({
      questionId: imported[0].id,
      kind: "exact",
      source: "existing",
    });
    expect(matches.some((match) => match.questionId === imported[1].id)).toBe(true);
  });
});

describe("schema conversion", () => {
  it("converts into the existing AcadeMY QuizQuestion schema", () => {
    const question = createImportedQuestion({
      question: "Apakah maksud homeostasis?",
      options: ["A", "B", "C", "D"],
      explanation: "Penerangan.",
    });
    question.correctOptionId = question.options[1].id;
    const converted = convertToExistingQuizSchema([question], destination, 10);
    expect(converted).toEqual([
      {
        id: "sci-f1-c3-bm-chapter-q11",
        subjectId: "science",
        form: "Form 1",
        chapter: "Chapter 3",
        lang: "bm",
        difficulty: "Medium",
        question: "Apakah maksud homeostasis?",
        options: ["A", "B", "C", "D"],
        answerIndex: 1,
        explanation: "Penerangan.",
      },
    ]);
  });

  it("creates a non-destructive TypeScript export package", () => {
    const question = createImportedQuestion({
      question: "Soalan?",
      options: ["A", "B"],
    });
    question.correctOptionId = question.options[0].id;
    const result = createQuizExportPackage([question], destination);
    expect(result.destinationPath).toBe("src/content/form1/science/chapter-3/quizzes-bm.ts");
    expect(result.source).toContain("QuizQuestion[]");
    expect(result.source).toContain('"answerIndex": 0');
  });
});
