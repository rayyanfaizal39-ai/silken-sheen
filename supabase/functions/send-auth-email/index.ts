import { Webhook } from "https://esm.sh/standardwebhooks@1.0.0";
import { buildAuthEmails, type AuthHookPayload } from "../_shared/email-templates.ts";
import { sendWithResend } from "../_shared/resend.ts";

const jsonHeaders = { "Content-Type": "application/json" };

function errorResponse(message: string, status = 500) {
  return new Response(JSON.stringify({ error: { http_code: status, message } }), {
    status,
    headers: jsonHeaders,
  });
}

Deno.serve(async (request) => {
  if (request.method !== "POST") return errorResponse("Method not allowed", 405);

  const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";
  const rawHookSecret = Deno.env.get("SEND_EMAIL_HOOK_SECRET") ?? "";
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  if (!resendApiKey || !rawHookSecret || !supabaseUrl) {
    console.error("[send-auth-email] required secret is missing");
    return errorResponse("Email delivery is not configured");
  }

  const body = await request.text();
  const webhook = new Webhook(rawHookSecret.replace("v1,whsec_", ""));

  let payload: AuthHookPayload;
  try {
    payload = webhook.verify(body, Object.fromEntries(request.headers)) as AuthHookPayload;
  } catch (error) {
    console.warn("[send-auth-email] rejected invalid hook signature", error);
    return errorResponse("Invalid hook signature", 401);
  }

  try {
    const messages = buildAuthEmails(payload, supabaseUrl);
    const deliveries = await Promise.all(
      messages.map((message) =>
        sendWithResend(resendApiKey, {
          ...message,
          tags: [{ name: "flow", value: `auth_${payload.email_data.email_action_type}` }],
        }),
      ),
    );
    console.info(
      JSON.stringify({
        scope: "email",
        event: "auth_email_sent",
        actionType: payload.email_data.email_action_type,
        messageIds: deliveries.map(({ id }) => id),
      }),
    );
    return new Response(JSON.stringify({}), { status: 200, headers: jsonHeaders });
  } catch (error) {
    console.error("[send-auth-email] delivery failed", error);
    return errorResponse(error instanceof Error ? error.message : "Email delivery failed");
  }
});
