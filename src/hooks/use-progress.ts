import { useEffect, useState, useCallback } from "react";

const KEY = "learnnova-progress-v1";

export type ChapterActivity = { read?: boolean; quiz?: boolean; cards?: boolean };

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
}

export interface MissionProgress {
  dailyDate: string; // YYYY-MM-DD
  readChapters: number;
  quizzesDone: number;
  flashcardsDone: number;
}

// ─── Space Rank system ───────────────────────────────────────────────────────
export interface SpaceRank {
  id: string;
  name: string;
  emoji: string;
  minXp: number;
  maxXp: number;
  color: string;
  description: string;
}

export const SPACE_RANKS: SpaceRank[] = [
  { id: "cadet",      name: "Space Cadet",      emoji: "🌱", minXp: 0,    maxXp: 99,   color: "#94A3B8", description: "Just starting the journey" },
  { id: "pilot",      name: "Space Pilot",       emoji: "🚀", minXp: 100,  maxXp: 249,  color: "#60A5FA", description: "Taking flight" },
  { id: "navigator",  name: "Star Navigator",    emoji: "⭐", minXp: 250,  maxXp: 499,  color: "#34D399", description: "Finding your way" },
  { id: "explorer",   name: "Cosmic Explorer",   emoji: "🌌", minXp: 500,  maxXp: 999,  color: "#A78BFA", description: "Exploring the cosmos" },
  { id: "scholar",    name: "Nebula Scholar",    emoji: "🌠", minXp: 1000, maxXp: 1999, color: "#F472B6", description: "A scholar among stars" },
  { id: "master",     name: "Galactic Master",   emoji: "🪐", minXp: 2000, maxXp: 3999, color: "#FB923C", description: "Master of all subjects" },
  { id: "commander",  name: "Nova Commander",    emoji: "💫", minXp: 4000, maxXp: 7999, color: "#FBBF24", description: "Commander of the fleet" },
  { id: "legend",     name: "Space Legend",      emoji: "🌟", minXp: 8000, maxXp: Infinity, color: "#E5E7EB", description: "A legend of the cosmos" },
];

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
  { id: "starter",         name: "First Steps",       description: "Took your first quiz",           emoji: "🎯", color: "#60A5FA" },
  { id: "first_notes",     name: "Speed Reader",      description: "Read your first chapter notes",  emoji: "📖", color: "#34D399" },
  { id: "first_flashcard", name: "Card Flipper",       description: "Studied your first flashcard deck", emoji: "🃏", color: "#A78BFA" },
  // Streak
  { id: "streak3",         name: "3-Day Streak",      description: "Studied 3 days in a row",        emoji: "🔥", color: "#F97316" },
  { id: "streak7",         name: "7-Day Streak",      description: "Studied 7 days in a row",        emoji: "🔥", color: "#EF4444" },
  { id: "streak30",        name: "30-Day Legend",     description: "Studied 30 days in a row",       emoji: "🔥", color: "#DC2626" },
  // XP
  { id: "xp100",           name: "100 XP Club",       description: "Earned 100 XP",                  emoji: "⚡", color: "#60A5FA" },
  { id: "scholar",         name: "500 XP Scholar",    description: "Earned 500 XP",                  emoji: "🧠", color: "#A78BFA" },
  { id: "xp1000",          name: "1000 XP Elite",     description: "Earned 1,000 XP",                emoji: "💎", color: "#F472B6" },
  { id: "xp5000",          name: "5000 XP Legend",    description: "Earned 5,000 XP",                emoji: "🌟", color: "#FBBF24" },
  // Quiz
  { id: "quiz10",          name: "Quiz Veteran",      description: "Completed 10 quizzes",           emoji: "🏆", color: "#FB923C" },
  { id: "quiz50",          name: "Quiz Master",       description: "Completed 50 quizzes",           emoji: "🥇", color: "#FBBF24" },
  { id: "perfect_quiz",    name: "Perfect Score!",    description: "Got 100% on a quiz",             emoji: "✨", color: "#34D399" },
  // Chapters
  { id: "chapter_master",  name: "Chapter Master",    description: "100% completed a chapter",       emoji: "📚", color: "#06B6D4" },
  { id: "five_chapters",   name: "5 Chapters Done",   description: "Fully completed 5 chapters",     emoji: "🎓", color: "#8B5CF6" },
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
  { id: "read2",    label: "Read 2 chapters",     target: 2,  xpReward: 20,  current: (m) => m.readChapters },
  { id: "quiz2",    label: "Complete 2 quizzes",  target: 2,  xpReward: 30,  current: (m) => m.quizzesDone },
  { id: "cards1",   label: "Study flashcards",    target: 1,  xpReward: 15,  current: (m) => m.flashcardsDone },
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

export function chapterProgressPct(activity?: ChapterActivity) {
  if (!activity) return 0;
  const done = (activity.read ? 1 : 0) + (activity.quiz ? 1 : 0) + (activity.cards ? 1 : 0);
  return Math.round((done / 3) * 100);
}

export function totalChaptersCompleted(chapterActivity: Record<string, ChapterActivity>): number {
  return Object.values(chapterActivity).filter(
    (a) => a.read && a.quiz && a.cards
  ).length;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useProgress() {
  const [progress, setProgress] = useState<Progress>(initial);

  useEffect(() => {
    setProgress(load());
  }, []);

  const save = useCallback((p: Progress) => {
    setProgress(p);
    try {
      localStorage.setItem(KEY, JSON.stringify(p));
    } catch {}
  }, []);

  const addXp = useCallback((amount: number, subjectId?: string) => {
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
      if (!newBadges.includes("streak3") && streak >= 3)  newBadges.push("streak3");
      if (!newBadges.includes("streak7") && streak >= 7)  newBadges.push("streak7");
      if (!newBadges.includes("streak30") && streak >= 30) newBadges.push("streak30");
      // XP milestones
      if (!newBadges.includes("xp100")  && newXp >= 100)  newBadges.push("xp100");
      if (!newBadges.includes("scholar") && newXp >= 500)  newBadges.push("scholar");
      if (!newBadges.includes("xp1000") && newXp >= 1000) newBadges.push("xp1000");
      if (!newBadges.includes("xp5000") && newXp >= 5000) newBadges.push("xp5000");

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
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const recordQuiz = useCallback((perfect?: boolean) => {
    setProgress((prev) => {
      const t = today();
      const newCount = prev.quizzesTaken + 1;
      const newBadges = [...prev.badges];
      if (!newBadges.includes("quiz10") && newCount >= 10)  newBadges.push("quiz10");
      if (!newBadges.includes("quiz50") && newCount >= 50)  newBadges.push("quiz50");
      if (perfect && !newBadges.includes("perfect_quiz"))   newBadges.push("perfect_quiz");

      // Daily mission update
      const missions = resetMissionsIfNewDay(prev.missions, t);
      const next: Progress = {
        ...prev,
        quizzesTaken: newCount,
        badges: newBadges,
        missions: { ...missions, quizzesDone: missions.quizzesDone + 1 },
      };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const awardBadge = useCallback((id: string) => {
    setProgress((prev) => {
      if (prev.badges.includes(id)) return prev;
      const next = { ...prev, badges: [...prev.badges, id] };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setProgress((prev) => {
      const exists = prev.favorites.includes(id);
      const favorites = exists ? prev.favorites.filter((f) => f !== id) : [...prev.favorites, id];
      const next = { ...prev, favorites };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const markChapter = useCallback(
    (subjectId: string, chapterKey: string, kind: keyof ChapterActivity) => {
      setProgress((prev) => {
        const k = chapterActivityKey(subjectId, chapterKey);
        const prior = prev.chapterActivity[k] ?? {};
        if (prior[kind]) return prev;

        const t = today();
        const missions = resetMissionsIfNewDay(prev.missions, t);
        const updatedMissions = { ...missions };
        if (kind === "read")  updatedMissions.readChapters  += 1;
        if (kind === "cards") updatedMissions.flashcardsDone += 1;

        const newActivity = { ...prev.chapterActivity, [k]: { ...prior, [kind]: true } };
        const completedCount = totalChaptersCompleted(newActivity);
        const newBadges = [...prev.badges];
        if (!newBadges.includes("first_notes") && kind === "read")         newBadges.push("first_notes");
        if (!newBadges.includes("first_flashcard") && kind === "cards")    newBadges.push("first_flashcard");
        if (!newBadges.includes("chapter_master") && chapterProgressPct({ ...prior, [kind]: true }) === 100) newBadges.push("chapter_master");
        if (!newBadges.includes("five_chapters") && completedCount >= 5)   newBadges.push("five_chapters");

        const next: Progress = {
          ...prev,
          badges: newBadges,
          chapterActivity: newActivity,
          missions: updatedMissions,
        };
        try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
        return next;
      });
    },
    []
  );

  return { progress, addXp, recordQuiz, awardBadge, toggleFavorite, save, markChapter };
}

function resetMissionsIfNewDay(missions: MissionProgress | undefined, t: string): MissionProgress {
  if (!missions || missions.dailyDate !== t) {
    return { dailyDate: t, readChapters: 0, quizzesDone: 0, flashcardsDone: 0 };
  }
  return missions;
}
