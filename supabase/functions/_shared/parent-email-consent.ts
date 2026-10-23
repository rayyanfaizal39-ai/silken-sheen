import { usableEmail } from "./weekly-parent-report.ts";

/**
 * A valid parent address receives the monthly report. Anything else falls
 * back to the student account email. Consent is not required.
 */
export function resolveParentReportRecipient(input: {
  parentReportEmail?: string | null;
  accountEmail?: string | null;
}): string | null {
  return usableEmail(input.parentReportEmail) ?? usableEmail(input.accountEmail);
}

/** The only parent-email column the student writes. */
export function parentEmailWrite(email: string | null) {
  return { parent_report_email: email };
}
