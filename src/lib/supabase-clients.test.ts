import { afterEach, describe, expect, it, vi } from "vitest";
import { createServerClient, createBrowserClient, type CookieMethodsBrowser } from "@supabase/ssr";
import { getSupabaseServerClient, getSupabaseServerClientForRequest } from "./supabase.server";

const state = vi.hoisted(() => ({
  host: "www.myacademy.my",
  protocol: "http",
  cookies: {} as Record<string, string>,
  setCookie: vi.fn(),
  setResponseHeader: vi.fn(),
}));
vi.mock("@tanstack/start-server-core", () => ({
  getRequestHost: () => state.host,
  getRequestProtocol: () => state.protocol,
  getCookies: () => state.cookies,
  setCookie: state.setCookie,
  setResponseHeader: state.setResponseHeader,
}));
vi.mock("@supabase/ssr", async (original) => ({
  ...(await original<typeof import("@supabase/ssr")>()),
  createServerClient: vi.fn(() => ({})),
  createBrowserClient: vi.fn(() => ({})),
}));
const writes = [
  { name: "academy-auth-v1.0", value: "refreshed0", options: { maxAge: 3600 } },
  { name: "academy-auth-v1.1", value: "refreshed1", options: { maxAge: 3600 } },
  { name: "academy-auth-v1.2", value: "", options: { maxAge: 0 } },
];
function setup(host: string) {
  state.host = host;
  state.cookies = { "academy-auth-v1.9": "old", theme: "dark" };
  vi.stubEnv("SUPABASE_URL", "https://test.supabase.co");
  vi.stubEnv("SUPABASE_ANON_KEY", "test-key");
}
function assertWrites(
  cookies: Array<{ name: string; value: string; options: Record<string, unknown> }>,
  host: string,
) {
  expect(cookies.some((c) => c.name === "theme")).toBe(false);
  for (const cookie of cookies.slice(-3)) {
    expect(cookie.options).toMatchObject({
      domain: host === "localhost" ? undefined : ".myacademy.my",
      path: "/",
      sameSite: "lax",
      secure: host !== "localhost",
    });
  }
  expect(cookies.at(-1)?.options.maxAge).toBe(0);
}
afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("Main Supabase client write boundaries", () => {
  it.each(["www.myacademy.my", "localhost"])(
    "server-function refresh / logout writes every chunk on %s",
    (host) => {
      setup(host);
      getSupabaseServerClient();
      const config = vi.mocked(createServerClient).mock.calls.at(-1)![2];
      config.cookies.setAll!(writes, { "Cache-Control": "no-store" });
      assertWrites(
        state.setCookie.mock.calls.map(([name, value, options]) => ({ name, value, options })),
        host,
      );
      expect(state.setResponseHeader).toHaveBeenCalledWith("Cache-Control", "no-store");
    },
  );
  it.each(["www.myacademy.my", "localhost"])(
    "raw-request refresh / logout retains all Set-Cookie headers on %s",
    (host) => {
      setup(host);
      const client = getSupabaseServerClientForRequest(
        new Request(`http://${host}/home`, {
          headers: { cookie: "academy-auth-v1.9=old; theme=dark", "x-forwarded-proto": "http" },
        }),
      )!;
      const config = vi.mocked(createServerClient).mock.calls.at(-1)![2];
      config.cookies.setAll!(writes, { "Cache-Control": "no-store" });
      const cookies = client.responseHeaders.getSetCookie();
      expect(cookies.some((c) => c.startsWith("theme="))).toBe(false);
      for (const cookie of cookies.slice(-3)) {
        expect(cookie).toContain("Path=/");
        expect(cookie).toContain("SameSite=Lax");
        expect(cookie.includes("Domain=.myacademy.my")).toBe(host !== "localhost");
        expect(cookie.includes("Secure")).toBe(host !== "localhost");
      }
      expect(cookies.at(-1)).toContain("Max-Age=0");
    },
  );
  it.each(["www.myacademy.my", "localhost"])(
    "browser sign-in / refresh / logout applies the shared writer on %s",
    async (host) => {
      vi.resetModules();
      vi.stubEnv("VITE_SUPABASE_URL", "https://test.supabase.co");
      vi.stubEnv("VITE_SUPABASE_ANON_KEY", "sb_publishable_test");
      vi.stubGlobal("window", { location: { hostname: host, protocol: "http:" } });
      const written: string[] = [];
      vi.stubGlobal("document", {
        get cookie() {
          return "theme=dark";
        },
        set cookie(value: string) {
          written.push(value);
        },
      });
      await import("./supabase");
      const config = vi.mocked(createBrowserClient).mock.calls.at(-1)![2]!;
      (config.cookies as CookieMethodsBrowser).setAll!(writes, {});
      expect(written.some((c) => c.startsWith("theme="))).toBe(false);
      for (const cookie of written.slice(-3)) {
        expect(cookie).toContain("Path=/");
        expect(cookie).toContain("SameSite=Lax");
        expect(cookie.includes("Domain=.myacademy.my")).toBe(host !== "localhost");
        expect(cookie.includes("Secure")).toBe(host !== "localhost");
      }
      expect(written.at(-1)).toContain("Max-Age=0");
    },
  );
});
