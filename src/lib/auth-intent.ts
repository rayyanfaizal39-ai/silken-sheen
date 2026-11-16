import { getAuthReturnTo } from "@/lib/auth-return-to";
import { isLearningLevelAvailable, type LearningLevelId } from "@/lib/learning-levels";

export const REGISTRATION_INTENT_COOKIE_NAME = "academy-registration-intent-v1";
export const REGISTRATION_INTENT_TTL_MS = 30 * 60 * 1000;

export type RegistrationIntentStage = "world" | "account";

export interface RegistrationIntent {
  flow: "registration";
  world: LearningLevelId;
  stage: RegistrationIntentStage;
  returnTo: string;
  expiresAt: number;
}

function isLearningLevelId(value: unknown): value is LearningLevelId {
  return value === "primary" || value === "junior" || value === "senior";
}

export function createRegistrationIntent(
  world: LearningLevelId,
  stage: RegistrationIntentStage = "world",
  returnTo: string = "/home",
  now = Date.now(),
): RegistrationIntent {
  if (!isLearningLevelId(world) || !isLearningLevelAvailable(world)) {
    throw new Error("Registration is not available for this learning world.");
  }
  return {
    flow: "registration",
    world,
    stage,
    returnTo: getAuthReturnTo(returnTo),
    expiresAt: now + REGISTRATION_INTENT_TTL_MS,
  };
}

export function encodeRegistrationIntent(intent: RegistrationIntent): string {
  return encodeURIComponent(JSON.stringify(intent));
}

export function parseRegistrationIntent(
  encoded: string | null | undefined,
  now = Date.now(),
): RegistrationIntent | null {
  if (!encoded) return null;
  try {
    const value = JSON.parse(decodeURIComponent(encoded)) as Partial<RegistrationIntent>;
    if (
      value.flow !== "registration" ||
      !isLearningLevelId(value.world) ||
      !isLearningLevelAvailable(value.world) ||
      (value.stage !== "world" && value.stage !== "account") ||
      typeof value.returnTo !== "string" ||
      getAuthReturnTo(value.returnTo) !== value.returnTo ||
      typeof value.expiresAt !== "number" ||
      !Number.isFinite(value.expiresAt) ||
      value.expiresAt <= now
    ) {
      return null;
    }
    return value as RegistrationIntent;
  } catch {
    return null;
  }
}

export function readRegistrationIntentFromCookie(
  cookieHeader: string,
  now = Date.now(),
): RegistrationIntent | null {
  const prefix = `${REGISTRATION_INTENT_COOKIE_NAME}=`;
  const encoded = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))
    ?.slice(prefix.length);
  return parseRegistrationIntent(encoded, now);
}

export function getRegistrationIntent(now = Date.now()): RegistrationIntent | null {
  if (typeof document === "undefined") return null;
  return readRegistrationIntentFromCookie(document.cookie, now);
}

export function persistRegistrationIntent(intent: RegistrationIntent, now = Date.now()): void {
  if (typeof document === "undefined") return;
  const maxAge = Math.max(0, Math.floor((intent.expiresAt - now) / 1000));
  const secure = typeof window !== "undefined" && window.location.protocol === "https:";
  document.cookie = [
    `${REGISTRATION_INTENT_COOKIE_NAME}=${encodeRegistrationIntent(intent)}`,
    "Path=/",
    `Max-Age=${maxAge}`,
    "SameSite=Lax",
    secure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export function clearRegistrationIntent(): void {
  if (typeof document === "undefined") return;
  const secure = typeof window !== "undefined" && window.location.protocol === "https:";
  document.cookie = [
    `${REGISTRATION_INTENT_COOKIE_NAME}=`,
    "Path=/",
    "Max-Age=0",
    "SameSite=Lax",
    secure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}
