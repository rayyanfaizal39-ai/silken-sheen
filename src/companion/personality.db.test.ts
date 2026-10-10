import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createNovaBond } from "./personality";

const A = "00000000-0000-4000-8000-000000000001";
const B = "00000000-0000-4000-8000-000000000002";
describe("private Nova bonds", () => {
  const db = new PGlite();
  const bond = createNovaBond(Array(5).fill("curious"), "Nova");
  beforeAll(async () => {
    await db.exec(`create role authenticated; create role anon; create schema auth;
      create table auth.users (id uuid primary key);
      create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
      grant usage on schema auth to authenticated;
      insert into auth.users values ('${A}'), ('${B}');`);
    await db.exec(
      readFileSync(
        new URL(
          "../../supabase/migrations/20261010180000_companion_personality_bonds.sql",
          import.meta.url,
        ),
        "utf8",
      ),
    );
    await db.query(
      "insert into public.companion_bonds values ($1, $2), ($3, $2)",
      [A, bond, B],
    );
    await db.exec(
      `set role authenticated; set request.jwt.claim.sub = '${A}';`,
    );
  });
  afterAll(() => db.close());
  it("allows students to read only their own connection", async () => {
    const result = await db.query<{ user_id: string }>(
      "select user_id from public.companion_bonds",
    );
    expect(result.rows.map((r) => r.user_id)).toEqual([A]);
  });
  it("allows an owner to update preferences", async () => {
    const next = createNovaBond(Array(5).fill("steady"), "Comet");
    await db.query(
      "update public.companion_bonds set bond = $1 where user_id = $2",
      [next, A],
    );
    expect(
      (
        await db.query<{ bond: unknown }>(
          "select bond from public.companion_bonds",
        )
      ).rows[0].bond,
    ).toEqual(next);
  });
  it("blocks inserts or ownership changes for another student", async () => {
    await expect(
      db.query(
        "insert into public.companion_bonds values ($1, $2) on conflict (user_id) do update set bond = excluded.bond",
        [B, bond],
      ),
    ).rejects.toMatchObject({ code: "42501" });
    await expect(
      db.query(
        "update public.companion_bonds set user_id = $1 where user_id = $2",
        [B, A],
      ),
    ).rejects.toMatchObject({ code: "42501" });
  });
  it("rejects missing fields, unsupported choices, wrong counts and excessive names", async () => {
    for (const invalid of [
      {},
      { ...bond, version: 2 },
      { ...bond, personality: null },
      { ...bond, personality: "unknown" },
      { ...bond, answers: [] },
      { ...bond, answers: Array(5).fill("invalid") },
      { ...bond, name: "X".repeat(25) },
    ])
      await expect(
        db.query(
          "update public.companion_bonds set bond = $1 where user_id = $2",
          [invalid, A],
        ),
      ).rejects.toMatchObject({ code: "23514" });
  });
  it("does not grant anonymous users access", async () => {
    await db.exec("reset role; set role anon;");
    await expect(
      db.query("select * from public.companion_bonds"),
    ).rejects.toMatchObject({ code: "42501" });
  });
});
