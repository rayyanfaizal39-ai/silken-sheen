import type { BillingInterval, CheckoutPlan, PaidBillingPlan } from "./billing.types";
import {
  BILLING_CURRENCY,
  CHECKOUT_PLANS as SERVER_CHECKOUT_PLANS,
} from "../../supabase/functions/_shared/billing-config";

export { BILLING_CURRENCY };

// Only monthly plans are purchasable. `CheckoutPlan` still includes the
// legacy annual keys so historical DB rows keep type-checking.
export type PurchasableCheckoutPlan = keyof typeof SERVER_CHECKOUT_PLANS;

export const CHECKOUT_PLANS: Record<
  PurchasableCheckoutPlan,
  { plan: PaidBillingPlan; interval: BillingInterval; amount: number; label: string }
> = SERVER_CHECKOUT_PLANS;

export function isPurchasableCheckoutPlan(value: CheckoutPlan): value is PurchasableCheckoutPlan {
  return Object.hasOwn(CHECKOUT_PLANS, value);
}

export function isProductionEnvironment(env: NodeJS.ProcessEnv = process.env) {
  return env.NODE_ENV === "production" || env.CF_PAGES_BRANCH === "main";
}

export function areMockPaymentsEnabled(env: NodeJS.ProcessEnv = process.env) {
  return !isProductionEnvironment(env) && env.ENABLE_MOCK_PAYMENTS === "true";
}

export function isToyyibPayConfigured(env: NodeJS.ProcessEnv = process.env) {
  return Boolean(
    (env.SUPABASE_URL?.trim() || env.VITE_SUPABASE_URL?.trim()) &&
    (env.SUPABASE_ANON_KEY?.trim() || env.VITE_SUPABASE_ANON_KEY?.trim()),
  );
}

export function toCheckoutPlan(plan: PaidBillingPlan): CheckoutPlan {
  return `${plan}_monthly`;
}
