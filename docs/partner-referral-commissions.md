# Partner referral attribution and commissions

Migration: `supabase/migrations/20261016120000_partner_referral_commissions.sql`
Tests: `src/lib/partner-commissions.db.test.ts` (PGlite, runs the migration on a
snapshot of the live partner schema and the live `process_verified_payment`).

## Flow

1. **Landing.** `PartnerReferralClaim` (in `__root.tsx`) stores `?ref=CODE` in
   `localStorage` for 60 days. First touch wins: a later link never replaces an
   unexpired code. `myacademy.my` 301-redirects to `www` with the query intact,
   and Google OAuth returns to the same `www` origin, so the code survives sign-in.
2. **Signed in.** The same component calls `partner_claim_referral(code)` as the
   student. The database creates the student's single `partner_referrals` row
   (`customer_reference` = student user id, status `signed_up`). The stored code
   is cleared once the server gives a final answer.
3. **Checkout.** `createCheckout` claims again (no-op if already attributed), then
   `create-toyyibpay-bill` inserts the `payment_transactions` row. The
   `partner_link_payment_on_insert` trigger records the partner in
   `partner_sandbox_checkout_links` before any ToyyibPay bill exists.
4. **Verified payment.** `toyyibpay-callback` verifies with ToyyibPay and calls
   `process_verified_payment`. When the payment becomes `successful`, the
   `partner_on_payment_status_change` trigger inserts a `partner_commissions` row:
   30% of the verified amount (RM59 → RM17.70, RM29 → RM8.70), status `pending`,
   `review_available_at = paid_at + 30 days`. The Partners dashboard shows it as
   Pending. Every renewal earns commission; there is no six-payment limit.
5. **Payout.** Unchanged: the existing manual payout RPCs only accept commissions
   past `review_available_at`.

## Guarantees

| Risk | Protection |
| --- | --- |
| Duplicate commission | `partner_commissions.payment_reference` is unique (payment id); callback replays and the legacy `partner_credit_sandbox_upgrade` path return `already_credited`. |
| Reassignment | One `partner_referrals` row per student (unique index); later codes return `already_attributed`. |
| Self-referral | Rejected at claim, link and credit. |
| Forged referral | Students can only claim for `auth.uid()`; `partner_claim_referral_for` and `partner_credit_verified_payment` are service-role only; existing paying customers cannot be attached; payments created before the claim are never linked retroactively. |
| Unverified or failed payment | Credit requires `successful` + provider transaction id + bill code + `paid_at`; mock payments are excluded. |
| Refund / reversal | `successful` → `refunded`/`failed`/`cancelled` marks unpaid commissions `reversed`. Paid-out commissions stay `paid` for manual reconciliation. Open manual batches containing a reversed item are refused by approve/record-paid. |
| Subscription cancelled | Referral status becomes `cancelled`; a later verified renewal makes it `active` again. |
| Bookkeeping fault | Commission errors are logged as warnings and never fail the student's payment. Replay with `select partner_credit_verified_payment('<payment id>')` (service role). |

No new tables. RLS is unchanged. Nothing is backfilled.

## Rollout

1. Apply the migration. `npx supabase db push` would also apply the pending,
   unrelated `20261010010000_sync_form3_math_quiz_sets.sql`. To apply only this one:
   `npx supabase db query --linked -f supabase/migrations/20261016120000_partner_referral_commissions.sql`
   then `npx supabase migration repair --linked --status applied 20261016120000`.
2. Deploy the web app (claim component and checkout claim).
3. Keep `PARTNER_UPGRADE_TRACKING_ENABLED` unset. The triggers do the work; no
   Edge Function redeploy is needed for attribution. If the flag is enabled
   later, the legacy RPCs route into the same ledger and stay idempotent.
4. Acceptance: new student opens `https://www.myacademy.my/?ref=<code>`, signs in
   with Google, pays RM59 in the ToyyibPay sandbox, and a RM17.70 Pending
   commission appears for that partner.

## 15 October 2026 RM59 payment (`2601a1fb-…`)

Paid 21:53 MYT, bill `yopn4gfo`, sandbox. The referral cannot be verified:
the student account was created on 24 July 2026, before partner tracking
existed (12 October). The payment has no checkout link. That student's 255
analytics events record no `ref` and no UTM source; the analytics system stores
pathname only. `partner_referrals` is empty. No historical commission is
proposed unless the partner supplies independent evidence. Any correction
would then be a manual, reviewed admin entry.
