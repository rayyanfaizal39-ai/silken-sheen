import { usableEmail } from "./weekly-parent-report.ts";

/**
 * Client acknowledgement replaced by the database clock. It is not a
 * recorded consent time. Changing the parent address without a new
 * acknowledgement clears parent_email_consent_at.
 */
export const PARENT_EMAIL_CONSENT_SIGNAL = "1970-01-01T00:00:00.000Z";

export function recordedParentEmailConsent(consentAt: string | null | undefined): boolean {
  if (typeof consentAt !== "string") return false;
  const trimmed = consentAt.trim();
  if (!trimmed || trimmed === PARENT_EMAIL_CONSENT_SIGNAL) return false;
  return !Number.isNaN(Date.parse(trimmed));
}

/**
 * A valid parent address receives the monthly report only after consent is
 * recorded. Anything else falls back to the student account email.
 */
export function resolveParentReportRecipient(input: {
  parentReportEmail?: string | null;
  accountEmail?: string | null;
  parentEmailConsentAt?: string | null;
}): string | null {
  const parent = usableEmail(input.parentReportEmail);
  const account = usableEmail(input.accountEmail);
  if (parent && recordedParentEmailConsent(input.parentEmailConsentAt)) return parent;
  return account;
}

/** Parent-email columns the student writes. The trigger stamps the clock. */
export function parentEmailWrite(email: string | null, consented = false) {
  return {
    parent_report_email: email,
    parent_email_consent_at: email && consented ? PARENT_EMAIL_CONSENT_SIGNAL : null,
  };
}
