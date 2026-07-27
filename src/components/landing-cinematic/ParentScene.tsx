import { useEffect, useRef } from "react";
import cloudLight from "@/assets/landing-cinematic/decor/cloud-light.webp";
import { CinematicAuthCta } from "./CinematicAuthActions";
import { useCinematicMotion } from "./cinematicMotionContext";

/** Weekly key metrics, mirroring the Weekly Parent Report design. */
const METRICS = [
  {
    label: "Study Time",
    value: "5h 45m",
    meta: "+18% from last week",
    tone: "good" as const,
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
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    label: "Lessons Completed",
    value: "12",
    meta: "On schedule",
    tone: "info" as const,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 7.5C10.5 6 8.5 5.5 4 5.5v12c4.5 0 6.5.5 8 2 1.5-1.5 3.5-2 8-2v-12c-4.5 0-6.5.5-8 2z" />
        <path d="M12 7.5v12" />
      </svg>
    ),
  },
  {
    label: "Quizzes Completed",
    value: "8",
    meta: "100% submission",
    tone: "good" as const,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Avg Quiz Score",
    value: "88%",
    meta: "Strong improvement this week",
    tone: "good" as const,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 19v-7M12 19V6M18 19v-4" />
      </svg>
    ),
  },
  {
    label: "XP Earned",
    value: "2,450 XP",
    meta: "New weekly personal best!",
    tone: "violet" as const,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2.5L5 13.5h6l-1 8 8-11h-6z" />
      </svg>
    ),
  },
  {
    label: "Current Streak",
    value: "5 Days",
    meta: "Keep it going!",
    tone: "gold" as const,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2.7s4.8 4 4.8 8.4A4.8 4.8 0 0 1 12 16a4.8 4.8 0 0 1-4.8-4.9C7.2 6.7 12 2.7 12 2.7z" />
        <path d="M8.5 15.5c0 3 1.6 5.8 3.5 5.8s3.5-2.8 3.5-5.8" />
      </svg>
    ),
  },
];

const DAYS = [
  { d: "M", label: "Monday", active: true },
  { d: "T", label: "Tuesday", active: true },
  { d: "W", label: "Wednesday", active: true },
  { d: "T", label: "Thursday", active: true },
  { d: "F", label: "Friday", active: true },
  { d: "S", label: "Saturday", active: false },
  { d: "S", label: "Sunday", active: false },
];

const SUBJECTS = [
  {
    name: "Mathematics",
    badge: "Improving",
    tone: "improving",
    pct: 41,
    delta: "+9% this week",
    up: true,
  },
  { name: "Science", badge: "Strong", tone: "strong", pct: 46, delta: "+12% this week", up: true },
  {
    name: "Sejarah",
    badge: "Needs Revision",
    tone: "revision",
    pct: 29,
    delta: "-2% this week",
    up: false,
  },
];

const PLAN = [
  "Review Sejarah Bab 3 animated summary timeline (10 mins)",
  "Complete 5 Mathematics algebra challenge quizzes",
  "Complete daily active missions to maintain the 5-day streak",
];

/** 85% momentum ring. */
function MomentumRing() {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg
      className="preport__ring"
      viewBox="0 0 64 64"
      role="img"
      aria-label="Weekly learning momentum: 85 percent"
    >
      <circle cx="32" cy="32" r={r} fill="none" stroke="#e6dcfb" strokeWidth="7" />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="#6c2bd9"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={`${c * 0.85} ${c}`}
        transform="rotate(-90 32 32)"
      />
      <text x="32" y="36" textAnchor="middle" className="preport__ring-label">
        85%
      </text>
    </svg>
  );
}

export default function ParentScene() {
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
            end: "+=260%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl
          // the light surface emerges while the cosmos is still visible above
          .fromTo(
            q(".parents__panel"),
            { yPercent: 78, borderRadius: "44px 44px 0 0" },
            { yPercent: 0, borderRadius: "0px 0px 0 0", duration: 2.4, ease: "power1.inOut" },
            0,
          )
          .to(q(".parents__sky"), { opacity: 0.35, scale: 1.05, duration: 2.4 }, 0)
          .from(
            q(".parents__title .cine-reveal-line__inner"),
            { yPercent: 115, duration: 1, stagger: 0.12 },
            1.6,
          )
          .from(q(".parents__body"), { y: 26, opacity: 0, duration: 0.8 }, 2.1)
          .from(
            q(".pdash"),
            { y: 90, opacity: 0, rotateX: 12, duration: 1.8, ease: "power2.out" },
            2.3,
          )
          .from(q(".parents__side-card"), { y: 60, opacity: 0, duration: 1, stagger: 0.2 }, 3.0)
          // the report's own contents settle in
          .from(q(".preport__metric"), { y: 18, opacity: 0, duration: 0.7, stagger: 0.06 }, 3.2)
          .from(q(".preport__day"), { scale: 0.5, opacity: 0, duration: 0.5, stagger: 0.05 }, 3.6)
          .from(
            q(".preport__bar-fill"),
            { scaleX: 0, duration: 0.9, stagger: 0.1, ease: "power2.out" },
            3.9,
          )
          // settle flat so everything stays readable
          .to(q(".pdash"), { rotateX: 0, y: -14, duration: 2, ease: "power1.inOut" }, 4.0);
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.set(
          q(
            ".parents__panel, .parents__sky, .parents__title .cine-reveal-line__inner, .parents__body, .pdash, .parents__side-card, .preport__metric, .preport__day",
          ),
          { clearProps: "transform,opacity,visibility,border-radius" },
        );
        gsap.set(q(".preport__bar-fill"), { clearProps: "transform" });

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
    <section id="parents" ref={rootRef} className="parents">
      <div className="parents__sky" aria-hidden="true" />

      <img
        className="cine-decor cine-decor--parents-cloud"
        src={cloudLight}
        alt=""
        aria-hidden="true"
        width={760}
        height={241}
        loading="lazy"
        decoding="async"
        draggable={false}
      />

      <div className="parents__panel">
        <div className="parents__inner">
          <header className="parents__header">
            <h2 className="parents__title">
              <span className="cine-reveal-line">
                <span className="cine-reveal-line__inner">Parents Stay Updated,</span>
              </span>
              <span className="cine-reveal-line">
                <span className="cine-reveal-line__inner">Without Having to Ask.</span>
              </span>
            </h2>
            <p className="parents__body">
              Every week we send one clear email — progress, strengths, weak topics and exactly how
              you can help.
            </p>
          </header>

          <div className="parents__grid">
            {/* ---------- the weekly parent report email ---------- */}
            <div className="pdash preport">
              <div className="preport__bar">
                <span className="preport__brand">
                  <span className="preport__brand-mark">A</span>
                  Acade<em>MY</em>
                </span>
                <span className="preport__badge">Weekly Parent Report</span>
              </div>

              <div className="preport__intro">
                <span className="preport__avatar" aria-hidden="true">
                  A
                </span>
                <div>
                  <strong className="preport__intro-title">Aina's Week at AcadeMY</strong>
                  <span className="preport__intro-meta">Demo weekly learning report</span>
                </div>
              </div>

              <div className="preport__momentum">
                <MomentumRing />
                <div className="preport__momentum-copy">
                  <strong>Status: Excellent week</strong>
                  <p>
                    Aina completed all core missions early this week, showing strong focus on
                    advanced Mathematics equations.
                  </p>
                </div>
              </div>

              <div className="preport__section-title">Weekly Key Metrics</div>
              <div className="preport__metrics">
                {METRICS.map((m) => (
                  <div key={m.label} className="preport__metric">
                    <div className="preport__metric-top">
                      <span className="preport__metric-label">{m.label}</span>
                      <span className="preport__metric-icon" aria-hidden="true">
                        {m.icon}
                      </span>
                    </div>
                    <strong className="preport__metric-value">{m.value}</strong>
                    <span className={`preport__metric-meta preport__metric-meta--${m.tone}`}>
                      {m.meta}
                    </span>
                  </div>
                ))}
              </div>

              <div className="preport__consistency">
                <div className="preport__consistency-head">
                  <span className="preport__section-title">Learning Consistency</span>
                  <span className="preport__pill">5/7 Days Active</span>
                </div>
                <div className="preport__days">
                  {DAYS.map((d, i) => (
                    <span
                      key={i}
                      className={`preport__day${d.active ? " is-active" : ""}`}
                      aria-label={`${d.label}: ${d.active ? "active" : "inactive"}`}
                    >
                      <span className="preport__day-bubble" aria-hidden="true">
                        {d.active ? "✓" : "–"}
                      </span>
                      <span className="preport__day-label">{d.d}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="preport__section-title">Subject Progress</div>
              <div className="preport__subjects">
                {SUBJECTS.map((s) => (
                  <div key={s.name} className="preport__subject">
                    <div className="preport__subject-meta">
                      <span className="preport__subject-name">{s.name}</span>
                      <span className={`preport__tag preport__tag--${s.tone}`}>{s.badge}</span>
                      <span className={`preport__delta${s.up ? "" : " is-down"}`}>{s.delta}</span>
                    </div>
                    <span
                      className="preport__track"
                      role="progressbar"
                      aria-label={`${s.name} progress`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={s.pct}
                      aria-valuetext={`${s.pct} percent`}
                    >
                      <span
                        className={`preport__bar-fill preport__bar-fill--${s.tone}`}
                        style={{ width: `${s.pct}%` }}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------- insight, focus areas and next week ---------- */}
            <aside className="parents__side">
              <div className="parents__side-card pinsight">
                <span className="pinsight__badge">
                  <span aria-hidden="true">✦</span> AcadeMY Brain Insight
                </span>
                <strong className="pinsight__finding">
                  Aina's retention peaks +22% during evening study slots (7:30 – 8:30 PM).
                </strong>
                <p className="pinsight__body">
                  Her recall of historical facts is strongest in this window — a good time to place
                  Sejarah revision.
                </p>
              </div>

              <div className="parents__side-card pfocus">
                <p className="pfocus__win">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 4h8v4.5a4 4 0 0 1-8 0V4Z" />
                    <path d="M8 6H5v1.5A3.5 3.5 0 0 0 8.5 11M16 6h3v1.5a3.5 3.5 0 0 1-3.5 3.5" />
                    <path d="M12 12.5V17M8.5 20h7M10 17h4" />
                  </svg>
                  Biggest win this week
                </p>
                <p className="pfocus__text">
                  Completed the "Trigonometry Challenge Part 2" module with a perfect 100% quiz
                  score on the first attempt.
                </p>
                <p className="pfocus__need">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3 2.8 20h18.4L12 3Z" />
                    <path d="M12 9v4M12 17h.01" />
                  </svg>
                  Needs support · <strong>Sejarah Bab 3</strong>
                </p>
                <p className="pfocus__text">
                  Suggested support: 10 minutes on the Bab 3 animated timeline before next week's
                  mock test.
                </p>
              </div>

              <div className="parents__side-card pplan">
                <span className="parents__side-label">Recommended plan for next week</span>
                <ol className="pplan__list">
                  {PLAN.map((g, i) => (
                    <li key={i}>
                      <span className="pplan__num">{i + 1}</span>
                      {g}
                    </li>
                  ))}
                </ol>
                <CinematicAuthCta
                  className="pplan__cta"
                  authenticatedLabel="View Full Parent Dashboard"
                  authenticatedTo="/parent-dashboard"
                >
                  View Full Parent Dashboard
                </CinematicAuthCta>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
