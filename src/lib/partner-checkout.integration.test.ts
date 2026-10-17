import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  signPartnerReceipt,
  validPartnerReceipt,
  PARTNER_RECEIPT_COOKIE,
} from "./partner-referral.server";

const A = "00000000-0000-4000-8000-0000000000a1";
const B = "00000000-0000-4000-8000-0000000000b1";
const CODE = "ACA8B69613";
const fixture = vi.hoisted(() => ({
  userId: "",
  cookie: undefined as string | undefined,
  rpc: vi.fn(),
  invoke: vi.fn(),
  adminFrom: vi.fn(),
  pending: vi.fn(),
  cookieWrite: vi.fn(),
}));
vi.mock("@tanstack/start-server-core", () => ({
  getCookie: () => fixture.cookie,
  setCookie: (...args: unknown[]) => fixture.cookieWrite(...args),
  getRequestProtocol: () => "https",
}));
vi.mock("./supabase.server", () => ({
  getSupabaseServerClient: () => ({
    auth: { getUser: async () => ({ data: { user: { id: fixture.userId } } }) },
    rpc: fixture.rpc,
    functions: { invoke: fixture.invoke },
  }),
}));
vi.mock("./billing.server", () => ({
  getSupabaseAdminClient: () => ({ from: fixture.adminFrom }),
  createPendingPayment: fixture.pending,
  processVerifiedPayment: vi.fn(),
}));
vi.mock("./billing-config", () => ({ areMockPaymentsEnabled: () => false, CHECKOUT_PLANS: {} }));
import {
  confirmAccountPartner,
  createAccountCheckout,
  type AccountCheckoutInput,
} from "./partner-checkout.server";
const createCheckout = ({ data }: { data: AccountCheckoutInput }) => createAccountCheckout(data);
const confirmPartnerReferral = ({ data }: { data: { accountId: string; partnerCode: string } }) =>
  confirmAccountPartner(data);

function queryResult(data: unknown, error: unknown = null) {
  const result = { data, error };
  const chain = { eq: () => chain, is: () => chain, maybeSingle: async () => result };
  return { select: () => chain };
}
function checkout(accountId = B, partnerCode: string | undefined = CODE) {
  return createCheckout({
    data: {
      accountId,
      plan: "premium_monthly",
      idempotencyKey: "00000000-0000-4000-8000-000000000099",
      partnerCode,
    },
  });
}
beforeEach(() => {
  vi.clearAllMocks();
  fixture.userId = B;
  fixture.cookie = undefined;
  vi.stubEnv("PARTNER_CONFIRMATION_SECRET", "test-only-signing-secret");
  fixture.rpc.mockResolvedValue({ data: { claimed: true }, error: null });
  fixture.adminFrom.mockImplementation((table: string) =>
    table === "partner_referrals"
      ? queryResult({ partner_user_id: A })
      : queryResult({ partner_code: CODE, status: "active" }),
  );
  fixture.invoke.mockResolvedValue({
    data: { paymentId: "test-payment", checkoutUrl: "https://dev.toyyibpay.com/testbill" },
    error: null,
  });
});
afterEach(() => {
  vi.unstubAllEnvs();
});

describe("server checkout account confirmation", () => {
  it("rejects stale account A UI after the server session switches to B, before claiming or creating any bill", async () => {
    expect(await checkout(A)).toMatchObject({ mode: "referral_required" });
    expect(fixture.rpc).not.toHaveBeenCalled();
    expect(fixture.invoke).not.toHaveBeenCalled();
    expect(fixture.pending).not.toHaveBeenCalled();
  });
  it("requires a server receipt, not a browser-only account choice", async () => {
    expect(await checkout()).toMatchObject({ mode: "referral_required" });
    expect(fixture.rpc).not.toHaveBeenCalled();
    expect(fixture.invoke).not.toHaveBeenCalled();
  });
  it("cannot reuse A's signed confirmation for B", async () => {
    fixture.cookie = signPartnerReceipt(A, CODE, "test-only-signing-secret");
    expect(await checkout()).toMatchObject({ mode: "referral_required" });
    expect(fixture.invoke).not.toHaveBeenCalled();
  });
  it("issues an HttpOnly account-bound receipt only after explicit verified confirmation", async () => {
    expect(await confirmPartnerReferral({ data: { accountId: B, partnerCode: CODE } })).toEqual({
      confirmed: true,
      partnerCode: CODE,
    });
    expect(fixture.cookieWrite).toHaveBeenCalledWith(
      PARTNER_RECEIPT_COOKIE,
      expect.any(String),
      expect.objectContaining({ httpOnly: true, secure: true, sameSite: "lax" }),
    );
    fixture.cookie = fixture.cookieWrite.mock.calls[0][1];
    expect(await checkout()).toMatchObject({ mode: "toyyibpay" });
    expect(fixture.invoke).toHaveBeenCalledWith(
      "create-toyyibpay-bill",
      expect.objectContaining({
        body: expect.objectContaining({ partnerCode: CODE, referralConfirmation: fixture.cookie }),
      }),
    );
  });
  it.each(["self_referral", "invalid_code", "not_student", "existing_customer"])(
    "blocks a rejected claim: %s",
    async (reason) => {
      fixture.cookie = signPartnerReceipt(B, CODE, "test-only-signing-secret");
      fixture.rpc.mockResolvedValue({ data: { claimed: false, reason }, error: null });
      expect(await checkout()).toMatchObject({ mode: "referral_required" });
      expect(fixture.invoke).not.toHaveBeenCalled();
    },
  );
  it.each(["self_referral", "invalid_code", "not_student", "existing_customer"])(
    "marks a definitive %s rejection as ineligible without issuing a receipt",
    async (reason) => {
      fixture.rpc.mockResolvedValue({ data: { claimed: false, reason }, error: null });
      expect(
        await confirmPartnerReferral({ data: { accountId: B, partnerCode: CODE } }),
      ).toMatchObject({ confirmed: false, ineligible: true });
      expect(fixture.cookieWrite).not.toHaveBeenCalled();
    },
  );
  it("never offers to skip the referral after a transient failure", async () => {
    fixture.rpc.mockResolvedValue({ data: null, error: { message: "offline" } });
    const result = await confirmPartnerReferral({ data: { accountId: B, partnerCode: CODE } });
    expect(result).toMatchObject({ confirmed: false });
    expect(result).not.toHaveProperty("ineligible");
  });
  it("does not turn a transient referral RPC failure into an unattributed bill", async () => {
    fixture.cookie = signPartnerReceipt(B, CODE, "test-only-signing-secret");
    fixture.rpc.mockResolvedValue({ data: null, error: { message: "offline" } });
    expect(await checkout()).toMatchObject({ mode: "referral_required" });
    expect(fixture.invoke).not.toHaveBeenCalled();
  });
  it("requires another explicit confirmation for an existing first-touch partner instead of reassigning", async () => {
    fixture.rpc.mockResolvedValue({
      data: { claimed: false, reason: "already_attributed" },
      error: null,
    });
    fixture.adminFrom.mockImplementation((table: string) =>
      table === "partner_referrals"
        ? queryResult({ partner_user_id: A })
        : queryResult({ partner_code: "ACAORIGINAL", status: "active" }),
    );
    expect(
      await confirmPartnerReferral({ data: { accountId: B, partnerCode: CODE } }),
    ).toMatchObject({ confirmed: false, partnerCode: "ACAORIGINAL" });
    expect(fixture.cookieWrite).not.toHaveBeenCalled();
    expect(
      await confirmPartnerReferral({ data: { accountId: B, partnerCode: "ACAORIGINAL" } }),
    ).toEqual({ confirmed: true, partnerCode: "ACAORIGINAL" });
  });
  it("rejects a stale explicit confirmation request before assigning any account", async () => {
    expect(
      await confirmPartnerReferral({ data: { accountId: A, partnerCode: CODE } }),
    ).toMatchObject({ confirmed: false });
    expect(fixture.rpc).not.toHaveBeenCalled();
    expect(fixture.cookieWrite).not.toHaveBeenCalled();
  });
  it("rejects forged, expired, wrong-partner and rotated-key receipts", () => {
    const token = signPartnerReceipt(B, CODE, "secret", 1000);
    expect(validPartnerReceipt(token, B, CODE, "secret", 2000)).toBe(true);
    expect(validPartnerReceipt(`${token}x`, B, CODE, "secret", 2000)).toBe(false);
    expect(validPartnerReceipt(token, B, CODE, "secret", 601000)).toBe(false);
    expect(validPartnerReceipt(token, B, "ACAOTHER", "secret", 2000)).toBe(false);
    expect(validPartnerReceipt(token, B, CODE, "other", 2000)).toBe(false);
  });
  it("leaves normal no-referral checkout available for the verified current account", async () => {
    const result = await createCheckout({
      data: {
        accountId: B,
        plan: "premium_monthly",
        idempotencyKey: "00000000-0000-4000-8000-000000000099",
      },
    });
    expect(result).toMatchObject({ mode: "toyyibpay" });
    expect(fixture.rpc).not.toHaveBeenCalled();
  });
});
