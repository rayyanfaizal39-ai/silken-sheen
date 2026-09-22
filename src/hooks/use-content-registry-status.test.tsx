// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

// Required for React's `act()` to run its async branch correctly outside of
// @testing-library/react (which normally sets this flag itself).
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

// A lightweight stand-in for the real (multi-MB) curriculum registry module,
// so this test exercises useContentRegistryStatus's own loading/ready
// transition logic quickly and deterministically, without depending on the
// real registry's size or content.
const fakeRegistryModule = {
  getRegisteredSubjectChapters: () => [],
  hasFormResourceContent: () => false,
};
vi.mock("@/content/registry", () => fakeRegistryModule);

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

describe("useContentRegistryStatus", () => {
  it("starts loading, with no registry yet", () => {
    let latest: Probe | undefined;
    mount((s) => {
      latest = s;
    });

    expect(latest?.status).toBe("loading");
    expect(latest?.registry).toBeNull();
  });

  it("resolves to 'ready' with the registry once the dynamic import settles", async () => {
    let latest: Probe | undefined;
    mount((s) => {
      latest = s;
    });

    // Immediately after mount, before the import settles, this must read as
    // "loading" — never "error" and never treated as empty/missing content.
    expect(latest?.status).toBe("loading");

    await waitFor(() => latest?.status === "ready");

    expect(latest?.registry).not.toBeNull();
    expect(latest?.registry?.getRegisteredSubjectChapters).toBeInstanceOf(Function);
  });

  it("retry() is safe to call once ready and keeps the registry available", async () => {
    let latest: Probe | undefined;
    mount((s) => {
      latest = s;
    });
    await waitFor(() => latest?.status === "ready");

    act(() => {
      latest?.retry();
    });

    await waitFor(() => latest?.status === "ready");
    expect(latest?.registry).not.toBeNull();
    expect(latest?.registry?.getRegisteredSubjectChapters).toBeInstanceOf(Function);
  });
});
