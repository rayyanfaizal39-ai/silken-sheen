import { createClient } from "npm:@supabase/supabase-js@2.108.1";
import { sendWithResend } from "../_shared/resend.ts";
import { buildWeeklyParentReportEmail } from "../_shared/weekly-parent-report-email.ts";
import {
  automatedDeliveryDecision,
  buildWeeklyParentReport,
  currentKualaLumpurWeek,
  emailedParentReportCycle,
  hasParentReportsAccess,
  resolveWeeklyReportRecipient,
  usableEmail,
  type WeeklyQuizRow,
} from "../_shared/weekly-parent-report.ts";

const jsonHeaders = {
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

function response(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}

type AdminClient = ReturnType<typeof createClient>;

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: jsonHeaders });
  if (request.method !== "POST") return response({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";
  if (!supabaseUrl || !serviceRoleKey || !anonKey || !resendApiKey) {
    return response({ error: "Email delivery is not configured" }, 500);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const cronKey = Deno.env.get("WEEKLY_PARENT_REPORT_CRON_KEY") ?? "";
  const providedCronKey = request.headers.get("x-weekly-report-key") ?? "";
  const body = await request.json().catch(() => ({}));
  const action = body && typeof body === "object" ? (body as { action?: unknown }).action : undefined;

  if (action === "send_entitled") {
    if (!cronKey || providedCronKey !== cronKey) return response({ error: "Unauthorized" }, 401);
    const dryRun = body && typeof body === "object" && (body as { dryRun?: unknown }).dryRun === true;
    const now = new Date();
    const cycle = emailedParentReportCycle(now);
    const studentIds = await entitledStudentIds(admin);
    const counts = { sent: 0, skipped: 0, failed: 0, noActivity: 0, noRecipient: 0, wouldSend: 0, withActivity: 0 };
    for (const studentId of studentIds) {
      const result = await deliverStudentReport(admin, resendApiKey, studentId, cycle.weekStart, null, {
        automated: true,
        dryRun,
        now,
      });
      if (result.quizCount > 0) counts.withActivity += 1;
      if (result.outcome === "sent") counts.sent += 1;
      else if (result.outcome === "skipped") counts.skipped += 1;
      else if (result.outcome === "no_activity") counts.noActivity += 1;
      else if (result.outcome === "no_recipient") counts.noRecipient += 1;
      else if (result.outcome === "would_send") counts.wouldSend += 1;
      else if (result.outcome !== "not_entitled") counts.failed += 1;
    }
    console.info(
      JSON.stringify({
        scope: "email",
        event: dryRun ? "weekly_parent_report_dry_run" : "weekly_parent_report_batch",
        weekStart: cycle.weekStart,
        eligible: studentIds.length,
        ...counts,
      }),
    );
    return response({
      dryRun,
      weekStart: cycle.weekStart,
      weekEnd: cycle.weekEnd,
      subjectPeriod: cycle.subjectPeriod,
      windowStart: cycle.startIso,
      windowEnd: cycle.endIso,
      eligible: studentIds.length,
      withActivity: counts.withActivity,
      noActivity: counts.noActivity,
      alreadySent: counts.skipped,
      wouldSend: dryRun ? counts.wouldSend : counts.sent,
      noRecipient: counts.noRecipient,
      failed: counts.failed,
    });
  }

  const authorization = request.headers.get("authorization") ?? "";
  if (!authorization.startsWith("Bearer ")) return response({ error: "Unauthorized" }, 401);
  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: authData, error: authError } = await userClient.auth.getUser();
  if (authError || !authData.user) return response({ error: "Unauthorized" }, 401);

  const week = currentKualaLumpurWeek(new Date());
  const result = await deliverStudentReport(admin, resendApiKey, authData.user.id, week.weekStart, authData.user.email);
  if (result.outcome === "sent") return response({ sent: true, weekStart: week.weekStart });
  if (result.outcome === "skipped") return response({ sent: false, alreadySent: true, weekStart: week.weekStart });
  if (result.outcome === "not_entitled") return response({ error: "Parent Reports are not included in this plan." }, 403);
  if (result.outcome === "no_recipient") return response({ error: "This account has no email address for the report." }, 422);
  return response({ error: "The weekly report could not be sent." }, 502);
});

async function entitledStudentIds(admin: AdminClient): Promise<string[]> {
  const subscriptions = await admin.from("subscriptions").select("user_id, plan").eq("status", "active");
  if (subscriptions.error) throw new Error("Could not read subscriptions");
  const activeByUser = new Map<string, string>();
  for (const row of subscriptions.data ?? []) {
    const userId = String(row.user_id);
    activeByUser.set(userId, String(row.plan));
  }
  const profiles = await admin.from("profiles").select("id, plan").eq("plan", "paid");
  if (profiles.error) throw new Error("Could not read profiles");
  const ids = new Set<string>();
  for (const [userId, plan] of activeByUser) {
    if (hasParentReportsAccess(plan, null)) ids.add(userId);
  }
  for (const row of profiles.data ?? []) {
    const userId = String(row.id);
    if (!activeByUser.has(userId) && hasParentReportsAccess(null, String(row.plan))) ids.add(userId);
  }
  return [...ids];
}

async function deliverStudentReport(
  admin: AdminClient,
  resendApiKey: string,
  studentId: string,
  weekStart: string,
  knownAccountEmail?: string | null,
  options?: { automated?: boolean; dryRun?: boolean; now?: Date },
): Promise<{ outcome: "sent" | "skipped" | "failed" | "not_entitled" | "no_recipient" | "no_activity" | "would_send"; quizCount: number }> {
  const done = (outcome: "sent" | "skipped" | "failed" | "not_entitled" | "no_recipient" | "no_activity" | "would_send", quizCount = 0) => ({ outcome, quizCount });
  const existing = await admin
    .from("weekly_report_deliveries")
    .select("status")
    .eq("student_id", studentId)
    .eq("week_start", weekStart)
    .maybeSingle();
  if (existing.error) return done("failed");
  if (!options?.automated && existing.data?.status === "sent") return done("skipped");

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

  let accountEmail = knownAccountEmail ?? null;
  if (!accountEmail) {
    const userResult = await admin.auth.admin.getUserById(studentId);
    accountEmail = userResult.data.user?.email ?? null;
  }
  const cycle = options?.automated ? emailedParentReportCycle(options.now ?? new Date()) : null;
  const recipient = cycle
    ? usableEmail(accountEmail)
    : resolveWeeklyReportRecipient(profileResult.data.parent_report_email, accountEmail);
  const week = cycle ?? currentKualaLumpurWeek(options?.now ?? new Date());
  const history = await admin
    .from("quiz_history")
    .select("created_at, score_pct, subject_id, chapter_key, xp_earned")
    .eq("user_id", studentId)
    .gte("created_at", week.startIso)
    .lt("created_at", week.endIso);
  if (history.error) return done("failed");
  const progress = await admin.from("user_progress").select("streak").eq("user_id", studentId).maybeSingle();
  if (progress.error) return done("failed");

  const quizzes: WeeklyQuizRow[] = (history.data ?? []).map((row) => ({
    createdAt: String(row.created_at),
    scorePct: row.score_pct as number | string | null,
    subjectId: String(row.subject_id),
    chapterKey: String(row.chapter_key),
    xpEarned: row.xp_earned as number | string | null,
  }));
  if (cycle) {
    const decision = automatedDeliveryDecision({
      entitled: true,
      existingStatus: existing.data?.status ?? null,
      hasAccountEmail: Boolean(recipient),
      quizCount: quizzes.length,
    });
    if (decision === "skipped") return done("skipped", quizzes.length);
    if (decision === "no_recipient") return done("no_recipient", quizzes.length);
    if (decision === "no_activity") return done("no_activity", quizzes.length);
    if (options?.dryRun) return done("would_send", quizzes.length);
  } else if (!recipient) {
    return done("no_recipient", quizzes.length);
  }
  if (!recipient) return done("no_recipient", quizzes.length);

  const report = buildWeeklyParentReport({
    studentName: profileResult.data.full_name?.trim() || "Student",
    streak: Number(progress.data?.streak ?? 0),
    quizzes,
    now: options?.now,
    bounds: week,
    preferRepeatedWeakness: Boolean(cycle),
  });

  const claim = existing.data
    ? await admin
        .from("weekly_report_deliveries")
        .update({ status: "sending", recipient_email: recipient, error_message: null })
        .eq("student_id", studentId)
        .eq("week_start", weekStart)
        .neq("status", "sent")
        .select("id")
    : await admin
        .from("weekly_report_deliveries")
        .insert({
          student_id: studentId,
          week_start: weekStart,
          recipient_email: recipient,
          status: "sending",
        })
        .select("id");
  if (claim.error || !claim.data?.length) return done("skipped", quizzes.length);

  try {
    const content = buildWeeklyParentReportEmail(report);
    const delivery = await sendWithResend(resendApiKey, {
      to: recipient,
      ...content,
      idempotencyKey: `academy-weekly-parent-report-${studentId}-${weekStart}`,
      tags: [{ name: "flow", value: "weekly_parent_report" }],
    });
    await admin
      .from("weekly_report_deliveries")
      .update({ status: "sent", provider_message_id: delivery.id, error_message: null })
      .eq("student_id", studentId)
      .eq("week_start", weekStart);
    console.info(
      JSON.stringify({
        scope: "email",
        event: "weekly_parent_report_sent",
        studentId,
        weekStart,
        messageId: delivery.id,
      }),
    );
    return done("sent", quizzes.length);
  } catch (error) {
    const message = error instanceof Error ? error.message.slice(0, 200) : "Email delivery failed";
    await admin
      .from("weekly_report_deliveries")
      .update({ status: "failed", error_message: message })
      .eq("student_id", studentId)
      .eq("week_start", weekStart);
    console.error(
      JSON.stringify({
        scope: "email",
        event: "weekly_parent_report_failed",
        studentId,
        weekStart,
      }),
    );
    return done("failed", quizzes.length);
  }
}
