import { describe, expect, it } from "vitest";
import { QUICK_ACCESS } from "./HomeDashboard";

describe("Home dashboard resource routing", () => {
  it("opens Mind Maps through the dedicated route instead of Notes", () => {
    const mindMaps = QUICK_ACCESS.find((item) => item.title === "Mind Maps");

    expect(mindMaps?.to).toBe("/mindmaps");
  });
});
