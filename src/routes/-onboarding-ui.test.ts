import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const routeSource = readFileSync(new URL("./onboarding.tsx", import.meta.url), "utf8");
const routeStyles = readFileSync(new URL("./onboarding.css", import.meta.url), "utf8");
const appShellSource = readFileSync(new URL("../components/AppShell.tsx", import.meta.url), "utf8");
const schoolComboboxSource = readFileSync(
  new URL("../components/onboarding/SchoolCombobox.tsx", import.meta.url),
  "utf8",
);

describe("Explorer onboarding UI contract", () => {
  it("contains all four focused Explorer steps and reuses verified school search", () => {
    expect(routeSource).toContain("Welcome, Explorer");
    expect(routeSource).toContain("Your Mission Level");
    expect(routeSource).toContain("Find Your School");
    expect(routeSource).toContain("Explorer Profile Ready");
    expect(routeSource).toContain("<SchoolCombobox");
  });

  it("uses the existing completion mutation once and redirects home", () => {
    expect(routeSource).toContain("if (savingRef.current || !school || !formLevel) return");
    expect(routeSource).toContain("await completeExplorerProfile({");
    expect(routeSource).toContain('await navigate({ to: "/home", replace: true })');
  });

  it("provides phone, desktop, keyboard-height, and reduced-motion styling", () => {
    expect(routeStyles).toContain("@media (max-width: 520px)");
    expect(routeStyles).toContain("@media (min-width: 900px)");
    expect(routeStyles).toContain("100svh");
    expect(routeStyles).toContain("@media (prefers-reduced-motion: reduce)");
    expect(schoolComboboxSource).toContain("38dvh");
    expect(routeSource).toContain("aria-label={`Step ${step} of 4`}");
  });

  it("adds Profile to desktop and the existing mobile More sheet", () => {
    expect(appShellSource).toContain('aria-label="Open Explorer Profile"');
    expect(appShellSource).toContain('id="mobile-more-sheet"');
    expect(appShellSource).toContain(">Profile</strong>");
    expect(appShellSource).toContain("<ProfileSummaryDialog");
  });
});
