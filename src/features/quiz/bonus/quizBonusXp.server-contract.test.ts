import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const migration = readFileSync(
  new URL(
    "../../../../supabase/migrations/20260814014705_quiz_bonus_xp_attempt_safety.sql",
    import.meta.url,
  ),
  "utf8",
);

describe("quiz bonus XP server contract", () => {
  it("locks timer mode to the four supported values", () => {
    expect(migration).toMatch(/timer_mode in \('none', '60', '30', '15'\)/);
    expect(migration).toMatch(/when '60' then 5 when '30' then 10 when '15' then 15 else 0/);
  });

  it("does not accept timer or streak bonus amounts as RPC arguments", () => {
    const signature =
      migration.match(/record_quiz_attempt_answer\([\s\S]*?\) returns jsonb/i)?.[0] ?? "";
    expect(signature).not.toMatch(/bonus|streak/i);
  });

  it("uses attempt/question and attempt/sequence uniqueness for retry safety", () => {
    expect(migration).toMatch(/primary key \(attempt_id, question_key\)/);
    expect(migration).toMatch(/unique \(attempt_id, answer_sequence\)/);
    expect(migration).toMatch(/'accepted', false/);
  });

  it("awards the pass bonus once inside the idempotent completion transaction", () => {
    expect(migration).toMatch(/score_percent >= 80 then 25/);
    expect(migration).toMatch(/if attempt\.status = 'active' then/);
    expect(migration).toMatch(/quiz_history_attempt_id_unique/);
  });

  it("keeps quiz-correct streak in attempt-scoped fields", () => {
    expect(migration).toContain("current_correct_streak");
    expect(migration).toContain("best_correct_streak");
    expect(migration).not.toMatch(/daily_learning_streak/i);
  });
});
