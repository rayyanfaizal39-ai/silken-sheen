import type { InvoiceData } from "./billing.types";
import { resolveInvoiceLegalDetails } from "../../supabase/functions/_shared/invoice-brand";
import { generateInvoicePdf as generateSharedInvoicePdf } from "../../supabase/functions/_shared/invoice-pdf";

export async function generateInvoicePdf(invoice: InvoiceData) {
  return generateSharedInvoicePdf(
    invoice,
    resolveInvoiceLegalDetails((name) => process.env[name]),
  );
}
