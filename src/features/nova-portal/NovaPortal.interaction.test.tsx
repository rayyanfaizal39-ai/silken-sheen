// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NovaPortal } from "./NovaPortal";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;
const STUDIO = "https://preview.cards.myacademy.my/studio";
let root: ReturnType<typeof createRoot> | undefined;
let reducedMotion = false;

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal(
    "matchMedia",
    (query: string) =>
      ({ matches: query.includes("reduce") && reducedMotion }) as unknown as MediaQueryList,
  );
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
});
afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = undefined;
  reducedMotion = false;
  document.body.innerHTML = "";
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

async function mount(navigate: (url: string) => void, artworkUrl?: string) {
  const host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await act(async () =>
    root!.render(<NovaPortal studioUrl={STUDIO} artworkUrl={artworkUrl} navigate={navigate} />),
  );
  return host;
}
const enterButton = (host: HTMLElement) =>
  [...host.querySelectorAll("button")].find((b) =>
    /Enter your Nova universe/i.test(b.textContent!),
  )!;

describe("Nova portal entrance", () => {
  it("has one action that opens the portal, then hands off to the Studio in the same tab", async () => {
    const navigate = vi.fn();
    const open = vi.spyOn(window, "open");
    const host = await mount(navigate);
    expect(host.querySelectorAll("button")).toHaveLength(1);
    await act(async () => enterButton(host).click());
    expect(host.querySelector(".nova-portal")!.getAttribute("data-opening")).toBe("true");
    expect(host.textContent).toContain("Opening your Nova universe");
    // A second activation during the animation does not queue another navigation.
    await act(async () => enterButton(host).click());
    await act(async () => vi.advanceTimersByTime(1400));
    expect(navigate).not.toHaveBeenCalled();
    await act(async () => vi.advanceTimersByTime(100));
    expect(navigate).toHaveBeenCalledExactlyOnceWith(STUDIO);
    expect(open).not.toHaveBeenCalled();
  });

  it("keeps the hand-off brief and still for reduced motion", async () => {
    reducedMotion = true;
    const navigate = vi.fn();
    const host = await mount(navigate);
    await act(async () => enterButton(host).click());
    expect(host.querySelector(".nova-portal")!.getAttribute("data-calm")).toBe("true");
    await act(async () => vi.advanceTimersByTime(250));
    expect(navigate).toHaveBeenCalledExactlyOnceWith(STUDIO);
  });

  it("shows a returning student's saved artwork and reopens after Back navigation", async () => {
    const navigate = vi.fn();
    const host = await mount(navigate, "https://storage.test/nova.png");
    expect(host.querySelector(".nova-portal__core img")!.getAttribute("src")).toBe(
      "https://storage.test/nova.png",
    );
    expect(host.textContent).toContain("Your Nova is waiting");
    await act(async () => enterButton(host).click());
    await act(async () => {
      const event = new Event("pageshow") as PageTransitionEvent;
      Object.defineProperty(event, "persisted", { value: true });
      window.dispatchEvent(event);
    });
    expect(host.querySelector(".nova-portal")!.getAttribute("data-opening")).toBe("false");
    expect(enterButton(host).disabled).toBe(false);
  });
});
