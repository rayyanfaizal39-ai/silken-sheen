/**
 * Subscription-end reminders. Authorize with x-payment-reminder-key.
 * One reminder per subscription per run. A parent address is used only
 * when consent is current.
 */
import { createServiceClient, type ServiceClient } from "../_shared/service-client.ts";
import { claimDeliverySlot, claimResult, cronAuthorized } from "../_shared/delivery-claim.ts";
import { scheduleInBackground } from "../_shared/edge-schedule.ts";
import {
  runPaymentReminderBatch,
  type PaymentReminderCandidate,
  type PaymentReminderStore,
} from "../_shared/payment-reminder-batch.ts";
import {
  paymentReminderExpiredWindow,
  paymentReminderQueryWindow,
  type PaymentReminderType,
} from "../_shared/payment-reminder.ts";
import { sendWithResend } from "../_shared/resend.ts";
import { usableEmail } from "../_shared/weekly-parent-report.ts";

const jsonHeaders = {
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-payment-reminder-key",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

function response(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}

function readBody(body: unknown): { action: string | null; dryRun: boolean; wait: boolean } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { action: null, dryRun: false, wait: false };
  }
  const record = body as { action?: unknown; dryRun?: unknown; wait?: unknown };
  return {
    action: typeof record.action === "string" ? record.action : null,
    dryRun: record.dryRun === true,
    wait: record.wait === true,
  };
}

type AdminClient = ServiceClient;

type SubscriptionRow = {
  id: string;
  user_id: string;
  status: string;
  plan: string;
  billing_interval: string | null;
  amount: number | string | null;
  currency: string | null;
  current_period_end: string;
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: jsonHeaders });
  if (request.method !== "POST") return response({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  if (!supabaseUrl || !serviceRoleKey)
    return response({ error: "Email delivery is not configured" }, 500);

  const parsed = readBody(await request.json().catch(() => ({})));
  if (
    !cronAuthorized(
      Deno.env.get("PAYMENT_REMINDER_CRON_KEY") ?? "",
      request.headers.get("x-payment-reminder-key"),
    )
  ) {
    return response({ error: "Unauthorized" }, 401);
  }
  if (parsed.action !== "send_due") return response({ error: "Unsupported action" }, 400);

  const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";
  if (!parsed.dryRun && !resendApiKey)
    return response({ error: "Email delivery is not configured" }, 500);

  const admin = createServiceClient(supabaseUrl, serviceRoleKey);
  const now = new Date();
  const work = runPaymentReminderBatch(reminderStore(admin), sendReminder(resendApiKey), {
    dryRun: parsed.dryRun,
    now,
  }).catch((error): Record<string, unknown> => {
    console.error(
      JSON.stringify({
        scope: "email",
        event: "payment_reminder_batch_failed",
        message: error instanceof Error ? error.message.slice(0, 200) : "batch failed",
      }),
    );
    return { error: "Payment reminders could not be prepared.", dryRun: parsed.dryRun };
  });
  if (!parsed.dryRun && !parsed.wait && scheduleInBackground(work)) {
    return response({ accepted: true, dryRun: false });
  }
  const result = await work;
  if (!result.error) {
    console.info(
      JSON.stringify({
        scope: "email",
        event: parsed.dryRun ? "payment_reminder_dry_run" : "payment_reminder_batch",
        due: result.due,
        wouldSend: result.wouldSend,
        failed: result.failed,
        lostRace: result.lostRace,
      }),
    );
  }
  return response(result, result.error ? 500 : 200);
});

function sendReminder(resendApiKey: string) {
  return (input: {
    to: string;
    content: { subject: string; html: string; text: string };
    idempotencyKey: string;
    reminderType: PaymentReminderType;
  }) =>
    sendWithResend(resendApiKey, {
      to: input.to,
      ...input.content,
      idempotencyKey: input.idempotencyKey,
      tags: [
        { name: "flow", value: "payment_reminder" },
        { name: "reminder_type", value: input.reminderType },
      ],
    });
}

function reminderStore(admin: AdminClient): PaymentReminderStore {
  return {
    candidates: (now) => loadCandidates(admin, now),
    claim: (candidate, reminderType, recipient) =>
      claimDeliverySlot(
        {
          insert: async (row) =>
            claimResult(await admin.from("payment_reminder_deliveries").insert(row).select("id")),
          reclaim: async (filter, patch) =>
            claimResult(
              await admin
                .from("payment_reminder_deliveries")
                .update(patch)
                .eq("subscription_id", candidate.subscriptionId)
                .eq("period_end", candidate.periodEnd)
                .eq("reminder_type", reminderType)
                .or(filter)
                .select("id"),
            ),
        },
        {
          subscription_id: candidate.subscriptionId,
          user_id: candidate.userId,
          period_end: candidate.periodEnd,
          reminder_type: reminderType,
          recipient_email: recipient,
        },
      ),
    markSent: async (candidate, reminderType, messageId) => {
      await admin
        .from("payment_reminder_deliveries")
        .update({ status: "sent", provider_message_id: messageId, error_message: null })
        .eq("subscription_id", candidate.subscriptionId)
        .eq("period_end", candidate.periodEnd)
        .eq("reminder_type", reminderType);
    },
    markFailed: async (candidate, reminderType, message) => {
      await admin
        .from("payment_reminder_deliveries")
        .update({ status: "failed", error_message: message })
        .eq("subscription_id", candidate.subscriptionId)
        .eq("period_end", candidate.periodEnd)
        .eq("reminder_type", reminderType);
    },
  };
}

async function loadCandidates(admin: AdminClient, now: Date): Promise<PaymentReminderCandidate[]> {
  const activeWindow = paymentReminderQueryWindow(now);
  const expiredWindow = paymentReminderExpiredWindow(now);
  const active = await listSubscriptions(
    admin,
    "active",
    activeWindow.startIso,
    activeWindow.endIso,
  );
  const expired = await listSubscriptions(
    admin,
    "expired",
    expiredWindow.startIso,
    expiredWindow.endIso,
  );
  const rows = [...active, ...expired];
  const profiles = await loadProfiles(
    admin,
    rows.map((row) => row.user_id),
  );
  const deliveries = await loadDeliveries(
    admin,
    rows.map((row) => row.id),
  );
  const candidates: PaymentReminderCandidate[] = [];
  for (const row of rows) {
    const profile = profiles.get(row.user_id);
    let accountEmail = usableEmail(profile?.email);
    if (!accountEmail) {
      const userResult = await admin.auth.admin.getUserById(row.user_id);
      accountEmail = usableEmail(userResult.data.user?.email);
    }
    candidates.push({
      subscriptionId: row.id,
      userId: row.user_id,
      status: row.status,
      plan: row.plan,
      billingInterval: row.billing_interval,
      amount: Number(row.amount ?? 0),
      currency: row.currency || "MYR",
      periodEnd: row.current_period_end,
      studentName: profile?.full_name ?? null,
      parentReportEmail: profile?.parent_report_email ?? null,
      consentAt: profile?.parent_email_consent_at ?? null,
      consentVersion: profile?.parent_email_consent_version ?? null,
      accountEmail,
      sentTypes: deliveries
        .filter(
          (delivery) =>
            delivery.subscription_id === row.id &&
            delivery.status === "sent" &&
            sameInstant(delivery.period_end, row.current_period_end),
        )
        .map((delivery) => delivery.reminder_type),
    });
  }
  return candidates;
}

async function listSubscriptions(
  admin: AdminClient,
  status: "active" | "expired",
  startIso: string,
  endIso: string,
): Promise<SubscriptionRow[]> {
  const pageSize = 1000;
  const rows: SubscriptionRow[] = [];
  for (let from = 0; ; from += pageSize) {
    const page = await admin
      .from("subscriptions")
      .select("id, user_id, status, plan, billing_interval, amount, currency, current_period_end")
      .eq("status", status)
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
    {
      full_name: string | null;
      email: string | null;
      parent_report_email: string | null;
      parent_email_consent_at: string | null;
      parent_email_consent_version: string | null;
    }
  >();
  for (const slice of chunks(unique(userIds), 200)) {
    const result = await admin
      .from("profiles")
      .select(
        "id, full_name, email, parent_report_email, parent_email_consent_at, parent_email_consent_version",
      )
      .in("id", slice);
    if (result.error) throw new Error("Could not read profiles");
    for (const row of result.data ?? []) {
      profiles.set(String(row.id), {
        full_name: row.full_name ?? null,
        email: row.email ?? null,
        parent_report_email: row.parent_report_email ?? null,
        parent_email_consent_at: row.parent_email_consent_at ?? null,
        parent_email_consent_version: row.parent_email_consent_version ?? null,
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
