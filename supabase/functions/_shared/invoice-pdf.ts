import type { InvoiceLegalDetails } from "./invoice-brand.ts";
import { ACADEMY_LOGO_BYTES } from "./academy-logo.ts";

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
const encoder = new TextEncoder();

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
    "0.008 0.024 0.09 rg 0 742 595 100 re f",
    "q 150 0 0 35.36 48 782 cm /Logo Do Q",
    text("SUBSCRIPTION INVOICE", 48, 770, 9, "F2", "0.72 0.75 0.84"),
    text("PAID", 485, 790, 16, "F2", "0.05 0.55 0.34"),
    text(invoice.invoice_number, 390, 768, 9, "F1", "0.85 0.87 0.93"),
    text(legal.legalName, 48, 708, 12, "F2"),
    text(`SSM: ${legal.registration}`, 48, 690, 9, "F1", "0.38 0.43 0.53"),
    ...(legal.address ? [text(legal.address, 48, 674, 9, "F1", "0.38 0.43 0.53")] : []),
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

function concatBytes(parts: Uint8Array[]) {
  const output = new Uint8Array(parts.reduce((total, part) => total + part.length, 0));
  let offset = 0;
  for (const part of parts) {
    output.set(part, offset);
    offset += part.length;
  }
  return output;
}

function uint32(bytes: Uint8Array, offset: number) {
  return (
    bytes[offset] * 0x1000000 +
    bytes[offset + 1] * 0x10000 +
    bytes[offset + 2] * 0x100 +
    bytes[offset + 3]
  );
}

async function transformDeflate(bytes: Uint8Array, mode: "compress" | "decompress") {
  const stream =
    mode === "compress" ? new CompressionStream("deflate") : new DecompressionStream("deflate");
  const transformed = new Blob([bytes]).stream().pipeThrough(stream);
  return new Uint8Array(await new Response(transformed).arrayBuffer());
}

async function buildLogoImage(png: Uint8Array) {
  const signature = [137, 80, 78, 71, 13, 10, 26, 10];
  if (!signature.every((byte, index) => png[index] === byte)) {
    throw new Error("Invoice logo is not a PNG");
  }

  let width = 0;
  let height = 0;
  const idatChunks: Uint8Array[] = [];
  for (let offset = 8; offset + 12 <= png.length; ) {
    const length = uint32(png, offset);
    const type = String.fromCharCode(...png.subarray(offset + 4, offset + 8));
    const data = png.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      width = uint32(data, 0);
      height = uint32(data, 4);
      if (data[8] !== 8 || data[9] !== 6 || data[10] !== 0 || data[11] !== 0 || data[12] !== 0) {
        throw new Error("Invoice logo must be a non-interlaced 8-bit RGBA PNG");
      }
    } else if (type === "IDAT") {
      idatChunks.push(data);
    } else if (type === "IEND") {
      break;
    }
    offset += length + 12;
  }
  if (!width || !height || idatChunks.length === 0) {
    throw new Error("Invoice logo PNG is incomplete");
  }

  const rgba = await transformDeflate(concatBytes(idatChunks), "decompress");
  const bytesPerPixel = 4;
  const rowLength = width * bytesPerPixel;
  const rgb = new Uint8Array(height * width * 3);
  let sourceOffset = 0;
  let targetOffset = 0;
  let previous = new Uint8Array(rowLength);
  for (let y = 0; y < height; y += 1) {
    const filter = rgba[sourceOffset++];
    const row = new Uint8Array(rowLength);
    for (let x = 0; x < rowLength; x += 1) {
      const left = x >= bytesPerPixel ? row[x - bytesPerPixel] : 0;
      const above = previous[x];
      const upperLeft = x >= bytesPerPixel ? previous[x - bytesPerPixel] : 0;
      const paethBase = left + above - upperLeft;
      const leftDistance = Math.abs(paethBase - left);
      const aboveDistance = Math.abs(paethBase - above);
      const upperLeftDistance = Math.abs(paethBase - upperLeft);
      const paeth =
        leftDistance <= aboveDistance && leftDistance <= upperLeftDistance
          ? left
          : aboveDistance <= upperLeftDistance
            ? above
            : upperLeft;
      const predictor =
        filter === 0
          ? 0
          : filter === 1
            ? left
            : filter === 2
              ? above
              : filter === 3
                ? Math.floor((left + above) / 2)
                : filter === 4
                  ? paeth
                  : -1;
      if (predictor < 0) throw new Error("Invoice logo uses an unsupported PNG filter");
      row[x] = (rgba[sourceOffset++] + predictor) & 0xff;
    }

    for (let x = 0; x < rowLength; x += bytesPerPixel) {
      if (row[x + 3] !== 255) throw new Error("Invoice logo must be fully opaque");
      rgb[targetOffset++] = row[x];
      rgb[targetOffset++] = row[x + 1];
      rgb[targetOffset++] = row[x + 2];
    }
    previous = row;
  }

  return {
    width,
    height,
    data: await transformDeflate(rgb, "compress"),
  };
}

function pdfStream(dictionary: string, data: Uint8Array) {
  return concatBytes([
    encoder.encode(`<< ${dictionary} /Length ${data.length} >>\nstream\n`),
    data,
    encoder.encode("\nendstream"),
  ]);
}

function serializePdf(objects: Array<string | Uint8Array>) {
  const parts = [encoder.encode("%PDF-1.4\n% AcadeMY invoice\n")];
  let outputLength = parts[0].length;
  const offsets = [0];
  objects.forEach((object, index) => {
    const bytes = typeof object === "string" ? encoder.encode(object) : object;
    const header = encoder.encode(`${index + 1} 0 obj\n`);
    const footer = encoder.encode("\nendobj\n");
    offsets.push(outputLength);
    parts.push(header, bytes, footer);
    outputLength += header.length + bytes.length + footer.length;
  });
  const xrefOffset = outputLength;
  let trailer = `xref\n0 ${objects.length + 1}\n`;
  trailer += "0000000000 65535 f \n";
  trailer += offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
    .join("");
  trailer += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info 8 0 R >>\n`;
  trailer += `startxref\n${xrefOffset}\n%%EOF\n`;
  parts.push(encoder.encode(trailer));
  return concatBytes(parts);
}

export async function generateInvoicePdf(invoice: InvoicePdfData, legal: InvoiceLegalDetails) {
  const content = buildContent(invoice, legal);
  const logo = await buildLogoImage(ACADEMY_LOGO_BYTES);
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> /XObject << /Logo 6 0 R >> >> /Contents 7 0 R >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    pdfStream(
      `/Type /XObject /Subtype /Image /Width ${logo.width} /Height ${logo.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode`,
      logo.data,
    ),
    pdfStream("", encoder.encode(content)),
    `<< /Title (${safePdfText(`AcadeMY Invoice ${invoice.invoice_number}`)}) /Author (AcadeMY) /Subject (Subscription payment invoice) >>`,
  ];
  return serializePdf(objects);
}
