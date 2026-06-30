import { useEffect, useRef } from "react";

/**
 * Full-viewport canvas: parallax starfield + drifting meteors + soft nebula glow.
 * Scroll-driven parallax for a "flying through space" feel.
 * Honors prefers-reduced-motion (renders a static field, no animation loop).
 */
export function CinematicStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let stars: { x: number; y: number; r: number; a: number; speed: number; phase: number; depth: number }[] = [];
    let meteors: { x: number; y: number; len: number; speed: number; ang: number; a: number; life: number; max: number }[] = [];
    let scrollY = 0;
    let raf = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(280, Math.floor((w * h) / 6500));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random(); // 0 far -> 1 near
        return {
          x: Math.random() * w,
          y: Math.random() * h * 1.6,
          r: 0.4 + depth * 1.6,
          a: 0.25 + Math.random() * 0.6,
          speed: 0.05 + depth * 0.2,
          phase: Math.random() * Math.PI * 2,
          depth,
        };
      });
    };

    const spawnMeteor = () => {
      const fromLeft = Math.random() > 0.5;
      meteors.push({
        x: fromLeft ? -40 : w + 40,
        y: Math.random() * h * 0.6,
        len: 80 + Math.random() * 140,
        speed: 3 + Math.random() * 3,
        ang: fromLeft ? Math.PI / 5 : Math.PI - Math.PI / 5,
        a: 0,
        life: 0,
        max: 140 + Math.random() * 80,
      });
    };

    const onScroll = () => {
      scrollY = window.scrollY || 0;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // soft nebula glow that breathes
      const breathe = (Math.sin(t / 4000) + 1) / 2;
      const g1 = ctx.createRadialGradient(w * 0.82, h * 0.18, 0, w * 0.82, h * 0.18, Math.max(w, h) * 0.55);
      g1.addColorStop(0, `rgba(168,85,247,${0.18 + breathe * 0.08})`);
      g1.addColorStop(1, "rgba(168,85,247,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(w * 0.1, h * 0.6, 0, w * 0.1, h * 0.6, Math.max(w, h) * 0.5);
      g2.addColorStop(0, `rgba(59,130,246,${0.12 + (1 - breathe) * 0.05})`);
      g2.addColorStop(1, "rgba(59,130,246,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // stars with parallax + twinkle
      for (const s of stars) {
        const py = (s.y - scrollY * s.speed) % (h * 1.6);
        const y = py < 0 ? py + h * 1.6 : py;
        const tw = 0.5 + 0.5 * Math.sin(t / 700 + s.phase);
        const alpha = s.a * (0.55 + tw * 0.45);
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.depth > 0.7) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(196,181,253,${alpha * 0.5})`;
          ctx.arc(s.x, y, s.r * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life++;
        m.a = Math.sin((m.life / m.max) * Math.PI) * 0.9;
        m.x += Math.cos(m.ang) * m.speed;
        m.y += Math.sin(m.ang) * m.speed;
        const tx = m.x - Math.cos(m.ang) * m.len;
        const ty = m.y - Math.sin(m.ang) * m.len;
        const grad = ctx.createLinearGradient(m.x, m.y, tx, ty);
        grad.addColorStop(0, `rgba(255,255,255,${m.a})`);
        grad.addColorStop(0.4, `rgba(196,181,253,${m.a * 0.7})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        // head
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${m.a})`;
        ctx.arc(m.x, m.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
        if (m.life > m.max) meteors.splice(i, 1);
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    if (reduce) {
      // draw a single static frame
      draw(0);
      cancelAnimationFrame(raf);
    } else {
      const meteorInt = window.setInterval(spawnMeteor, 2300);
      raf = requestAnimationFrame(draw);
      return () => {
        clearInterval(meteorInt);
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", onScroll);
      };
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
