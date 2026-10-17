import type { SupabaseClient } from "@supabase/supabase-js";
export {
  PARTNER_RECEIPT_COOKIE,
  PARTNER_RECEIPT_SECONDS,
  signPartnerReceipt,
  validPartnerReceipt,
} from "../../supabase/functions/_shared/partner-confirmation";

// `ineligible` marks a definitive answer for this account (retrying cannot
// succeed), so the learner may explicitly continue without the referral.
export type ReferralConfirmation =
  | { confirmed: true; partnerCode: string }
  | { confirmed: false; message: string; partnerCode?: string; ineligible?: true };

const INELIGIBLE_MESSAGES: Record<string, string> = {
  existing_customer:
    "This account has already paid for AcadeMY, so a referral cannot be added to it. Continue without the referral or choose a different Google account.",
  self_referral: "Partners cannot use their own referral link. Continue without the referral.",
  invalid_code:
    "This referral link is not valid or is no longer active. Continue without the referral or contact the person who shared it.",
  not_student:
    "Referrals apply to learner accounts only. Choose a learner account or continue without the referral.",
};

/** Call only after explicit account choice, using the server-verified user ID. */
export async function confirmReferralForAccount(
  supabase: SupabaseClient,
  admin: SupabaseClient,
  userId: string,
  expectedUserId: string,
  partnerCode: string,
): Promise<ReferralConfirmation> {
  if (userId !== expectedUserId) {
    return {
      confirmed: false,
      message: "Your signed-in account changed. Choose the learner account again.",
    };
  }
  const claim = await supabase.rpc("partner_claim_referral", { p_partner_code: partnerCode });
  if (claim.error)
    return {
      confirmed: false,
      message: "Referral verification is unavailable. No payment bill was created. Please retry.",
    };
  if (claim.data?.claimed !== true && claim.data?.reason !== "already_attributed") {
    const reason = String(claim.data?.reason || "");
    if (INELIGIBLE_MESSAGES[reason])
      return { confirmed: false, ineligible: true, message: INELIGIBLE_MESSAGES[reason] };
    return {
      confirmed: false,
      message: `Referral could not be confirmed (${String(claim.data?.reason || "unverified")}). Choose another account or contact support.`,
    };
  }
  // Students cannot read these partner-owned rows via RLS. This server-only
  // query is scoped exclusively to the identity verified by auth.getUser().
  const referral = await admin
    .from("partner_referrals")
    .select("partner_user_id")
    .eq("customer_reference", userId)
    .is("deleted_at", null)
    .maybeSingle();
  if (referral.error || !referral.data)
    return {
      confirmed: false,
      message: "Referral attribution could not be verified. Please retry before paying.",
    };
  const partner = await admin
    .from("partner_profiles")
    .select("partner_code,status")
    .eq("user_id", referral.data.partner_user_id)
    .is("deleted_at", null)
    .maybeSingle();
  if (
    partner.error ||
    !partner.data ||
    partner.data.status !== "active" ||
    referral.data.partner_user_id === userId
  ) {
    // The insert trigger links only active, non-self partners, so a payment
    // made without this referral is consistent with the database.
    return {
      confirmed: false,
      ineligible: true,
      message:
        "The referring partner is no longer active. Continue without the referral or contact support.",
    };
  }
  if (partner.data.partner_code !== partnerCode) {
    return {
      confirmed: false,
      partnerCode: partner.data.partner_code,
      message: `This account is already attributed to ${partner.data.partner_code}. First-touch attribution cannot be changed. Confirm that original partner to continue.`,
    };
  }
  return { confirmed: true, partnerCode: partner.data.partner_code };
}
