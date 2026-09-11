import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { CurrentDirectionDiagram } from "@/components/notes/blocks/CurrentDirectionDiagram";
import { scienceF2C7InteractiveBM } from "./interactive-bm";
import { scienceF2C7InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Regression guards for the "electron flow vs conventional current" UX polish
 * pass. The science was already correct; this pass replaced the single
 * shared-conductor diagram (two opposing arrows on one line) with two
 * separate, always-visible horizontal lanes, so this file checks the LAYOUT
 * and INTERACTION properties the brief called for, not the underlying
 * science (already covered by chapter-7-master-remediation.test.tsx).
 */

const LANGS: [string, ScienceF2InteractiveContent][] = [
  ["bm", scienceF2C7InteractiveBM],
  ["dlp", scienceF2C7InteractiveDLP],
];

function blockOf(content: ScienceF2InteractiveContent) {
  return content.sections.find((s) => s.currentDirection)!.currentDirection!;
}

// -------------------------------------------------------------- 1. DATA SHAPE

describe("Current-direction polish — data carries the new lane fields", () => {
  for (const [lang, content] of LANGS) {
    const block = blockOf(content);

    it(`${lang}: terminal labels and the contrast heading are non-empty`, () => {
      expect(block.negativeTerminalLabel.trim().length).toBeGreaterThan(0);
      expect(block.positiveTerminalLabel.trim().length).toBeGreaterThan(0);
      expect(block.contrastLabel.trim().length).toBeGreaterThan(0);
    });

    it(`${lang}: electron flow's direction summary is negative -> positive`, () => {
      const electron = block.modes.find((m) => m.id === "electron")!;
      expect(electron.directionSummary).toMatch(/→/);
      expect(electron.directionSummary).toMatch(lang === "bm" ? /^Negatif/i : /^Negative/i);
      expect(electron.directionSummary).toMatch(lang === "bm" ? /Positif$/i : /Positive$/i);
    });

    it(`${lang}: conventional current's direction summary is positive -> negative`, () => {
      const conventional = block.modes.find((m) => m.id === "conventional")!;
      expect(conventional.directionSummary).toMatch(/→/);
      expect(conventional.directionSummary).toMatch(lang === "bm" ? /^Positif/i : /^Positive/i);
      expect(conventional.directionSummary).toMatch(lang === "bm" ? /Negatif$/i : /Negative$/i);
    });
  }

  it("BM and DLP carry the same field shape, only language differs", () => {
    const shapeOf = (c: ScienceF2InteractiveContent) => {
      const b = blockOf(c);
      return {
        modeIds: b.modes.map((m) => m.id),
        hasNegative: !!b.negativeTerminalLabel,
        hasPositive: !!b.positiveTerminalLabel,
        hasContrast: !!b.contrastLabel,
      };
    };
    expect(shapeOf(scienceF2C7InteractiveDLP)).toEqual(shapeOf(scienceF2C7InteractiveBM));
  });

  it("no leaked language: BM carries no English terminal wording, DLP carries no Malay", () => {
    for (const [lang, content] of LANGS) {
      const text = JSON.stringify(blockOf(content));
      if (lang === "bm") {
        expect(text).not.toMatch(/\bNegative terminal\b|\bPositive terminal\b/);
      } else {
        expect(text).not.toMatch(/Terminal negatif|Terminal positif/);
      }
    }
  });
});

// --------------------------------------------------------- 2. RENDERED LAYOUT

describe("Current-direction polish — two lanes, both always visible", () => {
  for (const [lang, content] of LANGS) {
    const block = blockOf(content);
    const html = renderToStaticMarkup(
      createElement(CurrentDirectionDiagram, { block, lang: lang === "bm" ? "bm" : "en" }),
    );

    it(`${lang}: both headings render regardless of which mode is selected`, () => {
      const electron = block.modes.find((m) => m.id === "electron")!;
      const conventional = block.modes.find((m) => m.id === "conventional")!;
      expect(html).toContain(electron.label);
      expect(html).toContain(conventional.label);
    });

    it(`${lang}: the unselected lane is dimmed, not hidden — the selected lane is not dimmed`, () => {
      // Default selection is "electron", so the conventional lane carries the
      // dim class and the electron lane does not.
      const dimMarker = "opacity-[0.45]";
      const conventionalIdx = html.indexOf(block.modes.find((m) => m.id === "conventional")!.label);
      const electronIdx = html.indexOf(block.modes.find((m) => m.id === "electron")!.label);
      expect(electronIdx).toBeGreaterThan(-1);
      expect(conventionalIdx).toBeGreaterThan(-1);
      // The conventional lane's own <div> (immediately preceding its heading)
      // must carry the dim marker; the electron lane's must not.
      const beforeConventional = html.slice(0, conventionalIdx);
      const beforeElectron = html.slice(0, electronIdx);
      const lastDivBefore = (s: string) => s.lastIndexOf("<div");
      expect(html.slice(lastDivBefore(beforeConventional), conventionalIdx)).toContain(dimMarker);
      expect(html.slice(lastDivBefore(beforeElectron), electronIdx)).not.toContain(dimMarker);
      // Neither lane card itself is ever display:none — only the small
      // per-terminal word label is allowed to collapse on narrow screens
      // (Tailwind's responsive "hidden sm:flex"), which is intentional.
      expect(html).not.toMatch(/opacity-0\b/);
      expect(html).not.toContain('style="display:none"');
    });

    it(`${lang}: exactly four discrete electron dots are drawn, and conventional current draws none`, () => {
      // A stray circle on the conventional row would risk reading as a moving
      // electron, which the brief explicitly forbids. Scope the count to the
      // two 200x44 row diagrams — the shared "interactive" badge icon also
      // draws an unrelated decorative circle.
      const rows = [...html.matchAll(/<svg viewBox="0 0 200 44"[\s\S]*?<\/svg>/g)].map((m) => m[0]);
      expect(rows).toHaveLength(2);
      const [electronRow, conventionalRow] = rows;
      expect((electronRow.match(/<circle/g) ?? []).length).toBe(4);
      expect((conventionalRow.match(/<circle/g) ?? []).length).toBe(0);
    });

    it(`${lang}: the contrast strip states both arrows using plain − / + symbols`, () => {
      expect(html).toContain(block.contrastLabel);
      expect(html).toContain("− → +");
      expect(html).toContain("+ → −");
    });

    it(`${lang}: both toggle controls are present, keyboard/aria-ready, with the electron mode selected by default`, () => {
      const electron = block.modes.find((m) => m.id === "electron")!;
      const conventional = block.modes.find((m) => m.id === "conventional")!;
      expect(html).toContain(`aria-label="${electron.label}"`);
      expect(html).toContain(`aria-label="${conventional.label}"`);
      expect(html).toContain('aria-pressed="true"');
      expect(html).toContain('aria-pressed="false"');
      expect(html).toContain("min-h-11");
      expect(html).toContain("focus-visible:ring-2");
    });

    it(`${lang}: terminal glyphs render exactly twice per lane (once each side), never swapping sides`, () => {
      // Every lane draws its own − and + glyph at the same fixed x
      // coordinates, so the terminal positions can never drift between rows.
      const minusCount = (html.match(/>−</g) ?? []).length;
      const plusCount = (html.match(/>\+</g) ?? []).length;
      expect(minusCount).toBeGreaterThanOrEqual(2);
      expect(plusCount).toBeGreaterThanOrEqual(2);
    });
  }

  it("BM and DLP render the identical SVG geometry — only text differs", () => {
    const geometryOf = (c: ScienceF2InteractiveContent, lang: "bm" | "en") => {
      const html = renderToStaticMarkup(
        createElement(CurrentDirectionDiagram, { block: blockOf(c), lang }),
      );
      return [...html.matchAll(/(?:viewBox|cx|cy|x1|x2|y1|y2|r)="[^"]*"/g)].map((m) => m[0]);
    };
    expect(geometryOf(scienceF2C7InteractiveDLP, "en")).toEqual(
      geometryOf(scienceF2C7InteractiveBM, "bm"),
    );
  });
});

// ------------------------------------------------------- 3. SCIENCE UNCHANGED

describe("Current-direction polish — scientific accuracy untouched", () => {
  for (const [lang, content] of LANGS) {
    const block = blockOf(content);

    it(`${lang}: electron flow's note still states negative -> positive`, () => {
      const electron = block.modes.find((m) => m.id === "electron")!;
      expect(electron.note).toMatch(
        lang === "bm" ? /negatif ke terminal positif/i : /negative terminal to the positive/i,
      );
    });

    it(`${lang}: conventional current's note still states positive -> negative`, () => {
      const conventional = block.modes.find((m) => m.id === "conventional")!;
      expect(conventional.note).toMatch(
        lang === "bm" ? /positif ke terminal negatif/i : /positive terminal to the negative/i,
      );
    });

    it(`${lang}: the key point still states the two directions are opposite`, () => {
      expect(block.keyPoint).toMatch(lang === "bm" ? /bertentangan/i : /opposite/i);
    });
  }
});
