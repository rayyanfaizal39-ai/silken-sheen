import type { NovaCard } from "./model";
import type { NovaEntitlement } from "./server";
import { upgradeHref } from "./paths";

export const NOVA_RETURN_SESSION_KEY = "academy:nova-resume";

export function NovaTeaser({
  card,
  status,
  onMakePrivate,
}: {
  card: NovaCard | null;
  status: NovaEntitlement["status"];
  onMakePrivate?: () => Promise<void>;
}) {
  // Phase 1 cards are permanent Origin cards; evolution has no XP integration yet.
  const pending = status === "pending";
  const headline = pending
    ? "Confirming your subscription"
    : card
      ? "Your Nova Is Waiting"
      : "Your Nova Adventure Awaits";
  const description = pending
    ? "Payment confirmation is still pending. Your Nova resumes only after verified payment."
    : card
      ? "Your permanent Origin Master Card is safely saved and waiting for you."
      : "A magical companion is waiting to be discovered. Subscribe to begin your journey.";

  return (
    <section className="nova-teaser" aria-label="Nova subscription access" role="region">
      <div className="nova-teaser-brand">
        <img src="/branding/academy-icon.png" alt="AcadeMY" width="38" height="38" />
        <span>AcadeMY Cards</span>
        <small>{pending ? "VERIFYING PAYMENT" : "ACCESS PAUSED"}</small>
      </div>
      <div className="nova-teaser-frame">
        <span className="nova-teaser-mark" aria-hidden="true">✦</span>
        <span className="nova-teaser-lock" aria-hidden="true">◇</span>
        <span className="nova-eyebrow">
          {card ? "ORIGIN MASTER CARD" : "DISCOVER YOUR COMPANION"}
        </span>
        <h2>{headline}</h2>
        <p>{description}</p>
        {card && (
          <p className="nova-teaser-preserved">
            Your permanent card identity, QR, barcode and approved artwork are preserved.
          </p>
        )}
      </div>
      <a
        className="nova-reactivate"
        href={upgradeHref}
        onClick={() => {
          try {
            window.sessionStorage.setItem(NOVA_RETURN_SESSION_KEY, "1");
          } catch {
            // Restricted storage does not prevent checkout.
          }
        }}
      >
        {pending ? "View My Subscription" : card ? "Reactivate My Nova" : "Explore Nova Plans"} →
      </a>
      {card?.sharing && onMakePrivate && (
        <button
          type="button"
          onClick={() => void onMakePrivate()}
          className="nova-teaser-private"
        >
          Make my shared card private
        </button>
      )}
      <p className="nova-teaser-footnote">
        Existing AcadeMY checkout · No extra payment system · No future artwork generated
      </p>
    </section>
  );
}
