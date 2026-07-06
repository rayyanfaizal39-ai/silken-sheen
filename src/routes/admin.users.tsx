import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
  getAdminUsers,
  getAdminUserCounts,
  getAdminUserFacets,
  getAdminUserProfile,
  updateUserStatus,
  updateUserDetails,
} from './-admin.server';
import type {
  AdminUserRow,
  AdminUserFilters,
  AdminUserProfile,
  UserTab,
} from '../lib/admin.types';
import { Panel, Pill, StatCard, fmtDate, timeAgo } from '../components/admin/ui';
import { getRank, getBadgeDef } from '../hooks/use-progress';

export const Route = createFileRoute('/admin/users')({
  loader: async () => {
    try {
      const [users, counts, facets] = await Promise.all([
        getAdminUsers({ data: { tab: 'students' } }),
        getAdminUserCounts(),
        getAdminUserFacets(),
      ]);
      return { users, counts, facets };
    } catch (e) {
      console.error('[admin] users loader failed:', e);
      return {
        users: [] as AdminUserRow[],
        counts: { students: 0, partners: 0, parents: 0, admins: 0 },
        facets: { forms: [] as string[], schools: [] as string[] },
      };
    }
  },
  component: UsersPage,
});

const TABS: { id: UserTab; label: string; icon: string }[] = [
  { id: 'students', label: 'Students', icon: '👨‍🎓' },
  { id: 'partners', label: 'Partners', icon: '🤝' },
  { id: 'parents', label: 'Parents', icon: '👨‍👩‍👧' },
  { id: 'admins', label: 'Admins', icon: '👑' },
];

const QUICK_FILTERS: { id: NonNullable<AdminUserFilters['quickFilter']>; label: string }[] = [
  { id: 'recently_joined', label: 'Recently Joined' },
  { id: 'inactive', label: 'Inactive Users' },
  { id: 'premium', label: 'Premium Users' },
  { id: 'free', label: 'Free Users' },
  { id: 'highest_xp', label: 'Highest XP' },
];

const EMPTY_COPY: Record<UserTab, { title: string; body: string }> = {
  students: {
    title: 'No students found.',
    body: 'Students will appear here after registration.',
  },
  partners: {
    title: 'No partners found.',
    body: 'Teacher/school partner accounts will appear here once they sign up.',
  },
  parents: {
    title: 'No parent accounts found.',
    body: 'Parents currently receive progress reports by email (see Parent Dashboard), not as a separate AcadeMY login — this tab will populate if/when parent accounts are introduced.',
  },
  admins: {
    title: 'No admins found.',
    body: 'Admin accounts will appear here once created.',
  },
};

function bytesAgo(iso: string | null) {
  if (!iso) return '—';
  return timeAgo(iso);
}

function UsersPage() {
  const initial = Route.useLoaderData() as {
    users: AdminUserRow[];
    counts: Record<UserTab, number>;
    facets: { forms: string[]; schools: string[] };
  };

  const [tab, setTab] = useState<UserTab>('students');
  const [users, setUsers] = useState<AdminUserRow[]>(initial.users);
  const [counts] = useState(initial.counts);
  const [facets] = useState(initial.facets);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');
  const [plan, setPlan] = useState('');
  const [status, setStatus] = useState('');
  const [form, setForm] = useState('');
  const [school, setSchool] = useState('');
  const [quickFilter, setQuickFilter] = useState<AdminUserFilters['quickFilter']>(null);

  const [viewingId, setViewingId] = useState<string | null>(null);
  const [viewingProfile, setViewingProfile] = useState<AdminUserProfile | null>(null);
  const [editingRow, setEditingRow] = useState<AdminUserRow | null>(null);
  const [editForm, setEditForm] = useState({ full_name: '', username: '', school: '', form: '' });
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    // Parents has no real account/role today (MVP: shown as a "Coming Soon"
    // placeholder below instead of a query) — skip the network round trip.
    if (tab === 'parents') {
      setUsers([]);
      return;
    }
    let alive = true;
    setLoading(true);
    getAdminUsers({
      data: {
        tab,
        search: search || null,
        plan: (plan as AdminUserFilters['plan']) || null,
        status: (status as AdminUserFilters['status']) || null,
        form: form || null,
        school: school || null,
        quickFilter,
      },
    })
      .then((rows) => alive && setUsers(rows))
      .catch(() => alive && setUsers([]))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [tab, search, plan, status, form, school, quickFilter]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (!viewingId) {
      setViewingProfile(null);
      return;
    }
    getAdminUserProfile({ data: { id: viewingId } })
      .then(setViewingProfile)
      .catch(() => setViewingProfile(null));
  }, [viewingId]);

  function refresh() {
    getAdminUsers({
      data: { tab, search: search || null, plan: (plan as AdminUserFilters['plan']) || null, status: (status as AdminUserFilters['status']) || null, form: form || null, school: school || null, quickFilter },
    })
      .then(setUsers)
      .catch(() => {});
  }

  async function toggleStatus(row: AdminUserRow) {
    const next = row.status === 'active' ? 'suspended' : 'active';
    try {
      await updateUserStatus({ data: { id: row.id, status: next } });
      setToast(next === 'suspended' ? `${row.full_name ?? row.email} suspended` : `${row.full_name ?? row.email} reactivated`);
      refresh();
    } catch (e) {
      setToast(`Failed: ${e instanceof Error ? e.message : 'unknown error'}`);
    }
  }

  async function deactivateAccount(row: AdminUserRow) {
    if (!confirm(`Deactivate "${row.full_name ?? row.email}"? Their login will be blocked, but all learning progress, XP, quiz history, and payment records stay intact. This can be reversed later.`)) return;
    try {
      await updateUserStatus({ data: { id: row.id, status: 'suspended' } });
      setToast(`${row.full_name ?? row.email} deactivated`);
      refresh();
    } catch (e) {
      setToast(`Failed: ${e instanceof Error ? e.message : 'unknown error'}`);
    }
  }

  async function saveEdit() {
    if (!editingRow) return;
    try {
      await updateUserDetails({
        data: {
          id: editingRow.id,
          full_name: editForm.full_name || null,
          username: editForm.username || null,
          school: editForm.school || null,
          form: editForm.form || null,
        },
      });
      setEditingRow(null);
      setToast('Profile updated');
      refresh();
    } catch (e) {
      setToast(`Update failed: ${e instanceof Error ? e.message : 'unknown error'}`);
    }
  }

  const copy = EMPTY_COPY[tab];

  return (
    <div className="admin-content">
      {toast && (
        <div style={{ position: 'fixed', top: 16, right: 26, zIndex: 60 }}>
          <div className="chip chip-orange" style={{ position: 'static', padding: '8px 14px' }}>{toast}</div>
        </div>
      )}

      {/* ── Top cards ── */}
      <div className="admin-grid cols-4">
        <StatCard k="Total Students" v={counts.students} chip="👨‍🎓" chipClass="chip-blue" />
        <StatCard k="Total Partners" v={counts.partners} chip="🤝" chipClass="chip-violet" />
        <StatCard k="Total Parents" v={counts.parents} chip="👨‍👩‍👧" chipClass="chip-green" />
        <StatCard k="Total Admins" v={counts.admins} chip="👑" chipClass="chip-orange" />
      </div>

      <Panel title="User Management">
        {/* ── Role tabs ── */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`btn ${tab === t.id ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setTab(t.id)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {tab === 'parents' ? (
          <div className="setup-notice">
            <h3>👨‍👩‍👧 Coming Soon</h3>
            <p style={{ margin: 0 }}>
              Parent accounts aren't part of the MVP yet — parents currently receive progress
              reports by email (see Parent Dashboard), not as a separate AcadeMY login. This tab
              will light up once Parents become a real account type.
            </p>
          </div>
        ) : (
          <>
            {/* ── Search ── */}
            <div className="filter-bar" style={{ marginBottom: 12 }}>
              <input
                type="text"
                placeholder="Search by name, email, school, or username…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ flex: '1 1 320px' }}
              />
            </div>

            {/* ── Filters ── */}
            <div className="filter-bar" style={{ marginBottom: 12 }}>
              <div className="filter-field">
                <label>Subscription</label>
                <select value={plan} onChange={(e) => setPlan(e.target.value)}>
                  <option value="">All</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              <div className="filter-field">
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="">All</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <div className="filter-field">
                <label>Form</label>
                <select value={form} onChange={(e) => setForm(e.target.value)}>
                  <option value="">All</option>
                  {facets.forms.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div className="filter-field">
                <label>School</label>
                <select value={school} onChange={(e) => setSchool(e.target.value)}>
                  <option value="">All</option>
                  {facets.schools.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* ── Founder quick filters ── */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
              {QUICK_FILTERS.map((q) => (
                <button
                  key={q.id}
                  className={`btn ${quickFilter === q.id ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ padding: '5px 12px', fontSize: 12 }}
                  onClick={() => setQuickFilter(quickFilter === q.id ? null : q.id)}
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* ── Table ── */}
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Full Name</th>
                <th>Email</th>
                <th>School</th>
                <th>Form</th>
                <th>Role</th>
                <th>Plan</th>
                <th>XP</th>
                <th>Cosmic Rank</th>
                <th>Streak</th>
                <th>Quiz Avg</th>
                <th>Last Active</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const rank = getRank(u.xp);
                return (
                  <tr key={u.id}>
                    <td>
                      <div style={{
                        width: 30, height: 30, borderRadius: '50%',
                        background: 'var(--card)', border: '1px solid var(--line)',
                        display: 'grid', placeItems: 'center', fontSize: 14,
                      }}>
                        {(u.full_name ?? u.email ?? '?').charAt(0).toUpperCase()}
                      </div>
                    </td>
                    <td><span className="cell-name"><span className="nm">{u.full_name ?? '—'}</span>{u.username && <span className="em">@{u.username}</span>}</span></td>
                    <td style={{ color: 'var(--muted)' }}>{u.email ?? '—'}</td>
                    <td style={{ color: 'var(--muted)' }}>{u.school ?? '—'}</td>
                    <td style={{ color: 'var(--muted)' }}>{u.form ?? '—'}</td>
                    <td><Pill kind={u.role}>{u.role}</Pill></td>
                    <td><Pill kind={u.plan}>{u.plan}</Pill></td>
                    <td>{u.xp.toLocaleString()}</td>
                    <td>{rank.emoji} {rank.name}</td>
                    <td>{u.streak}d</td>
                    <td>{u.avg_score_pct != null ? `${Math.round(u.avg_score_pct)}%` : '—'}</td>
                    <td style={{ color: 'var(--muted)' }}>{bytesAgo(u.last_login_at)}</td>
                    <td><Pill kind={u.status === 'active' ? 'paid' : 'failed'}>{u.status}</Pill></td>
                    <td>
                      <div className="file-actions">
                        <button className="btn" onClick={() => setViewingId(u.id)}>View Profile</button>
                        <button
                          className="btn"
                          onClick={() => {
                            setEditingRow(u);
                            setEditForm({
                              full_name: u.full_name ?? '',
                              username: u.username ?? '',
                              school: u.school ?? '',
                              form: u.form ?? '',
                            });
                          }}
                        >
                          Edit
                        </button>
                        <button className="btn" onClick={() => toggleStatus(u)}>
                          {u.status === 'active' ? 'Suspend' : 'Reactivate'}
                        </button>
                        <button className="btn" style={{ color: 'var(--red)' }} onClick={() => deactivateAccount(u)}>
                          Deactivate Account
                        </button>
                        <button className="btn" onClick={() => setToast('Reset Password — coming soon')}>
                          Reset Password
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!users.length && (
                <tr>
                  <td colSpan={14}>
                    <div className="empty">
                      <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                        {loading ? 'Loading…' : copy.title}
                      </div>
                      {!loading && <div>{copy.body}</div>}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
          </>
        )}
      </Panel>

      {/* ── View Profile side panel ── */}
      {viewingId && (
        <div className="modal-backdrop" onClick={() => setViewingId(null)}>
          <div className="modal-panel" style={{ maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
            {!viewingProfile ? (
              <div className="empty">Loading profile…</div>
            ) : (
              <ProfilePanel profile={viewingProfile} />
            )}
            <div className="modal-actions">
              <button className="btn" onClick={() => setViewingId(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit modal ── */}
      {editingRow && (
        <div className="modal-backdrop" onClick={() => setEditingRow(null)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <h3>Edit {editingRow.full_name ?? editingRow.email}</h3>
            <div className="form-grid">
              <div className="form-field full">
                <label>Full name</label>
                <input value={editForm.full_name} onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} />
              </div>
              <div className="form-field">
                <label>Username</label>
                <input value={editForm.username} onChange={(e) => setEditForm({ ...editForm, username: e.target.value })} />
              </div>
              <div className="form-field">
                <label>Form level</label>
                <input value={editForm.form} onChange={(e) => setEditForm({ ...editForm, form: e.target.value })} />
              </div>
              <div className="form-field full">
                <label>School</label>
                <input value={editForm.school} onChange={(e) => setEditForm({ ...editForm, school: e.target.value })} />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setEditingRow(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfilePanel({ profile }: { profile: AdminUserProfile }) {
  const rank = getRank(profile.xp);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%', background: 'var(--card)',
          border: '1px solid var(--line)', display: 'grid', placeItems: 'center', fontSize: 22,
        }}>
          {(profile.full_name ?? profile.email ?? '?').charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>{profile.full_name ?? '—'}</div>
          <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{profile.email ?? '—'}</div>
        </div>
      </div>

      <div className="admin-grid cols-2" style={{ marginBottom: 18 }}>
        <InfoRow label="School" value={profile.school ?? '—'} />
        <InfoRow label="Form" value={profile.form ?? '—'} />
        <InfoRow label="Role" value={profile.role} />
        <InfoRow label="Subscription" value={profile.plan} />
        <InfoRow label="Joined" value={fmtDate(profile.created_at)} />
        <InfoRow label="Last Active" value={bytesAgo(profile.last_login_at)} />
        <InfoRow label="Current XP" value={profile.xp.toLocaleString()} />
        <InfoRow label="Cosmic Rank" value={`${rank.emoji} ${rank.name}`} />
        {/* Intentionally left blank: Companion has no dedicated table yet
            (today it's just an ad-hoc jsonb shape referenced in analytics.ts).
            Wire this once the Companion system gets its own table. */}
        <InfoRow label="Current Companion" value="—" />
        <InfoRow label="Study Streak" value={`${profile.streak} days`} />
        <InfoRow label="Quiz Average" value={profile.avg_score_pct != null ? `${Math.round(profile.avg_score_pct)}%` : '—'} />
      </div>

      <div style={{ marginBottom: 18 }}>
        <div className="admin-eyebrow">Recent Quiz History</div>
        {!profile.recent_quizzes.length ? (
          <div className="empty">No quiz attempts yet.</div>
        ) : (
          <div className="table-scroll">
            <table className="admin-table">
              <thead>
                <tr><th>Subject</th><th>Chapter</th><th>Score</th><th>Date</th></tr>
              </thead>
              <tbody>
                {profile.recent_quizzes.map((q) => (
                  <tr key={q.id}>
                    <td>{q.subject_id}</td>
                    <td style={{ color: 'var(--muted)' }}>{q.chapter_key}</td>
                    <td>{Math.round(q.score_pct)}% ({q.correct}/{q.total})</td>
                    <td style={{ color: 'var(--muted)' }}>{fmtDate(q.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <div className="admin-eyebrow">Achievements / Badges</div>
        {!profile.badges.length ? (
          <div className="empty">No badges earned yet.</div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {profile.badges.map((id) => {
              const def = getBadgeDef(id);
              return (
                <span key={id} className="pill pill-student" title={def?.description}>
                  {def ? `${def.emoji} ${def.name}` : id}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)' }}>
        {label}
      </div>
      <div style={{ fontSize: 13.5 }} title={hint}>{value}</div>
    </div>
  );
}
