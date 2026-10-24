import { describe, expect, it } from "vitest";
import {
  approvedPreviewOrigins,
  paymentReturnUrl,
} from "../../supabase/functions/_shared/payment-return";

const PRODUCTION = "https://www.myacademy.my";
const PREVIEW = "https://fix-referral-account-confirm.academymy.pages.dev";

describe("payment return URL allowlist", () => {
  it("returns production checkouts to production", () => {
    expect(paymentReturnUrl(PRODUCTION, PRODUCTION, PREVIEW)).toBe(`${PRODUCTION}/payment-return`);
    expect(paymentReturnUrl(undefined, `${PRODUCTION}/`, undefined)).toBe(
      `${PRODUCTION}/payment-return`,
    );
  });
  it("returns an approved preview checkout to that same preview", () => {
    expect(paymentReturnUrl(PREVIEW, PRODUCTION, PREVIEW)).toBe(`${PREVIEW}/payment-return`);
    expect(
      paymentReturnUrl(PREVIEW, PRODUCTION, ` https://other.academymy.pages.dev,${PREVIEW} `),
    ).toBe(`${PREVIEW}/payment-return`);
  });
  it.each([
    ["an unapproved preview", "https://a22d705f.academymy.pages.dev"],
    ["a lookalike domain", "https://evil-academymy.pages.dev"],
    ["another site", "https://evil.example"],
    ["plain http", "http://fix-referral-account-confirm.academymy.pages.dev"],
    ["a path", `${PREVIEW}/steal`],
    ["credentials", "https://user:pass@fix-referral-account-confirm.academymy.pages.dev"],
    ["a non-string", { origin: PREVIEW }],
    ["garbage", "not a url"],
  ])("falls back to production for %s", (_label, requested) => {
    expect(paymentReturnUrl(requested, PRODUCTION, PREVIEW)).toBe(`${PRODUCTION}/payment-return`);
  });
  it("ignores misconfigured preview entries that are not academymy Pages origins", () => {
    expect([
      ...approvedPreviewOrigins(
        "https://evil.example, http://x.academymy.pages.dev, https://x.academymy.pages.dev/path, https://ok.academymy.pages.dev",
      ),
    ]).toEqual(["https://ok.academymy.pages.dev"]);
    expect(paymentReturnUrl("https://evil.example", PRODUCTION, "https://evil.example")).toBe(
      `${PRODUCTION}/payment-return`,
    );
  });
});
