export const BUSINESS_CARD_CONTACT = {
  firstName: "Faizal",
  lastName: "Zain",
  fullName: "Faizal Zain",
  organization: "AcadeMY",
  title: "Chief Executive Officer (CEO)",
  email: "admin@academy.my",
  phone: "+60126761486",
  website: "https://www.myacademy.my",
} as const;

export const BUSINESS_CARD_VCF_FILENAME = "faizal-zain-academy.vcf";

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

export function downloadBusinessCardVCard(): void {
  const blob = new Blob([createBusinessCardVCard()], {
    type: "text/vcard;charset=utf-8",
  });
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = objectUrl;
  link.download = BUSINESS_CARD_VCF_FILENAME;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
}
