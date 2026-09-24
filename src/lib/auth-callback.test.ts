import { getGoogleOAuthOptions } from "./auth-return-to";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_AUTH_COOKIE_NAME, SUPABASE_AUTH_COOKIE_OPTIONS } from "./supabase-auth-cookie";
import { handleAuthCallback } from "./auth-callback.server";

vi.mock("@tanstack/start-server-core", () => ({}));

const projectUrl = "https://test.supabase.co";
const origin = "https://www.myacademy.my";
const session = {
  access_token: "test-access-token",
  refresh_token: "test-refresh-token",
  token_type: "bearer",
  expires_in: 3600,
  user: { id: "test-user", aud: "authenticated", user_metadata: { padding: "x".repeat(5000) } },
};

function browser(jar: Map<string, string>) {
  return createBrowserClient(projectUrl, "test-publishable-key", {
    isSingleton: false,
    cookieOptions: {
      name: SUPABASE_AUTH_COOKIE_NAME,
      ...SUPABASE_AUTH_COOKIE_OPTIONS,
      secure: true,
    },
    auth: { autoRefreshToken: false, detectSessionInUrl: false },
    cookies: {
      getAll: () => Array.from(jar, ([name, value]) => ({ name, value })),
      setAll: (cookies) =>
        cookies.forEach(({ name, value, options }) => {
          if (options.maxAge === 0) jar.delete(name);
          else jar.set(name, value);
        }),
    },
  });
}

function request(jar: Map<string, string>, query = "code=returned-code") {
  return new Request(`${origin}/auth/callback?${query}`, {
    headers: {
      cookie: Array.from(jar, ([name, value]) => `${name}=${encodeURIComponent(value)}`).join("; "),
    },
  });
}

describe("cookie-backed server OAuth callback (real Supabase SDK, mocked Auth API)", () => {
  beforeEach(() => {
    vi.stubEnv("SUPABASE_URL", projectUrl);
    vi.stubEnv("SUPABASE_ANON_KEY", "test-publishable-key");
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it.each([
    undefined,
    "/admin",
    "https://senior.myacademy.my/home?tab=notes&form=4",
    "https://evil.example",
    "javascript:alert(1)",
    "//evil.example",
  ])("preserves and validates OAuth redirect_to all the way through exchange: %s", async (next) => {
    const jar = new Map<string, string>();
    const input = getGoogleOAuthOptions(origin, next);
    const { data, error } = await browser(jar).auth.signInWithOAuth({
      ...input,
      options: { ...input.options, skipBrowserRedirect: true },
    });
    expect(error).toBeNull();
    const callback = new URL(new URL(data.url!).searchParams.get("redirect_to")!);
    const expected =
      next === "/admin" || next?.startsWith("https://senior.myacademy.my/") ? next : "/home";
    expect(callback.searchParams.get("next")).toBe(next ? expected : null);
    callback.searchParams.set("code", "returned-code");
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify(session), {
            headers: { "Content-Type": "application/json" },
          }),
      ),
    );
    const response = await handleAuthCallback(request(jar, callback.searchParams.toString()));
    expect(response.status).toBe(303);
    expect(response.headers.get("location")).toBe(new URL(expected, origin).href);
  });

  it("reproduces the old browser callback losing its verifier when an expired session refreshes", async () => {
    const jar = new Map<string, string>();
    await browser(jar).auth.signInWithOAuth({
      provider: "google",
      options: { skipBrowserRedirect: true },
    });
    jar.set(SUPABASE_AUTH_COOKIE_NAME, JSON.stringify({ ...session, expires_at: 1 }));
    const fetchMock = vi.fn(
      async () =>
        new Response(JSON.stringify(session), {
          headers: { "Content-Type": "application/json" },
        }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const callbackBrowser = browser(jar);
    await callbackBrowser.auth.getSession();
    expect(jar.has(`${SUPABASE_AUTH_COOKIE_NAME}-code-verifier`)).toBe(false);
    const { error } = await callbackBrowser.auth.exchangeCodeForSession("returned-code");
    expect(error?.code).toBe("pkce_code_verifier_not_found");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("preserves an existing session when the Auth API rejects the new code", async () => {
    const jar = new Map<string, string>();
    await browser(jar).auth.signInWithOAuth({
      provider: "google",
      options: { skipBrowserRedirect: true },
    });
    jar.set(SUPABASE_AUTH_COOKIE_NAME, JSON.stringify({ ...session, expires_at: 1 }));
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({
              code: "flow_state_expired",
              message: "expired",
            }),
            { status: 400, headers: { "Content-Type": "application/json" } },
          ),
      ),
    );
    const response = await handleAuthCallback(request(jar));
    expect(response.status).toBe(400);
    expect(response.headers.getSetCookie()).toEqual([]);
    expect(await response.text()).not.toContain("flow_state_expired");
  });

  it.each([false, true])(
    "exchanges the browser cookie, including with an existing expired session: %s",
    async (existing) => {
      const jar = new Map<string, string>();
      const client = browser(jar);
      await client.auth.getSession();
      if (existing) {
        // A previous login left an expired session alongside the new OAuth verifier.
        jar.set(SUPABASE_AUTH_COOKIE_NAME, JSON.stringify({ ...session, expires_at: 1 }));
      }
      await client.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${origin}/auth/callback`, skipBrowserRedirect: true },
      });
      expect(jar.has(`${SUPABASE_AUTH_COOKIE_NAME}-code-verifier`)).toBe(true);
      const fetchMock = vi.fn(async (_url: RequestInfo | URL, options?: RequestInit) => {
        const body = JSON.parse(String(options?.body));
        expect(body.auth_code).toBe("returned-code");
        expect(body.code_verifier).toBeTruthy();
        return new Response(JSON.stringify(session), {
          headers: { "Content-Type": "application/json" },
        });
      });
      vi.stubGlobal("fetch", fetchMock);
      const response = await handleAuthCallback(request(jar));
      expect(response.status).toBe(303);
      expect(response.headers.get("location")).toBe(`${origin}/home`);
      expect(fetchMock).toHaveBeenCalledTimes(1); // No refresh before the code exchange.
      expect(String(fetchMock.mock.calls[0][0])).toContain("grant_type=pkce");
      expect(response.headers.get("cache-control")).toContain("no-store");
      const cookies = response.headers.getSetCookie();
      const sessionCookies = cookies.filter((cookie) => !cookie.includes("Max-Age=0"));
      expect(sessionCookies.length).toBeGreaterThan(0);
      for (const cookie of sessionCookies) expect(cookie).toContain("Domain=.myacademy.my");
      expect(cookies.some((cookie) => cookie.startsWith(`${SUPABASE_AUTH_COOKIE_NAME}.0=`))).toBe(
        true,
      );
      expect(cookies.some((cookie) => cookie.startsWith(`${SUPABASE_AUTH_COOKIE_NAME}.1=`))).toBe(
        true,
      );
      expect(
        cookies.some((cookie) => cookie.includes("code-verifier=") && cookie.includes("Max-Age=0")),
      ).toBe(true);
      for (const cookie of cookies) {
        expect(cookie).toContain("Path=/");
        expect(cookie).toContain("SameSite=Lax");
        expect(cookie).toContain("Secure");
        const [pair] = cookie.split(";");
        const equals = pair.indexOf("=");
        const name = pair.slice(0, equals);
        if (cookie.includes("Max-Age=0")) jar.delete(name);
        else jar.set(name, decodeURIComponent(pair.slice(equals + 1)));
      }
      // A fresh browser client (refresh/reopen) reads the server-written chunks.
      const reopened = browser(jar);
      const { data } = await reopened.auth.getSession();
      expect(data.session?.user.id).toBe("test-user");
      expect(fetchMock).toHaveBeenCalledTimes(1);
    },
  );

  it.each(["", "error=access_denied", "code=missing-verifier"])(
    "fails safely without exposing secrets or clearing existing cookies: %s",
    async (query) => {
      const fetchMock = vi.fn();
      vi.stubGlobal("fetch", fetchMock);
      const response = await handleAuthCallback(request(new Map(), query));
      expect(response.status).toBe(400);
      expect(await response.text()).toContain('href="/login"');
      expect(response.headers.getSetCookie()).toEqual([]);
      expect(fetchMock).not.toHaveBeenCalled();
    },
  );

  it.each([
    "/admin/login",
    "/upgrade",
    "https://senior.myacademy.my/home",
    "https://senior.myacademy.my/dashboard",
    "https://evil.example",
    "//evil.example",
    "javascript:alert(1)",
  ])("allows only approved return paths: %s", async (next) => {
    const jar = new Map<string, string>();
    await browser(jar).auth.signInWithOAuth({
      provider: "google",
      options: { skipBrowserRedirect: true },
    });
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify(session), {
            headers: { "Content-Type": "application/json" },
          }),
      ),
    );
    const response = await handleAuthCallback(
      request(jar, `code=returned-code&next=${encodeURIComponent(next)}`),
    );
    expect(response.headers.get("location")).toBe(
      next.startsWith("https://senior.myacademy.my/")
        ? next
        : `${origin}${next.startsWith("/admin") || next === "/upgrade" ? next : "/home"}`,
    );
  });
});
