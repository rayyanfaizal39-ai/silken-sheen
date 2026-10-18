/// <reference lib="deno.window" />

// Provide a loose declaration for Deno to satisfy TypeScript environments
declare const Deno: any;

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.108.1";
import { requestToyyibPayBill, ToyyibPayUnavailableError } from "../_shared/toyyibpay-response.ts";
import { validPartnerReceipt } from "../_shared/partner-confirmation.ts";
import { paymentReturnUrl } from "../_shared/payment-return.ts";
import {
  BILLING_CURRENCY,
  CHECKOUT_PLANS,
  isCheckoutPlan,
  TOYYIBPAY_SANDBOX_URL,
} from "../_shared/billing-config.ts";

const corsHeaders = {
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Origin": "*",
};
const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" };
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function response(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}

function requiredEnv(name: string) {
  const value = Deno.env.get(name)?.trim();
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function sandboxCheckoutUrl(billCode: string) {
  return `${TOYYIBPAY_SANDBOX_URL}/${encodeURIComponent(billCode)}`;
}

// Covers the creating request's ToyyibPay timeout (10s) plus its database writes.
const BILL_WAIT_MS = 12_000;
const BILL_POLL_MS = 500;

/** The bill code another request with the same key is creating, once stored. */
async function waitForBillCode(admin: any, paymentId: string): Promise<string | undefined> {
  const deadline = Date.now() + BILL_WAIT_MS;
  while (Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, BILL_POLL_MS));
    const current = await admin
      .from("payment_transactions")
      .select("provider_bill_code, payment_status")
      .eq("id", paymentId)
      .single();
    if (current.error) throw current.error;
    if (current.data.provider_bill_code) return current.data.provider_bill_code as string;
    if (current.data.payment_status !== "pending") return undefined;
  }
  return undefined;
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return response({ error: "Method not allowed" }, 405);

  try {
    const supabaseUrl = requiredEnv("SUPABASE_URL").replace(/\/$/, "");
    const anonKey = requiredEnv("SUPABASE_ANON_KEY");
    const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
    const secretKey = requiredEnv("TOYYIBPAY_SECRET_KEY");
    const categoryCode = requiredEnv("TOYYIBPAY_CATEGORY_CODE");
    const applicationUrl = requiredEnv("APPLICATION_URL").replace(/\/$/, "");
    const authorization = request.headers.get("authorization") ?? "";
    if (!authorization.toLowerCase().startsWith("bearer ")) {
      return response({ error: "Unauthorized" }, 401);
    }

    const authenticated = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authorization } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const {
      data: { user },
      error: userError,
    } = await authenticated.auth.getUser();
    if (userError || !user) return response({ error: "Unauthorized" }, 401);

    const body = (await request.json()) as {
      plan?: unknown;
      idempotencyKey?: unknown;
      partnerCode?: unknown;
      referralConfirmation?: unknown;
      returnOrigin?: unknown;
    };
    if (!isCheckoutPlan(body.plan)) {
      return response({ error: "A supported billing plan is required" }, 400);
    }
    if (typeof body.idempotencyKey !== "string" || !uuidPattern.test(body.idempotencyKey)) {
      return response({ error: "A valid idempotency key is required" }, 400);
    }

    const selected = CHECKOUT_PLANS[body.plan];
    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    let confirmedPartnerId: string | undefined;
    if (body.partnerCode !== undefined || body.referralConfirmation !== undefined) {
      if (
        typeof body.partnerCode !== "string" ||
        typeof body.referralConfirmation !== "string" ||
        !validPartnerReceipt(
          body.referralConfirmation,
          user.id,
          body.partnerCode,
          requiredEnv("PARTNER_CONFIRMATION_SECRET"),
        )
      ) {
        return response({ error: "referral_confirmation_required" }, 409);
      }
      const referral = await admin
        .from("partner_referrals")
        .select("partner_user_id")
        .eq("customer_reference", user.id)
        .is("deleted_at", null)
        .maybeSingle();
      if (referral.error || !referral.data || referral.data.partner_user_id === user.id) {
        return response({ error: "referral_attribution_unverified" }, 409);
      }
      const partner = await admin
        .from("partner_profiles")
        .select("partner_code,status")
        .eq("user_id", referral.data.partner_user_id)
        .is("deleted_at", null)
        .maybeSingle();
      if (
        partner.error ||
        partner.data?.status !== "active" ||
        partner.data.partner_code !== body.partnerCode
      ) {
        return response({ error: "referral_attribution_unverified" }, 409);
      }
      confirmedPartnerId = referral.data.partner_user_id;
    }
    const insert = await admin
      .from("payment_transactions")
      .upsert(
        {
          user_id: user.id,
          provider: "toyyibpay",
          idempotency_key: body.idempotencyKey,
          plan: selected.plan,
          billing_interval: selected.interval,
          amount: selected.amount,
          currency: BILLING_CURRENCY,
          payment_status: "pending",
        },
        { onConflict: "idempotency_key", ignoreDuplicates: true },
      )
      .select("id");
    if (insert.error) throw insert.error;
    // ON CONFLICT DO NOTHING returns the row only to the request that inserted
    // it. That request alone may create this payment's bill, so simultaneous or
    // repeated requests with one key can never create two ToyyibPay bills.
    const createsBill = (insert.data?.length ?? 0) > 0;

    const paymentResult = await admin
      .from("payment_transactions")
      .select(
        "id, user_id, provider, provider_bill_code, plan, billing_interval, amount, currency, payment_status",
      )
      .eq("idempotency_key", body.idempotencyKey)
      .eq("user_id", user.id)
      .single();
    if (paymentResult.error) throw paymentResult.error;
    const payment = paymentResult.data;
    if (confirmedPartnerId) {
      // The insert trigger is deliberately fail-open for legacy callers.
      // Referred checkout must additionally verify its actual link before a bill.
      const link = await admin
        .from("partner_sandbox_checkout_links")
        .select("customer_user_id,partner_user_id")
        .eq("payment_id", payment.id)
        .maybeSingle();
      if (
        link.error ||
        link.data?.customer_user_id !== user.id ||
        link.data?.partner_user_id !== confirmedPartnerId
      ) {
        return response({ error: "referral_payment_link_unverified" }, 409);
      }
    }
    if (
      payment.provider !== "toyyibpay" ||
      payment.plan !== selected.plan ||
      payment.billing_interval !== selected.interval ||
      Math.round(Number(payment.amount) * 100) !== selected.amount * 100 ||
      String(payment.currency).toUpperCase() !== BILLING_CURRENCY
    ) {
      return response({ error: "Idempotency key conflicts with another checkout" }, 409);
    }
    if (payment.provider_bill_code) {
      return response({
        paymentId: payment.id,
        checkoutUrl: sandboxCheckoutUrl(payment.provider_bill_code),
      });
    }
    if (payment.payment_status !== "pending") {
      return response({ error: "This checkout has already been settled" }, 409);
    }
    if (!createsBill) {
      const billCode = await waitForBillCode(admin, payment.id);
      if (billCode) {
        return response({ paymentId: payment.id, checkoutUrl: sandboxCheckoutUrl(billCode) });
      }
      // Retryable: the web app asks the learner to try again, with a new key.
      return response({ error: "checkout_in_progress" }, 409);
    }

    const profileResult = await admin
      .from("profiles")
      .select("full_name, email")
      .eq("id", user.id)
      .single();
    if (profileResult.error) throw profileResult.error;
    const customerName = profileResult.data.full_name?.trim() || "AcadeMY Customer";
    const customerEmail = profileResult.data.email?.trim() || user.email?.trim();
    if (!customerEmail) return response({ error: "A customer email is required" }, 422);

    const createBillBody = new URLSearchParams({
      userSecretKey: secretKey,
      categoryCode,
      billName: selected.label.replace(/[^a-z0-9 _]/gi, "").slice(0, 30),
      billDescription: `${selected.label} subscription`.replace(/[^a-z0-9 _]/gi, "").slice(0, 100),
      billPriceSetting: "1",
      // The application profile does not require a phone number. Let ToyyibPay
      // collect any missing payer details on its checkout page instead of
      // rejecting bill creation because billPhone is empty.
      billPayorInfo: "0",
      billAmount: String(selected.amount * 100),
      // Allowlisted server-side; unknown origins fall back to production.
      billReturnUrl: paymentReturnUrl(
        body.returnOrigin,
        applicationUrl,
        Deno.env.get("PAYMENT_RETURN_PREVIEW_ORIGINS"),
      ),
      billCallbackUrl: `${supabaseUrl}/functions/v1/toyyibpay-callback`,
      billExternalReferenceNo: payment.id,
      billTo: customerName.slice(0, 100),
      billEmail: customerEmail.slice(0, 100),
      billPhone: "60111111111",
      billPaymentChannel: "0",
      billExpiryDays: "1",
    });
    const billCode = await requestToyyibPayBill(
      `${TOYYIBPAY_SANDBOX_URL}/index.php/api/createBill`,
      createBillBody,
    );

    const update = await admin
      .from("payment_transactions")
      .update({ provider_bill_code: billCode })
      .eq("id", payment.id)
      .eq("payment_status", "pending")
      .is("provider_bill_code", null)
      .select("id")
      .single();
    if (update.error) throw update.error;

    console.info(
      JSON.stringify({
        scope: "billing",
        event: "toyyibpay_sandbox_bill_created",
        paymentId: payment.id,
        billCode,
      }),
    );
    return response({ paymentId: payment.id, checkoutUrl: sandboxCheckoutUrl(billCode) });
  } catch (error) {
    console.error(
      JSON.stringify({
        scope: "billing",
        event: "toyyibpay_sandbox_bill_creation_failed",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    if (error instanceof ToyyibPayUnavailableError) {
      return response({ error: "provider_unavailable" }, 503);
    }
    return response({ error: "Checkout could not be created" }, 500);
  }
});
