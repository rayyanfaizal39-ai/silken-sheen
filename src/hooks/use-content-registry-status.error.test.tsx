// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

// Required for React's `act()` to run its async branch correctly outside of
// @testing-library/react (which normally sets this flag itself).
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

// Simulate the registry chunk failing to load (offline, bad deploy, etc.).
// useContentRegistryStatus must surface this as a real "error" state instead
// of leaving the page stuck looking like "still loading" or, worse, silently
// treated as "no quizzes for this chapter".
vi.mock("@/content/registry", () => {
  throw new Error("Failed to fetch dynamically imported module");
});

import { useContentRegistryStatus, type ContentRegistryStatus } from "@/hooks/use-content-registry";
import type { ContentRegistryModule } from "@/hooks/use-content-registry";

type Probe = {
  registry: ContentRegistryModule | null;
  status: ContentRegistryStatus;
  retry: () => void;
};

let container: HTMLDivElement | null = null;
let root: Root | null = null;

afterEach(() => {
  if (root) act(() => root!.unmount());
  container?.remove();
  container = null;
  root = null;
});

function mount(onUpdate: (state: Probe) => void) {
  function ProbeComponent() {
    const state = useContentRegistryStatus();
    onUpdate(state);
    return null;
  }
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => {
    root!.render(<ProbeComponent />);
  });
}

// Deliberately NOT wrapped in act(): the state update this waits for comes
// from a promise `.then()` outside any user-fired event, so it resolves via
// React's normal scheduling as soon as the microtask runs — polling for it
// from inside act() causes React's act-scope tracking to hang instead.
async function waitFor(predicate: () => boolean, timeoutMs = 5000) {
  const start = Date.now();
  while (!predicate()) {
    if (Date.now() - start > timeoutMs) {
      throw new Error("waitFor timed out");
    }
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
}

describe("useContentRegistryStatus — load failure", () => {
  it("surfaces status 'error' (not silently 'no quizzes') when the chunk fails to load", async () => {
    let latest: Probe | undefined;
    mount((s) => {
      latest = s;
    });

    await waitFor(() => latest?.status === "error");
    expect(latest?.registry).toBeNull();
  });

  it("retry() clears the error and goes back to loading so the fetch runs again", async () => {
    let latest: Probe | undefined;
    mount((s) => {
      latest = s;
    });
    await waitFor(() => latest?.status === "error");

    act(() => {
      latest?.retry();
    });

    // The retry synchronously puts the hook back into "loading" for the new
    // attempt — this is what lets the page show a fresh loading state
    // instead of instantly re-showing the same stale error.
    expect(latest?.status).toBe("loading");

    // The mocked module keeps failing, so the retry eventually surfaces the
    // error again rather than hanging forever.
    await waitFor(() => latest?.status === "error");
  });
});
