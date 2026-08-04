import { useEffect, useState, useCallback, useRef } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { hasFeature, resolveStoredPlan } from "@/lib/feature-access";
import { recordDailyFlashcardReview } from "@/lib/daily-mission-progress";
import { getLocalDateKey } from "@/lib/local-date";
import { normalizeSelectedAt, daysTogether as daysTogetherPure } from "@/companion/selectedAt";
import {
  recordMissionActivity as recordMissionActivityRemote,
  type MissionActivityType,
  type MissionSystemState,
} from "@/lib/mission-system";
import {
  removePendingGeographyF3Progress,
  sanitizeRemovedGeographyF3Progress,
} from "@/lib/removed-content-progress";
import {
  RANKS,
  getRank,
  getNextRank,
  getRankProgress,
  type SpaceRank,
} from "@/data/rankAssets";

export {
  RANKS,
  RANKS as SPACE_RANKS,
  RANKS as CHESS_RANKS,
  getRank,
  getNextRank,
  getRankProgress,
  type SpaceRank,
};

const KEY = "learnnova-progress-v1";
const SYNC_DEBOUNCE_MS = 2000;

export type ChapterActivity = { read?: boolean; quiz?: boolean; cards?: boolean };

export interface CardMasteryRecord {
  interval: number; // days until next review
  easeFactor: number; // SM-2 ease factor (starts 2.5)
  due: string; // YYYY-MM-DD next review date
  reps: number; // successful reviews count
  lapses: number; // times rated "Again"
}

// Quiz analytics and student progress helpers.
/** A single completed-quiz result, used by the AI Tracker and Parent Report. */
export interface QuizResult {
  id: string;
  subjectId: string;
  chapterKey: string;
  scorePct: number; // 0–100
  correct: number;
  total: number;
  date: string; // ISO timestamp
}

/** Legacy avatar loadout used by profile and leaderboard visuals. */
export interface AvatarConfig {
  helmet: string;
  suit: string;
  visor: string;
  pet: string;
  owned: string[]; // item ids the student has unlocked
}

export const DEFAULT_AVATAR: AvatarConfig = {
  helmet: "helmet-classic",
  suit: "suit-molly",
  visor: "visor-aqua",
  pet: "pet-none",
  owned: ["helmet-classic", "suit-molly", "visor-aqua", "pet-none"],
};

export type ReportCadence = "weekly" | "monthly";

export type CompanionId = "nova" | "luna" | "terra" | "comet" | "nebula";
export type CompanionStageId = "egg" | "blobling" | "sprout" | "cadet" | "guardian";

export interface CompanionConfig {
  id: CompanionId;
  /** Custom nickname the student gave their companion. Falls back to the species name when unset. */
  name?: string;
  stage: CompanionStageId;
  level: number;
  selectedAt: string;
  evolvedAt?: Partial<Record<CompanionStageId, string>>;
}

/** Whole days since the companion was selected — used for the "Days Together" stat. */
export function getCompanionDaysTogether(companion: CompanionConfig): number {
  return daysTogetherPure(normalizeSelectedAt(companion.selectedAt));
}

export const COMPANION_STAGES: Array<{
  id: CompanionStageId;
  name: string;
  xpRequired: number;
}> = [
  { id: "egg", name: "Egg", xpRequired: 0 },
  { id: "blobling", name: "Blobling", xpRequired: 400 },
  { id: "sprout", name: "Sprout", xpRequired: 1600 },
  { id: "cadet", name: "Cadet", xpRequired: 4200 },
  { id: "guardian", name: "Guardian", xpRequired: 9000 },
];

export interface CompanionLevelProgress {
  currentLevel: number;
  currentStage: (typeof COMPANION_STAGES)[number];
  nextLevel: number | null;
  nextStage: (typeof COMPANION_STAGES)[number] | null;
  remainingXp: number;
  progressPercentage: number;
}

/**
 * Companion levels are derived from cumulative XP. XP itself is persisted
 * unchanged in localStorage and Supabase, so threshold updates are a zero-data
 * migration: existing users keep every point they have earned.
 */
export function getCompanionLevelProgress(xp: number): CompanionLevelProgress {
  const safeXp = Number.isNaN(xp) ? 0 : Math.max(0, xp);
  let currentIndex = 0;
  for (let index = 1; index < COMPANION_STAGES.length; index += 1) {
    if (safeXp >= COMPANION_STAGES[index].xpRequired) currentIndex = index;
  }
  const currentStage = COMPANION_STAGES[currentIndex];
  const nextStage = COMPANION_STAGES[currentIndex + 1] ?? null;
  if (!nextStage) {
    return {
      currentLevel: currentIndex + 1,
      currentStage,
      nextLevel: null,
      nextStage: null,
      remainingXp: 0,
      progressPercentage: 100,
    };
  }
  const levelSpan = nextStage.xpRequired - currentStage.xpRequired;
  const xpIntoLevel = safeXp - currentStage.xpRequired;
  const progressPercentage = Math.min(99, Math.floor((xpIntoLevel / levelSpan) * 100));
  return {
    currentLevel: currentIndex + 1,
    currentStage,
    nextLevel: currentIndex + 2,
    nextStage,
    remainingXp: Math.max(0, nextStage.xpRequired - safeXp),
    progressPercentage: Math.max(0, progressPercentage),
  };
}

/** The companion's display stage is always derived from XP, so its image updates automatically. */
export function getCompanionStageForXp(xp: number): CompanionStageId {
  return getCompanionLevelProgress(xp).currentStage.id;
}

export function getCompanionEvolutionTransition(fromXp: number, toXp: number) {
  if (toXp <= fromXp) return null;
  const fromStage = getCompanionStageForXp(fromXp);
  const toStage = getCompanionStageForXp(toXp);
  return fromStage === toStage ? null : { fromStage, toStage };
}

// ─── Transient progression-loop events (rank up / companion evolution) ─────────
// These are NOT persisted to localStorage or Supabase — they only exist in memory
// for the current session so a celebration UI can react to them, then clear.
export interface RankUpEvent {
  fromRank: string; // SpaceRank id
  toRank: string; // SpaceRank id
  xpGained: number;
  timestamp: number;
}

export interface CompanionEvolutionEvent {
  fromStage: CompanionStageId;
  toStage: CompanionStageId;
  companionId: CompanionId;
  timestamp: number;
}

/** Pass threshold + rewards for "passing" a quiz. */
export const QUIZ_PASS_PCT = 80;
export const QUIZ_PASS_BONUS_XP = 25; // extra XP on top of per-question XP
export const QUIZ_HISTORY_CAP = 200; // keep the most recent N results
export const RECENT_ACTIVITY_CAP = 12;

export interface Progress {
  xp: number;
  streak: number;
  lastActive: string; // YYYY-MM-DD
  quizzesTaken: number;
  badges: string[];
  favorites: string[]; // flashcard ids
  subjectXp: Record<string, number>;
  chapterActivity: Record<string, ChapterActivity>; // key: `${subjectId}:${chapterKey}`
  lastPerfectQuiz?: string; // ISO date of last perfect quiz
  missions?: MissionProgress;
  cardMastery?: Record<string, CardMasteryRecord>; // cardId → SM-2 data
  lastVisited?: LastVisited;
  recentActivity?: RecentActivity[];
  companion?: CompanionConfig;
  // Local-first profile and analytics data.
  tokens: number;
  avatar: AvatarConfig; // equipped + owned cosmetics
  quizHistory: QuizResult[]; // recent completed quizzes
  parentEmail?: string; // where Mission Reports are sent
  reportCadence?: ReportCadence;
  equippedTitle?: string; // Explorer Title id shown on the profile
  seenCollectibles?: string[]; // collectible ids already celebrated
  displayName?: string; // name shown on the Hall of Fame leaderboard
  school?: string; // school shown on the Hall of Fame leaderboard
}

export interface LastVisited {
  subjectId: string;
  chapterKey: string;
  type: "notes" | "flashcards" | "quiz";
  label: string; // human-readable chapter name
  timestamp: number;
  /** Which form the chapter belongs to. Older saved records predate this field — treat missing as "Form 1". */
  form?: "Form 1" | "Form 2" | "Form 3";
}

export interface RecentActivity extends LastVisited {
  id: string;
  detail?: string;
}

export interface MissionProgress {
  dailyDate: string; // YYYY-MM-DD
  readChapters: number;
  quizzesDone: number;
  flashcardsDone: number;
  /** Individual cards rated today. Added separately so legacy deck-completion missions keep their meaning. */
  flashcardReviews?: number;
}

/** Convert XP to chess.com-style Elo rating (1000 starting, 3000 max). */
export function getChessRating(xp: number): number {
  return Math.min(3000, 1000 + xp);
}

export function getRankUpTransition(fromXp: number, toXp: number) {
  if (toXp <= fromXp) return null;
  const fromRank = getRank(fromXp);
  const toRank = getRank(toXp);
  return fromRank.id === toRank.id ? null : { fromRank, toRank };
}

// ─── Badge definitions ────────────────────────────────────────────────────────
export interface BadgeDef {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
}

export const ALL_BADGES: BadgeDef[] = [
  // Starter
  {
    id: "starter",
    name: "First Steps",
    description: "Took your first quiz",
    emoji: "🎯",
    color: "#60A5FA",
  },
  {
    id: "first_notes",
    name: "Speed Reader",
    description: "Read your first chapter notes",
    emoji: "📖",
    color: "#34D399",
  },
  {
    id: "first_flashcard",
    name: "Card Flipper",
    description: "Studied your first flashcard deck",
    emoji: "🃏",
    color: "#A78BFA",
  },
  // Streak
  {
    id: "streak3",
    name: "3-Day Streak",
    description: "Studied 3 days in a row",
    emoji: "🔥",
    color: "#F97316",
  },
  {
    id: "streak7",
    name: "7-Day Streak",
    description: "Studied 7 days in a row",
    emoji: "🔥",
    color: "#EF4444",
  },
  {
    id: "streak30",
    name: "30-Day Legend",
    description: "Studied 30 days in a row",
    emoji: "🔥",
    color: "#DC2626",
  },
  // XP
  { id: "xp100", name: "100 XP Club", description: "Earned 100 XP", emoji: "⚡", color: "#60A5FA" },
  {
    id: "scholar",
    name: "500 XP Scholar",
    description: "Earned 500 XP",
    emoji: "🧠",
    color: "#A78BFA",
  },
  {
    id: "xp1000",
    name: "1000 XP Elite",
    description: "Earned 1,000 XP",
    emoji: "💎",
    color: "#F472B6",
  },
  {
    id: "xp5000",
    name: "5000 XP Legend",
    description: "Earned 5,000 XP",
    emoji: "🌟",
    color: "#FBBF24",
  },
  // Quiz
  {
    id: "quiz10",
    name: "Quiz Veteran",
    description: "Completed 10 quizzes",
    emoji: "🏆",
    color: "#FB923C",
  },
  {
    id: "quiz50",
    name: "Quiz Master",
    description: "Completed 50 quizzes",
    emoji: "🥇",
    color: "#FBBF24",
  },
  {
    id: "perfect_quiz",
    name: "Perfect Score!",
    description: "Got 100% on a quiz",
    emoji: "✨",
    color: "#34D399",
  },
  // Chapters
  {
    id: "chapter_master",
    name: "Chapter Master",
    description: "100% completed a chapter",
    emoji: "📚",
    color: "#06B6D4",
  },
  {
    id: "five_chapters",
    name: "5 Chapters Done",
    description: "Fully completed 5 chapters",
    emoji: "🎓",
    color: "#8B5CF6",
  },
  // Spaced repetition mastery
  {
    id: "mastery10",
    name: "Memory Starter",
    description: "Mastered 10 flashcards with spaced repetition",
    emoji: "🧩",
    color: "#38BDF8",
  },
  {
    id: "mastery50",
    name: "Memory Expert",
    description: "Mastered 50 flashcards with spaced repetition",
    emoji: "🔮",
    color: "#A78BFA",
  },
  {
    id: "mastery100",
    name: "Memory Legend",
    description: "Mastered 100 flashcards with spaced repetition",
    emoji: "🌌",
    color: "#FBBF24",
  },
];

export function getBadgeDef(id: string): BadgeDef | undefined {
  return ALL_BADGES.find((b) => b.id === id);
}

export function applyXpMilestoneBadges(badges: string[], xp: number): string[] {
  const next = [...badges];
  const milestones: Array<[number, string]> = [
    [100, "xp100"],
    [500, "scholar"],
    [1000, "xp1000"],
    [5000, "xp5000"],
  ];
  for (const [threshold, badgeId] of milestones) {
    if (xp >= threshold && !next.includes(badgeId)) next.push(badgeId);
  }
  return next;
}

// ─── Daily missions ───────────────────────────────────────────────────────────
export interface DailyMission {
  id: string;
  label: string;
  target: number;
  current: (m: MissionProgress) => number;
}

export const DAILY_MISSIONS: DailyMission[] = [
  {
    id: "read2",
    label: "Read 2 chapters",
    target: 2,
    current: (m) => m.readChapters,
  },
  {
    id: "quiz2",
    label: "Complete 2 quizzes",
    target: 2,
    current: (m) => m.quizzesDone,
  },
  {
    id: "cards1",
    label: "Study flashcards",
    target: 1,
    current: (m) => m.flashcardsDone,
  },
];

// ─── Persistence helpers ──────────────────────────────────────────────────────
const COMPANION_SENTINEL_DATE = new Date(0).toISOString();

const initial: Progress = {
  xp: 0,
  streak: 0,
  lastActive: "",
  quizzesTaken: 0,
  badges: [],
  favorites: [],
  subjectXp: {},
  chapterActivity: {},
  tokens: 0,
  avatar: DEFAULT_AVATAR,
  quizHistory: [],
  // Nova is the only companion in V1 — active by default, no selection step.
  // selectedAt is a sentinel here; load() stamps the real "today" on first read
  // so "Days Together" starts at 1 instead of decades.
  companion: { id: "nova", stage: "egg", level: 1, selectedAt: COMPANION_SENTINEL_DATE },
};

function today() {
  return getLocalDateKey();
}

function progressStorageKey(userId?: string | null): string {
  return userId ? `${KEY}:${userId}` : KEY;
}

function load(userId?: string | null): Progress {
  if (typeof window === "undefined") return initial;
  try {
    removePendingGeographyF3Progress(localStorage, userId);
    const raw = localStorage.getItem(progressStorageKey(userId));
    if (!raw) return stampCompanionSelectedAt(initial, userId);
    const merged = sanitizeRemovedGeographyF3Progress<Progress>({
      ...initial,
      ...JSON.parse(raw),
    });
    localStorage.setItem(progressStorageKey(userId), JSON.stringify(merged));
    return stampCompanionSelectedAt(merged, userId);
  } catch {
    return initial;
  }
}

/**
 * Normalizes the companion's "selectedAt" the first time a companion is loaded:
 * replaces the epoch sentinel, missing/invalid values, implausibly old values
 * (e.g. stray Unix-epoch dates from older bugs) and future values with "now",
 * and persists the fix so the "Days Together" stat never regresses to an
 * absurd number. Legitimate existing dates are left untouched.
 */
function stampCompanionSelectedAt(progress: Progress, userId?: string | null): Progress {
  if (!progress.companion) return progress;
  const normalized = normalizeSelectedAt(progress.companion.selectedAt);
  if (normalized === progress.companion.selectedAt) return progress;
  const next: Progress = {
    ...progress,
    companion: { ...progress.companion, selectedAt: normalized },
  };
  try {
    localStorage.setItem(progressStorageKey(userId), JSON.stringify(next));
  } catch {}
  return next;
}

export function chapterActivityKey(subjectId: string, chapterKey: string) {
  return `${subjectId}:${chapterKey}`;
}

function pushRecentActivity(
  current: RecentActivity[] | undefined,
  activity: LastVisited & { detail?: string; id?: string },
): RecentActivity[] {
  const timestamp = activity.timestamp || Date.now();
  const id =
    activity.id ??
    `${activity.type}:${activity.subjectId}:${activity.chapterKey}:${timestamp}`;
  const nextItem: RecentActivity = { ...activity, timestamp, id };
  const deduped = (current ?? []).filter(
    (item) =>
      !(
        item.subjectId === nextItem.subjectId &&
        item.chapterKey === nextItem.chapterKey &&
        item.type === nextItem.type
      ),
  );
  return [nextItem, ...deduped].slice(0, RECENT_ACTIVITY_CAP);
}

export function chapterProgressPct(activity?: ChapterActivity) {
  if (!activity) return 0;
  const done = (activity.read ? 1 : 0) + (activity.quiz ? 1 : 0) + (activity.cards ? 1 : 0);
  return Math.round((done / 3) * 100);
}

export function totalChaptersCompleted(chapterActivity: Record<string, ChapterActivity>): number {
  return Object.values(chapterActivity).filter((a) => a.read && a.quiz && a.cards).length;
}

// ─── Supabase sync helpers ────────────────────────────────────────────────────

function progressToRow(p: Progress) {
  return {
    xp: p.xp,
    streak: p.streak,
    last_active: p.lastActive || null,
    quizzes_taken: p.quizzesTaken,
    badges: p.badges,
    favorites: p.favorites,
    subject_xp: p.subjectXp,
    chapter_activity: p.chapterActivity,
    missions: p.missions ?? null,
    card_mastery: p.cardMastery ?? {},
    last_visited: p.lastVisited ?? null,
    updated_at: new Date().toISOString(),
  };
}

function rowToProgress(row: Record<string, unknown>): Progress {
  return sanitizeRemovedGeographyF3Progress<Progress>({
    ...initial,
    xp: typeof row.xp === "number" ? row.xp : 0,
    streak: typeof row.streak === "number" ? row.streak : 0,
    lastActive: typeof row.last_active === "string" ? row.last_active : "",
    quizzesTaken: typeof row.quizzes_taken === "number" ? row.quizzes_taken : 0,
    badges: Array.isArray(row.badges) ? row.badges : [],
    favorites: Array.isArray(row.favorites) ? row.favorites : [],
    subjectXp: (row.subject_xp as Record<string, number>) ?? {},
    chapterActivity: (row.chapter_activity as Record<string, ChapterActivity>) ?? {},
    missions: (row.missions as MissionProgress | undefined) ?? undefined,
    cardMastery: (row.card_mastery as Record<string, CardMasteryRecord>) ?? {},
    lastVisited: (row.last_visited as LastVisited | undefined) ?? undefined,
  });
}

// Merge: take the union of badges, the higher XP, etc.
function mergeProgress(local: Progress, remote: Progress): Progress {
  const mergedBadges = Array.from(new Set([...local.badges, ...remote.badges]));
  const useRemote = remote.xp >= local.xp;
  const base = useRemote ? remote : local;
  // Merge chapter activity keys from both (keep any activity that exists on either side)
  const mergedActivity: Record<string, ChapterActivity> = { ...remote.chapterActivity };
  for (const [k, v] of Object.entries(local.chapterActivity)) {
    if (!mergedActivity[k]) {
      mergedActivity[k] = v;
    } else {
      mergedActivity[k] = {
        read: !!(mergedActivity[k].read || v.read),
        quiz: !!(mergedActivity[k].quiz || v.quiz),
        cards: !!(mergedActivity[k].cards || v.cards),
      };
    }
  }
  // Local-only analytics are stored locally first — never let a
  // cloud row (which lacks these columns) wipe them out on merge.
  const historyById = new Map<string, QuizResult>();
  for (const r of [...(remote.quizHistory ?? []), ...(local.quizHistory ?? [])]) {
    historyById.set(r.id, r);
  }
  const mergedHistory = Array.from(historyById.values())
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-QUIZ_HISTORY_CAP);
  const recentByKey = new Map<string, RecentActivity>();
  for (const item of [...(remote.recentActivity ?? []), ...(local.recentActivity ?? [])]) {
    recentByKey.set(`${item.type}:${item.subjectId}:${item.chapterKey}`, item);
  }
  const mergedRecentActivity = Array.from(recentByKey.values())
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, RECENT_ACTIVITY_CAP);

  return {
    ...base,
    badges: mergedBadges,
    chapterActivity: mergedActivity,
    missions: mergeMissionProgress(local.missions, remote.missions),
    favorites: Array.from(new Set([...local.favorites, ...remote.favorites])),
    cardMastery: useRemote
      ? { ...local.cardMastery, ...remote.cardMastery }
      : { ...remote.cardMastery, ...local.cardMastery },
    tokens: Math.max(local.tokens ?? 0, remote.tokens ?? 0),
    companion: (() => {
      const chosen = local.companion ?? remote.companion;
      if (!chosen) return chosen;
      return { ...chosen, selectedAt: normalizeSelectedAt(chosen.selectedAt) };
    })(),
    avatar:
      (local.avatar?.owned?.length ?? 0) >= (remote.avatar?.owned?.length ?? 0)
        ? (local.avatar ?? DEFAULT_AVATAR)
        : remote.avatar,
    quizHistory: mergedHistory,
    recentActivity: mergedRecentActivity,
    parentEmail: local.parentEmail ?? remote.parentEmail,
    reportCadence: local.reportCadence ?? remote.reportCadence,
    equippedTitle: local.equippedTitle ?? remote.equippedTitle,
    seenCollectibles: Array.from(
      new Set([...(local.seenCollectibles ?? []), ...(remote.seenCollectibles ?? [])]),
    ),
    displayName: local.displayName ?? remote.displayName,
    school: local.school ?? remote.school,
  };
}

function mergeMissionProgress(
  local: MissionProgress | undefined,
  remote: MissionProgress | undefined,
): MissionProgress | undefined {
  if (!local) return remote;
  if (!remote) return local;
  if (local.dailyDate !== remote.dailyDate) {
    return local.dailyDate > remote.dailyDate ? local : remote;
  }
  return {
    dailyDate: local.dailyDate,
    readChapters: Math.max(local.readChapters, remote.readChapters),
    quizzesDone: Math.max(local.quizzesDone, remote.quizzesDone),
    flashcardsDone: Math.max(local.flashcardsDone, remote.flashcardsDone),
    flashcardReviews: Math.max(local.flashcardReviews ?? 0, remote.flashcardReviews ?? 0),
  };
}

async function loadFromSupabase(userId: string): Promise<Progress | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();
    if (error || !data) return null;
    return rowToProgress(data as Record<string, unknown>);
  } catch {
    return null;
  }
}

async function saveToSupabase(userId: string, p: Progress): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    await supabase
      .from("user_progress")
      .upsert({ user_id: userId, ...progressToRow(p) }, { onConflict: "user_id" });
  } catch {
    // Silent — localStorage is still the safety net
  }
}

/**
 * Inserts one immutable row into `quiz_history` for a completed quiz.
 * Fire-and-forget: this is purely a learning-history log for
 * getStudentAnalytics() (src/lib/analytics.ts) — it never affects XP,
 * streak, rank, or the local `quizHistory` array, which are already
 * handled by `recordQuizResult` regardless of whether this insert
 * succeeds. Only runs for a signed-in user with Supabase configured.
 */
async function insertQuizHistoryRow(
  result: { subjectId: string; chapterKey: string; scorePct: number; correct: number; total: number; xpEarned?: number },
): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: subscription, error: subscriptionError } = await supabase
      .from("subscriptions")
      .select("plan")
      .eq("user_id", user.id)
      .eq("status", "active")
      .maybeSingle();
    if (
      subscriptionError ||
      !hasFeature(resolveStoredPlan(subscription?.plan), "quiz_history")
    )
      return;

    const { error } = await supabase.from("quiz_history").insert({
      user_id: user.id,
      subject_id: result.subjectId,
      chapter_key: result.chapterKey,
      score_pct: result.scorePct,
      correct: result.correct,
      total: result.total,
      // Real per-question difficulty-based XP award (10/20/30), summed for
      // this quiz — not a flat estimate. Omitted (stays NULL) for callers
      // that don't pass it, which the Galaxy Hall of Fame's Monthly XP
      // ranking treats as "no data" rather than 0.
      ...(result.xpEarned != null ? { xp_earned: result.xpEarned } : {}),
    });
    if (!error) window.dispatchEvent(new Event("academy:quiz-history-updated"));
  } catch {
    // Silent — this is a supplementary analytics log, not the source of truth
  }
}

// ─── Singleton auth sync ──────────────────────────────────────────────────────
// `useProgress()` is called from ~10 components on a single page (header,
// sidebar, hero card, companion widgets, etc). Each one used to run its own
// independent `supabase.auth.getUser()` call AND its own `onAuthStateChange`
// subscription — so every sign-in event fired ~10 simultaneous network
// round-trips, merges, and localStorage/Supabase writes, all cascading into
// ~10 separate re-renders at once. That burst of synchronous work is what
// froze the tab when clicking Sign In. This module-level singleton ensures
// the actual Supabase auth listener and fetch/merge/save logic run exactly
// once per page load, no matter how many components call useProgress().
let authSyncStarted = false;
let sharedUserId: string | null = null;
let sharedProgress: Progress | null = null;
const progressListeners = new Set<(p: Progress) => void>();

function broadcastProgress(p: Progress) {
  sharedProgress = p;
  progressListeners.forEach((listen) => listen(p));
}

function ensureAuthSync() {
  if (authSyncStarted || !isSupabaseConfigured) return;
  authSyncStarted = true;

  supabase.auth.getUser().then(async ({ data: { user } }) => {
    if (!user) return;
    sharedUserId = user.id;
    const local = load(user.id);
    broadcastProgress(local);
    const remote = await loadFromSupabase(user.id);
    if (sharedUserId !== user.id) return;
    if (!remote) {
      await saveToSupabase(user.id, local);
      return;
    }
    const merged = mergeProgress(local, remote);
    broadcastProgress(merged);
    try {
      localStorage.setItem(progressStorageKey(user.id), JSON.stringify(merged));
    } catch {}
  });

  supabase.auth.onAuthStateChange(async (event, session) => {
    // Supabase re-fires SIGNED_IN on tab focus/visibility even when the
    // session is unchanged — skip the redundant fetch/merge/write.
    if (event === "SIGNED_IN" && session?.user) {
      if (sharedUserId === session.user.id) return;
      sharedUserId = session.user.id;
      const local2 = load(session.user.id);
      broadcastProgress(local2);
      const remote2 = await loadFromSupabase(session.user.id);
      if (sharedUserId !== session.user.id) return;
      const merged2 = remote2 ? mergeProgress(local2, remote2) : local2;
      broadcastProgress(merged2);
      try {
        localStorage.setItem(progressStorageKey(session.user.id), JSON.stringify(merged2));
      } catch {}
      await saveToSupabase(session.user.id, merged2);
    } else if (event === "SIGNED_OUT") {
      sharedUserId = null;
      broadcastProgress(load(null));
    }
  });
}

// ─── SM-2 Spaced Repetition ───────────────────────────────────────────────────
// rating: 0=Again, 1=Hard, 2=Good, 3=Easy
function sm2(record: CardMasteryRecord | undefined, rating: 0 | 1 | 2 | 3): CardMasteryRecord {
  const ef = record?.easeFactor ?? 2.5;
  const reps = record?.reps ?? 0;
  const interval = record?.interval ?? 0;
  const lapses = record?.lapses ?? 0;

  let newInterval: number;
  let newReps: number;
  let newLapses = lapses;

  if (rating >= 2) {
    if (reps === 0) newInterval = 1;
    else if (reps === 1) newInterval = 6;
    else newInterval = Math.round(interval * ef);
    if (rating === 3) newInterval = Math.round(newInterval * 1.3);
    newReps = reps + 1;
  } else {
    newInterval = 1;
    newReps = 0;
    newLapses = lapses + 1;
  }

  const newEf = Math.max(1.3, ef + 0.1 - (3 - rating) * (0.08 + (3 - rating) * 0.02));
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + newInterval);

  return {
    interval: newInterval,
    easeFactor: Math.round(newEf * 100) / 100,
    due: dueDate.toISOString().slice(0, 10),
    reps: newReps,
    lapses: newLapses,
  };
}

export function getDueCount(cardMastery: Record<string, CardMasteryRecord> = {}): number {
  const t = today();
  return Object.values(cardMastery).filter((r) => r.due <= t).length;
}

export function getDueCardIds(cardMastery: Record<string, CardMasteryRecord> = {}): Set<string> {
  const t = today();
  return new Set(
    Object.entries(cardMastery)
      .filter(([, r]) => r.due <= t)
      .map(([id]) => id),
  );
}

export function getMasteredCount(cardMastery: Record<string, CardMasteryRecord> = {}): number {
  return Object.values(cardMastery).filter((r) => r.reps >= 3).length;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useProgress() {
  const [progress, setProgress] = useState<Progress>(initial);
  const [cloudSynced, setCloudSynced] = useState(false);
  const [lastRankUp, setLastRankUp] = useState<RankUpEvent | null>(null);
  const [lastCompanionEvolution, setLastCompanionEvolution] =
    useState<CompanionEvolutionEvent | null>(null);
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Compares XP before/after an update and raises transient celebration events. Does not touch persisted state. */
  const detectProgressionEvents = useCallback(
    (prev: Progress, next: Progress) => {
      if (next.xp === prev.xp) return;

      const rankUp = getRankUpTransition(prev.xp, next.xp);
      if (rankUp) {
        setLastRankUp({
          fromRank: rankUp.fromRank.id,
          toRank: rankUp.toRank.id,
          xpGained: next.xp - prev.xp,
          timestamp: Date.now(),
        });
      }

      const companion = next.companion ?? prev.companion;
      if (companion) {
        const evolution = getCompanionEvolutionTransition(prev.xp, next.xp);
        if (evolution) {
          setLastCompanionEvolution({
            fromStage: evolution.fromStage,
            toStage: evolution.toStage,
            companionId: companion.id,
            timestamp: Date.now(),
          });
        }
      }
    },
    [],
  );

  const clearRankUpEvent = useCallback(() => setLastRankUp(null), []);
  const clearCompanionEvolutionEvent = useCallback(
    () => setLastCompanionEvolution(null),
    [],
  );

  // On mount: load localStorage immediately, subscribe to the shared
  // singleton's broadcasts, and kick off auth sync (a no-op if some other
  // already-mounted useProgress() instance started it first).
  useEffect(() => {
    const local = sharedProgress ?? load(sharedUserId);
    if (sharedProgress === null) sharedProgress = local;
    setProgress(local);

    progressListeners.add(setProgress);
    ensureAuthSync();
    if (sharedUserId) setCloudSynced(true);

    return () => {
      progressListeners.delete(setProgress);
    };
  }, []);

  // Debounced sync to Supabase after every progress change
  const scheduleSync = useCallback((p: Progress) => {
    const userId = sharedUserId;
    if (!isSupabaseConfigured || !userId) return;
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    syncTimerRef.current = setTimeout(() => {
      void saveToSupabase(userId, p);
    }, SYNC_DEBOUNCE_MS);
  }, []);

  const save = useCallback(
    (p: Progress) => {
      setProgress(p);
      try {
        localStorage.setItem(progressStorageKey(sharedUserId), JSON.stringify(p));
      } catch {}
      scheduleSync(p);
    },
    [scheduleSync],
  );

  const acceptMissionState = useCallback(
    (state: MissionSystemState) => {
      if (state.totalXp == null) return;
      setProgress((prev) => {
        const nextXp = Math.max(prev.xp, state.totalXp ?? prev.xp);
        if (nextXp === prev.xp) return prev;
        const next: Progress = {
          ...prev,
          xp: nextXp,
          badges: applyXpMilestoneBadges(prev.badges, nextXp),
        };
        try {
          localStorage.setItem(progressStorageKey(sharedUserId), JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        detectProgressionEvents(prev, next);
        return next;
      });
    },
    [scheduleSync, detectProgressionEvents],
  );

  const trackMissionActivity = useCallback(
    (activity: MissionActivityType, eventKey: string, dateKey = today()) => {
      void recordMissionActivityRemote({ activity, eventKey, dateKey })
        .then(acceptMissionState)
        .catch(() => {
          // Local progress remains available; the originating learning action
          // can be retried without duplicating the immutable mission event.
        });
    },
    [acceptMissionState],
  );

  const addXp = useCallback(
    (amount: number, subjectId?: string) => {
      setProgress((prev) => {
        const t = today();
        let streak = prev.streak;
        if (prev.lastActive !== t) {
          const yest = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
          streak = prev.lastActive === yest ? streak + 1 : 1;
        }
        const newXp = prev.xp + amount;
        let newBadges = [...prev.badges];

        // Starter
        if (!newBadges.includes("starter") && prev.quizzesTaken === 0) newBadges.push("starter");
        // Streak
        if (!newBadges.includes("streak3") && streak >= 3) newBadges.push("streak3");
        if (!newBadges.includes("streak7") && streak >= 7) newBadges.push("streak7");
        if (!newBadges.includes("streak30") && streak >= 30) newBadges.push("streak30");
        // XP milestone rewards remain based on total XP and are intentionally
        // independent from companion level thresholds.
        newBadges = applyXpMilestoneBadges(newBadges, newXp);

        const next: Progress = {
          ...prev,
          xp: newXp,
          lastActive: t,
          streak,
          badges: newBadges,
          subjectXp: subjectId
            ? { ...prev.subjectXp, [subjectId]: (prev.subjectXp[subjectId] || 0) + amount }
            : prev.subjectXp,
        };
        try {
          localStorage.setItem(progressStorageKey(sharedUserId), JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        detectProgressionEvents(prev, next);
        return next;
      });
    },
    [scheduleSync, detectProgressionEvents],
  );

  const recordQuiz = useCallback(
    (perfect?: boolean) => {
      setProgress((prev) => {
        const t = today();
        const newCount = prev.quizzesTaken + 1;
        const newBadges = [...prev.badges];
        if (!newBadges.includes("quiz10") && newCount >= 10) newBadges.push("quiz10");
        if (!newBadges.includes("quiz50") && newCount >= 50) newBadges.push("quiz50");
        if (perfect && !newBadges.includes("perfect_quiz")) newBadges.push("perfect_quiz");

        // Keep the legacy local counter for instant/offline UI feedback. The
        // complete-set reward is claimed atomically by the mission RPC.
        const missions = resetMissionsIfNewDay(prev.missions, t);
        const newQuizzesDone = missions.quizzesDone + 1;

        const next: Progress = {
          ...prev,
          quizzesTaken: newCount,
          badges: newBadges,
          missions: { ...missions, quizzesDone: newQuizzesDone },
        };
        try {
          localStorage.setItem(progressStorageKey(sharedUserId), JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        detectProgressionEvents(prev, next);
        return next;
      });
    },
    [scheduleSync, detectProgressionEvents],
  );

  const awardBadge = useCallback(
    (id: string) => {
      setProgress((prev) => {
        if (prev.badges.includes(id)) return prev;
        const next = { ...prev, badges: [...prev.badges, id] };
        try {
          localStorage.setItem(progressStorageKey(sharedUserId), JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
    },
    [scheduleSync],
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      setProgress((prev) => {
        const exists = prev.favorites.includes(id);
        const favorites = exists ? prev.favorites.filter((f) => f !== id) : [...prev.favorites, id];
        const next = { ...prev, favorites };
        try {
          localStorage.setItem(progressStorageKey(sharedUserId), JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
    },
    [scheduleSync],
  );

  const markChapter = useCallback(
    (subjectId: string, chapterKey: string, kind: keyof ChapterActivity) => {
      if (kind === "read") {
        const dateKey = today();
        trackMissionActivity("lesson", `lesson:${dateKey}:${subjectId}:${chapterKey}`, dateKey);
      }
      setProgress((prev) => {
        const k = chapterActivityKey(subjectId, chapterKey);
        const prior = prev.chapterActivity[k] ?? {};
        if (prior[kind]) return prev;

        const t = today();
        const missions = resetMissionsIfNewDay(prev.missions, t);
        const updatedMissions = { ...missions };
        if (kind === "read") updatedMissions.readChapters += 1;
        if (kind === "cards") updatedMissions.flashcardsDone += 1;

        const newActivity = { ...prev.chapterActivity, [k]: { ...prior, [kind]: true } };
        const completedCount = totalChaptersCompleted(newActivity);
        const newBadges = [...prev.badges];
        if (!newBadges.includes("first_notes") && kind === "read") newBadges.push("first_notes");
        if (!newBadges.includes("first_flashcard") && kind === "cards")
          newBadges.push("first_flashcard");
        if (
          !newBadges.includes("chapter_master") &&
          chapterProgressPct({ ...prior, [kind]: true }) === 100
        )
          newBadges.push("chapter_master");
        if (!newBadges.includes("five_chapters") && completedCount >= 5)
          newBadges.push("five_chapters");

        const next: Progress = {
          ...prev,
          badges: newBadges,
          chapterActivity: newActivity,
          missions: updatedMissions,
        };
        try {
          localStorage.setItem(progressStorageKey(sharedUserId), JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        detectProgressionEvents(prev, next);
        return next;
      });
    },
    [scheduleSync, detectProgressionEvents, trackMissionActivity],
  );

  const rateCard = useCallback(
    (cardId: string, rating: 0 | 1 | 2 | 3) => {
      const dateKey = today();
      trackMissionActivity("flashcard", `flashcard:${dateKey}:${cardId}`, dateKey);
      setProgress((prev) => {
        const existing = prev.cardMastery?.[cardId];
        const newRecord = sm2(existing, rating);
        const mastery = { ...(prev.cardMastery ?? {}), [cardId]: newRecord };

        // Mastery badges
        const masteredNow = Object.values(mastery).filter((r) => r.reps >= 3).length;
        const newBadges = [...prev.badges];
        if (!newBadges.includes("mastery10") && masteredNow >= 10) newBadges.push("mastery10");
        if (!newBadges.includes("mastery50") && masteredNow >= 50) newBadges.push("mastery50");
        if (!newBadges.includes("mastery100") && masteredNow >= 100) newBadges.push("mastery100");

        const next: Progress = {
          ...prev,
          cardMastery: mastery,
          badges: newBadges,
          missions: recordDailyFlashcardReview(prev.missions, today()),
        };
        try {
          localStorage.setItem(progressStorageKey(sharedUserId), JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
    },
    [scheduleSync, trackMissionActivity],
  );

  const setLastVisited = useCallback(
    (lv: LastVisited) => {
      setProgress((prev) => {
        const next: Progress = {
          ...prev,
          lastVisited: lv,
          recentActivity: pushRecentActivity(prev.recentActivity, lv),
        };
        try {
          localStorage.setItem(progressStorageKey(sharedUserId), JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
    },
    [scheduleSync],
  );

  const chooseCompanion = useCallback(
    (id: CompanionId) => {
      setProgress((prev) => {
        if (prev.companion) return prev;
        const now = new Date().toISOString();
        const next: Progress = {
          ...prev,
          companion: {
            id,
            stage: "egg",
            level: 1,
            selectedAt: now,
            evolvedAt: { egg: now },
          },
        };
        try {
          localStorage.setItem(progressStorageKey(sharedUserId), JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
    },
    [scheduleSync],
  );

  const evolveCompanion = useCallback((): boolean => {
    let evolved = false;
    setProgress((prev) => {
      const companion = prev.companion;
      if (!companion) return prev;
      const stageIndex = COMPANION_STAGES.findIndex((stage) => stage.id === companion.stage);
      const nextStage = COMPANION_STAGES[stageIndex + 1];
      if (!nextStage || prev.xp < nextStage.xpRequired) return prev;

      evolved = true;
      const now = new Date().toISOString();
      const next: Progress = {
        ...prev,
        companion: {
          ...companion,
          stage: nextStage.id,
          level: stageIndex + 2,
          evolvedAt: { ...(companion.evolvedAt ?? {}), [nextStage.id]: now },
        },
      };
      try {
        localStorage.setItem(progressStorageKey(sharedUserId), JSON.stringify(next));
      } catch {}
      scheduleSync(next);
      return next;
    });
    return evolved;
  }, [scheduleSync]);

  /** Give the companion a custom nickname (e.g. "Nova" → "Blaze"). */
  const renameCompanion = useCallback(
    (name: string) => {
      const trimmed = name.trim().slice(0, 24);
      setProgress((prev) => {
        if (!prev.companion || !trimmed) return prev;
        const next: Progress = {
          ...prev,
          companion: { ...prev.companion, name: trimmed },
        };
        try {
          localStorage.setItem(progressStorageKey(sharedUserId), JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
    },
    [scheduleSync],
  );

  /**
   * Log a completed quiz for the AI Tracker + Parent Report and, when the
   * student scores at least QUIZ_PASS_PCT, award the existing bonus XP.
   * Returns 0 for backwards compatibility with older callers.
   */
  const recordQuizResult = useCallback(
    (input: {
      subjectId: string;
      chapterKey: string;
      correct: number;
      total: number;
      xpEarned?: number;
    }): number => {
      const total = Math.max(1, input.total);
      const correct = Math.max(0, Math.min(input.correct, total));
      const scorePct = Math.round((correct / total) * 100);
      const passed = scorePct >= QUIZ_PASS_PCT;
      const result: QuizResult = {
        id: `q_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        subjectId: input.subjectId,
        chapterKey: input.chapterKey,
        scorePct,
        correct,
        total,
        date: new Date().toISOString(),
      };

      trackMissionActivity("quiz", `quiz:${result.id}`, getLocalDateKey(new Date(result.date)));
      if (sharedUserId) {
        void insertQuizHistoryRow({
          subjectId: input.subjectId,
          chapterKey: input.chapterKey,
          scorePct,
          correct,
          total,
          xpEarned: input.xpEarned,
        });
      }

      setProgress((prev) => {
        const quizHistory = [...(prev.quizHistory ?? []), result].slice(-QUIZ_HISTORY_CAP);
        const timestamp = Date.now();

        const next: Progress = {
          ...prev,
          quizHistory,
          recentActivity: pushRecentActivity(prev.recentActivity, {
            subjectId: input.subjectId,
            chapterKey: input.chapterKey,
            type: "quiz",
            label: input.chapterKey,
            timestamp,
            detail: `${correct}/${total} correct`,
          }),
          xp: prev.xp + (passed ? QUIZ_PASS_BONUS_XP : 0),
          subjectXp: passed
            ? {
                ...prev.subjectXp,
                [input.subjectId]: (prev.subjectXp[input.subjectId] || 0) + QUIZ_PASS_BONUS_XP,
              }
            : prev.subjectXp,
        };
        try {
          localStorage.setItem(progressStorageKey(sharedUserId), JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        detectProgressionEvents(prev, next);
        return next;
      });
      return 0;
    },
    [scheduleSync, detectProgressionEvents, trackMissionActivity],
  );

  const setParentReport = useCallback(
    (email: string | undefined, cadence: ReportCadence) => {
      setProgress((prev) => {
        const next: Progress = { ...prev, parentEmail: email, reportCadence: cadence };
        try {
          localStorage.setItem(progressStorageKey(sharedUserId), JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
    },
    [scheduleSync],
  );

  /** Set the public name + school used on the Hall of Fame and nominations. */
  const setStudentProfile = useCallback(
    (displayName: string | undefined, school: string | undefined) => {
      setProgress((prev) => {
        const next: Progress = { ...prev, displayName, school };
        try {
          localStorage.setItem(progressStorageKey(sharedUserId), JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
    },
    [scheduleSync],
  );

  return {
    progress,
    cloudSynced,
    addXp,
    recordQuiz,
    awardBadge,
    toggleFavorite,
    save,
    markChapter,
    rateCard,
    setLastVisited,
    chooseCompanion,
    evolveCompanion,
    renameCompanion,
    recordQuizResult,
    setParentReport,
    setStudentProfile,
    lastRankUp,
    lastCompanionEvolution,
    clearRankUpEvent,
    clearCompanionEvolutionEvent,
    acceptMissionState,
  };
}

function resetMissionsIfNewDay(missions: MissionProgress | undefined, t: string): MissionProgress {
  if (!missions || missions.dailyDate !== t) {
    return {
      dailyDate: t,
      readChapters: 0,
      quizzesDone: 0,
      flashcardsDone: 0,
      flashcardReviews: 0,
    };
  }
  return missions;
}
