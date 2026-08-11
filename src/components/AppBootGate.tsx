import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useRouter } from "@tanstack/react-router";
import { ACADEMY_LOADER_FADE_MS } from "@/components/AcadeMYLoadingScreen";
import { useAuth } from "@/context/auth-context";
import { isPublicAuthRoute } from "@/lib/onboarding-routing";
import {
  beginLoadingTask,
  clearLoadingError,
  loadingStore,
  type LoadingTaskHandle,
  type LoadingTaskOptions,
} from "@/lib/loading-store";

const HERO_IMAGE = "/assets/ranks/home/academy-station-hero.png";
const BOOT_TIMEOUT_MS = 12_000;
// Kept high enough that ordinary same-app navigations (route already
// prefetched/cached) never flash the loader — only genuinely slow
// transitions show it, after which minVisibleMs prevents a jarring flicker.
const TRANSITION_DELAY_MS = 400;
const TRANSITION_MIN_MS = 350;
let initialBootTasks: LoadingTaskHandle[] | null = null;

type LoadingContextValue = {
  beginTask: (options?: LoadingTaskOptions) => LoadingTaskHandle;
};

const LoadingContext = createContext<LoadingContextValue>({ beginTask: beginLoadingTask });

/** Register critical data, lazy-module, or manual work with the global loader. */
export function useGlobalLoading() {
  return useContext(LoadingContext);
}

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const image = new Image();
    const done = () => resolve();
    image.onload = done;
    image.onerror = done; // safe fallback: never trap boot on a broken asset
    image.src = src;
    if (typeof image.decode === "function") void image.decode().then(done, done);
  });
}

function preloadCriticalImage(src: string): Promise<void> {
  return Promise.race([
    preloadImage(src),
    new Promise<void>((resolve) => window.setTimeout(resolve, 3_000)),
  ]);
}

function getLoaderElements() {
  const loader = document.getElementById("academy-static-loader");
  const app = document.getElementById("academy-app") ?? document.getElementById("root");
  return { loader, app };
}

/**
 * Builds the error heading/message/Retry/Reload controls on demand and
 * appends them to the static loader. These nodes intentionally do NOT exist
 * in the server/static HTML (see scripts/generate-static-shell.js) — a
 * crawler or "view source" must never see error copy on a successful load.
 * They're created here only once a genuine boot failure/timeout has
 * occurred, and removed again via `removeLoaderError` once it clears.
 */
function renderLoaderError(loader: HTMLElement, onRetry: () => void) {
  if (loader.querySelector("[data-loading-error-block]")) return;

  const block = document.createElement("div");
  block.className = "academy-static-error";
  block.setAttribute("role", "alert");
  block.setAttribute("data-loading-error-block", "true");

  const heading = document.createElement("h1");
  heading.textContent = "Mission control needs a moment";

  const message = document.createElement("p");
  message.setAttribute("data-loading-error", "true");
  message.textContent = "AcadeMY could not finish loading this screen.";

  const actions = document.createElement("div");
  actions.className = "academy-static-actions";

  const retryButton = document.createElement("button");
  retryButton.type = "button";
  retryButton.setAttribute("data-loading-retry", "true");
  retryButton.textContent = "Retry";
  retryButton.addEventListener("click", onRetry);

  const reloadButton = document.createElement("button");
  reloadButton.type = "button";
  reloadButton.setAttribute("data-loading-reload", "true");
  reloadButton.textContent = "Reload";
  reloadButton.addEventListener("click", () => window.location.reload());

  actions.append(retryButton, reloadButton);
  block.append(heading, message, actions);
  loader.appendChild(block);
}

function removeLoaderError(loader: HTMLElement) {
  loader.querySelector("[data-loading-error-block]")?.remove();
}

function getInitialBootTasks() {
  if (initialBootTasks === null) {
    initialBootTasks = [
      beginLoadingTask({ id: "boot:route", timeoutMs: BOOT_TIMEOUT_MS }),
      beginLoadingTask({ id: "boot:layout", timeoutMs: BOOT_TIMEOUT_MS }),
      beginLoadingTask({
        id: "boot:auth",
        message: "Restoring your AcadeMY session…",
        timeoutMs: BOOT_TIMEOUT_MS,
      }),
      beginLoadingTask({
        id: "boot:assets",
        message: "Preparing your learning mission…",
        timeoutMs: BOOT_TIMEOUT_MS,
      }),
    ];
  }
  return initialBootTasks;
}

export function AppBootGate({ children }: { children: ReactNode }) {
  const { loading: authLoading } = useAuth();
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const bootTasks = useRef<LoadingTaskHandle[] | null>(
    typeof window === "undefined" ? null : getInitialBootTasks(),
  );
  const state = useSyncExternalStore(
    loadingStore.subscribe,
    loadingStore.getSnapshot,
    loadingStore.getServerSnapshot,
  );
  const routeTask = useRef<LoadingTaskHandle | null>(null);
  const hideTimer = useRef<number | null>(null);

  const retry = useCallback(() => {
    clearLoadingError();
    routeTask.current?.finish();
    routeTask.current = beginLoadingTask({
      id: "route:retry",
      message: "Retrying your learning mission…",
      timeoutMs: BOOT_TIMEOUT_MS,
    });
    void router.invalidate().finally(() => routeTask.current?.finish());
  }, [router]);

  useEffect(() => {
    const tasks = bootTasks.current;
    if (!tasks) return;
    tasks[0]?.finish();
    const stylesheets = [
      ...document.querySelectorAll<HTMLLinkElement>("link[data-app-stylesheet]"),
    ];
    let cancelled = false;
    let frame = 0;
    const activate = (link: HTMLLinkElement) => {
      link.media = "all";
    };
    const waitForStyles = Promise.all(
      stylesheets.map(
        (link) =>
          new Promise<void>((resolve) => {
            if (link.sheet) {
              activate(link);
              resolve();
              return;
            }
            const done = () => {
              activate(link);
              resolve();
            };
            link.addEventListener("load", done, { once: true });
            link.addEventListener("error", done, { once: true });
          }),
      ),
    );
    void waitForStyles.then(() => {
      if (!cancelled) frame = requestAnimationFrame(() => tasks[1]?.finish());
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!authLoading || isPublicAuthRoute(pathname)) bootTasks.current?.[2]?.finish();
  }, [authLoading, pathname]);

  useEffect(() => {
    let cancelled = false;
    // The page has a reserved dark-space fallback, so a large hero must not
    // hold slow/offline users indefinitely while still getting a head start.
    const asset =
      window.location.pathname === "/home" ? preloadCriticalImage(HERO_IMAGE) : Promise.resolve();
    void asset.finally(() => {
      if (!cancelled) bootTasks.current?.[3]?.finish();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const stopBefore = router.subscribe("onBeforeNavigate", (event) => {
      if (!event.hrefChanged) return;
      routeTask.current?.finish();
      routeTask.current = beginLoadingTask({
        id: `route:${event.toLocation.href}`,
        message: "Charting your next destination…",
        delayMs: TRANSITION_DELAY_MS,
        minVisibleMs: TRANSITION_MIN_MS,
        timeoutMs: BOOT_TIMEOUT_MS,
      });
    });
    const stopRendered = router.subscribe("onRendered", () => {
      routeTask.current?.finish();
      routeTask.current = null;
    });
    return () => {
      stopBefore();
      stopRendered();
      routeTask.current?.finish();
    };
  }, [router]);

  useEffect(() => {
    const { loader, app } = getLoaderElements();
    if (!loader) return;

    if (state.error) {
      renderLoaderError(loader, retry);
      const errorMessage = loader.querySelector<HTMLElement>("[data-loading-error]");
      if (errorMessage) errorMessage.textContent = state.error.message;
    } else {
      removeLoaderError(loader);
    }

    const message = loader.querySelector<HTMLElement>("[data-loading-message]");
    if (message) message.textContent = state.message;
    loader.dataset.error = state.error ? "true" : "false";

    if (state.visible) {
      if (hideTimer.current !== null) window.clearTimeout(hideTimer.current);
      loader.hidden = false;
      loader.classList.remove("academy-loader--leaving");
      document.body.style.overflow = "hidden";
      app?.setAttribute("aria-busy", "true");
      if ("inert" in HTMLElement.prototype && app) app.inert = true;
      return;
    }

    loader.classList.add("academy-loader--leaving");
    hideTimer.current = window.setTimeout(() => {
      loader.hidden = true;
      loader.classList.remove("academy-loader--leaving");
      document.body.dataset.academyLoading = "false";
      document.body.style.overflow = "";
      app?.removeAttribute("aria-busy");
      if ("inert" in HTMLElement.prototype && app) app.inert = false;
    }, ACADEMY_LOADER_FADE_MS);

    return () => {
      if (hideTimer.current !== null) window.clearTimeout(hideTimer.current);
    };
  }, [state]);

  const value = useMemo(() => ({ beginTask: beginLoadingTask }), []);
  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}
