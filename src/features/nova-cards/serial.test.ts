import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { STAGES } from "./model";
import {
  STAGE_LOYALTY,
  allocateNovaSerial,
  birthYearDigits,
  formatNovaSerial,
  loyaltyForStage,
  presentedIdentity,
  proposedStageFromSuccessfulPayments,
  randomDigits,
  serialsMatch,
} from "./serial";

const migration = () =>
  readFileSync(
    new URL("../../../supabase/migrations/20261023120000_nova_card_serial_format.sql", import.meta.url),
    "utf8",
  );

describe("stage loyalty config", () => {
  it("keeps exactly five stages in one map, with the payment proposal beside the letter", () => {
    expect(STAGE_LOYALTY).toHaveLength(5);
    expect(STAGE_LOYALTY.map((row) => row.name)).toEqual(STAGES.map((stage) => stage.name));
    expect(STAGE_LOYALTY.map((row) => row.letter)).toEqual(["C", "R", "E", "M", "L"]);
    expect(STAGE_LOYALTY.map((row) => row.rarity)).toEqual([
      "Common",
      "Rare",
      "Epic",
      "Mythic",
      "Legendary",
    ]);
    expect(STAGE_LOYALTY.map((row) => row.minSuccessfulPayments)).toEqual([1, 2, 3, 4, 5]);
    expect(() => loyaltyForStage(0)).toThrow(/five stages/);
    expect(() => loyaltyForStage(6)).toThrow(/five stages/);
  });

  it("proposes stage from the count of successful payments and caps at 5", () => {
    expect(proposedStageFromSuccessfulPayments(0)).toBeNull();
    expect(proposedStageFromSuccessfulPayments(1)).toBe(1);
    expect(proposedStageFromSuccessfulPayments(2)).toBe(2);
    expect(proposedStageFromSuccessfulPayments(3)).toBe(3);
    expect(proposedStageFromSuccessfulPayments(4)).toBe(4);
    expect(proposedStageFromSuccessfulPayments(5)).toBe(5);
    expect(proposedStageFromSuccessfulPayments(9)).toBe(5);
    expect(() => proposedStageFromSuccessfulPayments(1.5)).toThrow();
  });

  it("changes only the letter when the shown stage changes", () => {
    const body = "12482915037";
    const first = presentedIdentity(`C${body}`, 1, "Common");
    const mythic = presentedIdentity(first.serial, 4, first.rarity);
    expect(mythic).toEqual({ serial: `M${body}`, rarity: "Mythic" });
    expect(presentedIdentity("000000000001", 5, "Rare")).toEqual({
      serial: "000000000001",
      rarity: "Rare",
    });
    expect(serialsMatch(`C${body}`, `M${body}`)).toBe(true);
    expect(serialsMatch(`C${body}`, "C00000000000")).toBe(false);
  });

  it("seeds the same five rows into nova_stage_loyalty", () => {
    const sql = migration();
    for (const row of STAGE_LOYALTY) {
      expect(sql).toContain(
        `(${row.stage}, '${row.name}', '${row.letter}', '${row.rarity}', ${row.minSuccessfulPayments})`,
      );
    }
    expect(sql).not.toMatch(/create or replace function public\.nova_visible_stage/i);
    const submit = sql.slice(
      sql.indexOf("create or replace function public.nova_submit_companions"),
      sql.indexOf("create or replace function public.nova_card_payload"),
    );
    expect(submit).not.toContain("payment_transactions");
    expect(submit).not.toContain("nova_proposed_stage_for_payments");
    expect(submit).toContain("nova_cards_owner_id_key");
    expect(submit).toContain("'existing'");
  });

  it("does not explain the internal year code on student-facing surfaces", () => {
    const surfaces = [
      new URL("./NovaCard.tsx", import.meta.url),
      new URL("./download.ts", import.meta.url),
      new URL("../../routes/card_.c.$publicId.tsx", import.meta.url),
      new URL("../../../apps/cards/src/routes/card_.c.$publicId.tsx", import.meta.url),
      new URL("../../../docs/nova-companion-cards.md", import.meta.url),
    ];
    const leaked = /birth[- ]year|born\s+\d{4}|date of birth|dateOfBirth|\bDOB\b/i;
    for (const file of surfaces) {
      expect(readFileSync(file, "utf8"), file.pathname).not.toMatch(leaked);
    }
  });

  it("does not let billing or fictional XP evolution read the payment proposal", () => {
    const billing = readFileSync(new URL("../../lib/billing.server.ts", import.meta.url), "utf8");
    const model = readFileSync(new URL("./model.ts", import.meta.url), "utf8");
    const phase1 = readFileSync(
      new URL("../../../supabase/migrations/20261018160000_nova_companion_cards.sql", import.meta.url),
      "utf8",
    );
    for (const source of [billing, model]) {
      expect(source).not.toContain("proposedStageFromSuccessfulPayments");
      expect(source).not.toContain("minSuccessfulPayments");
    }
    expect(phase1).toMatch(/nova_visible_stage[\s\S]*select 1;/);
  });
});

describe("serial allocation", () => {
  const now = new Date("2026-10-23T04:00:00Z");

  it("derives YY from age, then form, then 00", () => {
    expect(birthYearDigits({ age: 14 }, now)).toBe("12");
    expect(birthYearDigits({ age: null, form: "Form 1" }, now)).toBe("13");
    expect(birthYearDigits({ form: "Form 3" }, now)).toBe("11");
    expect(birthYearDigits({}, now)).toBe("00");
    expect(birthYearDigits({ form: "Year 6" }, now)).toBe("00");
  });

  it("retries a serial-body collision and treats an owner collision as existing", async () => {
    const seen: string[] = [];
    const created = await allocateNovaSerial(
      async (serial) => {
        seen.push(serial);
        if (seen.length < 3) {
          const error = new Error(
            'duplicate key value violates unique constraint "nova_cards_serial_body_key"',
          ) as Error & { code: string };
          error.code = "23505";
          throw error;
        }
        return serial;
      },
      { profile: { age: 14 }, stage: 1, now, randomBelow: () => 0, maxAttempts: 8 },
    );
    expect(created.status).toBe("created");
    if (created.status === "created") expect(created.value).toBe(formatNovaSerial(1, "12", "000000000"));
    expect(seen).toHaveLength(3);

    const existing = await allocateNovaSerial(
      async () => {
        const error = new Error(
          'duplicate key value violates unique constraint "nova_cards_owner_id_key" Key (owner_id)=',
        ) as Error & { code: string };
        error.code = "23505";
        throw error;
      },
      { profile: {}, stage: 1, now, randomBelow: () => 1 },
    );
    expect(existing).toEqual({ status: "existing" });

    await expect(
      allocateNovaSerial(
        async () => {
          throw new Error("database unavailable");
        },
        { profile: {}, stage: 1, now, randomBelow: () => 1 },
      ),
    ).rejects.toThrow(/database unavailable/);
  });

  it("draws cryptographic serials that are unique and not a sequence", () => {
    const serials = Array.from({ length: 1000 }, () => formatNovaSerial(1, "00", randomDigits(9)));
    expect(new Set(serials).size).toBe(1000);
    const numbers = serials.map((serial) => Number(serial.slice(3)));
    const steps = numbers.slice(1).map((value, index) => value - numbers[index]);
    expect(steps.every((step) => step === steps[0])).toBe(false);
  });
});
