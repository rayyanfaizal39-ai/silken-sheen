import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

export const Route = createFileRoute("/academy/landingpage3")({
  component: LandingPage3,
  head: () => ({
    meta: [
      { title: "AcadeMY — Landing Page 3" },
      { name: "description", content: "AcadeMY cinematic space environment." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

/* ------------------------------------------------------------------ */
/* Cinematic space hero — pure CSS/SVG layered background system.      */
/* No foreground content. No text. Only the animated backdrop.         */
/* ------------------------------------------------------------------ */

function LandingPage3() {
  return (
    <>
      <style>{HERO_CSS}</style>
      <HeroBackground />
    </>
  );
}

function HeroBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setIsDesktop(mqDesktop.matches);
      setReduced(mqReduced.matches);
    };
    update();
    mqDesktop.addEventListener("change", update);
    mqReduced.addEventListener("change", update);
    return () => {
      mqDesktop.removeEventListener("change", update);
      mqReduced.removeEventListener("change", update);
    };
  }, []);

  // Extremely subtle mouse parallax — desktop only, reduced-motion aware.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (!isDesktop || reduced) {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
      return;
    }
    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      // -0.5 .. 0.5
      targetX = (e.clientX - r.left) / r.width - 0.5;
      targetY = (e.clientY - r.top) / r.height - 0.5;
    };

    const tick = () => {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      el.style.setProperty("--mx", curX.toFixed(4));
      el.style.setProperty("--my", curY.toFixed(4));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [isDesktop, reduced]);

  // Sparse star field — computed once. Tablet/mobile densities are lower.
  const stars = useMemo(() => generateStars(90), []);
  const particles = useMemo(() => generateParticles(14), []);

  return (
    <div ref={rootRef} className="lp3-hero" data-reduced={reduced ? "true" : "false"}>
      {/* Layer 1 — deep-space base gradient */}
      <div className="lp3-layer lp3-base" aria-hidden />

      {/* Layer 2 — sparse stars (SVG) */}
      <svg
        className="lp3-layer lp3-stars"
        aria-hidden
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="white"
            opacity={s.o}
            style={{
              animation: `lp3-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </svg>

      {/* Layer 3 — soft purple nebula */}
      <div className="lp3-layer lp3-nebula-wrap" aria-hidden>
        <div className="lp3-nebula" />
      </div>

      {/* Layer 4 — distant planet (upper-right) */}
      <div className="lp3-layer lp3-planet-wrap" aria-hidden>
        <div className="lp3-planet">
          <div className="lp3-planet-body" />
          <div className="lp3-planet-shade" />
          <div className="lp3-planet-glow" />
        </div>
      </div>

      {/* Layer 5 — small moon */}
      <div className="lp3-layer lp3-moon-wrap" aria-hidden>
        <div className="lp3-moon">
          <div className="lp3-moon-body" />
          <div className="lp3-moon-shade" />
        </div>
      </div>

      {/* Layer 6 — drifting particles */}
      <div className="lp3-layer lp3-particles" aria-hidden>
        {particles.map((p, i) => (
          <span
            key={i}
            className="lp3-particle"
            style={{
              left: `${p.x}%`,
              bottom: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.o,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Layer 7 — foreground purple gas along bottom edge */}
      <div className="lp3-layer lp3-gas" aria-hidden>
        <div className="lp3-gas-a" />
        <div className="lp3-gas-b" />
      </div>
    </div>
  );
}

/* ---------------------- generators ---------------------- */

function generateStars(count: number) {
  // Deterministic-ish sparse distribution.
  const stars: { x: number; y: number; r: number; o: number; dur: number; delay: number }[] = [];
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < count; i++) {
    stars.push({
      x: rand() * 1600,
      y: rand() * 1000,
      r: 0.4 + rand() * 1.1,
      o: 0.25 + rand() * 0.55,
      dur: 3 + rand() * 5,
      delay: rand() * 6,
    });
  }
  return stars;
}

function generateParticles(count: number) {
  const out: { x: number; y: number; size: number; o: number; dur: number; delay: number }[] = [];
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < count; i++) {
    out.push({
      x: rand() * 100,
      y: rand() * 60,
      size: 1 + rand() * 2.2,
      o: 0.15 + rand() * 0.35,
      dur: 22 + rand() * 24,
      delay: rand() * -30,
    });
  }
  return out;
}

/* ---------------------- CSS ---------------------- */

const HERO_CSS = `
.lp3-hero {
  position: relative;
  width: 100%;
  min-height: 100svh;
  overflow: hidden;
  background: #05061a;
  isolation: isolate;
  --mx: 0;
  --my: 0;
}

.lp3-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* 1. Base deep-space gradient */
.lp3-base {
  background:
    radial-gradient(120% 80% at 78% 18%, rgba(76, 38, 130, 0.35) 0%, rgba(76, 38, 130, 0) 55%),
    radial-gradient(90% 70% at 10% 90%, rgba(60, 22, 110, 0.28) 0%, rgba(60, 22, 110, 0) 60%),
    linear-gradient(180deg, #05061a 0%, #07061f 40%, #0a0724 100%);
}

/* 2. Stars */
.lp3-stars {
  width: 100%;
  height: 100%;
  transform: translate3d(calc(var(--mx) * -4px), calc(var(--my) * -4px), 0);
  will-change: transform;
}
@keyframes lp3-twinkle {
  0%, 100% { opacity: var(--o, 0.5); transform: scale(1); }
  50% { opacity: 0.15; transform: scale(0.85); }
}

/* 3. Nebula — soft blurred purple cloud, drifting + breathing */
.lp3-nebula-wrap {
  transform: translate3d(calc(var(--mx) * -8px), calc(var(--my) * -6px), 0);
  will-change: transform;
}
.lp3-nebula {
  position: absolute;
  top: -10%;
  left: -15%;
  width: 90%;
  height: 90%;
  background:
    radial-gradient(closest-side, rgba(160, 90, 220, 0.55) 0%, rgba(120, 60, 200, 0.32) 35%, rgba(80, 40, 160, 0) 70%),
    radial-gradient(closest-side, rgba(200, 130, 240, 0.28) 0%, rgba(140, 80, 220, 0) 60%);
  filter: blur(60px);
  opacity: 0.85;
  animation: lp3-nebula-drift 34s ease-in-out infinite alternate;
  transform-origin: 50% 50%;
}
@keyframes lp3-nebula-drift {
  0%   { transform: translate3d(-2%, -1%, 0) scale(1); opacity: 0.75; }
  50%  { transform: translate3d(2%, 1.5%, 0) scale(1.06); opacity: 0.9; }
  100% { transform: translate3d(-1%, 2%, 0) scale(1.02); opacity: 0.8; }
}

/* 4. Planet — upper-right, gentle float */
.lp3-planet-wrap {
  transform: translate3d(calc(var(--mx) * -14px), calc(var(--my) * -10px), 0);
  will-change: transform;
}
.lp3-planet {
  position: absolute;
  top: -8%;
  right: -6%;
  width: 540px;
  height: 540px;
  animation: lp3-planet-float 48s ease-in-out infinite;
  will-change: transform;
}
.lp3-planet-body {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(circle at 32% 30%, #b78bff 0%, #7a4bd6 22%, #4a2496 55%, #29104f 85%, #180831 100%);
  box-shadow:
    inset -30px -40px 90px rgba(0, 0, 0, 0.55),
    inset 20px 20px 60px rgba(210, 170, 255, 0.18);
}
.lp3-planet-shade {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 70% 70%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 55%);
  mix-blend-mode: multiply;
}
.lp3-planet-glow {
  position: absolute;
  inset: -18%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(160, 100, 230, 0.28) 0%, rgba(160, 100, 230, 0) 62%);
  filter: blur(20px);
}
@keyframes lp3-planet-float {
  0%   { transform: translate3d(0, 0, 0) rotate(0deg); }
  50%  { transform: translate3d(0, 7px, 0) rotate(1.2deg); }
  100% { transform: translate3d(0, 0, 0) rotate(0deg); }
}

/* 5. Moon */
.lp3-moon-wrap {
  transform: translate3d(calc(var(--mx) * -10px), calc(var(--my) * -8px), 0);
  will-change: transform;
}
.lp3-moon {
  position: absolute;
  top: 34%;
  right: 22%;
  width: 78px;
  height: 78px;
  animation: lp3-moon-float 32s ease-in-out infinite;
  will-change: transform;
}
.lp3-moon-body {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 32%, #e7d5ff 0%, #b7a0e0 40%, #6b56a4 78%, #3a2a66 100%);
  box-shadow:
    inset -6px -8px 16px rgba(0, 0, 0, 0.55),
    0 0 24px rgba(180, 140, 240, 0.25);
}
.lp3-moon-shade {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 75% 70%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 55%);
}
@keyframes lp3-moon-float {
  0%   { transform: translate3d(0, 0, 0); }
  50%  { transform: translate3d(3px, 6px, 0); }
  100% { transform: translate3d(0, 0, 0); }
}

/* 6. Particles */
.lp3-particles {
  transform: translate3d(calc(var(--mx) * -6px), calc(var(--my) * -4px), 0);
  will-change: transform;
}
.lp3-particle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(220, 200, 255, 0.9) 0%, rgba(180, 140, 240, 0.15) 60%, transparent 100%);
  animation: lp3-particle-drift linear infinite;
  will-change: transform, opacity;
}
@keyframes lp3-particle-drift {
  0%   { transform: translate3d(0, 0, 0); opacity: 0; }
  15%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { transform: translate3d(30px, -220px, 0); opacity: 0; }
}

/* 7. Foreground purple gas */
.lp3-gas {
  transform: translate3d(calc(var(--mx) * -22px), calc(var(--my) * -14px), 0);
  will-change: transform;
}
.lp3-gas-a,
.lp3-gas-b {
  position: absolute;
  left: -20%;
  right: -20%;
  bottom: -30%;
  height: 70%;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.75;
}
.lp3-gas-a {
  background: radial-gradient(ellipse at 50% 100%, rgba(140, 80, 220, 0.55) 0%, rgba(90, 50, 180, 0.25) 40%, rgba(50, 20, 110, 0) 70%);
  animation: lp3-gas-a 38s ease-in-out infinite alternate;
}
.lp3-gas-b {
  background: radial-gradient(ellipse at 30% 100%, rgba(180, 110, 240, 0.35) 0%, rgba(120, 60, 200, 0.18) 45%, rgba(60, 20, 120, 0) 75%);
  animation: lp3-gas-b 44s ease-in-out infinite alternate;
  mix-blend-mode: screen;
}
@keyframes lp3-gas-a {
  0%   { transform: translate3d(-2%, 2%, 0) scale(1); opacity: 0.7; }
  100% { transform: translate3d(3%, -1%, 0) scale(1.05); opacity: 0.85; }
}
@keyframes lp3-gas-b {
  0%   { transform: translate3d(2%, 1%, 0) scale(1.02); opacity: 0.55; }
  100% { transform: translate3d(-3%, -2%, 0) scale(1.08); opacity: 0.75; }
}

/* Tablet */
@media (max-width: 1024px) {
  .lp3-planet { width: 380px; height: 380px; top: -6%; right: -8%; }
  .lp3-moon   { width: 60px; height: 60px; top: 30%; right: 18%; }
  .lp3-nebula { filter: blur(50px); }
}

/* Mobile */
@media (max-width: 640px) {
  .lp3-planet { width: 300px; height: 300px; top: -10%; right: -18%; }
  .lp3-moon   { width: 44px; height: 44px; top: 22%; right: 14%; }
  .lp3-nebula { filter: blur(40px); opacity: 0.7; }
  .lp3-gas-a, .lp3-gas-b { filter: blur(50px); }
  .lp3-particle:nth-child(n+8) { display: none; }
  .lp3-stars circle:nth-child(2n) { display: none; }
}

/* Reduced motion — stop nonessential animation */
@media (prefers-reduced-motion: reduce) {
  .lp3-nebula,
  .lp3-planet,
  .lp3-moon,
  .lp3-particle,
  .lp3-gas-a,
  .lp3-gas-b,
  .lp3-stars circle {
    animation: none !important;
  }
}
.lp3-hero[data-reduced="true"] .lp3-nebula,
.lp3-hero[data-reduced="true"] .lp3-planet,
.lp3-hero[data-reduced="true"] .lp3-moon,
.lp3-hero[data-reduced="true"] .lp3-particle,
.lp3-hero[data-reduced="true"] .lp3-gas-a,
.lp3-hero[data-reduced="true"] .lp3-gas-b,
.lp3-hero[data-reduced="true"] .lp3-stars circle {
  animation: none !important;
}
`;
