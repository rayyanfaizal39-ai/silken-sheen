import { useEffect, useRef, type ReactNode } from "react";
import goldSparkles from "@/assets/landing-cinematic/decor/gold-sparkles.webp";
import { useCinematicMotion } from "./cinematicMotionContext";

/**
 * One coherent icon system: every glyph is a 24×24 line icon on the same grid
 * with the same 1.9 stroke weight, so the six tiles read as a set. No emoji, no
 * text glyphs. Public cards intentionally carry NO chapter counts.
 */
type Subject = {
  name: string;
  tone: string;
  icon: ReactNode;
};

const SUBJECTS: Subject[] = [
  {
    name: "Science",
    tone: "science",
    // laboratory flask
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.5 3v5.2L4.6 17a2.2 2.2 0 0 0 1.9 3.3h11a2.2 2.2 0 0 0 1.9-3.3L14.5 8.2V3" />
        <path d="M8.4 3h7.2" />
        <path d="M7.2 14.2h9.6" />
      </svg>
    ),
  },
  {
    name: "Mathematics",
    tone: "maths",
    // calculator
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="2.6" width="16" height="18.8" rx="2.4" />
        <path d="M7.6 6.6h8.8" />
        <path d="M8.2 11.4h.01M12 11.4h.01M15.8 11.4h.01M8.2 15.6h.01M12 15.6h.01M15.8 15.6h.01" />
      </svg>
    ),
  },
  {
    name: "Sejarah",
    tone: "sejarah",
    // classical building / museum
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.2 9.2 12 4l8.8 5.2" />
        <path d="M5.6 10.4v7.2M10 10.4v7.2M14 10.4v7.2M18.4 10.4v7.2" />
        <path d="M3.4 20.4h17.2" />
      </svg>
    ),
  },
  {
    name: "Geography",
    tone: "geography",
    // globe
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3.2 9.4h17.6M3.2 14.6h17.6" />
        <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z" />
      </svg>
    ),
  },
  {
    name: "Bahasa Melayu",
    tone: "bm",
    // open book with a speech element
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 5.4h5.2A3 3 0 0 1 11.2 8v11a2.4 2.4 0 0 0-2.4-1.7H3z" />
        <path d="M21 5.4h-5.2A3 3 0 0 0 12.8 8v11a2.4 2.4 0 0 1 2.4-1.7H21z" />
        <path d="M14.6 2.6h6.2a1 1 0 0 1 1 1v2.1a1 1 0 0 1-1 1h-3l-1.7 1.5V6.7h-1.5" fill="none" />
      </svg>
    ),
  },
  {
    name: "English",
    tone: "english",
    // conversation bubbles
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6.4a2 2 0 0 1 2-2h8.6a2 2 0 0 1 2 2v4.4a2 2 0 0 1-2 2H8.2L4.6 15.6v-2.8H5a2 2 0 0 1-2-2z" />
        <path d="M18 9.2h1a2 2 0 0 1 2 2v4.4a2 2 0 0 1-2 2h-.4v2.6l-3.2-2.6h-3" />
      </svg>
    ),
  },
];

export default function KssmScene() {
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

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(q(".kssm__header > *"), {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: { trigger: root, start: "top 82%", once: true },
        });
        gsap.from(q(".kssm__card"), {
          y: 32,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: { trigger: q(".kssm__grid")[0], start: "top 88%", once: true },
        });
      });
    }, root);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [motion]);

  return (
    <section id="kssm" ref={rootRef} className="kssm">
      <img
        className="cine-decor cine-decor--kssm-sparkles"
        src={goldSparkles}
        alt=""
        aria-hidden="true"
        width={240}
        height={217}
        loading="lazy"
        decoding="async"
        draggable={false}
      />

      <div className="kssm__inner">
        <header className="kssm__header">
          <p className="kssm__eyebrow">Made for Malaysia</p>
          <h2>Built Around the Malaysian KSSM Curriculum.</h2>
          <p className="kssm__body">
            Every chapter, activity and learning tool is organised to help Forms 1–3 students study
            with greater confidence.
          </p>
        </header>

        <ul className="kssm__grid">
          {SUBJECTS.map((s) => (
            <li key={s.name} className={`kssm__card kssm__card--${s.tone}`}>
              <span className="kssm__tile" aria-hidden="true">
                {s.icon}
              </span>
              <h3 className="kssm__name">{s.name}</h3>
              <p className="kssm__meta">Forms 1–3</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
