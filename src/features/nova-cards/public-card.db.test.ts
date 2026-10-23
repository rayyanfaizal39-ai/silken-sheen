// Review-only. Applies the staff and public-card migrations to a local PGlite
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

const STUDENT = "00000000-0000-4000-8000-0000000000e2";
const ANSWERS = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];

let db: PGlite;
let as: ReturnType<typeof roleQuery>;

describe("public companion card", () => {
  beforeAll(async () => {
    db = await createCompanionDb();
    await db.exec(
      readFileSync(
        resolve(process.cwd(), "supabase/migrations/20261023140000_nova_staff_craft.sql"),
        "utf8",
      ),
    );
    await db.exec(
      readFileSync(
        resolve(process.cwd(), "supabase/migrations/20261023150000_nova_public_card.sql"),
        "utf8",
      ),
    );
    await db.exec(
      readFileSync(
        resolve(process.cwd(), "supabase/migrations/20261023160000_nova_craft_art_options.sql"),
        "utf8",
      ),
    );
    as = roleQuery(db);
    await addAccount(db, STUDENT);
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
  });
  afterAll(() => db.close());

  it("opens a shared crafted card by public id and hides it again when sharing is off", async () => {
    const cards = await db.query<{ id: string; public_id: string; serial: string }>(
      "select id, public_id, serial from public.nova_cards where owner_id=$1",
      [STUDENT],
    );
    expect(cards.rows).toHaveLength(1);
    const { public_id: publicId, serial } = cards.rows[0];
    expect(publicId).not.toBe(serial);

    const hidden = (
      await as("anon", null, "select public.get_public_nova_card($1) as r", [publicId])
    ).rows[0].r;
    expect(hidden).toBeNull();

    await as("authenticated", STUDENT, "select public.set_nova_sharing(true)");
    const opened = (
      await as("anon", null, "select public.get_public_nova_card($1) as r", [publicId])
    ).rows[0].r as {
      publicId: string;
      serial: string;
      artworkPath: string | null;
      traits: unknown;
      crafting: boolean;
      companion: { name: string; traits: string[] };
    };
    expect(opened.publicId).toBe(publicId);
    expect(opened.serial).toBe(serial);
    expect(opened.artworkPath).toBeNull();
    expect(opened.traits).toBeNull();
    expect(opened.crafting).toBe(true);
    expect(opened.companion.name).toBeTruthy();
    const json = JSON.stringify(opened).toLowerCase();
    expect(json).not.toContain("birth year");
    expect(json).not.toContain("email");
    expect(json).not.toContain("school");
    expect(opened).not.toHaveProperty("answers");

    await as("authenticated", STUDENT, "select public.set_nova_sharing(false)");
    const closed = (
      await as("anon", null, "select public.get_public_nova_card($1) as r", [publicId])
    ).rows[0].r;
    expect(closed).toBeNull();
    const still = await db.query<{ n: number }>(
      "select count(*)::int as n from public.nova_cards where owner_id=$1",
      [STUDENT],
    );
    expect(still.rows[0].n).toBe(1);
  });
});
