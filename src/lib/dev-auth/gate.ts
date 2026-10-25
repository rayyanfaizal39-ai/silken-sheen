/**
 * Pure decision for the local dev sign-in bypass.
 *
 * Production builds never call this with `dev: true` (Vite sets
 * `import.meta.env.DEV` to false and tree-shakes the call). If it is ever
 * invoked for a production build while the flag is set, it throws so the
 * bypass cannot silently turn on.
 */
export const DEV_AUTH_BYPASS_FORBIDDEN = "Dev auth bypass cannot run in a production build.";

export function isLocalDevHost(hostname: string): boolean {
  const host = hostname
    .trim()
    .replace(/^\[|\]$/g, "")
    .split("%")[0];
  return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

/** Host header or URL host, without the port. IPv6 keeps the address inside brackets. */
export function hostnameOf(hostHeader: string): string {
  const host = hostHeader.trim();
  if (host.startsWith("[")) {
    const end = host.indexOf("]");
    return end === -1 ? host : host.slice(1, end);
  }
  return host.split(":")[0] ?? "";
}

export function devAuthBypassActive(input: {
  dev: boolean;
  prod: boolean;
  flag: string | undefined;
  hostname: string;
  /** When a Supabase project is configured, real auth stays in charge. */
  cloudConfigured?: boolean;
}): boolean {
  const requested = input.flag === "true";
  if (input.prod || !input.dev) {
    if (requested) throw new Error(DEV_AUTH_BYPASS_FORBIDDEN);
    return false;
  }
  if (!requested || input.cloudConfigured) return false;
  return isLocalDevHost(input.hostname);
}
