import { useEffect, useMemo, useRef, useState } from "react";
import { AcademyLogo } from "@/components/AcademyLogo";
import "./academyLoadingScreen.css";

export const ACADEMY_LOADER_FADE_MS = 450;

type AcadeMYLoadingScreenProps = {
  /** When false the loader starts fading out. */
  visible: boolean;
  /** Called once the fade-out transition has completed. */
  onFadeOutComplete?: () => void;
  message?: string;
};

/**
 * Full-screen branded boot screen. Purely presentational — readiness is
 * decided by <AppBootGate />. Motion is CSS-only and disabled entirely under
 * `prefers-reduced-motion`.
 */
export function AcadeMYLoadingScreen({
  visible,
  onFadeOutComplete,
  message = "Preparing your learning mission…",
}: AcadeMYLoadingScreenProps) {
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    if (visible) return;
    setLeaving(true);
    const timer = window.setTimeout(() => {
      if (doneRef.current) return;
      doneRef.current = true;
      onFadeOutComplete?.();
    }, ACADEMY_LOADER_FADE_MS);
    return () => window.clearTimeout(timer);
  }, [visible, onFadeOutComplete]);

  // Deterministic star field — same values on server and client, so the
  // markup hydrates without a mismatch.
  const stars = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => {
        const golden = (i * 137.508) % 360;
        return {
          left: `${(golden / 360) * 100}%`,
          top: `${((i * 61) % 97) + 1}%`,
          size: i % 3 === 0 ? 3 : 2,
          delay: `${(i % 7) * 0.42}s`,
          duration: `${3.2 + (i % 5) * 0.6}s`,
        };
      }),
    [],
  );

  return (
    <div
      className={`academy-loader${leaving ? " academy-loader--leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="academy-loader__stars" aria-hidden="true">
        {stars.map((star, i) => (
          <span
            key={i}
            className="academy-loader__star"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      <div className="academy-loader__stage">
        <div className="academy-loader__glow" aria-hidden="true" />
        <div className="academy-loader__orbit academy-loader__orbit--outer" aria-hidden="true">
          <span className="academy-loader__satellite" />
        </div>
        <div className="academy-loader__orbit academy-loader__orbit--inner" aria-hidden="true">
          <span className="academy-loader__satellite academy-loader__satellite--small" />
        </div>
        <AcademyLogo variant="icon" className="academy-loader__logo" />
      </div>

      <p className="academy-loader__message">{message}</p>
      <div className="academy-loader__bar" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
