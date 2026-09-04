import { it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { BreezeDiagram } from "@/components/notes/blocks/BreezeDiagram";
import { ConvectionRadiation } from "@/components/notes/blocks/ConvectionRadiation";
import { BimetallicStrip } from "@/components/notes/blocks/BimetallicStrip";
import { SurfaceComparison } from "@/components/notes/blocks/SurfaceComparison";
import { ExpansionParticles } from "@/components/notes/blocks/ExpansionParticles";
import { scienceF2C9InteractiveDLP as dlp } from "@/content/form2/science/chapter-9/interactive-dlp";

const DIR =
  "C:/Users/User/AppData/Local/Temp/claude/C--Users-User-Downloads-silken-sheen-main-new-silken-sheen-main/dbd4db4d-9658-4041-a978-e660fa08919f/scratchpad/";
const PUB = "C:/Users/User/Downloads/silken-sheen-main new/silken-sheen-main/public";

const sectionWith = <K extends string>(key: K) =>
  dlp.sections.find((s) => (s as Record<string, unknown>)[key])! as never;

const CLASS_COLOURS: Record<string, string> = {
  "fill-rose-300": "#fda4af",
  "stroke-rose-300": "#fda4af",
  "fill-sky-300": "#7dd3fc",
  "stroke-sky-300": "#7dd3fc",
  "stroke-rose-300/60": "#fda4af",
  "stroke-sky-300/50": "#7dd3fc",
};

function inlineClasses(svg: string): string {
  return svg.replace(/class="([^"]*)"/g, (_m, cls: string) => {
    const attrs: string[] = [];
    for (const token of cls.split(/\s+/)) {
      const colour = CLASS_COLOURS[token];
      if (!colour) continue;
      if (token.startsWith("fill-")) attrs.push(`fill="${colour}"`);
      if (token.startsWith("stroke-")) attrs.push(`stroke="${colour}"`);
    }
    return attrs.join(" ");
  });
}

function svgOf(markup: string, viewBox: string): string {
  const start = markup.indexOf(`<svg viewBox="${viewBox}"`);
  if (start < 0) throw new Error(`no svg with viewBox ${viewBox}`);
  const end = markup.indexOf("</svg>", start) + 6;
  return inlineClasses(markup.slice(start, end));
}

async function shoot(markup: string, src: string, out: string) {
  const svg = svgOf(markup, "0 0 1672 941")
    .replace(/^<svg /, '<svg xmlns="http://www.w3.org/2000/svg" width="1672" height="941" ')
    .replace(/ class="[^"]*"/, "");
  const composed = await sharp(PUB + src)
    .composite([{ input: Buffer.from(svg) }])
    .png()
    .toBuffer();
  await sharp(composed).resize(900).png().toFile(DIR + out);
}

it("ch9 shots", async () => {
  // Breeze: render each state by putting it first in the list.
  const breeze = sectionWith("breezeDiagram").breezeDiagram;
  for (const id of ["sea", "land"] as const) {
    const target = breeze.breezes.find((b: { id: string }) => b.id === id)!;
    const markup = renderToStaticMarkup(
      <BreezeDiagram
        block={{ ...breeze, breezes: [target, ...breeze.breezes.filter((b: { id: string }) => b.id !== id)] }}
        lang="en"
      />,
    );
    await shoot(markup, target.image.src, `ch9_breeze_${id}.png`);
  }

  // Convection / radiation, both modes.
  const cr = sectionWith("convectionRadiation").convectionRadiation;
  for (const id of ["convection", "radiation"] as const) {
    const target = cr.modes.find((m: { id: string }) => m.id === id)!;
    const markup = renderToStaticMarkup(
      <ConvectionRadiation
        block={{ ...cr, modes: [target, ...cr.modes.filter((m: { id: string }) => m.id !== id)] }}
        lang="en"
      />,
    );
    await shoot(markup, cr.image.src, `ch9_kitchen_${id}.png`);
  }

  // Bimetallic strip, both states.
  const bi = sectionWith("bimetallicStrip").bimetallicStrip;
  for (const id of ["room", "heated"] as const) {
    const target = bi.states.find((s: { id: string }) => s.id === id)!;
    const markup = renderToStaticMarkup(
      <BimetallicStrip
        block={{ ...bi, states: [target, ...bi.states.filter((s: { id: string }) => s.id !== id)] }}
        lang="en"
      />,
    );
    await shoot(markup, bi.image.src, `ch9_alarm_${id}.png`);
  }

  // Absorption and emission.
  const sc = sectionWith("surfaceComparison").surfaceComparison;
  for (const id of ["absorb", "emit"] as const) {
    const target = sc.modes.find((m: { id: string }) => m.id === id)!;
    const markup = renderToStaticMarkup(
      <SurfaceComparison
        block={{ ...sc, modes: [target, ...sc.modes.filter((m: { id: string }) => m.id !== id)] }}
        lang="en"
      />,
    );
    await shoot(markup, sc.image.src, `ch9_cans_${id}.png`);
  }

  // Particle chamber, on a dark card so the strokes read.
  const ep = sectionWith("expansionParticles").expansionParticles;
  const markup = renderToStaticMarkup(<ExpansionParticles block={ep} lang="en" />);
  const box = markup.match(/<svg viewBox="0 0 (\d+) (\d+)"/)!;
  const svg = svgOf(markup, `0 0 ${box[1]} ${box[2]}`)
    .replace(/^<svg /, `<svg xmlns="http://www.w3.org/2000/svg" width="${Number(box[1]) * 3}" height="${Number(box[2]) * 3}" `)
    .replace(/ class="[^"]*"/, "")
    .replace(/(<svg[^>]*>)/, `$1<rect width="${box[1]}" height="${box[2]}" fill="#111a2e"/>`);
  await sharp(Buffer.from(svg)).png().toFile(DIR + "ch9_particles.png");
  console.log("particle viewBox", box[1], box[2]);
});
