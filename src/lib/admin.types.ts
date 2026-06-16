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
