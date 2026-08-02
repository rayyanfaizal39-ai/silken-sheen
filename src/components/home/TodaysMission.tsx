import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Check,
  Circle,
  CircleDashed,
  ClipboardCheck,
  Layers3,
  RefreshCw,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useProgress } from "@/hooks/use-progress";
import { getLocalDateKey } from "@/lib/local-date";
import {
  DAILY_MISSION_POOL,
  DAILY_MISSION_REWARD_XP,
  WEEKLY_MISSION_POOL,
  WEEKLY_MISSION_REWARD_XP,
  createLocalMissionState,
  fetchMissionState,
  flushPendingMissionActivities,
  type DailyMissionDefinition,
  type MissionActivityType,
  type MissionSystemState,
} from "@/lib/mission-system";

type MissionTab = "daily" | "weekly";

const ACTIVITY_META: Record<
  MissionActivityType,
  { label: string; Icon: typeof BookOpen; destination: "/notes" | "/quizzes" | "/flashcards" }
> = {
  lesson: { label: "Lessons", Icon: BookOpen, destination: "/notes" },
  quiz: { label: "Quizzes", Icon: ClipboardCheck, destination: "/quizzes" },
  flashcard: { label: "Flashcards", Icon: Layers3, destination: "/flashcards" },
};

function clampProgress(current: number, target: number) {
  return Math.min(100, Math.round((Math.min(current, target) / target) * 100));
}

export function TodaysMission() {
  const { progress, acceptMissionState } = useProgress();
  const { user, loading: authLoading } = useAuth();
  const [hydrated, setHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<MissionTab>("daily");
  const [remoteState, setRemoteState] = useState<MissionSystemState | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncFailed, setSyncFailed] = useState(false);

  useEffect(() => setHydrated(true), []);

  const localState = useMemo(() => {
    const dateKey = getLocalDateKey();
    const daily = progress.missions?.dailyDate === dateKey ? progress.missions : undefined;
    return createLocalMissionState(user?.id ?? "local-installation", new Date(), {
      lesson: Math.max(0, daily?.readChapters ?? 0),
      quiz: Math.max(0, daily?.quizzesDone ?? 0),
      flashcard: Math.max(0, daily?.flashcardReviews ?? 0),
    });
  }, [progress.missions, user?.id]);

  const refreshMissionState = useCallback(async () => {
    if (!user?.id) return;
    setSyncing(true);
    try {
      await flushPendingMissionActivities(user.id);
      const next = await fetchMissionState(getLocalDateKey());
      setRemoteState(next);
      setSyncFailed(false);
      acceptMissionState(next);
    } catch {
      setSyncFailed(true);
    } finally {
      setSyncing(false);
    }
  }, [acceptMissionState, user?.id]);

  useEffect(() => {
    if (!hydrated || authLoading || !user?.id) return;
    void refreshMissionState();

    const onFocus = () => void refreshMissionState();
    const onVisibility = () => {
      if (document.visibilityState === "visible") void refreshMissionState();
    };
    const onMissionUpdate = (event: Event) => {
      const next = (event as CustomEvent<MissionSystemState>).detail;
      if (!next) return;
      setRemoteState(next);
      setSyncFailed(false);
      acceptMissionState(next);
    };
    window.addEventListener("focus", onFocus);
    window.addEventListener("academy:mission-updated", onMissionUpdate);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("academy:mission-updated", onMissionUpdate);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [acceptMissionState, authLoading, hydrated, refreshMissionState, user?.id]);

  if (!hydrated || authLoading) {
    return (
      <section
        className="home-skeleton__card todays-mission todays-mission--loading"
        aria-label="Loading missions"
        aria-busy="true"
      >
        <span className="shimmer todays-mission__skeleton-line todays-mission__skeleton-line--short" />
        <span className="shimmer todays-mission__skeleton-line" />
        <span className="shimmer todays-mission__skeleton-line" />
        <span className="shimmer todays-mission__skeleton-line todays-mission__skeleton-line--button" />
      </section>
    );
  }

  const state = remoteState?.dateKey === localState.dateKey ? remoteState : localState;
  const dailyMissions = state.dailyMissionIds
    .map((id) => DAILY_MISSION_POOL[id])
    .filter((mission): mission is DailyMissionDefinition => Boolean(mission));
  const completedDaily = dailyMissions.filter(
    (mission) => state.counters.daily[mission.activity] >= mission.target,
  ).length;
  const dailyPercent = Math.round((completedDaily / Math.max(1, dailyMissions.length)) * 100);
  const firstDailyIncomplete = dailyMissions.find(
    (mission) => state.counters.daily[mission.activity] < mission.target,
  );

  const weekly = WEEKLY_MISSION_POOL[state.weeklyMissionId] ?? WEEKLY_MISSION_POOL.weekly_balanced;
  const weeklyActivities = (Object.keys(ACTIVITY_META) as MissionActivityType[]).map(
    (activity) => ({
      activity,
      current: state.counters.weekly[activity],
      target: weekly.targets[activity],
    }),
  );
  const weeklyComplete = weeklyActivities.every(({ current, target }) => current >= target);
  const weeklyPercent = Math.round(
    weeklyActivities.reduce((sum, item) => sum + clampProgress(item.current, item.target), 0) /
      weeklyActivities.length,
  );
  const nextWeeklyActivity = [...weeklyActivities]
    .filter(({ current, target }) => current < target)
    .sort((a, b) => a.current / a.target - b.current / b.target)[0];

  return (
    <section className="home-skeleton__card todays-mission" aria-labelledby="todays-mission-title">
      <span className="todays-mission__paper-tab" aria-hidden="true" />
      <div className="todays-mission__console">
        <div className="todays-mission__content">
          <header className="todays-mission__header">
            <div className="todays-mission__identity">
              <span className="todays-mission__icon" aria-hidden="true">
                <Star />
              </span>
              <div>
                <p className="home-skeleton__section-label">Today&apos;s Mission</p>
                <h2 id="todays-mission-title">Complete today&apos;s objectives</h2>
              </div>
            </div>
            <button
              className="todays-mission__sync"
              type="button"
              onClick={() => void refreshMissionState()}
              disabled={syncing || !user}
              aria-label="Sync mission progress"
              title={syncFailed ? "Sync failed — retry" : "Sync mission progress"}
            >
              <RefreshCw className={syncing ? "is-spinning" : undefined} aria-hidden="true" />
              <span>{syncFailed ? "Retry" : syncing ? "Syncing" : "Synced"}</span>
            </button>
          </header>

          <div className="todays-mission__tabs" role="tablist" aria-label="Mission period">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "daily"}
              className={activeTab === "daily" ? "is-active" : undefined}
              onClick={() => setActiveTab("daily")}
            >
              Daily
              <span>
                {completedDaily}/{dailyMissions.length}
              </span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "weekly"}
              className={activeTab === "weekly" ? "is-active" : undefined}
              onClick={() => setActiveTab("weekly")}
            >
              Weekly
              {state.weeklyRewardClaimed ? (
                <Check aria-hidden="true" />
              ) : (
                <span>{weeklyPercent}%</span>
              )}
            </button>
          </div>

          {activeTab === "daily" ? (
            <div className="todays-mission__panel" role="tabpanel">
              <div className="todays-mission__panel-heading">
                <p>Fresh objectives, shuffled for {state.dateKey}.</p>
                <span>
                  <Sparkles aria-hidden="true" /> New set tomorrow
                </span>
              </div>
              <ul className="todays-mission__tasks" aria-label="Today's objectives">
                {dailyMissions.map((mission, index) => {
                  const current = Math.min(state.counters.daily[mission.activity], mission.target);
                  const complete = current >= mission.target;
                  const inProgress = current > 0 && !complete;
                  const StatusIcon = complete ? Check : inProgress ? CircleDashed : Circle;
                  return (
                    <li
                      className={
                        complete ? "todays-mission__task is-complete" : "todays-mission__task"
                      }
                      key={mission.id}
                    >
                      <span className="todays-mission__task-number" aria-hidden="true">
                        {index + 1}
                      </span>
                      <StatusIcon className="todays-mission__task-status" aria-hidden="true" />
                      <span className="todays-mission__task-copy">
                        <strong>{mission.label}</strong>
                        <small>{mission.detail}</small>
                      </span>
                      <span className="todays-mission__task-count">
                        {current}/{mission.target}
                      </span>
                      <span className="sr-only">
                        {complete ? "Complete" : inProgress ? "In progress" : "Not started"}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <MissionProgressBar label="Daily mission progress" value={dailyPercent} />
              <MissionFooter
                reward={DAILY_MISSION_REWARD_XP}
                complete={completedDaily === dailyMissions.length}
                claimed={state.dailyRewardClaimed}
                destination={firstDailyIncomplete?.destination}
              />
            </div>
          ) : (
            <div className="todays-mission__panel" role="tabpanel">
              <div className="todays-mission__weekly-heading">
                <div>
                  <p className="home-skeleton__section-label">Week of {state.weekKey}</p>
                  <h3>{weekly.title}</h3>
                  <span>{weekly.detail}</span>
                </div>
                <strong>{weeklyPercent}%</strong>
              </div>
              <ul className="todays-mission__weekly-grid" aria-label="Weekly mission objectives">
                {weeklyActivities.map(({ activity, current, target }) => {
                  const meta = ACTIVITY_META[activity];
                  const complete = current >= target;
                  return (
                    <li className={complete ? "is-complete" : undefined} key={activity}>
                      <meta.Icon aria-hidden="true" />
                      <span>
                        <strong>{meta.label}</strong>
                        <small>
                          {Math.min(current, target)} / {target}
                        </small>
                      </span>
                      {complete ? <Check aria-hidden="true" /> : null}
                    </li>
                  );
                })}
              </ul>
              <MissionProgressBar label="Weekly mission progress" value={weeklyPercent} />
              <MissionFooter
                reward={WEEKLY_MISSION_REWARD_XP}
                complete={weeklyComplete}
                claimed={state.weeklyRewardClaimed}
                destination={
                  nextWeeklyActivity
                    ? ACTIVITY_META[nextWeeklyActivity.activity].destination
                    : undefined
                }
              />
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        className={
          activeTab === "weekly"
            ? "todays-mission__weekly-strip is-active"
            : "todays-mission__weekly-strip"
        }
        onClick={() => setActiveTab("weekly")}
        aria-label={`Open weekly mission, ${weeklyPercent}% complete`}
      >
        <span className="todays-mission__weekly-strip-icon" aria-hidden="true">
          <Trophy />
        </span>
        <span className="todays-mission__weekly-strip-copy">
          <small>Weekly Mission</small>
          <strong>{weekly.title}</strong>
        </span>
        <span className="todays-mission__weekly-strip-progress" aria-hidden="true">
          <span style={{ width: `${weeklyPercent}%` }} />
        </span>
        <span className="todays-mission__weekly-strip-percent">{weeklyPercent}%</span>
        <span className="todays-mission__weekly-strip-reward">
          <Star aria-hidden="true" /> +{WEEKLY_MISSION_REWARD_XP.toLocaleString()} XP
        </span>
        <ArrowRight aria-hidden="true" />
      </button>
    </section>
  );
}

function MissionProgressBar({ label, value }: { label: string; value: number }) {
  return (
    <div
      className="todays-mission__progress"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <span style={{ width: `${value}%` }} />
    </div>
  );
}

function MissionFooter({
  reward,
  complete,
  claimed,
  destination,
}: {
  reward: number;
  complete: boolean;
  claimed: boolean;
  destination?: "/notes" | "/quizzes" | "/flashcards";
}) {
  return (
    <footer className="todays-mission__footer">
      <span className={claimed ? "todays-mission__reward is-claimed" : "todays-mission__reward"}>
        <Star aria-hidden="true" />
        {claimed ? "Reward claimed" : complete ? "Claiming reward" : "Full-set reward"}
        <strong>+{reward.toLocaleString()} XP</strong>
      </span>
      {destination ? (
        <Link className="todays-mission__cta" to={destination}>
          Continue Mission <ArrowRight aria-hidden="true" />
        </Link>
      ) : (
        <span className="todays-mission__cta todays-mission__cta--complete">
          {claimed ? "Mission Complete" : "Finalising"} <Check aria-hidden="true" />
        </span>
      )}
    </footer>
  );
}
