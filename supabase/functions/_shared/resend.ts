import { EMAIL_FROM, EMAIL_REPLY_TO, type EmailContent } from "./email-brand.ts";

type ResendAttachment = {
  filename: string;
  content: string;
};

type SendEmailInput = EmailContent & {
  to: string | string[];
  idempotencyKey: string;
  attachments?: ResendAttachment[];
  tags?: Array<{ name: string; value: string }>;
};

export async function sendWithResend(apiKey: string, input: SendEmailInput) {
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": input.idempotencyKey,
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      reply_to: EMAIL_REPLY_TO,
      to: Array.isArray(input.to) ? input.to : [input.to],
      subject: input.subject,
      html: input.html,
      text: input.text,
      attachments: input.attachments,
      tags: input.tags,
    }),
  });

  const payload = (await response.json().catch(() => ({}))) as {
    id?: string;
    message?: string;
    error?: { message?: string };
  };
  if (!response.ok) {
    throw new Error(
      payload.message || payload.error?.message || `Resend delivery failed (${response.status})`,
    );
  }
  if (!payload.id) throw new Error("Resend returned no email id");
  return { id: payload.id };
}
