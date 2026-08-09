import { describe, expect, it } from "vitest";
import { needsExplorerOnboarding, normalizeExplorerProfileInput } from "./explorer-profile";

describe("Explorer Profile validation", () => {
  it("trims and accepts a valid student profile", () => {
    expect(
      normalizeExplorerProfileInput({
        displayName: "  Alya  ",
        age: 14,
        formLevel: "Form 2",
        schoolId: "123e4567-e89b-42d3-a456-426614174000",
      }),
    ).toEqual({
      displayName: "Alya",
      age: 14,
      formLevel: "Form 2",
      schoolId: "123e4567-e89b-42d3-a456-426614174000",
    });
  });

  it("rejects invalid ages and empty names", () => {
    expect(() =>
      normalizeExplorerProfileInput({
        displayName: " ",
        age: 14,
        formLevel: "Form 2",
        schoolId: "123e4567-e89b-42d3-a456-426614174000",
      }),
    ).toThrow("Display name is required");
    expect(() =>
      normalizeExplorerProfileInput({
        displayName: "Alya",
        age: 9,
        formLevel: "Form 2",
        schoolId: "123e4567-e89b-42d3-a456-426614174000",
      }),
    ).toThrow("between 10 and 18");
  });

  it("requires a selected verified school ID", () => {
    expect(() =>
      normalizeExplorerProfileInput({
        displayName: "Alya",
        age: 14,
        formLevel: "Form 2",
        schoolId: "typed school text",
      }),
    ).toThrow("verified school");
  });

  it("requires onboarding only for incomplete students", () => {
    expect(
      needsExplorerOnboarding({
        displayName: null,
        age: null,
        formLevel: null,
        schoolId: null,
        onboardingCompleted: false,
        role: "student",
      }),
    ).toBe(true);
    expect(
      needsExplorerOnboarding({
        displayName: null,
        age: null,
        formLevel: null,
        schoolId: null,
        onboardingCompleted: false,
        role: "admin",
      }),
    ).toBe(false);
  });
});
