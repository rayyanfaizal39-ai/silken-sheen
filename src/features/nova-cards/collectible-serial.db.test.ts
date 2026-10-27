// Review-only. Applies Stage 1 Nova migrations plus the collectible-serial pair to PGlite.
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

/** Production inventory checked 2026-10-25 on aojrbxoqbgyxmfljqpqj (3 legacy numeric). */
const LEGACY_CARDS = [
  {
    publicId: "f2c18bdb-9de8-44fd-89b7-61b56bb52964",
    ownerId: "ef6fca0a-d6aa-4a24-afb5-2be16d4b9ea3",
    serial: "000001000000",
    username: "Ace",
    sharing: true,
  },
  {
    publicId: "edc7c758-27a0-4f3f-8718-40597a9dca95",
    ownerId: "d92249a6-e7d0-4753-8abf-7f5f2d95e846",
    serial: "000001000001",
    username: "scaryguy",
    sharing: false,
  },
  {
    publicId: "1daf226f-9cb8-4f98-b217-aab494b476c9",
    ownerId: "12e9a449-f96a-4872-b417-983a68c707d1",
    serial: "000001000002",
    username: "john",
    sharing: false,
  },
] as const;

const STUDENT = "00000000-0000-4000-8000-0000000000e8";
const ANSWERS = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];
const COLLECTIBLE = /^[CREL]-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{8}$/;

let db: PGlite;
let as: ReturnType<typeof roleQuery>;

async function apply(file: string) {
  await db.exec(readFileSync(resolve(process.cwd(), "supabase/migrations", file), "utf8"));
}

async function submitCompanion(owner: string, username = "Pilot") {
  await addAccount(db, owner);
  const draft = (await as("authenticated", owner, "select public.get_my_nova_studio() as r"))
    .rows[0].r as { draft: { revision: number } };
  await as("authenticated", owner, "select public.save_nova_studio_draft($1,$2,$3)", [
    ANSWERS,
    username,
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

describe("collectible Nova serial format", () => {
  beforeAll(async () => {
    db = await createCompanionDb();
    for (const file of [
      "20261023140000_nova_staff_craft.sql",
      "20261023150000_nova_public_card.sql",
      "20261023160000_nova_craft_art_options.sql",
      "20261023170000_nova_companion_journey_gate.sql",
    ]) {
      await apply(file);
    }
    await db.exec(`alter table storage.buckets add column file_size_limit bigint;
      alter table storage.buckets add column allowed_mime_types text[];`);
    for (const file of [
      "20261024120000_nova_craft_queue_both_picks.sql",
      "20261024120100_nova_artwork_bucket_limits.sql",
      "20261024130000_nova_single_companion_submit.sql",
      "20261024140000_nova_craft_portrait_read.sql",
      "20261024150000_nova_admin_own_journey.sql",
    ]) {
      await apply(file);
    }

    // Seed all verified production legacy cards BEFORE the format migration
    // rewrites INSERT to always mint collectible serials.
    for (const card of LEGACY_CARDS) {
      await addAccount(db, card.ownerId);
      await db.query(
        `insert into public.nova_cards(
           owner_id, public_id, serial, username, answers, variant, rarity, sharing
         ) values (
           $1, $2, $3, $4, $5::int[], 'a', 'Rare', $6
         )`,
        [card.ownerId, card.publicId, card.serial, card.username, ANSWERS, card.sharing],
      );
    }

    await apply("20261025120000_nova_collectible_serial.sql");
    as = roleQuery(db);
  }, 90_000);
  afterAll(() => db.close());

  it("assigns unique R-XXXXXXXX serials and covers all rarity prefixes", async () => {
    const owners = [
      "00000000-0000-4000-8000-0000000000f1",
      "00000000-0000-4000-8000-0000000000f2",
    ];
    for (const owner of owners) await submitCompanion(owner, `Pilot${owner.slice(-2)}`);

    const inserted = await db.query<{ serial: string }>(
      "select serial from public.nova_cards where owner_id = any($1::uuid[])",
      [owners],
    );
    expect(inserted.rows).toHaveLength(2);
    for (const row of inserted.rows) {
      expect(row.serial).toMatch(COLLECTIBLE);
      expect(row.serial.startsWith("R-")).toBe(true);
    }
    expect(new Set(inserted.rows.map((r) => r.serial)).size).toBe(2);

    const rarities = ["Common", "Rare", "Epic", "Legendary"] as const;
    const prefixes = ["C", "R", "E", "L"] as const;
    const generated: string[] = [];
    for (let i = 0; i < rarities.length; i++) {
      const { rows } = await db.query<{ s: string }>(
        "select private.nova_generate_collectible_serial($1) as s",
        [rarities[i]],
      );
      expect(rows[0].s).toMatch(COLLECTIBLE);
      expect(rows[0].s.startsWith(`${prefixes[i]}-`)).toBe(true);
      generated.push(rows[0].s);
    }
    expect(new Set(generated).size).toBe(4);
  });

  it("keeps dual-format CHECK so all three legacy cards remain readable after format migration", async () => {
    const legacy = await db.query<{ serial: string; public_id: string; sharing: boolean }>(
      `select serial, public_id, sharing from public.nova_cards
       where serial ~ '^[0-9]{12}$' order by serial`,
    );
    expect(legacy.rows).toHaveLength(3);
    expect(legacy.rows.map((r) => r.serial)).toEqual([
      "000001000000",
      "000001000001",
      "000001000002",
    ]);

    const ace = LEGACY_CARDS[0];
    const opened = (
      await as("anon", null, "select public.get_public_nova_card($1) as r", [ace.publicId])
    ).rows[0].r as { serial: string; publicId: string } | null;
    expect(opened?.serial).toBe(ace.serial);
    expect(opened?.publicId).toBe(ace.publicId);

    const ownerView = (
      await as("authenticated", ace.ownerId, "select public.get_my_nova_card() as r")
    ).rows[0].r as { serial: string; publicId: string };
    expect(ownerView.serial).toBe(ace.serial);
    expect(ownerView.publicId).toBe(ace.publicId);
  });

  it("does not mint a new serial on refresh-style read or sharing toggle", async () => {
    await submitCompanion(STUDENT, "Stable");
    const before = await db.query<{ serial: string; public_id: string }>(
      "select serial, public_id from public.nova_cards where owner_id=$1",
      [STUDENT],
    );
    expect(before.rows).toHaveLength(1);
    const { serial, public_id: publicId } = before.rows[0];
    expect(serial).toMatch(COLLECTIBLE);

    await as("authenticated", STUDENT, "select public.set_nova_sharing(true)");
    await as("authenticated", STUDENT, "select public.set_nova_sharing(false)");
    await as("authenticated", STUDENT, "select public.set_nova_sharing(true)");
    const opened = (
      await as("anon", null, "select public.get_public_nova_card($1) as r", [publicId])
    ).rows[0].r as { serial: string; publicId: string };
    expect(opened.serial).toBe(serial);
    expect(opened.publicId).toBe(publicId);

    const after = await db.query<{ serial: string; public_id: string; n: number }>(
      `select serial, public_id, count(*) over ()::int as n
       from public.nova_cards where owner_id=$1`,
      [STUDENT],
    );
    expect(after.rows[0]).toMatchObject({ serial, public_id: publicId, n: 1 });
  });

  it("rejects casual serial updates; batch-reissues all allowlisted legacy cards; removes the gate", async () => {
    await expect(
      db.query("update public.nova_cards set serial='R-AAAA2222' where public_id=$1", [
        LEGACY_CARDS[0].publicId,
      ]),
    ).rejects.toThrow(/Nova identity is permanent/);

    // Gate token alone must not unlock serial changes before the reissue migration.
    await expect(
      db.exec(`select set_config('app.nova_serial_reissue', 'legacy-numeric-batch-v1', true);
        update public.nova_cards set serial='R-AAAA2222'
        where public_id='${LEGACY_CARDS[0].publicId}';`),
    ).rejects.toThrow(/Nova identity is permanent/);

    const before = await db.query<{
      public_id: string;
      owner_id: string;
      serial: string;
      username: string;
      rarity: string;
      sharing: boolean;
      answers: number[];
      variant: string;
    }>(
      `select public_id, owner_id, serial, username, rarity, sharing, answers, variant
       from public.nova_cards
       where public_id = any($1::uuid[])
       order by serial`,
      [LEGACY_CARDS.map((c) => c.publicId)],
    );
    expect(before.rows).toHaveLength(3);

    await apply("20261025120100_nova_legacy_serial_reissue.sql");

    const after = await db.query<{
      public_id: string;
      owner_id: string;
      serial: string;
      username: string;
      rarity: string;
      sharing: boolean;
      answers: number[];
      variant: string;
    }>(
      `select public_id, owner_id, serial, username, rarity, sharing, answers, variant
       from public.nova_cards
       where public_id = any($1::uuid[])
       order by username`,
      [LEGACY_CARDS.map((c) => c.publicId)],
    );
    expect(after.rows).toHaveLength(3);
    for (const row of after.rows) {
      const prior = before.rows.find((b) => b.public_id === row.public_id)!;
      expect(row.serial).toMatch(/^R-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{8}$/);
      expect(row.serial).not.toBe(prior.serial);
      expect(row.owner_id).toBe(prior.owner_id);
      expect(row.public_id).toBe(prior.public_id);
      expect(row.username).toBe(prior.username);
      expect(row.rarity).toBe(prior.rarity);
      expect(row.sharing).toBe(prior.sharing);
      expect(row.answers).toEqual(prior.answers);
      expect(row.variant).toBe(prior.variant);
    }
    expect(new Set(after.rows.map((r) => r.serial)).size).toBe(3);

    const legacyLeft = await db.query<{ n: number }>(
      "select count(*)::int as n from public.nova_cards where serial ~ '^[0-9]{12}$'",
    );
    expect(legacyLeft.rows[0].n).toBe(0);

    const audit = await db.query<{ n: number }>(
      `select count(*)::int as n from public.nova_generation_audit
       where action='legacy_numeric_serial_reissue'`,
    );
    expect(audit.rows[0].n).toBe(3);

    // Gate must not survive: even with the old token set, serial stays immutable.
    await expect(
      db.exec(`select set_config('app.nova_serial_reissue', 'legacy-numeric-batch-v1', true);
        update public.nova_cards set serial='R-BBBB3333'
        where public_id='${LEGACY_CARDS[0].publicId}';`),
    ).rejects.toThrow(/Nova identity is permanent/);

    const serials = after.rows.map((r) => r.serial);
    await apply("20261025120100_nova_legacy_serial_reissue.sql");
    const again = await db.query<{ serial: string }>(
      `select serial from public.nova_cards
       where public_id = any($1::uuid[]) order by serial`,
      [LEGACY_CARDS.map((c) => c.publicId)],
    );
    expect(again.rows.map((r) => r.serial).sort()).toEqual([...serials].sort());
  });

  it("retries until unique serials are allocated under repeated generation", async () => {
    const seen = new Set<string>();
    for (let i = 0; i < 40; i++) {
      const { rows } = await db.query<{ s: string }>(
        "select private.nova_generate_collectible_serial('Rare') as s",
      );
      expect(rows[0].s).toMatch(COLLECTIBLE);
      seen.add(rows[0].s);
    }
    expect(seen.size).toBe(40);
  });
});
