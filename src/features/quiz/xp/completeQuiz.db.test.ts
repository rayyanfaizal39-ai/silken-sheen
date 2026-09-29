import { beforeAll, describe, expect, it } from "vitest";
import { buildQuizKey } from "./quizXp";
import { createQuizXpDb, registered, type CompleteQuizArgs } from "./quizXpDbHarness";

// The 6-argument complete_quiz() still used by the 2026-09-23 client, run
// against the real migrations in PGlite (see quizXpDbHarness.ts). It keeps
// that client's 50 XP award but only for quizzes in the server catalog.
const TIMEOUT = 120_000;

let seq = 0;
const uuid = (prefix: number) =>
  `${prefix.toString(16).padStart(8, "0")}-0000-4000-8000-${(++seq).toString(16).padStart(12, "0")}`;
const newUserId = () => uuid(0xa);
const newCompletionId = () => uuid(0xc);

// Real legacy keys: Science F1 Ch7 (30 questions) and English F1 Set A (30).
const SCIENCE_LEGACY_KEY = buildQuizKey({
  subjectId: "science",
  form: "Form 1",
  chapterKey: "Chapter 7",
  variant: "difficulty-All",
});
const ENGLISH_LEGACY_KEY = buildQuizKey({
  subjectId: "english",
  form: "Form 1",
  chapterKey: "paper-1",
  variant: "objective-a",
});
const SCIENCE_CATALOG_KEY = "quiz-v2:standard:science:form-1:chapter-7:bm:set-default:difficulty-all";

const scienceQuiz = (overrides: Partial<CompleteQuizArgs> = {}): CompleteQuizArgs => ({
  completionId: newCompletionId(),
  quizKey: SCIENCE_LEGACY_KEY,
  subjectId: "science",
  chapterKey: "Chapter 7",
  correct: 25,
  total: 30,
  ...overrides,
});

const englishQuiz = (overrides: Partial<CompleteQuizArgs> = {}): CompleteQuizArgs => ({
  completionId: newCompletionId(),
  quizKey: ENGLISH_LEGACY_KEY,
  subjectId: "english",
  chapterKey: "Objective A",
  correct: 27,
  total: 30,
  ...overrides,
});

describe("legacy complete_quiz (2026-09-23 client)", () => {
  let h: Awaited<ReturnType<typeof createQuizXpDb>>;

  beforeAll(async () => {
    h = await createQuizXpDb();
  }, TIMEOUT);

  it("awards the 2026-09-23 client's 30 XP for 25/30 and records it everywhere", async () => {
    const userId = newUserId();
    await h.addUser(userId, { xp: 100, subjectXp: { science: 40 } });

    const result = await h.completeQuiz(registered(userId), scienceQuiz());

    expect(result).toMatchObject({ awarded: true, xpEarned: 30, lifetimeXp: 130, subjectXp: 70 });
    expect(await h.progressOf(userId)).toMatchObject({
      xp: 130,
      subject_xp: { science: 70 },
      quizzes_taken: 1,
    });
    expect(await h.historyOf(userId)).toMatchObject([{ xp_earned: 30, xp_awarded: true }]);
    expect(await h.monthlyLeaderboardXp(userId)).toBe(30);
  });

  it.each(["fake-quiz-1", "fake-quiz-2", "quiz-v1:science:form-1:chapter-99:difficulty-all"])(
    "rejects the uncatalogued key %s",
    async (quizKey) => {
      const userId = newUserId();
      await h.addUser(userId, {});
      await expect(h.completeQuiz(registered(userId), scienceQuiz({ quizKey }))).rejects.toThrow(
        /Unknown quiz/,
      );
      expect(await h.progressOf(userId)).toMatchObject({ xp: 0 });
    },
  );

  it("rejects a real key sent with the wrong subject or question count", async () => {
    const userId = newUserId();
    await h.addUser(userId, {});
    await expect(
      h.completeQuiz(registered(userId), scienceQuiz({ subjectId: "math" })),
    ).rejects.toThrow(/Unknown quiz/);
    await expect(
      h.completeQuiz(registered(userId), scienceQuiz({ total: 500, correct: 500 })),
    ).rejects.toThrow(/Unknown quiz/);
  });

  it("creates the user_progress row for a brand-new registered user", async () => {
    const userId = newUserId();
    await h.addUser(userId);
    await expect(h.completeQuiz(registered(userId), englishQuiz())).resolves.toMatchObject({
      xpEarned: 40,
      lifetimeXp: 40,
    });
  });

  it("records a retake but awards 0, and replays a duplicate request", async () => {
    const userId = newUserId();
    await h.addUser(userId, {});
    const first = scienceQuiz();
    await h.completeQuiz(registered(userId), first);

    await expect(h.completeQuiz(registered(userId), first)).resolves.toMatchObject({
      accepted: false,
      xpEarned: 30,
    });
    await expect(
      h.completeQuiz(registered(userId), scienceQuiz({ correct: 30 })),
    ).resolves.toMatchObject({ accepted: true, awarded: false, xpEarned: 0 });
    expect(await h.progressOf(userId)).toMatchObject({ xp: 30, quizzes_taken: 2 });
  });

  it("awards nothing when the new client already rewarded the quiz", async () => {
    const userId = newUserId();
    await h.addUser(userId, {});
    await h.completeCatalogQuiz(registered(userId), {
      completionId: newCompletionId(),
      quizKey: SCIENCE_CATALOG_KEY,
      correctEasy: 15,
      correctMedium: 10,
      correctHard: 5,
      timerMode: "none",
    });

    await expect(h.completeQuiz(registered(userId), scienceQuiz())).resolves.toMatchObject({
      awarded: false,
      xpEarned: 0,
    });
    expect(await h.progressOf(userId)).toMatchObject({ xp: 675 });
  });

  it("tolerates legacy / malformed subject_xp without losing valid values", async () => {
    const userId = newUserId();
    await h.addUser(userId, {
      subjectXp: { science: "12.5", english: " 15 ", bm: 40, geography: true, extra: { n: 1 } },
    });

    await expect(h.completeQuiz(registered(userId), scienceQuiz())).resolves.toMatchObject({
      subjectXp: 42,
    });
    await expect(h.completeQuiz(registered(userId), englishQuiz())).resolves.toMatchObject({
      subjectXp: 55,
    });
    expect((await h.progressOf(userId))?.subject_xp).toMatchObject({
      bm: 40,
      geography: true,
      extra: { n: 1 },
    });
  });

  it("keeps committed XP when a stale client sync writes older values", async () => {
    const userId = newUserId();
    await h.addUser(userId, { xp: 10, subjectXp: { bm: 10 } });
    await h.completeQuiz(registered(userId), scienceQuiz());

    await h.asCaller(
      registered(userId),
      `update public.user_progress
       set xp = 10, subject_xp = '{"bm": 12, "science": "oops"}'::jsonb
       where user_id = auth.uid()`,
    );

    expect(await h.progressOf(userId)).toMatchObject({
      xp: 40,
      subject_xp: { bm: 12, science: 30 },
    });
  });

  it("gives guests no synced XP", async () => {
    const guestId = newUserId();
    await h.addUser(guestId, {});
    await expect(
      h.completeQuiz(
        { role: "authenticated", claims: { sub: guestId, is_anonymous: true } },
        scienceQuiz(),
      ),
    ).rejects.toThrow(/Registered account required/);
    await expect(h.completeQuiz({ role: "anon", claims: {} }, scienceQuiz())).rejects.toThrow(
      /permission denied/,
    );
    expect(await h.progressOf(guestId)).toMatchObject({ xp: 0 });
  });

  it("does not let the browser write awards, history or the catalog directly", async () => {
    const userId = newUserId();
    await h.addUser(userId, {});
    const caller = registered(userId);
    await expect(
      h.asCaller(
        caller,
        `insert into public.quiz_history (user_id, subject_id, chapter_key, score_pct, correct, total, xp_earned)
         values (auth.uid(), 'science', 'c', 100, 1, 1, 5000)`,
      ),
    ).rejects.toThrow(/permission denied/);
    for (const table of ["quiz_xp_awards", "quiz_catalog", "quiz_catalog_legacy_keys"]) {
      await expect(h.asCaller(caller, `select * from public.${table}`)).rejects.toThrow(
        /permission denied/,
      );
    }
    await expect(
      h.asCaller(caller, "select public.complete_quiz_attempt($1)", [newCompletionId()]),
    ).rejects.toThrow(/permission denied/);
  });

  it("does not block account deletion", async () => {
    const userId = newUserId();
    await h.addUser(userId, {});
    await h.completeQuiz(registered(userId), scienceQuiz());
    await h.db.query("delete from auth.users where id = $1", [userId]);
    const { rows } = await h.db.query<{ n: number }>(
      "select count(*)::integer as n from public.quiz_xp_awards where user_id = $1",
      [userId],
    );
    expect(rows[0].n).toBe(0);
  });
});

describe("regression proofs", () => {
  it(
    "before hardening, a legacy subject_xp value crashed the completion",
    async () => {
      const h = await createQuizXpDb({ before: "20260924120000_harden_complete_quiz_subject_xp.sql" });
      const userId = newUserId();
      await h.addUser(userId, { subjectXp: { science: "12.5" } });
      await expect(h.completeQuiz(registered(userId), scienceQuiz())).rejects.toThrow(
        /invalid input syntax for type integer/,
      );
    },
    TIMEOUT,
  );

  it(
    "before the catalog, a fabricated quiz key was awarded XP",
    async () => {
      const h = await createQuizXpDb({ before: "20260924150000_original_quiz_xp_economy.sql" });
      const userId = newUserId();
      await h.addUser(userId, {});
      await expect(
        h.completeQuiz(registered(userId), scienceQuiz({ quizKey: "fake-quiz-1" })),
      ).resolves.toMatchObject({ xpEarned: 30 });
    },
    TIMEOUT,
  );
});
