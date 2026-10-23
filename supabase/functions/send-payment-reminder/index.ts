import { createClient } from "npm:@supabase/supabase-js@2.108.1";
import { maskEmailAddress } from "../_shared/email-brand.ts";
import { scheduleInBackground } from "../_shared/edge-schedule.ts";
import {
  buildPaymentReminderEmail,
  paymentReminderIdempotencyKey,
  paymentReminderQueryWindow,
  paymentReminderTypeFor,
  type PaymentReminderType,
} from "../_shared/payment-reminder.ts";
import { sendWithResend } from "../_shared/resend.ts";
import { resolveWeeklyReportRecipient, usableEmail } from "../_shared/weekly-parent-report.ts";

const jsonHeaders = {
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-payment-reminder-key",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

function response(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}

type AdminClient = ReturnType<typeof createClient>;

type SubscriptionRow = {
  id: string;
  user_id: string;
  plan: string;
  billing_interval: string | null;
  amount: number | string | null;
  currency: string | null;
  current_period_end: string;
};

type DeliveryPreview = {
  maskedEmail: string;
  subject: string;
  reminderType: PaymentReminderType;
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: jsonHeaders });
  if (request.method !== "POST") return response({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  if (!supabaseUrl || !serviceRoleKey)
    return response({ error: "Email delivery is not configured" }, 500);

  const body = await request.json().catch(() => ({}));
  const action =
    body && typeof body === "object" ? (body as { action?: unknown }).action : undefined;
  if (action !== "send_due") return response({ error: "Unsupported action" }, 400);

  const cronKey = Deno.env.get("PAYMENT_REMINDER_CRON_KEY") ?? "";
  const providedCronKey = request.headers.get("x-payment-reminder-key") ?? "";
  if (!cronKey || providedCronKey !== cronKey) return response({ error: "Unauthorized" }, 401);

  const dryRun = body && typeof body === "object" && (body as { dryRun?: unknown }).dryRun === true;
  const waitForResult =
    body && typeof body === "object" && (body as { wait?: unknown }).wait === true;
  const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";
  if (!dryRun && !resendApiKey) return response({ error: "Email delivery is not configured" }, 500);

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const work = sendDueReminders(admin, resendApiKey, dryRun);
  if (!dryRun && !waitForResult && scheduleInBackground(work)) {
    return response({ accepted: true, dryRun: false });
  }
  const result = await work;
  return response(result, result.error ? 500 : 200);
});

async function sendDueReminders(
  admin: AdminClient,
  resendApiKey: string,
  dryRun: boolean,
): Promise<Record<string, unknown>> {
  const now = new Date();
  try {
    const window = paymentReminderQueryWindow(now);
    const subscriptions = await listCandidateSubscriptions(admin, window.startIso, window.endIso);
    const due = subscriptions.flatMap((row) => {
      const periodEnd = new Date(row.current_period_end);
      const reminderType = paymentReminderTypeFor(periodEnd, now);
      return reminderType ? [{ row, reminderType, periodEnd }] : [];
    });
    const profiles = await loadProfiles(
      admin,
      due.map((item) => item.row.user_id),
    );
    const deliveries = await loadDeliveries(
      admin,
      due.map((item) => item.row.id),
    );
    const counts = { sent: 0, skipped: 0, failed: 0, noRecipient: 0, wouldSend: 0, alreadySent: 0 };
    const recipients: DeliveryPreview[] = [];

    for (const item of due) {
      const profile = profiles.get(item.row.user_id);
      const parentEmail = usableEmail(profile?.parent_report_email);
      let accountEmail = usableEmail(profile?.email);
      if (!parentEmail) {
        const userResult = await admin.auth.admin.getUserById(item.row.user_id);
        accountEmail = usableEmail(userResult.data.user?.email) ?? accountEmail;
      }
      const recipient = resolveWeeklyReportRecipient(parentEmail, accountEmail);
      const existing = deliveries.find(
        (delivery) =>
          delivery.subscription_id === item.row.id &&
          delivery.reminder_type === item.reminderType &&
          sameInstant(delivery.period_end, item.row.current_period_end),
      );
      if (existing?.status === "sent") {
        counts.alreadySent += 1;
        counts.skipped += 1;
        continue;
      }
      if (!recipient) {
        counts.noRecipient += 1;
        continue;
      }

      const content = buildPaymentReminderEmail({
        reminderType: item.reminderType,
        studentName: profile?.full_name?.trim() || "Student",
        plan: item.row.plan,
        billingInterval: item.row.billing_interval,
        amount: Number(item.row.amount ?? 0),
        currency: item.row.currency || "MYR",
        periodEnd: item.periodEnd,
        sentToParent: Boolean(parentEmail),
      });
      if (dryRun) {
        counts.wouldSend += 1;
        recipients.push({
          maskedEmail: maskEmailAddress(recipient),
          subject: content.subject,
          reminderType: item.reminderType,
        });
        continue;
      }

      const claimed = await claimDelivery(admin, {
        subscriptionId: item.row.id,
        userId: item.row.user_id,
        periodEnd: item.row.current_period_end,
        reminderType: item.reminderType,
        recipient,
        hasRow: Boolean(existing),
      });
      if (!claimed) {
        counts.skipped += 1;
        continue;
      }

      try {
        const delivery = await sendWithResend(resendApiKey, {
          to: recipient,
          ...content,
          idempotencyKey: paymentReminderIdempotencyKey(
            item.row.id,
            item.row.current_period_end,
            item.reminderType,
          ),
          tags: [
            { name: "flow", value: "payment_reminder" },
            { name: "reminder_type", value: item.reminderType },
          ],
        });
        await admin
          .from("payment_reminder_deliveries")
          .update({ status: "sent", provider_message_id: delivery.id, error_message: null })
          .eq("subscription_id", item.row.id)
          .eq("period_end", item.row.current_period_end)
          .eq("reminder_type", item.reminderType);
        counts.sent += 1;
        console.info(
          JSON.stringify({
            scope: "email",
            event: "payment_reminder_sent",
            subscriptionId: item.row.id,
            reminderType: item.reminderType,
            messageId: delivery.id,
          }),
        );
      } catch (error) {
        const message =
          error instanceof Error ? error.message.slice(0, 200) : "Email delivery failed";
        await admin
          .from("payment_reminder_deliveries")
          .update({ status: "failed", error_message: message })
          .eq("subscription_id", item.row.id)
          .eq("period_end", item.row.current_period_end)
          .eq("reminder_type", item.reminderType);
        counts.failed += 1;
        console.error(
          JSON.stringify({
            scope: "email",
            event: "payment_reminder_failed",
            subscriptionId: item.row.id,
            reminderType: item.reminderType,
          }),
        );
      }
    }

    console.info(
      JSON.stringify({
        scope: "email",
        event: dryRun ? "payment_reminder_dry_run" : "payment_reminder_batch",
        due: due.length,
        ...counts,
      }),
    );
    return {
      dryRun,
      windowStart: window.startIso,
      windowEnd: window.endIso,
      checked: subscriptions.length,
      due: due.length,
      wouldSend: dryRun ? counts.wouldSend : counts.sent,
      alreadySent: counts.alreadySent,
      noRecipient: counts.noRecipient,
      failed: counts.failed,
      ...(dryRun ? { recipients } : {}),
    };
  } catch (error) {
    console.error(
      JSON.stringify({
        scope: "email",
        event: "payment_reminder_batch_failed",
        message: error instanceof Error ? error.message.slice(0, 200) : "batch failed",
      }),
    );
    return { error: "Payment reminders could not be prepared.", dryRun };
  }
}

async function listCandidateSubscriptions(
  admin: AdminClient,
  startIso: string,
  endIso: string,
): Promise<SubscriptionRow[]> {
  const pageSize = 1000;
  const rows: SubscriptionRow[] = [];
  for (let from = 0; ; from += pageSize) {
    const page = await admin
      .from("subscriptions")
      .select("id, user_id, plan, billing_interval, amount, currency, current_period_end")
      .eq("status", "active")
      .gte("current_period_end", startIso)
      .lt("current_period_end", endIso)
      .order("id", { ascending: true })
      .range(from, from + pageSize - 1);
    if (page.error) throw new Error("Could not read subscriptions");
    rows.push(...((page.data ?? []) as SubscriptionRow[]));
    if ((page.data?.length ?? 0) < pageSize) break;
  }
  return rows.filter((row) => row.current_period_end && row.user_id && row.id);
}

async function loadProfiles(admin: AdminClient, userIds: string[]) {
  const profiles = new Map<
    string,
    { full_name: string | null; parent_report_email: string | null; email: string | null }
  >();
  for (const slice of chunks(unique(userIds), 200)) {
    const result = await admin
      .from("profiles")
      .select("id, full_name, parent_report_email, email")
      .in("id", slice);
    if (result.error) throw new Error("Could not read profiles");
    for (const row of result.data ?? []) {
      profiles.set(String(row.id), {
        full_name: row.full_name ?? null,
        parent_report_email: row.parent_report_email ?? null,
        email: row.email ?? null,
      });
    }
  }
  return profiles;
}

async function loadDeliveries(admin: AdminClient, subscriptionIds: string[]) {
  const rows: Array<{
    subscription_id: string;
    period_end: string;
    reminder_type: string;
    status: string;
  }> = [];
  for (const slice of chunks(unique(subscriptionIds), 200)) {
    const result = await admin
      .from("payment_reminder_deliveries")
      .select("subscription_id, period_end, reminder_type, status")
      .in("subscription_id", slice);
    if (result.error) throw new Error("Could not read payment reminder deliveries");
    rows.push(...((result.data ?? []) as typeof rows));
  }
  return rows;
}

async function claimDelivery(
  admin: AdminClient,
  input: {
    subscriptionId: string;
    userId: string;
    periodEnd: string;
    reminderType: PaymentReminderType;
    recipient: string;
    hasRow: boolean;
  },
) {
  const claim = input.hasRow
    ? await admin
        .from("payment_reminder_deliveries")
        .update({ status: "sending", recipient_email: input.recipient, error_message: null })
        .eq("subscription_id", input.subscriptionId)
        .eq("period_end", input.periodEnd)
        .eq("reminder_type", input.reminderType)
        .neq("status", "sent")
        .select("id")
    : await admin
        .from("payment_reminder_deliveries")
        .insert({
          subscription_id: input.subscriptionId,
          user_id: input.userId,
          period_end: input.periodEnd,
          reminder_type: input.reminderType,
          recipient_email: input.recipient,
          status: "sending",
        })
        .select("id");
  return !claim.error && Boolean(claim.data?.length);
}

function sameInstant(left: string, right: string) {
  const a = new Date(left).getTime();
  const b = new Date(right).getTime();
  return Number.isFinite(a) && a === b;
}

function unique(values: string[]) {
  return [...new Set(values)];
}

function chunks<T>(values: T[], size: number) {
  const groups: T[][] = [];
  for (let index = 0; index < values.length; index += size)
    groups.push(values.slice(index, index + size));
  return groups;
}
