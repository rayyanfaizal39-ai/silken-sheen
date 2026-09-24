import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';
import { chapter6Content } from '../../src/content/form1/science/chapter-6/chapter6-content';
import { MixtureApparatus } from '../../src/components/notes/blocks/Chapter6MixtureDiagrams';
let body='';
chapter6Content.en.mixtures.separationMethods.forEach((m,row)=>{
 [0,1,2].forEach(stage=>{
  const svg=renderToStaticMarkup(createElement(MixtureApparatus,{method:m,stage}));
  body+=`<g transform="translate(${stage*490} ${row*375+25})">${svg.replace(/<svg[^>]*>/,'').replace('</svg>','')}<text x="15" y="345" fill="white" font-family="sans-serif" font-size="16">${m.name} — ${stage+1}</text></g>`;
 });
});
await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1470" height="2650"><rect width="100%" height="100%" fill="#081328"/>${body}</svg>`)).png().toFile('tmp/ch6p2/diagrams.png');
console.log('Rendered 21 SVG states');
