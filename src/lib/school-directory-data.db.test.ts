import { readFileSync } from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PGlite } from "@electric-sql/pglite";

const searchSql = readFileSync(
  new URL(
    "../../supabase/migrations/20260809123257_restrict_smk_abbreviation_to_smk_type.sql",
    import.meta.url,
  ),
  "utf8",
);
const directoryExtensionSql = readFileSync(
  new URL(
    "../../supabase/migrations/20261003120000_add_mrsm_and_home_school_records.sql",
    import.meta.url,
  ),
  "utf8",
);

const EXISTING_SCHOOL_ID = "11111111-1111-4111-8111-111111111111";
const EXISTING_PROFILE_ID = "22222222-2222-4222-8222-222222222222";

describe("extended verified school directory", () => {
  const db = new PGlite();

  beforeAll(async () => {
    await db.exec(`
      create role anon nologin;
      create role authenticated nologin;
      create table public.schools (
        id uuid primary key default gen_random_uuid(),
        school_code text unique,
        school_name text not null,
        school_type text,
        state text not null,
        district text,
        postcode text,
        active boolean not null default true
      );
      create table public.profiles (
        id uuid primary key,
        school_id uuid references public.schools(id) on delete restrict
      );
      insert into public.schools (
        id, school_code, school_name, school_type, state, district, postcode, active
      ) values (
        '${EXISTING_SCHOOL_ID}',
        'BEA0108',
        'SEKOLAH MENENGAH KEBANGSAAN KOTA KEMUNING',
        'SMK',
        'SELANGOR',
        'KLANG',
        '40460',
        true
      );
      insert into public.profiles (id, school_id)
      values ('${EXISTING_PROFILE_ID}', '${EXISTING_SCHOOL_ID}');
    `);
    await db.exec(searchSql);
    await db.exec(directoryExtensionSql);
  });

  afterAll(async () => {
    await db.close();
  });

  it("keeps SMK Kota Kemuning searchable and its existing profile selection intact", async () => {
    const search = await db.query<{ school_code: string; school_name: string }>(
      "select school_code, school_name from public.search_schools($1, $2)",
      ["SMK Kota Kemuning", 12],
    );
    expect(search.rows).toEqual([
      {
        school_code: "BEA0108",
        school_name: "SEKOLAH MENENGAH KEBANGSAAN KOTA KEMUNING",
      },
    ]);

    const profile = await db.query<{ school_id: string }>(
      "select school_id from public.profiles where id = $1",
      [EXISTING_PROFILE_ID],
    );
    expect(profile.rows[0]?.school_id).toBe(EXISTING_SCHOOL_ID);
  });

  it("returns active MRSM records through the same search function", async () => {
    const result = await db.query<{
      school_name: string;
      school_type: string;
      state: string;
      district: string;
    }>("select school_name, school_type, state, district from public.search_schools($1, $2)", [
      "MRSM Tun Dr Ismail",
      12,
    ]);
    expect(result.rows).toEqual([
      {
        school_name: "MRSM TUN DR ISMAIL",
        school_type: "MRSM",
        state: "JOHOR",
        district: "PONTIAN",
      },
    ]);
  });

  it("returns Home School as a selectable verified result", async () => {
    const result = await db.query<{
      id: string;
      school_name: string;
      school_type: string;
      state: string;
      district: string | null;
    }>("select id, school_name, school_type, state, district from public.search_schools($1, $2)", [
      "Home School",
      12,
    ]);
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0]).toMatchObject({
      school_name: "Home School",
      school_type: "HOME_SCHOOL",
      state: "MALAYSIA",
      district: null,
    });
    expect(result.rows[0]?.id).toMatch(/^[0-9a-f-]{36}$/i);
  });

  it("contains no duplicate MRSM codes or names and exactly one Home School code", async () => {
    const duplicates = await db.query<{ duplicate_count: number }>(`
      select count(*)::integer as duplicate_count
      from (
        select school_code from public.schools where school_type = 'MRSM'
        group by school_code having count(*) > 1
        union all
        select school_name from public.schools where school_type = 'MRSM'
        group by school_name having count(*) > 1
      ) duplicates
    `);
    expect(duplicates.rows[0]?.duplicate_count).toBe(0);

    const homeSchool = await db.query<{ record_count: number }>(
      "select count(*)::integer as record_count from public.schools where school_code = 'HOME-SCHOOL'",
    );
    expect(homeSchool.rows[0]?.record_count).toBe(1);
  });

  it("is idempotent when the migration is attempted again", async () => {
    await db.exec(directoryExtensionSql);

    const addedRows = await db.query<{ record_count: number }>(`
      select count(*)::integer as record_count
      from public.schools
      where school_code = 'HOME-SCHOOL' or school_code like 'MRSM-%'
    `);
    expect(addedRows.rows[0]?.record_count).toBe(58);

    const profile = await db.query<{ school_id: string }>(
      "select school_id from public.profiles where id = $1",
      [EXISTING_PROFILE_ID],
    );
    expect(profile.rows[0]?.school_id).toBe(EXISTING_SCHOOL_ID);
  });

  it("still rejects a school UUID that is not an existing verified record", async () => {
    await expect(
      db.query("update public.profiles set school_id = $1 where id = $2", [
        "33333333-3333-4333-8333-333333333333",
        EXISTING_PROFILE_ID,
      ]),
    ).rejects.toThrow();
  });
});
