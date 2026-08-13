import {
  DAILY_COMPLETION_REWARD_XP,
  DAILY_OBJECTIVE_REWARD_XP,
  WEEKLY_COMPLETION_REWARD_XP,
  WEEKLY_OBJECTIVE_REWARD_XP,
} from "@/lib/mission-system";

/**
 * Student-facing reward reference only. These values mirror the existing
 * award paths; this module never awards XP and cannot create duplicate credit.
 */
export const PROGRESSION_REWARD_DISPLAY = [
  { label: "Correct quiz answer", value: "+10 / +20 / +30 XP", note: "Easy / Medium / Hard" },
  { label: "Quiz pass bonus", value: "+25 XP", note: "Score 80% or higher" },
  { label: "Flashcard review", value: "+10 / +15 XP", note: "Good / Easy" },
  { label: "Interactive lesson activity", value: "+10–15 XP", note: "Where supported" },
  {
    label: "Daily mission objective",
    value: `+${DAILY_OBJECTIVE_REWARD_XP.toLocaleString()} XP`,
    note: "Claim after completing the objective",
  },
  {
    label: "Daily completion bonus",
    value: `+${DAILY_COMPLETION_REWARD_XP.toLocaleString()} XP`,
    note: "Claim all three daily objectives first",
  },
  {
    label: "Weekly mission objective",
    value: `+${WEEKLY_OBJECTIVE_REWARD_XP.toLocaleString()} XP`,
    note: "Claim after completing the objective",
  },
  {
    label: "Weekly completion bonus",
    value: `+${WEEKLY_COMPLETION_REWARD_XP.toLocaleString()} XP`,
    note: "Claim all three weekly objectives first",
  },
] as const;
