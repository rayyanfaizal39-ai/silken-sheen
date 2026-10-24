// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CompanionCraftQueue } from "./CompanionCraftQueue";
import {
  CRAFT_OUTPUT_RULES,
  type CraftArtistBrief,
  type CraftBrief,
  type CraftQueueApi,
} from "@/features/nova-cards/craft-queue";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;

const roots: ReturnType<typeof createRoot>[] = [];

afterEach(() => {
  for (const root of roots) act(() => root.unmount());
  roots.length = 0;
  document.body.innerHTML = "";
});

function item(
  patch: Partial<CraftBrief> & Pick<CraftBrief, "publicId" | "position" | "status">,
): CraftBrief {
  return {
    displayName: "Aisha",
    form: "Form 1",
    companionName: "Seri",
    species: "Phoenix",
    element: "Fire",
    traits: ["Warm-hearted"],
    personality: "Nurturer",
    serial: "100000000101",
    queuedAt: "2026-10-24T09:00:00.000Z",
    choice: null,
    options: [],
    ...patch,
  };
}

const older = item({
  publicId: "00000000-0000-4000-8000-00000000aa01",
  position: 1,
  status: "waiting_for_art",
  displayName: "Early",
  queuedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
});
const newer = item({
  publicId: "00000000-0000-4000-8000-00000000aa02",
  position: 2,
  status: "waiting_for_art",
  displayName: "Later",
  queuedAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
});
const ready = item({
  publicId: "00000000-0000-4000-8000-00000000aa03",
  position: 3,
  status: "options_ready",
  displayName: "Ready",
});
const chosen = item({
  publicId: "00000000-0000-4000-8000-00000000aa04",
  position: 4,
  status: "chosen",
  displayName: "Chosen",
  choice: 2,
});

const artist: CraftArtistBrief = {
  cardId: "00000000-0000-4000-8000-00000000bb01",
  publicId: older.publicId,
  nickname: "Early",
  form: "Form 1",
  rarity: "Rare",
  submittedAt: older.queuedAt,
  answers: [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0],
  traits: { personality: "Explorer" },
  companion: {
    name: "Seri",
    species: "Phoenix",
    element: "Fire",
    personality: "Nurturer",
    visual: { canonical: { proportions: "compact" }, personalisation: { paletteRole: "main" } },
  },
  dna: {
    genes: { faceShape: "round" },
    palette: { primary: "#112233" },
    identityLock: { proportions: "compact" },
  },
  output: CRAFT_OUTPUT_RULES,
};

async function render(api: CraftQueueApi) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = createRoot(host);
  roots.push(root);
  await act(async () => root.render(<CompanionCraftQueue api={api} />));
  return host;
}

describe("staff craft queue page", () => {
  it("defaults to waiting students, marks the oldest, and downloads one brief", async () => {
    const brief = vi.fn(async () => artist);
    const api: CraftQueueApi = {
      queue: async () => [newer, chosen, older, ready],
      attachOptions: vi.fn(),
      resetChoice: vi.fn(),
      brief,
    };
    let captured: Blob | null = null;
    let filename = "";
    URL.createObjectURL = ((blob: Blob) => {
      captured = blob;
      return "blob:brief";
    }) as typeof URL.createObjectURL;
    URL.revokeObjectURL = () => undefined;
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (
      this: HTMLAnchorElement,
    ) {
      filename = this.download;
    });

    const host = await render(api);
    expect(host.querySelector('[aria-selected="true"]')?.textContent).toContain("Waiting for art");
    expect(host.querySelector(`[data-craft-public-id="${older.publicId}"]`)).toBeTruthy();
    expect(host.querySelector(`[data-craft-public-id="${newer.publicId}"]`)).toBeTruthy();
    expect(host.querySelector(`[data-craft-public-id="${ready.publicId}"]`)).toBeNull();
    expect(host.querySelector(`[data-craft-public-id="${chosen.publicId}"]`)).toBeNull();
    expect(host.querySelectorAll("[data-next-up]")).toHaveLength(1);
    expect(host.querySelector("[data-next-up]")?.parentElement?.textContent).toContain("Early");
    expect(host.querySelector("[data-craft-position='1']")?.textContent).toBe("1");
    expect(host.textContent).toContain("Queued for 3 hours");
    expect(host.textContent).toContain("Queued for 20 minutes");

    const button = host.querySelector<HTMLButtonElement>(`[data-craft-brief="${older.publicId}"]`);
    await act(async () => {
      button?.click();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(brief).toHaveBeenCalledWith(older.publicId);
    expect(filename).toBe(`companion-brief-${older.publicId}.json`);
    const body = await captured!.text();
    expect(body).toContain("1024x1536");
    expect(body).not.toContain("email");
    expect(body).not.toContain("userId");

    const options = [...host.querySelectorAll<HTMLButtonElement>('[role="tab"]')].find((tab) =>
      tab.textContent?.includes("Options ready"),
    );
    await act(async () => options?.click());
    expect(host.querySelector(`[data-craft-public-id="${ready.publicId}"]`)).toBeTruthy();
    expect(host.querySelector(`[data-craft-public-id="${older.publicId}"]`)).toBeNull();
    expect(host.querySelectorAll("[data-next-up]")).toHaveLength(0);
  });
});
