# Partner referral attribution and commissions

Migration: `supabase/migrations/20261016120000_partner_referral_commissions.sql`
Tests: `src/lib/partner-commissions.db.test.ts` (PGlite, runs the migration on a
snapshot of the live partner schema and the live `process_verified_payment`).

## Flow

1. **Landing (private).** `PartnerReferenceCapture` (in `__root.tsx`) stores
   `?ref=CODE` in `localStorage` for 60 days and removes it from the address bar.
   First touch wins: a later link never replaces an unexpired code. It renders
   nothing and calls no server, so learners never see a code, dialog or referral
   message, and the account signed in when the link was opened is never claimed.
   Normal login, Google account switching, registration and onboarding are
   unchanged; the code stays in the same origin's storage throughout.
2. **Checkout (server).** For every checkout `createCheckout` verifies
   `auth.getUser()` matches the page's account, then, before any payment row or
   provider call, `resolveCheckoutAttribution`:
   - with a stored code, calls `partner_claim_referral` in the purchaser's session
     (the final authenticated student is the only account ever claimed);
   - reads the purchaser's immutable first-touch referral and partner status, even
     without a stored code, so renewals are verified from the database.
     An attributed purchase gets a 10-minute receipt signed with
     `PARTNER_CONFIRMATION_SECRET` for that user, partner and checkout key, sent
     server-to-server to `create-toyyibpay-bill`. It is not browser consent and is
     never stored in a browser cookie. The Edge Function reads attribution for
     every authenticated caller, including calls omitting both optional referral
     fields, then re-checks the proof and actual payment link before creating a
     bill. If attribution appears between lookup and insert, the unexpected link
     blocks the bill too. Renewal proofs are generated afresh from database
     attribution, without a browser code or learner question.
     Definitively ineligible purchasers (`existing_customer`, `self_referral`,
     `invalid_code`, `not_student`, inactive partner) check out normally: the insert
     trigger would not link them either. Any temporary failure (claim, lookup,
     missing receipt key, Edge `referral_*` rejection) blocks payment with one
     generic retry message, so a commission is never silently lost. The stored code
     is cleared once a purchase is attributed.
3. **Verified payment.** `toyyibpay-callback` verifies with ToyyibPay and calls
   `process_verified_payment`. When the payment becomes `successful`, the
   `partner_on_payment_status_change` trigger inserts a `partner_commissions` row:
   30% of the verified amount (RM59 → RM17.70, RM29 → RM8.70), status `pending`,
   `review_available_at = paid_at + 30 days`. The Partners dashboard shows it as
   Pending. Every renewal earns commission; there is no six-payment limit.
4. **Payout.** Unchanged: the existing manual payout RPCs only accept commissions
   past `review_available_at`.

Live sandbox payment `TP2610172813821494` (17 October 2026) was unattributed
because the code never reached production: see
`docs/referral-account-switch-incident.md`.

## Guarantees

| Risk                         | Protection                                                                                                                                                                                                                                                                                                                         |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Duplicate commission         | `partner_commissions.payment_reference` is unique (payment id); callback replays and the legacy `partner_credit_sandbox_upgrade` path return `already_credited`.                                                                                                                                                                   |
| Duplicate ToyyibPay bill     | Only the request whose insert created the payment row (`ON CONFLICT DO NOTHING ... RETURNING`) calls `createBill`. Same-key requests wait up to 12 seconds, then return the stored bill or a generic retry. Browser retries/reloads retain the account-scoped checkout key, including timeouts and failed database writes. An uncertain attempt never automatically gets a replacement bill. Tests: `checkout-idempotency.test.ts`, `checkout-attempt.test.ts`, and the PostgreSQL insert regression. |
| Reassignment                 | One `partner_referrals` row per student (unique index); later codes return `already_attributed`.                                                                                                                                                                                                                                   |
| Self-referral                | Rejected at claim, link and credit.                                                                                                                                                                                                                                                                                                |
| Forged referral              | Students can only claim for `auth.uid()`; `partner_claim_referral_for` and `partner_credit_verified_payment` are service-role only; existing paying customers cannot be attached; payments created before the claim are never linked retroactively.                                                                                |
| Unverified or failed payment | Credit requires `successful` + provider transaction id + bill code + `paid_at`; mock payments are excluded.                                                                                                                                                                                                                        |
| Refund / reversal            | `successful` → `refunded`/`failed`/`cancelled` marks unpaid commissions `reversed`. Paid-out commissions stay `paid` for manual reconciliation. Open manual batches containing a reversed item are refused by approve/record-paid.                                                                                                 |
| Subscription cancelled       | Referral status becomes `cancelled`; a later verified renewal makes it `active` again.                                                                                                                                                                                                                                             |
| Bookkeeping fault            | Commission errors are logged as warnings and never fail the student's payment. Replay with `select partner_credit_verified_payment('<payment id>')` (service role).                                                                                                                                                                |

No new tables. RLS is unchanged. Nothing is backfilled.

## Rollout

1. Verify the existing migration's history before any rollout; this hardening
   adds **no migration** and must not reapply historical financial changes.
   Do not use a broad database push: it may include unrelated pending migrations.
   Any missing prerequisite migration requires a separately reviewed application.
2. Before deployment, verify the same cryptographically random
   `PARTNER_CONFIRMATION_SECRET` (at least 32 random bytes) in the web server and
   `create-toyyibpay-bill` Edge Function. This is a server-only signing secret,
   not a ToyyibPay credential, and must never have a `VITE_` prefix. Configure it
   through the host's encrypted secret settings, never in Git. After explicit
   deployment approval and staging verification, release the web server first
   (it includes the checkout key in its proof; the prior Edge verifier accepts
   extra signed fields), then the matching Edge Function that requires that key.
   Coordinate the release and reload cached clients so their retry code retains
   the same key. Legacy/direct attributed requests without a valid proof fail
   closed; genuine non-referral requests still work. Key rotation invalidates
   in-flight proofs; the next web checkout signs a fresh one automatically.
3. Keep `PARTNER_UPGRADE_TRACKING_ENABLED` unset. Existing database triggers
   credit verified payments; deploy the Edge security changes together with the
   matching web server as described above. Legacy RPCs retain their existing
   service-only permissions and idempotency.
4. Acceptance: new student opens `https://www.myacademy.my/?ref=<code>`, signs in
   with Google, completes normal onboarding, pays RM59 in the ToyyibPay
   sandbox, and a RM17.70 Pending commission appears for that partner. Also repeat
   with account A already signed in, switch to new account B, and verify only B
   receives the new attribution. No learner sees a referral code, commission,
   affiliate question or confirmation dialog. Use `vitest.referral.config.ts` for isolated
   browser-component, checkout-handler, Edge Function, SQL and receipt regressions.

The 16 October account-switch incident and the administrator-approved correction
requirements are documented in `docs/referral-account-switch-incident.md`. This fix
does not backfill that payment or change any existing financial record.

## Uncertain provider outcomes

A pending payment without a stored bill may represent a timeout, worker crash,
or a provider success followed by a failed local write. Do not delete it, rotate
its checkout key, replay a successful callback, or issue a replacement simply
because time passed. Reconcile against ToyyibPay's records and independently
verify settlement/inactivation first. Distinct deliberately supplied keys still
represent distinct payments; this is not a global lock on every payment by one
user. The browser retains its key in session storage until an authenticated,
owner-scoped payment-return lookup confirms the matching terminal payment.
If storage is unavailable, checkout fails generically before creating a bill.

`MoonExplorer86/Academy-partners` remains the permanent owner of affiliate
programme administration and payout policies. No payout policy or commission
calculation is changed by this checkout hardening.

## 15 October 2026 RM59 payment (`2601a1fb-…`)

Paid 21:53 MYT, bill `yopn4gfo`, sandbox. The referral cannot be verified:
the student account was created on 24 July 2026, before partner tracking
existed (12 October). The payment has no checkout link. That student's 255
analytics events record no `ref` and no UTM source; the analytics system stores
pathname only. `partner_referrals` is empty. No historical commission is
proposed unless the partner supplies independent evidence. Any correction
would then be a manual, reviewed admin entry.
