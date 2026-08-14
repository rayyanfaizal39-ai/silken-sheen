import { createClient } from "npm:@supabase/supabase-js@2.108.1";
import { buildInvoiceEmail, type InvoiceEmailData } from "../_shared/email-templates.ts";
import { resolveInvoiceLegalDetails } from "../_shared/invoice-brand.ts";
import { generateInvoicePdf, type InvoicePdfData } from "../_shared/invoice-pdf.ts";
import { sendWithResend } from "../_shared/resend.ts";

type InvoiceRow = InvoiceEmailData & InvoicePdfData & {
  id: string;
  user_id: string;
  pdf_storage_path: string | null;
  customer_email: string;
  emailed_at: string | null;
};

const corsHeaders = {
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Origin": "*",
};
const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" };

function response(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}

function hasServiceRoleCredential(request: Request, serviceRoleKey: string) {
  const authorization = request.headers.get("authorization") ?? "";
  const apiKey = request.headers.get("apikey") ?? "";
  return authorization === `Bearer ${serviceRoleKey}` || apiKey === serviceRoleKey;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return response({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";
  if (!supabaseUrl || !anonKey || !serviceRoleKey || !resendApiKey) {
    console.error("[send-invoice-email] required secret is missing");
    return response({ error: "Email delivery is not configured" }, 500);
  }

  let invoiceId: string;
  let resend = false;
  let requestId: string | null = null;
  try {
    const body = (await request.json()) as {
      invoiceId?: unknown;
      resend?: unknown;
      requestId?: unknown;
    };
    if (typeof body.invoiceId !== "string" || !/^[0-9a-f-]{36}$/i.test(body.invoiceId)) {
      return response({ error: "A valid invoiceId is required" }, 400);
    }
    invoiceId = body.invoiceId;
    resend = body.resend === true;
    if (resend) {
      if (typeof body.requestId !== "string" || !/^[0-9a-f-]{36}$/i.test(body.requestId)) {
        return response({ error: "A valid requestId is required when resending" }, 400);
      }
      requestId = body.requestId;
    }
  } catch {
    return response({ error: "Invalid JSON body" }, 400);
  }

  const serviceRequest = hasServiceRoleCredential(request, serviceRoleKey);
  if (!serviceRequest) {
    const authorization = request.headers.get("authorization") ?? "";
    if (!authorization.toLowerCase().startsWith("bearer ")) {
      return response({ error: "You must be signed in to resend a receipt" }, 401);
    }
    if (!resend) {
      return response({ error: "Authenticated users may only resend an existing receipt" }, 403);
    }

    const authenticated = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authorization } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const {
      data: { user },
      error: userError,
    } = await authenticated.auth.getUser();
    if (userError || !user) {
      return response({ error: "You must be signed in to resend a receipt" }, 401);
    }

    const ownership = await authenticated
      .from("invoices")
      .select("id")
      .eq("id", invoiceId)
      .eq("user_id", user.id)
      .maybeSingle();
    if (ownership.error) {
      console.error("[send-invoice-email] ownership lookup failed", ownership.error);
      return response({ error: "Receipt resend is temporarily unavailable" }, 500);
    }
    if (!ownership.data) {
      return response({ error: "Invoice is not available" }, 404);
    }
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
  if (invoice.emailed_at && !resend) return response({ sent: false, reason: "already_sent" });

  try {
    let storagePath = invoice.pdf_storage_path;
    if (!storagePath) {
      const pdf = await generateInvoicePdf(
        {
          ...invoice,
          subtotal: Number(invoice.subtotal),
          tax: Number(invoice.tax),
          total: Number(invoice.total),
        },
        resolveInvoiceLegalDetails((name) => Deno.env.get(name)),
      );
      storagePath = `${invoice.user_id}/${invoice.invoice_number}.pdf`;
      const upload = await admin.storage.from("invoices").upload(storagePath, pdf, {
        contentType: "application/pdf",
        upsert: true,
      });
      if (upload.error) throw upload.error;
      const pdfUpdate = await admin
        .from("invoices")
        .update({ pdf_storage_path: storagePath })
        .eq("id", invoice.id);
      if (pdfUpdate.error) throw pdfUpdate.error;
    }
    const download = await admin.storage.from("invoices").download(storagePath);
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
      idempotencyKey: resend
        ? `academy-invoice-${invoice.invoice_number}-resend-${requestId}`
        : `academy-invoice-${invoice.invoice_number}`,
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

    let updateQuery = admin
      .from("invoices")
      .update({ emailed_at: new Date().toISOString() })
      .eq("id", invoice.id);
    if (!resend) updateQuery = updateQuery.is("emailed_at", null);
    const update = await updateQuery;
    if (update.error) throw update.error;

    console.info(
      JSON.stringify({
        scope: "email",
        event: "invoice_email_sent",
        invoiceId: invoice.id,
        resend,
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
