import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import type { SubscriptionOverview } from "@/lib/billing.types";
import { getSubscriptionOverview } from "@/routes/-upgrade.server";

export interface SubscriptionOverviewState {
  overview: SubscriptionOverview | null;
  loading: boolean;
  resolved: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useSubscriptionOverview(): SubscriptionOverviewState {
  const { user } = useAuth();
  const [overview, setOverview] = useState<SubscriptionOverview | null>(null);
  const [loading, setLoading] = useState(false);
  const [resolvedUserId, setResolvedUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!user) {
      setOverview(null);
      setResolvedUserId(null);
      setError(null);
      return;
    }
    setOverview(null);
    setResolvedUserId(null);
    setLoading(true);
    setError(null);
    try {
      setOverview(await getSubscriptionOverview());
    } catch (loadError) {
      console.error("[billing] subscription overview failed", loadError);
      setError("We couldn't load your subscription. Please try again.");
    } finally {
      setResolvedUserId(user.id);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void refresh();
    const handleBillingUpdate = () => void refresh();
    window.addEventListener("academy:billing-updated", handleBillingUpdate);
    return () => window.removeEventListener("academy:billing-updated", handleBillingUpdate);
  }, [refresh]);

  return {
    overview,
    loading,
    resolved: Boolean(user && resolvedUserId === user.id),
    error,
    refresh,
  };
}
