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

const ACE_PUBLIC = "f2c18bdb-9de8-44fd-89b7-61b56bb52964";
const STUDENT = "00000000-0000-4000-8000-0000000000e8";
const ACE_OWNER = "00000000-0000-4000-8000-0000000000e9";
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

    // Seed the Ace pilot with the legacy numeric serial BEFORE the format migration
    // rewrites INSERT to always mint collectible serials.
    await addAccount(db, ACE_OWNER);
    await db.query(
      `insert into public.nova_cards(
         owner_id, public_id, serial, username, answers, variant, rarity
       ) values (
         $1, $2, '000001000000', 'Ace', $3::int[], 'a', 'Rare'
       )`,
      [ACE_OWNER, ACE_PUBLIC, ANSWERS],
    );

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

  it("rejects casual serial updates while allowing the gated Ace pilot reissue", async () => {
    const before = await db.query<{
      serial: string;
      public_id: string;
      owner_id: string;
      username: string;
      rarity: string;
    }>("select serial, public_id, owner_id, username, rarity from public.nova_cards where public_id=$1", [
      ACE_PUBLIC,
    ]);
    expect(before.rows[0].serial).toBe("000001000000");

    await expect(
      db.query("update public.nova_cards set serial='R-AAAA2222' where public_id=$1", [ACE_PUBLIC]),
    ).rejects.toThrow(/Nova identity is permanent/);

    await apply("20261025120100_nova_ace_pilot_serial_reissue.sql");

    const ace = await db.query<{
      serial: string;
      public_id: string;
      owner_id: string;
      username: string;
      rarity: string;
    }>("select serial, public_id, owner_id, username, rarity from public.nova_cards where public_id=$1", [
      ACE_PUBLIC,
    ]);
    expect(ace.rows).toHaveLength(1);
    expect(ace.rows[0].serial).toMatch(/^R-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{8}$/);
    expect(ace.rows[0].public_id).toBe(ACE_PUBLIC);
    expect(ace.rows[0].owner_id).toBe(ACE_OWNER);
    expect(ace.rows[0].username).toBe("Ace");
    expect(ace.rows[0].rarity).toBe("Rare");

    const audit = await db.query<{
      action: string;
      detail: { oldSerial: string; newSerial: string };
    }>(
      `select action, detail from public.nova_generation_audit
       where action='ace_pilot_serial_reissue' order by id desc limit 1`,
    );
    expect(audit.rows[0].action).toBe("ace_pilot_serial_reissue");
    expect(audit.rows[0].detail.oldSerial).toBe("000001000000");
    expect(audit.rows[0].detail.newSerial).toBe(ace.rows[0].serial);

    const serialAfterFirst = ace.rows[0].serial;
    await apply("20261025120100_nova_ace_pilot_serial_reissue.sql");
    const again = await db.query<{ serial: string }>(
      "select serial from public.nova_cards where public_id=$1",
      [ACE_PUBLIC],
    );
    expect(again.rows[0].serial).toBe(serialAfterFirst);
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
