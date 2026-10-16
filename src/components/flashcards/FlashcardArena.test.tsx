// @vitest-environment jsdom
import { act, createRef, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  FlashcardArena,
  FlashcardCompletion,
  FlashcardControls,
  FlashcardDeck,
} from "@/components/flashcards/FlashcardArena";
import {
  StructuredFlashcardBack,
  StructuredFlashcardFront,
} from "@/components/flashcards/StructuredFlashcardFace";
import { mathF2C1FlashcardsDLP } from "@/content/form2/math/chapter-1/flashcards-dlp";

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

describe("FlashcardDeck structured cards", () => {
  const card = mathF2C1FlashcardsDLP[55].structured!; // 1.3 Challenge: assembly chairs

  it("renders the structured question, parts and visuals instead of the plain text", () => {
    const el = render(
      deck({
        front: "plain front",
        back: "plain back",
        frontContent: <StructuredFlashcardFront card={card} lang="dlp" mode="challenge" />,
        backContent: <StructuredFlashcardBack card={card} lang="dlp" />,
        fitContent: true,
      }),
    );
    const front = el.querySelector(".flashcard-front")!;
    expect(front.textContent).toContain("Challenge Review");
    expect(front.textContent).toContain("A school arranges chairs");
    expect([...front.querySelectorAll(".fc-part-label")].map((n) => n.textContent)).toEqual([
      "(a)",
      "(b)",
      "(c)",
    ]);
    expect(front.querySelector('[data-math-visual="object-stages"]')).not.toBeNull();
    expect(front.querySelector('[data-math-visual="term-table"] table')).not.toBeNull();
    const back = el.querySelector(".flashcard-back")!;
    expect(back.textContent).toContain("Worked solution");
    // Equations render with non-breaking spaces around "=" (see mathText).
    expect(back.textContent?.replace(/\s/g, " ")).toContain("T₁₂ = 8 + 11(3) = 41 chairs");
    expect(back.querySelector(".fc-structured-note-label")?.textContent).toBe("Check");
    expect(el.textContent).not.toContain("plain front");
    expect(el.querySelector(".fc-card-slot")?.hasAttribute("data-fit")).toBe(true);
  });

  it("leaves plain cards exactly as before", () => {
    const el = render(deck());
    expect(el.querySelector(".fc-card-slot")?.hasAttribute("data-fit")).toBe(false);
    expect(el.querySelector(".fc-question")?.textContent).toBe("What is a habitat?");
    expect(el.querySelector(".fc-face-content")).toBeNull();
  });

  it("grows the slot to the taller face so long solutions are not clipped", () => {
    // jsdom has no layout: give the faces measurable sizes.
    const heights = new Map<string, number>([
      ["fc-face", 440],
      ["fc-face-content", 760],
    ]);
    const offset = vi
      .spyOn(HTMLElement.prototype, "offsetHeight", "get")
      .mockImplementation(function (this: HTMLElement) {
        for (const [className, height] of heights)
          if (this.classList.contains(className)) return height;
        return 0;
      });
    const client = vi
      .spyOn(HTMLElement.prototype, "clientHeight", "get")
      .mockImplementation(function (this: HTMLElement) {
        return this.classList.contains("fc-face-body") ? 300 : 0;
      });
    const el = render(
      deck({
        frontContent: <StructuredFlashcardFront card={card} lang="dlp" />,
        backContent: <StructuredFlashcardBack card={card} lang="dlp" />,
        fitContent: true,
      }),
    );
    const slot = el.querySelector<HTMLElement>(".fc-card-slot")!;
    // chrome (440 − 300) + content 760 (+ body padding, 0 in jsdom)
    expect(slot.style.getPropertyValue("--fc-fit-h")).toBe("900px");
    offset.mockRestore();
    client.mockRestore();
  });
});

describe("FlashcardArena scrolling and gestures", () => {
  /** The arena stylesheet text, plus the body of one top-level rule in it. */
  function arenaCss(subjectId: string) {
    render(<FlashcardArena subjectId={subjectId}>{deck()}</FlashcardArena>);
    const css = [...document.querySelectorAll(".flashcard-arena style")]
      .map((style) => style.textContent ?? "")
      .join("\n");
    const rule = (selector: string) => {
      const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return css.match(new RegExp(`\\n\\s*${escaped} \\{([^}]*)\\}`))?.[1] ?? "";
    };
    return { css, rule };
  }

  it("lets wheel and touch scrolls over the card reach the page", () => {
    const { css, rule } = arenaCss("math");
    // "contain" on the card body swallowed every scroll that began over the
    // card, because fitted structured cards never have anything to scroll.
    expect(css).not.toMatch(/overscroll-behavior:\s*contain/);
    expect(rule(".fc-face-body")).toMatch(/overscroll-behavior:\s*auto/);
  });

  it("keeps the card body on pan-y so horizontal swipes over the text stay with the card", () => {
    // A scroll container resets touch-action, so without this the browser
    // cancelled swipes that started over the question or solution.
    expect(arenaCss("math").rule(".fc-face-body")).toMatch(/touch-action:\s*pan-y/);
  });

  it("keeps the fixed Mathematics scene out of hit-testing so it never captures the wheel", () => {
    const { rule } = arenaCss("math");
    expect(rule(".flashcard-arena-math .world-scene-math")).toMatch(/pointer-events:\s*none/);
    expect(document.querySelector(".learning-arena")?.classList.contains("flashcard-arena-math")).toBe(true);
  });

  it("scopes the Mathematics arena styling to Mathematics", () => {
    arenaCss("science");
    const arena = document.querySelector(".learning-arena");
    expect(arena?.classList.contains("flashcard-arena")).toBe(true);
    expect(arena?.classList.contains("flashcard-arena-math")).toBe(false);
  });

  it("does not hijack the wheel on the card", () => {
    render(deck());
    const card = document.querySelector<HTMLElement>(".flashcard-study-card")!;
    const wheel = new WheelEvent("wheel", { deltaY: 120, bubbles: true, cancelable: true });
    card.dispatchEvent(wheel);
    expect(wheel.defaultPrevented).toBe(false);
  });
});
