import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Gift,
  Megaphone,
  RadioTower,
  Rocket,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import {
  MISSION_CONTROL_ITEMS,
  type MissionControlItem,
} from "@/components/home/mission-control-data";

type MissionControlPresentation = {
  icon: LucideIcon;
  accent: string;
};

const MISSION_PRESENTATION: Record<MissionControlItem["type"], MissionControlPresentation> = {
  "new-mission": { icon: Rocket, accent: "#38bdf8" },
  event: { icon: Gift, accent: "#a78bfa" },
  community: { icon: Users, accent: "#34d399" },
  reward: { icon: Gift, accent: "#fbbf24" },
  update: { icon: Megaphone, accent: "#22d3ee" },
  important: { icon: RadioTower, accent: "#fb7185" },
};

export function HomeMissionControl() {
  return (
    <section
      className="home-skeleton__card home-mission-control"
      aria-labelledby="mission-control-title"
    >
      <header className="home-mission-control__header">
        <div className="home-mission-control__identity">
          <span className="home-mission-control__station-icon" aria-hidden="true">
            <RadioTower />
          </span>
          <div>
            <p className="home-mission-control__eyebrow">Station feed</p>
            <h2 id="mission-control-title">Mission Control</h2>
            <p className="home-mission-control__subtitle">
              Live transmissions from AcadeMY Station
            </p>
          </div>
        </div>

        <button
          className="home-mission-control__view-all"
          type="button"
          aria-disabled="true"
          title="Mission archive coming soon"
        >
          View all
          <ArrowRight aria-hidden="true" />
        </button>
      </header>

      <div className="home-mission-control__feed">
        {MISSION_CONTROL_ITEMS.map((item) => {
          const presentation = MISSION_PRESENTATION[item.type];
          const Icon = presentation.icon;

          return (
            <article
              className="home-mission-control__item"
              key={item.id}
              style={{ "--mission-control-accent": presentation.accent } as CSSProperties}
            >
              <span className="home-mission-control__item-icon" aria-hidden="true">
                <Icon />
              </span>

              <div className="home-mission-control__item-body">
                <div className="home-mission-control__item-meta">
                  <span>{item.category}</span>
                  {item.badge ? <strong>{item.badge}</strong> : null}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <footer className="home-mission-control__item-footer">
                  <span>{item.status ?? item.timestamp}</span>
                  {item.actionLabel && item.actionUrl ? (
                    <Link to={item.actionUrl} search={item.actionSearch}>
                      {item.actionLabel}
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  ) : null}
                </footer>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
