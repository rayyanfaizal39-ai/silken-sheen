import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight, Award, BarChart3, CheckCircle2,
  Flame, LockKeyhole, Rocket, Sparkles,
  Star, Target, Trophy, UsersRound,
} from "lucide-react";
import { AcademyPageShell } from "@/components/AcademyPage";
import { useAuth } from "@/context/auth-context";
import { COMPANION_STAGES, getCompanionStageForXp, getRank, useProgress } from "@/hooks/use-progress";
import {
  buildParentDashboardModel,
  formatQuizAverage,
  parentDashboardHistorySince,
  type ParentDashboardModel,
  type ParentDashboardQuiz,
} from "@/features/parent-dashboard/parentDashboardData";
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
  const [model, setModel] = useState<ParentDashboardModel | null>(null);
  const [storedPlan, setStoredPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [quizError, setQuizError] = useState(false);

  useEffect(() => {
    let active = true;
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setQuizError(false);
    const now = new Date();
    const subscriptionRequest = isSupabaseConfigured
      ? supabase
          .from("subscriptions")
          .select("plan")
          .eq("user_id", user.id)
          .eq("status", "active")
          .maybeSingle()
      : Promise.resolve({ data: null, error: null });
    const quizRequest = isSupabaseConfigured
      ? supabase
          .from("quiz_history")
          .select("created_at, score_pct, subject_id, chapter_key, xp_earned")
          .eq("user_id", user.id)
          .gte("created_at", parentDashboardHistorySince(now))
      : Promise.resolve({ data: [], error: null });

    Promise.all([quizRequest, subscriptionRequest]).then(([quizResult, subscriptionResult]) => {
      if (!active) return;
      if (subscriptionResult.error && import.meta.env.DEV) {
        console.error("[parent-dashboard] subscription plan query failed", subscriptionResult.error);
      }
      if (quizResult.error) {
        if (import.meta.env.DEV) console.error("[parent-dashboard] quiz history query failed", quizResult.error);
        setQuizError(true);
        setModel(null);
        setLoading(false);
        return;
      }
      setStoredPlan(subscriptionResult.data?.plan ?? null);
      setModel(buildParentDashboardModel({
        studentName: user.name?.trim() || "Student",
        now,
        quizzes: (quizResult.data ?? []).map(toParentDashboardQuiz),
      }));
      setLoading(false);
    }).catch((error: unknown) => {
      if (import.meta.env.DEV) console.error("[parent-dashboard] analytics load failed", error);
      if (active) {
        setQuizError(true);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, [authLoading, user]);

  if (authLoading || loading) return <DashboardSkeleton />;

  if (!user) {
    return (
      <AcademyPageShell className="max-w-6xl">
        <EmptyPanel icon={<UsersRound />} title="Sign in to view the Parent Dashboard"
          body="Your child's learning summary is private. Sign in to continue." action="Sign in" to="/login" />
      </AcademyPageShell>
    );
  }

  if (quizError || !model) {
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
  const canViewPremiumAnalytics = canViewAnalytics && canViewReports;

  return <DashboardContent model={model} progress={progress} canViewDashboard={canViewDashboard}
    canViewPremiumAnalytics={canViewPremiumAnalytics} canViewReports={canViewReports} />;
}

function toParentDashboardQuiz(row: {
  created_at: string;
  score_pct: number | string | null;
  subject_id: string;
  chapter_key: string;
  xp_earned: number | string | null;
}): ParentDashboardQuiz {
  return {
    createdAt: row.created_at,
    scorePct: finiteNumber(row.score_pct),
    subjectId: row.subject_id,
    chapterKey: row.chapter_key,
    xpEarned: finiteNumber(row.xp_earned),
  };
}

function finiteNumber(value: number | string | null): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string" || value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function DashboardContent({ model, progress, canViewDashboard, canViewPremiumAnalytics, canViewReports }: {
  model: ParentDashboardModel;
  progress: ReturnType<typeof useProgress>["progress"];
  canViewDashboard: boolean;
  canViewPremiumAnalytics: boolean;
  canViewReports: boolean;
}) {
  const activeSubjectIds = new Set(Object.keys(progress.subjectXp));
  const totalSubjectXp = Math.max(1, Object.values(progress.subjectXp).reduce((sum, value) => sum + value, 0));
  const subjectRows = subjects.filter((subject) => activeSubjectIds.has(subject.id));
  const formLevel = progress.lastVisited?.form ?? "Form not set";
  const lastActive = formatLastActive(progress.lastActive);
  const rankName = getRank(progress.xp).name;
  const companionStage = COMPANION_STAGES.find((stage) => stage.id === getCompanionStageForXp(progress.xp));
  const attention = attentionSummary(model);
  const strongest = model.recent.strongest;

  return (
    <AcademyPageShell className="max-w-7xl">
      <header className="mb-7 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#111A2D]/95 via-[#0B1324]/95 to-[#0A1220]/95 p-5 shadow-[0_24px_80px_rgba(2,6,23,.45)] sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-emerald-300">
              <UsersRound className="h-4 w-4" /> Parent overview
            </div>
            <h1 className="font-display text-3xl font-black text-white sm:text-4xl">{model.studentName}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              {model.thisWeek.quizzes > 0
                ? `${model.thisWeek.quizzes} quiz${model.thisWeek.quizzes === 1 ? "" : "zes"} recorded this Monday–Sunday week.`
                : "No quizzes have been recorded this Monday–Sunday week."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:min-w-[520px]">
            <HeaderFact label="Level" value={formLevel} />
            <HeaderFact label="Current rank" value={rankName} />
            <HeaderFact label="Companion" value={`Nova · ${companionStage?.name ?? "Egg"}`} />
            <HeaderFact label="Last active" value={lastActive} />
          </div>
        </div>
      </header>

      {!canViewDashboard && <UpgradeBanner />}

      <section aria-labelledby="this-week" className="mb-8">
        <SectionHeading id="this-week" eyebrow="Monday–Sunday" title="This week" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric icon={<BarChart3 />} label="Quizzes this week" value={String(model.thisWeek.quizzes)} detail="Recorded quizzes" color="#38BDF8" />
          <Metric icon={<Star />} label="Weekly quiz XP" value={model.thisWeek.weeklyXp.toLocaleString()} detail="From this week's quizzes" color="#A78BFA" />
          <Metric icon={<Trophy />} label="Quiz average" value={formatQuizAverage(model.thisWeek.average)} detail={model.thisWeek.quizzes ? `${model.thisWeek.quizzes} quizzes` : "No quizzes yet"} color="#34D399" />
          <Metric icon={<CheckCircle2 />} label="Active quiz days" value={String(model.thisWeek.activeDays)} detail="Days with a quiz" color="#F59E0B" />
        </div>
      </section>

      <section aria-labelledby="last-week" className="mb-8">
        <SectionHeading id="last-week" eyebrow={model.lastWeek.periodLabel} title="Last week" />
        {canViewReports ? <LastWeekDetails model={model} /> : (
          <LockedSection locked label="Captain report">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Metric icon={<BarChart3 />} label="Quizzes" value="—" detail="Previous completed week" color="#38BDF8" />
              <Metric icon={<Trophy />} label="Average score" value="—" detail="Previous completed week" color="#34D399" />
              <Metric icon={<Star />} label="XP earned" value="—" detail="Previous completed week" color="#A78BFA" />
              <Metric icon={<CheckCircle2 />} label="Active days" value="— / 7" detail="Previous completed week" color="#F59E0B" />
            </div>
          </LockedSection>
        )}
      </section>

      <section aria-labelledby="recent-learning" className="mb-8">
        <SectionHeading id="recent-learning" eyebrow="Recent learning" title="Last 30 days" />
        {canViewPremiumAnalytics ? (
          <Panel>
            <div className="space-y-3">
              <Insight icon={<BarChart3 />} label="Recent quizzes" value={String(model.recent.quizzes)} />
              <Insight icon={<Trophy />} label="Recent average" value={formatQuizAverage(model.recent.average)} />
              <Insight icon={<Award />} label="Strongest subject" value={strongest ? strongest.name : "Not enough recent data"} detail={strongest ? `${formatQuizAverage(strongest.average)} average · ${strongest.quizzes} quizzes` : undefined} />
              <Insight icon={<Target />} label="Needs attention" value={attention.value} detail={attention.detail} />
              {model.mostImproved ? (
                <Insight icon={<Award />} label="Most improved" value={model.mostImproved.name} detail={`+${model.mostImproved.change} points vs the previous 30 days`} />
              ) : null}
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-300">{model.recent.insight}</p>
            <div className="mt-5 rounded-2xl border border-violet-400/20 bg-violet-400/[.07] p-4">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-200"><Rocket className="h-4 w-4" /> Revision recommendation</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{model.recent.recommendation}</p>
            </div>
          </Panel>
        ) : (
          <LockedSection locked label="Captain insight">
            <Panel><p className="text-sm text-slate-300">Recent quiz results from the last 30 days.</p></Panel>
          </LockedSection>
        )}
      </section>

      <section aria-labelledby="overall-progress" className="mb-8">
        <SectionHeading id="overall-progress" eyebrow="Lifetime and current standing" title="Overall progress" />
        <div className="mb-6 grid grid-cols-2 gap-3 lg:max-w-xl">
          <Metric icon={<Star />} label="Total XP" value={progress.xp.toLocaleString()} detail="Lifetime" color="#A78BFA" />
          <Metric icon={<Flame />} label="Current streak" value={`${progress.streak} days`} detail="Current study streak" color="#F59E0B" />
        </div>
        {canViewPremiumAnalytics ? (
          <Panel>
            <SectionHeading id="subjects" eyebrow="Subject XP distribution" title="Subject XP" compact />
            {subjectRows.length ? (
              <div className="mt-5 space-y-4">
                {subjectRows.map((subject) => {
                  const share = Math.round(((progress.subjectXp[subject.id] ?? 0) / totalSubjectXp) * 100);
                  return <SubjectRow key={subject.id} name={subject.name} color={SUBJECT_COLOR[subject.id] ?? "#A78BFA"} share={share} />;
                })}
              </div>
            ) : <InlineEmpty text="Subject XP will appear after XP is earned in a subject." />}
          </Panel>
        ) : (
          <LockedSection locked label="Captain insight">
            <Panel><p className="text-sm text-slate-300">Share of subject XP.</p></Panel>
          </LockedSection>
        )}
      </section>

      <section className="mb-8">
        <SectionHeading id="report" eyebrow="Monday–Sunday report" title="Weekly Parent Report" />
        <LockedSection locked={!canViewReports} label="Captain report">
          <Panel>
            <p className="text-sm leading-6 text-slate-300">The Monday–Sunday report uses this week's recorded quizzes and the current streak.</p>
            <Link to="/weekly-report" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-violet-500 px-4 py-2 text-sm font-bold text-white hover:bg-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300">Preview this week's report <ArrowRight className="h-4 w-4" /></Link>
          </Panel>
        </LockedSection>
      </section>

      <div className="rounded-2xl border border-sky-300/15 bg-sky-300/[.05] px-4 py-3 text-sm leading-6 text-slate-300">
        <span className="font-semibold text-sky-200">Account note:</span> AcadeMY does not yet have a parent-to-child account link. This preview currently reflects the signed-in account's own progress; no other student's records are queried.
      </div>
    </AcademyPageShell>
  );
}

function LastWeekDetails({ model }: { model: ParentDashboardModel }) {
  const week = model.lastWeek;
  const attention = week.weakestChapter
    ? {
        value: `${week.weakestChapter.subjectName} · ${week.weakestChapter.chapterKey}`,
        detail: `${formatQuizAverage(week.weakestChapter.average)} · ${week.weakestChapter.attempts} quizzes`,
      }
    : week.weakestSubject
      ? {
          value: week.weakestSubject.name,
          detail: `${formatQuizAverage(week.weakestSubject.average)} average · ${week.weakestSubject.quizzes} quizzes`,
        }
      : null;
  return (
    <>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric icon={<BarChart3 />} label="Quizzes" value={String(week.quizzes)} detail="Recorded last week" color="#38BDF8" />
        <Metric icon={<Trophy />} label="Average score" value={formatQuizAverage(week.average)} detail={week.quizzes ? "Mean quiz score" : "No quizzes yet"} color="#34D399" />
        <Metric icon={<Star />} label="XP earned" value={week.xpEarned.toLocaleString()} detail="From last week's quizzes" color="#A78BFA" />
        <Metric icon={<CheckCircle2 />} label="Active days" value={`${week.activeDays} / 7`} detail="Days with a quiz" color="#F59E0B" />
      </div>
      <Panel className="mt-4">
        <p className="text-sm leading-6 text-slate-300">{week.summary}</p>
        {week.quizzes > 0 ? (
          <div className="mt-4 space-y-3">
            {week.strongest ? <Insight icon={<Award />} label="Strongest subject" value={`${week.strongest.name} · ${formatQuizAverage(week.strongest.average)} average`} detail={`${week.strongest.quizzes} quizzes`} /> : null}
            {attention ? <Insight icon={<Target />} label="Needs attention" value={attention.value} detail={attention.detail} /> : null}
            {week.biggestWin ? <Insight icon={<Trophy />} label="Biggest win" value={`${week.biggestWin.subjectName} · ${week.biggestWin.chapterKey}`} detail={formatQuizAverage(week.biggestWin.scorePct)} /> : null}
          </div>
        ) : null}
      </Panel>
    </>
  );
}

function SubjectRow({ name, color, share }: { name: string; color: string; share: number }) {
  return (
    <div className="grid items-center gap-3 rounded-2xl border border-white/[.07] bg-white/[.03] p-4 sm:grid-cols-[140px_1fr]">
      <p className="font-semibold text-white">{name}</p>
      <div>
        <div className="mb-1.5 flex justify-between text-xs text-slate-400"><span>Share of subject XP</span><span>{share}%</span></div>
        <div className="h-2 overflow-hidden rounded-full bg-white/[.08]"><div className="h-full rounded-full" style={{ width: `${share}%`, background: color }} /></div>
      </div>
    </div>
  );
}

function attentionSummary(model: ParentDashboardModel): { value: string; detail?: string } {
  const chapter = model.recent.weakestChapter;
  if (chapter) {
    return {
      value: `${chapter.subjectName} · ${chapter.chapterKey}`,
      detail: `${formatQuizAverage(chapter.average)} · ${chapter.attempts} quizzes`,
    };
  }
  const subject = model.recent.weakestSubject;
  if (subject) {
    return {
      value: subject.name,
      detail: `${formatQuizAverage(subject.average)} average · ${subject.quizzes} quizzes`,
    };
  }
  return { value: "Not enough recent data" };
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
function Metric({ icon, label, value, detail, color }: { icon: ReactNode; label: string; value: string; detail: string; color: string }) { return <div className="rounded-2xl border border-white/[.08] bg-[#0B1322]/80 p-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl [&>svg]:h-5 [&>svg]:w-5" style={{ color, background: `${color}1A` }}>{icon}</span><p className="mt-4 text-xs font-semibold text-slate-400">{label}</p><p className="mt-1 font-display text-2xl font-black tabular-nums text-white">{value}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div>; }
function Insight({ icon, label, value, detail }: { icon: ReactNode; label: string; value: string; detail?: string }) { return <div className="flex items-center gap-3 rounded-2xl border border-white/[.07] bg-white/[.035] p-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[.06] text-emerald-300 [&>svg]:h-4.5 [&>svg]:w-4.5">{icon}</span><div className="min-w-0"><p className="text-xs text-slate-400">{label}</p><p className="mt-0.5 truncate text-sm font-semibold text-white">{value}</p>{detail ? <p className="mt-0.5 truncate text-xs text-slate-400">{detail}</p> : null}</div></div>; }
function InlineEmpty({ text }: { text: string }) { return <div className="mt-5 rounded-2xl border border-dashed border-white/10 p-5 text-center text-sm text-slate-400">{text}</div>; }
function DashboardSkeleton() { return <AcademyPageShell className="max-w-7xl"><div aria-label="Loading Parent Dashboard" className="animate-pulse space-y-6"><div className="h-48 rounded-[2rem] bg-white/[.05]" /><div className="grid grid-cols-2 gap-3 lg:grid-cols-5">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-36 rounded-2xl bg-white/[.05]" />)}</div><div className="grid gap-6 lg:grid-cols-2"><div className="h-80 rounded-[2rem] bg-white/[.05]" /><div className="h-80 rounded-[2rem] bg-white/[.05]" /></div></div></AcademyPageShell>; }
function EmptyPanel({ icon, title, body, action, to }: { icon: ReactNode; title: string; body: string; action?: string; to?: string }) { return <div className="mx-auto mt-16 max-w-xl rounded-[2rem] border border-white/10 bg-[#0B1322]/85 p-8 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300 [&>svg]:h-5 [&>svg]:w-5">{icon}</span><h1 className="mt-5 font-display text-2xl font-bold text-white">{title}</h1><p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>{action && to && <Link to={to} className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-emerald-500 px-5 text-sm font-bold text-emerald-950">{action}</Link>}</div>; }
function formatLastActive(value: string) { if (!value) return "No activity yet"; const date = new Date(`${value}T00:00:00`); const days = Math.floor((Date.now() - date.getTime()) / 86_400_000); if (days <= 0) return "Today"; if (days === 1) return "Yesterday"; return `${days} days ago`; }
