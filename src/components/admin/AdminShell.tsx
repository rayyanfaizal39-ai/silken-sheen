import { useState, type ReactNode } from 'react';
import type { AdminProfile } from '../../lib/admin.types';

const NAV = [
  {
    group: 'Overview',
    items: [
      { icon: '▣', label: 'Dashboard', active: true },
      { icon: '👥', label: 'Users' },
      { icon: '💳', label: 'Payments' },
      { icon: '📝', label: 'Quiz activity' },
    ],
  },
  {
    group: 'Content',
    items: [
      { icon: '📚', label: 'Subjects' },
      { icon: '🧩', label: 'Chapters' },
    ],
  },
  {
    group: 'System',
    items: [{ icon: '⚙', label: 'Settings' }],
  },
];

export function AdminShell({
  profile,
  children,
}: {
  profile: AdminProfile;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-root">
      <div className="admin-layout">
        <aside className={`admin-sidebar ${open ? 'open' : ''}`}>
          <div className="admin-brand">
            <div className="logo">A</div>
            <div>
              <div className="name">AcadeMY</div>
              <div className="sub">Admin Console</div>
            </div>
          </div>

          {NAV.map((g) => (
            <div className="admin-navgroup" key={g.group}>
              <div className="label">{g.group}</div>
              {g.items.map((it) => (
                <a className={`admin-nav ${it.active ? 'active' : ''}`} key={it.label}>
                  <span className="ico">{it.icon}</span>
                  {it.label}
                </a>
              ))}
            </div>
          ))}

          <div style={{ marginTop: 'auto', fontSize: 11, color: 'var(--faint)', padding: '0 8px' }}>
            Signed in as<br />
            <strong style={{ color: 'var(--muted)' }}>{profile.full_name || profile.email}</strong>
          </div>
        </aside>

        <div className="admin-main">
          <header className="admin-topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button className="admin-menu-btn" onClick={() => setOpen((v) => !v)} aria-label="Menu">
                ☰
              </button>
              <h1>Mission Control · Admin</h1>
            </div>
            <span className="admin-status">
              <span className="dot" /> System online
            </span>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
