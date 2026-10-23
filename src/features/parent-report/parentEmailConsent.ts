import { normalizeParentReportEmail } from "./weeklyParentReport";

export {
  parentEmailWrite,
  recordedParentEmailConsent,
  resolveParentReportRecipient,
} from "../../../supabase/functions/_shared/parent-email-consent.ts";

/** A new address needs a fresh tick. Reverting to the saved address restores its recorded consent. */
export function consentAfterEmailEdit(input: {
  nextEmail: string;
  savedEmail: string | null;
  savedConsent: boolean;
}): boolean {
  const normalized = normalizeParentReportEmail(input.nextEmail);
  if (!normalized.ok || normalized.email !== input.savedEmail) return false;
  return input.savedConsent;
}

/** Save stays disabled until a non-empty address has the consent checkbox ticked. */
export function parentEmailSaveBlocked(input: { email: string; consent: boolean }): boolean {
  const normalized = normalizeParentReportEmail(input.email);
  if (!normalized.ok) return true;
  return Boolean(normalized.email) && !input.consent;
}
