import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ParentEmailConsent } from "./ParentEmailConsent";
import {
  PARENT_EMAIL_CHECKBOX_EN,
  PARENT_EMAIL_CHECKBOX_MS,
  PARENT_EMAIL_NOTICE_EN,
  PARENT_EMAIL_NOTICE_MS,
} from "@/features/parent-report/parentEmailCopy";

describe("parent email consent", () => {
  it("shows the English and Bahasa Melayu notice and checkbox", () => {
    const html = renderToStaticMarkup(
      <ParentEmailConsent
        checked={false}
        onCheckedChange={() => undefined}
        inputId="parent-email-consent"
      />,
    );

    expect(html).toContain("monthly learning summary");
    expect(html).toContain("subscription renewal reminders");
    expect(html).toContain(PARENT_EMAIL_NOTICE_MS);
    expect(html).toContain("I agree that AcadeMY may email this parent or guardian");
    expect(html).toContain(PARENT_EMAIL_CHECKBOX_MS);
    expect(PARENT_EMAIL_NOTICE_EN).toContain("monthly learning summary");
    expect(PARENT_EMAIL_CHECKBOX_EN).toContain("learning summary and subscription reminders");
    expect(html).toContain('lang="ms"');
    expect(html).toContain('id="parent-email-consent"');
    expect(html).toContain('type="checkbox"');
  });
});
