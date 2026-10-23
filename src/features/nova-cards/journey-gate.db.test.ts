// Review only. Applies the journey gate to a local PGlite database after the
// Nova chain. Nothing here is applied to a hosted database.
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

const ADMIN = "00000000-0000-4000-8000-0000000000f1";
const PREMIUM = "00000000-0000-4000-8000-0000000000f2";
const FREE = "00000000-0000-4000-8000-0000000000f3";
const ANSWERS = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];

let db: PGlite;
let as: ReturnType<typeof roleQuery>;

async function saveDraft(student: string) {
  const draft = (await as("authenticated", student, "select public.get_my_nova_studio() as r"))
    .rows[0].r as { draft: { revision: number } };
  await as("authenticated", student, "select public.save_nova_studio_draft($1,'Pilot',$2)", [
    ANSWERS,
    draft.draft.revision,
  ]);
}

async function submit(student: string) {
  await saveDraft(student);
  const prepared = prepareCompanionSubmission(ANSWERS, student, TEST_DNA_SECRET);
  return (
    await as("service_role", null, "select public.nova_submit_companions($1,$2,$3,$4) as r", [
      student,
      ANSWERS,
      JSON.stringify(prepared.match),
      JSON.stringify(prepared.dna),
    ])
  ).rows[0].r as { status: string; cardId: string; journeyEntitled?: boolean };
}

describe("Cosmic Companion journey gate", () => {
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
    await addAccount(db, PREMIUM);
    await addAccount(db, FREE);
    await addAccount(db, ADMIN, { role: "admin" });
    await db.query("update public.subscriptions set plan='premium' where user_id=$1", [PREMIUM]);
    await db.query(
      "update public.subscriptions set plan='free', status='active', current_period_end=now()+interval '30 days' where user_id=$1",
      [FREE],
    );
  }, 60_000);

  afterAll(() => db.close());

  it("refuses a free student at the journey gate and sends the check through the entitlement", async () => {
    await expect(
      as("authenticated", FREE, "select public.nova_begin_companion_journey()"),
    ).rejects.toThrow(/learning plan/i);
    await expect(saveDraft(FREE)).rejects.toThrow(/learning plan/i);
    const cards = await db.query<{ n: number }>(
      "select count(*)::int as n from public.nova_cards where owner_id=$1",
      [FREE],
    );
    expect(cards.rows[0].n).toBe(0);
  });

  it("lets a premium student complete the journey once and records the paid grant", async () => {
    const opened = (
      await as("authenticated", PREMIUM, "select public.nova_begin_companion_journey() as r")
    ).rows[0].r as { ok: boolean };
    expect(opened.ok).toBe(true);
    const created = await submit(PREMIUM);
    expect(created.status).toBe("created");
    expect(created.journeyEntitled).toBe(true);
    const flag = await db.query<{ journey_entitled: boolean }>(
      "select journey_entitled from public.nova_cards where owner_id=$1",
      [PREMIUM],
    );
    expect(flag.rows[0].journey_entitled).toBe(true);
  });

  it("blocks a second journey after the permanent card exists", async () => {
    await expect(
      as("authenticated", PREMIUM, "select public.nova_begin_companion_journey()"),
    ).rejects.toThrow(/already complete/i);
    await expect(saveDraft(PREMIUM)).rejects.toThrow(/already saved/i);
    const prepared = prepareCompanionSubmission(ANSWERS, PREMIUM, TEST_DNA_SECRET);
    const again = (
      await as("service_role", null, "select public.nova_submit_companions($1,$2,$3,$4) as r", [
        PREMIUM,
        ANSWERS,
        JSON.stringify(prepared.match),
        JSON.stringify(prepared.dna),
      ])
    ).rows[0].r as { status: string };
    expect(again.status).toBe("existing");
    const cards = await db.query<{ n: number }>(
      "select count(*)::int as n from public.nova_cards where owner_id=$1",
      [PREMIUM],
    );
    expect(cards.rows[0].n).toBe(1);
  });

  it("enqueues the student for artwork only after the paid journey is finished", async () => {
    const beforeChoice = (
      await as("authenticated", ADMIN, "select public.nova_admin_craft_queue(10) as r")
    ).rows[0].r as unknown[];
    expect(beforeChoice).toEqual([]);

    await as("authenticated", PREMIUM, "select public.nova_record_craft_choice('a')");
    const queued = (
      await as("authenticated", ADMIN, "select public.nova_admin_craft_queue(10) as r")
    ).rows[0].r as { displayName: string; status: string }[];
    expect(queued).toHaveLength(1);
    expect(queued[0]).toMatchObject({ displayName: "Pilot", status: "waiting_for_art" });

    await db.query("update public.nova_cards set journey_entitled=false where owner_id=$1", [
      PREMIUM,
    ]);
    const withoutGrant = (
      await as("authenticated", ADMIN, "select public.nova_admin_craft_queue(10) as r")
    ).rows[0].r as unknown[];
    expect(withoutGrant).toEqual([]);
  });
});
