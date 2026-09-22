import { describe, expect, it } from "vitest";
import { getAuthReturnTo } from "./auth-return-to";
import { getSupabaseAuthCookieOptions } from "./supabase-auth-cookie";

describe("SSO return destinations", () => {
  it.each([
    "https://senior.myacademy.my/home",
    "https://senior.myacademy.my/dashboard",
    "/upgrade",
    "/notes?subject=science#chapter",
    "https://www.myacademy.my/home",
    "/admin/login",
    "/auth/reset-password",
  ])("preserves %s", (url) => {
    expect(getAuthReturnTo(url)).toBe(url);
  });
  it.each([
    undefined,
    "//evil.example",
    "https://senior.myacademy.my.evil.example/home",
    "https://senior.myacademy.my@evil.example",
    "https://user@senior.myacademy.my/home",
    "http://senior.myacademy.my/home",
    "https://senior.myacademy.my:444/home",
    "javascript:alert(1)",
    "https://senior.myacademy.my\\@evil.example",
  ])("rejects %s", (url) => {
    expect(getAuthReturnTo(url)).toBe("/home");
  });
  it("allows only configured development origins in development", () => {
    expect(getAuthReturnTo("http://localhost:8080/home", true)).toBe("http://localhost:8080/home");
    expect(getAuthReturnTo("http://localhost:8080/home", false)).toBe("/home");
    expect(getAuthReturnTo("http://localhost:9999/home", true)).toBe("/home");
    expect(getAuthReturnTo("https://myacademy.my/home", false)).toBe("/home");
  });
  it("shares cookies only on production hosts", () => {
    expect(getSupabaseAuthCookieOptions("www.myacademy.my").domain).toBe(".myacademy.my");
    expect(getSupabaseAuthCookieOptions("senior.myacademy.my").domain).toBe(".myacademy.my");
    expect(getSupabaseAuthCookieOptions("localhost").domain).toBeUndefined();
    expect(getSupabaseAuthCookieOptions("preview.pages.dev").domain).toBeUndefined();
  });
});
