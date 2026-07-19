import { useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FRAME_URLS } from "@/assets/landingpage3/frames";

export const Route = createFileRoute("/academy/landingpage3")({
  head: () => ({
    meta: [
      { title: "AcadeMY — Scroll Sequence" },
      { name: "description", content: "Scroll-controlled cinematic sequence." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ScrollSequencePage,
});

const FRAME_COUNT = FRAME_URLS.length;

function ScrollSequencePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<Array<HTMLImageElement | null>>(
    new Array(FRAME_COUNT).fill(null),
  );
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrameRef.current, true);
    };

    const drawFrame = (index: number, force = false) => {
      const img = imagesRef.current[index];
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, vw, vh);
      if (!img || !img.complete || img.naturalWidth === 0) {
        // try to fall back to any previously loaded nearby frame
        let fallback: HTMLImageElement | null = null;
        for (let d = 1; d < FRAME_COUNT && !fallback; d++) {
          const a = imagesRef.current[index - d];
          const b = imagesRef.current[index + d];
          if (a && a.complete && a.naturalWidth > 0) fallback = a;
          else if (b && b.complete && b.naturalWidth > 0) fallback = b;
        }
        if (!fallback) return;
        drawCover(ctx, fallback, vw, vh);
        return;
      }
      drawCover(ctx, img, vw, vh);
      if (force) currentFrameRef.current = index;
    };

    const drawCover = (
      c: CanvasRenderingContext2D,
      img: HTMLImageElement,
      vw: number,
      vh: number,
    ) => {
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(vw / iw, vh / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (vw - dw) / 2;
      const dy = (vh - dh) / 2;
      c.drawImage(img, dx, dy, dw, dh);
    };

    // Preload frames in order
    const loadImage = (i: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          imagesRef.current[i] = img;
          if (i === 0) drawFrame(0, true);
          resolve();
        };
        img.onerror = () => resolve();
        img.src = FRAME_URLS[i];
      });

    let cancelled = false;
    (async () => {
      // Prioritise frame 0
      await loadImage(0);
      // Then load remaining sequentially with small concurrency
      const CONCURRENCY = 6;
      let next = 1;
      const workers = Array.from({ length: CONCURRENCY }, async () => {
        while (!cancelled) {
          const i = next++;
          if (i >= FRAME_COUNT) return;
          await loadImage(i);
        }
      });
      await Promise.all(workers);
    })();

    const tick = () => {
      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      if (current !== target) {
        // interpolate: move ~20% toward target per frame, min 1
        const diff = target - current;
        const step =
          Math.abs(diff) <= 1
            ? diff
            : Math.sign(diff) * Math.max(1, Math.round(Math.abs(diff) * 0.2));
        const nextFrame = current + step;
        drawFrame(nextFrame);
        currentFrameRef.current = nextFrame;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const progress =
        maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      const target = Math.min(
        FRAME_COUNT - 1,
        Math.floor(progress * FRAME_COUNT),
      );
      targetFrameRef.current = target;
    };

    resize();
    onScroll();
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "800vh",
        margin: 0,
        padding: 0,
        background: "#000",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100vw",
          height: "100vh",
          background: "#000",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: "100vw",
            height: "100vh",
            background: "#000",
          }}
        />
      </div>
    </div>
  );
}
