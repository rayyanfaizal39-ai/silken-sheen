export const BILLING_CURRENCY = "MYR" as const;
export const TOYYIBPAY_SANDBOX_URL = "https://dev.toyyibpay.com" as const;

// This is the single server-side price catalog used by checkout creation and
// the application billing helpers. ToyyibPay receives amounts from this map,
// never from browser input.
export const CHECKOUT_PLANS = {
  pro_monthly: {
    plan: "pro",
    interval: "monthly",
    amount: 29,
    label: "AcadeMY Pro Monthly",
  },
  premium_monthly: {
    plan: "premium",
    interval: "monthly",
    amount: 59,
    label: "AcadeMY Premium Monthly",
  },
} as const;

export type ToyyibPayCheckoutPlan = keyof typeof CHECKOUT_PLANS;

export function isCheckoutPlan(value: unknown): value is ToyyibPayCheckoutPlan {
  return typeof value === "string" && Object.hasOwn(CHECKOUT_PLANS, value);
}
