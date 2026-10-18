// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NovaPersonalityIntro } from "./NovaPersonalityIntro";
import { NOVA_PERSONALITY_QUESTIONS } from "./personality";

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;
let host: HTMLDivElement;
let root: Root;
const click = async (node: Element) =>
  act(async () => {
    (node as HTMLElement).click();
  });
const button = (text: string) =>
  [...host.querySelectorAll("button")].find((node) =>
    node.textContent?.includes(text),
  )!;

async function answerAll(personality = "curious") {
  await click(button("Let’s meet"));
  for (let i = 0; i < 5; i++) {
    await click(host.querySelector(`input[value="${personality}"]`)!);
    await click(button(i === 4 ? "Meet my Nova" : "Continue"));
  }
}

describe("Nova introduction", () => {
  beforeEach(() => {
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
  });
  afterEach(async () => {
    await act(async () => root.unmount());
    host.remove();
  });
  const render = async (
    onBond = vi.fn().mockResolvedValue(undefined),
    extras = {},
  ) => {
    await act(async () =>
      root.render(
        <NovaPersonalityIntro
          onBond={onBond}
          onClose={vi.fn()}
          onStartLearning={vi.fn()}
          {...extras}
        />,
      ),
    );
    return onBond;
  };

  it("requires an answer, retains choices when going back, and focuses each question", async () => {
    await render();
    await click(button("Let’s meet"));
    expect(button("Continue").disabled).toBe(true);
    expect(document.activeElement).toBe(host.querySelector("h1"));
    await click(host.querySelector('input[value="steady"]')!);
    await click(button("Continue"));
    await click(button("Back"));
    expect(
      (host.querySelector('input[value="steady"]') as HTMLInputElement).checked,
    ).toBe(true);
    expect(host.textContent).toContain(NOVA_PERSONALITY_QUESTIONS[0].prompt);
  });

  it("reveals Nova's egg, saves its name and five answers, then starts learning", async () => {
    const onBond = vi.fn().mockResolvedValue(undefined),
      onStartLearning = vi.fn();
    await render(onBond, { initialName: "Stardust", onStartLearning });
    await answerAll();
    expect(host.textContent).toContain("Curious Explorer");
    expect(host.textContent).toContain("Your Nova egg is waiting.");
    await click(button("This is my Nova"));
    expect(onBond).toHaveBeenCalledOnce();
    expect(onBond.mock.calls[0][0]).toMatchObject({
      name: "Stardust",
      personality: "curious",
      answers: Array(5).fill("curious"),
    });
    expect(host.textContent).toContain("Stardust is yours.");
    await click(button("Start learning together"));
    expect(onStartLearning).toHaveBeenCalledOnce();
  });

  it("lets an existing evolved companion gain a personality without offering a new egg", async () => {
    await render(undefined, { stage: "guardian" });
    await answerAll("brave");
    expect(host.textContent).toContain("A new spark for your Nova.");
    expect(host.textContent).not.toContain("Your Nova egg is waiting.");
    expect(button("Save our connection")).toBeDefined();
    expect(
      host.querySelector('img[alt="Nova — guardian stage"]'),
    ).not.toBeNull();
  });

  it("retains answers and allows retry after a failed save", async () => {
    const onBond = vi
      .fn()
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValue(undefined);
    await render(onBond);
    await answerAll("steady");
    await click(button("This is my Nova"));
    expect(host.querySelector('[role="alert"]')?.textContent).toContain(
      "answers are still here",
    );
    await click(button("This is my Nova"));
    expect(onBond).toHaveBeenCalledTimes(2);
    expect(host.textContent).toContain("Nova is yours.");
  });

  it("prevents duplicate claims while a save is pending", async () => {
    let complete!: () => void;
    const onBond = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          complete = resolve;
        }),
    );
    await render(onBond);
    await answerAll();
    await click(button("This is my Nova"));
    expect(button("Connecting").disabled).toBe(true);
    await click(button("Connecting"));
    expect(onBond).toHaveBeenCalledOnce();
    await act(async () => complete());
    expect(host.textContent).toContain("Nova is yours.");
  });

  it("has an accessible artwork fallback when the original egg image is unavailable", async () => {
    await render();
    await act(async () => {
      host.querySelector("img")!.dispatchEvent(new Event("error"));
    });
    expect(
      host.querySelector('[role="img"][aria-label="Nova’s cosmic egg"]'),
    ).not.toBeNull();
  });
});
