import { devAuthBypassActive } from "./gate";

export { DEV_AUTH_BYPASS_FORBIDDEN, devAuthBypassActive, hostnameOf, isLocalDevHost } from "./gate";

/**
 * True only for `vite dev` on localhost with `VITE_DEV_AUTH_BYPASS=true`
 * and no Supabase project configured.
 *
 * `import.meta.env.DEV` is statically false in production builds, so the
 * flag is never read and this returns false. The implementation below the
 * guard is dropped from the production bundle.
 */
export function isDevAuthBypassEnabled(
  hostname = typeof window === "undefined" ? "" : window.location.hostname,
  cloudConfigured = false,
): boolean {
  if (!import.meta.env.DEV) return false;
  return devAuthBypassActive({
    dev: true,
    prod: Boolean(import.meta.env.PROD),
    flag: import.meta.env.VITE_DEV_AUTH_BYPASS,
    hostname,
    cloudConfigured,
  });
}
