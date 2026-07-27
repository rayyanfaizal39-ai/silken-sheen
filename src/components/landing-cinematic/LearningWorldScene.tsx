import { useEffect, useRef } from "react";
import cloudDark from "@/assets/landing-cinematic/decor/cloud-dark.webp";
import whyClearerUnderstanding from "@/assets/landing-cinematic/why-clearer-understanding-trimmed.webp";
import whyKssmCoverage from "@/assets/landing-cinematic/why-kssm-coverage-trimmed.webp";
import whyMotivation from "@/assets/landing-cinematic/why-motivation-trimmed.webp";
import whyParentsConnected from "@/assets/landing-cinematic/why-parents-connected-trimmed.webp";
import { useCinematicMotion } from "./cinematicMotionContext";
import AtmosphericBackground from "./AtmosphericBackground";

/**
 * "Why Choose AcadeMY" — a value / benefit section, anchored at #why-academy
 * (the `world` class name is retained; #learning-world is the separate Learning
 * Planet showcase). Deliberately distinct from that showcase: benefits, not a
 * feature inventory; large cream papercraft cards, not small dark UI chips.
 *
 * This section is deliberately NOT pinned and has no multi-viewport scroll
 * range — its height is its content, so no empty viewport can bracket it.
 */
/** Provided papercraft benefit cards — transparent PNGs, shown as-is. */
type Benefit = { key: string; src: string; alt: string; summary: string };

const BENEFITS: Benefit[] = [
  {
    key: "coverage",
    src: whyKssmCoverage,
    alt: "Complete KSSM Coverage",
    summary:
      "Complete KSSM Coverage. Every subject and chapter organised in one clear learning space. Forms 1 to 3, BM and DLP.",
  },
  {
    key: "understanding",
    src: whyClearerUnderstanding,
    alt: "Clearer Understanding",
    summary:
      "Clearer Understanding. Structured notes, guided explanations and smart learning support help students understand faster. Learn with confidence.",
  },
  {
    key: "motivation",
    src: whyMotivation,
    alt: "Motivation That Lasts",
    summary:
      "Motivation That Lasts. XP, rewards and companions make learning feel engaging and worth returning to. Learn, earn, grow.",
  },
  {
    key: "parents",
    src: whyParentsConnected,
    alt: "Parents Stay Connected",
    summary:
      "Parents Stay Connected. Parents can follow progress, celebrate growth and support learning every step of the way. Weekly insights.",
  },
];

const TRUST = ["KSSM Aligned", "Forms 1–3", "BM & DLP", "Progress Tracking", "Parent Reports"];

export default function LearningWorldScene() {
  const rootRef = useRef<HTMLElement>(null);
  const motion = useCinematicMotion();

  useEffect(() => {
    if (!motion) return;
    const { gsap } = motion;
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context((self) => {
      const q = (sel: string) => self.selector!(sel) as HTMLElement[];

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        // Everything is visible by CSS default (so reduced-motion / no-JS shows a
        // complete section). Hide the animated bits here, then reveal on scroll.
        gsap.set(q(".world__desc"), { autoAlpha: 0, y: 24 });
        gsap.set(q(".world__benefit"), { autoAlpha: 0, y: 26, scale: 0.97 });
        gsap.set(q(".world__trust"), { autoAlpha: 0, y: 18 });

        // The section is NOT pinned and has no scrubbed range. Because it is now
        // ~1100–1700px tall, ONE timeline anchored to the section top finished
        // long before the cards had scrolled into view — the reveal was over
        // before you could see it. Header and cards therefore get their own
        // once-triggers, each firing when THAT block enters the viewport.
        const header = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
        });

        header
          // the purple veil handed over from the planet scene clears
          .to(q(".world__veil"), { autoAlpha: 0, duration: 0.7, ease: "power1.out" }, 0)
          .from(q(".world__eyebrow"), { autoAlpha: 0, y: 16, duration: 0.45 }, 0.05)
          .from(
            q(".world__title .cine-reveal-line__inner"),
            { yPercent: 115, duration: 0.65, stagger: 0.12, ease: "power2.out" },
            0.2,
          )
          .to(q(".world__desc"), { autoAlpha: 1, y: 0, duration: 0.5 }, 0.62);

        // cards reveal in reading order as the grid itself arrives, then the
        // trust strip settles under them
        const grid = q(".world__benefits")[0];
        const cards = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: grid, start: "top 86%", once: true },
        });
        cards
          .to(
            q(".world__benefit"),
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.68,
              stagger: 0.12,
              clearProps: "transform",
            },
            0,
          )
          .to(q(".world__trust"), { autoAlpha: 1, y: 0, duration: 0.55 }, 0.5);

        // terrain settles last, tied to the bottom of the grid
        gsap.from(q(".world__hill"), {
          yPercent: 22,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: grid, start: "bottom 95%", once: true },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(q(".world__veil"), { autoAlpha: 0 });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.set(
          q(
            ".world__eyebrow, .world__title .cine-reveal-line__inner, .world__desc, .world__benefit, .world__trust, .world__hill",
          ),
          { clearProps: "transform,opacity,visibility" },
        );
      });
    }, root);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [motion]);

  return (
    <section id="why-academy" ref={rootRef} className="world world--why">
      <AtmosphericBackground variant="world" stars={18} />

      <img
        className="cine-decor cine-decor--why-cloud"
        src={cloudDark}
        alt=""
        aria-hidden="true"
        width={760}
        height={285}
        loading="lazy"
        decoding="async"
        draggable={false}
      />

      <div className="world__content">
        <p className="world__eyebrow">Why Choose AcadeMY</p>
        <h2 className="world__title">
          <span className="cine-reveal-line">
            <span className="cine-reveal-line__inner">
              Built for <span className="world__accent">Students.</span>
            </span>
          </span>
          <span className="cine-reveal-line">
            <span className="cine-reveal-line__inner">
              Trusted by <span className="world__accent">Parents.</span>
            </span>
          </span>
        </h2>
        <p className="world__desc">
          AcadeMY combines complete KSSM learning, motivating progress tools and parent-friendly
          insights in one connected experience.
        </p>

        <div className="world__benefits">
          {BENEFITS.map((b) => (
            <figure key={b.key} className="world__benefit" aria-label={b.summary}>
              <span className="world__benefit-lift">
                <img
                  className="world__benefit-img"
                  src={b.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </span>
            </figure>
          ))}
        </div>

        <div className="world__trust">
          {TRUST.map((t) => (
            <span className="world__trust-item" key={t}>
              <svg
                className="world__trust-check"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="world__veil" aria-hidden="true" />
    </section>
  );
}
