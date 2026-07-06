import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Star,
  BookOpen,
  Flame,
  Rocket,
  Mail,
  Send,
  Printer,
  ShieldCheck,
  Bot,
  TrendingUp,
  TrendingDown,
  Clock3,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useProgress, type ReportCadence } from "@/hooks/use-progress";
import { useAuth } from "@/context/auth-context";
import { getStudentAnalytics, type StudentAnalytics } from "@/lib/analytics";
import { AcademyPageShell } from "@/components/AcademyPage";
import { WeeklyParentReportPreview } from "@/components/parent/WeeklyParentReportPreview";

export const Route = createFileRoute("/parent-dashboard")({
  head: () => ({
    meta: [
      { title: "Parent Dashboard — AcadeMY" },
      {
        name: "description",
        content: "A parent-facing analytics view of your child's KSSM study progress.",
      },
    ],
  }),
  component: ParentDashboardPage,
});

const SUBJECT_COLOR: Record<string, string> = {
  bm: "#C458A3",
  english: "#8E5ACF",
  math: "#60A5FA",
  science: "#34D399",
  sejarah: "#F59E0B",
  geography: "#F472B6",
};

const TONE_COLOR: Record<StudentAnalytics["missionInsight"]["tone"], string> = {
  great: "#34D399",
  steady: "#FBBF24",
  "needs-attention": "#F87171",
};

function ParentDashboardPage() {
  // NOTE: This page's ONLY data source is getStudentAnalytics() from
  // src/lib/analytics.ts — the shared analytics layer that also powers the
  // student dashboard and (later) weekly/monthly parent emails and admin
  // reports. Nothing here recomputes XP, rank, or quiz stats itself.
  const { progress, setParentReport } = useProgress();
  const { user } = useAuth();

  const [cadence, setCadence] = useState<ReportCadence>(progress.reportCadence ?? "weekly");
  const [email, setEmail] = useState(progress.parentEmail ?? "");
  const [saved, setSaved] = useState(false);
  const [analytics, setAnalytics] = useState<StudentAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  const windowDays = cadence === "weekly" ? 7 : 30;
  const periodLabel = cadence === "weekly" ? "the past 7 days" : "the past 30 days";

  useEffect(() => {
    let alive = true;
    setLoading(true);
    // The signed-in student's own live progress (from useProgress) is passed
    // in directly — this is the "fast path" documented in analytics.ts. When
    // there's no signed-in user yet, getStudentAnalytics falls back to its
    // built-in mock student so the page still renders a full demo.
    getStudentAnalytics(user?.id ?? getStudentAnalytics.MOCK_STUDENT_ID, {
      progress: user ? progress : undefined,
      studentName: user?.name,
      windowDays,
    }).then((data) => {
      if (alive) {
        setAnalytics(data);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, [user, progress, windowDays]);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function save() {
    setParentReport(emailValid ? email : undefined, cadence);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  function sendEmail() {
    if (!analytics) return;
    const subject = `AcadeMY Parent Dashboard — ${analytics.studentName}`;
    const lines = [
      `AcadeMY — Parent Dashboard Snapshot`,
      `Student: ${analytics.studentName}`,
      `Period: ${periodLabel}`,
      ``,
      `Total XP: ${analytics.totalXp.toLocaleString()} (+${analytics.weeklyXp} this week)`,
      `Study streak: ${analytics.studyStreak} day${analytics.studyStreak !== 1 ? "s" : ""}`,
      `Cosmic rank: ${analytics.rankName} (ELO ${analytics.chessRating.toLocaleString()})`,
      ``,
      `SUBJECT PERFORMANCE`,
      ...analytics.subjectPerformance.map((s) => `• ${s.name}: ${s.avgScore}% (${s.trend >= 0 ? "+" : ""}${s.trend})`),
      ``,
      `MISSION INSIGHT`,
      analytics.missionInsight.summary,
      ``,
      `RECOMMENDED REVISION`,
      ...analytics.recommendedRevision.map((r) => `• ${r}`),
      ``,
      `— Sent from AcadeMY`,
    ];
    const body = lines.join("\n");
    if (emailValid) setParentReport(email, cadence);
    window.location.href = `mailto:${emailValid ? encodeURIComponent(email) : ""}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  }, []);

  if (loading || !analytics) {
    return (
      <AcademyPageShell className="max-w-7xl">
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-white/50">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-sm font-semibold">Loading analytics…</p>
        </div>
      </AcademyPageShell>
    );
  }

  return (
    <AcademyPageShell className="max-w-7xl">
      {/* ── Child summary / header ── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#34D399]">Parent Dashboard</p>
          <h1 className="font-display text-xl font-black text-white sm:text-2xl">{greeting} 👋</h1>
          <p className="mt-1 text-sm text-white/45">
            {analytics.studentName}'s progress at a glance — {periodLabel}.
            {analytics.isMockData && (
              <span className="ml-2 rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white/40">
                Demo data
              </span>
            )}
          </p>
        </div>
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

      {/* ── Child summary KPI row ── */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard icon={Star} label="Total XP" value={analytics.totalXp.toLocaleString()} note={`+${analytics.weeklyXp} this week`} color="#A78BFA" />
        <KpiCard icon={BookOpen} label="Subjects Active" value={String(analytics.subjectPerformance.length)} note="With quiz attempts" color="#60A5FA" />
        <KpiCard icon={Flame} label="Study Streak" value={`${analytics.studyStreak}d`} note="Keep it up!" color="#F59E0B" />
        <KpiCard icon={Rocket} label="Cosmic Rank" value={analytics.rankName} note={`ELO: ${analytics.chessRating.toLocaleString()} pts`} color={analytics.rankColor} />
      </div>

      {/* ── Weekly progress ── */}
      <div className="mb-6">
        <Card>
          <SectionLabel>Weekly Progress</SectionLabel>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <MiniStat label="Quizzes" value={analytics.quizzesCompletedThisWeek} />
            <MiniStat label="Chapters" value={analytics.chaptersCompletedThisWeek} />
            <MiniStat label="Flashcards" value={analytics.flashcardsReviewedThisWeek} />
          </div>
          <div className="mt-5 flex h-24 items-end justify-between gap-2">
            {analytics.studyConsistency.map((d, i) => {
              const total = d.quizzesCompleted + d.chaptersCompleted + d.flashcardsReviewed;
              const max = Math.max(1, ...analytics.studyConsistency.map((x) => x.quizzesCompleted + x.chaptersCompleted + x.flashcardsReviewed));
              const pct = Math.round((total / max) * 100);
              return (
                <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                  <div className="flex h-16 w-full items-end">
                    <div
                      className="w-full rounded-md bg-gradient-to-t from-[#331499] to-[#8C40FF]"
                      style={{ height: `${Math.max(6, pct)}%`, opacity: total === 0 ? 0.3 : 1 }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-white/40">{d.day}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* ── Subject performance + weak topics ── */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <SectionLabel>Subject Performance</SectionLabel>
            <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] font-bold text-white/50">
              {cadence === "weekly" ? "Last 7 days" : "Last 30 days"}
            </span>
          </div>
          {analytics.subjectPerformance.length === 0 ? (
            <EmptyState text="No quizzes completed in this period yet." />
          ) : (
            <div className="space-y-3.5">
              {analytics.subjectPerformance.map((s) => {
                const color = SUBJECT_COLOR[s.subjectId] ?? "#A78BFA";
                return (
                  <div key={s.subjectId} className="flex items-center gap-3">
                    <span className="w-28 shrink-0 truncate text-sm font-semibold text-white/80">{s.name}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                      <div className="h-full rounded-full" style={{ width: `${s.avgScore}%`, background: color }} />
                    </div>
                    <span className="w-10 shrink-0 text-right text-sm font-bold" style={{ color }}>
                      {s.avgScore}%
                    </span>
                    <span
                      className={`flex w-10 shrink-0 items-center gap-0.5 text-xs font-bold ${
                        s.trend >= 0 ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {s.trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {s.trend >= 0 ? "+" : ""}
                      {s.trend}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-cyan-300" />
              <SectionLabel>Weak Topics</SectionLabel>
            </span>
            <Link to="/tracker" className="text-xs font-bold text-[#A78BFA] hover:text-white transition-colors">
              View AI Tracker →
            </Link>
          </div>
          {analytics.weakTopics.length === 0 ? (
            <EmptyState text="No weak topics — every quizzed chapter is above the pass threshold. 🎉" />
          ) : (
            <div className="space-y-2.5">
              {analytics.weakTopics.map((w) => (
                <div
                  key={`${w.subjectId}-${w.chapterKey}`}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-2.5"
                >
                  <span className="flex h-9 w-12 shrink-0 items-center justify-center rounded-lg bg-rose-500/15 text-xs font-black tabular-nums text-rose-300">
                    {w.avgScore}%
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-white">{w.chapterLabel}</span>
                    <span className="block truncate text-xs text-white/40">{w.subjectName}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* ── Mission insight + recommended revision + send report ── */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card
          className="border-[#8B5CF6]/30 bg-gradient-to-br from-[#8B5CF6]/10 to-[#0B1220]/62"
          style={{ borderColor: `${TONE_COLOR[analytics.missionInsight.tone]}55` }}
        >
          <div className="mb-3 flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6]/20">
              <Bot className="h-4.5 w-4.5 text-[#C4B5FD]" />
            </span>
            <SectionLabel>Mission Insight</SectionLabel>
          </div>
          <p className="text-sm font-bold text-white">{analytics.missionInsight.headline}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{analytics.missionInsight.summary}</p>
        </Card>

        <Card>
          <SectionLabel>Recommended Revision</SectionLabel>
          <ul className="mt-3 space-y-2">
            {analytics.recommendedRevision.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-white/75">
                <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#A78BFA]" />
                {r}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="flex items-center gap-2 font-display text-base font-bold text-white">
            <Mail className="h-4.5 w-4.5 text-[#34D399]" /> Send to parent
          </h2>
          <p className="mt-1 text-xs text-white/45">
            Save an email to enable {cadence} reports, or send this snapshot now.
          </p>

          <label htmlFor="pd-parent-email" className="sr-only">
            Parent email
          </label>
          <div className="mt-3 flex flex-col gap-2">
            <input
              id="pd-parent-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="parent@example.com"
              className="min-h-[40px] rounded-xl border border-white/10 bg-white/[0.05] px-3.5 text-sm text-white placeholder:text-white/30 focus:border-[#34D399]/50 focus:outline-none focus:ring-2 focus:ring-[#34D399]/30"
            />
            {email.length > 0 && !emailValid && (
              <p role="alert" className="text-xs text-rose-300">
                Enter a valid email address.
              </p>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={save}
                disabled={email.length > 0 && !emailValid}
                className="min-h-[40px] flex-1 rounded-xl border border-white/15 bg-white/[0.06] text-xs font-bold text-white transition-colors hover:bg-white/[0.12] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {saved ? "Saved ✓" : "Save"}
              </button>
              <button
                type="button"
                onClick={sendEmail}
                className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#34D399] to-[#10B981] text-xs font-black text-[#04130C] transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                <Send className="h-3.5 w-3.5" /> Send now
              </button>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.06] text-xs font-bold text-white transition-colors hover:bg-white/[0.12]"
            >
              <Printer className="h-3.5 w-3.5" /> Print / PDF
            </button>
          </div>
          <p className="mt-3 flex items-start gap-1.5 text-[10px] leading-relaxed text-white/35">
            <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0" />
            Opens your email app with this snapshot pre-filled. Automated {cadence} delivery is a future step (see
            src/lib/analytics.ts) — no email is sent automatically yet.
          </p>
        </Card>
      </div>

      {/* ── Weekly parent email preview — visual only, no email is sent from here ── */}
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <Mail className="h-4 w-4 text-[#34D399]" />
          <SectionLabel>Email Report Preview</SectionLabel>
        </div>
        <WeeklyParentReportPreview analytics={analytics} />
      </div>
    </AcademyPageShell>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  note,
  color,
}: {
  icon: typeof Star;
  label: string;
  value: string;
  note: string;
  color: string;
}) {
  return (
    <Card className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-40 blur-2xl"
        style={{ background: color }}
      />
      <div className="relative z-10 flex items-center gap-2.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: `${color}2a` }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </span>
        <span className="text-xs font-bold text-white/50">{label}</span>
      </div>
      <p className="relative z-10 mt-3 font-display text-2xl font-black text-white">{value}</p>
      <p className="relative z-10 mt-1 text-[11px] font-semibold" style={{ color }}>
        {note}
      </p>
    </Card>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3 text-center">
      <p className="font-display text-xl font-black text-white">{value}</p>
      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-white/40">{label}</p>
    </div>
  );
}

function Card({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`academy-surface rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">{children}</p>;
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 text-center">
      <p className="text-sm text-white/45">{text}</p>
    </div>
  );
}
