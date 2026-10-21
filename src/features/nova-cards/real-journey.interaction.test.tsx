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

describe("Real accounts: Waiting Sanctuary", () => {
  it("waits for the 24-hour minimum without revealing either companion", async () => {
    const { api } = server(submitted());
    const host = await mount(api);
    expect(host.querySelector("h1")?.textContent).toBe("Your Companion Is Almost Here");
    expect(button(host, "Hatch egg")).toBeUndefined();
    for (const c of [A, B]) expect(text(host)).not.toContain(c.name);
  });

  it("keeps waiting, with a friendly message, when 24 hours have passed but artwork is not ready", async () => {
    const { api } = server(submitted({ origin: { ...submitted().origin!, revealAfter: PAST } }));
    const host = await mount(api);
    expect(text(host)).toMatch(/still preparing/i);
    expect(button(host, "Hatch egg")).toBeUndefined();
    expect(host.querySelectorAll(".occ-card")).toHaveLength(0);
  });

  it("explains a delay or failure without exposing companions", async () => {
    const { api } = server(
      submitted({
        origin: { status: "failed", revealAfter: PAST, ready: false, errorCode: "x", completed: 0 },
      }),
    );
    const host = await mount(api);
    expect(host.querySelector("h1")?.textContent).toBe("Your Companion Needs A Little More Care");
    for (const c of [A, B]) expect(text(host)).not.toContain(c.name);
  });

  it("never opens a reveal without both stored companions, even if marked ready", async () => {
    const { api } = server(ready({ companions: [] }));
    const host = await mount(api);
    await click(host, "Hatch egg");
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 5));
    });
    expect(host.querySelectorAll(".occ-card")).toHaveLength(0);
    expect(api.choose).not.toHaveBeenCalled();
  });

  it("checks arrival against the server and reveals once it is ready", async () => {
    const s = server(submitted());
    const host = await mount(s.api);
    s.set(ready());
    await click(host, "Check arrival");
    await hatch(host);
    expect(host.querySelectorAll(".occ-card")).toHaveLength(2);
  });
});

describe("Real accounts: two independent companions", () => {
  it("coordinates one purple-egg dissolve with two inert cards and an immediate skip", async () => {
    vi.mocked(window.matchMedia).mockReturnValueOnce({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList);
    const { api } = server(ready());
    const host = await mount(api);

    await click(host, "Hatch egg");
    expect(host.querySelector(".companion-reveal-flow")?.getAttribute("data-reveal")).toBe(
      "hatching",
    );
    expect(host.querySelector(".sanctuary-egg-awakening")).toBeTruthy();
    expect(host.querySelector(".sanctuary-egg-hatching")).toBeNull();
    expect(host.querySelectorAll(".occ-card")).toHaveLength(2);
    expect(host.querySelector(".occ")?.hasAttribute("inert")).toBe(true);
    expect(button(host, "Hatch egg")?.hasAttribute("disabled")).toBe(true);

    await click(host, "Skip reveal");
    expect(host.querySelector(".companion-reveal-flow")?.getAttribute("data-reveal")).toBe(
      "revealed",
    );
    expect(host.querySelector(".occ")?.hasAttribute("inert")).toBe(false);
    expect(button(host, "Skip reveal")).toBeUndefined();
  });

  it("shows each companion's own stored identity and artwork", async () => {
    const { api } = server(ready());
    const host = await mount(api);
    await hatch(host);
    const cards = [...host.querySelectorAll(".occ-card")];
    expect(cards.map((c) => c.querySelector("h2")?.textContent)).toEqual([A.name, B.name]);
    expect(cards.map((c) => c.querySelector("img")?.getAttribute("src"))).toEqual([
      ART[0].url,
      ART[1].url,
    ]);
    for (const c of [A, B])
      for (const value of [c.species, c.element, c.personality, c.learningStyle, c.tagline])
        expect(text(host)).toContain(value);
    // Never the old shared identity: the legacy notice and its traits are absent.
    expect(host.querySelector(".occ-shared")).toBeNull();
    expect(text(host)).not.toContain(traitsFromAnswers(ANSWERS).marking);
    expect(text(host)).not.toMatch(/Fictional preview/);
  });

  it("explores a companion with its own matching explanation", async () => {
    const { api } = server(ready());
    const host = await mount(api);
    await hatch(host);
    await act(async () => host.querySelectorAll<HTMLButtonElement>(".occ-explore")[1].click());
    const dialog = host.querySelector("dialog[open]")!;
    expect(dialog.textContent).toContain(B.name);
    expect(dialog.textContent).toContain(B.match.headline);
    expect(dialog.textContent).not.toContain(A.match.headline);
  });

  it("permanently confirms Companion B and shows only Companion B", async () => {
    const { api } = server(ready());
    const host = await mount(api);
    await hatch(host);
    await click(host, "Choose Companion B");
    await click(host, "Confirm My Companion");
    expect(api.choose).not.toHaveBeenCalled();
    await click(host.querySelector("dialog")!, "Confirm my companion");
    expect(api.choose).toHaveBeenCalledExactlyOnceWith("b");
    expect(host.querySelector("h1")?.textContent).toBe(`Your ${B.name}`);
    expect(host.querySelector(".ccprof-story p")?.textContent).toBe(B.story);
    expect(host.querySelector(".ccprof-match p")?.textContent).toBe(B.match.headline);
    // Every reason except the one comparing B with A by name.
    expect([...host.querySelectorAll(".ccprof-reasons li")].map((l) => l.textContent)).toEqual(
      B.match.reasons.filter((r) => r.basis !== "difference").map((r) => r.text),
    );
    expect(host.querySelector(".ccprof-card img")?.getAttribute("src")).toBe(
      "https://example.test/chosen-b.png",
    );
    expect(text(host)).not.toContain(A.name);
    expect(text(host)).not.toContain("Saved collectible");
    expect(host.querySelector<HTMLAnchorElement>(".ccprof-link")?.textContent).toMatch(/QR/);
    expect(button(host, "Choose Companion")).toBeUndefined();
  });

  it("shows a choice failure without changing anything", async () => {
    const s = server(ready());
    s.api.choose = vi.fn(async () => {
      throw new Error("Your choice could not be saved. Refresh to check readiness.");
    });
    const host = await mount(s.api);
    await hatch(host);
    await click(host, "Choose Companion A");
    await click(host, "Confirm My Companion");
    await click(host.querySelector("dialog")!, "Confirm my companion");
    expect(text(host)).toContain("could not be saved");
    expect(host.querySelectorAll(".occ-card")).toHaveLength(2);
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
  it("can still reveal and choose a validly submitted journey", async () => {
    const { api } = server(ready({ active: false }));
    const host = await mount(api);
    await hatch(host);
    await click(host, "Choose Companion A");
    await click(host, "Confirm My Companion");
    await click(host.querySelector("dialog")!, "Confirm my companion");
    expect(host.querySelector("h1")?.textContent).toBe(`Your ${A.name}`);
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
