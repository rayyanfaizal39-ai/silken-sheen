import { createServerFn } from '@tanstack/react-start';
import { getSupabaseServerClient } from '../lib/supabase.server';
import type {
  AdminProfile,
  AdminStats,
  AdminFilters,
  UserRow,
  PaymentRow,
  QuizRow,
} from '../lib/admin.types';

export const getAdminProfile = createServerFn({ method: 'GET' }).handler(
  async (): Promise<AdminProfile | null> => {
    const supabase = getSupabaseServerClient();
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
    const { data, error } = await supabase.rpc('admin_dashboard_stats');
    if (error) throw error;
    return data as AdminStats;
  },
);

export const getUsers = createServerFn({ method: 'POST' })
  .inputValidator((f: AdminFilters) => f)
  .handler(async ({ data: f }): Promise<UserRow[]> => {
    const supabase = getSupabaseServerClient();
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
