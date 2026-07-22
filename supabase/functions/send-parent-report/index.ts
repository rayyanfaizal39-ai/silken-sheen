import { createClient } from "npm:@supabase/supabase-js@2.108.1";
import {
  buildParentReportEmail,
  type ParentReportEmailData,
} from "../_shared/email-templates.ts";
import { sendWithResend } from "../_shared/resend.ts";

type ParentReportRequest = Omit<ParentReportEmailData, "dashboardUrl"> & { to: string };

const jsonHeaders = { "Content-Type": "application/json" };

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
  const cadence = body.cadence;
  if (cadence !== "weekly" && cadence !== "monthly") throw new Error("cadence is invalid");
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
    ? body.weakSpots.slice(0, 5).map((value, index) => {
        if (!value || typeof value !== "object") throw new Error(`weakSpots[${index}] is invalid`);
        const spot = value as Record<string, unknown>;
        return {
          subjectName: asText(spot.subjectName, `weakSpots[${index}].subjectName`, 80),
          chapterLabel: asText(spot.chapterLabel, `weakSpots[${index}].chapterLabel`, 120),
          avgScore: asNumber(spot.avgScore, `weakSpots[${index}].avgScore`, 0, 100),
        };
      })
    : [];

  return {
    to,
    cadence,
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

Deno.serve(async (request) => {
  if (request.method !== "POST") return response({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
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
    report = parseReport(await request.json());
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
      dashboardUrl: "https://myacademy.my/parent-dashboard",
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
    return response({ error: error instanceof Error ? error.message : "Email delivery failed" }, 502);
  }
});
