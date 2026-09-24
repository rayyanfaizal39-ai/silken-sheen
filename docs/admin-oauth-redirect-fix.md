# Admin Google OAuth redirect

The change is limited to admin Google OAuth. Email/password login, student OAuth,
the existing callback implementation, the admin guard, profile roles and RLS are unchanged.
The prior root-code recovery workaround and extra callback role query have been removed.

## Redirect values

Original repository default before either local fix:
`https://www.myacademy.my/auth/callback?next=%2Fadmin%2Flogin`

Previous uncommitted attempt:
`https://www.myacademy.my/auth/callback?next=%2Fadmin`

Final exact value:
`${window.location.origin}/auth/callback?next=/admin`

Production value produced by this change:
`https://www.myacademy.my/auth/callback?next=/admin`

`/admin/login` calls the existing `signInWithGoogle("/admin")` auth-context method.
That calls `supabase.auth.signInWithOAuth(getGoogleOAuthOptions(window.location.origin, returnTo))`.
The shared options builder emits the exact admin URL; other destinations retain their existing behavior.
Canonical-host/iframe handoff stays on admin login before starting OAuth.

## Callback

GET `/auth/callback` (`src/routes/auth.callback.tsx`) delegates to
`src/lib/auth-callback.server.ts`. It reads `code`, calls `exchangeCodeForSession(code)`,
preserves all session Set-Cookie headers, validates `next` using `getAuthReturnTo`, and
returns a 303 redirect to `/admin`. `src/routes/admin.tsx` continues to enforce the profile role.
A redirect parameter does not authorize console access.

## Production diagnosis and configuration

The reported `/?code=...` return bypasses the callback. Browser automatic code exchange is disabled
intentionally, so that URL renders the public page without the callback's exchange/redirect.
The checked-in original code did not set `redirectTo` to the origin alone. The public production
inspection returned HTTP 403, and the hosted Supabase settings were not accessible. An older deployed
bundle or a redirect URL rejected by the hosted allowlist remains an unverified explanation.
Neither local attempt has been deployed, so production has not received these changes.

In Supabase Authentication > URL Configuration, keep the Site URL as
`https://www.myacademy.my` and ensure Redirect URLs include:

- `https://www.myacademy.my/auth/callback?next=/admin` (new exact admin URL)
- `https://www.myacademy.my/auth/callback` (existing normal student callback)

Retain all existing student/SSO and other redirect entries. The repository config adds the admin URL,
but editing that file alone does not update hosted Supabase configuration.
The application callback belongs in Supabase's allowlist; no Google provider URI change is required.
Reference: https://supabase.com/docs/guides/auth/redirect-urls

## Validation

95 auth tests pass, including exact admin URL, Google button wiring, PKCE exchange to `/admin`,
shared cookie persistence/restoration and unchanged student callback destinations.
Production build passes (`npm run build`, exit code 0). Live Google consent was not exercised.
No commit, push or deployment.

## Files changed

- `src/routes/admin_.login.tsx`
- `src/context/auth-context.tsx`
- `src/lib/auth-return-to.ts`
- `supabase/config.toml`
- `src/lib/auth-return-to.test.ts`
- `src/lib/auth-callback.test.ts`
- `src/routes/-auth-login.integration.tsx`
- `docs/admin-oauth-redirect-fix.md`
