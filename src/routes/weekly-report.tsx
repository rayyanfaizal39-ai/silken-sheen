import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ParentWeeklyReportEmail from "@/emails/templates/ParentWeeklyReportEmail";
import { useAuth } from "@/context/auth-context";
import {
  buildWeeklyParentReport,
  currentKualaLumpurWeek,
  hasParentReportsAccess,
  type WeeklyParentReport,
} from "@/features/parent-report/weeklyParentReport";
import { seoMeta } from "@/lib/seo";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export const Route = createFileRoute("/weekly-report")({
  head: () =>
    seoMeta({
      title: "Weekly Parent Report",
      description: "Preview this week's learning report from your real AcadeMY quiz activity.",
      path: "/weekly-report",
      noindex: true,
    }),
  component: WeeklyReportPage,
});

function WeeklyReportPage() {
  const { user, loading: authLoading } = useAuth();
  const [status, setStatus] = useState<"loading" | "ready" | "locked" | "signed-out" | "error">("loading");
  const [report, setReport] = useState<WeeklyParentReport | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !isSupabaseConfigured) {
      setStatus(user ? "error" : "signed-out");
      return;
    }

    let active = true;
    const week = currentKualaLumpurWeek(new Date());
    void (async () => {
      const [profileResult, subscriptionResult, historyResult, progressResult] = await Promise.all([
        supabase.from("profiles").select("full_name, plan").eq("id", user.id).maybeSingle(),
        supabase.from("subscriptions").select("plan").eq("user_id", user.id).eq("status", "active").maybeSingle(),
        supabase
          .from("quiz_history")
          .select("created_at, score_pct, subject_id, chapter_key, xp_earned")
          .eq("user_id", user.id)
          .gte("created_at", week.startIso)
          .lt("created_at", week.endIso),
        supabase.from("user_progress").select("streak").eq("user_id", user.id).maybeSingle(),
      ]);
      if (!active) return;
      if (profileResult.error || subscriptionResult.error || historyResult.error || progressResult.error) {
        setStatus("error");
        return;
      }
      if (!hasParentReportsAccess(subscriptionResult.data?.plan ?? null, profileResult.data?.plan ?? null)) {
        setStatus("locked");
        return;
      }
      setReport(
        buildWeeklyParentReport({
          studentName: profileResult.data?.full_name?.trim() || user.name || "Student",
          streak: Number(progressResult.data?.streak ?? 0),
          quizzes: (historyResult.data ?? []).map((row) => ({
            createdAt: row.created_at,
            scorePct: row.score_pct,
            subjectId: row.subject_id,
            chapterKey: row.chapter_key,
            xpEarned: row.xp_earned,
          })),
        }),
      );
      setStatus("ready");
    })();

    return () => {
      active = false;
    };
  }, [authLoading, user]);

  if (status === "loading" || authLoading) {
    return <p className="mx-auto max-w-3xl px-4 py-10 text-sm text-white/60">Loading your weekly report…</p>;
  }
  if (status === "signed-out") {
    return (
      <p className="mx-auto max-w-3xl px-4 py-10 text-sm text-white/70">
        <Link to="/login" className="font-bold text-[#A5B4FC]">Sign in</Link> to preview your weekly report.
      </p>
    );
  }
  if (status === "locked") {
    return (
      <p className="mx-auto max-w-3xl px-4 py-10 text-sm text-white/70">
        Parent Reports are part of a plan that includes them. This account does not have that access yet.
      </p>
    );
  }
  if (status === "error" || !report) {
    return <p className="mx-auto max-w-3xl px-4 py-10 text-sm text-rose-200">The weekly report could not be loaded.</p>;
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE]">
      <ParentWeeklyReportEmail report={report} />
    </div>
  );
}
