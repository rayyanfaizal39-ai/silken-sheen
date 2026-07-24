import type { InvoiceLegalDetails } from "./invoice-brand.ts";

export type InvoicePdfData = {
  invoice_number: string;
  customer_name: string;
  customer_email: string;
  student_name: string | null;
  description: string;
  period_start: string;
  period_end: string;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  payment_status: string;
  payment_reference: string;
  invoice_date: string;
};

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;

function safePdfText(value: string | null | undefined) {
  return (value ?? "-")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7e]/g, "?")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function money(amount: number, currency: string) {
  return `${currency.toUpperCase()} ${amount.toFixed(2)}`;
}

function date(value: string) {
  return new Intl.DateTimeFormat("en-MY", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kuala_Lumpur",
  }).format(new Date(value));
}

function text(
  value: string,
  x: number,
  y: number,
  size = 10,
  font: "F1" | "F2" = "F1",
  color = "0.04 0.07 0.14",
) {
  return `BT /${font} ${size} Tf ${color} rg ${x} ${y} Td (${safePdfText(value)}) Tj ET`;
}

function buildContent(invoice: InvoicePdfData, legal: InvoiceLegalDetails) {
  return [
    "0.04 0.07 0.14 rg 0 742 595 100 re f",
    text("AcadeMY", 48, 790, 24, "F2", "1 1 1"),
    text("SUBSCRIPTION INVOICE", 48, 770, 9, "F2", "0.72 0.75 0.84"),
    text("PAID", 485, 790, 16, "F2", "0.05 0.55 0.34"),
    text(invoice.invoice_number, 390, 768, 9, "F1", "0.85 0.87 0.93"),
    text(legal.legalName, 48, 708, 12, "F2"),
    text(`SSM: ${legal.registration}`, 48, 690, 9, "F1", "0.38 0.43 0.53"),
    ...(legal.address
      ? [text(legal.address, 48, 674, 9, "F1", "0.38 0.43 0.53")]
      : []),
    text("Invoice date", 365, 708, 8, "F1", "0.38 0.43 0.53"),
    text(date(invoice.invoice_date), 450, 708, 8, "F2"),
    text("Payment reference", 365, 689, 8, "F1", "0.38 0.43 0.53"),
    text(invoice.payment_reference, 450, 689, 8, "F2"),
    text("Payment status", 365, 670, 8, "F1", "0.38 0.43 0.53"),
    text(invoice.payment_status.toUpperCase(), 450, 670, 8, "F2"),
    "0.88 0.90 0.94 RG 1 w 48 640 m 547 640 l S",
    text("BILL TO", 48, 615, 9, "F2", "0.39 0.40 0.95"),
    text(invoice.customer_name, 48, 591, 15, "F2"),
    text(invoice.customer_email, 48, 573, 10, "F1", "0.38 0.43 0.53"),
    ...(invoice.student_name
      ? [text(`Student: ${invoice.student_name}`, 48, 555, 10, "F1", "0.38 0.43 0.53")]
      : []),
    "0.04 0.07 0.14 rg 48 493 499 34 re f",
    text("DESCRIPTION", 62, 505, 9, "F2", "1 1 1"),
    text("PERIOD", 313, 505, 9, "F2", "1 1 1"),
    text("AMOUNT", 477, 505, 9, "F2", "1 1 1"),
    text(invoice.description, 62, 463, 10, "F2"),
    text(`${date(invoice.period_start)} - ${date(invoice.period_end)}`, 313, 463, 9),
    text(money(invoice.subtotal, invoice.currency), 467, 463, 10, "F2"),
    "0.88 0.90 0.94 RG 1 w 48 441 m 547 441 l S",
    text("Subtotal", 389, 400, 9, "F1", "0.38 0.43 0.53"),
    text(money(invoice.subtotal, invoice.currency), 473, 400, 9, "F2"),
    text("Tax", 389, 373, 9, "F1", "0.38 0.43 0.53"),
    text(money(invoice.tax, invoice.currency), 473, 373, 9, "F2"),
    text("Total paid", 389, 346, 11, "F2"),
    text(money(invoice.total, invoice.currency), 473, 346, 11, "F2", "0.05 0.55 0.34"),
    "0.96 0.97 1 rg 48 225 499 70 re f",
    text("Thank you for learning with AcadeMY.", 68, 267, 12, "F2"),
    text(
      "This invoice confirms payment for the subscription period shown above.",
      68,
      246,
      9,
      "F1",
      "0.38 0.43 0.53",
    ),
    text("This is a computer-generated invoice.", 48, 66, 8, "F1", "0.38 0.43 0.53"),
    text(legal.supportEmail, 330, 66, 8, "F1", "0.38 0.43 0.53"),
    text(legal.website, 472, 66, 8, "F2", "0.39 0.40 0.95"),
  ].join("\n");
}

function serializePdf(objects: string[]) {
  let output = "%PDF-1.4\n% AcadeMY invoice\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(output.length);
    output += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = output.length;
  output += `xref\n0 ${objects.length + 1}\n`;
  output += "0000000000 65535 f \n";
  output += offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
    .join("");
  output += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info 7 0 R >>\n`;
  output += `startxref\n${xrefOffset}\n%%EOF\n`;
  return new TextEncoder().encode(output);
}

export function generateInvoicePdf(invoice: InvoicePdfData, legal: InvoiceLegalDetails) {
  const content = buildContent(invoice, legal);
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    `<< /Title (${safePdfText(`AcadeMY Invoice ${invoice.invoice_number}`)}) /Author (AcadeMY) /Subject (Subscription payment invoice) >>`,
  ];
  return serializePdf(objects);
}
