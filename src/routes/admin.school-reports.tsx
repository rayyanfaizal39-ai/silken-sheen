import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Check, Loader2, Search, X } from "lucide-react";
import { BarList, Panel, StatCard } from "@/components/admin/ui";
import {
  SCHOOL_REPORT_DATE_OPTIONS,
  type AdminAllSchoolsReport,
  type AdminSchoolReport,
  type SchoolComparisonRow,
  type SchoolReportDateRange,
  type SchoolReportMode,
  type TopSchoolInsight,
} from "@/lib/admin-school-reports";
import {
  formatSchoolLocation,
  normalizeSchoolSearchQuery,
  SCHOOL_SEARCH_DEBOUNCE_MS,
  searchSchools,
  type SchoolSearchResult,
} from "@/lib/schools";
import { getAdminSchoolReport } from "./-school-reports.server";

export const Route = createFileRoute("/admin/school-reports")({
  component: AdminSchoolReportsPage,
});

const AGES = [13, 14, 15, 16, 17];
const FORMS = ["Form 1", "Form 2", "Form 3", "Form 4", "Form 5"];
const number = new Intl.NumberFormat("en-MY");
const decimal = new Intl.NumberFormat("en-MY", { maximumFractionDigits: 1 });

type SortKey =
  | "registered_students"
  | "active_students"
  | "active_rate"
  | "quiz_count"
  | "flashcard_reviews"
  | "students_in_top_100"
  | "total_xp";

function SchoolPicker({
  value,
  onChange,
}: {
  value: SchoolSearchResult | null;
  onChange: (school: SchoolSearchResult | null) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SchoolSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const normalized = normalizeSchoolSearchQuery(query);
    if (!normalized || value) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      setLoading(true);
      setError(null);
      void searchSchools(normalized, controller.signal)
        .then(setResults)
        .catch((cause: unknown) => {
          if (controller.signal.aborted) return;
          console.error("[School Reports] School search failed", cause);
          setResults([]);
          setError("School search is unavailable. Please try again.");
        })
        .finally(() => {
          if (!controller.signal.aborted) setLoading(false);
        });
    }, SCHOOL_SEARCH_DEBOUNCE_MS);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, value]);

  if (value) {
    return (
      <div className="school-report-selected">
        <Check size={17} aria-hidden="true" />
        <span>
          <strong>{value.schoolName}</strong>
          <small>
            {[value.schoolType, formatSchoolLocation(value)].filter(Boolean).join(" · ")}
          </small>
        </span>
        <button
          type="button"
          className="school-report-clear"
          onClick={() => onChange(null)}
          aria-label={`Clear ${value.schoolName}`}
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    );
  }

  const normalized = normalizeSchoolSearchQuery(query);
  return (
    <div className="school-report-picker">
      <div className="school-report-search-input">
        <Search size={16} aria-hidden="true" />
        <input
          id="school-report-school-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search verified schools"
          aria-label="Search the verified school directory"
          aria-controls="school-report-results"
          aria-haspopup="listbox"
          aria-expanded={results.length > 0}
        />
        {loading && <Loader2 className="school-report-spinner" size={16} aria-label="Searching" />}
      </div>
      <div id="school-report-results" className="school-report-results" role="listbox">
        {error && <div className="school-report-message error">{error}</div>}
        {!error && normalized && !loading && results.length === 0 && (
          <div className="school-report-message">No verified schools found.</div>
        )}
        {results.map((result) => (
          <button
            type="button"
            role="option"
            aria-selected="false"
            key={result.id}
            onClick={() => onChange(result)}
          >
            <strong>{result.schoolName}</strong>
            <small>
              {[result.schoolType, formatSchoolLocation(result)].filter(Boolean).join(" · ")}
            </small>
          </button>
        ))}
      </div>
    </div>
  );
}

function InsightCard({
  label,
  insight,
  suffix,
  note,
}: {
  label: string;
  insight: TopSchoolInsight | null;
  suffix: string;
  note?: string;
}) {
  return (
    <div className="school-report-insight-card">
      <span>{label}</span>
      <strong>{insight?.school_name ?? "Not available"}</strong>
      <small>{insight ? `${decimal.format(insight.value)} ${suffix}` : note}</small>
    </div>
  );
}

function RetentionPanel({ reason }: { reason: string }) {
  return (
    <Panel title="Learning retention">
      <div className="admin-grid cols-4">
        {["D1", "D7", "D14", "D30"].map((label) => (
          <div className="stat-card" key={label}>
            <span className="k">{label}</span>
            <span className="v">—</span>
            <span className="c">Not available yet</span>
          </div>
        ))}
      </div>
      <div className="school-report-unavailable">
        <strong>Not available yet</strong>
        <span>{reason}</span>
      </div>
    </Panel>
  );
}

function LearningActivity({ report }: { report: AdminSchoolReport }) {
  return (
    <Panel title="Learning activity">
      <div className="admin-grid cols-4">
        <StatCard
          k="Quizzes completed"
          v={number.format(report.engagement.quizzes_completed)}
          c="Completed quiz attempts"
        />
        <StatCard
          k="Notes studied"
          v={number.format(report.engagement.notes_studied)}
          c="Recorded chapter-read events"
          chipClass="chip-blue"
        />
        <StatCard
          k="Flashcard reviews"
          v={number.format(report.engagement.flashcards_reviewed)}
          c="Recorded card reviews"
          chipClass="chip-violet"
        />
        <StatCard
          k="Good flashcard ratings"
          v={number.format(report.engagement.flashcards_rated_good)}
          c="Ratings of good or easy"
          chipClass="chip-green"
        />
      </div>
      <div className="school-report-popular-grid">
        <div>
          <span>Top quiz subject</span>
          <strong>
            {report.learning_activity.most_popular_subject?.label ?? "No quiz activity"}
          </strong>
          <small>
            {report.learning_activity.most_popular_subject
              ? `${number.format(report.learning_activity.most_popular_subject.value)} attempts`
              : "No reliable result in this period"}
          </small>
        </div>
        <div>
          <span>Top quiz chapter</span>
          <strong>
            {report.learning_activity.most_popular_chapter?.label ?? "No quiz activity"}
          </strong>
          <small>
            {report.learning_activity.most_popular_chapter
              ? `${number.format(report.learning_activity.most_popular_chapter.value)} attempts`
              : "No reliable result in this period"}
          </small>
        </div>
      </div>
    </Panel>
  );
}

function ProfilePanels({ report }: { report: AdminSchoolReport }) {
  return (
    <div className="admin-grid cols-2">
      <Panel title="Students by age">
        {report.summary.age_distribution.length ? (
          <BarList data={report.summary.age_distribution} />
        ) : (
          <div className="empty">No age data for this cohort.</div>
        )}
      </Panel>
      <Panel title="Students by form">
        {report.summary.form_distribution.length ? (
          <BarList data={report.summary.form_distribution} />
        ) : (
          <div className="empty">No form data for this cohort.</div>
        )}
      </Panel>
    </div>
  );
}

function SchoolComparisonTable({
  report,
  onDrillDown,
}: {
  report: AdminAllSchoolsReport;
  onDrillDown: (school: SchoolComparisonRow) => void;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("registered_students");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const rows = useMemo(
    () =>
      [...report.school_comparison].sort((a, b) => {
        const difference = a[sortKey] - b[sortKey];
        return (sortDirection === "asc" ? difference : -difference) || a.name.localeCompare(b.name);
      }),
    [report.school_comparison, sortDirection, sortKey],
  );

  const sort = (key: SortKey) => {
    if (key === sortKey) setSortDirection((value) => (value === "desc" ? "asc" : "desc"));
    else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };
  const SortButton = ({ label, value }: { label: string; value: SortKey }) => {
    const active = sortKey === value;
    return (
      <button type="button" className="school-report-sort" onClick={() => sort(value)}>
        {label}
        {active &&
          (sortDirection === "desc" ? (
            <ArrowDown size={13} aria-hidden="true" />
          ) : (
            <ArrowUp size={13} aria-hidden="true" />
          ))}
      </button>
    );
  };

  return (
    <Panel title="School comparison">
      <p className="school-report-note">
        Internal Admin comparison. Select a school name to open its aggregate report.
      </p>
      {rows.length ? (
        <div className="table-scroll">
          <table className="admin-table school-report-table">
            <thead>
              <tr>
                <th>School</th>
                <th>School type</th>
                <th>State</th>
                <th
                  aria-sort={sortKey === "registered_students" ? `${sortDirection}ending` : "none"}
                >
                  <SortButton label="Registered students" value="registered_students" />
                </th>
                <th aria-sort={sortKey === "active_students" ? `${sortDirection}ending` : "none"}>
                  <SortButton label="Active students" value="active_students" />
                </th>
                <th aria-sort={sortKey === "active_rate" ? `${sortDirection}ending` : "none"}>
                  <SortButton label="Active rate" value="active_rate" />
                </th>
                <th>Avg active study days</th>
                <th aria-sort={sortKey === "quiz_count" ? `${sortDirection}ending` : "none"}>
                  <SortButton label="Quiz count" value="quiz_count" />
                </th>
                <th aria-sort={sortKey === "flashcard_reviews" ? `${sortDirection}ending` : "none"}>
                  <SortButton label="Flashcard reviews" value="flashcard_reviews" />
                </th>
                <th
                  aria-sort={sortKey === "students_in_top_100" ? `${sortDirection}ending` : "none"}
                >
                  <SortButton label="Students in Top 100" value="students_in_top_100" />
                </th>
                <th>Highest official rank</th>
                <th aria-sort={sortKey === "total_xp" ? `${sortDirection}ending` : "none"}>
                  <SortButton label="Total XP" value="total_xp" />
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <button
                      className="school-report-drilldown"
                      type="button"
                      onClick={() => onDrillDown(row)}
                    >
                      {row.name}
                    </button>
                  </td>
                  <td>{row.type ?? "—"}</td>
                  <td>{row.state}</td>
                  <td>{number.format(row.registered_students)}</td>
                  <td>{number.format(row.active_students)}</td>
                  <td>{decimal.format(row.active_rate)}%</td>
                  <td>{decimal.format(row.average_active_days)}</td>
                  <td>{number.format(row.quiz_count)}</td>
                  <td>{number.format(row.flashcard_reviews)}</td>
                  <td>{number.format(row.students_in_top_100)}</td>
                  <td>{row.highest_official_rank ? `#${row.highest_official_rank}` : "—"}</td>
                  <td>{number.format(row.total_xp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty">No schools are represented in this cohort.</div>
      )}
    </Panel>
  );
}

function AllSchoolsReport({
  report,
  onDrillDown,
}: {
  report: AdminAllSchoolsReport;
  onDrillDown: (school: SchoolComparisonRow) => void;
}) {
  return (
    <>
      <Panel title="Platform school overview">
        <div className="admin-grid cols-4">
          <StatCard k="Schools represented" v={number.format(report.summary.total_schools)} />
          <StatCard
            k="Registered students with a school"
            v={number.format(report.summary.total_students)}
            chipClass="chip-blue"
          />
          <StatCard
            k="School not provided"
            v={number.format(report.school_coverage.school_not_provided)}
          />
          <StatCard
            k="Active students"
            v={number.format(report.engagement.active_students)}
            chipClass="chip-green"
          />
          <StatCard
            k="Active rate"
            v={`${decimal.format(report.engagement.active_rate)}%`}
            chipClass="chip-violet"
          />
          <StatCard
            k="Avg active study days"
            v={decimal.format(report.engagement.average_active_days)}
          />
          <StatCard
            k="Total quizzes"
            v={number.format(report.engagement.quizzes_completed)}
            chipClass="chip-blue"
          />
          <StatCard
            k="Flashcard reviews"
            v={number.format(report.engagement.flashcards_reviewed)}
            chipClass="chip-violet"
          />
          <StatCard
            k="Notes studied"
            v={number.format(report.engagement.notes_studied)}
            chipClass="chip-green"
          />
          <StatCard k="Active streak count" v={number.format(report.engagement.active_streaks)} />
          <StatCard
            k="Students inactive 7+ days"
            v={number.format(report.engagement.inactive_7_plus_days)}
            chipClass="chip-violet"
          />
        </div>
      </Panel>

      <ProfilePanels report={report} />

      <div className="admin-grid cols-2">
        <Panel title="Students by school type">
          {report.summary.school_type_distribution.length ? (
            <BarList data={report.summary.school_type_distribution} />
          ) : (
            <div className="empty">No school type data for this cohort.</div>
          )}
        </Panel>
        <Panel title="Students by state">
          {report.summary.state_distribution.length ? (
            <BarList data={report.summary.state_distribution} />
          ) : (
            <div className="empty">No state data for this cohort.</div>
          )}
        </Panel>
      </div>

      <Panel title="School type breakdown">
        {report.school_type_breakdown.length ? (
          <div className="school-report-breakdown-grid">
            {report.school_type_breakdown.map((row) => (
              <article key={row.label} className="school-report-breakdown-card">
                <h3>{row.label}</h3>
                <dl>
                  <div>
                    <dt>Schools represented</dt>
                    <dd>{number.format(row.schools_represented)}</dd>
                  </div>
                  <div>
                    <dt>Students</dt>
                    <dd>{number.format(row.students)}</dd>
                  </div>
                  <div>
                    <dt>Active students</dt>
                    <dd>{number.format(row.active_students)}</dd>
                  </div>
                  <div>
                    <dt>Active rate</dt>
                    <dd>{decimal.format(row.active_rate)}%</dd>
                  </div>
                  <div>
                    <dt>Avg active study days</dt>
                    <dd>{decimal.format(row.average_active_days)}</dd>
                  </div>
                  <div>
                    <dt>Quizzes completed</dt>
                    <dd>{number.format(row.quizzes_completed)}</dd>
                  </div>
                  <div>
                    <dt>Flashcard reviews</dt>
                    <dd>{number.format(row.flashcard_reviews)}</dd>
                  </div>
                  <div>
                    <dt>Students in Top 100</dt>
                    <dd>{number.format(row.students_in_top_100)}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty">No school types are represented in this cohort.</div>
        )}
      </Panel>

      <Panel title="State breakdown">
        {report.state_breakdown.length ? (
          <div className="table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>State</th>
                  <th>Schools represented</th>
                  <th>Students</th>
                  <th>Active students</th>
                  <th>Active rate</th>
                </tr>
              </thead>
              <tbody>
                {report.state_breakdown.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{number.format(row.schools_represented)}</td>
                    <td>{number.format(row.students)}</td>
                    <td>{number.format(row.active_students)}</td>
                    <td>{decimal.format(row.active_rate)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty">No states are represented in this cohort.</div>
        )}
      </Panel>

      <Panel title="Top school insights">
        <p className="school-report-note">
          Highest active rate requires at least {report.insights.minimum_active_rate_cohort}{" "}
          registered students in the filtered cohort.
        </p>
        <div className="school-report-insight-grid">
          <InsightCard
            label="Most registered students"
            insight={report.insights.most_registered_students}
            suffix="students"
          />
          <InsightCard
            label="Highest active rate"
            insight={report.insights.highest_active_rate}
            suffix="% active"
            note="No school meets the minimum cohort"
          />
          <InsightCard
            label="Most Top 100 students"
            insight={report.insights.most_top_100_students}
            suffix="students"
          />
          <InsightCard
            label="Most quizzes completed"
            insight={report.insights.most_quizzes_completed}
            suffix="quizzes"
          />
          <InsightCard
            label="Most flashcard reviews"
            insight={report.insights.most_flashcard_reviews}
            suffix="reviews"
          />
        </div>
      </Panel>

      <SchoolComparisonTable report={report} onDrillDown={onDrillDown} />

      <Panel title={`Leaderboard presence · ${report.leaderboard.period_label}`}>
        <p className="school-report-note">
          Official global monthly ranks are unchanged. The date filter applies to activity metrics,
          not the leaderboard ranking period.
        </p>
        <div className="admin-grid cols-4">
          <StatCard k="Students in Top 10" v={number.format(report.leaderboard.top_10)} />
          <StatCard
            k="Students in Top 50"
            v={number.format(report.leaderboard.top_50)}
            chipClass="chip-blue"
          />
          <StatCard
            k="Students in Top 100"
            v={number.format(report.leaderboard.top_100)}
            chipClass="chip-violet"
          />
          <StatCard
            k="Schools in Top 100"
            v={number.format(report.leaderboard.schools_in_top_100)}
            chipClass="chip-green"
          />
        </div>
        <div className="school-report-popular-grid">
          <div>
            <span>School with most Top 100 students</span>
            <strong>
              {report.leaderboard.school_with_most_top_100?.school_name ?? "Not available"}
            </strong>
            <small>
              {report.leaderboard.school_with_most_top_100
                ? `${number.format(report.leaderboard.school_with_most_top_100.value)} students`
                : "No represented students in Top 100"}
            </small>
          </div>
          <div>
            <span>School type with most Top 100 students</span>
            <strong>
              {report.leaderboard.school_type_with_most_top_100?.label ?? "Not available"}
            </strong>
            <small>
              {report.leaderboard.school_type_with_most_top_100
                ? `${number.format(report.leaderboard.school_type_with_most_top_100.value)} students`
                : "No represented students in Top 100"}
            </small>
          </div>
        </div>
      </Panel>

      <LearningActivity report={report} />
      <RetentionPanel reason={report.retention.reason} />
    </>
  );
}

function SpecificSchoolReport({
  report,
  age,
  form,
  reportPeriod,
}: {
  report: Extract<AdminSchoolReport, { mode: "specific_school" }>;
  age: number | null;
  form: string | null;
  reportPeriod: string;
}) {
  return (
    <>
      <div className="school-report-school-summary">
        <div>
          <span>Selected school</span>
          <h3>{report.school.name}</h3>
          <p>
            {[report.school.type, report.school.district, report.school.state]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
        <strong>{number.format(report.summary.total_students)} students</strong>
      </div>
      <div className="admin-grid cols-3">
        <Panel title="Age distribution">
          {report.summary.age_distribution.length ? (
            <BarList data={report.summary.age_distribution} />
          ) : (
            <div className="empty">No age data for this cohort.</div>
          )}
        </Panel>
        <Panel title="Form distribution">
          {report.summary.form_distribution.length ? (
            <BarList data={report.summary.form_distribution} />
          ) : (
            <div className="empty">No form data for this cohort.</div>
          )}
        </Panel>
        <Panel title="Cohort definition">
          <dl className="school-report-definition">
            <div>
              <dt>Age</dt>
              <dd>{age ?? "All"}</dd>
            </div>
            <div>
              <dt>Form</dt>
              <dd>{form ?? "All"}</dd>
            </div>
            <div>
              <dt>Activity period</dt>
              <dd>{reportPeriod}</dd>
            </div>
          </dl>
        </Panel>
      </div>
      <div className="admin-grid cols-4">
        <StatCard
          k="Active students"
          v={number.format(report.engagement.active_students)}
          c="Recorded learning activity in period"
          chip="Period"
        />
        <StatCard
          k="Active rate"
          v={`${decimal.format(report.engagement.active_rate)}%`}
          chipClass="chip-green"
        />
        <StatCard
          k="Avg active days"
          v={decimal.format(report.engagement.average_active_days)}
          c="Per active student in period"
          chipClass="chip-blue"
        />
        <StatCard
          k="Active streaks"
          v={number.format(report.engagement.active_streaks)}
          chipClass="chip-green"
        />
        <StatCard
          k="Inactive 7+ days"
          v={number.format(report.engagement.inactive_7_plus_days)}
          c="No recorded learning in at least 7 days"
          chipClass="chip-violet"
        />
      </div>
      <LearningActivity report={report} />
      <Panel title={`Leaderboard presence · ${report.leaderboard.period_label}`}>
        <p className="school-report-note">
          Official global monthly ranks are unchanged. The date filter applies to activity metrics,
          not the leaderboard ranking period.
        </p>
        <div className="admin-grid cols-4">
          <StatCard k="Students in Top 10" v={report.leaderboard.top_10} />
          <StatCard k="Students in Top 50" v={report.leaderboard.top_50} chipClass="chip-blue" />
          <StatCard
            k="Students in Top 100"
            v={report.leaderboard.top_100}
            chipClass="chip-violet"
          />
          <StatCard
            k="Highest official rank"
            v={report.leaderboard.highest_rank ? `#${report.leaderboard.highest_rank}` : "—"}
            chipClass="chip-green"
          />
        </div>
        <div className="admin-grid cols-2 school-report-secondary-stats">
          <StatCard k="Total lifetime XP" v={number.format(report.leaderboard.total_xp)} />
          <StatCard
            k="Active students in Top 100"
            v={`${decimal.format(report.leaderboard.active_in_top_100_pct)}%`}
            c="Top-100 active students ÷ active students in selected period"
          />
        </div>
      </Panel>
      <RetentionPanel reason={report.retention.reason} />
    </>
  );
}

function AdminSchoolReportsPage() {
  const [mode, setMode] = useState<SchoolReportMode>("all_schools");
  const [school, setSchool] = useState<SchoolSearchResult | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [form, setForm] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<SchoolReportDateRange>("last_30_days");
  const [report, setReport] = useState<AdminSchoolReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadReport = useCallback(async () => {
    if (mode === "specific_school" && !school) {
      setReport(null);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setReport(
        await getAdminSchoolReport({
          data: {
            schoolId: mode === "specific_school" ? (school?.id ?? null) : null,
            age,
            form,
            dateRange,
          },
        }),
      );
    } catch (cause) {
      console.error("[School Reports] Report query failed", cause);
      setReport(null);
      setError(cause instanceof Error ? cause.message : "The school report could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [age, dateRange, form, mode, school]);

  useEffect(() => {
    void loadReport();
  }, [loadReport]);

  const reportPeriod = useMemo(() => {
    if (!report) return null;
    const start = new Date(`${report.period.start}T00:00:00`).toLocaleDateString("en-MY", {
      day: "numeric",
      month: "short",
    });
    const end = new Date(`${report.period.end}T00:00:00`).toLocaleDateString("en-MY", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return `${start} – ${end}`;
  }, [report]);

  const drillDown = (row: SchoolComparisonRow) => {
    setSchool({
      id: row.id,
      schoolCode: null,
      schoolName: row.name,
      schoolType: row.type,
      state: row.state,
      district: row.district,
      postcode: null,
    });
    setMode("specific_school");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canLoad = mode === "all_schools" || Boolean(school);
  return (
    <div className="admin-content">
      <div className="school-report-heading">
        <div>
          <h2>School Reports</h2>
          <p>
            Aggregate school-level participation and learning insights. No student identities are
            shown.
          </p>
        </div>
        {reportPeriod && <span className="pill pill-free">{reportPeriod}</span>}
      </div>

      <Panel title="Report mode">
        <div className="school-report-mode" role="group" aria-label="Report mode">
          <button
            type="button"
            aria-pressed={mode === "all_schools"}
            className={mode === "all_schools" ? "active" : ""}
            onClick={() => setMode("all_schools")}
          >
            All Schools
          </button>
          <button
            type="button"
            aria-pressed={mode === "specific_school"}
            className={mode === "specific_school" ? "active" : ""}
            onClick={() => setMode("specific_school")}
          >
            Specific School
          </button>
        </div>
      </Panel>

      <Panel title="Report filters">
        <div className={`school-report-filters ${mode === "all_schools" ? "without-school" : ""}`}>
          {mode === "specific_school" && (
            <div className="filter-field school-report-school-field">
              <label htmlFor="school-report-school-search">School</label>
              <SchoolPicker value={school} onChange={setSchool} />
            </div>
          )}
          <div className="filter-field">
            <label htmlFor="school-report-age">Age</label>
            <select
              id="school-report-age"
              value={age ?? ""}
              onChange={(event) => setAge(event.target.value ? Number(event.target.value) : null)}
            >
              <option value="">All ages</option>
              {AGES.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-field">
            <label htmlFor="school-report-form">Form</label>
            <select
              id="school-report-form"
              value={form ?? ""}
              onChange={(event) => setForm(event.target.value || null)}
            >
              <option value="">All forms</option>
              {FORMS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-field">
            <label htmlFor="school-report-date">Date range</label>
            <select
              id="school-report-date"
              value={dateRange}
              onChange={(event) => setDateRange(event.target.value as SchoolReportDateRange)}
            >
              {SCHOOL_REPORT_DATE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Panel>

      {mode === "specific_school" && !school && (
        <Panel title="Specific school report">
          <div className="empty">Select a verified school result to view its aggregate report.</div>
        </Panel>
      )}
      {canLoad && loading && (
        <Panel title={mode === "all_schools" ? "All Schools report" : "Specific school report"}>
          <div className="school-report-loading" role="status">
            <Loader2 size={18} /> Loading school report…
          </div>
        </Panel>
      )}
      {canLoad && !loading && error && (
        <Panel title="School report">
          <div className="school-report-error" role="alert">
            {error}
          </div>
          <button type="button" className="btn btn-primary" onClick={() => void loadReport()}>
            Try again
          </button>
        </Panel>
      )}
      {!loading && report?.mode === "all_schools" && (
        <AllSchoolsReport report={report} onDrillDown={drillDown} />
      )}
      {!loading && report?.mode === "specific_school" && reportPeriod && (
        <SpecificSchoolReport report={report} age={age} form={form} reportPeriod={reportPeriod} />
      )}
    </div>
  );
}
