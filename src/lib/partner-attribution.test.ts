import { describe, expect, it } from "vitest";
import {
  capturePartnerReference,
  checkoutPartnerCode,
  clearPartnerReference,
  normalizePartnerCode,
  withoutPartnerReference,
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
  it("is not bound to any account: the same private code reaches whoever finally purchases", () => {
    const local = storage();
    // Account A happened to be signed in when the link was opened.
    capturePartnerReference("/?ref=ACA1234567", local, 1000);
    // Sign-out, Google account switch, registration and onboarding of B.
    for (const path of ["/auth/callback?next=%2Fhome", "/onboarding", "/home", "/upgrade"]) {
      expect(checkoutPartnerCode(path, local, 2000)).toBe("ACA1234567");
    }
  });
  it("preserves first-touch expiry through registration and login", () => {
    const local = storage();
    capturePartnerReference("/?ref=ACA1234567", local, 1000);
    const original = local.getItem(PARTNER_ATTRIBUTION_KEY);
    for (const path of ["/login", "/auth/callback", "/profile", "/onboarding", "/upgrade"]) {
      expect(checkoutPartnerCode(path, local, 2000)).toBe("ACA1234567");
    }
    expect(local.getItem(PARTNER_ATTRIBUTION_KEY)).toBe(original);
  });
  it("removes the code from the visible address while keeping other parameters", () => {
    expect(
      withoutPartnerReference("https://www.myacademy.my/upgrade?ref=ACA1&plan=premium#plans"),
    ).toBe("/upgrade?plan=premium#plans");
    expect(withoutPartnerReference("/?ref=ACA1234567")).toBe("/");
    expect(withoutPartnerReference("/upgrade?plan=premium")).toBeUndefined();
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
