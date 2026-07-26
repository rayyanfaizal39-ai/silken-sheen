export const COMBO_ENTRANCE_MS = 300;
export const COMBO_HOLD_MS = 1450;
export const COMBO_EXIT_MS = 350;
export const COMBO_TOTAL_MS = COMBO_ENTRANCE_MS + COMBO_HOLD_MS + COMBO_EXIT_MS;

export type QuizComboConfig = {
  label: string;
  secondaryLabel: string | null;
  sizeClass: string;
  level: number;
};

export function getQuizComboConfig(streak: number): QuizComboConfig | null {
  if (streak < 2) return null;

  const level =
    streak >= 15
      ? 8
      : streak >= 10
        ? 7
        : streak >= 8
          ? 6
          : streak >= 6
            ? 5
            : Math.min(4, streak - 1);

  const sizeClass = [
    "",
    "text-[clamp(1.75rem,7.5vw,2.5rem)]",
    "text-[clamp(2rem,8vw,2.875rem)]",
    "text-[clamp(2.25rem,8.5vw,3.25rem)]",
    "text-[clamp(2.5rem,9vw,3.75rem)]",
    "text-[clamp(2.75rem,9.5vw,4.25rem)]",
    "text-[clamp(3rem,10vw,4.75rem)]",
    "text-[clamp(3.25rem,10.5vw,5.125rem)]",
    "text-[clamp(3.5rem,11vw,5.5rem)]",
  ][level];

  return {
    label: `${streak}× COMBO`,
    secondaryLabel:
      streak >= 15
        ? "LEGENDARY!"
        : streak >= 10
          ? "COSMIC STREAK!"
          : streak >= 5
            ? "AMAZING STREAK!"
            : null,
    sizeClass,
    level,
  };
}
