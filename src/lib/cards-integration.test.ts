import { describe, expect, it } from "vitest";
import { isCardsIntegrationEnabled, resolveCardsSiteUrl } from "./cards-integration";

describe("Cards integration rollout", () => {
  it("stays disabled unless explicitly enabled", () => {
    expect(isCardsIntegrationEnabled(undefined)).toBe(false);
    expect(isCardsIntegrationEnabled("false")).toBe(false);
    expect(isCardsIntegrationEnabled("true")).toBe(true);
  });

  it("uses the production Cards origin by default", () => {
    expect(resolveCardsSiteUrl(undefined)).toBe("https://cards.myacademy.my");
  });

  it("accepts HTTPS preview origins and local HTTP development origins", () => {
    expect(resolveCardsSiteUrl("https://feature-cards.pages.dev/some/path")).toBe(
      "https://feature-cards.pages.dev",
    );
    expect(resolveCardsSiteUrl("http://127.0.0.1:4174/studio")).toBe("http://127.0.0.1:4174");
  });

  it("rejects unsafe or credential-bearing URLs", () => {
    expect(resolveCardsSiteUrl("http://cards.example.com")).toBe("https://cards.myacademy.my");
    expect(resolveCardsSiteUrl("https://student:secret@cards.example.com")).toBe(
      "https://cards.myacademy.my",
    );
  });
});
