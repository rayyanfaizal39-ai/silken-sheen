import { subjects } from "@/data/subjects-meta";
import { getNextRank, getRank, getRankProgress } from "@/data/rankAssets";
import {
  chapterActivityKey,
  getCompanionLevelProgress,
  type LastVisited,
  type Progress,
} from "@/hooks/use-progress";

export type HomeStudyActivity = LastVisited["type"];
export type HomeStudyRoute = "/notes" | "/quizzes" | "/flashcards";
export type HomeForm = NonNullable<LastVisited["form"]>;

export interface HomeChapterCandidate {
  subjectId: string;
  form: HomeForm;
  chapterKey: string;
  label?: string;
}

export interface HomeLearningCatalog {
  hasResource(candidate: HomeChapterCandidate, activity: HomeStudyActivity): boolean;
  getLabel(candidate: HomeChapterCandidate): string | undefined;
  findAvailable(
    subjectId: string,
    chapterKey: string,
    activity: HomeStudyActivity,
  ): HomeChapterCandidate | null;
  firstAvailable(activity: HomeStudyActivity): HomeChapterCandidate | null;
}

export interface WeakTopicEvidence {
  subjectId: string;
  chapterKey: string;
  avgScore: number;
}

export interface HomeRecommendation {
  category: string;
  title: string;
  reason: string;
  subjectName: string;
  form: HomeForm | null;
  chapterLabel: string | null;
  activity: HomeStudyActivity;
  to: HomeStudyRoute;
  search?: { subject: string; form: number; chapter: string };
  ctaLabel: string;
}

const ACTIVITY_ROUTES: Record<HomeStudyActivity, HomeStudyRoute> = {
  notes: "/notes",
  quiz: "/quizzes",
  flashcards: "/flashcards",
};

const ACTIVITY_FIELDS = {
  notes: "read",
  quiz: "quiz",
  flashcards: "cards",
} as const;

const ACTIVITY_NAMES: Record<HomeStudyActivity, string> = {
  notes: "notes",
  quiz: "quiz",
  flashcards: "flashcards",
};

const ACTIVITY_CTAS: Record<HomeStudyActivity, string> = {
  notes: "Open Notes",
  quiz: "Start Quiz",
  flashcards: "Review Cards",
};

export function getHomeJourneySummary(xp: number) {
  const safeXp = Number.isFinite(xp) ? Math.max(0, xp) : 0;
  const rank = getRank(safeXp);
  const nextRank = getNextRank(safeXp);
  return {
    rank,
    nextRank,
    level: getCompanionLevelProgress(safeXp).currentLevel,
    xp: safeXp,
    xpGoal: nextRank?.minXp ?? safeXp,
    progressPercentage: getRankProgress(safeXp),
    xpRemaining: nextRank ? Math.max(0, nextRank.minXp - safeXp) : 0,
  };
}

function subjectName(subjectId: string) {
  return subjects.find((subject) => subject.id === subjectId)?.name ?? subjectId;
}

function formNumber(form: HomeForm) {
  return Number(form.match(/\d/)?.[0] ?? 1);
}

function normalizeForm(form: LastVisited["form"]): HomeForm {
  return form ?? "Form 1";
}

function chapterTitle(label: string) {
  return label.replace(/^(?:chapter|bab)\s*\d+\s*[:\-–—]?\s*/i, "").trim() || label;
}

function latestActivity(progress: Progress) {
  return [progress.lastVisited, ...(progress.recentActivity ?? [])]
    .filter((item): item is LastVisited => Boolean(item))
    .sort((a, b) => b.timestamp - a.timestamp)[0];
}

function candidateFromActivity(activity: LastVisited): HomeChapterCandidate {
  return {
    subjectId: activity.subjectId,
    form: normalizeForm(activity.form),
    chapterKey: activity.chapterKey,
    label: activity.label,
  };
}

function routeSearch(candidate: HomeChapterCandidate) {
  return {
    subject: candidate.subjectId,
    form: formNumber(candidate.form),
    chapter: candidate.chapterKey,
  };
}

function buildRecommendation(
  candidate: HomeChapterCandidate,
  activity: HomeStudyActivity,
  catalog: HomeLearningCatalog,
  input: Pick<HomeRecommendation, "category" | "title" | "reason">,
): HomeRecommendation {
  const label = catalog.getLabel(candidate) ?? candidate.label ?? candidate.chapterKey;
  return {
    ...input,
    subjectName: subjectName(candidate.subjectId),
    form: candidate.form,
    chapterLabel: label,
    activity,
    to: ACTIVITY_ROUTES[activity],
    search: routeSearch(candidate),
    ctaLabel: ACTIVITY_CTAS[activity],
  };
}

/**
 * Chooses a real next action from the same progress and analytics facts used by
 * the dashboard. Content availability is injected from the existing registry,
 * keeping route validity separate from recommendation priority.
 */
export function resolveHomeRecommendation(
  progress: Progress,
  catalog: HomeLearningCatalog,
  weakTopics: readonly WeakTopicEvidence[] = [],
): HomeRecommendation {
  const latest = latestActivity(progress);

  if (latest) {
    const candidate = candidateFromActivity(latest);
    const activity =
      progress.chapterActivity[chapterActivityKey(candidate.subjectId, candidate.chapterKey)];
    const completionField = ACTIVITY_FIELDS[latest.type];
    if (!activity?.[completionField] && catalog.hasResource(candidate, latest.type)) {
      const label = catalog.getLabel(candidate) ?? latest.label ?? latest.chapterKey;
      return buildRecommendation(candidate, latest.type, catalog, {
        category: "Continue Mission",
        title: `Continue ${chapterTitle(label)} ${ACTIVITY_NAMES[latest.type]}`,
        reason: "Pick up the latest learning activity you have not completed yet.",
      });
    }

    for (const nextType of ["notes", "quiz", "flashcards"] as const) {
      const field = ACTIVITY_FIELDS[nextType];
      if (!activity?.[field] && catalog.hasResource(candidate, nextType)) {
        const label = catalog.getLabel(candidate) ?? latest.label ?? latest.chapterKey;
        return buildRecommendation(candidate, nextType, catalog, {
          category: "Next Chapter Step",
          title: `Complete the ${chapterTitle(label)} ${ACTIVITY_NAMES[nextType]}`,
          reason: `Your latest chapter is ready for its next ${ACTIVITY_NAMES[nextType]} activity.`,
        });
      }
    }
  }

  for (const weakTopic of weakTopics) {
    const candidate =
      catalog.findAvailable(weakTopic.subjectId, weakTopic.chapterKey, "quiz") ??
      catalog.findAvailable(weakTopic.subjectId, weakTopic.chapterKey, "notes");
    if (candidate) {
      const activity: HomeStudyActivity = catalog.hasResource(candidate, "quiz") ? "quiz" : "notes";
      const label = catalog.getLabel(candidate) ?? candidate.chapterKey;
      return buildRecommendation(candidate, activity, catalog, {
        category: "Focus Area",
        title: `Strengthen ${chapterTitle(label)}`,
        reason: `Your recorded quiz average for this chapter is ${weakTopic.avgScore}%.`,
      });
    }
  }

  const startedChapters = Object.entries(progress.chapterActivity).filter(
    ([, activity]) => activity.read || activity.quiz || activity.cards,
  );

  for (const [key, activity] of startedChapters) {
    const separator = key.indexOf(":");
    if (separator < 1 || !activity.read || activity.quiz) continue;
    const subjectId = key.slice(0, separator);
    const chapterKey = key.slice(separator + 1);
    const candidate = catalog.findAvailable(subjectId, chapterKey, "quiz");
    if (candidate) {
      const label = catalog.getLabel(candidate) ?? chapterKey;
      return buildRecommendation(candidate, "quiz", catalog, {
        category: "Finish the Quiz",
        title: `Test yourself on ${chapterTitle(label)}`,
        reason: "You completed the notes. Complete the quiz next.",
      });
    }
  }

  for (const [key, activity] of startedChapters) {
    const separator = key.indexOf(":");
    if (separator < 1 || activity.cards) continue;
    const subjectId = key.slice(0, separator);
    const chapterKey = key.slice(separator + 1);
    const candidate = catalog.findAvailable(subjectId, chapterKey, "flashcards");
    if (candidate) {
      const label = catalog.getLabel(candidate) ?? chapterKey;
      return buildRecommendation(candidate, "flashcards", catalog, {
        category: "Memory Review",
        title: `Review ${chapterTitle(label)}`,
        reason: "Revisit a chapter you started and strengthen recall with flashcards.",
      });
    }
  }

  for (const [key, activity] of startedChapters) {
    const separator = key.indexOf(":");
    if (separator < 1) continue;
    const subjectId = key.slice(0, separator);
    const chapterKey = key.slice(separator + 1);
    for (const nextType of ["notes", "quiz", "flashcards"] as const) {
      const candidate = catalog.findAvailable(subjectId, chapterKey, nextType);
      if (!activity[ACTIVITY_FIELDS[nextType]] && candidate) {
        const label = catalog.getLabel(candidate) ?? chapterKey;
        return buildRecommendation(candidate, nextType, catalog, {
          category: "Complete the Chapter",
          title: `Continue ${chapterTitle(label)}`,
          reason: "Finish another activity in this partially completed chapter.",
        });
      }
    }
  }

  const firstChapter = catalog.firstAvailable("notes");
  if (firstChapter) {
    const label = catalog.getLabel(firstChapter) ?? firstChapter.label ?? firstChapter.chapterKey;
    return buildRecommendation(firstChapter, "notes", catalog, {
      category: "Launch a New Mission",
      title: `Explore ${chapterTitle(label)}`,
      reason: "Start with the next available chapter and begin building your learning progress.",
    });
  }

  return {
    category: "Learning Mission",
    title: "Choose your next subject",
    reason: "Explore the available notes and start a chapter when you are ready.",
    subjectName: "All subjects",
    form: null,
    chapterLabel: null,
    activity: "notes",
    to: "/notes",
    ctaLabel: "Explore Notes",
  };
}
