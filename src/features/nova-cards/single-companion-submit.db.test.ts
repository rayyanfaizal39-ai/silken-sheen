// Review only. Applies the single-companion submit migration to a local PGlite
// database. Nothing here is applied to a hosted database.
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

const ADMIN = "00000000-0000-4000-8000-0000000000b1";
const BEFORE = "00000000-0000-4000-8000-0000000000b2";
const KEPT = "00000000-0000-4000-8000-0000000000b3";
const AFTER = "00000000-0000-4000-8000-0000000000b4";
const FREE = "00000000-0000-4000-8000-0000000000b5";
const ANSWERS = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];
const KEPT_AT = "2020-01-01T00:00:00Z";

let db: PGlite;
let as: ReturnType<typeof roleQuery>;

async function submit(student: string, name: string) {
  const draft = (await as("authenticated", student, "select public.get_my_nova_studio() as r"))
    .rows[0].r as { draft: { revision: number } };
  await as("authenticated", student, "select public.save_nova_studio_draft($1,$2,$3)", [
    ANSWERS,
    name,
    draft.draft.revision,
  ]);
  const prepared = prepareCompanionSubmission(ANSWERS, student, TEST_DNA_SECRET);
  return (
    await as("service_role", null, "select public.nova_submit_companions($1,$2,$3,$4) as r", [
      student,
      ANSWERS,
      JSON.stringify(prepared.match),
      JSON.stringify(prepared.dna),
    ])
  ).rows[0].r as { status: string; cardId: string; craftSlot?: string };
}

describe("one companion enters the staff queue at submit", () => {
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
    for (const id of [BEFORE, KEPT, AFTER]) await addAccount(db, id);
    await addAccount(db, FREE);
    await db.query(
      "update public.subscriptions set plan='free', status='active', current_period_end=now()+interval '30 days' where user_id=$1",
      [FREE],
    );
    await submit(BEFORE, "Before");
    await submit(KEPT, "Kept");
    await as("authenticated", KEPT, "select public.nova_record_craft_choice('b')");
    await db.exec(`alter table storage.buckets add column file_size_limit bigint;
      alter table storage.buckets add column allowed_mime_types text[];`);
    for (const file of [
      "20261024120000_nova_craft_queue_both_picks.sql",
      "20261024120100_nova_artwork_bucket_limits.sql",
    ]) {
      await db.exec(readFileSync(resolve(process.cwd(), "supabase/migrations", file), "utf8"));
    }
    await db.query("update public.nova_cards set craft_queued_at=$2 where owner_id=$1", [
      KEPT,
      KEPT_AT,
    ]);
    await db.exec(
      readFileSync(
        resolve(
          process.cwd(),
          "supabase/migrations/20261024130000_nova_single_companion_submit.sql",
        ),
        "utf8",
      ),
    );
  }, 60_000);

  afterAll(() => db.close());

  it("backfills an unqueued card to the preference companion and leaves a queued card unchanged", async () => {
    const before = (
      await db.query<{ craft_slot: string; aligned: boolean }>(
        `select craft_slot, craft_queued_at = created_at as aligned
         from public.nova_cards where owner_id=$1`,
        [BEFORE],
      )
    ).rows[0];
    expect(before).toEqual({ craft_slot: "a", aligned: true });

    const kept = (
      await db.query<{ craft_slot: string; same_time: boolean }>(
        `select craft_slot, craft_queued_at = $2::timestamptz as same_time
         from public.nova_cards where owner_id=$1`,
        [KEPT, KEPT_AT],
      )
    ).rows[0];
    expect(kept).toEqual({ craft_slot: "b", same_time: true });
  });

  it("sets craft_slot and craft_queued_at when a premium student submits", async () => {
    const created = await submit(AFTER, "After");
    expect(created).toMatchObject({ status: "created", craftSlot: "a" });
    const row = (
      await db.query<{
        craft_slot: string;
        queued: boolean;
        journey_entitled: boolean;
        slots: string[];
      }>(
        `select c.craft_slot, c.craft_queued_at is not null as queued, c.journey_entitled,
           array_agg(k.slot order by k.slot) as slots
         from public.nova_cards c
         join public.nova_card_candidates k on k.card_id = c.id
         where c.owner_id=$1
         group by c.id`,
        [AFTER],
      )
    ).rows[0];
    expect(row).toMatchObject({
      craft_slot: "a",
      queued: true,
      journey_entitled: true,
      slots: ["a", "b"],
    });

    const queuedAt = (
      await db.query<{ craft_queued_at: string }>(
        "select craft_queued_at from public.nova_cards where owner_id=$1",
        [AFTER],
      )
    ).rows[0].craft_queued_at;
    const prepared = prepareCompanionSubmission(ANSWERS, AFTER, TEST_DNA_SECRET);
    const again = (
      await as("service_role", null, "select public.nova_submit_companions($1,$2,$3,$4) as r", [
        AFTER,
        ANSWERS,
        JSON.stringify(prepared.match),
        JSON.stringify(prepared.dna),
      ])
    ).rows[0].r as { status: string };
    expect(again.status).toBe("existing");
    const still = (
      await db.query<{ craft_queued_at: string; n: number }>(
        `select craft_queued_at, (select count(*)::int from public.nova_cards where owner_id=$1) as n
         from public.nova_cards where owner_id=$1`,
        [AFTER],
      )
    ).rows[0];
    expect(still.n).toBe(1);
    expect(still.craft_queued_at).toEqual(queuedAt);

    const preference = (
      await db.query<{ name: string }>(
        `select k.name from public.nova_card_candidates k
         join public.nova_cards c on c.id = k.card_id
         where c.owner_id=$1 and k.slot='a'`,
        [AFTER],
      )
    ).rows[0].name;
    const other = (
      await db.query<{ name: string }>(
        `select k.name from public.nova_card_candidates k
         join public.nova_cards c on c.id = k.card_id
         where c.owner_id=$1 and k.slot='b'`,
        [AFTER],
      )
    ).rows[0].name;
    expect(other).not.toBe(preference);

    const queue = (
      await as("authenticated", ADMIN, "select public.nova_admin_craft_queue(10) as r")
    ).rows[0].r as { displayName: string; companionName: string; status: string }[];
    expect(queue.find((item) => item.displayName === "After")).toMatchObject({
      companionName: preference,
      status: "waiting_for_art",
    });
    expect(queue.find((item) => item.displayName === "Kept")?.companionName).not.toBe(preference);

    const studio = (await as("authenticated", AFTER, "select public.get_my_nova_studio() as r"))
      .rows[0].r as {
      selected: string;
      companions: unknown[];
      companion: { name: string; species: string; element: string; story: string };
    };
    expect(studio.selected).toBe("a");
    expect(studio.companions).toEqual([]);
    expect(studio.companion.name).toBe(preference);
    expect(studio.companion.species).toEqual(expect.any(String));
    expect(studio.companion.element).toEqual(expect.any(String));
    expect(studio.companion.story).toEqual(expect.any(String));

    await db.query("update public.nova_cards set journey_entitled=false where owner_id=$1", [
      AFTER,
    ]);
    const withoutGrant = (
      await as("authenticated", ADMIN, "select public.nova_admin_craft_queue(10) as r")
    ).rows[0].r as { displayName: string }[];
    expect(withoutGrant.map((item) => item.displayName)).not.toContain("After");

    const settings = (
      await db.query<{ enabled: boolean; batch_enabled: boolean }>(
        "select enabled, batch_enabled from public.nova_generation_settings",
      )
    ).rows[0];
    expect(settings).toEqual({ enabled: false, batch_enabled: false });
  });

  it("refuses a free student before a card or a queue row exists", async () => {
    await expect(
      as("authenticated", FREE, "select public.nova_begin_companion_journey()"),
    ).rejects.toThrow(/learning plan/i);
    const cards = await db.query<{ n: number }>(
      "select count(*)::int as n from public.nova_cards where owner_id=$1",
      [FREE],
    );
    expect(cards.rows[0].n).toBe(0);
  });
});
