// TEST SUPPORT ONLY (never imported by app code): a PGlite database migrated through the full
// Nova chain, a WorkerStore backed by its real SQL functions, and a scripted mock Batch
// provider that returns real PNG files. No network, no real provider, no money.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";
import { PGlite } from "@electric-sql/pglite";
import type {
  Batch,
  BatchProvider,
  GenerationRequest,
  ProviderBatch,
} from "../../../../supabase/functions/_shared/nova-generation";
import type { WorkerStore } from "../../../../supabase/functions/_shared/nova-worker";
import { fnv1a32 } from "../../../../supabase/functions/_shared/content-fingerprint";

export const NOVA_MIGRATIONS = [
  "20261018160000_nova_companion_cards.sql",
  "20261018160100_nova_studio_batch.sql",
  "20261018160200_nova_creature_variety.sql",
  "20261019120000_cosmic_companion_candidates.sql",
  "20261019130000_cosmic_companion_sharing.sql",
  "20261020120000_cosmic_companion_artwork.sql",
];
export const TEST_DNA_SECRET = "test-dna-secret-0123456789abcdef0123456789";
type Row = Record<string, unknown>;

export async function createCompanionDb() {
  const db = new PGlite();
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
  for (const file of NOVA_MIGRATIONS)
    await db.exec(readFileSync(resolve(process.cwd(), "supabase/migrations", file), "utf8"));
  return db;
}

export function roleQuery(db: PGlite) {
  return async function as(
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
  };
}

export async function addAccount(
  db: PGlite,
  id: string,
  { role = "student", subscription = true }: { role?: string; subscription?: boolean } = {},
) {
  await db.query("insert into auth.users values($1)", [id]);
  await db.query("insert into public.profiles values($1,$2,'active')", [id, role]);
  if (subscription)
    await db.query(
      "insert into public.subscriptions values($1,'pro','active',now()+interval '30 days')",
      [id],
    );
}

/** Turn generation on for a test (the defaults keep everything off and the caps at $0). */
export async function enableGeneration(
  db: PGlite,
  options: {
    companion?: boolean;
    monthly?: number;
    daily?: number;
    reserve?: number;
    perBatch?: number;
  } = {},
) {
  // Several integration scenarios may share one migrated database. Keep the default test cap
  // above reservations already recorded by earlier scenarios; explicit caps remain exact so
  // budget-exhaustion tests still exercise the production guardrails.
  const { rows } = await db.query<{ monthly: number; daily: number }>(
    `select
       coalesce(sum(reserved_microusd),0)::bigint::int as monthly,
       coalesce(sum(reserved_microusd) filter (
         where created_at::date=(now() at time zone 'Asia/Kuala_Lumpur')::date
       ),0)::bigint::int as daily
     from public.nova_batch_requests
     where budget_month=date_trunc('month',now() at time zone 'Asia/Kuala_Lumpur')::date`,
  );
  const companion = options.companion ?? true;
  const monthly = options.monthly ?? Number(rows[0].monthly) + 100_000_000;
  const daily = options.daily ?? Number(rows[0].daily) + 100_000_000;
  const reserve = options.reserve ?? 5_000_000;
  const perBatch = options.perBatch ?? 2;
  await db.query(
    `update public.nova_generation_settings set enabled=true,batch_enabled=true,companion_enabled=$1,
       monthly_cap_microusd=$2,daily_cap_microusd=$3,reserve_microusd=$4,max_batch_requests=$5,
       origin_model='gpt-image-2.5-flare-2026-09-08'`,
    [companion, monthly, daily, reserve, perBatch],
  );
}

/** The worker's store, implemented with the same SQL functions the Supabase store calls. */
export class PgliteWorkerStore implements WorkerStore {
  /** Simulated private bucket: path -> bytes. Never overwritten. */
  readonly storage = new Map<string, Uint8Array>();
  constructor(private db: PGlite) {}
  private as = (sql: string, params: unknown[] = []) =>
    roleQuery(this.db)("service_role", null, sql, params);
  async batches() {
    const { rows } = await this.as(
      `select * from public.nova_generation_batches where status in ('prepared','submitted','collecting')
       order by created_at limit 4`,
    );
    return rows as unknown as Batch[];
  }
  async prepare() {
    await this.as("select public.nova_prepare_batch()");
  }
  async begin(batch: string) {
    return (await this.as("select public.nova_begin_submission($1) as r", [batch])).rows[0]
      .r as boolean;
  }
  async requests(batch: string): Promise<GenerationRequest[]> {
    const { rows } = await this.as(
      `select r.id, r.custom_id, r.candidate_id, p.candidate, j.id as job_id, j.card_id, j.stage,
         j.prompt_version, j.identity_snapshot, d.dna
       from public.nova_batch_requests r
       join public.nova_generation_candidates p on p.id=r.candidate_id
       join public.nova_generation_jobs j on j.id=p.job_id
       left join public.nova_card_dna d on d.card_id=j.card_id and d.slot=p.candidate
       where r.batch_id=$1`,
      [batch],
    );
    return rows.map((r) => ({
      id: r.id as string,
      custom_id: r.custom_id as string,
      candidate_id: r.candidate_id as string,
      candidate: r.candidate as "a" | "b",
      job_id: r.job_id as string,
      card_id: r.card_id as string,
      stage: r.stage as number,
      identity: r.identity_snapshot as GenerationRequest["identity"],
      promptVersion: r.prompt_version as string,
      dna: (r.dna ?? undefined) as GenerationRequest["dna"],
    }));
  }
  async reference(): Promise<string> {
    throw new Error("Not used by Origin generation");
  }
  async attach(batch: string, provider: string, file: string | null) {
    await this.as("select public.nova_attach_batch($1,$2,$3)", [batch, provider, file]);
  }
  async review(batch: string, code: string) {
    await this.as("select public.nova_review_batch($1,$2)", [batch, code]);
  }
  async claim(batch: string) {
    return (await this.as("select public.nova_claim_collection($1) as r", [batch])).rows[0].r as
      | string
      | null;
  }
  async upload(path: string, bytes: Uint8Array) {
    if (!this.storage.has(path)) this.storage.set(path, bytes);
  }
  async finish(input: Parameters<WorkerStore["finish"]>[0]) {
    await this.as(
      `select public.nova_finish_request(request=>$1::uuid, token=>$2::uuid, digest=>$3, provider_request=>$4,
         provider_usage=>$5::jsonb, cost_microusd=>$6::bigint, failure=>$7, retryable=>$8, validation=>$9,
         checks=>$10::jsonb, phash=>$11)`,
      [
        input.request,
        input.token,
        input.digest ?? null,
        input.provider_request ?? null,
        input.provider_usage ? JSON.stringify(input.provider_usage) : null,
        input.cost_microusd ?? null,
        input.failure ?? null,
        input.retryable ?? false,
        input.validation ?? "png-v1",
        input.checks ? JSON.stringify(input.checks) : null,
        input.phash ?? null,
      ],
    );
  }
  async collected(
    batch: string,
    token: string,
    status: "completed" | "submitted",
    output?: string | null,
    error?: string | null,
  ) {
    await this.as(
      `update public.nova_generation_batches set status=$3, output_file_id=$4, error_file_id=$5,
         lease_until=null, lease_token=null, updated_at=now()
       where id=$1 and status='collecting' and lease_token=$2`,
      [batch, token, status, output ?? null, error ?? null],
    );
  }
  async release() {
    await this.as("select public.nova_release_evolutions()");
  }
}

export type MockOutcome = "art" | "opaque" | "rgb" | "error" | "pending" | "duplicate";

/** A distinct, valid 1024x1536 RGBA PNG with a transparent background, varied by `seed`. */
export async function companionPng(seed: string, { opaque = false, rgb = false } = {}) {
  const h = fnv1a32(seed);
  const hue = h % 360;
  const cx = 300 + (h % 420);
  // Unsigned shifts are intentional: request IDs regularly hash above 2^31. A signed shift
  // would turn those values negative and could make the mock ellipse invalid or too small,
  // causing a nominal "art" outcome to fail the real subject-area validator.
  const cy = 500 + ((h >>> 8) % 520);
  const rx = 180 + ((h >>> 4) % 140);
  const ry = 260 + ((h >>> 12) % 180);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1536">
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="hsl(${hue},70%,55%)"/>
    <circle cx="${cx - rx / 2}" cy="${cy - ry / 2}" r="${60 + (h % 50)}" fill="hsl(${(hue + 120) % 360},80%,35%)"/>
    <rect x="${cx + 40}" y="${cy + 30}" width="${90 + ((h >>> 3) % 120)}" height="${70 + ((h >>> 6) % 90)}" fill="hsl(${(hue + 240) % 360},60%,80%)"/>
  </svg>`;
  const base = sharp({
    create: {
      width: 1024,
      height: 1536,
      channels: rgb ? 3 : 4,
      background:
        rgb || opaque ? { r: 20, g: 20, b: 40, alpha: 1 } : { r: 0, g: 0, b: 0, alpha: 0 },
    },
  }).composite([{ input: Buffer.from(svg) }]);
  return (await (rgb ? base.removeAlpha() : base).png().toBuffer()).toString("base64");
}

/**
 * Scripted Batch provider. `outcome(customId, request)` decides each result; prompts sent are
 * recorded for inspection. Usage is reported so cost estimates are exercised.
 */
export class MockArtProvider implements BatchProvider {
  readonly submitted: {
    batch: Batch;
    lines: { custom_id: string; body: Record<string, unknown> }[];
  }[] = [];
  private outputs = new Map<string, string>();
  private pending = new Set<string>();
  failSubmit = false;
  constructor(
    private outcome: (
      customId: string,
      body: Record<string, unknown>,
    ) => MockOutcome | Promise<MockOutcome> = () => "art",
  ) {}
  async submit(jsonl: string, batch: Batch): Promise<ProviderBatch> {
    if (this.failSubmit) throw new Error("provider_http_503");
    const lines = jsonl
      .trim()
      .split("\n")
      .map((l) => JSON.parse(l) as { custom_id: string; body: Record<string, unknown> });
    this.submitted.push({ batch, lines });
    const id = `batch_mock_${batch.id.replaceAll("-", "")}`;
    const results: string[] = [];
    let duplicate: string | null = null;
    for (const line of lines) {
      const outcome = await this.outcome(line.custom_id, line.body);
      if (outcome === "pending") this.pending.add(id);
      if (outcome === "error") {
        results.push(
          JSON.stringify({
            custom_id: line.custom_id,
            response: {
              status_code: 400,
              request_id: `req_${line.custom_id}`,
              body: { error: { message: "rejected" } },
            },
          }),
        );
        continue;
      }
      const b64: string =
        outcome === "duplicate" && duplicate
          ? duplicate
          : await companionPng(line.custom_id, {
              opaque: outcome === "opaque",
              rgb: outcome === "rgb",
            });
      duplicate ??= b64;
      results.push(
        JSON.stringify({
          custom_id: line.custom_id,
          response: {
            status_code: 200,
            request_id: `req_${line.custom_id}`,
            body: {
              data: [{ b64_json: b64 }],
              usage: {
                input_tokens_details: { text_tokens: 900, image_tokens: 0 },
                output_tokens: 1400,
              },
            },
          },
        }),
      );
    }
    this.outputs.set(`file-out-${id}`, results.join("\n") + "\n");
    return { id, status: "in_progress", input_file_id: `file-in-${id}` };
  }
  async retrieve(id: string): Promise<ProviderBatch> {
    if (this.pending.has(id)) return { id, status: "in_progress" };
    return { id, status: "completed", output_file_id: `file-out-${id}` };
  }
  /** Let a batch that was still "in progress" complete. */
  complete(id?: string) {
    if (id) this.pending.delete(id);
    else this.pending.clear();
  }
  async file(id: string) {
    const text = this.outputs.get(id);
    if (!text) throw new Error("Unknown file");
    return text;
  }
}
