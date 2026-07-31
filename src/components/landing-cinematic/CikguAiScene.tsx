import { useEffect, useRef } from "react";
import cikguAiBookPlatform from "@/assets/landing-cinematic/cikgu-ai-book-platform.webp";
import cikguAiBottomTerrain from "@/assets/landing-cinematic/cikgu-ai-bottom-terrain.webp";
import cikguAiTutor from "@/assets/landing-cinematic/cikgu-ai-tutor.webp";
import paperPlane from "@/assets/landing-cinematic/decor/paper-plane.webp";
import { CinematicAuthCta } from "./CinematicAuthActions";
import { useCinematicMotion } from "./cinematicMotionContext";
import AtmosphericBackground from "./AtmosphericBackground";

/**
 * Ace — the original Companion desktop engine. Its GSAP timeline and
 * ScrollTrigger config (pin, scrub, +=300%) remain intact at 1024px and above;
 * smaller viewports use the natural-flow layout defined in the scoped CSS.
 *
 * Animation-target mapping (old → new):
 *   .companion__figure   → Ace tutor (silhouette → full-colour reveal)
 *   .companion__rim      → violet glow behind the tutor
 *   .companion__particle → gold paper sparkles
 *   .companion__title    → eyebrow + headline (staggered reveal lines)
 *   .companion__body     → supporting paragraph + trust line
 *   .companion__step     → three prompt-action buttons + CTA
 *   .companion__rank     → three question cards + conversation card (final detail)
 */
const ACTIONS = ["Explain it simply", "Give me a hint", "Test my understanding"];

const QUESTIONS = ["Can you explain this?", "Give me one hint", "Quiz me on this topic"];

/* Four-point sparkle, drawn inline. Was a text glyph (✦/★/◆), which depended on
   whatever font happened to resolve; this renders identically everywhere. */
function Sparkle({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path
        d="M12 0 C13.1 7.4 16.6 10.9 24 12 C16.6 13.1 13.1 16.6 12 24 C10.9 16.6 7.4 13.1 0 12 C7.4 10.9 10.9 7.4 12 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

const PARTICLES = [
  { left: "38%", top: "30%", size: 11 },
  { left: "62%", top: "24%", size: 8 },
  { left: "30%", top: "52%", size: 9 },
  { left: "68%", top: "48%", size: 12 },
  { left: "46%", top: "18%", size: 7 },
  { left: "58%", top: "60%", size: 10 },
];

export default function CikguAiScene() {
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

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=300%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl
          // book platform establishes the foundation first
          .fromTo(
            q(".companion__book"),
            { opacity: 0, y: 46, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power2.out" },
            0,
          )
          // tutor rises from the book — stays BRIGHT throughout (no silhouette)
          .fromTo(
            q(".companion__figure"),
            { opacity: 0, scale: 0.86, y: 74 },
            {
              opacity: 1,
              scale: 0.94,
              y: 30,
              duration: 1.6,
              ease: "power1.inOut",
            },
            0.35,
          )
          .to(q(".companion__rim"), { opacity: 0.75, duration: 1.4 }, 0.5)
          // slow approach + settle
          .to(
            q(".companion__figure"),
            {
              scale: 1,
              y: 0,
              duration: 2.4,
              ease: "power2.inOut",
            },
            1.6,
          )
          .to(q(".companion__rim"), { opacity: 0.35, scale: 1.15, duration: 2 }, 2.0)
          // progress symbols drift up
          .fromTo(
            q(".companion__particle"),
            { opacity: 0, y: 34, scale: 0.7 },
            { opacity: 1, y: -18, scale: 1, duration: 1.6, stagger: 0.18, ease: "power1.out" },
            3.4,
          )
          // then, and only then, the words
          .from(
            q(".companion__title .cine-reveal-line__inner"),
            { yPercent: 115, duration: 1, stagger: 0.12 },
            4.3,
          )
          .from(q(".companion__body"), { y: 30, opacity: 0, duration: 0.9 }, 4.8)
          .from(q(".companion__step"), { y: 22, opacity: 0, duration: 0.6, stagger: 0.12 }, 5.2)
          // the three question cards arrive independently, each from the side it
          // sits on, then the conversation card unfolds last
          .fromTo(
            q(".companion__question--1"),
            { opacity: 0, x: -26, y: -20, scale: 0.94 },
            { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.7 },
            5.7,
          )
          .fromTo(
            q(".companion__question--2"),
            { opacity: 0, x: -28, scale: 0.94 },
            { opacity: 1, x: 0, scale: 1, duration: 0.7 },
            5.81,
          )
          .fromTo(
            q(".companion__question--3"),
            { opacity: 0, x: 28, scale: 0.94 },
            { opacity: 1, x: 0, scale: 1, duration: 0.7 },
            5.92,
          )
          .fromTo(
            q(".companion__convo"),
            { opacity: 0, y: 20, scaleY: 0.93, rotateX: -5 },
            { opacity: 1, y: 0, scaleY: 1, rotateX: 0, duration: 0.65, ease: "power2.out" },
            6.1,
          )
          .to(q(".companion__particle"), { y: -46, opacity: 0.55, duration: 1.6 }, 5.4)
          // terrain settles after the scene is already readable
          .fromTo(
            q(".companion__terrain"),
            { opacity: 0, y: 26, scale: 1.01 },
            { opacity: 1, y: 0, scale: 1, duration: 0.78, ease: "power2.out" },
            6.3,
          )
          // hold the completed composition so it can actually be read before
          // the pin releases into Parents (was ~8% of the range, now ~22%)
          .to({}, { duration: 2 }, 6.6);
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.set(
          q(
            ".companion__book, .companion__figure, .companion__rim, .companion__particle, .companion__title .cine-reveal-line__inner, .companion__body, .companion__step, .companion__question, .companion__convo, .companion__terrain",
          ),
          { clearProps: "transform,opacity,visibility" },
        );

        const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => window.cancelAnimationFrame(refreshFrame);
      });
    }, root);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [motion]);

  return (
    <section id="cikgu-ai" ref={rootRef} className="companion companion--cikgu">
      <AtmosphericBackground variant="world" stars={14} />

      {/* dotted flight path the paper plane travels along — coded, not an asset.
          Sits in the empty upper-left gutter, clear of the copy column. */}
      <svg
        className="trail trail--cikgu"
        viewBox="0 0 320 180"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="trail__path"
          d="M6,170 C60,150 92,104 140,74 C186,45 232,30 306,12"
          stroke="var(--violet-bright)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1 12"
        />
      </svg>

      <img
        className="cine-decor cine-decor--cikgu-plane"
        src={paperPlane}
        alt=""
        aria-hidden="true"
        width={280}
        height={160}
        loading="lazy"
        decoding="async"
        draggable={false}
      />

      {/* three paper fragments drifting near the scene's lower gutter */}
      <span className="frag frag--1" aria-hidden="true" />
      <span className="frag frag--2" aria-hidden="true" />
      <span className="frag frag--3" aria-hidden="true" />

      {/* papercraft terrain: decorative, bottom-anchored, behind all content.
          Its own wrapper does the clipping, so it can never widen the page. */}
      <div className="companion__terrain" aria-hidden="true">
        <img
          className="companion__terrain-img"
          src={cikguAiBottomTerrain}
          alt=""
          width={1400}
          height={341}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>

      <div className="companion__layout">
        {/* LEFT: copy column — declared first so it renders on the left */}
        <div className="companion__copy">
          <div className="companion__title">
            <span className="cine-reveal-line">
              <span className="cine-reveal-line__inner companion__eyebrow">
                Your Personal AI Tutor
              </span>
            </span>
            <h2 className="companion__heading">
              <span className="cine-reveal-line">
                <span className="cine-reveal-line__inner">Stuck? Ask</span>
              </span>
              <span className="cine-reveal-line">
                <span className="cine-reveal-line__inner">Ace.</span>
              </span>
            </h2>
          </div>

          <p className="companion__body">
            Get clear explanations, guided hints and instant practice based on what you are learning
            — whenever you need help.
          </p>

          <div className="companion__steps">
            {ACTIONS.map((s) => (
              <span key={s} className="companion__step">
                {s}
              </span>
            ))}
            <CinematicAuthCta
              className="companion__step companion__cta"
              authenticatedLabel={
                <>
                  Try Ace <em aria-hidden="true">→</em>
                </>
              }
              authenticatedTo="/notes"
            >
              Try Ace <em aria-hidden="true">→</em>
            </CinematicAuthCta>
          </div>

          <p className="companion__body companion__trust">
            KSSM-aligned <i aria-hidden="true">•</i> Bahasa Melayu &amp; English{" "}
            <i aria-hidden="true">•</i> Available anytime
          </p>
        </div>

        {/* RIGHT: visual column — tutor, book, floating cards */}
        <div className="companion__stage">
          <span className="companion__rim" aria-hidden="true" />

          {/* open-book platform sits beneath the tutor inside the same stage */}
          <img
            className="companion__book"
            src={cikguAiBookPlatform}
            alt=""
            width={1000}
            height={386}
            loading="lazy"
            decoding="async"
            draggable={false}
          />

          <img
            className="companion__figure"
            src={cikguAiTutor}
            alt="Ace, the AcadeMY robot tutor, holding a teaching pointer"
            width={620}
            height={669}
            loading="lazy"
            decoding="async"
            draggable={false}
          />

          {/* floating question cards live in the visual column, around the
              tutor — they reuse the original .companion__rank reveal target */}
          {QUESTIONS.map((qn, i) => (
            <span
              key={qn}
              className={`companion__rank companion__question companion__question--${i + 1}`}
            >
              {qn}
            </span>
          ))}

          {/* conversation card: lower-right, beside the book (final detail) */}
          <div className="companion__rank companion__convo">
            <p className="companion__convo-row">
              <span className="companion__convo-who">Student</span>
              <span>I still don’t understand photosynthesis.</span>
            </p>
            <p className="companion__convo-row">
              <span className="companion__convo-who companion__convo-who--ai">Ace</span>
              <span>
                Think of a leaf as a tiny food factory. Let’s break it into three simple steps.
              </span>
            </p>
          </div>

          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="companion__particle"
              style={{ left: p.left, top: p.top }}
              aria-hidden="true"
            >
              <Sparkle size={p.size} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
