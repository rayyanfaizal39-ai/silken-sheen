// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("./studio.server", () => ({
  getStudioState: vi.fn(),
  saveStudioDraft: vi.fn(),
  submitStudioOrigin: vi.fn(),
  chooseStudioOrigin: vi.fn(),
}));
vi.mock("./StudioCompletedCard", () => ({ default: () => <p>Saved collectible</p> }));
import StudioPage, { StudioExperience, type StudioApi } from "./StudioPage";
import {
  chooseStudioOrigin,
  getStudioState,
  saveStudioDraft,
  submitStudioOrigin,
} from "./studio.server";
import { NOVA_ACCESS_ERRORS } from "./access";
import { DEMO_CARDS, QUESTIONS, traitsFromAnswers } from "./model";
import type { StudioState } from "./studio-model";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;
const realLocation = window.location;
const navigation = { assign: vi.fn(), reload: vi.fn() };
const roots: ReturnType<typeof createRoot>[] = [];

beforeAll(() => {
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});
beforeEach(() => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  );
  Object.defineProperty(window, "location", {
    configurable: true,
    value: { ...realLocation, search: "", pathname: "/nova/studio", ...navigation },
  });
  vi.mocked(getStudioState).mockRejectedValue(new Error(NOVA_ACCESS_ERRORS.signedOut));
});
afterEach(async () => {
  for (const root of roots) await act(async () => root.unmount());
  roots.length = 0;
  document.body.innerHTML = "";
  Object.defineProperty(window, "location", { configurable: true, value: realLocation });
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

async function render(element: React.ReactNode) {
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  roots.push(root);
  await act(async () => root.render(element));
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  return { host, root };
}
const button = (host: HTMLElement, text: string) =>
  [...host.querySelectorAll("button")].find((b) => b.textContent?.includes(text));
async function click(host: HTMLElement, text: string) {
  const target = button(host, text);
  expect(target, `Missing ${text}`).toBeTruthy();
  await act(async () => target!.click());
}
async function answerAll(host: HTMLElement) {
  for (let i = 0; i < 12; i++) {
    expect(host.querySelector("h1")?.textContent).toBe(QUESTIONS[i].label);
    const option = host.querySelector<HTMLButtonElement>("[data-nova-answer]")!;
    await act(async () => option.click());
  }
}

describe("Guest journey", () => {
  it("sends a signed-out visitor to Upgrade instead of the twelve questions", async () => {
    const { host } = await render(<StudioPage />);
    expect(host.textContent).toContain("An eligible AcadeMY learning plan is required");
    expect(host.querySelector("a")?.getAttribute("href")).toBe(
      "/upgrade?next=%2Fcompanion",
    );
    expect(host.querySelectorAll("[data-nova-answer]")).toHaveLength(0);
    expect(button(host, "Begin My Journey")).toBeUndefined();
    expect(saveStudioDraft).not.toHaveBeenCalled();
    expect(submitStudioOrigin).not.toHaveBeenCalled();
    expect(chooseStudioOrigin).not.toHaveBeenCalled();
  });

  it("still offers Upgrade after a refresh", async () => {
    const first = await render(<StudioPage />);
    expect(first.host.querySelector("a")?.getAttribute("href")).toContain("/upgrade?next=");
    await act(async () => first.root.unmount());
    roots.splice(roots.indexOf(first.root), 1);
    const again = await render(<StudioPage />);
    expect(again.host.textContent).toContain("Explore Nova plans");
    expect(again.host.querySelectorAll("[data-nova-answer]")).toHaveLength(0);
  });

  it("does not transfer answers because the questions never start", async () => {
    const { host } = await render(<StudioPage />);
    expect(host.textContent).not.toContain("Sign in to save my companion");
    expect(saveStudioDraft).not.toHaveBeenCalled();
    expect(submitStudioOrigin).not.toHaveBeenCalled();
  });

  it("never treats an unconfigured or unavailable server as a guest", async () => {
    vi.mocked(getStudioState).mockRejectedValue(new Error(NOVA_ACCESS_ERRORS.unconfigured));
    const { host } = await render(<StudioPage />);
    expect(host.textContent).not.toContain("exploring as a guest");
    expect(button(host, "Begin My Journey")).toBeUndefined();
  });
});

describe("Signed-in journey", () => {
  const answers = Array(12).fill(0);
  const saved = (account: string, patch: Partial<StudioState> = {}): StudioState => ({
    active: true,
    enabled: true,
    draft: { answers, username: DEMO_CARDS[0].username, revision: 3 },
    publicId: DEMO_CARDS[0].publicId,
    identity: { version: "nova-identity-v1", answers, traits: traitsFromAnswers(answers) },
    selected: null,
    origin: {
      status: "running",
      revealAfter: "2099-01-01T00:00:00Z",
      ready: false,
      errorCode: null,
      completed: 1,
    },
    candidates: [],
    account,
    ...patch,
  });
  const api = (states: StudioState[]): StudioApi => {
    let call = 0;
    return {
      load: vi.fn(async () => structuredClone(states[Math.min(call++, states.length - 1)])),
      save: vi.fn(),
      submit: vi.fn(),
      choose: vi.fn(),
    };
  };

  it("restores a saved account journey from the server, with no guest notice", async () => {
    vi.mocked(getStudioState).mockResolvedValue(saved("student-a"));
    const { host } = await render(<StudioPage />);
    expect(host.querySelector("h1")?.textContent).toBe("Your Companion Is Almost Here");
    expect(host.textContent).not.toContain("exploring as a guest");
  });

  it("restores a permanent companion straight to the saved profile", async () => {
    vi.mocked(getStudioState).mockResolvedValue(saved("student-a", { selected: "a" }));
    const { host } = await render(<StudioPage />);
    expect(host.textContent).toContain("Saved collectible");
    expect(host.querySelectorAll("[data-nova-answer]")).toHaveLength(0);
  });

  it("resets instead of showing one student's journey to another who signs in", async () => {
    const studio = api([saved("student-a"), saved("student-b", { selected: "a" })]);
    const { host } = await render(<StudioExperience api={studio} />);
    expect(host.querySelector("h1")?.textContent).toBe("Your Companion Is Almost Here");
    await act(async () => {
      window.dispatchEvent(new Event("focus"));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(navigation.reload).toHaveBeenCalledTimes(1);
    expect(host.textContent).not.toContain("Saved collectible");
  });

  it("clears the screen when the student signs out in another tab", async () => {
    const studio = api([saved("student-a")]);
    const { host } = await render(<StudioExperience api={studio} />);
    vi.mocked(studio.load).mockRejectedValue(new Error(NOVA_ACCESS_ERRORS.signedOut));
    await act(async () => {
      window.dispatchEvent(new Event("focus"));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(navigation.reload).toHaveBeenCalledTimes(1);
    expect(host.textContent).not.toContain("exploring as a guest");
  });
});
