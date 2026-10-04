import { readFileSync } from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PGlite } from "@electric-sql/pglite";

const read = (name: string) =>
  readFileSync(new URL(`../../supabase/migrations/${name}`, import.meta.url), "utf8");

const HOME_SCHOOL = "00000000-0000-4000-8000-0000000000a1";
const SMK = "00000000-0000-4000-8000-0000000000a2";
const INACTIVE = "00000000-0000-4000-8000-0000000000a3";

describe("optional profile school", () => {
  const db = new PGlite();

  beforeAll(async () => {
    await db.exec(`
      create table public.schools (id uuid primary key, active boolean not null default true);
      create table public.profiles (
        id uuid primary key,
        role text not null default 'student',
        full_name text,
        age integer,
        form text,
        school_id uuid references public.schools(id),
        onboarding_completed boolean not null default false
      );
      insert into public.schools values ('${HOME_SCHOOL}', true), ('${SMK}', true), ('${INACTIVE}', false);
    `);
    await db.exec(read("20260925120000_allow_shared_profile_forms_1_through_5.sql"));
    await db.exec(read("20261004150000_make_profile_school_optional.sql"));
    await db.exec(`
      create trigger on_profiles_validate_explorer_completion
        before insert or update on public.profiles
        for each row execute function public.validate_explorer_profile_completion();
    `);
  });

  afterAll(async () => {
    await db.close();
  });

  const schoolOf = async (id: string) =>
    (
      await db.query<{ school_id: string | null }>(
        "select school_id from public.profiles where id = $1",
        [id],
      )
    ).rows[0]?.school_id;

  it("completes a student profile with school_id NULL and does not become Home School", async () => {
    const id = "00000000-0000-4000-8000-000000000b01";
    await db.query(
      "insert into public.profiles (id, full_name, age, form, onboarding_completed) values ($1, 'Alya', 14, 'Form 2', true)",
      [id],
    );
    expect(await schoolOf(id)).toBeNull();
  });

  it("allows a parent/guardian-style profile without a school", async () => {
    const id = "00000000-0000-4000-8000-000000000b02";
    await db.query("insert into public.profiles (id, role) values ($1, 'teacher')", [id]);
    expect(await schoolOf(id)).toBeNull();
  });

  it("still saves a verified school and keeps Home School selectable", async () => {
    const smk = "00000000-0000-4000-8000-000000000b03";
    const home = "00000000-0000-4000-8000-000000000b04";
    await db.query(
      "insert into public.profiles (id, full_name, age, form, school_id, onboarding_completed) values ($1, 'A', 14, 'Form 2', $2, true), ($3, 'B', 14, 'Form 2', $4, true)",
      [smk, SMK, home, HOME_SCHOOL],
    );
    expect(await schoolOf(smk)).toBe(SMK);
    expect(await schoolOf(home)).toBe(HOME_SCHOOL);
  });

  it("lets a completed profile later skip its school", async () => {
    const id = "00000000-0000-4000-8000-000000000b03";
    await db.query("update public.profiles set school_id = null where id = $1", [id]);
    expect(await schoolOf(id)).toBeNull();
  });

  it("still rejects unknown or inactive school ids and keeps other completion rules", async () => {
    const id = "00000000-0000-4000-8000-000000000b05";
    await db.query("insert into public.profiles (id) values ($1)", [id]);
    await expect(
      db.query("update public.profiles set school_id = $2 where id = $1", [id, INACTIVE]),
    ).rejects.toMatchObject({ code: "23503" });
    await expect(
      db.query("update public.profiles set onboarding_completed = true where id = $1", [id]),
    ).rejects.toMatchObject({ code: "23514" });
  });
});
