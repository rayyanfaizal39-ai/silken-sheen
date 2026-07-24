import { createClient } from "npm:@supabase/supabase-js@2.108.1";
import { buildInvoiceEmail, type InvoiceEmailData } from "../_shared/email-templates.ts";
import { resolveInvoiceLegalDetails } from "../_shared/invoice-brand.ts";
import { sendWithResend } from "../_shared/resend.ts";

type InvoiceRow = InvoiceEmailData & {
  id: string;
  pdf_storage_path: string | null;
  customer_email: string;
  emailed_at: string | null;
};

const jsonHeaders = { "Content-Type": "application/json" };

function response(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}

function hasServiceRoleCredential(request: Request, serviceRoleKey: string) {
  const authorization = request.headers.get("authorization") ?? "";
  const apiKey = request.headers.get("apikey") ?? "";
  return authorization === `Bearer ${serviceRoleKey}` || apiKey === serviceRoleKey;
}

Deno.serve(async (request) => {
  if (request.method !== "POST") return response({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";
  if (!supabaseUrl || !serviceRoleKey || !resendApiKey) {
    console.error("[send-invoice-email] required secret is missing");
    return response({ error: "Email delivery is not configured" }, 500);
  }
  if (!hasServiceRoleCredential(request, serviceRoleKey)) {
    return response({ error: "Unauthorized" }, 401);
  }

  let invoiceId: string;
  try {
    const body = (await request.json()) as { invoiceId?: unknown };
    if (typeof body.invoiceId !== "string" || !/^[0-9a-f-]{36}$/i.test(body.invoiceId)) {
      return response({ error: "A valid invoiceId is required" }, 400);
    }
    invoiceId = body.invoiceId;
  } catch {
    return response({ error: "Invalid JSON body" }, 400);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const result = await admin.from("invoices").select("*").eq("id", invoiceId).single();
  if (result.error) {
    console.error("[send-invoice-email] invoice lookup failed", result.error);
    return response({ error: "Invoice not found" }, 404);
  }
  const invoice = result.data as InvoiceRow;
  if (invoice.emailed_at) return response({ sent: false, reason: "already_sent" });
  if (!invoice.pdf_storage_path) return response({ error: "Invoice PDF is not ready" }, 409);

  try {
    const download = await admin.storage.from("invoices").download(invoice.pdf_storage_path);
    if (download.error) throw download.error;
    const attachment = new Uint8Array(await download.data.arrayBuffer());
    let binary = "";
    for (const byte of attachment) binary += String.fromCharCode(byte);

    const content = buildInvoiceEmail(
      invoice,
      resolveInvoiceLegalDetails((name) => Deno.env.get(name)),
    );
    const delivery = await sendWithResend(resendApiKey, {
      to: invoice.customer_email,
      ...content,
      idempotencyKey: `academy-invoice-${invoice.invoice_number}`,
      attachments: [
        {
          filename: `${invoice.invoice_number}.pdf`,
          content: btoa(binary),
        },
      ],
      tags: [
        { name: "flow", value: "paid_invoice" },
        { name: "invoice", value: invoice.invoice_number },
      ],
    });

    const update = await admin
      .from("invoices")
      .update({ emailed_at: new Date().toISOString() })
      .eq("id", invoice.id)
      .is("emailed_at", null);
    if (update.error) throw update.error;

    console.info(
      JSON.stringify({
        scope: "email",
        event: "invoice_email_sent",
        invoiceId: invoice.id,
        messageId: delivery.id,
      }),
    );
    return response({ sent: true, id: delivery.id });
  } catch (error) {
    console.error("[send-invoice-email] delivery failed", error);
    return response(
      { error: error instanceof Error ? error.message : "Email delivery failed" },
      502,
    );
  }
});
