// ─── Collection compute — evaluates a student's progress into collectibles ──────

import { getSubjectChapters } from "@/data/content";
import { AVATAR_ITEMS } from "@/data/avatar";
import {
  PLANET_BADGES,
  CONSTELLATIONS,
  EXPLORER_TITLES,
  type PlanetBadge,
  type Constellation,
  type ExplorerTitle,
} from "@/data/collection";
import { QUIZ_PASS_PCT, type Progress } from "@/hooks/use-progress";

export interface BadgeState {
  def: PlanetBadge;
  earned: boolean;
  current: number;
  target: number;
}

export interface ConstellationState {
  def: Constellation;
  earned: boolean;
  completed: number;
  total: number;
  pct: number;
}

export interface TitleState {
  def: ExplorerTitle;
  unlocked: boolean;
}

export interface CollectionState {
  badges: BadgeState[];
  constellations: ConstellationState[];
  titles: TitleState[];
  cosmeticsOwned: number;
  cosmeticsTotal: number;
  /** 0–100 across every collectible type. */
  completionPct: number;
  earnedCount: number;
  totalCount: number;
  /** Every collectible id currently unlocked — diff against seen for celebrations. */
  unlockedIds: string[];
}

function subjectPasses(progress: Progress, subjectId: string): number {
  return (progress.quizHistory ?? []).filter(
    (r) => r.subjectId === subjectId && r.scorePct >= QUIZ_PASS_PCT,
  ).length;
}

function chaptersQuizzed(progress: Progress, subjectId: string): number {
  const prefix = `${subjectId}:`;
  return Object.entries(progress.chapterActivity ?? {}).filter(
    ([k, a]) => k.startsWith(prefix) && a.quiz,
  ).length;
}

export function computeCollection(progress: Progress): CollectionState {
  const badges: BadgeState[] = PLANET_BADGES.map((def) => {
    const current = subjectPasses(progress, def.subjectId);
    return { def, current, target: def.passesRequired, earned: current >= def.passesRequired };
  });

  const constellations: ConstellationState[] = CONSTELLATIONS.map((def) => {
    let total = 0;
    try {
      total = getSubjectChapters(def.subjectId).filter((c) => c.available !== false).length;
    } catch {
      total = 0;
    }
    const completed = Math.min(chaptersQuizzed(progress, def.subjectId), total || Infinity);
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { def, total, completed, pct, earned: total > 0 && completed >= total };
  });

  const xp = progress.xp ?? 0;
  const titles: TitleState[] = EXPLORER_TITLES.map((def) => ({ def, unlocked: xp >= def.minXp }));

  const owned = progress.avatar?.owned ?? [];
  const cosmeticsOwned = AVATAR_ITEMS.filter((i) => owned.includes(i.id)).length;
  const cosmeticsTotal = AVATAR_ITEMS.length;

  const unlockedIds = [
    ...badges.filter((b) => b.earned).map((b) => b.def.id),
    ...constellations.filter((c) => c.earned).map((c) => c.def.id),
    ...titles.filter((t) => t.unlocked).map((t) => t.def.id),
    ...AVATAR_ITEMS.filter((i) => owned.includes(i.id)).map((i) => i.id),
  ];

  const earnedCount =
    badges.filter((b) => b.earned).length +
    constellations.filter((c) => c.earned).length +
    titles.filter((t) => t.unlocked).length +
    cosmeticsOwned;
  const totalCount =
    PLANET_BADGES.length + CONSTELLATIONS.length + EXPLORER_TITLES.length + cosmeticsTotal;
  const completionPct = totalCount > 0 ? Math.round((earnedCount / totalCount) * 100) : 0;

  return {
    badges,
    constellations,
    titles,
    cosmeticsOwned,
    cosmeticsTotal,
    completionPct,
    earnedCount,
    totalCount,
    unlockedIds,
  };
}
