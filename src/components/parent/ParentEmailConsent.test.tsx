import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ParentEmailConsent } from "./ParentEmailConsent";
import { ParentEmailNotice } from "./ParentEmailNotice";
import {
  consentAfterEmailEdit,
  parentEmailSaveBlocked,
} from "@/features/parent-report/parentEmailConsent";
import {
  PARENT_EMAIL_CONSENT_EN,
  PARENT_EMAIL_CONSENT_MS,
  PARENT_EMAIL_NOTICE_EN,
  PARENT_EMAIL_NOTICE_MS,
  PARENT_REPORT_CARD_TITLE_EN,
  PARENT_REPORT_CARD_TITLE_MS,
} from "@/features/parent-report/parentEmailCopy";

describe("parent email notice", () => {
  it("explains the monthly report in English and Bahasa Melayu", () => {
    const html = renderToStaticMarkup(<ParentEmailNotice />);

    expect(html).toContain(PARENT_EMAIL_NOTICE_EN);
    expect(html).toContain(PARENT_EMAIL_NOTICE_MS);
    expect(html).toContain('lang="ms"');
    expect(PARENT_EMAIL_NOTICE_EN).toContain("1st of each month");
    expect(PARENT_EMAIL_NOTICE_EN).toContain("Parent Dashboard");
    expect(PARENT_EMAIL_NOTICE_MS).toContain("1 haribulan");
    expect(PARENT_EMAIL_NOTICE_MS).toContain("Papan Pemuka Ibu Bapa");
    expect(PARENT_EMAIL_NOTICE_MS).not.toMatch(/'/);
    expect(PARENT_REPORT_CARD_TITLE_MS).not.toMatch(/'/);
  });

  it("requires an English and Bahasa Melayu consent checkbox before save", () => {
    const html = renderToStaticMarkup(
      <ParentEmailConsent id="parent-email-consent" checked={false} onChange={() => undefined} />,
    );
    expect(html).toContain('type="checkbox"');
    expect(html).toContain(PARENT_EMAIL_CONSENT_EN);
    expect(html).toContain(PARENT_EMAIL_CONSENT_MS);
    expect(html).toContain('lang="ms"');
    expect(PARENT_EMAIL_CONSENT_EN).toMatch(/agreed to receive monthly progress emails/i);
    expect(PARENT_EMAIL_CONSENT_MS).toContain("e-mel kemajuan bulanan");
    expect(PARENT_EMAIL_CONSENT_MS).not.toMatch(/'/);
    expect(parentEmailSaveBlocked({ email: "parent@example.com", consent: false })).toBe(true);
    expect(parentEmailSaveBlocked({ email: "parent@example.com", consent: true })).toBe(false);
    expect(parentEmailSaveBlocked({ email: "   ", consent: false })).toBe(false);
    expect(parentEmailSaveBlocked({ email: "not-an-email", consent: true })).toBe(true);
    expect(
      consentAfterEmailEdit({
        nextEmail: "new@example.com",
        savedEmail: "parent@example.com",
        savedConsent: true,
      }),
    ).toBe(false);
    expect(
      consentAfterEmailEdit({
        nextEmail: "parent@example.com",
        savedEmail: "parent@example.com",
        savedConsent: true,
      }),
    ).toBe(true);
  });

  it("uses the monthly card on the student dashboard and previews the monthly report", () => {
    const card = readFileSync(new URL("./ParentReportSettings.tsx", import.meta.url), "utf8");
    const parentPage = readFileSync(new URL("../../routes/parent.tsx", import.meta.url), "utf8");
    expect(card).toContain("PARENT_REPORT_CARD_TITLE_EN");
    expect(card).toContain("PARENT_REPORT_CARD_TITLE_MS");
    expect(PARENT_REPORT_CARD_TITLE_EN).toMatch(/monthly/i);
    expect(PARENT_REPORT_CARD_TITLE_EN).not.toMatch(/weekly/i);
    expect(card).toContain("<ParentEmailNotice />");
    expect(card).toContain("<ParentEmailConsent");
    expect(card).toContain("parentEmailSaveBlocked");
    expect(card).toContain("consentAfterEmailEdit");
    expect(card).toContain("<ParentPremiumUpsell");
    expect(card).toContain('to="/parent"');
    expect(card).toContain("Preview My Report");
    expect(card).not.toMatch(/weekly learning/i);
    expect(parentPage).toContain("previousKualaLumpurMonth");
    expect(parentPage).toContain("previous calendar month");
    expect(parentPage).toContain("<ParentEmailNotice />");
    expect(parentPage).toContain("<ParentEmailConsent");
    expect(parentPage).toContain("parentEmailSaveBlocked");
    expect(parentPage).toContain("consentAfterEmailEdit");
  });
});
