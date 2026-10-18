import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const shellSource = readFileSync(new URL("../components/AppShell.tsx", import.meta.url), "utf8");
const companionSource = readFileSync(new URL("../routes/companion.tsx", import.meta.url), "utf8");

describe("main AcadeMY Cards entrance", () => {
  it("keeps the companion navigation position and gates the My Cards label", () => {
    expect(shellSource).toContain('cardsIntegrationEnabled ? "My Cards" : "Cosmic Companion"');
    expect(shellSource).toContain('to: "/companion"');
  });

  it("opens the cinematic Studio route only when the integration is enabled", () => {
    expect(companionSource).toContain("cardsIntegrationEnabled ? (");
    expect(companionSource).toContain("href={cardsStudioUrl}");
    expect(companionSource).toContain("Enter Cards Studio");
  });

  it("reads the authenticated student's saved card artwork without generating it", () => {
    expect(companionSource).toContain("getMyCard()");
    expect(companionSource).toContain("card?.artworkUrl");
    expect(companionSource).not.toContain("submitStudioOrigin");
    expect(companionSource).not.toContain("requestStudioEvolution");
  });
});
