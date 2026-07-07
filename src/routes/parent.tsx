import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Mail,
  Send,
  Printer,
  CalendarDays,
  ShieldCheck,
  Flame,
  Trophy,
  Target,
  TrendingUp,
  Brain,
} from "lucide-react";
import { useProgress, getRank, type ReportCadence } from "@/hooks/use-progress";
import { useAuth } from "@/context/auth-context";
import { analyzeProgress, withinDays } from "@/lib/tracker";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/parent")({
  head: () => seoMeta({
    title: "Parent Mission Report",
    description: "A clear weekly or monthly summary of your child's KSSM study progress — a parent learning dashboard for Malaysian families.",
    path: "/parent",
    keywords: ["parent learning dashboard", "KSSM progress report", "student learning platform Malaysia"],
  }),
  component: ParentPage,
});

function ParentPage() {
  const { progress, setParentReport } = useProgress();
  const { user } = useAuth();
  const [cadence, setCadence] = useState<ReportCadence>(progress.reportCadence ?? "weekly");
  const [email, setEmail] = useState(progress.parentEmail ?? "");
  const [saved, setSaved] = useState(false);

  const studentName = user?.name ?? "Your child";
  const days = cadence === "weekly" ? 7 : 30;
  const periodLabel = cadence === "weekly" ? "the past 7 days" : "the past 30 days";

  const insight = useMemo(
    () => analyzeProgress(withinDays(progress.quizHistory ?? [], days)),
    [progress.quizHistory, days],
  );
  const rank = getRank(progress.xp);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function save() {
    setParentReport(emailValid ? email : undefined, cadence);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  function buildReportText(): string {
    const lines = [
      `AcadeMY — Mission Report (${cadence === "weekly" ? "Weekly" : "Monthly"})`,
      `Student: ${studentName}`,
      `Period: ${periodLabel}`,
      ``,
      `OVERVIEW`,
      `• Quizzes completed: ${insight.totalQuizzes}`,
      `• Average score: ${insight.overallAvg}%`,
      `• Pass rate (80%+): ${insight.passRate}%`,
      `• Current rank: ${rank.name} (${progress.xp.toLocaleString()} XP)`,
      `• Study streak: ${progress.streak} day${progress.streak !== 1 ? "s" : ""}`,
      ``,
    ];
    if (insight.strongest)
      lines.push(`STRONGEST SUBJECT: ${insight.strongest.name} (${insight.strongest.avgScore}%)`);
    if (insight.weakSpots.length > 0) {
      lines.push(``, `AREAS TO SUPPORT:`);
      insight.weakSpots.forEach((w) =>
        lines.push(`• ${w.subjectName} — ${w.chapterLabel} (${w.avgScore}%)`),
      );
    } else {
      lines.push(``, `No weak areas this period — every quizzed chapter is above 80%.`);
    }
    lines.push(``, `RECOMMENDATION`, insight.recommendation, ``, `— Sent from AcadeMY`);
    return lines.join("\n");
  }

  function sendEmail() {
    const subject = `AcadeMY ${cadence === "weekly" ? "Weekly" : "Monthly"} Report — ${studentName}`;
    const body = buildReportText();
    if (emailValid) setParentReport(email, cadence);
    window.location.href = `mailto:${emailValid ? encodeURIComponent(email) : ""}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-6 pb-[calc(var(--mobile-content-bottom)+1rem)] sm:px-6 lg:px-8 lg:pb-10 space-y-6 print:max-w-none print:py-0">
      {/* ── Header ── */}
      <header className="relative overflow-hidden rounded-[2rem] border border-[#34D399]/25 bg-gradient-to-br from-[#064E3B]/35 via-[#0B1220]/70 to-[#1E3A8A]/25 p-6 backdrop-blur-2xl sm:p-8 print:border-slate-300 print:bg-white">
        <div className="relative flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34D399] to-[#10B981] shadow-[0_0_28px_rgba(52,211,153,0.45)] print:shadow-none">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#6EE7B7] print:text-emerald-700">
              Parent Mission Report
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl print:text-slate-900">
              {studentName}'s progress
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-white/55 print:text-slate-600">
              A clear, syllabus-aligned summary of {periodLabel}. Sent automatically to a parent so
              they always know how study is going — no surprises.
            </p>
          </div>
        </div>
      </header>

      {/* ── Cadence toggle ── */}
      <div className="flex items-center gap-3 print:hidden">
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-white/40">
          <CalendarDays className="h-4 w-4" /> Report period
        </span>
        <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.04] p-1">
          {(["weekly", "monthly"] as ReportCadence[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCadence(c)}
              className={`rounded-lg px-4 py-1.5 text-xs font-bold capitalize transition-all ${
                cadence === c
                  ? "bg-gradient-to-r from-[#34D399] to-[#10B981] text-[#04130C]"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ── Summary stats ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <ReportStat
          icon={Brain}
          label="Quizzes"
          value={String(insight.totalQuizzes)}
          color="#60A5FA"
        />
        <ReportStat
          icon={Target}
          label="Avg score"
          value={`${insight.overallAvg}%`}
          color="#34D399"
        />
        <ReportStat
          icon={Trophy}
          label="Pass rate"
          value={`${insight.passRate}%`}
          color="#FBBF24"
        />
        <ReportStat icon={Flame} label="Streak" value={`${progress.streak}d`} color="#FB923C" />
      </div>

      {/* ── Strengths & support ── */}
      <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-6 backdrop-blur-2xl print:border-slate-300 print:bg-white">
        {insight.totalQuizzes === 0 ? (
          <p className="text-center text-sm text-white/45 print:text-slate-500">
            No quizzes completed in {periodLabel}. Encourage a short quiz to get the next report
            rolling.
          </p>
        ) : (
          <div className="space-y-5">
            {insight.strongest && (
              <div>
                <p className="mb-1 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-emerald-400 print:text-emerald-700">
                  <TrendingUp className="h-4 w-4" /> Strongest subject
                </p>
                <p className="text-sm text-white/80 print:text-slate-800">
                  <span className="font-bold text-white print:text-slate-900">
                    {insight.strongest.name}
                  </span>{" "}
                  — averaging {insight.strongest.avgScore}% across {insight.strongest.attempts} quiz
                  {insight.strongest.attempts !== 1 ? "zes" : ""}.
                </p>
              </div>
            )}

            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-rose-400 print:text-rose-700">
                <Target className="h-4 w-4" /> Areas to support
              </p>
              {insight.weakSpots.length === 0 ? (
                <p className="text-sm text-white/70 print:text-slate-700">
                  No weak areas — every quizzed chapter is above 80%. 🎉
                </p>
              ) : (
                <ul className="space-y-2">
                  {insight.weakSpots.map((w) => (
                    <li
                      key={`${w.subjectId}-${w.chapterKey}`}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 print:border-slate-200 print:bg-slate-50"
                    >
                      <span className="flex h-9 w-12 shrink-0 items-center justify-center rounded-lg bg-rose-500/15 text-xs font-black tabular-nums text-rose-300 print:bg-rose-100 print:text-rose-700">
                        {w.avgScore}%
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold text-white print:text-slate-900">
                          {w.chapterLabel}
                        </span>
                        <span className="block truncate text-xs text-white/45 print:text-slate-500">
                          {w.subjectName}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-xl border border-[#6366F1]/20 bg-[#6366F1]/10 p-4 print:border-indigo-200 print:bg-indigo-50">
              <p className="text-xs font-black uppercase tracking-wide text-[#A78BFA] print:text-indigo-700">
                Recommendation
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/80 print:text-slate-800">
                {insight.recommendation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Delivery setup ── */}
      <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-6 backdrop-blur-2xl print:hidden">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
          <Mail className="h-5 w-5 text-[#34D399]" /> Send to a parent
        </h2>
        <p className="mt-1 text-sm text-white/45">
          Save a parent's email to enable {cadence} Mission Reports. You can send one right now too.
        </p>

        <label
          htmlFor="parent-email"
          className="mt-4 block text-xs font-bold uppercase tracking-wide text-white/40"
        >
          Parent email
        </label>
        <div className="mt-1.5 flex flex-col gap-2.5 sm:flex-row">
          <input
            id="parent-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="parent@example.com"
            className="min-h-[44px] flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white placeholder:text-white/30 focus:border-[#34D399]/50 focus:outline-none focus:ring-2 focus:ring-[#34D399]/30"
          />
          <button
            type="button"
            onClick={save}
            disabled={email.length > 0 && !emailValid}
            className="min-h-[44px] rounded-xl border border-white/15 bg-white/[0.06] px-5 text-sm font-bold text-white transition-colors hover:bg-white/[0.12] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saved ? "Saved ✓" : "Save"}
          </button>
        </div>
        {email.length > 0 && !emailValid && (
          <p role="alert" className="mt-1.5 text-xs text-rose-300">
            Enter a valid email address.
          </p>
        )}

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={sendEmail}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#34D399] to-[#10B981] px-5 text-sm font-black text-[#04130C] transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            <Send className="h-4 w-4" /> Send report now
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 text-sm font-bold text-white transition-colors hover:bg-white/[0.12]"
          >
            <Printer className="h-4 w-4" /> Print / PDF
          </button>
        </div>

        <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-white/35">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          "Send report now" opens your email app with the summary pre-filled. Fully automated{" "}
          {cadence} delivery activates once cloud sync is connected — your saved preference is
          remembered.
        </p>
      </div>
    </section>
  );
}

function ReportStat({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Brain;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0B1220]/62 p-4 backdrop-blur-2xl print:border-slate-300 print:bg-white">
      <Icon className="mb-2 h-5 w-5" style={{ color }} />
      <p className="font-display text-2xl font-extrabold tabular-nums text-white print:text-slate-900">
        {value}
      </p>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-white/40 print:text-slate-500">
        {label}
      </p>
    </div>
  );
}
