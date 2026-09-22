# Main / Senior SSO fix and production verification

Scope: Main (`silken-sheen`) only. Senior has not been modified. No deployment, commit, or push was performed.

## Code-level causes

The committed Main clients used `academy-auth-v1` without a cookie Domain, so browsers stored host-only cookies that were not sent to Senior. The partial SSO changes already present in this checkout added a domain but lacked existing-session migration and complete legacy cleanup. They also derived Secure independently of the production host.

The committed login route only retained `/upgrade`; the Google helper's return type only allowed a few Main paths, and the server callback only allowed three Main paths. A Senior destination therefore became `/home`. The pre-existing partial patch addressed Senior specifically; this change completes the production allowlist and regression coverage.

## Implementation and audit

- `supabase-auth-cookie.ts` owns the cookie policy and chunk-aware write/cleanup helpers. All writes enforce Domain `.myacademy.my`, Path `/`, SameSite Lax, Secure true on production hosts, including when a proxy reports HTTP. HTTP localhost remains host-only and Secure false; HTTPS development uses Secure true.
- `supabase.ts` migrates existing host-only `academy-auth-v1` groups before SDK initialization. It deletes host-only copies, rereads cookies, and preserves surviving parent-domain groups in preference to stale duplicate chunks. Every browser `setAll` uses the policy (OAuth verifier, login, refresh, recovery, logout).
- Both clients in `supabase.server.ts` use the same write policy. The server-function adapter preserves separate scoped cookies through TanStack's domain/path-aware cookie writer. The raw-request adapter appends every Set-Cookie header, including callback/session-refresh writes. No separate Supabase middleware writer exists in Main.
- Cleanup matches the active storage key and this project's default `sb-<project-ref>-auth-token` family, including numeric chunks and verifier/user cookies. It expires host-only copies only; unrelated cookies and existing parent-domain cookies are not blanket-deleted. Obsolete default-key cookies are not migrated into a new session.
- Login validates `next`, passes it to the Google options builder, and encodes it in `redirectTo`. The server callback revalidates after successful PKCE exchange and returns a 303 carrying all session cookies. Failed exchanges do not clear the existing session.
- Production redirects accept HTTPS `www.myacademy.my`, HTTPS `senior.myacademy.my`, and root-relative Main paths. Credentials, other origins, protocol-relative URLs, backslashes, whitespace/control characters, and executable schemes are rejected. Development-only origins are HTTP localhost/127.0.0.1 on Main's 8080 and preview 4173 ports.
- Main `/login` is Google-only. The existing `/admin/login` email/password form honors safe `next` after authentication; absent `next`, its admin role check and `/admin` destination remain. Normal Main login without `next` retains `/home` and the plain callback URL.

Main's existing storage key remains `academy-auth-v1`, including `.0`, `.1`, etc. Production SSO still depends on Senior using the same Supabase project, key, and compatible SSR cookie encoding. This change does not inspect or alter Senior.

## Verification commands

```powershell
npx.cmd vitest run --config vitest.auth.config.ts
npx.cmd tsc -p tsconfig.auth.json --pretty false
npm.cmd run build
```

The dedicated auth test config avoids production route splitting/Cloudflare plugins. The route integration harness is explicitly included in that config. Auth API calls use the real Supabase SDK with mocked network responses; route tests mock auth state and exercise the actual login handlers/effects. These checks do not certify live Google or deployed Senior behavior.

## Production browser procedure (after a separately authorized release)

1. In Supabase Authentication > URL Configuration, verify Site URL is `https://www.myacademy.my` and redirect URLs permit Main's callback **with its query string**. For this exact test, permit `https://www.myacademy.my/auth/callback?next=https%3A%2F%2Fsenior.myacademy.my%2Fhome` as well as the plain callback. If supporting all validated destinations, a callback-scoped pattern such as `https://www.myacademy.my/auth/callback**` can cover these variants; Main still validates `next`. Google continues to use the Supabase project's `/auth/v1/callback`. No hosted settings were changed here.
2. Use a normal browser profile with an existing Main login. Open DevTools, enable Network > Preserve log, and inspect Application > Cookies for www. Record cookie **names and scopes only**, not token values. Reload Main so startup migration runs. Confirm every active `academy-auth-v1` chunk is scoped to `.myacademy.my`, Path `/`, Secure, SameSite Lax, with no matching host-only www copy. Unrelated cookies should remain.
3. Open `https://senior.myacademy.my/home` directly. Confirm it recognizes the session. In Network, inspect the Senior document request's Cookies pane and confirm the shared chunks are sent. Do not export or share token-bearing HAR files.
4. Log out on Main. Reload Senior and confirm it requires login. On Main, confirm all active session chunks are gone at both scopes. For a deliberate stale-cookie regression, use a disposable test profile and create a host-only duplicate of an active cookie name using a dummy value before reloading Main; confirm the parent-domain value survives and the duplicate disappears. Do not edit the only copy of a real session.
5. While logged out, open `https://www.myacademy.my/login?next=https%3A%2F%2Fsenior.myacademy.my%2Fhome`. Click Continue with Google. Inspect the Supabase authorize request's decoded `redirect_to`; it must contain Main `/auth/callback` with `next=https://senior.myacademy.my/home`.
6. Complete Google login. Confirm the Main callback URL retains `next` alongside `code`. Its response must be 303 with Location `https://senior.myacademy.my/home`; all non-deletion session Set-Cookie headers must use the parent domain and required flags. Separate host-only Max-Age=0 headers are intentional cleanup. Confirm Senior is authenticated, then refresh it and open it in a new tab.
7. Repeat logout/login and inspect cookie scopes again: no host-only/parent duplicate for any active chunk. Repeat with `/login` without `next`; expect Main `/home`. With an existing password-enabled test account, test `/admin/login?next=https%3A%2F%2Fsenior.myacademy.my%2Fhome`; expect Senior after password login. Admin login without `next` must retain its existing role check and destination.
8. Repeat login with encoded `next=https://evil.example`, `next=javascript:alert(1)`, and `next=//evil.example`; all must remain on Main and finish at `/home`. Also tamper with callback `next` during a fresh valid OAuth flow; callback validation must reject the same values.
9. In local development on HTTP localhost:8080, sign in and inspect cookies: no Domain attribute and no Secure flag. Development redirect origins must not work in the production build.

UNSOURCED LEARNER-FACING CONTENT ADDED: NONE.

## Changed files and results

Implementation:
- `src/lib/supabase-auth-cookie.ts`
- `src/lib/supabase.ts`
- `src/lib/supabase.server.ts`
- `src/lib/auth-return-to.ts`
- `src/lib/auth-callback.server.ts`
- `src/context/auth-context.tsx`
- `src/routes/login.tsx`
- `src/routes/admin_.login.tsx`

Tests/configuration:
- `src/lib/auth-return-to.test.ts`
- `src/lib/auth-callback.test.ts`
- `src/lib/supabase-auth-cookie.test.ts`
- `src/lib/supabase-clients.test.ts`
- `src/routes/-auth-login.integration.tsx`
- `vitest.auth.config.ts`
- `tsconfig.auth.json`

Documentation:
- `docs/main-senior-sso.md`
- `docs/auth-pkce-audit.md`

Validation: 90 tests across 7 files passed; auth-focused typecheck passed; production build passed. The broader repository typecheck exposed unrelated existing `string | undefined` errors in `src/content/form2/science/chapter-7-9-10-visual-integration.test.tsx:305` and `src/content/form2/science/chapter-9/chapter-9-heat-visuals.test.tsx:523`. Those curriculum files were not changed. Pre-existing uncommitted SSO work was retained and completed.
