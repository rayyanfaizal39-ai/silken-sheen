import type { ReactNode } from 'react';

export const CHART_COLORS = [
  '#ff5c5c', '#ff8a3d', '#ffc24b', '#38d39f',
  '#4d9bff', '#9b7bff', '#2dd4bf', '#f2622e',
];

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="admin-eyebrow">{children}</div>;
}

export function Panel({
  title,
  badge,
  children,
  className = '',
}: {
  title?: string;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`admin-panel ${className}`}>
      {(title || badge) && (
        <div className="admin-panel-head">
          {title && <Eyebrow>{title}</Eyebrow>}
          {badge}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatCard({
  k,
  v,
  c,
  chip,
  chipClass = 'chip-orange',
}: {
  k: string;
  v: ReactNode;
  c?: string;
  chip?: string;
  chipClass?: string;
}) {
  return (
    <div className="stat-card">
      {chip && <span className={`chip ${chipClass}`}>{chip}</span>}
      <span className="k">{k}</span>
      <span className="v">{v}</span>
      {c && <span className="c">{c}</span>}
    </div>
  );
}

export function Pill({ kind, children }: { kind: string; children: ReactNode }) {
  return <span className={`pill pill-${kind}`}>{children}</span>;
}

// Dependency-free SVG donut.
export function Donut({
  data,
  total,
  centerLabel = 'TOTAL',
  size = 168,
  stroke = 22,
}: {
  data: { label: string; value: number }[];
  total?: number;
  centerLabel?: string;
  size?: number;
  stroke?: number;
}) {
  const sum = data.reduce((a, d) => a + d.value, 0) || 1;
  const display = total ?? sum;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="donut-wrap">
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1b1d27" strokeWidth={stroke} />
          {data.map((d, i) => {
            const frac = d.value / sum;
            const dash = frac * circ;
            const seg = (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={CHART_COLORS[i % CHART_COLORS.length]}
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${circ - dash}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            );
            offset += dash;
            return seg;
          })}
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
          <div className="donut-center">
            <div className="lab">{centerLabel}</div>
            <div className="num">{display.toLocaleString()}</div>
          </div>
        </div>
      </div>
      <div className="donut-legend">
        {data.map((d, i) => (
          <div className="legend-item" key={i}>
            <span className="sw" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
            <span className="nm">{d.label}</span>
            <span className="vl">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BarList({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="bar-list">
      {data.map((d, i) => (
        <div className="bar-row" key={i}>
          <div className="top">
            <span>{d.label}</span>
            <span className="vl">{d.value}</span>
          </div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${(d.value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Feed({
  items,
}: {
  items: { icon: string; title: string; meta: string; time: string }[];
}) {
  if (!items.length) return <div className="empty">Nothing here yet.</div>;
  return (
    <div className="feed">
      {items.map((it, i) => (
        <div className="feed-row" key={i}>
          <div className="feed-ico">{it.icon}</div>
          <div className="feed-body">
            <div className="t">{it.title}</div>
            <div className="m">{it.meta}</div>
          </div>
          <div className="feed-time">{it.time}</div>
        </div>
      ))}
    </div>
  );
}

export function fmtDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-MY', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function timeAgo(iso: string) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
