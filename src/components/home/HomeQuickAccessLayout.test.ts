import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("../CommandCenterHome.tsx", import.meta.url), "utf8");
const quickAccessSource = readFileSync(new URL("./HomeQuickAccess.tsx", import.meta.url), "utf8");
const homeStyles = readFileSync(new URL("./homeSkeleton.css", import.meta.url), "utf8");

describe("Quick Access section spacing", () => {
  it("groups Quick Access with the learning row without changing the card grid", () => {
    expect(homeSource).toContain('className="home-skeleton__learning-hub"');
    expect(homeSource).toMatch(
      /home-skeleton__learning-hub[\s\S]*home-skeleton__split--learning[\s\S]*HomeQuickAccess/,
    );
    expect(quickAccessSource).toContain('className="home-quick-access"');
  });

  it("uses scoped responsive gaps for desktop, tablet, and mobile", () => {
    expect(homeStyles).toMatch(
      /\.home-skeleton__learning-hub\s*{[^}]*gap:\s*clamp\(2\.5rem, 3\.2vw, 4rem\)/,
    );
    expect(homeStyles).toMatch(
      /@media \(max-width: 1024px\)[\s\S]*?\.home-skeleton__learning-hub\s*{[^}]*gap:\s*clamp\(2rem, 4vw, 3rem\)/,
    );
    expect(homeStyles).toMatch(
      /@media \(max-width: 760px\)[\s\S]*?\.home-skeleton__learning-hub\s*{[^}]*gap:\s*clamp\(1\.5rem, 6vw, 2\.25rem\)/,
    );
  });
});
