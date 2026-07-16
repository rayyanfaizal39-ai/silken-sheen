export type BillingPlan = "basic" | "pro" | "premium";
export type PaidBillingPlan = Exclude<BillingPlan, "basic">;
export type BillingInterval = "monthly" | "annual";
export type CheckoutPlan = `${PaidBillingPlan}_${BillingInterval}`;
export type PaymentStatus = "pending" | "successful" | "failed" | "cancelled" | "refunded";
export type SubscriptionStatus = "active" | "pending" | "expired" | "cancelled";
export type MockPaymentOutcome = "successful" | "failed" | "cancelled";

export interface SubscriptionRecord {
  id: string;
  plan: BillingPlan;
  billing_interval: BillingInterval | null;
  status: SubscriptionStatus;
  amount: number;
  currency: string;
  started_at: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  cancelled_at: string | null;
}

export interface PaymentHistoryItem {
  id: string;
  plan: PaidBillingPlan;
  billing_interval: BillingInterval;
  amount: number;
  currency: string;
  payment_status: PaymentStatus;
  provider_transaction_id: string | null;
  paid_at: string | null;
  created_at: string;
  invoice: { id: string; invoice_number: string } | null;
}

export interface SubscriptionOverview {
  subscription: SubscriptionRecord | null;
  payments: PaymentHistoryItem[];
  mockPaymentsEnabled: boolean;
}

export interface InvoiceData {
  id: string;
  user_id: string;
  invoice_number: string;
  customer_name: string;
  customer_email: string;
  student_name: string | null;
  plan: PaidBillingPlan;
  billing_interval: BillingInterval;
  description: string;
  period_start: string;
  period_end: string;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  payment_status: "successful" | "refunded";
  payment_reference: string;
  invoice_date: string;
  pdf_storage_path: string | null;
  emailed_at: string | null;
}
