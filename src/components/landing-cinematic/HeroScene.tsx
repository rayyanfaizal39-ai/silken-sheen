import astronautAsset from "@/assets/astronaut-hero.png.asset.json";
import nova from "@/assets/landing-cinematic/companion-nova.webp";
import purplePlanet from "@/assets/landing-cinematic/planet.webp";
import { CinematicAuthCta } from "./CinematicAuthActions";
import "./paperHero.css";

const PAPER_STARS = [
  { left: "7%", top: "16%", size: "0.7rem", rotate: "-12deg" },
  { left: "25%", top: "8%", size: "0.95rem", rotate: "9deg" },
  { left: "78%", top: "11%", size: "0.8rem", rotate: "18deg" },
  { left: "91%", top: "34%", size: "0.65rem", rotate: "-8deg" },
  { left: "68%", top: "45%", size: "0.55rem", rotate: "12deg" },
];

export default function HeroScene() {
  return (
    <section id="hero" className="paper-hero" aria-labelledby="paper-hero-title">
      <div className="paper-hero__ambient" aria-hidden="true" />
      <div className="paper-hero__inner">
        <div className="paper-hero__copy">
          <p className="paper-hero__eyebrow">For Forms 1–3</p>
          <h1 id="paper-hero-title" className="paper-hero__title">
            <span>Learn Smarter.</span>
            <span>
              Journey <em>Further.</em>
            </span>
          </h1>
          <p className="paper-hero__support">
            Your all-in-one learning galaxy with notes, quizzes, mind maps, videos, and rewards.
          </p>
          <div className="paper-hero__actions">
            <CinematicAuthCta className="paper-hero__button paper-hero__button--primary">
              Start Learning
            </CinematicAuthCta>
            <a className="paper-hero__button paper-hero__button--secondary" href="#learning-world">
              Explore Features
            </a>
          </div>
        </div>

        <div className="paper-hero__art" aria-label="Astronaut and Nova arriving at Academy Station">
          <div className="paper-hero__stars" aria-hidden="true">
            {PAPER_STARS.map((star, index) => (
              <span
                key={index}
                className="paper-hero__star"
                style={{
                  left: star.left,
                  top: star.top,
                  width: star.size,
                  height: star.size,
                  rotate: star.rotate,
                }}
              />
            ))}
          </div>

          <img
            className="paper-hero__planet paper-hero__planet--large"
            src={purplePlanet}
            alt=""
            aria-hidden="true"
            draggable={false}
          />
          <span className="paper-hero__planet paper-hero__planet--small" aria-hidden="true">
            <span />
          </span>

          <div className="paper-hero__station" aria-hidden="true">
            <div className="paper-hero__station-sign">
              <img src="/branding/academy-logo-full.svg" alt="" draggable={false} />
              <span>Station</span>
            </div>
            <div className="paper-hero__station-body">
              <span className="paper-hero__station-seam paper-hero__station-seam--left" />
              <span className="paper-hero__station-seam paper-hero__station-seam--right" />
              <div className="paper-hero__door">
                <span className="paper-hero__door-light" />
              </div>
            </div>
          </div>

          <img
            className="paper-hero__astronaut"
            src={astronautAsset.url}
            alt="AcadeMY astronaut"
            draggable={false}
          />
          <img className="paper-hero__nova" src={nova} alt="Nova" draggable={false} />

          <div className="paper-hero__hill paper-hero__hill--back" aria-hidden="true" />
          <div className="paper-hero__hill paper-hero__hill--middle" aria-hidden="true" />
          <div className="paper-hero__hill paper-hero__hill--front" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
