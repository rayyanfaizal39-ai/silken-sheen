import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, LoaderCircle, Rocket, Sparkles, Star, Trophy, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CompanionImage, getCompanionDisplayName } from "@/companion";
import { getCompanionLevelProgress, getNextRank, getRank, useProgress } from "@/hooks/use-progress";
import {
  claimMissionReward,
  type MissionReadyEvent,
  type MissionSystemState,
} from "@/lib/mission-system";

type CelebrationState =
  | { phase: "ready"; event: MissionReadyEvent }
  | { phase: "claimed"; event: MissionReadyEvent; result: MissionSystemState };

const PARTICLES = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  x: ((index * 47) % 220) - 110,
  y: -70 - ((index * 29) % 110),
  delay: (index % 4) * 0.05,
}));

export function MissionRewardCelebration() {
  const { progress, acceptMissionState, syncProgressNow } = useProgress();
  const reducedMotion = useReducedMotion();
  const [current, setCurrent] = useState<CelebrationState | null>(null);
  const [queue, setQueue] = useState<MissionReadyEvent[]>([]);
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onReady = (event: Event) => {
      const detail = (event as CustomEvent<MissionReadyEvent>).detail;
      if (!detail) return;
      setCurrent((active) => {
        if (!active) return { phase: "ready", event: detail };
        if (
          active.event.kind === detail.kind &&
          active.event.missionId === detail.missionId &&
          active.event.dateKey === detail.dateKey
        ) {
          return active;
        }
        setQueue((items) =>
          items.some(
            (item) =>
              item.kind === detail.kind &&
              item.missionId === detail.missionId &&
              item.dateKey === detail.dateKey,
          )
            ? items
            : [...items, detail],
        );
        return active;
      });
    };
    window.addEventListener("academy:mission-ready", onReady);
    return () => window.removeEventListener("academy:mission-ready", onReady);
  }, []);

  const close = useCallback(() => {
    setError("");
    setClaiming(false);
    setQueue((items) => {
      const [next, ...rest] = items;
      setCurrent(next ? { phase: "ready", event: next } : null);
      return rest;
    });
  }, []);

  const claim = useCallback(async () => {
    if (!current || current.phase !== "ready" || claiming) return;
    setClaiming(true);
    setError("");
    try {
      await syncProgressNow();
      const result = await claimMissionReward({
        kind: current.event.kind,
        missionId: current.event.missionId ?? undefined,
        dateKey: current.event.dateKey,
      });
      acceptMissionState(result);
      if (!result.claimedReward || result.awardedXp <= 0) {
        close();
        return;
      }
      setCurrent({ phase: "claimed", event: current.event, result });
    } catch (claimError) {
      setError(
        claimError instanceof Error ? claimError.message : "Reward claim failed. Try again.",
      );
    } finally {
      setClaiming(false);
    }
  }, [acceptMissionState, claiming, close, current, syncProgressNow]);

  const previousXp = current?.phase === "claimed" ? (current.result.previousXp ?? 0) : progress.xp;
  const totalXp =
    current?.phase === "claimed" ? (current.result.totalXp ?? previousXp) : progress.xp;
  const fromRank = getRank(previousXp);
  const toRank = getRank(totalXp);
  const nextRank = getNextRank(totalXp);
  const fromCompanion = getCompanionLevelProgress(previousXp);
  const toCompanion = getCompanionLevelProgress(totalXp);
  const rankUp = current?.phase === "claimed" && fromRank.id !== toRank.id;
  const evolution =
    current?.phase === "claimed" && fromCompanion.currentStage.id !== toCompanion.currentStage.id;
  const companion = progress.companion ?? { id: "nova" as const, level: 1 };
  const companionName = getCompanionDisplayName(companion);
  const isBonus = current?.event.kind.endsWith("bonus") ?? false;

  const heading = useMemo(() => {
    if (!current) return "";
    if (current.phase === "ready") return isBonus ? "Bonus Reward Ready" : "Mission Complete!";
    if (rankUp && evolution) return "Incredible Progress!";
    if (rankUp) return "Rank Up!";
    if (evolution) return "Companion Evolution!";
    return isBonus ? "Bonus Claimed!" : "Mission Reward Claimed";
  }, [current, evolution, isBonus, rankUp]);

  return (
    <Dialog open={Boolean(current)} onOpenChange={(open) => !open && close()}>
      <DialogContent
        className="max-h-[min(92dvh,46rem)] w-[calc(100vw-2rem)] max-w-md overflow-y-auto rounded-[2rem] border border-violet-300/25 bg-[#09071F]/95 p-0 text-white shadow-[0_30px_100px_rgba(49,46,129,0.65)] backdrop-blur-2xl sm:rounded-[2rem]"
        onEscapeKeyDown={() => !claiming && close()}
      >
        <AnimatePresence mode="wait">
          {current ? (
            <motion.div
              key={`${current.phase}:${current.event.kind}:${current.event.missionId ?? "bonus"}`}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: -6 }}
              transition={{ duration: reducedMotion ? 0.12 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative isolate overflow-hidden px-5 pb-6 pt-8 text-center sm:px-7"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-52 bg-[radial-gradient(circle_at_50%_0%,rgba(167,139,250,0.42),transparent_68%)]" />
              {!reducedMotion && current.phase === "claimed" ? (
                <div
                  className="pointer-events-none absolute inset-x-0 top-40 -z-10"
                  aria-hidden="true"
                >
                  {PARTICLES.map((particle) => (
                    <motion.span
                      key={particle.id}
                      className="absolute left-1/2 top-0 h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(253,224,71,0.9)]"
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                      animate={{
                        x: particle.x,
                        y: particle.y,
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.7],
                      }}
                      transition={{ duration: 0.8, delay: particle.delay, ease: "easeOut" }}
                    />
                  ))}
                </div>
              ) : null}

              <motion.div
                animate={reducedMotion ? undefined : { scale: [1, 1.08, 1], rotate: [0, -3, 3, 0] }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-200/30 bg-gradient-to-br from-amber-300/25 to-violet-500/20 shadow-[0_0_36px_rgba(251,191,36,0.22)]"
              >
                {isBonus ? (
                  <Trophy className="h-8 w-8 text-amber-300" />
                ) : (
                  <Rocket className="h-8 w-8 text-violet-200" />
                )}
              </motion.div>

              <p className="mt-5 text-[11px] font-black uppercase tracking-[0.24em] text-violet-200/70">
                {current.phase === "ready" ? "Reward ready" : "XP secured"}
              </p>
              <DialogTitle className="mt-2 font-display text-2xl font-black leading-tight sm:text-3xl">
                {heading}
              </DialogTitle>
              <DialogDescription className="mx-auto mt-2 max-w-xs text-sm leading-6 text-white/60">
                {current.event.title}
              </DialogDescription>

              <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-2xl border border-amber-200/25 bg-amber-300/[0.09] px-5 py-3 text-amber-200 shadow-[0_0_28px_rgba(251,191,36,0.12)]">
                <Zap className="h-5 w-5" aria-hidden="true" />
                <strong className="font-display text-3xl font-black tabular-nums">
                  +{current.event.rewardXp.toLocaleString()} XP
                </strong>
              </div>

              {current.phase === "claimed" ? (
                <div className="mt-5 space-y-3 text-left">
                  <ProgressLine
                    icon={<Star className="h-4 w-4 text-amber-300" />}
                    label="Lifetime XP"
                    before={`${previousXp.toLocaleString()} XP`}
                    after={`${totalXp.toLocaleString()} XP`}
                  />
                  <ProgressLine
                    icon={<Trophy className="h-4 w-4 text-violet-300" />}
                    label={rankUp ? "Rank Up" : "Explorer Rank"}
                    before={rankUp ? fromRank.name : toRank.name}
                    after={
                      rankUp
                        ? toRank.name
                        : nextRank
                          ? `${Math.max(0, nextRank.minXp - totalXp).toLocaleString()} XP to ${nextRank.name}`
                          : "Highest rank reached"
                    }
                  />
                  <div className="flex items-center gap-3 rounded-2xl border border-fuchsia-300/15 bg-fuchsia-300/[0.05] p-3">
                    <CompanionImage
                      speciesId={companion.id}
                      stage={toCompanion.currentStage.id}
                      size={48}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black text-white">{companionName}</p>
                      <p className="mt-0.5 text-xs text-white/55">
                        {evolution
                          ? `${fromCompanion.currentStage.name} → ${toCompanion.currentStage.name}`
                          : toCompanion.nextStage
                            ? `${toCompanion.remainingXp.toLocaleString()} XP to ${toCompanion.nextStage.name}`
                            : "Final Companion stage reached"}
                      </p>
                    </div>
                    {evolution ? <Sparkles className="h-5 w-5 text-fuchsia-300" /> : null}
                  </div>
                </div>
              ) : null}

              {error ? (
                <p className="mt-4 text-sm font-semibold text-rose-300" role="alert">
                  {error}
                </p>
              ) : null}

              {current.phase === "ready" ? (
                <button
                  type="button"
                  onClick={() => void claim()}
                  disabled={claiming}
                  aria-label={`Claim ${current.event.rewardXp} XP for ${current.event.title}`}
                  className="mt-6 inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 text-sm font-black text-white shadow-[0_12px_36px_rgba(124,58,237,0.38)] transition-[transform,opacity,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(124,58,237,0.46)] active:translate-y-0 disabled:cursor-wait disabled:opacity-60 motion-reduce:transform-none"
                >
                  {claiming ? (
                    <LoaderCircle className="h-5 w-5 animate-spin motion-reduce:animate-none" />
                  ) : (
                    <Zap className="h-5 w-5" />
                  )}
                  {claiming
                    ? "Claiming…"
                    : isBonus
                      ? `Claim +${current.event.rewardXp.toLocaleString()} XP Bonus`
                      : `Claim +${current.event.rewardXp.toLocaleString()} XP`}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={close}
                  className="mt-6 inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-black text-[#17113A] transition-[transform,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-violet-50 active:translate-y-0 motion-reduce:transform-none"
                >
                  <Check className="h-5 w-5" /> Continue
                </button>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function ProgressLine({
  icon,
  label,
  before,
  after,
}: {
  icon: ReactNode;
  label: string;
  before: string;
  after: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06]"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-black uppercase tracking-wider text-white/40">{label}</p>
        <p className="mt-1 flex flex-wrap items-center gap-2 text-xs font-bold tabular-nums text-white/60">
          <span>{before}</span>
          <span aria-hidden="true">→</span>
          <strong className="text-white">{after}</strong>
        </p>
      </div>
    </div>
  );
}
