import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import learningEcosystemBanner from "@/assets/landing-cinematic/all-in-one-learning-ecosystem-cropped.webp";
import bgCosmic from "@/assets/landing-cinematic/bg-cosmic.webp";
import learningAiVideos from "@/assets/landing-cinematic/learning-ai-videos-trimmed.webp";
import learningCompanion from "@/assets/landing-cinematic/learning-companion-trimmed.webp";
import learningKssmNotes from "@/assets/landing-cinematic/learning-kssm-notes-trimmed.webp";
import learningParentDashboard from "@/assets/landing-cinematic/learning-parent-dashboard-trimmed.webp";
import learningPlanet from "@/assets/landing-cinematic/learning-planet.webp";
import learningSmartQuizzes from "@/assets/landing-cinematic/learning-smart-quizzes-trimmed.webp";
import planet from "@/assets/landing-cinematic/planet.webp";
import { useCinematicMotion, type CinematicScrollTrigger } from "./cinematicMotionContext";

/** Papercraft feature cards — transparent PNGs, shown one at a time. Each maps
 *  to a landmark on the Learning Planet so the two sides feel like one scene. */
type Feature = {
  key: string;
  src: string;
  alt: string;
  tab: string;
  /** landmark position as a % of the planet artwork */
  node: { x: number; y: number };
};

const FEATURES: Feature[] = [
  // Academy building
  {
    key: "notes",
    src: learningKssmNotes,
    alt: "Complete KSSM Notes feature",
    tab: "KSSM Notes",
    node: { x: 49, y: 29 },
  },
  // Observatory / broadcast dome
  {
    key: "videos",
    src: learningAiVideos,
    alt: "AI Learning Videos feature",
    tab: "AI Videos",
    node: { x: 24, y: 24 },
  },
  // "Learn Practice Grow" practice area
  {
    key: "quizzes",
    src: learningSmartQuizzes,
    alt: "Smart Quizzes feature",
    tab: "Smart Quizzes",
    node: { x: 63, y: 53 },
  },
  // central lake / companion gathering area
  {
    key: "companion",
    src: learningCompanion,
    alt: "Gamified Companion feature",
    tab: "Companion",
    node: { x: 45, y: 47 },
  },
  // family home + comms tower
  {
    key: "parents",
    src: learningParentDashboard,
    alt: "Parent Dashboard feature",
    tab: "Parents",
    node: { x: 81, y: 40 },
  },
];

/* The island's greenery ends at ~63% down the artwork. Framing the handoff on
   the FULL remaining purple region — centred at 82% with a 36%-tall band, i.e.
   [0.64, 1.00] — keeps the island out of frame and the bottom edge exactly on
   the planet's rim, while needing the least enlargement (less upscaling). */
const FOCAL = 0.82;
const BAND = 0.36;
/** Cap the on-screen render so the 1254px source never upscales past ~2.6x. */
const MAX_RENDER_PX = 3260;

/** The hero planet's exact end-of-scrub transform — replicated here so this
 *  section's first frame is identical to the hero's last. */
const HERO_END = { scale: 9, x: 90, y: 60, rotation: 9 };

/* ---- timeline map, in units of 100 so positions read as percentages ---- */
const T_CARDS_START = 26;
const T_CARDS_END = 90;
const T_SLICE = (T_CARDS_END - T_CARDS_START) / FEATURES.length; // 12.8
const SWAP = 3;

/** Gentle arc drawn through the empty centre, card → planet (viewBox 1440x900). */
const ORBIT_D = "M 596 566 C 722 516, 796 402, 928 392 C 1014 385, 1072 418, 1124 458";

/** Deterministic paper stars / motes for the middle distance. */
const STARS = [
  { x: 63, y: 16, s: 7, d: 0 },
  { x: 88, y: 30, s: 5, d: 1.4 },
  { x: 54, y: 74, s: 6, d: 2.6 },
  { x: 76, y: 82, s: 4, d: 0.8 },
  { x: 41, y: 20, s: 5, d: 3.2 },
  { x: 93, y: 62, s: 6, d: 1.9 },
];
const MOTES = [
  { x: 58, y: 40, d: 0 },
  { x: 70, y: 68, d: 2.5 },
  { x: 85, y: 22, d: 5 },
  { x: 48, y: 60, d: 7.5 },
];

export default function LearningPlanetScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<CinematicScrollTrigger | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const motion = useCinematicMotion();

  /** Scroll to the middle of a feature's window so tabs drive the timeline. */
  const goToFeature = useCallback(
    (i: number) => {
      const st = stRef.current;
      if (!st) {
        activeRef.current = i;
        setActive(i);
        return;
      }
      const p = (T_CARDS_START + (i + 0.5) * T_SLICE) / 100;
      const y = st.start + (st.end - st.start) * p;
      const lenis = motion?.getLenis();
      if (lenis) lenis.scrollTo(y, { duration: 1.1 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    },
    [motion],
  );

  const handleTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % FEATURES.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + FEATURES.length) % FEATURES.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = FEATURES.length - 1;
      else return;

      event.preventDefault();
      tabRefs.current[next]?.focus();
      goToFeature(next);
    },
    [goToFeature],
  );

  const exploreSubjects = useCallback(() => {
    const target = document.getElementById("kssm");
    if (!target) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const navigation = target
      .closest(".cinematic-landing-root")
      ?.querySelector<HTMLElement>(".cine-nav");
    const offset = -(navigation?.offsetHeight ?? 0);
    const lenis = motion?.getLenis();

    if (lenis) {
      lenis.scrollTo(
        target,
        reducedMotion ? { immediate: true, offset } : { duration: 1.1, offset },
      );
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({
      top,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [motion]);

  useEffect(() => {
    const tabs = tabsRef.current;
    const tab = tabRefs.current[active];
    if (!tabs || !tab || window.matchMedia("(min-width: 901px)").matches) return;

    const maxScrollLeft = Math.max(0, tabs.scrollWidth - tabs.clientWidth);
    const centeredLeft = tab.offsetLeft - (tabs.clientWidth - tab.offsetWidth) / 2;
    const left = Math.max(0, Math.min(centeredLeft, maxScrollLeft));
    if (Math.abs(tabs.scrollLeft - left) < 1) return;

    tabs.scrollTo({
      left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [active]);

  useEffect(() => {
    if (!motion) return;
    const { gsap, ScrollTrigger } = motion;
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context((self) => {
      const q = (sel: string) => self.selector!(sel) as HTMLElement[];

      mm.add(
        {
          isWide: "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
          isNarrow: "(max-width: 900px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { isWide } = context.conditions as { isWide: boolean };
          const img = q(".lworld__planet")[0];
          const base = () => img?.offsetHeight || 1;
          const cards = q(".lworld__feature");
          const nodes = q(".lworld__node");
          const halos = q(".lworld__node-halo");
          const orbitPath = q(".lworld__orbit-path")[0] as unknown as SVGPathElement | undefined;
          const marker = q(".lworld__orbit-marker");

          /** Anchor points along the orbit, one per feature (viewBox units). */
          const anchorAt = (i: number) => {
            if (!orbitPath || !orbitPath.getPointAtLength) return { x: 0, y: 0 };
            const len = orbitPath.getTotalLength();
            const t = 0.08 + (i / (FEATURES.length - 1)) * 0.84;
            const p = orbitPath.getPointAtLength(len * t);
            return { x: p.x, y: p.y };
          };

          const startScale = () => {
            const h = base();
            const ideal = window.innerHeight / (BAND * h);
            return Math.max(2.2, Math.min(ideal, MAX_RENDER_PX / h));
          };
          const startY = () => -(FOCAL - 0.5) * startScale() * base();

          // planet pulled slightly left, card sits a little higher and inward
          const endX = () => (isWide ? window.innerWidth * 0.22 : 0);
          // stacked layouts lift the planet clear of the card below it
          const endY = () => (isWide ? -window.innerHeight * 0.02 : -window.innerHeight * 0.17);

          // ---- exact initial states, set before the timeline is built ----
          gsap.set(root, { autoAlpha: 0 });
          gsap.set(q(".lworld__hero-planet"), { ...HERO_END, opacity: 1 });
          gsap.set(q(".lworld__haze"), { opacity: 0.6 });
          gsap.set(q(".lworld__planet-scene"), { opacity: 0 });
          gsap.set(q(".lworld__planet-scroll"), { scale: startScale, x: 0, y: startY });
          gsap.set(cards, { autoAlpha: 0, x: 18, scale: 0.985 });
          gsap.set(q(".lworld__stage-paper, .lworld__stage-star, .lworld__progress"), {
            autoAlpha: 0,
          });
          gsap.set(nodes, { autoAlpha: 0, scale: 0.85 });
          gsap.set(halos, { scale: 0.6, opacity: 0 });
          gsap.set(q(".lworld__orbit"), { autoAlpha: 0 });
          gsap.set(q(".lworld__depth"), { autoAlpha: 0 });
          if (marker.length) gsap.set(marker, { ...anchorAt(0), autoAlpha: 0 });

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: isWide ? "+=500%" : "+=380%",
              scrub: 1.2,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
              onUpdate: (st) => {
                const p = st.progress * 100;
                let i = Math.floor((p - T_CARDS_START) / T_SLICE);
                i = Math.max(0, Math.min(FEATURES.length - 1, i));
                if (i !== activeRef.current) {
                  activeRef.current = i;
                  setActive(i);
                }
              },
            },
          });
          stRef.current = tl.scrollTrigger ?? null;

          tl
            // ============ invisible planet handoff (camera frozen) ============
            .addLabel("planetHandoff", 0)
            .set(root, { autoAlpha: 1 }, 0.1)
            .to(q(".lworld__hero-planet"), { opacity: 0, duration: 8 }, 1.5)
            .to(q(".lworld__planet-scene"), { opacity: 1, duration: 8 }, 1.5)

            // ==================== controlled zoom-out =========================
            .addLabel("planetReveal", 10.7)
            .fromTo(
              q(".lworld__planet-scroll"),
              { scale: startScale, x: 0, y: startY },
              { scale: 1.3, y: 0, duration: 10, ease: "power1.inOut" },
              10.7,
            )
            .to(q(".lworld__haze"), { opacity: 0, duration: 6 }, 11)
            // middle-distance depth fades in as we reach open space
            .to(q(".lworld__depth"), { autoAlpha: 1, duration: 6 }, 14)

            // ==================== layout settle + copy ========================
            .addLabel("layoutSettle", 20.7)
            .to(
              q(".lworld__planet-scroll"),
              { scale: 1, x: endX, y: endY, duration: 5.3, ease: "power2.inOut" },
              20.7,
            )
            .from(
              q(".lworld__eyebrow"),
              { autoAlpha: 0, y: 14, duration: 1.6, ease: "power2.out" },
              20.4,
            )
            .from(
              q(".lworld__title .cine-reveal-line__inner"),
              { yPercent: 115, duration: 2.2, stagger: 0.5, ease: "power2.out" },
              21.0,
            )
            .from(
              q(".lworld__desc"),
              { autoAlpha: 0, y: 16, duration: 1.8, ease: "power2.out" },
              22.4,
            )
            .to(q(".lworld__orbit"), { autoAlpha: 1, duration: 2.4, ease: "power2.out" }, 22.6)
            .to(q(".lworld__stage-paper"), { autoAlpha: 1, duration: 1.8, stagger: 0.3 }, 22.8)
            .to(q(".lworld__stage-star"), { autoAlpha: 1, duration: 1.4, stagger: 0.25 }, 23.2)
            .to(q(".lworld__progress"), { autoAlpha: 1, duration: 1.4 }, 23.4)
            .from(
              q(".lworld__tabs"),
              { autoAlpha: 0, y: 12, duration: 1.6, ease: "power2.out" },
              23.6,
            )
            .to(marker, { autoAlpha: 1, duration: 1.4 }, 23.8)
            .set(q(".lworld__planet-idle"), { animationPlayState: "running" }, 26);

          // ============ one card at a time, swapped on scroll ============
          tl.fromTo(
            cards[0],
            { autoAlpha: 0, x: 18, scale: 0.985 },
            { autoAlpha: 1, x: 0, scale: 1, duration: SWAP, ease: "power1.inOut" },
            T_CARDS_START - SWAP,
          );
          for (let i = 1; i < cards.length; i++) {
            const at = T_CARDS_START + i * T_SLICE - SWAP / 2;
            tl.to(
              cards[i - 1],
              { autoAlpha: 0, x: -18, scale: 0.985, duration: SWAP, ease: "power1.inOut" },
              at,
            ).fromTo(
              cards[i],
              { autoAlpha: 0, x: 18, scale: 0.985 },
              { autoAlpha: 1, x: 0, scale: 1, duration: SWAP, ease: "power1.inOut" },
              at,
            );
          }

          // ==== the planet reacts: landmark highlight, orbit pulse, marker ====
          FEATURES.forEach((_, i) => {
            const at = T_CARDS_START + i * T_SLICE - SWAP / 2;
            // highlight only the matching landmark
            tl.to(
              nodes,
              {
                autoAlpha: (idx: number) => (idx === i ? 1 : 0.26),
                scale: (idx: number) => (idx === i ? 1 : 0.85),
                duration: SWAP,
                ease: "power2.out",
              },
              at,
            );
            // a single soft paper halo pulse on the active landmark
            if (halos[i]) {
              tl.fromTo(
                halos[i],
                { scale: 0.6, opacity: 0.7 },
                { scale: 1.6, opacity: 0, duration: SWAP * 1.5, ease: "power2.out" },
                at,
              );
            }
            // orbit brightens briefly, then settles back
            if (orbitPath) {
              tl.to(orbitPath, { opacity: 0.6, duration: SWAP * 0.45, ease: "power2.out" }, at).to(
                orbitPath,
                { opacity: 0.22, duration: SWAP * 1.1, ease: "power1.inOut" },
                at + SWAP * 0.45,
              );
            }
            // marker advances a short way along the path
            if (marker.length) {
              tl.to(marker, { ...anchorAt(i), duration: SWAP * 1.2, ease: "power2.inOut" }, at);
            }
          });

          tl.addLabel("readingHold", T_CARDS_END).to(
            {},
            { duration: 100 - T_CARDS_END },
            T_CARDS_END,
          );
        },
      );
    }, root);

    // Decode only the two planet textures whose intrinsic pixels are required
    // for the opening handoff. The fixed-ratio card stage already reserves its
    // geometry, so card decoding does not need to delay the refresh.
    const imgs = Array.from(
      root.querySelectorAll<HTMLImageElement>(".lworld__planet, .lworld__hero-planet-img"),
    );
    let cancelled = false;
    Promise.all(
      imgs.map((im) =>
        im.decode ? im.decode().catch(() => undefined) : Promise.resolve(undefined),
      ),
    ).then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      stRef.current = null;
      mm.revert();
      ctx.revert();
    };
  }, [motion]);

  return (
    <section id="learning-world" className="lworld">
      <div ref={rootRef} className="lworld__cinematic">
        <div className="lworld__bg" aria-hidden="true">
          <img className="lworld__bg-img" src={bgCosmic} alt="" draggable={false} />
          <div className="lworld__bg-overlay" />
        </div>

        {/* middle-distance depth: faint orbital ring, paper stars, drifting motes */}
        <div className="lworld__depth" aria-hidden="true">
          <span className="lworld__ring" />
          <span className="lworld__ribbon" />
          {/* Only the first two stars and the first mote animate — the rest are
            static and vary by size and position alone. */}
          {STARS.map((s, i) => (
            <span
              key={`s${i}`}
              className={`lworld__star ${i < 2 ? "lworld__star--live" : ""}`}
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: `${s.s}px`,
                height: `${s.s}px`,
                ...(i < 2 ? { animationDelay: `${s.d}s` } : null),
              }}
            />
          ))}
          {MOTES.map((m, i) => (
            <span
              key={`m${i}`}
              className={`lworld__mote ${i < 1 ? "lworld__mote--live" : ""}`}
              style={{
                left: `${m.x}%`,
                top: `${m.y}%`,
                ...(i < 1 ? { animationDelay: `${m.d}s` } : null),
              }}
            />
          ))}
        </div>

        {/* the hero's own planet, continued at its exact final framing */}
        <div className="lworld__hero-planet" aria-hidden="true">
          <img className="lworld__hero-planet-img" src={planet} alt="" draggable={false} />
        </div>

        {/* paper-strip orbit connecting the active card to the planet */}
        <svg
          className="lworld__orbit"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <path className="lworld__orbit-path" d={ORBIT_D} />
          <g className="lworld__orbit-marker">
            <path
              className="lworld__orbit-star"
              d="M0,-7 L2,-2 L7,0 L2,2 L0,7 L-2,2 L-7,0 L-2,-2 Z"
            />
          </g>
        </svg>

        <div className="lworld__planet-scene" aria-hidden="true">
          <div className="lworld__planet-scroll">
            <div className="lworld__planet-idle">
              <div className="lworld__planet-holder">
                <img className="lworld__planet" src={learningPlanet} alt="" draggable={false} />
                <div className="lworld__nodes">
                  {FEATURES.map((f) => (
                    <span
                      key={f.key}
                      className="lworld__node"
                      style={{ left: `${f.node.x}%`, top: `${f.node.y}%` }}
                    >
                      <span className="lworld__node-halo" />
                      <span className="lworld__node-dot" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* matches the hero's closing purple glow, then clears */}
        <div className="lworld__haze" aria-hidden="true" />

        <div className="lworld__content">
          <div className="lworld__content-inner">
            <p className="lworld__eyebrow">Welcome to the AcadeMY Universe</p>
            <h2 className="lworld__title">
              <span className="cine-reveal-line">
                <span className="cine-reveal-line__inner">Everything Students Need,</span>
              </span>
              <span className="cine-reveal-line">
                <span className="cine-reveal-line__inner">Inside One Learning World.</span>
              </span>
            </h2>
            <p className="lworld__desc">
              Explore complete KSSM notes, AI learning videos, smart quizzes, gamified companions
              and parent progress tools — all connected in one learning journey.
            </p>

            <div className="lworld__stage">
              {/* offset papercraft layers peeking out behind the card */}
              <span
                className="lworld__stage-paper lworld__stage-paper--purple"
                aria-hidden="true"
              />
              <span className="lworld__stage-paper lworld__stage-paper--cream" aria-hidden="true" />
              <span className="lworld__stage-star lworld__stage-star--1" aria-hidden="true" />
              <span className="lworld__stage-star lworld__stage-star--2" aria-hidden="true" />
              <span className="lworld__stage-star lworld__stage-star--3" aria-hidden="true" />

              {FEATURES.map((f, i) => (
                <img
                  key={f.key}
                  id={`lworld-panel-${f.key}`}
                  className={`lworld__feature${active === i ? " is-active" : ""}`}
                  src={f.src}
                  alt={f.alt}
                  role="tabpanel"
                  aria-labelledby={`lworld-tab-${f.key}`}
                  aria-hidden={active !== i}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                />
              ))}

              <span className="lworld__progress" aria-hidden="true">
                {String(active + 1).padStart(2, "0")} <i>/</i>{" "}
                {String(FEATURES.length).padStart(2, "0")}
              </span>
            </div>

            <div
              ref={tabsRef}
              className="lworld__tabs"
              role="tablist"
              aria-label="Learning World features"
            >
              {FEATURES.map((f, i) => (
                <button
                  key={f.key}
                  id={`lworld-tab-${f.key}`}
                  ref={(element) => {
                    tabRefs.current[i] = element;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-controls={`lworld-panel-${f.key}`}
                  tabIndex={active === i ? 0 : -1}
                  className={`lworld__tab${active === i ? " is-active" : ""}`}
                  onClick={() => goToFeature(i)}
                  onKeyDown={(event) => handleTabKeyDown(event, i)}
                >
                  {f.tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lworld__ecosystem">
        <div className="lworld__ecosystem-frame">
          <img
            className="lworld__ecosystem-img"
            src={learningEcosystemBanner}
            alt="All-in-one learning ecosystem: learn, practice, track and achieve."
            width={1863}
            height={432}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <button
            className="lworld__ecosystem-button"
            type="button"
            aria-label="Explore Subjects"
            onClick={exploreSubjects}
          />
        </div>
      </div>
    </section>
  );
}
