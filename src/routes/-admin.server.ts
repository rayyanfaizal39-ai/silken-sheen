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
  ContentLibraryRow,
  ContentLibraryFilters,
  ContentLibraryMetadataInput,
  ContentLibraryStatus,
  AdminUserRow,
  AdminUserFilters,
  AdminUserProfile,
  UserStatus,
} from '../lib/admin.types';

export const CONTENT_LIBRARY_BUCKET = 'content-library';

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

// quiz_history.user_id references auth.users(id), not profiles(id) directly,
// so PostgREST can't embed `profiles(...)` in one query (no FK it can see).
// Fetch the quiz rows, then batch-fetch the matching profiles and merge —
// two queries, still one round trip fewer than N+1.
//
// quiz_history also has no `form` column (only subject_id/chapter_key), so
// the `form` filter is intentionally a no-op here rather than fabricated —
// filtering only applies to `subject` (mapped to subject_id).
export const getQuizActivity = createServerFn({ method: 'POST' })
  .inputValidator((f: AdminFilters) => f)
  .handler(async ({ data: f }): Promise<QuizRow[]> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) return [];
    let q = supabase
      .from('quiz_history')
      .select('id, created_at, subject_id, chapter_key, score_pct, user_id')
      .order('created_at', { ascending: false })
      .limit(f.limit ?? 100);

    if (f.subject) q = q.eq('subject_id', f.subject);
    if (f.start) q = q.gte('created_at', f.start);
    if (f.end) q = q.lte('created_at', f.end);

    const { data, error } = await q;
    if (error) throw error;
    const rows = data ?? [];

    const userIds = Array.from(new Set(rows.map((r) => r.user_id).filter(Boolean)));
    const profilesById = new Map<string, { full_name: string | null; email: string | null }>();
    if (userIds.length) {
      const { data: profileRows, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', userIds);
      if (profileError) throw profileError;
      for (const p of profileRows ?? []) profilesById.set(p.id, { full_name: p.full_name, email: p.email });
    }

    return rows.map((r) => ({
      id: r.id,
      created_at: r.created_at,
      subject: r.subject_id,
      form: null,
      chapter: r.chapter_key,
      score: Math.round(Number(r.score_pct)),
      profiles: profilesById.get(r.user_id) ?? null,
    }));
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

// ── Content Library ─────────────────────────────────────────────────────────
// Admin-only staging area for raw uploads (PDF/image/DOCX/TXT) ahead of the
// Notes/Quiz/Flashcard/Mindmap generation pipeline. See
// routes/admin.content-library.tsx for the consuming UI and
// docs/DATABASE_MAP.md for the full schema/RLS rationale.

// Storage-bucket existence check — the bucket has to be created once
// (dashboard or CLI) before any upload will succeed. Surfaced in the UI as an
// actionable setup notice rather than a silent failure.
export const checkContentLibraryBucket = createServerFn({ method: 'GET' }).handler(
  async (): Promise<boolean> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) return false;
    const { data, error } = await supabase.storage.getBucket(CONTENT_LIBRARY_BUCKET);
    if (error || !data) return false;
    return true;
  },
);

export const getContentLibraryEntries = createServerFn({ method: 'POST' })
  .inputValidator((f: ContentLibraryFilters) => f)
  .handler(async ({ data: f }): Promise<ContentLibraryRow[]> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) return [];
    let q = supabase
      .from('content_library')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(f.limit ?? 200);

    if (f.status) q = q.eq('status', f.status);
    if (f.subject) q = q.eq('subject', f.subject);
    if (f.search) q = q.ilike('title', `%${f.search}%`);

    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as ContentLibraryRow[];
  });

// Called after the browser has already uploaded the file straight to Storage
// (see ContentLibraryPage) — this just records the metadata row. Keeping the
// binary upload client-side avoids routing large files through the server
// function body.
export const createContentLibraryEntry = createServerFn({ method: 'POST' })
  .inputValidator((f: {
    file_path: string;
    file_name: string;
    file_type: string;
    file_size: number;
    metadata: ContentLibraryMetadataInput;
  }) => f)
  .handler(async ({ data: f }): Promise<ContentLibraryRow> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) throw new Error('Supabase not configured');
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('content_library')
      .insert({
        file_path: f.file_path,
        file_name: f.file_name,
        file_type: f.file_type,
        file_size: f.file_size,
        title: f.metadata.title,
        subject: f.metadata.subject ?? null,
        form: f.metadata.form ?? null,
        chapter: f.metadata.chapter ?? null,
        topic: f.metadata.topic ?? null,
        language: f.metadata.language ?? null,
        source_type: f.metadata.source_type ?? null,
        tags: f.metadata.tags ?? [],
        status: 'uploaded',
        uploaded_by: user?.id ?? null,
      })
      .select('*')
      .single();
    if (error) throw error;
    return data as ContentLibraryRow;
  });

export const updateContentLibraryMetadata = createServerFn({ method: 'POST' })
  .inputValidator((f: { id: string; metadata: ContentLibraryMetadataInput }) => f)
  .handler(async ({ data: f }): Promise<ContentLibraryRow> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('content_library')
      .update({
        title: f.metadata.title,
        subject: f.metadata.subject ?? null,
        form: f.metadata.form ?? null,
        chapter: f.metadata.chapter ?? null,
        topic: f.metadata.topic ?? null,
        language: f.metadata.language ?? null,
        source_type: f.metadata.source_type ?? null,
        tags: f.metadata.tags ?? [],
      })
      .eq('id', f.id)
      .select('*')
      .single();
    if (error) throw error;
    return data as ContentLibraryRow;
  });

export const updateContentLibraryStatus = createServerFn({ method: 'POST' })
  .inputValidator((f: { id: string; status: ContentLibraryStatus; error_message?: string | null }) => f)
  .handler(async ({ data: f }): Promise<ContentLibraryRow> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('content_library')
      .update({ status: f.status, error_message: f.error_message ?? null })
      .eq('id', f.id)
      .select('*')
      .single();
    if (error) throw error;
    return data as ContentLibraryRow;
  });

// Deletes both the storage object and its metadata row. Storage delete runs
// first so we never orphan a row pointing at a missing file; if storage
// delete fails, the row delete is skipped so the UI can retry.
export const deleteContentLibraryEntry = createServerFn({ method: 'POST' })
  .inputValidator((f: { id: string; file_path: string }) => f)
  .handler(async ({ data: f }): Promise<void> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) throw new Error('Supabase not configured');
    const { error: storageError } = await supabase.storage
      .from(CONTENT_LIBRARY_BUCKET)
      .remove([f.file_path]);
    if (storageError) throw storageError;
    const { error } = await supabase.from('content_library').delete().eq('id', f.id);
    if (error) throw error;
  });

// ── Admin Users module ──────────────────────────────────────────────────────
// Reads public.admin_users_overview (profiles + user_progress + quiz_history
// aggregate, see docs/DATABASE_MAP.md and the migration that added it).
//
// "Partners" has no dedicated role in profiles.role (only student/teacher/
// admin exist in the check constraint) — mapped to role='teacher' as the
// closest existing account type for MVP.
// TODO(post-launch): give Partners their own `role='partner'` value (check
// constraint + migration) instead of overloading 'teacher', once partner
// accounts need to diverge from teacher accounts in permissions/UI.
//
// "Parents" has no login/role at all today (parent contact is just an email
// field on user_progress for report delivery, not an account) — the Users
// page shows a "Coming Soon" placeholder for this tab instead of querying,
// so `parents` here is unused but kept for type completeness / future use.
const TAB_TO_ROLE: Record<AdminUserFilters['tab'], string> = {
  students: 'student',
  partners: 'teacher',
  parents: 'parent', // never a real value in profiles.role — placeholder only
  admins: 'admin',
};

export const getAdminUsers = createServerFn({ method: 'POST' })
  .inputValidator((f: AdminUserFilters) => f)
  .handler(async ({ data: f }): Promise<AdminUserRow[]> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) return [];
    let q = supabase
      .from('admin_users_overview')
      .select('*')
      .eq('role', TAB_TO_ROLE[f.tab])
      .limit(f.limit ?? 200);

    if (f.search) {
      q = q.or(
        `full_name.ilike.%${f.search}%,email.ilike.%${f.search}%,school.ilike.%${f.search}%,username.ilike.%${f.search}%`,
      );
    }
    if (f.plan) q = q.eq('plan', f.plan);
    if (f.status) q = q.eq('status', f.status);
    if (f.form) q = q.eq('form', f.form);
    if (f.school) q = q.eq('school', f.school);

    const now = new Date();
    if (f.quickFilter === 'recently_joined') {
      q = q.gte('created_at', new Date(now.getTime() - 30 * 86400000).toISOString());
    } else if (f.quickFilter === 'inactive') {
      q = q.lt('last_login_at', new Date(now.getTime() - 14 * 86400000).toISOString());
    } else if (f.quickFilter === 'premium') {
      q = q.eq('plan', 'paid');
    } else if (f.quickFilter === 'free') {
      q = q.eq('plan', 'free');
    }

    q = f.quickFilter === 'highest_xp'
      ? q.order('xp', { ascending: false })
      : q.order('created_at', { ascending: false });

    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as AdminUserRow[];
  });

// Counts for the four top cards — one query per tab's role mapping so the
// numbers stay correct even while a tab's own filters/search are applied
// (the cards always reflect the *unfiltered* total for that role).
export const getAdminUserCounts = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Record<AdminUserFilters['tab'], number>> => {
    const supabase = getSupabaseServerClient();
    const empty = { students: 0, partners: 0, parents: 0, admins: 0 };
    if (!supabase) return empty;
    const { data, error } = await supabase.from('admin_users_overview').select('role');
    if (error) throw error;
    const counts = { ...empty };
    for (const row of data ?? []) {
      if (row.role === 'student') counts.students++;
      else if (row.role === 'teacher') counts.partners++;
      else if (row.role === 'admin') counts.admins++;
      // 'parent' never occurs — counts.parents stays 0, which is the honest number.
    }
    return counts;
  },
);

// Distinct Form/School values for the filter dropdowns.
export const getAdminUserFacets = createServerFn({ method: 'GET' }).handler(
  async (): Promise<{ forms: string[]; schools: string[] }> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) return { forms: [], schools: [] };
    const { data, error } = await supabase.from('admin_users_overview').select('form, school');
    if (error) throw error;
    const forms = new Set<string>();
    const schools = new Set<string>();
    for (const row of data ?? []) {
      if (row.form) forms.add(row.form);
      if (row.school) schools.add(row.school);
    }
    return { forms: Array.from(forms).sort(), schools: Array.from(schools).sort() };
  },
);

export const getAdminUserProfile = createServerFn({ method: 'POST' })
  .inputValidator((f: { id: string }) => f)
  .handler(async ({ data: f }): Promise<AdminUserProfile | null> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) return null;
    const [{ data: user, error: userError }, { data: quizzes, error: quizError }] = await Promise.all([
      supabase.from('admin_users_overview').select('*').eq('id', f.id).single(),
      supabase
        .from('quiz_history')
        .select('id, subject_id, chapter_key, score_pct, correct, total, created_at')
        .eq('user_id', f.id)
        .order('created_at', { ascending: false })
        .limit(10),
    ]);
    if (userError) throw userError;
    if (quizError) throw quizError;
    if (!user) return null;
    return { ...(user as AdminUserRow), recent_quizzes: quizzes ?? [] };
  });

// Suspend/reactivate — reuses the existing "Admins can update any profile"
// RLS policy (is_admin()), same as every other admin write in this codebase.
export const updateUserStatus = createServerFn({ method: 'POST' })
  .inputValidator((f: { id: string; status: UserStatus }) => f)
  .handler(async ({ data: f }): Promise<void> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) throw new Error('Supabase not configured');
    const { error } = await supabase.from('profiles').update({ status: f.status }).eq('id', f.id);
    if (error) throw error;
  });

export const updateUserDetails = createServerFn({ method: 'POST' })
  .inputValidator((f: {
    id: string;
    full_name?: string | null;
    username?: string | null;
    school?: string | null;
    form?: string | null;
  }) => f)
  .handler(async ({ data: f }): Promise<void> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) throw new Error('Supabase not configured');
    const { id, ...patch } = f;
    const { error } = await supabase.from('profiles').update(patch).eq('id', id);
    if (error) throw error;
  });
