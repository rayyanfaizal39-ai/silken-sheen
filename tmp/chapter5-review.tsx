import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { chapter5Content } from "../src/content/form1/science/chapter-5/chapter5-content";
import { ScienceF1Chapter5VisualNotesBlock } from "../src/components/notes/ScienceF1Chapter5VisualNotesBlock";
import { ScienceF1Chapter5VisualNotesBlock as Baseline } from "./chapter5-baseline";
async function main() { for (const lang of ["bm", "en"] as const) {
 const html=renderToStaticMarkup(createElement(ScienceF1Chapter5VisualNotesBlock,{content:chapter5Content,lang}));
 const original=renderToStaticMarkup(createElement(Baseline,{content:chapter5Content,lang}));
 const marker=lang==='bm'?'Tiga keadaan, satu teori zarah':'Three states, one particle theory';
 const svgs=(s:string)=>s.slice(s.indexOf(marker)).replace(/ data-tsd-source="[^"]*"/g, '').match(/<svg[\s\S]*?<\/svg>/g);
 if(JSON.stringify(svgs(html))!==JSON.stringify(svgs(original))) throw Error('Pass 2 SVG changed');
 const text=(s:string)=>s.slice(s.indexOf(marker)).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').replace(/ 5\.2 /g,' ').trim();
 if(text(html)!==text(original)) throw Error('Pass 2 lesson text changed');
 console.log(lang,'Pass 2 rendered SVG/text identical;',createHash('sha256').update(JSON.stringify(chapter5Content[lang].statesOfMatter)).digest('hex'));
 writeFileSync(`tmp/chapter5-${lang}.html`,html);
 const diagrams=[...html.matchAll(/<svg data-diagram="([^"]+)"[\s\S]*?<\/svg>/g)];
 const sheet=`<svg xmlns="http://www.w3.org/2000/svg" width="960" height="${Math.ceil(diagrams.length/3)*270}"><rect width="100%" height="100%" fill="#07131d"/>${diagrams.map((m,i)=>`<g transform="translate(${i%3*320} ${Math.floor(i/3)*270})"><text x="12" y="20" fill="white" font-size="15">${m[1]}</text>${m[0].replace('<svg ', '<svg x="0" y="30" width="320" height="230" ')}</g>`).join('')}</svg>`;
 await sharp(Buffer.from(sheet)).png().toFile(`tmp/chapter5-${lang}.png`);
}

}
main().catch(e=>{console.error(e);process.exit(1)});

