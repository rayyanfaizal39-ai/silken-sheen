import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  ScienceEmphasis,
  scienceEmphasisParts,
  stripEmphasis,
} from "@/components/notes/blocks/ScienceEmphasis";
import { ScienceF2Chapter1NotesBlock } from "@/components/notes/ScienceF2Chapter1NotesBlock";
import { scienceF2C1InteractiveBM } from "./interactive-bm";
import { scienceF2C1InteractiveDLP } from "./interactive-dlp";
import type { SciF2C1Content } from "./interactive-types";

/**
 * Guards the transfer of the Sains Tingkatan 2 textbook's own emphasis into
 * Chapter 1.
 *
 * The rule the transfer follows is that the textbook decides WHICH terms are
 * emphasised — the pass adds markers around wording AcadeMY already had, and
 * never writes new prose. So the assertions here are mostly about what did NOT
 * change: strip the markers back out and every string must be byte-identical to
 * what it was, and each concept must be marked once rather than everywhere it
 * happens to appear.
 */

const STREAMS: [string, SciF2C1Content][] = [
  ["BM", scienceF2C1InteractiveBM],
  ["DLP", scienceF2C1InteractiveDLP],
];

/** The terms the textbook bolds that Chapter 1 carries in running prose. */
const TRANSFERRED: Record<string, string[]> = {
  BM: [
    "mempunyai tulang belakang",
    "tiada tulang belakang",
    "di dalam habitat semula jadinya",
    "di luar habitat semula jadinya",
    "Endemik",
    "Terancam",
    "kotiledon",
    "monokotiledon",
    "dikotiledon",
  ],
  DLP: [
    "with a backbone",
    "without a backbone",
    "inside its own natural habitat",
    "outside its natural habitat",
    "Endemic",
    "Threatened",
    "cotyledon",
    "monocotyledon",
    "dicotyledon",
  ],
};

/** Every learner-facing string in the chapter, with the field path that holds it. */
function allStrings(content: SciF2C1Content): [string, string][] {
  const out: [string, string][] = [];
  const walk = (node: unknown, path: string) => {
    if (typeof node === "string") out.push([path, node]);
    else if (Array.isArray(node)) node.forEach((item, i) => walk(item, `${path}[${i}]`));
    else if (node && typeof node === "object") {
      for (const [key, value] of Object.entries(node)) walk(value, `${path}.${key}`);
    }
  };
  walk(content, "content");
  return out;
}

describe("ScienceEmphasis — the controlled marker, and nothing else", () => {
  it("emphasises only what is wrapped in double asterisks", () => {
    const parts = scienceEmphasisParts("Setiap biji membawa **kotiledon** — makanan simpanan.");
    expect(parts).toEqual([
      { text: "Setiap biji membawa ", emphasised: false },
      { text: "kotiledon", emphasised: true },
      { text: " — makanan simpanan.", emphasised: false },
    ]);
  });

  it("leaves an unmarked string completely alone", () => {
    const plain = "Haiwan yang mempunyai tulang belakang.";
    expect(scienceEmphasisParts(plain)).toEqual([{ text: plain, emphasised: false }]);
    expect(renderToStaticMarkup(<ScienceEmphasis text={plain} />)).toBe(plain);
  });

  it("renders the marked run as a restrained inline pill, not a card", () => {
    const markup = renderToStaticMarkup(<ScienceEmphasis text="a **term** b" />);
    expect(markup).toContain("<strong");
    expect(markup).toContain(">term</strong>");
    // A translucent blue-purple pill: rounded, backgrounded, accent text — but
    // still an inline <strong>, never a block-level badge or card.
    expect(markup).toMatch(/rounded/);
    expect(markup).toMatch(/bg-gradient/);
    expect(markup).toMatch(/text-accent/);
    expect(markup).not.toMatch(/shadow|<div|<p|glow/);
  });

  it("understands no other Markdown", () => {
    // Anything that is not the controlled marker must survive as literal text.
    for (const input of [
      "# Heading",
      "- a list item",
      "[link](https://example.com)",
      "_italic_ and `code`",
      "*single asterisk*",
    ]) {
      expect(renderToStaticMarkup(<ScienceEmphasis text={input} />)).toBe(
        input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"),
      );
    }
  });

  it("never treats content as HTML", () => {
    const markup = renderToStaticMarkup(
      <ScienceEmphasis text="**<script>alert(1)</script>** stays text" />,
    );
    expect(markup).toContain("&lt;script&gt;");
    expect(markup).not.toContain("<script>");
  });

  it("gives attribute contexts the words without the markers", () => {
    expect(stripEmphasis("Satu **kotiledon** sahaja")).toBe("Satu kotiledon sahaja");
  });
});

describe("Chapter 1 — the textbook's emphasis, and only that", () => {
  it.each(STREAMS)("%s marks exactly the terms transferred from the textbook", (name, content) => {
    const marked = allStrings(content)
      .flatMap(([, text]) => scienceEmphasisParts(text))
      .filter((part) => part.emphasised)
      .map((part) => part.text);
    expect(marked).toEqual(TRANSFERRED[name]);
  });

  it.each(STREAMS)("%s marks each concept once, not everywhere it appears", (name, content) => {
    const marked = allStrings(content)
      .flatMap(([, text]) => scienceEmphasisParts(text))
      .filter((part) => part.emphasised)
      .map((part) => part.text.toLowerCase());
    expect(new Set(marked).size, `${name} repeats an emphasised concept`).toBe(marked.length);
  });

  it.each(STREAMS)("%s changed no wording — only added markers", (_name, content) => {
    // Every string that carries a marker must be identical to its original once
    // the markers are stripped. The originals are spelled out so a future edit
    // that quietly rewrites a sentence under cover of this pass fails here.
    const originals: Record<string, string> = {
      "mempunyai tulang belakang":
        "Haiwan yang mempunyai tulang belakang: ikan, amfibia, reptilia, burung atau mamalia.",
      "tiada tulang belakang":
        "Haiwan yang tiada tulang belakang, contohnya serangga, cacing, labah-labah.",
      "di dalam habitat semula jadinya":
        "Memelihara sesuatu spesies di dalam habitat semula jadinya — contohnya taman negara, hutan simpan kekal dan taman laut.",
      "di luar habitat semula jadinya":
        "Memelihara sesuatu spesies di luar habitat semula jadinya — contohnya zoo dan taman botani.",
      "with a backbone":
        "An animal with a backbone: fish, amphibians, reptiles, birds or mammals.",
      "without a backbone":
        "An animal without a backbone, e.g. insects, worms, spiders.",
      "inside its own natural habitat":
        "Conserves a species inside its own natural habitat — think national parks, permanent forest reserves and marine parks.",
      "outside its natural habitat":
        "Conserves a species outside its natural habitat — think zoos and botanical gardens.",
      Endemik:
        "Spesies yang hidup berkelompok di habitat yang terhad di sesebuah lokasi tertentu sahaja — tidak ditemui secara semula jadi di tempat lain. Endemik memberitahu kita tentang LOKASI.",
      Terancam:
        "Spesies yang bilangannya semakin berkurang sehingga berisiko pupus. Terancam memberitahu kita tentang RISIKO KEPUPUSAN, bukan lokasi. Akta Perlindungan Hidupan Liar 1972 mengharamkan pembunuhan dan pemerdagangannya.",
      kotiledon:
        "Setiap biji membawa kotiledon — makanan simpanan permulaannya. Satu kotiledon = monokotiledon. Sepasang = dikotiledon.",
      Endemic:
        "A species that lives only within a restricted habitat in one specific location — found nowhere else naturally. Endemic tells you about LOCATION.",
      Threatened:
        "A species whose numbers are falling so far that it risks extinction. Threatened tells you about RISK OF EXTINCTION, not location. The Wildlife Protection Act 1972 bans killing or trading them.",
      cotyledon:
        "Every seed carries a cotyledon — its stored starter food. One cotyledon = monocotyledon. A pair = dicotyledon.",
    };
    for (const [, text] of allStrings(content)) {
      if (!text.includes("**")) continue;
      const stripped = stripEmphasis(text);
      const key = Object.keys(originals).find((k) => stripped === originals[k]);
      expect(key, `an emphasised string no longer matches its original:\n${stripped}`).toBeTruthy();
    }
  });

  it("marks the equivalent concept in both languages, in the same fields", () => {
    const fieldsWithMarkers = (content: SciF2C1Content) =>
      allStrings(content)
        .filter(([, text]) => text.includes("**"))
        .map(([path]) => path);
    expect(fieldsWithMarkers(scienceF2C1InteractiveBM)).toEqual(
      fieldsWithMarkers(scienceF2C1InteractiveDLP),
    );
  });

  it("leaves quiz, flashcard and reflection content unmarked", () => {
    for (const content of [scienceF2C1InteractiveBM, scienceF2C1InteractiveDLP]) {
      for (const [path, text] of allStrings(content)) {
        if (!text.includes("**")) continue;
        expect(path, `emphasis leaked into assessment content: ${path}`).not.toMatch(
          /miniQuiz|checkYourself|reflectionItems/,
        );
      }
    }
  });

  it("routes every marked field through the emphasis renderer", () => {
    // A marker is only ever correct if the component that shows that field
    // renders it through ScienceEmphasis; otherwise the reader sees literal
    // asterisks. Both marked fields are checked at their render site, because
    // one of them (the plant branch detail) only appears once a learner taps
    // its branch and so cannot be caught by a server render.
    const sites: [string, string][] = [
      [
        "src/components/notes/blocks/ClassificationTree.tsx",
        "<ScienceEmphasis text={branch.detail} />",
      ],
      [
        "src/components/notes/ScienceF2Chapter1NotesBlock.tsx",
        "<ScienceEmphasis text={concept.definition} />",
      ],
      [
        "src/components/notes/ScienceF2Chapter1NotesBlock.tsx",
        "<ScienceEmphasis text={method.description} />",
      ],
      [
        "src/components/notes/ScienceF2Chapter1NotesBlock.tsx",
        "<ScienceEmphasis text={open.definition} />",
      ],
    ];
    for (const [file, expected] of sites) {
      expect(readFileSync(resolve(process.cwd(), file), "utf8"), file).toContain(expected);
    }
  });

  it("puts no marker anywhere it would be read as literal text", () => {
    // alt text and accessible names are attributes, not prose.
    for (const content of [scienceF2C1InteractiveBM, scienceF2C1InteractiveDLP]) {
      for (const [path, text] of allStrings(content)) {
        if (!text.includes("**")) continue;
        expect(path, `emphasis marker in a non-prose field: ${path}`).not.toMatch(
          /\.alt$|imagePath|legendLabel|\.src$|\.id$/,
        );
      }
    }
  });
});

describe("Chapter 1 — Remember / Quick Explanation callouts", () => {
  // These two strings live in the component's own `COPY` object (per-language
  // UI copy authored directly in ScienceF2Chapter1NotesBlock.tsx), not in the
  // interactive-bm/dlp content files, so `allStrings()` above can't see them.
  // Guard their wording the same way: hardcode the originals and check the
  // source file still contains them byte-identical once markers are stripped.

  it("renders the megabiodiversity Quick Explanation without leaking raw markers", () => {
    // Section index 0 ("biodiversity") is what a static render shows by
    // default, and that's where this callout lives.
    const bmMarkup = renderToStaticMarkup(
      <ScienceF2Chapter1NotesBlock content={scienceF2C1InteractiveBM} lang="bm" />,
    );
    const enMarkup = renderToStaticMarkup(
      <ScienceF2Chapter1NotesBlock content={scienceF2C1InteractiveDLP} lang="en" />,
    );
    expect(bmMarkup).toContain("12 buah negara megabiodiversiti");
    expect(bmMarkup).toContain("Penjelasan Ringkas");
    expect(enMarkup).toContain("12 megabiodiversity countries");
    expect(enMarkup).toContain("Quick Explanation");
    for (const markup of [bmMarkup, enMarkup]) {
      expect(markup).not.toContain("**");
    }
  });

  it("wires the Remember and Quick Explanation callouts at their declared sites", () => {
    const file = readFileSync(
      resolve(process.cwd(), "src/components/notes/ScienceF2Chapter1NotesBlock.tsx"),
      "utf8",
    );
    expect(file).toContain("<ScienceRemember lang={lang} text={t.actRemember} />");
    expect(file).toContain(
      "<ScienceQuickExplanation lang={lang} text={t.megabiodiversityQuickExplanation} />",
    );

    // Wording guard: the authored COPY values, byte-identical once stripped of
    // their `**` markers, so a future edit can't silently rewrite these under
    // cover of the emphasis pass.
    const originals = [
      "The **Wildlife Protection Act 1972** bans the killing or trade of endemic and threatened species in Malaysia.",
      "**Akta Perlindungan Hidupan Liar 1972** mengharamkan pembunuhan atau perdagangan spesies endemik dan terancam di Malaysia.",
      "Did you know that our country, Malaysia, is one of the **12 megabiodiversity countries** in the world? Malaysia's equatorial climate makes it an especially suitable habitat for many kinds of organisms.",
      "Tahukah anda negara kita, Malaysia merupakan salah satu daripada **12 buah negara megabiodiversiti** di dunia? Keadaan di Malaysia yang beriklim khatulistiwa menjadikannya habitat yang sangat sesuai bagi pelbagai jenis organisma.",
    ];
    for (const original of originals) {
      expect(file, `missing or altered: ${stripEmphasis(original)}`).toContain(original);
    }
  });
});
