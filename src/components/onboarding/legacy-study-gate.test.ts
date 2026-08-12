import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const appShellSource = readFileSync(new URL("../AppShell.tsx", import.meta.url), "utf8");

describe("legacy study gate", () => {
  it("is not mounted by the authenticated app shell", () => {
    expect(appShellSource).not.toContain("OnboardingWizard");
    expect(appShellSource).not.toContain("academy-onboarded-v1");
  });
});
