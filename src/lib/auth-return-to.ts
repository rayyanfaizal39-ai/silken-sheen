const productionOrigins = new Set(["https://www.myacademy.my", "https://senior.myacademy.my"]);
// Main's documented Vite / Wrangler development origins; never enabled in production.
const developmentOrigins = new Set([
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
]);

/** Never pass untrusted login destinations directly to browser/server redirects. */
export function getAuthReturnTo(value: unknown, development = import.meta.env.DEV): string {
  if (typeof value !== "string" || /[\\\s\x00-\x1f\x7f]/.test(value)) return "/home";
  try {
    const base = "https://www.myacademy.my";
    if (value.startsWith("/") && !value.startsWith("//")) {
      const url = new URL(value, base);
      return url.origin === base ? `${url.pathname}${url.search}${url.hash}` : "/home";
    }
    const url = new URL(value);
    if (
      !url.username &&
      !url.password &&
      (productionOrigins.has(url.origin) || (development && developmentOrigins.has(url.origin)))
    )
      return url.href;
  } catch {
    // Invalid destinations fall back to Main.
  }
  return "/home";
}

export function getGoogleOAuthOptions(origin: string, next?: string) {
  const callback = new URL("/auth/callback", origin);
  if (next === "/admin") {
    // Keep the admin callback identical to the production redirect allowlist entry.
    callback.search = "?next=/admin";
  } else if (next) {
    callback.searchParams.set("next", getAuthReturnTo(next));
  }
  return {
    provider: "google" as const,
    options: { redirectTo: callback.href, queryParams: { prompt: "select_account" } },
  };
}
