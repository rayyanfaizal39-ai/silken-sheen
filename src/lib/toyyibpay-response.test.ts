import { describe, expect, it, vi } from "vitest";
import {
  readToyyibPayBill,
  requestToyyibPayBill,
  ToyyibPayUnavailableError,
} from "../../supabase/functions/_shared/toyyibpay-response";

const ok = (body: unknown, status = 200) =>
  new Response(typeof body === "string" ? body : JSON.stringify(body), { status });
const body = new URLSearchParams({ a: "b" });

describe("readToyyibPayBill", () => {
  it("reads the bill code and consumes the body only once", async () => {
    const response = ok([{ BillCode: "abc123" }]);
    const text = vi.spyOn(response, "text");
    await expect(readToyyibPayBill(response)).resolves.toBe("abc123");
    expect(text).toHaveBeenCalledTimes(1);
    expect(response.bodyUsed).toBe(true);
  });

  it.each([
    ["HTTP 500", ok("oops", 500)],
    ["invalid JSON", ok("<html>")],
    ["error payload", ok({ status: "error" })],
    ["empty bill code", ok([{ BillCode: "" }])],
    ["unsafe bill code", ok([{ BillCode: "a/../b" }])],
  ])("rejects %s as provider unavailable", async (_name, response) => {
    await expect(readToyyibPayBill(response)).rejects.toBeInstanceOf(ToyyibPayUnavailableError);
  });
});

describe("requestToyyibPayBill", () => {
  it("returns the bill code from a mocked successful provider", async () => {
    const fetchImpl = vi.fn(async () => ok([{ BillCode: "xyz789" }])) as unknown as typeof fetch;
    await expect(requestToyyibPayBill("https://x.test", body, { fetchImpl })).resolves.toBe("xyz789");
  });

  it("maps network failures to provider unavailable", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError("fetch failed");
    }) as unknown as typeof fetch;
    await expect(requestToyyibPayBill("https://x.test", body, { fetchImpl })).rejects.toBeInstanceOf(
      ToyyibPayUnavailableError,
    );
  });

  it("times out a hanging provider", async () => {
    const fetchImpl = ((_: string, init: RequestInit) =>
      new Promise((_, reject) => {
        init.signal?.addEventListener("abort", () => reject(init.signal?.reason));
      })) as unknown as typeof fetch;
    await expect(
      requestToyyibPayBill("https://x.test", body, { fetchImpl, timeoutMs: 20 }),
    ).rejects.toBeInstanceOf(ToyyibPayUnavailableError);
  });

  it("does not leak provider detail in the error message", async () => {
    const fetchImpl = vi.fn(async () => ok("secret-key-abc", 500)) as unknown as typeof fetch;
    await expect(requestToyyibPayBill("https://x.test", body, { fetchImpl })).rejects.not.toThrow(
      /secret-key/,
    );
  });
});
