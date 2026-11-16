import { describe, expect, it } from "vitest";
import { isExistingAccountSignUpError } from "./auth-signup-response";

describe("existing-account signup responses", () => {
  it.each(["email_exists", "user_already_exists"])(
    "recognizes Supabase's %s response without exposing it to the UI",
    (code) => {
      expect(isExistingAccountSignUpError({ code, message: "server detail" })).toBe(true);
    },
  );

  it("supports the legacy GoTrue response without relying on it when a code exists", () => {
    expect(isExistingAccountSignUpError(new Error("User already registered"))).toBe(true);
  });

  it("does not hide unrelated authentication failures", () => {
    expect(isExistingAccountSignUpError({ code: "weak_password" })).toBe(false);
    expect(isExistingAccountSignUpError(new Error("Network unavailable"))).toBe(false);
  });
});
