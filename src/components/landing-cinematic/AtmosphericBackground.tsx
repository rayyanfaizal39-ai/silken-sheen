import { useMemo } from "react";

type Props = {
  variant?: "hero" | "world" | "cta";
  /** number of stars — kept deliberately low for a premium, uncluttered sky */
  stars?: number;
};

/** Deterministic pseudo-random so the sky doesn't reshuffle on re-render. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function AtmosphericBackground({ variant = "hero", stars = 26 }: Props) {
  const starField = useMemo(() => {
    const rand = seeded(
      variant === "hero" ? 42 : variant === "world" ? 77 : variant === "cta" ? 913 : 311,
    );
    return Array.from({ length: stars }, (_, i) => ({
      id: i,
      left: rand() * 100,
      top: rand() * 72,
      size: 1 + rand() * 1.8,
      opacity: 0.25 + rand() * 0.6,
      twinkle: 2.5 + rand() * 4,
      delay: rand() * 4,
      // Only three stars per section actually animate — a field of 14–26
      // twinkling elements is a lot of compositing for something nobody looks
      // at directly. The rest vary by size and opacity alone.
      live: i % 7 === 3 && i < 21,
    }));
  }, [variant, stars]);

  return (
    <div className={`atmo atmo--${variant}`} aria-hidden="true">
      <div className="atmo__base" />
      <div className="atmo__nebula atmo__nebula--a" />
      <div className="atmo__nebula atmo__nebula--b" />
      <div className="atmo__stars">
        {starField.map((s) => (
          <span
            key={s.id}
            className={`atmo__star ${s.live ? "atmo__star--live" : ""}`}
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              ...(s.live
                ? { animationDuration: `${s.twinkle}s`, animationDelay: `${s.delay}s` }
                : null),
            }}
          />
        ))}
      </div>
      <div className="atmo__grain" />
    </div>
  );
}
