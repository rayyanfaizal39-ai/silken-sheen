import { describe, expect, it } from "vitest";
import {
  getSupabaseAuthCookieOptions,
  getSupabaseCookieWrites,
  migrateBrowserAuthCookies,
  SUPABASE_AUTH_COOKIE_NAME as key,
} from "./supabase-auth-cookie";

const project = "https://test.supabase.co";
const host = "www.myacademy.my";

describe("shared Supabase cookie lifecycle", () => {
  it("forces secure production scope even behind an HTTP proxy", () => {
    expect(getSupabaseAuthCookieOptions(host)).toMatchObject({
      domain: ".myacademy.my",
      path: "/",
      sameSite: "lax",
      secure: true,
    });
    expect(getSupabaseAuthCookieOptions("localhost")).toMatchObject({
      path: "/",
      sameSite: "lax",
      secure: false,
    });
    expect(getSupabaseAuthCookieOptions("localhost").domain).toBeUndefined();
  });

  it.each([host, "localhost"])(
    "applies scope to every chunk, refresh, verifier and deletion on %s",
    (hostname) => {
      const cookies = [
        `${key}.0`,
        `${key}.1`,
        `${key}-code-verifier`,
        "sb-test-auth-token.0",
        "sb-test-auth-token.1",
      ].map((name, index) => ({
        name,
        value: index === 2 ? "" : "new",
        options: {
          domain: "wrong.example",
          path: "/wrong",
          secure: false,
          maxAge: index === 2 ? 0 : 3600,
        },
      }));
      const writes = getSupabaseCookieWrites(cookies, [], project, hostname);
      const scoped = writes.slice(-cookies.length);
      for (const { options } of scoped) {
        expect(options).toMatchObject({
          domain: hostname === host ? ".myacademy.my" : undefined,
          path: "/",
          sameSite: "lax",
          secure: hostname === host,
        });
      }
      expect(scoped[2].options.maxAge).toBe(0);
      expect(scoped[0].options.maxAge).toBe(3600);
    },
  );

  it("cleans obsolete host-only chunks without touching unrelated or shared cookies", () => {
    const existing = [
      `${key}.9`,
      "sb-test-auth-token.8",
      "sb-other-auth-token",
      "theme",
      `${key}-unrelated`,
    ].map((name) => ({ name, value: "old" }));
    const writes = getSupabaseCookieWrites(
      [{ name: key, value: "new", options: {} }],
      existing,
      project,
      host,
    );
    expect(writes.filter((w) => w.options.maxAge === 0).map((w) => w.name)).toEqual([
      `${key}.9`,
      "sb-test-auth-token.8",
      key,
    ]);
    expect(writes.slice(0, -1).every((w) => w.options.domain === undefined)).toBe(true);
    expect(writes.at(-1)).toMatchObject({
      name: key,
      value: "new",
      options: { domain: ".myacademy.my" },
    });
  });

  it.each([false, true])(
    "migrates an existing session and prefers surviving parent cookies (duplicates: %s)",
    (duplicates) => {
      const local = new Map([
        [`${key}.0`, "old0"],
        [`${key}.1`, "old1"],
        [`${key}.2`, "obsolete"],
        ["sb-test-auth-token.9", "legacy"],
        ["theme", "dark"],
      ]);
      const parent = new Map<string, string>(
        duplicates
          ? [
              [`${key}.0`, "current0"],
              [`${key}.1`, "current1"],
            ]
          : [],
      );
      const read = () => [...local, ...parent].map(([name, value]) => ({ name, value }));
      const migrate = () =>
        migrateBrowserAuthCookies(
          read,
          ({ name, value, options }) => {
            const jar = options.domain ? parent : local;
            if (options.maxAge === 0) jar.delete(name);
            else jar.set(name, value);
          },
          project,
          host,
        );
      migrate();
      expect([...local]).toEqual([["theme", "dark"]]);
      expect(parent.get(`${key}.0`)).toBe(duplicates ? "current0" : "old0");
      expect(parent.has(`${key}.2`)).toBe(!duplicates);
      expect(parent.has("sb-test-auth-token.9")).toBe(false);
      const before = [...parent];
      migrate();
      expect([...parent]).toEqual(before);
    },
  );
});
