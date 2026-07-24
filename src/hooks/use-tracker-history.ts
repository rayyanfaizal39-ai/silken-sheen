import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { hasFeature, resolveStoredPlan } from "@/lib/feature-access";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import type { QuizResult } from "@/hooks/use-progress";

type TrackerHistoryState = {
  ownerId: string | null;
  history: QuizResult[];
  eligible: boolean;
  loading: boolean;
  error: string | null;
};

const EMPTY_STATE: TrackerHistoryState = {
  ownerId: null,
  history: [],
  eligible: false,
  loading: false,
  error: null,
};

export function useTrackerHistory() {
  const { user, loading: authLoading } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [state, setState] = useState<TrackerHistoryState>(EMPTY_STATE);

  const refresh = useCallback(() => setRefreshKey((key) => key + 1), []);

  useEffect(() => {
    window.addEventListener("academy:quiz-history-updated", refresh);
    return () => window.removeEventListener("academy:quiz-history-updated", refresh);
  }, [refresh]);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !isSupabaseConfigured) {
      setState(EMPTY_STATE);
      return;
    }

    let cancelled = false;
    const ownerId = user.id;
    setState({ ownerId, history: [], eligible: false, loading: true, error: null });

    void (async () => {
      const subscriptionResult = await supabase
        .from("subscriptions")
        .select("plan")
        .eq("user_id", ownerId)
        .eq("status", "active")
        .maybeSingle();

      if (cancelled) return;
      if (subscriptionResult.error) {
        setState({
          ownerId,
          history: [],
          eligible: false,
          loading: false,
          error: "Unable to verify Tracker access.",
        });
        return;
      }

      const eligible = hasFeature(
        resolveStoredPlan(subscriptionResult.data?.plan),
        "quiz_history",
      );
      if (!eligible) {
        setState({ ownerId, history: [], eligible: false, loading: false, error: null });
        return;
      }

      const historyResult = await supabase
        .from("quiz_history")
        .select("id, subject_id, chapter_key, score_pct, correct, total, created_at")
        .eq("user_id", ownerId)
        .order("created_at", { ascending: false });

      if (cancelled) return;
      if (historyResult.error) {
        setState({
          ownerId,
          history: [],
          eligible: true,
          loading: false,
          error: "Unable to load Tracker history.",
        });
        return;
      }

      const history = (historyResult.data ?? []).map(
        (row): QuizResult => ({
          id: row.id,
          subjectId: row.subject_id,
          chapterKey: row.chapter_key,
          scorePct: Number(row.score_pct),
          correct: row.correct,
          total: row.total,
          date: row.created_at,
        }),
      );
      setState({ ownerId, history, eligible: true, loading: false, error: null });
    })();

    return () => {
      cancelled = true;
    };
  }, [authLoading, refreshKey, user]);

  const ownsState = !!user && state.ownerId === user.id;
  return {
    user,
    history: ownsState ? state.history : [],
    eligible: ownsState && state.eligible,
    loading: authLoading || (!!user && (!ownsState || state.loading)),
    error: ownsState ? state.error : null,
    refresh,
  };
}
