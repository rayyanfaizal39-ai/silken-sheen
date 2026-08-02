import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getLocalDateKey } from "@/lib/local-date";

export const DAILY_MISSION_REWARD_XP = 500;
export const WEEKLY_MISSION_REWARD_XP = 1_500;
export const MISSION_POOL_VERSION = 1;

export type MissionActivityType = "lesson" | "quiz" | "flashcard";

export type DailyMissionDefinition = {
  id: string;
  activity: MissionActivityType;
  label: string;
  detail: string;
  target: number;
  destination: "/notes" | "/quizzes" | "/flashcards";
};

export type WeeklyMissionDefinition = {
  id: string;
  title: string;
  detail: string;
  targets: Record<MissionActivityType, number>;
};

export type MissionCounters = Record<MissionActivityType, number>;

export type MissionSystemState = {
  dateKey: string;
  weekKey: string;
  dailyMissionIds: string[];
  weeklyMissionId: string;
  counters: {
    daily: MissionCounters;
    weekly: MissionCounters;
  };
  dailyRewardClaimed: boolean;
  weeklyRewardClaimed: boolean;
  awardedXp: number;
  totalXp: number | null;
};

type PendingMissionActivity = {
  userId: string;
  activity: MissionActivityType;
  eventKey: string;
  dateKey: string;
};

const PENDING_MISSION_KEY = "academy-mission-pending-v1";

export const DAILY_MISSION_POOL: Record<string, DailyMissionDefinition> = {
  lesson_1: {
    id: "lesson_1",
    activity: "lesson",
    label: "Complete one lesson",
    detail: "Mark a lesson chapter as read",
    target: 1,
    destination: "/notes",
  },
  lesson_2: {
    id: "lesson_2",
    activity: "lesson",
    label: "Complete two lessons",
    detail: "Mark two lesson chapters as read",
    target: 2,
    destination: "/notes",
  },
  quiz_1: {
    id: "quiz_1",
    activity: "quiz",
    label: "Complete one quiz",
    detail: "Finish any quiz attempt",
    target: 1,
    destination: "/quizzes",
  },
  quiz_2: {
    id: "quiz_2",
    activity: "quiz",
    label: "Complete two quizzes",
    detail: "Finish any two quiz attempts",
    target: 2,
    destination: "/quizzes",
  },
  flashcard_5: {
    id: "flashcard_5",
    activity: "flashcard",
    label: "Review 5 flashcards",
    detail: "Rate five different cards",
    target: 5,
    destination: "/flashcards",
  },
  flashcard_8: {
    id: "flashcard_8",
    activity: "flashcard",
    label: "Review 8 flashcards",
    detail: "Rate eight different cards",
    target: 8,
    destination: "/flashcards",
  },
};

export const WEEKLY_MISSION_POOL: Record<string, WeeklyMissionDefinition> = {
  weekly_balanced: {
    id: "weekly_balanced",
    title: "Balanced Explorer",
    detail: "Build a steady rhythm across every learning mode.",
    targets: { lesson: 5, quiz: 3, flashcard: 20 },
  },
  weekly_scholar: {
    id: "weekly_scholar",
    title: "Deep-Space Scholar",
    detail: "Go deeper into lessons while keeping recall sharp.",
    targets: { lesson: 7, quiz: 2, flashcard: 15 },
  },
  weekly_challenger: {
    id: "weekly_challenger",
    title: "Quiz Challenger",
    detail: "Test your knowledge often and reinforce every result.",
    targets: { lesson: 3, quiz: 5, flashcard: 15 },
  },
};

const DAILY_PERMUTATIONS = [
  [0, 1, 2],
  [0, 2, 1],
  [1, 0, 2],
  [1, 2, 0],
  [2, 0, 1],
  [2, 1, 0],
] as const;

/** A deliberately small, portable hash that is mirrored exactly in the database migration. */
export function missionSeed(userId: string, periodKey: string, salt: string): number {
  const value = `${userId}:${periodKey}:${MISSION_POOL_VERSION}:${salt}`;
  let seed = 0;
  for (let index = 0; index < value.length; index += 1) {
    seed += value.charCodeAt(index) * (index + 1);
  }
  return seed;
}

export function getMissionWeekKey(date = new Date()): string {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const daysSinceMonday = (monday.getDay() + 6) % 7;
  monday.setDate(monday.getDate() - daysSinceMonday);
  return getLocalDateKey(monday);
}

export function selectDailyMissionIds(userId: string, dateKey: string): string[] {
  const selected = [
    missionSeed(userId, dateKey, "lesson") % 2 === 0 ? "lesson_1" : "lesson_2",
    missionSeed(userId, dateKey, "quiz") % 2 === 0 ? "quiz_1" : "quiz_2",
    missionSeed(userId, dateKey, "flashcard") % 2 === 0 ? "flashcard_5" : "flashcard_8",
  ];
  return DAILY_PERMUTATIONS[missionSeed(userId, dateKey, "order") % 6].map(
    (index) => selected[index],
  );
}

export function selectWeeklyMissionId(userId: string, weekKey: string): string {
  return ["weekly_balanced", "weekly_scholar", "weekly_challenger"][
    missionSeed(userId, weekKey, "weekly") % 3
  ];
}

export function createLocalMissionState(
  userId: string,
  now = new Date(),
  dailyCounters: MissionCounters = { lesson: 0, quiz: 0, flashcard: 0 },
): MissionSystemState {
  const dateKey = getLocalDateKey(now);
  const weekKey = getMissionWeekKey(now);
  return {
    dateKey,
    weekKey,
    dailyMissionIds: selectDailyMissionIds(userId, dateKey),
    weeklyMissionId: selectWeeklyMissionId(userId, weekKey),
    counters: {
      daily: dailyCounters,
      weekly: { lesson: 0, quiz: 0, flashcard: 0 },
    },
    dailyRewardClaimed: false,
    weeklyRewardClaimed: false,
    awardedXp: 0,
    totalXp: null,
  };
}

function parseMissionState(value: unknown): MissionSystemState | null {
  if (!value || typeof value !== "object") return null;
  const data = value as Record<string, unknown>;
  const counters = data.counters as
    | { daily?: Partial<MissionCounters>; weekly?: Partial<MissionCounters> }
    | undefined;
  if (!Array.isArray(data.daily_mission_ids) || typeof data.weekly_mission_id !== "string") {
    return null;
  }
  const normalizeCounters = (input?: Partial<MissionCounters>): MissionCounters => ({
    lesson: Math.max(0, Number(input?.lesson) || 0),
    quiz: Math.max(0, Number(input?.quiz) || 0),
    flashcard: Math.max(0, Number(input?.flashcard) || 0),
  });
  return {
    dateKey: String(data.date_key ?? ""),
    weekKey: String(data.week_key ?? ""),
    dailyMissionIds: data.daily_mission_ids.map(String),
    weeklyMissionId: data.weekly_mission_id,
    counters: {
      daily: normalizeCounters(counters?.daily),
      weekly: normalizeCounters(counters?.weekly),
    },
    dailyRewardClaimed: data.daily_reward_claimed === true,
    weeklyRewardClaimed: data.weekly_reward_claimed === true,
    awardedXp: Math.max(0, Number(data.awarded_xp) || 0),
    totalXp: typeof data.total_xp === "number" ? data.total_xp : null,
  };
}

export async function fetchMissionState(dateKey = getLocalDateKey()): Promise<MissionSystemState> {
  if (!isSupabaseConfigured) throw new Error("Mission sync is unavailable.");
  const { data, error } = await supabase.rpc("get_mission_state", {
    p_local_date_key: dateKey,
  });
  if (error) throw error;
  const parsed = parseMissionState(data);
  if (!parsed) throw new Error("Mission state was invalid.");
  return parsed;
}

export async function recordMissionActivity(input: {
  activity: MissionActivityType;
  eventKey: string;
  dateKey?: string;
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
  };
  queuePendingMissionActivity(pending);
  const { data, error } = await supabase.rpc("record_mission_activity", {
    p_activity_type: input.activity,
    p_event_key: input.eventKey,
    p_local_date_key: pending.dateKey,
  });
  if (error) throw error;
  const parsed = parseMissionState(data);
  if (!parsed) throw new Error("Mission activity response was invalid.");
  removePendingMissionActivity(pending.userId, pending.eventKey);
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<MissionSystemState>("academy:mission-updated", { detail: parsed }),
    );
  }
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
  } catch {
    // The RPC still proceeds when storage is unavailable.
  }
}

function removePendingMissionActivity(userId: string, eventKey: string) {
  if (typeof window === "undefined") return;
  try {
    const pending = readPendingMissionActivities().filter(
      (item) => item.userId !== userId || item.eventKey !== eventKey,
    );
    localStorage.setItem(PENDING_MISSION_KEY, JSON.stringify(pending));
  } catch {
    // A later idempotent retry is harmless if the queue cannot be updated.
  }
}
