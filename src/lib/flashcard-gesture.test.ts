import { describe, expect, it } from "vitest";
import { CARD_DRAG_THRESHOLD, classifyCardDrag } from "@/lib/flashcard-gesture";

describe("classifyCardDrag", () => {
  it("treats movement under the threshold as a tap in progress", () => {
    expect(classifyCardDrag(0, 0)).toBe("undecided");
    expect(classifyCardDrag(CARD_DRAG_THRESHOLD - 1, -(CARD_DRAG_THRESHOLD - 1))).toBe("undecided");
  });

  it("hands vertical movement to the page as a scroll, in both directions", () => {
    expect(classifyCardDrag(0, 40)).toBe("scroll");
    expect(classifyCardDrag(0, -40)).toBe("scroll");
    expect(classifyCardDrag(3, -CARD_DRAG_THRESHOLD)).toBe("scroll");
  });

  it("keeps mostly-vertical diagonals as scrolls so reading is never interrupted", () => {
    expect(classifyCardDrag(25, -260)).toBe("scroll");
    expect(classifyCardDrag(-10, 13)).toBe("scroll");
  });

  it("treats horizontal movement as a Know / Don't know swipe, in both directions", () => {
    expect(classifyCardDrag(40, 0)).toBe("swipe");
    expect(classifyCardDrag(-40, 3)).toBe("swipe");
    expect(classifyCardDrag(CARD_DRAG_THRESHOLD, 0)).toBe("swipe");
  });

  it("leans to swiping only once horizontal movement is at least comparable", () => {
    expect(classifyCardDrag(10, 12)).toBe("swipe");
    expect(classifyCardDrag(10, 13)).toBe("scroll");
  });
});
