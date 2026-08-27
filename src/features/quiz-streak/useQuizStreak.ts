import { useCallback, useEffect, useRef, useState } from "react";
import {
  applyStreakAnswer,
  getCelebrationDuration,
  type CelebrationOrigin,
  type StreakAnswerState,
  type StreakCelebration,
} from "./streakCelebrationConfig";

const EMPTY_STATE: StreakAnswerState = {
  streak: 0,
  handledQuestionIds: new Set<string>(),
};

export function useQuizStreak(sessionKey: string) {
  const stateRef = useRef<StreakAnswerState>(EMPTY_STATE);
  const eventIdRef = useRef(0);
  const cleanupTimerRef = useRef<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [celebration, setCelebration] = useState<StreakCelebration | null>(null);

  const clearCelebration = useCallback(() => {
    if (cleanupTimerRef.current !== null) {
      window.clearTimeout(cleanupTimerRef.current);
      cleanupTimerRef.current = null;
    }
    setCelebration(null);
  }, []);

  const resetStreak = useCallback(() => {
    stateRef.current = { streak: 0, handledQuestionIds: new Set<string>() };
    setStreak(0);
    setBestStreak(0);
    clearCelebration();
  }, [clearCelebration]);

  useEffect(() => {
    resetStreak();
  }, [sessionKey, resetStreak]);

  useEffect(
    () => () => {
      if (cleanupTimerRef.current !== null) window.clearTimeout(cleanupTimerRef.current);
    },
    [],
  );

  const confirmAnswer = useCallback(
    (input: {
      questionId: string;
      correct: boolean;
      xpAwarded?: number;
      origin?: CelebrationOrigin;
    }) => {
      const result = applyStreakAnswer(stateRef.current, input);
      if (!result.accepted) return result;

      stateRef.current = result.state;
      setStreak(result.state.streak);
      setBestStreak((currentBest) => Math.max(currentBest, result.state.streak));
      clearCelebration();

      if (result.celebration) {
        const nextCelebration: StreakCelebration = {
          ...result.celebration,
          id: ++eventIdRef.current,
        };
        setCelebration(nextCelebration);
        cleanupTimerRef.current = window.setTimeout(
          () => setCelebration((active) => (active?.id === nextCelebration.id ? null : active)),
          getCelebrationDuration(nextCelebration.streak, nextCelebration.tier) + 80,
        );
      }
      return result;
    },
    [clearCelebration],
  );

  return { streak, bestStreak, celebration, confirmAnswer, resetStreak, clearCelebration };
}
