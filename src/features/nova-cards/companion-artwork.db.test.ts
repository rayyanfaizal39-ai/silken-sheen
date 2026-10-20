// Phase 4C database tests for 20261020120000_cosmic_companion_artwork.sql on the full chain.
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

const ADMIN = "00000000-0000-4000-8000-0000000000c1";
const STUDENT = "00000000-0000-4000-8000-0000000000c2";
const OTHER = "00000000-0000-4000-8000-0000000000c3";
const ANSWERS = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];
const OTHER_ANSWERS = [3, 4, 3, 2, 1, 3, 0, 3, 1, 2, 3, 2];
let db: PGlite;
let as: ReturnType<typeof roleQuery>;
type Row = Record<string, unknown>;

async function submitFor(student: string, answers: number[], dna?: unknown) {
  const draft = (await as("authenticated", student, "select public.get_my_nova_studio() as r"))
    .rows[0].r as { draft: { revision: number } };
  await as("authenticated", student, "select public.save_nova_studio_draft($1,'Pilot',$2)", [
    answers,
    draft.draft.revision,
  ]);
  const prepared = prepareCompanionSubmission(answers, student, TEST_DNA_SECRET);
  return as("service_role", null, "select public.nova_submit_companions($1,$2,$3,$4) as r", [
    student,
    answers,
    JSON.stringify(prepared.match),
    JSON.stringify(dna ?? prepared.dna),
  ]);
}
const cardOf = async (user: string) =>
  (await db.query<{ id: string }>("select id from public.nova_cards where owner_id=$1", [user]))
    .rows[0]?.id;
/** Insert one technically valid companion image as the worker would (pending review). */
async function artwork(cardId: string, slot: "a" | "b", n: number) {
  const { rows } = await db.query<{ id: string }>(
    "select id from public.nova_generation_jobs where card_id=$1 and stage=1",
    [cardId],
  );
  const sha = String(n).repeat(64).slice(0, 64);
  const inserted = await db.query<{ id: string }>(
    `insert into public.nova_artwork(card_id,job_id,stage,candidate,storage_path,sha256,validation_version,review_status,phash,quality_checks)
     values($1,$2,1,$3,$4,$5,'png-rgba-v1','pending',$6,'{"validation":"png-rgba-v1"}') returning id`,
    [
      cardId,
      rows[0].id,
      slot,
      `${cardId}/${rows[0].id}/${slot}/${sha}.png`,
      sha,
      `${n}`.repeat(16).slice(0, 16),
    ],
  );
  await db.query(
    "update public.nova_generation_candidates set status='ready' where job_id=$1 and candidate=$2",
    [rows[0].id, slot],
  );
  await db.query(
    `update public.nova_generation_jobs set status = case when (select count(*) from public.nova_generation_candidates
       where job_id=$1 and status='ready')=2 then 'ready' else 'running' end where id=$1`,
    [rows[0].id],
  );
  return inserted.rows[0].id;
}
const review = (user: string, art: string, decision: string, note: string | null = null) =>
  as("authenticated", user, "select public.nova_admin_review_artwork($1,$2,$3) as r", [
    art,
    decision,
    note,
  ]);
const studio = async (user: string) =>
  (await as("authenticated", user, "select public.get_my_nova_studio() as r")).rows[0].r as Row & {
    origin: { ready: boolean; approved: number; inReview: number; completed: number };
    companions: unknown[];
    candidates: { candidate: string; path: string }[];
  };
const passReveal = (cardId: string) =>
  db.query(
    "update public.nova_generation_jobs set reveal_after=now()-interval '1 minute' where card_id=$1",
    [cardId],
  );

beforeAll(async () => {
  db = await createCompanionDb();
  as = roleQuery(db);
  await addAccount(db, ADMIN, { role: "admin", subscription: false });
  await addAccount(db, STUDENT);
  await addAccount(db, OTHER);
}, 60_000);
afterAll(() => db.close());

describe("spending controls", () => {
  it("installs with generation off, the companion switch off and both caps at $0", async () => {
    const { rows } = await db.query("select * from public.nova_generation_settings");
    expect(rows[0]).toMatchObject({
      enabled: false,
      batch_enabled: false,
      companion_enabled: false,
      monthly_cap_microusd: 0,
      daily_cap_microusd: 0,
      reserve_microusd: 5_000_000,
      max_batches: 2,
      max_batch_requests: 2,
    });
  });

  it("makes batch size and reservation configurable without activating them", async () => {
    await db.transaction(async (tx) => {
      await tx.query(
        "update public.nova_generation_settings set max_batch_requests=200, max_batches=10, reserve_microusd=250000",
      );
      await tx.rollback();
    });
    for (const sql of [
      "update public.nova_generation_settings set max_batch_requests=501",
      "update public.nova_generation_settings set reserve_microusd=9999",
      "update public.nova_generation_settings set daily_cap_microusd=-1",
    ])
      await expect(db.query(sql)).rejects.toThrow(/check constraint/);
  });
});

describe("Visual DNA records", () => {
  it("stores both candidates' DNA atomically with the match", async () => {
    await submitFor(STUDENT, ANSWERS);
    const cardId = (await cardOf(STUDENT))!;
    const { rows } = await db.query<{ slot: string; candidate_id: string; species: string }>(
      `select d.slot, d.candidate_id, d.dna->>'species' as species from public.nova_card_dna d
       where d.card_id=$1 order by d.slot`,
      [cardId],
    );
    const expected = prepareCompanionSubmission(ANSWERS, STUDENT, TEST_DNA_SECRET);
    expect(rows.map((r) => r.candidate_id)).toEqual(
      expected.match.candidates.map((c) => c.candidateId),
    );
    expect(rows.map((r) => r.species)).toEqual(expected.dna.map((d) => d.species));
    const job = await db.query<{ prompt_version: string }>(
      "select prompt_version from public.nova_generation_jobs where card_id=$1",
      [cardId],
    );
    expect(job.rows[0].prompt_version).toBe("cc-art-v1");
  });

  it("refuses missing, reordered or mismatched DNA, writing nothing", async () => {
    const mine = prepareCompanionSubmission(OTHER_ANSWERS, OTHER, TEST_DNA_SECRET);
    const theirs = prepareCompanionSubmission(ANSWERS, STUDENT, TEST_DNA_SECRET);
    for (const [dna, error] of [
      [[], /Invalid Visual DNA/],
      [[mine.dna[1], mine.dna[0]], /Invalid Visual DNA/],
      [theirs.dna, /does not match its candidate/],
      [
        [mine.dna[0], { ...mine.dna[1], variationId: mine.dna[0].variationId }],
        /does not match|both candidates|check constraint/,
      ],
    ] as const)
      await expect(submitFor(OTHER, OTHER_ANSWERS, dna)).rejects.toThrow(error);
    expect(await cardOf(OTHER)).toBeUndefined();
  });

  it("keeps DNA permanent and invisible to students", async () => {
    const cardId = await cardOf(STUDENT);
    for (const sql of [
      "update public.nova_card_dna set dna = dna where card_id=$1",
      "delete from public.nova_card_dna where card_id=$1",
    ])
      await expect(db.query(sql, [cardId])).rejects.toThrow(/permanent/);
    for (const role of ["anon", "authenticated"] as const)
      await expect(as(role, STUDENT, "select * from public.nova_card_dna")).rejects.toThrow(
        /permission denied/,
      );
    expect(JSON.stringify(await studio(STUDENT))).not.toMatch(/variationId|genePoolVersion/);
  });
});

describe("worker eligibility", () => {
  const pendingCompanionRequests = async () => {
    const batch = (await as("service_role", null, "select public.nova_prepare_batch() as r"))
      .rows[0].r as string | null;
    if (!batch) return 0;
    const { rows } = await db.query<{ n: number }>(
      "select count(*)::int as n from public.nova_batch_requests where batch_id=$1",
      [batch],
    );
    // Undo the reservation so later tests start clean.
    await db.query("delete from public.nova_batch_requests where batch_id=$1", [batch]);
    await db.query("delete from public.nova_generation_batches where id=$1", [batch]);
    await db.query("update public.nova_generation_candidates set status='pending', attempts=0");
    await db.query("update public.nova_generation_jobs set status='queued'");
    return rows[0].n;
  };
  it("sends companion candidates only when every switch and cap allows it", async () => {
    expect(await pendingCompanionRequests()).toBe(0);
    await enableGeneration(db, { companion: false });
    expect(await pendingCompanionRequests()).toBe(0);
    await enableGeneration(db, { companion: true, daily: 0 });
    expect(await pendingCompanionRequests()).toBe(0);
    await enableGeneration(db, { companion: true, monthly: 4_000_000 });
    expect(await pendingCompanionRequests()).toBe(0); // reservation $5 > cap
    await enableGeneration(db, { companion: true });
    expect(await pendingCompanionRequests()).toBe(2);
    await db.query(
      "update public.nova_generation_settings set enabled=false,batch_enabled=false,companion_enabled=false,monthly_cap_microusd=0,daily_cap_microusd=0",
    );
  });
});

describe("human review", () => {
  let artA: string;
  let artB: string;
  it("starts generated artwork as pending and hides it from the student", async () => {
    const cardId = (await cardOf(STUDENT))!;
    artA = await artwork(cardId, "a", 1);
    artB = await artwork(cardId, "b", 2);
    await passReveal(cardId);
    const state = await studio(STUDENT);
    expect(state.origin).toMatchObject({ ready: false, completed: 2, inReview: 2, approved: 0 });
    expect(state.companions).toEqual([]);
    expect(state.candidates).toEqual([]);
    const path = (
      await db.query<{ storage_path: string }>(
        "select storage_path from public.nova_artwork where id=$1",
        [artA],
      )
    ).rows[0].storage_path;
    expect(
      (await as("authenticated", STUDENT, "select public.can_read_nova_artwork($1) as r", [path]))
        .rows[0].r,
    ).toBe(false);
  });

  it("lets only active administrators see the queue and decide", async () => {
    await expect(
      as("authenticated", STUDENT, "select public.nova_admin_review_queue()"),
    ).rejects.toThrow(/administrator/);
    await expect(review(STUDENT, artA, "approve")).rejects.toThrow(/administrator/);
    await expect(as("anon", null, "select public.nova_admin_review_queue()")).rejects.toThrow(
      /permission denied/,
    );
    const queue = (await as("authenticated", ADMIN, "select public.nova_admin_review_queue() as r"))
      .rows[0].r as Row[];
    expect(queue.map((q) => q.artworkId)).toEqual([artA, artB]);
    const item = queue[0] as Row & { candidate: Row; dna: Row; sibling: Row };
    expect(item.candidate).toMatchObject({ slot: "a" });
    expect(item.dna).toMatchObject({ slot: "a", schema: "cosmic-companion-dna/1" });
    expect(item.sibling).toMatchObject({ status: "pending" });
    expect(typeof item.sibling.distance).toBe("number");
    expect(JSON.stringify(queue)).not.toMatch(/Pilot|username|owner/);
  });

  it("needs a note to reject, and every decision is final", async () => {
    await expect(review(ADMIN, artB, "reject", "bad")).rejects.toThrow(/note/);
    await review(ADMIN, artA, "approve");
    await expect(review(ADMIN, artA, "reject", "changed my mind")).rejects.toThrow(/Only pending/);
    await expect(
      db.query("update public.nova_artwork set review_status='rejected' where id=$1", [artA]),
    ).rejects.toThrow(/final/);
    const state = await studio(STUDENT);
    expect(state.origin).toMatchObject({ ready: false, approved: 1, inReview: 1 });
  });

  it("reveals only when both are approved and 24 hours have passed", async () => {
    const cardId = (await cardOf(STUDENT))!;
    await db.query(
      "update public.nova_generation_jobs set reveal_after=now()+interval '1 hour' where card_id=$1",
      [cardId],
    );
    await review(ADMIN, artB, "approve");
    expect((await studio(STUDENT)).origin.ready).toBe(false);
    await passReveal(cardId);
    const state = await studio(STUDENT);
    expect(state.origin.ready).toBe(true);
    expect(state.companions).toHaveLength(2);
    expect(state.candidates.map((c) => c.candidate)).toEqual(["a", "b"]);
  });

  it("never lets unapproved artwork become permanent, even by direct update", async () => {
    await submitFor(OTHER, OTHER_ANSWERS);
    const cardId = (await cardOf(OTHER))!;
    const pending = await artwork(cardId, "a", 3);
    await expect(
      db.query("update public.nova_artwork set selected=true, released=true where id=$1", [
        pending,
      ]),
    ).rejects.toThrow(/Only approved artwork/);
  });
});
