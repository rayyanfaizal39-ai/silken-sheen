import type { CookieOptions } from "@supabase/ssr";

export const SUPABASE_AUTH_COOKIE_NAME = "academy-auth-v1";

export const SUPABASE_AUTH_COOKIE_OPTIONS = {
  path: "/",
  sameSite: "lax" as const,
  httpOnly: false,
  maxAge: 400 * 24 * 60 * 60,
};

export function getSupabaseAuthCookieOptions(hostname: string, https = false) {
  const production = ["myacademy.my", "www.myacademy.my", "senior.myacademy.my"].includes(hostname);
  return {
    ...SUPABASE_AUTH_COOKIE_OPTIONS,
    secure: production || https,
    ...(production ? { domain: ".myacademy.my" } : {}),
  };
}

type Cookie = { name: string; value: string };
type CookieWrite = Cookie & { options: CookieOptions };

function authCookieGroup(name: string, projectUrl: string) {
  const projectKey = `sb-${new URL(projectUrl).hostname.split(".")[0]}-auth-token`;
  for (const key of [SUPABASE_AUTH_COOKIE_NAME, projectKey]) {
    for (const suffix of ["", "-code-verifier", "-user"]) {
      const base = key + suffix;
      if (
        name === base ||
        (name.startsWith(`${base}.`) && /^\d+$/.test(name.slice(base.length + 1)))
      )
        return base;
    }
  }
  return null;
}

/** Apply the scope at the write boundary, including removals and every SSR chunk. */
export function getSupabaseCookieWrites(
  cookies: CookieWrite[],
  existing: Cookie[],
  projectUrl: string,
  hostname: string,
  https = false,
): CookieWrite[] {
  const scope = getSupabaseAuthCookieOptions(hostname, https);
  const writes: CookieWrite[] = [];
  if (scope.domain) {
    const names = new Set([...existing, ...cookies].map(({ name }) => name));
    for (const name of names) {
      if (authCookieGroup(name, projectUrl)) {
        writes.push({ name, value: "", options: { ...scope, domain: undefined, maxAge: 0 } });
      }
    }
  }
  for (const cookie of cookies) {
    writes.push({
      ...cookie,
      options: {
        ...cookie.options,
        ...scope,
        domain: scope.domain,
        maxAge: cookie.options.maxAge ?? scope.maxAge,
      },
    });
  }
  return writes;
}

/** Cookies do not expose their domain when read. Delete host-only copies first,
 * then reread to preserve parent-domain values in preference to stale duplicates.
 * Migrate a complete chunk group only when no parent-domain group remains. */
export function migrateBrowserAuthCookies(
  read: () => Cookie[],
  write: (cookie: CookieWrite) => void,
  projectUrl: string,
  hostname: string,
  https = false,
) {
  const scope = getSupabaseAuthCookieOptions(hostname, https);
  if (!scope.domain) return;
  const before = read().filter(({ name }) => authCookieGroup(name, projectUrl));
  for (const name of new Set(before.map((cookie) => cookie.name))) {
    write({ name, value: "", options: { ...scope, domain: undefined, maxAge: 0 } });
  }
  const survivingGroups = new Set(read().map(({ name }) => authCookieGroup(name, projectUrl)));
  for (const cookie of before) {
    const group = authCookieGroup(cookie.name, projectUrl)!;
    // Old default-key cookies are obsolete; only migrate Main's active storage key.
    if (group.startsWith(SUPABASE_AUTH_COOKIE_NAME) && !survivingGroups.has(group)) {
      write({ ...cookie, options: scope });
    }
  }
}
