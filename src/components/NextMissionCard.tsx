import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Sparkles, Brain, GitFork } from "lucide-react";
import { useProgress, chapterActivityKey, type ChapterActivity } from "@/hooks/use-progress";
import { subjects } from "@/data/content";
import { studyHref } from "@/lib/study-routing";

type MissionKind = "notes" | "quiz" | "flashcards" | "mindmaps";

interface Mission {
  kind: MissionKind;
  subjectId: string;
  subjectName: string;
  subjectColor: string;
  form: string;
  label: string;
  cta: string;
  href: string;
  xp: number;
  icon: typeof BookOpen;
}

function pickNextMission(
  lastVisited: ReturnType<typeof useProgress>["progress"]["lastVisited"],
  chapterActivity: Record<string, ChapterActivity>,
): Mission | null {
  // Anchor on most recent chapter the student touched
  const anchor = lastVisited;
  const subject = subjects.find((s) => s.id === (anchor?.subjectId ?? "science"));
  if (!subject) return null;
  const form = anchor?.form ?? "Form 1";
  const chapterKey = anchor?.chapterKey ?? "chapter-1";
  const activity = chapterActivity[chapterActivityKey(subject.id, chapterKey)] ?? {};

  let kind: MissionKind = "notes";
  let label = "Read the chapter notes";
  let cta = "Start reading";
  let icon = BookOpen;
  let xp = 20;

  if (!activity.read) {
    kind = "notes";
    label = "Read the chapter notes";
    cta = "Start reading";
    icon = BookOpen;
  } else if (!activity.cards) {
    kind = "flashcards";
    label = "Drill flashcards to lock it in";
    cta = "Open flashcards";
    icon = Sparkles;
    xp = 25;
  } else if (!activity.quiz) {
    kind = "quiz";
    label = "Take the quiz to earn bonus XP";
    cta = "Start quiz";
    icon = Brain;
    xp = 50;
  } else {
    kind = "mindmaps";
    label = "Review with the mind map";
    cta = "Open mind map";
    icon = GitFork;
    xp = 10;
  }

  return {
    kind,
    subjectId: subject.id,
    subjectName: subject.name,
    subjectColor: subject.color,
    form,
    label: anchor ? `${subject.name} • ${anchor.label}` : `${subject.name} • Chapter 1`,
    cta,
    href: studyHref(kind === "quiz" ? "quizzes" : kind, subject.id, form),
    xp,
    icon,
  };
}

/**
 * Global "Next Mission" card — appears across Home / Notes / Quizzes /
 * Flashcards / Mind Maps so a student always knows the next step.
 */
export function NextMissionCard({ compact = false }: { compact?: boolean }) {
  const { progress } = useProgress();
  const mission = useMemo(
    () => pickNextMission(progress.lastVisited, progress.chapterActivity),
    [progress.lastVisited, progress.chapterActivity],
  );
  if (!mission) return null;
  const Icon = mission.icon;

  return (
    <Link
      to={mission.href}
      className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]/80 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-white/20 ${
        compact ? "p-3 sm:p-4" : "p-4 sm:p-5"
      }`}
    >
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 bg-gradient-to-br ${mission.subjectColor} opacity-[0.18] group-hover:opacity-25 transition-opacity`}
      />
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${mission.subjectColor} shadow-lg`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">
            Next mission • +{mission.xp} XP
          </p>
          <p className="mt-0.5 truncate text-sm font-bold text-white sm:text-base">
            {mission.label}
          </p>
          {!compact && (
            <p className="mt-0.5 truncate text-xs text-white/60">{mission.subjectName} • {mission.form}</p>
          )}
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white transition-all group-hover:bg-white/20">
          {mission.cta}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
