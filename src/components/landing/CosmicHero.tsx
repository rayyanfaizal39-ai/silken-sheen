import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { WatchIntroVideo } from "@/components/landing/WatchIntroVideo";
import { PaperHorizonStack } from "@/components/landing/PaperHorizonStack";
import heroBackground from "@/assets/hero landing/hero background.png";
import heroPlanet from "@/assets/hero landing/planet.png";
import heroNebula from "@/assets/hero landing/nebula.png";

/**
 * Cosmic hero — background, nebula, planet, papercraft horizon, headline,
 * description and CTAs.
 *
 * Every loop animates transform/opacity/filter exclusively so the compositor
 * can run it off the main thread — see Landing.tsx's old Hero() for why
 * filter+transform on the *same* animated element was previously a jank
 * source on this page. Where both are needed (the planet's glow) they're
 * split across a static element (filter, never transformed) and an animated
 * one (transform only).
 */
export function CosmicHero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Tiny scroll-linked parallax: the background lags a few px behind the
  // page as the hero scrolls away, just enough to read as depth.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundParallaxY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 22]);

  return (
    <section ref={sectionRef} className="relative h-svh w-full overflow-hidden bg-[#050816]">
      {/* Background — kept exactly as supplied, only breathing + a whisper
          of brightness (the "twinkle") + scroll parallax, all transform/filter. */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ y: backgroundParallaxY }}
        animate={reduceMotion ? undefined : { scale: [1.02, 1.025] }}
        transition={{ duration: 60, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      >
        <motion.img
          src={heroBackground}
          alt=""
          className="h-full w-full object-cover"
          fetchPriority="high"
          animate={reduceMotion ? undefined : { filter: ["brightness(1)", "brightness(1.035)", "brightness(1)"] }}
          transition={{ duration: 46, ease: "easeInOut", repeat: Infinity }}
        />
      </motion.div>

      {/* Nebula — drawn low-opacity behind the headline for atmosphere, not
          as a corner accent. */}
      <motion.img
        src={heroNebula}
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute left-[1%] top-[3%] w-[52vw] max-w-[680px] min-w-[340px] mix-blend-screen"
        initial={{ opacity: 0.6, x: 0 }}
        animate={reduceMotion ? undefined : { opacity: [0.6, 0.5, 0.6], x: [0, 3, 0] }}
        transition={{ duration: 90, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Planet — same size as supplied (not resized), shifted further off
          the right edge so only ~55-60% remains visible, feeling like a
          giant body just outside frame rather than a framed illustration. */}
      <div
        className="absolute -top-[11%] right-0 w-[52vw] max-w-[760px] min-w-[360px] sm:w-[46vw] lg:w-[40vw]"
        style={{ transform: "translate(calc(48% + 25px), 90px)" }}
      >
        {/* Soft inner glow — clipped to the planet's own circular silhouette
            so it reads as light leaking between the paper layers rather than
            an outer halo. Static, pre-blurred, never transformed. */}
        <div aria-hidden className="absolute inset-[6%] rounded-full overflow-hidden">
          <div
            className="absolute -inset-8 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(192,132,252,0.18), rgba(168,85,247,0.12) 55%, transparent 75%)",
            }}
          />
        </div>
        {/* Blurred duplicate of the planet itself — the seam-light look,
            kept close to 1:1 scale so it doesn't read as an outer glow. */}
        <img
          src={heroPlanet}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 w-full h-auto scale-[1.02]"
          style={{
            opacity: 0.12,
            filter: "blur(24px) drop-shadow(0 0 28px rgba(168,85,247,0.12))",
          }}
        />
        <motion.img
          src={heroPlanet}
          alt=""
          aria-hidden
          draggable={false}
          className="relative w-full h-auto"
          style={{ willChange: "transform" }}
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 2, 0], y: [0, -6, 0], rotate: [-0.8, 0.8, -0.8], scale: [1, 1.015, 1] }
          }
          transition={{
            x: { duration: 16, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
            y: { duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
            rotate: { duration: 30, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
            scale: { duration: 34, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
          }}
        />
      </div>

      <PaperHorizonStack />

      {/* Content column — starts directly with the headline; the AcadeMY
          mark already lives in the navbar above, so it isn't repeated here. */}
      <div className="relative z-10 flex h-full max-w-7xl flex-col justify-center px-6 sm:px-8 lg:px-12">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-extrabold leading-[1.05] tracking-tight text-white max-w-xl">
          Master KSSM
          <br />
          With AI-Powered
          <br />
          Learning
        </h1>

        <p className="mt-6 max-w-[560px] text-base sm:text-lg text-[#9ca3af] leading-relaxed font-body">
          Malaysia&rsquo;s next-generation learning platform combining AI,
          interactive revision, quizzes, flashcards and personalised learning
          journeys designed for KSSM students.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/upgrade"
            className="inline-flex items-center justify-center rounded-full bg-[#7c3aed] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_0_rgba(124,58,237,0)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#6d28d9] hover:shadow-[0_14px_30px_-12px_rgba(124,58,237,0.55)]"
          >
            Start Your Mission
          </Link>
          <WatchIntroVideo
            label="Watch Demo"
            minimal
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-transparent px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/[0.04]"
          />
        </div>
      </div>
    </section>
  );
}
