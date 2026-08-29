import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceF3Chapter1VisualNotesBlock } from "./ScienceF3Chapter1VisualNotesBlock";
import { scienceF3C1InteractiveBM } from "@/content/form3/science/chapter-1/interactive-bm";
import { scienceF3C1InteractiveDLP } from "@/content/form3/science/chapter-1/interactive-dlp";

describe("ScienceF3Chapter1VisualNotesBlock", () => {
  it("renders the Malay stimulus-to-response journey", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter1VisualNotesBlock, { id: "science-notes-content", content: scienceF3C1InteractiveBM, lang: "bm" }));
    expect(html).toContain("Fahami bagaimana rangsangan menjadi gerak balas");
    expect(html).toContain("1.1 Sistem Saraf Manusia");
    expect(html).toContain("Jejaki impuls");
    expect(html).toContain("Aktiviti 1.1");
    expect(html).toContain("Mekanisme penglihatan");
    expect(html).toContain("Mekanisme pendengaran");
    expect(html).toContain("Fototropisme");
    expect(html).toContain("Penglihatan stereoskopik");
    expect(html).toContain("id=\"science-notes-content\"");
  });

  it("renders the same learning journey in English", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter1VisualNotesBlock, { content: scienceF3C1InteractiveDLP, lang: "en" }));
    expect(html).toContain("Understand how a stimulus becomes a response");
    expect(html).toContain("1.1 Human Nervous System");
    expect(html).toContain("Trace an impulse");
    expect(html).toContain("Activity 1.1");
    expect(html).toContain("Mechanism of sight");
    expect(html).toContain("Mechanism of hearing");
    expect(html).toContain("Phototropism");
    expect(html).toContain("Stereoscopic vision");
  });
});
