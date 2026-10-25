import { awakenedAnatomy } from "./awakened-artwork";
import { speciesAnatomy } from "./species-artwork";
import type { NovaTraits } from "./model";
import { xml } from "./model";

// Original vector sample artwork. Only the requested, earned stage is rendered.
// Identity (species, palette, eye treatment, marking and variant) persists across stages.
export function companionSvg(traits: NovaTraits, variant: "a" | "b", stage = 1) {
  return renderCompanion(traits, variant, stage, false);
}

// Explicit preview path: never changes a real card, its XP, or its earned artwork.
export function companionPreviewSvg(traits: NovaTraits, variant: "a" | "b", stage: 1 | 2) {
  if (stage !== 1 && stage !== 2)
    throw new Error("Only Origin and Awakened previews are available.");
  return renderCompanion(traits, variant, stage, stage === 2);
}

function renderCompanion(traits: NovaTraits, variant: "a" | "b", stage: number, awakened: boolean) {
  if (!Number.isInteger(stage) || stage < 1 || stage > 5)
    throw new Error("Invalid evolution stage");
  const artStage = awakened ? 2 : [1, 3, 5, 7, 9][stage - 1];
  const fox = traits.creature === "Magical Fox";
  const palette = traits.colours.startsWith("Emerald")
    ? ["#103d36", "#55d6ad", "#c8e1e8"]
    : traits.colours.startsWith("Sapphire")
      ? ["#113c9b", "#4ba9ed", "#f4cf75"]
      : traits.colours.startsWith("Pearl")
        ? ["#71487f", "#e9aece", "#ffdfd6"]
        : ["#17132e", "#8652df", "#e3b36c"];
  const [dark, light, gold] = palette;
  const eye = traits.eyes.startsWith("Emerald")
    ? "#6df2b4"
    : traits.eyes.startsWith("Cosmic")
      ? "#ad9bff"
      : traits.eyes.startsWith("Ocean")
        ? "#62e9ff"
        : "#f8d882";
  const stars = Array.from(
    { length: 55 },
    (_, i) =>
      `<circle cx="${(i * 107 + 19) % 600}" cy="${(i * 71 + 13) % 640}" r="${i % 4 === 0 ? 1.8 : 0.8}" fill="${gold}" opacity="${0.15 + (i % 5) * 0.12}"/>`,
  ).join("");
  const tails = Array.from(
    { length: fox ? Math.min(artStage, 9) : Math.min(artStage + (variant === "a" ? 1 : 2), 8) },
    (_, i) => {
      const angle =
        (i -
          (fox ? Math.min(artStage, 9) : Math.min(artStage + (variant === "a" ? 1 : 2), 8)) / 2 +
          0.5) *
        (fox ? 22 : 16);
      return `<path d="${fox ? "M300 440 Q120 455 125 270 Q170 315 260 345 Q295 380 300 440" : variant === "a" ? "M300 420 Q150 520 190 570 Q250 550 300 440" : "M300 410 Q410 490 350 580 Q300 560 295 425"}" fill="url(#body)" stroke="${gold}" stroke-opacity=".6" stroke-width="2" transform="rotate(${angle} 300 420)"/>`;
    },
  ).join("");
  const wings = !fox
    ? [-1, 1]
        .map(
          (side) =>
            `<g transform="translate(300 320) scale(${side} 1)"><path d="M-20 40 Q-100 30 -${(variant === "a" ? 125 : 200) + artStage * 9} -${variant === "a" ? artStage * 8 : 45 + artStage * 8} Q-135 110 -25 130" fill="url(#wing)" stroke="${gold}" stroke-width="2"/>${Array.from({ length: artStage + 2 }, (_, i) => `<path d="M-25 85 Q-${65 + i * 12} ${45 + i * 6} -${95 + i * 8} ${i * 9}" fill="none" stroke="${light}" stroke-width="3"/>`).join("")}</g>`,
        )
        .join("")
    : "";
  const aura =
    artStage >= 3
      ? `<ellipse cx="300" cy="320" rx="${150 + artStage * 5}" ry="${175 + artStage * 4}" fill="none" stroke="${gold}" stroke-width="${artStage >= 8 ? 3 : 1}" stroke-dasharray="${artStage >= 7 ? "3 8" : "1 15"}" opacity=".6"/>`
      : "";
  const crest =
    artStage >= 4
      ? `<path d="M260 204 L250 ${178 - artStage * 3} L285 180 L300 ${155 - artStage * 3} L317 180 L350 ${178 - artStage * 3} L340 204" fill="${gold}" stroke="#fff0b9" stroke-width="2"/>`
      : "";
  const mantle =
    artStage >= 5
      ? `<path d="M230 350 L205 455 L255 425 L300 460 L345 425 L395 455 L370 350" fill="${dark}" stroke="${gold}" stroke-width="3"/>`
      : "";
  const constellation =
    artStage >= 6
      ? `<g fill="${gold}" stroke="${gold}" stroke-width="1"><path d="M110 180 L150 110 L300 75 L450 110 L490 180" fill="none"/>${[110, 150, 300, 450, 490].map((x, i) => `<circle cx="${x}" cy="${[180, 110, 75, 110, 180][i]}" r="${artStage >= 8 ? 6 : 3}"/>`).join("")}</g>`
      : "";
  const legendary =
    artStage === 9
      ? `<g fill="none" stroke="${gold}"><circle cx="300" cy="310" r="235" stroke-width="3"/><circle cx="300" cy="310" r="226" stroke-dasharray="1 12" stroke-width="6"/><path d="M300 44 L315 72 L300 100 L285 72Z" fill="${gold}"/></g>`
      : "";
  const ears = fox
    ? `<path d="M215 262 L196 ${variant === "a" ? 150 : 125} Q250 155 268 220 M332 220 Q350 155 404 ${variant === "a" ? 150 : 125} L385 262" fill="url(#body)" stroke="${gold}" stroke-width="2"/><path d="M220 232 L214 175 L250 223 M350 223 L386 175 L380 232" fill="${gold}" opacity=".8"/>`
    : `<path d="${variant === "a" ? "M270 220 Q245 150 288 175 Q300 120 312 175 Q355 140 335 220" : "M265 218 Q230 110 300 125 Q340 90 371 146 Q330 130 335 215"}" fill="url(#wing)" stroke="${gold}" stroke-width="2"/>`;
  const eyes = [262, 338]
    .map(
      (x) =>
        `<ellipse cx="${x}" cy="279" rx="${variant === "a" ? 21 : 17}" ry="25" fill="#050817"/><ellipse cx="${x}" cy="278" rx="14" ry="19" fill="${eye}"/><ellipse cx="${x + 2}" cy="280" rx="7" ry="13" fill="#10112d"/><circle cx="${x - 5}" cy="270" r="6" fill="white"/><circle cx="${x + 7}" cy="285" r="2.5" fill="white"/>`,
    )
    .join("");
  const marking =
    traits.marking === "A shimmering spiral"
      ? `<path d="M300 234 c-20 0 -20 -25 0 -25 c14 0 14 18 0 18 c-7 0 -7 -9 0 -9" fill="none" stroke="${gold}" stroke-width="3"/>`
      : traits.marking.startsWith("A crescent")
        ? `<path d="M307 230 A13 13 0 1 1 294 211 A10 10 0 0 0 307 230" fill="${gold}"/>`
        : `<path d="M300 211 L304 222 L316 226 L304 230 L300 242 L296 230 L284 226 L296 222Z" fill="${gold}"/>`;
  const anatomy =
    speciesAnatomy(traits.creature, light, dark, gold, awakened ? 2 : stage, variant) ??
    (awakened ? awakenedAnatomy(fox, light, dark, gold) : null);
  const body = `<ellipse cx="300" cy="389" rx="${variant === "a" ? 83 : 67}" ry="103" fill="url(#body)" stroke="${gold}" stroke-width="2"/><path d="M258 346 Q300 367 342 346 Q345 430 300 457 Q255 430 258 346" fill="${gold}" opacity=".75"/>`;
  const face = `${anatomy?.ears ?? ears}<ellipse cx="300" cy="279" rx="${variant === "a" ? 101 : 82}" ry="${variant === "a" ? 86 : 97}" fill="url(#body)" stroke="${light}" stroke-width="3"/>${crest}${marking}${eyes}<path d="M284 307 Q300 ${fox ? 320 : 339} 316 307 Q300 301 284 307" fill="${gold}"/>${fox ? '<path d="M300 317 Q288 335 278 325 M300 317 Q312 335 322 325" fill="none" stroke="#d8bbdf" stroke-width="2"/>' : ""}`;
  const feet = `<ellipse cx="248" cy="476" rx="32" ry="19" fill="${dark}" stroke="${gold}" stroke-width="2"/><ellipse cx="352" cy="476" rx="32" ry="19" fill="${dark}" stroke="${gold}" stroke-width="2"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="640" viewBox="0 0 600 640" role="img"><title>${xml(`${traits.creature} · Stage ${stage} · ${traits.colours}`)}</title><defs><radialGradient id="bg"><stop stop-color="${dark}"/><stop offset="1" stop-color="#050c1c"/></radialGradient><radialGradient id="halo"><stop stop-color="${light}" stop-opacity=".35"/><stop offset="1" stop-color="${light}" stop-opacity="0"/></radialGradient><linearGradient id="body" x2=".8" y2="1"><stop stop-color="${light}"/><stop offset=".55" stop-color="${variant === "a" ? dark : light}"/><stop offset="1" stop-color="${light}"/></linearGradient><linearGradient id="wing" x2="1" y2="1"><stop stop-color="${gold}"/><stop offset=".45" stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></linearGradient></defs><rect width="600" height="640" fill="url(#bg)"/>${stars}<circle cx="300" cy="310" r="280" fill="url(#halo)"/>${legendary}${constellation}${aura}<ellipse cx="300" cy="525" rx="150" ry="17" fill="${light}" opacity=".12"/>${anatomy?.tails ?? tails}${anatomy?.wings ?? wings}${mantle}${anatomy?.body ?? body}${awakened ? `<g data-identity="original-face" transform="translate(0 -18)">${face}<g fill="${fox ? "#7cddf4" : gold}" opacity=".85"><path d="M232 301 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3Z M368 301 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3Z"/></g></g>` : face}${anatomy?.feet ?? feet}${anatomy?.details ?? ""}${artStage >= 7 ? `<path d="M260 362 L300 340 L340 362 L300 397Z" fill="${light}" stroke="${gold}" stroke-width="3"/>` : ""}<g fill="${gold}" opacity=".7"><path d="M122 330 l4 12 12 4 -12 4 -4 12 -4 -12 -12 -4 12 -4Z"/><path d="M470 240 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3Z"/></g></svg>`;
}
