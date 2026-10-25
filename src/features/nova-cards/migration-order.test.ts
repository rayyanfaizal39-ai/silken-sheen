import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";

const migration = (name: string) =>
  new URL(`../../../supabase/migrations/${name}`, import.meta.url);

describe("Cards migration order", () => {
  it("keeps every Cards migration ordered and present on disk", () => {
    // Latest non-Cards production migration observed before the Nova Stage 1 apply.
    const latestPreNovaProductionVersion = 20261016120000;
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
      20261023150000: "nova_public_card.sql",
      20261023160000: "nova_craft_art_options.sql",
      20261023170000: "nova_companion_journey_gate.sql",
      20261024120000: "nova_craft_queue_both_picks.sql",
      20261024120100: "nova_artwork_bucket_limits.sql",
      20261024130000: "nova_single_companion_submit.sql",
      20261024140000: "nova_craft_portrait_read.sql",
      20261024150000: "nova_admin_own_journey.sql",
      20261025120000: "nova_collectible_serial.sql",
      20261025120100: "nova_ace_pilot_serial_reissue.sql",
    };
    const cardsVersions = Object.keys(cardsMigrations).map(Number);

    expect(cardsVersions.every((version) => version > latestPreNovaProductionVersion)).toBe(true);
    expect(cardsVersions).toEqual([...cardsVersions].sort((a, b) => a - b));
    for (const version of cardsVersions)
      expect(existsSync(migration(`${version}_${cardsMigrations[version]}`))).toBe(true);

    const STAGE1_APPLIED = [
      "20261018160000_nova_companion_cards.sql",
      "20261018160100_nova_studio_batch.sql",
      "20261018160200_nova_creature_variety.sql",
      "20261019120000_cosmic_companion_candidates.sql",
      "20261019130000_cosmic_companion_sharing.sql",
      "20261020120000_cosmic_companion_artwork.sql",
      "20261020130000_cosmic_companion_entitlement_parity.sql",
      "20261023140000_nova_staff_craft.sql",
      "20261023150000_nova_public_card.sql",
      "20261023160000_nova_craft_art_options.sql",
      "20261023170000_nova_companion_journey_gate.sql",
      "20261024120000_nova_craft_queue_both_picks.sql",
      "20261024120100_nova_artwork_bucket_limits.sql",
      "20261024130000_nova_single_companion_submit.sql",
      "20261024140000_nova_craft_portrait_read.sql",
      "20261024150000_nova_admin_own_journey.sql",
    ];
    const PENDING_SERIAL = [
      "20261025120000_nova_collectible_serial.sql",
      "20261025120100_nova_ace_pilot_serial_reissue.sql",
    ];
    expect([...STAGE1_APPLIED, ...PENDING_SERIAL]).toEqual(
      cardsVersions.map((version) => `${version}_${cardsMigrations[version]}`),
    );
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
