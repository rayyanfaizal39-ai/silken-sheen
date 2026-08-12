import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const routeSource = readFileSync(new URL("./profile.tsx", import.meta.url), "utf8");
const routeStyles = readFileSync(new URL("./profile.css", import.meta.url), "utf8");

describe("Explorer Profile UI contract", () => {
  it("uses existing identity, progress, school, subject, and achievement sources", () => {
    expect(routeSource).toContain('createFileRoute("/profile")');
    expect(routeSource).toContain("useAuth()");
    expect(routeSource).toContain("useProgress()");
    expect(routeSource).toContain("getSchoolById(schoolId)");
    expect(routeSource).toContain("progress.subjectXp[subject.id]");
    expect(routeSource).toContain("ALL_BADGES.filter");
  });

  it("keeps school search behind the edit dialog's dynamic import", () => {
    expect(routeSource).toContain("const SchoolCombobox = lazy(() =>");
    expect(routeSource).toContain('import("@/components/onboarding/SchoolCombobox")');
    expect(routeSource).toContain(
      "Only schools selected from verified search results can be saved.",
    );
  });

  it("provides legacy and empty states without fake progress", () => {
    expect(routeSource).toContain("Complete profile");
    expect(routeSource).toContain("Add age");
    expect(routeSource).toContain("Add school");
    expect(routeSource).toContain("No activity recorded yet");
    expect(routeSource).toContain("Complete missions and quizzes to unlock achievements.");
    expect(routeSource).not.toContain("Not set");
  });

  it("supports mobile, desktop, focus, and reduced-motion behavior", () => {
    expect(routeStyles).toContain("@media (min-width: 640px)");
    expect(routeStyles).toContain("@media (min-width: 960px)");
    expect(routeStyles).toContain(":focus-visible");
    expect(routeStyles).toContain("@media (prefers-reduced-motion: reduce)");
    expect(routeSource).toContain('role="dialog"');
    expect(routeSource).toContain('aria-modal="true"');
  });
});
