import { describe, expect, it } from "vitest";
import { academyHomeHref, cardsPaths, signInHref } from "../../../src/features/nova-cards/paths";

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
  });
});
