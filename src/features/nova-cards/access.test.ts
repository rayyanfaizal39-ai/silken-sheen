import { describe, expect, it } from "vitest";
import { NOVA_ACCESS_ERRORS, novaAccessCopy, novaAccessProblem } from "./access";

describe("Nova access problems", () => {
  it("maps each server message to its cause and anything else to unavailable", () => {
    for (const [problem, message] of Object.entries(NOVA_ACCESS_ERRORS))
      expect(novaAccessProblem(new Error(message))).toBe(problem);
    expect(novaAccessProblem(new Error("Failed to fetch"))).toBe("unavailable");
    expect(novaAccessProblem(undefined)).toBe("unavailable");
  });

  it("offers sign-in only when signing in can help", () => {
    expect(novaAccessCopy("signedOut").signIn).toBe(true);
    for (const problem of ["unconfigured", "storagePending", "unavailable"] as const)
      expect(novaAccessCopy(problem).signIn).toBe(false);
    expect(novaAccessCopy("unavailable").body).toContain(
      "does not mean your subscription has expired",
    );
  });
});
