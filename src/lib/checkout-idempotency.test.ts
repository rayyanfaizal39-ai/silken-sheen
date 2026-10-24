import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

// Simultaneous and retried create-toyyibpay-bill requests that share one
// idempotency key must create at most one ToyyibPay bill for one payment.
const LEARNER = "00000000-0000-4000-8000-0000000000b1";
const KEY = "00000000-0000-4000-8000-000000000099";
const OTHER_KEY = "00000000-0000-4000-8000-000000000098";

type Row = Record<string, unknown>;
const state = vi.hoisted(() => ({
  payments: [] as Row[],
  provider: vi.fn(),
  env: {} as Record<string, string | undefined>,
  failUpdate: false,
}));

vi.mock("https://esm.sh/@supabase/supabase-js@2.108.1", () => ({
  createClient: (_url: string, key: string) =>
    key === "test-anon"
      ? { auth: { getUser: async () => ({ data: { user: { id: LEARNER } }, error: null }) } }
      : { from: table },
}));
vi.mock("../../supabase/functions/_shared/toyyibpay-response.ts", () => ({
  requestToyyibPayBill: state.provider,
  ToyyibPayUnavailableError: class ToyyibPayUnavailableError extends Error {},
}));

/** Minimal PostgREST stand-in. Insert-if-absent is atomic, like Postgres. */
function table(name: string) {
  if (name === "partner_referrals" || name === "partner_sandbox_checkout_links") {
    const chain = {
      select: () => chain,
      eq: () => chain,
      is: () => chain,
      maybeSingle: async () => ({ data: null, error: null }),
    };
    return chain;
  }
  if (name === "profiles") {
    const profile = { full_name: "Test Learner", email: "b@example.test" };
    const chain = {
      select: () => chain,
      eq: () => chain,
      single: async () => ({ data: profile, error: null }),
    };
    return chain;
  }
  if (name !== "payment_transactions") throw new Error(`unexpected table ${name}`);
  const filters: [string, unknown][] = [];
  let patch: Row | undefined;
  const matches = () => state.payments.filter((row) => filters.every(([c, v]) => row[c] === v));
  const chain = {
    select: () => chain,
    eq: (column: string, value: unknown) => (filters.push([column, value]), chain),
    is: (column: string, value: unknown) => (filters.push([column, value]), chain),
    single: async () => {
      if (patch && state.failUpdate)
        return { data: null, error: { message: "database write unavailable" } };
      const rows = matches();
      if (patch && rows.length === 1) Object.assign(rows[0], patch);
      return rows.length === 1
        ? { data: { ...rows[0] }, error: null }
        : { data: null, error: { message: `expected one row, got ${rows.length}` } };
    },
  };
  return {
    select: () => chain,
    update: (values: Row) => ((patch = values), chain),
    // Inserts whether or not .select() is chained, like PostgREST.
    upsert: (row: Row) => {
      const insert = async () => {
        if (state.payments.some((p) => p.idempotency_key === row.idempotency_key)) {
          return { data: [], error: null };
        }
        const id = `payment-${state.payments.length + 1}`;
        state.payments.push({ ...row, id, provider_bill_code: null });
        return { data: [{ id }], error: null };
      };
      return {
        select: insert,
        then: (done: (value: unknown) => unknown, fail?: (error: unknown) => unknown) =>
          insert()
            .then(() => ({ data: null, error: null }))
            .then(done, fail),
      };
    },
  };
}

let handle: (request: Request) => Promise<Response>;
beforeAll(async () => {
  vi.stubGlobal("Deno", {
    env: { get: (name: string) => state.env[name] },
    serve: (handler: typeof handle) => {
      handle = handler;
    },
  });
  const edgeEntrypoint = "../../supabase/functions/create-toyyibpay-bill/index";
  await import(edgeEntrypoint);
});
afterAll(() => vi.unstubAllGlobals());
beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
  state.payments = [];
  state.failUpdate = false;
  state.env = {
    SUPABASE_URL: "https://example.supabase.co",
    SUPABASE_ANON_KEY: "test-anon",
    SUPABASE_SERVICE_ROLE_KEY: "test-service",
    TOYYIBPAY_SECRET_KEY: "test-provider-secret",
    TOYYIBPAY_CATEGORY_CODE: "test-category",
    APPLICATION_URL: "https://www.myacademy.my",
  };
});
afterEach(() => vi.useRealTimers());

function checkout(idempotencyKey = KEY) {
  return handle(
    new Request("https://example.supabase.co/functions/v1/create-toyyibpay-bill", {
      method: "POST",
      headers: { authorization: "Bearer test-session", "content-type": "application/json" },
      body: JSON.stringify({ plan: "premium_monthly", idempotencyKey }),
    }),
  );
}
/** A ToyyibPay createBill call that answers only when the test says so. */
function slowProvider() {
  const calls: { resolve: (code: string) => void; reject: (error: Error) => void }[] = [];
  state.provider.mockImplementation(
    () => new Promise<string>((resolve, reject) => calls.push({ resolve, reject })),
  );
  return calls;
}
async function settle<T>(responses: Promise<T>[]) {
  await vi.advanceTimersByTimeAsync(13_000);
  return Promise.all(responses);
}
const bodies = (responses: Response[]) => Promise.all(responses.map((r) => r.json()));

describe("same-key checkout concurrency", () => {
  it("creates one bill when two requests arrive simultaneously, and both get it", async () => {
    const calls = slowProvider();
    const pending = [checkout(), checkout()];
    await vi.advanceTimersByTimeAsync(0);
    expect(calls).toHaveLength(1);
    calls[0].resolve("onebill");
    const responses = await settle(pending);
    expect(responses.map((r) => r.status)).toEqual([200, 200]);
    expect(await bodies(responses)).toEqual([
      { paymentId: "payment-1", checkoutUrl: "https://dev.toyyibpay.com/onebill" },
      { paymentId: "payment-1", checkoutUrl: "https://dev.toyyibpay.com/onebill" },
    ]);
    expect(state.provider).toHaveBeenCalledTimes(1);
    expect(state.payments).toEqual([expect.objectContaining({ provider_bill_code: "onebill" })]);
  });

  it("creates one bill for a burst of five simultaneous requests", async () => {
    const calls = slowProvider();
    const pending = Array.from({ length: 5 }, () => checkout());
    await vi.advanceTimersByTimeAsync(1_200);
    calls[0].resolve("burstbill");
    const responses = await settle(pending);
    expect(responses.map((r) => r.status)).toEqual([200, 200, 200, 200, 200]);
    expect(new Set((await bodies(responses)).map((b) => b.checkoutUrl))).toEqual(
      new Set(["https://dev.toyyibpay.com/burstbill"]),
    );
    expect(state.provider).toHaveBeenCalledTimes(1);
    expect(state.payments).toHaveLength(1);
  });

  it("keeps different keys independent", async () => {
    state.provider.mockResolvedValueOnce("billa").mockResolvedValueOnce("billb");
    const responses = await settle([checkout(KEY), checkout(OTHER_KEY)]);
    expect(responses.map((r) => r.status)).toEqual([200, 200]);
    expect(state.provider).toHaveBeenCalledTimes(2);
    expect(state.payments.map((p) => p.provider_bill_code)).toEqual(["billa", "billb"]);
  });
});

describe("same-key checkout retries", () => {
  it("returns the stored bill to a later retry without calling ToyyibPay again", async () => {
    state.provider.mockResolvedValue("firstbill");
    const [first] = await settle([checkout()]);
    const [retry] = await settle([checkout()]);
    expect(await retry.json()).toEqual(await first.json());
    expect(state.provider).toHaveBeenCalledTimes(1);
  });

  it("tells a waiting request to retry, without a second bill, if the first is still slow", async () => {
    const calls = slowProvider();
    const creator = checkout();
    const [waiter] = await settle([checkout()]);
    expect(waiter.status).toBe(409);
    expect(await waiter.json()).toEqual({ error: "checkout_in_progress" });
    expect(state.provider).toHaveBeenCalledTimes(1);

    calls[0].resolve("latebill");
    expect((await creator).status).toBe(200);
    const [retry] = await settle([checkout()]);
    expect(await retry.json()).toEqual({
      paymentId: "payment-1",
      checkoutUrl: "https://dev.toyyibpay.com/latebill",
    });
    expect(state.provider).toHaveBeenCalledTimes(1);
  });

  it("never creates a bill from a waiting or retried request after the first one failed", async () => {
    const calls = slowProvider();
    const creator = checkout();
    const waiter = checkout();
    await vi.advanceTimersByTimeAsync(600);
    const { ToyyibPayUnavailableError } =
      await import("../../supabase/functions/_shared/toyyibpay-response.ts");
    calls[0].reject(new ToyyibPayUnavailableError("timeout"));
    const [failed, waited] = await settle([creator, waiter]);
    expect(failed.status).toBe(503);
    expect(waited.status).toBe(409);
    const [sameKeyRetry] = await settle([checkout()]);
    expect(sameKeyRetry.status).toBe(409);
    expect(state.provider).toHaveBeenCalledTimes(1);
    expect(state.payments).toEqual([expect.objectContaining({ provider_bill_code: null })]);
  });

  it("never creates a replacement after provider success followed by a database write failure", async () => {
    state.provider.mockResolvedValue("orphanbill");
    state.failUpdate = true;
    const [failed] = await settle([checkout(KEY)]);
    expect(failed.status).toBe(500);
    const [next] = await settle([checkout(KEY)]);
    expect(next.status).toBe(409);
    expect(state.provider).toHaveBeenCalledTimes(1);
    expect(state.payments).toHaveLength(1);
  });

  it("stops waiting when the payment is settled meanwhile", async () => {
    const calls = slowProvider();
    const creator = checkout();
    const waiter = checkout();
    await vi.advanceTimersByTimeAsync(600);
    state.payments[0].payment_status = "cancelled";
    const [waited] = await settle([waiter]);
    expect(waited.status).toBe(409);
    expect(state.provider).toHaveBeenCalledTimes(1);
    calls[0].resolve("unused");
    await settle([creator]);
  });
});
