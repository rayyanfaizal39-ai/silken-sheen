import type { SupabaseClient } from "@supabase/supabase-js";
export {
  PARTNER_RECEIPT_COOKIE,
  PARTNER_RECEIPT_SECONDS,
  signPartnerReceipt,
  validPartnerReceipt,
} from "../../supabase/functions/_shared/partner-confirmation";

export type ReferralConfirmation =
  | { confirmed: true; partnerCode: string }
  | { confirmed: false; message: string; partnerCode?: string };

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
    return {
      confirmed: false,
      message: "The referring partner is unavailable. Contact support before paying.",
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
