import { createFileRoute } from '@tanstack/react-router';
import { getReportsData } from './-reports.server';
import type { ReportsData } from '../lib/admin.types';
import { Panel, StatCard, BarList, Pill } from '../components/admin/ui';

export const Route = createFileRoute('/admin/reports')({
  loader: async () => {
    try {
      return { reports: await getReportsData() };
    } catch (e) {
      console.error('[admin] getReportsData failed:', e);
      return { reports: null as ReportsData | null };
    }
  },
  component: ReportsPage,
});

function Empty({ children }: { children: React.ReactNode }) {
  return <div className="empty">{children}</div>;
}

function HealthPill({ ok, okLabel, badLabel }: { ok: boolean; okLabel: string; badLabel: string }) {
  return <Pill kind={ok ? 'paid' : 'failed'}>{ok ? okLabel : badLabel}</Pill>;
}

function ReportsPage() {
  const { reports } = Route.useLoaderData() as { reports: ReportsData | null };

  if (!reports) {
    return (
      <div className="admin-content">
        <Panel title="Mission Intelligence">
          <Empty>Reports will appear once students begin learning.</Empty>
        </Panel>
      </div>
    );
  }

  const { mission_brief, top_metrics, learning_insights, platform_health, content_status, premium_insights, charts } = reports;

  const briefLines = [
    mission_brief.new_students_this_week > 0 ? `+${mission_brief.new_students_this_week} new students this week` : null,
    mission_brief.quizzes_this_week > 0 ? `${mission_brief.quizzes_this_week} quizzes completed this week` : null,
    mission_brief.most_studied_subject ? `${mission_brief.most_studied_subject} is the most studied subject` : null,
    mission_brief.new_premium_this_week > 0 ? `${mission_brief.new_premium_this_week} premium subscription${mission_brief.new_premium_this_week === 1 ? '' : 's'} this week` : null,
    mission_brief.content_awaiting_publication > 0 ? `${mission_brief.content_awaiting_publication} content item${mission_brief.content_awaiting_publication === 1 ? '' : 's'} awaiting publication` : null,
  ].filter((l): l is string => !!l);

  return (
    <div className="admin-content">
      {/* ── Founder Mission Brief ── */}
      <Panel title="Today's Mission Brief" badge={<span className="chip chip-orange">Live</span>}>
        {briefLines.length ? (
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13.5 }}>
            {briefLines.map((line, i) => <li key={i}>{line}</li>)}
          </ul>
        ) : (
          <Empty>No activity yet this week. This brief fills in automatically once students start learning.</Empty>
        )}
      </Panel>

      {/* ── Top metric cards ── */}
      <div className="admin-grid cols-4">
        <StatCard k="Students" v={top_metrics.students} />
        <StatCard k="Premium Users" v={top_metrics.premium_users} chip="💎" chipClass="chip-violet" />
        <StatCard k="Daily Active Users" v={top_metrics.daily_active_users} />
        <StatCard k="New Users This Week" v={top_metrics.new_users_this_week} />
        <StatCard k="Quizzes Completed Today" v={top_metrics.quizzes_completed_today} />
        <StatCard k="Total XP Earned Today" v={top_metrics.total_xp_earned_today ?? '—'} c={top_metrics.total_xp_earned_today == null ? 'Not tracked yet (no daily XP ledger)' : undefined} />
        <StatCard k="Active Study Streaks" v={top_metrics.active_study_streaks} />
        <StatCard k="AI Requests" v={top_metrics.ai_requests ?? '—'} c={top_metrics.ai_requests == null ? 'Not tracked yet (no usage log)' : undefined} />
      </div>

      {/* ── Learning Insights ── */}
      <Panel title="Learning Insights">
        <div className="admin-grid cols-4">
          <InsightCard label="Most Popular Subject" value={learning_insights.most_popular_subject ? `${learning_insights.most_popular_subject.label} (${learning_insights.most_popular_subject.count} quizzes)` : null} empty="No quiz activity yet." />
          <InsightCard label="Most Popular Chapter" value={learning_insights.most_popular_chapter ? `${learning_insights.most_popular_chapter.label} (${learning_insights.most_popular_chapter.count} quizzes)` : null} empty="No quiz activity yet." />
          <InsightCard label="Lowest Quiz Accuracy" value={learning_insights.lowest_accuracy_chapter ? `${learning_insights.lowest_accuracy_chapter.label} — ${learning_insights.lowest_accuracy_chapter.avg_score_pct}%` : null} empty="No quiz activity yet." />
          <InsightCard label="Highest Quiz Accuracy" value={learning_insights.highest_accuracy_chapter ? `${learning_insights.highest_accuracy_chapter.label} — ${learning_insights.highest_accuracy_chapter.avg_score_pct}%` : null} empty="No quiz activity yet." />
          <InsightCard label="Most Improved Student" value={learning_insights.most_improved_student ? `${learning_insights.most_improved_student.name} (+${learning_insights.most_improved_student.delta_pct}%)` : null} empty="Not enough quiz history yet to measure improvement." />
          <InsightCard label="Most Active Student" value={learning_insights.most_active_student ? `${learning_insights.most_active_student.name} (${learning_insights.most_active_student.quiz_count} quizzes)` : null} empty="No quiz activity yet." />
          <InsightCard label="Newest Student" value={learning_insights.newest_student ? learning_insights.newest_student.name : null} empty="No students yet." />
        </div>
      </Panel>

      {/* ── Platform Health ── */}
      <Panel title="Platform Health">
        <div className="admin-grid cols-3">
          <HealthCard label="Storage Status"><HealthPill ok={platform_health.storage_status === 'operational'} okLabel="Operational" badLabel="Not configured" /></HealthCard>
          <HealthCard label="Database Status"><HealthPill ok={platform_health.database_status === 'operational'} okLabel="Operational" badLabel="Error" /></HealthCard>
          <HealthCard label="Authentication Status"><HealthPill ok={platform_health.auth_status === 'operational'} okLabel="Operational" badLabel="Not configured" /></HealthCard>
          <HealthCard label="Content Library Status"><HealthPill ok={platform_health.content_library_status === 'operational'} okLabel="Operational" badLabel="Bucket missing" /></HealthCard>
          <HealthCard label="Last Backup"><span style={{ color: 'var(--muted)' }}>Managed by Supabase (see project dashboard)</span></HealthCard>
          <HealthCard label="System Health"><HealthPill ok={platform_health.system_health === 'operational'} okLabel="All systems operational" badLabel="Degraded" /></HealthCard>
        </div>
      </Panel>

      {/* ── Content Status ── */}
      <Panel title="Content Status">
        <div className="admin-grid cols-4">
          <StatCard k="Total Subjects" v={content_status.total_subjects} />
          <StatCard k="Total Chapters" v={content_status.total_chapters} />
          <StatCard k="Content Library Files" v={content_status.content_library_files} />
          <StatCard k="Missing Content" v={content_status.missing_content} chip={content_status.missing_content > 0 ? '⚠' : undefined} chipClass="chip-orange" />
          <StatCard k="Published Notes" v={content_status.published_notes} />
          <StatCard k="Published Quizzes" v={content_status.published_quizzes} />
          <StatCard k="Published Flashcards" v={content_status.published_flashcards} />
          <StatCard k="Published Mindmaps" v={content_status.published_mindmaps} />
        </div>
      </Panel>

      {/* ── Premium Insights ── */}
      <Panel title="Premium Insights">
        <div className="admin-grid cols-4">
          <StatCard k="Premium Users" v={premium_insights.premium_users} />
          <StatCard k="Free Users" v={premium_insights.free_users} />
          <StatCard k="Conversion Rate" v={`${premium_insights.conversion_rate_pct}%`} />
          <StatCard k="New Premium This Month" v={premium_insights.new_premium_this_month} />
          <StatCard k="Expired Subscriptions" v={premium_insights.expired_subscriptions ?? '—'} c="Not tracked yet (no expiry field on payments)" />
        </div>
      </Panel>

      {/* ── Charts ── */}
      <div className="admin-grid cols-2">
        <Panel title="New Users (Last 30 Days)">
          {charts.new_users_30d.some((d) => d.value > 0) ? (
            <BarList data={charts.new_users_30d.slice(-10).map((d) => ({ label: d.day.slice(5), value: d.value }))} />
          ) : (
            <Empty>Reports will appear once students begin registering.</Empty>
          )}
        </Panel>
        <Panel title="Quiz Activity (Last 30 Days)">
          {charts.quiz_activity_30d.some((d) => d.value > 0) ? (
            <BarList data={charts.quiz_activity_30d.slice(-10).map((d) => ({ label: d.day.slice(5), value: d.value }))} />
          ) : (
            <Empty>No quiz activity yet.</Empty>
          )}
        </Panel>
      </div>
      <Panel title="XP Earned (Last 30 Days)">
        <Empty>Not tracked yet — XP is stored as a running total, not a daily log. Add a per-event XP ledger to enable this chart.</Empty>
      </Panel>
    </div>
  );
}

function InsightCard({ label, value, empty }: { label: string; value: string | null; empty: string }) {
  return (
    <div className="stat-card">
      <span className="k">{label}</span>
      {value ? <span className="v" style={{ fontSize: 16 }}>{value}</span> : <span style={{ color: 'var(--faint)', fontSize: 12.5 }}>{empty}</span>}
    </div>
  );
}

function HealthCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="stat-card">
      <span className="k">{label}</span>
      <div style={{ marginTop: 2 }}>{children}</div>
    </div>
  );
}
