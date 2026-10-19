// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CinematicOpening } from "./CinematicOpening";
import { soundscape } from "./audio";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;
let root: ReturnType<typeof createRoot> | undefined;
afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = undefined;
  document.body.innerHTML = "";
  soundscape.dispose();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
async function mount(element: React.ReactNode) {
  const host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await act(async () => root!.render(element));
  return host;
}
describe("Sanctuary interaction lifecycle", () => {
  it("introduces the 12 questions once, then enters the forest without recording an answer", async () => {
    vi.useFakeTimers();
    const start = vi.fn();
    const host = await mount(<CinematicOpening onStartJourney={start} reducedMotion={false} />);
    expect(host.querySelector("h1")?.textContent).toBe("Let's Discover Your Cosmic Companion");
    expect(host.textContent).toContain("Before we begin");
    expect(host.querySelectorAll(".cci-info li")).toHaveLength(4);
    expect(host.querySelectorAll(".cci-info button, .cci-info [role=radio]")).toHaveLength(0);
    expect(host.querySelector("img[src*='companion'], .cci-info img")).toBeNull();
    const begin = [...host.querySelectorAll("button")].find((b) =>
      b.textContent?.includes("Begin My Journey"),
    )!;
    expect(begin.disabled).toBe(false);
    await act(async () => begin.click());
    await act(async () => begin.click());
    expect(host.querySelector(".cci")?.getAttribute("data-entering")).toBe("true");
    await act(async () => vi.advanceTimersByTime(899));
    expect(start).not.toHaveBeenCalled();
    await act(async () => vi.advanceTimersByTime(1));
    expect(start).toHaveBeenCalledTimes(1);
  });
  it("starts the journey immediately with reduced motion", async () => {
    const start = vi.fn();
    const host = await mount(<CinematicOpening onStartJourney={start} reducedMotion />);
    const begin = [...host.querySelectorAll("button")].find((b) =>
      b.textContent?.includes("Begin My Journey"),
    )!;
    await act(async () => begin.click());
    expect(start).toHaveBeenCalledTimes(1);
  });
  it("cancels a pending journey when unmounted", async () => {
    vi.useFakeTimers();
    const start = vi.fn();
    const host = await mount(<CinematicOpening onStartJourney={start} reducedMotion={false} />);
    const begin = [...host.querySelectorAll("button")].find((b) =>
      b.textContent?.includes("Begin My Journey"),
    )!;
    await act(async () => begin.click());
    await act(async () => root!.unmount());
    root = undefined;
    await act(async () => vi.advanceTimersByTime(1000));
    expect(start).not.toHaveBeenCalled();
  });
});
