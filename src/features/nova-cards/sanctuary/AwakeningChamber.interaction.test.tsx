// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { traitsFromAnswers } from "../model";
import { AwakeningChamber } from "./AwakeningChamber";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;
let root: ReturnType<typeof createRoot> | undefined;
afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = undefined;
  document.body.innerHTML = "";
});

async function mount(answers: number[], onContinue = vi.fn(), continueDisabled = false) {
  const host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await act(async () =>
    root!.render(
      <AwakeningChamber
        traits={traitsFromAnswers(answers)}
        answers={answers}
        calm
        intro="These are the unique traits that make your connection with your companion special."
        nickname={<label>Public nickname</label>}
        continueLabel="Continue my journey"
        continueDisabled={continueDisabled}
        onContinue={onContinue}
      />,
    ),
  );
  return host;
}

describe("Awakening chamber", () => {
  it("shows the student's computed traits, never the reference image's example values", async () => {
    for (const answers of [Array(12).fill(0), [3, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0]]) {
      const traits = traitsFromAnswers(answers);
      const host = await mount(answers);
      const values = [...host.querySelectorAll(".cca-trait b")].map((b) => b.textContent);
      expect(values).toEqual([
        traits.personality,
        traits.approach,
        traits.ability,
        traits.behaviour,
        traits.element,
        traits.colours,
      ]);
      const more = [...host.querySelectorAll(".cca-more dd")].map((dd) => dd.textContent);
      expect(more).toEqual([
        traits.creature,
        traits.appearance,
        traits.habitat,
        traits.eyes,
        traits.marking,
        traits.bond,
      ]);
      for (const invented of ["Visual Explorer", "Creative Thinker", "Calm and Focused"])
        expect(host.textContent).not.toContain(invented);
      await act(async () => root!.unmount());
      root = undefined;
    }
  });

  it("keeps the egg unrevealed and uses Cosmic Companion branding", async () => {
    const host = await mount(Array(12).fill(0));
    expect(host.querySelector(".sanctuary-egg-awakening")).not.toBeNull();
    expect(host.querySelector(".sanctuary-egg-awakening img")).toBeNull();
    expect(host.querySelector("h1")?.textContent).toBe("Your Cosmic Connection Has Awakened");
    expect(host.textContent).toContain("Cosmic Companion");
    expect(host.textContent).not.toMatch(/Nova/);
  });

  it("renders the Studio's nickname field and defers Continue to the Studio", async () => {
    const onContinue = vi.fn();
    const host = await mount(Array(12).fill(0), onContinue);
    expect(host.textContent).toContain("Public nickname");
    const button = host.querySelector<HTMLButtonElement>(".cca-continue")!;
    await act(async () => button.click());
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("respects the Studio's disabled state for Continue", async () => {
    const onContinue = vi.fn();
    const host = await mount(Array(12).fill(0), onContinue, true);
    const button = host.querySelector<HTMLButtonElement>(".cca-continue")!;
    expect(button.disabled).toBe(true);
    await act(async () => button.click());
    expect(onContinue).not.toHaveBeenCalled();
  });
});
