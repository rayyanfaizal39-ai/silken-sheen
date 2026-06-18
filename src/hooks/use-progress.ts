import { useEffect, useState, useCallback, useRef } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

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

// ─── Stardust economy & quiz analytics ─────────────────────────────────────────
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

/** Cosmetic loadout the student buys with Stardust in the Market. */
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

/** Pass threshold + rewards for "passing" a quiz. */
export const QUIZ_PASS_PCT = 80;
export const QUIZ_PASS_TOKENS = 20; // Stardust awarded for an 80%+ quiz
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
  // ── Stardust economy + analytics (local-first) ──
  tokens: number; // "Stardust" — spent in the Market
  avatar: AvatarConfig; // equipped + owned cosmetics
  quizHistory: QuizResult[]; // recent completed quizzes
  parentEmail?: string; // where Mission Reports are sent
  reportCadence?: ReportCadence;
  equippedTitle?: string; // Explorer Title id shown on the profile
  seenCollectibles?: string[]; // collectible ids already celebrated
  displayName?: string; // name shown on the Hall of Fame leaderboard
  school?: string; // school used in scholarship nominations
}

export interface LastVisited {
  subjectId: string;
  chapterKey: string;
  type: "notes" | "flashcards" | "quiz";
  label: string; // human-readable chapter name
  timestamp: number;
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
}

// ─── Cosmic Rank system (Cadet → Cosmic Legend, 1000–3000 rating) ───────────────
export interface SpaceRank {
  id: string;
  name: string;
  /** Celestial emoji shown in rank slots across the app. */
  emoji: string;
  minXp: number;
  maxXp: number;
  /** Elo-style rating displayed to the student. */
  minRating: number;
  maxRating: number;
  color: string;
  /** CSS color for the bottom glow ring — brighter at high rank, dim at low. */
  glowColor: string;
  description: string;
}

export const SPACE_RANKS: SpaceRank[] = [
  {
    id: "cadet",
    name: "Cadet",
    emoji: "🚀",
    minXp: 0,
    maxXp: 199,
    minRating: 1000,
    maxRating: 1199,
    color: "#94A3B8",
    glowColor: "rgba(148,163,184,0.45)",
    description: "Every journey begins with a single launch",
  },
  {
    id: "moon-explorer",
    name: "Moon Explorer",
    emoji: "🌙",
    minXp: 200,
    maxXp: 449,
    minRating: 1200,
    maxRating: 1449,
    color: "#7DD3FC",
    glowColor: "rgba(125,211,252,0.55)",
    description: "Charting the craters of new knowledge",
  },
  {
    id: "planet-voyager",
    name: "Planet Voyager",
    emoji: "🪐",
    minXp: 450,
    maxXp: 749,
    minRating: 1450,
    maxRating: 1749,
    color: "#34D399",
    glowColor: "rgba(52,211,153,0.65)",
    description: "Orbiting whole worlds of discovery",
  },
  {
    id: "star-captain",
    name: "Star Captain",
    emoji: "⭐",
    minXp: 750,
    maxXp: 1099,
    minRating: 1750,
    maxRating: 2099,
    color: "#FBBF24",
    glowColor: "rgba(251,191,36,0.7)",
    description: "Commanding constellations of skill",
  },
  {
    id: "galaxy-guardian",
    name: "Galaxy Guardian",
    emoji: "🌌",
    minXp: 1100,
    maxXp: 1599,
    minRating: 2100,
    maxRating: 2599,
    color: "#A78BFA",
    glowColor: "rgba(167,139,250,0.75)",
    description: "Protector of knowledge across the universe",
  },
  {
    id: "cosmic-legend",
    name: "Cosmic Legend",
    emoji: "🌟",
    minXp: 1600,
    maxXp: Infinity,
    minRating: 2600,
    maxRating: 3000,
    color: "#F0ABFC",
    glowColor: "rgba(240,171,252,0.88)",
    description: "Among the rarest minds in the universe",
  },
];

/** Backwards-compat alias used across the app. */
export const CHESS_RANKS = SPACE_RANKS;

/** Convert XP to chess.com-style Elo rating (1000 starting, 3000 max). */
export function getChessRating(xp: number): number {
  return Math.min(3000, 1000 + xp);
}

export function getRank(xp: number): SpaceRank {
  for (let i = SPACE_RANKS.length - 1; i >= 0; i--) {
    if (xp >= SPACE_RANKS[i].minXp) return SPACE_RANKS[i];
  }
  return SPACE_RANKS[0];
}

export function getNextRank(xp: number): SpaceRank | null {
  const current = getRank(xp);
  const idx = SPACE_RANKS.findIndex((r) => r.id === current.id);
  return idx < SPACE_RANKS.length - 1 ? SPACE_RANKS[idx + 1] : null;
}

export function getRankProgress(xp: number): number {
  const rank = getRank(xp);
  if (rank.maxXp === Infinity) return 100;
  const range = rank.maxXp - rank.minXp + 1;
  const into = xp - rank.minXp;
  return Math.min(100, Math.round((into / range) * 100));
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

// ─── Daily missions ───────────────────────────────────────────────────────────
export interface DailyMission {
  id: string;
  label: string;
  target: number;
  xpReward: number;
  current: (m: MissionProgress) => number;
}

export const DAILY_MISSIONS: DailyMission[] = [
  {
    id: "read2",
    label: "Read 2 chapters",
    target: 2,
    xpReward: 20,
    current: (m) => m.readChapters,
  },
  {
    id: "quiz2",
    label: "Complete 2 quizzes",
    target: 2,
    xpReward: 30,
    current: (m) => m.quizzesDone,
  },
  {
    id: "cards1",
    label: "Study flashcards",
    target: 1,
    xpReward: 15,
    current: (m) => m.flashcardsDone,
  },
];

// ─── Persistence helpers ──────────────────────────────────────────────────────
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
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function load(): Progress {
  if (typeof window === "undefined") return initial;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initial;
    return { ...initial, ...JSON.parse(raw) };
  } catch {
    return initial;
  }
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
  return {
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
  };
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
  // Stardust economy + analytics are stored locally only — never let a
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
    favorites: Array.from(new Set([...local.favorites, ...remote.favorites])),
    cardMastery: useRemote
      ? { ...local.cardMastery, ...remote.cardMastery }
      : { ...remote.cardMastery, ...local.cardMastery },
    tokens: Math.max(local.tokens ?? 0, remote.tokens ?? 0),
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
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userIdRef = useRef<string | null>(null);

  // On mount: load localStorage then optionally merge Supabase data
  useEffect(() => {
    const local = load();
    setProgress(local);

    if (!isSupabaseConfigured) return;

    // Get current user and sync
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      userIdRef.current = user.id;
      const remote = await loadFromSupabase(user.id);
      if (!remote) {
        // No cloud record yet — push local to cloud
        await saveToSupabase(user.id, local);
        setCloudSynced(true);
        return;
      }
      const merged = mergeProgress(local, remote);
      setProgress(merged);
      try {
        localStorage.setItem(KEY, JSON.stringify(merged));
      } catch {}
      setCloudSynced(true);
    });

    // Listen for auth changes (login / logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        userIdRef.current = session.user.id;
        const local2 = load();
        const remote2 = await loadFromSupabase(session.user.id);
        const merged2 = remote2 ? mergeProgress(local2, remote2) : local2;
        setProgress(merged2);
        try {
          localStorage.setItem(KEY, JSON.stringify(merged2));
        } catch {}
        await saveToSupabase(session.user.id, merged2);
        setCloudSynced(true);
      } else if (event === "SIGNED_OUT") {
        userIdRef.current = null;
        setCloudSynced(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Debounced sync to Supabase after every progress change
  const scheduleSync = useCallback((p: Progress) => {
    if (!isSupabaseConfigured || !userIdRef.current) return;
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    syncTimerRef.current = setTimeout(() => {
      void saveToSupabase(userIdRef.current!, p);
    }, SYNC_DEBOUNCE_MS);
  }, []);

  const save = useCallback(
    (p: Progress) => {
      setProgress(p);
      try {
        localStorage.setItem(KEY, JSON.stringify(p));
      } catch {}
      scheduleSync(p);
    },
    [scheduleSync],
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
        const newBadges = [...prev.badges];

        // Starter
        if (!newBadges.includes("starter") && prev.quizzesTaken === 0) newBadges.push("starter");
        // Streak
        if (!newBadges.includes("streak3") && streak >= 3) newBadges.push("streak3");
        if (!newBadges.includes("streak7") && streak >= 7) newBadges.push("streak7");
        if (!newBadges.includes("streak30") && streak >= 30) newBadges.push("streak30");
        // XP milestones
        if (!newBadges.includes("xp100") && newXp >= 100) newBadges.push("xp100");
        if (!newBadges.includes("scholar") && newXp >= 500) newBadges.push("scholar");
        if (!newBadges.includes("xp1000") && newXp >= 1000) newBadges.push("xp1000");
        if (!newBadges.includes("xp5000") && newXp >= 5000) newBadges.push("xp5000");

        // Pop Mart character unlock on chess rank-up
        const prevRankId = getRank(prev.xp).id;
        const newRankId = getRank(newXp).id;
        let newAvatar = prev.avatar;
        if (prevRankId !== newRankId) {
          const RANK_CHARACTERS: Record<string, string[]> = {
            knight:     ["suit-labubu", "suit-labubu-pink"],
            bishop:     ["suit-dimoo", "suit-dimoo-star"],
            rook:       ["suit-skullpanda", "suit-skullpanda-neon"],
            king:       ["suit-crybaby", "suit-crybaby-blue"],
            queen:      ["suit-golden"],
          };
          const pool = RANK_CHARACTERS[newRankId] ?? [];
          const notOwned = pool.filter((id) => !(prev.avatar.owned ?? []).includes(id));
          const candidates = notOwned.length > 0 ? notOwned : pool;
          if (candidates.length > 0) {
            const unlocked = candidates[Math.floor(Math.random() * candidates.length)];
            newAvatar = {
              ...prev.avatar,
              suit: unlocked,
              owned: [...(prev.avatar.owned ?? []), unlocked],
            };
          }
        }

        const next: Progress = {
          ...prev,
          xp: newXp,
          lastActive: t,
          streak,
          badges: newBadges,
          avatar: newAvatar,
          subjectXp: subjectId
            ? { ...prev.subjectXp, [subjectId]: (prev.subjectXp[subjectId] || 0) + amount }
            : prev.subjectXp,
        };
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
    },
    [scheduleSync],
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

        // Daily mission update + award XP when quiz2 mission just completes
        const missions = resetMissionsIfNewDay(prev.missions, t);
        const newQuizzesDone = missions.quizzesDone + 1;
        const missionXp = missions.quizzesDone < 2 && newQuizzesDone >= 2 ? 30 : 0;

        const next: Progress = {
          ...prev,
          xp: prev.xp + missionXp,
          quizzesTaken: newCount,
          badges: newBadges,
          missions: { ...missions, quizzesDone: newQuizzesDone },
        };
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
    },
    [scheduleSync],
  );

  const awardBadge = useCallback(
    (id: string) => {
      setProgress((prev) => {
        if (prev.badges.includes(id)) return prev;
        const next = { ...prev, badges: [...prev.badges, id] };
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
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
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
    },
    [scheduleSync],
  );

  const markChapter = useCallback(
    (subjectId: string, chapterKey: string, kind: keyof ChapterActivity) => {
      setProgress((prev) => {
        const k = chapterActivityKey(subjectId, chapterKey);
        const prior = prev.chapterActivity[k] ?? {};
        if (prior[kind]) return prev;

        const t = today();
        const missions = resetMissionsIfNewDay(prev.missions, t);
        const updatedMissions = { ...missions };
        if (kind === "read") updatedMissions.readChapters += 1;
        if (kind === "cards") updatedMissions.flashcardsDone += 1;

        // Award XP when read2 or cards1 mission just completes
        const missionXp =
          kind === "read" && missions.readChapters < 2 && updatedMissions.readChapters >= 2
            ? 20
            : kind === "cards" && missions.flashcardsDone < 1 && updatedMissions.flashcardsDone >= 1
              ? 15
              : 0;

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
          xp: prev.xp + missionXp,
          badges: newBadges,
          chapterActivity: newActivity,
          missions: updatedMissions,
        };
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
    },
    [scheduleSync],
  );

  const rateCard = useCallback(
    (cardId: string, rating: 0 | 1 | 2 | 3) => {
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

        const next: Progress = { ...prev, cardMastery: mastery, badges: newBadges };
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
    },
    [scheduleSync],
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
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
    },
    [scheduleSync],
  );

  /**
   * Log a completed quiz for the AI Tracker + Parent Report and, when the
   * student scores ≥ QUIZ_PASS_PCT, award Stardust tokens + bonus XP.
   * Returns the tokens awarded (0 if not a pass) so callers can celebrate.
   */
  const recordQuizResult = useCallback(
    (input: { subjectId: string; chapterKey: string; correct: number; total: number }): number => {
      const total = Math.max(1, input.total);
      const correct = Math.max(0, Math.min(input.correct, total));
      const scorePct = Math.round((correct / total) * 100);
      const passed = scorePct >= QUIZ_PASS_PCT;
      const tokensAwarded = passed ? QUIZ_PASS_TOKENS : 0;

      setProgress((prev) => {
        const result: QuizResult = {
          id: `q_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          subjectId: input.subjectId,
          chapterKey: input.chapterKey,
          scorePct,
          correct,
          total,
          date: new Date().toISOString(),
        };
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
          tokens: (prev.tokens ?? 0) + tokensAwarded,
          xp: prev.xp + (passed ? QUIZ_PASS_BONUS_XP : 0),
          subjectXp: passed
            ? {
                ...prev.subjectXp,
                [input.subjectId]: (prev.subjectXp[input.subjectId] || 0) + QUIZ_PASS_BONUS_XP,
              }
            : prev.subjectXp,
        };
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
      return tokensAwarded;
    },
    [scheduleSync],
  );

  /** Spend Stardust. Returns true if the student could afford it. */
  const spendTokens = useCallback(
    (amount: number): boolean => {
      let ok = false;
      setProgress((prev) => {
        if ((prev.tokens ?? 0) < amount) return prev;
        ok = true;
        const next: Progress = { ...prev, tokens: prev.tokens - amount };
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
      return ok;
    },
    [scheduleSync],
  );

  /** Buy a cosmetic with Stardust and auto-equip it. Returns success. */
  const buyAvatarItem = useCallback(
    (slot: keyof Omit<AvatarConfig, "owned">, itemId: string, cost: number): boolean => {
      let ok = false;
      setProgress((prev) => {
        const avatar = prev.avatar ?? DEFAULT_AVATAR;
        const alreadyOwned = avatar.owned.includes(itemId);
        if (!alreadyOwned && (prev.tokens ?? 0) < cost) return prev;
        ok = true;
        const owned = alreadyOwned ? avatar.owned : [...avatar.owned, itemId];
        const next: Progress = {
          ...prev,
          tokens: alreadyOwned ? prev.tokens : prev.tokens - cost,
          avatar: { ...avatar, owned, [slot]: itemId },
        };
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
      return ok;
    },
    [scheduleSync],
  );

  /** Equip an already-owned cosmetic. */
  const equipAvatar = useCallback(
    (slot: keyof Omit<AvatarConfig, "owned">, itemId: string) => {
      setProgress((prev) => {
        const avatar = prev.avatar ?? DEFAULT_AVATAR;
        if (!avatar.owned.includes(itemId)) return prev;
        const next: Progress = { ...prev, avatar: { ...avatar, [slot]: itemId } };
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
    },
    [scheduleSync],
  );

  const setParentReport = useCallback(
    (email: string | undefined, cadence: ReportCadence) => {
      setProgress((prev) => {
        const next: Progress = { ...prev, parentEmail: email, reportCadence: cadence };
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
    },
    [scheduleSync],
  );

  const setTitle = useCallback(
    (titleId: string) => {
      setProgress((prev) => {
        const next: Progress = { ...prev, equippedTitle: titleId };
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        scheduleSync(next);
        return next;
      });
    },
    [scheduleSync],
  );

  const markCollectiblesSeen = useCallback(
    (ids: string[]) => {
      if (ids.length === 0) return;
      setProgress((prev) => {
        const merged = Array.from(new Set([...(prev.seenCollectibles ?? []), ...ids]));
        const next: Progress = { ...prev, seenCollectibles: merged };
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
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
          localStorage.setItem(KEY, JSON.stringify(next));
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
    recordQuizResult,
    spendTokens,
    buyAvatarItem,
    equipAvatar,
    setParentReport,
    setTitle,
    markCollectiblesSeen,
    setStudentProfile,
  };
}

function resetMissionsIfNewDay(missions: MissionProgress | undefined, t: string): MissionProgress {
  if (!missions || missions.dailyDate !== t) {
    return { dailyDate: t, readChapters: 0, quizzesDone: 0, flashcardsDone: 0 };
  }
  return missions;
}
