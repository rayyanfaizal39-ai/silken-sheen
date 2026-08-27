import { Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Sparkles, Star, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { ReliableImage } from "@/components/ReliableImage";
import { StreakInfoPopover, XpInfoPopover } from "@/components/progression/ProgressionHelp";
import { HomeMissionControl } from "@/components/home/HomeMissionControl";
import { HomePapercraftBackground } from "@/components/home/HomePapercraftBackground";
import { HomeContinueLearning } from "@/components/home/HomeContinueLearning";
import { HomeProgressSummaries } from "@/components/home/HomeProgressSummaries";
import { HomeQuickAccess } from "@/components/home/HomeQuickAccess";
import { TodaysMission } from "@/components/home/TodaysMission";
import { useAuth } from "@/context/auth-context";
import { useCikgu } from "@/context/cikgu-context";
import { getCompanionLevelProgress, getRank, useProgress } from "@/hooks/use-progress";
import "./home/homeSkeleton.css";

/** Shared with AppBootGate so the boot preload and the hero request the exact same URL. */
export const HOME_HERO_IMAGE = "/assets/ranks/home/academy-station-hero.png";

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
          <div className="home-hero-background" aria-hidden="true">
            <ReliableImage
              src={HOME_HERO_IMAGE}
              alt=""
              priority
              width={1536}
              height={1024}
              wrapperClassName="home-hero-background__frame"
              className="home-hero-background__img"
            />
          </div>
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
              <StreakInfoPopover streak={progress.streak} className="home-hero__stat text-left">
                <Flame aria-hidden="true" />
                <span>
                  <strong>{progress.streak > 0 ? progress.streak : "Start"}</strong>
                  {progress.streak > 0 ? "Day Streak" : "Your Streak"}
                </span>
              </StreakInfoPopover>
              <div className="home-hero__stat">
                <Trophy aria-hidden="true" />
                <span>
                  <strong>Companion Lv {level}</strong>
                  {rank.name} Rank
                </span>
              </div>
              <div className="home-hero__stat">
                <Star aria-hidden="true" />
                <span>
                  <strong>{progress.xp.toLocaleString()}</strong>
                  Lifetime XP
                </span>
              </div>
            </div>

            <XpInfoPopover className="mt-1" />

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

        <HomeProgressSummaries />
      </main>
    </HomePapercraftBackground>
  );
}
