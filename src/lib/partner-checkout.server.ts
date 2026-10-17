import { getRequestHost, getRequestProtocol } from "@tanstack/start-server-core";
import { areMockPaymentsEnabled } from "./billing-config";
import { createPendingPayment, getSupabaseAdminClient } from "./billing.server";
import type { CheckoutPlan } from "./billing.types";
import { getSupabaseServerClient } from "./supabase.server";
import { resolveCheckoutAttribution, signPartnerReceipt } from "./partner-referral.server";

export type AccountCheckoutInput = {
  accountId: string;
  plan: CheckoutPlan;
  idempotencyKey: string;
  partnerCode?: string;
};

// Learner-facing and deliberately generic: never mentions partners or referrals.
export const CHECKOUT_RETRY_MESSAGE =
  "We couldn't start checkout just now. Your plan was not changed. Please try again in a moment.";

async function requireUser() {
  const supabase = getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase is not configured");
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("Must be logged in");
  return { supabase, user: data.user };
}

// The site serving this request, from the server's own request host (never
// X-Forwarded-Host or browser input). The Edge Function allowlists it.
function requestOrigin() {
  const protocol = getRequestProtocol({ xForwardedProto: true }) === "https" ? "https" : "http";
  return `${protocol}://${getRequestHost()}`;
}

function retry(reason: string) {
  console.error("[billing] checkout blocked before payment creation:", reason);
  return { mode: "retry" as const, message: CHECKOUT_RETRY_MESSAGE };
}

// The edge function answers 503 {error:"provider_unavailable"} when ToyyibPay
// times out or returns something unusable; anything else stays a generic failure.
async function isProviderUnavailable(error: unknown) {
  const context = (error as { context?: unknown })?.context;
  if (!(context instanceof Response) || context.status !== 503) return false;
  try {
    const body = (await context.json()) as { error?: unknown };
    return body.error === "provider_unavailable";
  } catch {
    return false;
  }
}

export async function createAccountCheckout(data: AccountCheckoutInput) {
  const { supabase, user } = await requireUser();
  const mock = areMockPaymentsEnabled();

  // The page was rendered for a different account than the session now holds.
  if (user.id !== data.accountId) return retry("account_changed");

  // Attribution is settled for the authenticated purchaser BEFORE a payment
  // row exists or ToyyibPay is contacted, so it can never be silently lost.
  const admin = getSupabaseAdminClient();
  const attribution = await resolveCheckoutAttribution(supabase, admin, user.id, data.partnerCode);
  if (attribution.status === "unverified") return retry(attribution.reason);
  const attributed = attribution.status === "attributed";
  const clearReference = Boolean(data.partnerCode) && attributed;

  if (mock) {
    const payment = await createPendingPayment({
      userId: user.id,
      checkoutPlan: data.plan,
      provider: "mock",
      idempotencyKey: data.idempotencyKey,
    });
    return { mode: "mock" as const, paymentId: payment.id, clearReference };
  }

  let referral = {};
  if (attributed) {
    const secret = process.env.PARTNER_CONFIRMATION_SECRET;
    if (!secret) return retry("receipt_secret_missing");
    referral = {
      partnerCode: attribution.partnerCode,
      referralConfirmation: signPartnerReceipt(user.id, attribution.partnerCode, secret),
    };
  }

  const checkout = await supabase.functions.invoke("create-toyyibpay-bill", {
    body: {
      plan: data.plan,
      idempotencyKey: data.idempotencyKey,
      returnOrigin: requestOrigin(),
      ...referral,
    },
  });
  if (checkout.error) {
    const failureContext = (checkout.error as { context?: unknown }).context;
    if (failureContext instanceof Response && failureContext.status === 409) {
      try {
        const failure = (await failureContext.clone().json()) as { error?: string };
        if (failure.error?.startsWith("referral_")) return retry(`edge_${failure.error}`);
      } catch {
        /* Other provider failures retain the normal error path. */
      }
    }
    if (await isProviderUnavailable(checkout.error)) {
      console.error("[billing] payment provider unavailable:", checkout.error.message);
      return { mode: "unavailable" as const };
    }
    throw new Error(`Checkout service failed: ${checkout.error.message}`);
  }
  const result = checkout.data as { paymentId?: unknown; checkoutUrl?: unknown };
  if (typeof result.paymentId !== "string" || typeof result.checkoutUrl !== "string") {
    throw new Error("Checkout service returned an invalid response");
  }
  return {
    mode: "toyyibpay" as const,
    paymentId: result.paymentId,
    checkoutUrl: result.checkoutUrl,
    clearReference,
  };
}
