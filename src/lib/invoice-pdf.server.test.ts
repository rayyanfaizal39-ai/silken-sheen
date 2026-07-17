import { describe, expect, it } from "vitest";
import { generateInvoicePdf } from "./invoice-pdf.server";
import type { InvoiceData } from "./billing.types";

const invoice: InvoiceData = {
  id: "invoice-id",
  user_id: "user-id",
  invoice_number: "ACAD-20260716-000001",
  customer_name: "Test (Customer)",
  customer_email: "student@example.com",
  student_name: null,
  plan: "pro",
  billing_interval: "monthly",
  description: "AcadeMY Pro Monthly",
  period_start: "2026-07-16T00:00:00.000Z",
  period_end: "2026-08-16T00:00:00.000Z",
  subtotal: 19,
  tax: 0,
  total: 19,
  currency: "MYR",
  payment_status: "successful",
  payment_reference: "TEST-REFERENCE",
  invoice_date: "2026-07-16T00:00:00.000Z",
  pdf_storage_path: null,
  emailed_at: null,
};

describe("lightweight invoice PDF", () => {
  it("generates a compact valid PDF containing the invoice reference", async () => {
    const bytes = await generateInvoicePdf(invoice);
    const document = new TextDecoder().decode(bytes);

    expect(document.startsWith("%PDF-1.4")).toBe(true);
    expect(document.endsWith("%%EOF\n")).toBe(true);
    expect(document).toContain("ACAD-20260716-000001");
    expect(document).toContain("Test \\(Customer\\)");
    expect(bytes.byteLength).toBeLessThan(10_000);
  });
});
