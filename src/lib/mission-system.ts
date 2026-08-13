/* eslint-disable no-empty -- Mission sync remains functional when browser storage is unavailable. */
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getLocalDateKey } from "@/lib/local-date";

export const DAILY_OBJECTIVE_REWARD_XP = 100;
export const DAILY_COMPLETION_REWARD_XP = 500;
export const WEEKLY_OBJECTIVE_REWARD_XP = 250;
export const WEEKLY_COMPLETION_REWARD_XP = 1_500;
// Compatibility names used by the existing progression-help UI.
export const DAILY_MISSION_REWARD_XP = DAILY_COMPLETION_REWARD_XP;
export const WEEKLY_MISSION_REWARD_XP = WEEKLY_COMPLETION_REWARD_XP;
export const MISSION_POOL_VERSION = 2;

export type MissionActivityType = "lesson" | "quiz" | "flashcard";
export type MissionMetric = MissionActivityType | "quizAnswers" | "quizCorrect" | "flashcardGood";

export type MissionDefinition = {
  id: string;
  activity: MissionActivityType;
  metric: MissionMetric;
  label: string;
  detail: string;
  target: number;
  destination: "/notes" | "/quizzes" | "/flashcards";
};

export type DailyMissionDefinition = MissionDefinition;
export type WeeklyMissionDefinition = MissionDefinition;

export type MissionCounters = Record<MissionMetric, number>;

export type MissionClaimKind =
  | "daily_objective"
  | "daily_bonus"
  | "weekly_objective"
  | "weekly_bonus";

export type MissionClaimResult = {
  kind: MissionClaimKind;
  missionId: string | null;
  rewardXp: number;
};

export type MissionSystemState = {
  dateKey: string;
  weekKey: string;
  dailyMissionIds: string[];
  weeklyMissionIds: string[];
  counters: { daily: MissionCounters; weekly: MissionCounters };
  claimedDailyMissionIds: string[];
  claimedWeeklyMissionIds: string[];
  dailyBonusClaimed: boolean;
  weeklyBonusClaimed: boolean;
  awardedXp: number;
  previousXp: number | null;
  totalXp: number | null;
  claimedReward: MissionClaimResult | null;
};

type MissionEventMetadata = {
  correct?: number;
  total?: number;
  rating?: number;
  subjectId?: string;
};

type PendingMissionActivity = {
  userId: string;
  activity: MissionActivityType;
  eventKey: string;
  dateKey: string;
  metadata?: MissionEventMetadata;
};

export type MissionReadyEvent = {
  kind: "daily_objective" | "daily_bonus" | "weekly_objective" | "weekly_bonus";
  missionId: string | null;
  title: string;
  rewardXp: number;
  dateKey: string;
};

const PENDING_MISSION_KEY = "academy-mission-pending-v2";
const NOTIFIED_MISSION_KEY = "academy-mission-notified-v2";

export const DAILY_MISSION_POOL: Record<string, DailyMissionDefinition> = {
  lesson_1: {
    id: "lesson_1",
    activity: "lesson",
    metric: "lesson",
    label: "Read 1 chapter",
    detail: "Mark one chapter as read",
    target: 1,
    destination: "/notes",
  },
  lesson_2: {
    id: "lesson_2",
    activity: "lesson",
    metric: "lesson",
    label: "Read 2 chapter notes",
    detail: "Mark two chapters as read",
    target: 2,
    destination: "/notes",
  },
  quiz_1: {
    id: "quiz_1",
    activity: "quiz",
    metric: "quiz",
    label: "Complete 1 quiz",
    detail: "Finish any quiz attempt",
    target: 1,
    destination: "/quizzes",
  },
  quiz_answers_5: {
    id: "quiz_answers_5",
    activity: "quiz",
    metric: "quizAnswers",
    label: "Answer 5 quiz questions",
    detail: "Finish a quiz with at least five questions",
    target: 5,
    destination: "/quizzes",
  },
  quiz_correct_3: {
    id: "quiz_correct_3",
    activity: "quiz",
    metric: "quizCorrect",
    label: "Get 3 quiz answers correct",
    detail: "Correct answers from completed quizzes count",
    target: 3,
    destination: "/quizzes",
  },
  flashcard_5: {
    id: "flashcard_5",
    activity: "flashcard",
    metric: "flashcard",
    label: "Review 5 flashcards",
    detail: "Rate five different cards",
    target: 5,
    destination: "/flashcards",
  },
  flashcard_8: {
    id: "flashcard_8",
    activity: "flashcard",
    metric: "flashcard",
    label: "Review 8 flashcards",
    detail: "Rate eight different cards",
    target: 8,
    destination: "/flashcards",
  },
  flashcard_good_3: {
    id: "flashcard_good_3",
    activity: "flashcard",
    metric: "flashcardGood",
    label: "Rate 3 flashcards Good or Easy",
    detail: "Use Good or Easy on three different cards",
    target: 3,
    destination: "/flashcards",
  },
};

export const WEEKLY_MISSION_POOL: Record<string, WeeklyMissionDefinition> = {
  weekly_lessons_5: {
    id: "weekly_lessons_5",
    activity: "lesson",
    metric: "lesson",
    label: "Study 5 different chapters",
    detail: "Mark five chapters as read this week",
    target: 5,
    destination: "/notes",
  },
  weekly_lessons_7: {
    id: "weekly_lessons_7",
    activity: "lesson",
    metric: "lesson",
    label: "Read 7 chapter notes",
    detail: "Build a steady lesson rhythm",
    target: 7,
    destination: "/notes",
  },
  weekly_quizzes_5: {
    id: "weekly_quizzes_5",
    activity: "quiz",
    metric: "quiz",
    label: "Complete 5 quizzes",
    detail: "Finish five quiz attempts this week",
    target: 5,
    destination: "/quizzes",
  },
  weekly_correct_20: {
    id: "weekly_correct_20",
    activity: "quiz",
    metric: "quizCorrect",
    label: "Get 20 quiz answers correct",
    detail: "Correct answers from completed quizzes count",
    target: 20,
    destination: "/quizzes",
  },
  weekly_flashcards_30: {
    id: "weekly_flashcards_30",
    activity: "flashcard",
    metric: "flashcard",
    label: "Review 30 flashcards",
    detail: "Review different cards across the week",
    target: 30,
    destination: "/flashcards",
  },
  weekly_flashcards_good_20: {
    id: "weekly_flashcards_good_20",
    activity: "flashcard",
    metric: "flashcardGood",
    label: "Rate 20 flashcards Good or Easy",
    detail: "Build confident recall across the week",
    target: 20,
    destination: "/flashcards",
  },
};

const DAILY_GROUPS = [
  ["lesson_1", "lesson_2"],
  ["quiz_1", "quiz_answers_5", "quiz_correct_3"],
  ["flashcard_5", "flashcard_8", "flashcard_good_3"],
] as const;

const WEEKLY_GROUPS = [
  ["weekly_lessons_5", "weekly_lessons_7"],
  ["weekly_quizzes_5", "weekly_correct_20"],
  ["weekly_flashcards_30", "weekly_flashcards_good_20"],
] as const;

const PERMUTATIONS = [
  [0, 1, 2],
  [0, 2, 1],
  [1, 0, 2],
  [1, 2, 0],
  [2, 0, 1],
  [2, 1, 0],
] as const;

/** Small portable hash mirrored by public.mission_seed in the migration. */
export function missionSeed(userId: string, periodKey: string, salt: string): number {
  const value = `${userId}:${periodKey}:${MISSION_POOL_VERSION}:${salt}`;
  let seed = 0;
  for (let index = 0; index < value.length; index += 1) {
    seed += value.charCodeAt(index) * (index + 1);
  }
  return seed;
}

function shiftDateKey(dateKey: string, days: number): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  return getLocalDateKey(new Date(year, month - 1, day + days, 12));
}

export function getMissionWeekKey(date = new Date()): string {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return getLocalDateKey(monday);
}

function selectFromGroups(
  userId: string,
  periodKey: string,
  groups: readonly (readonly string[])[],
  saltPrefix: string,
): string[] {
  const selected = groups.map(
    (group, index) =>
      group[missionSeed(userId, periodKey, `${saltPrefix}-${index}`) % group.length],
  );
  return PERMUTATIONS[missionSeed(userId, periodKey, `${saltPrefix}-order`) % 6].map(
    (index) => selected[index],
  );
}

export function selectDailyMissionIds(userId: string, dateKey: string): string[] {
  const selected = selectFromGroups(userId, dateKey, DAILY_GROUPS, "daily");
  const yesterday = selectFromGroups(userId, shiftDateKey(dateKey, -1), DAILY_GROUPS, "daily");
  if ([...selected].sort().join("|") === [...yesterday].sort().join("|")) {
    const replacementGroup = DAILY_GROUPS[2];
    const currentIndex = replacementGroup.indexOf(
      selected.find((id) => id.startsWith("flashcard")) as (typeof replacementGroup)[number],
    );
    const replaceAt = selected.findIndex((id) => id.startsWith("flashcard"));
    selected[replaceAt] = replacementGroup[(currentIndex + 1) % replacementGroup.length];
  }
  return selected;
}

export function selectWeeklyMissionIds(userId: string, weekKey: string): string[] {
  return selectFromGroups(userId, weekKey, WEEKLY_GROUPS, "weekly");
}

/** Legacy helper retained for callers/tests while weekly missions move to three objectives. */
export function selectWeeklyMissionId(userId: string, weekKey: string): string {
  return selectWeeklyMissionIds(userId, weekKey)[0];
}

export function emptyMissionCounters(partial: Partial<MissionCounters> = {}): MissionCounters {
  return {
    lesson: Math.max(0, Number(partial.lesson) || 0),
    quiz: Math.max(0, Number(partial.quiz) || 0),
    flashcard: Math.max(0, Number(partial.flashcard) || 0),
    quizAnswers: Math.max(0, Number(partial.quizAnswers) || 0),
    quizCorrect: Math.max(0, Number(partial.quizCorrect) || 0),
    flashcardGood: Math.max(0, Number(partial.flashcardGood) || 0),
  };
}

export function getMissionProgress(mission: MissionDefinition, counters: MissionCounters): number {
  return Math.min(mission.target, counters[mission.metric]);
}

export function isMissionComplete(mission: MissionDefinition, counters: MissionCounters): boolean {
  return getMissionProgress(mission, counters) >= mission.target;
}

export function createLocalMissionState(
  userId: string,
  now = new Date(),
  dailyCounters: Partial<MissionCounters> = {},
): MissionSystemState {
  const dateKey = getLocalDateKey(now);
  const weekKey = getMissionWeekKey(now);
  return {
    dateKey,
    weekKey,
    dailyMissionIds: selectDailyMissionIds(userId, dateKey),
    weeklyMissionIds: selectWeeklyMissionIds(userId, weekKey),
    counters: { daily: emptyMissionCounters(dailyCounters), weekly: emptyMissionCounters() },
    claimedDailyMissionIds: [],
    claimedWeeklyMissionIds: [],
    dailyBonusClaimed: false,
    weeklyBonusClaimed: false,
    awardedXp: 0,
    previousXp: null,
    totalXp: null,
    claimedReward: null,
  };
}

function parseStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

function parseMissionState(value: unknown): MissionSystemState | null {
  if (!value || typeof value !== "object") return null;
  const data = value as Record<string, unknown>;
  const counters = data.counters as
    | { daily?: Partial<MissionCounters>; weekly?: Partial<MissionCounters> }
    | undefined;
  if (!Array.isArray(data.daily_mission_ids)) return null;
  const claim = data.claimed_reward as Record<string, unknown> | null | undefined;
  const legacyWeeklyId = typeof data.weekly_mission_id === "string" ? [data.weekly_mission_id] : [];
  return {
    dateKey: String(data.date_key ?? ""),
    weekKey: String(data.week_key ?? ""),
    dailyMissionIds: parseStringArray(data.daily_mission_ids),
    weeklyMissionIds: parseStringArray(data.weekly_mission_ids).length
      ? parseStringArray(data.weekly_mission_ids)
      : legacyWeeklyId,
    counters: {
      daily: emptyMissionCounters(counters?.daily),
      weekly: emptyMissionCounters(counters?.weekly),
    },
    claimedDailyMissionIds: parseStringArray(data.claimed_daily_mission_ids),
    claimedWeeklyMissionIds: parseStringArray(data.claimed_weekly_mission_ids),
    dailyBonusClaimed: data.daily_bonus_claimed === true || data.daily_reward_claimed === true,
    weeklyBonusClaimed: data.weekly_bonus_claimed === true || data.weekly_reward_claimed === true,
    awardedXp: Math.max(0, Number(data.awarded_xp) || 0),
    previousXp: typeof data.previous_xp === "number" ? data.previous_xp : null,
    totalXp: typeof data.total_xp === "number" ? data.total_xp : null,
    claimedReward:
      claim && typeof claim.kind === "string"
        ? {
            kind: claim.kind as MissionClaimKind,
            missionId: typeof claim.mission_id === "string" ? claim.mission_id : null,
            rewardXp: Math.max(0, Number(claim.reward_xp) || 0),
          }
        : null,
  };
}

function dispatchState(state: MissionSystemState) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<MissionSystemState>("academy:mission-updated", { detail: state }),
  );
}

function completionCandidates(
  state: MissionSystemState,
): Array<MissionReadyEvent & { key: string }> {
  const daily = state.dailyMissionIds
    .map((id) => DAILY_MISSION_POOL[id])
    .filter(Boolean)
    .filter(
      (mission) =>
        isMissionComplete(mission, state.counters.daily) &&
        !state.claimedDailyMissionIds.includes(mission.id),
    )
    .map((mission) => ({
      key: `daily:${state.dateKey}:${mission.id}`,
      kind: "daily_objective" as const,
      missionId: mission.id,
      title: mission.label,
      rewardXp: DAILY_OBJECTIVE_REWARD_XP,
      dateKey: state.dateKey,
    }));
  const weekly = state.weeklyMissionIds
    .map((id) => WEEKLY_MISSION_POOL[id])
    .filter(Boolean)
    .filter(
      (mission) =>
        isMissionComplete(mission, state.counters.weekly) &&
        !state.claimedWeeklyMissionIds.includes(mission.id),
    )
    .map((mission) => ({
      key: `weekly:${state.weekKey}:${mission.id}`,
      kind: "weekly_objective" as const,
      missionId: mission.id,
      title: mission.label,
      rewardXp: WEEKLY_OBJECTIVE_REWARD_XP,
      dateKey: state.dateKey,
    }));
  const bonus: Array<MissionReadyEvent & { key: string }> = [];
  if (
    state.dailyMissionIds.length === 3 &&
    state.dailyMissionIds.every((id) => state.claimedDailyMissionIds.includes(id)) &&
    !state.dailyBonusClaimed
  ) {
    bonus.push({
      key: `daily:${state.dateKey}:__bonus__`,
      kind: "daily_bonus",
      missionId: null,
      title: "Daily Missions Complete",
      rewardXp: DAILY_COMPLETION_REWARD_XP,
      dateKey: state.dateKey,
    });
  }
  if (
    state.weeklyMissionIds.length === 3 &&
    state.weeklyMissionIds.every((id) => state.claimedWeeklyMissionIds.includes(id)) &&
    !state.weeklyBonusClaimed
  ) {
    bonus.push({
      key: `weekly:${state.weekKey}:__bonus__`,
      kind: "weekly_bonus",
      missionId: null,
      title: "Weekly Missions Complete",
      rewardXp: WEEKLY_COMPLETION_REWARD_XP,
      dateKey: state.dateKey,
    });
  }
  return [...daily, ...weekly, ...bonus];
}

function announceNewCompletions(state: MissionSystemState) {
  if (typeof window === "undefined") return;
  let notified: string[] = [];
  try {
    const stored = JSON.parse(localStorage.getItem(NOTIFIED_MISSION_KEY) ?? "[]");
    if (Array.isArray(stored)) notified = stored.map(String);
  } catch {}
  const unseen = completionCandidates(state).filter((item) => !notified.includes(item.key));
  if (!unseen.length) return;
  const nextNotified = [...notified, ...unseen.map((item) => item.key)].slice(-120);
  try {
    localStorage.setItem(NOTIFIED_MISSION_KEY, JSON.stringify(nextNotified));
  } catch {}
  unseen.forEach(({ key: _key, ...detail }) => {
    window.dispatchEvent(new CustomEvent<MissionReadyEvent>("academy:mission-ready", { detail }));
  });
}

export async function fetchMissionState(dateKey = getLocalDateKey()): Promise<MissionSystemState> {
  if (!isSupabaseConfigured) throw new Error("Mission sync is unavailable.");
  const { data, error } = await supabase.rpc("get_mission_state", { p_local_date_key: dateKey });
  if (error) throw error;
  const parsed = parseMissionState(data);
  if (!parsed) throw new Error("Mission state was invalid.");
  announceNewCompletions(parsed);
  return parsed;
}

export async function recordMissionActivity(input: {
  activity: MissionActivityType;
  eventKey: string;
  dateKey?: string;
  metadata?: MissionEventMetadata;
}): Promise<MissionSystemState> {
  if (!isSupabaseConfigured) throw new Error("Mission sync is unavailable.");
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user.id) throw new Error("Authentication required.");
  const pending: PendingMissionActivity = {
    userId: session.user.id,
    activity: input.activity,
    eventKey: input.eventKey,
    dateKey: input.dateKey ?? getLocalDateKey(),
    metadata: input.metadata,
  };
  queuePendingMissionActivity(pending);
  const { data, error } = await supabase.rpc("record_mission_activity", {
    p_activity_type: input.activity,
    p_event_key: input.eventKey,
    p_local_date_key: pending.dateKey,
    p_metadata: input.metadata ?? {},
  });
  if (error) throw error;
  const parsed = parseMissionState(data);
  if (!parsed) throw new Error("Mission activity response was invalid.");
  removePendingMissionActivity(pending.userId, pending.eventKey);
  dispatchState(parsed);
  announceNewCompletions(parsed);
  return parsed;
}

export async function claimMissionReward(input: {
  kind: MissionClaimKind;
  missionId?: string;
  dateKey?: string;
}): Promise<MissionSystemState> {
  if (!isSupabaseConfigured) throw new Error("Mission claims are unavailable.");
  const { data, error } = await supabase.rpc("claim_mission_reward", {
    p_claim_kind: input.kind,
    p_mission_id: input.missionId ?? null,
    p_local_date_key: input.dateKey ?? getLocalDateKey(),
    p_timezone_offset_minutes: new Date().getTimezoneOffset(),
  });
  if (error) throw error;
  const parsed = parseMissionState(data);
  if (!parsed) throw new Error("Mission claim response was invalid.");
  dispatchState(parsed);
  announceNewCompletions(parsed);
  return parsed;
}

export async function flushPendingMissionActivities(
  userId: string,
): Promise<MissionSystemState | null> {
  const pending = readPendingMissionActivities().filter((activity) => activity.userId === userId);
  let latest: MissionSystemState | null = null;
  for (const activity of pending) {
    try {
      latest = await recordMissionActivity(activity);
    } catch {
      break;
    }
  }
  return latest;
}

function readPendingMissionActivities(): PendingMissionActivity[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(localStorage.getItem(PENDING_MISSION_KEY) ?? "[]");
    if (!Array.isArray(value)) return [];
    return value.filter(
      (item): item is PendingMissionActivity =>
        item &&
        typeof item.userId === "string" &&
        typeof item.eventKey === "string" &&
        typeof item.dateKey === "string" &&
        ["lesson", "quiz", "flashcard"].includes(item.activity),
    );
  } catch {
    return [];
  }
}

function queuePendingMissionActivity(activity: PendingMissionActivity) {
  if (typeof window === "undefined") return;
  const pending = readPendingMissionActivities().filter(
    (item) => item.userId !== activity.userId || item.eventKey !== activity.eventKey,
  );
  pending.push(activity);
  try {
    localStorage.setItem(PENDING_MISSION_KEY, JSON.stringify(pending.slice(-100)));
  } catch {}
}

function removePendingMissionActivity(userId: string, eventKey: string) {
  if (typeof window === "undefined") return;
  try {
    const pending = readPendingMissionActivities().filter(
      (item) => item.userId !== userId || item.eventKey !== eventKey,
    );
    localStorage.setItem(PENDING_MISSION_KEY, JSON.stringify(pending));
  } catch {}
}
