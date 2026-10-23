import { createClient } from "npm:@supabase/supabase-js@2.108.1";
import { maskEmailAddress } from "../_shared/email-brand.ts";
import { scheduleInBackground } from "../_shared/edge-schedule.ts";
import { buildParentReportEmail, type ParentReportEmailData } from "../_shared/email-templates.ts";
import {
  previousKualaLumpurMonth,
  rankNameForXp,
  summarizeMonthlyQuizzes,
  type MonthlyQuizRow,
} from "../_shared/monthly-parent-report.ts";
import { sendWithResend } from "../_shared/resend.ts";
import {
  hasParentReportsAccess,
  resolveWeeklyReportRecipient,
  usableEmail,
} from "../_shared/weekly-parent-report.ts";

type ParentReportRequest = Omit<ParentReportEmailData, "dashboardUrl" | "automatic"> & {
  to: string;
};

const jsonHeaders = {
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-monthly-report-key",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

const DASHBOARD_URL = "https://myacademy.my/parent-dashboard";

function response(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}

function asText(value: unknown, name: string, max: number) {
  if (typeof value !== "string" || !value.trim() || value.length > max) {
    throw new Error(`${name} is invalid`);
  }
  return value.trim();
}

function asNumber(value: unknown, name: string, min: number, max: number) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max) {
    throw new Error(`${name} is invalid`);
  }
  return Math.round(value);
}

function parseReport(value: unknown): ParentReportRequest {
  if (!value || typeof value !== "object") throw new Error("Report payload is invalid");
  const body = value as Record<string, unknown>;
  if (body.cadence === "weekly") throw new Error("Parent reports are monthly.");
  if (body.cadence !== "monthly") throw new Error("cadence is invalid");
  const to = asText(body.to, "to", 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) throw new Error("to is invalid");
  const strongestValue = body.strongest;
  const strongest =
    strongestValue && typeof strongestValue === "object"
      ? {
          name: asText((strongestValue as Record<string, unknown>).name, "strongest.name", 80),
          avgScore: asNumber(
            (strongestValue as Record<string, unknown>).avgScore,
            "strongest.avgScore",
            0,
            100,
          ),
        }
      : null;
  const weakSpots = Array.isArray(body.weakSpots)
    ? body.weakSpots.slice(0, 5).map((spotValue, index) => {
        if (!spotValue || typeof spotValue !== "object") {
          throw new Error(`weakSpots[${index}] is invalid`);
        }
        const spot = spotValue as Record<string, unknown>;
        return {
          subjectName: asText(spot.subjectName, `weakSpots[${index}].subjectName`, 80),
          chapterLabel: asText(spot.chapterLabel, `weakSpots[${index}].chapterLabel`, 120),
          avgScore: asNumber(spot.avgScore, `weakSpots[${index}].avgScore`, 0, 100),
        };
      })
    : [];

  return {
    to,
    cadence: "monthly",
    studentName: asText(body.studentName, "studentName", 100),
    periodLabel: asText(body.periodLabel, "periodLabel", 80),
    totalQuizzes: asNumber(body.totalQuizzes, "totalQuizzes", 0, 10000),
    overallAvg: asNumber(body.overallAvg, "overallAvg", 0, 100),
    passRate: asNumber(body.passRate, "passRate", 0, 100),
    rankName: asText(body.rankName, "rankName", 80),
    totalXp: asNumber(body.totalXp, "totalXp", 0, 100000000),
    studyStreak: asNumber(body.studyStreak, "studyStreak", 0, 100000),
    strongest,
    weakSpots,
    recommendation: asText(body.recommendation, "recommendation", 500),
  };
}

async function sha256(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

type AdminClient = ReturnType<typeof createClient>;

type DeliveryOutcome =
  | "sent"
  | "skipped"
  | "failed"
  | "not_entitled"
  | "no_recipient"
  | "no_activity"
  | "would_send";

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: jsonHeaders });
  if (request.method !== "POST") return response({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const body = await request.json().catch(() => ({}));
  const action =
    body && typeof body === "object" ? (body as { action?: unknown }).action : undefined;

  if (action === "send_previous_month") {
    if (!supabaseUrl || !serviceRoleKey) {
      return response({ error: "Email delivery is not configured" }, 500);
    }
    const cronKey = Deno.env.get("MONTHLY_PARENT_REPORT_CRON_KEY") ?? "";
    const providedCronKey = request.headers.get("x-monthly-report-key") ?? "";
    if (!cronKey || providedCronKey !== cronKey) return response({ error: "Unauthorized" }, 401);
    const dryRun =
      body && typeof body === "object" && (body as { dryRun?: unknown }).dryRun === true;
    const waitForResult =
      body && typeof body === "object" && (body as { wait?: unknown }).wait === true;
    const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";
    if (!dryRun && !resendApiKey)
      return response({ error: "Email delivery is not configured" }, 500);
    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const work = runMonthlyBatch(admin, resendApiKey, dryRun);
    if (!dryRun && !waitForResult && scheduleInBackground(work)) {
      return response({ accepted: true, dryRun: false });
    }
    const result = await work;
    return response(result, result.error ? 500 : 200);
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";
  const authorization = request.headers.get("authorization") ?? "";
  if (!supabaseUrl || !serviceRoleKey || !anonKey || !resendApiKey) {
    return response({ error: "Email delivery is not configured" }, 500);
  }
  if (!authorization.startsWith("Bearer ")) return response({ error: "Unauthorized" }, 401);

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: authData, error: authError } = await userClient.auth.getUser();
  if (authError || !authData.user) return response({ error: "Unauthorized" }, 401);

  let report: ParentReportRequest;
  try {
    report = parseReport(body);
  } catch (error) {
    return response({ error: error instanceof Error ? error.message : "Invalid report" }, 400);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const recent = await admin
    .from("email_delivery_attempts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", authData.user.id)
    .eq("flow", "parent_report")
    .gte("created_at", since);
  if (recent.error) return response({ error: "Could not verify the email rate limit" }, 500);
  if ((recent.count ?? 0) >= 5) {
    return response({ error: "You can send up to five parent reports per hour." }, 429);
  }

  const recipientHash = await sha256(report.to);
  const attempt = await admin.from("email_delivery_attempts").insert({
    user_id: authData.user.id,
    flow: "parent_report",
    recipient_hash: recipientHash,
  });
  if (attempt.error) return response({ error: "Could not record the email attempt" }, 500);

  try {
    const content = buildParentReportEmail({
      ...report,
      dashboardUrl: DASHBOARD_URL,
    });
    const delivery = await sendWithResend(resendApiKey, {
      to: report.to,
      ...content,
      idempotencyKey: `academy-parent-report-${authData.user.id}-${Date.now()}`,
      tags: [{ name: "flow", value: "parent_report_manual" }],
    });
    console.info(
      JSON.stringify({
        scope: "email",
        event: "parent_report_sent",
        userId: authData.user.id,
        messageId: delivery.id,
      }),
    );
    return response({ sent: true, id: delivery.id });
  } catch (error) {
    console.error("[send-parent-report] delivery failed", error);
    return response(
      { error: error instanceof Error ? error.message : "Email delivery failed" },
      502,
    );
  }
});

async function runMonthlyBatch(
  admin: AdminClient,
  resendApiKey: string,
  dryRun: boolean,
): Promise<Record<string, unknown>> {
  const now = new Date();
  const period = previousKualaLumpurMonth(now);
  try {
    const studentIds = await entitledStudentIds(admin);
    const counts = {
      sent: 0,
      skipped: 0,
      failed: 0,
      noActivity: 0,
      noRecipient: 0,
      wouldSend: 0,
      withActivity: 0,
    };
    const recipients: Array<{ maskedEmail: string; subject: string }> = [];
    for (const studentId of studentIds) {
      const result = await deliverMonthlyReport(admin, resendApiKey, studentId, period, dryRun);
      if (result.quizCount > 0) counts.withActivity += 1;
      if (result.outcome === "sent") counts.sent += 1;
      else if (result.outcome === "skipped") counts.skipped += 1;
      else if (result.outcome === "no_activity") counts.noActivity += 1;
      else if (result.outcome === "no_recipient") counts.noRecipient += 1;
      else if (result.outcome === "would_send") {
        counts.wouldSend += 1;
        if (result.preview) recipients.push(result.preview);
      } else if (result.outcome !== "not_entitled") counts.failed += 1;
    }
    console.info(
      JSON.stringify({
        scope: "email",
        event: dryRun ? "monthly_parent_report_dry_run" : "monthly_parent_report_batch",
        monthStart: period.monthStart,
        eligible: studentIds.length,
        ...counts,
      }),
    );
    return {
      dryRun,
      monthStart: period.monthStart,
      periodLabel: period.periodLabel,
      windowStart: period.startIso,
      windowEnd: period.endIso,
      eligible: studentIds.length,
      withActivity: counts.withActivity,
      noActivity: counts.noActivity,
      alreadySent: counts.skipped,
      wouldSend: dryRun ? counts.wouldSend : counts.sent,
      noRecipient: counts.noRecipient,
      failed: counts.failed,
      ...(dryRun ? { recipients } : {}),
    };
  } catch (error) {
    console.error(
      JSON.stringify({
        scope: "email",
        event: "monthly_parent_report_batch_failed",
        message: error instanceof Error ? error.message.slice(0, 200) : "batch failed",
      }),
    );
    return { error: "Monthly parent reports could not be prepared.", dryRun };
  }
}

async function entitledStudentIds(admin: AdminClient): Promise<string[]> {
  const subscriptions = await admin
    .from("subscriptions")
    .select("user_id, plan")
    .eq("status", "active");
  if (subscriptions.error) throw new Error("Could not read subscriptions");
  const activeByUser = new Map<string, string>();
  for (const row of subscriptions.data ?? []) {
    activeByUser.set(String(row.user_id), String(row.plan));
  }
  const profiles = await admin.from("profiles").select("id, plan").eq("plan", "paid");
  if (profiles.error) throw new Error("Could not read profiles");
  const ids = new Set<string>();
  for (const [userId, plan] of activeByUser) {
    if (hasParentReportsAccess(plan, null)) ids.add(userId);
  }
  for (const row of profiles.data ?? []) {
    const userId = String(row.id);
    if (!activeByUser.has(userId) && hasParentReportsAccess(null, String(row.plan)))
      ids.add(userId);
  }
  return [...ids];
}

async function deliverMonthlyReport(
  admin: AdminClient,
  resendApiKey: string,
  studentId: string,
  period: ReturnType<typeof previousKualaLumpurMonth>,
  dryRun: boolean,
): Promise<{
  outcome: DeliveryOutcome;
  quizCount: number;
  preview?: { maskedEmail: string; subject: string };
}> {
  const done = (
    outcome: DeliveryOutcome,
    quizCount = 0,
    preview?: { maskedEmail: string; subject: string },
  ) => ({ outcome, quizCount, preview });

  const existing = await admin
    .from("monthly_report_deliveries")
    .select("status")
    .eq("student_id", studentId)
    .eq("month_start", period.monthStart)
    .maybeSingle();
  if (existing.error) return done("failed");

  const profileResult = await admin
    .from("profiles")
    .select("full_name, plan, parent_report_email")
    .eq("id", studentId)
    .maybeSingle();
  if (profileResult.error || !profileResult.data) return done("failed");

  const subscriptionResult = await admin
    .from("subscriptions")
    .select("plan")
    .eq("user_id", studentId)
    .eq("status", "active")
    .maybeSingle();
  if (subscriptionResult.error) return done("failed");
  if (!hasParentReportsAccess(subscriptionResult.data?.plan ?? null, profileResult.data.plan)) {
    return done("not_entitled");
  }

  const userResult = await admin.auth.admin.getUserById(studentId);
  const accountEmail = usableEmail(userResult.data.user?.email ?? null);
  const recipient = resolveWeeklyReportRecipient(
    profileResult.data.parent_report_email,
    accountEmail,
  );
  if (!recipient) return done("no_recipient");

  const quizzes = await loadMonthQuizzes(admin, studentId, period.startIso, period.endIso);
  if (quizzes.error) return done("failed");
  const summary = summarizeMonthlyQuizzes(quizzes.rows);
  if (summary.totalQuizzes === 0) return done("no_activity");
  if (existing.data?.status === "sent") return done("skipped", summary.totalQuizzes);
  const progress = await admin
    .from("user_progress")
    .select("xp, streak")
    .eq("user_id", studentId)
    .maybeSingle();
  if (progress.error) return done("failed");
  const totalXp = Number(progress.data?.xp ?? 0);
  const studyStreak = Number(progress.data?.streak ?? 0);
  const content = buildParentReportEmail({
    cadence: "monthly",
    automatic: true,
    studentName: profileResult.data.full_name?.trim() || "Student",
    periodLabel: period.periodLabel,
    totalQuizzes: summary.totalQuizzes,
    overallAvg: summary.overallAvg,
    passRate: summary.passRate,
    rankName: rankNameForXp(totalXp),
    totalXp: Number.isFinite(totalXp) ? Math.max(0, Math.round(totalXp)) : 0,
    studyStreak: Number.isFinite(studyStreak) ? Math.max(0, Math.round(studyStreak)) : 0,
    strongest: summary.strongest,
    weakSpots: summary.weakSpots,
    recommendation: summary.recommendation,
    dashboardUrl: DASHBOARD_URL,
  });
  if (dryRun) {
    return done("would_send", summary.totalQuizzes, {
      maskedEmail: maskEmailAddress(recipient),
      subject: content.subject,
    });
  }

  const claim = existing.data
    ? await admin
        .from("monthly_report_deliveries")
        .update({ status: "sending", recipient_email: recipient, error_message: null })
        .eq("student_id", studentId)
        .eq("month_start", period.monthStart)
        .neq("status", "sent")
        .select("id")
    : await admin
        .from("monthly_report_deliveries")
        .insert({
          student_id: studentId,
          month_start: period.monthStart,
          recipient_email: recipient,
          status: "sending",
        })
        .select("id");
  if (claim.error || !claim.data?.length) return done("skipped", summary.totalQuizzes);

  try {
    const delivery = await sendWithResend(resendApiKey, {
      to: recipient,
      ...content,
      idempotencyKey: `academy-monthly-parent-report-${studentId}-${period.monthStart}`,
      tags: [{ name: "flow", value: "parent_report_monthly" }],
    });
    await admin
      .from("monthly_report_deliveries")
      .update({ status: "sent", provider_message_id: delivery.id, error_message: null })
      .eq("student_id", studentId)
      .eq("month_start", period.monthStart);
    console.info(
      JSON.stringify({
        scope: "email",
        event: "monthly_parent_report_sent",
        studentId,
        monthStart: period.monthStart,
        messageId: delivery.id,
      }),
    );
    return done("sent", summary.totalQuizzes);
  } catch (error) {
    const message = error instanceof Error ? error.message.slice(0, 200) : "Email delivery failed";
    await admin
      .from("monthly_report_deliveries")
      .update({ status: "failed", error_message: message })
      .eq("student_id", studentId)
      .eq("month_start", period.monthStart);
    console.error(
      JSON.stringify({
        scope: "email",
        event: "monthly_parent_report_failed",
        studentId,
        monthStart: period.monthStart,
      }),
    );
    return done("failed", summary.totalQuizzes);
  }
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
