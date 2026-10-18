import type { SupabaseClient } from "@supabase/supabase-js";
export {
  PARTNER_RECEIPT_SECONDS,
  signPartnerReceipt,
  validPartnerReceipt,
} from "../../supabase/functions/_shared/partner-confirmation";

/**
 * - `attributed`: the purchaser's locked first-touch partner is active; the
 *   bill must carry a signed receipt and pass the Edge link check.
 * - `none`: no referral, or the purchaser is definitively ineligible (the
 *   insert trigger would not link the payment either): normal checkout.
 * - `unverified`: a temporary failure. No bill may be created, otherwise an
 *   eligible referral could be silently lost.
 */
export type CheckoutAttribution =
  | { status: "attributed"; partnerCode: string }
  | { status: "none" }
  | { status: "unverified"; reason: string };

// partner_claim_referral answers that settle the purchaser's eligibility.
const SETTLED_CLAIMS = new Set([
  "already_attributed",
  "existing_customer",
  "self_referral",
  "invalid_code",
  "not_student",
]);

/**
 * Claims the private first-touch code for the authenticated purchaser only,
 * then reads their immutable attribution. `supabase` carries the purchaser's
 * session; `admin` is used solely for rows scoped to that verified user.
 */
export async function resolveCheckoutAttribution(
  supabase: SupabaseClient,
  admin: SupabaseClient,
  userId: string,
  partnerCode?: string,
): Promise<CheckoutAttribution> {
  let expectsAttribution = false;
  if (partnerCode) {
    const claim = await supabase.rpc("partner_claim_referral", { p_partner_code: partnerCode });
    if (claim.error) return { status: "unverified", reason: "claim_failed" };
    const reason = String(claim.data?.reason ?? "");
    if (claim.data?.claimed !== true && !SETTLED_CLAIMS.has(reason))
      return { status: "unverified", reason: `claim_${reason || "unknown"}` };
    expectsAttribution = claim.data?.claimed === true || reason === "already_attributed";
  }
  // Students cannot read partner-owned rows via RLS.
  const referral = await admin
    .from("partner_referrals")
    .select("partner_user_id")
    .eq("customer_reference", userId)
    .is("deleted_at", null)
    .maybeSingle();
  if (referral.error) return { status: "unverified", reason: "referral_lookup_failed" };
  if (!referral.data && expectsAttribution)
    return { status: "unverified", reason: "claimed_referral_missing" };
  if (!referral.data || referral.data.partner_user_id === userId) return { status: "none" };
  const partner = await admin
    .from("partner_profiles")
    .select("partner_code,status")
    .eq("user_id", referral.data.partner_user_id)
    .is("deleted_at", null)
    .maybeSingle();
  if (partner.error) return { status: "unverified", reason: "partner_lookup_failed" };
  if (partner.data?.status !== "active") return { status: "none" };
  return { status: "attributed", partnerCode: partner.data.partner_code };
}
