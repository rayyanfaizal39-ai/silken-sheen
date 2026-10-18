import { readFileSync } from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { evolution, traitsFromAnswers } from "./model";

const A = "00000000-0000-4000-8000-000000000001";
const B = "00000000-0000-4000-8000-000000000002";
const C = "00000000-0000-4000-8000-000000000003";
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
const create = (user: string, answers = Array(12).fill(0)) =>
  as("authenticated", user, "select public.create_nova_card('Explorer',$1,'a') as result", [
    answers,
  ]);

describe("Nova migration running in PostgreSQL with real API roles and RLS", () => {
  beforeAll(async () => {
    await db.exec(`create role anon; create role authenticated; create role service_role bypassrls;
      create schema auth; create schema storage;
      create table auth.users(id uuid primary key);
      create function auth.jwt() returns jsonb language sql stable as $$ select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb $$;
      create function auth.uid() returns uuid language sql stable as $$ select (auth.jwt()->>'sub')::uuid $$;
      grant usage on schema auth,public,storage to anon,authenticated;
      grant execute on all functions in schema auth to anon,authenticated;
      alter default privileges in schema public grant all on tables to anon,authenticated;
      create table public.subscriptions(user_id uuid primary key references auth.users(id), plan text not null, status text not null, current_period_end timestamptz);
      create table public.user_progress(user_id uuid primary key references auth.users(id),xp integer not null, companion jsonb);
      create table public.quiz_xp_awards(user_id uuid references auth.users(id), xp_earned integer);
      create table public.mission_reward_claims(user_id uuid references auth.users(id),reward_xp integer);
      revoke all on public.quiz_xp_awards,public.mission_reward_claims from anon,authenticated;
      create table storage.buckets(id text primary key,name text,public boolean);
      create table storage.objects(id uuid default gen_random_uuid(),bucket_id text,name text);
      alter table storage.objects enable row level security;
      grant select on storage.objects to anon,authenticated;
      insert into auth.users values('${A}'),('${B}'),('${C}');
      insert into public.subscriptions values ('${A}','pro','active',now()+interval '30 days'),('${B}','premium','active',now()+interval '30 days'),('${C}','pro','active',now()+interval '30 days');
      insert into public.user_progress values('${A}',9000,'{"stage":"guardian"}'),('${B}',1600,'{"stage":"sprout"}');
      insert into public.quiz_xp_awards values('${A}',1000);
      insert into public.mission_reward_claims values('${A}',500);`);
    await db.exec(
      readFileSync(
        new URL(
          "../../../supabase/migrations/20261015090000_nova_companion_cards.sql",
          import.meta.url,
        ),
        "utf8",
      ),
    );
  }, 30000);
  afterAll(() => db.close());
  let publicId: string, serial: string;
  it("creates server-generated permanent IDs and returns no private student fields", async () => {
    const { rows } = await create(A);
    const c = rows[0].result!;
    publicId = c.publicId as string;
    serial = c.serial as string;
    expect(publicId).toMatch(/^[0-9a-f-]{36}$/);
    expect(publicId).not.toBe(A);
    expect(serial).toMatch(/^\d{12}$/);
    expect(c).not.toHaveProperty("owner_id");
    expect(c).not.toHaveProperty("answers");
    expect(c).not.toHaveProperty("id");
    expect(c.sharing).toBe(false);
    expect(c.xp).toBe(9000);
    expect(c.traits).toEqual(traitsFromAnswers(Array(12).fill(0)));
  });
  it("retries idempotently and cannot replace the permanent design or URL", async () => {
    const { rows } = await create(A, Array(12).fill(1));
    expect(rows[0].result!.publicId).toBe(publicId);
    expect(rows[0].result!.traits).toEqual(traitsFromAnswers(Array(12).fill(0)));
    const other = (await create(B)).rows[0].result!;
    expect(other.publicId).not.toBe(publicId);
    expect(other.serial).not.toBe(serial);
  });
  it("enforces owner RLS and rejects direct ID, XP, art and sharing tampering", async () => {
    const owner = await as(
      "authenticated",
      A,
      "select to_jsonb(c) as result from public.nova_cards c",
    );
    expect(owner.rows).toHaveLength(1);
    const stranger = await as(
      "authenticated",
      B,
      "select to_jsonb(c) as result from public.nova_cards c where owner_id=$1",
      [A],
    );
    expect(stranger.rows).toHaveLength(0);
    await expect(
      as("anon", null, "select to_jsonb(c) as result from public.nova_cards c"),
    ).rejects.toThrow(/permission/);
    for (const sql of [
      "update public.nova_cards set sharing=true",
      "delete from public.nova_cards",
      "update public.nova_cards set rarity='Legendary'",
      "insert into public.nova_artwork(card_id,stage,candidate,storage_path) select id,5,'a','future.png' from public.nova_cards",
      "select public.nova_verified_xp('" + A + "')",
    ])
      await expect(as("authenticated", A, sql)).rejects.toThrow(/permission/);
  });
  it("returns indistinguishable null for private and missing public URLs and serials", async () => {
    expect(
      (await as("anon", null, "select public.get_public_nova_card($1) as result", [publicId]))
        .rows[0].result,
    ).toBeNull();
    expect(
      (await as("anon", null, "select public.get_public_nova_card($1) as result", [C])).rows[0]
        .result,
    ).toBeNull();
    expect(
      (
        await as("anon", null, "select public.get_public_nova_card_by_serial($1) as result", [
          serial,
        ])
      ).rows[0].result,
    ).toBeNull();
    await as("authenticated", B, "select public.set_nova_sharing(true)");
    expect(
      (await as("anon", null, "select public.get_public_nova_card($1) as result", [publicId]))
        .rows[0].result,
    ).toBeNull();
  });
  it("exposes only opted-in fields and revokes access on the next request", async () => {
    await as("authenticated", A, "select public.set_nova_sharing(true)");
    const c = (
      await as("anon", null, "select public.get_public_nova_card($1) as result", [publicId])
    ).rows[0].result!;
    expect(c.username).toBe("Explorer");
    expect(c).not.toHaveProperty("owner_id");
    expect(
      (
        await as("anon", null, "select public.get_public_nova_card_by_serial($1) as result", [
          serial,
        ])
      ).rows[0].result!.publicId,
    ).toBe(publicId);
    await as("authenticated", A, "select public.set_nova_sharing(false)");
    expect(
      (await as("anon", null, "select public.get_public_nova_card($1) as result", [publicId]))
        .rows[0].result,
    ).toBeNull();
  });
  it("preserves legacy progress, counts only new protected awards and ignores client XP inflation", async () => {
    const original = await db.query(
      "select xp,companion from public.user_progress where user_id=$1",
      [A],
    );
    expect(original.rows[0]).toEqual({ xp: 9000, companion: { stage: "guardian" } });
    await db.exec(
      `update public.user_progress set xp=999999 where user_id='${A}'; insert into public.quiz_xp_awards values('${A}',800); insert into public.mission_reward_claims values('${A}',250);`,
    );
    const c = (await as("authenticated", A, "select public.get_my_nova_card() as result")).rows[0]
      .result!;
    expect(c.xp).toBe(10050);
    expect(c.publicId).toBe(publicId);
    await create(C);
    await db.exec(`insert into public.user_progress values('${C}',999999,'{}');`);
    expect(
      (await as("authenticated", C, "select public.get_my_nova_card() as result")).rows[0].result!
        .xp,
    ).toBe(0);
  });
  it("has exactly the same five XP thresholds on the server", async () => {
    for (const xp of [0,1599,1600,8999,9000,31999,32000,79999,80000,999999]) {
      const result = await db.query<{ stage: number }>("select public.nova_stage($1) as stage", [
        xp,
      ]);
      expect(result.rows[0].stage).toBe(evolution(xp).stage);
    }
  });
  it("denies anonymous creation and rejects malformed questionnaires", async () => {
    await expect(
      as("anon", null, "select public.create_nova_card('Name',array_fill(0,array[12]),'a')"),
    ).rejects.toThrow(/permission/);
    await expect(
      as(
        "authenticated",
        C,
        "select public.create_nova_card('Name',array_fill(0,array[12]),'a')",
        [],
        true,
      ),
    ).rejects.toThrow(/registered/);
    for (const answers of [[], [0], Array(12).fill(3), Array(12).fill(null)])
      await expect(create(C, answers)).rejects.toThrow();
  });
  it("never exposes future or unreleased artwork, even to its owner", async () => {
    await db.exec(`insert into public.nova_artwork(card_id,stage,candidate,storage_path,released,selected) select id,5,'a','future.png',true,true from public.nova_cards where owner_id='${A}';
      insert into public.nova_artwork(card_id,stage,candidate,storage_path,released,selected) select id,1,'a','current.png',true,true from public.nova_cards where owner_id='${A}';
      insert into public.nova_artwork(card_id,stage,candidate,storage_path,released,selected) select id,1,'b','unselected.png',true,false from public.nova_cards where owner_id='${A}';
      insert into storage.objects(bucket_id,name) values('nova-artwork','current.png'),('nova-artwork','future.png'),('nova-artwork','unselected.png');`);
    const own = await as(
      "authenticated",
      A,
      "select jsonb_build_object('name',name) as result from storage.objects",
    );
    expect(own.rows.map((r) => r.result!.name)).toEqual(["current.png"]);
    expect(
      (
        await as(
          "anon",
          null,
          "select jsonb_build_object('name',name) as result from storage.objects",
        )
      ).rows,
    ).toHaveLength(0);
    await as("authenticated", A, "select public.set_nova_sharing(true)");
    expect(
      (
        await as(
          "anon",
          null,
          "select jsonb_build_object('name',name) as result from storage.objects",
        )
      ).rows.map((r) => r.result!.name),
    ).toEqual(["current.png"]);
    const c = (
      await as("anon", null, "select public.get_public_nova_card($1) as result", [publicId])
    ).rows[0].result!;
    expect(c.artworkPath).toBe("current.png");
    await db.exec("update public.nova_artwork set released=false where storage_path='current.png'");
    expect(
      (
        await as(
          "authenticated",
          A,
          "select jsonb_build_object('name',name) as result from storage.objects",
        )
      ).rows,
    ).toHaveLength(0);
    expect(
      (await as("anon", null, "select public.get_public_nova_card($1) as result", [publicId]))
        .rows[0].result!.artworkPath,
    ).toBeNull();
  });
  it("freezes XP after expiry, then reactivates the same card", async () => {
    const before=(await as("authenticated",A,"select public.get_my_nova_card() as result")).rows[0].result!;
    await db.exec(`update public.subscriptions set status='expired' where user_id='${A}'; insert into public.quiz_xp_awards values('${A}',90000);`);
    const frozen=(await as("anon",null,"select public.get_public_nova_card($1) as result",[publicId])).rows[0].result!;
    expect(frozen.xp).toBe(before.xp);
    expect(frozen.stage).toBe(before.stage);
    await expect(create(A)).rejects.toThrow(/active Pro or Premium/);
    await db.exec(`update public.subscriptions set status='active',current_period_end=now()+interval '30 days' where user_id='${A}';`);
    const restored=(await create(A)).rows[0].result!;
    expect(restored.publicId).toBe(publicId);
    expect(restored.serial).toBe(serial);
    expect(restored.xp).toBeGreaterThan(before.xp as number);
  });
  it("blocks pending, cancelled and lapsed billing", async () => {
    await db.exec(`update public.subscriptions set status='pending' where user_id='${B}';`);
    await expect(create(B)).rejects.toThrow(/active Pro or Premium/);
    await db.exec(`update public.subscriptions set status='cancelled' where user_id='${B}';`);
    await expect(create(B)).rejects.toThrow(/active Pro or Premium/);
    await db.exec(`update public.subscriptions set status='active',current_period_end=now()-interval '1 day' where user_id='${B}';`);
    await expect(create(B)).rejects.toThrow(/active Pro or Premium/);
  });
  it("queues only one evolution job even after duplicate requests", async () => {
    await db.exec("update public.nova_artwork set released=true where storage_path='current.png'");
    const first = (await as("authenticated", A,
      "select public.request_nova_evolution(2) as result")).rows[0].result!;
    const second = (await as("authenticated", A,
      "select public.request_nova_evolution(2) as result")).rows[0].result!;
    expect(first).toEqual({ stage: 2, status: "queued" });
    expect(second).toEqual(first);
    const { rows } = await db.query<{ count: number }>(
      "select count(*)::integer as count from public.nova_generation_jobs");
    expect(rows[0].count).toBe(1);
    await db.exec("update public.nova_generation_jobs set status='failed'");
    const retry = (await as("authenticated", A,
      "select public.request_nova_evolution(2) as result")).rows[0].result!;
    expect(retry).toEqual({ stage: 2, status: "failed" });
    expect((await db.query<{ count: number }>(
      "select count(*)::integer as count from public.nova_generation_jobs")).rows[0].count).toBe(1);
  });
  it("never schedules unpaid or skipped evolution artwork", async () => {
    await expect(as("anon",null,"select public.request_nova_evolution(2)")).rejects.toThrow(/permission/);
    await expect(as("authenticated",A,"select public.request_nova_evolution(5)")).rejects.toThrow(/Previous approved/);
    const jobs=await db.query<{count:number}>("select count(*)::integer as count from public.nova_generation_jobs");
    expect(jobs.rows[0].count).toBe(1); // Existing Stage 2 job; no skipped Stage 5 job.
    await db.exec(`update public.subscriptions set status='cancelled' where user_id='${A}';`);
    await expect(as("authenticated", A,
      "select public.request_nova_evolution(3)")).rejects.toThrow(/active Pro or Premium/);
  });
});
