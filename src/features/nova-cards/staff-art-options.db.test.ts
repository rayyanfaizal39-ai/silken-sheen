// Review only. Applies the staff, public-card, and two-portrait migrations to a
// local PGlite database. Nothing here is applied to a hosted database.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { PGlite } from "@electric-sql/pglite";
import { prepareCompanionSubmission } from "../../../supabase/functions/_shared/companion-submission";
import {
  TEST_DNA_SECRET,
  addAccount,
  createCompanionDb,
  roleQuery,
} from "./test-support/companion-pipeline";

const ADMIN = "00000000-0000-4000-8000-0000000000e3";
const STUDENT = "00000000-0000-4000-8000-0000000000e4";
const ANSWERS = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];
const FIRST = "ab".repeat(32);
const SECOND = "cd".repeat(32);

let db: PGlite;
let as: ReturnType<typeof roleQuery>;

async function submit() {
  const draft = (await as("authenticated", STUDENT, "select public.get_my_nova_studio() as r"))
    .rows[0].r as { draft: { revision: number } };
  await as("authenticated", STUDENT, "select public.save_nova_studio_draft($1,'Pilot',$2)", [
    ANSWERS,
    draft.draft.revision,
  ]);
  const prepared = prepareCompanionSubmission(ANSWERS, STUDENT, TEST_DNA_SECRET);
  await as("service_role", null, "select public.nova_submit_companions($1,$2,$3,$4)", [
    STUDENT,
    ANSWERS,
    JSON.stringify(prepared.match),
    JSON.stringify(prepared.dna),
  ]);
  await as("authenticated", STUDENT, "select public.nova_record_craft_choice('b')");
}

describe("two staff portraits for one companion", () => {
  beforeAll(async () => {
    db = await createCompanionDb();
    for (const file of [
      "20261023140000_nova_staff_craft.sql",
      "20261023150000_nova_public_card.sql",
      "20261023160000_nova_craft_art_options.sql",
    ]) {
      await db.exec(readFileSync(resolve(process.cwd(), "supabase/migrations", file), "utf8"));
    }
    as = roleQuery(db);
    await addAccount(db, STUDENT);
    await addAccount(db, ADMIN, { role: "admin" });
    await submit();
  }, 60_000);
  afterAll(() => db.close());

  it("moves waiting_for_art to options_ready to chosen, and lets staff reset", async () => {
    const card = (
      await db.query<{ id: string; public_id: string; serial: string }>(
        "select id, public_id, serial from public.nova_cards where owner_id=$1",
        [STUDENT],
      )
    ).rows[0];
    expect(card.public_id).not.toBe(card.serial);

    await expect(as("anon", null, "select public.nova_admin_craft_queue(10)")).rejects.toThrow(
      /permission denied|administrator/i,
    );
    await expect(
      as("authenticated", STUDENT, "select public.nova_admin_attach_craft_options($1,$2,$3)", [
        card.public_id,
        FIRST,
        SECOND,
      ]),
    ).rejects.toThrow(/administrator/i);

    const waiting = (
      await as("authenticated", ADMIN, "select public.nova_admin_craft_queue(10) as r")
    ).rows[0].r as Record<string, unknown>[];
    expect(waiting).toHaveLength(1);
    expect(waiting[0]).toMatchObject({
      publicId: card.public_id,
      displayName: "Pilot",
      status: "waiting_for_art",
      serial: card.serial,
    });
    expect(waiting[0]).not.toHaveProperty("email");
    expect(waiting[0]).not.toHaveProperty("phone");
    expect(JSON.stringify(waiting).toLowerCase()).not.toContain("birth year");
    expect(Array.isArray(waiting[0].traits)).toBe(true);
    expect(typeof waiting[0].personality).toBe("string");

    const before = (await as("authenticated", STUDENT, "select public.get_my_nova_card() as r"))
      .rows[0].r as { crafting: boolean; artworkPath: string | null; artOptions: unknown[] };
    expect(before.crafting).toBe(true);
    expect(before.artworkPath).toBeNull();
    expect(before.artOptions).toEqual([]);

    await expect(
      as("authenticated", ADMIN, "select public.nova_admin_attach_craft_options($1,$2,$2)", [
        card.public_id,
        FIRST,
      ]),
    ).rejects.toThrow(/different/);

    const paths = (
      await as(
        "authenticated",
        ADMIN,
        "select public.nova_admin_craft_option_paths($1,$2,$3) as r",
        [card.public_id, FIRST, SECOND],
      )
    ).rows[0].r as { option1: string; option2: string };
    expect(paths.option1).toMatch(new RegExp(`${card.id}/.+/craft/1/${FIRST}\\.png`));
    expect(paths.option2).toMatch(new RegExp(`${card.id}/.+/craft/2/${SECOND}\\.png`));

    const attached = (
      await as(
        "authenticated",
        ADMIN,
        "select public.nova_admin_attach_craft_options($1,$2,$3) as r",
        [card.public_id, FIRST, SECOND],
      )
    ).rows[0].r as { status: string; serial: string };
    expect(attached).toMatchObject({ status: "options_ready", serial: card.serial });

    const ready = (await as("authenticated", STUDENT, "select public.get_my_nova_card() as r"))
      .rows[0].r as {
      crafting: boolean;
      artworkPath: string | null;
      artOptions: { option: number; path: string }[];
      serial: string;
    };
    expect(ready.crafting).toBe(true);
    expect(ready.artworkPath).toBeNull();
    expect(ready.artOptions.map((option) => option.option)).toEqual([1, 2]);
    expect(ready.serial).toBe(card.serial);

    await as("authenticated", STUDENT, "select public.set_nova_sharing(true)");
    const opened = (
      await as("anon", null, "select public.get_public_nova_card($1) as r", [card.public_id])
    ).rows[0].r as { crafting: boolean; artworkPath: string | null };
    expect(opened.crafting).toBe(true);
    expect(opened.artworkPath).toBeNull();
    expect(opened).not.toHaveProperty("artOptions");
    expect(JSON.stringify(opened)).not.toContain(FIRST);
    expect(JSON.stringify(opened)).not.toContain(SECOND);

    const chosen = (
      await as("authenticated", STUDENT, "select public.nova_choose_craft_art(2) as r")
    ).rows[0].r as {
      crafting: boolean;
      artworkPath: string;
      artOptions: unknown[];
      serial: string;
    };
    expect(chosen.crafting).toBe(false);
    expect(chosen.artworkPath).toBe(paths.option2);
    expect(chosen.artOptions).toEqual([]);
    expect(chosen.serial).toBe(card.serial);
    await expect(
      as("authenticated", STUDENT, "select public.nova_choose_craft_art(1)"),
    ).rejects.toThrow(/already saved/);

    const queue = (
      await as("authenticated", ADMIN, "select public.nova_admin_craft_queue(10) as r")
    ).rows[0].r as { status: string; choice: number }[];
    expect(queue[0]).toMatchObject({ status: "chosen", choice: 2 });
    await expect(
      as("authenticated", ADMIN, "select public.nova_admin_attach_craft_options($1,$2,$3)", [
        card.public_id,
        FIRST,
        SECOND,
      ]),
    ).rejects.toThrow(/Reset the student choice/);

    const reset = (
      await as("authenticated", ADMIN, "select public.nova_admin_reset_craft_art($1) as r", [
        card.public_id,
      ])
    ).rows[0].r as { status: string; serial: string };
    expect(reset).toMatchObject({ status: "options_ready", serial: card.serial });
    await expect(
      as("authenticated", STUDENT, "select public.nova_admin_reset_craft_art($1)", [
        card.public_id,
      ]),
    ).rejects.toThrow(/administrator/i);

    const again = (
      await as("authenticated", STUDENT, "select public.nova_choose_craft_art(1) as r")
    ).rows[0].r as { artworkPath: string; crafting: boolean; serial: string };
    expect(again.artworkPath).toBe(paths.option1);
    expect(again.crafting).toBe(false);
    expect(again.serial).toBe(card.serial);

    const counts = (
      await db.query<{ cards: number; candidates: number; options: number; selected: number }>(
        `select (select count(*)::int from public.nova_cards where owner_id=$1) as cards,
           (select count(*)::int from public.nova_card_candidates where card_id=$2) as candidates,
           (select count(*)::int from public.nova_craft_art_options where card_id=$2) as options,
           (select count(*)::int from public.nova_artwork where card_id=$2 and selected) as selected`,
        [STUDENT, card.id],
      )
    ).rows[0];
    expect(counts).toEqual({ cards: 1, candidates: 2, options: 2, selected: 0 });
  });
});
