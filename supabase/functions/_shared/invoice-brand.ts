export const DEFAULT_INVOICE_LEGAL_NAME = "Lumina My Academy Digital";
export const DEFAULT_INVOICE_SUPPORT_EMAIL = "support@myacademy.my";
export const DEFAULT_INVOICE_WEBSITE = "www.myacademy.my";

export type InvoiceLegalDetails = {
  legalName: string;
  registration: string;
  address: string | null;
  supportEmail: string;
  website: string;
};

export function resolveInvoiceLegalDetails(
  getEnvironmentValue: (name: string) => string | undefined,
): InvoiceLegalDetails {
  return {
    legalName:
      getEnvironmentValue("ACADEMY_LEGAL_NAME")?.trim() || DEFAULT_INVOICE_LEGAL_NAME,
    registration:
      getEnvironmentValue("ACADEMY_SSM_NUMBER")?.trim() || "[Registration number]",
    address: getEnvironmentValue("ACADEMY_BUSINESS_ADDRESS")?.trim() || null,
    supportEmail: DEFAULT_INVOICE_SUPPORT_EMAIL,
    website: DEFAULT_INVOICE_WEBSITE,
  };
}
