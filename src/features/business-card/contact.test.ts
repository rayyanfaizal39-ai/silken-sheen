import { describe, expect, it } from "vitest";
import {
  BUSINESS_CARD_CONTACT,
  BUSINESS_CARD_VCF_FILENAME,
  BUSINESS_CARD_VCF_PATH,
  createBusinessCardVCard,
  createBusinessCardVCardResponse,
} from "./contact";

describe("business card vCard", () => {
  it("creates a standards-compatible vCard 3.0 contact", () => {
    const vCard = createBusinessCardVCard();
    const lines = vCard.split("\r\n");

    expect(lines).toEqual([
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:Zain;Faizal;;;",
      "FN:Faizal Zain",
      "ORG:AcadeMY",
      "TITLE:Chief Executive Officer",
      "EMAIL;TYPE=INTERNET,WORK:admin@academy.my",
      "TEL;TYPE=CELL,VOICE:+60126761486",
      "URL:https://www.myacademy.my",
      "END:VCARD",
      "",
    ]);
    expect(vCard).not.toMatch(/(^|[^\r])\n/);
  });

  it("keeps the download filename and contact data stable", () => {
    expect(BUSINESS_CARD_VCF_FILENAME).toBe("faizal-zain-academy.vcf");
    expect(BUSINESS_CARD_CONTACT).toMatchObject({
      fullName: "Faizal Zain",
      title: "Chief Executive Officer",
      email: "admin@academy.my",
      phone: "+60126761486",
      website: "https://www.myacademy.my",
    });
    expect(BUSINESS_CARD_VCF_PATH).toBe("/card/contact.vcf");
  });

  it("serves an inline vCard so supported mobile browsers can open contact import", async () => {
    const response = createBusinessCardVCardResponse();

    expect(response.headers.get("content-type")).toBe("text/vcard; charset=utf-8");
    expect(response.headers.get("content-disposition")).toBe(
      `inline; filename="${BUSINESS_CARD_VCF_FILENAME}"`,
    );
    expect(await response.text()).toBe(createBusinessCardVCard());
  });
});
