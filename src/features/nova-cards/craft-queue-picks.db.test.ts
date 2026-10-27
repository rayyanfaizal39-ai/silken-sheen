// Review only. Applies the both-picks queue migration to a local PGlite database.
// Nothing here is applied to a hosted database.
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

const ADMIN = "00000000-0000-4000-8000-0000000000a1";
const REVEAL = "00000000-0000-4000-8000-0000000000a2";
const EARLY = "00000000-0000-4000-8000-0000000000a3";
const AFTER = "00000000-0000-4000-8000-0000000000a4";
const UNPAID = "00000000-0000-4000-8000-0000000000a5";
const ANSWERS = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];

let db: PGlite;
let as: ReturnType<typeof roleQuery>;

async function submit(student: string, name: string) {
  const draft = (await as("authenticated", student, "select public.get_my_nova_studio() as r"))
    .rows[0].r as { draft: { revision: number } };
  await as("authenticated", student, "select public.save_nova_studio_draft($1,$2,$3)", [
    ANSWERS,
    name,
    draft.draft.revision,
  ]);
  const prepared = prepareCompanionSubmission(ANSWERS, student, TEST_DNA_SECRET);
  await as("service_role", null, "select public.nova_submit_companions($1,$2,$3,$4)", [
    student,
    ANSWERS,
    JSON.stringify(prepared.match),
    JSON.stringify(prepared.dna),
  ]);
  return (
    await db.query<{ id: string; public_id: string }>(
      "select id, public_id from public.nova_cards where owner_id=$1",
      [student],
    )
  ).rows[0];
}

async function finishArtwork(cardId: string) {
  const job = (
    await db.query<{ id: string }>(
      "select id from public.nova_generation_jobs where card_id=$1 and stage=1",
      [cardId],
    )
  ).rows[0].id;
  for (const [slot, hash, phash] of [
    ["a", "a".repeat(64), "0123456789abcdef"],
    ["b", "b".repeat(64), "fedcba9876543210"],
  ] as const)
    await db.query(
      `insert into public.nova_artwork(card_id,job_id,stage,candidate,storage_path,sha256,validation_version,
         review_status,reviewed_by,reviewed_at,phash)
       values($1,$2,1,$3,$4,$5,'png-rgba-v1','approved',$6,now(),$7)`,
      [cardId, job, slot, `${cardId}/${slot}/${hash}.png`, hash, ADMIN, phash],
    );
  await db.query("update public.nova_generation_candidates set status='ready' where job_id=$1", [
    job,
  ]);
  await db.query(
    "update public.nova_generation_jobs set status='ready', reveal_after=now()-interval '1 minute' where id=$1",
    [job],
  );
}

async function queue() {
  return (await as("authenticated", ADMIN, "select public.nova_admin_craft_queue(10) as r")).rows[0]
    .r as {
    position: number;
    publicId: string;
    displayName: string;
    status: string;
    queuedAt: string;
  }[];
}

describe("both companion picks enter the staff queue", () => {
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
    for (const id of [REVEAL, EARLY, AFTER, UNPAID]) await addAccount(db, id);
    await addAccount(db, ADMIN, { role: "admin" });
    const revealed = await submit(REVEAL, "Revealed");
    await finishArtwork(revealed.id);
    await as("authenticated", REVEAL, "select public.select_nova_origin('b')");
    const before = await db.query<{ craft_slot: string | null }>(
      "select craft_slot from public.nova_cards where owner_id=$1",
      [REVEAL],
    );
    expect(before.rows[0].craft_slot).toBeNull();

    await db.exec(`alter table storage.buckets add column file_size_limit bigint;
      alter table storage.buckets add column allowed_mime_types text[];`);
    for (const file of [
      "20261024120000_nova_craft_queue_both_picks.sql",
      "20261024120100_nova_artwork_bucket_limits.sql",
    ]) {
      await db.exec(readFileSync(resolve(process.cwd(), "supabase/migrations", file), "utf8"));
    }
  }, 60_000);

  afterAll(() => db.close());

  it("backfills a reveal pick that never set craft_slot", async () => {
    const row = (
      await db.query<{ craft_slot: string; craft_queued_at: string }>(
        "select craft_slot, craft_queued_at from public.nova_cards where owner_id=$1",
        [REVEAL],
      )
    ).rows[0];
    expect(row.craft_slot).toBe("b");
    expect(row.craft_queued_at).toBeTruthy();
    expect((await queue()).map((item) => item.displayName)).toContain("Revealed");
  });

  it("queues a pick made before the reveal and a pick made after it", async () => {
    const early = await submit(EARLY, "Early");
    await as("authenticated", EARLY, "select public.nova_record_craft_choice('a')");
    const earlyRow = (
      await db.query<{ craft_slot: string; craft_queued_at: string }>(
        "select craft_slot, craft_queued_at from public.nova_cards where id=$1",
        [early.id],
      )
    ).rows[0];
    expect(earlyRow.craft_slot).toBe("a");
    expect(earlyRow.craft_queued_at).toBeTruthy();
    await expect(
      as("authenticated", EARLY, "select public.nova_record_craft_choice('b')"),
    ).rejects.toThrow(/already saved/i);

    const after = await submit(AFTER, "After");
    await finishArtwork(after.id);
    await as("authenticated", AFTER, "select public.select_nova_origin('a')");
    const afterRow = (
      await db.query<{ craft_slot: string; craft_queued_at: string }>(
        "select craft_slot, craft_queued_at from public.nova_cards where id=$1",
        [after.id],
      )
    ).rows[0];
    expect(afterRow.craft_slot).toBe("a");
    const queuedAt = afterRow.craft_queued_at;
    await as("authenticated", AFTER, "select public.select_nova_origin('a')");
    const again = (
      await db.query<{ craft_queued_at: string }>(
        "select craft_queued_at from public.nova_cards where id=$1",
        [after.id],
      )
    ).rows[0];
    expect(again.craft_queued_at).toEqual(queuedAt);
    await expect(
      as("authenticated", AFTER, "select public.select_nova_origin('b')"),
    ).rejects.toThrow(/already selected/i);

    await db.query(
      `update public.nova_cards set craft_queued_at = now() - interval '3 hours' where owner_id=$1`,
      [EARLY],
    );
    await db.query(
      `update public.nova_cards set craft_queued_at = now() - interval '2 hours' where owner_id=$1`,
      [REVEAL],
    );
    await db.query(
      `update public.nova_cards set craft_queued_at = now() - interval '1 hour' where owner_id=$1`,
      [AFTER],
    );

    const unpaid = await submit(UNPAID, "Unpaid");
    await as("authenticated", UNPAID, "select public.nova_record_craft_choice('a')");
    await db.query("update public.nova_cards set journey_entitled=false where id=$1", [unpaid.id]);

    const items = await queue();
    expect(items.map((item) => item.displayName)).toEqual(["Early", "Revealed", "After"]);
    expect(items.map((item) => item.position)).toEqual([1, 2, 3]);
    expect(items.every((item) => item.status === "waiting_for_art")).toBe(true);
    expect(
      items.every((item) => typeof item.queuedAt === "string" && item.queuedAt.length > 0),
    ).toBe(true);
    expect(JSON.stringify(items)).not.toContain(UNPAID);
    expect(JSON.stringify(items).toLowerCase()).not.toContain("email");
  });

  it("returns an admin-only artist brief with no account id", async () => {
    await db.exec("alter table public.profiles add column form text");
    await db.query("update public.profiles set form='Form 1' where id=$1", [AFTER]);
    const card = (
      await db.query<{ id: string; public_id: string }>(
        "select id, public_id from public.nova_cards where owner_id=$1",
        [AFTER],
      )
    ).rows[0];

    await expect(
      as("anon", null, "select public.nova_admin_craft_brief($1)", [card.public_id]),
    ).rejects.toThrow(/permission denied|administrator/i);
    await expect(
      as("authenticated", AFTER, "select public.nova_admin_craft_brief($1)", [card.public_id]),
    ).rejects.toThrow(/administrator/i);

    const brief = (
      await as("authenticated", ADMIN, "select public.nova_admin_craft_brief($1) as r", [
        card.public_id,
      ])
    ).rows[0].r as {
      cardId: string;
      publicId: string;
      nickname: string;
      form: string;
      rarity: string;
      submittedAt: string;
      answers: number[];
      traits: { personality: string };
      companion: {
        name: string;
        visual: { canonical: { proportions: string }; personalisation: { paletteRole: string } };
      };
      dna: {
        genes: { faceShape: string };
        palette: { primary: string };
        identityLock: { proportions: string };
      };
      output: {
        format: string;
        aspect: string;
        minSize: string;
        background: string;
        framing: string;
        text: string;
      };
    };
    expect(brief.cardId).toBe(card.id);
    expect(brief.publicId).toBe(card.public_id);
    expect(brief.nickname).toBe("After");
    expect(brief.form).toBe("Form 1");
    expect(brief.rarity).toBeTruthy();
    expect(brief.submittedAt).toBeTruthy();
    expect(brief.answers).toEqual(ANSWERS);
    expect(typeof brief.traits.personality).toBe("string");
    expect(typeof brief.companion.name).toBe("string");
    expect(typeof brief.companion.visual.canonical.proportions).toBe("string");
    expect(brief.companion.visual.personalisation.paletteRole).toMatch(/main|accent/);
    expect(typeof brief.dna.genes.faceShape).toBe("string");
    expect(brief.dna.palette.primary).toMatch(/^#/);
    expect(typeof brief.dna.identityLock.proportions).toBe("string");
    expect(brief.output).toEqual({
      format: "PNG",
      aspect: "2:3 portrait",
      minSize: "1024x1536",
      background: "plain",
      framing: "centred",
      text: "none",
    });
    const packed = JSON.stringify(brief);
    expect(packed).not.toContain(AFTER);
    expect(packed.toLowerCase()).not.toContain("email");
    expect(packed).not.toContain("owner_id");
    expect(packed).not.toContain("userId");
  });

  it("records the staging artwork bucket limits and leaves generation off", async () => {
    const bucket = (
      await db.query<{ file_size_limit: string | number; allowed_mime_types: string[] }>(
        "select file_size_limit, allowed_mime_types from storage.buckets where id='nova-artwork'",
      )
    ).rows[0];
    expect(Number(bucket.file_size_limit)).toBe(10 * 1024 * 1024);
    expect(bucket.allowed_mime_types).toEqual(["image/png", "image/jpeg", "image/webp"]);
    const settings = (
      await db.query<{ enabled: boolean; batch_enabled: boolean }>(
        "select enabled, batch_enabled from public.nova_generation_settings",
      )
    ).rows[0];
    expect(settings).toEqual({ enabled: false, batch_enabled: false });
  });
});
