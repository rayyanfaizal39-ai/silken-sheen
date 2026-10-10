import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildQuizCatalog } from "./buildQuizCatalog";
import { renderQuizCatalogSql } from "./quizCatalogSql";
import { createQuizXpDb, registered } from "../xp/quizXpDbHarness";
import { calculateOriginalQuizXp } from "../xp/quizXp";
const migration = readFileSync(
  new URL(
    "../../../../supabase/migrations/20261010010000_sync_form3_math_quiz_sets.sql",
    import.meta.url,
  ),
  "utf8",
);

describe("Form 3 maths set catalog migration and saved results", () => {
  it("matches the runtime sets and only changes Form 3 standard maths catalog rows", async () => {
    const catalog = buildQuizCatalog();
    expect(migration).toBe(renderQuizCatalogSql(catalog, "math-f3"));
    const rows = catalog.quizzes.filter(
      (q) => q.kind === "standard" && q.subjectId === "math" && q.form === 3,
    );
    expect(rows).toHaveLength(36);
    for (const row of rows)
      expect([
        row.totalQuestions,
        row.easyCount,
        row.mediumCount,
        row.hardCount,
      ]).toEqual([25, 10, 10, 5]);
    const h = await createQuizXpDb();
    const userId = "aaaaaaaa-0000-4000-8000-000000000001";
    await h.addUser(userId);
    const oldKey =
      "quiz-v2:standard:math:form-3:chapter-1:bm:set-default:difficulty-all";
    await h.completeCatalogQuiz(registered(userId), {
      completionId: "cccccccc-0000-4000-8000-000000000001",
      quizKey: oldKey,
      correctEasy: 1,
      correctMedium: 0,
      correctHard: 0,
      timerMode: "none",
    });
    const historyBefore = await h.historyOf(userId);
    const otherSql =
      "select * from public.quiz_catalog where not (kind = 'standard' and subject_id = 'math' and form = 3) order by quiz_key";
    const otherBefore = (await h.db.query(otherSql)).rows;
    await h.db.exec(migration);
    expect((await h.db.query(otherSql)).rows).toEqual(otherBefore);
    expect(await h.historyOf(userId)).toEqual(historyBefore);
    const active = await h.db.query<{
      quiz_key: string;
      total_questions: number;
    }>(
      "select quiz_key, total_questions from public.quiz_catalog where is_active and kind = 'standard' and subject_id = 'math' and form = 3",
    );
    expect(active.rows).toHaveLength(36);
    expect(active.rows.every((r) => r.total_questions === 25)).toBe(true);
    expect(active.rows.some((r) => r.quiz_key === oldKey)).toBe(false);
    const perfectXp = calculateOriginalQuizXp({
      correct: { easy: 10, medium: 10, hard: 5 },
      total: 25,
      formula: "standard",
      timerMode: "none",
    }).totalXp;
    let seq = 2;
    const submit = (set: string) =>
      h.completeCatalogQuiz(registered(userId), {
        completionId: `cccccccc-0000-4000-8000-${String(seq++).padStart(12, "0")}`,
        quizKey: `quiz-v2:standard:math:form-3:chapter-1:bm:set-${set}:difficulty-all`,
        correctEasy: 10,
        correctMedium: 10,
        correctHard: 5,
        timerMode: "none",
      });
    expect(await submit("a")).toMatchObject({
      awarded: true,
      xpEarned: perfectXp,
    });
    expect(await submit("b")).toMatchObject({
      awarded: true,
      xpEarned: perfectXp,
    });
    expect(await submit("a")).toMatchObject({ awarded: false, xpEarned: 0 });
    const after = (
      await h.db.query<Record<string, unknown>>(
        "select * from public.quiz_catalog order by quiz_key",
      )
    ).rows;
    await h.db.exec(migration);
    expect(
      (
        await h.db.query<Record<string, unknown>>(
          "select * from public.quiz_catalog order by quiz_key",
        )
      ).rows.map(({ updated_at, ...r }) => r),
    ).toEqual(after.map(({ updated_at, ...r }) => r));
    await h.db.close();
  }, 120_000);
});
