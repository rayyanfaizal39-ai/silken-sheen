import { describe, expect, it } from "vitest";
import { sanitizeAnalyticsProperties } from "./visitor-analytics";

describe("visitor analytics privacy boundary", () => {
  it("normalizes property names and caps string length", () => {
    const result = sanitizeAnalyticsProperties({
      "CTA placement": "x".repeat(300),
      viewport: "mobile",
      count: 2,
    });

    expect(result.CTA_placement).toHaveLength(160);
    expect(result.viewport).toBe("mobile");
    expect(result.count).toBe(2);
  });

  it("caps the number of stored properties", () => {
    const properties = Object.fromEntries(
      Array.from({ length: 25 }, (_, index) => [`property_${index}`, index]),
    );

    expect(Object.keys(sanitizeAnalyticsProperties(properties))).toHaveLength(20);
  });
});
