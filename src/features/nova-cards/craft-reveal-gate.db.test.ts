// Review only. Applies craft reveal gate migrations to a local PGlite database.
// Nothing here is applied to a hosted database.
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

const ADMIN = "00000000-0000-4000-8000-0000000000d1";
const STUDENT = "00000000-0000-4000-8000-0000000000d2";
const OTHER = "00000000-0000-4000-8000-0000000000d3";
const ANSWERS = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];
const FIRST = "ab".repeat(32);
const SECOND = "cd".repeat(32);

let db: PGlite;
let as: ReturnType<typeof roleQuery>;

async function canRead(user: string | null, path: string) {
  const role = user ? "authenticated" : "anon";
  const { rows } = await as(role, user, "select public.can_read_nova_artwork($1) as r", [path]);
  return rows[0].r as boolean;
}

async function openReveal(cardId: string) {
  await db.query(
    "update public.nova_generation_jobs set reveal_after = now() - interval '1 minute' where card_id = $1",
    [cardId],
  );
}

async function closeReveal(cardId: string) {
  await db.query(
    "update public.nova_generation_jobs set reveal_after = now() + interval '1 day' where card_id = $1",
    [cardId],
  );
}

describe("craft portrait reveal schedule gate", () => {
  beforeAll(async () => {
    db = await createCompanionDb();
    for (const file of [
      "20261023140000_nova_staff_craft.sql",
      "20261023150000_nova_public_card.sql",
      "20261023160000_nova_craft_art_options.sql",
      "20261023170000_nova_companion_journey_gate.sql",
    ]) {
      await db.exec(readFileSync(resolve(process.cwd(), "supabase/migrations", file), "utf8"));
    }
    as = roleQuery(db);
    await addAccount(db, ADMIN, { role: "admin" });
    await addAccount(db, STUDENT);
    await addAccount(db, OTHER);
    await db.query(
      "update public.subscriptions set plan = 'premium', status = 'active', current_period_end = '2026-11-22T00:00:00Z' where user_id = $1",
      [STUDENT],
    );
    await db.exec(`alter table storage.buckets add column file_size_limit bigint;
      alter table storage.buckets add column allowed_mime_types text[];`);
    for (const file of [
      "20261024120000_nova_craft_queue_both_picks.sql",
      "20261024120100_nova_artwork_bucket_limits.sql",
      "20261024130000_nova_single_companion_submit.sql",
      "20261024140000_nova_craft_portrait_read.sql",
      "20261024150000_nova_admin_own_journey.sql",
      "20261026120000_nova_craft_reveal_gate.sql",
    ]) {
      await db.exec(readFileSync(resolve(process.cwd(), "supabase/migrations", file), "utf8"));
    }

    const draft = (await as("authenticated", STUDENT, "select public.get_my_nova_studio() as r"))
      .rows[0].r as { draft: { revision: number } };
    await as("authenticated", STUDENT, "select public.save_nova_studio_draft($1,'Mira',$2)", [
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
  }, 90_000);

  afterAll(() => db.close());

  it("denies portrait paths and choice before reveal_after, even when both options exist", async () => {
    const card = (
      await db.query<{ id: string; public_id: string }>(
        "select id, public_id from public.nova_cards where owner_id = $1",
        [STUDENT],
      )
    ).rows[0];
    await closeReveal(card.id);

    const paths = (
      await as(
        "authenticated",
        ADMIN,
        "select public.nova_admin_craft_option_paths($1,$2,$3) as r",
        [card.public_id, FIRST, SECOND],
      )
    ).rows[0].r as { option1: string; option2: string };
    await as("authenticated", ADMIN, "select public.nova_admin_attach_craft_options($1,$2,$3)", [
      card.public_id,
      FIRST,
      SECOND,
    ]);

    const waiting = (await as("authenticated", STUDENT, "select public.get_my_nova_card() as r"))
      .rows[0].r as {
      crafting: boolean;
      artworkPath: string | null;
      artOptions: unknown[];
      craftOptionsReady: boolean;
      companion: { name: string };
    };
    expect(waiting.crafting).toBe(true);
    expect(waiting.artworkPath).toBeNull();
    expect(waiting.artOptions).toEqual([]);
    expect(waiting.craftOptionsReady).toBe(true);
    expect(waiting.companion.name).toEqual(expect.any(String));
    expect(JSON.stringify(waiting)).not.toContain(paths.option1);
    expect(JSON.stringify(waiting)).not.toContain(paths.option2);

    expect(await canRead(STUDENT, paths.option1)).toBe(false);
    expect(await canRead(STUDENT, paths.option2)).toBe(false);
    expect(await canRead(OTHER, paths.option1)).toBe(false);
    await expect(
      as("authenticated", STUDENT, "select public.nova_choose_craft_art(1)"),
    ).rejects.toThrow(/not ready to choose/i);
  });

  it("denies when the reveal window is open but staff options are incomplete", async () => {
    const card = (
      await db.query<{ id: string }>("select id from public.nova_cards where owner_id = $1", [
        STUDENT,
      ])
    ).rows[0];
    await db.query("delete from public.nova_craft_art_options where card_id = $1", [card.id]);
    await openReveal(card.id);

    const incomplete = (await as("authenticated", STUDENT, "select public.get_my_nova_card() as r"))
      .rows[0].r as { artOptions: unknown[]; craftOptionsReady: boolean };
    expect(incomplete.artOptions).toEqual([]);
    expect(incomplete.craftOptionsReady).toBe(false);
    await expect(
      as("authenticated", STUDENT, "select public.nova_choose_craft_art(1)"),
    ).rejects.toThrow(/not ready to choose|being crafted/i);

    const gate = (
      await db.query<{ ready: boolean }>(
        "select public.nova_craft_portraits_reveal_ready(c) as ready from public.nova_cards c where c.id = $1",
        [card.id],
      )
    ).rows[0];
    expect(gate.ready).toBe(false);
  });

  it("fails closed when reveal_after is missing", async () => {
    const card = (
      await db.query<{ id: string; public_id: string }>(
        "select id, public_id from public.nova_cards where owner_id = $1",
        [STUDENT],
      )
    ).rows[0];
    await as("authenticated", ADMIN, "select public.nova_admin_attach_craft_options($1,$2,$3)", [
      card.public_id,
      FIRST,
      SECOND,
    ]);
    await db.query(
      "update public.nova_generation_jobs set reveal_after = null where card_id = $1",
      [card.id],
    );

    const blocked = (await as("authenticated", STUDENT, "select public.get_my_nova_card() as r"))
      .rows[0].r as { artOptions: unknown[]; craftOptionsReady: boolean };
    expect(blocked.craftOptionsReady).toBe(true);
    expect(blocked.artOptions).toEqual([]);
    await expect(
      as("authenticated", STUDENT, "select public.nova_choose_craft_art(2)"),
    ).rejects.toThrow(/not ready to choose/i);

    await openReveal(card.id);
  });

  it("allows owner read and choice only after schedule + both portraits, keeps other students out", async () => {
    const card = (
      await db.query<{ id: string; public_id: string }>(
        "select id, public_id from public.nova_cards where owner_id = $1",
        [STUDENT],
      )
    ).rows[0];
    const paths = (
      await as(
        "authenticated",
        ADMIN,
        "select public.nova_admin_craft_option_paths($1,$2,$3) as r",
        [card.public_id, FIRST, SECOND],
      )
    ).rows[0].r as { option1: string; option2: string };
    await as("authenticated", ADMIN, "select public.nova_admin_attach_craft_options($1,$2,$3)", [
      card.public_id,
      FIRST,
      SECOND,
    ]);
    await openReveal(card.id);

    const ready = (await as("authenticated", STUDENT, "select public.get_my_nova_card() as r"))
      .rows[0].r as {
      artOptions: { option: number; path: string }[];
      craftOptionsReady: boolean;
    };
    expect(ready.craftOptionsReady).toBe(true);
    expect(ready.artOptions.map((option) => option.path)).toEqual([paths.option1, paths.option2]);
    expect(await canRead(STUDENT, paths.option1)).toBe(true);
    expect(await canRead(STUDENT, paths.option2)).toBe(true);
    expect(await canRead(OTHER, paths.option1)).toBe(false);

    const chosen = (
      await as("authenticated", STUDENT, "select public.nova_choose_craft_art(2) as r")
    ).rows[0].r as {
      artworkPath: string;
      artOptions: unknown[];
      craftOptionsReady: boolean;
      crafting: boolean;
    };
    expect(chosen.artworkPath).toBe(paths.option2);
    expect(chosen.artOptions).toEqual([]);
    expect(chosen.craftOptionsReady).toBe(false);
    expect(chosen.crafting).toBe(false);
    expect(await canRead(STUDENT, paths.option2)).toBe(true);
    expect(await canRead(STUDENT, paths.option1)).toBe(false);
    expect(await canRead(OTHER, paths.option2)).toBe(false);

    await as("authenticated", STUDENT, "select public.set_nova_sharing(true)");
    expect(await canRead(null, paths.option2)).toBe(true);
    expect(await canRead(null, paths.option1)).toBe(false);
    const shared = (
      await as("anon", null, "select public.get_public_nova_card($1) as r", [card.public_id])
    ).rows[0].r as { artworkPath: string | null };
    expect(shared.artworkPath).toBe(paths.option2);
    expect(JSON.stringify(shared)).not.toContain(paths.option1);
  });

  it("leaves nova_origin_reveal_ready unchanged for the legacy two-companion path", async () => {
    const before = (
      await db.query<{ def: string }>(
        "select pg_get_functiondef('public.nova_origin_reveal_ready(public.nova_cards)'::regprocedure) as def",
      )
    ).rows[0].def;
    expect(before).toContain("nova_artwork");
    expect(before).not.toContain("nova_craft_art_options");
    expect(before).toContain("reveal_after");
  });
});
