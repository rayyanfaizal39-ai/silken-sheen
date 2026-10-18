import { readFileSync } from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { traitsFromAnswers } from "./model";

const A = "00000000-0000-4000-8000-000000000001";
const B = "00000000-0000-4000-8000-000000000002";
const C = "00000000-0000-4000-8000-000000000003";
const TEACHER = "00000000-0000-4000-8000-000000000004";
const ADMIN = "00000000-0000-4000-8000-000000000005";
const SUSPENDED = "00000000-0000-4000-8000-000000000006";
const NO_PROFILE = "00000000-0000-4000-8000-000000000007";
const CHOICE_B = "00000000-0000-4000-8000-000000000008";
const db = new PGlite();
async function as(
  role: "anon" | "authenticated",
  user: string | null,
  sql: string,
  params: unknown[] = [],
  anonymous = false,
) {
  return db.transaction(async (tx) => {
    await tx.query("select set_config('request.jwt.claims',$1,true)", [
      JSON.stringify({ sub: user, is_anonymous: anonymous }),
    ]);
    await tx.exec(`set local role ${role}`);
    return tx.query<{ result: Record<string, unknown> | null }>(sql, params);
  });
}
async function seedCard(user: string, answers = Array(12).fill(0)) {
  await db.query(
    `insert into public.nova_cards(owner_id,username,answers,variant)
     values($1,'Explorer',$2,'a')`,
    [user, answers],
  );
  return as("authenticated", user, "select public.get_my_nova_card() as result");
}

describe("Nova Studio SQL queue, identities and RLS", () => {
  beforeAll(async () => {
    await db.exec(`create role anon; create role authenticated; create role service_role bypassrls;
      create schema auth; create schema storage;
      create table auth.users(id uuid primary key);
      create function auth.jwt() returns jsonb language sql stable as $$ select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb $$;
      create function auth.uid() returns uuid language sql stable as $$ select (auth.jwt()->>'sub')::uuid $$;
      grant usage on schema auth,public,storage to anon,authenticated;
      grant execute on all functions in schema auth to anon,authenticated;
      alter default privileges in schema public grant all on tables to anon,authenticated;
      create table public.profiles(id uuid primary key references auth.users(id) on delete cascade,role text not null check(role in ('student','teacher','admin')),status text not null check(status in ('active','suspended')));
      create table public.subscriptions(user_id uuid primary key references auth.users(id), plan text not null, status text not null, current_period_end timestamptz);
      create table storage.buckets(id text primary key,name text,public boolean);
      create table storage.objects(id uuid default gen_random_uuid(),bucket_id text,name text);
      alter table storage.objects enable row level security;
      grant select on storage.objects to anon,authenticated;
      insert into auth.users values('${A}'),('${B}'),('${C}'),('${TEACHER}'),('${ADMIN}'),('${SUSPENDED}'),('${NO_PROFILE}'),('${CHOICE_B}');
      insert into public.profiles values('${A}','student','active'),('${B}','student','active'),('${C}','student','active'),('${TEACHER}','teacher','active'),('${ADMIN}','admin','active'),('${SUSPENDED}','student','suspended'),('${CHOICE_B}','student','active');
      insert into public.subscriptions values ('${A}','pro','active',now()+interval '30 days'),('${B}','premium','active',now()+interval '30 days'),('${C}','pro','active',now()+interval '30 days');
      insert into public.subscriptions values ('${TEACHER}','pro','active',now()+interval '30 days'),('${ADMIN}','premium','active',now()+interval '30 days'),('${SUSPENDED}','pro','active',now()+interval '30 days'),('${NO_PROFILE}','pro','active',now()+interval '30 days');
      insert into public.subscriptions values ('${CHOICE_B}','premium','active',now()+interval '30 days');`);
    await db.exec(
      readFileSync(
        new URL(
          "../../../supabase/migrations/20261018160000_nova_companion_cards.sql",
          import.meta.url,
        ),
        "utf8",
      ),
    );
    await db.exec(
      readFileSync(
        new URL(
          "../../../supabase/migrations/20261018160100_nova_studio_batch.sql",
          import.meta.url,
        ),
        "utf8",
      ),
    );
    await db.exec(
      readFileSync(
        new URL(
          "../../../supabase/migrations/20261018160200_nova_creature_variety.sql",
          import.meta.url,
        ),
        "utf8",
      ),
    );
  }, 30000);
  afterAll(() => db.close());
  const rpc = async (user: string, name: string, args: unknown[] = []) =>
    (
      await as(
        "authenticated",
        user,
        `select public.${name}(${args.map((_, i) => "$" + (i + 1)).join(",")}) as result`,
        args,
      )
    ).rows[0].result!;
  let cardId: string,
    jobId: string,
    batchId: string,
    token: string,
    publicId: string,
    serial: string;
  it("preserves legacy third-option Phoenix answers in versioned SQL identities", async () => {
    const answers = [0, 2, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0];
    const { rows } = await db.query<{
      identity: { answers: number[]; traits: unknown; version: string };
    }>("select public.nova_identity($1) as identity", [answers]);
    expect(rows[0].identity).toEqual({
      version: "nova-identity-v1",
      artDirection: "nova-master-art-direction-v1",
      answers,
      traits: traitsFromAnswers(answers),
    });
    expect((rows[0].identity.traits as { creature: string }).creature).toBe("Phoenix");
  });
  for (const [code, creature] of [
    [0, "Phoenix"],
    [1, "Magical Fox"],
    [2, "Phoenix"],
    [3, "Dragon"],
    [4, "Lion"],
    [5, "Unicorn"],
  ] as const)
    it(`persists and maps ${creature} code ${code} with all fourth options through existing RPCs`, async () => {
      const answers = Array(12).fill(3);
      answers[1] = code;
      const owner = `00000000-0000-4000-8000-00000000001${code}`;
      await db.query("insert into auth.users values($1)", [owner]);
      await db.query("insert into public.profiles values($1,'student','active')", [owner]);
      await db.query(
        "insert into public.subscriptions values($1,'pro','active',now()+interval '30 days')",
        [owner],
      );
      try {
        const saved = await rpc(owner, "save_nova_studio_draft", [
          answers.slice(0, 2),
          "NewCompanion",
          0,
        ]);
        expect(saved.answers).toEqual(answers.slice(0, 2));
        await rpc(owner, "save_nova_studio_draft", [answers, "NewCompanion", 1]);
        const draft = (await rpc(owner, "get_my_nova_studio")).draft as { answers: number[] };
        expect(draft.answers).toEqual(answers);
        const card = (await seedCard(owner, answers)).rows[0].result!;
        expect(card.traits).toEqual(traitsFromAnswers(answers));
        const identity = (await rpc(owner, "get_my_nova_studio")).identity as {
          answers: number[];
          traits: { creature: string };
        };
        expect(identity.answers).toEqual(answers);
        expect(identity.traits.creature).toBe(creature);
      } finally {
        await db.query("delete from public.subscriptions where user_id=$1", [owner]);
        await db.query("delete from auth.users where id=$1", [owner]);
      }
    });
  it("rejects malformed arrays and extra answer codes outside the creature slot", async () => {
    for (const input of [null, [4], [0, 6], [0, -1], [0, 3, 4], [0, null], Array(13).fill(0)]) {
      const result = await db.query<{ valid: boolean }>(
        "select public.nova_valid_answers($1,false) as valid",
        [input],
      );
      expect(result.rows[0].valid).toBe(false);
    }
    expect(
      (
        await db.query<{ valid: boolean }>(
          "select public.nova_valid_answers('[0:1]={0,1}'::integer[],false) as valid",
        )
      ).rows[0].valid,
    ).toBe(false);
    expect(
      (
        await db.query<{ valid: boolean }>(
          "select public.nova_valid_answers('{{0,1},{0,1}}'::integer[],false) as valid",
        )
      ).rows[0].valid,
    ).toBe(false);
    await expect(rpc(C, "save_nova_studio_draft", [[0, 6], "Invalid", 0])).rejects.toThrow(/check/);
  });
  it("requires an active canonical student profile for every personal Cards RPC", async () => {
    for (const user of [TEACHER, ADMIN, SUSPENDED, NO_PROFILE]) {
      await expect(rpc(user, "save_nova_studio_draft", [[], "", 0])).rejects.toThrow(
        /active student account/,
      );
      await expect(rpc(user, "get_my_nova_studio")).rejects.toThrow(/active student account/);
      await expect(seedCard(user)).rejects.toThrow(/active student profiles/);
    }
    await expect(
      as("authenticated", C, "select public.get_my_nova_studio()", [], true),
    ).rejects.toThrow(/active student account/);
  });
  it("persists all twelve answers with owner isolation and cross-device revision protection", async () => {
    await rpc(A, "save_nova_studio_draft", [[], "", 0]);
    for (let i = 1; i <= 12; i++)
      await rpc(A, "save_nova_studio_draft", [Array(i).fill(0), "Rayyan", i]);
    const state = await rpc(A, "get_my_nova_studio");
    expect(state.draft).toEqual({ answers: Array(12).fill(0), username: "Rayyan", revision: 13 });
    expect((await rpc(B, "get_my_nova_studio")).draft).toEqual({
      answers: [],
      username: "",
      revision: 0,
    });
    await expect(rpc(A, "save_nova_studio_draft", [[1], "Mia", 0])).rejects.toThrow(
      /another device/,
    );
    await expect(
      rpc(A, "save_nova_studio_draft", [Array(12).fill(4), "Rayyan", 13]),
    ).rejects.toThrow();
    await expect(rpc(A, "submit_nova_origin")).rejects.toThrow(/not enabled/);
    await db.exec(
      "update public.nova_generation_settings set enabled=true,batch_enabled=true,monthly_cap_microusd=50000000",
    );
  });
  it("submits exactly two immutable Origin slots and retries idempotently", async () => {
    const first = await rpc(A, "submit_nova_origin");
    publicId = first.publicId as string;
    const again = await rpc(A, "submit_nova_origin");
    expect(again.publicId).toBe(publicId);
    const cards = await db.query<{ id: string; serial: string }>(
      "select id,serial from public.nova_cards where owner_id=$1",
      [A],
    );
    cardId = cards.rows[0].id;
    serial = cards.rows[0].serial;
    jobId = (
      await db.query<{ id: string }>(
        "select id from public.nova_generation_jobs where card_id=$1",
        [cardId],
      )
    ).rows[0].id;
    expect(
      (await db.query("select * from public.nova_generation_candidates where job_id=$1", [jobId]))
        .rows,
    ).toHaveLength(2);
    expect((first.identity as { traits: unknown }).traits).toEqual(
      traitsFromAnswers(Array(12).fill(0)),
    );
    expect(first.candidates).toEqual([]);
    const gate = await db.query<{ ok: boolean }>(
      "select reveal_after = (((now() at time zone 'Asia/Kuala_Lumpur')::date+1)::timestamp at time zone 'Asia/Kuala_Lumpur') as ok from public.nova_generation_jobs where id=$1",
      [jobId],
    );
    expect(gate.rows[0].ok).toBe(true);
    await expect(rpc(A, "save_nova_studio_draft", [[1], "Other", 13])).rejects.toThrow(
      /already saved/,
    );
    await expect(
      db.query("update public.nova_cards set answers=$1 where id=$2", [Array(12).fill(1), cardId]),
    ).rejects.toThrow(/permanent/);
  });
  it("enforces service-only tables, worker RPCs and audit writes", async () => {
    for (const table of [
      "nova_studio_drafts",
      "nova_generation_settings",
      "nova_generation_candidates",
      "nova_generation_batches",
      "nova_batch_requests",
      "nova_generation_audit",
    ])
      await expect(
        as("authenticated", A, `select to_jsonb(t) as result from public.${table} t`),
      ).rejects.toThrow(/permission/);
    await expect(rpc(A, "nova_prepare_batch")).rejects.toThrow(/permission/);
    await expect(rpc(A, "nova_admin_retry", [A, "operator reason here"])).rejects.toThrow(
      /permission/,
    );
    await expect(as("anon", null, "select public.get_my_nova_studio() as result")).rejects.toThrow(
      /permission/,
    );
    await expect(
      as("authenticated", A, "select public.get_my_nova_studio() as result", [], true),
    ).rejects.toThrow(/active student/);
  });
  it("reserves cost atomically, claims only once, groups one endpoint and enforces cap", async () => {
    await db.exec("update public.nova_generation_settings set monthly_cap_microusd=10000000");
    batchId = (await db.query<{ id: string }>("select public.nova_prepare_batch() as id")).rows[0]
      .id;
    expect(batchId).toBeTruthy();
    await db.exec("update public.nova_generation_settings set enabled=false");
    expect(
      (await db.query<{ ok: boolean }>("select public.nova_begin_submission($1) as ok", [batchId]))
        .rows[0].ok,
    ).toBe(false);
    await db.exec("update public.nova_generation_settings set enabled=true");
    expect(
      (await db.query("select * from public.nova_batch_requests where batch_id=$1", [batchId]))
        .rows,
    ).toHaveLength(2);
    expect(
      (await db.query<{ id: null }>("select public.nova_prepare_batch() as id")).rows[0].id,
    ).toBeNull();
    expect(
      (await db.query<{ ok: boolean }>("select public.nova_begin_submission($1) as ok", [batchId]))
        .rows[0].ok,
    ).toBe(true);
    expect(
      (await db.query<{ ok: boolean }>("select public.nova_begin_submission($1) as ok", [batchId]))
        .rows[0].ok,
    ).toBe(false);
    await db.query("select public.nova_attach_batch($1,'batch_test','file-test')", [batchId]);
    token = (
      await db.query<{ id: string }>("select public.nova_claim_collection($1) as id", [batchId])
    ).rows[0].id;
    expect(
      (await db.query<{ id: null }>("select public.nova_claim_collection($1) as id", [batchId]))
        .rows[0].id,
    ).toBeNull();
  });
  it("waits for both validated distinct images AND the next Malaysian day", async () => {
    const requests = (
      await db.query<{ id: string }>(
        "select id from public.nova_batch_requests where batch_id=$1 order by custom_id",
        [batchId],
      )
    ).rows;
    await db.query("select public.nova_finish_request($1,$2,$3,'req_1','{}',1000)", [
      requests[0].id,
      token,
      "a".repeat(64),
    ]);
    expect((await rpc(A, "get_my_nova_studio")).candidates).toEqual([]);
    await db.query("select public.nova_finish_request($1,$2,$3,'req_2','{}',1000)", [
      requests[1].id,
      token,
      "b".repeat(64),
    ]);
    expect((await rpc(A, "get_my_nova_studio")).candidates).toEqual([]);
    await expect(rpc(A, "select_nova_origin", ["a"])).rejects.toThrow(/not ready/);
    await db.query(
      "update public.nova_generation_jobs set reveal_after=now()-interval '1 minute' where id=$1",
      [jobId],
    );
    const ready = await rpc(A, "get_my_nova_studio");
    expect(ready.candidates).toHaveLength(2);
    await db.exec(
      "insert into storage.objects(bucket_id,name) select 'nova-artwork',storage_path from public.nova_artwork",
    );
    expect(
      (await as("authenticated", A, "select to_jsonb(o) as result from storage.objects o")).rows,
    ).toHaveLength(2);
    expect(
      (await as("authenticated", B, "select to_jsonb(o) as result from storage.objects o")).rows,
    ).toHaveLength(0);
    expect(
      (await as("anon", null, "select to_jsonb(o) as result from storage.objects o")).rows,
    ).toHaveLength(0);
  });
  it("makes a permanent selection without changing UUID, serial, codes or other artwork", async () => {
    await rpc(A, "select_nova_origin", ["a"]);
    await rpc(A, "select_nova_origin", ["a"]);
    await expect(rpc(A, "select_nova_origin", ["b"])).rejects.toThrow(/already selected/);
    await rpc(A, "set_nova_sharing", [true]);
    const c = (
      await as("anon", null, "select public.get_public_nova_card($1) as result", [publicId])
    ).rows[0].result!;
    expect(c.publicId).toBe(publicId);
    expect(c.serial).toBe(serial);
    expect(
      (await as("anon", null, "select to_jsonb(o) as result from storage.objects o")).rows,
    ).toHaveLength(1);
    expect(
      (await as("authenticated", A, "select to_jsonb(o) as result from storage.objects o")).rows,
    ).toHaveLength(1);
    expect(c.variant).toBe("a");
    await expect(
      db.query("update public.nova_cards set variant='b' where id=$1", [cardId]),
    ).rejects.toThrow(/permanent/);
    await expect(
      db.query("update public.nova_artwork set storage_path='changed.png' where card_id=$1", [
        cardId,
      ]),
    ).rejects.toThrow(/immutable/);
  });
  it("immediately denies personal and shared access when a student is suspended", async () => {
    await db.query("update public.profiles set status='suspended' where id=$1", [A]);
    expect(
      (await as("authenticated", A, "select to_jsonb(c) as result from public.nova_cards c")).rows,
    ).toHaveLength(0);
    await expect(rpc(A, "get_my_nova_studio")).rejects.toThrow(/active student/);
    expect(
      (await as("anon", null, "select public.get_public_nova_card($1) as result", [publicId]))
        .rows[0].result,
    ).toBeNull();
    expect(
      (await as("authenticated", A, "select to_jsonb(o) as result from storage.objects o")).rows,
    ).toHaveLength(0);
    await db.query("update public.profiles set status='active' where id=$1", [A]);
  });
  it("atomically persists artwork B as the permanent card variant", async () => {
    const bCard = (
      await db.query<{ id: string }>(
        `insert into public.nova_cards(owner_id,username,answers,variant)
         values($1,'Mia',$2,'a') returning id`,
        [CHOICE_B, Array(12).fill(1)],
      )
    ).rows[0].id;
    const bJob = (
      await db.query<{ id: string }>(
        `insert into public.nova_generation_jobs(card_id,stage,status,prompt_version,identity_snapshot,reveal_after)
         select id,1,'ready','test',identity_spec,now()-interval '1 minute'
         from public.nova_cards where id=$1 returning id`,
        [bCard],
      )
    ).rows[0].id;
    await db.query(
      "insert into public.nova_generation_candidates(job_id,candidate,status) values($1,'a','ready'),($1,'b','ready')",
      [bJob],
    );
    await db.query(
      `insert into public.nova_artwork(card_id,job_id,stage,candidate,storage_path,sha256,validation_version)
       values($1,$2,1,'a','b/a.png',$3,'png-v1'),($1,$2,1,'b','b/b.png',$4,'png-v1')`,
      [bCard, bJob, "c".repeat(64), "d".repeat(64)],
    );

    const selected = await rpc(CHOICE_B, "select_nova_origin", ["b"]);
    expect(selected.selected).toBe("b");
    expect(
      (await as("authenticated", CHOICE_B, "select public.get_my_nova_card() as result")).rows[0]
        .result!.variant,
    ).toBe("b");
    expect(
      (
        await db.query<{ candidate: string }>(
          "select candidate from public.nova_artwork where card_id=$1 and selected",
          [bCard],
        )
      ).rows,
    ).toEqual([{ candidate: "b" }]);
    await rpc(CHOICE_B, "select_nova_origin", ["b"]);
    await expect(rpc(CHOICE_B, "select_nova_origin", ["a"])).rejects.toThrow(/already selected/);
    await expect(
      db.query("update public.nova_cards set variant='a' where id=$1", [bCard]),
    ).rejects.toThrow(/permanent/);
    await expect(
      db.query(
        `insert into public.nova_artwork(card_id,job_id,stage,candidate,storage_path,sha256,validation_version)
         values($1,$2,2,'a','cross-wired.png',$3,'png-v1')`,
        [cardId, bJob, "e".repeat(64)],
      ),
    ).rejects.toThrow(/foreign key/);
  });
  it("keeps future evolution disabled without creating or releasing stage 2-5 artwork", async () => {
    await expect(rpc(A, "request_nova_evolution", [2])).rejects.toThrow(
      /not available in Phase 1/,
    );
    expect(
      (
        await db.query<{ count: number }>(
          "select count(*)::integer as count from public.nova_generation_jobs where stage>1",
        )
      ).rows[0].count,
    ).toBe(0);
    await db.exec("select public.nova_release_evolutions()");
    expect(
      (
        await db.query<{ count: number }>(
          "select count(*)::integer as count from public.nova_artwork where stage>1 and (selected or released)",
        )
      ).rows[0].count,
    ).toBe(0);
  });
  it("rejects identical Origin bytes and bounds administrative recovery to one remaining attempt", async () => {
    await db.exec("update public.nova_generation_settings set monthly_cap_microusd=50000000");
    await rpc(B, "save_nova_studio_draft", [[0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0], "Mia", 0]);
    await rpc(B, "submit_nova_origin");
    await db.exec("update public.nova_generation_batches set status='completed',lease_until=null");
    const bid = (await db.query<{ id: string }>("select public.nova_prepare_batch() as id")).rows[0]
      .id;
    await db.query("select public.nova_begin_submission($1)", [bid]);
    await db.query("select public.nova_attach_batch($1,'batch_mia','file-mia')", [bid]);
    const lease = (
      await db.query<{ id: string }>("select public.nova_claim_collection($1) as id", [bid])
    ).rows[0].id;
    const requests = (
      await db.query<{ id: string; candidate_id: string }>(
        "select id,candidate_id from public.nova_batch_requests where batch_id=$1 order by id",
        [bid],
      )
    ).rows;
    for (const r of requests)
      await db.query("select public.nova_finish_request($1,$2,$3,'req_mia','{}',1000)", [
        r.id,
        lease,
        "d".repeat(64),
      ]);
    expect(((await rpc(B, "get_my_nova_studio")).origin as { status: string }).status).toBe(
      "failed",
    );
    expect((await rpc(B, "get_my_nova_studio")).candidates).toEqual([]);
    const failed = (
      await db.query<{ id: string }>(
        "select id from public.nova_generation_candidates where id=any($1::uuid[]) and status='failed'",
        [requests.map((r) => r.candidate_id)],
      )
    ).rows[0].id;
    await expect(db.query("select public.nova_admin_retry($1,null)", [failed])).rejects.toThrow(
      /reason/,
    );
    await db.query("select public.nova_admin_retry($1,'Reviewed duplicate image result')", [
      failed,
    ]);
    await db.query("update public.nova_generation_batches set status='completed' where id=$1", [
      bid,
    ]);
    const retry = (await db.query<{ id: string }>("select public.nova_prepare_batch() as id"))
      .rows[0].id;
    await db.query("select public.nova_begin_submission($1)", [retry]);
    await db.query("select public.nova_attach_batch($1,'batch_retry','file-retry')", [retry]);
    const retryLease = (
      await db.query<{ id: string }>("select public.nova_claim_collection($1) as id", [retry])
    ).rows[0].id;
    const retryRequest = (
      await db.query<{ id: string }>(
        "select id from public.nova_batch_requests where batch_id=$1",
        [retry],
      )
    ).rows[0].id;
    await db.query(
      "select public.nova_finish_request($1,$2,null,'req_retry','{}',null,'rate_limited',true)",
      [retryRequest, retryLease],
    );
    await expect(
      db.query("select public.nova_admin_retry($1,'Reviewed terminal retry limit')", [failed]),
    ).rejects.toThrow(/limit/);
    expect(
      (
        await db.query<{ attempts: number }>(
          "select attempts from public.nova_generation_candidates where id=$1",
          [failed],
        )
      ).rows[0].attempts,
    ).toBe(2);
  });
  it("quarantines crashed submissions without making them available for another paid claim", async () => {
    await db.exec("update public.nova_generation_batches set status='completed'");
    const bid = (
      await db.query<{ id: string }>(
        "insert into public.nova_generation_batches(model,endpoint,quality,status,updated_at) values('gpt-image-2.5-flare','/v1/images/generations','medium','submitting',now()-interval '20 minutes') returning id",
      )
    ).rows[0].id;
    await db.exec("select public.nova_release_evolutions()");
    expect(
      (
        await db.query<{ status: string }>(
          "select status from public.nova_generation_batches where id=$1",
          [bid],
        )
      ).rows[0].status,
    ).toBe("review");
    expect(
      (await db.query<{ ok: boolean }>("select public.nova_begin_submission($1) as ok", [bid]))
        .rows[0].ok,
    ).toBe(false);
  });
  it("prevents expired subscriptions from generation and preserves cross-device answers", async () => {
    await db.query(
      "update public.subscriptions set current_period_end=now()-interval '1 hour' where user_id=$1",
      [B],
    );
    await expect(rpc(B, "submit_nova_origin")).rejects.toThrow(/active/);
    expect(
      ((await rpc(B, "get_my_nova_studio")).draft as { answers: number[] }).answers,
    ).toHaveLength(12);
    await db.query(
      "update public.subscriptions set current_period_end=now()-interval '1 hour' where user_id=$1",
      [A],
    );
    await expect(rpc(A, "request_nova_evolution", [2])).rejects.toThrow(
      /not available in Phase 1/,
    );
    expect(
      (await db.query<{ id: null }>("select public.nova_prepare_batch() as id")).rows[0].id,
    ).toBeNull();
  });
});
