// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
vi.mock("./studio.server", () => ({
  getStudioState: vi.fn(),
  saveStudioDraft: vi.fn(),
  submitStudioOrigin: vi.fn(),
  chooseStudioOrigin: vi.fn(),
  requestStudioEvolution: vi.fn(),
}));
vi.mock("./StudioCompletedCard", () => ({ default: () => <p>Saved collectible</p> }));
import { StudioExperience, type StudioApi } from "./StudioPage";
import { AWAKENING_TITLE, ARRIVED, studioStatus, type StudioState } from "./studio-model";
import { DEMO_CARDS, QUESTIONS, traitsFromAnswers } from "./model";
const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;
beforeAll(() => {
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
    this.querySelector<HTMLButtonElement>("button")?.focus();
  };
  HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  );
});
const roots: ReturnType<typeof createRoot>[] = [];
afterEach(async () => {
  for (const root of roots) await act(async () => root.unmount());
  roots.length = 0;
  document.body.innerHTML = "";
});
function harness(profile = 0) {
  let state: StudioState = {
    active: true,
    enabled: true,
    draft: { answers: [], username: DEMO_CARDS[profile].username, revision: 0 },
    publicId: null,
    identity: null,
    selected: null,
    xp: 0,
    earnedStage: 1,
    origin: null,
    candidates: [],
    evolutions: [],
  };
  const api: StudioApi = {
    load: async () => structuredClone(state),
    save: vi.fn(async (d) => {
      state = { ...state, draft: { ...d, revision: d.revision + 1 } };
      return state.draft;
    }),
    submit: vi.fn(async () => {
      state = {
        ...state,
        publicId: DEMO_CARDS[profile].publicId,
        identity: {
          version: "nova-identity-v1",
          answers: state.draft.answers,
          traits: traitsFromAnswers(state.draft.answers),
        },
        origin: {
          status: "running",
          revealAfter: "2026-10-17T16:00:00Z",
          ready: false,
          errorCode: null,
          completed: 0,
        },
      };
      return structuredClone(state);
    }),
    choose: vi.fn(async (candidate) => {
      state = { ...state, selected: candidate, candidates: [] };
      return structuredClone(state);
    }),
    evolve: vi.fn(),
  };
  const mount = async () => {
    const host = document.createElement("div");
    document.body.append(host);
    const root = createRoot(host);
    roots.push(root);
    await act(async () => root.render(<StudioExperience api={api} />));
    return { host, root };
  };
  return {
    api,
    mount,
    get: () => state,
    set: (s: Partial<StudioState>) => {
      state = { ...state, ...s };
    },
  };
}
async function click(host: HTMLElement, text: string) {
  const button = [...host.querySelectorAll("button")].find((b) => b.textContent?.includes(text));
  expect(button, `Missing ${text}`).toBeTruthy();
  await act(async () => button!.click());
}
describe("Standalone Nova Studio journey", () => {
  it("renders exactly two accessible creature choices with local artwork and descriptions", async () => {
    const h = harness();
    h.set({ draft: { answers: [0], username: "Rayyan", revision: 1 } });
    const { host } = await h.mount();
    const choices = [...host.querySelectorAll<HTMLButtonElement>("[data-nova-answer]")];
    expect(choices.map((c) => c.getAttribute("aria-label"))).toEqual(["Phoenix", "Magical Fox"]);
    expect(choices.every((c) => c.type === "button" && !c.disabled)).toBe(true);
    expect(choices.map((c) => c.querySelector("img")?.getAttribute("src"))).toEqual([
      "/nova/creatures/phoenix.svg",
      "/nova/creatures/fox.svg",
    ]);
    expect(host.textContent).toContain("A legendary companion born from magical flames.");
    expect(host.textContent).toContain("A mystical companion filled with wisdom and wonder.");
    expect(choices.every((c) => c.getAttribute("aria-pressed") === "false")).toBe(true);
  });
  it("resumes a complete legacy Phoenix draft without normalizing its original answers", async () => {
    const h = harness();
    const answers = Array(12).fill(0);
    answers[1] = 2;
    h.set({ draft: { answers, username: "Rayyan", revision: 5 } });
    const { host } = await h.mount();
    expect(host.textContent).toContain("Phoenix");
    await click(host, "Confirm my identity");
    await click(host, "SUMMON MY NOVA");
    expect(h.get().identity?.answers).toEqual(answers);
    expect(h.get().identity?.traits.creature).toBe("Phoenix");
  });
  for (const profile of [0, 1])
    it(`saves all 12 ${DEMO_CARDS[profile].traits.creature} choices across remount, reveals two and permanently confirms one`, async () => {
      const h = harness(profile);
      let { host, root } = await h.mount();
      await click(host, "Skip Intro");
      const answers = profile ? [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0] : Array(12).fill(0);
      for (let i = 0; i < 12; i++) {
        expect(host.querySelector("h1")?.textContent).toBe(QUESTIONS[i].label);
        const options = host.querySelectorAll<HTMLButtonElement>("[data-nova-answer]");
        await act(async () => options[answers[i]].click());
        if (i === 4) {
          await act(async () => root.unmount());
          roots.splice(roots.indexOf(root), 1);
          ({ host, root } = await h.mount());
        }
      }
      expect(h.get().draft.answers).toEqual(answers);
      expect(host.textContent).toContain(DEMO_CARDS[profile].traits.creature);
      await click(host, "Confirm my identity");
      expect(h.api.submit).not.toHaveBeenCalled();
      await click(host, "SUMMON MY NOVA");
      expect(h.api.submit).toHaveBeenCalledTimes(1);
      expect(host.textContent).toContain(AWAKENING_TITLE);
      expect(host.querySelectorAll(".sanctuary-candidate-art>img:first-child")).toHaveLength(0);
      h.set({
        origin: { ...h.get().origin!, status: "ready", ready: true, completed: 2 },
        candidates: [
          { candidate: "a", url: "https://example.test/private-a.png" },
          { candidate: "b", url: "https://example.test/private-b.png" },
        ],
      });
      expect(studioStatus(h.get())).toBe(ARRIVED);
      await click(host, "Check arrival");
      await click(host, "Hatch egg");
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 5));
      });
      expect(host.querySelectorAll(".sanctuary-candidate-art>img:first-child")).toHaveLength(2);
      await click(host, "Choose this Nova");
      expect(h.api.choose).not.toHaveBeenCalled();
      await click(host, "Confirm my permanent Nova");
      expect(h.api.choose).toHaveBeenCalledExactlyOnceWith("a");
      expect(host.textContent).toContain("Your Origin choice is permanent");
      expect(h.get().selected).toBe("a");
    });
  it("does not advance a question when durable saving fails", async () => {
    const h = harness();
    h.api.save = vi.fn(async () => {
      throw new Error("Your answers changed on another device. Refresh to continue.");
    });
    const { host } = await h.mount();
    await click(host, "Skip Intro");
    await click(host, "Discovering something new");
    expect(host.querySelector("h1")?.textContent).toBe(QUESTIONS[0].label);
    expect(host.textContent).toContain("another device");
  });
  it("keeps submission disabled until generation has been explicitly enabled", async () => {
    const h = harness();
    h.set({
      enabled: false,
      draft: { answers: Array(12).fill(0), username: "Rayyan", revision: 1 },
    });
    const { host } = await h.mount();
    await click(host, "Confirm my identity");
    const submit = [...host.querySelectorAll("button")].find((b) =>
      b.textContent?.includes("SUMMON MY NOVA"),
    )!;
    expect(submit.disabled).toBe(true);
    expect(host.textContent).toContain("no paid request has been made");
    expect(h.api.submit).not.toHaveBeenCalled();
  });
  it("hides candidate images when a subscription expires before reveal", async () => {
    const h = harness();
    h.set({
      active: false,
      selected: "a",
      origin: {
        status: "ready",
        revealAfter: "2026-10-16T16:00:00Z",
        ready: false,
        errorCode: null,
        completed: 2,
      },
    });
    const { host } = await h.mount();
    expect(host.textContent).toContain("active Pro or Premium subscription");
    expect(host.querySelectorAll(".sanctuary-candidate-art>img:first-child")).toHaveLength(0);
    expect(h.api.choose).not.toHaveBeenCalled();
  });
});
