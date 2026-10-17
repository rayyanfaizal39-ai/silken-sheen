import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { signPartnerReceipt } from "../../supabase/functions/_shared/partner-confirmation";

const B = "00000000-0000-4000-8000-0000000000b1";
const A = "00000000-0000-4000-8000-0000000000a1";
const CODE = "ACA8B69613";
const fixture = vi.hoisted(() => ({
  createClient: vi.fn(),
  provider: vi.fn(),
  upsert: vi.fn(),
  update: vi.fn(),
  rows: {} as Record<string, unknown>,
  tables: [] as string[],
  env: {} as Record<string, string | undefined>,
}));
vi.mock("https://esm.sh/@supabase/supabase-js@2.108.1", () => ({
  createClient: fixture.createClient,
}));
vi.mock("../../supabase/functions/_shared/toyyibpay-response.ts", () => ({
  requestToyyibPayBill: fixture.provider,
  ToyyibPayUnavailableError: class extends Error {},
}));
let handle: (request: Request) => Promise<Response>;
beforeAll(async () => {
  vi.stubGlobal("Deno", {
    env: {
      get: (name: string) => fixture.env[name],
    },
    serve: (handler: typeof handle) => {
      handle = handler;
    },
  });
  // Loaded by Vitest's runtime, not the web TypeScript program: the entrypoint
  // intentionally has Deno-only lib declarations and HTTPS module imports.
  const edgeEntrypoint = "../../supabase/functions/create-toyyibpay-bill/index";
  await import(edgeEntrypoint);
});
afterAll(() => {
  vi.unstubAllGlobals();
});
beforeEach(() => {
  vi.clearAllMocks();
  fixture.tables = [];
  fixture.env = {
    SUPABASE_URL: "https://example.supabase.co",
    SUPABASE_ANON_KEY: "test-anon",
    SUPABASE_SERVICE_ROLE_KEY: "test-service",
    TOYYIBPAY_SECRET_KEY: "test-provider-secret",
    TOYYIBPAY_CATEGORY_CODE: "test-category",
    APPLICATION_URL: "https://www.myacademy.my",
    PARTNER_CONFIRMATION_SECRET: "test-only-signing-secret",
  };
  fixture.rows = {
    partner_referrals: { partner_user_id: A },
    partner_profiles: { partner_code: CODE, status: "active" },
    partner_sandbox_checkout_links: { customer_user_id: B, partner_user_id: A },
    profiles: { full_name: "Test Learner", email: "b@example.test" },
    payment_transactions: {
      id: "test-payment",
      user_id: B,
      provider: "toyyibpay",
      provider_bill_code: null,
      plan: "premium",
      billing_interval: "monthly",
      amount: 59,
      currency: "MYR",
      payment_status: "pending",
    },
  };
  fixture.upsert.mockResolvedValue({ error: null });
  fixture.provider.mockResolvedValue("sandboxbill");
  fixture.createClient.mockImplementation((_url: string, key: string) =>
    key === "test-anon"
      ? { auth: { getUser: async () => ({ data: { user: { id: B } }, error: null }) } }
      : {
          from: (table: string) => {
            fixture.tables.push(table);
            const chain = {
              eq: () => chain,
              is: () => chain,
              select: () => chain,
              single: async () => ({ data: fixture.rows[table], error: null }),
              maybeSingle: async () => ({ data: fixture.rows[table], error: null }),
            };
            return {
              select: () => chain,
              upsert: fixture.upsert,
              update: (...args: unknown[]) => {
                fixture.update(...args);
                return chain;
              },
            };
          },
        },
  );
});
function normalRequest() {
  // Exactly what the currently deployed web app sends: no referral fields.
  return new Request("https://example.supabase.co/functions/v1/create-toyyibpay-bill", {
    method: "POST",
    headers: { authorization: "Bearer test-session", "content-type": "application/json" },
    body: JSON.stringify({
      plan: "premium_monthly",
      idempotencyKey: "00000000-0000-4000-8000-000000000099",
    }),
  });
}
function request(confirmation = signPartnerReceipt(B, CODE, "test-only-signing-secret")) {
  return new Request("https://example.supabase.co/functions/v1/create-toyyibpay-bill", {
    method: "POST",
    headers: { authorization: "Bearer test-session", "content-type": "application/json" },
    body: JSON.stringify({
      plan: "premium_monthly",
      idempotencyKey: "00000000-0000-4000-8000-000000000099",
      partnerCode: CODE,
      referralConfirmation: confirmation,
    }),
  });
}

describe("Edge normal checkout compatibility", () => {
  it("creates an ordinary sandbox bill without referral fields or the confirmation secret", async () => {
    fixture.env.PARTNER_CONFIRMATION_SECRET = undefined;
    fixture.rows.partner_sandbox_checkout_links = null;
    const result = await handle(normalRequest());
    expect(result.status).toBe(200);
    expect(await result.json()).toEqual({
      paymentId: "test-payment",
      checkoutUrl: "https://dev.toyyibpay.com/sandboxbill",
    });
    expect(fixture.upsert).toHaveBeenCalledTimes(1);
    expect(fixture.provider).toHaveBeenCalledTimes(1);
    expect(fixture.tables.filter((table) => table.startsWith("partner_"))).toEqual([]);
  });
  it("still returns the existing bill for a retried normal checkout", async () => {
    (fixture.rows.payment_transactions as Record<string, unknown>).provider_bill_code =
      "existingbill";
    const result = await handle(normalRequest());
    expect((await result.json()).checkoutUrl).toBe("https://dev.toyyibpay.com/existingbill");
    expect(fixture.provider).not.toHaveBeenCalled();
  });
});

describe("Edge bill creation referral gate", () => {
  it("rejects A's consent for B before even inserting a pending payment", async () => {
    expect(
      (await handle(request(signPartnerReceipt(A, CODE, "test-only-signing-secret")))).status,
    ).toBe(409);
    expect(fixture.upsert).not.toHaveBeenCalled();
    expect(fixture.provider).not.toHaveBeenCalled();
  });
  it("rejects forged confirmation without a provider request", async () => {
    expect((await handle(request("forged"))).status).toBe(409);
    expect(fixture.provider).not.toHaveBeenCalled();
  });
  it("rejects missing student attribution before payment insert", async () => {
    fixture.rows.partner_referrals = null;
    expect((await handle(request())).status).toBe(409);
    expect(fixture.upsert).not.toHaveBeenCalled();
  });
  it.each([
    null,
    { customer_user_id: A, partner_user_id: A },
    { customer_user_id: B, partner_user_id: B },
  ])(
    "does not create a bill when the actual inserted payment link is missing or wrong: %j",
    async (link) => {
      fixture.rows.partner_sandbox_checkout_links = link;
      const result = await handle(request());
      expect(result.status).toBe(409);
      expect(await result.json()).toEqual({ error: "referral_payment_link_unverified" });
      expect(fixture.provider).not.toHaveBeenCalled();
      expect(fixture.update).not.toHaveBeenCalled();
    },
  );
  it("creates a sandbox bill only after verifying account, consent, first-touch referral and actual payment link", async () => {
    const result = await handle(request());
    expect(result.status).toBe(200);
    expect(await result.json()).toEqual({
      paymentId: "test-payment",
      checkoutUrl: "https://dev.toyyibpay.com/sandboxbill",
    });
    expect(fixture.provider).toHaveBeenCalledTimes(1);
    expect(fixture.provider.mock.calls[0][0]).toBe(
      "https://dev.toyyibpay.com/index.php/api/createBill",
    );
  });
  it("does not issue a second bill when retrying a correctly attributed existing bill", async () => {
    (fixture.rows.payment_transactions as Record<string, unknown>).provider_bill_code =
      "existingbill";
    const result = await handle(request());
    expect(result.status).toBe(200);
    expect((await result.json()).checkoutUrl).toBe("https://dev.toyyibpay.com/existingbill");
    expect(fixture.provider).not.toHaveBeenCalled();
  });
});
