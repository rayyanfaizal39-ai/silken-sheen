import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Rocket, Sparkles, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { sfx } from "@/lib/sounds";
import { QuizComboAnnouncement } from "./QuizComboAnnouncement";
import {
  getParticleCount,
  getStreakMessage,
  getStreakTier,
  type StreakCelebration,
  type StreakTier,
} from "./streakCelebrationConfig";

type Particle = {
  angle: number;
  distance: number;
  rotation: number;
  scale: number;
  color: string;
  kind: "star" | "confetti" | "gold";
};

const TIER_LEVEL: Record<StreakTier, number> = {
  correct: 1,
  spark: 2,
  energy: 3,
  rocket: 4,
  galaxy: 5,
  milestone: 6,
  legendary: 7,
};

function seededParticles(seed: number, count: number, tier: StreakTier): Particle[] {
  let value = seed || 1;
  const random = () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
  const level = TIER_LEVEL[tier];
  return Array.from({ length: count }, (_, index) => ({
    angle: random() * 360,
    distance: 52 + random() * (50 + level * 17),
    rotation: -150 + random() * 300,
    scale: 0.72 + random() * 0.55,
    color: ["#A78BFA", "#C4B5FD", "#F0ABFC", "#FBBF24", "#34D399"][index % 5],
    kind:
      (tier === "milestone" || tier === "legendary") && index % 3 === 0
        ? "gold"
        : index % 3 === 0
          ? "star"
          : "confetti",
  }));
}

function playTierSound(tier: StreakTier, streak: number) {
  if (![2, 3, 5, 7, 10, 15, 20, 25, 30].includes(streak)) return;
  if (tier === "spark") sfx.combo(streak);
  else if (tier === "energy" || tier === "rocket") sfx.streak(streak);
  else if (tier === "galaxy") sfx.whoosh();
  else if (tier === "milestone") sfx.ding();
  else if (tier === "legendary") sfx.fanfare();
}

function XpFlyAnimation({
  xp,
  targetSelector,
  reducedMotion,
}: {
  xp: number;
  targetSelector: string;
  reducedMotion: boolean;
}) {
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const element = document.querySelector(targetSelector);
    if (!element) return;
    const rect = element.getBoundingClientRect();
    setTarget({
      x: rect.left + rect.width / 2 - window.innerWidth / 2,
      y: rect.top + rect.height / 2 - window.innerHeight / 2,
    });
  }, [targetSelector]);

  if (reducedMotion || !target) {
    return (
      <motion.div
        className="absolute left-1/2 top-[calc(50%+3.5rem)] -translate-x-1/2 rounded-full border border-amber-200/35 bg-amber-300/15 px-3 py-1 text-sm font-black text-amber-200"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        +{xp} XP
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-100/70 bg-gradient-to-br from-amber-200 to-amber-500 text-[10px] font-black text-[#3B1D08] shadow-[0_0_24px_rgba(251,191,36,0.65)]"
      initial={{ opacity: 0, x: -20, y: 28, scale: 0.8 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, target.x * 0.45, target.x],
        y: [28, target.y * 0.35 - 44, target.y],
        scale: [0.8, 1.08, 0.55],
      }}
      transition={{ duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      +{xp}
    </motion.div>
  );
}

function ComboBadge({ streak, reducedMotion }: { streak: number; reducedMotion: boolean }) {
  if (streak < 2) return null;
  const tier = getStreakTier(streak);
  const label =
    streak >= 10 ? "GALAXY COMBO" : streak >= 5 ? "COSMIC COMBO" : streak >= 3 ? "COMBO" : "STREAK";
  const intensity =
    tier === "milestone" || tier === "legendary"
      ? "border-amber-300/55 shadow-[0_10px_30px_rgba(245,158,11,0.3)]"
      : tier === "galaxy" || tier === "rocket"
        ? "border-fuchsia-300/45 shadow-[0_9px_28px_rgba(192,38,211,0.3)]"
        : "border-violet-300/30 shadow-[0_8px_24px_rgba(91,33,182,0.35)]";
  return (
    <motion.div
      key={streak}
      data-testid="streak-combo-badge"
      data-streak-tier={tier}
      className={`fixed right-3 top-[calc(env(safe-area-inset-top)+5rem)] z-[72] max-w-[calc(100vw-1.5rem)] rounded-2xl border bg-[#17102d]/92 px-3 py-2 text-right backdrop-blur-md sm:right-6 sm:top-24 ${intensity}`}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: -6 }}
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: [0.96, 1.08, 1], y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
      transition={{ duration: reducedMotion ? 0.16 : 0.34, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div className="font-display text-base font-black leading-none text-violet-100">
        {streak}× <span className="text-[10px] tracking-[0.12em] text-fuchsia-200">{label}</span>
      </div>
      <div className="mt-1 h-0.5 rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-300 to-amber-300" />
    </motion.div>
  );
}

export function QuizStreakCelebration({
  streak,
  celebration,
  xpTargetSelector = "[data-quiz-xp-target]",
}: {
  streak: number;
  celebration: StreakCelebration | null;
  xpTargetSelector?: string;
}) {
  const prefersReduced = useReducedMotion();
  const reducedMotion = Boolean(prefersReduced);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (celebration && !reducedMotion) playTierSound(celebration.tier, celebration.streak);
  }, [celebration, reducedMotion]);

  const particles = useMemo(
    () =>
      celebration && celebration.streak < 2
        ? seededParticles(
            celebration.id * 997 + celebration.streak,
            getParticleCount(celebration.tier, mobile, reducedMotion),
            celebration.tier,
          )
        : [],
    [celebration, mobile, reducedMotion],
  );

  if (typeof document === "undefined") return null;

  const level = celebration ? TIER_LEVEL[celebration.tier] : 0;
  const message = celebration
    ? getStreakMessage(celebration.streak, celebration.id + celebration.streak)
    : null;
  const announce =
    celebration && [5, 10, 15, 20, 25, 30].includes(celebration.streak)
      ? `${celebration.streak} answer streak. ${message ?? ""}`
      : "";

  return createPortal(
    <>
      <AnimatePresence mode="popLayout">
        {celebration && celebration.streak >= 2 && (
          <QuizComboAnnouncement
            key={celebration.id}
            celebration={celebration}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {streak >= 2 && <ComboBadge streak={streak} reducedMotion={reducedMotion} />}
      </AnimatePresence>
      <AnimatePresence mode="popLayout">
        {celebration && (
          <motion.div
            key={celebration.id}
            data-testid="quiz-streak-overlay"
            className="pointer-events-none fixed inset-0 z-[71] overflow-hidden"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.12 : 0.18 }}
          >
            {celebration.streak < 2 && level >= 5 && (
              <motion.div
                className="absolute inset-[8%] rounded-[3rem] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.28),rgba(76,29,149,0.12)_38%,transparent_70%)]"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={
                  reducedMotion
                    ? { opacity: 0.45 }
                    : { opacity: [0, 0.75, 0], scale: [0.94, 1.04, 1.1], rotate: [0, 1.5, 0] }
                }
                transition={{ duration: 0.95, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            )}

            <div className="absolute left-1/2 top-[42%] h-0 w-0">
              <motion.div
                className="absolute -left-6 -top-6 text-emerald-200 drop-shadow-[0_0_18px_rgba(52,211,153,0.7)]"
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
                animate={
                  reducedMotion
                    ? { opacity: [0, 1, 0] }
                    : { opacity: [0, 1, 1, 0], scale: [0.92, 1.18, 1, 0.98] }
                }
                transition={{
                  duration: reducedMotion ? 0.32 : 0.58,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                <CheckCircle2 className="h-12 w-12 fill-emerald-500/20" aria-hidden />
              </motion.div>

              <motion.div
                className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-violet-500/20 blur-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: reducedMotion ? 0.45 : [0, 0.75, 0], scale: [0.9, 1.15, 1.32] }}
                transition={{ duration: 0.78, ease: "easeOut" }}
              />

              {celebration.streak < 2 && level >= 3 && !reducedMotion && (
                <motion.div
                  className="absolute -left-20 -top-20 h-40 w-40 rounded-full border-2 border-violet-300/55 shadow-[0_0_20px_rgba(167,139,250,0.4)]"
                  initial={{ opacity: 0.8, scale: 0.45 }}
                  animate={{ opacity: 0, scale: level >= 5 ? 1.85 : 1.3 }}
                  transition={{ duration: 0.72, ease: "easeOut" }}
                />
              )}

              {particles.map((particle, index) => {
                const radians = (particle.angle * Math.PI) / 180;
                const x = Math.cos(radians) * particle.distance;
                const y = Math.sin(radians) * particle.distance;
                return (
                  <motion.span
                    key={index}
                    className="absolute left-0 top-0 block"
                    initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.8 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      x,
                      y,
                      rotate: particle.rotation,
                      scale: [0.8, particle.scale, particle.scale * 0.82],
                    }}
                    transition={{
                      duration: 0.48 + level * 0.07,
                      delay: (index % 7) * 0.018,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {particle.kind === "star" ? (
                      <Star
                        className="h-3.5 w-3.5 fill-current drop-shadow-[2px_3px_0_rgba(49,22,101,0.45)]"
                        style={{ color: particle.color }}
                        aria-hidden
                      />
                    ) : (
                      <span
                        className={`block rounded-[2px] shadow-[2px_3px_0_rgba(49,22,101,0.35)] ${
                          particle.kind === "gold" ? "h-2.5 w-2.5" : "h-2 w-3.5"
                        }`}
                        style={{
                          background:
                            particle.kind === "gold"
                              ? "linear-gradient(135deg,#FEF3C7,#F59E0B)"
                              : `linear-gradient(135deg,${particle.color},#6D28D9)`,
                          clipPath: "polygon(0 12%, 100% 0, 86% 100%, 12% 84%)",
                        }}
                      />
                    )}
                  </motion.span>
                );
              })}

              {celebration.streak < 2 && level >= 4 && !reducedMotion && (
                <motion.div
                  className="absolute -left-5 -top-5 text-violet-100 drop-shadow-[0_0_18px_rgba(167,139,250,0.8)]"
                  initial={{ opacity: 0, x: mobile ? -90 : -170, y: 65, rotate: -38, scale: 0.75 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    x: mobile ? 95 : 185,
                    y: -80,
                    rotate: -25,
                    scale: 1,
                  }}
                  transition={{ duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Rocket className="h-9 w-9 fill-violet-500/50" aria-hidden />
                  <span className="absolute right-8 top-7 block h-1.5 w-16 rounded-full bg-gradient-to-l from-fuchsia-300/80 to-transparent" />
                </motion.div>
              )}

              {celebration.streak < 2 &&
                level >= 6 &&
                [0, 1, 2].map((planet) => (
                  <motion.span
                    key={planet}
                    className="absolute block rounded-full border border-white/30 shadow-[4px_5px_0_rgba(49,22,101,0.4)]"
                    style={{
                      width: 16 + planet * 4,
                      height: 16 + planet * 4,
                      background: ["#A78BFA", "#F0ABFC", "#FBBF24"][planet],
                    }}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.8 }}
                    animate={
                      reducedMotion
                        ? { opacity: 0.75, x: -70 + planet * 70, y: -82 - planet * 10 }
                        : {
                            opacity: [0, 0.9, 0],
                            x: [-15, -110 + planet * 110],
                            y: [-15, -85 - planet * 18],
                            rotate: 80 + planet * 100,
                          }
                    }
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />
                ))}
            </div>

            {message && celebration.streak < 2 && (
              <motion.div
                className="absolute left-1/2 top-[42%] w-[min(90vw,38rem)] -translate-x-1/2 text-center"
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.94 }}
                animate={
                  reducedMotion
                    ? { opacity: 1 }
                    : { opacity: [0, 1, 1, 0], y: [16, 0, -8, -24], scale: [0.94, 1.05, 1, 0.98] }
                }
                transition={{ duration: reducedMotion ? 0.22 : 0.82, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <div className="inline-flex items-center gap-2 rounded-2xl border border-violet-200/35 bg-[#1b1037]/88 px-4 py-2 shadow-[0_12px_40px_rgba(76,29,149,0.5)] backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 text-amber-300" aria-hidden />
                  <span
                    className={`font-display font-black tracking-tight text-white ${level >= 6 ? "text-3xl sm:text-5xl" : "text-xl sm:text-2xl"}`}
                  >
                    {message}
                  </span>
                </div>
              </motion.div>
            )}

            {celebration.xpAwarded > 0 && (
              <XpFlyAnimation
                xp={celebration.xpAwarded}
                targetSelector={xpTargetSelector}
                reducedMotion={reducedMotion}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only" role="status" aria-live="polite">
        {announce}
      </span>
    </>,
    document.body,
  );
}
