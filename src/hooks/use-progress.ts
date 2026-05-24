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
}

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
      const newBadges = [...prev.badges];
      if (!newBadges.includes("starter") && prev.quizzesTaken === 0) newBadges.push("starter");
      if (!newBadges.includes("streak3") && streak >= 3) newBadges.push("streak3");
      const next: Progress = {
        ...prev,
        xp: prev.xp + amount,
        lastActive: t,
        streak,
        badges: newBadges,
        subjectXp: subjectId
          ? { ...prev.subjectXp, [subjectId]: (prev.subjectXp[subjectId] || 0) + amount }
          : prev.subjectXp,
      };
      if (!next.badges.includes("scholar") && next.xp >= 500) next.badges.push("scholar");
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const recordQuiz = useCallback(() => {
    setProgress((prev) => {
      const next = { ...prev, quizzesTaken: prev.quizzesTaken + 1 };
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
        const next: Progress = {
          ...prev,
          chapterActivity: { ...prev.chapterActivity, [k]: { ...prior, [kind]: true } },
        };
        try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
        return next;
      });
    },
    []
  );

  return { progress, addXp, recordQuiz, awardBadge, toggleFavorite, save, markChapter };
}
