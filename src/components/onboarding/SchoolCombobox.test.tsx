import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { SchoolCombobox } from "./SchoolCombobox";

describe("SchoolCombobox", () => {
  it("renders an accessible mobile-sized search input and minimum-length guidance", () => {
    const markup = renderToStaticMarkup(<SchoolCombobox value={null} onChange={vi.fn()} />);
    expect(markup).toContain("Search verified Malaysian schools");
    expect(markup).toContain("Search your school...");
    expect(markup).toContain("Type 3 more characters to search");
    expect(markup).toContain("h-12");
  });

  it("shows the verified selection with location and a change control", () => {
    const markup = renderToStaticMarkup(
      <SchoolCombobox
        value={{
          id: "123e4567-e89b-42d3-a456-426614174000",
          schoolCode: "ABC1234",
          schoolName: "Verified School",
          schoolType: "SMK",
          state: "Selangor",
          district: "Shah Alam",
          postcode: "40000",
        }}
        onChange={vi.fn()}
      />,
    );
    expect(markup).toContain("Verified School");
    expect(markup).toContain("Shah Alam, Selangor");
    expect(markup).toContain("Change school from Verified School");
  });
});
