import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CHUNK_RECOVERY_INLINE_SCRIPT,
  CHUNK_RECOVERY_STORAGE_KEY,
  clearChunkRecoveryMarker,
  isStaleChunkMessage,
  recoverFromStaleChunk,
} from "./chunk-recovery";

afterEach(() => {
  vi.unstubAllGlobals();
});

function installBrowser() {
  const store = new Map<string, string>();
  const reload = vi.fn();
  vi.stubGlobal("window", { location: { reload } });
  vi.stubGlobal("sessionStorage", {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
  });
  return { store, reload };
}

describe("stale chunk recovery", () => {
  it("recognises deployment chunk failures and ignores ordinary errors", () => {
    expect(
      isStaleChunkMessage(
        "Failed to fetch dynamically imported module: https://www.myacademy.my/assets/dashboard-old.js",
      ),
    ).toBe(true);
    expect(
      isStaleChunkMessage(
        'Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/html".',
      ),
    ).toBe(true);
    expect(isStaleChunkMessage("Loading chunk dashboard failed")).toBe(true);
    expect(isStaleChunkMessage("Failed to fetch")).toBe(false);
    expect(isStaleChunkMessage("We couldn't load your Explorer Profile.")).toBe(false);
  });

  it("reloads once, then refuses to loop", () => {
    const { store, reload } = installBrowser();

    expect(recoverFromStaleChunk(new Error("Failed to fetch dynamically imported module"))).toBe(
      true,
    );
    expect(store.get(CHUNK_RECOVERY_STORAGE_KEY)).toBe("1");
    expect(reload).toHaveBeenCalledTimes(1);

    expect(recoverFromStaleChunk(new Error("ChunkLoadError"))).toBe(false);
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("does not reload for a non-chunk error", () => {
    const { reload } = installBrowser();
    expect(recoverFromStaleChunk(new Error("Failed to fetch"))).toBe(false);
    expect(reload).not.toHaveBeenCalled();
  });

  it("clears the marker after a successful boot so a later deploy can recover once", () => {
    const { store, reload } = installBrowser();
    recoverFromStaleChunk(new Error("Importing a module script failed."));
    clearChunkRecoveryMarker();
    expect(store.has(CHUNK_RECOVERY_STORAGE_KEY)).toBe(false);
    expect(recoverFromStaleChunk(new Error("error loading dynamically imported module"))).toBe(
      true,
    );
    expect(reload).toHaveBeenCalledTimes(2);
  });

  it("keeps the pre-module script on the same one-reload guard without touching stored data", () => {
    expect(CHUNK_RECOVERY_INLINE_SCRIPT).toContain(CHUNK_RECOVERY_STORAGE_KEY);
    expect(CHUNK_RECOVERY_INLINE_SCRIPT).toContain("location.reload");
    expect(CHUNK_RECOVERY_INLINE_SCRIPT).not.toContain("localStorage");
    expect(CHUNK_RECOVERY_INLINE_SCRIPT).not.toContain("indexedDB");
    expect(CHUNK_RECOVERY_INLINE_SCRIPT).not.toContain("cookie");

    const store = new Map<string, string>();
    const reload = vi.fn();
    const listeners = new Map<string, (event: { message?: string; reason?: unknown }) => void>();
    vi.stubGlobal("window", {
      addEventListener: (type: string, listener: (event: { message?: string }) => void) => {
        listeners.set(type, listener);
      },
    });
    vi.stubGlobal("sessionStorage", {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
    });
    vi.stubGlobal("location", { reload });

    new Function(CHUNK_RECOVERY_INLINE_SCRIPT)();
    listeners.get("unhandledrejection")?.({
      reason: new Error("Failed to fetch dynamically imported module"),
    });
    listeners.get("error")?.({
      message:
        'Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/html".',
    });

    expect(reload).toHaveBeenCalledTimes(1);
    expect(store.get(CHUNK_RECOVERY_STORAGE_KEY)).toBe("1");
  });
});
