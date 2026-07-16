import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { areMockPaymentsEnabled, CHECKOUT_PLANS } from "../lib/billing-config";
import {
  createPendingPayment,
  createToyyibPayBill,
  getSupabaseAdminClient,
  processVerifiedPayment,
} from "../lib/billing.server";
import type {
  CheckoutPlan,
  MockPaymentOutcome,
  PaymentHistoryItem,
  SubscriptionOverview,
} from "../lib/billing.types";
import { getSupabaseServerClient } from "../lib/supabase.server";

export type UpgradePlan = CheckoutPlan;

const checkoutSchema = z.object({
  plan: z.enum(["pro_monthly", "pro_annual", "premium_monthly", "premium_annual"]),
  idempotencyKey: z.string().uuid(),
});

const mockSchema = z.object({
  paymentId: z.string().uuid(),
  outcome: z.enum(["successful", "failed", "cancelled"]),
});

async function requireUser() {
  const supabase = getSupabaseServerClient();
  if (!supabase) throw new Error("Supabase is not configured");
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("Must be logged in");
  return { supabase, user: data.user };
}

export const createCheckout = createServerFn({ method: "POST" })
  .validator((input: unknown) => checkoutSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabase, user } = await requireUser();
    const mock = areMockPaymentsEnabled();
    const payment = await createPendingPayment({
      userId: user.id,
      checkoutPlan: data.plan,
      provider: mock ? "mock" : "toyyibpay",
      idempotencyKey: data.idempotencyKey,
    });

    if (mock) return { mode: "mock" as const, paymentId: payment.id };

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("full_name, email")
      .eq("id", user.id)
      .single();
    if (error) throw error;
    const bill = await createToyyibPayBill(payment, {
      name: profile.full_name?.trim() || "AcadeMY Customer",
      email: profile.email?.trim() || user.email || "",
    });
    return { mode: "toyyibpay" as const, paymentId: payment.id, checkoutUrl: bill.checkoutUrl };
  });

export const simulateMockPayment = createServerFn({ method: "POST" })
  .validator((input: unknown) => mockSchema.parse(input))
  .handler(async ({ data }) => {
    if (!areMockPaymentsEnabled())
      throw new Error("Mock payments are disabled in this environment");
    const { user } = await requireUser();
    const admin = getSupabaseAdminClient();
    const { data: payment, error } = await admin
      .from("payment_transactions")
      .select("*")
      .eq("id", data.paymentId)
      .eq("user_id", user.id)
      .eq("provider", "mock")
      .single();
    if (error) throw error;

    if (data.outcome === "successful") {
      return processVerifiedPayment({
        paymentId: payment.id,
        transactionId: `MOCK-${payment.id}`,
        amount: Number(payment.amount),
        currency: payment.currency,
        paymentMethod: "mock",
        rawCallback: { development_mock: true, outcome: data.outcome },
      });
    }

    if (payment.payment_status === "pending") {
      const update = await admin
        .from("payment_transactions")
        .update({
          payment_status: data.outcome,
          raw_callback_data: { development_mock: true, outcome: data.outcome },
        })
        .eq("id", payment.id)
        .eq("payment_status", "pending");
      if (update.error) throw update.error;
    }
    return { outcome: data.outcome };
  });

export const getSubscriptionOverview = createServerFn({ method: "GET" }).handler(
  async (): Promise<SubscriptionOverview> => {
    const { supabase, user } = await requireUser();
    const [subscriptionResult, paymentsResult, invoicesResult] = await Promise.all([
      supabase.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle(),
      supabase
        .from("payment_transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("invoices")
        .select("id, invoice_number, payment_transaction_id")
        .eq("user_id", user.id),
    ]);
    if (subscriptionResult.error) throw subscriptionResult.error;
    if (paymentsResult.error) throw paymentsResult.error;
    if (invoicesResult.error) throw invoicesResult.error;
    const invoices = new Map(
      (invoicesResult.data ?? []).map((invoice) => [
        invoice.payment_transaction_id,
        { id: invoice.id, invoice_number: invoice.invoice_number },
      ]),
    );
    const payments = (paymentsResult.data ?? []).map((payment) => ({
      ...payment,
      amount: Number(payment.amount),
      invoice: invoices.get(payment.id) ?? null,
    })) as PaymentHistoryItem[];
    return {
      subscription: subscriptionResult.data
        ? { ...subscriptionResult.data, amount: Number(subscriptionResult.data.amount) }
        : null,
      payments,
      mockPaymentsEnabled: areMockPaymentsEnabled(),
    } as SubscriptionOverview;
  },
);

export const cancelSubscription = createServerFn({ method: "POST" }).handler(async () => {
  const { user } = await requireUser();
  const admin = getSupabaseAdminClient();
  const { error } = await admin.rpc("cancel_subscription_for_user", { p_user_id: user.id });
  if (error) throw error;
  return { cancelled: true };
});

export const getInvoiceDownloadUrl = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ invoiceId: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { supabase } = await requireUser();
    const invoice = await supabase
      .from("invoices")
      .select("pdf_storage_path, invoice_number")
      .eq("id", data.invoiceId)
      .single();
    if (invoice.error || !invoice.data?.pdf_storage_path)
      throw new Error("Invoice is not available");
    const admin = getSupabaseAdminClient();
    const signed = await admin.storage
      .from("invoices")
      .createSignedUrl(invoice.data.pdf_storage_path, 60, {
        download: `${invoice.data.invoice_number}.pdf`,
      });
    if (signed.error) throw signed.error;
    return { url: signed.data.signedUrl };
  });

export const billingPlans = CHECKOUT_PLANS;
export type { MockPaymentOutcome };
