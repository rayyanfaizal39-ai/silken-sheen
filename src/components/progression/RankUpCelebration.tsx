import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { CompanionImage, getCompanionDisplayName } from "@/companion";
import { RANKS, type SpaceRank } from "@/data/rankAssets";
import {
  acknowledgeRankUp,
  clearPublishedProgressionEvent,
  createXpProgressionEvent,
  queueJourneyUnlock,
  subscribeToProgressionEvents,
  type RankUpProgressionEvent,
  type XpGainProgressionEvent,
} from "@/lib/progression-events";
import {
  getCompanionStageForXp,
  useProgress,
  type CompanionId,
  type CompanionStageId,
} from "@/hooks/use-progress";
import { sfx } from "@/lib/sounds";
import "./rank-up-celebration.css";

export interface RankUpCelebrationCompanion {
  id: CompanionId;
  name: string;
  stage: CompanionStageId;
}

export interface RankUpCelebrationProps {
  previousRank: SpaceRank;
  newRank: SpaceRank;
  previousRankIcon?: string;
  newRankIcon?: string;
  currentXP: number;
  nextRankXP?: number | null;
  nextRankName?: string | null;
  companion?: RankUpCelebrationCompanion;
  bonusXP?: number;
  onClose: () => void;
}

const CELEBRATION_STARS = [
  [8, 14, 2, 0.2],
  [17, 72, 3, 1.1],
  [28, 22, 2, 0.7],
  [36, 84, 2, 1.7],
  [48, 10, 3, 1.3],
  [58, 76, 2, 0.4],
  [68, 18, 2, 1.9],
  [76, 88, 3, 0.9],
  [88, 30, 2, 1.5],
  [93, 68, 2, 0.1],
  [12, 44, 1, 2.1],
  [42, 56, 2, 2.4],
  [64, 46, 1, 1.2],
  [82, 56, 2, 2.2],
  [23, 92, 1, 0.5],
  [96, 8, 2, 1.8],
] as const;

function rankById(id: string): SpaceRank | undefined {
  return RANKS.find((rank) => rank.id === id);
}

function nextRankAfter(rank: SpaceRank): SpaceRank | null {
  const index = RANKS.findIndex((candidate) => candidate.id === rank.id);
  return index >= 0 ? (RANKS[index + 1] ?? null) : null;
}

export function RankUpCelebration({
  previousRank,
  newRank,
  previousRankIcon = previousRank.image,
  newRankIcon = newRank.image,
  currentXP,
  nextRankXP,
  nextRankName,
  companion,
  bonusXP,
  onClose,
}: RankUpCelebrationProps) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const xpToNext = nextRankXP == null ? null : Math.max(0, nextRankXP - currentXP);
  const delay = useCallback((seconds: number) => (reduceMotion ? 0.05 : seconds), [reduceMotion]);
  const duration = useCallback(
    (seconds: number) => (reduceMotion ? Math.min(0.2, seconds) : seconds),
    [reduceMotion],
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    let stopSwoosh: (() => void) | undefined;
    let stopChime: (() => void) | undefined;
    const swooshTimer = window.setTimeout(
      () => {
        stopSwoosh = sfx.rankUpSwoosh();
      },
      reduceMotion ? 50 : 300,
    );
    const chimeTimer = window.setTimeout(
      () => {
        stopChime = sfx.levelUp();
      },
      reduceMotion ? 150 : 1450,
    );

    return () => {
      window.clearTimeout(swooshTimer);
      window.clearTimeout(chimeTimer);
      stopSwoosh?.();
      stopChime?.();
    };
  }, [mounted, reduceMotion]);

  useEffect(() => {
    if (!mounted) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => dialogRef.current?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  const companionMessage = nextRankName
    ? `We did it! Next stop: ${nextRankName}!`
    : "We did it! The whole galaxy knows your name!";

  return createPortal(
    <motion.div
      className="rank-up-celebration"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration(0.3), ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="rank-up-celebration__scrim" />
      <div className="rank-up-celebration__nebula" />
      <div className="rank-up-celebration__stars" aria-hidden="true">
        {CELEBRATION_STARS.map(([left, top, size, starDelay], index) => (
          <span
            key={`${left}-${top}`}
            style={
              {
                "--star-left": `${left}%`,
                "--star-top": `${top}%`,
                "--star-size": `${size}px`,
                "--star-delay": `${starDelay}s`,
                "--star-duration": `${2.4 + (index % 4) * 0.55}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div
        ref={dialogRef}
        className="rank-up-celebration__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rank-up-title"
        aria-describedby="rank-up-summary"
        tabIndex={-1}
      >
        <motion.button
          type="button"
          className="rank-up-celebration__close"
          aria-label="Close rank up celebration"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay(3.25), duration: duration(0.2) }}
          whileTap={reduceMotion ? undefined : { transform: "scale(0.96)" }}
        >
          <X aria-hidden="true" />
        </motion.button>

        <div className="rank-up-celebration__centerpiece">
          <motion.div
            className="rank-up-celebration__xp-comet"
            initial={{
              opacity: 0,
              transform: reduceMotion ? "none" : "translate3d(90px,-52px,0) scale(.92)",
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              transform: reduceMotion ? "none" : "translate3d(0,28px,0) scale(1)",
            }}
            transition={{ delay: delay(0.3), duration: duration(0.5), ease: [0.77, 0, 0.175, 1] }}
            aria-hidden="true"
          >
            <Sparkles /> +{(bonusXP ?? 0).toLocaleString()} XP
          </motion.div>

          <motion.div
            className="rank-up-celebration__old-badge-stage"
            initial={{ opacity: 0, transform: reduceMotion ? "none" : "scale(.94)" }}
            animate={{ opacity: [0, 1, 1, 0], transform: reduceMotion ? "none" : "scale(1)" }}
            transition={{ delay: delay(0.35), duration: duration(1.75), times: [0, 0.18, 0.72, 1] }}
            aria-hidden="true"
          >
            <svg className="rank-up-celebration__progress-ring" viewBox="0 0 220 220">
              <circle className="rank-up-celebration__progress-track" cx="110" cy="110" r="101" />
              <motion.circle
                className="rank-up-celebration__progress-value"
                cx="110"
                cy="110"
                r="101"
                pathLength="1"
                initial={{ pathLength: reduceMotion ? 1 : 0.82 }}
                animate={{ pathLength: 1 }}
                transition={{
                  delay: delay(0.8),
                  duration: duration(0.3),
                  ease: [0.23, 1, 0.32, 1],
                }}
                style={{ stroke: newRank.color }}
              />
            </svg>
            <div
              className="rank-up-celebration__pulse"
              style={{ "--rank-color": newRank.color } as CSSProperties}
            />
            <img src={previousRankIcon} alt="" draggable={false} />
          </motion.div>

          <motion.p
            className="rank-up-celebration__eyebrow"
            initial={{
              opacity: 0,
              transform: reduceMotion ? "translateY(0px) scale(1)" : "translateY(12px) scale(.96)",
            }}
            animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            transition={{ delay: delay(1.4), duration: duration(0.4), ease: [0.23, 1, 0.32, 1] }}
          >
            Cosmic Journey Milestone
          </motion.p>

          <motion.h1
            id="rank-up-title"
            className="rank-up-celebration__title"
            initial={{ opacity: 0, transform: reduceMotion ? "scale(1)" : "scale(.92)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            transition={{
              delay: delay(1.45),
              duration: duration(0.45),
              ease: [0.34, 1.3, 0.64, 1],
            }}
          >
            RANK UP!
          </motion.h1>

          <motion.div
            className="rank-up-celebration__rank-transition"
            initial={{
              opacity: 0,
              transform: reduceMotion ? "translateY(0px)" : "translateY(10px)",
            }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ delay: delay(1.8), duration: duration(0.4), ease: [0.23, 1, 0.32, 1] }}
          >
            <span>{previousRank.name}</span>
            <ArrowRight aria-hidden="true" />
            <strong style={{ color: newRank.color }}>{newRank.name}</strong>
          </motion.div>

          <motion.div
            className="rank-up-celebration__new-badge-stage"
            initial={{ opacity: 0, transform: reduceMotion ? "none" : "scale(.62) rotate(-2deg)" }}
            animate={{ opacity: 1, transform: "scale(1) rotate(0deg)" }}
            transition={{
              delay: delay(2.2),
              duration: duration(0.58),
              type: reduceMotion ? "tween" : "spring",
              bounce: reduceMotion ? 0 : 0.18,
            }}
            style={
              { "--rank-color": newRank.color, "--rank-glow": newRank.glowColor } as CSSProperties
            }
          >
            <span className="rank-up-celebration__orbit" aria-hidden="true" />
            <span className="rank-up-celebration__radial-pulse" aria-hidden="true" />
            <img src={newRankIcon} alt={`${newRank.name} rank badge`} draggable={false} />
          </motion.div>

          <motion.div
            id="rank-up-summary"
            className="rank-up-celebration__reward"
            initial={{
              opacity: 0,
              transform: reduceMotion ? "translateY(0px)" : "translateY(10px)",
            }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ delay: delay(3), duration: duration(0.35), ease: [0.23, 1, 0.32, 1] }}
            aria-live="polite"
          >
            <strong>{newRank.name.toUpperCase()} UNLOCKED</strong>
            <span>{newRank.minXp.toLocaleString()} XP reached</span>
            {xpToNext != null && nextRankName ? (
              <span>
                {xpToNext.toLocaleString()} XP to {nextRankName}
              </span>
            ) : (
              <span>Highest Cosmic Journey rank achieved</span>
            )}
          </motion.div>

          <motion.button
            type="button"
            className="rank-up-celebration__continue"
            onClick={onClose}
            initial={{
              opacity: 0,
              transform: reduceMotion ? "translateY(0px)" : "translateY(10px)",
            }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ delay: delay(3.25), duration: duration(0.3), ease: [0.23, 1, 0.32, 1] }}
            whileTap={reduceMotion ? undefined : { transform: "scale(0.97)" }}
          >
            Continue Journey <ArrowRight aria-hidden="true" />
          </motion.button>
        </div>

        {companion && (
          <motion.div
            className="rank-up-celebration__companion"
            initial={{
              opacity: 0,
              transform: reduceMotion ? "none" : "translate3d(34px,14px,0) scale(.94)",
            }}
            animate={{ opacity: 1, transform: "translate3d(0px,0px,0px) scale(1)" }}
            transition={{ delay: delay(2.7), duration: duration(0.42), ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="rank-up-celebration__speech">
              <strong>{companion.name}</strong>
              <span>{companionMessage}</span>
            </div>
            <CompanionImage speciesId={companion.id} stage={companion.stage} size={148} />
          </motion.div>
        )}
      </div>
    </motion.div>,
    document.body,
  );
}

export function XpGainAnimation({
  event,
  onComplete,
}: {
  event: XpGainProgressionEvent;
  onComplete: () => void;
}) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(onComplete, reduceMotion ? 500 : 1100);
    return () => window.clearTimeout(timer);
  }, [event.id, onComplete, reduceMotion]);

  return createPortal(
    <motion.div
      className="xp-gain-animation"
      role="status"
      aria-live="polite"
      initial={{
        opacity: 0,
        transform: reduceMotion ? "translateY(0px) scale(1)" : "translateY(8px) scale(.96)",
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        transform: reduceMotion ? "translateY(0px) scale(1)" : "translateY(-28px) scale(1.03)",
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: reduceMotion ? 0.45 : 1,
        times: [0, 0.16, 0.68, 1],
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      +{event.xpGained.toLocaleString()} XP <Sparkles aria-hidden="true" />
    </motion.div>,
    document.body,
  );
}

/** Global host: one listener for every XP source, independent of route/component remounts. */
export function ProgressionCelebrationHost() {
  const { progress } = useProgress();
  const [rankEvent, setRankEvent] = useState<RankUpProgressionEvent | null>(null);
  const [xpEvent, setXpEvent] = useState<XpGainProgressionEvent | null>(null);
  const [previewEvent, setPreviewEvent] = useState<RankUpProgressionEvent | null>(null);

  useEffect(
    () =>
      subscribeToProgressionEvents((event) => {
        if (event.type === "rank-up") {
          setXpEvent(null);
          setRankEvent(event);
        } else if (event.type === "xp-gain") {
          setXpEvent(event);
        }
      }),
    [],
  );

  useEffect(() => {
    const isLocalPreview =
      import.meta.env.DEV ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "::1";
    if (!isLocalPreview) return;
    const requestedRankId = new URLSearchParams(window.location.search).get("testRankUp");
    const targetIndex = RANKS.findIndex((rank) => rank.id === requestedRankId);
    if (targetIndex <= 0) return;
    const target = RANKS[targetIndex];
    const preview = createXpProgressionEvent(
      Math.max(RANKS[targetIndex - 1].minXp, target.minXp - 500),
      target.minXp,
    );
    if (preview?.type !== "rank-up") return;
    setPreviewEvent({ ...preview, id: `preview:${target.id}` });
  }, []);

  const playRankPreview = useCallback(() => {
    if (!previewEvent) return;
    setXpEvent(null);
    setRankEvent({ ...previewEvent, id: `${previewEvent.id}:${Date.now()}` });
  }, [previewEvent]);

  const resolved = useMemo(() => {
    if (!rankEvent) return null;
    const previousRank = rankById(rankEvent.fromRank);
    const newRank = rankById(rankEvent.toRank);
    if (!previousRank || !newRank) return null;
    const nextRank = nextRankAfter(newRank);
    const companionConfig = progress.companion;
    const companion = companionConfig
      ? {
          id: companionConfig.id,
          name: getCompanionDisplayName(companionConfig),
          stage: getCompanionStageForXp(rankEvent.currentXp),
        }
      : undefined;
    return { previousRank, newRank, nextRank, companion };
  }, [progress.companion, rankEvent]);

  const closeRankUp = useCallback(() => {
    if (!rankEvent) return;
    if (!rankEvent.id.startsWith("preview:")) {
      acknowledgeRankUp(rankEvent.id);
      queueJourneyUnlock({
        eventId: rankEvent.id,
        rankId: rankEvent.toRank,
        currentXp: rankEvent.currentXp,
      });
    }
    setRankEvent(null);
  }, [rankEvent]);

  const clearXp = useCallback(() => {
    if (xpEvent) clearPublishedProgressionEvent(xpEvent.id);
    setXpEvent(null);
  }, [xpEvent]);

  return (
    <>
      <AnimatePresence>
        {rankEvent && resolved ? (
          <RankUpCelebration
            key={rankEvent.id}
            previousRank={resolved.previousRank}
            newRank={resolved.newRank}
            currentXP={rankEvent.currentXp}
            nextRankXP={resolved.nextRank?.minXp ?? null}
            nextRankName={resolved.nextRank?.name ?? null}
            companion={resolved.companion}
            bonusXP={rankEvent.xpGained}
            onClose={closeRankUp}
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {!rankEvent && xpEvent ? (
          <XpGainAnimation key={xpEvent.id} event={xpEvent} onComplete={clearXp} />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {previewEvent && !rankEvent ? (
          <motion.button
            type="button"
            className="rank-up-preview-launcher"
            onClick={playRankPreview}
            initial={{ opacity: 0, transform: "translateY(-8px) scale(.96)" }}
            animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            exit={{ opacity: 0, transform: "translateY(-6px) scale(.98)" }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            whileTap={{ transform: "scale(.97)" }}
          >
            <Sparkles aria-hidden="true" />
            Play Rank Up Preview
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}
