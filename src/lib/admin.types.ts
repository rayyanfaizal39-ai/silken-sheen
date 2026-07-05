// Shared types for the admin dashboard.

export type Role = 'student' | 'teacher' | 'admin';
export type Plan = 'free' | 'paid';
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded';

export interface AdminProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: Role;
  plan: Plan;
}

export interface AdminStats {
  total_users: number;
  total_students: number;
  total_teachers: number;
  total_admins: number;
  total_paid: number;
  total_free: number;
  total_quiz_attempts: number;
  avg_quiz_score: number;
  most_popular_subject: string | null;
  most_attempted_chapter: string | null;
  revenue_total: number;
  subject_distribution: { label: string; value: number }[];
  signups_by_day: { day: string; value: number }[];
}

export interface UserRow {
  id: string;
  full_name: string | null;
  email: string | null;
  role: Role;
  plan: Plan;
  created_at: string;
  last_login_at: string | null;
  total_quizzes: number;
}

export interface PaymentRow {
  id: string;
  created_at: string;
  amount: number;
  currency: string;
  method: string | null;
  status: PaymentStatus;
  profiles: { full_name: string | null; email: string | null } | null;
}

export interface QuizRow {
  id: string;
  created_at: string;
  subject: string;
  form: string | null;
  chapter: string | null;
  score: number;
  profiles: { full_name: string | null; email: string | null } | null;
}

// Filter payload shared by the table server functions.
export interface AdminFilters {
  start?: string | null;   // ISO date (inclusive)
  end?: string | null;     // ISO date (inclusive)
  subject?: string | null;
  form?: string | null;
  plan?: Plan | null;
  role?: Role | null;
  search?: string | null;
  limit?: number;
}

export interface KnowledgeEngineRow {
  id: string;
  title: string;
  category: string;
  content: string;
  reflection: string | null;
  created_at: string | null;
}

// Filter payload for the Cikgu AI Intel table — separate from AdminFilters
// since "category" here is a knowledge_engine-specific facet, not a subject.
export interface KnowledgeEngineFilters {
  search?: string | null;
  category?: string | null;
  limit?: number;
}

export type ContentLibraryStatus =
  | 'uploaded'
  | 'processing'
  | 'text_extracted'
  | 'ready_for_generation'
  | 'generated'
  | 'published'
  | 'failed';

export interface ContentLibraryRow {
  id: string;
  file_path: string;
  file_name: string;
  file_type: string;
  file_size: number;
  title: string;
  subject: string | null;
  form: string | null;
  chapter: string | null;
  topic: string | null;
  language: string | null;
  source_type: string | null;
  tags: string[];
  status: ContentLibraryStatus;
  extracted_text: string | null;
  error_message: string | null;
  uploaded_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContentLibraryFilters {
  search?: string | null;
  status?: ContentLibraryStatus | null;
  subject?: string | null;
  limit?: number;
}

// Metadata fields the upload form collects — everything except the
// file-identity/pipeline columns, which the server function fills in.
export interface ContentLibraryMetadataInput {
  title: string;
  subject?: string | null;
  form?: string | null;
  chapter?: string | null;
  topic?: string | null;
  language?: string | null;
  source_type?: string | null;
  tags?: string[];
}

export type UserStatus = 'active' | 'suspended';

// One row from admin_users_overview (profiles + user_progress + quiz_history
// aggregate) — see docs/DATABASE_MAP.md for the view definition.
export interface AdminUserRow {
  id: string;
  full_name: string | null;
  email: string | null;
  role: Role;
  plan: Plan;
  created_at: string;
  last_login_at: string | null;
  total_quizzes: number;
  username: string | null;
  school: string | null;
  form: string | null;
  status: UserStatus;
  xp: number;
  streak: number;
  badges: string[];
  avg_score_pct: number | null;
  quiz_count: number;
}

// The "Partners" tab has no dedicated role in `profiles.role` (only
// student/teacher/admin exist) — it's mapped to role='teacher' as the
// closest existing B2B-style account. "Parents" has no login/role at all
// today (parent contact is just an email field on user_progress used for
// report delivery), so that tab is intentionally always empty.
export type UserTab = 'students' | 'partners' | 'parents' | 'admins';

export interface AdminUserFilters {
  tab: UserTab;
  search?: string | null;
  plan?: Plan | null;
  status?: UserStatus | null;
  form?: string | null;
  school?: string | null;
  quickFilter?: 'recently_joined' | 'inactive' | 'premium' | 'free' | 'highest_xp' | null;
  limit?: number;
}

export interface AdminUserQuizHistoryRow {
  id: string;
  subject_id: string;
  chapter_key: string;
  score_pct: number;
  correct: number;
  total: number;
  created_at: string;
}

export interface AdminUserProfile extends AdminUserRow {
  recent_quizzes: AdminUserQuizHistoryRow[];
}

// ── Reports module ──────────────────────────────────────────────────────────
// See routes/-reports.server.ts (getReportsData) for how each field is
// computed and docs/DATABASE_MAP.md for the underlying tables.

export interface ReportsMissionBrief {
  new_students_this_week: number;
  quizzes_this_week: number;
  most_studied_subject: string | null;
  new_premium_this_week: number;
  content_awaiting_publication: number;
}

export interface ReportsTopMetrics {
  students: number;
  premium_users: number;
  daily_active_users: number;
  new_users_this_week: number;
  quizzes_completed_today: number;
  total_xp_earned_today: number | null; // null = not trackable (no daily XP ledger)
  active_study_streaks: number;
  ai_requests: number | null; // null = not trackable yet (no usage log table)
}

export interface ReportsLearningInsights {
  most_popular_subject: { label: string; count: number } | null;
  most_popular_chapter: { label: string; count: number } | null;
  lowest_accuracy_chapter: { label: string; avg_score_pct: number } | null;
  highest_accuracy_chapter: { label: string; avg_score_pct: number } | null;
  most_improved_student: { name: string; delta_pct: number } | null;
  most_active_student: { name: string; quiz_count: number } | null;
  newest_student: { name: string; created_at: string } | null;
}

export interface ReportsPlatformHealth {
  storage_status: 'operational' | 'not_configured';
  database_status: 'operational' | 'error';
  auth_status: 'operational' | 'not_configured';
  content_library_status: 'operational' | 'bucket_missing';
  last_backup: null; // Supabase-managed, not exposed via anon key — always a placeholder
  system_health: 'operational' | 'degraded';
}

export interface ReportsContentStatus {
  total_subjects: number;
  total_chapters: number;
  content_library_files: number;
  published_notes: number;
  published_quizzes: number;
  published_flashcards: number;
  published_mindmaps: number;
  missing_content: number;
}

export interface ReportsPremiumInsights {
  premium_users: number;
  free_users: number;
  conversion_rate_pct: number;
  expired_subscriptions: null; // no subscription-expiry field in payments — not trackable
  new_premium_this_month: number;
}

export interface ReportsChartPoint {
  day: string;
  value: number;
}

export interface ReportsCharts {
  new_users_30d: ReportsChartPoint[];
  quiz_activity_30d: ReportsChartPoint[];
  xp_earned_30d: null; // no per-day XP ledger exists — not trackable, shown as empty state
}

export interface ReportsData {
  mission_brief: ReportsMissionBrief;
  top_metrics: ReportsTopMetrics;
  learning_insights: ReportsLearningInsights;
  platform_health: ReportsPlatformHealth;
  content_status: ReportsContentStatus;
  premium_insights: ReportsPremiumInsights;
  charts: ReportsCharts;
}
