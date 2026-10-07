// @vitest-environment jsdom
import { act, createRef, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  FlashcardCompletion,
  FlashcardControls,
  FlashcardDeck,
} from "@/components/flashcards/FlashcardArena";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement | null = null;
let root: Root | null = null;

afterEach(() => {
  if (root) act(() => root!.unmount());
  container?.remove();
  container = null;
  root = null;
});

function render(node: ReactNode) {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => root!.render(node));
  return container;
}

function deck(overrides: Partial<Parameters<typeof FlashcardDeck>[0]> = {}) {
  const noop = () => {};
  return (
    <FlashcardDeck
      turnKey="1:0:card-1"
      front="What is a habitat?"
      back="The natural home of an organism."
      flipped={false}
      exit={null}
      remaining={5}
      dragProgress={0}
      cardRef={createRef<HTMLDivElement>()}
      cardStyle={{}}
      ariaLabel="Flashcard question shown. Press Enter to flip."
      metaLabel="🌏 Geography • Form 2"
      favourite={false}
      onToggleFavourite={noop}
      watermark={["N", "↑"]}
      hint="Tap to flip"
      knowCueOpacity={0}
      dontKnowCueOpacity={0}
      ratingCue={null}
      showXp={false}
      onFlip={noop}
      onKeyDown={noop}
      onPointerDown={noop}
      onPointerMove={noop}
      onPointerUp={noop}
      onPointerCancel={noop}
      {...overrides}
    />
  );
}

describe("FlashcardDeck", () => {
  it("renders each face's text exactly once — the stack layers are decorative and empty", () => {
    const el = render(deck());
    const layers = el.querySelectorAll(".fc-stack-layer");
    expect(layers).toHaveLength(2);
    layers.forEach((layer) => {
      expect(layer.getAttribute("aria-hidden")).toBe("true");
      expect(layer.textContent).toBe("");
    });
    expect(el.querySelector(".fc-left-pill")?.textContent).toBe("5 left");
    expect(el.textContent?.match(/What is a habitat\?/g)).toHaveLength(1);
    expect(el.textContent?.match(/The natural home of an organism\./g)).toHaveLength(1);
  });

  it("shows fewer stack layers as the deck runs out", () => {
    expect(render(deck({ remaining: 2 })).querySelectorAll(".fc-stack-layer")).toHaveLength(1);
    act(() => root!.unmount());
    root = null;
    expect(render(deck({ remaining: 1 })).querySelectorAll(".fc-stack-layer")).toHaveLength(0);
  });

  it("flips by class on the inner layer and hides the reverse face from assistive tech", () => {
    const el = render(deck({ flipped: true }));
    expect(el.querySelector(".flashcard-inner")?.className).toContain("is-flipped");
    expect(el.querySelector(".flashcard-front")?.getAttribute("aria-hidden")).toBe("true");
    expect(el.querySelector(".flashcard-back")?.getAttribute("aria-hidden")).toBe("false");
    const card = el.querySelector('[role="button"]');
    expect(card?.getAttribute("aria-pressed")).toBe("true");
    expect(card?.getAttribute("tabindex")).toBe("0");
  });

  it("keeps the subject label and favourite heart inside the card front", () => {
    const onToggleFavourite = vi.fn();
    const onFlip = vi.fn();
    const el = render(deck({ onToggleFavourite, onFlip }));
    const front = el.querySelector(".flashcard-front")!;
    expect(front.textContent).toContain("Geography • Form 2");
    const heart = front.querySelector<HTMLButtonElement>('button[aria-label="Add to favorites"]')!;
    expect(heart.tabIndex).toBe(0);
    act(() => heart.click());
    expect(onToggleFavourite).toHaveBeenCalledTimes(1);
    expect(onFlip).not.toHaveBeenCalled();
    act(() => root!.render(deck({ flipped: true })));
    expect(container!.querySelector<HTMLButtonElement>(".flashcard-front button")!.tabIndex).toBe(
      -1,
    );
  });

  it("exits right for Know and left for Don't know, otherwise enters", () => {
    expect(render(deck()).querySelector(".fc-card-motion")?.className).toContain("is-entering");
    act(() => root!.render(deck({ exit: "right" })));
    expect(container!.querySelector(".fc-card-motion")?.className).toContain("is-exit-right");
    act(() => root!.render(deck({ exit: "left" })));
    expect(container!.querySelector(".fc-card-motion")?.className).toContain("is-exit-left");
  });
});

describe("FlashcardControls", () => {
  const handlers = () => ({
    onDontKnow: vi.fn(),
    onKnow: vi.fn(),
    onAlmost: vi.fn(),
    onEasy: vi.fn(),
    onNext: vi.fn(),
  });

  it("keeps Know / Don't know as real, always-visible buttons", () => {
    const h = handlers();
    const el = render(<FlashcardControls flipped={false} pending={null} disabled={false} {...h} />);
    const know = el.querySelector<HTMLButtonElement>('button[aria-label="Know this card"]')!;
    const dont = el.querySelector<HTMLButtonElement>(
      `button[aria-label="Don't know — review this card again"]`,
    )!;
    act(() => know.click());
    act(() => dont.click());
    expect(h.onKnow).toHaveBeenCalledTimes(1);
    expect(h.onDontKnow).toHaveBeenCalledTimes(1);
  });

  it("reserves the finer ratings' space before the flip so the slot never changes height", () => {
    const h = handlers();
    const el = render(<FlashcardControls flipped={false} pending={null} disabled={false} {...h} />);
    const easy = el.querySelector<HTMLButtonElement>('button[aria-label="Rate this card Easy"]')!;
    expect(easy).not.toBeNull();
    expect(easy.disabled).toBe(true);
    expect(easy.tabIndex).toBe(-1);
    expect((easy.parentElement as HTMLElement).style.visibility).toBe("hidden");

    act(() => root!.render(<FlashcardControls flipped pending={null} disabled={false} {...h} />));
    const easyAfter = container!.querySelector<HTMLButtonElement>(
      'button[aria-label="Rate this card Easy"]',
    )!;
    expect(easyAfter.disabled).toBe(false);
    expect((easyAfter.parentElement as HTMLElement).style.visibility).toBe("visible");
    act(() => easyAfter.click());
    act(() =>
      container!
        .querySelector<HTMLButtonElement>('button[aria-label="Rate this card Almost"]')!
        .click(),
    );
    expect(h.onEasy).toHaveBeenCalledTimes(1);
    expect(h.onAlmost).toHaveBeenCalledTimes(1);
  });

  it("lays the secondary row out in the same grid as the ratings, in every state", () => {
    const h = handlers();
    const slots = {
      tools: <button type="button">Shuffle</button>,
      pager: <span>3 / 20</span>,
    };
    const el = render(
      <FlashcardControls flipped={false} pending={null} disabled={false} {...h} {...slots} />,
    );
    const grid = el.querySelector(".fc-controls")!;
    expect(grid.querySelector(":scope > .fc-tools")?.textContent).toBe("Shuffle");
    expect(grid.querySelector(":scope > .fc-pager")?.textContent).toBe("3 / 20");
    act(() =>
      root!.render(<FlashcardControls flipped pending="know" disabled {...h} {...slots} />),
    );
    expect(container!.querySelector(".fc-controls > .fc-pending")).not.toBeNull();
    expect(container!.querySelector(".fc-controls > .fc-pager")?.textContent).toBe("3 / 20");
    const easy = container!.querySelector<HTMLButtonElement>(
      'button[aria-label="Rate this card Easy"]',
    )!;
    expect((easy.parentElement as HTMLElement).style.visibility).toBe("hidden");
    expect(easy.tabIndex).toBe(-1);
  });

  it("asks for one explicit Next Card press once a swipe has decided the rating", () => {
    const h = handlers();
    const el = render(<FlashcardControls flipped pending="review" disabled {...h} />);
    expect(el.textContent).toContain("Marked for review");
    act(() =>
      el
        .querySelector<HTMLButtonElement>('button[aria-label="Continue to the next card"]')!
        .click(),
    );
    expect(h.onNext).toHaveBeenCalledTimes(1);
    expect(h.onKnow).not.toHaveBeenCalled();
  });
});

describe("FlashcardCompletion", () => {
  it("reports real session counts and offers the next set first", () => {
    const onNextSet = vi.fn();
    const el = render(
      <FlashcardCompletion
        setTitle="Biodiversity & Conservation"
        total={20}
        neededReview={3}
        bestStreak={7}
        xpEarned={200}
        nextSetTitle="Classification of Animals"
        onNextSet={onNextSet}
        onStudyAgain={() => {}}
        onFinish={() => {}}
      />,
    );
    const values = [...el.querySelectorAll("dd")].map((d) => d.textContent);
    expect(values).toEqual(["17", "3", "7"]);
    const buttons = [...el.querySelectorAll("button")].map((b) => b.textContent?.trim());
    expect(buttons[0]).toBe("Continue to Classification of Animals");
    act(() => el.querySelector("button")!.click());
    expect(onNextSet).toHaveBeenCalledTimes(1);
  });

  it("makes studying again the primary action on the last set", () => {
    const el = render(
      <FlashcardCompletion
        setTitle="Set 3"
        total={20}
        neededReview={0}
        bestStreak={20}
        xpEarned={0}
        nextSetTitle={null}
        onNextSet={null}
        onStudyAgain={() => {}}
        onFinish={() => {}}
      />,
    );
    const first = el.querySelector("button")!;
    expect(first.textContent).toContain("Study this set again");
    expect(first.className).toContain("fc-primary");
    expect(el.textContent).not.toContain("Continue to");
    expect(el.textContent).not.toContain("Activity XP");
  });
});
