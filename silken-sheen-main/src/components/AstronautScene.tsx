import { useEffect, useRef, useState } from "react";
import astronautRocket from "@/assets/premium-astronaut-rocket.png";

/**
 * Astronaut figure for the home hero — a portable, decorative illustration
 * meant to overlap the headline rather than sit beside it in its own card.
 * The image is masked with a soft radial fade so its rectangular edges
 * dissolve into the hero's shared nebula, and it carries a faint orbit
 * ring + glow trail so it visually belongs to the same scene as the title.
 */
export function AstronautScene({ className = "" }: { className?: string }) {
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

  return (
    <div ref={ref} className={`home-hero-astronaut ${className}`} aria-hidden="true">
      <span className="home-hero-orbit absolute" style={{ inset: "-26%" }} />
      <div className="home-hero-trail absolute inset-0" />
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(${tilt.x * 10}px, ${tilt.y * 10}px, 0)` }}
      >
        <img src={astronautRocket} alt="" className="home-hero-astronaut-img" draggable={false} />
        <div className="astronaut-visor absolute inset-0" aria-hidden />
      </div>
    </div>
  );
}
