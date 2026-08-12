import { describe, expect, it } from "vitest";
import {
  buildExplorerProfileEditPatch,
  needsExplorerOnboarding,
  normalizeExplorerProfileEditInput,
  normalizeExplorerProfileInput,
} from "./explorer-profile";

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

  it("builds an edit patch with identity fields only", () => {
    const patch = buildExplorerProfileEditPatch({
      displayName: "  Alya Explorer  ",
      age: 14,
      formLevel: "Form 2",
      schoolId: "123e4567-e89b-42d3-a456-426614174000",
    });

    expect(patch).toEqual({
      full_name: "Alya Explorer",
      age: 14,
      form: "Form 2",
      school_id: "123e4567-e89b-42d3-a456-426614174000",
    });
    expect(patch).not.toHaveProperty("onboarding_completed");
    expect(patch).not.toHaveProperty("xp");
    expect(patch).not.toHaveProperty("streak");
  });

  it("allows legacy profiles to keep optional identity fields empty", () => {
    expect(
      normalizeExplorerProfileEditInput({
        displayName: "Alya",
        age: null,
        formLevel: null,
        schoolId: null,
      }),
    ).toEqual({ displayName: "Alya", age: null, formLevel: null, schoolId: null });
  });

  it("rejects free-text schools and invalid ages during edits", () => {
    expect(() =>
      normalizeExplorerProfileEditInput({
        displayName: "Alya",
        age: 14,
        formLevel: "Form 2",
        schoolId: "typed school text",
      }),
    ).toThrow("verified school");
    expect(() =>
      normalizeExplorerProfileEditInput({
        displayName: "Alya",
        age: 13.5,
        formLevel: "Form 2",
        schoolId: null,
      }),
    ).toThrow("whole number");
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
