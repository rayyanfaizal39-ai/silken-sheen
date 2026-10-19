import { hasFeature, resolveStoredPlan } from "@/lib/feature-access";

export type NovaEntitlement = {
  active: boolean;
  status: "active" | "pending" | "expired" | "cancelled" | "free";
};
export type SubscriptionRow = {
  plan: string | null;
  status: string | null;
  current_period_end: string | null;
} | null;

/**
 * Whether a subscription currently grants Cosmic Companion. Decided by the feature system
 * (`cosmic_companion`), never by plan names. Only starting a new journey needs this: a
 * submitted journey can finish and a chosen companion stays viewable after it lapses.
 */
export function novaEntitlement(sub: SubscriptionRow, now = Date.now()): NovaEntitlement {
  if (!sub) return { active: false, status: "free" };
  const current =
    sub.status === "active" &&
    typeof sub.current_period_end === "string" &&
    Date.parse(sub.current_period_end) > now;
  const active = current && hasFeature(resolveStoredPlan(sub.plan), "cosmic_companion");
  return {
    active,
    status: active
      ? "active"
      : sub.status === "pending"
        ? "pending"
        : sub.status === "cancelled"
          ? "cancelled"
          : "expired",
  };
}
