// Demo-only anatomical study. The eye/face artwork stays in the shared engine.
export function awakenedAnatomy(fox: boolean, light: string, dark: string, gold: string) {
  const ink = `stroke="${gold}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  const water = "#7cddf4";
  const fur = fox ? "url(#awakened-fur)" : "url(#body)";
  const texture = `<defs><radialGradient id="awakened-fur" cx=".3" cy=".25" r=".9"><stop stop-color="${light}"/><stop offset=".48" stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></radialGradient></defs>`;
  const tails = fox
    ? `<g data-anatomy="fluffy-fox-tails" ${ink}>
        <path d="M271 447 C179 475 82 402 103 312 Q91 301 87 289 Q100 293 110 299 C99 267 108 235 124 214 Q130 267 181 296 Q194 301 205 308 L219 309 211 321 C251 352 269 400 271 447Z" fill="${fur}"/>
        <path d="M108 282 Q115 245 118 234 C129 281 176 301 185 325 Q141 317 108 282Z" fill="${light}" stroke="none"/>
        <path d="M327 444 C378 339 429 306 474 213 Q476 237 484 253 C518 307 493 377 423 425 Q427 435 421 448 L401 441 Q365 465 327 444Z" fill="${fur}"/>
        <path d="M454 249 L478 226 Q503 281 478 326 Q474 277 454 249Z" fill="${light}" stroke="none"/>
        <path d="M335 467 C399 430 439 440 466 483 Q493 511 532 489 Q520 562 444 555 L427 565 424 552 C379 546 347 521 335 467Z" fill="url(#wing)"/>
        <path d="M478 503 Q511 523 523 506 Q507 553 460 545 Q480 530 478 503Z" fill="${light}" stroke="none"/>
        <g fill="none" stroke="${water}" stroke-width="1.7" opacity=".8"><path d="M129 322 Q140 383 218 419 M466 283 Q454 368 386 414 M390 478 Q429 514 473 519"/><path d="M144 340 l8 13 14 -1 M447 328 l-12 12 -13 -4"/></g>
        <g fill="${gold}" stroke="none"><path d="M144 355 a12 12 0 1 0 15 15 a10 10 0 0 1 -15 -15"/><path d="M450 350 a12 12 0 1 0 -15 15 a10 10 0 0 1 15 -15"/><circle cx="177" cy="392" r="3"/><circle cx="415" cy="399" r="3"/><circle cx="435" cy="516" r="3"/></g>
      </g>`
    : `<g data-anatomy="flowing-phoenix-plumage" ${ink}>
        <path d="M281 422 C210 438 228 510 163 566 Q218 565 246 527 C278 490 309 469 281 422Z" fill="url(#wing)"/>
        <path d="M299 431 C245 489 310 527 267 597 Q327 577 331 527 C336 488 320 452 299 431Z" fill="url(#body)"/>
        <path d="M319 424 C381 449 345 521 415 563 Q350 561 332 514 C309 477 299 444 319 424Z" fill="url(#wing)"/>
        <g fill="none" stroke="${gold}" stroke-width="1.4" opacity=".75"><path d="M277 451 Q230 516 188 550 M305 460 Q299 530 287 572 M325 450 Q354 514 392 548"/></g>
        <g fill="${light}" stroke="${gold}" stroke-width="1.4"><path d="M183 539 Q157 524 173 503 Q176 522 188 517 Q207 533 183 539Z"/><path d="M407 542 Q385 527 401 504 Q405 523 415 520 Q430 536 407 542Z"/></g>
      </g>`;
  const wings = fox
    ? ""
    : `<g data-anatomy="layered-phoenix-wings" ${ink}>
    ${[-1, 1]
      .map(
        (side) => `<g transform="translate(300 320) scale(${side} 1)">
      <path d="M-42 18 C-94 5 -109 -45 -151 -89 Q-152 -54 -127 -21 C-158 -43 -177 -48 -206 -51 Q-188 -21 -161 -4 Q-195 -12 -222 -2 Q-200 23 -167 32 Q-194 37 -207 55 Q-171 70 -146 64 Q-164 83 -163 99 Q-109 106 -72 79 L-36 65Z" fill="url(#wing)"/>
      <path d="M-51 35 Q-104 32 -148 -60 Q-126 -3 -104 26 Q-145 -9 -179 -29 Q-145 14 -113 34 Q-154 21 -193 11 Q-154 42 -116 45 Q-153 51 -182 53 Q-137 76 -80 64Z" fill="url(#body)" stroke="${light}" stroke-width="1.5"/>
      <path d="M-57 52 Q-99 70 -136 65 M-71 33 Q-95 7 -109 -20" fill="none" stroke="${gold}" stroke-width="1.2"/>
      <g fill="${gold}" stroke="none"><circle cx="-88" cy="43" r="3"/><circle cx="-107" cy="48" r="2"/><path d="M-124 24 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3Z"/></g>
      <path d="M-168 -64 Q-190 -86 -171 -108 Q-175 -90 -160 -91 Q-150 -74 -168 -64Z" fill="${light}" stroke-width="1.2"/>
    </g>`,
      )
      .join("")}
  </g>`;
  const body = `<g data-anatomy="awakened-posture" ${ink}>
    <ellipse cx="300" cy="395" rx="${fox ? 73 : 77}" ry="120" fill="${fur}"/>
    ${fox ? `<path d="M242 342 Q262 320 300 335 Q338 320 358 342 L345 366 355 379 334 380 324 403 300 393 276 403 267 380 245 379 255 366Z" fill="${light}" stroke="${gold}" stroke-width="1.5"/>` : `<path d="M251 343 Q300 365 349 343 Q344 432 300 471 Q256 432 251 343Z" fill="${gold}" opacity=".8"/>`}
    <path d="M263 451 Q249 474 257 501 M337 451 Q351 474 343 501" fill="none" stroke="${light}" stroke-width="13"/>
    <path d="M255 340 Q300 364 345 340" fill="none" stroke="${gold}" stroke-width="4"/>
    <path d="M300 354 Q282 370 300 383 Q318 370 300 354Z" fill="${fox ? water : light}" stroke-width="2"/>
    <circle cx="300" cy="369" r="3" fill="#fff3cf" stroke="none"/>
    <g fill="none" stroke="${fox ? gold : light}" stroke-width="1.6"><path d="M285 410 L300 420 315 410 M300 420 L300 436"/><circle cx="285" cy="410" r="2"/><circle cx="315" cy="410" r="2"/></g>
  </g>`;
  const feet = `<g data-anatomy="grounded-paws" ${ink}><ellipse cx="252" cy="504" rx="34" ry="18" fill="${dark}"/><ellipse cx="348" cy="504" rx="34" ry="18" fill="${dark}"/><g stroke="${light}" stroke-width="1.4" opacity=".8"><path d="M241 503 l-1 6 M251 503 v7 M262 503 l1 6 M337 503 l-1 6 M348 503 v7 M359 503 l1 6"/></g></g>`;
  const ears = fox
    ? `<g data-anatomy="tufted-fox-ears" ${ink}>
    <path d="M215 262 L196 111 Q245 130 268 220 M332 220 Q357 130 404 111 L385 262" fill="url(#body)"/>
    <path d="M218 225 L208 139 Q239 162 251 220 M349 220 Q363 162 392 139 L382 225" fill="${gold}" stroke="none"/>
    <path d="M223 213 L218 167 241 217 M359 217 L382 167 377 213" fill="${light}" stroke="none"/>
    <path d="M204 142 l9 7 -4 10 M396 142 l-9 7 4 10" fill="none" stroke-width="1.2"/>
    <circle cx="228" cy="189" r="3" fill="${water}" stroke="none"/><circle cx="372" cy="189" r="3" fill="${water}" stroke="none"/>
  </g>`
    : `<path data-anatomy="flowing-phoenix-crest" d="M270 220 Q233 153 270 148 Q258 114 292 132 Q302 94 323 129 Q355 111 350 147 Q380 163 335 220" fill="url(#wing)" ${ink}/>`;
  const details = fox
    ? `<g data-magic="water-ribbons" fill="none" stroke="${water}" stroke-linecap="round">
    <path d="M144 507 C88 467 141 448 173 464 M145 522 C230 559 426 555 470 514 Q485 495 463 490" stroke-width="3" opacity=".8"/>
    <path d="M153 532 Q303 577 451 536" stroke-width="1.2" opacity=".45"/>
    <path d="M137 409 Q118 433 137 440 Q156 433 137 409Z M472 416 Q456 439 472 445 Q488 439 472 416Z" fill="${light}" stroke-width="1.5"/>
    <circle cx="159" cy="452" r="5" stroke-width="1.5"/><circle cx="448" cy="469" r="3" stroke-width="1.2"/>
  </g>`
    : `<g data-magic="gentle-flames" fill="${light}" stroke="${gold}" stroke-width="1.2">
    <path d="M122 411 Q96 391 113 366 Q112 384 128 383 Q143 401 122 411Z"/>
    <path d="M477 407 Q454 390 469 367 Q470 384 482 383 Q495 401 477 407Z"/>
    <path d="M301 570 Q277 554 293 532 Q293 548 307 548 Q322 561 301 570Z"/>
    <g fill="#edccf8" stroke="none"><path d="M122 404 Q115 397 121 389 Q131 397 122 404Z"/><path d="M477 401 Q470 395 477 389 Q484 397 477 401Z"/></g>
  </g>`;
  return { tails: texture + tails, wings, body, feet, ears, details };
}
