import { describe, expect, it } from "vitest";
import { isInternalPath, passwordStrengthError } from "./auth-recovery";

describe("recovery flow validation", () => {
  it("accepts only internal next paths", () => {
    expect(isInternalPath("/auth/reset-password")).toBe(true);
    expect(isInternalPath("/auth/reset-password?from=email")).toBe(true);
    expect(isInternalPath("https://evil.example/reset")).toBe(false);
    expect(isInternalPath("//evil.example/reset")).toBe(false);
    expect(isInternalPath("/\\evil.example/reset")).toBe(false);
    expect(isInternalPath(null)).toBe(false);
  });

  it("requires a strong password", () => {
    expect(passwordStrengthError("short")).toBeTruthy();
    expect(passwordStrengthError("alllowercase1")).toBeTruthy();
    expect(passwordStrengthError("ALLUPPERCASE1")).toBeTruthy();
    expect(passwordStrengthError("NoNumberHere")).toBeTruthy();
    expect(passwordStrengthError("StrongPass1")).toBeNull();
  });
});
