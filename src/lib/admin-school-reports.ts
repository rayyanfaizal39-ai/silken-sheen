export type SchoolReportDateRange = "this_week" | "this_month" | "last_30_days";
export type SchoolReportMode = "all_schools" | "specific_school";

export interface SchoolReportFilters {
  schoolId: string | null;
  age: number | null;
  form: string | null;
  dateRange: SchoolReportDateRange;
}

export interface SchoolReportCountPoint {
  label: string;
  value: number;
}

export interface SchoolReportSchool {
  id: string;
  name: string;
  type: string | null;
  state: string;
  district: string | null;
}

export interface SchoolReportBreakdownRow {
  label: string;
  schools_represented: number;
  students: number;
  active_students: number;
  active_rate: number;
}

export interface SchoolTypeBreakdownRow extends SchoolReportBreakdownRow {
  average_active_days: number;
  quizzes_completed: number;
  flashcard_reviews: number;
  students_in_top_100: number;
}

export interface SchoolComparisonRow extends SchoolReportSchool {
  registered_students: number;
  active_students: number;
  active_rate: number;
  average_active_days: number;
  quiz_count: number;
  flashcard_reviews: number;
  students_in_top_100: number;
  highest_official_rank: number | null;
  total_xp: number;
}

export interface TopSchoolInsight {
  school_id: string;
  school_name: string;
  value: number;
}

interface AdminSchoolReportBase {
  period: {
    key: SchoolReportDateRange;
    start: string;
    end: string;
  };
  summary: {
    total_schools: number;
    total_students: number;
    age_distribution: SchoolReportCountPoint[];
    form_distribution: SchoolReportCountPoint[];
    school_type_distribution: SchoolReportCountPoint[];
    state_distribution: SchoolReportCountPoint[];
  };
  engagement: {
    active_students: number;
    active_rate: number;
    average_active_days: number;
    quizzes_completed: number;
    notes_studied: number;
    flashcards_reviewed: number;
    flashcards_rated_good: number;
    active_streaks: number;
    inactive_7_plus_days: number;
  };
  leaderboard: {
    period_label: string;
    top_10: number;
    top_50: number;
    top_100: number;
    schools_in_top_100: number;
    school_with_most_top_100: TopSchoolInsight | null;
    school_type_with_most_top_100: SchoolReportCountPoint | null;
    highest_rank: number | null;
    total_xp: number;
    active_in_top_100_pct: number;
  };
  learning_activity: {
    most_popular_subject: SchoolReportCountPoint | null;
    most_popular_chapter: SchoolReportCountPoint | null;
  };
  retention: {
    available: false;
    day_1: null;
    day_7: null;
    day_14: null;
    day_30: null;
    reason: string;
  };
}

export interface SchoolCoverage {
  registered_learners: number;
  school_provided: number;
  /** Learners with school_id IS NULL; aggregate only, never a school. */
  school_not_provided: number;
}

export interface AdminAllSchoolsReport extends AdminSchoolReportBase {
  mode: "all_schools";
  school: null;
  school_coverage: SchoolCoverage;
  school_type_breakdown: SchoolTypeBreakdownRow[];
  state_breakdown: SchoolReportBreakdownRow[];
  school_comparison: SchoolComparisonRow[];
  insights: {
    minimum_active_rate_cohort: number;
    most_registered_students: TopSchoolInsight | null;
    highest_active_rate: TopSchoolInsight | null;
    most_top_100_students: TopSchoolInsight | null;
    most_quizzes_completed: TopSchoolInsight | null;
    most_flashcard_reviews: TopSchoolInsight | null;
  };
}

export interface AdminSpecificSchoolReport extends AdminSchoolReportBase {
  mode: "specific_school";
  school: SchoolReportSchool;
}

export type AdminSchoolReport = AdminAllSchoolsReport | AdminSpecificSchoolReport;

export const SCHOOL_REPORT_DATE_OPTIONS: Array<{
  value: SchoolReportDateRange;
  label: string;
}> = [
  { value: "this_week", label: "This Week" },
  { value: "this_month", label: "This Month" },
  { value: "last_30_days", label: "Last 30 Days" },
];
