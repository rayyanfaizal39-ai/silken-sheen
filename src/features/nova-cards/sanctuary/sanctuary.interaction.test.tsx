// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CinematicOpening } from "./CinematicOpening";
import { OriginReveal } from "./OriginReveal";
import { soundscape } from "./audio";
import { DEMO_CARDS } from "../model";

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
  it("reveals the intro on schedule and cancels a pending journey when unmounted", async () => {
    vi.useFakeTimers();
    const start = vi.fn();
    const host = await mount(
      <CinematicOpening onStartJourney={start} onSkipIntro={vi.fn()} reducedMotion={false} />,
    );
    const begin = [...host.querySelectorAll("button")].find((b) =>
      b.textContent?.includes("Begin Your Journey"),
    )!;
    expect(begin.disabled).toBe(true);
    await act(async () => vi.advanceTimersByTime(3800));
    expect(begin.disabled).toBe(false);
    await act(async () => begin.click());
    await act(async () => root!.unmount());
    root = undefined;
    await act(async () => vi.advanceTimersByTime(1000));
    expect(start).not.toHaveBeenCalled();
  });
  it("supports cancelling a permanent choice and retrying a failed confirmation", async () => {
    HTMLDialogElement.prototype.showModal = function () {
      this.open = true;
    };
    HTMLDialogElement.prototype.close = function () {
      this.open = false;
    };
    const choose = vi.fn(async () => false);
    const host = await mount(
      <OriginReveal
        traits={DEMO_CARDS[0].traits}
        candidates={[
          { candidate: "a", url: "https://example.test/a.png" },
          { candidate: "b", url: "https://example.test/b.png" },
        ]}
        busy={false}
        error=""
        onChoose={choose}
      />,
    );
    const trigger = [...host.querySelectorAll("button")].find((b) =>
      b.textContent?.includes("Choose this Nova"),
    )!;
    await act(async () => trigger.click());
    expect(host.querySelector("dialog")?.open).toBe(true);
    await act(async () =>
      host.querySelector("dialog")!.dispatchEvent(new Event("cancel", { cancelable: true })),
    );
    expect(host.querySelector("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(choose).not.toHaveBeenCalled();
    await act(async () => trigger.click());
    const confirm = [...host.querySelectorAll("button")].find((b) =>
      b.textContent?.includes("Confirm my permanent Nova"),
    )!;
    await act(async () => confirm.click());
    expect(choose).toHaveBeenCalledExactlyOnceWith("a");
    expect(host.querySelector("dialog")?.open).toBe(true);
    expect(confirm.disabled).toBe(false);
  });
});
