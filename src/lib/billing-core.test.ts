import { describe, expect, it } from "vitest";
import {
  areMockPaymentsEnabled,
  CHECKOUT_PLANS,
  isToyyibPayConfigured,
} from "./billing-config";
import {
  assertVerifiedAmount,
  canAccessInvoice,
  generateInvoiceNumber,
  isAlreadyProcessed,
  paymentStatusForMockOutcome,
} from "./billing-core";

describe("invoice number generation", () => {
  it("creates the required unique, sortable format", () => {
    expect(generateInvoiceNumber(new Date("2026-07-16T00:00:00Z"), 1)).toBe("ACAD-20260716-000001");
    expect(generateInvoiceNumber(new Date("2026-07-16T00:00:00Z"), 42)).toBe(
      "ACAD-20260716-000042",
    );
  });
});

describe("verified payment processing rules", () => {
  it("accepts a successful payment with the expected amount and currency", () => {
    expect(() => assertVerifiedAmount(29, "MYR", 29, "myr")).not.toThrow();
    expect(isAlreadyProcessed("pending")).toBe(false);
  });

  it("treats duplicate successful callbacks as already processed", () => {
    expect(isAlreadyProcessed("successful")).toBe(true);
  });

  it("rejects an incorrect payment amount", () => {
    expect(() => assertVerifiedAmount(29, "MYR", 28.99, "MYR")).toThrow("payment_amount_mismatch");
  });

  it("records failed payments without creating a paid state", () => {
    expect(paymentStatusForMockOutcome("failed")).toBe("failed");
    expect(isAlreadyProcessed("failed")).toBe(false);
  });
});

describe("invoice authorization", () => {
  it("rejects invoice access for a different user", () => {
    expect(canAccessInvoice("user-a", "user-b")).toBe(false);
    expect(canAccessInvoice("user-a", "user-a")).toBe(true);
  });
});

describe("mock payment production restrictions", () => {
  it("cannot be enabled in production", () => {
    expect(areMockPaymentsEnabled({ NODE_ENV: "production", ENABLE_MOCK_PAYMENTS: "true" })).toBe(
      false,
    );
    expect(areMockPaymentsEnabled({ NODE_ENV: "development", ENABLE_MOCK_PAYMENTS: "true" })).toBe(
      true,
    );
    expect(
      areMockPaymentsEnabled({
        NODE_ENV: "development",
        CF_PAGES_BRANCH: "main",
        ENABLE_MOCK_PAYMENTS: "true",
      }),
    ).toBe(false);
  });

  it("requires the Supabase Edge Function connection for ToyyibPay checkout", () => {
    expect(
      isToyyibPayConfigured({
        SUPABASE_URL: "https://project.supabase.co",
      }),
    ).toBe(false);
    expect(
      isToyyibPayConfigured({
        SUPABASE_URL: "https://project.supabase.co",
        SUPABASE_ANON_KEY: "anon",
      }),
    ).toBe(true);
    expect(
      isToyyibPayConfigured({
        SUPABASE_URL: " ",
        SUPABASE_ANON_KEY: "anon",
      }),
    ).toBe(false);
  });
});

describe("server-side checkout prices", () => {
  it("offers only the approved monthly ToyyibPay sandbox plans", () => {
    expect(CHECKOUT_PLANS).toEqual({
      pro_monthly: {
        plan: "pro",
        interval: "monthly",
        amount: 29,
        label: "AcadeMY Pro Monthly",
      },
      premium_monthly: {
        plan: "premium",
        interval: "monthly",
        amount: 59,
        label: "AcadeMY Premium Monthly",
      },
    });
  });
});
