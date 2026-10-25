// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CraftArtChoice } from "./CraftArtChoice";
import { NovaCard } from "./NovaCard";
import type { NovaCard as Card } from "./model";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;

const FIRST = "data:image/png;base64,aaaa";
const SECOND = "data:image/png;base64,bbbb";
const URL = "http://localhost:8080/card/c/00000000-0000-4000-8000-00000000d101";

const base: Card = {
  publicId: "00000000-0000-4000-8000-00000000d101",
  serial: "R-4H7K2M9P",
  username: "Aisha",
  traits: null,
  companion: {
    archetypeId: "fox",
    name: "Lumi",
    species: "Magical Fox",
    element: "Starlight",
    personality: "Gentle",
    tagline: "A quiet light",
    description: "A starlight fox.",
    traits: ["curious"],
    abilities: ["glow"],
  },
  variant: "a",
  rarity: "Rare",
  stage: 1,
  sharing: false,
  crafting: true,
};

const readyOptions = [
  { option: 1 as const, url: FIRST },
  { option: 2 as const, url: SECOND },
];

function PortraitFlow({
  initial,
  choose,
}: {
  initial: Card;
  choose?: (option: 1 | 2) => Promise<void>;
}) {
  const [card, setCard] = useState(initial);
  return (
    <>
      <NovaCard card={card} url={URL} />
      <CraftArtChoice
        card={card}
        onChoose={async (option) => {
          if (choose) {
            await choose(option);
            return;
          }
          const picked = card.artOptions?.find((item) => item.option === option);
          if (!picked?.url) throw new Error("Choose one of the two portraits");
          setCard({ ...card, artworkUrl: picked.url, crafting: false, artOptions: undefined });
        }}
      />
      <button
        type="button"
        onClick={() =>
          setCard({
            ...card,
            artOptions: readyOptions,
          })
        }
      >
        Portraits are ready
      </button>
    </>
  );
}

const roots: ReturnType<typeof createRoot>[] = [];
afterEach(async () => {
  for (const root of roots) await act(async () => root.unmount());
  roots.length = 0;
  document.body.innerHTML = "";
});

async function mount(
  initial: Card,
  choose?: (option: 1 | 2) => Promise<void>,
) {
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  roots.push(root);
  await act(async () => root.render(<PortraitFlow initial={initial} choose={choose} />));
  return host;
}

describe("student portrait choice", () => {
  it("moves from a crafted wait to two portraits, one pick, then a locked image", async () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    const host = await mount(base);
    expect(host.textContent).toContain("Your portrait is being crafted");
    expect(host.querySelector("[data-craft-art-choice]")).toBeNull();
    expect(host.querySelector("img.nova-art")).toBeNull();

    await act(async () => {
      [...host.querySelectorAll("button")]
        .find((button) => button.textContent?.includes("Portraits are ready"))!
        .click();
    });
    const images = [...host.querySelectorAll("[data-craft-art-choice] img")].map((image) =>
      image.getAttribute("src"),
    );
    expect(images).toEqual([FIRST, SECOND]);
    expect(host.textContent).not.toContain("Your portrait is being crafted");

    await act(async () => {
      host.querySelector<HTMLButtonElement>("[data-craft-option='2']")!.click();
    });
    expect(host.querySelector("[data-craft-art-choice]")).toBeNull();
    expect(host.querySelector("img.nova-art")?.getAttribute("src")).toBe(SECOND);
    expect(host.textContent).not.toContain(FIRST);
    expect(host.querySelector("[data-craft-option]")).toBeNull();
  });

  it("shows Saving your portrait… with a spinner, keeps artwork, and blocks double submit", async () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const choose = vi.fn(async () => {
      await gate;
    });
    const host = await mount({ ...base, artOptions: readyOptions, crafting: false }, choose);

    await act(async () => {
      host.querySelector<HTMLButtonElement>("[data-craft-option='1']")!.click();
    });

    expect(host.querySelector("[data-craft-status='saving']")?.textContent).toContain(
      "Saving your portrait…",
    );
    expect(host.querySelector(".nova-inline-spinner")).not.toBeNull();
    expect(
      [...host.querySelectorAll<HTMLButtonElement>("[data-craft-option]")].every(
        (button) => button.disabled,
      ),
    ).toBe(true);
    expect(
      [...host.querySelectorAll("[data-craft-art-choice] img")].map((image) =>
        image.getAttribute("src"),
      ),
    ).toEqual([FIRST, SECOND]);

    await act(async () => {
      host.querySelector<HTMLButtonElement>("[data-craft-option='2']")!.click();
    });
    expect(choose).toHaveBeenCalledTimes(1);

    await act(async () => {
      release();
      await gate;
    });
    expect(host.querySelector("[data-craft-status='success']")?.textContent).toContain(
      "Portrait saved.",
    );
    expect(host.querySelector("[data-craft-art-choice]")?.getAttribute("aria-busy")).not.toBe(
      "true",
    );
    expect(
      [...host.querySelectorAll<HTMLButtonElement>("[data-craft-option]")].every(
        (button) => button.disabled,
      ),
    ).toBe(true);

    await act(async () => {
      host.querySelector<HTMLButtonElement>("[data-craft-option='2']")!.click();
    });
    expect(choose).toHaveBeenCalledTimes(1);
  });

  it("restores buttons and shows an error when the server rejects the choice", async () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    const host = await mount({ ...base, artOptions: readyOptions, crafting: false }, async () => {
      throw new Error("Choose one of the two portraits");
    });

    await act(async () => {
      host.querySelector<HTMLButtonElement>("[data-craft-option='1']")!.click();
    });

    expect(host.querySelector("[data-craft-status='error']")?.textContent).toContain(
      "Choose one of the two portraits",
    );
    expect(
      host.querySelector<HTMLButtonElement>("[data-craft-option='1']")!.disabled,
    ).toBe(false);
    expect(host.querySelector("[data-craft-art-choice] img")).not.toBeNull();
  });
});
