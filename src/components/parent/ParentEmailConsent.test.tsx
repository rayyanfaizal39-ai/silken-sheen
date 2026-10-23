import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ParentEmailNotice } from "./ParentEmailNotice";
import {
  PARENT_EMAIL_NOTICE_EN,
  PARENT_EMAIL_NOTICE_MS,
  PARENT_REPORT_CARD_TITLE_EN,
  PARENT_REPORT_CARD_TITLE_MS,
} from "@/features/parent-report/parentEmailCopy";

describe("parent email notice", () => {
  it("explains the monthly report in English and Bahasa Melayu without a checkbox", () => {
    const html = renderToStaticMarkup(<ParentEmailNotice />);

    expect(html).toContain(PARENT_EMAIL_NOTICE_EN);
    expect(html).toContain(PARENT_EMAIL_NOTICE_MS);
    expect(html).toContain('lang="ms"');
    expect(html).not.toContain("checkbox");
    expect(html).not.toContain("<input");
    expect(PARENT_EMAIL_NOTICE_EN).toContain("1st of each month");
    expect(PARENT_EMAIL_NOTICE_EN).toContain("Parent Dashboard");
    expect(PARENT_EMAIL_NOTICE_MS).toContain("1 haribulan");
    expect(PARENT_EMAIL_NOTICE_MS).toContain("Papan Pemuka Ibu Bapa");
    expect(PARENT_EMAIL_NOTICE_MS).not.toMatch(/'/);
    expect(PARENT_REPORT_CARD_TITLE_MS).not.toMatch(/'/);
  });

  it("uses the monthly card on the student dashboard and previews the monthly report", () => {
    const card = readFileSync(new URL("./ParentReportSettings.tsx", import.meta.url), "utf8");
    const parentPage = readFileSync(new URL("../../routes/parent.tsx", import.meta.url), "utf8");
    expect(card).toContain("PARENT_REPORT_CARD_TITLE_EN");
    expect(card).toContain("PARENT_REPORT_CARD_TITLE_MS");
    expect(PARENT_REPORT_CARD_TITLE_EN).toMatch(/monthly/i);
    expect(PARENT_REPORT_CARD_TITLE_EN).not.toMatch(/weekly/i);
    expect(card).toContain("<ParentEmailNotice />");
    expect(card).toContain("<ParentPremiumUpsell");
    expect(card).toContain('to="/parent"');
    expect(card).toContain("Preview My Report");
    expect(card).not.toContain("checkbox");
    expect(card).not.toMatch(/weekly learning/i);
    expect(parentPage).toContain("previousKualaLumpurMonth");
    expect(parentPage).toContain("previous calendar month");
    expect(parentPage).toContain("<ParentEmailNotice />");
    expect(parentPage).not.toContain("checkbox");
    expect(parentPage).not.toContain("ParentEmailConsent");
  });
});
