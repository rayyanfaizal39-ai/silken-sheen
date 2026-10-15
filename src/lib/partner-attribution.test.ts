import { describe, expect, it } from "vitest";
import {
  capturePartnerReference,
  checkoutPartnerCode,
  clearPartnerReference,
  isFinalClaimResult,
  normalizePartnerCode,
  PARTNER_ATTRIBUTION_KEY,
  PARTNER_ATTRIBUTION_TTL,
} from "./partner-attribution";
import { readToyyibPayBill } from "../../supabase/functions/_shared/toyyibpay-response";

function storage() {
  const data = new Map<string, string>();
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
    removeItem: (key: string) => {
      data.delete(key);
    },
  };
}
describe("checkout partner attribution", () => {
  it("retains a valid landing-page referral across navigation and sign-in", () => {
    const local = storage();
    capturePartnerReference("https://www.myacademy.my/?ref=aca1234567", local, 1000);
    expect(checkoutPartnerCode("https://www.myacademy.my/upgrade", local, 2000)).toBe("ACA1234567");
  });
  it("expires after 60 days and clears malformed storage", () => {
    const local = storage();
    capturePartnerReference("/?ref=ACA1234567", local, 1000);
    expect(checkoutPartnerCode("/upgrade", local, 1000 + PARTNER_ATTRIBUTION_TTL)).toBeUndefined();
    expect(local.getItem(PARTNER_ATTRIBUTION_KEY)).toBeNull();
    local.setItem(PARTNER_ATTRIBUTION_KEY, "bad-json");
    expect(checkoutPartnerCode("/upgrade", local, 2000)).toBeUndefined();
  });
  it("keeps the original referring partner when a later link is visited", () => {
    const local = storage();
    capturePartnerReference("/?ref=ACA1234567", local, 1000);
    expect(capturePartnerReference("/?ref=ACA7654321", local, 2000)).toBe("ACA1234567");
    expect(checkoutPartnerCode("/upgrade?ref=ACA7654321", local, 3000)).toBe("ACA1234567");
    clearPartnerReference(local);
    expect(checkoutPartnerCode("/upgrade?ref=ACA7654321", local, 4000)).toBe("ACA7654321");
  });
  it("rejects malformed codes", () => {
    expect(normalizePartnerCode("<script>")).toBeUndefined();
    expect(normalizePartnerCode("a".repeat(41))).toBeUndefined();
    expect(capturePartnerReference("/?ref=%3Cscript%3E", storage())).toBeUndefined();
  });
  it("clears the stored code only after a final server answer", () => {
    expect(isFinalClaimResult({ claimed: true })).toBe(true);
    expect(isFinalClaimResult({ claimed: false, reason: "already_attributed" })).toBe(true);
    expect(isFinalClaimResult({ claimed: false, reason: "self_referral" })).toBe(true);
    expect(isFinalClaimResult(null)).toBe(false);
    expect(isFinalClaimResult({ claimed: false, reason: "something_new" })).toBe(false);
  });
  it("can use a direct reference when browser storage is unavailable", () => {
    const blocked = {
      getItem() {
        throw new Error("blocked");
      },
      setItem() {
        throw new Error("blocked");
      },
      removeItem() {
        throw new Error("blocked");
      },
    };
    expect(checkoutPartnerCode("/upgrade?ref=ACA1234567", blocked)).toBe("ACA1234567");
    expect(checkoutPartnerCode("/upgrade", blocked)).toBeUndefined();
  });
});
describe("ToyyibPay response consumption", () => {
  it("consumes the body once and returns the sandbox bill code", async () => {
    const response = new Response(JSON.stringify([{ BillCode: "bill123" }]));
    expect(await readToyyibPayBill(response)).toBe("bill123");
    expect(response.bodyUsed).toBe(true);
  });
  it("rejects HTTP 200 errors, invalid JSON, bad codes and HTTP failures", async () => {
    for (const response of [
      Response.json({ status: "error", msg: "private" }),
      new Response("[KEY-DID-NOT-EXIST]"),
      Response.json([{ BillCode: "https://bad.test" }]),
      new Response("private", { status: 500 }),
    ]) {
      await expect(readToyyibPayBill(response)).rejects.toThrow();
    }
  });
});
