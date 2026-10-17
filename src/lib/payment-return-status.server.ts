import { isAuthRetryableFetchError, type SupabaseClient } from "@supabase/supabase-js";

export type PaymentReturnPayment = {
  paymentId: string;
  plan: "pro" | "premium";
  amount: number;
  currency: string;
  status: "pending" | "successful" | "failed" | "cancelled" | "refunded";
  invoiceNumber: string | null;
};

/**
 * - `found`: the signed-in student's own payment.
 * - `signed_out`: the server has no valid session (the browser may still show one).
 * - `not_found`: no such payment in THIS account. Deliberately identical whether
 *   the payment is another account's or does not exist, so nothing leaks.
 * - `unavailable`: a temporary failure; the payment itself is unaffected.
 */
export type PaymentReturnResult =
  | ({ state: "found" } & PaymentReturnPayment)
  | { state: "signed_out" }
  | { state: "not_found" }
  | { state: "unavailable" };

/** Status for /payment-return, scoped to the authenticated owner only. */
export async function lookupPaymentReturn(
  supabase: SupabaseClient | null,
  paymentId: string,
): Promise<PaymentReturnResult> {
  if (!supabase) return { state: "unavailable" };
  const { data, error } = await supabase.auth.getUser();
  if (error && isAuthRetryableFetchError(error)) return { state: "unavailable" };
  if (error || !data.user) return { state: "signed_out" };

  // Owner filter in addition to RLS: admins may read every row under RLS, but
  // this page must only ever show the signed-in account's own payment.
  const payment = await supabase
    .from("payment_transactions")
    .select("id, plan, amount, currency, payment_status")
    .eq("id", paymentId)
    .eq("user_id", data.user.id)
    .eq("provider", "toyyibpay")
    .maybeSingle();
  if (payment.error) return { state: "unavailable" };
  if (!payment.data) return { state: "not_found" };

  let invoiceNumber: string | null = null;
  if (payment.data.payment_status === "successful") {
    const invoice = await supabase
      .from("invoices")
      .select("invoice_number")
      .eq("payment_transaction_id", payment.data.id)
      .eq("user_id", data.user.id)
      .maybeSingle();
    // The verified payment status matters more than the invoice number.
    invoiceNumber = invoice.error ? null : (invoice.data?.invoice_number ?? null);
  }
  return {
    state: "found",
    paymentId: payment.data.id as string,
    plan: payment.data.plan as PaymentReturnPayment["plan"],
    amount: Number(payment.data.amount),
    currency: payment.data.currency as string,
    status: payment.data.payment_status as PaymentReturnPayment["status"],
    invoiceNumber,
  };
}
