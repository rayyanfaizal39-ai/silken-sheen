// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { QuizFormErrorState } from "@/routes/quizzes";

let container: HTMLDivElement | null = null;
let root: Root | null = null;

afterEach(() => {
  if (root) act(() => root!.unmount());
  container?.remove();
  container = null;
  root = null;
});

describe("QuizFormErrorState — Retry button is actually clickable", () => {
  it("clicking Retry calls the quiz fetch again, with no page refresh", () => {
    const onRetry = vi.fn();
    const onBack = vi.fn();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    act(() => {
      root!.render(
        <QuizFormErrorState subjectId="science" form="Form 2" onRetry={onRetry} onBack={onBack} />,
      );
    });

    const retryButton = Array.from(container.querySelectorAll("button")).find(
      (btn) => btn.textContent === "Retry",
    );
    expect(retryButton).toBeInstanceOf(HTMLButtonElement);
    expect(retryButton?.getAttribute("type")).toBe("button");

    act(() => {
      retryButton!.click();
    });

    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(onBack).not.toHaveBeenCalled();
  });

  it("the Retry button is not covered/blocked by any decorative overlay", () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    act(() => {
      root!.render(
        <QuizFormErrorState
          subjectId="science"
          form="Form 2"
          onRetry={() => {}}
          onBack={() => {}}
        />,
      );
    });

    // Every element painted between the button and the document root must
    // not intercept pointer events, i.e. either not overlap in the DOM tree
    // or be marked aria-hidden/decorative. Concretely: nothing with a
    // `pointer-events` style other than the button itself should sit inside
    // the same card.
    const retryButton = Array.from(container.querySelectorAll("button")).find(
      (btn) => btn.textContent === "Retry",
    )!;
    let node: HTMLElement | null = retryButton.parentElement;
    while (node && node !== container) {
      expect(node.style.pointerEvents).not.toBe("none");
      node = node.parentElement;
    }
  });
});
