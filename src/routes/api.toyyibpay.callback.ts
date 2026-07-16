import { createFileRoute } from "@tanstack/react-router";
import {
  getSupabaseAdminClient,
  processVerifiedPayment,
  verifyToyyibCallbackHash,
  verifyToyyibPayTransaction,
} from "../lib/billing.server";

export const Route = createFileRoute("/api/toyyibpay/callback")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const contentType = request.headers.get("content-type") ?? "";
          const body = contentType.includes("application/json")
            ? ((await request.json()) as Record<string, unknown>)
            : Object.fromEntries((await request.formData()).entries());
          const payload = Object.fromEntries(
            Object.entries(body).map(([key, value]) => [key, String(value)]),
          );
          if (!verifyToyyibCallbackHash(payload)) {
            return new Response("invalid callback", { status: 401 });
          }

          const admin = getSupabaseAdminClient();
          const paymentResult = await admin
            .from("payment_transactions")
            .select("*")
            .eq("id", payload.order_id)
            .eq("provider", "toyyibpay")
            .eq("provider_bill_code", payload.billcode)
            .single();
          if (paymentResult.error) return new Response("payment not found", { status: 404 });

          if (payload.status !== "1") {
            const status = payload.status === "3" ? "failed" : "pending";
            const update = await admin
              .from("payment_transactions")
              .update({ payment_status: status, raw_callback_data: body })
              .eq("id", paymentResult.data.id)
              .eq("payment_status", "pending");
            if (update.error) throw update.error;
            return new Response("ok");
          }

          const verified = await verifyToyyibPayTransaction(payload.billcode);
          await processVerifiedPayment({
            paymentId: paymentResult.data.id,
            transactionId: verified.transactionId,
            amount: verified.amount,
            currency: verified.currency,
            paymentMethod: verified.paymentMethod,
            rawCallback: { callback: body, verification: verified.raw },
          });
          return new Response("ok");
        } catch (error) {
          console.error(
            JSON.stringify({
              scope: "billing",
              event: "toyyibpay_callback_failed",
              error: String(error),
            }),
          );
          return new Response("processing failed", { status: 500 });
        }
      },
    },
  },
});
