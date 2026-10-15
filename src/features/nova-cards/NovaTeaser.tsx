import { evolution, STAGES, type NovaCard } from "./model";
import type { NovaEntitlement } from "./server";

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
  const currentStage = Math.max(1, Math.min(STAGES.length, card?.stage ?? 1));
  const next = STAGES[currentStage];
  const earnedNext = !!card && !!next && evolution(card.xp).stage > currentStage;
  const finished = !!card && currentStage === STAGES.length;
  const pending = status === "pending";
  const headline = pending
    ? "Confirming your subscription"
    : finished
      ? "Your Legendary Nova is preserved"
      : card
        ? "Your Next Evolution Awaits"
        : "Your Nova Adventure Awaits";
  const description = pending
    ? "Payment confirmation is still pending. Your Nova resumes only after verified payment."
    : finished
      ? "Your completed Legendary companion is saved and waiting for you."
      : card
        ? "Your Nova is safely waiting for you. Continue your learning journey to bring its next form to life."
        : "A magical companion is waiting to be discovered. Subscribe to begin your journey.";

  return (
    <section className="nova-teaser" aria-label="Nova subscription access" role="region">
      <div className="nova-teaser-brand">
        <img src="/branding/academy-icon.png" alt="AcadeMY" width="38" height="38" />
        <span>AcadeMY NOVA</span>
        <small>{pending ? "VERIFYING PAYMENT" : "EVOLUTION PAUSED"}</small>
      </div>
      <div className="nova-teaser-frame">
        <span className="nova-teaser-mark" aria-hidden="true">✦</span>
        <span className="nova-teaser-lock" aria-hidden="true">◇</span>
        <span className="nova-eyebrow">
          {card
            ? finished
              ? "STAGE 5 / 5 · LEGENDARY"
              : `NEXT · STAGE ${currentStage + 1} / ${STAGES.length} · ${next?.name}`
            : "DISCOVER YOUR COMPANION"}
        </span>
        <h2>{headline}</h2>
        <p>{description}</p>
        {card && !finished && !pending && (
          <p className="nova-teaser-progress">
            {earnedNext
              ? "Your next XP milestone is earned. Reactivate to continue evolving."
              : `${Math.max(0, next!.xp - card.xp).toLocaleString()} verified XP to the next evolution milestone.`}
          </p>
        )}
        {card && (
          <p className="nova-teaser-preserved">
            Your permanent card identity, QR, barcode and approved artwork are preserved.
          </p>
        )}
      </div>
      <a
        className="nova-reactivate"
        href="/upgrade"
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
