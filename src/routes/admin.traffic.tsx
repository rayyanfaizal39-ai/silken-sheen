import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BarList, Panel, StatCard } from "@/components/admin/ui";
import { useAuth } from "@/context/auth-context";
import type { VisitorAnalyticsData, VisitorRetentionPoint } from "@/lib/admin.types";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/traffic")({
  component: AdminTrafficPage,
});

const EMPTY_RETENTION: VisitorRetentionPoint = { eligible: 0, retained: 0, rate: null };

function percentage(part: number, total: number): string {
  return total > 0 ? `${((part / total) * 100).toFixed(1)}%` : "—";
}

function ratio(part: number, total: number): string {
  return total > 0 ? (part / total).toFixed(1) : "—";
}

function retentionLabel(point: VisitorRetentionPoint): string {
  return point.rate === null
    ? "Not enough cohort history"
    : `${point.retained} of ${point.eligible} returned`;
}

function AdminTrafficPage() {
  const { user, loading: authLoading } = useAuth();
  const [days, setDays] = useState(30);
  const [data, setData] = useState<VisitorAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    const { data: result, error: queryError } = await supabase.rpc("get_visitor_analytics", {
      p_days: days,
    });
    if (queryError) {
      setError(queryError.message);
      setData(null);
    } else {
      setData(result as VisitorAnalyticsData);
    }
    setLoading(false);
  }, [days, user]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }
    void load();
  }, [authLoading, load, user]);

  const dailyVisitors = useMemo(
    () =>
      (data?.daily ?? []).slice(-14).map((point) => ({
        label: new Date(`${point.day}T00:00:00`).toLocaleDateString("en-MY", {
          day: "numeric",
          month: "short",
        }),
        value: point.visitors,
      })),
    [data],
  );

  if (loading) {
    return (
      <div className="admin-content">
        <Panel title="Visitor traffic">Loading traffic data…</Panel>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="admin-content">
        <Panel title="Visitor traffic">
          <div className="empty">{error ?? "No visitor analytics are available yet."}</div>
          <button className="btn btn-primary" type="button" onClick={() => void load()}>
            Try again
          </button>
        </Panel>
      </div>
    );
  }

  const day1 = data.retention.day_1 ?? EMPTY_RETENTION;
  const day7 = data.retention.day_7 ?? EMPTY_RETENTION;
  const day30 = data.retention.day_30 ?? EMPTY_RETENTION;

  return (
    <div className="admin-content">
      <div className="admin-panel-head" style={{ marginBottom: 0 }}>
        <div>
          <h2 style={{ margin: 0 }}>Visitor traffic & retention</h2>
          <p style={{ color: "var(--muted)", margin: "6px 0 0", fontSize: 13 }}>
            Includes anonymous visitors. Personal details and raw IP addresses are not collected.
          </p>
        </div>
        <label className="filter-field">
          <span style={{ fontSize: 11, color: "var(--muted)" }}>Date range</span>
          <select value={days} onChange={(event) => setDays(Number(event.target.value))}>
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </label>
      </div>

      <div className="admin-grid cols-4">
        <StatCard
          k="Unique visitors"
          v={data.unique_visitors.toLocaleString()}
          c="Anonymous + signed in"
          chip={`${data.days}d`}
        />
        <StatCard
          k="Sessions"
          v={data.sessions.toLocaleString()}
          c={`${ratio(data.sessions, data.unique_visitors)} per visitor`}
          chipClass="chip-blue"
        />
        <StatCard
          k="Page views"
          v={data.page_views.toLocaleString()}
          c={`${ratio(data.page_views, data.sessions)} per session`}
          chipClass="chip-violet"
        />
        <StatCard
          k="Returning visitors"
          v={data.returning_visitors.toLocaleString()}
          c={`${percentage(data.returning_visitors, data.unique_visitors)} returned on another day`}
          chipClass="chip-green"
        />
      </div>

      <div className="admin-grid cols-3">
        <StatCard
          k="Day 1 retention"
          v={day1.rate === null ? "—" : `${day1.rate}%`}
          c={retentionLabel(day1)}
        />
        <StatCard
          k="Day 7 retention"
          v={day7.rate === null ? "—" : `${day7.rate}%`}
          c={retentionLabel(day7)}
        />
        <StatCard
          k="Day 30 retention"
          v={day30.rate === null ? "—" : `${day30.rate}%`}
          c={retentionLabel(day30)}
        />
      </div>

      <div className="admin-grid cols-2">
        <Panel title="Daily unique visitors">
          {dailyVisitors.some((point) => point.value > 0) ? (
            <BarList data={dailyVisitors} />
          ) : (
            <div className="empty">Traffic will appear after the migration is deployed.</div>
          )}
        </Panel>
        <Panel title="Explore funnel">
          <BarList
            data={[
              { label: "Visited site", value: data.unique_visitors },
              { label: "Opened Explore", value: data.explore_visitors },
              { label: "Reached login", value: data.login_visitors },
              { label: "Visited while signed in", value: data.authenticated_visitors },
            ]}
          />
        </Panel>
      </div>

      <Panel title="Most viewed pages">
        {data.top_paths.length ? (
          <div className="table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Views</th>
                  <th>Unique visitors</th>
                </tr>
              </thead>
              <tbody>
                {data.top_paths.map((row) => (
                  <tr key={row.path}>
                    <td>{row.path}</td>
                    <td>{row.views.toLocaleString()}</td>
                    <td>{row.visitors.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty">No page views recorded in this period.</div>
        )}
      </Panel>
    </div>
  );
}
