import { readFileSync } from "node:fs";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { PGlite } from "@electric-sql/pglite";

const read = (name: string) =>
  readFileSync(new URL(`../../../supabase/migrations/${name}`, import.meta.url), "utf8");

const STUDENT_A = "00000000-0000-4000-8000-0000000000a1";
const STUDENT_B = "00000000-0000-4000-8000-0000000000a2";
const TEACHER = "00000000-0000-4000-8000-0000000000a3";

type Ballot = {
  label: string;
  votes: number | string;
  my_option_id: string | null;
  announcement_id: string;
};

describe("announcement polls", () => {
  const db = new PGlite();
  let pollId = "";
  let korea = "";
  let japan = "";
  let announcementId = "";

  beforeAll(async () => {
    await db.exec(`
      create role anon nologin;
      create role authenticated nologin;
      create role service_role nologin bypassrls;
      create schema auth;
      create table auth.users (id uuid primary key);
      create function auth.uid() returns uuid language sql stable as $$
        select nullif(current_setting('test.uid', true), '')::uuid
      $$;
      grant usage on schema auth to anon, authenticated, service_role;
      grant execute on function auth.uid() to anon, authenticated, service_role;
      create table public.profiles (
        id uuid primary key references auth.users (id),
        role text not null default 'student'
      );
      insert into auth.users (id) values ('${STUDENT_A}'), ('${STUDENT_B}'), ('${TEACHER}');
      insert into public.profiles (id, role) values
        ('${STUDENT_A}', 'student'),
        ('${STUDENT_B}', 'student'),
        ('${TEACHER}', 'teacher');
    `);
    await db.exec(read("20261023014000_public_announcements.sql"));
    const polls = read("20261023023000_announcement_polls.sql");
    await db.exec(polls);
    await db.exec(polls);

    const created = await db.query<{ announcement_id: string; poll_id: string }>(`
      with post as (
        insert into public.announcements (title, body, type)
        values ('Where should we go?', 'Sponsored trip poll.', 'poll')
        returning id
      ),
      poll as (
        insert into public.announcement_polls (announcement_id)
        select id from post
        returning id, announcement_id
      )
      select announcement_id, id as poll_id from poll
    `);
    announcementId = created.rows[0].announcement_id;
    pollId = created.rows[0].poll_id;
    const options = await db.query<{ id: string; label: string }>(
      `insert into public.announcement_poll_options (poll_id, label, sort_order)
       values ($1, 'Korea', 0), ($1, 'Japan', 1)
       returning id, label`,
      [pollId],
    );
    korea = options.rows.find((row) => row.label === "Korea")?.id ?? "";
    japan = options.rows.find((row) => row.label === "Japan")?.id ?? "";

    await db.exec(`
      with post as (
        insert into public.announcements (title, type, published)
        values ('Hidden poll', 'poll', false)
        returning id
      ),
      poll as (
        insert into public.announcement_polls (announcement_id)
        select id from post
        returning id
      )
      insert into public.announcement_poll_options (poll_id, label, sort_order)
      select id, 'Secret', 0 from poll;
    `);
  });

  afterAll(async () => {
    await db.close();
  });

  beforeEach(async () => {
    await db.exec("delete from public.announcement_poll_votes");
    await db.query("update public.announcement_polls set closes_at = null where id = $1", [pollId]);
  });

  async function asUser<T>(uid: string | null, role: string, sql: string, params: unknown[] = []) {
    await db.query(`select set_config('test.uid', $1, false)`, [uid ?? ""]);
    await db.exec(`set role ${role}`);
    try {
      return await db.query<T>(sql, params);
    } finally {
      await db.exec("reset role");
      await db.query(`select set_config('test.uid', '', false)`);
    }
  }

  async function ballots(uid: string | null, role = "authenticated") {
    const result = await asUser<Ballot>(
      uid,
      role,
      "select announcement_id, label, votes, my_option_id from public.announcement_poll_ballots() order by sort_order",
    );
    return result.rows.map((row) => ({
      ...row,
      votes: Number(row.votes),
    }));
  }

  it("exposes one select, insert, and update policy for votes", async () => {
    const policies = await db.query<{ policyname: string; cmd: string }>(`
      select policyname, cmd
      from pg_policies
      where schemaname = 'public' and tablename = 'announcement_poll_votes'
      order by cmd
    `);
    expect(policies.rows.map((row) => row.cmd)).toEqual(["INSERT", "SELECT", "UPDATE"]);
  });

  it("lets a guest read counts and blocks a guest vote", async () => {
    await asUser(
      STUDENT_A,
      "authenticated",
      `insert into public.announcement_poll_votes (poll_id, option_id, user_id) values ($1, $2, $3)`,
      [pollId, korea, STUDENT_A],
    );
    const guest = await ballots(null, "anon");
    expect(guest).toEqual([
      { announcement_id: announcementId, label: "Korea", votes: 1, my_option_id: null },
      { announcement_id: announcementId, label: "Japan", votes: 0, my_option_id: null },
    ]);
    await expect(
      asUser(
        null,
        "anon",
        `insert into public.announcement_poll_votes (poll_id, option_id, user_id) values ($1, $2, $3)`,
        [pollId, japan, STUDENT_A],
      ),
    ).rejects.toThrow(/permission denied/i);
  });

  it("lets a student change their own vote and hides everyone else's row", async () => {
    await asUser(
      STUDENT_A,
      "authenticated",
      `insert into public.announcement_poll_votes (poll_id, option_id, user_id) values ($1, $2, $3)`,
      [pollId, korea, STUDENT_A],
    );
    await asUser(
      STUDENT_B,
      "authenticated",
      `insert into public.announcement_poll_votes (poll_id, option_id, user_id) values ($1, $2, $3)`,
      [pollId, japan, STUDENT_B],
    );

    const visible = await asUser<{ user_id: string }>(
      STUDENT_A,
      "authenticated",
      "select user_id from public.announcement_poll_votes",
    );
    expect(visible.rows.map((row) => row.user_id)).toEqual([STUDENT_A]);

    await expect(
      asUser(
        STUDENT_A,
        "authenticated",
        `insert into public.announcement_poll_votes (poll_id, option_id, user_id) values ($1, $2, $3)`,
        [pollId, japan, STUDENT_B],
      ),
    ).rejects.toThrow(/row-level security/i);

    await asUser(
      STUDENT_A,
      "authenticated",
      `update public.announcement_poll_votes set option_id = $1 where user_id = $2`,
      [japan, STUDENT_A],
    );
    const after = await ballots(STUDENT_A);
    expect(after.map((row) => [row.label, row.votes, row.my_option_id])).toEqual([
      ["Korea", 0, japan],
      ["Japan", 2, japan],
    ]);
  });

  it("refuses a teacher and a vote after the poll closes", async () => {
    await expect(
      asUser(
        TEACHER,
        "authenticated",
        `insert into public.announcement_poll_votes (poll_id, option_id, user_id) values ($1, $2, $3)`,
        [pollId, korea, TEACHER],
      ),
    ).rejects.toThrow(/row-level security/i);

    await asUser(
      STUDENT_A,
      "authenticated",
      `insert into public.announcement_poll_votes (poll_id, option_id, user_id) values ($1, $2, $3)`,
      [pollId, korea, STUDENT_A],
    );
    await db.query(
      `update public.announcement_polls set closes_at = now() - interval '1 minute' where id = $1`,
      [pollId],
    );
    await asUser(
      STUDENT_A,
      "authenticated",
      `update public.announcement_poll_votes set option_id = $1 where user_id = $2`,
      [japan, STUDENT_A],
    );
    const frozen = await db.query<{ option_id: string }>(
      "select option_id from public.announcement_poll_votes where user_id = $1",
      [STUDENT_A],
    );
    expect(frozen.rows[0]?.option_id).toBe(korea);
    await expect(
      asUser(
        STUDENT_B,
        "authenticated",
        `insert into public.announcement_poll_votes (poll_id, option_id, user_id) values ($1, $2, $3)`,
        [pollId, japan, STUDENT_B],
      ),
    ).rejects.toThrow(/row-level security/i);
  });

  it("leaves unpublished polls out of the ballot", async () => {
    const rows = await ballots(null, "anon");
    expect(rows.map((row) => row.label)).toEqual(["Korea", "Japan"]);
  });
});
