import { useEffect, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { subjectPlanetStyles, type SubjectPlanetId } from "@/components/AcademyPage";
import { PlanetEnvironment, type PlanetSubjectId } from "@/components/PlanetEnvironment";

const LEARNING_ARENA_CSS = `
  @keyframes learning-arena-drift {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(-1.2%, 0.8%, 0); }
  }
  .learning-arena {
    --arena-accent: #a78bfa;
    --arena-accent-from: #6366f1;
    --arena-accent-to: #8b5cf6;
    --arena-glow: rgba(99, 102, 241, 0.45);
  }
  .learning-arena-drift {
    background: radial-gradient(circle at 50% 42%, color-mix(in srgb, var(--arena-accent) 22%, transparent), transparent 48%);
    animation: learning-arena-drift 28s ease-in-out infinite alternate;
  }
  /* Below the desktop breakpoint the app keeps its floating bottom navigation
     (z-80) on top of a session that opts in, and the content clears it. */
  @media (max-width: 1023px) {
    .learning-arena.keeps-mobile-nav { z-index: 70; }
    .learning-arena.keeps-mobile-nav .learning-arena-content {
      padding-bottom: var(--mobile-content-bottom);
    }
  }
  @media (max-width: 639px) {
    .learning-arena-drift { animation: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .learning-arena-drift { animation: none !important; }
  }
`;

/**
 * Full-viewport presentation frame shared by the Quiz and Flashcard arenas.
 * It owns only presentation: portal, scroll lock, backdrop, subject accent
 * variables, content width and safe-area padding. Each learning tool renders
 * its own behaviour inside it.
 * Subject colour comes from the Dashboard Subject Worlds map; the optional
 * "planet" atmosphere reuses the subject's existing world scene.
 */
export function LearningArena({
  children,
  subjectId,
  className = "",
  label,
  atmosphere = "drift",
  keepMobileNav = false,
}: {
  children: ReactNode;
  subjectId?: string | null;
  className?: string;
  label: string;
  atmosphere?: "drift" | "planet";
  keepMobileNav?: boolean;
}) {
  const planet =
    subjectId && subjectPlanetStyles && subjectId in subjectPlanetStyles
      ? subjectPlanetStyles[subjectId as SubjectPlanetId]
      : null;
  const themeVars: CSSProperties | undefined = planet
    ? {
        ["--arena-accent" as string]: planet.color,
        ["--arena-accent-from" as string]: planet.accentFrom,
        ["--arena-accent-to" as string]: planet.accentTo,
        ["--arena-glow" as string]: planet.glow,
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
      className={`learning-arena fixed inset-0 z-[200] isolate overflow-x-hidden overflow-y-auto bg-[#050816] text-white ${keepMobileNav ? "keeps-mobile-nav" : ""} ${className}`}
      style={{ minHeight: "100vh", height: "100dvh", ...themeVars }}
      role="region"
      aria-label={label}
    >
      <style>{LEARNING_ARENA_CSS}</style>
      {atmosphere === "planet" && planet ? (
        <PlanetEnvironment subjectId={subjectId as PlanetSubjectId} />
      ) : (
        // Clipped so the drifting glow can never extend the scrollable area.
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="learning-arena-drift absolute inset-0" />
        </div>
      )}
      <div className="learning-arena-content relative mx-auto flex min-h-full w-full max-w-[1050px] flex-col px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pb-[max(1rem,env(safe-area-inset-bottom))]">
        {children}
      </div>
    </div>
  );

  if (typeof document === "undefined") return frame;
  return createPortal(frame, document.body);
}
