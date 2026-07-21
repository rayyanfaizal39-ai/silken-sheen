// Guarded service-worker registration wrapper for AcadeMY.
//
// Rules (per Lovable PWA skill):
//  - Never register in dev, Lovable preview, iframes, or when ?sw=off.
//  - In refused contexts, actively unregister any matching /sw.js.
//  - Only one place registers the SW (this module) — no auto-injection.

const SW_URL = "/sw.js";
// Guards the auto-reload below to at most once per browser session, in case
// the new SW never settles as the controller and "controlling" keeps firing.
const RELOAD_ONCE_KEY = "academy-sw-reload-once";
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
        update: async () => {
          wb.addEventListener("controlling", () => {
            window.location.reload();
          });
          await wb.messageSkipWaiting();
        },
      });
    };

    wb.addEventListener("waiting", promptUpdate);

    // skipWaiting + clientsClaim (vite.config.ts) mean a newly installed SW
    // now activates and claims control on its own, with no "waiting"
    // click-through required. Reload once so an already-open tab picks up
    // the fresh HTML/assets it's now being served by.
    let reloaded = false;
    wb.addEventListener("controlling", () => {
      if (reloaded) return;
      if (sessionStorage.getItem(RELOAD_ONCE_KEY)) return;
      reloaded = true;
      try {
        sessionStorage.setItem(RELOAD_ONCE_KEY, "1");
      } catch {
        /* sessionStorage unavailable (e.g. private mode) — reload anyway */
      }
      window.location.reload();
    });

    await wb.register();

    setInterval(() => {
      void wb.update();
    }, UPDATE_CHECK_INTERVAL_MS);
  } catch {
    /* noop */
  }
}
