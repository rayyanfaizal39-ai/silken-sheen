/** Original SVG anatomy for the additional companions; shared face/eyes stay in artwork.ts. */
export function speciesAnatomy(
  species: string,
  light: string,
  dark: string,
  accent: string,
  stage: number,
  variant: "a" | "b",
) {
  if (!["Dragon", "Lion", "Unicorn"].includes(species)) return null;
  const grown = stage - 1;
  const stroke = `stroke="${accent}" stroke-width="3" stroke-linejoin="round"`;
  const body = `<ellipse cx="300" cy="400" rx="${78 + grown * 2}" ry="105" fill="url(#body)" ${stroke}/><ellipse cx="300" cy="409" rx="48" ry="70" fill="${light}" opacity=".55"/>`;
  const paws = `<g fill="${dark}" ${stroke}><ellipse cx="243" cy="482" rx="35" ry="23"/><ellipse cx="357" cy="482" rx="35" ry="23"/></g>`;
  const jewel = `<path d="M260 358 Q300 385 340 358" fill="none" ${stroke}/><path d="M300 370 l12 16 -12 20 -12 -20Z" fill="${light}" ${stroke}/>`;
  if (species === "Dragon")
    return {
      tails: `<g data-anatomy="dragon-tail"><path d="M347 440 C475 500 477 376 437 359 C501 367 511 517 385 513 Q348 507 325 475" fill="url(#body)" ${stroke}/><path d="M437 359 l-15 -28 30 14Z" fill="${accent}"/></g>`,
      wings: `<g data-anatomy="membrane-wings">${[-1, 1].map((side) => `<g transform="translate(300 355) scale(${side} 1)"><path d="M48 30 Q110 -${130 + grown * 5} ${170 + grown * 4} -100 L150 -10 Q117 -22 113 25 Q85 5 48 65Z" fill="url(#wing)" ${stroke}/><path d="M48 45 L150 -85 M48 45 L150 -10 M48 45 L113 25" fill="none" stroke="${accent}" stroke-width="2"/></g>`).join("")}</g>`,
      body,
      ears: `<g data-anatomy="rounded-horns" ${stroke}><path d="M229 224 Q192 ${151 - grown * 4} 224 162 Q244 176 253 219 M347 219 Q356 176 376 162 Q408 ${151 - grown * 4} 371 224" fill="${accent}"/><path d="M219 257 l-42 -24 14 49 39 11 M381 257 l42 -24 -14 49 -39 11" fill="url(#body)"/></g>`,
      feet: paws,
      details: `<g data-anatomy="dragon-muzzle"><ellipse cx="300" cy="315" rx="37" ry="22" fill="${light}" ${stroke}/><g fill="${dark}"><circle cx="280" cy="311" r="3"/><circle cx="320" cy="311" r="3"/></g><path d="M287 322 Q300 332 313 322" fill="none" stroke="${accent}" stroke-width="2"/></g><g data-anatomy="dragon-scales" fill="none" stroke="${accent}" stroke-width="2" opacity=".7">${Array.from({ length: 3 + grown }, (_, i) => `<path d="M279 ${390 + i * 12} q21 16 42 0"/>`).join("")}</g>${jewel}`,
    };
  if (species === "Lion")
    return {
      tails: `<g data-anatomy="tufted-tail"><path d="M355 450 Q470 518 455 389" fill="none" stroke="${light}" stroke-width="15"/><path d="M455 401 Q419 373 447 350 Q478 368 455 401Z" fill="${accent}" ${stroke}/></g>`,
      wings: "",
      body,
      ears: `<g data-anatomy="lion-mane"><path d="M300 ${154 - grown * 4} L333 173 L365 165 L382 196 L413 207 L407 244 L432 276 L411 308 L415 344 L379 357 L362 390 L329 379 L300 402 L271 379 L238 390 L221 357 L185 344 L189 308 L168 276 L193 244 L187 207 L218 196 L235 165 L267 173Z" fill="url(#wing)" ${stroke}/><g fill="url(#body)" ${stroke}><circle cx="224" cy="222" r="30"/><circle cx="376" cy="222" r="30"/></g><g fill="${accent}" opacity=".6"><circle cx="224" cy="222" r="16"/><circle cx="376" cy="222" r="16"/></g></g>`,
      feet: paws,
      details: `<g data-anatomy="lion-muzzle" fill="${light}" opacity=".55"><ellipse cx="281" cy="315" rx="23" ry="17"/><ellipse cx="319" cy="315" rx="23" ry="17"/></g><path d="M290 308 Q300 303 310 308 L300 319Z" fill="${dark}"/><path d="M300 319 q-12 14 -24 5 M300 319 q12 14 24 5" fill="none" stroke="${accent}" stroke-width="2"/>${jewel}`,
    };
  return {
    tails: `<g data-anatomy="flowing-horse-tail"><path d="M351 429 Q476 410 442 503 Q435 550 383 548 Q417 516 390 486 Q374 470 351 469" fill="url(#wing)" ${stroke}/><path d="M389 462 Q441 490 410 531" fill="none" stroke="${light}" stroke-width="4"/></g>`,
    wings: "",
    body,
    ears: `<g data-anatomy="unicorn-horn-and-mane"><path d="M350 222 Q421 224 407 330 Q401 386 376 408 Q389 353 354 334Z" fill="url(#wing)" ${stroke}/><path d="M229 235 Q207 159 231 170 Q259 184 264 226 M336 226 Q341 184 369 170 Q393 159 371 235" fill="url(#body)" ${stroke}/><path d="M280 218 Q300 ${116 - grown * 5} 304 ${116 - grown * 5} L321 218Z" fill="${accent}" ${stroke}/><path d="M288 184 l24 7 M294 157 l13 5" stroke="${dark}" stroke-width="3"/><path d="M238 232 Q276 186 329 217 Q351 232 348 252 Q322 226 301 241 Q278 221 238 252Z" fill="${variant === "a" ? accent : light}" ${stroke}/></g>`,
    feet: `<g data-anatomy="feathered-hooves" fill="url(#body)" ${stroke}><path d="M226 434 L220 476 L215 484 L251 484 L258 474 L254 434 M346 434 L342 474 L349 484 L385 484 L380 476 L374 434"/><path d="M216 480 L252 480 L252 498 L216 498Z M348 480 L384 480 L384 498 L348 498Z" fill="${accent}"/></g>`,
    details: `<g data-anatomy="horse-muzzle"><ellipse cx="300" cy="317" rx="38" ry="23" fill="${light}" ${stroke}/><g fill="${dark}"><circle cx="280" cy="314" r="3"/><circle cx="320" cy="314" r="3"/></g><path d="M287 326 Q300 333 313 326" fill="none" stroke="${accent}" stroke-width="2"/></g>${jewel}`,
  };
}
