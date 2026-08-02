import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Brain, Layers3 } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { HomeSectionSkeleton } from "@/components/home/HomeSectionSkeleton";
import { SubjectWorldArtwork } from "@/components/home/SubjectWorldArtwork";
import {
  chapterActivityKey,
  chapterProgressPct,
  type LastVisited,
  type RecentActivity,
  useProgress,
} from "@/hooks/use-progress";
import { subjects } from "@/data/subjects-meta";
import { getSubjectWorldArtwork, SUBJECT_WORLD_FALLBACK_ACCENT } from "@/lib/subject-world-artwork";

const ACTIVITY_ROUTES = {
  notes: "/notes",
  flashcards: "/flashcards",
  quiz: "/quizzes",
} as const;

const ACTIVITY_LABELS = {
  notes: "Notes",
  flashcards: "Flashcards",
  quiz: "Quiz",
} as const;

const RESUME_LABELS = {
  notes: "Resume Notes",
  flashcards: "Review Flashcards",
  quiz: "Continue Quiz",
} as const;

function getCanonicalLabel(activity: LastVisited, allActivity: RecentActivity[]) {
  if (activity.label && activity.label !== activity.chapterKey) return activity.label;
  return (
    allActivity.find(
      (item) =>
        item.subjectId === activity.subjectId &&
        item.chapterKey === activity.chapterKey &&
        item.label &&
        item.label !== item.chapterKey,
    )?.label ?? activity.chapterKey
  );
}

function getChapterDisplay(chapterKey: string, label: string) {
  const chapterMatch = chapterKey.match(/(?:chapter|bab)\s*(\d+)/i);
  const chapterNumber = chapterMatch?.[1];
  const title = label.replace(/^(?:chapter|bab)\s*\d+\s*[:\-–—]?\s*/i, "").trim();

  return {
    chapterLabel: chapterNumber ? `Chapter ${chapterNumber}` : chapterKey,
    chapterTitle: title || label,
  };
}

function getNextActivity(type: RecentActivity["type"]) {
  if (type === "notes") return { type: "quiz" as const, label: "Take the quiz" };
  if (type === "quiz") return { type: "flashcards" as const, label: "Review flashcards" };
  return { type: "notes" as const, label: "Review the notes" };
}

export function HomeContinueLearning() {
  const { progress } = useProgress();
  const [registryLabel, setRegistryLabel] = useState<string | null>(null);
  // Progress lives in client storage; show a skeleton until it's readable so
  // this non-critical section can keep loading after the boot loader fades.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const recentActivity = progress.recentActivity;
  const latest =
    [progress.lastVisited, ...(recentActivity ?? [])]
      .filter((item): item is LastVisited => Boolean(item))
      .sort((a, b) => b.timestamp - a.timestamp)[0] ?? null;

  useEffect(() => {
    let active = true;
    setRegistryLabel(null);
    if (!latest || getCanonicalLabel(latest, recentActivity ?? []) !== latest.chapterKey) {
      return () => {
        active = false;
      };
    }

    void import("@/content/registry").then(({ getRegisteredSubjectChapters }) => {
      if (!active) return;
      const form = latest.form ?? "Form 1";
      const chapter = getRegisteredSubjectChapters(latest.subjectId, undefined, form).find(
        (item) => item.key === latest.chapterKey,
      );
      setRegistryLabel(chapter?.label ?? null);
    });

    return () => {
      active = false;
    };
  }, [latest, recentActivity]);

  if (!hydrated) {
    return <HomeSectionSkeleton label="Loading continue learning" />;
  }

  if (!latest) {
    return (
      <section
        className="home-skeleton__card home-continue-learning home-continue-learning--empty"
        aria-labelledby="continue-learning-title"
      >
        <SubjectWorldArtwork className="home-continue-learning__artwork" />
        <div className="home-continue-learning__details">
          <p className="home-skeleton__section-label">Continue Learning</p>
          <h2 id="continue-learning-title">Start your first learning mission</h2>
          <p className="home-continue-learning__empty-copy">
            Choose a subject and begin exploring your first chapter.
          </p>
          <Link className="home-skeleton__primary-button" to="/subjects">
            Explore Subjects
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    );
  }

  const worldArtwork = getSubjectWorldArtwork(latest.subjectId);
  const subject = subjects.find(
    (item) => item.id === (worldArtwork?.canonicalId ?? latest.subjectId),
  );
  const subjectName = subject?.name ?? latest.subjectId;
  const form = latest.form ?? "Form 1";
  const canonicalLabel = registryLabel ?? getCanonicalLabel(latest, recentActivity ?? []);
  const { chapterLabel, chapterTitle } = getChapterDisplay(latest.chapterKey, canonicalLabel);
  const activity =
    progress.chapterActivity[chapterActivityKey(latest.subjectId, latest.chapterKey)];
  const progressPct = activity ? chapterProgressPct(activity) : null;
  const route = ACTIVITY_ROUTES[latest.type];
  const formNumber = Number(form.match(/\d/)?.[0] ?? 1);
  const routeSearch = {
    subject: latest.subjectId,
    form: formNumber,
    chapter: latest.chapterKey,
  };
  const nextActivity = getNextActivity(latest.type);
  const nextRoute = ACTIVITY_ROUTES[nextActivity.type];
  const accent = worldArtwork?.accent ?? SUBJECT_WORLD_FALLBACK_ACCENT;
  const ActivityIcon =
    latest.type === "notes" ? BookOpen : latest.type === "quiz" ? Brain : Layers3;

  return (
    <section
      className="home-skeleton__card home-continue-learning"
      aria-labelledby="continue-learning-title"
      style={{ "--home-continue-accent": accent } as CSSProperties}
    >
      <SubjectWorldArtwork
        key={worldArtwork?.src ?? String(latest.subjectId)}
        className="home-continue-learning__artwork"
        subject={latest.subjectId}
      />

      <div className="home-continue-learning__details">
        <p className="home-skeleton__section-label">Continue Learning</p>
        <p className="home-continue-learning__subject">
          {subjectName} <span>·</span> {form}
        </p>
        <p className="home-continue-learning__chapter">{chapterLabel}</p>
        <h2 id="continue-learning-title">{chapterTitle}</h2>

        <div className="home-continue-learning__activity">
          <ActivityIcon aria-hidden="true" />
          <span>
            Last activity: <strong>{ACTIVITY_LABELS[latest.type]}</strong>
          </span>
        </div>

        {progressPct !== null ? (
          <div className="home-continue-learning__progress">
            <div>
              <span>Chapter progress</span>
              <strong>{progressPct}%</strong>
            </div>
            <div
              className="home-continue-learning__progress-track"
              role="progressbar"
              aria-label="Chapter progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPct}
            >
              <span style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        ) : (
          <p className="home-continue-learning__resume-note">Continue where you left off</p>
        )}

        <div className="home-continue-learning__actions">
          <Link
            className="home-skeleton__primary-button"
            to={route}
            search={routeSearch as Record<string, unknown>}
          >
            {RESUME_LABELS[latest.type]}
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link
            className="home-continue-learning__next"
            to={nextRoute}
            search={routeSearch as Record<string, unknown>}
          >
            Next up: {nextActivity.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
