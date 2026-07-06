import { useState, type ReactNode } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import type { AdminProfile } from '../../lib/admin.types';

interface NavItem {
  icon: string;
  label: string;
  active?: boolean;
  to?: '/admin/cikgu-intel' | '/admin/content-library' | '/admin/users' | '/admin/reports';
}

const NAV: { group: string; items: NavItem[] }[] = [
  {
    group: 'Overview',
    items: [
      { icon: '▣', label: 'Dashboard', active: true },
      { icon: '👥', label: 'Users', to: '/admin/users' },
      { icon: '💳', label: 'Payments' },
      { icon: '📝', label: 'Quiz activity' },
      { icon: '📊', label: 'Reports', to: '/admin/reports' },
    ],
  },
  {
    group: 'Content',
    items: [
      { icon: '📚', label: 'Subjects' },
      { icon: '🧩', label: 'Chapters' },
      { icon: '🧠', label: 'Cikgu AI Intel', to: '/admin/cikgu-intel' },
      { icon: '🗂', label: 'Content Library', to: '/admin/content-library' },
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });

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
              {g.items.map((it) =>
                it.to ? (
                  <Link
                    className={`admin-nav ${pathname === it.to ? 'active' : ''}`}
                    key={it.label}
                    to={it.to}
                  >
                    <span className="ico">{it.icon}</span>
                    {it.label}
                  </Link>
                ) : (
                  <a className={`admin-nav ${it.active ? 'active' : ''}`} key={it.label}>
                    <span className="ico">{it.icon}</span>
                    {it.label}
                  </a>
                ),
              )}
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
