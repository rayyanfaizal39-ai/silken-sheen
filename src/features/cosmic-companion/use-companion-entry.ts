import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { loadNovaDashboardStatus, loadOwnerNova } from "@/features/nova-cards/local-session";
import { companionEntry, type CompanionEntry } from "./entry";
import { journeyStage, type JourneyStage } from "./journey";

/** The button destination for this student. Guests are not entitled. */
export function useCompanionEntry(preview?: JourneyStage): {
  ready: boolean;
  entry: CompanionEntry;
  stage: JourneyStage;
} {
  const { user, devAuthBypass } = useAuth();
  const [stage, setStage] = useState<JourneyStage>(preview ?? "new");
  const [entry, setEntry] = useState<CompanionEntry>(() =>
    companionEntry({ entitled: Boolean(preview), stage: preview ?? "new", preview }),
  );
  const [ready, setReady] = useState(Boolean(preview) || !user?.id);

  useEffect(() => {
    if (preview) {
      setStage(preview);
      setEntry(companionEntry({ entitled: true, stage: preview, preview }));
      setReady(true);
      return;
    }
    if (!user?.id) {
      setStage("new");
      setEntry(companionEntry({ entitled: false, stage: "new" }));
      setReady(true);
      return;
    }
    let active = true;
    setReady(false);
    const load = () =>
      Promise.all([loadNovaDashboardStatus(), loadOwnerNova()])
        .then(([status, bundle]) => {
          if (!active) return;
          const nextStage = journeyStage(status);
          setStage(nextStage);
          setEntry(companionEntry({ entitled: bundle[1].active, stage: nextStage }));
          setReady(true);
        })
        .catch(() => {
          if (!active) return;
          setStage("new");
          setEntry(companionEntry({ entitled: false, stage: "new" }));
          setReady(true);
        });
    void load();
    let stop = () => {};
    if (import.meta.env.DEV && devAuthBypass) {
      void import("@/lib/dev-auth/store").then((store) => {
        if (!active) return;
        stop = store.subscribeDevStore(() => {
          void load();
        });
      });
    }
    return () => {
      active = false;
      stop();
    };
  }, [preview, user?.id, devAuthBypass]);

  return { ready, entry, stage };
}
