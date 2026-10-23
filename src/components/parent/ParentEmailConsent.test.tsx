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

    expect(html).toContain("monthly progress report");
    expect(html).toContain("monthly progress report only");
    expect(html).toContain(PARENT_EMAIL_NOTICE_MS);
    expect(html).toContain("I agree that AcadeMY may email this parent or guardian");
    expect(html).toContain(PARENT_EMAIL_CHECKBOX_MS);
    expect(PARENT_EMAIL_NOTICE_EN).toContain("monthly progress report only");
    expect(PARENT_EMAIL_NOTICE_EN).toContain("Payment reminders go to your AcadeMY account email");
    expect(PARENT_EMAIL_NOTICE_MS).toContain("laporan kemajuan bulanan sahaja");
    expect(PARENT_EMAIL_NOTICE_MS).not.toMatch(/'/);
    expect(PARENT_EMAIL_CHECKBOX_EN).not.toContain("payment");
    expect(PARENT_EMAIL_CHECKBOX_MS).not.toContain("pembayaran");
    expect(html).toContain('lang="ms"');
    expect(html).toContain('id="parent-email-consent"');
    expect(html).toContain('type="checkbox"');
  });
});
