import { readdirSync, readFileSync } from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";
import { buildQuizCatalog, maxXpFor, type QuizCatalog } from "./buildQuizCatalog";
import { QUIZ_CATALOG_MIGRATION_PATTERN, renderQuizCatalogSql } from "./quizCatalogSql";
import { buildCanonicalQuizKey } from "@/features/quiz/xp/quizXp";

const migrationsDir = new URL("../../../../supabase/migrations/", import.meta.url);

describe("server quiz catalog", () => {
  let catalog: QuizCatalog;

  beforeAll(() => {
    catalog = buildQuizCatalog();
  }, 120_000);

  it("is generated deterministically", () => {
    expect(renderQuizCatalogSql(buildQuizCatalog())).toBe(renderQuizCatalogSql(catalog));
  });

  it("matches the latest catalog migration (run npm run generate:quiz-catalog)", () => {
    const latest = readdirSync(migrationsDir)
      .filter((name) => QUIZ_CATALOG_MIGRATION_PATTERN.test(name))
      .sort()
      .at(-1);
    expect(latest).toBeDefined();
    const applied = readFileSync(new URL(latest!, migrationsDir), "utf8").replace(/\r\n/g, "\n");
    expect(applied).toBe(renderQuizCatalogSql(catalog));
  });

  it("catalogs Science F1 Chapter 7 as 30 questions: 15 Easy, 10 Medium, 5 Hard", () => {
    const key = buildCanonicalQuizKey({
      kind: "standard",
      subjectId: "science",
      form: "Form 1",
      chapterKey: "Chapter 7",
      lang: "bm",
      set: null,
      difficulty: "All",
    });
    expect(catalog.quizzes.find((q) => q.quizKey === key)).toMatchObject({
      formula: "standard",
      subjectId: "science",
      chapterKey: "Chapter 7",
      totalQuestions: 30,
      easyCount: 15,
      mediumCount: 10,
      hardCount: 5,
      timerBonusAllowed: true,
      maxXp: 1125,
    });
  });

  it("covers every quiz type", () => {
    const kinds = new Set(catalog.quizzes.map((q) => q.kind));
    expect([...kinds].sort()).toEqual(["bm-world", "english", "math-objective", "standard"]);
    expect(catalog.quizzes.length).toBeGreaterThan(800);
  });

  it("keeps every row internally consistent and within the database limits", () => {
    const keys = new Set<string>();
    for (const quiz of catalog.quizzes) {
      expect(keys.has(quiz.quizKey)).toBe(false);
      keys.add(quiz.quizKey);
      expect(quiz.quizKey.length).toBeLessThanOrEqual(240);
      expect(quiz.chapterKey.length).toBeLessThanOrEqual(160);
      expect(quiz.totalQuestions).toBeGreaterThan(0);
      expect(quiz.totalQuestions).toBeLessThanOrEqual(500);
      expect(quiz.easyCount + quiz.mediumCount + quiz.hardCount).toBe(quiz.totalQuestions);
      expect(quiz.timerBonusAllowed).toBe(quiz.formula === "standard");
      expect(quiz.maxXp).toBe(maxXpFor(quiz.formula, quiz));
    }
  });

  it("only allows timer XP on standard quizzes", () => {
    for (const quiz of catalog.quizzes) {
      if (quiz.kind !== "standard") expect(quiz.timerBonusAllowed).toBe(false);
    }
  });

  it("treats Sejarah's difficulty filter as one quiz", () => {
    const sejarah = catalog.quizzes.filter((q) => q.subjectId === "sejarah" && q.kind === "standard");
    expect(sejarah.length).toBeGreaterThan(0);
    for (const quiz of sejarah) expect(quiz.quizKey).toMatch(/:difficulty-all$/);
  });

  it("maps every legacy key to a real catalog quiz", () => {
    const keys = new Set(catalog.quizzes.map((q) => q.quizKey));
    expect(catalog.legacyKeys.length).toBeGreaterThan(0);
    for (const row of catalog.legacyKeys) {
      expect(row.legacyKey).toMatch(/^quiz-v1:/);
      expect(keys.has(row.quizKey)).toBe(true);
    }
  });
});
