import { useEffect, useRef, useState } from "react";

export type QuizStagePhase = "idle" | "exiting" | "preparing" | "entering";

const EXIT_MS = 220;
const ENTER_MS = 320;
const REDUCED_MS = 90;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Exit the current quiz panel, then run `commit`, then play the incoming panel.
 * A generation token drops stale animation callbacks so a quiz cannot advance twice.
 */
export function useQuizStageTransition() {
  const [phase, setPhase] = useState<QuizStagePhase>("idle");
  const phaseRef = useRef<QuizStagePhase>("idle");
  const tokenRef = useRef(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const exitCleanupRef = useRef<(() => void) | null>(null);

  const cancel = () => {
    tokenRef.current += 1;
    exitCleanupRef.current?.();
    exitCleanupRef.current = null;
    phaseRef.current = "idle";
    setPhase("idle");
  };

  const advance = (commit: () => void) => {
    if (phaseRef.current !== "idle") return;
    const token = ++tokenRef.current;
    const node = panelRef.current;
    const reduced = prefersReducedMotion();
    phaseRef.current = "exiting";
    setPhase("exiting");

    let finished = false;
    const completeExit = () => {
      if (finished || tokenRef.current !== token) return;
      finished = true;
      exitCleanupRef.current?.();
      exitCleanupRef.current = null;
      commit();
      // Lay the next card out at its final position while it is still invisible.
      phaseRef.current = "preparing";
      setPhase("preparing");
    };

    const onEnd = (event: AnimationEvent) => {
      if (event.target !== node) return;
      if (
        event.animationName !== "quiz-swap-out" &&
        event.animationName !== "quiz-swap-fade-out"
      ) {
        return;
      }
      completeExit();
    };

    node?.addEventListener("animationend", onEnd);
    const timer = window.setTimeout(completeExit, (reduced ? REDUCED_MS : EXIT_MS) + 40);
    exitCleanupRef.current = () => {
      window.clearTimeout(timer);
      node?.removeEventListener("animationend", onEnd);
    };
  };

  useEffect(() => {
    if (phase !== "preparing") return;
    const token = tokenRef.current;
    let second = 0;
    const first = window.requestAnimationFrame(() => {
      second = window.requestAnimationFrame(() => {
        if (tokenRef.current !== token) return;
        phaseRef.current = "entering";
        setPhase("entering");
      });
    });
    return () => {
      window.cancelAnimationFrame(first);
      window.cancelAnimationFrame(second);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "entering") return;
    const token = tokenRef.current;
    const node = panelRef.current;
    const reduced = prefersReducedMotion();
    let finished = false;
    const finish = () => {
      if (finished || tokenRef.current !== token) return;
      finished = true;
      phaseRef.current = "idle";
      setPhase("idle");
    };
    const onEnd = (event: AnimationEvent) => {
      if (event.target !== node) return;
      if (
        event.animationName !== "quiz-swap-in" &&
        event.animationName !== "quiz-swap-fade-in"
      ) {
        return;
      }
      finish();
    };
    node?.addEventListener("animationend", onEnd);
    const timer = window.setTimeout(finish, (reduced ? REDUCED_MS : ENTER_MS) + 40);
    return () => {
      window.clearTimeout(timer);
      node?.removeEventListener("animationend", onEnd);
    };
  }, [phase]);

  useEffect(() => {
    return () => {
      tokenRef.current += 1;
      exitCleanupRef.current?.();
      exitCleanupRef.current = null;
    };
  }, []);

  return {
    phase,
    busy: phase !== "idle",
    panelRef,
    advance,
    cancel,
  };
}
