// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";
import {
  normalizePreviousLeaderboard,
  PreviousMonthHall,
  type PreviousLeaderboardStudent,
} from "@/components/leaderboard/PreviousMonthHall";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement | null = null;
let root: Root | null = null;

afterEach(() => {
  if (root) act(() => root!.unmount());
  container?.remove();
  container = null;
  root = null;
});

function student(
  position: number,
  name: string,
  xp: number,
): PreviousLeaderboardStudent {
  return {
    position,
    display_name: name,
    school_name: position === 1 ? "SMK Example" : null,
    monthly_xp: xp,
    monthly_quiz_count: position,
    monthly_correct: 8,
    monthly_total: 10,
    xp_through_month_end: xp,
    is_current_user: false,
  };
}

function renderHall(students: PreviousLeaderboardStudent[]) {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => {
    root!.render(
      <PreviousMonthHall
        history={{
          status: "ok",
          data: {
            month_key: "2026-09",
            period_start: "2026-08-31T16:00:00.000Z",
            period_end: "2026-09-30T16:00:00.000Z",
            generated_at: "2026-10-02T04:00:00.000Z",
            students,
          },
        }}
      />,
    );
  });
}

describe("Previous month Hall of Fame", () => {
  it("shows the empty state when the previous month has no students", () => {
    renderHall([]);
    expect(container?.textContent).toContain("September Hall of Fame");
    expect(container?.textContent).toContain("No previous monthly leaderboard yet.");
    expect(container?.textContent).toContain(
      "This month's champions will enter the Hall of Fame next month.",
    );
    expect(container?.textContent).not.toContain("could not be loaded");
    expect(container?.textContent).not.toContain("#1");
  });

  it("reserves the load error for a failed request", () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => {
      root!.render(<PreviousMonthHall history={{ status: "error" }} />);
    });
    expect(container?.textContent).toContain("Last month's Hall of Fame could not be loaded.");
    expect(container?.textContent).not.toContain("No previous monthly leaderboard yet.");
  });

  it("treats a successful empty payload as an empty month", () => {
    expect(
      normalizePreviousLeaderboard({
        month_key: "2026-10",
        period_start: "2026-09-30T16:00:00.000Z",
        period_end: "2026-10-31T16:00:00.000Z",
        generated_at: "2026-11-01T00:00:00.000Z",
        students: [],
      })?.students,
    ).toEqual([]);
    expect(normalizePreviousLeaderboard({ month_key: "2026-11", students: null })?.students).toEqual(
      [],
    );
    expect(normalizePreviousLeaderboard(null)).toBeNull();
  });

  it("keeps previous-month Top 3 in rank order", () => {
    renderHall([
      student(1, "Muhammad", 3010),
      student(2, "Adam", 1665),
      student(3, "Rayyan", 775),
    ]);
    const names = [...(container?.querySelectorAll("article p") ?? [])]
      .map((node) => node.textContent ?? "")
      .filter((text) => text === "Muhammad" || text === "Adam" || text === "Rayyan");
    expect(names.slice(0, 3)).toEqual(["Muhammad", "Adam", "Rayyan"]);
    expect(container?.textContent).toContain("3,010");
    expect(container?.textContent).not.toContain("View September Top 10");
    expect(container?.textContent).not.toContain("Streak");
  });

  it("expands ranks 4 to 10 in place", () => {
    renderHall([
      student(1, "Muhammad", 3010),
      student(2, "Adam", 1665),
      student(3, "Rayyan", 775),
      student(4, "Aisha", 700),
      student(5, "Farid", 650),
      student(6, "Nadia", 600),
      student(7, "Hana", 550),
      student(8, "Imran", 500),
      student(9, "Sofia", 450),
      student(10, "Danish", 400),
    ]);
    const button = container?.querySelector("button");
    const panel = button?.nextElementSibling;
    expect(button?.textContent).toContain("View September Top 10");
    expect(button?.getAttribute("aria-expanded")).toBe("false");
    expect(panel?.getAttribute("aria-hidden")).toBe("true");
    expect(panel?.textContent).toContain("#4");
    expect(panel?.textContent).toContain("Danish");
    expect(panel?.textContent).not.toContain("Streak");
    act(() => {
      button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(button?.getAttribute("aria-expanded")).toBe("true");
    expect(button?.textContent).toContain("Hide September Top 10");
    expect(panel?.getAttribute("aria-hidden")).toBe("false");
  });
});
