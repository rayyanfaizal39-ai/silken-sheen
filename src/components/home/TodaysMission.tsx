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
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useProgress } from "@/hooks/use-progress";
import { getLocalDateKey } from "@/lib/local-date";
import {
  DAILY_COMPLETION_REWARD_XP,
  DAILY_MISSION_POOL,
  DAILY_OBJECTIVE_REWARD_XP,
  WEEKLY_COMPLETION_REWARD_XP,
  WEEKLY_MISSION_POOL,
  WEEKLY_OBJECTIVE_REWARD_XP,
  createLocalMissionState,
  fetchMissionState,
  flushPendingMissionActivities,
  getMissionProgress,
  isMissionComplete,
  type MissionActivityType,
  type MissionDefinition,
  type MissionReadyEvent,
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

function requestClaim(event: MissionReadyEvent) {
  window.dispatchEvent(
    new CustomEvent<MissionReadyEvent>("academy:mission-ready", { detail: event }),
  );
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
    const onVisibility = () => document.visibilityState === "visible" && void refreshMissionState();
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
  const dailyMissions = state.dailyMissionIds.map((id) => DAILY_MISSION_POOL[id]).filter(Boolean);
  const weeklyMissions = state.weeklyMissionIds
    .map((id) => WEEKLY_MISSION_POOL[id])
    .filter(Boolean);
  const completedDaily = dailyMissions.filter((mission) =>
    isMissionComplete(mission, state.counters.daily),
  ).length;
  const claimedDaily = dailyMissions.filter((mission) =>
    state.claimedDailyMissionIds.includes(mission.id),
  ).length;
  const completedWeekly = weeklyMissions.filter((mission) =>
    isMissionComplete(mission, state.counters.weekly),
  ).length;
  const claimedWeekly = weeklyMissions.filter((mission) =>
    state.claimedWeeklyMissionIds.includes(mission.id),
  ).length;
  const dailyPercent = Math.round((completedDaily / Math.max(1, dailyMissions.length)) * 100);
  const weeklyPercent = Math.round(
    weeklyMissions.reduce(
      (sum, mission) =>
        sum + clampProgress(getMissionProgress(mission, state.counters.weekly), mission.target),
      0,
    ) / Math.max(1, weeklyMissions.length),
  );
  const pendingRewards =
    dailyMissions.filter(
      (mission) =>
        isMissionComplete(mission, state.counters.daily) &&
        !state.claimedDailyMissionIds.includes(mission.id),
    ).length +
    weeklyMissions.filter(
      (mission) =>
        isMissionComplete(mission, state.counters.weekly) &&
        !state.claimedWeeklyMissionIds.includes(mission.id),
    ).length +
    (claimedDaily === 3 && !state.dailyBonusClaimed ? 1 : 0) +
    (claimedWeekly === 3 && !state.weeklyBonusClaimed ? 1 : 0);

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
                <h2 id="todays-mission-title">Complete, claim, level up</h2>
                {pendingRewards > 0 ? (
                  <span className="todays-mission__pending">
                    <Zap aria-hidden="true" /> {pendingRewards} Reward
                    {pendingRewards === 1 ? "" : "s"} Ready
                  </span>
                ) : null}
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
              Daily <span>{claimedDaily}/3 claimed</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "weekly"}
              className={activeTab === "weekly" ? "is-active" : undefined}
              onClick={() => setActiveTab("weekly")}
            >
              Weekly <span>{claimedWeekly}/3 claimed</span>
            </button>
          </div>

          {activeTab === "daily" ? (
            <MissionPanel
              missions={dailyMissions}
              counters={state.counters.daily}
              claimedIds={state.claimedDailyMissionIds}
              objectiveReward={DAILY_OBJECTIVE_REWARD_XP}
              claimKind="daily_objective"
              dateKey={state.dateKey}
              progress={dailyPercent}
              progressLabel="Daily mission progress"
              bonusTitle="Daily Completion Bonus"
              bonusReward={DAILY_COMPLETION_REWARD_XP}
              bonusClaimKind="daily_bonus"
              bonusClaimed={state.dailyBonusClaimed}
              periodLabel={`Fresh objectives for ${state.dateKey}`}
            />
          ) : (
            <MissionPanel
              missions={weeklyMissions}
              counters={state.counters.weekly}
              claimedIds={state.claimedWeeklyMissionIds}
              objectiveReward={WEEKLY_OBJECTIVE_REWARD_XP}
              claimKind="weekly_objective"
              dateKey={state.dateKey}
              progress={weeklyPercent}
              progressLabel="Weekly mission progress"
              bonusTitle="Weekly Completion Bonus"
              bonusReward={WEEKLY_COMPLETION_REWARD_XP}
              bonusClaimKind="weekly_bonus"
              bonusClaimed={state.weeklyBonusClaimed}
              periodLabel={`Week of ${state.weekKey}`}
            />
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
        aria-label={`Open weekly missions, ${claimedWeekly} of 3 rewards claimed`}
      >
        <span className="todays-mission__weekly-strip-icon" aria-hidden="true">
          <Trophy />
        </span>
        <span className="todays-mission__weekly-strip-copy">
          <small>Weekly Missions</small>
          <strong>
            {pendingRewards > 0
              ? "Rewards may be ready"
              : `${completedWeekly}/3 objectives complete`}
          </strong>
        </span>
        <span className="todays-mission__weekly-strip-progress" aria-hidden="true">
          <span style={{ width: `${weeklyPercent}%` }} />
        </span>
        <span className="todays-mission__weekly-strip-percent">{weeklyPercent}%</span>
        <span className="todays-mission__weekly-strip-reward">
          <Star aria-hidden="true" /> Bonus +{WEEKLY_COMPLETION_REWARD_XP.toLocaleString()} XP
        </span>
        <ArrowRight aria-hidden="true" />
      </button>
    </section>
  );
}

function MissionPanel({
  missions,
  counters,
  claimedIds,
  objectiveReward,
  claimKind,
  dateKey,
  progress,
  progressLabel,
  bonusTitle,
  bonusReward,
  bonusClaimKind,
  bonusClaimed,
  periodLabel,
}: {
  missions: MissionDefinition[];
  counters: MissionSystemState["counters"]["daily"];
  claimedIds: string[];
  objectiveReward: number;
  claimKind: "daily_objective" | "weekly_objective";
  dateKey: string;
  progress: number;
  progressLabel: string;
  bonusTitle: string;
  bonusReward: number;
  bonusClaimKind: "daily_bonus" | "weekly_bonus";
  bonusClaimed: boolean;
  periodLabel: string;
}) {
  const claimedCount = missions.filter((mission) => claimedIds.includes(mission.id)).length;
  const bonusReady = claimedCount === missions.length && missions.length === 3;
  const firstIncomplete = missions.find((mission) => !isMissionComplete(mission, counters));

  return (
    <div className="todays-mission__panel" role="tabpanel">
      <div className="todays-mission__panel-heading">
        <p>{periodLabel}</p>
        <span>
          <Sparkles aria-hidden="true" /> Stable until reset
        </span>
      </div>
      <ul className="todays-mission__tasks" aria-label="Mission objectives">
        {missions.map((mission, index) => {
          const current = getMissionProgress(mission, counters);
          const complete = isMissionComplete(mission, counters);
          const claimed = claimedIds.includes(mission.id);
          const inProgress = current > 0 && !complete;
          const StatusIcon = claimed || complete ? Check : inProgress ? CircleDashed : Circle;
          return (
            <li
              className={`todays-mission__task${complete ? " is-complete" : ""}${claimed ? " is-claimed" : ""}`}
              key={mission.id}
            >
              <span className="todays-mission__task-number" aria-hidden="true">
                {index + 1}
              </span>
              <StatusIcon className="todays-mission__task-status" aria-hidden="true" />
              <span className="todays-mission__task-copy">
                <strong>{mission.label}</strong>
                <small>
                  {claimed
                    ? `Claimed · +${objectiveReward} XP earned`
                    : complete
                      ? "Mission complete · Reward ready"
                      : mission.detail}
                </small>
              </span>
              <span className="todays-mission__task-count">
                {current}/{mission.target}
              </span>
              <span className="todays-mission__objective-reward">+{objectiveReward} XP</span>
              {complete && !claimed ? (
                <button
                  type="button"
                  className="todays-mission__claim"
                  aria-label={`Claim ${objectiveReward} XP for ${mission.label}`}
                  onClick={() =>
                    requestClaim({
                      kind: claimKind,
                      missionId: mission.id,
                      title: mission.label,
                      rewardXp: objectiveReward,
                      dateKey,
                    })
                  }
                >
                  Claim <Zap aria-hidden="true" />
                </button>
              ) : null}
              <span className="sr-only">
                {claimed
                  ? "Claimed"
                  : complete
                    ? "Reward ready"
                    : inProgress
                      ? "In progress"
                      : "Not started"}
              </span>
            </li>
          );
        })}
      </ul>
      <MissionProgressBar label={progressLabel} value={progress} />
      <footer className="todays-mission__footer">
        <span className={`todays-mission__reward${bonusClaimed ? " is-claimed" : ""}`}>
          <Star aria-hidden="true" />
          {bonusClaimed ? "Bonus claimed" : bonusReady ? "Bonus reward ready" : bonusTitle}
          <strong>+{bonusReward.toLocaleString()} XP</strong>
          {!bonusReady && !bonusClaimed ? (
            <small>{claimedCount} / 3 missions claimed · Locked</small>
          ) : null}
        </span>
        {bonusReady && !bonusClaimed ? (
          <button
            type="button"
            className="todays-mission__cta todays-mission__cta--claim"
            aria-label={`Claim ${bonusReward} XP ${bonusTitle}`}
            onClick={() =>
              requestClaim({
                kind: bonusClaimKind,
                missionId: null,
                title: bonusTitle,
                rewardXp: bonusReward,
                dateKey,
              })
            }
          >
            Claim +{bonusReward.toLocaleString()} XP <Zap aria-hidden="true" />
          </button>
        ) : firstIncomplete ? (
          <Link className="todays-mission__cta" to={firstIncomplete.destination}>
            Continue Mission <ArrowRight aria-hidden="true" />
          </Link>
        ) : (
          <span className="todays-mission__cta todays-mission__cta--complete">
            {bonusClaimed ? "All Claimed" : "Rewards Claimed"} <Check aria-hidden="true" />
          </span>
        )}
      </footer>
    </div>
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
