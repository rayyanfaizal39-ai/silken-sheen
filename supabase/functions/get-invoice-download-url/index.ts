import { createClient } from "npm:@supabase/supabase-js@2.108.1";
import { resolveInvoiceLegalDetails } from "../_shared/invoice-brand.ts";
import { generateInvoicePdf } from "../_shared/invoice-pdf.ts";

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

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return response({ error: "Method not allowed" }, 405);

  try {
    const supabaseUrl = requiredEnv("SUPABASE_URL").replace(/\/$/, "");
    const anonKey = requiredEnv("SUPABASE_ANON_KEY");
    const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
    const authorization = request.headers.get("authorization") ?? "";
    if (!authorization.toLowerCase().startsWith("bearer ")) {
      return response({ error: "You must be signed in to download a receipt" }, 401);
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
      return response({ error: "You must be signed in to download a receipt" }, 401);
    }

    const body = (await request.json()) as { invoiceId?: unknown };
    if (typeof body.invoiceId !== "string" || !uuidPattern.test(body.invoiceId)) {
      return response({ error: "A valid invoice ID is required" }, 400);
    }

    const invoiceResult = await authenticated
      .from("invoices")
      .select("*")
      .eq("id", body.invoiceId)
      .eq("user_id", user.id)
      .maybeSingle();
    if (invoiceResult.error) throw invoiceResult.error;
    if (!invoiceResult.data) {
      return response({ error: "Invoice is not available" }, 404);
    }
    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    let storagePath = invoiceResult.data.pdf_storage_path as string | null;
    if (!storagePath) {
      const invoice = {
        ...invoiceResult.data,
        subtotal: Number(invoiceResult.data.subtotal),
        tax: Number(invoiceResult.data.tax),
        total: Number(invoiceResult.data.total),
      };
      const pdf = await generateInvoicePdf(
        invoice,
        resolveInvoiceLegalDetails((name) => Deno.env.get(name)),
      );
      storagePath = `${user.id}/${invoice.invoice_number}.pdf`;
      const upload = await admin.storage.from("invoices").upload(storagePath, pdf, {
        contentType: "application/pdf",
        upsert: true,
      });
      if (upload.error) throw upload.error;
      const update = await admin
        .from("invoices")
        .update({ pdf_storage_path: storagePath })
        .eq("id", invoice.id)
        .eq("user_id", user.id);
      if (update.error) throw update.error;
    }
    const signed = await admin.storage
      .from("invoices")
      .createSignedUrl(storagePath, 60, {
        download: `${invoiceResult.data.invoice_number}.pdf`,
      });
    if (signed.error) throw signed.error;

    return response({ url: signed.data.signedUrl });
  } catch (error) {
    console.error(
      JSON.stringify({
        scope: "billing",
        event: "invoice_download_url_failed",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return response({ error: "Receipt download is temporarily unavailable" }, 500);
  }
});
