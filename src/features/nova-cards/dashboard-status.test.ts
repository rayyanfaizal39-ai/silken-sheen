import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { companionEntry } from "@/features/cosmic-companion/entry";
import { journeyStage } from "@/features/cosmic-companion/journey";
import { novaEntitlement } from "./entitlement";
import { novaDashboardStatus, type NovaDashboardStudio } from "./dashboard-status";

const ANSWERS = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];

/** The studio row reported from staging: one queued companion, AI generation off. */
const queuedStudio: NovaDashboardStudio = {
  active: true,
  enabled: false,
  selected: "a",
  origin: { status: "queued" },
  publicId: "9b4c6f6e-55e6-4b52-9d5f-3c1c0f6e2a11",
  draft: { answers: ANSWERS },
};

const twoPortraits = {
  crafting: true,
  artworkPath: null,
  artOptions: [
    { option: 1, path: "card/job/craft/1/ab.png" },
    { option: 2, path: "card/job/craft/2/cd.png" },
  ],
};

describe("single companion entry status", () => {
  it("sends a queued companion with two portraits to the portrait pick, not Upgrade", () => {
    const status = novaDashboardStatus({ studio: queuedStudio, card: twoPortraits });
    expect(status).toMatchObject({
      active: true,
      selected: false,
      ready: false,
      pending: true,
      unfinished: false,
    });
    expect(journeyStage(status)).toBe("waiting");
    expect(companionEntry({ entitled: status.active, stage: journeyStage(status) })).toEqual({
      kind: "journey",
      to: "/companion/portal",
      search: {},
    });
    // A lapsed subscription still must not send an already queued companion to Upgrade.
    expect(companionEntry({ entitled: false, stage: journeyStage(status) }).kind).toBe("journey");
  });

  it("ignores the paid image-generation switch", () => {
    const off = novaDashboardStatus({ studio: queuedStudio, card: twoPortraits });
    const on = novaDashboardStatus({
      studio: { ...queuedStudio, enabled: true },
      card: twoPortraits,
    });
    expect(on).toEqual(off);
  });

  it("opens the card only after a portrait path exists", () => {
    const status = novaDashboardStatus({
      studio: queuedStudio,
      card: { crafting: false, artworkPath: twoPortraits.artOptions[1].path, artOptions: [] },
    });
    expect(journeyStage(status)).toBe("selected");
    expect(companionEntry({ entitled: true, stage: "selected" })).toEqual({
      kind: "card",
      to: "/nova",
    });
  });

  it("still sends a student with no card and no subscription to Upgrade", () => {
    const status = novaDashboardStatus({
      studio: {
        active: false,
        enabled: false,
        selected: null,
        origin: null,
        publicId: null,
        draft: { answers: [] },
      },
      card: null,
    });
    expect(journeyStage(status)).toBe("new");
    expect(companionEntry({ entitled: status.active, stage: "new" }).kind).toBe("upgrade");
  });

  it("decides cosmic_companion from the subscription feature, not profiles.plan", () => {
    const now = Date.parse("2026-10-24T00:00:00Z");
    expect(
      novaEntitlement(
        { plan: "premium", status: "active", current_period_end: "2026-11-22T00:00:00Z" },
        now,
      ),
    ).toEqual({ active: true, status: "active" });
    expect(
      novaEntitlement(
        { plan: "free", status: "active", current_period_end: "2026-11-22T00:00:00Z" },
        now,
      ).active,
    ).toBe(false);

    const files = [
      "entitlement.ts",
      "server.ts",
      "studio.server.ts",
      "dashboard-status.ts",
      "../cosmic-companion/entry.ts",
      "../cosmic-companion/use-companion-entry.ts",
      "../../routes/companion.tsx",
      "../../routes/companion_.portal.tsx",
    ];
    for (const file of files) {
      const source = readFileSync(new URL(file, import.meta.url), "utf8");
      expect(source, file).not.toMatch(/profiles\.plan|from\(["']profiles["']\)/);
    }
    expect(
      readFileSync(new URL("../cosmic-companion/use-companion-entry.ts", import.meta.url), "utf8"),
    ).not.toContain("loadOwnerNova");
  });
});
