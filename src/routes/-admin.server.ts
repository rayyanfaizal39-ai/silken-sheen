import { createServerFn } from '@tanstack/react-start';
import { getSupabaseServerClient } from '../lib/supabase.server';
import type {
  AdminProfile,
  AdminStats,
  AdminFilters,
  UserRow,
  PaymentRow,
  QuizRow,
  KnowledgeEngineRow,
  KnowledgeEngineFilters,
} from '../lib/admin.types';

const EMPTY_STATS: AdminStats = {
  total_users: 0,
  total_students: 0,
  total_teachers: 0,
  total_admins: 0,
  total_paid: 0,
  total_free: 0,
  total_quiz_attempts: 0,
  avg_quiz_score: 0,
  most_popular_subject: null,
  most_attempted_chapter: null,
  revenue_total: 0,
  subject_distribution: [],
  signups_by_day: [],
};

export const getAdminProfile = createServerFn({ method: 'GET' }).handler(
  async (): Promise<AdminProfile | null> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) return null;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, email, role, plan')
      .eq('id', user.id)
      .single();

    return (data as AdminProfile) ?? null;
  },
);

export const getDashboardStats = createServerFn({ method: 'GET' }).handler(
  async (): Promise<AdminStats> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) return EMPTY_STATS;
    const { data, error } = await supabase.rpc('admin_dashboard_stats');
    if (error) throw error;
    return data as AdminStats;
  },
);

export const getUsers = createServerFn({ method: 'POST' })
  .inputValidator((f: AdminFilters) => f)
  .handler(async ({ data: f }): Promise<UserRow[]> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) return [];
    let q = supabase
      .from('admin_users_overview')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(f.limit ?? 100);

    if (f.role) q = q.eq('role', f.role);
    if (f.plan) q = q.eq('plan', f.plan);
    if (f.start) q = q.gte('created_at', f.start);
    if (f.end) q = q.lte('created_at', f.end);
    if (f.search)
      q = q.or(`full_name.ilike.%${f.search}%,email.ilike.%${f.search}%`);

    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as UserRow[];
  });

export const getPayments = createServerFn({ method: 'POST' })
  .inputValidator((f: AdminFilters) => f)
  .handler(async ({ data: f }): Promise<PaymentRow[]> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) return [];
    let q = supabase
      .from('payments')
      .select('id, created_at, amount, currency, method, status, profiles(full_name, email)')
      .order('created_at', { ascending: false })
      .limit(f.limit ?? 100);

    if (f.start) q = q.gte('created_at', f.start);
    if (f.end) q = q.lte('created_at', f.end);

    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as unknown as PaymentRow[];
  });

export const getQuizActivity = createServerFn({ method: 'POST' })
  .inputValidator((f: AdminFilters) => f)
  .handler(async ({ data: f }): Promise<QuizRow[]> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) return [];
    let q = supabase
      .from('quiz_attempts')
      .select('id, created_at, subject, form, chapter, score, profiles(full_name, email)')
      .order('created_at', { ascending: false })
      .limit(f.limit ?? 100);

    if (f.subject) q = q.eq('subject', f.subject);
    if (f.form) q = q.eq('form', f.form);
    if (f.start) q = q.gte('created_at', f.start);
    if (f.end) q = q.lte('created_at', f.end);

    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as unknown as QuizRow[];
  });

// Read-only for now — no insert/update/delete server functions yet.
// See CikguIntelPage (routes/admin.cikgu-intel.tsx) for the consuming UI.
export const getKnowledgeEngineEntries = createServerFn({ method: 'POST' })
  .inputValidator((f: KnowledgeEngineFilters) => f)
  .handler(async ({ data: f }): Promise<KnowledgeEngineRow[]> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) return [];
    let q = supabase
      .from('knowledge_engine')
      .select('id, title, category, content, reflection, created_at')
      .order('created_at', { ascending: false })
      .limit(f.limit ?? 200);

    if (f.category) q = q.eq('category', f.category);
    if (f.search) q = q.or(`title.ilike.%${f.search}%,content.ilike.%${f.search}%`);

    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as KnowledgeEngineRow[];
  });

// Distinct category list for the filter dropdown — queried separately so the
// dropdown's options don't shrink to whatever the current filter/search
// happens to match.
export const getKnowledgeEngineCategories = createServerFn({ method: 'GET' }).handler(
  async (): Promise<string[]> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) return [];
    const { data, error } = await supabase.from('knowledge_engine').select('category');
    if (error) throw error;
    const unique = new Set((data ?? []).map((r) => r.category).filter(Boolean));
    return Array.from(unique).sort();
  },
);
