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

  it("shows only the unrevealed flip card, description and discovery CTA", () => {
    expect(companionSource).toContain("Discover Your <span>Cosmic Companion</span>");
    expect(companionSource).toContain("12 Unique Questions");
    expect(companionSource).toContain("<UnrevealedCosmicCard");
    expect(companionSource).toContain("JOURNEY_CTA[stage].label");
    expect(companionSource).toContain('to="/companion/portal"');
    expect(companionSource).toContain("unrevealed placeholder");
    expect(companionCss).toContain(".ccp-stage");
  });

  it("does not show the old creature, XP evolution path or saved artwork, and never writes", () => {
    for (const legacy of [
      "CompanionArtwork",
      "CompanionStatsCard",
      "EvolutionPath",
      "COMPANION_STAGES",
      "getMyCard()",
      "submitStudioOrigin",
      "chooseStudioOrigin",
      "saveStudioDraft",
      "useProgress",
    ]) expect(companionSource).not.toContain(legacy);
    // The only data the dashboard reads is the existing read-only Studio status.
    expect(companionSource).toContain("getNovaDashboardStatus()");
  });

  it("keeps the Celestial Gateway separate and gives users a return route", () => {
    expect(portalRoute).toContain('<NovaPortal studioUrl={destination} autoEnter />');
    expect(portalRoute).toContain('to="/companion"');
    expect(portalRoute).toContain('cardsStudioUrl');
    // Students enter the real Studio, which routes them by their saved server state; fictional
    // scenes are used only for an explicitly requested preview.
    expect(portalRoute).toContain('cardsIntegrationEnabled ? cardsStudioUrl : "/nova/studio"');
    expect(portalRoute).toContain("`${studio}?preview=rayyan&scene=${PREVIEW_SCENE[preview]}`");
    expect(portalRoute).toContain("parseJourneyPreview(search.preview)");
    expect(read("../routes/companion-portal.css")).toContain("position: fixed");
  });
});
