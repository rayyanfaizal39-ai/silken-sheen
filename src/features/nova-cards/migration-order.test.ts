import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";

const migration = (name: string) =>
  new URL(`../../../supabase/migrations/${name}`, import.meta.url);

describe("Cards migration order", () => {
  it("keeps every unapplied Cards migration after the latest production migration", () => {
    // Latest migration on origin/main (20261016120000_partner_referral_commissions.sql).
    // Production's applied history is unverified: confirm it before staging (release blocker).
    const latestProductionVersion = 20261016120000;
    const cardsVersions = [20261018160000, 20261018160100, 20261018160200];

    expect(cardsVersions.every((version) => version > latestProductionVersion)).toBe(true);
    expect(cardsVersions).toEqual([...cardsVersions].sort((a, b) => a - b));
    for (const version of cardsVersions) {
      const suffix =
        version === 20261018160000
          ? "nova_companion_cards.sql"
          : version === 20261018160100
            ? "nova_studio_batch.sql"
            : "nova_creature_variety.sql";
      expect(existsSync(migration(`${version}_${suffix}`))).toBe(true);
    }
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
