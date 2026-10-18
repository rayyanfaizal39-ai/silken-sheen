import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
const shellSource = read("../components/AppShell.tsx");
const companionSource = read("../routes/companion.tsx");
const statusLinkSource = read("../features/nova-cards/NovaStatusLink.tsx");

describe("main AcadeMY Cards entrance", () => {
  it("keeps the companion navigation position and gates the My Nova label", () => {
    expect(shellSource).toContain('cardsIntegrationEnabled ? "My Nova" : "Cosmic Companion"');
    expect(shellSource).toContain('to: "/companion"');
  });

  it("replaces the XP companion with the portal only when the integration is enabled", () => {
    expect(companionSource).toContain(
      "component: cardsIntegrationEnabled ? NovaPortalPage : CosmicCompanionPage",
    );
    expect(companionSource).toContain("<NovaPortal studioUrl={cardsStudioUrl}");
    // The rollback page keeps its original XP companion experience.
    expect(companionSource).toContain("Meet Your Cosmic Companion");
  });

  it("reads the authenticated student's saved card artwork without generating it", () => {
    expect(companionSource).toContain("getMyCard()");
    expect(companionSource).toContain("card?.artworkUrl");
    expect(companionSource).not.toContain("submitStudioOrigin");
    expect(companionSource).not.toContain("requestStudioEvolution");
  });

  it("sends main's own Nova routes and dashboard link to the single portal entrance", () => {
    for (const route of ["../routes/nova.tsx", "../routes/nova_.studio.tsx"])
      expect(read(route)).toContain(
        'if (cardsIntegrationEnabled) throw redirect({ to: "/companion" })',
      );
    expect(read("../routes/nova_.demo.tsx")).toContain('new URL("/demo", cardsSiteUrl)');
    expect(statusLinkSource).toContain('cardsIntegrationEnabled ? "/companion" : "/nova/studio"');
  });
});
