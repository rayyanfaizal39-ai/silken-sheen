// Verify an actual browser-exported 1200 x 1800 card, not only its source codes.
// node scripts/verify-nova-download.mjs <png> <public-id> <12-digit-serial>
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { PNG } from "pngjs";
import jsQR from "jsqr";
import { BitArray, Code128Reader } from "@zxing/library";
const [file, publicId, serial] = process.argv.slice(2);
assert.ok(file && publicId && serial, "Supply PNG path, expected public ID and serial");
const png = PNG.sync.read(readFileSync(file));
assert.equal(png.width, 1200);
assert.equal(png.height, 1800);
const qr = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
assert.ok(qr, "Exported QR must decode");
assert.equal(new URL(qr.data).pathname, `/card/c/${publicId}`);
// Barcode occupies the fixed export region x=60..810, y=1510..1658.
const line = new BitArray(750);
for (let x = 0; x < 750; x++) {
  const offset = (1560 * png.width + 60 + x) * 4;
  if (png.data[offset] < 80 && png.data[offset + 1] < 80 && png.data[offset + 2] < 80) line.set(x);
}
assert.equal(new Code128Reader().decodeRow(0, line).getText(), serial);
console.log(`PASS: 1200×1800 export; QR → ${qr.data}; Code 128 → ${serial}`);
