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

/**
 * Permanent collectible serial: exactly twelve digit characters, leading zeros kept.
 * Rejects anything else — never pad or rewrite a stored serial into a different id.
 */
export function novaSerialDigits(serial: string): string {
  const value = String(serial ?? "");
  if (!/^\d{12}$/.test(value)) {
    throw new Error("Nova serial must contain twelve digits.");
  }
  return value;
}

export function barcodeSymbols(serial: string) {
  const padded = novaSerialDigits(serial);
  const data = padded.match(/../g)!.map(Number);
  const checksum = data.reduce((sum, code, i) => sum + code * (i + 1), 105) % 103;
  return [105, ...data, checksum, 106]; // Start C, six digit pairs, checksum, stop.
}

export function barcodeSvg(serial: string) {
  const padded = novaSerialDigits(serial);
  const quiet = 10; // ISO quiet zone: ≥10 narrow modules on both ends.
  let x = quiet;
  let bars = "";
  for (const symbol of barcodeSymbols(padded)) {
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
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${modules} 74" preserveAspectRatio="none" shape-rendering="crispEdges" role="img" aria-label="Code 128 barcode ${padded}"><rect width="100%" height="100%" fill="white"/><g fill="black">${bars}</g></svg>`;
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
