import type { BillingInterval, CheckoutPlan, PaidBillingPlan } from "./billing.types";
import {
  BILLING_CURRENCY,
  CHECKOUT_PLANS as SERVER_CHECKOUT_PLANS,
} from "../../supabase/functions/_shared/billing-config";

export { BILLING_CURRENCY };

export const CHECKOUT_PLANS: Record<
  CheckoutPlan,
  { plan: PaidBillingPlan; interval: BillingInterval; amount: number; label: string }
> = SERVER_CHECKOUT_PLANS;

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

export function toCheckoutPlan(plan: PaidBillingPlan, interval: BillingInterval): CheckoutPlan {
  if (interval !== "monthly") throw new Error("Only monthly checkout is available");
  return `${plan}_${interval}`;
}
