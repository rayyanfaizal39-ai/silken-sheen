import { getCookie, setCookie, getRequestProtocol } from "@tanstack/start-server-core";
import { areMockPaymentsEnabled } from "./billing-config";
import { createPendingPayment, getSupabaseAdminClient } from "./billing.server";
import type { CheckoutPlan } from "./billing.types";
import { getSupabaseServerClient } from "./supabase.server";
import {
  confirmReferralForAccount,
  PARTNER_RECEIPT_COOKIE,
  PARTNER_RECEIPT_SECONDS,
  signPartnerReceipt,
  validPartnerReceipt,
} from "./partner-referral.server";

export type AccountCheckoutInput = {
  accountId: string;
  plan: CheckoutPlan;
  idempotencyKey: string;
  partnerCode?: string;
};

async function requireUser() {
  const supabase = getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase is not configured");
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("Must be logged in");
  return { supabase, user: data.user };
}

function referralReceiptSecret() {
  const secret = process.env.PARTNER_CONFIRMATION_SECRET;
  if (!secret) throw new Error("Referral confirmation is unavailable");
  return secret;
}

export async function confirmAccountPartner(data: { accountId: string; partnerCode: string }) {
  const { supabase, user } = await requireUser();
  const secret = referralReceiptSecret();
  const result = await confirmReferralForAccount(
    supabase,
    getSupabaseAdminClient(),
    user.id,
    data.accountId,
    data.partnerCode,
  );
  if (result.confirmed) {
    setCookie(PARTNER_RECEIPT_COOKIE, signPartnerReceipt(user.id, result.partnerCode, secret), {
      httpOnly: true,
      sameSite: "lax",
      secure: getRequestProtocol({ xForwardedProto: true }) === "https",
      path: "/",
      maxAge: PARTNER_RECEIPT_SECONDS,
    });
  }
  return result;
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

  if (user.id !== data.accountId) {
    return {
      mode: "referral_required" as const,
      message: "Your signed-in account changed. Review the learner account before paying.",
    };
  }
  // A referral-bearing purchase must fail closed BEFORE inserting a payment
  // or contacting ToyyibPay. Consent cannot be reused for another account.
  if (data.partnerCode) {
    if (
      !validPartnerReceipt(
        getCookie(PARTNER_RECEIPT_COOKIE),
        user.id,
        data.partnerCode,
        referralReceiptSecret(),
      )
    ) {
      return {
        mode: "referral_required" as const,
        message: "Confirm the referral for this learner account before paying.",
      };
    }
    const confirmed = await confirmReferralForAccount(
      supabase,
      getSupabaseAdminClient(),
      user.id,
      data.accountId,
      data.partnerCode,
    );
    if (!confirmed.confirmed)
      return { mode: "referral_required" as const, message: confirmed.message };
  }

  if (mock) {
    const payment = await createPendingPayment({
      userId: user.id,
      checkoutPlan: data.plan,
      provider: "mock",
      idempotencyKey: data.idempotencyKey,
    });
    return { mode: "mock" as const, paymentId: payment.id };
  }

  const checkout = await supabase.functions.invoke("create-toyyibpay-bill", {
    body: {
      plan: data.plan,
      idempotencyKey: data.idempotencyKey,
      ...(data.partnerCode
        ? {
            partnerCode: data.partnerCode,
            referralConfirmation: getCookie(PARTNER_RECEIPT_COOKIE),
          }
        : {}),
    },
  });
  if (checkout.error) {
    const failureContext = (checkout.error as { context?: unknown }).context;
    if (failureContext instanceof Response && failureContext.status === 409) {
      try {
        const failure = (await failureContext.json()) as { error?: string };
        if (failure.error?.startsWith("referral_")) {
          return {
            mode: "referral_required" as const,
            message:
              "The payment service could not verify your referral. Confirm the account again before paying.",
          };
        }
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
  };
}
