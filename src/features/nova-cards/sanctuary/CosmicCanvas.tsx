import React, { useEffect, useRef } from "react";

interface CosmicCanvasProps {
  activeElement?: "Water" | "Solar" | "Astral" | "Earth" | null;
  reducedMotion?: boolean;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  targetAlpha: number;
  color: string;
  pulseSpeed: number;
}

export const CosmicCanvas: React.FC<CosmicCanvasProps> = ({
  activeElement = null,
  reducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    // Initialize stars & celestial motes
    const particleCount = reducedMotion ? 40 : 100;
    const particles: Particle[] = [];

    const getElementColor = () => {
      if (activeElement === "Water") return "rgba(62, 193, 252, ";
      if (activeElement === "Solar") return "rgba(246, 202, 120, ";
      if (activeElement === "Astral") return "rgba(168, 85, 247, ";
      if (activeElement === "Earth") return "rgba(52, 211, 153, ";
      return "rgba(223, 225, 246, ";
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.7 + 0.2,
        targetAlpha: Math.random() * 0.8 + 0.2,
        color: getElementColor(),
        pulseSpeed: 0.01 + Math.random() * 0.02,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Deep celestial radial background
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8,
      );
      grad.addColorStop(0, "#0f1321");
      grad.addColorStop(0.5, "#090e1c");
      grad.addColorStop(1, "#050813");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Elemental Ambient Glow Aura in the center
      const elementGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        20,
        width * 0.5,
        height * 0.45,
        width * 0.45,
      );

      if (activeElement === "Water") {
        elementGlow.addColorStop(0, "rgba(62, 193, 252, 0.12)");
        elementGlow.addColorStop(0.6, "rgba(23, 62, 140, 0.05)");
        elementGlow.addColorStop(1, "transparent");
      } else if (activeElement === "Solar") {
        elementGlow.addColorStop(0, "rgba(246, 202, 120, 0.14)");
        elementGlow.addColorStop(0.6, "rgba(180, 83, 9, 0.05)");
        elementGlow.addColorStop(1, "transparent");
      } else if (activeElement === "Astral") {
        elementGlow.addColorStop(0, "rgba(168, 85, 247, 0.14)");
        elementGlow.addColorStop(0.6, "rgba(96, 1, 209, 0.06)");
        elementGlow.addColorStop(1, "transparent");
      } else if (activeElement === "Earth") {
        elementGlow.addColorStop(0, "rgba(52, 211, 153, 0.12)");
        elementGlow.addColorStop(0.6, "rgba(6, 95, 70, 0.05)");
        elementGlow.addColorStop(1, "transparent");
      } else {
        elementGlow.addColorStop(0, "rgba(96, 1, 209, 0.08)");
        elementGlow.addColorStop(0.5, "rgba(246, 202, 120, 0.04)");
        elementGlow.addColorStop(1, "transparent");
      }

      ctx.fillStyle = elementGlow;
      ctx.fillRect(0, 0, width, height);

      // Render interactive cursor starlight ripple
      if (mouseRef.current.active) {
        const mouseGrad = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          180,
        );
        mouseGrad.addColorStop(0, "rgba(246, 202, 120, 0.12)");
        mouseGrad.addColorStop(0.5, "rgba(96, 1, 209, 0.05)");
        mouseGrad.addColorStop(1, "transparent");
        ctx.fillStyle = mouseGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw subtle constellation lines between nearby particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const lineAlpha = (1 - dist / 100) * 0.12;
            ctx.strokeStyle = `rgba(246, 202, 120, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      const baseColor = getElementColor();
      for (const p of particles) {
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Gentle breathing twinkle
          p.alpha += Math.sin(time * p.pulseSpeed * 10) * 0.005;
          p.alpha = Math.max(0.1, Math.min(0.9, p.alpha));
        }

        ctx.fillStyle = `${baseColor}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Extra halo for bigger stars
        if (p.radius > 1.8) {
          ctx.fillStyle = `${baseColor}${p.alpha * 0.3})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reducedMotion) animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [activeElement, reducedMotion]);

  return (
    <canvas
      aria-hidden="true"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};
