import { createHash } from "node:crypto";
import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2.108.1";
import { BILLING_CURRENCY, TOYYIBPAY_SANDBOX_URL } from "../_shared/billing-config.ts";
import { resolveInvoiceLegalDetails } from "../_shared/invoice-brand.ts";
import { generateInvoicePdf } from "../_shared/invoice-pdf.ts";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function requiredEnv(name: string) {
  const value = Deno.env.get(name)?.trim();
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function constantTimeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return mismatch === 0;
}

function verifyCallbackHash(payload: Record<string, string>, secret: string) {
  const received = payload.hash?.toLowerCase() ?? "";
  if (!/^[a-f0-9]{32}$/.test(received)) return false;
  const expected = createHash("md5")
    .update(`${secret}${payload.status ?? ""}${payload.order_id ?? ""}${payload.refno ?? ""}ok`)
    .digest("hex");
  return constantTimeEqual(received, expected);
}

async function verifySandboxTransaction(
  payment: { id: string; provider_bill_code: string; amount: number; currency: string },
  callbackReference: string,
) {
  const verification = await fetch(
    `${TOYYIBPAY_SANDBOX_URL}/index.php/api/getBillTransactions`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        billCode: payment.provider_bill_code,
        billpaymentStatus: "1",
      }),
    },
  );
  if (!verification.ok) {
    throw new Error(`ToyyibPay verification failed (${verification.status})`);
  }
  const transactions = (await verification.json()) as Array<Record<string, unknown>>;
  const transaction = transactions.find(
    (item) =>
      String(item.billpaymentStatus ?? item.status_id ?? item.status) === "1" &&
      String(item.billExternalReferenceNo ?? item.order_id ?? "") === payment.id &&
      (!callbackReference ||
        !item.billpaymentInvoiceNo ||
        String(item.billpaymentInvoiceNo) === callbackReference),
  );
  if (!transaction) throw new Error("No matching successful ToyyibPay transaction was found");

  // ToyyibPay's Get Bill Transactions API returns billpaymentAmount in MYR
  // decimal units (for example "29.00"), unlike createBill's cent amount.
  const amount = Number(transaction.billpaymentAmount ?? transaction.amount);
  const transactionId = String(
    transaction.billpaymentInvoiceNo ??
      transaction.transaction_id ??
      transaction.refno ??
      callbackReference,
  );
  if (!Number.isFinite(amount) || amount <= 0 || !transactionId) {
    throw new Error("ToyyibPay verification response is incomplete");
  }
  if (
    Math.round(amount * 100) !== Math.round(Number(payment.amount) * 100) ||
    payment.currency.toUpperCase() !== BILLING_CURRENCY
  ) {
    throw new Error("payment_amount_mismatch");
  }
  return {
    amount,
    transactionId,
    paymentMethod: String(transaction.billpaymentChannel ?? "toyyibpay_sandbox"),
    raw: transaction,
  };
}

async function ensureInvoiceAssets(admin: SupabaseClient, invoiceId: string) {
  const result = await admin.from("invoices").select("*").eq("id", invoiceId).single();
  if (result.error) throw result.error;
  const invoice = {
    ...result.data,
    subtotal: Number(result.data.subtotal),
    tax: Number(result.data.tax),
    total: Number(result.data.total),
  };
  let storagePath = invoice.pdf_storage_path as string | null;

  if (!storagePath) {
    const pdf = generateInvoicePdf(
      invoice,
      resolveInvoiceLegalDetails((name) => Deno.env.get(name)),
    );
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
      .eq("id", invoice.id)
      .is("pdf_storage_path", null);
    if (update.error) throw update.error;
  }

  if (!invoice.emailed_at) {
    const delivery = await admin.functions.invoke("send-invoice-email", {
      body: { invoiceId: invoice.id },
    });
    if (delivery.error) throw new Error(`Invoice email delivery failed: ${delivery.error.message}`);
  }
}

Deno.serve(async (request) => {
  if (request.method !== "POST") return new Response("method not allowed", { status: 405 });

  try {
    const supabaseUrl = requiredEnv("SUPABASE_URL");
    const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
    const secretKey = requiredEnv("TOYYIBPAY_SECRET_KEY");
    const contentType = request.headers.get("content-type") ?? "";
    const rawBody = contentType.includes("application/json")
      ? ((await request.json()) as Record<string, unknown>)
      : Object.fromEntries((await request.formData()).entries());
    const payload = Object.fromEntries(
      Object.entries(rawBody).map(([key, value]) => [key, String(value)]),
    );
    if (!verifyCallbackHash(payload, secretKey)) {
      return new Response("invalid callback", { status: 401 });
    }
    if (
      !uuidPattern.test(payload.order_id ?? "") ||
      !/^[a-z0-9_-]+$/i.test(payload.billcode ?? "")
    ) {
      return new Response("invalid payment reference", { status: 400 });
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const paymentResult = await admin
      .from("payment_transactions")
      .select("*")
      .eq("id", payload.order_id)
      .eq("provider", "toyyibpay")
      .eq("provider_bill_code", payload.billcode)
      .single();
    if (paymentResult.error) return new Response("payment not found", { status: 404 });
    const payment = {
      ...paymentResult.data,
      amount: Number(paymentResult.data.amount),
    };

    if (payload.status !== "1") {
      const paymentStatus = payload.status === "3" ? "failed" : "pending";
      const update = await admin
        .from("payment_transactions")
        .update({ payment_status: paymentStatus, raw_callback_data: rawBody })
        .eq("id", payment.id)
        .eq("payment_status", "pending");
      if (update.error) throw update.error;
      return new Response("ok");
    }

    const verified = await verifySandboxTransaction(payment, payload.refno ?? "");
    if (
      payment.payment_status === "successful" &&
      payment.provider_transaction_id !== verified.transactionId
    ) {
      throw new Error("duplicate_callback_transaction_mismatch");
    }
    const profileResult = await admin
      .from("profiles")
      .select("full_name, email")
      .eq("id", payment.user_id)
      .single();
    if (profileResult.error) throw profileResult.error;
    const customerEmail = profileResult.data.email?.trim();
    if (!customerEmail) throw new Error("Customer email is missing");

    const processResult = await admin.rpc("process_verified_payment", {
      p_payment_id: payment.id,
      p_provider_transaction_id: verified.transactionId,
      p_verified_amount: verified.amount,
      p_verified_currency: BILLING_CURRENCY,
      p_payment_method: verified.paymentMethod,
      p_raw_callback_data: { callback: rawBody, verification: verified.raw, sandbox: true },
      p_customer_name: profileResult.data.full_name?.trim() || "AcadeMY Customer",
      p_customer_email: customerEmail,
      p_student_name: null,
    });
    if (processResult.error) throw processResult.error;
    const processed = Array.isArray(processResult.data)
      ? processResult.data[0]
      : processResult.data;
    if (!processed?.invoice_id) throw new Error("Invoice processing returned no invoice");

    await ensureInvoiceAssets(admin, processed.invoice_id);
    console.info(
      JSON.stringify({
        scope: "billing",
        event: "toyyibpay_sandbox_payment_processed",
        paymentId: payment.id,
        invoiceId: processed.invoice_id,
        duplicate: Boolean(processed.already_processed),
      }),
    );
    return new Response("ok");
  } catch (error) {
    console.error(
      JSON.stringify({
        scope: "billing",
        event: "toyyibpay_sandbox_callback_failed",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return new Response("processing failed", { status: 500 });
  }
});
