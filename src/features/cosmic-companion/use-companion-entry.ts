import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { novaAccessProblem, type NovaAccessProblem } from "@/features/nova-cards/access";
import { loadNovaDashboardStatus } from "@/features/nova-cards/local-session";
import { companionEntry, type CompanionEntry } from "./entry";
import { journeyStage, type JourneyStage } from "./journey";

/** The button destination for this student. Guests are not entitled. A failed load is not
 * the same as a free plan: the page shows a retry instead of Upgrade. */
export function useCompanionEntry(preview?: JourneyStage): {
  ready: boolean;
  entry: CompanionEntry | null;
  stage: JourneyStage;
  problem: NovaAccessProblem | null;
  retry: () => void;
} {
  const { user, devAuthBypass } = useAuth();
  const [stage, setStage] = useState<JourneyStage>(preview ?? "new");
  const [entry, setEntry] = useState<CompanionEntry | null>(() =>
    companionEntry({ entitled: Boolean(preview), stage: preview ?? "new", preview }),
  );
  const [problem, setProblem] = useState<NovaAccessProblem | null>(null);
  const [ready, setReady] = useState(Boolean(preview) || !user?.id);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (preview) {
      setStage(preview);
      setProblem(null);
      setEntry(companionEntry({ entitled: true, stage: preview, preview }));
      setReady(true);
      return;
    }
    if (!user?.id) {
      setStage("new");
      setProblem(null);
      setEntry(companionEntry({ entitled: false, stage: "new" }));
      setReady(true);
      return;
    }
    let active = true;
    setReady(false);
    setProblem(null);
    const load = () =>
      loadNovaDashboardStatus()
        .then((status) => {
          if (!active) return;
          const nextStage = journeyStage(status);
          setStage(nextStage);
          setProblem(null);
          setEntry(companionEntry({ entitled: status.active, stage: nextStage }));
          setReady(true);
        })
        .catch((error: unknown) => {
          if (!active) return;
          setProblem(novaAccessProblem(error));
          setEntry(null);
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
  }, [preview, user?.id, devAuthBypass, attempt]);

  return {
    ready,
    entry,
    stage,
    problem,
    retry: () => setAttempt((current) => current + 1),
  };
}
