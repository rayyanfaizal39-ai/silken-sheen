// ISO/IEC 15417 Code 128 symbol widths, ordered by symbol value (0–106).
const WIDTHS = [
  "212222",
  "222122",
  "222221",
  "121223",
  "121322",
  "131222",
  "122213",
  "122312",
  "132212",
  "221213",
  "221312",
  "231212",
  "112232",
  "122132",
  "122231",
  "113222",
  "123122",
  "123221",
  "223211",
  "221132",
  "221231",
  "213212",
  "223112",
  "312131",
  "311222",
  "321122",
  "321221",
  "312212",
  "322112",
  "322211",
  "212123",
  "212321",
  "232121",
  "111323",
  "131123",
  "131321",
  "112313",
  "132113",
  "132311",
  "211313",
  "231113",
  "231311",
  "112133",
  "112331",
  "132131",
  "113123",
  "113321",
  "133121",
  "313121",
  "211331",
  "231131",
  "213113",
  "213311",
  "213131",
  "311123",
  "311321",
  "331121",
  "312113",
  "312311",
  "332111",
  "314111",
  "221411",
  "431111",
  "111224",
  "111422",
  "121124",
  "121421",
  "141122",
  "141221",
  "112214",
  "112412",
  "122114",
  "122411",
  "142112",
  "142211",
  "241211",
  "221114",
  "413111",
  "241112",
  "134111",
  "111242",
  "121142",
  "121241",
  "114212",
  "124112",
  "124211",
  "411212",
  "421112",
  "421211",
  "212141",
  "214121",
  "412121",
  "111143",
  "111341",
  "131141",
  "114113",
  "114311",
  "411113",
  "411311",
  "113141",
  "114131",
  "311141",
  "411131",
  "211412",
  "211214",
  "211232",
  "2331112",
];

/** Human-readable body alphabet — no O/0 or I/1. Matches DB generator. */
export const NOVA_SERIAL_BODY_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

/** Legacy production serials until a separately approved reissue completes. */
export const NOVA_LEGACY_SERIAL_PATTERN = /^\d{12}$/;

/** Permanent collectible serial: rarity prefix + hyphen + 8 secure body chars. */
export const NOVA_COLLECTIBLE_SERIAL_PATTERN =
  /^[CREL]-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{8}$/;

const CODE128_START_B = 104;
const CODE128_START_C = 105;
const CODE128_STOP = 106;

export type NovaSerialPrefix = "C" | "R" | "E" | "L";

/** Map stored rarity to the collectible serial letter prefix. */
export function raritySerialPrefix(rarity: string): NovaSerialPrefix {
  switch (rarity) {
    case "Common":
      return "C";
    case "Rare":
      return "R";
    case "Epic":
      return "E";
    case "Legendary":
      return "L";
    default:
      throw new Error("Unknown Nova rarity");
  }
}

export function isLegacyNovaSerial(serial: string): boolean {
  return NOVA_LEGACY_SERIAL_PATTERN.test(serial);
}

export function isCollectibleNovaSerial(serial: string): boolean {
  return NOVA_COLLECTIBLE_SERIAL_PATTERN.test(serial);
}

/**
 * Stored card serial as returned by the database — never rewritten here.
 * Accepts legacy twelve-digit serials and the new R-XXXXXXXX collectible format
 * so existing production cards keep rendering until a gated reissue is applied.
 */
export function novaCardSerial(serial: string): string {
  const value = String(serial ?? "");
  if (isLegacyNovaSerial(value) || isCollectibleNovaSerial(value)) return value;
  throw new Error("Nova serial must be twelve digits or R-XXXXXXXX collectible format.");
}

/**
 * Alias kept for call sites that still import the collectible name.
 * MUST accept legacy twelve-digit serials during the transition — never collectible-only.
 */
export const novaCollectibleSerial = novaCardSerial;

/** @deprecated Prefer novaCardSerial — accepts both formats during the transition. */
export const novaSerialDigits = novaCardSerial;

/** Short body shown on the card front footer (never mutates the stored serial). */
export function novaSerialBody(serial: string): string {
  const value = novaCardSerial(serial);
  return isLegacyNovaSerial(value) ? value.slice(-8) : value.slice(2);
}

export function barcodeSymbols(serial: string) {
  const value = novaCardSerial(serial);
  if (isLegacyNovaSerial(value)) {
    // Code 128 Subset C: six digit pairs for exactly twelve numeric characters.
    const data = value.match(/../g)!.map(Number);
    const checksum = data.reduce((sum, code, i) => sum + code * (i + 1), CODE128_START_C) % 103;
    return [CODE128_START_C, ...data, checksum, CODE128_STOP];
  }
  // Code 128 Subset B: printable ASCII (space–~) via charCode - 32.
  const data = [...value].map((ch) => {
    const code = ch.charCodeAt(0) - 32;
    if (code < 0 || code > 94) {
      throw new Error("Unsupported Code 128 character");
    }
    return code;
  });
  const checksum =
    data.reduce((sum, code, i) => sum + code * (i + 1), CODE128_START_B) % 103;
  return [CODE128_START_B, ...data, checksum, CODE128_STOP];
}

export function barcodeSvg(serial: string) {
  const value = novaCardSerial(serial);
  const quiet = 10; // ISO quiet zone: ≥10 narrow modules on both ends.
  let x = quiet;
  let bars = "";
  for (const symbol of barcodeSymbols(value)) {
    [...WIDTHS[symbol]].forEach((width, i) => {
      // Full viewBox height — scanners need tall bars; quiet zones are horizontal only.
      if (i % 2 === 0) bars += `<rect x="${x}" y="0" width="${width}" height="74"/>`;
      x += Number(width);
    });
  }
  const modules = x + quiet;
  // Wide strip aspect so CSS width:100% + fixed height fills the card, not a letterboxed box.
  const svgWidth = modules * 8;
  const svgHeight = 64;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${modules} 74" preserveAspectRatio="none" shape-rendering="crispEdges" role="img" aria-label="Code 128 barcode ${value}"><rect width="100%" height="100%" fill="white"/><g fill="black">${bars}</g></svg>`;
}

export const svgUrl = (svg: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
export async function qrDataUrl(url: string) {
  // Keep qrcode's Node-only PNG helpers out of the Cloudflare SSR startup path.
  // This runs only when the browser renders or exports a card.
  const { default: QRCode } = await import("qrcode");
  return QRCode.toDataURL(url, {
    width: 600,
    margin: 4,
    errorCorrectionLevel: "H",
    color: { dark: "#081225", light: "#ffffff" },
  });
}
