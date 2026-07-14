import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerClient } from "../lib/supabase.server";

export interface LeaderboardStudentRow {
  position: number;
  display_name: string;
  lifetime_xp: number;
  streak: number | null;
  monthly_xp: number;
  monthly_quiz_count: number;
  monthly_correct: number;
  monthly_total: number;
  is_current_user: boolean;
}

export interface LeaderboardData {
  month: string;
  period_start: string;
  generated_at: string;
  students: LeaderboardStudentRow[];
  current_position: LeaderboardStudentRow | null;
}

export type LeaderboardResponse =
  | { status: "ok"; data: LeaderboardData }
  | { status: "unauthenticated" }
  | { status: "error"; message: string };

export const getLeaderboardData = createServerFn({ method: "GET" }).handler(
  async (): Promise<LeaderboardResponse> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return { status: "error", message: "The leaderboard is temporarily unavailable." };
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      if (import.meta.env.DEV) console.error("[leaderboard] auth lookup failed:", authError);
      return { status: "error", message: "The leaderboard could not be loaded safely." };
    }
    if (!user) return { status: "unauthenticated" };

    const { data, error } = await supabase.rpc("get_leaderboard", {
      page_size: 10,
      page_offset: 0,
    });

    if (error || !data) {
      if (import.meta.env.DEV) console.error("[leaderboard] get_leaderboard RPC failed:", error);
      return {
        status: "error",
        message: "The monthly leaderboard could not be loaded. Please try again.",
      };
    }

    return { status: "ok", data: data as LeaderboardData };
  },
);
