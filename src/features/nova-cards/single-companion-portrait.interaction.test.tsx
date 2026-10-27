// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import type { NovaCard } from "./model";

const FIRST = "data:image/png;base64,aaaa";
const SECOND = "data:image/png;base64,bbbb";

vi.mock("./local-session", () => ({
  studioApi: { load: vi.fn(), save: vi.fn(), submit: vi.fn(), choose: vi.fn() },
  loadOwnerNova: vi.fn(),
  chooseCraftArt: vi.fn(),
  updateCardSharing: vi.fn(),
  republishOwnedDevCard: vi.fn(),
}));

import { StudioExperience, type StudioApi } from "./StudioPage";
import type { StudioState } from "./studio-model";
import { traitsFromAnswers } from "./model";
import { matchCompanions } from "../../../supabase/functions/_shared/companion-matcher";
import { chooseCraftArt, loadOwnerNova } from "./local-session";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;

const ANSWERS = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];
const [A, B] = matchCompanions(ANSWERS).candidates;
const PUBLIC_ID = "9b4c6f6e-55e6-4b52-9d5f-3c1c0f6e2a11";

function card(over: Partial<NovaCard> = {}): NovaCard {
  return {
    publicId: PUBLIC_ID,
    serial: "R-4H7K2M9P",
    username: "Aisyah",
    traits: null,
    companion: {
      archetypeId: A.archetypeId,
      name: A.name,
      species: A.species,
      element: A.element,
      personality: A.personality,
      tagline: A.tagline,
      description: A.description,
      traits: [...A.traits],
      abilities: [...A.abilities],
    },
    variant: "a",
    rarity: "Rare",
    stage: 1,
    sharing: false,
    crafting: true,
    artworkUrl: undefined,
    artOptions: [
      { option: 1, url: FIRST },
      { option: 2, url: SECOND },
    ],
    ...over,
  };
}

function studio(): StudioState {
  return {
    active: true,
    enabled: false,
    draft: { answers: ANSWERS, username: "Aisyah", revision: 4 },
    publicId: PUBLIC_ID,
    identity: { version: "nova-identity-v1", answers: ANSWERS, traits: traitsFromAnswers(ANSWERS) },
    selected: "a",
    origin: {
      status: "queued",
      revealAfter: "2099-01-01T00:00:00Z",
      ready: false,
      errorCode: null,
      completed: 0,
    },
    candidates: [],
    kind: "cosmic-companion",
    companions: [],
    companion: A,
  };
}

const roots: ReturnType<typeof createRoot>[] = [];
beforeAll(() => {
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  );
});
afterEach(async () => {
  for (const root of roots) await act(async () => root.unmount());
  roots.length = 0;
  document.body.innerHTML = "";
});

async function mount() {
  let current = card();
  vi.mocked(loadOwnerNova).mockImplementation(async () => [
    current,
    { active: true, status: "active" },
  ]);
  vi.mocked(chooseCraftArt).mockImplementation(async (option) => {
    const picked = current.artOptions?.find((item) => item.option === option);
    current = { ...current, artworkUrl: picked?.url, crafting: false, artOptions: [] };
    return current;
  });
  const api: StudioApi = {
    load: vi.fn(async () => studio()),
    save: vi.fn(),
    submit: vi.fn(),
    choose: vi.fn(),
  };
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  roots.push(root);
  await act(async () => root.render(<StudioExperience api={api} />));
  for (let i = 0; i < 20; i += 1) {
    if (host.querySelector("[data-craft-art-choice]")) break;
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }
  return host;
}

describe("one companion, two portraits", () => {
  it("shows the preference companion and both portraits while image generation is off", async () => {
    const host = await mount();
    expect(host.querySelector("h1")?.textContent).toBe(`Your ${A.name}`);
    expect(host.textContent).toContain(A.species);
    expect(host.textContent).toContain(A.element);
    expect(host.textContent).not.toContain(B.name);
    expect(host.textContent).not.toContain("Explore Nova plans");
    expect(host.textContent).not.toContain("has not opened yet");
    expect(host.querySelector("[data-portrait-status]")?.textContent).toBe(
      "Your portrait is being crafted.",
    );
    const images = [...host.querySelectorAll("[data-craft-art-choice] img")].map((image) =>
      image.getAttribute("src"),
    );
    expect(images).toEqual([FIRST, SECOND]);

    const pick = host.querySelector<HTMLButtonElement>("[data-craft-option='2']");
    expect(pick).toBeTruthy();
    await act(async () => pick!.click());
    for (let i = 0; i < 20; i += 1) {
      if (!host.querySelector("[data-craft-art-choice]")) break;
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });
    }
    expect(chooseCraftArt).toHaveBeenCalledWith(2);
    expect(host.querySelector("[data-craft-option]")).toBeNull();
    expect(host.querySelector("[data-craft-art-choice]")).toBeNull();
    expect(host.textContent).not.toContain(B.name);
  });
});
