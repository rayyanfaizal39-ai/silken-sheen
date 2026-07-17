import { describe, expect, it } from "vitest";
import { areMockPaymentsEnabled, isToyyibPayConfigured } from "./billing-config";
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
    expect(() => assertVerifiedAmount(19, "MYR", 19, "myr")).not.toThrow();
    expect(isAlreadyProcessed("pending")).toBe(false);
  });

  it("treats duplicate successful callbacks as already processed", () => {
    expect(isAlreadyProcessed("successful")).toBe(true);
  });

  it("rejects an incorrect payment amount", () => {
    expect(() => assertVerifiedAmount(19, "MYR", 18.99, "MYR")).toThrow("payment_amount_mismatch");
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

  it("requires every live checkout setting before enabling ToyyibPay", () => {
    expect(
      isToyyibPayConfigured({
        TOYYIBPAY_SECRET_KEY: "secret",
        TOYYIBPAY_CATEGORY_CODE: "category",
      }),
    ).toBe(false);
    expect(
      isToyyibPayConfigured({
        TOYYIBPAY_SECRET_KEY: "secret",
        TOYYIBPAY_CATEGORY_CODE: "category",
        APPLICATION_URL: "https://example.com",
      }),
    ).toBe(true);
    expect(
      isToyyibPayConfigured({
        TOYYIBPAY_SECRET_KEY: " ",
        TOYYIBPAY_CATEGORY_CODE: "category",
        APPLICATION_URL: "https://example.com",
      }),
    ).toBe(false);
  });
});
