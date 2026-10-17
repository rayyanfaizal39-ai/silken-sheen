# Referral account switch — 16 October 2026

Status: source fix prepared for review; not deployed. Production investigation
used SELECT statements only. No paid transaction, referral, commission, payout,
subscription or invoice was inserted, updated or deleted by this task.

## Verified evidence (Asia/Kuala_Lumpur)

| Time     | Evidence                                                                                                                                                                                                                                                    |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 07:43:22 | Partner `ACA8B69613` was claimed by an existing student account A (created 24 September). The referral remains `signed_up`.                                                                                                                                 |
| 07:44:56 | A different student account B was created. B has no referral row.                                                                                                                                                                                           |
| 07:46:13 | B's Premium RM59 ToyyibPay payment was created (payment ID prefix `f0714de0`).                                                                                                                                                                              |
| 07:46:59 | Payment became `successful`, MYR59, sandbox marker true. Stored independent-provider verification has status `1`, amount `59.00`, an external reference equal to the payment UUID, and a transaction reference matching the stored provider transaction ID. |

The successful payment has no checkout attribution link and no commission.
Full customer identifiers and provider/bill references are intentionally omitted
from this Git document; an authorized operator can retrieve the exact incident
using the payment ID prefix and timestamp above.

## Cause

`PartnerReferralClaim` previously claimed for the ambient signed-in identity and
cleared localStorage after a final RPC response. Selecting Google account B later
could not recover the consumed reference. Checkout logged referral RPC failures
but continued creating a bill. The payment trigger correctly refused to invent
attribution for an unlinked payment.

## Fix and preserved invariants

- First-touch browser intent survives OAuth, local sign-out, registration, claim
  errors and successful confirmation until its original 60-day expiry.
- No ambient claim: explicit account selection precedes attribution. Consent is
  tab-local and account-bound; stale async responses cannot confirm another user.
- Server uses `auth.getUser()`, checks the expected account and immutable database
  attribution, then signs a short-lived HttpOnly receipt. No identity is accepted
  from user-editable metadata. Privileged reads are scoped to that verified user.
- Both web checkout and Edge bill creation reject absent, stale, forged,
  wrong-user, wrong-partner or unverified attribution. A missing/wrong actual
  payment link blocks the provider request even if the insert trigger failed open.
- Existing first-touch assignments are never moved. Paid transactions and the
  independently verified callback pipeline are unchanged. Every verified renewal
  still earns 30%, pending until original payment `paid_at + 30 days`.

## Existing payment: correction proposal, NOT authorization

Callback replay is not a correction: `partner_credit_verified_payment` returns
`no_attribution` without a matching checkout link. Do not manufacture a historic
link, change account A's first-touch row, modify B's paid transaction, reset payment
status, or weaken the existing-customer check to make a replay credit it.

A controlled correction requires ALL of the following before any ledger write:

1. An administrator explicitly approves this exact payment, partner and RM17.70
   pending adjustment. General approval to fix referral code is not approval to
   credit an already-paid transaction.
2. Re-verify the exact sandbox bill with ToyyibPay's `getBillTransactions`. Match
   successful status, MYR59.00, external payment UUID and provider transaction ID
   against the stored callback verification. Preserve a timestamped redacted copy
   and a cryptographic hash in the private audit case.
3. Obtain independent support for B being the intended referred learner (the
   original link/session evidence plus the learner/partner's explicit attestation).
   The close timestamps alone are not sufficient proof of referral intent.
4. Check for any existing attribution, commission, refund, disputed payment or
   payout for this payment. Stop on conflicts; do not overwrite first-touch data.
5. Review a separate, administrator-only compensating-adjustment operation. It must
   record the approving admin, reason, evidence hash, original payment and intended
   partner, and enforce unique/idempotent payment correction. It must not rewrite
   existing paid transactions or backdate a fictional ordinary referral.
6. Keep the approved adjustment `pending`, at 30% (RM17.70), with the original
   review boundary of **15 November 2026, 07:46:59 MYT**; never auto-mark it paid.
   Record before/after snapshots and the correction identifier in the audit case.

No correction operation or automatic financial backfill is included in this PR.
An administrator must approve both the evidence and the audited adjustment path
before implementation/execution. Account B's ordinary new claim is deliberately
rejected as `existing_customer` now that its payment succeeded.

## Review and rollout

Validation on 16 October 2026:

- Focused referral/OAuth/Edge/SQL suite: **84 passed**, 7 files. The 28 new
  component/handler/Edge checks also pass under the normal framework-aware runner.
- Full normal suite: **6,485 passed, 56 failed**, 405 files. All 56 failed test
  names reproduce on the pristine `b65bb652` baseline (16 failing files, zero new
  failed tests). These include curriculum, onboarding, legacy annual-price and
  invoice-PDF expectations; none were changed to make the suite green.
- Changed web files and new shared receipt module: ESLint passed. Full web
  TypeScript check reports only two unchanged curriculum-test diagnostics in
  `chapter-7-9-10-visual-integration.test.tsx` and `chapter-9-heat-visuals.test.tsx`.
- Vite client/SSR compilation and all four existing Cloudflare Pages packaging
  steps passed. Curriculum generators were intentionally not run. Existing PWA
  glob warnings remain; no deployment command was run.
- Client assets contain neither the signing-secret environment variable name
  nor the receipt-signing implementation. No real secret value was configured
  or committed. Edge bill tests mock provider calls; they are not a deployed
  Google/ToyyibPay sandbox acceptance run.

No migration is required for this account-choice fix. Use the existing schema and
financial triggers. Review the focused tests, full-suite/typecheck limitations and
production build result in the PR before configuring the shared server-only signing
secret and deploying. Neither a successful unit test nor the historical incident
evidence establishes browser-to-provider end-to-end acceptance of undeployed code.

## 17 October 2026 sandbox payment `TP2610172813821494`

Read-only investigation of the shared production database. Nothing was modified,
credited or backfilled.

| Time (UTC) | Evidence                                                                                                                                                   |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 12:52:12   | Google OAuth started; the stored redirect is the bare Site URL `https://myacademy.my`, recorded only when the requested `redirect_to` is not allow-listed. |
| 12:52:55   | New student account created (payment ID prefix `ece95628`). No `partner_referrals` row then or since.                                                      |
| 12:54:07   | Second Google OAuth, again falling back to the Site URL.                                                                                                   |
| 12:55:43   | RM59 Premium ToyyibPay payment created with no checkout link.                                                                                              |
| 12:56:06   | Payment `successful` (sandbox). No commission. The test partner `ACA9AFD950` has no referrals at all.                                                      |

Cause: the link was opened on a Cloudflare preview origin that is not on the
Supabase Auth redirect allow-list. Google sign-in fell back to the Site URL, so
the purchase happened on production (`main` at `66bd8b5`, before this PR), whose
`www` origin storage never held the code. That build only claims when a code is
present and logs, rather than blocks, a failed claim. The bill request therefore
carried no partner code; deployed Edge v26 correctly created an ordinary bill.

Fix: attribution is now claimed and verified on the server at checkout for the
purchaser, every checkout reads the purchaser's database attribution, and any
temporary verification failure blocks payment. Cross-origin loss of a link that
was never opened on the purchasing origin cannot be recovered by code; preview
origins must be allow-listed in Supabase Auth before preview end-to-end tests.
The historical payment is not credited; any correction follows the approval
process above.
