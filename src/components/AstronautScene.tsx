import { useEffect, useRef, useState } from "react";
import astronautRocket from "@/assets/premium-astronaut-rocket.png";

/**
 * Cinematic full-hero scene:
 * - Astronaut as the central figure, visually inside the nebula environment
 * - Scene-wide diagonal rocket trail sweeping from rocket through the text zone
 * - Deep foreground / midground / background depth layers
 * - Planets behind text and around astronaut
 * - Mouse parallax across all layers
 * - Entry animation on load
 */
export function AstronautScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      targetX = (e.clientX - cx) / (window.innerWidth / 2);
      targetY = (e.clientY - cy) / (window.innerHeight / 2);
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      setTilt({ x: currentX, y: currentY });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const layer = (depth: number) => ({
    transform: `translate3d(${tilt.x * depth}px, ${tilt.y * depth}px, 0)`,
  });

  return (
    <div
      ref={ref}
      className="astronaut-scene pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* ── Layer 1: Deep nebula — fills the FULL hero including text zone ── */}
      <div className="absolute inset-0 will-change-transform" style={layer(-8)}>
        {/* Right-side astronaut nebula */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(99,102,241,0.30),transparent_45%),radial-gradient(circle_at_82%_22%,rgba(59,130,246,0.22),transparent_40%)]" />
        {/* LEFT-SIDE nebula — wraps the text zone into the same atmosphere */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 42%, rgba(79,70,229,0.24) 0%, rgba(99,102,241,0.12) 32%, transparent 58%), radial-gradient(ellipse at 28% 22%, rgba(139,92,246,0.16) 0%, transparent 44%), radial-gradient(ellipse at 22% 72%, rgba(99,102,241,0.14) 0%, transparent 48%)",
          }}
        />
        <div className="astronaut-nebula absolute inset-0" />
      </div>

      {/* ── Layer 2: Stars ──────────────────────────────────────── */}
      <div className="absolute inset-0 will-change-transform" style={layer(-14)}>
        <div className="astronaut-stars" />
      </div>

      {/* ── Layer 3: Background planets — some BEHIND the text zone ─ */}
      <div className="absolute inset-0 will-change-transform" style={layer(-22)}>
        {/* Upper-left — behind headline */}
        <span className="astronaut-planet astronaut-planet--a" />
        {/* Lower-right — near astronaut */}
        <span className="astronaut-planet astronaut-planet--b" />
        {/* Tiny rose accent — transition zone */}
        <span className="astronaut-planet astronaut-planet--c" />
        {/* Mid-left — visible beside "Reach Further." text */}
        <span className="astronaut-planet astronaut-planet--d" />
        {/* Tiny distant — upper right of scene */}
        <span className="astronaut-planet astronaut-planet--e" />
      </div>

      {/* ── Layer 4: SCENE-WIDE ROCKET TRAIL ────────────────────────
           The key compositional element: a diagonal exhaust plume that
           sweeps from the rocket (center-right) leftward and upward,
           physically passing through / behind the headline text zone.
           This is what makes the astronaut and text feel in ONE scene. */}
      <div className="absolute inset-0 will-change-transform" style={layer(3)}>
        <div className="astronaut-rocket-trail-scene" />
      </div>

      {/* ── Layer 5: Atmosphere bridge — midground connection ─────── */}
      <div className="absolute inset-0 will-change-transform" style={layer(5)}>
        <div className="astronaut-atmosphere-bridge absolute bottom-0 left-[-8%] right-[-8%] top-0" />
        {/* Extended LEFTWARD atmosphere: astronaut's halo reaches into text zone */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: "-5%",
            right: "30%",
            top: "12%",
            bottom: "12%",
            background:
              "radial-gradient(ellipse at 58% 50%, rgba(99,102,241,0.20) 0%, rgba(79,70,229,0.10) 38%, rgba(139,92,246,0.05) 58%, transparent 75%)",
            filter: "blur(40px)",
            animation: "astronaut-atmosphere-breathe 12s ease-in-out 1.2s infinite",
          }}
        />
      </div>

      {/* ── Layer 6: Rocket exhaust particles ──────────────────────── */}
      <div className="absolute inset-0 will-change-transform" style={layer(10)}>
        <span className="astronaut-particle astronaut-particle--1" />
        <span className="astronaut-particle astronaut-particle--2" />
        <span className="astronaut-particle astronaut-particle--3" />
        <span className="astronaut-particle astronaut-particle--4" />
        <span className="astronaut-particle astronaut-particle--5" />
      </div>

      {/* ── Layer 7: Astronaut — foreground, max parallax ──────────── */}
      <div className="absolute inset-0 will-change-transform" style={layer(20)}>
        {/*
          Container pushed LEFT vs old layout (right 4%, w 60%).
          New: right -8%, w 76% → left edge at ~32% (was 36%).
          Combined with the larger halo (left: -55%) the astronaut's
          ATMOSPHERE now physically overlaps the text zone.
          On tablet/mobile the container shifts to keep the scene balanced.
        */}
        <div className="astronaut-float absolute top-1/2 -translate-y-[47%] right-[-8%] w-[76%] h-[122%] sm:right-[-4%] sm:w-[72%] md:right-[-2%] md:w-[68%] lg:right-[0%] lg:w-[64%]">

          {/* MASSIVE halo — extends 55% of container to the LEFT toward text */}
          <div
            className="astronaut-halo pointer-events-none absolute top-1/2 -translate-y-1/2"
            style={{
              left: "-55%",
              right: "-6%",
              height: "148%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 75% 50%, rgba(129,140,248,0.56) 0%, rgba(139,92,246,0.32) 20%, rgba(99,102,241,0.16) 40%, rgba(59,130,246,0.07) 60%, transparent 76%)",
              filter: "blur(30px)",
            }}
          />

          {/* Secondary wide ambient fill — even further left */}
          <div
            className="pointer-events-none absolute top-1/2 -translate-y-1/2"
            style={{
              left: "-72%",
              right: "-12%",
              height: "165%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at 77% 50%, rgba(99,102,241,0.13) 0%, rgba(139,92,246,0.06) 44%, transparent 70%)",
              filter: "blur(56px)",
            }}
          />

          {/* Orbit arc ring behind astronaut */}
          <div className="astronaut-orbit-ring pointer-events-none absolute inset-0" />

          {/* Astronaut image — mask expanded for more organic blending */}
          <img
            src={astronautRocket}
            alt=""
            className="relative h-full w-full select-none object-contain object-right drop-shadow-[0_24px_80px_rgba(99,102,241,0.68)]"
            draggable={false}
            style={{
              /*
                Mask redesign:
                - Center shifted to 64% (was 60%) — exposes more of left astronaut area
                - Ellipse wider: 96% × 92% (was 92% × 90%) — more organic bleed
                - Softer falloff: extends to 97% before fully transparent
              */
              WebkitMaskImage:
                "radial-gradient(ellipse 96% 92% at 64% 50%, #000 38%, rgba(0,0,0,0.65) 56%, rgba(0,0,0,0.22) 75%, transparent 96%)",
              maskImage:
                "radial-gradient(ellipse 96% 92% at 64% 50%, #000 38%, rgba(0,0,0,0.65) 56%, rgba(0,0,0,0.22) 75%, transparent 96%)",
            }}
          />

          {/* Visor light sweep */}
          <div className="astronaut-visor" />
        </div>
      </div>
    </div>
  );
}
