import { createServerFn } from '@tanstack/react-start';
import { getSupabaseServerClient } from '../lib/supabase.server';

// Real, server-verified Galaxy Hall of Fame data — see the get_leaderboard()
// Postgres function (supabase/migrations/20260705024814_get_leaderboard.sql)
// for why this goes through a SECURITY DEFINER RPC rather than direct table
// reads: profiles/user_progress/quiz_history RLS only allow reading your own
// row, but a leaderboard needs every student's name/school/XP visible to
// every other student. The RPC is scoped to only the safe leaderboard
// fields (no email, no payments) and requires the caller to be signed in.
export interface LeaderboardStudentRow {
  id: string;
  full_name: string | null;
  school: string | null;
  lifetime_xp: number;
  streak: number | null; // null = no user_progress row yet, i.e. genuinely no data
  monthly_xp: number;
  monthly_quiz_count: number;
  monthly_correct: number;
  monthly_total: number;
  created_at: string;
}

export interface LeaderboardData {
  month: string;
  students: LeaderboardStudentRow[];
}

export const getLeaderboardData = createServerFn({ method: 'GET' }).handler(
  async (): Promise<LeaderboardData | null> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) return null;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null; // not signed in — caller falls back to the local demo board

    const { data, error } = await supabase.rpc('get_leaderboard');
    if (error) {
      console.error('[leaderboard] get_leaderboard RPC failed:', error);
      return null;
    }
    return data as LeaderboardData;
  },
);
