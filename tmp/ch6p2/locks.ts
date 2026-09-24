import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { chapter6Content, chapter6Supplement } from '../../src/content/form1/science/chapter-6/chapter6-content';
const keys=['compounds','physicalVsChemicalChange','mixturesVsCompounds','keyExamFacts','keyTerms','chapterSummary'] as const;
const locks={};
for(const lang of ['en','bm'] as const){
 const data={...Object.fromEntries(keys.map(k=>[k,chapter6Content[lang][k]])),...chapter6Supplement[lang]};
 const pass1=Object.fromEntries(Object.entries(chapter6Content[lang]).filter(([k])=>k!=='mixtures'&&!keys.includes(k as typeof keys[number])));
 locks[lang]={pass1:createHash('sha256').update(JSON.stringify(pass1)).digest('hex'),pass3:createHash('sha256').update(JSON.stringify(data)).digest('hex')};
}
writeFileSync('tmp/ch6p2/locks.json',JSON.stringify(locks,null,2));
console.log(locks);
