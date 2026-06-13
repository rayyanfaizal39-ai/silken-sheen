import { useEffect, useRef, useState } from "react";
import astronautRocket from "@/assets/premium-astronaut-rocket.png";

export function AstronautScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      targetX = (e.clientX - r.left - r.width / 2) / (window.innerWidth / 2);
      targetY = (e.clientY - r.top - r.height / 2) / (window.innerHeight / 2);
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;
      setTilt({ x: currentX, y: currentY });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  const layer = (depth: number) => ({
    transform: `translate3d(${tilt.x * depth}px, ${tilt.y * depth}px, 0)`,
  });

  return (
    <div ref={ref} className="astronaut-scene pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>

      {/* ── Layer –30: Dense far-field star fabric ─────────────────── */}
      <div className="absolute inset-0 will-change-transform" style={layer(-30)}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "radial-gradient(0.8px 0.8px at 5% 8%, rgba(255,255,255,0.7), transparent 60%)",
              "radial-gradient(0.8px 0.8px at 14% 31%, rgba(255,255,255,0.55), transparent 60%)",
              "radial-gradient(1px 1px at 23% 72%, rgba(255,255,255,0.65), transparent 60%)",
              "radial-gradient(0.8px 0.8px at 33% 18%, rgba(255,255,255,0.5), transparent 60%)",
              "radial-gradient(1px 1px at 41% 52%, rgba(255,255,255,0.6), transparent 60%)",
              "radial-gradient(0.8px 0.8px at 52% 88%, rgba(255,255,255,0.55), transparent 60%)",
              "radial-gradient(1px 1px at 63% 24%, rgba(255,255,255,0.7), transparent 60%)",
              "radial-gradient(0.8px 0.8px at 74% 67%, rgba(255,255,255,0.5), transparent 60%)",
              "radial-gradient(1px 1px at 83% 43%, rgba(255,255,255,0.65), transparent 60%)",
              "radial-gradient(0.8px 0.8px at 91% 14%, rgba(255,255,255,0.6), transparent 60%)",
              "radial-gradient(0.8px 0.8px at 97% 79%, rgba(255,255,255,0.55), transparent 60%)",
              "radial-gradient(0.6px 0.6px at 9% 56%, rgba(255,255,255,0.45), transparent 60%)",
              "radial-gradient(0.6px 0.6px at 19% 92%, rgba(255,255,255,0.4), transparent 60%)",
              "radial-gradient(0.6px 0.6px at 47% 36%, rgba(255,255,255,0.45), transparent 60%)",
              "radial-gradient(0.6px 0.6px at 57% 74%, rgba(255,255,255,0.4), transparent 60%)",
              "radial-gradient(0.6px 0.6px at 79% 9%, rgba(255,255,255,0.5), transparent 60%)",
              "radial-gradient(0.6px 0.6px at 87% 58%, rgba(255,255,255,0.45), transparent 60%)",
            ].join(","),
            animation: "astronaut-twinkle 8s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── Layer –22: Deep nebula — fills the FULL hero ───────────── */}
      <div className="absolute inset-0 will-change-transform" style={layer(-22)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(99,102,241,0.30),transparent_45%),radial-gradient(circle_at_82%_22%,rgba(59,130,246,0.22),transparent_40%)]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 42%, rgba(79,70,229,0.24) 0%, rgba(99,102,241,0.12) 32%, transparent 58%), radial-gradient(ellipse at 28% 22%, rgba(139,92,246,0.16) 0%, transparent 44%), radial-gradient(ellipse at 22% 72%, rgba(99,102,241,0.14) 0%, transparent 48%)",
          }}
        />
        <div className="astronaut-nebula absolute inset-0" />
      </div>

      {/* ── Layer –18: Orbit arc rings ────────────────────────────── */}
      <div className="absolute inset-0 will-change-transform" style={layer(-18)}>
        <div
          className="absolute"
          style={{
            left: "58%", top: "46%",
            width: 580, height: 240,
            transform: "translate(-50%,-50%)",
          }}
        >
          <div className="hero-orbit-arc hero-orbit-arc--outer absolute inset-0" />
          <div className="hero-orbit-arc hero-orbit-arc--mid absolute inset-0" />
          <div className="hero-orbit-arc hero-orbit-arc--inner absolute inset-0" />
        </div>
      </div>

      {/* ── Layer –14: Mid-depth star field ──────────────────────── */}
      <div className="absolute inset-0 will-change-transform" style={layer(-14)}>
        <div className="astronaut-stars" />
      </div>

      {/* ── Layer –10: Satellites ──────────────────────────────────── */}
      <div className="absolute inset-0 will-change-transform" style={layer(-10)}>
        <span className="hero-satellite hero-satellite--a" />
        <span className="hero-satellite hero-satellite--b" />
        <span className="hero-satellite hero-satellite--c" />
      </div>

      {/* ── Layer –6: Background planets — some BEHIND text zone ─── */}
      <div className="absolute inset-0 will-change-transform" style={layer(-6)}>
        <span className="astronaut-planet astronaut-planet--a" />
        <span className="astronaut-planet astronaut-planet--b" />
        <span className="astronaut-planet astronaut-planet--c" />
        <span className="astronaut-planet astronaut-planet--d" />
        <span className="astronaut-planet astronaut-planet--e" />
      </div>

      {/* ── Layer 3: Scene-wide rocket trail ─────────────────────── */}
      <div className="absolute inset-0 will-change-transform" style={layer(3)}>
        <div className="astronaut-rocket-trail-scene" />
      </div>

      {/* ── Layer 5: Atmosphere bridge ───────────────────────────── */}
      <div className="absolute inset-0 will-change-transform" style={layer(5)}>
        <div className="astronaut-atmosphere-bridge absolute bottom-0 left-[-8%] right-[-8%] top-0" />
        <div
          className="pointer-events-none absolute"
          style={{
            left: "-5%", right: "30%", top: "12%", bottom: "12%",
            background:
              "radial-gradient(ellipse at 58% 50%, rgba(99,102,241,0.20) 0%, rgba(79,70,229,0.10) 38%, rgba(139,92,246,0.05) 58%, transparent 75%)",
            filter: "blur(40px)",
            animation: "astronaut-atmosphere-breathe 12s ease-in-out 1.2s infinite",
          }}
        />
      </div>

      {/* ── Layer 8: Space debris ─────────────────────────────────── */}
      <div className="absolute inset-0 will-change-transform" style={layer(8)}>
        <span className="hero-debris hero-debris--1" />
        <span className="hero-debris hero-debris--2" />
        <span className="hero-debris hero-debris--3" />
        <span className="hero-debris hero-debris--4" />
        <span className="hero-debris hero-debris--5" />
      </div>

      {/* ── Layer 10: Rocket exhaust particles ───────────────────── */}
      <div className="absolute inset-0 will-change-transform" style={layer(10)}>
        <span className="astronaut-particle astronaut-particle--1" />
        <span className="astronaut-particle astronaut-particle--2" />
        <span className="astronaut-particle astronaut-particle--3" />
        <span className="astronaut-particle astronaut-particle--4" />
        <span className="astronaut-particle astronaut-particle--5" />
      </div>

      {/* ── Layer 20: Astronaut — max parallax, bleeds into text ─── */}
      <div className="absolute inset-0 will-change-transform" style={layer(20)}>
        {/*
          Pushed further left vs previous (right -12%, w 82%) so the
          astronaut's center mass bleeds more into the headline zone.
          The halo extends 60% leftward to physically overlap the text.
        */}
        <div className="astronaut-float absolute top-1/2 -translate-y-[47%] right-[-12%] w-[82%] h-[122%] sm:right-[-6%] sm:w-[76%] md:right-[-3%] md:w-[70%] lg:right-[1%] lg:w-[66%]">

          {/* Primary halo — 60% leftward reach into text zone */}
          <div
            className="astronaut-halo pointer-events-none absolute top-1/2 -translate-y-1/2"
            style={{
              left: "-60%", right: "-6%", height: "152%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 75% 50%, rgba(129,140,248,0.58) 0%, rgba(139,92,246,0.34) 20%, rgba(99,102,241,0.17) 40%, rgba(59,130,246,0.07) 60%, transparent 76%)",
              filter: "blur(28px)",
            }}
          />

          {/* Wide ambient fill — even further left */}
          <div
            className="pointer-events-none absolute top-1/2 -translate-y-1/2"
            style={{
              left: "-80%", right: "-14%", height: "170%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at 77% 50%, rgba(99,102,241,0.14) 0%, rgba(139,92,246,0.06) 44%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* Orbit arc ring behind astronaut */}
          <div className="astronaut-orbit-ring pointer-events-none absolute inset-0" />

          {/* Astronaut */}
          <img
            src={astronautRocket}
            alt=""
            className="relative h-full w-full select-none object-contain object-right drop-shadow-[0_24px_80px_rgba(99,102,241,0.68)]"
            draggable={false}
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 98% 94% at 62% 50%, #000 38%, rgba(0,0,0,0.65) 56%, rgba(0,0,0,0.22) 75%, transparent 96%)",
              maskImage:
                "radial-gradient(ellipse 98% 94% at 62% 50%, #000 38%, rgba(0,0,0,0.65) 56%, rgba(0,0,0,0.22) 75%, transparent 96%)",
            }}
          />

          {/* Visor light sweep */}
          <div className="astronaut-visor" />

          {/* Rocket exhaust near-field glow (tight, right at nozzle) */}
          <div
            className="pointer-events-none absolute"
            style={{
              bottom: "14%", left: "34%", right: "24%", height: "24%",
              background: "radial-gradient(ellipse at 60% 60%, rgba(167,139,250,0.45) 0%, rgba(99,102,241,0.20) 40%, transparent 70%)",
              filter: "blur(16px)",
              animation: "astronaut-trail-pulse 3.2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}
