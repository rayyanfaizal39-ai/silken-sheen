import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Brain,
  Flame,
  Layers3,
  MessageCircle,
  Play,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { HomeImagePlaceholder } from "@/components/home/HomeImagePlaceholder";
import { HomePapercraftBackground } from "@/components/home/HomePapercraftBackground";
import { HomeContinueLearning } from "@/components/home/HomeContinueLearning";
import { useAuth } from "@/context/auth-context";
import { useCikgu } from "@/context/cikgu-context";
import { getCompanionLevelProgress, getRank, useProgress } from "@/hooks/use-progress";
import "./home/homeSkeleton.css";

const QUICK_ACCESS = [
  { label: "Notes", to: "/notes" as const, icon: BookOpen },
  { label: "Quizzes", to: "/quizzes" as const, icon: Brain },
  { label: "Mind Maps", to: "/mindmaps" as const, icon: Layers3 },
  { label: "Videos", to: "/subjects" as const, icon: Play },
  { label: "Flashcards", to: "/flashcards" as const, icon: Zap },
];

const ANNOUNCEMENTS = ["Announcement 1", "Announcement 2", "Announcement 3"];

export function CommandCenterHome() {
  const { openCikgu } = useCikgu();
  const { user } = useAuth();
  const { progress } = useProgress();
  const [greeting, setGreeting] = useState("Welcome Back");
  const rank = getRank(progress.xp);
  const level = getCompanionLevelProgress(progress.xp).currentLevel;
  const firstName =
    user?.name?.trim().split(/\s+/)[0]?.split("@")[0] || user?.email?.split("@")[0] || "Explorer";

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening");
  }, []);

  return (
    <HomePapercraftBackground>
      <main className="home-skeleton">
        <section className="home-hero" aria-labelledby="home-hero-title">
          <div className="home-hero-background" aria-hidden="true" />
          <div className="home-hero-overlay" aria-hidden="true" />
          <div className="home-hero-content">
            <p className="home-hero__eyebrow">
              <Sparkles aria-hidden="true" />
              Welcome back, explorer!
            </p>
            <h1 id="home-hero-title">
              {greeting},<span>{firstName}!</span>
            </h1>
            <p className="home-hero__support">
              Keep learning, keep exploring.
              <br />
              You&apos;re doing great!
            </p>

            <div className="home-hero__stats" aria-label="Student progress">
              <div className="home-hero__stat">
                <Flame aria-hidden="true" />
                <span>
                  <strong>{progress.streak}</strong>
                  {progress.streak === 1 ? "Day Streak" : "Days Streak"}
                </span>
              </div>
              <div className="home-hero__stat">
                <Trophy aria-hidden="true" />
                <span>
                  <strong>Lv {level}</strong>
                  {rank.name}
                </span>
              </div>
              <div className="home-hero__stat">
                <Star aria-hidden="true" />
                <span>
                  <strong>{progress.xp.toLocaleString()}</strong>
                  XP
                </span>
              </div>
            </div>

            <Link className="home-skeleton__primary-button home-hero__cta" to="/subjects">
              Continue Learning
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        <div className="home-skeleton__split home-skeleton__split--learning">
          <HomeContinueLearning />

          <section
            className="home-skeleton__card home-skeleton__bulletin"
            aria-labelledby="bulletin-title"
          >
            <div className="home-skeleton__section-heading">
              <p className="home-skeleton__section-label">Latest updates</p>
              <h2 id="bulletin-title">Academy Bulletin</h2>
            </div>
            <div className="home-skeleton__announcement-list">
              {ANNOUNCEMENTS.map((announcement, index) => (
                <article className="home-skeleton__announcement" key={announcement}>
                  <span className="home-skeleton__icon-placeholder" aria-hidden="true">
                    <Bell />
                  </span>
                  <div>
                    <h3>{announcement}</h3>
                    <p>Description placeholder</p>
                  </div>
                  <span className="home-skeleton__status">Status {index + 1}</span>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section aria-labelledby="quick-access-title">
          <div className="home-skeleton__section-heading">
            <p className="home-skeleton__section-label">Learning tools</p>
            <h2 id="quick-access-title">Quick Access</h2>
          </div>
          <div className="home-skeleton__quick-grid">
            {QUICK_ACCESS.map(({ label, to, icon: Icon }) => (
              <Link className="home-skeleton__quick-card" to={to} key={label}>
                <HomeImagePlaceholder
                  label={`${label.toUpperCase()} ARTWORK`}
                  aspectRatio="1 / 1"
                />
                <span>
                  <Icon aria-hidden="true" />
                  {label}
                </span>
              </Link>
            ))}
            <button
              className="home-skeleton__quick-card"
              type="button"
              onClick={() => openCikgu({ mode: "general" })}
            >
              <HomeImagePlaceholder label="CIKGU AI ARTWORK" aspectRatio="1 / 1" />
              <span>
                <MessageCircle aria-hidden="true" />
                Cikgu AI
              </span>
            </button>
          </div>
        </section>

        <div className="home-skeleton__split">
          <section
            className="home-skeleton__card home-skeleton__journey"
            aria-labelledby="journey-title"
          >
            <HomeImagePlaceholder
              className="home-skeleton__round-placeholder"
              label="CURRENT RANK ARTWORK"
              aspectRatio="1 / 1"
            />
            <div>
              <p className="home-skeleton__section-label">Your Journey</p>
              <h2 id="journey-title">Rank name</h2>
              <p className="home-skeleton__muted">Level placeholder</p>
              <div className="home-skeleton__progress" aria-label="XP progress placeholder">
                <span />
              </div>
              <Link className="home-skeleton__secondary-button" to="/dashboard">
                View Journey
              </Link>
            </div>
          </section>

          <section className="home-skeleton__card home-skeleton__nova" aria-labelledby="nova-title">
            <HomeImagePlaceholder label="NOVA ARTWORK" aspectRatio="1 / 1" />
            <div>
              <p className="home-skeleton__section-label">Cosmic companion</p>
              <h2 id="nova-title">Nova is ready to help.</h2>
              <p className="home-skeleton__muted">Your companion message will appear here.</p>
              <Link className="home-skeleton__secondary-button" to="/companion">
                Talk to Nova
              </Link>
            </div>
          </section>
        </div>

        <section
          className="home-skeleton__card home-skeleton__mission"
          aria-labelledby="mission-title"
        >
          <HomeImagePlaceholder label="MISSION ARTWORK" aspectRatio="1 / 1" />
          <div>
            <p className="home-skeleton__section-label">Recommended Mission</p>
            <h2 id="mission-title">Mission title</h2>
            <p className="home-skeleton__muted">Mission description placeholder.</p>
          </div>
          <button className="home-skeleton__primary-button" type="button">
            Let&apos;s Go
          </button>
        </section>
      </main>
    </HomePapercraftBackground>
  );
}
