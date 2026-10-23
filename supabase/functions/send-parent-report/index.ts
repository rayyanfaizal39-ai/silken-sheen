/**
 * Manual parent progress report for the signed-in student.
 * The gateway requires a user JWT (verify_jwt = true). This function builds
 * the previous calendar month itself and sends to the saved parent
 * address when that address is a valid email, otherwise to the student's own email.
 * The monthly cron uses send-monthly-parent-report.
 */
import { createClient } from "npm:@supabase/supabase-js@2.108.1";
import { createServiceClient, type ServiceClient } from "../_shared/service-client.ts";
import {
  runManualParentReport,
  type MonthlyStudent,
} from "../_shared/monthly-parent-report-batch.ts";
import { previousKualaLumpurMonth, type MonthlyQuizRow } from "../_shared/monthly-parent-report.ts";
import { sendWithResend } from "../_shared/resend.ts";
import { usableEmail } from "../_shared/weekly-parent-report.ts";

const ALLOWED_ORIGINS = new Set(["https://www.myacademy.my", "https://myacademy.my"]);

function responseHeaders(request: Request): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
    Vary: "Origin",
  };
  const origin = request.headers.get("origin");
  if (origin && ALLOWED_ORIGINS.has(origin)) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

function response(request: Request, body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: responseHeaders(request) });
}

function readAction(body: unknown): string | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const action = (body as { action?: unknown }).action;
  return typeof action === "string" ? action : null;
}

async function sha256(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

type AdminClient = ServiceClient;

Deno.serve(async (request) => {
  if (request.method === "OPTIONS")
    return new Response("ok", { headers: responseHeaders(request) });
  if (request.method !== "POST") return response(request, { error: "Method not allowed" }, 405);

  const body = await request.json().catch(() => ({}));
  if (readAction(body) !== "send_now")
    return response(request, { error: "Unsupported action" }, 400);

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";
  const authorization = request.headers.get("authorization") ?? "";
  if (!supabaseUrl || !serviceRoleKey || !anonKey || !resendApiKey) {
    return response(request, { error: "Email delivery is not configured" }, 500);
  }
  if (!authorization.startsWith("Bearer "))
    return response(request, { error: "Unauthorized" }, 401);

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: authData, error: authError } = await userClient.auth.getUser();
  if (authError || !authData.user) return response(request, { error: "Unauthorized" }, 401);

  const admin = createServiceClient(supabaseUrl, serviceRoleKey);
  const now = new Date();
  const student = await loadManualStudent(
    admin,
    authData.user.id,
    authData.user.email ?? null,
    previousKualaLumpurMonth(now),
  );
  if (!student) return response(request, { error: "The report could not be prepared." }, 500);

  const result = await runManualParentReport({
    student,
    userId: authData.user.id,
    now,
    recordAttempt: async (recipient) => {
      const claim = await admin.rpc("claim_parent_report_send", {
        p_user_id: authData.user.id,
        p_recipient_hash: await sha256(recipient),
      });
      if (claim.error || typeof claim.data !== "boolean") return "error";
      return claim.data ? "ok" : "limited";
    },
    send: async (input) =>
      sendWithResend(resendApiKey, {
        to: input.to,
        ...input.content,
        idempotencyKey: input.idempotencyKey,
        tags: [{ name: "flow", value: "parent_report_manual" }],
      }),
  });
  if (result.status === 200) {
    console.info(
      JSON.stringify({
        scope: "email",
        event: "parent_report_sent",
        userId: authData.user.id,
        messageId: result.body.id,
      }),
    );
  }
  return response(request, result.body, result.status);
});

async function loadManualStudent(
  admin: AdminClient,
  userId: string,
  knownAccountEmail: string | null,
  period: { startIso: string; endIso: string },
): Promise<MonthlyStudent | null> {
  const profileResult = await admin
    .from("profiles")
    .select("full_name, plan, email, parent_report_email")
    .eq("id", userId)
    .maybeSingle();
  if (profileResult.error || !profileResult.data) return null;

  const subscriptionResult = await admin
    .from("subscriptions")
    .select("plan")
    .eq("user_id", userId)
    .eq("status", "active")
    .maybeSingle();
  if (subscriptionResult.error) return null;

  const progress = await admin
    .from("user_progress")
    .select("xp, streak")
    .eq("user_id", userId)
    .maybeSingle();
  if (progress.error) return null;

  const quizzes = await loadMonthQuizzes(admin, userId, period.startIso, period.endIso);
  if (quizzes.error) return null;

  let accountEmail = usableEmail(knownAccountEmail);
  if (!accountEmail) {
    const userResult = await admin.auth.admin.getUserById(userId);
    accountEmail =
      usableEmail(userResult.data.user?.email) ?? usableEmail(profileResult.data.email);
  }

  return {
    fullName: profileResult.data.full_name ?? null,
    profilePlan: profileResult.data.plan ?? null,
    subscriptionPlan: subscriptionResult.data?.plan ?? null,
    parentReportEmail: profileResult.data.parent_report_email ?? null,
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
