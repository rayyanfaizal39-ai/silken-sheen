export const BUSINESS_CARD_CONTACT = {
  firstName: "Faizal",
  lastName: "Zain",
  fullName: "Faizal Zain",
  organization: "AcadeMY",
  title: "Chief Executive Officer",
  email: "admin@academy.my",
  phone: "+60126761486",
  website: "https://www.myacademy.my",
} as const;

export const BUSINESS_CARD_VCF_FILENAME = "faizal-zain-academy.vcf";
export const BUSINESS_CARD_VCF_PATH = "/card/contact.vcf";

function escapeVCardValue(value: string): string {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll(/\r?\n/g, "\\n");
}

export function createBusinessCardVCard(): string {
  const contact = BUSINESS_CARD_CONTACT;

  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCardValue(contact.lastName)};${escapeVCardValue(contact.firstName)};;;`,
    `FN:${escapeVCardValue(contact.fullName)}`,
    `ORG:${escapeVCardValue(contact.organization)}`,
    `TITLE:${escapeVCardValue(contact.title)}`,
    `EMAIL;TYPE=INTERNET,WORK:${contact.email}`,
    `TEL;TYPE=CELL,VOICE:${contact.phone}`,
    `URL:${contact.website}`,
    "END:VCARD",
    "",
  ].join("\r\n");
}

export function createBusinessCardVCardResponse(): Response {
  return new Response(createBusinessCardVCard(), {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Disposition": `inline; filename="${BUSINESS_CARD_VCF_FILENAME}"`,
      "Content-Type": "text/vcard; charset=utf-8",
    },
  });
}
