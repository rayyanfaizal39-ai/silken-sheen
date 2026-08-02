import { Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Sparkles, Star, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { HomeImagePlaceholder } from "@/components/home/HomeImagePlaceholder";
import { HomeMissionControl } from "@/components/home/HomeMissionControl";
import { HomePapercraftBackground } from "@/components/home/HomePapercraftBackground";
import { HomeContinueLearning } from "@/components/home/HomeContinueLearning";
import { HomeQuickAccess } from "@/components/home/HomeQuickAccess";
import { TodaysMission } from "@/components/home/TodaysMission";
import { useAuth } from "@/context/auth-context";
import { useCikgu } from "@/context/cikgu-context";
import { getCompanionLevelProgress, getRank, useProgress } from "@/hooks/use-progress";
import "./home/homeSkeleton.css";

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

        <div className="home-skeleton__learning-hub">
          <div className="home-skeleton__split home-skeleton__split--learning">
            <div className="home-skeleton__learning-column">
              <HomeContinueLearning />
              <TodaysMission />
            </div>
            <HomeMissionControl />
          </div>

          <HomeQuickAccess onOpenAce={() => openCikgu({ mode: "general" })} />
        </div>

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
