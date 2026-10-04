import { useEffect, type ReactNode } from "react";

/**
 * Full-viewport presentation frame for an in-progress Junior quiz.
 * It does not own questions, answers, timers, or scoring.
 */
export function QuizArena({ children }: { children: ReactNode }) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div
      className="quiz-arena fixed inset-0 z-[100] overflow-y-auto bg-[#050816] text-white"
      style={{ minHeight: "100vh", height: "100dvh" }}
      role="region"
      aria-label="AcadeMY Quiz Arena"
    >
      <style>{`
        @keyframes quiz-arena-glow {
          50% { opacity: 0.45; }
        }
        .quiz-arena-orb { animation: quiz-arena-glow 8s ease-in-out infinite; }
        @keyframes quiz-arena-float {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(-10px); }
        }
        .quiz-arena-float { animation: quiz-arena-float 0.55s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .quiz-arena-orb,
          .quiz-arena-float,
          .quiz-arena .animate-shake,
          .quiz-arena .animate-correct-pulse,
          .quiz-arena .quiz-q-enter {
            animation: none !important;
          }
        }
      `}</style>
      <div
        className="quiz-arena-orb pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#6D28FF]/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="quiz-arena-orb pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#312E81]/40 blur-3xl"
        aria-hidden="true"
        style={{ animationDelay: "1.5s" }}
      />
      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-5xl flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
        {children}
      </div>
    </div>
  );
}
