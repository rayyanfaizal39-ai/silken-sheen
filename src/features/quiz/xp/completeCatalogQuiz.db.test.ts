import { beforeAll, describe, expect, it } from "vitest";
import { buildQuizKey, calculateOriginalQuizXp, type QuizXpFormula } from "./quizXp";
import { createQuizXpDb, registered, type CatalogQuizArgs } from "./quizXpDbHarness";

// complete_catalog_quiz(): the original quiz XP economy, priced by the server
// from its catalog, executed against the real migrations in PGlite.
const TIMEOUT = 120_000;

let seq = 0;
const uuid = (prefix: number) =>
  `${prefix.toString(16).padStart(8, "0")}-0000-4000-8000-${(++seq).toString(16).padStart(12, "0")}`;
const newUserId = () => uuid(0xa);
const newCompletionId = () => uuid(0xc);

// Real catalog entries (see the generated seed migration).
const SCIENCE_F1_C7 = "quiz-v2:standard:science:form-1:chapter-7:bm:set-default:difficulty-all"; // 15/10/5
const ENGLISH_F1_A = "quiz-v2:english:english:form-1:paper-1:en:objective-a"; // 17/13/0
const MATH_F1_C1_O3 = "quiz-v2:math-objective:math:form-1:chapter-1:bm:objective-3"; // 0/16/14
const BM_F1_SET_A = "quiz-v2:bm-world:bm:form-1:kertas-1-objektif:bm:bm-f1-obj1"; // 0/15/0

function result(
  quizKey: string,
  [correctEasy, correctMedium, correctHard]: [number, number, number],
  timerMode: string | null = "none",
): CatalogQuizArgs {
  return {
    completionId: newCompletionId(),
    quizKey,
    correctEasy,
    correctMedium,
    correctHard,
    timerMode,
  };
}

describe("complete_catalog_quiz: original economy", () => {
  let h: Awaited<ReturnType<typeof createQuizXpDb>>;

  async function freshUser(progress: { xp?: number; subjectXp?: unknown } | undefined = {}) {
    const userId = newUserId();
    await h.addUser(userId, progress);
    return userId;
  }

  beforeAll(async () => {
    h = await createQuizXpDb();
  }, TIMEOUT);

  it.each([
    ["none", 675],
    ["60", 825],
    ["30", 975],
    ["15", 1125],
  ])("Science F1 Ch7 30/30 with timer %s awards %i XP", async (timer, expected) => {
    const userId = await freshUser();
    const awarded = await h.completeCatalogQuiz(
      registered(userId),
      result(SCIENCE_F1_C7, [15, 10, 5], timer),
    );
    expect(awarded).toMatchObject({
      awarded: true,
      xpEarned: expected,
      baseXp: 500,
      correctBonusXp: 150,
      timerBonusXp: expected - 675,
      passBonusXp: 25,
      scorePct: 100,
    });
    expect(await h.progressOf(userId)).toMatchObject({
      xp: expected,
      subject_xp: { science: expected },
    });
  });

  it.each([
    ["4 Easy wrong", "none", 615, [11, 10, 5]],
    ["4 Easy wrong", "60", 745, [11, 10, 5]],
    ["4 Easy wrong", "30", 875, [11, 10, 5]],
    ["4 Easy wrong", "15", 1005, [11, 10, 5]],
    ["4 Hard wrong", "none", 535, [15, 10, 1]],
    ["4 Hard wrong", "60", 665, [15, 10, 1]],
    ["4 Hard wrong", "30", 795, [15, 10, 1]],
    ["4 Hard wrong", "15", 925, [15, 10, 1]],
  ] as const)(
    "Science F1 Ch7 26/30 (%s) with timer %s awards %i XP",
    async (_label, timer, expected, counts) => {
      const userId = await freshUser();
      await expect(
        h.completeCatalogQuiz(registered(userId), result(SCIENCE_F1_C7, [...counts], timer)),
      ).resolves.toMatchObject({ xpEarned: expected, scorePct: 87, passBonusXp: 25 });
    },
  );

  it("pays no pass bonus below 80%", async () => {
    const userId = await freshUser();
    // 23/30 = 77%.
    await expect(
      h.completeCatalogQuiz(registered(userId), result(SCIENCE_F1_C7, [15, 8, 0])),
    ).resolves.toMatchObject({ scorePct: 77, passBonusXp: 0, xpEarned: 15 * 15 + 8 * 25 });
  });

  it.each(["free", "pro", "premium"])("pays a %s account the same award", async (plan) => {
    const userId = await freshUser();
    const caller = registered(userId);
    caller.claims.app_metadata = { plan };
    await expect(
      h.completeCatalogQuiz(caller, result(SCIENCE_F1_C7, [15, 10, 5])),
    ).resolves.toMatchObject({ awarded: true, xpEarned: 675 });
  });

  it("prices English as difficulty + correct bonus + pass, ignoring a submitted timer", async () => {
    const userId = await freshUser();
    await expect(
      h.completeCatalogQuiz(registered(userId), result(ENGLISH_F1_A, [17, 13, 0], "15")),
    ).resolves.toMatchObject({ xpEarned: 605, timerBonusXp: 0 });
    expect((await h.historyOf(userId))[0]).toMatchObject({ subject_id: "english" });
  });

  it("prices Maths objective the same way, without timer XP", async () => {
    const userId = await freshUser();
    await expect(
      h.completeCatalogQuiz(registered(userId), result(MATH_F1_C1_O3, [0, 16, 14], "15")),
    ).resolves.toMatchObject({ xpEarned: 16 * 25 + 14 * 35 + 25, timerBonusXp: 0 });
  });

  it.each([
    [[0, 15, 0], 220],
    [[0, 13, 0], 190],
    [[0, 9, 0], 110],
    [[0, 5, 0], 60],
  ] as const)("prices BM World %j with its historical score band as %i XP", async (counts, expected) => {
    const userId = await freshUser();
    await expect(
      h.completeCatalogQuiz(registered(userId), result(BM_F1_SET_A, [...counts], "none")),
    ).resolves.toMatchObject({ xpEarned: expected });
    expect(await h.progressOf(userId)).toMatchObject({ subject_xp: { bm: expected } });
  });

  it("awards a quiz once: the second completion records practice at 0 XP", async () => {
    const userId = await freshUser({ xp: 100 });
    await h.completeCatalogQuiz(registered(userId), result(SCIENCE_F1_C7, [11, 10, 5], "30"));

    const retake = await h.completeCatalogQuiz(
      registered(userId),
      result(SCIENCE_F1_C7, [15, 10, 5], "15"),
    );

    expect(retake).toMatchObject({ accepted: true, eligible: true, awarded: false, xpEarned: 0 });
    expect(retake.potentialXp).toBe(1125);
    expect(await h.progressOf(userId)).toMatchObject({
      xp: 975,
      subject_xp: { science: 875 },
      quizzes_taken: 2,
    });
    expect(await h.historyOf(userId)).toMatchObject([
      { xp_earned: 875, xp_awarded: true },
      { xp_earned: 0, xp_awarded: false },
    ]);
    expect(await h.monthlyLeaderboardXp(userId)).toBe(875);
  });

  it("replays a duplicate completion id without awarding again", async () => {
    const userId = await freshUser();
    const quiz = result(SCIENCE_F1_C7, [15, 10, 5], "60");
    await h.completeCatalogQuiz(registered(userId), quiz);

    await expect(h.completeCatalogQuiz(registered(userId), quiz)).resolves.toMatchObject({
      accepted: false,
      xpEarned: 825,
      lifetimeXp: 825,
    });
    await expect(
      h.completeCatalogQuiz(registered(userId), { ...quiz, correctHard: 4 }),
    ).rejects.toThrow(/payload does not match/);
    expect(await h.progressOf(userId)).toMatchObject({ xp: 825, quizzes_taken: 1 });
    expect(await h.historyOf(userId)).toHaveLength(1);
  });

  it("keeps different quizzes and languages as separate awards", async () => {
    const userId = await freshUser();
    await h.completeCatalogQuiz(registered(userId), result(SCIENCE_F1_C7, [15, 10, 5]));
    await h.completeCatalogQuiz(
      registered(userId),
      result(SCIENCE_F1_C7.replace(":bm:", ":dlp:"), [15, 10, 5]),
    );
    expect(await h.progressOf(userId)).toMatchObject({ xp: 1350 });
  });

  it.each(["fake-quiz-1", "fake-quiz-2", "fake-quiz-3", "", SCIENCE_F1_C7.replace("7", "70")])(
    "rejects the unknown quiz key %j",
    async (quizKey) => {
      const userId = await freshUser();
      await expect(
        h.completeCatalogQuiz(registered(userId), result(quizKey, [1, 0, 0])),
      ).rejects.toThrow(/Unknown quiz/);
      expect(await h.progressOf(userId)).toMatchObject({ xp: 0 });
    },
  );

  it.each([
    ["too many Easy", [16, 10, 5]],
    ["too many Hard", [15, 10, 6]],
    ["negative", [-1, 10, 5]],
    ["Hard on an all-Medium set", [0, 0, 1]],
  ] as const)("rejects an impossible result (%s)", async (_label, counts) => {
    const userId = await freshUser();
    const key = counts[2] === 1 && counts[0] === 0 ? BM_F1_SET_A : SCIENCE_F1_C7;
    await expect(
      h.completeCatalogQuiz(registered(userId), result(key, [...counts])),
    ).rejects.toThrow(/Invalid quiz result/);
  });

  it.each(["45", "", "Timer", null, "15 "])("rejects the timer mode %j", async (timer) => {
    const userId = await freshUser();
    const request = result(SCIENCE_F1_C7, [1, 0, 0], timer);
    if (timer === "15 ") {
      // Surrounding whitespace is trimmed, like the other identifiers.
      await expect(h.completeCatalogQuiz(registered(userId), request)).resolves.toMatchObject({
        timerBonusXp: 15,
      });
      return;
    }
    await expect(h.completeCatalogQuiz(registered(userId), request)).rejects.toThrow(
      /Invalid timer mode/,
    );
  });

  it("rejects a malformed request", async () => {
    const userId = await freshUser();
    await expect(
      h.completeCatalogQuiz(registered(userId), { ...result(SCIENCE_F1_C7, [1, 0, 0]), completionId: null as unknown as string }),
    ).rejects.toThrow(/Completion id is required/);
    await expect(
      h.completeCatalogQuiz(registered(userId), { ...result(SCIENCE_F1_C7, [1, 0, 0]), correctMedium: null }),
    ).rejects.toThrow(/Invalid quiz result/);
  });

  it("creates the user_progress row for a brand-new registered user", async () => {
    const userId = newUserId();
    await h.addUser(userId); // no user_progress row
    await expect(
      h.completeCatalogQuiz(registered(userId), result(SCIENCE_F1_C7, [15, 10, 5], "15")),
    ).resolves.toMatchObject({ xpEarned: 1125, lifetimeXp: 1125, quizzesTaken: 1 });
  });

  it("tolerates malformed subject_xp without losing valid values", async () => {
    const userId = await freshUser({ xp: 5, subjectXp: { science: "abc", bm: 40, extra: [1] } });
    await expect(
      h.completeCatalogQuiz(registered(userId), result(SCIENCE_F1_C7, [15, 10, 5])),
    ).resolves.toMatchObject({ subjectXp: 675, lifetimeXp: 680 });
    expect((await h.progressOf(userId))?.subject_xp).toMatchObject({ bm: 40, extra: [1] });
  });

  it("takes subject and chapter from the catalog, not the browser", async () => {
    const userId = await freshUser();
    await h.completeCatalogQuiz(registered(userId), result(ENGLISH_F1_A, [1, 0, 0]));
    const { rows } = await h.db.query<{ subject_id: string; chapter_key: string; timer_mode: string }>(
      "select subject_id, chapter_key, timer_mode from public.quiz_history where user_id = $1",
      [userId],
    );
    expect(rows[0]).toEqual({ subject_id: "english", chapter_key: "Objective A", timer_mode: "none" });
  });

  it("gives guests no synced XP", async () => {
    const guestId = await freshUser();
    await expect(
      h.completeCatalogQuiz(
        { role: "authenticated", claims: { sub: guestId, is_anonymous: true } },
        result(SCIENCE_F1_C7, [15, 10, 5]),
      ),
    ).rejects.toThrow(/Registered account required/);
    await expect(
      h.completeCatalogQuiz({ role: "anon", claims: {} }, result(SCIENCE_F1_C7, [15, 10, 5])),
    ).rejects.toThrow(/permission denied/);
    expect(await h.progressOf(guestId)).toMatchObject({ xp: 0 });
  });

  it("counts XP the 2026-09-23 client already paid toward the same quiz", async () => {
    const userId = await freshUser();
    await h.completeQuiz(registered(userId), {
      completionId: newCompletionId(),
      quizKey: buildQuizKey({
        subjectId: "science",
        form: "Form 1",
        chapterKey: "Chapter 7",
        variant: "difficulty-All",
      }),
      subjectId: "science",
      chapterKey: "Chapter 7",
      correct: 25,
      total: 30,
    });

    await expect(
      h.completeCatalogQuiz(registered(userId), result(SCIENCE_F1_C7, [15, 10, 5])),
    ).resolves.toMatchObject({ xpEarned: 645, lifetimeXp: 675 });
  });

  it("enforces the catalog ceiling and known quizzes at the table level", async () => {
    const userId = await freshUser();
    await expect(
      h.db.query(
        `insert into public.quiz_xp_awards (user_id, quiz_key, completion_id, xp_earned)
         values ($1, $2, gen_random_uuid(), 1126)`,
        [userId, SCIENCE_F1_C7],
      ),
    ).rejects.toThrow();
    await expect(
      h.db.query(
        `insert into public.quiz_xp_awards (user_id, quiz_key, completion_id, xp_earned)
         values ($1, 'fake-quiz-1', gen_random_uuid(), 1)`,
        [userId],
      ),
    ).rejects.toThrow(/Unknown quiz/);
    await expect(
      h.db.query(
        `update public.quiz_catalog set max_xp = 99999 where quiz_key = $1`,
        [SCIENCE_F1_C7],
      ),
    ).rejects.toThrow(/check constraint/);
  });
});

describe("server formula matches the client mirror", () => {
  it(
    "for every formula, timer and a sweep of results",
    async () => {
      const h = await createQuizXpDb();
      const cases: [QuizXpFormula, number, number, number, number, string][] = [];
      for (const formula of ["standard", "objective", "bm_world"] as const) {
        for (const timer of ["none", "60", "30", "15"]) {
          for (const [e, m, hd, total] of [
            [0, 0, 0, 30],
            [15, 10, 5, 30],
            [11, 10, 5, 30],
            [12, 0, 0, 15],
            [7, 3, 2, 15],
            [3, 5, 1, 10],
            [0, 9, 0, 15],
            [2, 2, 2, 7],
          ]) {
            cases.push([formula, total, e, m, hd, timer]);
          }
        }
      }
      for (const [formula, total, e, m, hd, timer] of cases) {
        const { rows } = await h.db.query<Record<string, number>>(
          "select * from public.original_quiz_xp($1, $2, $3, $4, $5, $6)",
          [formula, total, e, m, hd, timer],
        );
        const client = calculateOriginalQuizXp({
          formula,
          total,
          correct: { easy: e, medium: m, hard: hd },
          timerMode: timer as "none",
        });
        expect([formula, total, e, m, hd, timer, rows[0].total_xp]).toEqual([
          formula,
          total,
          e,
          m,
          hd,
          timer,
          client.totalXp,
        ]);
        expect(rows[0]).toMatchObject({
          base_xp: client.baseXp,
          correct_bonus_xp: client.correctBonusXp,
          timer_bonus_xp: client.timerBonusXp,
          pass_bonus_xp: client.passBonusXp,
          score_pct: client.scorePct,
        });
      }
    },
    TIMEOUT,
  );
});
