import { describe, expect, it } from "vitest";
import type { AdminProfile } from "./admin.types";
import { hasAdministratorRole } from "./admin-access";

function roleProfile(role: string): Pick<AdminProfile, "role"> {
  return { role: role as AdminProfile["role"] };
}

describe("hasAdministratorRole", () => {
  it("accepts the admin role, ignoring surrounding whitespace and case", () => {
    expect(hasAdministratorRole({ role: "admin" })).toBe(true);
    expect(hasAdministratorRole(roleProfile("Admin"))).toBe(true);
    expect(hasAdministratorRole(roleProfile(" ADMIN "))).toBe(true);
  });

  it("rejects missing, empty, or non-admin roles", () => {
    expect(hasAdministratorRole(null)).toBe(false);
    expect(hasAdministratorRole(roleProfile(""))).toBe(false);
    expect(hasAdministratorRole(roleProfile("   "))).toBe(false);
    expect(hasAdministratorRole({ role: "student" })).toBe(false);
    expect(hasAdministratorRole({ role: "teacher" })).toBe(false);
  });
});
