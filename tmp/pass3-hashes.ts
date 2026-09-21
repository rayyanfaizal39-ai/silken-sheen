import { createHash } from 'node:crypto';
import { chapter5Content as before } from './pass3-baseline-content';
import { chapter5Content as after } from '../src/content/form1/science/chapter-5/chapter5-content';
const fields=['particlePresentation','diffusionPresentation','kineticTheory','stateProperties','diffusionDefinition','diffusionResults'] as const;
for(const lang of ['en','bm'] as const){
 const a=Object.fromEntries(fields.map(k=>[k,before[lang].statesOfMatter[k]]));
 const b=Object.fromEntries(fields.map(k=>[k,after[lang].statesOfMatter[k]]));
 if(JSON.stringify(a)!==JSON.stringify(b)) throw Error('Locked Pass 2 changed');
 console.log(lang,createHash('sha256').update(JSON.stringify(a)).digest('hex'));
}
