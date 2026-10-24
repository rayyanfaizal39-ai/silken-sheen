import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/context/auth-context";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import {
  capturePartnerReference,
  clearPartnerReference,
  isFinalClaimResult,
  storedPartnerCode,
} from "@/lib/partner-attribution";

/**
 * Remembers a partner ?ref= code from any page and, once a student is signed
 * in (including after Google OAuth), asks the database to lock that partner as
 * the student's referrer. The database validates the code and never reassigns.
 */
export function PartnerReferralClaim() {
  const href = useRouterState({ select: (state) => state.location.href });
  const { user, loading } = useAuth();
  const userId = user?.id ?? null;

  useEffect(() => {
    let code: string | undefined;
    try {
      capturePartnerReference(window.location.href, window.localStorage);
      code = storedPartnerCode(window.localStorage);
    } catch {
      return; // Referral storage is optional.
    }
    if (loading || !userId || !code || !isSupabaseConfigured) return;

    let cancelled = false;
    void supabase
      .rpc("partner_claim_referral", { p_partner_code: code })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          // Transient failure: keep the code and retry on the next navigation.
          console.warn("[partners] referral claim deferred:", error.message);
          return;
        }
        if (isFinalClaimResult(data)) clearPartnerReference(window.localStorage);
      });
    return () => {
      cancelled = true;
    };
  }, [href, loading, userId]);

  return null;
}
