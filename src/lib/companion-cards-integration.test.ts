import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
const shellSource = read("../components/AppShell.tsx");
const companionSource = read("../routes/companion.tsx");
const portalRoute = read("../routes/companion_.portal.tsx");
const companionCss = read("../routes/companion-cards.css");

describe("Cosmic Companion card-first experience", () => {
  it("retains the Cosmic Companion navigation rather than advertising a Nova page", () => {
    expect(shellSource).toContain('label: "Cosmic Companion"');
    expect(shellSource).toContain('to: "/companion"');
    expect(shellSource).not.toContain('cardsIntegrationEnabled ? "My Nova"');
  });

  it("shows only the decorative unrevealed card, description and discovery CTA", () => {
    expect(companionSource).toContain("Your Cosmic <span>Universe</span>");
    expect(companionSource).toContain("Your <span>Cosmic Card</span> Awaits");
    expect(companionSource).toContain("Discover your companion to find out who is waiting");
    expect(companionSource).toContain("Discover My Companion");
    expect(companionSource).toContain('to="/companion/portal"');
    expect(companionSource).toContain("card placeholder");
    expect(companionCss).toContain(".ccp-card-art__frame");
  });

  it("does not show the old creature, XP evolution path, saved artwork or request an API", () => {
    for (const legacy of [
      "CompanionArtwork",
      "CompanionStatsCard",
      "EvolutionPath",
      "COMPANION_STAGES",
      "getMyCard()",
      "submitStudioOrigin",
      "useProgress",
    ]) expect(companionSource).not.toContain(legacy);
  });

  it("keeps the Celestial Gateway separate and gives users a return route", () => {
    expect(portalRoute).toContain('<NovaPortal studioUrl={destination} />');
    expect(portalRoute).toContain('to="/companion"');
    expect(portalRoute).toContain('cardsStudioUrl');
    expect(portalRoute).toContain('"/nova/studio?preview=rayyan"');
    expect(read("../routes/companion-portal.css")).toContain("position: fixed");
  });
});
