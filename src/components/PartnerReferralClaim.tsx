import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/context/auth-context";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import {
  capturePartnerReference,
  clearPartnerChoice,
  confirmedPartnerCode,
  declinePartnerReferral,
  declinedPartnerReferral,
  partnerReturnTo,
  PARTNER_REVIEW_EVENT,
  PARTNER_ATTRIBUTION_KEY,
  rememberPartnerChoice,
  storedPartnerIntent,
  type PartnerIntent,
} from "@/lib/partner-attribution";
import { confirmPartnerReferral } from "@/routes/-upgrade.server";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

/**
 * Carries intent across auth. Never claims for the ambient signed-in account.
 */
export function PartnerReferralClaim() {
  const href = useRouterState({ select: (state) => state.location.href });
  const { user, loading, signInWithGoogle } = useAuth();
  const userId = user?.id ?? null;
  const currentUser = useRef(userId);
  currentUser.current = userId;
  const previousUser = useRef<string | null | undefined>(undefined);
  const referralUrl = useRef<string | null>(null);
  const [intent, setIntent] = useState<PartnerIntent>();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [originalPartner, setOriginalPartner] = useState<string>();
  const [ineligible, setIneligible] = useState(false);

  useEffect(() => {
    try {
      capturePartnerReference(window.location.href, window.localStorage);
      const pending = storedPartnerIntent(window.localStorage);
      setIntent(pending);
      if (loading) return;
      const linked = new URL(window.location.href).searchParams.has("ref");
      if (previousUser.current !== userId || (linked && referralUrl.current !== href)) {
        clearPartnerChoice(window.sessionStorage);
        setMessage("");
        setOriginalPartner(undefined);
        setIneligible(false);
      }
      previousUser.current = userId;
      referralUrl.current = linked ? href : null;
      setOpen(
        Boolean(
          pending &&
          (!userId ||
            (!confirmedPartnerCode(window.localStorage, window.sessionStorage, userId) &&
              !declinedPartnerReferral(window.localStorage, window.sessionStorage, userId))),
        ),
      );
    } catch {
      setMessage(
        "Allow browser storage to preserve the referral while choosing your learner account.",
      );
    }
  }, [href, loading, userId]);

  useEffect(() => {
    function review(event: Event) {
      if (
        event instanceof StorageEvent &&
        event.key !== null &&
        event.key !== PARTNER_ATTRIBUTION_KEY
      )
        return;
      try {
        clearPartnerChoice(window.sessionStorage);
        setIntent(storedPartnerIntent(window.localStorage));
        setOriginalPartner(undefined);
        setIneligible(false);
        setMessage("");
        setOpen(true);
      } catch {
        /* Checkout reports storage errors without creating a bill. */
      }
    }
    window.addEventListener(PARTNER_REVIEW_EVENT, review);
    window.addEventListener("storage", review);
    return () => {
      window.removeEventListener(PARTNER_REVIEW_EVENT, review);
      window.removeEventListener("storage", review);
    };
  }, []);

  async function chooseCurrentAccount() {
    if (!userId || !intent || busy) return;
    const chosenUserId = userId;
    setBusy(true);
    setMessage("");
    try {
      clearPartnerChoice(window.sessionStorage);
      const result = await confirmPartnerReferral({
        data: { accountId: chosenUserId, partnerCode: originalPartner ?? intent.code },
      });
      const pending = storedPartnerIntent(window.localStorage);
      if (
        currentUser.current !== chosenUserId ||
        pending?.code !== intent.code ||
        pending.expiresAt !== intent.expiresAt
      )
        return;
      if (!result.confirmed) {
        setMessage(result.message);
        setOriginalPartner(result.partnerCode);
        setIneligible(result.ineligible === true);
        return;
      }
      rememberPartnerChoice(intent, window.sessionStorage, chosenUserId, result.partnerCode);
      setOpen(false);
    } catch {
      setMessage(
        "We could not confirm this referral. Your referral link is retained; please retry before paying.",
      );
    } finally {
      setBusy(false);
    }
  }

  // Offered only after the server says this account can never take the
  // referral; transient failures must be retried instead.
  function continueWithoutReferral() {
    if (!userId || !intent || busy || !ineligible) return;
    try {
      declinePartnerReferral(intent, window.sessionStorage, userId);
      setOpen(false);
    } catch {
      setMessage("Allow browser storage to continue without the referral.");
    }
  }

  async function chooseGoogleAccount() {
    if (!intent || busy) return;
    setBusy(true);
    setMessage("");
    try {
      clearPartnerChoice(window.sessionStorage);
      // Local logout only: leave this person's other device sessions alone.
      if (userId) {
        const { error } = await supabase.auth.signOut({ scope: "local" });
        if (error) throw error;
      }
      await signInWithGoogle(partnerReturnTo(href, intent.code));
    } catch {
      setMessage(
        "Could not open Google account selection. Your referral link is retained; please retry.",
      );
      setBusy(false);
    }
  }

  if (!intent || loading || !isSupabaseConfigured) return null;
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!busy) setOpen(value);
      }}
    >
      <DialogContent>
        <DialogTitle>Choose the learner account for this referral</DialogTitle>
        <DialogDescription>
          Referral {intent.code} has not been assigned automatically. Choose the account that will
          register and pay. Switching accounts keeps this referral link, but requires confirmation
          again.
        </DialogDescription>
        {user && (
          <p>
            Signed in as <strong>{user.email || user.name || "your current account"}</strong>.
          </p>
        )}
        {message && <p role="alert">{message}</p>}
        {user && ineligible && (
          <Button disabled={busy} onClick={continueWithoutReferral}>
            Continue without a referral
          </Button>
        )}
        {user && !ineligible && (
          <Button disabled={busy} onClick={() => void chooseCurrentAccount()}>
            {originalPartner
              ? `Confirm original partner ${originalPartner}`
              : "Use this learner account"}
          </Button>
        )}
        <Button disabled={busy} variant="outline" onClick={() => void chooseGoogleAccount()}>
          {user ? "Use a different Google account" : "Choose a Google account"}
        </Button>
        {!user && (
          <a href={`/login?next=${encodeURIComponent(partnerReturnTo(href, intent.code))}`}>
            Sign in or register with email
          </a>
        )}
        <Button disabled={busy} variant="ghost" onClick={() => setOpen(false)}>
          Decide later — keep referral
        </Button>
        {busy && <p role="status">Verifying your account and referral…</p>}
      </DialogContent>
    </Dialog>
  );
}
