import { useEffect, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { subjectPlanetStyles, type SubjectPlanetId } from "@/components/AcademyPage";

/**
 * Full-viewport presentation frame for an in-progress Junior quiz.
 * It does not own questions, answers, timers, or scoring.
 * Portaled to document.body so site chrome cannot clip or cover it.
 * Subject colour comes from the Dashboard Subject Worlds map.
 */
export function QuizArena({
  children,
  subjectId,
}: {
  children: ReactNode;
  subjectId?: string | null;
}) {
  const planet =
    subjectId && subjectPlanetStyles && subjectId in subjectPlanetStyles
      ? subjectPlanetStyles[subjectId as SubjectPlanetId]
      : null;
  const themeVars: CSSProperties | undefined = planet
    ? {
        ["--quiz-accent" as string]: planet.color,
        ["--quiz-accent-from" as string]: planet.accentFrom,
        ["--quiz-accent-to" as string]: planet.accentTo,
        ["--quiz-glow" as string]: planet.glow,
      }
    : undefined;
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const frame = (
    <div
      className="quiz-arena fixed inset-0 z-[200] overflow-x-hidden overflow-y-auto bg-[#050816] text-white"
      style={{ minHeight: "100vh", height: "100dvh", ...themeVars }}
      role="region"
      aria-label="AcadeMY Quiz Arena"
    >
      <style>{`
        @keyframes quiz-arena-drift {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-1.2%, 0.8%, 0); }
        }
        @keyframes quiz-arena-q-in {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes quiz-card-out {
          to { opacity: 0; transform: translateY(-8px); }
        }
        @keyframes quiz-xp-rise {
          0% { opacity: 0; transform: translateY(4px) scale(0.92); }
          28% { opacity: 1; transform: translateY(-4px) scale(1); }
          100% { opacity: 0; transform: translateY(-18px) scale(1); }
        }
        @keyframes quiz-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes quiz-progress-sheen {
          from { transform: translateX(-120%); }
          to { transform: translateX(180%); }
        }
        @keyframes quiz-sweep {
          from { transform: translateX(-120%); }
          to { transform: translateX(120%); }
        }
        @keyframes quiz-check-pop {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes quiz-nudge {
          0%, 100% { transform: translateX(0); }
          40% { transform: translateX(-3px); }
          70% { transform: translateX(2px); }
        }
        @keyframes quiz-correct-in {
          from { border-color: rgba(255,255,255,0.09); background-color: rgba(255,255,255,0.04); }
          to { border-color: rgba(52, 211, 153, 0.55); background-color: rgba(16, 185, 129, 0.16); }
        }
        @keyframes quiz-wrong-in {
          from { border-color: rgba(255,255,255,0.09); background-color: rgba(255,255,255,0.04); }
          to { border-color: rgba(244, 63, 94, 0.5); background-color: rgba(244, 63, 94, 0.12); }
        }
        @keyframes quiz-success-pulse {
          0% { box-shadow: 0 18px 40px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.08); }
          45% { box-shadow: 0 18px 40px rgba(0,0,0,0.32), inset 0 0 0 1px rgba(52, 211, 153, 0.45); }
          100% { box-shadow: 0 18px 40px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.08); }
        }
        @keyframes quiz-miss {
          40% { box-shadow: 0 18px 40px rgba(0,0,0,0.32), inset 0 0 0 1px rgba(244, 63, 94, 0.35); }
        }
        @keyframes quiz-rise {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes quiz-streak-pop {
          from { transform: scale(0.96); }
          to { transform: scale(1); }
        }
        @keyframes quiz-spark {
          to { opacity: 0; transform: translate(var(--sx), var(--sy)); }
        }
        .quiz-arena {
          --quiz-accent: #a78bfa;
          --quiz-accent-from: #6366f1;
          --quiz-accent-to: #8b5cf6;
          --quiz-glow: rgba(99, 102, 241, 0.45);
        }
        .quiz-arena-drift {
          background: radial-gradient(circle at 50% 42%, color-mix(in srgb, var(--quiz-accent) 22%, transparent), transparent 48%);
          animation: quiz-arena-drift 28s ease-in-out infinite alternate;
        }
        .quiz-subject-action {
          background-image: linear-gradient(90deg, var(--quiz-accent-from), var(--quiz-accent-to));
          box-shadow: 0 0 28px -8px var(--quiz-glow);
        }
        .quiz-subject-chip {
          background: color-mix(in srgb, var(--quiz-accent) 22%, transparent);
          color: var(--quiz-accent);
        }
        .quiz-progress-fill {
          background-image: linear-gradient(90deg, var(--quiz-accent-from), var(--quiz-accent-to));
        }
        @media (min-width: 640px) {
          .quiz-hud-controls { display: contents; }
        }
        .quiz-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015)), #0c1322;
          box-shadow: 0 18px 40px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.08);
          outline: 1px solid color-mix(in srgb, var(--quiz-accent) 27%, transparent);
        }
        .quiz-stage { transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1); }
        .quiz-stage.is-revealed { transform: translateY(-22px); }
        .quiz-arena .quiz-q-enter { animation: quiz-arena-q-in 280ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .quiz-arena .animate-correct-pulse { animation: quiz-success-pulse 420ms ease-out 250ms both; }
        .quiz-card-miss { animation: quiz-miss 280ms ease 250ms both; }
        ::view-transition-old(quiz-card) { animation: quiz-card-out 160ms ease both; }
        ::view-transition-new(quiz-card) { animation: quiz-arena-q-in 260ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        html:active-view-transition .quiz-q-enter { animation: none !important; }
        .quiz-xp-float {
          position: absolute;
          right: 0;
          bottom: calc(100% + 2px);
          z-index: 2;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.01em;
          color: #FBBF24;
          pointer-events: none;
          white-space: nowrap;
          animation: quiz-xp-rise 680ms ease-out 350ms both;
        }
        .quiz-progress-fill {
          position: relative;
          overflow: hidden;
          transition: width 480ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .quiz-progress-fill::after {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 28%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.42), transparent);
          animation: quiz-progress-sheen 640ms ease-out both;
        }
        .quiz-arena button.group {
          cursor: pointer;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }
        .quiz-arena button.group:not(:disabled) > span:first-child {
          color: var(--quiz-accent);
          background: color-mix(in srgb, var(--quiz-accent) 18%, transparent);
        }
        .quiz-arena button.group:hover:not(:disabled) {
          transform: translateY(-1px) scale(1.005);
          border-color: color-mix(in srgb, var(--quiz-accent) 45%, transparent);
          box-shadow: 0 8px 18px -14px var(--quiz-glow);
        }
        .quiz-arena button.group:hover:not(:disabled) > span:first-child {
          color: var(--quiz-accent);
          background: color-mix(in srgb, var(--quiz-accent) 32%, transparent);
        }
        .quiz-arena button.group:active:not(:disabled) { transform: scale(0.985); }
        .quiz-arena button.group:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px #050816, 0 0 0 4px var(--quiz-accent);
        }
        .quiz-answer-sweep { animation: quiz-correct-in 180ms ease 120ms both; }
        .quiz-answer-sweep::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, transparent 30%, rgba(167, 243, 208, 0.28), transparent 70%);
          animation: quiz-sweep 420ms ease-out 140ms both;
          pointer-events: none;
        }
        .quiz-answer-nudge { animation: quiz-nudge 200ms ease 40ms both, quiz-wrong-in 180ms ease 120ms both; }
        .quiz-check-pop { animation: quiz-check-pop 200ms ease 180ms both; }
        .quiz-feedback { animation: quiz-rise 220ms ease 250ms both; }
        .quiz-explain { animation: quiz-rise 280ms ease 500ms both; }
        .quiz-explain svg { color: var(--quiz-accent); }
        .quiz-continue { animation: quiz-rise 240ms ease 650ms both; }
        .quiz-streak-pulse { animation: quiz-streak-pop 220ms ease 450ms both; }
        .quiz-streak-warm { color: #FDBA74; }
        .quiz-streak-hot { color: #FB923C; text-shadow: 0 0 10px rgba(249, 115, 22, 0.45); }
        .quiz-streak-max { color: #FDE68A; text-shadow: 0 0 12px rgba(251, 191, 36, 0.55); }
        .quiz-streak-celebrate { animation: quiz-streak-pop 280ms ease 450ms both; }
        .quiz-streak-sparks { position: relative; }
        .quiz-streak-sparks i {
          position: absolute;
          left: 6px;
          top: 6px;
          width: 2px;
          height: 2px;
          border-radius: 999px;
          background: #FBBF24;
          animation: quiz-spark 520ms ease-out 450ms both;
        }
        .quiz-streak-note { animation: quiz-fade 200ms ease 500ms both; }
        @media (max-height: 760px) and (min-width: 640px) {
          .quiz-stage.is-revealed { transform: translateY(-10px); }
        }
        @media (max-width: 639px) {
          .quiz-stage.is-revealed { transform: none; }
          .quiz-arena-drift { animation: none; }
          .quiz-streak-sparks i { animation: none; opacity: 0; }
          .quiz-answer-sweep::after { animation: none; }
          .quiz-arena .quiz-card h2 {
            font-size: clamp(19px, 5.6vw, 23px);
            line-height: 1.4;
          }
        }
        @media (max-height: 500px) and (orientation: landscape) {
          .quiz-arena .quiz-card h2 {
            font-size: clamp(19px, 2.6vw, 23px);
            line-height: 1.4;
          }
          .quiz-stage.is-revealed { transform: none; }
        }
        @media (hover: none) {
          .quiz-arena button.group:hover:not(:disabled) { transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .quiz-arena-drift,
          .quiz-arena .quiz-q-enter,
          .quiz-arena .animate-correct-pulse,
          .quiz-arena .animate-shake,
          .quiz-card-miss,
          .quiz-answer-sweep,
          .quiz-answer-sweep::after,
          .quiz-answer-nudge,
          .quiz-check-pop,
          .quiz-streak-pulse,
          .quiz-streak-celebrate,
          .quiz-streak-sparks i,
          .quiz-progress-fill::after {
            animation: none !important;
          }
          .quiz-stage, .quiz-progress-fill, .quiz-arena button.group { transition: none !important; }
          .quiz-stage.is-revealed { transform: none; }
          .quiz-xp-float { animation: quiz-fade 180ms ease both !important; }
          .quiz-feedback, .quiz-explain, .quiz-continue, .quiz-streak-note {
            animation: quiz-fade 160ms ease both !important;
          }
        }
      `}</style>
      <div
        className="quiz-arena-drift pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex min-h-full w-full max-w-[1050px] flex-col px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pb-[max(1rem,env(safe-area-inset-bottom))]">
        {children}
      </div>
    </div>
  );

  if (typeof document === "undefined") return frame;
  return createPortal(frame, document.body);
}
