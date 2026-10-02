import {
  CHUNK_RECOVERY_INLINE_SCRIPT,
  CHUNK_RECOVERY_STORAGE_KEY,
  STALE_CHUNK_PATTERN,
} from "./chunk-recovery-inline.mjs";

export { CHUNK_RECOVERY_INLINE_SCRIPT, CHUNK_RECOVERY_STORAGE_KEY };

export function isStaleChunkMessage(message: string): boolean {
  return STALE_CHUNK_PATTERN.test(message);
}

export function chunkErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "";
}

/**
 * Reloads once when a deployment removed the hashed chunk this tab is asking
 * for. A second failure in the same tab leaves the existing error UI in place.
 * Does not clear cookies, localStorage, or any other stored student data.
 */
export function recoverFromStaleChunk(error: unknown): boolean {
  if (typeof window === "undefined") return false;
  if (!isStaleChunkMessage(chunkErrorMessage(error))) return false;
  try {
    if (sessionStorage.getItem(CHUNK_RECOVERY_STORAGE_KEY) === "1") return false;
    sessionStorage.setItem(CHUNK_RECOVERY_STORAGE_KEY, "1");
  } catch {
    return false;
  }
  window.location.reload();
  return true;
}

export function clearChunkRecoveryMarker(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(CHUNK_RECOVERY_STORAGE_KEY);
  } catch {
    /* private mode */
  }
}

/** The static boot layer sits above the route error UI. Hide it when recovery will not reload. */
export function revealBootLoader(): void {
  if (typeof document === "undefined") return;
  const loader = document.getElementById("academy-static-loader");
  if (loader) {
    loader.hidden = true;
    loader.classList.remove("academy-loader--leaving");
  }
  document.body.dataset.academyLoading = "false";
  document.body.style.overflow = "";
  const app = document.getElementById("academy-app") ?? document.getElementById("root");
  app?.removeAttribute("aria-busy");
  if (app && "inert" in HTMLElement.prototype) (app as HTMLElement).inert = false;
}

let listenersInstalled = false;

export function installChunkRecoveryListeners(): void {
  if (listenersInstalled || typeof window === "undefined") return;
  listenersInstalled = true;
  window.addEventListener("error", (event) => {
    recoverFromStaleChunk(event.message);
  });
  window.addEventListener("unhandledrejection", (event) => {
    recoverFromStaleChunk(event.reason);
  });
}

