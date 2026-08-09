import { describe, expect, it } from "vitest";
import {
  EXPLORER_SUPPORTED_AGES,
  getExplorerStepError,
  nextExplorerStep,
  previousExplorerStep,
} from "./explorer-onboarding-flow";

const verifiedSchool = {
  id: "123e4567-e89b-42d3-a456-426614174000",
  schoolCode: "BEA8639",
  schoolName: "SEKOLAH MENENGAH KEBANGSAAN SEKSYEN 1 BANDAR KINRARA",
  schoolType: "SMK",
  state: "SELANGOR",
  district: "PETALING PERDANA",
  postcode: "47180",
};

const completeDraft = {
  displayName: "Alya",
  age: "14",
  formLevel: "Form 2" as const,
  school: verifiedSchool,
};

describe("Explorer onboarding flow", () => {
  it("keeps the supported backend age range", () => {
    expect(EXPLORER_SUPPORTED_AGES).toEqual(["10", "11", "12", "13", "14", "15", "16", "17", "18"]);
  });

  it("validates only the fields required by the current step", () => {
    expect(getExplorerStepError(1, { ...completeDraft, displayName: " " })).toContain(
      "display name",
    );
    expect(getExplorerStepError(2, { ...completeDraft, formLevel: "" })).toContain("Form level");
    expect(getExplorerStepError(2, { ...completeDraft, age: "9" })).toContain("age");
    expect(getExplorerStepError(3, { ...completeDraft, school: null })).toContain(
      "verified school",
    );
    expect(getExplorerStepError(4, completeDraft)).toBeNull();
  });

  it("keeps forward and back navigation within four steps", () => {
    expect(nextExplorerStep(1)).toBe(2);
    expect(nextExplorerStep(4)).toBe(4);
    expect(previousExplorerStep(4)).toBe(3);
    expect(previousExplorerStep(1)).toBe(1);
  });
});
