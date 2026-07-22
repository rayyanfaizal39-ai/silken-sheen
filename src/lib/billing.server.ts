import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createHash, timingSafeEqual } from "node:crypto";
import { CHECKOUT_PLANS, BILLING_CURRENCY } from "./billing-config";
import { assertVerifiedAmount } from "./billing-core";
import { generateInvoicePdf } from "./invoice-pdf.server";
import type { CheckoutPlan, InvoiceData, PaymentStatus } from "./billing.types";

type PaymentRow = {
  id: string;
  user_id: string;
  provider: "mock" | "toyyibpay";
  provider_bill_code: string | null;
  provider_transaction_id: string | null;
  plan: "pro" | "premium";
  billing_interval: "monthly" | "annual";
  amount: number;
  currency: string;
  payment_status: PaymentStatus;
};

export function getSupabaseAdminClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service-role configuration is missing");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function createPendingPayment(input: {
  userId: string;
  checkoutPlan: CheckoutPlan;
  provider: "mock" | "toyyibpay";
  idempotencyKey: string;
}) {
  const admin = getSupabaseAdminClient();
  const selected = CHECKOUT_PLANS[input.checkoutPlan];
  const { data, error } = await admin
    .from("payment_transactions")
    .upsert(
      {
        user_id: input.userId,
        provider: input.provider,
        idempotency_key: input.idempotencyKey,
        plan: selected.plan,
        billing_interval: selected.interval,
        amount: selected.amount,
        currency: BILLING_CURRENCY,
        payment_status: "pending",
      },
      { onConflict: "idempotency_key", ignoreDuplicates: true },
    )
    .select("*")
    .maybeSingle();
  if (error) throw error;
  if (data) return data as PaymentRow;

  const existing = await admin
    .from("payment_transactions")
    .select("*")
    .eq("idempotency_key", input.idempotencyKey)
    .eq("user_id", input.userId)
    .single();
  if (existing.error) throw existing.error;
  return existing.data as PaymentRow;
}

function logBilling(event: string, context: Record<string, unknown>) {
  console.info(JSON.stringify({ scope: "billing", event, ...context }));
}

export async function processVerifiedPayment(input: {
  paymentId: string;
  transactionId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  rawCallback: Record<string, unknown>;
}) {
  const admin = getSupabaseAdminClient();
  const paymentResult = await admin
    .from("payment_transactions")
    .select("*")
    .eq("id", input.paymentId)
    .single();
  if (paymentResult.error) throw paymentResult.error;
  const payment = paymentResult.data as PaymentRow;
  assertVerifiedAmount(Number(payment.amount), payment.currency, input.amount, input.currency);

  const { data: profile, error: profileError } = await admin
    .from("profiles")
    .select("full_name, email")
    .eq("id", payment.user_id)
    .single();
  if (profileError) throw profileError;
  const customerName = profile.full_name?.trim() || "AcadeMY Customer";
  const customerEmail = profile.email?.trim();
  if (!customerEmail) throw new Error("Customer email is missing");

  const { data: processed, error: processError } = await admin.rpc("process_verified_payment", {
    p_payment_id: payment.id,
    p_provider_transaction_id: input.transactionId,
    p_verified_amount: input.amount,
    p_verified_currency: input.currency,
    p_payment_method: input.paymentMethod,
    p_raw_callback_data: input.rawCallback,
    p_customer_name: customerName,
    p_customer_email: customerEmail,
    p_student_name: null,
  });
  if (processError) throw processError;
  const result = Array.isArray(processed) ? processed[0] : processed;
  if (!result?.invoice_id) throw new Error("Invoice processing returned no invoice");

  await ensureInvoiceAssets(result.invoice_id);
  logBilling("payment_processed", {
    paymentId: payment.id,
    invoiceId: result.invoice_id,
    duplicate: Boolean(result.already_processed),
  });
  return { invoiceId: result.invoice_id as string, duplicate: Boolean(result.already_processed) };
}

async function ensureInvoiceAssets(invoiceId: string) {
  const admin = getSupabaseAdminClient();
  const { data, error } = await admin.from("invoices").select("*").eq("id", invoiceId).single();
  if (error) throw error;
  const invoice = data as InvoiceData;
  let storagePath = invoice.pdf_storage_path;

  if (!storagePath) {
    const pdf = await generateInvoicePdf(invoice);
    storagePath = `${invoice.user_id}/${invoice.invoice_number}.pdf`;
    const upload = await admin.storage.from("invoices").upload(storagePath, pdf, {
      contentType: "application/pdf",
      upsert: false,
    });
    if (upload.error && !upload.error.message.toLowerCase().includes("already exists")) {
      throw upload.error;
    }
    const update = await admin
      .from("invoices")
      .update({ pdf_storage_path: storagePath })
      .eq("id", invoice.id);
    if (update.error) throw update.error;
  }

  if (!invoice.emailed_at) {
    const delivery = await admin.functions.invoke("send-invoice-email", {
      body: { invoiceId: invoice.id },
    });
    if (delivery.error) throw new Error(`Invoice email delivery failed: ${delivery.error.message}`);
  }
}

function toyyibBaseUrl() {
  return (process.env.TOYYIBPAY_API_URL ?? "https://dev.toyyibpay.com").replace(/\/$/, "");
}

export async function createToyyibPayBill(
  payment: PaymentRow,
  customer: { name: string; email: string },
) {
  const secret = process.env.TOYYIBPAY_SECRET_KEY;
  const categoryCode = process.env.TOYYIBPAY_CATEGORY_CODE;
  const appUrl = process.env.APPLICATION_URL?.replace(/\/$/, "");
  if (!secret || !categoryCode || !appUrl) throw new Error("ToyyibPay is not configured");

  const body = new URLSearchParams({
    userSecretKey: secret,
    categoryCode,
    billName: `AcadeMY ${payment.plan}`.slice(0, 30),
    billDescription: `AcadeMY ${payment.plan} ${payment.billing_interval}`.slice(0, 100),
    billPriceSetting: "1",
    billPayorInfo: "1",
    billAmount: String(Math.round(Number(payment.amount) * 100)),
    billReturnUrl: `${appUrl}/upgrade?payment=returned`,
    billCallbackUrl: `${appUrl}/api/toyyibpay/callback`,
    billExternalReferenceNo: payment.id,
    billTo: customer.name.slice(0, 100),
    billEmail: customer.email.slice(0, 100),
    billPhone: "",
  });
  const response = await fetch(`${toyyibBaseUrl()}/index.php/api/createBill`, {
    method: "POST",
    body,
  });
  if (!response.ok) throw new Error(`ToyyibPay bill creation failed (${response.status})`);
  const payload = (await response.json()) as Array<{ BillCode?: string }>;
  const billCode = payload[0]?.BillCode;
  if (!billCode) throw new Error("ToyyibPay returned no bill code");
  const admin = getSupabaseAdminClient();
  const update = await admin
    .from("payment_transactions")
    .update({ provider_bill_code: billCode })
    .eq("id", payment.id);
  if (update.error) throw update.error;
  return { billCode, checkoutUrl: `${toyyibBaseUrl()}/${billCode}` };
}

export function verifyToyyibCallbackHash(payload: Record<string, string>) {
  const secret = process.env.TOYYIBPAY_SECRET_KEY;
  if (!secret || !payload.hash) return false;
  const expected = createHash("md5")
    .update(`${secret}${payload.status ?? ""}${payload.order_id ?? ""}${payload.refno ?? ""}ok`)
    .digest("hex");
  const received = payload.hash.toLowerCase();
  return (
    received.length === expected.length &&
    timingSafeEqual(Buffer.from(received), Buffer.from(expected))
  );
}

export async function verifyToyyibPayTransaction(billCode: string) {
  const response = await fetch(`${toyyibBaseUrl()}/index.php/api/getBillTransactions`, {
    method: "POST",
    body: new URLSearchParams({ billCode, billpaymentStatus: "1" }),
  });
  if (!response.ok) throw new Error(`ToyyibPay verification failed (${response.status})`);
  const transactions = (await response.json()) as Array<Record<string, unknown>>;
  const successful = transactions.find(
    (item) => String(item.billpaymentStatus ?? item.status_id ?? item.status) === "1",
  );
  if (!successful) throw new Error("ToyyibPay payment is not successful");
  const cents = Number(successful.billpaymentAmount);
  const amount = Number.isFinite(cents) ? cents / 100 : Number(successful.amount);
  const transactionId = String(
    successful.billpaymentInvoiceNo ?? successful.transaction_id ?? successful.refno ?? "",
  );
  if (!Number.isFinite(amount) || !transactionId)
    throw new Error("ToyyibPay verification response is incomplete");
  return {
    amount,
    currency: BILLING_CURRENCY,
    transactionId,
    paymentMethod: String(successful.billpaymentChannel ?? "toyyibpay"),
    raw: successful,
  };
}
