// Review only. Applies the craft-portrait read migration to a local PGlite
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

const ADMIN = "00000000-0000-4000-8000-0000000000c1";
const STUDENT = "00000000-0000-4000-8000-0000000000c2";
const OTHER = "00000000-0000-4000-8000-0000000000c3";
const PAID_PROFILE = "00000000-0000-4000-8000-0000000000c4";
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

describe("craft portraits are readable by the owner", () => {
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
    await db.exec("alter table public.profiles add column plan text not null default 'free'");
    await addAccount(db, ADMIN, { role: "admin" });
    await addAccount(db, STUDENT);
    await addAccount(db, OTHER);
    await addAccount(db, PAID_PROFILE);
    await db.query("update public.profiles set plan = 'free' where id = $1", [STUDENT]);
    await db.query(
      "update public.subscriptions set plan = 'premium', status = 'active', current_period_end = '2026-11-22T00:00:00Z' where user_id = $1",
      [STUDENT],
    );
    await db.query("update public.profiles set plan = 'paid' where id = $1", [PAID_PROFILE]);
    await db.query(
      "update public.subscriptions set plan = 'free', status = 'active', current_period_end = '2026-11-22T00:00:00Z' where user_id = $1",
      [PAID_PROFILE],
    );
    await db.exec(`alter table storage.buckets add column file_size_limit bigint;
      alter table storage.buckets add column allowed_mime_types text[];`);
    for (const file of [
      "20261024120000_nova_craft_queue_both_picks.sql",
      "20261024120100_nova_artwork_bucket_limits.sql",
      "20261024130000_nova_single_companion_submit.sql",
    ]) {
      await db.exec(readFileSync(resolve(process.cwd(), "supabase/migrations", file), "utf8"));
    }
  }, 60_000);

  afterAll(() => db.close());

  it("keeps a premium student with profiles.plan free entitled, and a paid profile without the feature not entitled", async () => {
    const draft = (await as("authenticated", STUDENT, "select public.get_my_nova_studio() as r"))
      .rows[0].r as { draft: { revision: number }; active: boolean; enabled: boolean };
    expect(draft.active).toBe(true);
    expect(draft.enabled).toBe(false);
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

    const locked = (
      await db.query<{ plan: string; craft_slot: string; queued: boolean; entitled: boolean }>(
        `select p.plan, c.craft_slot, c.craft_queued_at is not null as queued, c.journey_entitled as entitled
         from public.nova_cards c join public.profiles p on p.id = c.owner_id
         where c.owner_id = $1`,
        [STUDENT],
      )
    ).rows[0];
    expect(locked).toEqual({ plan: "free", craft_slot: "a", queued: true, entitled: true });

    const studio = (await as("authenticated", STUDENT, "select public.get_my_nova_studio() as r"))
      .rows[0].r as {
      active: boolean;
      enabled: boolean;
      selected: string;
      candidates: unknown[];
      companions: unknown[];
      companion: { name: string };
      origin: { status: string; ready: boolean };
    };
    expect(studio.active).toBe(true);
    expect(studio.enabled).toBe(false);
    expect(studio.selected).toBe("a");
    expect(studio.candidates).toEqual([]);
    expect(studio.companions).toEqual([]);
    expect(studio.companion.name).toEqual(expect.any(String));
    expect(studio.origin).toMatchObject({ status: "queued", ready: false });

    const profileOnly = (
      await as("authenticated", PAID_PROFILE, "select public.get_my_nova_studio() as r")
    ).rows[0].r as { active: boolean };
    expect(profileOnly.active).toBe(false);

    const settings = (
      await db.query<{ enabled: boolean; batch_enabled: boolean }>(
        "select enabled, batch_enabled from public.nova_generation_settings",
      )
    ).rows[0];
    expect(settings).toEqual({ enabled: false, batch_enabled: false });
  });

  it("lets the owner read both portraits only after the review migration, then only the chosen one", async () => {
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
    const ready = (await as("authenticated", STUDENT, "select public.get_my_nova_card() as r"))
      .rows[0].r as {
      crafting: boolean;
      artworkPath: string | null;
      artOptions: { option: number; path: string }[];
    };
    expect(ready.crafting).toBe(true);
    expect(ready.artworkPath).toBeNull();
    expect(ready.artOptions.map((option) => option.path)).toEqual([paths.option1, paths.option2]);

    // This is the staging failure: signing these paths throws, and the page treated it as Upgrade.
    expect(await canRead(STUDENT, paths.option1)).toBe(false);
    expect(await canRead(STUDENT, paths.option2)).toBe(false);

    await db.exec(
      readFileSync(
        resolve(process.cwd(), "supabase/migrations/20261024140000_nova_craft_portrait_read.sql"),
        "utf8",
      ),
    );
    await db.exec(
      readFileSync(
        resolve(process.cwd(), "supabase/migrations/20261024150000_nova_admin_own_journey.sql"),
        "utf8",
      ),
    );
    await db.exec(
      readFileSync(
        resolve(process.cwd(), "supabase/migrations/20261026120000_nova_craft_reveal_gate.sql"),
        "utf8",
      ),
    );

    // Schedule still closed: paths stay hidden even after the read migration.
    expect(await canRead(STUDENT, paths.option1)).toBe(false);
    const gated = (await as("authenticated", STUDENT, "select public.get_my_nova_card() as r"))
      .rows[0].r as { artOptions: unknown[]; craftOptionsReady: boolean };
    expect(gated.artOptions).toEqual([]);
    expect(gated.craftOptionsReady).toBe(true);

    await db.query(
      "update public.nova_generation_jobs set reveal_after = now() - interval '1 minute' where card_id = $1",
      [card.id],
    );

    expect(await canRead(STUDENT, paths.option1)).toBe(true);
    expect(await canRead(STUDENT, paths.option2)).toBe(true);
    expect(await canRead(OTHER, paths.option1)).toBe(false);
    expect(await canRead(null, paths.option1)).toBe(false);

    const chosen = (
      await as("authenticated", STUDENT, "select public.nova_choose_craft_art(2) as r")
    ).rows[0].r as { artworkPath: string; artOptions: unknown[]; crafting: boolean };
    expect(chosen.artworkPath).toBe(paths.option2);
    expect(chosen.artOptions).toEqual([]);
    expect(chosen.crafting).toBe(false);
    expect(await canRead(STUDENT, paths.option2)).toBe(true);
    expect(await canRead(STUDENT, paths.option1)).toBe(false);
    expect(await canRead(null, paths.option2)).toBe(false);

    await as("authenticated", STUDENT, "select public.set_nova_sharing(true)");
    const shared = (
      await as("anon", null, "select public.get_public_nova_card($1) as r", [card.public_id])
    ).rows[0].r as { artworkPath: string | null };
    expect(shared.artworkPath).toBe(paths.option2);
    expect(JSON.stringify(shared)).not.toContain(paths.option1);
    expect(await canRead(null, paths.option2)).toBe(true);
    expect(await canRead(null, paths.option1)).toBe(false);
    expect(await canRead(OTHER, paths.option1)).toBe(false);

    const settings = (
      await db.query<{ enabled: boolean; batch_enabled: boolean }>(
        "select enabled, batch_enabled from public.nova_generation_settings",
      )
    ).rows[0];
    expect(settings).toEqual({ enabled: false, batch_enabled: false });
  });
});
