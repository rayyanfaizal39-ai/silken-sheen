import { describe, it, expect } from "vitest";
import {
  checkoutAttemptKey,
  rememberCheckoutPayment,
  finishCheckoutAttempt,
  assertCheckoutAccount,
} from "./checkout-attempt";
function storage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
    removeItem: (key: string) => {
      values.delete(key);
    },
  };
}
describe("private checkout retry state", () => {
  it("rejects a late account-A response after Google switches to B or signs out", () => {
    expect(() => assertCheckoutAccount("A", "B")).toThrow();
    expect(() => assertCheckoutAccount("A", undefined)).toThrow();
    expect(() => assertCheckoutAccount("B", "B")).not.toThrow();
  });
  it("reuses one key through repeated clicks, provider errors, unknown DB outcomes and reloads", () => {
    const tab = storage();
    const first = checkoutAttemptKey(tab, "A", "premium_monthly");
    for (let attempt = 0; attempt < 20; attempt++)
      expect(checkoutAttemptKey(tab, "A", "premium_monthly")).toBe(first);
    // A new storage wrapper (page reload) still reads the same persisted key.
    expect(checkoutAttemptKey({ ...tab }, "A", "premium_monthly")).toBe(first);
  });
  it("does not silently replace an unresolved checkout by switching plans", () => {
    const tab = storage();
    checkoutAttemptKey(tab, "A", "premium_monthly");
    expect(() => checkoutAttemptKey(tab, "A", "pro_monthly")).toThrow();
  });
  it("keeps account A and account B independent in one browser session", () => {
    const tab = storage(),
      a = checkoutAttemptKey(tab, "A", "premium_monthly");
    const b = checkoutAttemptKey(tab, "B", "premium_monthly");
    expect(a).not.toBe(b);
    expect(checkoutAttemptKey(tab, "A", "premium_monthly")).toBe(a);
  });
  it("only releases the matching account and payment after verified terminal status", () => {
    const tab = storage(),
      key = checkoutAttemptKey(tab, "A", "premium_monthly");
    rememberCheckoutPayment(tab, "A", key, "payment-1");
    finishCheckoutAttempt(tab, "B", "payment-1");
    finishCheckoutAttempt(tab, "A", "payment-2");
    expect(checkoutAttemptKey(tab, "A", "premium_monthly")).toBe(key);
    finishCheckoutAttempt(tab, "A", "payment-1");
    expect(checkoutAttemptKey(tab, "A", "premium_monthly")).not.toBe(key);
  });
  it("does not let a stale response replace a newer attempt", () => {
    const tab = storage(),
      first = checkoutAttemptKey(tab, "A", "premium_monthly");
    rememberCheckoutPayment(tab, "A", first, "payment-1");
    finishCheckoutAttempt(tab, "A", "payment-1");
    const next = checkoutAttemptKey(tab, "A", "premium_monthly");
    rememberCheckoutPayment(tab, "A", first, "payment-1");
    finishCheckoutAttempt(tab, "A", "payment-1");
    expect(checkoutAttemptKey(tab, "A", "premium_monthly")).toBe(next);
  });
  it("fails before checkout when retry state cannot be persisted", () => {
    const tab = storage();
    tab.setItem = () => {
      throw new Error("blocked");
    };
    expect(() => checkoutAttemptKey(tab, "A", "premium_monthly")).toThrow();
  });
});
