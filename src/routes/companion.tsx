import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { seoMeta } from "@/lib/seo";
import "./companion-cards.css";

export const Route = createFileRoute("/companion")({
  component: CosmicCompanionPage,
  head: () =>
    seoMeta({
      title: "Cosmic Companion",
      description: "Discover the companion waiting for you and begin your Cosmic Card journey.",
      path: "/companion",
      noindex: true,
    }),
});

/**
 * Design-only companion hub.
 *
 * Until a real card has been chosen, show ONE decorative card placeholder.
 * Nothing here requests artwork, reveals a creature, reads card records, or
 * changes XP. The cinematic gateway lives independently at /companion/portal.
 */
export function CosmicCompanionPage() {
  return (
    <main className="ccp-page">
      <section className="ccp-hero" aria-labelledby="ccp-hero-title">
        <div className="ccp-hero__sky" aria-hidden="true">
          <span className="ccp-hero__horizon" />
          <span className="ccp-hero__gateway ccp-hero__gateway--outer" />
          <span className="ccp-hero__gateway ccp-hero__gateway--inner" />
          <span className="ccp-hero__glimmer" />
          <span className="ccp-hero__mountains ccp-hero__mountains--back" />
          <span className="ccp-hero__mountains ccp-hero__mountains--front" />
        </div>
        <div className="ccp-hero__copy">
          <span className="ccp-eyebrow">
            <Sparkles size={16} aria-hidden="true" /> Cosmic Companion
          </span>
          <h1 id="ccp-hero-title">
            Your Cosmic <span>Universe</span>
          </h1>
          <p>
            Beyond the stars, a companion is waiting to be discovered.
            Begin your journey and uncover your one-of-a-kind Cosmic Card.
          </p>
        </div>
      </section>

      <section className="ccp-card-panel" aria-labelledby="ccp-card-title">
        <div className="ccp-card-aura" aria-hidden="true" />
        <div
          className="ccp-card-art"
          role="img"
          aria-label="A glowing unrevealed Cosmic Card with a golden star emblem. No companion has been chosen yet."
        >
          <span className="ccp-card-art__halo" aria-hidden="true" />
          <div className="ccp-card-art__frame">
            <span className="ccp-card-art__corner ccp-card-art__corner--tl" />
            <span className="ccp-card-art__corner ccp-card-art__corner--tr" />
            <span className="ccp-card-art__corner ccp-card-art__corner--bl" />
            <span className="ccp-card-art__corner ccp-card-art__corner--br" />
            <svg className="ccp-card-art__sigil" viewBox="0 0 220 220" fill="none" aria-hidden="true">
              <circle cx="110" cy="110" r="88" stroke="#A964FA" strokeOpacity=".6" />
              <circle cx="110" cy="110" r="65" stroke="#F3BD72" strokeOpacity=".5" />
              <circle cx="110" cy="110" r="43" stroke="#8A5BE9" strokeOpacity=".55" />
              <path d="M110 37 125 95 183 110 125 125 110 183 95 125 37 110 95 95Z" fill="url(#cosmicCardStar)" stroke="#FFE0A0" strokeWidth="1.5" />
              <path d="M110 67 118 102 153 110 118 118 110 153 102 118 67 110 102 102Z" fill="#FFE6AA" opacity=".8" />
              <circle cx="110" cy="110" r="7" fill="#FFF7D7" />
              <path d="M110 10V26M110 194V210M10 110H26M194 110H210" stroke="#DFAF7C" strokeOpacity=".8" />
              <defs>
                <linearGradient id="cosmicCardStar" x1="69" y1="48" x2="166" y2="182" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFF2C9" />
                  <stop offset=".48" stopColor="#F2BA6C" />
                  <stop offset="1" stopColor="#B776FC" />
                </linearGradient>
              </defs>
            </svg>
            <span className="ccp-card-art__footer" aria-hidden="true">✦ COSMIC COMPANION ✦</span>
          </div>
        </div>

        <div className="ccp-card-panel__copy">
          <p className="ccp-card-panel__eyebrow">A CARD YET TO BE REVEALED</p>
          <h2 id="ccp-card-title">Your <span>Cosmic Card</span> Awaits</h2>
          <p>
            Discover your companion to find out who is waiting beyond the stars.
            Take the 12-question journey to uncover your companion's identity and the
            story behind your unique Cosmic Card.
          </p>
          <Link className="ccp-discover" to="/companion/portal">
            <span className="ccp-discover__gate" aria-hidden="true">◉</span>
            Discover My Companion
            <ArrowRight size={21} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
