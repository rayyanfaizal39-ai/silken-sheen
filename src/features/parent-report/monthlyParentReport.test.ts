import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildParentReportEmail } from "../../../supabase/functions/_shared/email-templates";
import {
  previousKualaLumpurMonth,
  rankNameForXp,
  summarizeMonthlyQuizzes,
} from "../../../supabase/functions/_shared/monthly-parent-report";
import { getRank } from "@/data/rankAssets";
import { analyzeProgress } from "@/lib/tracker";
import type { QuizResult } from "@/hooks/use-progress";

describe("previous Kuala Lumpur month", () => {
  it("covers September when the job runs at 08:00 on 1 October", () => {
    const period = previousKualaLumpurMonth(new Date("2026-10-01T00:00:00.000Z"));
    expect(period.monthStart).toBe("2026-09-01");
    expect(period.periodLabel).toBe("September 2026");
    expect(period.startIso).toBe("2026-08-31T16:00:00.000Z");
    expect(period.endIso).toBe("2026-09-30T16:00:00.000Z");
  });

  it("stays on August until 1 October begins in Malaysia", () => {
    expect(previousKualaLumpurMonth(new Date("2026-09-30T15:59:59.000Z")).monthStart).toBe(
      "2026-08-01",
    );
    expect(previousKualaLumpurMonth(new Date("2026-09-30T16:00:00.000Z")).periodLabel).toBe(
      "September 2026",
    );
  });

  it("rolls the year back on 1 January", () => {
    const period = previousKualaLumpurMonth(new Date("2026-01-01T00:00:00.000Z"));
    expect(period.monthStart).toBe("2025-12-01");
    expect(period.periodLabel).toBe("December 2025");
    expect(period.startIso).toBe("2025-11-30T16:00:00.000Z");
    expect(period.endIso).toBe("2025-12-31T16:00:00.000Z");
  });
});

describe("monthly parent report summary", () => {
  const quizzes = [
    {
      createdAt: "2026-09-02T02:00:00.000Z",
      scorePct: 90,
      subjectId: "math",
      chapterKey: "Chapter 1",
    },
    {
      createdAt: "2026-09-03T02:00:00.000Z",
      scorePct: 70,
      subjectId: "science",
      chapterKey: "Chapter 2",
    },
    {
      createdAt: "2026-09-04T02:00:00.000Z",
      scorePct: 50,
      subjectId: "science",
      chapterKey: "Chapter 2",
    },
  ];

  it("matches the tracker totals used by the parent page", () => {
    const summary = summarizeMonthlyQuizzes(quizzes);
    const insight = analyzeProgress(
      quizzes.map((quiz, index) => ({
        id: String(index),
        subjectId: quiz.subjectId,
        chapterKey: quiz.chapterKey,
        scorePct: quiz.scorePct,
        correct: quiz.scorePct,
        total: 100,
        date: quiz.createdAt,
      })) satisfies QuizResult[],
    );
    expect(summary.totalQuizzes).toBe(insight.totalQuizzes);
    expect(summary.overallAvg).toBe(insight.overallAvg);
    expect(summary.passRate).toBe(insight.passRate);
    expect(summary.strongest).toEqual({ name: "Mathematics", avgScore: 90 });
    expect(summary.weakSpots[0]).toEqual({
      subjectName: "Science",
      chapterLabel: "Chapter 2",
      avgScore: 60,
    });
    expect(summary.recommendation).toBe(insight.recommendation);
  });

  it("uses the same rank names as the student rank ladder", () => {
    for (const xp of [0, 1499, 1500, 4000, 8000, 15000, 30000]) {
      expect(rankNameForXp(xp)).toBe(getRank(xp).name);
    }
  });

  it("renders the monthly template without calling it a manual send", () => {
    const email = buildParentReportEmail({
      cadence: "monthly",
      automatic: true,
      studentName: "Maya <script>",
      periodLabel: "September 2026",
      totalQuizzes: 3,
      overallAvg: 70,
      passRate: 33,
      rankName: "Space Cadet",
      totalXp: 120,
      studyStreak: 2,
      strongest: { name: "Mathematics", avgScore: 90 },
      weakSpots: [{ subjectName: "Science", chapterLabel: "Chapter 2", avgScore: 60 }],
      recommendation: "Focus next on Science.",
      dashboardUrl: "https://myacademy.my/parent-dashboard",
    });
    expect(email.subject).toBe("AcadeMY Monthly Report — Maya <script>");
    expect(email.html).toContain("September 2026");
    expect(email.html).toContain("AcadeMY sent this monthly report automatically.");
    expect(email.html).not.toContain("sent manually");
    expect(email.html).toContain("Maya &lt;script&gt;");
  });
});

describe("monthly parent report delivery contract", () => {
  const migration = readFileSync(
    new URL(
      "../../../supabase/migrations/20261023143000_monthly_parent_report_deliveries.sql",
      import.meta.url,
    ),
    "utf8",
  );
  const source = readFileSync(
    new URL("../../../supabase/functions/send-monthly-parent-report/index.ts", import.meta.url),
    "utf8",
  );
  const manual = readFileSync(
    new URL("../../../supabase/functions/send-parent-report/index.ts", import.meta.url),
    "utf8",
  );
  const batch = readFileSync(
    new URL("../../../supabase/functions/_shared/monthly-parent-report-batch.ts", import.meta.url),
    "utf8",
  );
  const config = readFileSync(new URL("../../../supabase/config.toml", import.meta.url), "utf8");
  const parentPage = readFileSync(new URL("../../routes/parent.tsx", import.meta.url), "utf8");

  it("logs one row per student per month and keeps the schedule commented", () => {
    expect(migration).toContain("unique (student_id, month_start)");
    expect(migration).toContain("public.is_admin()");
    expect(migration).toContain(
      "grant all on table public.monthly_report_deliveries to service_role",
    );
    expect(migration).not.toMatch(/^\s*select cron\.schedule/m);
    expect(migration).toContain("-- select cron.schedule(");
    expect(migration).toContain("'0 0 1 * *'");
    expect(migration).toContain('{"action":"send_previous_month"}');
    expect(migration).toContain("/functions/v1/send-monthly-parent-report");
    expect(migration).not.toContain("/functions/v1/send-weekly-parent-report");
    expect(migration).not.toContain("comment on column public.profiles.parent_report_email");
  });

  it("authenticates the cron batch separately from the signed-in manual send", () => {
    expect(source).toContain("cronAuthorized(");
    expect(source).toContain('Deno.env.get("MONTHLY_PARENT_REPORT_CRON_KEY")');
    expect(source).toContain('request.headers.get("x-monthly-report-key")');
    expect(source).toContain("hasParentReportsAccess");
    expect(source).not.toContain('.eq("plan", "paid")');
    expect(source).toContain('parsed.action !== "send_previous_month"');
    expect(batch).toContain("resolveParentReportRecipient");
    expect(batch).toContain("https://www.myacademy.my/parent-dashboard");
    expect(batch.indexOf("if (options.dryRun)")).toBeLessThan(batch.indexOf("store.claim"));
    expect(manual).toContain("runManualParentReport");
    expect(manual).toContain('readAction(body) !== "send_now"');
    expect(manual).toContain("https://www.myacademy.my");
    expect(manual).not.toContain('Access-Control-Allow-Origin": "*"');
    expect(manual).not.toContain("body.to");
    expect(config).toMatch(/\[functions\.send-parent-report\]\s+verify_jwt = true/);
    expect(config).toMatch(/\[functions\.send-monthly-parent-report\]\s+verify_jwt = false/);
    expect(config).not.toContain("[functions.send-weekly-parent-report]");
  });

  it("does not offer a weekly choice on the parent page", () => {
    expect(parentPage).toContain('action: "send_now"');
    expect(parentPage).toContain("previousKualaLumpurMonth");
    expect(parentPage).toContain("ParentPremiumUpsell");
    expect(parentPage).toContain("hasParentReportsAccess");
    expect(parentPage).not.toContain('cadence: "weekly"');
    expect(parentPage).not.toContain("CalendarDays");
  });
});
