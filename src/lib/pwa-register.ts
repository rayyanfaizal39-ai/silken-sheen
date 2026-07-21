// Guarded service-worker registration wrapper for AcadeMY.
//
// Rules (per Lovable PWA skill):
//  - Never register in dev, Lovable preview, iframes, or when ?sw=off.
//  - In refused contexts, actively unregister any matching /sw.js.
//  - Only one place registers the SW (this module) — no auto-injection.

const SW_URL = "/sw.js";
// Browsers only re-check /sw.js on their own schedule (up to 24h, or on
// navigation). Poll explicitly so an already-open tab still notices a fresh
// deploy without waiting on that heuristic.
const UPDATE_CHECK_INTERVAL_MS = 60 * 60 * 1000;

function isRefusedContext(): boolean {
  if (typeof window === "undefined") return true;
  if (!import.meta.env.PROD) return true;

  try {
    if (window.self !== window.top) return true;
  } catch {
    return true;
  }

  const host = window.location.hostname;
  const refusedHost =
    host.startsWith("id-preview--") ||
    host.startsWith("preview--") ||
    host === "lovableproject.com" ||
    host.endsWith(".lovableproject.com") ||
    host === "lovableproject-dev.com" ||
    host.endsWith(".lovableproject-dev.com") ||
    host === "beta.lovable.dev" ||
    host.endsWith(".beta.lovable.dev");
  if (refusedHost) return true;

  const params = new URLSearchParams(window.location.search);
  if (params.get("sw") === "off") return true;

  return false;
}

async function unregisterMatching(): Promise<void> {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  try {
    const regs = await navigator.serviceWorker.getRegistrations();
    await Promise.allSettled(
      regs
        .filter((r) => {
          const url = r.active?.scriptURL || r.installing?.scriptURL || r.waiting?.scriptURL || "";
          return url.endsWith(SW_URL);
        })
        .map((r) => r.unregister()),
    );
  } catch {
    /* noop */
  }
}

export type UpdatePromptState = {
  needRefresh: boolean;
  update: () => Promise<void>;
};

/**
 * Registers the SW when safe, otherwise unregisters stale ones.
 * onUpdate is called when a new SW is waiting; caller decides UX.
 */
export async function registerServiceWorker(
  onUpdate: (state: UpdatePromptState) => void,
): Promise<void> {
  if (isRefusedContext()) {
    await unregisterMatching();
    return;
  }
  if (!("serviceWorker" in navigator)) return;

  try {
    const { Workbox } = await import("workbox-window");
    const wb = new Workbox(SW_URL, { scope: "/" });

    const promptUpdate = () => {
      onUpdate({
        needRefresh: true,
        update: async () => wb.messageSkipWaiting(),
      });
    };

    wb.addEventListener("waiting", promptUpdate);

    // skipWaiting + clientsClaim (vite.config.ts) mean a newly installed SW
    // now activates and claims control on its own, with no "waiting"
    // click-through required. Reload once so an already-open tab picks up
    // the fresh HTML/assets it's now being served by.
    //
    // IMPORTANT: "controlling" also fires on the very first install of a
    // page that had no prior controller (clientsClaim causes it to claim
    // the page immediately) — that is NOT an update, just first-time setup,
    // and reloading then serves no purpose while risking cancellation of
    // in-flight requests (e.g. the initial CSS fetch) mid-load. Workbox
    // marks that case with isUpdate: false, so only react when isUpdate is
    // true (this client already had a controlling SW before).
    // Guard by ServiceWorker object identity, not by a session-wide flag. A
    // controller can trigger only one reload on this page, while a later,
    // genuinely different controller is still allowed to reload the same tab.
    let reloadScheduledFor: ServiceWorker | null = null;
    wb.addEventListener("controlling", (event) => {
      if (!event.isUpdate) return;
      if (!event.sw || reloadScheduledFor === event.sw) return;
      reloadScheduledFor = event.sw;

      // Even for a genuine update, defer the reload until the current page
      // has finished loading — reloading mid-load can cancel in-flight
      // stylesheet/script requests and interrupt first paint.
      const doReload = () => window.location.reload();
      if (document.readyState === "complete") {
        doReload();
      } else {
        window.addEventListener("load", doReload, { once: true });
      }
    });

    await wb.register();

    setInterval(() => {
      void wb.update();
    }, UPDATE_CHECK_INTERVAL_MS);
  } catch {
    /* noop */
  }
}
