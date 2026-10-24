// @vitest-environment jsdom
// MOCKED integration tests: the Studio driven by realistic `get_my_nova_studio` responses
// (shapes from 20261019120000/130000, specifications from the real cc-matcher-v1). They do
// not exercise a real Supabase account; see docs/cosmic-companion-phase3.md.
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
import type { StudioState } from "./studio-model";
import { traitsFromAnswers } from "./model";
import { matchCompanions } from "../../../supabase/functions/_shared/companion-matcher";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;
const roots: ReturnType<typeof createRoot>[] = [];
beforeAll(() => {
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  );
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
});
afterEach(async () => {
  for (const root of roots) await act(async () => root.unmount());
  roots.length = 0;
  document.body.innerHTML = "";
  sessionStorage.clear();
});

// "Discovering something new" + Fox + Starlight: A = Lumi (Magical Fox), B = Ember (Lion).
const ANSWERS = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];
const [A, B] = matchCompanions(ANSWERS).candidates;
const PAST = "2026-10-01T00:00:00Z";
const FUTURE = "2099-01-01T00:00:00Z";
const ART = [
  { candidate: "a" as const, url: "https://example.test/a.png" },
  { candidate: "b" as const, url: "https://example.test/b.png" },
];
function submitted(over: Partial<StudioState> = {}): StudioState {
  return {
    active: true,
    enabled: true,
    draft: { answers: ANSWERS, username: "Aisyah", revision: 13 },
    publicId: "9b4c6f6e-55e6-4b52-9d5f-3c1c0f6e2a11",
    identity: { version: "nova-identity-v1", answers: ANSWERS, traits: traitsFromAnswers(ANSWERS) },
    selected: null,
    origin: { status: "queued", revealAfter: FUTURE, ready: false, errorCode: null, completed: 0 },
    candidates: [],
    kind: "cosmic-companion",
    companions: [],
    companion: null,
    ...over,
  };
}
/** What the server returns once both conditions hold: both specs and both artworks. */
const ready = (over: Partial<StudioState> = {}) =>
  submitted({
    origin: { status: "ready", revealAfter: PAST, ready: true, errorCode: null, completed: 2 },
    candidates: ART,
    companions: [A, B],
    ...over,
  });
function server(initial: StudioState) {
  let state = initial;
  const api: StudioApi = {
    load: vi.fn(async () => structuredClone(state)),
    save: vi.fn(),
    submit: vi.fn(),
    choose: vi.fn(async (slot) => {
      const chosen = slot === "a" ? A : B;
      state = {
        ...state,
        selected: slot,
        candidates: [],
        companions: [],
        companion: chosen,
        companionArtworkUrl: `https://example.test/chosen-${slot}.png`,
      };
      return structuredClone(state);
    }),
  };
  return { api, set: (s: StudioState) => (state = s) };
}
async function mount(api: StudioApi) {
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  roots.push(root);
  await act(async () => root.render(<StudioExperience api={api} />));
  return host;
}
const button = (scope: ParentNode, text: string) =>
  [...scope.querySelectorAll("button")].find((b) => b.textContent?.includes(text));
async function click(scope: ParentNode, text: string) {
  const target = button(scope, text);
  expect(target, `Missing ${text}`).toBeTruthy();
  await act(async () => target!.click());
}
async function hatch(host: HTMLElement) {
  await click(host, "Hatch egg");
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 5));
  });
}
const text = (host: HTMLElement) => host.textContent ?? "";

describe("Real accounts: Cosmic Identity", () => {
  it("shows the matcher's dominant personality, not question 1 alone", async () => {
    // Q1 says Explorer (4 points); greeting, challenge and bond say Nurturer (6 points).
    const answers = [0, 1, 2, 0, 0, 0, 2, 1, 0, 0, 1, 1];
    const { api } = server({
      ...submitted(),
      publicId: null,
      identity: null,
      origin: null,
      kind: null,
      draft: { answers, username: "Aisyah", revision: 12 },
    });
    const host = await mount(api);
    expect(traitsFromAnswers(answers).personality).toBe("Explorer");
    const personality = [...host.querySelectorAll("dt")].find(
      (d) => d.textContent === "Personality",
    )?.nextElementSibling?.textContent;
    expect(personality).toContain("Nurturer");
    // The caption cites the answers behind that personality, never contradicting it.
    expect(personality).toContain("“Bring friends together”");
    expect(personality).not.toContain("Discovering something new");
  });
});

describe("Real accounts: one companion", () => {
  const summoned = () =>
    submitted({
      selected: "a",
      companion: A,
      companions: [A, B],
      origin: { status: "queued", revealAfter: PAST, ready: false, errorCode: null, completed: 0 },
    });

  it("shows the preference companion and the portrait wait, never the other companion", async () => {
    const { api } = server(summoned());
    const host = await mount(api);
    expect(host.querySelector("h1")?.textContent).toBe(`Your ${A.name}`);
    expect(text(host)).toContain(A.species);
    expect(text(host)).toContain(A.element);
    expect(host.querySelector(".ccprof-story p")?.textContent).toBe(A.story);
    expect(text(host)).toContain(A.traits[0]);
    expect(host.querySelector(".ccprof-match p")?.textContent).toBe(A.match.headline);
    expect(
      [...host.querySelectorAll(".ccprof-reasons li")].map((item) => item.textContent),
    ).toEqual(
      A.match.reasons
        .filter((reason) => reason.basis !== "difference")
        .map((reason) => reason.text),
    );
    expect(host.querySelector("[data-portrait-status]")?.textContent).toBe(
      "Your portrait is being crafted.",
    );
    expect(text(host)).not.toContain(B.name);
    expect(button(host, "Choose Companion")).toBeUndefined();
    expect(button(host, "Hatch egg")).toBeUndefined();
    expect(api.choose).not.toHaveBeenCalled();
  });

  it("keeps the preference companion when the server also sends the other candidate", async () => {
    const { api } = server(ready());
    const host = await mount(api);
    expect(host.querySelector("h1")?.textContent).toBe(`Your ${A.name}`);
    expect(host.querySelectorAll(".occ-card")).toHaveLength(1);
    expect(text(host)).not.toContain(B.name);
    expect(api.choose).not.toHaveBeenCalled();
  });

  it("returns a selected student straight to their permanent companion", async () => {
    const { api } = server(
      submitted({
        selected: "a",
        companion: A,
        companionArtworkUrl: "https://example.test/chosen-a.png",
        origin: { status: "ready", revealAfter: PAST, ready: true, errorCode: null, completed: 2 },
      }),
    );
    const host = await mount(api);
    expect(host.querySelector("h1")?.textContent).toBe(`Your ${A.name}`);
    expect(host.querySelectorAll("[data-nova-answer]")).toHaveLength(0);
    expect(text(host)).not.toContain(B.name);
  });
});

describe("Real accounts: expired subscription", () => {
  it("keeps a summoned companion viewable without a second choice", async () => {
    const { api } = server(
      submitted({
        active: false,
        selected: "a",
        companion: A,
        companions: [A, B],
      }),
    );
    const host = await mount(api);
    expect(host.querySelector("h1")?.textContent).toBe(`Your ${A.name}`);
    expect(text(host)).not.toContain(B.name);
    expect(text(host)).not.toContain("learning plan is required");
    expect(api.choose).not.toHaveBeenCalled();
  });

  it("keeps a chosen companion viewable", async () => {
    const { api } = server(
      submitted({ active: false, selected: "b", companion: B, companionArtworkUrl: "x.png" }),
    );
    const host = await mount(api);
    expect(host.querySelector("h1")?.textContent).toBe(`Your ${B.name}`);
    expect(text(host)).not.toContain("learning plan is required");
  });
});

describe("Legacy cards", () => {
  const legacy = (over: Partial<StudioState> = {}) =>
    submitted({ kind: "legacy", companions: [], companion: null, ...over });

  it("keep their existing two-artwork reveal of the saved identity", async () => {
    const { api } = server(
      legacy({
        origin: { status: "ready", revealAfter: PAST, ready: true, errorCode: null, completed: 2 },
        candidates: ART,
      }),
    );
    const host = await mount(api);
    await hatch(host);
    const cards = [...host.querySelectorAll(".occ-card")];
    expect(cards).toHaveLength(2);
    expect(text(host)).toContain(traitsFromAnswers(ANSWERS).creature);
    expect(text(host)).not.toContain(A.name);
  });

  it("keep their existing saved-card presentation once chosen", async () => {
    const { api } = server(legacy({ selected: "a" }));
    const host = await mount(api);
    expect(text(host)).toContain("Saved collectible");
    expect(host.querySelector(".ccprof--candidate")).toBeNull();
  });
});
