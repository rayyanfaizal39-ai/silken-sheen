import { readFileSync } from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { traitsFromAnswers } from "./model";

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

async function seedCard(user: string, answers = Array(12).fill(0)) {
  await db.query(
    `insert into public.nova_cards(owner_id,username,answers,variant)
     values($1,'Explorer',$2,'a') on conflict(owner_id) do nothing`,
    [user, answers],
  );
  return as("authenticated", user, "select public.get_my_nova_card() as result");
}

describe("Phase 1 Cards migration with real API roles and RLS", () => {
  beforeAll(async () => {
    await db.exec(`create role anon; create role authenticated; create role service_role bypassrls;
      create schema auth; create schema storage;
      create table auth.users(id uuid primary key);
      create function auth.jwt() returns jsonb language sql stable as $$ select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb $$;
      create function auth.uid() returns uuid language sql stable as $$ select (auth.jwt()->>'sub')::uuid $$;
      grant usage on schema auth,public,storage to anon,authenticated;
      grant execute on all functions in schema auth to anon,authenticated;
      alter default privileges in schema public grant all on tables to anon,authenticated;
      create table public.profiles(id uuid primary key references auth.users(id),role text not null,status text not null);
      create table public.subscriptions(user_id uuid primary key references auth.users(id),plan text not null,status text not null,current_period_end timestamptz);
      create table storage.buckets(id text primary key,name text,public boolean);
      create table storage.objects(id uuid default gen_random_uuid(),bucket_id text,name text);
      alter table storage.objects enable row level security;
      grant select on storage.objects to anon,authenticated;
      insert into auth.users values('${A}'),('${B}'),('${C}');
      insert into public.profiles values('${A}','student','active'),('${B}','student','active'),('${C}','student','active');
      insert into public.subscriptions values
        ('${A}','pro','active',now()+interval '30 days'),
        ('${B}','premium','active',now()+interval '30 days'),
        ('${C}','pro','active',now()+interval '30 days');`);
    await db.exec(
      readFileSync(
        new URL(
          "../../../supabase/migrations/20261018160000_nova_companion_cards.sql",
          import.meta.url,
        ),
        "utf8",
      ),
    );
  }, 30000);

  afterAll(() => db.close());

  let publicId: string;
  let serial: string;

  it("installs without AcadeMY progress or XP tables", async () => {
    const objects = await db.query<{ name: string | null }>(`
      select to_regclass(name)::text as name from unnest(array[
        'public.user_progress','public.quiz_xp_awards','public.mission_reward_claims',
        'public.nova_xp_baselines'
      ]) name`);
    expect(objects.rows.every((row) => row.name === null)).toBe(true);
    const functions = await db.query<{ count: number }>(`
      select count(*)::integer as count from pg_proc p join pg_namespace n on n.oid=p.pronamespace
      where n.nspname='public' and p.proname in ('nova_verified_xp','nova_stage')`);
    expect(functions.rows[0].count).toBe(0);
  });

  it("creates one permanent card without requiring or exposing XP", async () => {
    const { rows } = await seedCard(A);
    const card = rows[0].result!;
    publicId = card.publicId as string;
    serial = card.serial as string;
    expect(publicId).toMatch(/^[0-9a-f-]{36}$/);
    expect(publicId).not.toBe(A);
    expect(serial).toMatch(/^\d{12}$/);
    expect(card).not.toHaveProperty("owner_id");
    expect(card).not.toHaveProperty("answers");
    expect(card).not.toHaveProperty("id");
    expect(card).not.toHaveProperty("xp");
    expect(card).toMatchObject({ sharing: false, stage: 1, variant: "a" });
    expect(card.traits).toEqual(traitsFromAnswers(Array(12).fill(0)));

    const repeated = (await seedCard(A, Array(12).fill(1))).rows[0].result!;
    expect(repeated.publicId).toBe(publicId);
    expect(repeated.traits).toEqual(traitsFromAnswers(Array(12).fill(0)));
  });

  it("enforces owner RLS and rejects direct card or artwork writes", async () => {
    expect(
      (
        await as("authenticated", A, "select to_jsonb(c) as result from public.nova_cards c")
      ).rows,
    ).toHaveLength(1);
    expect(
      (
        await as(
          "authenticated",
          B,
          "select to_jsonb(c) as result from public.nova_cards c where owner_id=$1",
          [A],
        )
      ).rows,
    ).toHaveLength(0);
    await expect(
      as("anon", null, "select to_jsonb(c) as result from public.nova_cards c"),
    ).rejects.toThrow(/permission/);
    for (const sql of [
      "update public.nova_cards set sharing=true",
      "delete from public.nova_cards",
      "update public.nova_cards set rarity='Legendary'",
      "insert into public.nova_artwork(card_id,job_id,stage,candidate,storage_path) select id,gen_random_uuid(),5,'a','future.png' from public.nova_cards",
    ])
      await expect(as("authenticated", A, sql)).rejects.toThrow(/permission/);
  });

  it("uses opaque public IDs and returns indistinguishable null for private or missing cards", async () => {
    expect(
      (await as("anon", null, "select public.get_public_nova_card($1) as result", [publicId]))
        .rows[0].result,
    ).toBeNull();
    expect(
      (await as("anon", null, "select public.get_public_nova_card($1) as result", [C])).rows[0]
        .result,
    ).toBeNull();
    await expect(
      as("anon", null, "select public.get_public_nova_card_by_serial($1) as result", [serial]),
    ).rejects.toThrow();
  });

  it("shares only the approved card payload and revokes public access immediately", async () => {
    await as("authenticated", A, "select public.set_nova_sharing(true)");
    const card = (
      await as("anon", null, "select public.get_public_nova_card($1) as result", [publicId])
    ).rows[0].result!;
    expect(card).toMatchObject({ username: "Explorer", stage: 1, sharing: true });
    expect(card).not.toHaveProperty("owner_id");
    expect(card).not.toHaveProperty("answers");
    expect(card).not.toHaveProperty("xp");
    await as("authenticated", A, "select public.set_nova_sharing(false)");
    expect(
      (await as("anon", null, "select public.get_public_nova_card($1) as result", [publicId]))
        .rows[0].result,
    ).toBeNull();
  });

  it("removes legacy creation and rejects malformed questionnaires", async () => {
    await expect(
      as("anon", null, "select public.create_nova_card('Name',array_fill(0,array[12]),'a')"),
    ).rejects.toThrow(/does not exist/);
    for (const answers of [[], [0], Array(12).fill(3), Array(12).fill(null)])
      await expect(
        db.query(
          "insert into public.nova_cards(owner_id,username,answers,variant) values($1,'Invalid',$2,'a')",
          [C, answers],
        ),
      ).rejects.toThrow();
  });

  it("retrieves only the selected, released Origin artwork", async () => {
    await db.exec(`insert into public.nova_generation_jobs(card_id,stage,prompt_version,identity_snapshot,status)
        select id,1,'test','{}','ready' from public.nova_cards where owner_id='${A}';
      insert into public.nova_generation_jobs(card_id,stage,prompt_version,identity_snapshot,status)
        select id,5,'future','{}','ready' from public.nova_cards where owner_id='${A}';
      insert into public.nova_artwork(card_id,job_id,stage,candidate,storage_path,released,selected)
        select c.id,j.id,1,'a','origin.png',true,true from public.nova_cards c join public.nova_generation_jobs j on j.card_id=c.id and j.stage=1 where c.owner_id='${A}';
      insert into public.nova_artwork(card_id,job_id,stage,candidate,storage_path,released,selected)
        select c.id,j.id,5,'a','future.png',true,true from public.nova_cards c join public.nova_generation_jobs j on j.card_id=c.id and j.stage=5 where c.owner_id='${A}';
      insert into storage.objects(bucket_id,name) values('nova-artwork','origin.png'),('nova-artwork','future.png');`);
    expect(
      (
        await as(
          "authenticated",
          A,
          "select jsonb_build_object('name',name) as result from storage.objects order by name",
        )
      ).rows.map((row) => row.result!.name),
    ).toEqual(["origin.png"]);
    await as("authenticated", A, "select public.set_nova_sharing(true)");
    expect(
      (
        await as(
          "anon",
          null,
          "select jsonb_build_object('name',name) as result from storage.objects order by name",
        )
      ).rows.map((row) => row.result!.name),
    ).toEqual(["origin.png"]);
    const shared = (
      await as("anon", null, "select public.get_public_nova_card($1) as result", [publicId])
    ).rows[0].result!;
    expect(shared.artworkPath).toBe("origin.png");
  });

  it("preserves subscription checks without coupling card viewing to XP", async () => {
    await seedCard(B);
    await db.exec(`update public.subscriptions set status='pending' where user_id='${B}';`);
    expect(
      (
        await db.query<{ active: boolean }>(
          "select public.nova_subscription_active($1) as active",
          [B],
        )
      ).rows[0].active,
    ).toBe(false);
    const card = (await as("authenticated", B, "select public.get_my_nova_card() as result")).rows[0]
      .result!;
    expect(card.publicId).toBeTruthy();
    expect(card).not.toHaveProperty("xp");
  });

  it("fails evolution closed and never creates a stage 2-5 job", async () => {
    await expect(as("anon", null, "select public.request_nova_evolution(2)")).rejects.toThrow(
      /permission/,
    );
    await expect(
      as("authenticated", A, "select public.request_nova_evolution(2)"),
    ).rejects.toThrow(/not available in Phase 1/);
    const jobs = await db.query<{ count: number }>(
      "select count(*)::integer as count from public.nova_generation_jobs where stage between 2 and 4",
    );
    expect(jobs.rows[0].count).toBe(0);
  });
});
