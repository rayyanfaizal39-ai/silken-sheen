import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, type ReactNode } from "react";
import {
  Radar,
  TrendingUp,
  TrendingDown,
  Target,
  Sparkles,
  ArrowRight,
  BookOpen,
  Brain,
  Trophy,
  Activity,
  LoaderCircle,
  Lock,
} from "lucide-react";
import { QUIZ_PASS_PCT } from "@/hooks/use-progress";
import { useTrackerHistory } from "@/hooks/use-tracker-history";
import { analyzeProgress, type SubjectStat } from "@/lib/tracker";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/tracker")({
  // Per-user analytics — noindex, same as /dashboard.
  head: () =>
    seoMeta({
      title: "AI Study Tracker",
      description:
        "Your AI study tracker on AcadeMY — see exactly where you're strong and where to focus next in KSSM.",
      path: "/tracker",
      noindex: true,
    }),
  component: TrackerPage,
});

function scoreColor(pct: number): string {
  if (pct >= 90) return "#34D399";
  if (pct >= QUIZ_PASS_PCT) return "#FBBF24";
  if (pct >= 50) return "#FB923C";
  return "#F87171";
}

function TrackerPage() {
  const { user, history, eligible, loading, error } = useTrackerHistory();
  const insight = useMemo(() => analyzeProgress(history), [history]);

  if (loading) {
    return (
      <TrackerGate
        icon={<LoaderCircle className="h-8 w-8 animate-spin" />}
        title="Loading your Tracker"
      />
    );
  }
  if (!user) {
    return (
      <TrackerGate
        icon={<Lock className="h-8 w-8" />}
        title="Sign in to view your Tracker"
        body="Your study history is private and linked to your AcadeMY account."
        action="Sign in"
        to="/login"
      />
    );
  }
  if (error) {
    return (
      <TrackerGate icon={<Radar className="h-8 w-8" />} title="Tracker unavailable" body={error} />
    );
  }
  if (!eligible) {
    return (
      <TrackerGate
        icon={<Lock className="h-8 w-8" />}
        title="AI Tracker is a paid feature"
        body="Upgrade to unlock your personal quiz history, weak spots, and study recommendations."
        action="View plans"
        to="/upgrade"
      />
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-6 pb-[calc(var(--mobile-content-bottom)+1rem)] sm:px-6 lg:px-8 lg:pb-10 space-y-6">
      {/* ── Hero ── */}
      <header className="relative overflow-hidden rounded-[2rem] border border-[#22D3EE]/25 bg-gradient-to-br from-[#0E7490]/25 via-[#0B1220]/70 to-[#1E1B4B]/40 p-6 backdrop-blur-2xl sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.28),transparent_60%)] blur-2xl" />
        <div className="relative flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#22D3EE] to-[#6366F1] shadow-[0_0_28px_rgba(34,211,238,0.5)]">
            <Radar className="h-7 w-7 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#67E8F9]">
              AI Study Tracker
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
              Where to focus next
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
              The Tracker watches every quiz you take and pinpoints your weak spots — so your study
              time goes exactly where it counts.
            </p>
          </div>
        </div>

        {/* Recommendation banner */}
        <div className="relative mt-5 flex items-start gap-3 rounded-2xl border border-[#22D3EE]/20 bg-[#22D3EE]/10 p-4">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#67E8F9]" />
          <p className="text-sm font-medium leading-relaxed text-cyan-50">
            {insight.recommendation}
          </p>
        </div>
      </header>

      {insight.totalQuizzes === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* ── Top-line stats ── */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <StatTile
              icon={Activity}
              label="Overall avg"
              value={`${insight.overallAvg}%`}
              color={scoreColor(insight.overallAvg)}
            />
            <StatTile
              icon={Target}
              label="Pass rate"
              value={`${insight.passRate}%`}
              color="#A78BFA"
            />
            <StatTile
              icon={Brain}
              label="Quizzes"
              value={String(insight.totalQuizzes)}
              color="#60A5FA"
            />
          </div>

          {/* ── Subject mastery ── */}
          <section className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
              <Trophy className="h-5 w-5 text-[#FBBF24]" />
              Subject mastery
            </h2>
            <div className="space-y-4">
              {insight.subjectStats
                .slice()
                .sort((a, b) => b.avgScore - a.avgScore)
                .map((s) => (
                  <SubjectBar key={s.subjectId} stat={s} />
                ))}
            </div>
          </section>

          {/* ── Weak spots ── */}
          <section className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-5 backdrop-blur-2xl sm:p-6">
            <h2 className="mb-1 flex items-center gap-2 font-display text-lg font-bold text-white">
              <Target className="h-5 w-5 text-[#F87171]" />
              Priority weak spots
            </h2>
            <p className="mb-4 text-sm text-white/45">
              Chapters scoring below {QUIZ_PASS_PCT}% — tackle these first.
            </p>

            {insight.weakSpots.length === 0 ? (
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                <TrendingUp className="h-5 w-5 shrink-0 text-emerald-400" />
                <p className="text-sm font-medium text-emerald-100">
                  No weak spots right now — every chapter you've quizzed is at or above{" "}
                  {QUIZ_PASS_PCT}%. 🎯
                </p>
              </div>
            ) : (
              <ul className="space-y-2.5">
                {insight.weakSpots.map((w) => (
                  <li key={`${w.subjectId}-${w.chapterKey}`}>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3.5">
                      <span
                        className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl text-xs font-black tabular-nums"
                        style={{
                          background: `${scoreColor(w.avgScore)}22`,
                          color: scoreColor(w.avgScore),
                        }}
                      >
                        {w.avgScore}%
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-white">{w.chapterLabel}</p>
                        <p className="truncate text-xs text-white/45">
                          {w.subjectName} · {w.attempts} attempt{w.attempts !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex shrink-0 gap-1.5">
                        <Link
                          to="/notes"
                          search={{ subject: w.subjectId, form: 1 } as Record<string, unknown>}
                          className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.05] px-2.5 py-2 text-[11px] font-bold text-white/70 transition-colors hover:bg-white/[0.1] hover:text-white"
                          aria-label={`Revise notes for ${w.chapterLabel}`}
                        >
                          <BookOpen className="h-3.5 w-3.5" /> Revise
                        </Link>
                        <Link
                          to="/quizzes"
                          search={{ subject: w.subjectId, form: 1 } as Record<string, unknown>}
                          className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] px-2.5 py-2 text-[11px] font-black text-[#050816] transition-transform hover:scale-[1.03]"
                          aria-label={`Retry quiz for ${w.chapterLabel}`}
                        >
                          Retry <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* ── Parent report nudge ── */}
          <Link
            to="/parent"
            className="group flex items-center gap-4 rounded-[2rem] border border-[#34D399]/25 bg-[#34D399]/10 px-5 py-4 backdrop-blur-2xl transition-all hover:border-[#34D399]/45 hover:bg-[#34D399]/15"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#34D399]/20">
              <TrendingUp className="h-5 w-5 text-[#34D399]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-emerald-100">Share this progress with a parent</p>
              <p className="text-sm text-emerald-300/70">
                Send an automatic weekly or monthly Mission Report.
              </p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-[#34D399] transition-transform group-hover:translate-x-0.5" />
          </Link>
        </>
      )}
    </section>
  );
}

function TrackerGate({
  icon,
  title,
  body,
  action,
  to,
}: {
  icon: ReactNode;
  title: string;
  body?: string;
  action?: string;
  to?: "/login" | "/upgrade";
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-10 text-center backdrop-blur-2xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#22D3EE]/15 text-[#67E8F9]">
          {icon}
        </div>
        <h1 className="font-display text-xl font-bold text-white">{title}</h1>
        {body && <p className="mx-auto mt-2 max-w-md text-sm text-white/45">{body}</p>}
        {action && to && (
          <Link
            to={to}
            className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-[#22D3EE] to-[#6366F1] px-6 py-3 text-sm font-bold text-white"
          >
            {action}
          </Link>
        )}
      </div>
    </section>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0B1220]/62 p-4 backdrop-blur-2xl">
      <Icon className="mb-2 h-5 w-5" style={{ color }} />
      <p className="font-display text-2xl font-extrabold tabular-nums text-white">{value}</p>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-white/40">{label}</p>
    </div>
  );
}

function SubjectBar({ stat }: { stat: SubjectStat }) {
  const color = scoreColor(stat.avgScore);
  const improving = stat.trend > 0;
  const flat = stat.trend === 0;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="truncate text-sm font-bold text-white">{stat.name}</span>
        <span className="flex items-center gap-2 text-xs">
          {!flat &&
            (improving ? (
              <span className="flex items-center gap-0.5 text-emerald-400">
                <TrendingUp className="h-3.5 w-3.5" /> +{stat.trend}
              </span>
            ) : (
              <span className="flex items-center gap-0.5 text-rose-400">
                <TrendingDown className="h-3.5 w-3.5" /> {stat.trend}
              </span>
            ))}
          <span className="font-black tabular-nums" style={{ color }}>
            {stat.avgScore}%
          </span>
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${stat.avgScore}%`,
            background: `linear-gradient(90deg, ${color}99, ${color})`,
          }}
        />
      </div>
      <p className="mt-1 text-[11px] text-white/35">
        {stat.attempts} quiz{stat.attempts !== 1 ? "zes" : ""} · best {stat.bestScore}% · last{" "}
        {stat.lastScore}%
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-10 text-center backdrop-blur-2xl">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#22D3EE]/15">
        <Brain className="h-8 w-8 text-[#67E8F9]" />
      </div>
      <h2 className="font-display text-xl font-bold text-white">No data to chart yet</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-white/45">
        Complete a few quizzes and the AI Tracker will map your strengths and pinpoint exactly what
        to study next.
      </p>
      <Link
        to="/quizzes"
        className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#22D3EE] to-[#6366F1] px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03]"
      >
        <Brain className="h-4 w-4" /> Take a quiz
      </Link>
    </div>
  );
}
