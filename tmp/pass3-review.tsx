import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';
import { chapter5Content } from '../src/content/form1/science/chapter-5/chapter5-content';
import { chapter5Content as oldContent } from './pass3-baseline-content';
import { ScienceF1Chapter5VisualNotesBlock as Now } from '../src/components/notes/ScienceF1Chapter5VisualNotesBlock';
import { ScienceF1Chapter5VisualNotesBlock as Old } from './pass3-baseline';
async function main(){
 for(const lang of ['en','bm'] as const){
  const html=renderToStaticMarkup(createElement(Now,{content:chapter5Content,lang})).replace(/ data-tsd-source="[^"]*"/g,'');
  const before=renderToStaticMarkup(createElement(Old,{content:oldContent as unknown as typeof chapter5Content,lang})).replace(/ data-tsd-source="[^"]*"/g,'');
  const locked=html.slice(0,html.indexOf('<section data-pass3="state-changes"'));
  const oldLocked=before.slice(0,before.indexOf('<div class="space-y-6"><div class="max-w-3xl">'));
  if(locked!==oldLocked)throw Error('Locked header/Pass 1/Pass 2 HTML differs: '+lang);
  console.log(lang,'header, Pass 1 and Pass 2 HTML unchanged');
  const svgs=[...html.matchAll(/<svg (?:data-liquid-gas|data-constant-thermometers|data-conservation-balance|data-conservation-action|data-application)="([^"]*)"[\s\S]*?<\/svg>/g)];
  const sheet=`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="${Math.ceil(svgs.length/3)*280}"><rect width="100%" height="100%" fill="#07131d"/>${svgs.map((m,i)=>`<g transform="translate(${i%3*300} ${Math.floor(i/3)*280})"><text x="10" y="18" fill="white" font-size="14">${m[1]}</text>${m[0].replace('<svg ','<svg width="290" height="250" y="25" ')}</g>`).join('')}</svg>`;
  await sharp(Buffer.from(sheet)).png().toFile(`tmp/pass3-${lang}.png`);
  writeFileSync(`tmp/pass3-${lang}.html`,html);
 }
}
main().catch(e=>{console.error(e);process.exit(1)});
