import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { CompanionGarden } from "@/features/cosmic-companion/CompanionGarden";
import {
  JOURNEY_CTA,
  journeyStage,
  parseJourneyPreview,
  type JourneyStage,
} from "@/features/cosmic-companion/journey";
import { UnrevealedCosmicCard } from "@/features/cosmic-companion/UnrevealedCosmicCard";
import { loadNovaDashboardStatus } from "@/features/nova-cards/local-session";
import { useAuth } from "@/context/auth-context";
import { useDevDemoCompanion } from "@/lib/dev-auth/use-dev-demo-companion";
import { seoMeta } from "@/lib/seo";
import "./companion-cards.css";

export const Route = createFileRoute("/companion")({
  validateSearch: (search: Record<string, unknown>): { preview?: JourneyStage } => ({
    preview: parseJourneyPreview(search.preview),
  }),
  component: CosmicCompanionPage,
  head: () => {
    const head = seoMeta({
      title: "Cosmic Companion",
      description: "Discover the companion waiting for you and begin your Cosmic Card journey.",
      path: "/companion",
      noindex: true,
    });
    return {
      ...head,
      links: [
        ...head.links,
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&display=swap",
        },
      ],
    };
  },
});

/** Staggers the entrance of each block. */
const rise = (step: number) => ({ "--d": step }) as CSSProperties;

const FEATURES = [
  {
    title: "12 Unique Questions",
    body: "Explore your learning style and personality.",
    icon: (
      <>
        <path d="M4 5.5C7 4.5 9.5 4.8 12 6.5c2.5-1.7 5-2 8-1v13c-3-1-5.5-.7-8 1-2.5-1.7-5-2-8-1Z" />
        <path d="M12 6.5v13" />
      </>
    ),
  },
  {
    title: "A Guided Adventure",
    body: "Discover more about yourself through an interactive cinematic journey.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8Z" />
      </>
    ),
  },
  {
    title: "A Permanent Cosmic Card",
    body: "Unlock a unique companion card that stays with you forever.",
    icon: (
      <>
        <rect x="6" y="3" width="12" height="18" rx="2.2" />
        <path d="M12 8.5 13 11l2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" />
      </>
    ),
  },
];

const PANELS = [
  {
    title: "A Journey of Self-Discovery",
    body: "Answer 12 carefully crafted questions designed to reveal your learning personality.",
    art: "path",
  },
  {
    title: "A Companion for Your Journey",
    body: "Meet a unique companion that matches your mindset, strengths and learning style.",
    art: "companion",
  },
  {
    title: "A Cosmic Card to Keep",
    body: "Receive a beautifully designed Cosmic Card and companion that stays with you forever.",
    art: "card",
  },
] as const;

function PanelArt({ art }: { art: (typeof PANELS)[number]["art"] }) {
  return (
    <svg className="ccp-panel__art" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <linearGradient id={`ccp-art-sky-${art}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#1c1850" />
          <stop offset="1" stopColor="#0a0b22" />
        </linearGradient>
        <radialGradient id={`ccp-art-glow-${art}`} cx=".5" cy=".55" r=".5">
          <stop stopColor="#ffdea5" stopOpacity=".6" />
          <stop offset=".4" stopColor="#a78bfa" stopOpacity=".35" />
          <stop offset="1" stopColor="#6001d1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="120" height="120" fill={`url(#ccp-art-sky-${art})`} />
      <g fill="#fff4dc">
        <circle cx="18" cy="18" r=".9" />
        <circle cx="96" cy="14" r="1.1" />
        <circle cx="106" cy="44" r=".8" />
        <circle cx="12" cy="52" r=".8" />
      </g>
      {art === "path" && (
        <g>
          <circle cx="60" cy="48" r="40" fill={`url(#ccp-art-glow-${art})`} />
          <path d="M30 120V50a30 30 0 0 1 60 0v70" fill="none" stroke="#2f2758" strokeWidth="8" />
          <path d="M44 120h32l-4-12H48Zm6-16h20l-3-9H53Zm5-13h10l-2-7h-6Z" fill="#3b3170" />
          <path d="M48 108h24M53 95h14M56 84h8" stroke="#ffdea5" strokeOpacity=".7" />
          <g fill="#a78bfa">
            <circle cx="22" cy="96" r="4" />
            <circle cx="98" cy="100" r="5" />
            <circle cx="16" cy="108" r="3" />
            <circle cx="104" cy="88" r="3" />
          </g>
        </g>
      )}
      {art === "companion" && (
        <g>
          <circle cx="60" cy="62" r="42" fill={`url(#ccp-art-glow-${art})`} />
          <path d="M0 104q30-16 60-10t60-4v30H0Z" fill="#1a1640" />
          <path
            d="M61 58c-10 0-17 7-17 16 0 4 2 8 4 11-6 5-10 12-10 21v6h46v-6c0-9-4-16-10-21 3-3 4-7 4-11 0-9-7-16-17-16Z"
            fill="#0b0920"
            stroke="#c4b5fd"
            strokeOpacity=".55"
            strokeWidth="1.2"
          />
          <text x="61" y="80" textAnchor="middle" className="ccp-panel__mark">
            ?
          </text>
        </g>
      )}
      {art === "card" && (
        <g>
          <circle cx="60" cy="60" r="42" fill={`url(#ccp-art-glow-${art})`} />
          <g transform="rotate(-10 60 60)">
            <rect
              x="36"
              y="24"
              width="48"
              height="70"
              rx="6"
              fill="#15132e"
              stroke="#f6ca78"
              strokeOpacity=".8"
            />
            <circle cx="60" cy="56" r="13" fill="#120d2e" stroke="#f6ca78" strokeOpacity=".8" />
            <path
              d="M54 63 60 48l6 15M56.5 58h7"
              fill="none"
              stroke="#ffdea5"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <ellipse
              cx="60"
              cy="56"
              rx="19"
              ry="6"
              fill="none"
              stroke="#c4b5fd"
              strokeOpacity=".5"
              transform="rotate(-18 60 56)"
            />
          </g>
        </g>
      )}
    </svg>
  );
}

function PortalIcon() {
  return (
    <svg className="ccp-discover__portal" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="13" />
      <circle cx="16" cy="16" r="8.5" strokeDasharray="3 3" />
      <circle cx="16" cy="16" r="3.5" className="ccp-discover__core" />
    </svg>
  );
}

/**
 * Design-only Cosmic Companion hub.
 *
 * Until a real card has been chosen, the card is an unrevealed placeholder. Nothing here
 * requests artwork, reveals a creature, reads card records, or changes XP. The cinematic
 * gateway lives independently at /companion/portal.
 */
/**
 * The student's journey stage: an explicit fictional preview, or the saved status from the
 * existing Studio status call. Guests and failed lookups see the first-time entrance; the
 * Studio still routes every student by their saved server state after the portal.
 */
function useJourneyStage(preview: JourneyStage | undefined): JourneyStage {
  const { user } = useAuth();
  const [stage, setStage] = useState<JourneyStage>(preview ?? "new");
  useEffect(() => {
    if (preview) {
      setStage(preview);
      return;
    }
    setStage("new");
    if (!user?.id) return;
    let active = true;
    loadNovaDashboardStatus()
      .then((status) => {
        if (active) setStage(journeyStage(status));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [preview, user?.id]);
  return stage;
}

export function CosmicCompanionPage() {
  const { preview } = Route.useSearch();
  const stage = useJourneyStage(preview);
  const { user } = useAuth();
  const demo = useDevDemoCompanion();
  const discovered = demo !== "off" && demo?.discovered ? demo : null;
  return (
    <main className="ccp-page">
      <CompanionGarden />

      <header className="ccp-crest ccp-rise" style={rise(0)}>
        <span className="ccp-crest__ornament" aria-hidden="true">
          <span />✦
          <svg viewBox="0 0 24 24">
            <path d="M14 3a9 9 0 1 0 7 14A8 8 0 1 1 14 3Z" />
          </svg>
          ✦<span />
        </span>
        <p>Cosmic Companion</p>
      </header>

      <section className="ccp-hero" aria-labelledby="ccp-hero-title">
        <div className="ccp-intro">
          <p className="ccp-eyebrow ccp-rise" style={rise(1)}>
            Your journey awaits
          </p>
          <h1 id="ccp-hero-title" className="ccp-rise" style={rise(2)}>
            Discover Your <span>Cosmic Companion</span>
          </h1>
          <p className="ccp-lead ccp-rise" style={rise(3)}>
            Embark on a guided journey of 12 discoveries to find the companion that truly matches
            your mindset, strengths and learning style.
          </p>
          <ul className="ccp-features ccp-rise" style={rise(4)}>
            {FEATURES.map((feature) => (
              <li key={feature.title}>
                <span className="ccp-features__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{feature.icon}</svg>
                </span>
                <h2>{feature.title}</h2>
                <p>{feature.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="ccp-stage ccp-rise" style={rise(2)}>
          <div className="ccp-stage__orbits" aria-hidden="true">
            <span className="ccp-stage__orbit" />
            <span className="ccp-stage__orbit ccp-stage__orbit--wide" />
          </div>
          {discovered ? (
            <div className="ccp-owned">
              <img
                src={discovered.artworkUrl}
                alt={`${discovered.name}, ${discovered.species}`}
                width="600"
                height="640"
              />
              <p className="ccp-owned__name">{discovered.name}</p>
              <p className="ccp-owned__meta">
                {discovered.element} · {discovered.species}
              </p>
              <Link className="ccp-owned__card" to="/nova">
                View your card
              </Link>
            </div>
          ) : (
            <UnrevealedCosmicCard
              pedestal={<span className="ccp-stage__platform" aria-hidden="true" />}
            />
          )}
          <Link
            className="ccp-discover"
            to="/companion/portal"
            search={{ preview }}
            data-journey-stage={stage}
          >
            <PortalIcon />
            <span>{JOURNEY_CTA[stage].label}</span>
            <ArrowRight size={21} aria-hidden="true" />
          </Link>
          <p className="ccp-journey-note">
            {preview && <b>Fictional preview · </b>}
            {JOURNEY_CTA[stage].note}
          </p>
          {!user && !preview && (
            <p className="ccp-guest" role="note">
              <b>You’re exploring as a guest.</b> Your progress won’t be saved.{" "}
              <a href={`/login?next=${encodeURIComponent("/companion")}`}>Sign in</a> to unlock your
              lifelong Cosmic Companion.
            </p>
          )}
        </div>
      </section>

      <section className="ccp-panels" aria-label="About the Cosmic Companion journey">
        {PANELS.map((panel, i) => (
          <article key={panel.title} className="ccp-panel ccp-rise" style={rise(5 + i)}>
            <PanelArt art={panel.art} />
            <div>
              <p className="ccp-panel__step">0{i + 1}</p>
              <h2>{panel.title}</h2>
              <p>{panel.body}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
