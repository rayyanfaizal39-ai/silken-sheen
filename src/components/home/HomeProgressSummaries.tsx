import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Brain, Layers3, Rocket, Sparkles, Star } from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  CompanionImage,
  getCompanionDisplayName,
  getCompanionMood,
  getCompanionMoodMessage,
  getCompanionSpecies,
} from "@/companion";
import { RankBadge } from "@/components/RankBadge";
import { subjects } from "@/data/subjects-meta";
import { getCompanionLevelProgress, useProgress } from "@/hooks/use-progress";
import {
  getHomeJourneySummary,
  resolveHomeRecommendation,
  type HomeChapterCandidate,
  type HomeForm,
  type HomeLearningCatalog,
  type HomeRecommendation,
  type HomeStudyActivity,
} from "@/lib/home-progress-summary";

type RegistryModule = typeof import("@/content/registry");
type TrackerModule = typeof import("@/lib/tracker");

const FORMS: HomeForm[] = ["Form 1", "Form 2", "Form 3"];

function createLearningCatalog(registry: RegistryModule): HomeLearningCatalog {
  const chapterCache = new Map<
    string,
    ReturnType<RegistryModule["getRegisteredSubjectChapters"]>
  >();
  const chaptersFor = (candidate: Pick<HomeChapterCandidate, "subjectId" | "form">) => {
    const cacheKey = `${candidate.subjectId}:${candidate.form}`;
    const cached = chapterCache.get(cacheKey);
    if (cached) return cached;
    const chapters = registry.getRegisteredSubjectChapters(
      candidate.subjectId,
      undefined,
      candidate.form,
    );
    chapterCache.set(cacheKey, chapters);
    return chapters;
  };

  return {
    hasResource(candidate, activity) {
      return registry.hasResourceContent(
        candidate.subjectId,
        candidate.form,
        candidate.chapterKey,
        activity === "quiz" ? "quiz" : activity,
      );
    },
    getLabel(candidate) {
      return chaptersFor(candidate).find((chapter) => chapter.key === candidate.chapterKey)?.label;
    },
    findAvailable(subjectId, chapterKey, activity) {
      for (const form of FORMS) {
        const candidate = { subjectId, chapterKey, form };
        if (this.hasResource(candidate, activity)) {
          return {
            ...candidate,
            label: this.getLabel(candidate),
          };
        }
      }
      return null;
    },
    firstAvailable(activity) {
      for (const subject of subjects) {
        for (const form of FORMS) {
          const chapter = chaptersFor({ subjectId: subject.id, form }).find(
            (item) =>
              item.selectable &&
              registry.hasResourceContent(
                subject.id,
                form,
                item.key,
                activity === "quiz" ? "quiz" : activity,
              ),
          );
          if (chapter) {
            return {
              subjectId: subject.id,
              form,
              chapterKey: chapter.key,
              label: chapter.label,
            };
          }
        }
      }
      return null;
    },
  };
}

const FALLBACK_CATALOG: HomeLearningCatalog = {
  hasResource: () => false,
  getLabel: () => undefined,
  findAvailable: () => null,
  firstAvailable: () => null,
};

export function HomeProgressSummaries() {
  const { progress } = useProgress();
  const [hydrated, setHydrated] = useState(false);
  const [recommendation, setRecommendation] = useState<HomeRecommendation | null>(null);

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (!hydrated) return;
    let active = true;

    void Promise.all([import("@/content/registry"), import("@/lib/tracker")])
      .then(([registry, tracker]: [RegistryModule, TrackerModule]) => {
        if (!active) return;
        const catalog = createLearningCatalog(registry);
        const weakTopics = tracker.analyzeProgress(progress.quizHistory ?? []).weakSpots;
        setRecommendation(resolveHomeRecommendation(progress, catalog, weakTopics));
      })
      .catch(() => {
        if (active) setRecommendation(resolveHomeRecommendation(progress, FALLBACK_CATALOG));
      });

    return () => {
      active = false;
    };
  }, [hydrated, progress]);

  if (!hydrated) return <ProgressSummarySkeletons />;

  return (
    <section className="home-progress-summaries" aria-label="Student progress summary">
      <div className="home-progress-summaries__top">
        <HomeJourneySummary xp={progress.xp} />
        <HomeCompanionSummary progress={progress} />
      </div>
      {recommendation ? (
        <HomeRecommendedMission recommendation={recommendation} />
      ) : (
        <SummarySkeleton
          className="home-progress-summary--recommendation"
          label="Loading recommendation"
        />
      )}
    </section>
  );
}

function HomeJourneySummary({ xp }: { xp: number }) {
  const journey = getHomeJourneySummary(xp);
  const maximumRank = !journey.nextRank;

  return (
    <section
      className="home-skeleton__card home-progress-summary home-progress-summary--journey"
      aria-labelledby="journey-title"
      style={{ "--summary-accent": journey.rank.color } as CSSProperties}
    >
      <div className="home-progress-summary__art home-progress-summary__rank-art">
        <RankBadge rank={journey.rank} size="var(--summary-rank-size, 100px)" />
      </div>
      <div className="home-progress-summary__body">
        <p className="home-skeleton__section-label">Your Journey</p>
        <div className="home-progress-summary__title-row">
          <h2 id="journey-title">{journey.rank.name}</h2>
          <span>Companion Lv {journey.level}</span>
        </div>
        <div className="home-progress-summary__metric">
          <strong>{journey.xp.toLocaleString()}</strong>
          <span>
            {maximumRank
              ? " Lifetime XP earned"
              : ` / ${journey.xpGoal.toLocaleString()} Lifetime XP`}
          </span>
        </div>
        <div
          className="home-progress-summary__progress"
          role="progressbar"
          aria-label={`Progress through ${journey.rank.name}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={journey.progressPercentage}
        >
          <span style={{ width: `${journey.progressPercentage}%` }} />
        </div>
        <p className="home-progress-summary__status">
          {journey.nextRank ? (
            <>
              Next: <strong>{journey.nextRank.name}</strong> ·{" "}
              {journey.xpRemaining.toLocaleString()} XP until {journey.nextRank.name}
            </>
          ) : (
            <strong>Highest rank achieved</strong>
          )}
        </p>
        <Link className="home-skeleton__secondary-button" to="/dashboard">
          View Journey <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

function HomeCompanionSummary({
  progress,
}: {
  progress: ReturnType<typeof useProgress>["progress"];
}) {
  const companion = progress.companion ?? { id: "nova" as const, level: 1 };
  const species = getCompanionSpecies(companion.id);
  const displayName = getCompanionDisplayName(companion);
  const companionProgress = getCompanionLevelProgress(progress.xp);
  const stage = companionProgress.currentStage;
  const mood = getCompanionMood(progress, stage.id);
  const message = getCompanionMoodMessage(mood, displayName);

  return (
    <section
      className="home-skeleton__card home-progress-summary home-progress-summary--companion"
      aria-labelledby="companion-summary-title"
    >
      <div className="home-progress-summary__art home-progress-summary__companion-art">
        <CompanionImage
          speciesId={companion.id}
          stage={stage.id}
          size="var(--summary-art-size, 92px)"
        />
      </div>
      <div className="home-progress-summary__body">
        <p className="home-skeleton__section-label">Cosmic Companion</p>
        <h2 id="companion-summary-title">{displayName} is ready to explore</h2>
        <p className="home-progress-summary__companion-meta">
          {species.name} · {stage.name} Stage · Companion Level {companionProgress.currentLevel}
        </p>
        <p className="home-progress-summary__message">
          Earn Lifetime XP to help {displayName} grow. {message}
        </p>
        <div
          className="home-progress-summary__progress home-progress-summary__progress--companion"
          role="progressbar"
          aria-label={`${displayName} growth progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={companionProgress.progressPercentage}
        >
          <span style={{ width: `${companionProgress.progressPercentage}%` }} />
        </div>
        <Link className="home-skeleton__secondary-button" to="/companion">
          Visit {displayName} <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

function HomeRecommendedMission({ recommendation }: { recommendation: HomeRecommendation }) {
  const MissionIcon = getRecommendationIcon(recommendation.activity, recommendation.category);
  const metadata = [recommendation.subjectName, recommendation.form, recommendation.chapterLabel]
    .filter(Boolean)
    .join(" · ");

  return (
    <section
      className="home-skeleton__card home-progress-summary home-progress-summary--recommendation"
      aria-labelledby="recommended-mission-title"
    >
      <div className="home-progress-summary__mission-icon" aria-hidden="true">
        <MissionIcon />
      </div>
      <div className="home-progress-summary__body">
        <div className="home-progress-summary__recommendation-labels">
          <p className="home-skeleton__section-label">Recommended Mission</p>
          <span>{recommendation.category}</span>
        </div>
        <h2 id="recommended-mission-title">{recommendation.title}</h2>
        <p className="home-progress-summary__mission-meta">{metadata}</p>
        <p className="home-progress-summary__message">{recommendation.reason}</p>
      </div>
      <Link
        className="home-skeleton__primary-button home-progress-summary__mission-cta"
        to={recommendation.to}
        search={recommendation.search as Record<string, unknown> | undefined}
      >
        {recommendation.ctaLabel} <ArrowRight aria-hidden="true" />
      </Link>
    </section>
  );
}

function getRecommendationIcon(activity: HomeStudyActivity, category: string) {
  if (category === "Focus Area") return Sparkles;
  if (activity === "quiz") return Brain;
  if (activity === "flashcards") return Layers3;
  if (category === "Launch a New Mission") return Rocket;
  return BookOpen;
}

function ProgressSummarySkeletons() {
  return (
    <section
      className="home-progress-summaries"
      aria-label="Loading student progress"
      aria-busy="true"
    >
      <div className="home-progress-summaries__top">
        <SummarySkeleton label="Loading journey" />
        <SummarySkeleton label="Loading companion" />
      </div>
      <SummarySkeleton
        className="home-progress-summary--recommendation"
        label="Loading recommendation"
      />
    </section>
  );
}

function SummarySkeleton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <section
      className={`home-skeleton__card home-progress-summary home-progress-summary--loading ${className}`}
      aria-label={label}
      aria-busy="true"
    >
      <span className="shimmer home-progress-summary__skeleton-art" />
      <span className="shimmer home-progress-summary__skeleton-line" />
      <span className="shimmer home-progress-summary__skeleton-line home-progress-summary__skeleton-line--short" />
    </section>
  );
}
