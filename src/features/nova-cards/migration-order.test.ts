import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";

const migration = (name: string) =>
  new URL(`../../../supabase/migrations/${name}`, import.meta.url);

describe("Cards migration order", () => {
  it("keeps every unapplied Cards migration after the latest production migration", () => {
    // Latest production migration observed read-only on 2026-10-20. Its exact file is restored in
    // this branch, while the Cards migrations remain strictly later and staging-only.
    const latestProductionVersion = 20261016120000;
    expect(existsSync(migration("20261016120000_partner_referral_commissions.sql"))).toBe(true);
    const cardsMigrations: Record<number, string> = {
      20261018160000: "nova_companion_cards.sql",
      20261018160100: "nova_studio_batch.sql",
      20261018160200: "nova_creature_variety.sql",
      20261019120000: "cosmic_companion_candidates.sql",
      20261019130000: "cosmic_companion_sharing.sql",
      20261020120000: "cosmic_companion_artwork.sql",
      20261020130000: "cosmic_companion_entitlement_parity.sql",
      20261023140000: "nova_staff_craft.sql",
    };
    const cardsVersions = Object.keys(cardsMigrations).map(Number);

    expect(cardsVersions.every((version) => version > latestProductionVersion)).toBe(true);
    expect(cardsVersions).toEqual([...cardsVersions].sort((a, b) => a - b));
    for (const version of cardsVersions)
      expect(existsSync(migration(`${version}_${cardsMigrations[version]}`))).toBe(true);
  });

  it("does not retain the three superseded unapplied filenames", () => {
    for (const name of [
      "20261015090000_nova_companion_cards.sql",
      "20261016233058_nova_studio_batch.sql",
      "20261017102224_nova_creature_variety.sql",
    ]) {
      expect(existsSync(migration(name))).toBe(false);
    }
  });
});
