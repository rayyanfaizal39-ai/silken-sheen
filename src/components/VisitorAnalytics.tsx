import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/context/auth-context";
import {
  hasIdentifiedCurrentSession,
  markCurrentSessionIdentified,
  trackVisitorEvent,
} from "@/lib/visitor-analytics";

export function VisitorAnalytics() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { user, loading } = useAuth();
  const userId = user?.id ?? null;

  useEffect(() => {
    if (loading) return;
    void trackVisitorEvent("page_view", { title: document.title }, userId);
  }, [loading, pathname, userId]);

  useEffect(() => {
    if (loading || !userId || hasIdentifiedCurrentSession(userId)) return;
    markCurrentSessionIdentified(userId);
    void trackVisitorEvent("authenticated_visit", {}, userId);
  }, [loading, userId]);

  return null;
}
