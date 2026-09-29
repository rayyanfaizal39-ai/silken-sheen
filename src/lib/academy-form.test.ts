import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getAcademyForForm, getStudentSeniorHomeRedirect, SENIOR_HOME_URL } from "./academy-form";
import { EXPLORER_FORM_LEVELS, normalizeExplorerProfileInput, type ExplorerFormLevel } from "./explorer-profile";

const migration = readFileSync(
  new URL(
    "../../supabase/migrations/20260925120000_allow_shared_profile_forms_1_through_5.sql",
    import.meta.url,
  ),
  "utf8",
);

const explorerProfileSource = readFileSync(new URL("./explorer-profile.ts", import.meta.url), "utf8");

describe("getAcademyForForm", () => {
  it("routes Form 1–3 to Junior and Form 4–5 to Senior", () => {
    expect(getAcademyForForm("Form 1")).toBe("junior");
    expect(getAcademyForForm("Form 2")).toBe("junior");
    expect(getAcademyForForm("Form 3")).toBe("junior");
    expect(getAcademyForForm("Form 4")).toBe("senior");
    expect(getAcademyForForm("Form 5")).toBe("senior");
  });

  it("returns null for a missing or unknown form", () => {
    expect(getAcademyForForm(null)).toBeNull();
    expect(getAcademyForForm(undefined)).toBeNull();
    expect(getAcademyForForm("")).toBeNull();
    expect(getAcademyForForm("Form 6")).toBeNull();
    expect(getAcademyForForm("form 4")).toBeNull();
  });
});

describe("getStudentSeniorHomeRedirect", () => {
  it("sends a Form 4 or Form 5 student home on Senior", () => {
    expect(getStudentSeniorHomeRedirect({ role: "student", form: "Form 4", pathname: "/home" })).toBe(
      SENIOR_HOME_URL,
    );
    expect(getStudentSeniorHomeRedirect({ role: "student", form: "Form 5", pathname: "/onboarding" })).toBe(
      SENIOR_HOME_URL,
    );
  });

  it("keeps Form 1–3, missing, and unknown forms on Junior", () => {
    for (const form of ["Form 1", "Form 2", "Form 3", null, "Form 6"]) {
      expect(getStudentSeniorHomeRedirect({ role: "student", form, pathname: "/home" })).toBeNull();
    }
  });

  it("never routes an admin to Senior, including /home and /admin", () => {
    expect(getStudentSeniorHomeRedirect({ role: "admin", form: "Form 4", pathname: "/home" })).toBeNull();
    expect(getStudentSeniorHomeRedirect({ role: "admin", form: "Form 5", pathname: "/admin" })).toBeNull();
    expect(getStudentSeniorHomeRedirect({ role: "admin", form: "Form 5", pathname: "/admin/users" })).toBeNull();
  });

  it("does not redirect teachers or students on auth and admin paths", () => {
    expect(getStudentSeniorHomeRedirect({ role: "teacher", form: "Form 4", pathname: "/home" })).toBeNull();
    for (const pathname of ["/admin", "/admin/users", "/login", "/forgot-password", "/auth/callback"]) {
      expect(getStudentSeniorHomeRedirect({ role: "student", form: "Form 5", pathname })).toBeNull();
    }
  });
});

describe("Junior form selectors stay Form 1–3", () => {
  it("keeps EXPLORER_FORM_LEVELS at Form 1–3 and records the raw form", () => {
    expect(EXPLORER_FORM_LEVELS).toEqual(["Form 1", "Form 2", "Form 3"]);
    expect(explorerProfileSource).toContain("recordedForm: row.form");
    expect(explorerProfileSource).toContain("formLevel: isExplorerFormLevel(row.form) ? row.form : null");
  });

  it("still rejects Form 4 and Form 5 in Junior profile validation", () => {
    for (const formLevel of ["Form 4", "Form 5"]) {
      expect(() =>
        normalizeExplorerProfileInput({
          displayName: "Alya",
          age: 16,
          formLevel: formLevel as unknown as ExplorerFormLevel,
          schoolId: "123e4567-e89b-42d3-a456-426614174000",
        }),
      ).toThrow("Choose Form 1, Form 2, or Form 3.");
    }
  });
});

describe("shared profile form migration", () => {
  it("allows Form 4 and Form 5 without updating rows or mentioning handle_new_user", () => {
    expect(migration).toContain("'Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5'");
    expect(migration).toContain("Form level must be Form 1, Form 2, Form 3, Form 4, or Form 5");
    expect(migration).not.toMatch(/update\s+public\.profiles/i);
    expect(migration.toLowerCase()).not.toContain("handle_new_user");
  });
});
