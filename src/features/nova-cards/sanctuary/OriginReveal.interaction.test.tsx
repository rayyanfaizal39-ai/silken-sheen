// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { OriginReveal } from "./OriginReveal";
import {
  FICTIONAL_CANDIDATES,
  candidatesFromStudio,
  type CompanionCandidate,
} from "../companion-candidates";
import { DEMO_CARDS } from "../model";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;
let root: ReturnType<typeof createRoot> | undefined;
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
});
afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = undefined;
  document.body.innerHTML = "";
});

async function mount(
  companions: CompanionCandidate[],
  { busy = false, fictional = true, choose = vi.fn(async () => true) } = {},
) {
  const host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  const render = (next: CompanionCandidate[], nextBusy = busy) =>
    root!.render(
      <OriginReveal
        companions={next}
        busy={nextBusy}
        error=""
        onChoose={choose}
        fictional={fictional}
      />,
    );
  await act(async () => render(companions));
  return {
    host,
    choose,
    rerender: (c: CompanionCandidate[], b?: boolean) => act(async () => render(c, b)),
  };
}
const button = (scope: ParentNode, text: string) =>
  [...scope.querySelectorAll("button")].find((b) => b.textContent?.includes(text))!;
const cell = (host: HTMLElement, row: string, tone: "a" | "b") =>
  [...host.querySelectorAll(".occ-compare tbody tr")]
    .find((tr) => tr.querySelector("th")?.textContent === row)
    ?.querySelector(`td[data-tone="${tone}"]`)?.textContent;

describe("Two-companion comparison", () => {
  it("renders each companion from its own data, independently", async () => {
    const { host } = await mount(FICTIONAL_CANDIDATES);
    const cards = host.querySelectorAll(".occ-card");
    expect(cards).toHaveLength(2);
    expect(cards[0].querySelector("h2")?.textContent).toBe("Lumi");
    expect(cards[1].querySelector("h2")?.textContent).toBe("Sol");
    expect(cell(host, "Personality", "a")).toBe("Explorer");
    expect(cell(host, "Personality", "b")).toBe("Guardian");
    expect(cell(host, "Element", "a")).toBe("Starlight");
    expect(cell(host, "Element", "b")).toBe("Wind");
    expect(host.textContent).toContain("Fictional preview");
    // Without artwork, cards show a mystery silhouette, never an invented image.
    expect(host.querySelectorAll(".occ-art img")).toHaveLength(0);
  });

  it("updates the comparison when candidate data changes, with placeholders for gaps", async () => {
    const { host, rerender } = await mount(FICTIONAL_CANDIDATES);
    const updated = [
      { ...FICTIONAL_CANDIDATES[0], element: "Fire" },
      { id: "b" as const, name: "Nova B" },
    ];
    await rerender(updated);
    expect(cell(host, "Element", "a")).toBe("Fire");
    expect(cell(host, "Personality", "b")).toBe("Not available yet");
    expect(cell(host, "Learning Style", "b")).toBe("Not available yet");
  });

  it("maps today's real data honestly: one shared identity, two artworks, no invented fields", async () => {
    const traits = DEMO_CARDS[0].traits;
    const companions = candidatesFromStudio(traits, [
      { candidate: "a", url: "https://example.test/a.png" },
      { candidate: "b", url: "https://example.test/b.png" },
    ]);
    expect(companions[0]).not.toBe(companions[1]);
    expect(companions.every((c) => c.name === undefined && c.reason === undefined)).toBe(true);
    const { host } = await mount(companions, { fictional: false });
    expect(host.querySelectorAll(".sanctuary-candidate-art>img:first-child")).toHaveLength(2);
    expect(host.textContent).toContain("Both companions share your Cosmic Identity");
    expect(cell(host, "Strengths", "a")).toBe("Not available yet");
    expect(host.textContent).not.toContain("Fictional preview");
  });

  it("flips both cards independently", async () => {
    const { host } = await mount(FICTIONAL_CANDIDATES);
    const [flipA, flipB] = host.querySelectorAll<HTMLButtonElement>(".occ-flip");
    await act(async () => flipA.click());
    expect(flipA.getAttribute("aria-pressed")).toBe("true");
    expect(flipB.getAttribute("aria-pressed")).toBe("false");
    expect(host.querySelectorAll(".occ-flip__inner")[0].getAttribute("data-flipped")).toBe("true");
    await act(async () => flipB.click());
    expect(flipB.getAttribute("aria-pressed")).toBe("true");
  });

  it("opens an explore view and returns to the comparison", async () => {
    const { host } = await mount(FICTIONAL_CANDIDATES);
    const explore = host.querySelectorAll<HTMLButtonElement>(".occ-explore")[1];
    await act(async () => explore.click());
    const dialog = host.querySelector<HTMLDialogElement>("dialog.occ-detail")!;
    expect(dialog.open).toBe(true);
    expect(dialog.querySelector("h2")?.textContent).toBe("Sol");
    expect(dialog.textContent).toContain("Your answers show patience");
    await act(async () => button(dialog, "Back to comparison").click());
    expect(host.querySelector("dialog.occ-detail")).toBeNull();
    expect(document.activeElement).toBe(explore);
  });

  it("previews a choice without saving it, and keeps Confirm disabled until one is picked", async () => {
    const { host, choose } = await mount(FICTIONAL_CANDIDATES);
    const confirm = button(host, "Confirm My Companion");
    expect(confirm.disabled).toBe(true);
    await act(async () => button(host, "Choose Companion B").click());
    expect(button(host, "Choose Companion B").getAttribute("aria-checked")).toBe("true");
    expect(host.querySelectorAll(".occ-card")[1].getAttribute("data-picked")).toBe("true");
    await act(async () => button(host, "Choose Companion A").click());
    expect(host.querySelectorAll(".occ-card")[0].getAttribute("data-picked")).toBe("true");
    expect(host.querySelectorAll(".occ-card")[1].getAttribute("data-picked")).toBe("false");
    expect(confirm.disabled).toBe(false);
    expect(choose).not.toHaveBeenCalled();
  });

  it("requires explicit approval; Go back leaves the preview choice unchanged", async () => {
    const { host, choose } = await mount(FICTIONAL_CANDIDATES);
    await act(async () => button(host, "Choose Companion B").click());
    await act(async () => button(host, "Confirm My Companion").click());
    const dialog = host.querySelector("dialog")!;
    expect(dialog.querySelector("h2")?.textContent).toBe("Your Companion, Your Forever Choice");
    expect(dialog.textContent).toContain(
      "This companion will stay with you throughout your AcadeMY journey.",
    );
    expect(dialog.textContent).toContain(
      "Once confirmed, you cannot change your companion or retake the personality quiz.",
    );
    await act(async () => button(dialog, "Go back").click());
    expect(host.querySelector("dialog")).toBeNull();
    expect(choose).not.toHaveBeenCalled();
    expect(button(host, "Choose Companion B").getAttribute("aria-checked")).toBe("true");
    await act(async () => button(host, "Confirm My Companion").click());
    await act(async () => button(host.querySelector("dialog")!, "Confirm my companion").click());
    expect(choose).toHaveBeenCalledExactlyOnceWith("b");
  });

  it("locks every choice while a confirmation is saving", async () => {
    const { host } = await mount(FICTIONAL_CANDIDATES, { busy: true });
    expect(button(host, "Choose Companion A").disabled).toBe(true);
    expect(button(host, "Choose Companion B").disabled).toBe(true);
    expect(button(host, "Confirm My Companion").disabled).toBe(true);
  });
});
