import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { signPartnerReceipt, validPartnerReceipt } from "./partner-referral.server";

const A = "00000000-0000-4000-8000-0000000000a1";
const B = "00000000-0000-4000-8000-0000000000b1";
const PARTNER = "00000000-0000-4000-8000-0000000000c1";
const CODE = "ACA8B69613";
const SECRET = "test-only-signing-secret";
const fixture = vi.hoisted(() => ({
  userId: "",
  rpc: vi.fn(),
  invoke: vi.fn(),
  pending: vi.fn(),
  mock: false,
  rows: {} as Record<string, { data: unknown; error: unknown }>,
  host: "www.myacademy.my",
  protocol: "https",
}));
vi.mock("@tanstack/start-server-core", () => ({
  getRequestHost: () => fixture.host,
  getRequestProtocol: () => fixture.protocol,
}));
vi.mock("./supabase.server", () => ({
  getSupabaseServerClient: () => ({
    auth: { getUser: async () => ({ data: { user: { id: fixture.userId } } }) },
    rpc: fixture.rpc,
    functions: { invoke: fixture.invoke },
  }),
}));
vi.mock("./billing.server", () => ({
  getSupabaseAdminClient: () => ({
    from: (table: string) => {
      const chain = {
        eq: () => chain,
        is: () => chain,
        maybeSingle: async () => fixture.rows[table],
      };
      return { select: () => chain };
    },
  }),
  createPendingPayment: fixture.pending,
}));
vi.mock("./billing-config", () => ({ areMockPaymentsEnabled: () => fixture.mock }));
import { CHECKOUT_RETRY_MESSAGE, createAccountCheckout } from "./partner-checkout.server";

function checkout(accountId = B, partnerCode: string | null = CODE) {
  return createAccountCheckout({
    accountId,
    plan: "premium_monthly",
    idempotencyKey: "00000000-0000-4000-8000-000000000099",
    partnerCode: partnerCode ?? undefined,
  });
}
function edgeBody() {
  return fixture.invoke.mock.calls[0][1].body as Record<string, unknown>;
}
function edgeFailure(status: number, error: string) {
  fixture.invoke.mockResolvedValue({
    data: null,
    error: { message: "edge", context: new Response(JSON.stringify({ error }), { status }) },
  });
}
function expectBlockedBeforePayment(result: unknown) {
  expect(result).toEqual({ mode: "retry", message: CHECKOUT_RETRY_MESSAGE });
  expect(fixture.invoke).not.toHaveBeenCalled();
  expect(fixture.pending).not.toHaveBeenCalled();
}
beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => {});
  fixture.userId = B;
  fixture.mock = false;
  fixture.host = "www.myacademy.my";
  fixture.protocol = "https";
  vi.stubEnv("PARTNER_CONFIRMATION_SECRET", SECRET);
  fixture.rpc.mockResolvedValue({ data: { claimed: true }, error: null });
  fixture.rows = {
    partner_referrals: { data: { partner_user_id: PARTNER }, error: null },
    partner_profiles: { data: { partner_code: CODE, status: "active" }, error: null },
  };
  fixture.invoke.mockResolvedValue({
    data: { paymentId: "test-payment", checkoutUrl: "https://dev.toyyibpay.com/testbill" },
    error: null,
  });
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("silent attribution at checkout", () => {
  it("claims the private code for the purchaser and sends a signed receipt to bill creation", async () => {
    expect(await checkout()).toMatchObject({ mode: "toyyibpay", clearReference: true });
    expect(fixture.rpc).toHaveBeenCalledExactlyOnceWith("partner_claim_referral", {
      p_partner_code: CODE,
    });
    expect(edgeBody()).toMatchObject({ plan: "premium_monthly", partnerCode: CODE });
    expect(validPartnerReceipt(edgeBody().referralConfirmation as string, B, CODE, SECRET)).toBe(
      true,
    );
  });
  it("uses the immutable original partner when the purchaser was already attributed", async () => {
    fixture.rpc.mockResolvedValue({ data: { claimed: false, reason: "already_attributed" } });
    fixture.rows.partner_profiles = {
      data: { partner_code: "ACAORIGINAL", status: "active" },
      error: null,
    };
    expect(await checkout()).toMatchObject({ mode: "toyyibpay" });
    expect(edgeBody().partnerCode).toBe("ACAORIGINAL");
  });
  it("verifies a renewal from the database even when the browser no longer has the code", async () => {
    expect(await checkout(B, null)).toMatchObject({ clearReference: false });
    expect(fixture.rpc).not.toHaveBeenCalled();
    expect(edgeBody().partnerCode).toBe(CODE);
  });
  it("creates an ordinary bill for a learner with no referral", async () => {
    fixture.rows.partner_referrals = { data: null, error: null };
    expect(await checkout(B, null)).toMatchObject({ mode: "toyyibpay" });
    expect(edgeBody()).toEqual({
      plan: "premium_monthly",
      idempotencyKey: "00000000-0000-4000-8000-000000000099",
      returnOrigin: "https://www.myacademy.my",
    });
  });
  it.each(["existing_customer", "self_referral", "invalid_code", "not_student"])(
    "lets a definitively ineligible (%s) purchaser check out normally",
    async (reason) => {
      fixture.rpc.mockResolvedValue({ data: { claimed: false, reason }, error: null });
      fixture.rows.partner_referrals = { data: null, error: null };
      expect(await checkout()).toMatchObject({ mode: "toyyibpay", clearReference: false });
      expect(edgeBody()).not.toHaveProperty("partnerCode");
    },
  );
  it("checks out normally when the locked partner is no longer active", async () => {
    fixture.rows.partner_profiles = {
      data: { partner_code: CODE, status: "suspended" },
      error: null,
    };
    expect(await checkout()).toMatchObject({ mode: "toyyibpay" });
    expect(edgeBody()).not.toHaveProperty("partnerCode");
  });
});

describe("account switching", () => {
  it("attributes only the final authenticated purchaser, not the account signed in at link time", async () => {
    // The link was opened while A was signed in; B registers and purchases.
    fixture.userId = B;
    await checkout(B, CODE);
    expect(fixture.rpc).toHaveBeenCalledTimes(1);
    const receipt = edgeBody().referralConfirmation as string;
    expect(validPartnerReceipt(receipt, B, CODE, SECRET)).toBe(true);
    expect(validPartnerReceipt(receipt, A, CODE, SECRET)).toBe(false);
  });
  it("rejects a page rendered for A after the session switched to B, before any claim", async () => {
    fixture.userId = B;
    expectBlockedBeforePayment(await checkout(A));
    expect(fixture.rpc).not.toHaveBeenCalled();
  });
  it("never reuses another account's receipt", () => {
    expect(validPartnerReceipt(signPartnerReceipt(A, CODE, SECRET), B, CODE, SECRET)).toBe(false);
  });
});

describe("temporary verification failures block payment", () => {
  it("blocks when the claim cannot be recorded", async () => {
    fixture.rpc.mockResolvedValue({ data: null, error: { message: "offline" } });
    expectBlockedBeforePayment(await checkout());
  });
  it("blocks on an unknown claim answer", async () => {
    fixture.rpc.mockResolvedValue({ data: { claimed: false, reason: "surprise" }, error: null });
    expectBlockedBeforePayment(await checkout());
  });
  it.each(["partner_referrals", "partner_profiles"])("blocks when %s cannot be read", async (t) => {
    fixture.rows[t] = { data: null, error: { message: "timeout" } };
    expectBlockedBeforePayment(await checkout(B, null));
  });
  it("blocks an attributed checkout when the receipt key is missing", async () => {
    vi.stubEnv("PARTNER_CONFIRMATION_SECRET", "");
    expectBlockedBeforePayment(await checkout());
  });
  it("blocks mock checkouts too, before a payment row exists", async () => {
    fixture.mock = true;
    fixture.rpc.mockResolvedValue({ data: null, error: { message: "offline" } });
    expectBlockedBeforePayment(await checkout());
  });
  it("turns an Edge attribution rejection into the generic retry", async () => {
    edgeFailure(409, "referral_payment_link_unverified");
    expect(await checkout()).toEqual({ mode: "retry", message: CHECKOUT_RETRY_MESSAGE });
  });
  it("asks the learner to retry while another request is creating the same bill", async () => {
    edgeFailure(409, "checkout_in_progress");
    expect(await checkout()).toEqual({ mode: "retry", message: CHECKOUT_RETRY_MESSAGE });
  });
  it("keeps the provider-outage path separate", async () => {
    edgeFailure(503, "provider_unavailable");
    expect(await checkout()).toEqual({ mode: "unavailable" });
  });
});

describe("payment return origin", () => {
  it("sends a production checkout's own origin", async () => {
    await checkout();
    expect(edgeBody().returnOrigin).toBe("https://www.myacademy.my");
  });
  it("sends a preview checkout's own origin, for referred and ordinary purchases", async () => {
    fixture.host = "fix-referral-account-confirm.academymy.pages.dev";
    await checkout();
    expect(edgeBody()).toMatchObject({
      returnOrigin: "https://fix-referral-account-confirm.academymy.pages.dev",
      partnerCode: CODE,
    });
    fixture.invoke.mockClear();
    fixture.rows.partner_referrals = { data: null, error: null };
    await checkout(B, null);
    expect(edgeBody().returnOrigin).toBe(
      "https://fix-referral-account-confirm.academymy.pages.dev",
    );
  });
  it("derives the origin from the server request, never from browser input", async () => {
    await createAccountCheckout({
      accountId: B,
      plan: "premium_monthly",
      idempotencyKey: "00000000-0000-4000-8000-000000000099",
      returnOrigin: "https://evil.example",
    } as Parameters<typeof createAccountCheckout>[0]);
    expect(edgeBody().returnOrigin).toBe("https://www.myacademy.my");
  });
});

describe("privacy", () => {
  it("never reveals partners, codes, referrals or commissions to the learner", async () => {
    const responses: unknown[] = [];
    fixture.rpc.mockResolvedValue({ data: null, error: { message: "offline" } });
    responses.push(await checkout());
    fixture.rpc.mockResolvedValue({ data: { claimed: false, reason: "existing_customer" } });
    fixture.rows.partner_referrals = { data: null, error: null };
    responses.push(await checkout());
    fixture.rows.partner_referrals = { data: { partner_user_id: PARTNER }, error: null };
    edgeFailure(409, "referral_attribution_unverified");
    responses.push(await checkout());
    const visible = JSON.stringify(responses);
    expect(visible).not.toMatch(/ACA8B69613|referr|partner|commission|affiliate/i);
    expect(CHECKOUT_RETRY_MESSAGE).not.toMatch(/referr|partner|commission|affiliate/i);
  });
});
