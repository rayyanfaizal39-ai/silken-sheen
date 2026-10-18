import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./nova-portal.css";

// Opening runs this long before the same-tab hand-off to the Cards Studio.
const OPEN_MS = 1500;
const CALM_OPEN_MS = 250;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Main AcadeMY's entrance to AcadeMY Cards. It is only the doorway: the journey itself is
 * the existing cinematic Studio, which begins in the same darkness this portal fades into.
 */
export function NovaPortal({
  studioUrl,
  artworkUrl,
  navigate = (url) => window.location.assign(url),
}: {
  studioUrl: string;
  artworkUrl?: string | null;
  /** Same-tab hand-off to the Cards Studio; never a new window. */
  navigate?: (url: string) => void;
}) {
  const [opening, setOpening] = useState(false);
  const [calm, setCalm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gateRef = useRef<HTMLDivElement>(null);
  const warp = useRef(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    setCalm(prefersReducedMotion());
    // Returning with the Back button restores this page from cache: reopen the portal.
    const onShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      if (timer.current) clearTimeout(timer.current);
      warp.current = 1;
      setOpening(false);
    };
    window.addEventListener("pageshow", onShow);
    return () => {
      window.removeEventListener("pageshow", onShow);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let frame = 0;
    const colours = ["246,202,120", "255,222,165", "160,110,255", "62,193,252"];
    const stars = Array.from({ length: 170 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.3 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));
    const spawn = () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 0.55 + Math.random() * 0.45,
      speed: 0.0009 + Math.random() * 0.0016,
      spin: 0.004 + Math.random() * 0.006,
      size: Math.random() * 1.8 + 0.6,
      colour: colours[Math.floor(Math.random() * colours.length)],
    });
    const motes = Array.from({ length: 90 }, spawn);
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      // Motes spiral into the gate wherever the layout places it.
      const sky = canvas.getBoundingClientRect();
      const gate = gateRef.current?.getBoundingClientRect();
      cx = gate ? gate.left + gate.width / 2 - sky.left : width / 2;
      cy = gate ? gate.top + gate.height / 2 - sky.top : height * 0.42;
    };
    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const reach = Math.hypot(width, height) / 2;
      ctx.globalCompositeOperation = "lighter";
      for (const s of stars) {
        const twinkle = 0.45 + 0.55 * Math.sin(time / 900 + s.phase) ** 2;
        ctx.fillStyle = `rgba(223,225,246,${0.25 + 0.6 * twinkle})`;
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const m of motes) {
        const x = cx + Math.cos(m.angle) * m.radius * reach;
        const y = cy + Math.sin(m.angle) * m.radius * reach * 0.62;
        const glow = Math.min(1, (1 - m.radius) * 2.2);
        ctx.fillStyle = `rgba(${m.colour},${0.15 + 0.75 * glow})`;
        ctx.beginPath();
        ctx.arc(x, y, m.size * (0.6 + glow), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };
    const step = (time: number) => {
      for (const m of motes) {
        m.radius -= m.speed * warp.current;
        m.angle += m.spin * warp.current;
        if (m.radius < 0.06) Object.assign(m, spawn(), { radius: 1 });
      }
      draw(time);
      frame = requestAnimationFrame(step);
    };
    resize();
    const observer = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion()) draw(0);
    });
    observer.observe(canvas);
    if (prefersReducedMotion()) draw(0);
    else frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const enter = () => {
    if (opening) return;
    const reduced = prefersReducedMotion();
    setCalm(reduced);
    setOpening(true);
    warp.current = 9;
    timer.current = setTimeout(() => navigate(studioUrl), reduced ? CALM_OPEN_MS : OPEN_MS);
  };

  return (
    <section
      className="nova-portal"
      data-opening={opening}
      data-calm={calm}
      aria-labelledby="nova-portal-title"
    >
      <div className="nova-portal__stage">
        <div className="nova-portal__nebula nova-portal__nebula--violet" aria-hidden="true" />
        <div className="nova-portal__nebula nova-portal__nebula--cyan" aria-hidden="true" />
        <canvas ref={canvasRef} className="nova-portal__sky" aria-hidden="true" />
      </div>
      <div className="nova-portal__focus" aria-hidden="true">
        <div ref={gateRef} className="nova-portal__gate">
          <span className="nova-portal__ray nova-portal__ray--gold" />
          <span className="nova-portal__ray nova-portal__ray--violet" />
          <span className="nova-portal__ray nova-portal__ray--cyan" />
          <span className="nova-portal__ring nova-portal__ring--outer" />
          <span className="nova-portal__ring nova-portal__ring--dashed" />
          <span className="nova-portal__ring nova-portal__ring--inner" />
          <span className="nova-portal__core">
            {artworkUrl ? (
              <img src={artworkUrl} alt="" referrerPolicy="no-referrer" />
            ) : (
              <span className="nova-portal__spark" />
            )}
          </span>
        </div>
      </div>
      <div className="nova-portal__copy">
        <p className="nova-portal__eyebrow">AcadeMY Cards · My Nova</p>
        <h1 id="nova-portal-title" className="nova-portal__title">
          {artworkUrl ? "Your Nova is waiting beyond the stars" : "Your Nova universe awaits"}
        </h1>
        <p className="nova-portal__lead">
          {artworkUrl
            ? "Step through the portal to return to your lifelong companion."
            : "Twelve questions. One lifelong companion. Step through the portal to begin."}
        </p>
        <button
          type="button"
          className="nova-portal__enter"
          onClick={enter}
          disabled={opening}
          aria-describedby="nova-portal-status"
        >
          <span>Enter your Nova universe</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
          </svg>
        </button>
        <p id="nova-portal-status" className="nova-portal__status" role="status" aria-live="polite">
          {opening ? "Opening your Nova universe…" : ""}
        </p>
      </div>
      {/* Rendered into <body> so it covers the whole page, header and navigation included. */}
      {mounted &&
        createPortal(
          <div
            className="nova-portal__veil"
            data-opening={opening}
            data-calm={calm}
            aria-hidden="true"
          />,
          document.body,
        )}
    </section>
  );
}
