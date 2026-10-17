import { describe, expect, it } from "vitest";
import {
  capturePartnerReference,
  checkoutPartnerCode,
  clearPartnerReference,
  clearPartnerChoice,
  confirmedPartnerCode,
  declinePartnerReferral,
  declinedPartnerReferral,
  partnerReturnTo,
  rememberPartnerChoice,
  storedPartnerIntent,
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
  it("keeps intent after account A confirms and requires fresh consent after switching to B", () => {
    const local = storage();
    const tab = storage();
    capturePartnerReference("/?ref=ACA1234567", local);
    rememberPartnerChoice(storedPartnerIntent(local)!, tab, "account-A", "ACA1234567");
    expect(confirmedPartnerCode(local, tab, "account-A")).toBe("ACA1234567");
    expect(confirmedPartnerCode(local, tab, "account-B")).toBeUndefined();
    clearPartnerChoice(tab);
    expect(checkoutPartnerCode("/auth/callback?next=/profile", local)).toBe("ACA1234567");
    rememberPartnerChoice(storedPartnerIntent(local)!, tab, "account-B", "ACA1234567");
    expect(confirmedPartnerCode(local, tab, "account-B")).toBe("ACA1234567");
    expect(confirmedPartnerCode(local, tab, "account-A")).toBeUndefined();
    expect(checkoutPartnerCode("/upgrade", local)).toBe("ACA1234567");
  });
  it("binds an explicit decline to one account and never treats it as consent", () => {
    const local = storage();
    const tab = storage();
    capturePartnerReference("/?ref=ACA1234567", local);
    declinePartnerReferral(storedPartnerIntent(local)!, tab, "account-B");
    expect(declinedPartnerReferral(local, tab, "account-B")).toBe(true);
    expect(declinedPartnerReferral(local, tab, "account-A")).toBe(false);
    expect(confirmedPartnerCode(local, tab, "account-B")).toBeUndefined();
    expect(checkoutPartnerCode("/upgrade", local)).toBe("ACA1234567");
    rememberPartnerChoice(storedPartnerIntent(local)!, tab, "account-B", "ACA1234567");
    expect(declinedPartnerReferral(local, tab, "account-B")).toBe(false);
  });
  it("preserves the reference through OAuth destinations and registration without extending first-touch expiry", () => {
    const local = storage();
    capturePartnerReference("/?ref=ACA1234567", local, 1000);
    const original = local.getItem(PARTNER_ATTRIBUTION_KEY);
    expect(partnerReturnTo("/upgrade?plan=premium#plans", "ACA1234567")).toBe(
      "/upgrade?plan=premium&ref=ACA1234567#plans",
    );
    for (const path of ["/auth/callback", "/profile", "/onboarding", "/upgrade"]) {
      expect(checkoutPartnerCode(path, local, 2000)).toBe("ACA1234567");
    }
    expect(local.getItem(PARTNER_ATTRIBUTION_KEY)).toBe(original);
  });
  it("rejects a choice from another intent or after the original intent expires", () => {
    const local = storage();
    const tab = storage();
    capturePartnerReference("/?ref=ACA1234567", local, 1000);
    rememberPartnerChoice(storedPartnerIntent(local, 1000)!, tab, "A", "ACA1234567");
    expect(confirmedPartnerCode(local, tab, "A", 1000 + PARTNER_ATTRIBUTION_TTL)).toBeUndefined();
    capturePartnerReference("/?ref=ACA7654321", local, 1000 + PARTNER_ATTRIBUTION_TTL);
    expect(confirmedPartnerCode(local, tab, "A", 1000 + PARTNER_ATTRIBUTION_TTL)).toBeUndefined();
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
