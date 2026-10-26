// Review only. Applies the admin-own-journey migration to a local PGlite
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
  enableGeneration,
  roleQuery,
} from "./test-support/companion-pipeline";

const ADMIN = "00000000-0000-4000-8000-00000000e201";
const STUDENT = "00000000-0000-4000-8000-00000000e101";
const TEACHER = "00000000-0000-4000-8000-00000000e301";
const FREE = "00000000-0000-4000-8000-00000000e102";
const ANSWERS = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];
const FIRST = "ab".repeat(32);
const SECOND = "cd".repeat(32);
const THIRD = "ef".repeat(32);
const FOURTH = "12".repeat(32);

let db: PGlite;
let as: ReturnType<typeof roleQuery>;

async function canRead(user: string | null, path: string) {
  const role = user ? "authenticated" : "anon";
  const { rows } = await as(role, user, "select public.can_read_nova_artwork($1) as r", [path]);
  return rows[0].r as boolean;
}

async function summon(owner: string, nickname: string) {
  const draft = (await as("authenticated", owner, "select public.get_my_nova_studio() as r"))
    .rows[0].r as { draft: { revision: number } };
  await as("authenticated", owner, "select public.save_nova_studio_draft($1,$2,$3)", [
    ANSWERS,
    nickname,
    draft.draft.revision,
  ]);
  const prepared = prepareCompanionSubmission(ANSWERS, owner, TEST_DNA_SECRET);
  await as("service_role", null, "select public.nova_submit_companions($1,$2,$3,$4)", [
    owner,
    ANSWERS,
    JSON.stringify(prepared.match),
    JSON.stringify(prepared.dna),
  ]);
}

describe("an admin can take their own companion journey", () => {
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
    await addAccount(db, ADMIN, { role: "admin", subscription: false });
    await addAccount(db, STUDENT);
    await addAccount(db, TEACHER, { role: "teacher" });
    await addAccount(db, FREE, { subscription: false });
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
  }, 60_000);

  afterAll(() => db.close());

  it("keeps teachers and unentitled students out, and leaves image generation off", async () => {
    await expect(
      as("authenticated", TEACHER, "select public.save_nova_studio_draft($1,'Teach',0)", [ANSWERS]),
    ).rejects.toThrow(/active student account/i);
    await expect(
      db.query(
        "insert into public.nova_cards(owner_id, username, answers, variant) values ($1,'Teach',$2,'a')",
        [TEACHER, ANSWERS],
      ),
    ).rejects.toThrow(/active student or staff/i);

    const free = (await as("authenticated", FREE, "select public.get_my_nova_studio() as r"))
      .rows[0].r as { active: boolean };
    expect(free.active).toBe(false);
    await expect(
      as("authenticated", FREE, "select public.save_nova_studio_draft($1,'Free',0)", [ANSWERS]),
    ).rejects.toThrow(/learning plan/i);
    const prepared = prepareCompanionSubmission(ANSWERS, FREE, TEST_DNA_SECRET);
    await expect(
      as("service_role", null, "select public.nova_submit_companions($1,$2,$3,$4)", [
        FREE,
        ANSWERS,
        JSON.stringify(prepared.match),
        JSON.stringify(prepared.dna),
      ]),
    ).rejects.toThrow(/subscription/i);

    const active = await db.query<{ admin: boolean; student: boolean; free: boolean }>(
      `select public.nova_subscription_active($1) as admin,
              public.nova_subscription_active($2) as student,
              public.nova_subscription_active($3) as free`,
      [ADMIN, STUDENT, FREE],
    );
    expect(active.rows[0]).toEqual({ admin: true, student: true, free: false });
    const subs = await db.query<{ n: number }>(
      "select count(*)::int as n from public.subscriptions where user_id = $1",
      [ADMIN],
    );
    expect(subs.rows[0].n).toBe(0);

    const settings = await db.query<{ enabled: boolean; batch_enabled: boolean }>(
      "select enabled, batch_enabled from public.nova_generation_settings",
    );
    expect(settings.rows[0]).toEqual({ enabled: false, batch_enabled: false });
  });

  it("queues the admin card with a staff badge and does not send it to paid generation", async () => {
    const before = (await as("authenticated", ADMIN, "select public.get_my_nova_studio() as r"))
      .rows[0].r as { active: boolean; enabled: boolean };
    expect(before).toMatchObject({ active: true, enabled: false });
    await summon(ADMIN, "Staff");

    const card = (
      await db.query<{
        craft_slot: string;
        queued: boolean;
        entitled: boolean;
        public_id: string;
      }>(
        `select craft_slot, craft_queued_at is not null as queued, journey_entitled as entitled, public_id
         from public.nova_cards where owner_id = $1`,
        [ADMIN],
      )
    ).rows[0];
    expect(card).toMatchObject({ craft_slot: "a", queued: true, entitled: true });

    await enableGeneration(db);
    const batch = await as("service_role", null, "select public.nova_prepare_batch() as r");
    expect(batch.rows[0].r).toBeNull();
    const pending = await db.query<{ n: number }>(
      `select count(*)::int as n
       from public.nova_generation_candidates candidate
       join public.nova_generation_jobs job on job.id = candidate.job_id
       join public.nova_cards card on card.id = job.card_id
       where card.owner_id = $1 and candidate.status = 'pending'`,
      [ADMIN],
    );
    expect(pending.rows[0].n).toBe(2);
    await db.query(
      "update public.nova_generation_settings set enabled = false, batch_enabled = false",
    );

    await summon(STUDENT, "Aisha");
    await db.query(
      "update public.nova_cards set craft_queued_at = '2026-10-24 01:00:00+00' where owner_id = $1",
      [STUDENT],
    );
    await db.query(
      "update public.nova_cards set craft_queued_at = '2026-10-24 02:00:00+00' where owner_id = $1",
      [ADMIN],
    );

    const queue = (
      await as("authenticated", ADMIN, "select public.nova_admin_craft_queue(10) as r")
    ).rows[0].r as {
      position: number;
      displayName: string;
      staffTest: boolean;
      publicId: string;
    }[];
    expect(queue.map((item) => [item.position, item.displayName, item.staffTest])).toEqual([
      [1, "Aisha", false],
      [2, "Staff", true],
    ]);
    await expect(
      as("authenticated", STUDENT, "select public.nova_admin_craft_queue(10)"),
    ).rejects.toThrow(/administrator/i);

    const own = await as("authenticated", ADMIN, "select owner_id from public.nova_cards");
    expect(own.rows).toEqual([{ owner_id: ADMIN }]);

    const brief = (
      await as("authenticated", ADMIN, "select public.nova_admin_craft_brief($1) as r", [
        card.public_id,
      ])
    ).rows[0].r as { staffTest: boolean; nickname: string };
    const packed = JSON.stringify(brief);
    expect(brief).toMatchObject({ staffTest: true, nickname: "Staff" });
    expect(packed).not.toContain(ADMIN);
    expect(packed).not.toContain(STUDENT);
    expect(packed.toLowerCase()).not.toContain("email");
    expect(packed).not.toContain("userId");

    const studentBrief = (
      await as("authenticated", ADMIN, "select public.nova_admin_craft_brief($1) as r", [
        queue[0].publicId,
      ])
    ).rows[0].r as { staffTest: boolean };
    expect(studentBrief.staffTest).toBe(false);
  });

  it("lets the admin read and pick only their own portraits", async () => {
    const cards = (
      await db.query<{ owner_id: string; id: string; public_id: string }>(
        "select owner_id, id, public_id from public.nova_cards",
      )
    ).rows;
    const adminCard = cards.find((row) => row.owner_id === ADMIN)!;
    const studentCard = cards.find((row) => row.owner_id === STUDENT)!;
    const adminOne = `${adminCard.id}/craft/1/${FIRST}.png`;
    const adminTwo = `${adminCard.id}/craft/2/${SECOND}.png`;
    const studentOne = `${studentCard.id}/craft/1/${THIRD}.png`;
    const studentTwo = `${studentCard.id}/craft/2/${FOURTH}.png`;
    await db.query(
      `insert into public.nova_craft_art_options(card_id, option_no, storage_path, sha256)
       values ($1, 1, $2, $3), ($1, 2, $4, $5)`,
      [adminCard.id, adminOne, FIRST, adminTwo, SECOND],
    );
    await db.query(
      `insert into public.nova_craft_art_options(card_id, option_no, storage_path, sha256)
       values ($1, 1, $2, $3), ($1, 2, $4, $5)`,
      [studentCard.id, studentOne, THIRD, studentTwo, FOURTH],
    );
    await db.query(
      "update public.nova_generation_jobs set reveal_after = now() - interval '1 minute' where card_id in ($1, $2)",
      [adminCard.id, studentCard.id],
    );

    expect(await canRead(ADMIN, adminOne)).toBe(true);
    expect(await canRead(ADMIN, adminTwo)).toBe(true);
    expect(await canRead(ADMIN, studentOne)).toBe(false);
    expect(await canRead(ADMIN, studentTwo)).toBe(false);
    expect(await canRead(STUDENT, studentOne)).toBe(true);
    expect(await canRead(STUDENT, adminOne)).toBe(false);

    const chosen = await as("authenticated", ADMIN, "select public.nova_choose_craft_art(2) as r");
    const payload = chosen.rows[0].r as { artworkPath: string | null; artOptions: unknown[] };
    expect(payload.artworkPath).toBe(adminTwo);
    expect(payload.artOptions).toEqual([]);
    const choices = await db.query<{ owner_id: string; craft_art_choice: number | null }>(
      "select owner_id, craft_art_choice from public.nova_cards",
    );
    expect(choices.rows.find((row) => row.owner_id === STUDENT)?.craft_art_choice).toBeNull();
    expect(Number(choices.rows.find((row) => row.owner_id === ADMIN)?.craft_art_choice)).toBe(2);
    expect(await canRead(ADMIN, adminOne)).toBe(false);
    expect(await canRead(ADMIN, adminTwo)).toBe(true);
    expect(await canRead(ADMIN, studentOne)).toBe(false);

    await as("authenticated", ADMIN, "select public.set_nova_sharing(true)");
    const shared = (
      await as("anon", null, "select public.get_public_nova_card($1) as r", [adminCard.public_id])
    ).rows[0].r as { artworkPath: string | null; artOptions?: unknown };
    expect(shared.artworkPath).toBe(adminTwo);
    expect(shared.artOptions).toBeUndefined();
    expect(JSON.stringify(shared)).not.toContain(adminOne);
    expect(await canRead(null, adminTwo)).toBe(true);
    expect(await canRead(null, adminOne)).toBe(false);
    expect(await canRead(null, studentOne)).toBe(false);

    const settings = await db.query<{ enabled: boolean; batch_enabled: boolean }>(
      "select enabled, batch_enabled from public.nova_generation_settings",
    );
    expect(settings.rows[0]).toEqual({ enabled: false, batch_enabled: false });
  });
});
