// Where ToyyibPay sends the learner's browser after payment. The server
// callback (toyyibpay-callback) never depends on this; it only decides which
// site shows the result, so the learner returns to the session they paid from.
//
// Allowed: the production APPLICATION_URL origin, plus preview origins an
// operator lists in PAYMENT_RETURN_PREVIEW_ORIGINS (comma-separated). A listed
// preview must be an exact https://<name>.academymy.pages.dev origin; anything
// else in that setting is ignored. Any other requested origin, malformed value
// or missing value falls back to production. Browser input is never trusted:
// the web server derives the requested origin from its own request host.

export const PAYMENT_RETURN_PATH = "/payment-return";
const PREVIEW_ORIGIN = /^https:\/\/[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.academymy\.pages\.dev$/;

/** The exact origin (scheme://host[:port]) of an absolute URL, or undefined. */
function exactOrigin(value: unknown): string | undefined {
  if (typeof value !== "string" || value.length > 300) return undefined;
  try {
    const url = new URL(value);
    if (url.username || url.password) return undefined;
    return url.origin === value.replace(/\/$/, "") ? url.origin : undefined;
  } catch {
    return undefined;
  }
}

export function approvedPreviewOrigins(setting: string | undefined): Set<string> {
  const origins = new Set<string>();
  for (const entry of (setting ?? "").split(",")) {
    const origin = exactOrigin(entry.trim());
    if (origin && PREVIEW_ORIGIN.test(origin)) origins.add(origin);
  }
  return origins;
}

export function paymentReturnUrl(
  requestedOrigin: unknown,
  applicationUrl: string,
  previewSetting: string | undefined,
): string {
  const production = new URL(applicationUrl).origin;
  const requested = exactOrigin(requestedOrigin);
  const origin =
    requested && (requested === production || approvedPreviewOrigins(previewSetting).has(requested))
      ? requested
      : production;
  return `${origin}${PAYMENT_RETURN_PATH}`;
}
