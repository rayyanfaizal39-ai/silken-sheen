import { createHmac, timingSafeEqual } from "node:crypto";
import { Buffer } from "node:buffer";

export const PARTNER_RECEIPT_COOKIE = "academy-partner-confirmation";
export const PARTNER_RECEIPT_SECONDS = 10 * 60;
type Receipt = { userId: string; partnerCode: string; expiresAt: number };

function signature(body: string, secret: string) {
  return createHmac("sha256", secret)
    .update(`academy-partner-choice:v1:${body}`)
    .digest("base64url");
}

export function signPartnerReceipt(
  userId: string,
  partnerCode: string,
  secret: string,
  now = Date.now(),
) {
  const body = Buffer.from(
    JSON.stringify({ userId, partnerCode, expiresAt: now + PARTNER_RECEIPT_SECONDS * 1000 }),
  ).toString("base64url");
  return `${body}.${signature(body, secret)}`;
}

export function validPartnerReceipt(
  token: string | undefined,
  userId: string,
  partnerCode: string,
  secret: string,
  now = Date.now(),
) {
  if (!token || token.length > 2048) return false;
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [body, mac] = parts;
    const expected = Buffer.from(signature(body, secret));
    const actual = Buffer.from(mac);
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false;
    const receipt = JSON.parse(Buffer.from(body, "base64url").toString()) as Receipt;
    return (
      receipt.userId === userId &&
      receipt.partnerCode === partnerCode &&
      receipt.expiresAt > now &&
      receipt.expiresAt <= now + PARTNER_RECEIPT_SECONDS * 1000
    );
  } catch {
    return false;
  }
}
