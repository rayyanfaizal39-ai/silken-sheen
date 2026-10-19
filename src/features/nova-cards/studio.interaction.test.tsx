// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
vi.mock("./studio.server", () => ({
  getStudioState: vi.fn(),
  saveStudioDraft: vi.fn(),
  submitStudioOrigin: vi.fn(),
  chooseStudioOrigin: vi.fn(),
}));
vi.mock("./StudioCompletedCard", () => ({ default: () => <p>Saved collectible</p> }));
import { StudioExperience, type StudioApi } from "./StudioPage";
import { ARRIVED, studioStatus, type StudioState } from "./studio-model";
import { DEMO_CARDS, QUESTIONS, traitsFromAnswers, answerOptionIndex } from "./model";
import { NOVA_ACCESS_ERRORS } from "./access";
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
    origin: null,
    candidates: [],
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
  it("renders exactly five accessible text-only creature choices", async () => {
    const h = harness();
    h.set({ draft: { answers: [0], username: "Rayyan", revision: 1 } });
    const { host } = await h.mount();
    const choices = [...host.querySelectorAll<HTMLButtonElement>("[data-nova-answer]")];
    expect(choices.map((c) => c.textContent)).toEqual([
      "Phoenix",
      "Magical Fox",
      "Dragon",
      "Lion",
      "Unicorn",
    ]);
    expect(choices.every((c) => c.type === "button" && !c.disabled)).toBe(true);
    expect(choices.every((c) => !c.querySelector("img, svg, canvas"))).toBe(true);
    expect(choices.every((c) => c.getAttribute("aria-pressed") === "false")).toBe(true);
  });
  it("resumes a complete legacy Phoenix draft without normalizing its original answers", async () => {
    const h = harness();
    const answers = Array(12).fill(0);
    answers[1] = 2;
    h.set({ draft: { answers, username: "Rayyan", revision: 5 } });
    const { host } = await h.mount();
    expect(host.textContent).toContain("Phoenix");
    await click(host, "Continue my journey");
    await click(host, "Summon my companion");
    expect(h.get().identity?.answers).toEqual(answers);
    expect(h.get().identity?.traits.creature).toBe("Phoenix");
  });
  for (const [creatureCode, creature] of [
    [0, "Phoenix"],
    [1, "Magical Fox"],
    [3, "Dragon"],
    [4, "Lion"],
    [5, "Unicorn"],
  ] as const)
    it(`saves all 12 ${creature} choices across remount, reveals two and permanently confirms one`, async () => {
      const profile = creatureCode === 1 ? 1 : 0;
      const h = harness(profile);
      let { host, root } = await h.mount();
      await click(host, "Begin My Journey");
      const answers =
        creatureCode >= 3
          ? Array(12).fill(3)
          : profile
            ? [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0]
            : Array(12).fill(0);
      answers[1] = creatureCode;
      for (let i = 0; i < 12; i++) {
        expect(host.querySelector("h1")?.textContent).toBe(QUESTIONS[i].label);
        const options = host.querySelectorAll<HTMLButtonElement>("[data-nova-answer]");
        expect([...options].map((option) => option.textContent)).toEqual(QUESTIONS[i].options);
        expect([...options].every((option) => !option.querySelector("img, svg, canvas"))).toBe(
          true,
        );
        await act(async () => options[answerOptionIndex(i, answers[i])].click());
        if (i === 4) {
          await act(async () => root.unmount());
          roots.splice(roots.indexOf(root), 1);
          ({ host, root } = await h.mount());
        }
      }
      expect(h.get().draft.answers).toEqual(answers);
      expect(host.textContent).toContain(creature);
      await click(host, "Continue my journey");
      expect(h.api.submit).not.toHaveBeenCalled();
      await click(host, "Summon my companion");
      expect(h.api.submit).toHaveBeenCalledTimes(1);
      expect(h.get().identity?.traits).toEqual(traitsFromAnswers(answers));
      expect(host.querySelector("h1")?.textContent).toBe("Your Companion Is Almost Here");
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
      await click(host, "Choose Companion A");
      await click(host, "Confirm My Companion");
      expect(h.api.choose).not.toHaveBeenCalled();
      await click(host, "Confirm my companion");
      expect(h.api.choose).toHaveBeenCalledExactlyOnceWith("a");
      expect(host.textContent).toContain("Your companion choice is permanent");
      expect(h.get().selected).toBe("a");
    });
  it("does not advance a question when durable saving fails", async () => {
    const h = harness();
    h.api.save = vi.fn(async () => {
      throw new Error("Your answers changed on another device. Refresh to continue.");
    });
    const { host } = await h.mount();
    await click(host, "Begin My Journey");
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
    await click(host, "Continue my journey");
    const submit = [...host.querySelectorAll("button")].find((b) =>
      b.textContent?.includes("Summon my companion"),
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
describe("Studio access problems", () => {
  for (const [message, problem, heading, action] of [
    [
      NOVA_ACCESS_ERRORS.signedOut,
      "signedOut",
      "Sign in to enter your Nova universe",
      "Sign in to begin",
    ],
    [
      NOVA_ACCESS_ERRORS.unconfigured,
      "unconfigured",
      "AcadeMY Cards isn't connected here",
      "Try again",
    ],
    [
      NOVA_ACCESS_ERRORS.storagePending,
      "storagePending",
      "Nova Studio isn't open yet",
      "Try again",
    ],
    ["Failed to fetch", "unavailable", "We couldn't verify your Nova access", "Try again"],
  ] as const)
    it(`explains ${problem} before the opening plays`, async () => {
      const api: StudioApi = {
        load: vi.fn(async () => {
          throw new Error(message);
        }),
        save: vi.fn(),
        submit: vi.fn(),
        choose: vi.fn(),
      };
      const host = document.createElement("div");
      document.body.append(host);
      const root = createRoot(host);
      roots.push(root);
      await act(async () => root.render(<StudioExperience api={api} />));
      const panel = host.querySelector("[data-access-problem]")!;
      expect(panel.getAttribute("data-access-problem")).toBe(problem);
      expect(panel.querySelector("h1")!.textContent).toBe(heading);
      expect(panel.querySelector(".sanctuary-primary")!.textContent).toContain(action);
      expect(host.querySelector(".sanctuary-opening")).toBeNull();
      expect(host.textContent).not.toContain("Begin My Journey");
    });
});
describe("Studio while generation is disabled", () => {
  it("saves the identity without promising artwork or allowing a summon", async () => {
    const h = harness();
    h.set({
      enabled: false,
      draft: { answers: Array(12).fill(0), username: "Rayyan", revision: 3 },
    });
    const { host } = await h.mount();
    await click(host, "Continue my journey");
    expect(host.textContent).toContain("Origin artwork creation has not launched yet");
    expect(host.textContent).not.toContain("Return tomorrow");
    const summon = [...host.querySelectorAll("button")].find((b) =>
      b.textContent?.includes("Summon my companion"),
    )!;
    expect(summon.disabled).toBe(true);
    expect(h.api.submit).not.toHaveBeenCalled();
  });
});
describe("Permanent discovery journey for returning students", () => {
  const answers = Array(12).fill(0);
  const submitted = (origin: Partial<NonNullable<StudioState["origin"]>> = {}) => ({
    publicId: DEMO_CARDS[0].publicId,
    identity: { version: "nova-identity-v1", answers, traits: traitsFromAnswers(answers) },
    origin: {
      status: "running",
      revealAfter: "2099-01-01T00:00:00Z",
      ready: false,
      errorCode: null,
      completed: 1,
      ...origin,
    },
  });
  const noQuestions = (host: HTMLElement) => {
    expect(host.querySelectorAll("[data-nova-answer]")).toHaveLength(0);
    expect(host.textContent).not.toContain("Begin My Journey");
    expect(host.textContent).not.toContain("Review answers");
  };

  it("resumes unfinished discovery at the next saved question without restarting", async () => {
    const h = harness();
    h.set({ draft: { answers: answers.slice(0, 6), username: "Rayyan", revision: 4 } });
    const { host } = await h.mount();
    expect(host.querySelector("h1")?.textContent).toBe(QUESTIONS[6].label);
    expect(host.textContent).not.toContain("Begin My Journey");
    expect(h.api.save).not.toHaveBeenCalled();
    expect(h.get().draft.answers).toEqual(answers.slice(0, 6));
  });

  it("sends a submitted student straight to the waiting sanctuary with no way to retake", async () => {
    const h = harness();
    h.set(submitted());
    const { host } = await h.mount();
    expect(host.querySelector("h1")?.textContent).toBe("Your Companion Is Almost Here");
    noQuestions(host);
    await click(host, "Check arrival");
    expect(h.api.submit).not.toHaveBeenCalled();
    expect(h.api.save).not.toHaveBeenCalled();
    expect(host.querySelector("h1")?.textContent).toBe("Your Companion Is Almost Here");
  });

  it("never offers the reveal before the Studio reports both companions ready", async () => {
    const h = harness();
    h.set(submitted({ revealAfter: "2000-01-01T00:00:00Z", completed: 1 }));
    const { host } = await h.mount();
    expect(host.textContent).toContain("Your reveal window is open");
    expect(host.textContent).not.toContain("Hatch egg");
  });

  it("lets a ready student reach the two-companion choice without choosing for them", async () => {
    const h = harness();
    h.set({
      ...submitted({ status: "ready", ready: true, completed: 2 }),
      candidates: [
        { candidate: "a", url: "https://example.test/a.png" },
        { candidate: "b", url: "https://example.test/b.png" },
      ],
    });
    const { host } = await h.mount();
    noQuestions(host);
    await click(host, "Hatch egg");
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 5));
    });
    expect(host.querySelector("h1")?.textContent).toBe("Two Companions. One Lifelong Bond.");
    expect(host.querySelectorAll(".sanctuary-candidate-art>img:first-child")).toHaveLength(2);
    expect(h.api.choose).not.toHaveBeenCalled();
  });

  it("takes a permanently bonded student directly to their companion profile", async () => {
    const h = harness();
    h.set({ ...submitted({ status: "ready", ready: true, completed: 2 }), selected: "a" });
    const { host } = await h.mount();
    expect(host.textContent).toContain("Saved collectible");
    expect(host.textContent).toContain("Your companion choice is permanent");
    noQuestions(host);
    expect(
      host.querySelector(".sanctuary-egg-awakening, .cws, .sanctuary-candidate-art"),
    ).toBeNull();
    expect(host.textContent).not.toContain("Choose Companion A");
    expect(h.api.choose).not.toHaveBeenCalled();
  });
});
