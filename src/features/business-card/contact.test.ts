// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from "vitest";
import {
  BUSINESS_CARD_CONTACT,
  BUSINESS_CARD_VCF_FILENAME,
  createBusinessCardVCard,
  downloadBusinessCardVCard,
} from "./contact";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

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
      "TITLE:Chief Executive Officer (CEO)",
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
      title: "Chief Executive Officer (CEO)",
      email: "admin@academy.my",
      phone: "+60126761486",
      website: "https://www.myacademy.my",
    });
  });

  it("downloads the generated contact with the expected filename and MIME type", () => {
    vi.useFakeTimers();
    const createObjectURL = vi.fn(() => "blob:faizal-zain-contact");
    const revokeObjectURL = vi.fn();
    vi.stubGlobal("URL", { createObjectURL, revokeObjectURL });
    let clickedLink: { download: string; href: string; attached: boolean } | undefined;

    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function () {
      clickedLink = {
        download: this.download,
        href: this.href,
        attached: document.body.contains(this),
      };
    });

    downloadBusinessCardVCard();

    const blob = createObjectURL.mock.calls[0]?.[0];
    expect(blob).toBeInstanceOf(Blob);
    expect(blob?.type).toBe("text/vcard;charset=utf-8");
    expect(clickedLink).toEqual({
      download: BUSINESS_CARD_VCF_FILENAME,
      href: "blob:faizal-zain-contact",
      attached: true,
    });
    expect(document.querySelector(`a[download="${BUSINESS_CARD_VCF_FILENAME}"]`)).toBeNull();

    vi.runAllTimers();
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:faizal-zain-contact");
  });
});
