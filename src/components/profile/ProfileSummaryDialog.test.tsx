import { renderToStaticMarkup } from "react-dom/server";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import { ProfileSummaryDialog } from "./ProfileSummaryDialog";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, ...props }: ComponentProps<"a"> & { to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe("ProfileSummaryDialog", () => {
  it("renders the authenticated Explorer summary and accessible close control", () => {
    const markup = renderToStaticMarkup(
      <ProfileSummaryDialog
        open
        user={{
          id: "student-1",
          email: "alya@example.com",
          name: "Alya",
          avatarUrl: undefined,
          createdAt: undefined,
        }}
        profile={{
          displayName: "Alya",
          age: 14,
          formLevel: "Form 2",
          schoolId: "123e4567-e89b-42d3-a456-426614174000",
          onboardingCompleted: true,
          role: "student",
        }}
        onClose={vi.fn()}
      />,
    );

    expect(markup).toContain("Explorer Profile");
    expect(markup).toContain("Form 2");
    expect(markup).toContain("Verified school connected");
    expect(markup).toContain("Close profile summary");
    expect(markup).toContain("View Explorer Profile");
    expect(markup).toContain('href="/profile"');
    expect(markup).toContain("Account &amp; Billing");
  });

  it("uses friendly completion actions for a legacy profile", () => {
    const markup = renderToStaticMarkup(
      <ProfileSummaryDialog
        open
        user={{
          id: "student-2",
          email: "legacy@example.com",
          name: "Legacy Explorer",
          avatarUrl: undefined,
          createdAt: undefined,
        }}
        profile={{
          displayName: "Legacy Explorer",
          age: null,
          formLevel: null,
          schoolId: null,
          onboardingCompleted: true,
          role: "student",
        }}
        onClose={vi.fn()}
      />,
    );

    expect(markup).toContain("Complete profile");
    expect(markup).toContain("Add age");
    expect(markup).not.toContain("Not set");
  });
});
