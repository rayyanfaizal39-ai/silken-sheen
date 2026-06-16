import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
  getDashboardStats,
  getUsers,
  getPayments,
  getQuizActivity,
} from './-admin.server';
import type {
  AdminStats,
  AdminFilters,
  UserRow,
  PaymentRow,
  QuizRow,
} from '../lib/admin.types';
import {
  Panel,
  StatCard,
  Donut,
  BarList,
  Feed,
  Pill,
  Eyebrow,
  fmtDate,
  timeAgo,
} from '../components/admin/ui';
import { Filters } from '../components/admin/Filters';

const EMPTY_STATS: AdminStats = {
  total_users: 0,
  total_students: 0,
  total_teachers: 0,
  total_admins: 0,
  total_paid: 0,
  total_free: 0,
  total_quiz_attempts: 0,
  avg_quiz_score: 0,
  most_popular_subject: null,
  most_attempted_chapter: null,
  revenue_total: 0,
  subject_distribution: [],
  signups_by_day: [],
};

export const Route = createFileRoute('/admin/')({
  loader: async () => {
    try {
      return { stats: await getDashboardStats() };
    } catch (e) {
      console.error('[admin] getDashboardStats failed:', e);
      return { stats: EMPTY_STATS };
    }
  },
  component: AdminDashboard,
});

const EMPTY: AdminFilters = {
  start: null, end: null, subject: null, form: null, plan: null, role: null, search: null,
};

function AdminDashboard() {
  const { stats } = Route.useLoaderData() as { stats: AdminStats };

  const [filters, setFilters] = useState<AdminFilters>(EMPTY);
  const [applied, setApplied] = useState<AdminFilters>(EMPTY);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [quiz, setQuiz] = useState<QuizRow[]>([]);
  const [loading, setLoading] = useState(true);

  // Re-fetch the three tables whenever the applied filters change.
  useEffect(() => {
    let alive = true;
    setLoading(true);
    Promise.all([
      getUsers({ data: applied }).catch(() => [] as UserRow[]),
      getPayments({ data: applied }).catch(() => [] as PaymentRow[]),
      getQuizActivity({ data: applied }).catch(() => [] as QuizRow[]),
    ])
      .then(([u, p, q]) => {
        if (!alive) return;
        setUsers(u); setPayments(p); setQuiz(q);
      })
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [applied]);

  const recentSignups = users.slice(0, 6);
  const recentPayments = payments.slice(0, 6);
  const recentQuiz = quiz.slice(0, 6);

  return (
    <div className="admin-content">
      {/* ── KPI ROW ──────────────────────────────────────────── */}
      <Eyebrow>Overview</Eyebrow>
      <div className="admin-grid cols-4">
        <StatCard k="Registered users" v={stats.total_users.toLocaleString()} c="all accounts" chip="Total" />
        <StatCard k="Students" v={stats.total_students.toLocaleString()} c="role · student" chip="Learners" chipClass="chip-blue" />
        <StatCard k="Teachers" v={stats.total_teachers.toLocaleString()} c="role · teacher" chip="Staff" chipClass="chip-violet" />
        <StatCard k="Paid users" v={stats.total_paid.toLocaleString()} c={`${stats.total_free.toLocaleString()} on free`} chip="Revenue" chipClass="chip-green" />
      </div>

      <div className="admin-grid cols-4">
        <StatCard k="Quiz attempts" v={stats.total_quiz_attempts.toLocaleString()} c="across all forms" />
        <StatCard k="Average score" v={`${stats.avg_quiz_score}%`} c="all attempts" chip="Mean" chipClass="chip-green" />
        <StatCard k="Top subject" v={stats.most_popular_subject ?? '—'} c="most attempts" chip="Popular" />
        <StatCard k="Top chapter" v={stats.most_attempted_chapter ?? '—'} c="most attempts" chip="Popular" chipClass="chip-blue" />
      </div>

      {/* ── DISTRIBUTION + SIGNUPS ──────────────────────────── */}
      <div className="admin-grid cols-2">
        <Panel title="Subject distribution" badge={<span className="chip chip-orange">Quiz attempts</span>}>
          {stats.subject_distribution.length ? (
            <Donut data={stats.subject_distribution} total={stats.total_quiz_attempts} centerLabel="Attempts" />
          ) : (
            <div className="empty">No quiz data yet.</div>
          )}
        </Panel>
        <Panel title="Signups · last 14 days" badge={<span className="chip chip-green">New users</span>}>
          {stats.signups_by_day.length ? (
            <BarList data={stats.signups_by_day.map((d) => ({ label: d.day.slice(5), value: d.value }))} />
          ) : (
            <div className="empty">No recent signups.</div>
          )}
        </Panel>
      </div>

      {/* ── RECENT FEEDS ────────────────────────────────────── */}
      <div className="admin-grid cols-3">
        <Panel title="Recent signups">
          <Feed items={recentSignups.map((u) => ({
            icon: '🧑',
            title: u.full_name || u.email || 'New user',
            meta: `${u.role} · ${u.plan}`,
            time: timeAgo(u.created_at),
          }))} />
        </Panel>
        <Panel title="Recent payments">
          <Feed items={recentPayments.map((p) => ({
            icon: '💳',
            title: `${p.currency} ${Number(p.amount).toFixed(2)}`,
            meta: `${p.profiles?.full_name || p.profiles?.email || 'User'} · ${p.status}`,
            time: timeAgo(p.created_at),
          }))} />
        </Panel>
        <Panel title="Recent quiz activity">
          <Feed items={recentQuiz.map((q) => ({
            icon: '📝',
            title: `${q.subject}${q.chapter ? ' · ' + q.chapter : ''}`,
            meta: `${q.profiles?.full_name || 'User'} · ${q.score}%`,
            time: timeAgo(q.created_at),
          }))} />
        </Panel>
      </div>

      {/* ── FILTERS ─────────────────────────────────────────── */}
      <Panel title="Filters">
        <Filters
          value={filters}
          onChange={setFilters}
          onApply={() => setApplied(filters)}
          onReset={() => { setFilters(EMPTY); setApplied(EMPTY); }}
        />
      </Panel>

      {/* ── USERS TABLE ─────────────────────────────────────── */}
      <Panel title="Users" badge={<span className="chip chip-orange">{users.length} shown</span>}>
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Role</th><th>Plan</th>
                <th>Signup</th><th>Last login</th><th>Quizzes</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td><span className="cell-name"><span className="nm">{u.full_name || '—'}</span></span></td>
                  <td style={{ color: 'var(--muted)' }}>{u.email}</td>
                  <td><Pill kind={u.role}>{u.role}</Pill></td>
                  <td><Pill kind={u.plan}>{u.plan}</Pill></td>
                  <td style={{ color: 'var(--muted)' }}>{fmtDate(u.created_at)}</td>
                  <td style={{ color: 'var(--muted)' }}>{fmtDate(u.last_login_at)}</td>
                  <td style={{ fontWeight: 700 }}>{u.total_quizzes}</td>
                </tr>
              ))}
              {!users.length && <tr><td colSpan={7}><div className="empty">{loading ? 'Loading…' : 'No users match these filters.'}</div></td></tr>}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* ── PAYMENTS TABLE ──────────────────────────────────── */}
      <Panel title="Payments" badge={<span className="chip chip-green">{payments.length} shown</span>}>
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr><th>User</th><th>Amount</th><th>Method</th><th>Status</th><th>Date</th></tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td><span className="cell-name">
                    <span className="nm">{p.profiles?.full_name || '—'}</span>
                    <span className="em">{p.profiles?.email}</span>
                  </span></td>
                  <td style={{ fontWeight: 700 }}>{p.currency} {Number(p.amount).toFixed(2)}</td>
                  <td style={{ color: 'var(--muted)' }}>{p.method || '—'}</td>
                  <td><Pill kind={p.status}>{p.status}</Pill></td>
                  <td style={{ color: 'var(--muted)' }}>{fmtDate(p.created_at)}</td>
                </tr>
              ))}
              {!payments.length && <tr><td colSpan={5}><div className="empty">{loading ? 'Loading…' : 'No payments match these filters.'}</div></td></tr>}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* ── QUIZ ACTIVITY TABLE ─────────────────────────────── */}
      <Panel title="Quiz activity" badge={<span className="chip chip-blue">{quiz.length} shown</span>}>
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr><th>User</th><th>Subject</th><th>Form</th><th>Chapter</th><th>Score</th><th>Date</th></tr>
            </thead>
            <tbody>
              {quiz.map((q) => (
                <tr key={q.id}>
                  <td><span className="cell-name"><span className="nm">{q.profiles?.full_name || '—'}</span></span></td>
                  <td>{q.subject}</td>
                  <td style={{ color: 'var(--muted)' }}>{q.form || '—'}</td>
                  <td style={{ color: 'var(--muted)' }}>{q.chapter || '—'}</td>
                  <td style={{ fontWeight: 700, color: q.score >= 50 ? 'var(--green)' : 'var(--red)' }}>{q.score}%</td>
                  <td style={{ color: 'var(--muted)' }}>{fmtDate(q.created_at)}</td>
                </tr>
              ))}
              {!quiz.length && <tr><td colSpan={6}><div className="empty">{loading ? 'Loading…' : 'No quiz activity matches these filters.'}</div></td></tr>}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
