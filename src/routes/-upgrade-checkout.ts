export type UpgradePlan = "pro_monthly" | "pro_annual" | "premium_monthly" | "premium_annual";

export const PLAN_AMOUNTS: Record<UpgradePlan, number> = {
  pro_monthly: 19,
  pro_annual: 190,
  premium_monthly: 49,
  premium_annual: 490,
};

export interface VerifiedCheckoutUser {
  id: string;
  email: string | null;
}

export interface CheckoutResult {
  paymentId: string;
  status: "paid";
}

export interface CheckoutDependencies {
  getVerifiedUser(): Promise<VerifiedCheckoutUser | null>;
  insertPendingPayment(input: {
    userId: string;
    customerEmail: string | null;
    amount: number;
    plan: UpgradePlan;
  }): Promise<string>;
  confirmPayment(paymentId: string): Promise<void>;
}

export class CheckoutAuthenticationError extends Error {
  readonly statusCode = 401;

  constructor() {
    super("Must be logged in to upgrade");
    this.name = "CheckoutAuthenticationError";
  }
}

export async function executeCheckout(
  data: { plan: UpgradePlan },
  dependencies: CheckoutDependencies,
): Promise<CheckoutResult> {
  const user = await dependencies.getVerifiedUser();
  if (!user) throw new CheckoutAuthenticationError();

  const paymentId = await dependencies.insertPendingPayment({
    userId: user.id,
    customerEmail: user.email,
    amount: PLAN_AMOUNTS[data.plan],
    plan: data.plan,
  });
  await dependencies.confirmPayment(paymentId);

  return { paymentId, status: "paid" };
}
