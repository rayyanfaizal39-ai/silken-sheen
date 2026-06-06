import { useEffect, useRef, useState } from "react";
import astronautRocket from "@/assets/premium-astronaut-rocket.png";

/**
 * Premium animated hero scene:
 * - Floating astronaut (slow 6s ease-in-out)
 * - Visor light sweep
 * - Rocket trail glow + pulsing particles
 * - Mouse parallax (foreground / midground / background)
 * - Drifting planets, twinkling stars, nebula
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
      // normalised -1..1
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
      className="astronaut-scene absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#050816]/55"
    >
      {/* Background — nebula */}
      <div
        className="absolute inset-0 will-change-transform"
        style={layer(-8)}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_50%,rgba(99,102,241,0.22),transparent_42%),radial-gradient(circle_at_30%_72%,rgba(59,130,246,0.16),transparent_38%),radial-gradient(circle_at_78%_28%,rgba(139,92,246,0.18),transparent_36%)]" />
        <div className="astronaut-nebula absolute inset-0" />
      </div>

      {/* Background — stars */}
      <div className="absolute inset-0 will-change-transform" style={layer(-14)}>
        <div className="astronaut-stars" />
      </div>

      {/* Background — drifting planets */}
      <div className="absolute inset-0 will-change-transform" style={layer(-20)}>
        <span className="astronaut-planet astronaut-planet--a" />
        <span className="astronaut-planet astronaut-planet--b" />
      </div>

      {/* Midground — rocket trail glow */}
      <div
        className="absolute inset-0 will-change-transform"
        style={layer(12)}
        aria-hidden
      >
        <div className="astronaut-trail" />
        <span className="astronaut-particle astronaut-particle--1" />
        <span className="astronaut-particle astronaut-particle--2" />
        <span className="astronaut-particle astronaut-particle--3" />
      </div>

      {/* Foreground — astronaut + visor sweep */}
      <div
        className="absolute inset-0 will-change-transform"
        style={layer(22)}
      >
        <div className="astronaut-float absolute inset-0">
          <img
            src={astronautRocket}
            alt="Premium 3D astronaut riding a rocket through a purple blue nebula"
            className="absolute inset-0 h-full w-full object-cover object-center select-none"
            draggable={false}
          />
          <div className="astronaut-visor" aria-hidden />
        </div>
      </div>
    </div>
  );
}
