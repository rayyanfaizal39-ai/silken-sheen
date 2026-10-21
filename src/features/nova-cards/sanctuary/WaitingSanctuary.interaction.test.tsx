// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { StudioState } from "../studio-model";
import { malaysiaRevealTime, revealCountdown } from "./reveal-countdown";
import { WaitingSanctuary } from "./WaitingSanctuary";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;
let root: ReturnType<typeof createRoot> | undefined;
afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = undefined;
  document.body.innerHTML = "";
  vi.useRealTimers();
});

type Origin = NonNullable<StudioState["origin"]>;
const NOW = Date.parse("2026-10-19T04:00:00Z");
const origin = (patch: Partial<Origin> = {}): Origin => ({
  status: "running",
  revealAfter: new Date(NOW + (12 * 3600 + 36 * 60 + 22) * 1000).toISOString(),
  ready: false,
  errorCode: null,
  completed: 1,
  ...patch,
});

async function mount(
  o: Origin,
  handlers = { onCheck: vi.fn(), onReveal: vi.fn() },
  hatching = false,
) {
  const host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await act(async () =>
    root!.render(
      <WaitingSanctuary
        origin={o}
        fictional={false}
        calm
        hatching={hatching}
        busy={false}
        learningHref="/dashboard"
        {...handlers}
      />,
    ),
  );
  return host;
}
const steps = (host: HTMLElement) =>
  [...host.querySelectorAll(".cws-step")].map((li) => li.getAttribute("data-state"));

describe("Reveal countdown", () => {
  it("counts down to the existing revealAfter timestamp", () => {
    expect(revealCountdown(origin().revealAfter, NOW)).toEqual({
      kind: "counting",
      days: 0,
      hours: 12,
      minutes: 36,
      seconds: 22,
    });
    expect(revealCountdown("2026-10-21T04:00:01Z", NOW)).toMatchObject({ days: 2, seconds: 1 });
  });

  it("opens at zero and never invents a date when the timestamp is missing or invalid", () => {
    expect(revealCountdown(new Date(NOW).toISOString(), NOW)).toEqual({ kind: "open" });
    expect(revealCountdown("2026-10-18T00:00:00Z", NOW)).toEqual({ kind: "open" });
    expect(revealCountdown("", NOW)).toEqual({ kind: "unknown" });
    expect(revealCountdown("not a date", NOW)).toEqual({ kind: "unknown" });
    expect(revealCountdown(null, NOW)).toEqual({ kind: "unknown" });
  });

  it("shows reveal dates in Malaysia time", () => {
    // 16:00 UTC is midnight the next day in Kuala Lumpur.
    expect(malaysiaRevealTime("2026-10-19T16:00:00Z")).toMatch(/20 October/);
  });
});

describe("Waiting sanctuary", () => {
  it("derives the timeline from the existing origin record while preparing", async () => {
    vi.useFakeTimers({ now: NOW });
    const host = await mount(origin());
    expect(steps(host)).toEqual(["done", "done", "active", "upcoming"]);
    expect(host.textContent).toContain("1 of 2 companion cards prepared");
    expect(host.querySelector(".cws-countdown__time")?.textContent).toMatch(/12h 36m 22s/);
    await act(async () => vi.advanceTimersByTime(2000));
    expect(host.querySelector(".cws-countdown__time")?.textContent).toMatch(/12h 36m 20s/);
    expect(host.querySelector("h1")?.textContent).toBe("Your Companion Is Almost Here");
  });

  it("says the window is open without claiming preparation is finished", async () => {
    vi.useFakeTimers({ now: NOW });
    const host = await mount(origin({ revealAfter: "2026-10-18T00:00:00Z" }));
    expect(host.textContent).toContain(
      "Your reveal window is open. We’re still preparing your companion.",
    );
    expect(steps(host)).toEqual(["done", "done", "active", "upcoming"]);
    expect(host.querySelector(".cws-actions button")?.textContent).toContain("Check arrival");
    expect(host.textContent).not.toContain("Hatch egg");
  });

  it("shows the existing failure information instead of normal progress", async () => {
    const host = await mount(origin({ status: "failed", completed: 0 }));
    expect(steps(host)).toEqual(["done", "done", "failed", "upcoming"]);
    expect(host.textContent).toContain("Generation needs attention");
    expect(host.querySelector(".cws-countdown")).toBeNull();
    expect(host.textContent).toContain("0 of 2 companion cards prepared");
  });

  it("offers the existing reveal action only when the Studio reports ready", async () => {
    const onCheck = vi.fn();
    const onReveal = vi.fn();
    const host = await mount(
      origin({ status: "ready", ready: true, completed: 2, revealAfter: "2026-10-18T00:00:00Z" }),
      { onCheck, onReveal },
    );
    expect(steps(host)).toEqual(["done", "done", "done", "active"]);
    const reveal = host.querySelector<HTMLButtonElement>(".cws-actions button")!;
    expect(reveal.textContent).toContain("Hatch egg");
    await act(async () => reveal.click());
    expect(onReveal).toHaveBeenCalledTimes(1);
    expect(onCheck).not.toHaveBeenCalled();
    expect(host.querySelector("img")).toBeNull();
  });

  it("keeps the approved purple awakening egg while the reveal begins", async () => {
    const host = await mount(
      origin({ status: "ready", ready: true, completed: 2 }),
      { onCheck: vi.fn(), onReveal: vi.fn() },
      true,
    );
    expect(host.querySelector(".sanctuary-egg-awakening")).toBeTruthy();
    expect(host.querySelector(".sanctuary-egg-hatching")).toBeNull();
    expect(host.querySelector(".awk-egg")).toBeTruthy();
  });

  it("Check arrival only asks the Studio to refresh", async () => {
    const onCheck = vi.fn();
    const onReveal = vi.fn();
    const host = await mount(origin(), { onCheck, onReveal });
    await act(async () => host.querySelector<HTMLButtonElement>(".cws-actions button")!.click());
    expect(onCheck).toHaveBeenCalledTimes(1);
    expect(onReveal).not.toHaveBeenCalled();
    expect(host.querySelector<HTMLAnchorElement>(".cws-secondary")?.getAttribute("href")).toBe(
      "/dashboard",
    );
  });
});
