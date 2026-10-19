import { readFileSync } from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import {
  matchCompanions,
  type CompanionMatch,
} from "../../../supabase/functions/_shared/companion-matcher";

// Phase 2A security tests for supabase/migrations/20261019120000_cosmic_companion_candidates.sql
// against the full Nova migration chain, with the real shared matcher producing every match.
const STUDENT = "00000000-0000-4000-8000-0000000000a1";
const OTHER = "00000000-0000-4000-8000-0000000000a2";
const LEGACY = "00000000-0000-4000-8000-0000000000a3";
const LAPSED = "00000000-0000-4000-8000-0000000000a4";
const RACE = "00000000-0000-4000-8000-0000000000a5";
const NO_SUB = "00000000-0000-4000-8000-0000000000a6";
const LAPSED_WAITING = "00000000-0000-4000-8000-0000000000a7";
const ORPHAN = "00000000-0000-4000-8000-0000000000a8";
const ANSWERS = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];
const OTHER_ANSWERS = [3, 4, 3, 2, 1, 3, 0, 3, 1, 2, 3, 2];

const db = new PGlite();
type Row = Record<string, unknown>;
async function as(
  role: "anon" | "authenticated" | "service_role",
  user: string | null,
  sql: string,
  params: unknown[] = [],
) {
  return db.transaction(async (tx) => {
    await tx.query("select set_config('request.jwt.claims',$1,true)", [
      JSON.stringify({ sub: user, is_anonymous: false }),
    ]);
    await tx.exec(`set local role ${role}`);
    return tx.query<Row>(sql, params);
  });
}
const studio = async (user: string) =>
  (await as("authenticated", user, "select public.get_my_nova_studio() as r")).rows[0].r as Row & {
    kind: string | null;
    companions: Row[];
    companion: Row | null;
    origin: { ready: boolean; revealAfter: string; status: string } | null;
    selected: string | null;
    candidates: unknown[];
  };
const submit = (student: string, answers: number[], match: unknown) =>
  as("service_role", null, "select public.nova_submit_companions($1,$2,$3) as r", [
    student,
    answers,
    JSON.stringify(match),
  ]).then((res) => res.rows[0].r as { status: string; cardId: string });
async function saveDraft(user: string, answers: number[], name = "Rayyan") {
  const current = (await studio(user)).draft as { revision: number };
  await as("authenticated", user, "select public.save_nova_studio_draft($1,$2,$3)", [
    answers,
    name,
    current.revision,
  ]);
}
const cardOf = async (user: string) =>
  (await db.query<{ id: string }>("select id from public.nova_cards where owner_id=$1", [user]))
    .rows[0]?.id;
/** Simulate the (Phase 4) artwork pipeline finishing: two validated, distinct images. */
async function finishArtwork(cardId: string, revealPassed = true) {
  const { rows } = await db.query<{ id: string }>(
    "select id from public.nova_generation_jobs where card_id=$1 and stage=1",
    [cardId],
  );
  const job = rows[0].id;
  for (const [slot, hash] of [
    ["a", "a".repeat(64)],
    ["b", "b".repeat(64)],
  ])
    await db.query(
      `insert into public.nova_artwork(card_id,job_id,stage,candidate,storage_path,sha256,validation_version)
       values($1,$2,1,$3,$4,$5,'png-v1')`,
      [cardId, job, slot, `${cardId}/${job}/${slot}/${hash}.png`, hash],
    );
  await db.query("update public.nova_generation_candidates set status='ready' where job_id=$1", [
    job,
  ]);
  await db.query(
    `update public.nova_generation_jobs set status='ready',
       reveal_after = case when $2 then now() - interval '1 minute' else reveal_after end where id=$1`,
    [job, revealPassed],
  );
}
/** The chosen companion as delivered after the choice: without the reason naming the other. */
const chosenView = (spec: CompanionMatch["candidates"][number]) => ({
  ...spec,
  match: { ...spec.match, reasons: spec.match.reasons.filter((r) => r.basis !== "difference") },
});
const tamper = (match: CompanionMatch, edit: (m: CompanionMatch) => void) => {
  const copy = structuredClone(match);
  edit(copy);
  return copy;
};

describe("Cosmic Companion candidates: secure persistence, reveal and selection", () => {
  beforeAll(async () => {
    await db.exec(`create role anon; create role authenticated; create role service_role bypassrls;
      create schema auth; create schema storage;
      create table auth.users(id uuid primary key);
      create function auth.jwt() returns jsonb language sql stable as $$ select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb $$;
      create function auth.uid() returns uuid language sql stable as $$ select (auth.jwt()->>'sub')::uuid $$;
      grant usage on schema auth,public,storage to anon,authenticated,service_role;
      grant execute on all functions in schema auth to anon,authenticated;
      alter default privileges in schema public grant all on tables to anon,authenticated;
      create table public.profiles(id uuid primary key references auth.users(id) on delete cascade,role text not null,status text not null);
      create table public.subscriptions(user_id uuid primary key references auth.users(id), plan text not null, status text not null, current_period_end timestamptz);
      create table storage.buckets(id text primary key,name text,public boolean);
      create table storage.objects(id uuid default gen_random_uuid(),bucket_id text,name text);
      alter table storage.objects enable row level security;
      grant select on storage.objects to anon,authenticated;`);
    for (const user of [STUDENT, OTHER, LEGACY, LAPSED, RACE, NO_SUB, LAPSED_WAITING, ORPHAN]) {
      await db.query("insert into auth.users values($1)", [user]);
      await db.query("insert into public.profiles values($1,'student','active')", [user]);
      if (user !== NO_SUB)
        await db.query(
          "insert into public.subscriptions values($1,'pro','active',now()+interval '30 days')",
          [user],
        );
    }
    for (const file of [
      "20261018160000_nova_companion_cards.sql",
      "20261018160100_nova_studio_batch.sql",
      "20261018160200_nova_creature_variety.sql",
      "20261019120000_cosmic_companion_candidates.sql",
      "20261019130000_cosmic_companion_sharing.sql",
    ])
      await db.exec(
        readFileSync(new URL(`../../../supabase/migrations/${file}`, import.meta.url), "utf8"),
      );
  }, 60_000);
  afterAll(() => db.close());

  it("binds a match to its answers exactly as the shared matcher does", async () => {
    for (const answers of [ANSWERS, OTHER_ANSWERS, [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]) {
      const { rows } = await db.query<{ f: string }>(
        "select public.nova_match_input_fingerprint($1,'cc-matcher-v1','cc-catalogue-v1') as f",
        [answers],
      );
      expect(rows[0].f).toBe(matchCompanions(answers).inputFingerprint);
    }
  });

  it("gives students and anonymous users no direct access to candidates or submission", async () => {
    for (const role of ["anon", "authenticated"] as const) {
      for (const sql of [
        "select * from public.nova_card_candidates",
        "insert into public.nova_card_candidates(card_id,slot,spec) values(gen_random_uuid(),'a','{}')",
        "update public.nova_card_candidates set spec='{}'",
        "delete from public.nova_card_candidates",
      ])
        await expect(as(role, STUDENT, sql)).rejects.toThrow(/permission denied/);
      await expect(
        as(role, STUDENT, "select public.nova_submit_companions($1,$2,$3)", [
          STUDENT,
          ANSWERS,
          JSON.stringify(matchCompanions(ANSWERS)),
        ]),
      ).rejects.toThrow(/permission denied/);
    }
    // The legacy learner RPC would create a card without candidates: it now fails closed.
    await saveDraft(STUDENT, ANSWERS);
    await expect(
      as("authenticated", STUDENT, "select public.submit_nova_origin()"),
    ).rejects.toThrow(/Cosmic Companion server/);
    expect(await cardOf(STUDENT)).toBeUndefined();
  });

  it("rejects forged, stale or malformed matches atomically", async () => {
    const real = matchCompanions(ANSWERS);
    const forged: [string, unknown, RegExp][] = [
      [
        "another student's answers",
        matchCompanions(OTHER_ANSWERS),
        /does not belong to these answers/,
      ],
      [
        "an unsupported matcher version",
        tamper(real, (m) => (m.matcherVersion = "cc-matcher-v9")),
        /Invalid companion match/,
      ],
      ["swapped slots", tamper(real, (m) => m.candidates.reverse()), /Invalid companion match/],
      [
        "three candidates",
        { ...real, candidates: [...real.candidates, real.candidates[1]] },
        /Invalid companion match/,
      ],
      [
        "a mismatched candidate ID",
        tamper(real, (m) => (m.candidates[0].candidateId = "cc1-a-00000000000000000000")),
        /check constraint/,
      ],
      [
        "a second candidate of the same species",
        tamper(real, (m) => (m.candidates[1].species = m.candidates[0].species)),
        /two distinct candidates/,
      ],
      [
        "a second candidate of the same element",
        tamper(real, (m) => (m.candidates[1].element = m.candidates[0].element)),
        /two distinct candidates/,
      ],
      [
        "an invented species",
        tamper(real, (m) => ((m.candidates[0] as { species: string }).species = "Griffin")),
        /check constraint/,
      ],
      ["not an object", "match", /Invalid companion match/],
    ];
    for (const [, match, error] of forged)
      await expect(submit(STUDENT, ANSWERS, match)).rejects.toThrow(error);
    // Answers that differ from the saved draft (another device changed them) are refused.
    await expect(submit(STUDENT, OTHER_ANSWERS, matchCompanions(OTHER_ANSWERS))).rejects.toThrow(
      /another device/,
    );
    // Nothing partial was written by any failed attempt.
    expect(await cardOf(STUDENT)).toBeUndefined();
    const { rows } = await db.query<{ n: number }>(
      "select count(*)::int as n from public.nova_card_candidates",
    );
    expect(rows[0].n).toBe(0);
  });

  it("submits while AI generation is disabled, with a 24-hour server-side reveal", async () => {
    const settings = await db.query<{ enabled: boolean; batch_enabled: boolean }>(
      "select enabled,batch_enabled from public.nova_generation_settings",
    );
    expect(settings.rows[0]).toEqual({ enabled: false, batch_enabled: false });
    const before = Date.now();
    const result = await submit(STUDENT, ANSWERS, matchCompanions(ANSWERS));
    expect(result.status).toBe("created");
    const stored = await db.query<{ slot: string; spec: Row; species: string }>(
      "select slot,spec,species from public.nova_card_candidates where card_id=$1 order by slot",
      [result.cardId],
    );
    expect(stored.rows.map((r) => r.spec)).toEqual(matchCompanions(ANSWERS).candidates);
    const state = await studio(STUDENT);
    expect(state.kind).toBe("cosmic-companion");
    expect(state.origin?.status).toBe("queued");
    const delay = new Date(state.origin!.revealAfter).getTime() - before;
    expect(delay).toBeGreaterThan(24 * 3_600_000 - 60_000);
    expect(delay).toBeLessThan(24 * 3_600_000 + 60_000);
    // The draft is locked once submitted.
    await expect(saveDraft(STUDENT, ANSWERS)).rejects.toThrow(/already saved/);
  });

  it("is idempotent: repeated or rival submissions never re-match or add candidates", async () => {
    const cardId = await cardOf(STUDENT);
    const before = await db.query(
      "select slot,fingerprint from public.nova_card_candidates order by slot",
    );
    expect((await submit(STUDENT, ANSWERS, matchCompanions(ANSWERS))).status).toBe("existing");
    // A rival device/server racing with a different (even forged) payload is ignored too.
    expect((await submit(STUDENT, OTHER_ANSWERS, matchCompanions(OTHER_ANSWERS))).status).toBe(
      "existing",
    );
    expect(await cardOf(STUDENT)).toBe(cardId);
    const after = await db.query(
      "select slot,fingerprint from public.nova_card_candidates order by slot",
    );
    expect(after.rows).toEqual(before.rows);
  });

  it("serialises concurrent submissions so only one card can exist per student", async () => {
    await saveDraft(RACE, ANSWERS);
    const match = matchCompanions(ANSWERS);
    const results = await Promise.allSettled([
      submit(RACE, ANSWERS, match),
      submit(RACE, ANSWERS, match),
      submit(RACE, ANSWERS, match),
    ]);
    const statuses = results.map((r) => (r.status === "fulfilled" ? r.value.status : "error"));
    expect(statuses.filter((s) => s === "created")).toHaveLength(1);
    expect(statuses.filter((s) => s === "existing")).toHaveLength(2);
    const cards = await db.query<{ n: number }>(
      "select count(*)::int as n from public.nova_cards where owner_id=$1",
      [RACE],
    );
    expect(cards.rows[0].n).toBe(1);
    // The database itself also forbids a second card per owner.
    await expect(
      db.query(
        "insert into public.nova_cards(owner_id,username,answers,variant) values($1,'Second',$2,'a')",
        [RACE, ANSWERS],
      ),
    ).rejects.toThrow(/duplicate key/);
  });

  it("keeps candidate specifications immutable", async () => {
    const cardId = await cardOf(STUDENT);
    for (const sql of [
      'update public.nova_card_candidates set spec = spec || \'{"name":"Phoenix"}\' where card_id=$1',
      "delete from public.nova_card_candidates where card_id=$1",
    ]) {
      await expect(db.query(sql, [cardId])).rejects.toThrow(/permanent/);
      await expect(as("service_role", null, sql, [cardId])).rejects.toThrow(/permanent/);
    }
    await expect(
      db.query(
        "insert into public.nova_card_candidates(card_id,slot,spec) select card_id,slot,spec from public.nova_card_candidates where card_id=$1",
        [cardId],
      ),
    ).rejects.toThrow(/duplicate key/);
  });

  it("hides both identities before the reveal and blocks early selection", async () => {
    const state = await studio(STUDENT);
    expect(state.companions).toEqual([]);
    expect(state.companion).toBeNull();
    expect(state.candidates).toEqual([]);
    expect(JSON.stringify(state)).not.toMatch(/"archetypeId"|"tagline"|cc1-[ab]-/);
    await expect(
      as("authenticated", STUDENT, "select public.select_nova_origin('a')"),
    ).rejects.toThrow(/not ready/);
  });

  it("keeps waiting when 24 hours pass but artwork is not ready", async () => {
    await db.query(
      "update public.nova_generation_jobs set reveal_after=now()-interval '1 minute' where card_id=$1",
      [await cardOf(STUDENT)],
    );
    const state = await studio(STUDENT);
    expect(state.origin?.ready).toBe(false);
    expect(state.companions).toEqual([]);
    await expect(
      as("authenticated", STUDENT, "select public.select_nova_origin('a')"),
    ).rejects.toThrow(/not ready/);
  });

  it("keeps waiting when artwork is ready but 24 hours have not passed", async () => {
    await saveDraft(OTHER, OTHER_ANSWERS, "Mia");
    const { cardId } = await submit(OTHER, OTHER_ANSWERS, matchCompanions(OTHER_ANSWERS));
    await finishArtwork(cardId, false);
    const state = await studio(OTHER);
    expect(state.origin?.status).toBe("ready");
    expect(state.origin?.ready).toBe(false);
    expect(state.companions).toEqual([]);
  });

  it("reveals both companions only when both conditions hold, then locks one forever", async () => {
    const cardId = (await cardOf(STUDENT))!;
    await finishArtwork(cardId);
    const revealed = await studio(STUDENT);
    expect(revealed.origin?.ready).toBe(true);
    expect(revealed.companions).toEqual(matchCompanions(ANSWERS).candidates);
    expect(revealed.candidates).toHaveLength(2);

    const chosen = await as("authenticated", STUDENT, "select public.select_nova_origin('b') as r");
    const after = chosen.rows[0].r as Row & { companion: Row; companions: unknown[] };
    expect(after.selected).toBe("b");
    expect(after.companion).toEqual(chosenView(matchCompanions(ANSWERS).candidates[1]));
    expect(JSON.stringify(after.companion)).not.toContain(
      matchCompanions(ANSWERS).candidates[0].name,
    );
    expect(after.companions).toEqual([]);
    // Same choice again is idempotent; a different choice is rejected.
    await expect(
      as("authenticated", STUDENT, "select public.select_nova_origin('b')"),
    ).resolves.toBeTruthy();
    await expect(
      as("authenticated", STUDENT, "select public.select_nova_origin('a')"),
    ).rejects.toThrow(/already selected/);
    const returning = await studio(STUDENT);
    expect(returning.companion).toEqual(chosenView(matchCompanions(ANSWERS).candidates[1]));
    expect(JSON.stringify(returning)).not.toContain(
      matchCompanions(ANSWERS).candidates[0].candidateId,
    );
  });

  it("never shows one student's companions to another", async () => {
    const other = await studio(OTHER);
    const mine = matchCompanions(ANSWERS).candidates.map((c) => c.candidateId);
    for (const id of mine) expect(JSON.stringify(other)).not.toContain(id);
    // OTHER cannot choose for STUDENT; their own (unrevealed) card refuses selection.
    await expect(
      as("authenticated", OTHER, "select public.select_nova_origin('a')"),
    ).rejects.toThrow(/not ready/);
    expect((await studio(STUDENT)).selected).toBe("b");
  });

  it("shares only a public summary of the chosen companion", async () => {
    const cardId = await cardOf(STUDENT);
    await as("authenticated", STUDENT, "select public.set_nova_sharing(true)");
    const { rows } = await db.query<{ public_id: string }>(
      "select public_id from public.nova_cards where id=$1",
      [cardId],
    );
    const card = (
      await as("anon", null, "select public.get_public_nova_card($1) as r", [rows[0].public_id])
    ).rows[0].r as Row & { companion: Row };
    const chosen = matchCompanions(ANSWERS).candidates[1];
    expect(card.companion).toMatchObject({
      archetypeId: chosen.archetypeId,
      name: chosen.name,
      species: chosen.species,
      element: chosen.element,
    });
    expect(JSON.stringify(card)).not.toMatch(/"reasons"|"inputFingerprint"|"answerIndexes"/);
    expect(JSON.stringify(card)).not.toContain(matchCompanions(ANSWERS).candidates[0].name);
    // No answer-derived traits: nothing reveals the student's 12 answers.
    expect(card.traits).toBeNull();
    for (const answer of ["Discovering something new", "Try a new path", "Explore together"])
      expect(JSON.stringify(card)).not.toContain(answer);
  });

  it("keeps a matched card private until a companion is chosen", async () => {
    await as("authenticated", RACE, "select public.set_nova_sharing(true)");
    const { rows } = await db.query<{ public_id: string }>(
      "select public_id from public.nova_cards where owner_id=$1",
      [RACE],
    );
    const shared = await as("anon", null, "select public.get_public_nova_card($1) as r", [
      rows[0].public_id,
    ]);
    expect(shared.rows[0].r).toBeNull();
    const own = (await as("authenticated", RACE, "select public.get_my_nova_card() as r")).rows[0]
      .r as Row;
    expect(own.traits).toBeNull();
    expect(own.companion).toBeNull();
    expect(own.artworkPath).toBeNull();
  });

  it("keeps a chosen companion viewable after the subscription expires", async () => {
    await saveDraft(LAPSED, OTHER_ANSWERS, "Lapsed");
    const { cardId } = await submit(LAPSED, OTHER_ANSWERS, matchCompanions(OTHER_ANSWERS));
    await finishArtwork(cardId);
    await as("authenticated", LAPSED, "select public.select_nova_origin('a')");
    await db.query(
      "update public.subscriptions set status='expired', current_period_end=now()-interval '1 day' where user_id=$1",
      [LAPSED],
    );
    const state = await studio(LAPSED);
    expect(state.active).toBe(false);
    expect(state.companion).toEqual(matchCompanions(OTHER_ANSWERS).candidates[0]);
    const card = (await as("authenticated", LAPSED, "select public.get_my_nova_card() as r"))
      .rows[0].r as Row & { companion: Row; artworkPath: string };
    expect(card.companion).toMatchObject({
      name: matchCompanions(OTHER_ANSWERS).candidates[0].name,
    });
    const art = await as("authenticated", LAPSED, "select public.can_read_nova_artwork($1) as r", [
      card.artworkPath,
    ]);
    expect(art.rows[0].r).toBe(true);
  });

  it("requires an active subscription to submit", async () => {
    await saveDraft(NO_SUB, ANSWERS, "NoPlan");
    await expect(submit(NO_SUB, ANSWERS, matchCompanions(ANSWERS))).rejects.toThrow(/subscription/);
    expect(await cardOf(NO_SUB)).toBeUndefined();
  });

  it("leaves legacy cards untouched and never re-matches them", async () => {
    await db.query(
      "insert into public.nova_cards(owner_id,username,answers,variant) values($1,'Legacy',$2,'a')",
      [LEGACY, ANSWERS],
    );
    await saveDraft(LEGACY, ANSWERS).catch(() => undefined);
    const state = await studio(LEGACY);
    expect(state.kind).toBe("legacy");
    expect(state.companions).toEqual([]);
    expect(state.companion).toBeNull();
    expect((await submit(LEGACY, ANSWERS, matchCompanions(ANSWERS))).status).toBe("existing");
    const { rows } = await db.query<{ n: number }>(
      "select count(*)::int as n from public.nova_card_candidates where card_id=$1",
      [await cardOf(LEGACY)],
    );
    expect(rows[0].n).toBe(0);
    const card = (await as("authenticated", LEGACY, "select public.get_my_nova_card() as r"))
      .rows[0].r as Row;
    expect(card.companion).toBeNull();
    expect(card.traits).toBeTruthy();
  });

  it("keeps companion cards out of the single-identity artwork worker", async () => {
    // Give the legacy card a pending job so the worker has something it may legitimately take.
    const legacyCard = await cardOf(LEGACY);
    const { rows } = await db.query<{ id: string }>(
      `insert into public.nova_generation_jobs(card_id,stage,prompt_version,identity_snapshot,reveal_after)
       select id,1,'nova-art-v1',identity_spec,now() from public.nova_cards where id=$1 returning id`,
      [legacyCard],
    );
    await db.query(
      "insert into public.nova_generation_candidates(job_id,candidate) values($1,'a'),($1,'b')",
      [rows[0].id],
    );
    await db.query(
      "update public.nova_generation_settings set enabled=true,batch_enabled=true,monthly_cap_microusd=100000000,max_batch_requests=2",
    );
    try {
      const pending = await db.query<{ n: number }>(
        `select count(*)::int as n from public.nova_generation_candidates p
         join public.nova_generation_jobs j on j.id=p.job_id
         join public.nova_card_candidates k on k.card_id=j.card_id where p.status='pending'`,
      );
      expect(pending.rows[0].n).toBeGreaterThan(0);
      const batch = (await as("service_role", null, "select public.nova_prepare_batch() as r"))
        .rows[0].r as string;
      expect(batch).toBeTruthy();
      const claimed = await db.query<{ card_id: string }>(
        `select distinct j.card_id from public.nova_batch_requests r
         join public.nova_generation_candidates p on p.id=r.candidate_id
         join public.nova_generation_jobs j on j.id=p.job_id where r.batch_id=$1`,
        [batch],
      );
      expect(claimed.rows.map((r) => r.card_id)).toEqual([legacyCard]);
    } finally {
      await db.query(
        "update public.nova_generation_settings set enabled=false,batch_enabled=false",
      );
    }
  });

  it("exposes only the reviewed functions to students and anonymous visitors", async () => {
    // Any newly exposed function could leak candidates early; this list must be reviewed.
    const { rows } = await db.query<{ fn: string; role: string }>(
      `select p.proname as fn, r.role from pg_proc p
       join pg_namespace n on n.oid = p.pronamespace
       cross join (values ('anon'), ('authenticated')) r(role)
       where n.nspname = 'public' and has_function_privilege(r.role, p.oid, 'EXECUTE')
       order by r.role, p.proname`,
    );
    expect(rows.map((r) => `${r.role}:${r.fn}`)).toEqual([
      "anon:can_read_nova_artwork",
      "anon:get_public_nova_card",
      "authenticated:can_read_nova_artwork",
      "authenticated:get_my_nova_card",
      "authenticated:get_my_nova_studio",
      "authenticated:get_public_nova_card",
      "authenticated:request_nova_evolution",
      "authenticated:save_nova_studio_draft",
      "authenticated:select_nova_origin",
      "authenticated:set_nova_sharing",
      "authenticated:submit_nova_origin",
    ]);
  });

  it("grants students no table access except reading their own card", async () => {
    const { rows } = await db.query<{ grant: string }>(
      `select r.role || ':' || c.relname || ':' || p.priv as grant
       from pg_class c join pg_namespace n on n.oid = c.relnamespace
       cross join (values ('anon'), ('authenticated')) r(role)
       cross join (values ('SELECT'), ('INSERT'), ('UPDATE'), ('DELETE')) p(priv)
       where n.nspname = 'public' and c.relkind = 'r' and c.relname like 'nova\\_%'
         and has_table_privilege(r.role, c.oid, p.priv)
       order by 1`,
    );
    expect(rows.map((r) => r.grant)).toEqual(["authenticated:nova_cards:SELECT"]);
  });

  it("gives students no way to shorten the 24-hour wait or mark artwork ready", async () => {
    for (const sql of [
      "update public.nova_generation_jobs set reveal_after = now(), status = 'ready'",
      "update public.nova_generation_candidates set status = 'ready'",
      "insert into public.nova_artwork(card_id,job_id,stage,candidate,storage_path) values(gen_random_uuid(),gen_random_uuid(),1,'a','x')",
    ])
      await expect(as("authenticated", RACE, sql)).rejects.toThrow(/permission denied/);
    const state = await studio(RACE);
    expect(state.origin?.ready).toBe(false);
    expect(state.companions).toEqual([]);
  });

  it("keeps each student's artwork private, and the unchosen artwork hidden after the choice", async () => {
    const paths = await db.query<{ owner: string; candidate: string; path: string }>(
      `select c.owner_id as owner, a.candidate, a.storage_path as path from public.nova_artwork a
       join public.nova_cards c on c.id = a.card_id order by 1, 2`,
    );
    const read = async (user: string | null, path: string) =>
      (
        await as(
          user ? "authenticated" : "anon",
          user,
          "select public.can_read_nova_artwork($1) as r",
          [path],
        )
      ).rows[0].r;
    const studentArt = paths.rows.filter((r) => r.owner === STUDENT);
    const lapsedArt = paths.rows.filter((r) => r.owner === LAPSED);
    // STUDENT chose b and shares; LAPSED chose a and does not share.
    expect(await read(STUDENT, studentArt.find((r) => r.candidate === "a")!.path)).toBe(false);
    expect(await read(STUDENT, studentArt.find((r) => r.candidate === "b")!.path)).toBe(true);
    expect(await read(null, studentArt.find((r) => r.candidate === "a")!.path)).toBe(false);
    for (const art of lapsedArt) expect(await read(STUDENT, art.path)).toBe(false);
    for (const art of lapsedArt) expect(await read(null, art.path)).toBe(false);
  });

  it("lets a validly submitted journey finish even if the subscription lapses while waiting", async () => {
    await saveDraft(LAPSED_WAITING, ANSWERS, "Waiting");
    const { cardId } = await submit(LAPSED_WAITING, ANSWERS, matchCompanions(ANSWERS));
    await db.query(
      "update public.subscriptions set status='expired', current_period_end=now()-interval '1 day' where user_id=$1",
      [LAPSED_WAITING],
    );
    // Lapsing never shortens the wait…
    expect((await studio(LAPSED_WAITING)).companions).toEqual([]);
    await finishArtwork(cardId);
    // …but once both conditions hold, the reveal and the permanent choice are available.
    const revealed = await studio(LAPSED_WAITING);
    expect(revealed.active).toBe(false);
    expect(revealed.companions).toEqual(matchCompanions(ANSWERS).candidates);
    await as("authenticated", LAPSED_WAITING, "select public.select_nova_origin('a')");
    expect((await studio(LAPSED_WAITING)).companion).toEqual(
      matchCompanions(ANSWERS).candidates[0],
    );
    // A new journey still needs an active subscription.
    await expect(submit(NO_SUB, ANSWERS, matchCompanions(ANSWERS))).rejects.toThrow(/subscription/);
  });

  it("repairs a legacy card without a job only through the audited service function", async () => {
    await db.query(
      "insert into public.nova_cards(owner_id,username,answers,variant) values($1,'Orphan',$2,'a')",
      [ORPHAN, OTHER_ANSWERS],
    );
    const card = (await cardOf(ORPHAN))!;
    const identity = (
      await db.query<{ identity_spec: Row }>(
        "select identity_spec from public.nova_cards where id=$1",
        [card],
      )
    ).rows[0].identity_spec;
    const repair = (reason: string, target = card) =>
      as("service_role", null, "select public.nova_admin_repair_legacy_job($1,$2) as r", [
        target,
        reason,
      ]).then((r) => r.rows[0].r as string);
    // Students cannot call it; a reason is mandatory; companion cards are refused.
    await expect(
      as(
        "authenticated",
        ORPHAN,
        "select public.nova_admin_repair_legacy_job($1,'student attempt here')",
        [card],
      ),
    ).rejects.toThrow(/permission denied/);
    await expect(repair("short")).rejects.toThrow(/audit reason/);
    await expect(
      repair("Repair request for a companion card", (await cardOf(STUDENT))!),
    ).rejects.toThrow(/never repaired as legacy/);
    const job = await repair("Support ticket 1234: legacy card missing its Origin job");
    expect(await repair("Support ticket 1234: repeated by mistake")).toBe(job);
    const stored = await db.query<{ identity_snapshot: Row; reveal_after: string; n: number }>(
      `select j.identity_snapshot, j.reveal_after,
         (select count(*)::int from public.nova_generation_candidates where job_id=j.id) as n
       from public.nova_generation_jobs j where j.id=$1`,
      [job],
    );
    // The card's own permanent identity, never a new match; nothing else changed.
    expect(stored.rows[0].identity_snapshot).toEqual(identity);
    expect(stored.rows[0].n).toBe(2);
    const state = await studio(ORPHAN);
    expect(state.kind).toBe("legacy");
    expect(state.companions).toEqual([]);
    const audit = await db.query<{ n: number }>(
      "select count(*)::int as n from public.nova_generation_audit where action='legacy_job_repaired' and subject_id=$1",
      [card],
    );
    expect(audit.rows[0].n).toBe(1);
  });

  it("keeps the legacy sharing, QR and export payload shape", async () => {
    await as("authenticated", LEGACY, "select public.set_nova_sharing(true)");
    const { rows } = await db.query<{ public_id: string }>(
      "select public_id from public.nova_cards where owner_id=$1",
      [LEGACY],
    );
    const card = (
      await as("anon", null, "select public.get_public_nova_card($1) as r", [rows[0].public_id])
    ).rows[0].r as Row;
    expect(Object.keys(card).sort()).toEqual(
      [
        "artworkPath",
        "companion",
        "publicId",
        "rarity",
        "serial",
        "sharing",
        "stage",
        "traits",
        "username",
        "variant",
      ].sort(),
    );
    expect(card.companion).toBeNull();
    expect(card.publicId).toBe(rows[0].public_id);
  });

  it("deletes candidates only together with their card (account deletion)", async () => {
    const cardId = await cardOf(OTHER);
    await db.query("delete from public.subscriptions where user_id=$1", [OTHER]);
    await db.query("delete from auth.users where id=$1", [OTHER]);
    const { rows } = await db.query<{ n: number }>(
      "select count(*)::int as n from public.nova_card_candidates where card_id=$1",
      [cardId],
    );
    expect(rows[0].n).toBe(0);
  });
});
