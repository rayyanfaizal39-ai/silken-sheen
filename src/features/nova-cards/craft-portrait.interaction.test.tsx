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
  serial: "100000000101",
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

function PortraitFlow({ initial }: { initial: Card }) {
  const [card, setCard] = useState(initial);
  return (
    <>
      <NovaCard card={card} url={URL} />
      <CraftArtChoice
        card={card}
        onChoose={async (option) => {
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
            artOptions: [
              { option: 1, url: FIRST },
              { option: 2, url: SECOND },
            ],
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

async function mount(initial: Card) {
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  roots.push(root);
  await act(async () => root.render(<PortraitFlow initial={initial} />));
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
});
