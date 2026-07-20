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
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<Array<HTMLImageElement | null>>(
    new Array(FRAME_COUNT).fill(null),
  );
  const loadedRef = useRef<boolean[]>(new Array(FRAME_COUNT).fill(false));
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const lastValidFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const drawCover = (img: HTMLImageElement) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scale = Math.max(vw / img.naturalWidth, vh / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (vw - dw) / 2, (vh - dh) / 2, dw, dh);
    };

    const findClosestLoaded = (target: number) => {
      for (let offset = 0; offset < FRAME_COUNT; offset++) {
        const b = target - offset;
        const a = target + offset;
        if (b >= 0) {
          const img = imagesRef.current[b];
          if (img && loadedRef.current[b] && img.naturalWidth > 0) return b;
        }
        if (a < FRAME_COUNT) {
          const img = imagesRef.current[a];
          if (img && loadedRef.current[a] && img.naturalWidth > 0) return a;
        }
      }
      return -1;
    };

    const drawFrame = (frameIndex: number) => {
      let idx = frameIndex;
      const img = imagesRef.current[idx];
      if (!img || !loadedRef.current[idx] || img.naturalWidth === 0) {
        const closest = findClosestLoaded(idx);
        if (closest === -1) return;
        idx = closest;
      }
      const finalImg = imagesRef.current[idx]!;
      lastValidFrameRef.current = idx;
      drawCover(finalImg);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(lastValidFrameRef.current);
    };

    // Preload
    let cancelled = false;
    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          loadedRef.current[i] = true;
          if (i === 0) drawFrame(0);
          else if (i === Math.round(currentFrameRef.current)) drawFrame(i);
          resolve();
        };
        img.onerror = () => {
          console.error("Failed to load frame:", img.src);
          resolve();
        };
        img.src = FRAME_URLS[i];
        imagesRef.current[i] = img;
      });

    (async () => {
      await loadOne(0);
      let next = 1;
      const CONCURRENCY = 8;
      const workers = Array.from({ length: CONCURRENCY }, async () => {
        while (!cancelled) {
          const i = next++;
          if (i >= FRAME_COUNT) return;
          await loadOne(i);
        }
      });
      await Promise.all(workers);
    })();

    // Cached layout measurements; only recomputed on resize.
    let sectionTop = 0;
    let scrollable = 1;
    const measure = () => {
      const rect = section.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;
      scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    };

    // Gentle ease-out: starts responsive, slows slightly at the end.
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 1.35);

    const computeTarget = () => {
      const raw = (window.scrollY - sectionTop) / scrollable;
      const clamped = Math.min(1, Math.max(0, raw));
      const eased = easeOut(clamped);
      targetFrameRef.current = eased * (FRAME_COUNT - 1);
    };

    const LERP = 0.24;
    const tick = () => {
      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      const diff = target - current;
      if (Math.abs(diff) > 0.01) {
        const next = Math.abs(diff) < 0.05 ? target : current + diff * LERP;
        currentFrameRef.current = next;
        drawFrame(Math.round(next));
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      computeTarget();
    };

    const onResize = () => {
      resize();
      measure();
      computeTarget();
    };

    resize();
    measure();
    computeTarget();
    currentFrameRef.current = targetFrameRef.current;
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize);

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: "320vh" }}
    >
      <div
        className="sticky top-0 w-full overflow-hidden bg-black"
        style={{ height: "100vh" }}
      >
        <canvas
          ref={canvasRef}
          className="block"
          style={{ width: "100vw", height: "100vh", background: "#000" }}
        />
      </div>
    </section>
  );
}

