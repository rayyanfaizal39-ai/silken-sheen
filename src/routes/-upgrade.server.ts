// Server functions for the upgrade/checkout flow.
//
// STUB IMPLEMENTATION: there is no real payment gateway wired up yet. This
// creates a 'pending' row and immediately confirms it via the
// confirm_stub_payment() Postgres function (see supabase/schema.sql) instead
// of redirecting to a real checkout page and waiting for a webhook. To swap
// in a real gateway (ToyyibPay/Billplz/Stripe/etc.) later:
//   1. Have createCheckout redirect to the gateway's hosted checkout page
//      instead of calling confirmCheckout itself.
//   2. Replace confirm_stub_payment() with a webhook handler that verifies
//      the gateway's signature before marking the payment 'paid'.
import { createServerFn } from '@tanstack/react-start';
import { getSupabaseServerClient } from '../lib/supabase.server';

export type UpgradePlan = 'pro_monthly' | 'pro_annual' | 'premium_monthly' | 'premium_annual';

const PLAN_AMOUNTS: Record<UpgradePlan, number> = {
  pro_monthly: 19,
  pro_annual: 190,
  premium_monthly: 49,
  premium_annual: 490,
};

export interface CheckoutResult {
  paymentId: string;
  status: 'paid';
}

export const createAndConfirmStubCheckout = createServerFn({ method: 'POST' })
  .inputValidator((data: { plan: UpgradePlan }) => data)
  .handler(async ({ data }): Promise<CheckoutResult> => {
    const supabase = getSupabaseServerClient();
    if (!supabase) throw new Error('Supabase is not configured');
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Must be logged in to upgrade');
    }

    const { data: payment, error: insertError } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        amount: PLAN_AMOUNTS[data.plan],
        currency: 'MYR',
        plan: data.plan,
        status: 'pending',
      })
      .select('id')
      .single();
    if (insertError) throw insertError;

    const { error: confirmError } = await supabase.rpc('confirm_stub_payment', {
      payment_id: payment.id,
    });
    if (confirmError) throw confirmError;

    return { paymentId: payment.id as string, status: 'paid' };
  });
