// The staff craft migration is review-only. This test applies it to a local
// PGlite database after the existing Nova chain. It is not applied remotely.
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
const ANSWERS = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];
const DIGEST = "ab".repeat(32);
const REPLACEMENT = "cd".repeat(32);

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
}

describe("staff companion craft queue", () => {
  beforeAll(async () => {
    db = await createCompanionDb();
    await db.exec(
      readFileSync(
        resolve(process.cwd(), "supabase/migrations/20261023140000_nova_staff_craft.sql"),
        "utf8",
      ),
    );
    as = roleQuery(db);
    await addAccount(db, STUDENT);
    await addAccount(db, ADMIN, { role: "admin" });
    await submit();
  }, 60_000);
  afterAll(() => db.close());

  it("keeps image generation switched off", async () => {
    const { rows } = await db.query<{ enabled: boolean; batch_enabled: boolean }>(
      "select enabled, batch_enabled from public.nova_generation_settings",
    );
    expect(rows[0]).toMatchObject({ enabled: false, batch_enabled: false });
  });

  it("records one choice, then lets only an admin attach and approve that same card", async () => {
    const before = await db.query<{ id: string; serial: string }>(
      `select id, serial from public.nova_cards where owner_id=$1`,
      [STUDENT],
    );
    const serial = before.rows[0].serial;
    const cardId = before.rows[0].id;
    expect(before.rows).toHaveLength(1);

    const choice = await as(
      "authenticated",
      STUDENT,
      "select public.nova_record_craft_choice('b') as r",
    );
    expect(choice.rows[0].r).toMatchObject({ serial, slot: "b" });
    await expect(
      as("authenticated", STUDENT, "select public.nova_record_craft_choice('a')"),
    ).rejects.toThrow(/already saved/);

    await expect(as("anon", null, "select public.nova_admin_craft_queue(10)")).rejects.toThrow(
      /permission denied|administrator/i,
    );
    await expect(
      as("authenticated", STUDENT, "select public.nova_admin_craft_queue(10)"),
    ).rejects.toThrow(/administrator/i);

    const queue = (
      await as("authenticated", ADMIN, "select public.nova_admin_craft_queue(10) as r")
    ).rows[0].r as {
      serial: string;
      slot: string;
      status: string;
      username: string;
    }[];
    expect(queue).toHaveLength(1);
    expect(queue[0]).toMatchObject({
      serial,
      slot: "b",
      status: "awaiting_art",
      username: "Pilot",
    });
    expect(JSON.stringify(queue).toLowerCase()).not.toContain("birth year");

    const waiting = (await as("authenticated", STUDENT, "select public.get_my_nova_card() as r"))
      .rows[0].r as {
      crafting: boolean;
      artworkPath: string | null;
      serial: string;
      companion: { name: string };
    };
    expect(waiting.crafting).toBe(true);
    expect(waiting.artworkPath).toBeNull();
    expect(waiting.serial).toBe(serial);
    expect(waiting.companion.name).toBeTruthy();

    const path = (
      await as("authenticated", ADMIN, "select public.nova_admin_craft_artwork_path($1,$2) as r", [
        cardId,
        DIGEST,
      ])
    ).rows[0].r as string;
    expect(path).toMatch(new RegExp(`${cardId}/.+/b/${DIGEST}\\.png`));

    const attached = (
      await as(
        "authenticated",
        ADMIN,
        "select public.nova_admin_attach_craft_artwork($1,$2) as r",
        [cardId, DIGEST],
      )
    ).rows[0].r as { serial: string; status: string; artworkId: string };
    expect(attached).toMatchObject({ serial, status: "pending_review" });
    await expect(
      as("authenticated", STUDENT, "select public.nova_admin_publish_craft_artwork($1)", [
        attached.artworkId,
      ]),
    ).rejects.toThrow(/administrator/i);

    const published = (
      await as("authenticated", ADMIN, "select public.nova_admin_publish_craft_artwork($1) as r", [
        attached.artworkId,
      ])
    ).rows[0].r as { serial: string; status: string };
    expect(published).toMatchObject({ serial, status: "approved" });

    const live = (await as("authenticated", STUDENT, "select public.get_my_nova_card() as r"))
      .rows[0].r as { crafting: boolean; artworkPath: string; serial: string };
    expect(live.crafting).toBe(false);
    expect(live.artworkPath).toBe(path);
    expect(live.serial).toBe(serial);

    const replaced = (
      await as(
        "authenticated",
        ADMIN,
        "select public.nova_admin_attach_craft_artwork($1,$2) as r",
        [cardId, REPLACEMENT],
      )
    ).rows[0].r as { artworkId: string; serial: string };
    const still = (await as("authenticated", STUDENT, "select public.get_my_nova_card() as r"))
      .rows[0].r as { artworkPath: string; serial: string; crafting: boolean };
    expect(still.artworkPath).toBe(path);
    expect(still.crafting).toBe(false);
    expect(still.serial).toBe(serial);

    await as("authenticated", ADMIN, "select public.nova_admin_publish_craft_artwork($1)", [
      replaced.artworkId,
    ]);
    const next = (await as("authenticated", STUDENT, "select public.get_my_nova_card() as r"))
      .rows[0].r as { artworkPath: string; serial: string };
    expect(next.artworkPath).toContain(REPLACEMENT);
    expect(next.serial).toBe(serial);

    const after = await db.query<{ cards: number; selected: number }>(
      `select (select count(*)::int from public.nova_cards where owner_id=$2) as cards,
         (select count(*)::int from public.nova_artwork where card_id=$1 and selected) as selected`,
      [cardId, STUDENT],
    );
    expect(after.rows[0]).toEqual({ cards: 1, selected: 1 });
  });
});
