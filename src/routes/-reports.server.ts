import { createServerFn } from '@tanstack/react-start';
import { getSupabaseServerClient, isSupabaseServerConfigured } from '../lib/supabase.server';
import { checkContentLibraryBucket } from './-admin.server';
import type { ReportsData, ReportsLearningInsights } from '../lib/admin.types';

// `subjects`/`chapters` (../data/content, ../content/registry) pull in the
// entire curriculum content tree (every subject/chapter's notes, quizzes,
// flashcards — several MB). Since this file exports a createServerFn, a
// static top-level import here gets bundled into the single always-loaded
// server-function registry chunk that every SSR request pays to parse on
// cold start, even requests that never call getReportsData (e.g. "/",
// "/login"). Dynamic imports inside the handler keep that weight out of the
// eager bundle and load it only when an admin actually opens Reports.
async function loadContentRegistry() {
  const [{ subjects }, { chapters }, { getChapterFeatures }] = await Promise.all([
    import('../data/content'),
    import('../content/registry'),
    import('../content/types'),
  ]);
  return { subjects, chapters, getChapterFeatures };
}

// AcadeMY Mission Intelligence — see docs/DATABASE_MAP.md for the tables
// this reads (profiles, user_progress, quiz_history, payments,
// knowledge_engine, content_library — no new tables). RLS on every one of
// those already restricts reads to is_admin(), so this page is protected at
// both the route level (admin.tsx beforeLoad) and the database level.
//
// Performance note: pure counts use `{ count: 'exact', head: true }` (no row
// data fetched). The handful of grouped metrics (popular subject/chapter,
// most-improved student, 30-day charts) fetch a bounded, narrow-column slice
// (recent quiz_history/profiles rows, capped at a few thousand) and
// aggregate in JS — fine at today's data volume. TODO: once quiz_history
// grows large, replace those with a dedicated Postgres RPC (same pattern as
// admin_dashboard_stats()) doing the grouping in SQL instead.

function dayKey(iso: string): string {
  return iso.slice(0, 10);
}

function daysAgoIso(n: number): string {
  return new Date(Date.now() - n * 86400000).toISOString();
}

function logSupabaseResult(label: string, result: { data?: unknown; error?: unknown; count?: number | null }) {
  console.log(`[reports] ${label}`, {
    data: result.data ?? null,
    error: result.error ?? null,
    count: result.count ?? null,
  });
}

function startOfMonthIso(): string {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
}

export const getReportsData = createServerFn({ method: 'GET' }).handler(
  async (): Promise<ReportsData> => {
    const { subjects, chapters, getChapterFeatures } = await loadContentRegistry();
    const supabase = getSupabaseServerClient();
    const empty: ReportsData = {
      mission_brief: {
        new_students_this_week: 0,
        quizzes_this_week: 0,
        most_studied_subject: null,
        new_premium_this_week: 0,
        content_awaiting_publication: 0,
      },
      top_metrics: {
        students: 0,
        premium_users: 0,
        daily_active_users: 0,
        new_users_this_week: 0,
        quizzes_completed_today: 0,
        total_xp_earned_today: null,
        active_study_streaks: 0,
        ai_requests: null,
      },
      learning_insights: {
        most_popular_subject: null,
        most_popular_chapter: null,
        lowest_accuracy_chapter: null,
        highest_accuracy_chapter: null,
        most_improved_student: null,
        most_active_student: null,
        newest_student: null,
      },
      platform_health: {
        storage_status: 'not_configured',
        database_status: 'error',
        auth_status: 'not_configured',
        content_library_status: 'bucket_missing',
        last_backup: null,
        system_health: 'degraded',
      },
      content_status: {
        total_subjects: subjects.length,
        total_chapters: chapters.length,
        content_library_files: 0,
        published_notes: 0,
        published_quizzes: 0,
        published_flashcards: 0,
        published_mindmaps: 0,
        missing_content: 0,
      },
      premium_insights: {
        premium_users: 0,
        free_users: 0,
        conversion_rate_pct: 0,
        expired_subscriptions: null,
        new_premium_this_month: 0,
      },
      charts: { new_users_30d: [], quiz_activity_30d: [], xp_earned_30d: null },
    };
    if (!supabase) return empty;

    const today = new Date().toISOString().slice(0, 10);
    const weekAgo = daysAgoIso(7);
    const monthAgo = startOfMonthIso();
    const thirtyDaysAgo = daysAgoIso(30);

    // ── Content status: static registry data (chapters aren't DB rows) ──
    let publishedNotes = 0, publishedQuizzes = 0, publishedFlashcards = 0, publishedMindmaps = 0, missing = 0;
    for (const c of chapters) {
      const f = getChapterFeatures(c);
      if (f.notes) publishedNotes++;
      if (f.quiz) publishedQuizzes++;
      if (f.flashcards) publishedFlashcards++;
      if (f.mindMap) publishedMindmaps++;
      if (!(f.notes && f.quiz && f.flashcards && f.mindMap)) missing++;
    }

    // ── Platform health ──
    const bucketExists = await checkContentLibraryBucket().catch(() => false);
    const authConfigured = isSupabaseServerConfigured();
    let databaseOk = true;

    // ── Pure counts (no row data fetched) ──
    const [
      studentsRes,
      premiumRes,
      freeRes,
      dauRes,
      newUsersWeekRes,
      quizzesTodayRes,
      quizzesWeekRes,
      activeStreaksRes,
      contentLibraryFilesRes,
      contentAwaitingRes,
      newPremiumMonthRes,
      newPremiumWeekRes,
      newestStudentRes,
    ] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'student'),
      supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('plan', 'paid'),
      supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('plan', 'free'),
      supabase.from('user_progress').select('user_id', { count: 'exact', head: true }).eq('last_active', today),
      supabase.from('profiles').select('id', { count: 'exact', head: true }).gte('created_at', weekAgo),
      supabase.from('quiz_history').select('id', { count: 'exact', head: true }).gte('created_at', `${today}T00:00:00.000Z`),
      supabase.from('quiz_history').select('id', { count: 'exact', head: true }).gte('created_at', weekAgo),
      supabase.from('user_progress').select('user_id', { count: 'exact', head: true }).gt('streak', 0),
      supabase.from('content_library').select('id', { count: 'exact', head: true }),
      supabase.from('content_library').select('id', { count: 'exact', head: true }).not('status', 'in', '(published,failed)'),
      supabase.from('payments').select('id', { count: 'exact', head: true }).eq('status', 'paid').gte('created_at', monthAgo),
      supabase.from('payments').select('id', { count: 'exact', head: true }).eq('status', 'paid').gte('created_at', weekAgo),
      supabase.from('profiles').select('full_name, created_at').eq('role', 'student').order('created_at', { ascending: false }).limit(1).maybeSingle(),
    ]).catch((e) => {
      databaseOk = false;
      console.error('[reports] count queries failed:', e);
      return [null, null, null, null, null, null, null, null, null, null, null, null, null] as const;
    });

    logSupabaseResult('profiles count student', { data: studentsRes?.data, error: studentsRes?.error, count: studentsRes?.count ?? null });
    logSupabaseResult('profiles count paid', { data: premiumRes?.data, error: premiumRes?.error, count: premiumRes?.count ?? null });
    logSupabaseResult('profiles count free', { data: freeRes?.data, error: freeRes?.error, count: freeRes?.count ?? null });
    logSupabaseResult('user_progress count last_active', { data: dauRes?.data, error: dauRes?.error, count: dauRes?.count ?? null });
    logSupabaseResult('profiles count signup week', { data: newUsersWeekRes?.data, error: newUsersWeekRes?.error, count: newUsersWeekRes?.count ?? null });
    logSupabaseResult('quiz_history count today', { data: quizzesTodayRes?.data, error: quizzesTodayRes?.error, count: quizzesTodayRes?.count ?? null });
    logSupabaseResult('quiz_history count week', { data: quizzesWeekRes?.data, error: quizzesWeekRes?.error, count: quizzesWeekRes?.count ?? null });
    logSupabaseResult('user_progress count streak', { data: activeStreaksRes?.data, error: activeStreaksRes?.error, count: activeStreaksRes?.count ?? null });
    logSupabaseResult('content_library count all', { data: contentLibraryFilesRes?.data, error: contentLibraryFilesRes?.error, count: contentLibraryFilesRes?.count ?? null });
    logSupabaseResult('content_library count awaiting', { data: contentAwaitingRes?.data, error: contentAwaitingRes?.error, count: contentAwaitingRes?.count ?? null });
    logSupabaseResult('payments count month', { data: newPremiumMonthRes?.data, error: newPremiumMonthRes?.error, count: newPremiumMonthRes?.count ?? null });
    logSupabaseResult('payments count week', { data: newPremiumWeekRes?.data, error: newPremiumWeekRes?.error, count: newPremiumWeekRes?.count ?? null });
    logSupabaseResult('profiles newest student', { data: newestStudentRes?.data, error: newestStudentRes?.error, count: null });

    // supabase-js resolves with { error } rather than throwing on query
    // failures (RLS denial, bad filter, etc.), so the .catch above only
    // covers network-level failures — check each resolved result too.
    if ([studentsRes, premiumRes, freeRes, dauRes, newUsersWeekRes, quizzesTodayRes, quizzesWeekRes, activeStreaksRes, contentLibraryFilesRes, contentAwaitingRes, newPremiumMonthRes, newPremiumWeekRes, newestStudentRes].some((r) => r?.error)) {
      databaseOk = false;
    }

    const students = studentsRes?.count ?? 0;
    const premiumUsers = premiumRes?.count ?? 0;
    const freeUsers = freeRes?.count ?? 0;

    // ── Bounded grouped metrics (narrow columns, capped rows) ──
    const [{ data: recentQuizzes }, { data: recentProfiles }] = await Promise.all([
      supabase
        .from('quiz_history')
        .select('user_id, subject_id, chapter_key, score_pct, created_at')
        .gte('created_at', thirtyDaysAgo)
        .order('created_at', { ascending: false })
        .limit(3000),
      supabase
        .from('profiles')
        .select('id, created_at')
        .gte('created_at', thirtyDaysAgo)
        .order('created_at', { ascending: false })
        .limit(3000),
    ]).catch(() => [{ data: [] }, { data: [] }] as const);

    logSupabaseResult('quiz_history recent slice', { data: recentQuizzes, error: null, count: Array.isArray(recentQuizzes) ? recentQuizzes.length : null });
    logSupabaseResult('profiles recent slice', { data: recentProfiles, error: null, count: Array.isArray(recentProfiles) ? recentProfiles.length : null });

    const quizzes = recentQuizzes ?? [];
    const profileSignups = recentProfiles ?? [];

    // Subject/chapter popularity + accuracy, all from the same bounded slice.
    const bySubject = new Map<string, number>();
    const byChapter = new Map<string, { count: number; sum: number }>();
    const byUser = new Map<string, { id: string; created_at: string; scores: number[] }[]>();
    for (const q of quizzes) {
      bySubject.set(q.subject_id, (bySubject.get(q.subject_id) ?? 0) + 1);
      const ch = byChapter.get(q.chapter_key) ?? { count: 0, sum: 0 };
      ch.count++;
      ch.sum += Number(q.score_pct);
      byChapter.set(q.chapter_key, ch);
    }
    const topSubject = [...bySubject.entries()].sort((a, b) => b[1] - a[1])[0];
    const topChapter = [...byChapter.entries()].sort((a, b) => b[1].count - a[1].count)[0];
    const chapterAccuracy = [...byChapter.entries()].map(([label, v]) => ({ label, avg: v.sum / v.count }));
    const lowestAcc = chapterAccuracy.length ? chapterAccuracy.reduce((a, b) => (b.avg < a.avg ? b : a)) : null;
    const highestAcc = chapterAccuracy.length ? chapterAccuracy.reduce((a, b) => (b.avg > a.avg ? b : a)) : null;

    // Most active + most improved student, grouped by user_id.
    const quizzesByUser = new Map<string, { created_at: string; score_pct: number }[]>();
    for (const q of quizzes) {
      const arr = quizzesByUser.get(q.user_id) ?? [];
      arr.push({ created_at: q.created_at, score_pct: Number(q.score_pct) });
      quizzesByUser.set(q.user_id, arr);
    }
    const mostActiveEntry = [...quizzesByUser.entries()].sort((a, b) => b[1].length - a[1].length)[0];

    let mostImprovedUserId: string | null = null;
    let mostImprovedDelta = -Infinity;
    for (const [userId, attempts] of quizzesByUser.entries()) {
      if (attempts.length < 2) continue;
      const sorted = [...attempts].sort((a, b) => a.created_at.localeCompare(b.created_at));
      const mid = Math.floor(sorted.length / 2);
      const firstHalf = sorted.slice(0, mid || 1);
      const secondHalf = sorted.slice(mid || 1);
      if (!firstHalf.length || !secondHalf.length) continue;
      const avg = (arr: typeof sorted) => arr.reduce((s, a) => s + a.score_pct, 0) / arr.length;
      const delta = avg(secondHalf) - avg(firstHalf);
      if (delta > mostImprovedDelta) {
        mostImprovedDelta = delta;
        mostImprovedUserId = userId;
      }
    }

    const namedUserIds = [mostActiveEntry?.[0], mostImprovedUserId].filter((id): id is string => !!id);
    const namesById = new Map<string, string | null>();
    if (namedUserIds.length) {
      const { data: nameRows } = await supabase.from('profiles').select('id, full_name').in('id', namedUserIds);
      logSupabaseResult('profiles name lookup', { data: nameRows, error: null, count: Array.isArray(nameRows) ? nameRows.length : null });
      for (const r of nameRows ?? []) namesById.set(r.id, r.full_name);
    }

    const learningInsights: ReportsLearningInsights = {
      most_popular_subject: topSubject ? { label: topSubject[0], count: topSubject[1] } : null,
      most_popular_chapter: topChapter ? { label: topChapter[0], count: topChapter[1].count } : null,
      lowest_accuracy_chapter: lowestAcc ? { label: lowestAcc.label, avg_score_pct: Math.round(lowestAcc.avg) } : null,
      highest_accuracy_chapter: highestAcc ? { label: highestAcc.label, avg_score_pct: Math.round(highestAcc.avg) } : null,
      most_improved_student:
        mostImprovedUserId && mostImprovedDelta > 0
          ? { name: namesById.get(mostImprovedUserId) ?? 'Unnamed student', delta_pct: Math.round(mostImprovedDelta) }
          : null,
      most_active_student: mostActiveEntry
        ? { name: namesById.get(mostActiveEntry[0]) ?? 'Unnamed student', quiz_count: mostActiveEntry[1].length }
        : null,
      newest_student:
        newestStudentRes?.data && newestStudentRes.data.created_at
          ? { name: newestStudentRes.data.full_name ?? 'Unnamed student', created_at: newestStudentRes.data.created_at }
          : null,
    };

    // ── 30-day chart buckets ──
    const newUsersByDay = new Map<string, number>();
    for (const p of profileSignups) newUsersByDay.set(dayKey(p.created_at), (newUsersByDay.get(dayKey(p.created_at)) ?? 0) + 1);
    const quizByDay = new Map<string, number>();
    for (const q of quizzes) quizByDay.set(dayKey(q.created_at), (quizByDay.get(dayKey(q.created_at)) ?? 0) + 1);

    const last30Days: string[] = Array.from({ length: 30 }, (_, i) => dayKey(daysAgoIso(29 - i)));

    return {
      mission_brief: {
        new_students_this_week: newUsersWeekRes?.count ?? 0,
        quizzes_this_week: quizzesWeekRes?.count ?? 0,
        most_studied_subject: topSubject ? topSubject[0] : null,
        new_premium_this_week: newPremiumWeekRes?.count ?? 0,
        content_awaiting_publication: contentAwaitingRes?.count ?? 0,
      },
      top_metrics: {
        students,
        premium_users: premiumUsers,
        daily_active_users: dauRes?.count ?? 0,
        new_users_this_week: newUsersWeekRes?.count ?? 0,
        quizzes_completed_today: quizzesTodayRes?.count ?? 0,
        total_xp_earned_today: null,
        active_study_streaks: activeStreaksRes?.count ?? 0,
        ai_requests: null,
      },
      learning_insights: learningInsights,
      platform_health: {
        storage_status: bucketExists ? 'operational' : 'not_configured',
        database_status: databaseOk ? 'operational' : 'error',
        auth_status: authConfigured ? 'operational' : 'not_configured',
        content_library_status: bucketExists ? 'operational' : 'bucket_missing',
        last_backup: null,
        system_health: databaseOk && authConfigured && bucketExists ? 'operational' : 'degraded',
      },
      content_status: {
        total_subjects: subjects.length,
        total_chapters: chapters.length,
        content_library_files: contentLibraryFilesRes?.count ?? 0,
        published_notes: publishedNotes,
        published_quizzes: publishedQuizzes,
        published_flashcards: publishedFlashcards,
        published_mindmaps: publishedMindmaps,
        missing_content: missing,
      },
      premium_insights: {
        premium_users: premiumUsers,
        free_users: freeUsers,
        conversion_rate_pct: premiumUsers + freeUsers > 0 ? Math.round((premiumUsers / (premiumUsers + freeUsers)) * 100) : 0,
        expired_subscriptions: null,
        new_premium_this_month: newPremiumMonthRes?.count ?? 0,
      },
      charts: {
        new_users_30d: last30Days.map((day) => ({ day, value: newUsersByDay.get(day) ?? 0 })),
        quiz_activity_30d: last30Days.map((day) => ({ day, value: quizByDay.get(day) ?? 0 })),
        xp_earned_30d: null,
      },
    };
  },
);
