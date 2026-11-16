import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const home = readFileSync(new URL("../CommandCenterHome.tsx", import.meta.url), "utf8");
const summaries = readFileSync(new URL("./HomeProgressSummaries.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("./homeSkeleton.css", import.meta.url), "utf8");

describe("homepage progress summaries", () => {
  it("removes placeholder copy and artwork boxes from the homepage", () => {
    expect(home).toContain("<HomeProgressSummaries />");
    expect(home).not.toMatch(
      /CURRENT RANK ARTWORK|Rank name|NOVA ARTWORK|Mission title|Let&apos;s Go/,
    );
    expect(summaries).not.toContain("HomeImagePlaceholder");
  });

  it("uses the real dashboard journey and owner-scoped companion preview", () => {
    expect(summaries).toContain('to="/dashboard"');
    expect(summaries).toContain('<CosmicPortalWidget variant="summary" />');
    expect(summaries).not.toContain("CompanionImage");
    expect(summaries).not.toContain("getCompanionLevelProgress");
    expect(summaries).not.toContain('id: "nova"');
  });

  it("provides accessible progress semantics and a mobile single-column layout", () => {
    expect(summaries).toContain('role="progressbar"');
    expect(summaries).toContain("aria-valuenow");
    expect(styles).toMatch(
      /@media \(max-width: 880px\)[\s\S]*?\.home-progress-summaries__top\s*{[^}]*grid-template-columns:\s*1fr/,
    );
    expect(styles).toMatch(
      /\.home-progress-summary__art\s*{[^}]*aspect-ratio:\s*1[^}]*place-items:\s*center/,
    );
    expect(styles).toMatch(/\.home-progress-summary__companion-art\s*{[^}]*border-radius:\s*50%/);
  });
});
