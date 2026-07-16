// Server functions for the upgrade/checkout flow.
//
// STUB IMPLEMENTATION: there is no real payment gateway wired up yet. This
// creates a 'pending' row and immediately confirms it via the
// confirm_stub_payment() Postgres function (see supabase/schema.sql) instead
// of redirecting to a real checkout page and waiting for a webhook. To swap
// in a real gateway (ToyyibPay/Billplz/Stripe/etc.) later:
//   1. Have createCheckout redirect to the gateway's hosted checkout page
//      instead of calling confirmCheckout itself.
//   2. Replace confirm_stub_payment() with a webhook handler that verifies
//      the gateway's signature before marking the payment 'paid'.
import { createServerFn } from "@tanstack/react-start";
import { getRequest, setResponseStatus } from "@tanstack/start-server-core";
import { getSupabaseServerClient } from "../lib/supabase.server";
import {
  CheckoutAuthenticationError,
  executeCheckout,
  type CheckoutResult,
  type UpgradePlan,
} from "./-upgrade-checkout";

export type { UpgradePlan } from "./-upgrade-checkout";

export const createAndConfirmStubCheckout = createServerFn({ method: "POST" })
  .inputValidator((data: { plan: UpgradePlan }) => data)
  .handler(async ({ data }): Promise<CheckoutResult> => {
    const request = getRequest();
    const requestUrl = new URL(request.url);
    const supabase = getSupabaseServerClient();
    if (!supabase) throw new Error("Supabase is not configured");
    let sessionResolved = false;

    try {
      return await executeCheckout(data, {
        async getVerifiedUser() {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          sessionResolved = Boolean(user);
          if (!user) return null;
          return { id: user.id, email: user.email ?? null };
        },
        async insertPendingPayment({ userId, amount, plan }) {
          const { data: payment, error } = await supabase
            .from("payments")
            .insert({
              user_id: userId,
              amount,
              currency: "MYR",
              plan,
              status: "pending",
            })
            .select("id")
            .single();
          if (error) throw error;
          return payment.id as string;
        },
        async confirmPayment(paymentId) {
          const { error } = await supabase.rpc("confirm_stub_payment", {
            payment_id: paymentId,
          });
          if (error) throw error;
        },
      });
    } catch (error) {
      if (error instanceof CheckoutAuthenticationError) setResponseStatus(401);
      throw error;
    } finally {
      console.info("[upgrade-auth]", {
        hasCookieHeader: request.headers.has("cookie"),
        sessionResolved,
        origin: request.headers.get("origin") ?? requestUrl.origin,
        host: request.headers.get("host") ?? requestUrl.host,
      });
    }
  });
