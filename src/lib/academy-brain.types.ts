// Database-facing types for the AcadeMY Brain weekly-report tables.
//
// This project does not currently have a generated Supabase Database type;
// existing database shapes live in focused modules such as admin.types.ts.
// Keep these aligned with 20260714000312_academy_brain_weekly_reports.sql.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type ReportFrequency = "weekly" | "monthly";
export type ReportLanguage = "en" | "ms";
export type WeeklyReportStatus =
  | "draft"
  | "queued"
  | "generating"
  | "generated"
  | "sending"
  | "sent"
  | "delivered"
  | "opened"
  | "failed"
  | "cancelled";
export type ReportJobStatus =
  | "pending"
  | "processing"
  | "completed"
  | "retry"
  | "failed"
  | "cancelled";
export type DemoScenarioCategory =
  | "excellent"
  | "improving"
  | "consistent"
  | "inconsistent"
  | "needs_revision"
  | "inactive"
  | "comeback"
  | "at_risk"
  | "exam_ready";

export interface ParentReportPreferenceRow {
  id: string;
  parent_user_id: string;
  student_id: string;
  parent_name: string | null;
  parent_email: string;
  enabled: boolean;
  frequency: ReportFrequency;
  preferred_language: ReportLanguage;
  timezone: string;
  last_sent_at: string | null;
  created_at: string;
  updated_at: string;
}

export type ParentReportPreferenceInsert = Pick<
  ParentReportPreferenceRow,
  "parent_user_id" | "student_id" | "parent_email"
> &
  Partial<Omit<ParentReportPreferenceRow, "parent_user_id" | "student_id" | "parent_email">>;

export type ParentReportPreferenceUpdate = Partial<ParentReportPreferenceInsert>;

export interface WeeklyReportRow {
  id: string;
  student_id: string;
  parent_user_id: string | null;
  week_start: string;
  week_end: string;
  data_snapshot_json: Json;
  analytics_json: Json;
  ai_content_json: Json;
  prompt_version: string | null;
  schema_version: string;
  model_used: string | null;
  status: WeeklyReportStatus;
  is_demo: boolean;
  generated_at: string | null;
  sent_at: string | null;
  delivered_at: string | null;
  opened_at: string | null;
  failed_at: string | null;
  failure_reason: string | null;
  created_at: string;
  updated_at: string;
}

export type WeeklyReportInsert = Pick<WeeklyReportRow, "student_id" | "week_start" | "week_end"> &
  Partial<Omit<WeeklyReportRow, "student_id" | "week_start" | "week_end">>;

export type WeeklyReportUpdate = Partial<WeeklyReportInsert>;

export interface ReportJobRow {
  id: string;
  student_id: string;
  weekly_report_id: string | null;
  week_start: string;
  week_end: string;
  job_type: string;
  status: ReportJobStatus;
  attempt_count: number;
  max_attempts: number;
  next_attempt_at: string;
  locked_at: string | null;
  locked_by: string | null;
  completed_at: string | null;
  error_message: string | null;
  is_demo: boolean;
  created_at: string;
  updated_at: string;
}

export type ReportJobInsert = Pick<ReportJobRow, "student_id" | "week_start" | "week_end"> &
  Partial<Omit<ReportJobRow, "student_id" | "week_start" | "week_end">>;

export type ReportJobUpdate = Partial<ReportJobInsert>;

export interface BrainUsageLogRow {
  id: string;
  feature: string;
  student_id: string | null;
  weekly_report_id: string | null;
  provider: string;
  model: string | null;
  input_tokens: number | null;
  output_tokens: number | null;
  estimated_cost: number | null;
  latency_ms: number | null;
  success: boolean;
  error_code: string | null;
  error_message: string | null;
  metadata: Json;
  created_at: string;
}

export type BrainUsageLogInsert = Pick<BrainUsageLogRow, "feature"> &
  Partial<Omit<BrainUsageLogRow, "feature">>;

export type BrainUsageLogUpdate = Partial<BrainUsageLogInsert>;

export interface DemoScenarioRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: DemoScenarioCategory;
  student_profile_json: Json;
  activity_data_json: Json;
  is_active: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type DemoScenarioInsert = Pick<DemoScenarioRow, "name" | "slug" | "category"> &
  Partial<Omit<DemoScenarioRow, "name" | "slug" | "category">>;

export type DemoScenarioUpdate = Partial<DemoScenarioInsert>;

export interface AcademyBrainTables {
  parent_report_preferences: {
    Row: ParentReportPreferenceRow;
    Insert: ParentReportPreferenceInsert;
    Update: ParentReportPreferenceUpdate;
  };
  weekly_reports: {
    Row: WeeklyReportRow;
    Insert: WeeklyReportInsert;
    Update: WeeklyReportUpdate;
  };
  report_jobs: {
    Row: ReportJobRow;
    Insert: ReportJobInsert;
    Update: ReportJobUpdate;
  };
  brain_usage_logs: {
    Row: BrainUsageLogRow;
    Insert: BrainUsageLogInsert;
    Update: BrainUsageLogUpdate;
  };
  demo_scenarios: {
    Row: DemoScenarioRow;
    Insert: DemoScenarioInsert;
    Update: DemoScenarioUpdate;
  };
}
