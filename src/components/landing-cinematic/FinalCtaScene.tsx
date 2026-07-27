import { useEffect, useRef } from "react";
import companionNova from "@/assets/landing-cinematic/companion-nova.webp";
import ctaRocket from "@/assets/landing-cinematic/decor/rocket.webp";
import planet from "@/assets/landing-cinematic/planet.webp";
import {
  CinematicAuthCta,
  CinematicLoginAction,
  CinematicUpgradeLink,
} from "./CinematicAuthActions";
import { useCinematicMotion } from "./cinematicMotionContext";
import AtmosphericBackground from "./AtmosphericBackground";
import { AcademyLogo } from "./CinematicNavigation";

export default function FinalCtaScene() {
  const rootRef = useRef<HTMLElement>(null);
  const motion = useCinematicMotion();

  useEffect(() => {
    if (!motion) return;
    const { gsap, ScrollTrigger } = motion;
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context((self) => {
      const q = (sel: string) => self.selector!(sel) as HTMLElement[];

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          q(".cta__planet"),
          { yPercent: 46, scale: 0.92 },
          {
            yPercent: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top bottom", end: "center center", scrub: 1 },
          },
        );
        gsap.fromTo(
          q(".cta__terrain"),
          { yPercent: 60 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top bottom", end: "top 20%", scrub: 1 },
          },
        );

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: root, start: "top 45%" },
        });
        tl.from(q(".cta__title .cine-reveal-line__inner"), {
          yPercent: 115,
          duration: 1,
          stagger: 0.12,
        })
          .from(q(".cta__body"), { y: 26, opacity: 0, duration: 0.8 }, "-=0.5")
          .from(q(".cta__buttons"), { y: 22, opacity: 0, duration: 0.8 }, "-=0.45")
          .from(q(".cta__nova"), { y: 46, opacity: 0, duration: 1.1, ease: "power2.out" }, "-=0.6");

        const novaFloat = gsap.to(q(".cta__nova"), {
          translate: "0 -14px",
          duration: 3.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          paused: true,
        });
        ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onToggle: ({ isActive }) => {
            if (isActive) novaFloat.play();
            else novaFloat.pause();
          },
        });
      });
    }, root);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [motion]);

  return (
    <section id="cta" ref={rootRef} className="cta">
      <AtmosphericBackground variant="cta" stars={20} />

      <img
        className="cta__planet"
        src={planet}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        draggable={false}
      />

      {/* dotted launch trail rising toward the rocket — coded, not an asset */}
      <svg
        className="trail trail--cta"
        viewBox="0 0 300 150"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="trail__path"
          d="M4,146 C56,132 96,108 138,78 C180,48 226,26 296,6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1 13"
        />
      </svg>

      {/* the page's only other rocket — the hero owns the animated one, and the
          two sections never share a viewport */}
      <img
        className="cine-decor cine-decor--cta-rocket"
        src={ctaRocket}
        alt=""
        aria-hidden="true"
        width={300}
        height={301}
        loading="lazy"
        decoding="async"
        draggable={false}
      />

      <div className="cta__terrain" aria-hidden="true">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path
            d="M0,120 C90,96 180,132 290,112 C400,92 480,130 590,112 C700,94 790,130 900,112 C1010,94 1100,128 1210,110 C1300,96 1380,114 1440,106 L1440,200 L0,200 Z"
            fill="var(--paper-3)"
          />
        </svg>
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none">
          <path
            d="M0,86 C110,70 210,96 330,82 C450,68 540,96 660,84 C780,72 870,98 990,86 C1110,74 1200,96 1320,84 C1380,78 1420,84 1440,80 L1440,140 L0,140 Z"
            fill="var(--paper-5)"
          />
        </svg>
      </div>

      <div className="cta__content">
        <h2 className="cta__title">
          <span className="cine-reveal-line">
            <span className="cine-reveal-line__inner">Your Learning Adventure</span>
          </span>
          <span className="cine-reveal-line">
            <span className="cine-reveal-line__inner">Starts Here.</span>
          </span>
        </h2>
        <p className="cta__body">
          Explore AcadeMY and turn every chapter into meaningful progress.
        </p>
        <div className="cta__buttons">
          <CinematicAuthCta className="cine-button cine-button--primary cine-button--lg">
            Start Learning
          </CinematicAuthCta>
          <CinematicUpgradeLink className="cine-button cine-button--ghost cine-button--lg">
            View Plans
          </CinematicUpgradeLink>
        </div>
      </div>

      <img
        className="cta__nova"
        src={companionNova}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        draggable={false}
      />

      <footer className="cta__footer">
        <AcademyLogo />
        <span className="cta__footer-note">
          © {new Date().getFullYear()} AcadeMY · Gamified KSSM learning for Forms 1–3
        </span>
        <div className="cta__footer-links">
          <CinematicLoginAction className="cta__footer-link" />
          <CinematicAuthCta className="cta__footer-link">Sign Up</CinematicAuthCta>
          <CinematicUpgradeLink className="cta__footer-link">Plans</CinematicUpgradeLink>
        </div>
      </footer>
    </section>
  );
}
