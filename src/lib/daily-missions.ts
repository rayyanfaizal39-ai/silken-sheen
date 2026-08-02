import type { Progress } from "@/hooks/use-progress";
import { getLocalDateKey, isTimestampOnLocalDate } from "@/lib/local-date";

export type TodaysMissionId = "lesson" | "quiz" | "flashcards";
export type TodaysMissionDestination = "/notes" | "/quizzes" | "/flashcards";

export type TodaysMissionItem = {
  id: TodaysMissionId;
  label: string;
  completed: boolean;
  current: number;
  target: number;
  destination: TodaysMissionDestination;
};

export type TodaysMissionState = {
  dateKey: string;
  completedCount: number;
  missions: TodaysMissionItem[];
  firstIncomplete: TodaysMissionItem | null;
};

function countTodayQuizResults(progress: Progress, dateKey: string): number {
  return (progress.quizHistory ?? []).filter((result) => {
    const timestamp = new Date(result.date).getTime();
    return isTimestampOnLocalDate(timestamp, dateKey);
  }).length;
}

function hasTodayNotesActivity(progress: Progress, dateKey: string): boolean {
  return [progress.lastVisited, ...(progress.recentActivity ?? [])].some(
    (activity) => activity?.type === "notes" && isTimestampOnLocalDate(activity.timestamp, dateKey),
  );
}

export function resolveTodaysMissions(progress: Progress, now = new Date()): TodaysMissionState {
  const dateKey = getLocalDateKey(now);
  const daily = progress.missions?.dailyDate === dateKey ? progress.missions : undefined;
  const lessonCurrent =
    hasTodayNotesActivity(progress, dateKey) || (daily?.readChapters ?? 0) > 0 ? 1 : 0;
  const quizCurrent = Math.max(daily?.quizzesDone ?? 0, countTodayQuizResults(progress, dateKey));
  const flashcardCurrent = Math.max(0, daily?.flashcardReviews ?? 0);

  const missions: TodaysMissionItem[] = [
    {
      id: "lesson",
      label: "Continue one lesson",
      completed: lessonCurrent >= 1,
      current: lessonCurrent,
      target: 1,
      destination: "/notes",
    },
    {
      id: "quiz",
      label: "Complete one quiz",
      completed: quizCurrent >= 1,
      current: Math.min(quizCurrent, 1),
      target: 1,
      destination: "/quizzes",
    },
    {
      id: "flashcards",
      label: "Review 5 flashcards",
      completed: flashcardCurrent >= 5,
      current: Math.min(flashcardCurrent, 5),
      target: 5,
      destination: "/flashcards",
    },
  ];
  const completedCount = missions.filter((mission) => mission.completed).length;

  return {
    dateKey,
    completedCount,
    missions,
    firstIncomplete: missions.find((mission) => !mission.completed) ?? null,
  };
}
