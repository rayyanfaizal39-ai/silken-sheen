import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ParentWeeklyReportEmail from "@/emails/templates/ParentWeeklyReportEmail";
import {
  buildWeeklyParentReport,
  currentKualaLumpurWeek,
  type WeeklyParentReport,
} from "@/features/parent-report/weeklyParentReport";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/weekly-report")({
  validateSearch: (search: Record<string, unknown>): { studentId: string } => ({
    studentId: typeof search.studentId === "string" ? search.studentId : "",
  }),
  component: AdminWeeklyReportPage,
});

function AdminWeeklyReportPage() {
  const { studentId } = Route.useSearch();
  const navigate = useNavigate();
  const [draftId, setDraftId] = useState(studentId);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "missing" | "error">("idle");
  const [studentLabel, setStudentLabel] = useState("");
  const [report, setReport] = useState<WeeklyParentReport | null>(null);

  useEffect(() => {
    setDraftId(studentId);
    if (!studentId || !isSupabaseConfigured) {
      setStatus("idle");
      setReport(null);
      return;
    }

    let active = true;
    setStatus("loading");
    const week = currentKualaLumpurWeek(new Date());
    void (async () => {
      const [profileResult, historyResult, progressResult] = await Promise.all([
        supabase.from("profiles").select("full_name, email").eq("id", studentId).maybeSingle(),
        supabase
          .from("quiz_history")
          .select("created_at, score_pct, subject_id, chapter_key, xp_earned")
          .eq("user_id", studentId)
          .gte("created_at", week.startIso)
          .lt("created_at", week.endIso),
        supabase.from("user_progress").select("streak").eq("user_id", studentId).maybeSingle(),
      ]);
      if (!active) return;
      if (profileResult.error || historyResult.error || progressResult.error) {
        setStatus("error");
        return;
      }
      if (!profileResult.data) {
        setStatus("missing");
        setReport(null);
        return;
      }
      const name = profileResult.data.full_name?.trim() || profileResult.data.email || "Student";
      setStudentLabel(name);
      setReport(
        buildWeeklyParentReport({
          studentName: name,
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
  }, [studentId]);

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>View Parent Report</h1>
      <p style={{ color: "var(--muted)", maxWidth: 640 }}>
        Support preview of one student&apos;s current Monday–Sunday report. This does not create a parent account.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void navigate({ to: "/admin/weekly-report", search: { studentId: draftId.trim() } });
        }}
        style={{ display: "flex", gap: 8, margin: "16px 0 24px", maxWidth: 640 }}
      >
        <input
          value={draftId}
          onChange={(event) => setDraftId(event.target.value)}
          placeholder="Student ID"
          aria-label="Student ID"
          style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--card)", color: "var(--text)" }}
        />
        <button className="btn" type="submit">Load</button>
      </form>
      {status === "loading" ? <p>Loading report…</p> : null}
      {status === "missing" ? <p>No student profile was found for that ID.</p> : null}
      {status === "error" ? <p>The report could not be loaded.</p> : null}
      {status === "ready" && report ? (
        <div style={{ background: "#F7F4EE", borderRadius: 16, overflow: "hidden" }}>
          <p style={{ margin: 0, padding: "12px 16px", color: "#334155" }}>Preview for {studentLabel}</p>
          <ParentWeeklyReportEmail report={report} />
        </div>
      ) : null}
    </div>
  );
}
