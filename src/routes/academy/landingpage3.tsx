import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import heroBg from "@/assets/landing/hero/hero-background.png.asset.json";
import heroNebula from "@/assets/landing/hero/hero-nebula.png.asset.json";
import heroPlanet from "@/assets/landing/hero/hero-planet.png.asset.json";
import h1 from "@/assets/landing/hero/horizon-layer-1.png.asset.json";
import h2 from "@/assets/landing/hero/horizon-layer-2.png.asset.json";
import h3 from "@/assets/landing/hero/horizon-layer-3.png.asset.json";
import h4 from "@/assets/landing/hero/horizon-layer-4.png.asset.json";
import h5 from "@/assets/landing/hero/horizon-layer-5.png.asset.json";

export const Route = createFileRoute("/academy/landingpage3")({
  head: () => ({
    meta: [
      { title: "AcadeMY — Papercraft Hero" },
      { name: "description", content: "Cinematic papercraft hero for AcadeMY." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PapercraftHero,
});

function PapercraftHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop =
      window.matchMedia("(min-width: 768px)").matches &&
      window.matchMedia("(pointer: fine)").matches;
    if (reduce || !isDesktop) return;

    // depths in px matching spec
    const layers: Array<{ el: HTMLElement | null; d: number }> = [
      { el: root.querySelector<HTMLElement>("[data-l='bg']"), d: 1 },
      { el: root.querySelector<HTMLElement>("[data-l='nebula']"), d: 3 },
      { el: root.querySelector<HTMLElement>("[data-l='planet']"), d: 5 },
      { el: root.querySelector<HTMLElement>("[data-l='h5']"), d: 1 },
      { el: root.querySelector<HTMLElement>("[data-l='h4']"), d: 2 },
      { el: root.querySelector<HTMLElement>("[data-l='h3']"), d: 4 },
      { el: root.querySelector<HTMLElement>("[data-l='h2']"), d: 7 },
      { el: root.querySelector<HTMLElement>("[data-l='h1']"), d: 10 },
    ];

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      for (const { el, d } of layers) {
        if (!el) continue;
        el.style.setProperty("--px", `${(-cx * d).toFixed(2)}px`);
        el.style.setProperty("--py", `${(-cy * d).toFixed(2)}px`);
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const layerStyle: React.CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
    willChange: "transform",
  };

  return (
    <section
      ref={rootRef}
      className="lp3-hero"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        overflow: "hidden",
        background: "#050816",
      }}
    >
      <style>{`
        .lp3-hero [data-l] { transform: translate3d(var(--px,0), var(--py,0), 0); }
        .lp3-hero [data-l='bg'] { animation: lp3-bg 50s ease-in-out infinite alternate; }
        .lp3-hero [data-l='nebula'] { animation: lp3-neb 52s ease-in-out infinite alternate; }
        .lp3-hero [data-l='planet'] { animation: lp3-planet 12s ease-in-out infinite alternate; }
        .lp3-hero [data-l='h5'] { animation: lp3-h5 150s ease-in-out infinite alternate; }
        .lp3-hero [data-l='h4'] { animation: lp3-h4 120s ease-in-out infinite alternate; }
        .lp3-hero [data-l='h3'] { animation: lp3-h3 100s ease-in-out infinite alternate; }
        .lp3-hero [data-l='h2'] { animation: lp3-h2 90s ease-in-out infinite alternate; }
        .lp3-hero [data-l='h1'] { animation: lp3-h1 80s ease-in-out infinite alternate; }

        @keyframes lp3-bg {
          from { transform: translate3d(var(--px,0), var(--py,0), 0) scale(1.03); }
          to   { transform: translate3d(var(--px,0), var(--py,0), 0) scale(1.035); }
        }
        @keyframes lp3-neb {
          from { transform: translate3d(calc(var(--px,0px) + 0px), calc(var(--py,0px) + 0px), 0); opacity: .68; }
          to   { transform: translate3d(calc(var(--px,0px) + 4px), calc(var(--py,0px) + 2px), 0); opacity: .78; }
        }
        @keyframes lp3-planet {
          from { transform: translate3d(calc(var(--px,0px) + 0px), calc(var(--py,0px) - 3px), 0) rotate(-0.2deg); }
          to   { transform: translate3d(calc(var(--px,0px) + 3px), calc(var(--py,0px) + 4px), 0) rotate(0.3deg); }
        }
        @keyframes lp3-h5 {
          from { transform: translate3d(calc(var(--px,0px) - 1px), var(--py,0), 0); }
          to   { transform: translate3d(calc(var(--px,0px) + 1px), var(--py,0), 0); }
        }
        @keyframes lp3-h4 {
          from { transform: translate3d(calc(var(--px,0px) + 1.5px), var(--py,0), 0); }
          to   { transform: translate3d(calc(var(--px,0px) - 1.5px), var(--py,0), 0); }
        }
        @keyframes lp3-h3 {
          from { transform: translate3d(calc(var(--px,0px) - 2px), var(--py,0), 0); }
          to   { transform: translate3d(calc(var(--px,0px) + 2px), var(--py,0), 0); }
        }
        @keyframes lp3-h2 {
          from { transform: translate3d(calc(var(--px,0px) + 2.5px), var(--py,0), 0); }
          to   { transform: translate3d(calc(var(--px,0px) - 2.5px), var(--py,0), 0); }
        }
        @keyframes lp3-h1 {
          from { transform: translate3d(calc(var(--px,0px) - 3px), var(--py,0), 0); }
          to   { transform: translate3d(calc(var(--px,0px) + 3px), var(--py,0), 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .lp3-hero [data-l] { animation: none !important; }
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .lp3-hero [data-l='planet'] { width: 42vw !important; }
          .lp3-hero [data-l='nebula'] { width: 60vw !important; }
        }
        /* Mobile */
        @media (max-width: 767px) {
          .lp3-hero [data-l='planet'] { width: 64vw !important; right: -12vw !important; top: 2vh !important; }
          .lp3-hero [data-l='nebula'] { width: 90vw !important; opacity: .5 !important; }
          .lp3-hero [data-l='h5'] { bottom: 4vh !important; }
          .lp3-hero [data-l='h4'] { bottom: 3vh !important; }
          .lp3-hero [data-l='h3'] { bottom: 2vh !important; }
          .lp3-hero [data-l='h2'] { bottom: 1vh !important; }
        }
      `}</style>

      {/* 1. Base background */}
      <img
        data-l="bg"
        src={heroBg.url}
        alt=""
        aria-hidden="true"
        style={{
          ...layerStyle,
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          transform: "scale(1.03)",
          zIndex: 1,
        }}
      />

      {/* 2. Nebula */}
      <img
        data-l="nebula"
        src={heroNebula.url}
        alt=""
        aria-hidden="true"
        style={{
          ...layerStyle,
          width: "54vw",
          left: "-8vw",
          top: "-6vh",
          opacity: 0.72,
          zIndex: 2,
        }}
      />

      {/* 3. Planet */}
      <img
        data-l="planet"
        src={heroPlanet.url}
        alt=""
        aria-hidden="true"
        style={{
          ...layerStyle,
          width: "34vw",
          maxWidth: 680,
          minWidth: 360,
          right: "-7vw",
          top: "4vh",
          zIndex: 3,
        }}
      />

      {/* 4. Horizon 5 (rear, lightest) */}
      <img
        data-l="h5"
        src={h5.url}
        alt=""
        aria-hidden="true"
        style={{
          ...layerStyle,
          left: "-3%",
          width: "106%",
          bottom: "6.5vh",
          zIndex: 4,
        }}
      />
      <img
        data-l="h4"
        src={h4.url}
        alt=""
        aria-hidden="true"
        style={{
          ...layerStyle,
          left: "-3%",
          width: "106%",
          bottom: "5vh",
          zIndex: 5,
        }}
      />
      <img
        data-l="h3"
        src={h3.url}
        alt=""
        aria-hidden="true"
        style={{
          ...layerStyle,
          left: "-3%",
          width: "106%",
          bottom: "3.5vh",
          zIndex: 6,
        }}
      />
      <img
        data-l="h2"
        src={h2.url}
        alt=""
        aria-hidden="true"
        style={{
          ...layerStyle,
          left: "-3%",
          width: "106%",
          bottom: "1.5vh",
          zIndex: 7,
        }}
      />
      <img
        data-l="h1"
        src={h1.url}
        alt=""
        aria-hidden="true"
        style={{
          ...layerStyle,
          left: "-3%",
          width: "106%",
          bottom: 0,
          zIndex: 8,
        }}
      />
    </section>
  );
}
