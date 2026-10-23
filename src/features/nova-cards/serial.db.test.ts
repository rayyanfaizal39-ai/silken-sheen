// Review-only migration. Applied here on an isolated PGlite database, never on a hosted project.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { PGlite } from "@electric-sql/pglite";
import { prepareCompanionSubmission } from "../../../supabase/functions/_shared/companion-submission";
import { addAccount, createCompanionDb, roleQuery, TEST_DNA_SECRET } from "./test-support/companion-pipeline";

const AGE = "00000000-0000-4000-8000-0000000000b1";
const FORM = "00000000-0000-4000-8000-0000000000b2";
const NONE = "00000000-0000-4000-8000-0000000000b3";
const FIRST = "00000000-0000-4000-8000-0000000000b4";
const SECOND = "00000000-0000-4000-8000-0000000000b5";
const LEGACY = "00000000-0000-4000-8000-0000000000b6";
const SCAN = "00000000-0000-4000-8000-0000000000b7";
const COPY = "00000000-0000-4000-8000-0000000000b8";
const ANSWERS = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];
const OTHER = [3, 4, 3, 2, 1, 3, 0, 3, 1, 2, 3, 2];
const MIGRATION = "20261023120000_nova_card_serial_format.sql";

let db: PGlite;
let as: ReturnType<typeof roleQuery>;
type Row = Record<string, unknown>;

async function submit(student: string, answers: number[], name = "Aisyah") {
  const draft = (await as("authenticated", student, "select public.get_my_nova_studio() as r")).rows[0]
    .r as { draft: { revision: number } };
  await as("authenticated", student, "select public.save_nova_studio_draft($1,$2,$3)", [
    answers,
    name,
    draft.draft.revision,
  ]);
  const prepared = prepareCompanionSubmission(answers, student, TEST_DNA_SECRET);
  const result = await as("service_role", null, "select public.nova_submit_companions($1,$2,$3,$4) as r", [
    student,
    answers,
    JSON.stringify(prepared.match),
    JSON.stringify(prepared.dna),
  ]);
  return result.rows[0].r as { status: string; cardId: string };
}

beforeAll(async () => {
  db = await createCompanionDb();
  as = roleQuery(db);
  await db.exec(readFileSync(resolve(process.cwd(), "supabase/migrations", MIGRATION), "utf8"));
  await db.exec("alter table public.profiles add column age smallint, add column form text");
  for (const id of [AGE, FORM, NONE, FIRST, SECOND, LEGACY, SCAN, COPY]) await addAccount(db, id);
  await db.query("update public.profiles set age=14 where id=$1", [AGE]);
  await db.query("update public.profiles set form='Form 3' where id=$1", [FORM]);
}, 120_000);
afterAll(() => db.close());

describe("review-only Nova serial format", () => {
  it("stores the five-stage proposal and does not apply it to live stage", async () => {
    const loyalty = await db.query<Row>(
      "select stage, stage_name, letter, rarity, min_successful_payments from public.nova_stage_loyalty order by stage",
    );
    expect(loyalty.rows).toEqual([
      { stage: 1, stage_name: "Origin", letter: "C", rarity: "Common", min_successful_payments: 1 },
      { stage: 2, stage_name: "Awakened", letter: "R", rarity: "Rare", min_successful_payments: 2 },
      { stage: 3, stage_name: "Ascended", letter: "E", rarity: "Epic", min_successful_payments: 3 },
      { stage: 4, stage_name: "Mythic", letter: "M", rarity: "Mythic", min_successful_payments: 4 },
      { stage: 5, stage_name: "Legendary", letter: "L", rarity: "Legendary", min_successful_payments: 5 },
    ]);
    const proposed = async (count: number) =>
      (
        await db.query<{ stage: number | null }>(
          "select public.nova_proposed_stage_for_payments($1) as stage",
          [count],
        )
      ).rows[0].stage;
    expect(await proposed(0)).toBeNull();
    expect(Number(await proposed(1))).toBe(1);
    expect(Number(await proposed(5))).toBe(5);
    expect(Number(await proposed(9))).toBe(5);
    const visible = await db.query<{ stage: number }>(
      "select public.nova_visible_stage(null::public.nova_cards) as stage",
    );
    expect(visible.rows[0].stage).toBe(1);
    const def = (
      await db.query<{ def: string }>(
        "select pg_get_functiondef('public.nova_submit_companions(uuid,integer[],jsonb,jsonb)'::regprocedure) as def",
      )
    ).rows[0].def;
    expect(def).toContain("nova_cards_owner_id_key");
    expect(def).toContain("existing");
    expect(def).not.toContain("payment_transactions");
    expect(def).not.toContain("nova_proposed_stage_for_payments");
    const dropped = await db.query<{ n: number }>(
      "select count(*)::int as n from pg_proc where proname='get_public_nova_card_by_serial'",
    );
    expect(dropped.rows[0].n).toBe(0);
    const serialDefault = await db.query<{ column_default: string | null }>(
      `select column_default from information_schema.columns
       where table_schema='public' and table_name='nova_cards' and column_name='serial'`,
    );
    expect(serialDefault.rows[0].column_default).toBeNull();
    const index = await db.query<{ indexname: string }>(
      "select indexname from pg_indexes where indexname='nova_card_dna_variation_id_key'",
    );
    expect(index.rows).toHaveLength(1);
  });

  it("builds C + birth-year digits from age, then form, then 00", async () => {
    const year = Number(
      (
        await db.query<{ year: number }>(
          "select extract(year from (now() at time zone 'Asia/Kuala_Lumpur'))::int as year",
        )
      ).rows[0].year,
    );
    const expectYy = async (owner: string, digits: string) => {
      const created = await submit(owner, ANSWERS);
      expect(created.status).toBe("created");
      const row = await db.query<Row>("select serial, serial_body, rarity from public.nova_cards where owner_id=$1", [
        owner,
      ]);
      const serial = String(row.rows[0].serial);
      expect(serial).toMatch(/^C[0-9]{11}$/);
      expect(row.rows[0].serial_body).toBe(serial.slice(1));
      expect(serial.slice(1, 3)).toBe(digits);
      expect(row.rows[0].rarity).toBe("Common");
      const yy = await db.query<{ yy: string }>("select public.nova_birth_yy($1) as yy", [owner]);
      expect(yy.rows[0].yy).toBe(digits);
      return serial.slice(1);
    };
    const ageBody = await expectYy(AGE, String((year - 14 + 100) % 100).padStart(2, "0"));
    const formBody = await expectYy(FORM, String((year - 15 + 100) % 100).padStart(2, "0"));
    const noneBody = await expectYy(NONE, "00");
    expect(new Set([ageBody, formBody, noneBody]).size).toBe(3);
    const prepared = prepareCompanionSubmission(ANSWERS, AGE, TEST_DNA_SECRET);
    const again = await as("service_role", null, "select public.nova_submit_companions($1,$2,$3,$4) as r", [
      AGE,
      ANSWERS,
      JSON.stringify(prepared.match),
      JSON.stringify(prepared.dna),
    ]);
    expect((again.rows[0].r as { status: string }).status).toBe("existing");
  });

  it("retries a colliding body and still returns one card", async () => {
    await db.exec(`
      create sequence public.nova_test_digit_seq;
      create or replace function public.nova_random_digits(needed integer) returns text
      language plpgsql volatile set search_path = '' as $$
      declare n bigint := nextval('public.nova_test_digit_seq');
      begin
        if n <= 2 then return '111111111'; end if;
        return lpad((100000000 + n)::text, 9, '0');
      end;
      $$;
    `);
    const first = await submit(FIRST, ANSWERS, "Rayyan");
    const second = await submit(SECOND, OTHER, "Mia");
    expect(first.status).toBe("created");
    expect(second.status).toBe("created");
    const rows = await db.query<{ serial: string }>(
      "select serial from public.nova_cards where owner_id in ($1,$2) order by serial",
      [FIRST, SECOND],
    );
    expect(rows.rows).toHaveLength(2);
    expect(new Set(rows.rows.map((row) => row.serial.slice(1))).size).toBe(2);
    const draws = await db.query<{ n: string }>("select last_value::text as n from public.nova_test_digit_seq");
    expect(Number(draws.rows[0].n)).toBe(3);
  });

  it("keeps legacy serials and rejects a letter or body that does not match", async () => {
    await db.query(
      "insert into public.nova_cards(owner_id, username, answers, variant, serial, rarity) values($1,'Legacy',$2,'a','000000000099','Rare')",
      [LEGACY, ANSWERS],
    );
    const legacy = await db.query<Row>("select serial, serial_body, rarity from public.nova_cards where owner_id=$1", [
      LEGACY,
    ]);
    expect(legacy.rows[0]).toMatchObject({ serial: "000000000099", serial_body: null, rarity: "Rare" });
    await expect(
      db.query(
        "insert into public.nova_cards(owner_id, username, answers, variant, serial, serial_body, rarity) values($1,'Bad',$2,'a','X12482915037','12482915037','Common')",
        [COPY, ANSWERS],
      ),
    ).rejects.toThrow();
    await expect(
      db.query(
        "insert into public.nova_cards(owner_id, username, answers, variant, serial, serial_body, rarity) values($1,'Bad',$2,'a','C12482915037','00000000000','Common')",
        [COPY, ANSWERS],
      ),
    ).rejects.toThrow();
  });

  it("resolves a scan by the permanent body and hides profile fields", async () => {
    await db.query(
      `insert into public.nova_cards(owner_id, username, answers, variant, serial, serial_body, rarity)
       values($1,'Scanner',$2,'a','C12482915037','12482915037','Common')`,
      [SCAN, ANSWERS],
    );
    await as("authenticated", SCAN, "select public.set_nova_sharing(true)");
    const opened = (
      await as("anon", null, "select public.get_public_nova_card_by_scan($1) as r", ["R12482915037"])
    ).rows[0].r as Row;
    expect(String(opened.serial).startsWith("C")).toBe(true);
    expect(String(opened.serial).slice(1)).toBe("12482915037");
    expect(opened.rarity).toBe("Common");
    for (const key of ["birthYear", "age", "form", "dateOfBirth", "serialBody"]) {
      expect(opened).not.toHaveProperty(key);
    }
    await as("authenticated", SCAN, "select public.set_nova_sharing(false)");
    const hidden = (
      await as("anon", null, "select public.get_public_nova_card_by_scan($1) as r", ["R12482915037"])
    ).rows[0].r;
    expect(hidden).toBeNull();
    await as("authenticated", LEGACY, "select public.set_nova_sharing(true)");
    const legacy = (
      await as("anon", null, "select public.get_public_nova_card_by_scan($1) as r", ["000000000099"])
    ).rows[0].r as Row;
    expect(legacy.serial).toBe("000000000099");
    expect(legacy.rarity).toBe("Rare");
  });

  it("follows a temporary visible-stage change in the payload only", async () => {
    await db.exec(`
      create or replace function public.nova_visible_stage(c public.nova_cards) returns integer
      language sql immutable set search_path = '' as $$ select 4; $$;
    `);
    await as("authenticated", SCAN, "select public.set_nova_sharing(true)");
    const opened = (
      await as("anon", null, "select public.get_public_nova_card_by_scan($1) as r", ["C12482915037"])
    ).rows[0].r as Row;
    expect(opened.serial).toBe("M12482915037");
    expect(opened.rarity).toBe("Mythic");
    const stored = await db.query<Row>("select serial, serial_body from public.nova_cards where owner_id=$1", [SCAN]);
    expect(stored.rows[0].serial).toBe("C12482915037");
    expect(stored.rows[0].serial_body).toBe("12482915037");
    await db.exec(`
      create or replace function public.nova_visible_stage(c public.nova_cards) returns integer
      language sql immutable set search_path = '' as $$ select 1; $$;
    `);
    const restored = await db.query<{ stage: number }>(
      "select public.nova_visible_stage(null::public.nova_cards) as stage",
    );
    expect(restored.rows[0].stage).toBe(1);
  });

  it("rolls back a card when Visual DNA variation ids collide", async () => {
    const source = (
      await db.query<{ id: string }>("select id from public.nova_cards where owner_id=$1", [AGE])
    ).rows[0].id;
    await expect(
      db.transaction(async (tx) => {
        const inserted = await tx.query<{ id: string }>(
          `insert into public.nova_cards(owner_id, username, answers, variant, serial, serial_body, rarity)
           values($1,'Copycat',$2,'a','C00999888777','00999888777','Common') returning id`,
          [COPY, ANSWERS],
        );
        await tx.query(
          `insert into public.nova_card_candidates(card_id, slot, spec)
           select $1, slot, spec from public.nova_card_candidates where card_id=$2`,
          [inserted.rows[0].id, source],
        );
        await tx.query(
          `insert into public.nova_card_dna(card_id, slot, dna)
           select $1, slot, dna from public.nova_card_dna where card_id=$2`,
          [inserted.rows[0].id, source],
        );
      }),
    ).rejects.toThrow(/nova_card_dna_variation_id_key|duplicate key/);
    const leftover = await db.query("select id from public.nova_cards where owner_id=$1", [COPY]);
    expect(leftover.rows).toHaveLength(0);
  });
});
