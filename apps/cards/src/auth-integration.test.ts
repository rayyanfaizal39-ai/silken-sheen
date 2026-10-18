import { describe, expect, it } from "vitest";
import {
  academyHomeHref,
  cardsPaths,
  resolveMainSiteUrl,
  signInHref,
  upgradeHref,
} from "../../../src/features/nova-cards/paths";

describe("AcadeMY Cards authentication handoff", () => {
  it("uses the central login with an exact Cards return URL", () => {
    const login = new URL(signInHref(cardsPaths.studio));
    const returnTo = new URL(login.searchParams.get("next")!);

    expect(login.origin).toBe("https://www.myacademy.my");
    expect(login.pathname).toBe("/login");
    expect(returnTo.origin).toBe("https://cards.myacademy.my");
    expect(returnTo.pathname).toBe("/studio");
    expect(login.searchParams.has("access_token")).toBe(false);
    expect(login.searchParams.has("refresh_token")).toBe(false);
    expect(returnTo.searchParams.has("access_token")).toBe(false);
    expect(returnTo.searchParams.has("refresh_token")).toBe(false);
  });

  it("returns students through the main AcadeMY routing policy", () => {
    expect(academyHomeHref).toBe("https://www.myacademy.my/home");
    expect(upgradeHref).toBe("https://www.myacademy.my/upgrade");
  });

  it("accepts only a safe Main origin for previews", () => {
    expect(resolveMainSiteUrl(undefined)).toBe("https://www.myacademy.my");
    expect(resolveMainSiteUrl("https://preview.myacademy.my/home")).toBe(
      "https://preview.myacademy.my",
    );
    expect(resolveMainSiteUrl("http://127.0.0.1:8080")).toBe("http://127.0.0.1:8080");
    for (const unsafe of [
      "http://preview.myacademy.my",
      "https://user:pass@preview.myacademy.my",
      "javascript:alert(1)",
      "not a url",
    ])
      expect(resolveMainSiteUrl(unsafe)).toBe("https://www.myacademy.my");
  });
});
