import { describe, expect, it } from "vitest";
import {
  isOnboardingExemptRoute,
  isPublicAuthRoute,
  shouldLoadExplorerProfile,
  shouldRedirectToLogin,
  shouldRedirectToOnboarding,
} from "./onboarding-routing";

describe("onboarding routing", () => {
  it.each(["/home", "/dashboard", "/notes", "/quizzes", "/companion", "/leaderboard"])(
    "requires incomplete students to onboard before %s",
    (pathname) => expect(shouldRedirectToOnboarding(pathname, true)).toBe(true),
  );

  it.each([
    "/onboarding",
    "/auth/callback",
    "/auth/reset-password",
    "/upgrade",
    "/payment-return",
    "/admin/users",
    "/parent-dashboard",
    "/privacy",
    "/landing",
    "/landing-preview",
    "/command-center-preview",
  ])("keeps %s outside the onboarding guard", (pathname) => {
    expect(isOnboardingExemptRoute(pathname)).toBe(true);
  });

  it("never redirects a completed student", () => {
    expect(shouldRedirectToOnboarding("/home", false)).toBe(false);
  });

  it("protects the student experience from signed-out visitors", () => {
    expect(shouldRedirectToLogin("/home", false, false)).toBe(true);
    expect(shouldRedirectToLogin("/home", true, false)).toBe(false);
    expect(shouldRedirectToLogin("/home", false, true)).toBe(false);
    expect(shouldRedirectToLogin("/payment-return", false, false)).toBe(false);
  });

  it.each(["/login", "/forgot-password", "/auth/callback", "/auth/reset-password"])(
    "keeps Explorer Profile data out of public auth route %s",
    (pathname) => {
      expect(isPublicAuthRoute(pathname)).toBe(true);
      expect(shouldLoadExplorerProfile(pathname)).toBe(false);
    },
  );

  it.each(["/home", "/onboarding"])("loads Explorer Profile data on %s", (pathname) => {
    expect(shouldLoadExplorerProfile(pathname)).toBe(true);
  });
});
