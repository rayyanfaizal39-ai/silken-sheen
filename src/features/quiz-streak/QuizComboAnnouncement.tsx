import { motion } from "framer-motion";
import { Rocket, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { COMBO_TOTAL_MS, getQuizComboConfig } from "./quizComboConfig";
import type { StreakCelebration } from "./streakCelebrationConfig";

type SurfaceRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

function getSurfaceRect(): SurfaceRect | null {
  const surface = document.querySelector<HTMLElement>("[data-quiz-combo-surface]");
  if (!surface) return null;
  const rect = surface.getBoundingClientRect();
  return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
}

export function QuizComboAnnouncement({
  celebration,
  reducedMotion,
}: {
  celebration: StreakCelebration;
  reducedMotion: boolean;
}) {
  const config = getQuizComboConfig(celebration.streak);
  const [surface, setSurface] = useState<SurfaceRect | null>(() => getSurfaceRect());

  useEffect(() => {
    const update = () => setSurface(getSurfaceRect());
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    const frame = window.requestAnimationFrame(update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [celebration.id]);

  if (!config || !surface) return null;

  const duration = COMBO_TOTAL_MS / 1000;
  const isCosmic = config.level >= 7;

  return (
    <motion.div
      key={celebration.id}
      data-testid="quiz-combo-announcement"
      data-combo-level={config.level}
      className="pointer-events-none fixed z-[73] flex items-center justify-center overflow-hidden px-3 text-center"
      style={{
        left: surface.left,
        top: surface.top,
        width: surface.width,
        height: Math.min(surface.height, 360),
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-hidden="true"
    >
      {config.level >= 3 && !reducedMotion && (
        <motion.span
          className="absolute h-28 w-28 rounded-full border-2 border-violet-300/55 shadow-[0_0_28px_rgba(167,139,250,0.45)] sm:h-40 sm:w-40"
          initial={{ opacity: 0, scale: 0.45 }}
          animate={{ opacity: [0, 0.8, 0], scale: [0.45, 1.15, 1.7] }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      )}

      {!reducedMotion &&
        Array.from({ length: Math.min(10, 3 + config.level) }, (_, index) => {
          const angle = (index / Math.min(10, 3 + config.level)) * Math.PI * 2;
          const distance = 68 + config.level * 7;
          return (
            <motion.span
              key={index}
              className="absolute text-amber-300 drop-shadow-[0_2px_5px_rgba(76,29,149,0.8)]"
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.55 }}
              animate={{
                opacity: [0, 1, 0],
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance * 0.55,
                rotate: index * 55,
                scale: [0.55, 1, 0.75],
              }}
              transition={{ duration: 0.9, delay: 0.05 + index * 0.018, ease: "easeOut" }}
            >
              {index % 2 === 0 ? (
                <Star className="h-3 w-3 fill-current sm:h-4 sm:w-4" />
              ) : (
                <Sparkles className="h-3 w-3 text-fuchsia-300 sm:h-4 sm:w-4" />
              )}
            </motion.span>
          );
        })}

      {config.level >= 5 && !reducedMotion && (
        <motion.div
          className="absolute text-violet-100 drop-shadow-[0_0_14px_rgba(167,139,250,0.85)]"
          initial={{ opacity: 0, x: -135, y: 52, rotate: -36, scale: 0.75 }}
          animate={{ opacity: [0, 1, 1, 0], x: 145, y: -62, rotate: -25, scale: 1 }}
          transition={{ duration: 1.05, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Rocket className="h-7 w-7 fill-violet-500/55 sm:h-9 sm:w-9" />
        </motion.div>
      )}

      <motion.div
        className="relative max-w-full"
        initial={reducedMotion ? { opacity: 0, scale: 0.98 } : { opacity: 0, scale: 0.65, y: 8 }}
        animate={
          reducedMotion
            ? { opacity: [0, 1, 1, 0], scale: [0.98, 1, 1, 1] }
            : { opacity: [0, 1, 1, 1, 0], scale: [0.65, 1.15, 1, 1, 0.96], y: [8, 0, 0, 0, -8] }
        }
        transition={{
          duration,
          times: reducedMotion ? [0, 0.12, 0.84, 1] : [0, 0.14, 0.28, 0.84, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div
          className={`font-display whitespace-nowrap font-black leading-[0.9] tracking-[-0.045em] text-white ${config.sizeClass}`}
          style={{
            textShadow: isCosmic
              ? "0 3px 0 #7c3aed, 0 8px 24px rgba(217,70,239,.75)"
              : "0 3px 0 #5b21b6, 0 7px 20px rgba(139,92,246,.65)",
          }}
        >
          <span className="bg-gradient-to-b from-amber-100 via-amber-300 to-orange-400 bg-clip-text text-[1.12em] text-transparent">
            {celebration.streak}
          </span>
          <span className="text-violet-100">× COMBO</span>
        </div>
        {config.secondaryLabel && (
          <div className="mt-2 font-display text-[clamp(.72rem,2.8vw,1rem)] font-black tracking-[0.18em] text-amber-200 drop-shadow-[0_2px_7px_rgba(76,29,149,.9)]">
            {config.secondaryLabel}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
