import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { getKnowledgeEngineEntries, getKnowledgeEngineCategories } from './-admin.server';
import type { KnowledgeEngineRow } from '../lib/admin.types';
import { Panel, Pill, fmtDate } from '../components/admin/ui';

export const Route = createFileRoute('/admin/cikgu-intel')({
  loader: async () => {
    try {
      const [entries, categories] = await Promise.all([
        getKnowledgeEngineEntries({ data: {} }),
        getKnowledgeEngineCategories(),
      ]);
      return { entries, categories };
    } catch (e) {
      console.error('[admin] getKnowledgeEngineEntries failed:', e);
      return { entries: [] as KnowledgeEngineRow[], categories: [] as string[] };
    }
  },
  component: CikguIntelPage,
});

function preview(text: string | null, max = 100): string {
  if (!text) return '—';
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > max ? `${clean.slice(0, max)}…` : clean;
}

function CikguIntelPage() {
  const { entries: initialEntries, categories } = Route.useLoaderData() as {
    entries: KnowledgeEngineRow[];
    categories: string[];
  };

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [entries, setEntries] = useState<KnowledgeEngineRow[]>(initialEntries);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getKnowledgeEngineEntries({ data: { search: search || null, category: category || null } })
      .then((rows) => {
        if (alive) setEntries(rows);
      })
      .catch(() => {
        if (alive) setEntries([]);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [search, category]);

  return (
    <div className="admin-content">
      <Panel
        title="Content · Cikgu AI Intel"
        badge={<span className="chip chip-orange">{entries.length} shown</span>}
      >
        <p style={{ marginBottom: 16 }}>Cikgu AI Intel Manager</p>

        {/* ── Filters ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Search by title or content…"
            aria-label="Search Cikgu AI content"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: '1 1 260px' }}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* ── Table ── */}
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Content preview</th>
                <th>Reflection preview</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((row) => (
                <tr key={row.id}>
                  <td><span className="cell-name"><span className="nm">{row.title}</span></span></td>
                  <td><Pill kind="student">{row.category}</Pill></td>
                  <td style={{ color: 'var(--muted)' }}>{preview(row.content)}</td>
                  <td style={{ color: 'var(--muted)' }}>{preview(row.reflection)}</td>
                  <td style={{ color: 'var(--muted)' }}>{row.created_at ? fmtDate(row.created_at) : '—'}</td>
                </tr>
              ))}
              {!entries.length && (
                <tr>
                  <td colSpan={5}>
                    <div className="empty">{loading ? 'Loading…' : 'No entries match these filters.'}</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
