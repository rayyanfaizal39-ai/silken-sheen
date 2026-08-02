import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Circle, CircleDashed, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useProgress } from "@/hooks/use-progress";
import { resolveTodaysMissions } from "@/lib/daily-missions";

export function TodaysMission() {
  const { progress } = useProgress();
  const { loading: authLoading } = useAuth();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  if (!hydrated || authLoading) {
    return (
      <section
        className="home-skeleton__card todays-mission todays-mission--loading"
        aria-label="Loading today's mission"
        aria-busy="true"
      >
        <span className="shimmer todays-mission__skeleton-line todays-mission__skeleton-line--short" />
        <span className="shimmer todays-mission__skeleton-line" />
        <span className="shimmer todays-mission__skeleton-line" />
        <span className="shimmer todays-mission__skeleton-line todays-mission__skeleton-line--button" />
      </section>
    );
  }

  const state = resolveTodaysMissions(progress);
  const progressPercent = Math.round((state.completedCount / state.missions.length) * 100);
  const firstIncomplete = state.firstIncomplete;
  const latest = progress.lastVisited;
  const lessonSearch = latest
    ? {
        subject: latest.subjectId,
        form: Number(latest.form?.match(/\d/)?.[0] ?? 1),
        chapter: latest.chapterKey,
      }
    : undefined;

  return (
    <section className="home-skeleton__card todays-mission" aria-labelledby="todays-mission-title">
      <header className="todays-mission__header">
        <div className="todays-mission__identity">
          <span className="todays-mission__icon" aria-hidden="true">
            <Target />
          </span>
          <div>
            <p className="home-skeleton__section-label">Today&apos;s Mission</p>
            <h2 id="todays-mission-title">Complete today&apos;s objectives</h2>
          </div>
        </div>
        <strong
          className="todays-mission__count"
          aria-label={`${state.completedCount} of 3 missions complete`}
        >
          {state.completedCount} / 3
        </strong>
      </header>

      <p className="todays-mission__description">Keep your learning momentum alive.</p>

      <ul className="todays-mission__tasks" aria-label="Today's objectives">
        {state.missions.map((mission) => {
          const inProgress =
            mission.id === "flashcards" && mission.current > 0 && !mission.completed;
          const StatusIcon = mission.completed ? Check : inProgress ? CircleDashed : Circle;
          const progressDetail =
            mission.id === "flashcards" && !mission.completed
              ? `${mission.current} / ${mission.target}`
              : null;

          return (
            <li
              className={
                mission.completed ? "todays-mission__task is-complete" : "todays-mission__task"
              }
              key={mission.id}
            >
              <StatusIcon aria-hidden="true" />
              <span>{mission.label}</span>
              {progressDetail ? <small>{progressDetail}</small> : null}
              <span className="sr-only">
                {mission.completed ? "Complete" : inProgress ? "In progress" : "Incomplete"}
              </span>
            </li>
          );
        })}
      </ul>

      <div
        className="todays-mission__progress"
        role="progressbar"
        aria-label="Today's mission progress"
        aria-valuemin={0}
        aria-valuemax={3}
        aria-valuenow={state.completedCount}
      >
        <span style={{ width: `${progressPercent}%` }} />
      </div>

      <footer className="todays-mission__footer">
        <span className="todays-mission__reward">
          Daily reward: <strong>+120 XP</strong>
        </span>
        {firstIncomplete ? (
          <Link
            className="todays-mission__cta"
            to={firstIncomplete.destination}
            search={firstIncomplete.id === "lesson" ? lessonSearch : undefined}
          >
            Continue Mission
            <ArrowRight aria-hidden="true" />
          </Link>
        ) : (
          <span className="todays-mission__cta todays-mission__cta--complete">
            Mission Complete <Check aria-hidden="true" />
          </span>
        )}
      </footer>
    </section>
  );
}
