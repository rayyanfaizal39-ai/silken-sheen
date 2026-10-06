import type { ReactNode } from "react";
import { LearningArena } from "@/components/learning/LearningArena";

/**
 * Quiz experience inside the shared Learning Arena frame.
 * It does not own questions, answers, timers, or scoring — only the
 * quiz-specific presentation rules layered on top of the arena.
 */
export function QuizArena({
  children,
  subjectId,
}: {
  children: ReactNode;
  subjectId?: string | null;
}) {
  return (
    <LearningArena subjectId={subjectId} className="quiz-arena" label="AcadeMY Quiz Arena">
      <style>{`
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
          --quiz-accent: var(--arena-accent);
          --quiz-accent-from: var(--arena-accent-from);
          --quiz-accent-to: var(--arena-accent-to);
          --quiz-glow: var(--arena-glow);
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
        .quiz-stage { width: 100%; }
        .quiz-arena .quiz-stage.is-anchored {
          padding-top: clamp(0.5rem, 2vh, 1rem);
        }
        @media (min-width: 640px) {
          .quiz-arena .quiz-stage.is-anchored {
            padding-top: calc(1.5rem + 4vh);
          }
        }
        @media (min-width: 1024px) {
          .quiz-arena .quiz-stage.is-anchored {
            padding-top: max(min(calc(1.5rem + 11vh), 10rem), min(calc(28vh - 4.5rem), 13rem));
          }
        }
        .quiz-stage.is-revealed { transform: none; }
        .quiz-swap {
          width: 100%;
        }
        .quiz-swap:has(.is-exiting),
        .quiz-swap:has(.is-preparing),
        .quiz-swap:has(.is-entering) {
          overflow-x: clip;
        }
        .quiz-swap-panel {
          will-change: transform, opacity;
        }
        .quiz-swap-panel.is-preparing {
          opacity: 0;
          transform: translate3d(20px, 0, 0);
        }
        .quiz-swap-panel.is-exiting {
          animation: quiz-swap-out 220ms cubic-bezier(0.4, 0, 1, 1) both;
          pointer-events: none;
        }
        .quiz-swap-panel.is-entering {
          animation: quiz-swap-in 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes quiz-swap-out {
          from { opacity: 1; transform: translate3d(0, 0, 0); }
          to { opacity: 0; transform: translate3d(-20px, 0, 0); }
        }
        @keyframes quiz-swap-in {
          from { opacity: 0; transform: translate3d(20px, 0, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes quiz-swap-fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes quiz-swap-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .quiz-complete {
          position: relative;
        }
        .quiz-complete-score {
          position: relative;
          isolation: isolate;
        }
        .quiz-complete-glow {
          position: absolute;
          inset: -18% -8%;
          z-index: -1;
          border-radius: 999px;
          background: radial-gradient(circle, color-mix(in srgb, var(--quiz-accent) 42%, transparent), transparent 68%);
          animation: quiz-complete-pulse 1.1s ease-out both;
          pointer-events: none;
        }
        .quiz-complete-stars {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .quiz-complete-stars i {
          position: absolute;
          bottom: 28%;
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: var(--quiz-accent);
          box-shadow: 0 0 10px var(--quiz-accent);
          animation: quiz-star-rise 1.05s ease-out both;
        }
        @keyframes quiz-complete-pulse {
          0% { opacity: 0; transform: scale(0.94); }
          35% { opacity: 1; }
          100% { opacity: 0.45; transform: scale(1); }
        }
        @keyframes quiz-star-rise {
          from { opacity: 0; transform: translateY(6px) scale(0.7); }
          28% { opacity: 1; }
          to { opacity: 0; transform: translateY(-26px) scale(1); }
        }
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
          .quiz-stage.is-revealed { transform: none; }
        }
        @media (max-width: 639px) {
          .quiz-stage.is-revealed { transform: none; }
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
          .quiz-swap-panel.is-preparing {
            transform: none !important;
            opacity: 0;
          }
          .quiz-swap-panel.is-exiting {
            animation: quiz-swap-fade-out 90ms linear both !important;
          }
          .quiz-swap-panel.is-entering {
            animation: quiz-swap-fade-in 90ms linear both !important;
          }
          .quiz-complete-glow,
          .quiz-complete-stars i {
            animation: none !important;
          }
        }
      `}</style>
      {children}
    </LearningArena>
  );
}
