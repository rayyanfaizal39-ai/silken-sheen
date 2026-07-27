import { useEffect, useRef } from "react";
import bgCosmic from "@/assets/landing-cinematic/bg-cosmic.webp";
import planet from "@/assets/landing-cinematic/planet.webp";
import rocket from "@/assets/landing-cinematic/rocket.webp";
import { CinematicAuthCta } from "./CinematicAuthActions";
import { useCinematicMotion } from "./cinematicMotionContext";

/** Screen-space heading (deg) of the rocket PNG's nose at rotation 0, measured
 *  from the artwork's nose→exhaust axis so the aim maths has a real offset. */
const ROCKET_NOSE_DEG = -55;

const TERRAIN = [
  {
    color: "var(--paper-1)",
    height: "34vh",
    path: "M0,150 C60,128 140,168 230,146 C320,124 390,160 480,138 C570,116 660,158 760,140 C860,122 930,162 1030,144 C1130,126 1210,158 1310,138 C1370,126 1410,140 1440,132 L1440,260 L0,260 Z",
  },
  {
    color: "var(--paper-2)",
    height: "28vh",
    path: "M0,168 C90,138 170,178 270,152 C370,126 440,172 540,150 C640,128 720,168 820,148 C920,128 1000,170 1100,150 C1200,130 1280,166 1380,146 C1410,140 1430,146 1440,144 L1440,260 L0,260 Z",
  },
  {
    color: "var(--paper-3)",
    height: "22vh",
    path: "M0,152 C70,176 150,136 250,160 C350,184 430,144 530,164 C630,184 710,148 810,166 C910,184 990,150 1090,168 C1190,186 1270,152 1370,168 C1400,172 1425,166 1440,168 L1440,260 L0,260 Z",
  },
  {
    color: "var(--paper-4)",
    height: "16vh",
    path: "M0,180 C80,158 160,192 260,172 C360,152 440,190 540,172 C640,154 720,192 820,176 C920,160 1000,194 1100,176 C1200,158 1280,192 1380,176 C1408,171 1428,176 1440,174 L1440,260 L0,260 Z",
  },
  {
    color: "var(--paper-5)",
    height: "10vh",
    path: "M0,196 C90,182 170,206 270,192 C370,178 450,208 550,196 C650,184 730,208 830,196 C930,184 1010,208 1110,196 C1210,184 1290,206 1390,194 C1412,191 1430,194 1440,192 L1440,260 L0,260 Z",
  },
];

export default function HeroScene() {
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
        // rocket rests bottom-centre, nudged slightly left of centre — and stays
        // fully visible from the first frame (no opacity reveal ever applied to it)
        gsap.set(q(".hero__rocket"), {
          xPercent: -50,
          x: () => -window.innerWidth * 0.03,
          autoAlpha: 1,
        });

        const intro = gsap.timeline({
          defaults: { ease: "power2.out" },
          delay: 0.15,
        });

        intro
          .to(q(".hero__dark"), { opacity: 0, duration: 2.2, ease: "power1.inOut" }, 0)
          .from(
            q(".hero__bg-img"),
            { scale: 1.06, opacity: 0, duration: 2.6, ease: "power1.inOut" },
            0,
          )
          .from(
            q(".hero__planet-img"),
            { scale: 1.08, opacity: 0, duration: 1.8, ease: "power2.out" },
            0.6,
          )
          .from(q(".hero__planet-glow"), { opacity: 0, duration: 2.2, ease: "power1.inOut" }, 0.7)
          .from(
            q(".hero__terrain-layer"),
            { yPercent: 100, duration: 1.5, stagger: 0.13, ease: "power2.out" },
            1.0,
          )
          .from(q(".hero__eyebrow"), { y: 26, opacity: 0, duration: 0.9 }, 2.0)
          .from(
            q(".hero__title .cine-reveal-line__inner"),
            { yPercent: 115, duration: 1.1, stagger: 0.14, ease: "power2.out" },
            2.2,
          )
          .from(q(".hero__support"), { y: 28, opacity: 0, duration: 1 }, 2.8)
          .from(q(".hero__ctas"), { y: 24, opacity: 0, duration: 0.9 }, 3.15)
          .from(q(".hero__rocket"), { scale: 0.9, duration: 1.3 }, 2.7)
          .from(q(".hero__hint"), { opacity: 0, duration: 0.8 }, 3.5);

        const scrub = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=280%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        scrub
          // hero copy lifts away gently — only ~20–30px, fading as it goes
          .to(q(".hero__title"), { y: -28, opacity: 0, duration: 1.7, ease: "power1.in" }, 0)
          .to(
            q(".hero__eyebrow, .hero__support"),
            { y: -24, opacity: 0, duration: 1.6, ease: "power1.in" },
            0.2,
          )
          .to(q(".hero__ctas"), { y: -22, opacity: 0, duration: 1.4, ease: "power1.in" }, 0.6)
          .to(q(".hero__hint"), { opacity: 0, duration: 0.5 }, 0)

          // space depth — background drifts extremely slowly (the slowest layer)
          .to(q(".hero__bg-img"), { y: -16, scale: 1.05, duration: 8 }, 0)

          // planet — the visual focus. Mid: drift up-right + grow to ~120% with an
          // almost imperceptible rotation. Approach: 120% → 180%. Envelop: it swells
          // until its purple fills the frame and becomes the next world.
          .to(
            q(".hero__planet"),
            { x: 30, y: -28, scale: 1.2, rotation: 4, duration: 5, ease: "power1.inOut" },
            0,
          )
          .to(q(".hero__planet"), { scale: 1.8, rotation: 6, duration: 1.6, ease: "power1.in" }, 5)
          .to(
            q(".hero__planet"),
            { scale: 9, x: 90, y: 60, rotation: 9, duration: 2.4, ease: "power2.in" },
            6.4,
          )

          // rocket — travels ~30vh then decelerates to almost nothing as the planet
          // approaches (the illusion is the planet coming to it). It never fades:
          // the planet (above it in z) sweeps over and hides it behind its edge.
          .to(
            q(".hero__rocket"),
            { x: 0, y: () => -window.innerHeight * 0.3, duration: 5, ease: "power2.out" },
            0,
          )
          .to(
            q(".hero__rocket"),
            { y: () => -window.innerHeight * 0.33, duration: 3, ease: "none" },
            5,
          )

          // horizon: subtle alternating horizontal parallax. Layers never fade,
          // never leave — only the x channel moves (the entrance owns the y
          // channel, so the two never overwrite each other).
          //   L1 R→L, L2 L→R, L3 R→L, L4 L→R, L5 R→L
          .to(q(".hero__terrain-layer--0"), { xPercent: -7, duration: 8 }, 0)
          .to(q(".hero__terrain-layer--1"), { xPercent: 6, duration: 8 }, 0)
          .to(q(".hero__terrain-layer--2"), { xPercent: -5, duration: 8 }, 0)
          .to(q(".hero__terrain-layer--3"), { xPercent: 4, duration: 8 }, 0)
          .to(q(".hero__terrain-layer--4"), { xPercent: -3, duration: 8 }, 0)

          // a soft purple glow envelops as we approach — never neon, no bloom
          .to(q(".hero__haze"), { opacity: 0.6, duration: 3.4 }, 4.2);
        // NOTE: no flat purple fill here — the hero now ends on the planet's own
        // purple surface, which the Learning World section picks up directly.
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(q(".hero__dark"), { opacity: 0 });
      });
    }, root);

    // Point the rocket's nose at the planet's centre. Recomputed on every
    // ScrollTrigger refresh (which fires on load, on resize and on manual
    // refresh) so the angle stays correct across responsive breakpoints. Runs
    // in every motion mode, so reduced-motion gets a correct static angle too.
    const aimRocket = () => {
      const rocketEl = root.querySelector<HTMLElement>(".hero__rocket");
      const planetEl = root.querySelector<HTMLElement>(".hero__planet");
      const imgEl = root.querySelector<HTMLElement>(".hero__rocket-img");
      if (!rocketEl || !planetEl || !imgEl) return;
      const r = rocketEl.getBoundingClientRect();
      const p = planetEl.getBoundingClientRect();
      const target =
        Math.atan2(
          p.top + p.height / 2 - (r.top + r.height / 2),
          p.left + p.width / 2 - (r.left + r.width / 2),
        ) *
        (180 / Math.PI);
      gsap.set(imgEl, { rotation: target - ROCKET_NOSE_DEG });
    };

    ScrollTrigger.addEventListener("refresh", aimRocket);
    aimRocket();

    // Lock in scroll distances + aim once the art has real dimensions, without
    // ever hiding the rocket while we wait.
    const rocketImg = root.querySelector<HTMLImageElement>(".hero__rocket-img");
    const planetImg = root.querySelector<HTMLImageElement>(".hero__planet-img");
    const onImgLoad = () => ScrollTrigger.refresh();
    [rocketImg, planetImg].forEach((im) => {
      if (im && !im.complete) im.addEventListener("load", onImgLoad);
    });

    return () => {
      ScrollTrigger.removeEventListener("refresh", aimRocket);
      rocketImg?.removeEventListener("load", onImgLoad);
      planetImg?.removeEventListener("load", onImgLoad);
      mm.revert();
      ctx.revert();
    };
  }, [motion]);

  return (
    <section id="hero" ref={rootRef} className="hero">
      <div className="hero__bg" aria-hidden="true">
        <img className="hero__bg-img" src={bgCosmic} alt="" draggable={false} />
        <div className="hero__bg-overlay" />
      </div>

      <div className="hero__planet" aria-hidden="true">
        <div className="hero__planet-glow" />
        <img className="hero__planet-img" src={planet} alt="" draggable={false} />
      </div>

      <div className="hero__terrain" aria-hidden="true">
        {TERRAIN.map((layer, i) => (
          <svg
            key={i}
            className={`hero__terrain-layer hero__terrain-layer--${i}`}
            style={{ height: layer.height }}
            viewBox="0 0 1440 260"
            preserveAspectRatio="none"
          >
            <path d={layer.path} fill={layer.color} />
          </svg>
        ))}
      </div>

      <div className="hero__rocket" aria-hidden="true">
        <div className="hero__rocket-bob">
          <img className="hero__rocket-img" src={rocket} alt="" draggable={false} />
          <span className="hero__rocket-particle" />
          <span className="hero__rocket-particle" />
          <span className="hero__rocket-particle" />
          <span className="hero__rocket-particle" />
        </div>
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">Malaysia's Gamified KSSM Learning World</p>
        <h1 className="hero__title">
          <span className="cine-reveal-line">
            <span className="cine-reveal-line__inner">Learning Feels Better</span>
          </span>
          <span className="cine-reveal-line">
            <span className="cine-reveal-line__inner">
              When It Becomes an <em>Adventure.</em>
            </span>
          </span>
        </h1>
        <p className="hero__support">
          Master KSSM subjects through interactive notes, quizzes, videos, rewards and a learning
          companion that grows with every achievement.
        </p>
        <div className="hero__ctas">
          <CinematicAuthCta className="cine-button cine-button--primary cine-button--lg">
            Start Your Journey
          </CinematicAuthCta>
          <button
            className="cine-button cine-button--ghost cine-button--lg"
            type="button"
            onClick={() => motion?.scrollToSection("#why-academy")}
          >
            Explore AcadeMY
          </button>
        </div>
      </div>

      <div className="hero__hint" aria-hidden="true">
        <span className="hero__hint-label">Scroll to begin</span>
        <span className="hero__hint-line" />
      </div>

      <div className="hero__haze" aria-hidden="true" />
      <div className="hero__portal" aria-hidden="true">
        <div className="hero__portal-glow" />
      </div>
      <div className="hero__dark" aria-hidden="true" />
    </section>
  );
}
