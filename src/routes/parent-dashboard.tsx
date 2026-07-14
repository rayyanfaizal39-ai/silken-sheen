import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight, Award, BarChart3, BookOpen, CheckCircle2,
  Flame, Layers3, LockKeyhole, Rocket, Sparkles,
  Star, Target, TrendingDown, TrendingUp, Trophy, UsersRound,
} from "lucide-react";
import { AcademyPageShell } from "@/components/AcademyPage";
import { WeeklyParentReportPreview } from "@/components/parent/WeeklyParentReportPreview";
import { useAuth } from "@/context/auth-context";
import { useProgress, totalChaptersCompleted } from "@/hooks/use-progress";
import { getStudentAnalytics, type StudentAnalytics, type SubjectPerformance } from "@/lib/analytics";
import { hasFeature, resolveStoredPlan } from "@/lib/feature-access";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { subjects } from "@/data/subjects-meta";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/parent-dashboard")({
  head: () => seoMeta({
    title: "Parent Dashboard",
    description: "A clear view of your child's learning progress on AcadeMY.",
    path: "/parent-dashboard",
    noindex: true,
  }),
  component: ParentDashboardPage,
});

const SUBJECT_COLOR: Record<string, string> = {
  bm: "#FB7185", english: "#38BDF8", math: "#818CF8", science: "#34D399",
  sejarah: "#FBBF24", geography: "#2DD4BF",
};

function ParentDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { progress } = useProgress();
  const [analytics, setAnalytics] = useState<StudentAnalytics | null>(null);
  const [storedPlan, setStoredPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const profileRequest = isSupabaseConfigured
      ? supabase.from("profiles").select("plan").eq("id", user.id).maybeSingle()
      : Promise.resolve({ data: null, error: null });

    Promise.all([
      getStudentAnalytics(user.id, { progress, studentName: user.name, windowDays: 7 }),
      profileRequest,
    ]).then(([nextAnalytics, profileResult]) => {
      if (!active) return;
      if (profileResult.error && import.meta.env.DEV) {
        console.error("[parent-dashboard] profile plan query failed", profileResult.error);
      }
      setStoredPlan(profileResult.data?.plan ?? null);
      setAnalytics(nextAnalytics);
      setLoading(false);
    }).catch((error: unknown) => {
      if (import.meta.env.DEV) console.error("[parent-dashboard] analytics load failed", error);
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [authLoading, user, progress]);

  if (authLoading || loading) return <DashboardSkeleton />;

  if (!user) {
    return (
      <AcademyPageShell className="max-w-6xl">
        <EmptyPanel icon={<UsersRound />} title="Sign in to view the Parent Dashboard"
          body="Your child's learning summary is private. Sign in to continue." action="Sign in" to="/login" />
      </AcademyPageShell>
    );
  }

  if (!analytics) {
    return (
      <AcademyPageShell className="max-w-6xl">
        <EmptyPanel icon={<BarChart3 />} title="Progress is not available yet"
          body="We couldn't load this learning summary. Please refresh and try again." />
      </AcademyPageShell>
    );
  }

  const plan = resolveStoredPlan(storedPlan);
  const canViewDashboard = hasFeature(plan, "parent_dashboard");
  const canViewAnalytics = hasFeature(plan, "parent_analytics");
  const canViewReports = hasFeature(plan, "parent_reports");

  return <DashboardContent analytics={analytics} progress={progress} canViewDashboard={canViewDashboard}
    canViewAnalytics={canViewAnalytics} canViewReports={canViewReports} />;
}

function DashboardContent({ analytics, progress, canViewDashboard, canViewAnalytics, canViewReports }: {
  analytics: StudentAnalytics;
  progress: ReturnType<typeof useProgress>["progress"];
  canViewDashboard: boolean;
  canViewAnalytics: boolean;
  canViewReports: boolean;
}) {
  const quizResults = progress.quizHistory ?? [];
  const weeklyResults = quizResults.filter((item) => Date.now() - new Date(item.date).getTime() <= 7 * 86_400_000);
  const averageQuiz = weeklyResults.length
    ? Math.round(weeklyResults.reduce((sum, item) => sum + item.scorePct, 0) / weeklyResults.length)
    : null;
  const activeSubjectIds = new Set(Object.keys(progress.subjectXp));
  const totalSubjectXp = Math.max(1, Object.values(progress.subjectXp).reduce((a, b) => a + b, 0));
  const performanceById = new Map(analytics.subjectPerformance.map((item) => [item.subjectId, item]));
  const subjectRows = subjects.filter((subject) => activeSubjectIds.has(subject.id) || performanceById.has(subject.id));
  const mostImproved = [...analytics.subjectPerformance].sort((a, b) => b.trend - a.trend)[0] ?? null;
  const formLevel = progress.lastVisited?.form ?? "Form not set";
  const lastActive = formatLastActive(progress.lastActive);
  const chaptersCompleted = totalChaptersCompleted(progress.chapterActivity);
  const recentActivity = (progress.recentActivity ?? []).slice(0, 6);
  const weeklyTotal = analytics.quizzesCompletedThisWeek + analytics.chaptersCompletedThisWeek + analytics.flashcardsReviewedThisWeek;

  return (
    <AcademyPageShell className="max-w-7xl">
      <header className="mb-7 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#111A2D]/95 via-[#0B1324]/95 to-[#0A1220]/95 p-5 shadow-[0_24px_80px_rgba(2,6,23,.45)] sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-emerald-300">
              <UsersRound className="h-4 w-4" /> Parent overview
            </div>
            <h1 className="font-display text-3xl font-black text-white sm:text-4xl">{analytics.studentName}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              {weeklyTotal > 0
                ? `${weeklyTotal} learning activities recorded this week. Here is where progress is building and where a little support can help.`
                : "No learning activity has been recorded this week yet. A short revision session is a good way to restart momentum."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:min-w-[520px]">
            <HeaderFact label="Level" value={formLevel} />
            <HeaderFact label="Current rank" value={analytics.rankName} />
            <HeaderFact label="Companion" value={`Nova · ${analytics.companionStageName}`} />
            <HeaderFact label="Last active" value={lastActive} />
          </div>
        </div>
      </header>

      {!canViewDashboard && <UpgradeBanner />}

      <section aria-labelledby="key-metrics" className="mb-8">
        <SectionHeading id="key-metrics" eyebrow="At a glance" title="Key learning metrics" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <Metric icon={<Star />} label="Total XP" value={analytics.totalXp.toLocaleString()} detail={`+${analytics.weeklyXp} this week`} color="#A78BFA" />
          <Metric icon={<Flame />} label="Current streak" value={`${analytics.studyStreak} days`} detail="Study consistency" color="#F59E0B" />
          <Metric icon={<BarChart3 />} label="Weekly activity" value={String(weeklyTotal)} detail="Recorded actions" color="#38BDF8" />
          <Metric icon={<Trophy />} label="Quiz average" value={averageQuiz === null ? "—" : `${averageQuiz}%`} detail={weeklyResults.length ? `${weeklyResults.length} attempts` : "No attempts yet"} color="#34D399" />
          <Metric icon={<BookOpen />} label="Chapters completed" value={String(chaptersCompleted)} detail="Notes, cards and quiz" color="#F472B6" />
        </div>
      </section>

      <LockedSection locked={!canViewAnalytics} label="Captain insight">
        <div className="grid gap-6 xl:grid-cols-[1.45fr_.8fr]">
          <Panel>
            <SectionHeading id="subjects" eyebrow="Performance" title="Subject progress" compact />
            {subjectRows.length ? (
              <div className="mt-5 space-y-4">
                {subjectRows.map((subject) => {
                  const performance = performanceById.get(subject.id);
                  const progressPct = Math.round(((progress.subjectXp[subject.id] ?? 0) / totalSubjectXp) * 100);
                  return <SubjectRow key={subject.id} name={subject.name} color={SUBJECT_COLOR[subject.id] ?? "#A78BFA"}
                    progress={progressPct} performance={performance} />;
                })}
              </div>
            ) : <InlineEmpty text="Subject progress will appear after the first learning activity." />}
          </Panel>

          <Panel>
            <SectionHeading id="insights" eyebrow="Plain-language guidance" title="Learning insights" compact />
            <div className="mt-5 space-y-3">
              <Insight icon={<Award />} label="Strongest subject" value={analytics.bestSubject?.name ?? "Not enough data"} />
              <Insight icon={<Target />} label="Needs attention" value={analytics.weakestSubject?.name ?? "Not enough data"} />
              <Insight icon={<TrendingUp />} label="Most improved" value={mostImproved && mostImproved.trend > 0 ? mostImproved.name : "Not enough history"} />
            </div>
            <div className="mt-5 rounded-2xl border border-violet-400/20 bg-violet-400/[.07] p-4">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-200"><Rocket className="h-4 w-4" /> Next revision mission</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{analytics.missionInsight.recommendation}</p>
            </div>
          </Panel>
        </div>
      </LockedSection>

      <section className="my-8 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <Panel>
          <SectionHeading id="activity" eyebrow="Latest learning" title="Weekly activity" compact />
          {recentActivity.length ? (
            <ol className="mt-5 space-y-2">
              {recentActivity.map((item) => (
                <li key={item.id} className="flex items-center gap-3 rounded-2xl border border-white/[.07] bg-white/[.035] p-3">
                  <ActivityIcon type={item.type} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{item.label}</p>
                    <p className="mt-0.5 text-xs capitalize text-slate-400">{item.type} · {formatActivityTime(item.timestamp)}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : <InlineEmpty text="Recent quizzes, notes and flashcard sessions will appear here." />}
        </Panel>

        <LockedSection locked={!canViewAnalytics} label="Captain insight" flush>
          <Panel className="h-full">
            <SectionHeading id="support" eyebrow="Support priorities" title="Topics to revisit" compact />
            {analytics.weakTopics.length ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {analytics.weakTopics.slice(0, 4).map((topic) => (
                  <div key={`${topic.subjectId}-${topic.chapterKey}`} className="rounded-2xl border border-amber-300/15 bg-amber-300/[.055] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div><p className="font-semibold text-white">{topic.chapterLabel}</p><p className="mt-1 text-xs text-slate-400">{topic.subjectName}</p></div>
                      <span className="rounded-full bg-amber-300/10 px-2.5 py-1 text-xs font-bold text-amber-200">{topic.avgScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : <InlineEmpty text="No weak topics detected from recent quizzes." />}
          </Panel>
        </LockedSection>
      </section>

      <section className="mb-8">
        <SectionHeading id="report" eyebrow="Parent-friendly summary" title="Weekly Parent Report" />
        <LockedSection locked={!canViewReports} label="Captain report">
          <WeeklyParentReportPreview analytics={analytics} />
        </LockedSection>
      </section>

      <div className="rounded-2xl border border-sky-300/15 bg-sky-300/[.05] px-4 py-3 text-sm leading-6 text-slate-300">
        <span className="font-semibold text-sky-200">Account note:</span> AcadeMY does not yet have a parent-to-child account link. This preview currently reflects the signed-in account's own progress; no other student's records are queried.
      </div>
    </AcademyPageShell>
  );
}

function SubjectRow({ name, color, progress, performance }: { name: string; color: string; progress: number; performance?: SubjectPerformance }) {
  const status = !performance ? "Building" : performance.avgScore >= 80 ? "Strong" : performance.trend > 0 ? "Improving" : "Needs Attention";
  return (
    <div className="grid items-center gap-3 rounded-2xl border border-white/[.07] bg-white/[.03] p-4 sm:grid-cols-[140px_1fr_70px_105px]">
      <p className="font-semibold text-white">{name}</p>
      <div><div className="mb-1.5 flex justify-between text-xs text-slate-400"><span>Current progress</span><span>{progress}%</span></div>
        <div className="h-2 overflow-hidden rounded-full bg-white/[.08]"><div className="h-full rounded-full" style={{ width: `${progress}%`, background: color }} /></div></div>
      <p className="text-sm font-bold tabular-nums" style={{ color }}>{performance ? `${performance.avgScore}%` : "—"}</p>
      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
        {performance?.trend !== undefined && (performance.trend >= 0 ? <TrendingUp className="h-3.5 w-3.5 text-emerald-300" /> : <TrendingDown className="h-3.5 w-3.5 text-rose-300" />)}{status}
      </span>
    </div>
  );
}

function LockedSection({ locked, label, children, flush = false }: { locked: boolean; label: string; children: ReactNode; flush?: boolean }) {
  if (!locked) return <>{children}</>;
  return <div className={`relative overflow-hidden rounded-[2rem] ${flush ? "h-full" : "my-8"}`}>
    <div aria-hidden="true" className="pointer-events-none select-none blur-[7px] opacity-45">{children}</div>
    <div className="absolute inset-0 flex items-center justify-center bg-[#070D18]/55 p-5 backdrop-blur-[2px]">
      <div className="max-w-sm rounded-2xl border border-violet-300/20 bg-[#10182A]/95 p-5 text-center shadow-2xl">
        <LockKeyhole className="mx-auto h-6 w-6 text-violet-300" />
        <p className="mt-3 font-display text-lg font-bold text-white">Unlock {label}</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">Captain plans include full subject trends, learning insights and parent reports.</p>
        <Link to="/upgrade" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-violet-500 px-4 py-2 text-sm font-bold text-white hover:bg-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300">Explore Captain <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </div>
  </div>;
}

function UpgradeBanner() { return <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-violet-300/20 bg-violet-400/[.07] p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-3"><Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" /><div><p className="font-semibold text-white">Parent Dashboard preview</p><p className="mt-1 text-sm text-slate-300">Core progress is visible. Captain unlocks detailed insights and weekly reports.</p></div></div><Link to="/upgrade" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl border border-violet-300/25 px-4 text-sm font-bold text-violet-100 hover:bg-violet-300/10">View plans</Link></div>; }
function Panel({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={`rounded-[2rem] border border-white/[.08] bg-[#0B1322]/80 p-5 shadow-[0_18px_60px_rgba(2,6,23,.28)] sm:p-6 ${className}`}>{children}</div>; }
function SectionHeading({ id, eyebrow, title, compact = false }: { id: string; eyebrow: string; title: string; compact?: boolean }) { return <div className={compact ? "" : "mb-4"}><p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-300">{eyebrow}</p><h2 id={id} className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">{title}</h2></div>; }
function HeaderFact({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-white/[.08] bg-white/[.045] p-3"><p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 text-sm font-semibold text-white">{value}</p></div>; }
function Metric({ icon, label, value, detail, color }: { icon: ReactNode; label: string; value: string; detail: string; color: string }) { return <div className="rounded-2xl border border-white/[.08] bg-[#0B1322]/80 p-4"><span className="flex h-9 w-9 items-center justify-center rounded-xl [&>svg]:h-4 [&>svg]:w-4" style={{ color, background: `${color}1A` }}>{icon}</span><p className="mt-4 text-xs font-semibold text-slate-400">{label}</p><p className="mt-1 font-display text-2xl font-black tabular-nums text-white">{value}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div>; }
function Insight({ icon, label, value }: { icon: ReactNode; label: string; value: string }) { return <div className="flex items-center gap-3 rounded-2xl border border-white/[.07] bg-white/[.035] p-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[.06] text-emerald-300 [&>svg]:h-4.5 [&>svg]:w-4.5">{icon}</span><div><p className="text-xs text-slate-400">{label}</p><p className="mt-0.5 text-sm font-semibold text-white">{value}</p></div></div>; }
function ActivityIcon({ type }: { type: string }) { const icon = type === "quiz" ? <CheckCircle2 /> : type === "flashcards" ? <Layers3 /> : <BookOpen />; return <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300 [&>svg]:h-4.5 [&>svg]:w-4.5">{icon}</span>; }
function InlineEmpty({ text }: { text: string }) { return <div className="mt-5 rounded-2xl border border-dashed border-white/10 p-5 text-center text-sm text-slate-400">{text}</div>; }
function DashboardSkeleton() { return <AcademyPageShell className="max-w-7xl"><div aria-label="Loading Parent Dashboard" className="animate-pulse space-y-6"><div className="h-48 rounded-[2rem] bg-white/[.05]" /><div className="grid grid-cols-2 gap-3 lg:grid-cols-5">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-36 rounded-2xl bg-white/[.05]" />)}</div><div className="grid gap-6 lg:grid-cols-2"><div className="h-80 rounded-[2rem] bg-white/[.05]" /><div className="h-80 rounded-[2rem] bg-white/[.05]" /></div></div></AcademyPageShell>; }
function EmptyPanel({ icon, title, body, action, to }: { icon: ReactNode; title: string; body: string; action?: string; to?: string }) { return <div className="mx-auto mt-16 max-w-xl rounded-[2rem] border border-white/10 bg-[#0B1322]/85 p-8 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300 [&>svg]:h-5 [&>svg]:w-5">{icon}</span><h1 className="mt-5 font-display text-2xl font-bold text-white">{title}</h1><p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>{action && to && <Link to={to} className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-emerald-500 px-5 text-sm font-bold text-emerald-950">{action}</Link>}</div>; }
function formatLastActive(value: string) { if (!value) return "No activity yet"; const date = new Date(`${value}T00:00:00`); const days = Math.floor((Date.now() - date.getTime()) / 86_400_000); if (days <= 0) return "Today"; if (days === 1) return "Yesterday"; return `${days} days ago`; }
function formatActivityTime(value: number) { return new Intl.DateTimeFormat("en-MY", { weekday: "short", hour: "numeric", minute: "2-digit" }).format(new Date(value)); }
