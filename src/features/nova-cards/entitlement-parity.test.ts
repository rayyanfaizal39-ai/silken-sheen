import { readFileSync } from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { PGlite } from "@electric-sql/pglite";
import { PLAN_FEATURES } from "@/config/features";
import { STORED_PLAN_ALIASES, hasFeature, resolveStoredPlan } from "@/lib/feature-access";
import { prepareCompanionSubmission } from "../../../supabase/functions/_shared/companion-submission";
import {
  TEST_DNA_SECRET,
  addAccount,
  createCompanionDb,
  enableGeneration,
  roleQuery,
} from "./test-support/companion-pipeline";

const MIGRATION = readFileSync(
  new URL(
    "../../../supabase/migrations/20261020130000_cosmic_companion_entitlement_parity.sql",
    import.meta.url,
  ),
  "utf8",
);
const STUDENT = "00000000-0000-4000-8000-0000000000e1";
const SUSPENDED = "00000000-0000-4000-8000-0000000000e2";
const ANSWERS = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];

function taggedJson(tag: string) {
  const matches = [...MIGRATION.matchAll(new RegExp(`\\$${tag}\\$([\\s\\S]*?)\\$${tag}\\$`, "g"))];
  expect(matches.length).toBeGreaterThan(0);
  return matches.map((match) => JSON.parse(match[1]) as unknown);
}

async function submit(db: PGlite, student: string) {
  const as = roleQuery(db);
  const state = (await as("authenticated", student, "select public.get_my_nova_studio() as r"))
    .rows[0].r as { draft: { revision: number } };
  await as("authenticated", student, "select public.save_nova_studio_draft($1,'Pilot',$2)", [
    ANSWERS,
    state.draft.revision,
  ]);
  const prepared = prepareCompanionSubmission(ANSWERS, student, TEST_DNA_SECRET);
  await as("service_role", null, "select public.nova_submit_companions($1,$2,$3,$4)", [
    student,
    ANSWERS,
    JSON.stringify(prepared.match),
    JSON.stringify(prepared.dna),
  ]);
}

describe("Cosmic Companion entitlement parity", () => {
  it("keeps the SQL feature matrix identical to the TypeScript source", () => {
    for (const matrix of taggedJson("academy_plan_features")) expect(matrix).toEqual(PLAN_FEATURES);
  });

  it("keeps stored-plan aliases identical on both sides", () => {
    expect(taggedJson("academy_plan_aliases")).toEqual([STORED_PLAN_ALIASES]);
  });

  describe("migrated database behavior", () => {
    let db: PGlite;
    let as: ReturnType<typeof roleQuery>;

    beforeAll(async () => {
      db = await createCompanionDb();
      as = roleQuery(db);
      await addAccount(db, STUDENT);
      await addAccount(db, SUSPENDED);
    }, 60_000);

    afterAll(() => db.close());

    it("matches TypeScript for legacy aliases, canonical plans and unknown plans", async () => {
      for (const plan of [...Object.keys(STORED_PLAN_ALIASES), "unknown"]) {
        await db.query("update public.subscriptions set plan=$1 where user_id=$2", [plan, STUDENT]);
        const { rows } = await db.query<{ active: boolean }>(
          "select public.nova_subscription_active($1) as active",
          [STUDENT],
        );
        expect(rows[0].active, plan).toBe(hasFeature(resolveStoredPlan(plan), "cosmic_companion"));
      }
      await db.query(
        "update public.subscriptions set plan='pro',status='expired',current_period_end=now()-interval '1 day' where user_id=$1",
        [STUDENT],
      );
      expect(
        (
          await db.query<{ active: boolean }>(
            "select public.nova_subscription_active($1) as active",
            [STUDENT],
          )
        ).rows[0].active,
      ).toBe(false);
    });

    it("does not expose entitlement tables to authenticated students", async () => {
      await expect(
        as("authenticated", STUDENT, "select * from private.academy_plan_features"),
      ).rejects.toThrow(/permission denied/);
    });

    it("finishes an accepted journey after expiry without weakening active-student checks", async () => {
      await db.query(
        "update public.subscriptions set plan='pro',status='active',current_period_end=now()+interval '30 days' where user_id in ($1,$2)",
        [STUDENT, SUSPENDED],
      );
      await submit(db, STUDENT);
      await submit(db, SUSPENDED);
      await db.query(
        "update public.subscriptions set status='expired',current_period_end=now()-interval '1 day' where user_id=$1",
        [STUDENT],
      );
      await db.query("update public.profiles set status='suspended' where id=$1", [SUSPENDED]);
      await enableGeneration(db, { companion: true, monthly: 20_000_000, daily: 20_000_000 });

      const batch = (await as("service_role", null, "select public.nova_prepare_batch() as r"))
        .rows[0].r as string;
      expect(batch).toBeTruthy();
      const reservations = await db.query<{ owner_id: string; count: number; reserved: number }>(
        `select c.owner_id, count(*)::int, sum(r.reserved_microusd)::bigint::int as reserved
         from public.nova_batch_requests r
         join public.nova_generation_candidates p on p.id=r.candidate_id
         join public.nova_generation_jobs j on j.id=p.job_id
         join public.nova_cards c on c.id=j.card_id
         where r.batch_id=$1 group by c.owner_id`,
        [batch],
      );
      expect(reservations.rows).toEqual([{ owner_id: STUDENT, count: 2, reserved: 10_000_000 }]);
      expect(
        (await as("service_role", null, "select public.nova_begin_submission($1) as r", [batch]))
          .rows[0].r,
      ).toBe(true);
    });
  });
});
