// Original lightweight vector portraits. No external assets or image-generation calls.
import { mkdirSync, writeFileSync } from "node:fs";
const out = new URL("../public/nova/creatures/", import.meta.url);
mkdirSync(out, { recursive: true });
function portrait(fox) {
  const light = fox ? "#b8edff" : "#b1a3ff",
    mid = fox ? "#368dc4" : "#7752c9",
    dark = fox ? "#173950" : "#321b60",
    accent = fox ? "#63e1ed" : "#ffbc6b";
  const defs = `<defs><radialGradient id="night"><stop stop-color="${dark}"/><stop offset="1" stop-color="#090d1f"/></radialGradient><radialGradient id="fur" cx=".32" cy=".2" r=".85"><stop stop-color="${light}"/><stop offset=".4" stop-color="${mid}"/><stop offset="1" stop-color="${dark}"/></radialGradient><radialGradient id="cream" cx=".4" cy=".25"><stop stop-color="#fff8e5"/><stop offset=".6" stop-color="${fox ? "#d0edee" : "#ecc3ca"}"/><stop offset="1" stop-color="${mid}"/></radialGradient><radialGradient id="iris" cx=".4" cy=".25"><stop stop-color="#c9faff"/><stop offset=".45" stop-color="${fox ? "#4ecde7" : "#a995ff"}"/><stop offset="1" stop-color="#223659"/></radialGradient><linearGradient id="fire" x2=".6" y2="1"><stop stop-color="#ffe5a6"/><stop offset=".4" stop-color="#e3a1de"/><stop offset="1" stop-color="${mid}"/></linearGradient><radialGradient id="aura"><stop stop-color="${accent}" stop-opacity=".4"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient><filter id="glow"><feGaussianBlur stdDeviation="4"/></filter><filter id="soft"><feGaussianBlur stdDeviation="12"/></filter></defs>`;
  const stars = Array.from(
    { length: 38 },
    (_, i) =>
      `<circle cx="${(i * 113 + 19) % 512}" cy="${(i * 71 + 17) % 360}" r="${i % 5 === 0 ? 1.6 : 0.7}" fill="#f5d9a4" opacity="${0.2 + (i % 4) * 0.15}"/>`,
  ).join("");
  const tail = fox
    ? `<path d="M254 318 Q102 395 69 262 Q56 195 86 161 Q92 230 153 239 Q238 243 254 318" fill="url(#fur)" stroke="${light}" stroke-opacity=".4"/><path d="M86 161 Q83 216 134 235 L111 249 L126 266 Q85 260 69 231 Q64 188 86 161" fill="url(#cream)"/><path d="M307 323 Q424 348 444 261 Q455 218 431 200 Q432 244 383 251 Q322 255 307 323" fill="url(#fur)"/><path d="M431 200 Q440 234 411 251 L423 266 Q452 247 442 221Z" fill="url(#cream)"/>`
    : `<g fill="url(#fire)" stroke="#eac0ce" stroke-opacity=".45">${[-28, 0, 28].map((a, i) => `<path d="M259 295 Q${130 + i * 20} 356 ${174 + i * 39} 399 Q${268 + i * 8} 372 269 300" transform="rotate(${a} 256 300)"/>`).join("")}</g>`;
  const wings = fox
    ? ""
    : [-1, 1]
        .map(
          (side) =>
            `<g transform="translate(256 260) scale(${side} 1)">${Array.from({ length: 6 }, (_, i) => `<path d="M-42 ${i * 7} Q-${118 + i * 6} ${-13 - i * 17} -${175 - i * 12} ${-108 + i * 24} Q-${172 - i * 9} ${-20 + i * 15} -${68 - i * 2} ${41 + i * 5}" fill="url(#fire)" stroke="#f0d4df" stroke-opacity=".5" stroke-width="1.2"/>`).join("")}</g>`,
        )
        .join("");
  const ears = fox
    ? `<path d="M175 183 Q139 123 156 64 Q202 76 218 150 L297 150 Q318 75 360 64 Q376 124 337 184Z" fill="url(#fur)" stroke="${light}" stroke-opacity=".5" stroke-width="2"/><path d="M176 148 L165 88 Q192 105 202 150 M313 150 Q327 102 350 88 L337 151" fill="url(#cream)"/>`
    : `<path d="M223 151 Q195 110 225 77 Q229 104 248 108 Q238 63 264 42 Q252 86 286 110 Q309 80 315 94 Q331 135 295 160Z" fill="url(#fire)" stroke="#ebc9df" stroke-opacity=".5"/>`;
  const face = `<path d="M161 185 Q164 141 207 137 Q254 113 305 138 Q347 147 351 186 L363 206 L351 214 L364 231 L347 232 Q351 274 306 292 Q258 317 209 293 Q163 278 163 234 L148 231 L160 214 L148 204Z" fill="url(#fur)" stroke="${light}" stroke-opacity=".35" stroke-width="2"/>${fox ? '<path d="M165 219 Q193 215 215 245 Q255 226 296 245 Q320 215 350 218 Q349 280 300 292 Q255 312 211 292 Q169 280 165 219Z" fill="url(#cream)"/>' : ""}`;
  const eyes = [211, 302]
    .map(
      (x) =>
        `<g><ellipse cx="${x}" cy="220" rx="30" ry="36" fill="#12192b"/><ellipse cx="${x}" cy="219" rx="23" ry="29" fill="url(#iris)"/><ellipse cx="${x + 2}" cy="224" rx="13" ry="21" fill="#08162b"/><ellipse cx="${x - 9}" cy="206" rx="9" ry="10" fill="#fff"/><circle cx="${x + 12}" cy="230" r="4" fill="#d6ffff"/><path d="M${x - 27} 206 Q${x} 181 ${x + 27} 207" fill="none" stroke="${dark}" stroke-width="5" stroke-linecap="round"/></g>`,
    )
    .join("");
  const furLines = Array.from({ length: 18 }, (_, i) => {
    const x = 187 + ((i * 37) % 140),
      y = 151 + (i % 3) * 11;
    return `<path d="M${x} ${y} q-3 5 2 9" fill="none" stroke="${light}" stroke-width="1.5" opacity=".24"/>`;
  }).join("");
  const details = `<path d="M256 153 l4 11 11 4 -11 4 -4 12 -4-12 -11-4 11-4Z" fill="#ffdf91"/><path d="M${fox ? "247 260 Q256 254 265 260 Q256 274 247 260" : "245 260 Q256 253 267 260 L256 279Z"}" fill="${fox ? "#30394e" : "#f5bf69"}"/>${fox ? '<path d="M256 269 Q245 282 237 273 M256 269 Q267 282 275 273" stroke="#72526c" stroke-width="2.5" fill="none" stroke-linecap="round"/>' : ""}<ellipse cx="187" cy="252" rx="13" ry="5" fill="#eba7bf" opacity=".4"/><ellipse cx="326" cy="252" rx="13" ry="5" fill="#eba7bf" opacity=".4"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 420" width="512" height="420"><title>${fox ? "Magical Fox" : "Phoenix"} — original Nova preview illustration</title>${defs}<rect width="512" height="420" fill="url(#night)"/>${stars}<circle cx="256" cy="205" r="200" fill="url(#aura)"/><circle cx="256" cy="200" r="151" fill="none" stroke="#e5c485" opacity=".16"/><path d="M65 312 Q256 363 447 312" fill="none" stroke="${accent}" opacity=".18"/><ellipse cx="256" cy="368" rx="125" ry="15" fill="${accent}" opacity=".2" filter="url(#soft)"/>${tail}${wings}<ellipse cx="256" cy="302" rx="69" ry="65" fill="url(#fur)"/><path d="M221 286 Q256 303 292 286 Q284 346 256 355 Q225 339 221 286" fill="url(#cream)"/><ellipse cx="211" cy="354" rx="31" ry="15" fill="url(#fur)"/><ellipse cx="300" cy="354" rx="31" ry="15" fill="url(#fur)"/>${ears}${face}${furLines}${eyes}${details}<g fill="${accent}" opacity=".8"><path d="M101 127 l3 9 9 3 -9 3 -3 9 -3-9 -9-3 9-3Z M411 176 l3 9 9 3 -9 3 -3 9 -3-9 -9-3 9-3Z"/></g></svg>`;
}
for (const name of ["phoenix", "fox"])
  writeFileSync(new URL(name + ".svg", out), portrait(name === "fox"));
for (const [name, index] of [
  ["islands", 0],
  ["lagoon", 1],
  ["forest", 2],
]) {
  const shapes =
    index === 0
      ? '<path d="M20 110 L68 60 L115 103 L92 128 L53 130Z M153 82 L190 38 L231 82 L201 110 L171 107Z" fill="#687da4"/><path d="M20 110 L115 103 L71 158Z M153 82 L231 82 L190 132Z" fill="#303654"/>'
      : index === 1
        ? '<path d="M0 96 Q70 63 133 93 Q200 71 260 90V180H0Z" fill="#256080"/><path d="M0 124 Q130 97 260 127 M30 151 Q150 126 230 147" stroke="#78d8ed" fill="none" opacity=".6"/>'
        : '<g fill="#5c8c91" stroke="#a4bfcf" stroke-width="1"><path d="M25 136 L48 34 L74 137Z M93 140 L121 12 L149 140Z M167 143 L194 42 L222 143Z"/></g>';
  writeFileSync(
    new URL(name + ".svg", out),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 180"><defs><linearGradient id="b" x2="0" y2="1"><stop stop-color="#172b48"/><stop offset="1" stop-color="#131022"/></linearGradient></defs><rect width="260" height="180" fill="url(#b)"/><circle cx="201" cy="36" r="17" fill="#edd9aa"/>${shapes}<g fill="#e3c89a"><circle cx="29" cy="24" r="1"/><circle cx="134" cy="30" r="1.3"/><circle cx="163" cy="69" r="1"/><circle cx="84" cy="57" r="1"/></g></svg>`,
  );
}
console.log("Wrote two original creature portraits and three habitat thumbnails.");
