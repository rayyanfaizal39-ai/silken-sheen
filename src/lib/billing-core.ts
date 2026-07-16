import type { MockPaymentOutcome, PaymentStatus } from "./billing.types";

export function generateInvoiceNumber(date: Date, sequence: number) {
  if (!Number.isSafeInteger(sequence) || sequence < 1) {
    throw new Error("Invoice sequence must be a positive integer");
  }
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `ACAD-${y}${m}${d}-${String(sequence).padStart(6, "0")}`;
}

export function assertVerifiedAmount(
  expectedAmount: number,
  expectedCurrency: string,
  verifiedAmount: number,
  verifiedCurrency: string,
) {
  if (
    Math.round(expectedAmount * 100) !== Math.round(verifiedAmount * 100) ||
    expectedCurrency.toUpperCase() !== verifiedCurrency.toUpperCase()
  ) {
    throw new Error("payment_amount_mismatch");
  }
}

export function paymentStatusForMockOutcome(outcome: MockPaymentOutcome): PaymentStatus {
  return outcome;
}

export function canAccessInvoice(requestingUserId: string, invoiceUserId: string) {
  return Boolean(requestingUserId) && requestingUserId === invoiceUserId;
}

export function isAlreadyProcessed(status: PaymentStatus) {
  return status === "successful";
}
