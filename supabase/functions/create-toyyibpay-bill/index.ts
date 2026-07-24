import { createClient } from "npm:@supabase/supabase-js@2.108.1";
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

Deno.serve(async (request) => {
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
    };
    if (!isCheckoutPlan(body.plan)) {
      return response({ error: "A supported monthly plan is required" }, 400);
    }
    if (typeof body.idempotencyKey !== "string" || !uuidPattern.test(body.idempotencyKey)) {
      return response({ error: "A valid idempotency key is required" }, 400);
    }

    const selected = CHECKOUT_PLANS[body.plan];
    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const insert = await admin.from("payment_transactions").upsert(
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
    );
    if (insert.error) throw insert.error;

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
      billPayorInfo: "1",
      billAmount: String(selected.amount * 100),
      billReturnUrl: `${applicationUrl}/payment-return`,
      billCallbackUrl: `${supabaseUrl}/functions/v1/toyyibpay-callback`,
      billExternalReferenceNo: payment.id,
      billTo: customerName.slice(0, 100),
      billEmail: customerEmail.slice(0, 100),
      billPhone: "",
      billPaymentChannel: "0",
      billExpiryDays: "1",
    });
    const billResponse = await fetch(`${TOYYIBPAY_SANDBOX_URL}/index.php/api/createBill`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: createBillBody,
    });
    if (!billResponse.ok) {
      throw new Error(`ToyyibPay bill creation failed (${billResponse.status})`);
    }
    const billPayload = (await billResponse.json()) as Array<{ BillCode?: unknown }>;
    const billCode =
      typeof billPayload[0]?.BillCode === "string" ? billPayload[0].BillCode.trim() : "";
    if (!billCode || !/^[a-z0-9_-]+$/i.test(billCode)) {
      throw new Error("ToyyibPay returned no valid bill code");
    }

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
    return response({ error: "Checkout could not be created" }, 500);
  }
});
