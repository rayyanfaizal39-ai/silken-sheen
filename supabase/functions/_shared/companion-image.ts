// Technical checks for companion artwork (png-rgba-v1), shared by the worker and tests.
// Builds on validatePng (integrity, 1024x1536, complete decompression, SHA-256), then decodes
// the pixels to confirm a real transparent background and compute a perceptual hash.
// These are technical checks only: identity, anatomy and style are judged by a human reviewer.
import { validatePng } from "./nova-generation.ts";

export const COMPANION_VALIDATION = "png-rgba-v1";

export interface CompanionImageChecks {
  validation: typeof COMPANION_VALIDATION;
  width: number;
  height: number;
  /** Share of pixels that are fully transparent (alpha <= 8), in thousandths. */
  transparentPermille: number;
  /** Share of pixels that are clearly the subject (alpha >= 128), in thousandths. */
  subjectPermille: number;
  /** Highest alpha found in the four 16x16 corner blocks. */
  cornerAlphaMax: number;
  /** Subject bounding box, in pixels. */
  box: { left: number; top: number; right: number; bottom: number };
  /** Warnings for the reviewer; they do not reject the image by themselves. */
  warnings: string[];
}

export class CompanionImageError extends Error {
  constructor(readonly code: string) {
    super(code);
    this.name = "CompanionImageError";
  }
}

async function inflate(chunks: Uint8Array[], expected: number): Promise<Uint8Array> {
  const reader = new Blob(chunks as BlobPart[])
    .stream()
    .pipeThrough(new DecompressionStream("deflate"))
    .getReader();
  const out = new Uint8Array(expected);
  let offset = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (offset + value.length > expected) throw new CompanionImageError("invalid_png_size");
      out.set(value, offset);
      offset += value.length;
    }
  } finally {
    await reader.cancel();
  }
  if (offset !== expected) throw new CompanionImageError("invalid_png_size");
  return out;
}

/** Decode an 8-bit, non-interlaced RGBA PNG into raw RGBA pixels. */
export async function decodeRgbaPng(bytes: Uint8Array) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let offset = 8;
  let width = 0;
  let height = 0;
  const data: Uint8Array[] = [];
  while (offset + 12 <= bytes.length) {
    const length = view.getUint32(offset);
    const type = String.fromCharCode(...bytes.subarray(offset + 4, offset + 8));
    const body = bytes.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      width = view.getUint32(offset + 8);
      height = view.getUint32(offset + 12);
      const [depth, colour, , , interlace] = body.subarray(8, 13);
      if (depth !== 8 || colour !== 6 || interlace !== 0) throw new CompanionImageError("not_rgba");
    } else if (type === "IDAT") data.push(body);
    else if (type === "IEND") break;
    offset += length + 12;
  }
  if (!width || !height) throw new CompanionImageError("invalid_png");
  const stride = width * 4;
  const raw = await inflate(data, height * (stride + 1));
  const pixels = new Uint8Array(height * stride);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const row = y * stride;
    for (let x = 0; x < stride; x++) {
      const left = x >= 4 ? pixels[row + x - 4] : 0;
      const up = y ? pixels[row - stride + x] : 0;
      const upLeft = y && x >= 4 ? pixels[row - stride + x - 4] : 0;
      let predictor = 0;
      if (filter === 1) predictor = left;
      else if (filter === 2) predictor = up;
      else if (filter === 3) predictor = (left + up) >> 1;
      else if (filter === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        predictor = pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft;
      } else if (filter !== 0) throw new CompanionImageError("invalid_png_filter");
      pixels[row + x] = (line[x] + predictor) & 0xff;
    }
  }
  return { width, height, pixels };
}

/**
 * 64-bit difference hash of the alpha-weighted luminance on a 9x8 grid, as 16 hex digits.
 * Visually near-identical images have a small Hamming distance.
 */
export function perceptualHash(width: number, height: number, pixels: Uint8Array): string {
  const cols = 9;
  const rows = 8;
  const cells = new Float64Array(cols * rows);
  for (let gy = 0; gy < rows; gy++)
    for (let gx = 0; gx < cols; gx++) {
      const x0 = Math.floor((gx * width) / cols);
      const x1 = Math.floor(((gx + 1) * width) / cols);
      const y0 = Math.floor((gy * height) / rows);
      const y1 = Math.floor(((gy + 1) * height) / rows);
      let sum = 0;
      let n = 0;
      // Sample every fourth pixel: plenty for an 8x9 grid.
      for (let y = y0; y < y1; y += 4)
        for (let x = x0; x < x1; x += 4) {
          const i = (y * width + x) * 4;
          const alpha = pixels[i + 3] / 255;
          sum += (0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2]) * alpha;
          n++;
        }
      cells[gy * cols + gx] = n ? sum / n : 0;
    }
  let hex = "";
  for (let gy = 0; gy < rows; gy++) {
    let byte = 0;
    for (let gx = 0; gx < 8; gx++)
      byte = (byte << 1) | (cells[gy * cols + gx] < cells[gy * cols + gx + 1] ? 1 : 0);
    hex += byte.toString(16).padStart(2, "0");
  }
  return hex;
}

/** Number of differing bits between two 16-hex-digit hashes. */
export function hashDistance(a: string, b: string): number {
  let bits = 0;
  for (let i = 0; i < 16; i += 2) {
    let x = Number.parseInt(a.slice(i, i + 2), 16) ^ Number.parseInt(b.slice(i, i + 2), 16);
    while (x) {
      bits += x & 1;
      x >>= 1;
    }
  }
  return bits;
}

/**
 * Validate a provider image for a companion candidate. Throws CompanionImageError with a code
 * for anything that must not reach review: broken files, no alpha channel, an opaque or
 * filled background, or an empty or overflowing subject.
 */
export async function validateCompanionPng(base64: string) {
  let image: Awaited<ReturnType<typeof validatePng>>;
  try {
    image = await validatePng(base64);
  } catch (error) {
    throw new CompanionImageError((error as Error).message || "invalid_png");
  }
  const { width, height, pixels } = await decodeRgbaPng(image.bytes);
  let transparent = 0;
  let subject = 0;
  let left = width;
  let top = height;
  let right = -1;
  let bottom = -1;
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const alpha = pixels[(y * width + x) * 4 + 3];
      if (alpha <= 8) transparent++;
      if (alpha >= 128) {
        subject++;
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }
  let cornerAlphaMax = 0;
  for (const [cx, cy] of [
    [0, 0],
    [width - 16, 0],
    [0, height - 16],
    [width - 16, height - 16],
  ])
    for (let y = cy; y < cy + 16; y++)
      for (let x = cx; x < cx + 16; x++)
        cornerAlphaMax = Math.max(cornerAlphaMax, pixels[(y * width + x) * 4 + 3]);
  const total = width * height;
  const transparentPermille = Math.round((transparent * 1000) / total);
  const subjectPermille = Math.round((subject * 1000) / total);
  if (cornerAlphaMax > 8 || transparentPermille < 150)
    throw new CompanionImageError("background_not_transparent");
  if (subjectPermille < 30) throw new CompanionImageError("subject_too_small");
  if (subjectPermille > 850) throw new CompanionImageError("subject_too_large");
  const warnings: string[] = [];
  const margin = Math.min(left, top, width - 1 - right, height - 1 - bottom);
  if (margin <= 2) warnings.push("subject_touches_edge");
  else if (margin < 24) warnings.push("tight_margin");
  const checks: CompanionImageChecks = {
    validation: COMPANION_VALIDATION,
    width,
    height,
    transparentPermille,
    subjectPermille,
    cornerAlphaMax,
    box: { left, top, right, bottom },
    warnings,
  };
  return {
    bytes: image.bytes,
    sha256: image.sha256,
    phash: perceptualHash(width, height, pixels),
    checks,
  };
}
