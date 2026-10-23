import { usableEmail } from "./weekly-parent-report.ts";

/** Bump this when the English or Bahasa Melayu consent copy changes. */
export const PARENT_EMAIL_CONSENT_VERSION = "2026-10-23";

export function hasCurrentParentEmailConsent(input: {
  parentReportEmail?: string | null;
  consentAt?: string | null;
  consentVersion?: string | null;
}): boolean {
  return Boolean(
    usableEmail(input.parentReportEmail) &&
    input.consentAt &&
    input.consentVersion === PARENT_EMAIL_CONSENT_VERSION,
  );
}

/**
 * Consented parent address, otherwise the student account email.
 * A saved parent address without the current consent version is not used.
 */
export function resolveParentReportRecipient(input: {
  parentReportEmail?: string | null;
  accountEmail?: string | null;
  consentAt?: string | null;
  consentVersion?: string | null;
}): string | null {
  if (hasCurrentParentEmailConsent(input)) return usableEmail(input.parentReportEmail);
  return usableEmail(input.accountEmail);
}

/**
 * Columns the student may write. parent_email_consent_at is set by the
 * profiles trigger from the database clock, so a grant never sends a timestamp.
 */
export function parentEmailWrite(email: string | null, consent: boolean) {
  if (!email) {
    return {
      parent_report_email: null,
      parent_email_consent_at: null,
      parent_email_consent_version: null,
    };
  }
  if (!consent) throw new Error("Parent email consent is required.");
  return {
    parent_report_email: email,
    parent_email_consent_version: PARENT_EMAIL_CONSENT_VERSION,
  };
}
