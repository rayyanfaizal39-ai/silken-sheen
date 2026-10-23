/**
 * Automatic monthly parent report. Authorize with x-monthly-report-key.
 * verify_jwt stays false so pg_cron can call this without a user JWT.
 */
import { createServiceClient, type ServiceClient } from "../_shared/service-client.ts";
import { claimDeliverySlot, claimResult, cronAuthorized } from "../_shared/delivery-claim.ts";
import { scheduleInBackground } from "../_shared/edge-schedule.ts";
import {
  runMonthlyParentBatch,
  type MonthlyStore,
  type MonthlyStudent,
} from "../_shared/monthly-parent-report-batch.ts";
import { previousKualaLumpurMonth, type MonthlyQuizRow } from "../_shared/monthly-parent-report.ts";
import { sendWithResend } from "../_shared/resend.ts";
import { hasParentReportsAccess, usableEmail } from "../_shared/weekly-parent-report.ts";

const jsonHeaders = {
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-monthly-report-key",
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
      Deno.env.get("MONTHLY_PARENT_REPORT_CRON_KEY") ?? "",
      request.headers.get("x-monthly-report-key"),
    )
  ) {
    return response({ error: "Unauthorized" }, 401);
  }
  if (parsed.action !== "send_previous_month")
    return response({ error: "Unsupported action" }, 400);

  const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";
  if (!parsed.dryRun && !resendApiKey)
    return response({ error: "Email delivery is not configured" }, 500);

  const admin = createServiceClient(supabaseUrl, serviceRoleKey);
  const now = new Date();
  const work = runMonthlyParentBatch(monthlyStore(admin, now), sendReport(resendApiKey), {
    dryRun: parsed.dryRun,
    now,
  }).catch((error): Record<string, unknown> => {
    console.error(
      JSON.stringify({
        scope: "email",
        event: "monthly_parent_report_batch_failed",
        message: error instanceof Error ? error.message.slice(0, 200) : "batch failed",
      }),
    );
    return { error: "Monthly parent reports could not be prepared.", dryRun: parsed.dryRun };
  });
  if (!parsed.dryRun && !parsed.wait && scheduleInBackground(work)) {
    return response({ accepted: true, dryRun: false });
  }
  const result = await work;
  if (!result.error) {
    console.info(
      JSON.stringify({
        scope: "email",
        event: parsed.dryRun ? "monthly_parent_report_dry_run" : "monthly_parent_report_batch",
        monthStart: result.monthStart,
        eligible: result.eligible,
        wouldSend: result.wouldSend,
        failed: result.failed,
        lostRace: result.lostRace,
      }),
    );
  }
  return response(result, result.error ? 500 : 200);
});

function sendReport(resendApiKey: string) {
  return (input: {
    to: string;
    content: { subject: string; html: string; text: string };
    idempotencyKey: string;
  }) =>
    sendWithResend(resendApiKey, {
      to: input.to,
      ...input.content,
      idempotencyKey: input.idempotencyKey,
      tags: [{ name: "flow", value: "parent_report_monthly" }],
    });
}

function monthlyStore(admin: AdminClient, now: Date): MonthlyStore {
  const period = previousKualaLumpurMonth(now);
  return {
    entitledStudentIds: () => entitledStudentIds(admin),
    loadStudent: async (studentId) => {
      try {
        return await loadStudent(admin, studentId, period);
      } catch {
        return null;
      }
    },
    claim: (studentId, monthStart, recipient) =>
      claimDeliverySlot(
        {
          insert: async (row) =>
            claimResult(await admin.from("monthly_report_deliveries").insert(row).select("id")),
          reclaim: async (filter, patch) =>
            claimResult(
              await admin
                .from("monthly_report_deliveries")
                .update(patch)
                .eq("student_id", studentId)
                .eq("month_start", monthStart)
                .or(filter)
                .select("id"),
            ),
        },
        {
          student_id: studentId,
          month_start: monthStart,
          recipient_email: recipient,
        },
      ),
    markSent: async (studentId, monthStart, messageId) => {
      await admin
        .from("monthly_report_deliveries")
        .update({ status: "sent", provider_message_id: messageId, error_message: null })
        .eq("student_id", studentId)
        .eq("month_start", monthStart);
    },
    markFailed: async (studentId, monthStart, message) => {
      await admin
        .from("monthly_report_deliveries")
        .update({ status: "failed", error_message: message })
        .eq("student_id", studentId)
        .eq("month_start", monthStart);
    },
  };
}

async function entitledStudentIds(admin: AdminClient): Promise<string[]> {
  const subscriptions = await admin
    .from("subscriptions")
    .select("user_id, plan")
    .eq("status", "active");
  if (subscriptions.error) throw new Error("Could not read subscriptions");
  const ids = new Set<string>();
  for (const row of subscriptions.data ?? []) {
    const userId = String(row.user_id);
    if (hasParentReportsAccess(String(row.plan), null)) ids.add(userId);
  }
  return [...ids];
}

async function loadStudent(
  admin: AdminClient,
  studentId: string,
  period: { startIso: string; endIso: string },
): Promise<MonthlyStudent | null> {
  const profileResult = await admin
    .from("profiles")
    .select("full_name, plan, email, parent_report_email, parent_email_consent_at")
    .eq("id", studentId)
    .maybeSingle();
  if (profileResult.error || !profileResult.data) return null;

  const subscriptionResult = await admin
    .from("subscriptions")
    .select("plan")
    .eq("user_id", studentId)
    .eq("status", "active")
    .maybeSingle();
  if (subscriptionResult.error) return null;

  const progress = await admin
    .from("user_progress")
    .select("xp, streak")
    .eq("user_id", studentId)
    .maybeSingle();
  if (progress.error) return null;

  const quizzes = await loadMonthQuizzes(admin, studentId, period.startIso, period.endIso);
  if (quizzes.error) return null;

  const userResult = await admin.auth.admin.getUserById(studentId);
  const accountEmail =
    usableEmail(userResult.data.user?.email) ?? usableEmail(profileResult.data.email);

  return {
    fullName: profileResult.data.full_name ?? null,
    profilePlan: profileResult.data.plan ?? null,
    subscriptionPlan: subscriptionResult.data?.plan ?? null,
    parentReportEmail: profileResult.data.parent_report_email ?? null,
    parentEmailConsentAt: profileResult.data.parent_email_consent_at ?? null,
    accountEmail,
    xp: Number(progress.data?.xp ?? 0),
    streak: Number(progress.data?.streak ?? 0),
    quizzes: quizzes.rows,
  };
}

async function loadMonthQuizzes(
  admin: AdminClient,
  studentId: string,
  startIso: string,
  endIso: string,
): Promise<{ error: boolean; rows: MonthlyQuizRow[] }> {
  const rows: MonthlyQuizRow[] = [];
  const pageSize = 1000;
  for (let from = 0; from < 20000; from += pageSize) {
    const history = await admin
      .from("quiz_history")
      .select("created_at, score_pct, subject_id, chapter_key")
      .eq("user_id", studentId)
      .gte("created_at", startIso)
      .lt("created_at", endIso)
      .order("created_at", { ascending: true })
      .range(from, from + pageSize - 1);
    if (history.error) return { error: true, rows: [] };
    const batch = history.data ?? [];
    for (const row of batch) {
      rows.push({
        createdAt: String(row.created_at),
        scorePct: row.score_pct as number | string | null,
        subjectId: String(row.subject_id),
        chapterKey: String(row.chapter_key),
      });
    }
    if (batch.length < pageSize) break;
  }
  return { error: false, rows };
}
