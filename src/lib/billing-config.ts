import type { BillingInterval, CheckoutPlan, PaidBillingPlan } from "./billing.types";

export const BILLING_CURRENCY = "MYR" as const;

export const CHECKOUT_PLANS: Record<
  CheckoutPlan,
  { plan: PaidBillingPlan; interval: BillingInterval; amount: number; label: string }
> = {
  pro_monthly: { plan: "pro", interval: "monthly", amount: 19, label: "AcadeMY Pro Monthly" },
  pro_annual: { plan: "pro", interval: "annual", amount: 190, label: "AcadeMY Pro Annual" },
  premium_monthly: {
    plan: "premium",
    interval: "monthly",
    amount: 49,
    label: "AcadeMY Premium Monthly",
  },
  premium_annual: {
    plan: "premium",
    interval: "annual",
    amount: 490,
    label: "AcadeMY Premium Annual",
  },
};

export function isProductionEnvironment(env: NodeJS.ProcessEnv = process.env) {
  return env.NODE_ENV === "production" || env.CF_PAGES_BRANCH === "main";
}

export function areMockPaymentsEnabled(env: NodeJS.ProcessEnv = process.env) {
  return !isProductionEnvironment(env) && env.ENABLE_MOCK_PAYMENTS === "true";
}

export function toCheckoutPlan(plan: PaidBillingPlan, interval: BillingInterval): CheckoutPlan {
  return `${plan}_${interval}`;
}
