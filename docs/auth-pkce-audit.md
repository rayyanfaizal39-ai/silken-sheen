# Google OAuth PKCE audit and fix

## Root cause and evidence

The browser and server already used `@supabase/ssr` 0.12.0 with the same
`academy-auth-v1` cookie name and cookie settings. There was no localStorage-only
Supabase client in the active application.

The old `/auth/callback` exchanged the code in a React effect, after browser
client initialization. The installed Auth SDK refreshes expired sessions during
session loading; saving a refreshed session removes the pending code verifier.
The regression test reproduces that exact sequence and the resulting
`pkce_code_verifier_not_found` error. This proves a code-level failure path, not
which path caused any particular production incident without its browser trace.

Additional problems: iframe OAuth created a verifier before switching to a
top-level browsing context (cookies can be partitioned or blocked); callback
exchange could be interrupted by the PWA's update reload; local Supabase config
used the apex Site URL despite the application's canonical www redirect.

## Client and middleware inventory

| Location | Purpose / finding |
| --- | --- |
| `src/lib/supabase.ts` | Only active browser auth client; SSR singleton, cookie-backed PKCE, automatic URL exchange disabled. Kept unchanged. |
| `src/lib/supabase-auth-cookie.ts` | Shared name, Path=/, SameSite=Lax, persistent max-age, browser-readable cookies. HTTPS clients add Secure. Kept unchanged. |
| `src/lib/supabase.server.ts` | Two request-context adapters for the same SSR cookie mechanism: TanStack server functions and raw Request/Response routes. Both use getAll/setAll, including deletion and chunking. No incompatible storage adapters. |
| `src/lib/billing.server.ts` | Separate privileged billing client, no browser session persistence. Not an OAuth client. |
| `supabase/functions/{get-invoice-download-url,create-toyyibpay-bill,send-invoice-email,send-parent-report}/index.ts` | Four bearer-auth clients and four privileged service clients; independent edge requests, not browser login clients. |
| `supabase/functions/toyyibpay-callback/index.ts` | Privileged payment webhook client. |
| `scripts/import-schools.mjs`, `scripts/upload-notes-images.mjs` | Privileged administrative scripts. |
| `silken-sheen/` | Ignored local project copy with its own matching clients; outside the active src/build. Not modified. |
| `silken-sheen-main/src/` | Archived source tree; no Supabase constructors found. |
| `src/start.ts` | Error middleware only; no auth exchange or session clearing. |
| `src/server.ts` | Canonical production host redirect, now also enforces HTTPS on www. |
| `vite.config.ts`, `scripts/build-pages-worker.js`, `scripts/patch-wrangler-assets.js` | Auth paths excluded from service-worker document caching and included in Cloudflare Worker routing. |
| `src/lib/pwa-register.ts` | Can reload on SW update; server callback no longer boots this code before exchanging. |

Auth consumers use the shared browser export. Guest clearing removes only
`academy_guest_mode`; no localStorage/sessionStorage clear-all operation was found
in the OAuth flow. Email/password, signup, recovery verification and guest code
retain their existing methods and storage contracts.

## Implemented flow

1. Open the login page as a top-level page on `https://www.myacademy.my`.
   Embedded login opens the application's login page first; Google starts only
   after the user clicks there. Local development retains its own origin.
2. The existing browser client calls signInWithOAuth with Google and
   `${window.location.origin}/auth/callback` (approved admin/upgrade returns retain
   their existing next parameter). Supabase writes the verifier cookie.
3. Google returns through Supabase to the application's GET `/auth/callback`.
4. The canonical server client reads the verifier cookie and exchanges the code.
   Its callback-only option suppresses old session *values* from that request's
   cookie reads, preventing the SDK INITIAL_SESSION listener from concurrently
   refreshing an old session. Cookie names remain visible for stale chunk cleanup.
   Other server callers retain normal session loading.
5. The response includes all session Set-Cookie headers, verifier deletion,
   no-cache headers and a 303 redirect to `/home`. React boots after this redirect
   and reads the session from the same cookies. Approved alternate returns remain.
6. Failed exchange returns a retry page without exposing provider details or
   clearing an existing browser session. PKCE stays enabled throughout.

## Hosted configuration to check before release

Local config changes do not update the hosted Dashboard automatically.

- Supabase Authentication / URL Configuration: Site URL `https://www.myacademy.my`.
- Allow `https://www.myacademy.my/auth/callback`, plus the exact existing returns
  `https://www.myacademy.my/auth/callback?next=%2Fadmin%2Flogin` and
  `https://www.myacademy.my/auth/callback?next=%2Fupgrade`.
- Main/Senior SSO also requires callback URLs with the encoded Senior `next` query;
  see [the SSO production procedure](main-senior-sso.md) for the exact URL and validation steps.
- Retain `https://www.myacademy.my/auth/reset-password` and legitimate login/root
  entries. Retire apex entries for this app. Keep localhost entries only for
  intentional development. Existing partners entries belong to a separate app;
  confirm that integration before removing them.
- The Google provider's authorized redirect URI is the **Supabase** callback:
  `https://aojrbxoqbgyxmfljqpqj.supabase.co/auth/v1/callback`. The application's
  `/auth/callback` belongs in Supabase's redirect allowlist.
- Cloudflare runtime `SUPABASE_URL`/`SUPABASE_ANON_KEY` (or VITE equivalents) must
  refer to the same project as the build-time browser variables. Use a public
  publishable/anon key, never a service-role key, for these session clients.
- Email hook `PUBLIC_APP_URL` / `SITE_URL`, if configured, should use
  `https://www.myacademy.my`; its fallback is now aligned. Preserve the recovery
  token-hash template pointing to `/auth/confirm`, including type and next.

## Verification and device acceptance checklist

Automated tests use the installed SDK and mocked Auth HTTP responses, not a live
Google account. They reproduce the old failure and verify fresh/expired sessions,
verifier transfer, chunked session cookies, verifier deletion, HTTPS flags,
restoration in a new client, safe redirects, rejected/missing codes and preservation
of an existing session on failure. Recovery validation tests also run.

Live acceptance remains required on **desktop Chrome, Android Chrome, iPhone
Safari, iPad Safari and iPad Chrome**. For each browser:

- Start Google login from /login with a logged-out browser; expect one server
  exchange, 303, /home, and an authenticated user.
- Repeat with an existing session, including an expired access token. Check that
  the callback performs the PKCE exchange without refreshing the old session.
- Refresh /home; then fully close/reopen the browser and return to /home.
- Cancel Google consent and try an expired callback; verify the retry link works.
- Verify email/password login, forgot-password email -> /auth/confirm -> password
  update -> login, and guest entry plus guest refresh.
- Check embedded preview login opens the app first and starts Google there.
- Check apex/HTTP navigation reaches canonical HTTPS www before starting OAuth.

Cookie persistence remains subject to explicit cookie clearing and browser privacy
policies; switching browser/device mid-flow cannot preserve a PKCE verifier.

No deploy, commit, push or hosted Dashboard changes were performed.
No curriculum text was added or changed by this auth fix.

## Files changed

- `src/context/auth-context.tsx`: canonical origin / first-party OAuth initiation.
- `src/routes/auth.callback.tsx`: server GET route replacing React exchange.
- `src/lib/auth-callback.server.ts`: code exchange, cookie-preserving redirect and retry response.
- `src/lib/supabase.server.ts`: callback-only protection against old-session refresh.
- `src/server.ts`: HTTPS enforcement on canonical production host.
- `supabase/config.toml`: canonical Site URL and redirect allowlist.
- `supabase/functions/send-auth-email/index.ts`: canonical public URL fallback.
- `supabase/functions/_shared/email-templates.ts`: canonical recovery URL guard,
  accepting legacy apex configuration while generating www links.
- `src/lib/auth-callback.test.ts`, `src/lib/email-templates.test.ts`: regression tests.
- `docs/auth-pkce-audit.md`: this report and release checklist.

## Actual validation results

- 49 focused tests passed across auth callback, recovery validation, email templates
  and onboarding/guest routing.
- `npm run build` passed, including Cloudflare Pages Worker generation.
- Built Pages preview: GET `/auth/callback` without a code returns server-generated
  HTTP 400 retry HTML, Cache-Control private/no-store and Referrer-Policy no-referrer.
- `git diff --check` passed.
- `tsc --noEmit` remains blocked by pre-existing string/undefined errors in
  `src/content/form2/science/chapter-7-9-10-visual-integration.test.tsx:298` and
  `src/content/form2/science/chapter-9/chapter-9-heat-visuals.test.tsx:480`.
  No auth-related type errors were reported.
- Real-device Google consent, real email/password login, delivered reset email,
  and physical browser close/reopen were not tested in this environment. The
  cookie restoration test uses a new SDK client, not a physical browser restart.

Reference: https://supabase.com/docs/guides/auth/server-side/creating-a-client
and https://supabase.com/docs/guides/auth/social-login/auth-google
