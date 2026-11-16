import { describe, expect, it } from "vitest";
import {
  createRegistrationIntent,
  encodeRegistrationIntent,
  parseRegistrationIntent,
  readRegistrationIntentFromCookie,
  REGISTRATION_INTENT_COOKIE_NAME,
  REGISTRATION_INTENT_TTL_MS,
} from "./auth-intent";

describe("registration intent", () => {
  const now = 1_800_000_000_000;

  it("round-trips an available Junior registration step", () => {
    const intent = createRegistrationIntent("junior", "account", "/home", now);
    expect(parseRegistrationIntent(encodeRegistrationIntent(intent), now)).toEqual(intent);
    expect(intent.expiresAt).toBe(now + REGISTRATION_INTENT_TTL_MS);
  });

  it.each(["primary", "senior"] as const)("rejects unavailable %s registration", (world) => {
    expect(() => createRegistrationIntent(world, "world", "/home", now)).toThrow(
      "Registration is not available",
    );
  });

  it("rejects expired, malformed, and tampered intents", () => {
    const intent = createRegistrationIntent("junior", "world", "/home", now);
    expect(parseRegistrationIntent(encodeRegistrationIntent(intent), intent.expiresAt)).toBeNull();
    expect(parseRegistrationIntent("not-json", now)).toBeNull();
    expect(
      parseRegistrationIntent(
        encodeURIComponent(JSON.stringify({ ...intent, world: "primary" })),
        now,
      ),
    ).toBeNull();
    expect(
      parseRegistrationIntent(
        encodeURIComponent(JSON.stringify({ ...intent, returnTo: "https://evil.example" })),
        now,
      ),
    ).toBeNull();
  });

  it("reads only the named cookie", () => {
    const intent = createRegistrationIntent("junior", "world", "/home", now);
    const cookie = `another=value; ${REGISTRATION_INTENT_COOKIE_NAME}=${encodeRegistrationIntent(intent)}`;
    expect(readRegistrationIntentFromCookie(cookie, now)).toEqual(intent);
  });
});
