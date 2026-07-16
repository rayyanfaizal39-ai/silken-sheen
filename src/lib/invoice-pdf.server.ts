import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { InvoiceData } from "./billing.types";

function safePdfText(value: string | null | undefined) {
  return (value ?? "-")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "?");
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

export async function generateInvoicePdf(invoice: InvoiceData) {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`AcadeMY Invoice ${invoice.invoice_number}`);
  pdf.setAuthor("AcadeMY");
  pdf.setSubject("Subscription payment invoice");

  const page = pdf.addPage([595.28, 841.89]);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const navy = rgb(0.035, 0.067, 0.14);
  const violet = rgb(0.39, 0.4, 0.95);
  const muted = rgb(0.38, 0.43, 0.53);
  const green = rgb(0.05, 0.55, 0.34);
  const left = 48;
  const right = 547;

  page.drawRectangle({ x: 0, y: 742, width: 595.28, height: 100, color: navy });
  page.drawCircle({ x: 75, y: 793, size: 22, color: violet });
  page.drawText("A", { x: 66, y: 783, size: 26, font: bold, color: rgb(1, 1, 1) });
  page.drawText("AcadeMY", { x: 108, y: 791, size: 24, font: bold, color: rgb(1, 1, 1) });
  page.drawText("SUBSCRIPTION INVOICE", {
    x: 108,
    y: 771,
    size: 9,
    font: bold,
    color: rgb(0.66, 0.7, 0.8),
  });

  page.drawText("PAID", { x: 472, y: 786, size: 17, font: bold, color: green });
  page.drawText(safePdfText(invoice.invoice_number), {
    x: 390,
    y: 765,
    size: 10,
    font: regular,
    color: rgb(0.85, 0.87, 0.93),
  });

  page.drawText(process.env.ACADEMY_LEGAL_NAME ?? "AcadeMY [Legal company name]", {
    x: left,
    y: 708,
    size: 12,
    font: bold,
    color: navy,
  });
  page.drawText(`SSM: ${process.env.ACADEMY_SSM_NUMBER ?? "[Registration number]"}`, {
    x: left,
    y: 691,
    size: 9,
    font: regular,
    color: muted,
  });
  page.drawText(safePdfText(process.env.ACADEMY_BUSINESS_ADDRESS ?? "[Business address]"), {
    x: left,
    y: 676,
    size: 9,
    font: regular,
    color: muted,
  });

  const info = [
    ["Invoice date", date(invoice.invoice_date)],
    ["Payment reference", safePdfText(invoice.payment_reference)],
    ["Payment status", invoice.payment_status.toUpperCase()],
  ];
  info.forEach(([label, value], index) => {
    const y = 708 - index * 19;
    page.drawText(label, { x: 368, y, size: 8, font: regular, color: muted });
    page.drawText(value, { x: 449, y, size: 8, font: bold, color: navy });
  });

  page.drawLine({
    start: { x: left, y: 640 },
    end: { x: right, y: 640 },
    thickness: 1,
    color: rgb(0.88, 0.9, 0.94),
  });
  page.drawText("BILL TO", { x: left, y: 615, size: 9, font: bold, color: violet });
  page.drawText(safePdfText(invoice.customer_name), {
    x: left,
    y: 591,
    size: 15,
    font: bold,
    color: navy,
  });
  page.drawText(safePdfText(invoice.customer_email), {
    x: left,
    y: 573,
    size: 10,
    font: regular,
    color: muted,
  });
  if (invoice.student_name) {
    page.drawText(`Student: ${safePdfText(invoice.student_name)}`, {
      x: left,
      y: 555,
      size: 10,
      font: regular,
      color: muted,
    });
  }

  page.drawRectangle({ x: left, y: 493, width: right - left, height: 34, color: navy });
  page.drawText("DESCRIPTION", { x: 62, y: 505, size: 9, font: bold, color: rgb(1, 1, 1) });
  page.drawText("PERIOD", { x: 313, y: 505, size: 9, font: bold, color: rgb(1, 1, 1) });
  page.drawText("AMOUNT", { x: 477, y: 505, size: 9, font: bold, color: rgb(1, 1, 1) });
  page.drawText(safePdfText(invoice.description), {
    x: 62,
    y: 463,
    size: 10,
    font: bold,
    color: navy,
  });
  page.drawText(`${date(invoice.period_start)} - ${date(invoice.period_end)}`, {
    x: 313,
    y: 463,
    size: 9,
    font: regular,
    color: muted,
  });
  page.drawText(money(invoice.subtotal, invoice.currency), {
    x: 467,
    y: 463,
    size: 10,
    font: bold,
    color: navy,
  });
  page.drawLine({
    start: { x: left, y: 441 },
    end: { x: right, y: 441 },
    thickness: 1,
    color: rgb(0.88, 0.9, 0.94),
  });

  const totals = [
    ["Subtotal", money(invoice.subtotal, invoice.currency)],
    ["Tax", money(invoice.tax, invoice.currency)],
    ["Total paid", money(invoice.total, invoice.currency)],
  ];
  totals.forEach(([label, value], index) => {
    const y = 400 - index * 27;
    page.drawText(label, {
      x: 389,
      y,
      size: index === 2 ? 11 : 9,
      font: index === 2 ? bold : regular,
      color: index === 2 ? navy : muted,
    });
    page.drawText(value, {
      x: 473,
      y,
      size: index === 2 ? 11 : 9,
      font: bold,
      color: index === 2 ? green : navy,
    });
  });

  page.drawRectangle({
    x: left,
    y: 225,
    width: right - left,
    height: 70,
    color: rgb(0.96, 0.97, 1),
  });
  page.drawText("Thank you for learning with AcadeMY.", {
    x: 68,
    y: 267,
    size: 12,
    font: bold,
    color: navy,
  });
  page.drawText("This invoice confirms payment for the subscription period shown above.", {
    x: 68,
    y: 246,
    size: 9,
    font: regular,
    color: muted,
  });
  page.drawText("This is a computer-generated invoice.", {
    x: left,
    y: 66,
    size: 8,
    font: regular,
    color: muted,
  });
  page.drawText("myacademy.my", { x: 472, y: 66, size: 8, font: bold, color: violet });

  return pdf.save();
}
