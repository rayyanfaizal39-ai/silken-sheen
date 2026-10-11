import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import jsQR from "jsqr";
import { PNG } from "pngjs";
import { describe, expect, it } from "vitest";
import { BUSINESS_CARD_QR_PATH, BUSINESS_CARD_QR_SIZE, BUSINESS_CARD_URL } from "./qr-code";

describe("business card QR code", () => {
  it("uses the canonical production card URL", () => {
    expect(BUSINESS_CARD_URL).toBe("https://www.myacademy.my/card/");
    expect(BUSINESS_CARD_URL).not.toContain("localhost");
    expect(BUSINESS_CARD_URL).not.toContain("127.0.0.1");
  });

  it("decodes the printable PNG asset back to the production URL", () => {
    const qrPath = resolve(process.cwd(), "public", BUSINESS_CARD_QR_PATH.replace(/^\//, ""));
    const png = PNG.sync.read(readFileSync(qrPath));
    const pixels = new Uint8ClampedArray(png.data.buffer, png.data.byteOffset, png.data.byteLength);
    const result = jsQR(pixels, png.width, png.height, { inversionAttempts: "dontInvert" });

    expect(png.width).toBe(BUSINESS_CARD_QR_SIZE);
    expect(png.height).toBe(BUSINESS_CARD_QR_SIZE);
    expect(result?.data).toBe(BUSINESS_CARD_URL);
  });
});
