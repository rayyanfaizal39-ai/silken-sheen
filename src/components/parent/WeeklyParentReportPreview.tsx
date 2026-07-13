import { Link } from "@tanstack/react-router";
import type { StudentAnalytics } from "@/lib/analytics";

/**
 * Renders a preview of the weekly/monthly parent email — NOT a live email.
 * No email is sent from here; this is purely a visual preview so parents
 * (and we, while building) can see what the eventual email will look like.
 *
 * Deliberately styled like a real email body, not like the rest of the
 * (dark, glassy) AcadeMY app: a simple white card, plain typography, no
 * gradients/blur/glow — because that's what will actually render in an
 * inbox. Keep this component's markup close to "email-safe" (basic block
 * layout, inline-friendly spacing) since it will likely seed the real HTML
 * email template once Resend + the Edge Function are wired up.
 *
 * Data source: the same `StudentAnalytics` object returned by
 * `getStudentAnalytics()` — this component renders it, it never computes
 * analytics itself.
 */
export function WeeklyParentReportPreview({ analytics }: { analytics: StudentAnalytics }) {
  const cadenceLabel = "This Week";
  const topWeakTopics = analytics.weakTopics.slice(0, 3);
  const achievement = analytics.bestSubject
    ? `${analytics.bestSubject.name} led the week with a ${analytics.bestSubject.avgScore}% quiz average.`
    : analytics.studyStreak > 0
      ? `A ${analytics.studyStreak}-day study streak is building a helpful routine.`
      : "The first completed learning activity will appear here.";
  const supportArea = analytics.weakestSubject
    ? `${analytics.weakestSubject.name} would benefit from a short, focused revision session.`
    : "There is not enough quiz history yet to identify a support area.";

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white text-slate-800 shadow-[0_12px_32px_rgba(0,0,0,0.25)]">
      {/* ── Email "from" bar ── */}
      <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Email preview · not sent
        </p>
      </div>

      <div className="px-5 py-5 sm:px-6 sm:py-6">
        {/* ── Header ── */}
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
          AcadeMY · {cadenceLabel} Mission Report
        </p>
        <h3 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
          {analytics.studentName}'s progress this week
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
          Hi there — here's a quick, plain-language summary of how {analytics.studentName.split(" ")[0]} did.
        </p>

        <hr className="my-5 border-slate-100" />

        <div className="space-y-3">
          <SummaryBlock label="Achievement this week" text={achievement} tone="success" />
          <SummaryBlock label="Area needing support" text={supportArea} tone="support" />
          <SummaryBlock label="Recommended action for next week" text={analytics.missionInsight.recommendation} tone="action" />
        </div>

        <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
          {analytics.missionInsight.summary}
        </p>

        <hr className="my-5 border-slate-100" />

        {/* ── At a glance ── */}
        <table className="w-full border-collapse text-sm">
          <tbody>
            <ReportRow label="XP earned this week" value={`+${analytics.weeklyXp.toLocaleString()} XP`} />
            <ReportRow label="Quizzes completed" value={String(analytics.quizzesCompletedThisWeek)} />
            <ReportRow label="Chapters completed" value={String(analytics.chaptersCompletedThisWeek)} />
            <ReportRow label="Flashcards reviewed" value={String(analytics.flashcardsReviewedThisWeek)} />
          </tbody>
        </table>

        <hr className="my-5 border-slate-100" />

        {/* ── Best / weakest subject ── */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">Best subject</p>
            <p className="mt-1 text-sm font-bold text-slate-900">
              {analytics.bestSubject ? analytics.bestSubject.name : "—"}
            </p>
            {analytics.bestSubject && (
              <p className="text-xs text-emerald-700">{analytics.bestSubject.avgScore}% average</p>
            )}
          </div>
          <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-700">Needs support</p>
            <p className="mt-1 text-sm font-bold text-slate-900">
              {analytics.weakestSubject ? analytics.weakestSubject.name : "—"}
            </p>
            {analytics.weakestSubject && (
              <p className="text-xs text-amber-700">{analytics.weakestSubject.avgScore}% average</p>
            )}
          </div>
        </div>

        {/* ── Top weak topics ── */}
        {topWeakTopics.length > 0 && (
          <>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Topics to revisit
            </p>
            <ul className="mt-2 space-y-1.5">
              {topWeakTopics.map((w) => (
                <li
                  key={`${w.subjectId}-${w.chapterKey}`}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm"
                >
                  <span className="min-w-0 truncate text-slate-700">
                    {w.chapterLabel} <span className="text-slate-400">· {w.subjectName}</span>
                  </span>
                  <span className="ml-2 shrink-0 font-bold text-rose-600">{w.avgScore}%</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* ── Recommended revision ── */}
        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Recommended revision
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-slate-600">
          {analytics.recommendedRevision.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>

        {/* ── CTA button ── */}
        <div className="mt-6 text-center">
          <Link
            to="/parent-dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
          >
            View Full Parent Dashboard
          </Link>
        </div>

        <p className="mt-5 text-center text-[11px] leading-relaxed text-slate-400">
          You're receiving this because a {cadenceLabel.toLowerCase()} report was requested from AcadeMY.
        </p>
      </div>
    </div>
  );
}

function SummaryBlock({ label, text, tone }: { label: string; text: string; tone: "success" | "support" | "action" }) {
  const styles = tone === "success"
    ? "border-emerald-100 bg-emerald-50 text-emerald-800"
    : tone === "support"
      ? "border-amber-100 bg-amber-50 text-amber-800"
      : "border-sky-100 bg-sky-50 text-sky-800";
  return (
    <div className={`rounded-xl border p-3 ${styles}`}>
      <p className="text-[11px] font-semibold uppercase tracking-wide">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-700">{text}</p>
    </div>
  );
}

function ReportRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-slate-50 last:border-0">
      <td className="py-1.5 pr-3 text-slate-500">{label}</td>
      <td className="py-1.5 text-right font-bold text-slate-900">{value}</td>
    </tr>
  );
}
