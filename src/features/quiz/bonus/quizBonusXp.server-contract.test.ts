import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const migration = readFileSync(
  new URL(
    "../../../../supabase/migrations/20260923125557_quiz_xp_one_time_awards.sql",
    import.meta.url,
  ),
  "utf8",
);

describe("one-time quiz XP server contract", () => {
  it("derives the exact score bands and caps each award at 50 XP", () => {
    expect(migration).toMatch(/completion_reward constant integer := 20/);
    expect(migration).toMatch(/score_percent = 100 then 30/);
    expect(migration).toMatch(/score_percent >= 90 then 20/);
    expect(migration).toMatch(/score_percent >= 80 then 10/);
    expect(migration).toMatch(/score_percent >= 60 then 5/);
    expect(migration).toMatch(/xp_earned between 0 and 50/);
  });

  it("does not accept an XP amount from the browser", () => {
    const signature = migration.match(/complete_quiz\([\s\S]*?\)\s*returns jsonb/i)?.[0] ?? "";
    expect(signature).not.toMatch(/requested_.*xp|timer|streak/i);
  });

  it("makes a completion request idempotent and an award unique per user and quiz", () => {
    expect(migration).toMatch(/quiz_completion_requests \([\s\S]*?id uuid primary key/i);
    expect(migration).toMatch(/primary key \(user_id, quiz_key\)/);
    expect(migration).toMatch(/on conflict \(id\) do nothing/i);
    expect(migration).toMatch(/on conflict \(user_id, quiz_key\) do nothing/i);
  });

  it("blocks guests and retires the old write paths", () => {
    expect(migration).toMatch(/auth\.jwt\(\) ->> 'is_anonymous'/);
    expect(migration).toMatch(/drop policy if exists "Users can insert own quiz_history"/);
    expect(migration).toMatch(/revoke insert, update, delete on table public\.quiz_history/);
    expect(migration).toMatch(/revoke execute on function public\.complete_quiz_attempt/);
  });

  it("allows every registered plan by avoiding plan-based eligibility", () => {
    const signatureAndBody =
      migration.match(/create or replace function public\.complete_quiz[\s\S]*?\$\$;/i)?.[0] ?? "";
    expect(signatureAndBody).not.toMatch(/profiles\.plan|plan\s*=|subscription/i);
    expect(migration).toMatch(
      /grant execute on function public\.complete_quiz[\s\S]*to authenticated/,
    );
  });
});
