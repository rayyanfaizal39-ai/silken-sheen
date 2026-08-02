import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { type CSSProperties } from "react";
import { QUICK_ACCESS_ITEMS, type QuickAccessItem } from "@/components/home/quick-access-data";

type HomeQuickAccessProps = {
  onOpenAce: () => void;
};

function QuickAccessCardContent({ item }: { item: QuickAccessItem }) {
  const Icon = item.icon;

  return (
    <>
      <span className="home-quick-access__icon-tile" aria-hidden="true">
        <Icon />
      </span>
      <span className="home-quick-access__copy">
        <strong>{item.label}</strong>
        <small>{item.actionLabel}</small>
      </span>
      <ArrowRight className="home-quick-access__arrow" aria-hidden="true" />
    </>
  );
}

export function HomeQuickAccess({ onOpenAce }: HomeQuickAccessProps) {
  return (
    <section className="home-quick-access" aria-labelledby="quick-access-title">
      <div className="home-skeleton__section-heading">
        <p className="home-skeleton__section-label">Learning tools</p>
        <h2 id="quick-access-title">Quick Access</h2>
      </div>
      <div className="home-skeleton__quick-grid">
        {QUICK_ACCESS_ITEMS.map((item) => {
          const cardStyle = { "--quick-access-accent": item.accent } as CSSProperties;
          const accessibleLabel = `${item.label}: ${item.actionLabel}`;

          return item.action === "route" ? (
            <Link
              className="home-skeleton__quick-card"
              to={item.to}
              style={cardStyle}
              aria-label={accessibleLabel}
              key={item.id}
            >
              <QuickAccessCardContent item={item} />
            </Link>
          ) : (
            <button
              className="home-skeleton__quick-card"
              type="button"
              style={cardStyle}
              aria-label={accessibleLabel}
              onClick={onOpenAce}
              key={item.id}
            >
              <QuickAccessCardContent item={item} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
