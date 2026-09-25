import {chapter8Content,chapter8Supplement} from '../../src/content/form1/science/chapter-8/chapter8-content';
import {writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const hash=(x:unknown)=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const before={content:chapter8Content,supplement:chapter8Supplement};writeFileSync('tmp/ch8p1/before.json',JSON.stringify(before,null,2));
const locks=Object.fromEntries((['en','bm'] as const).map(lang=>{const {mirrors,...rest}=chapter8Content[lang];const {realVirtualActivity,...supplement}=chapter8Supplement[lang];return [lang,{main:hash(rest),law:hash(mirrors.lawOfReflection),supplement:hash(supplement)}]}));
writeFileSync('tmp/ch8p1/locks.json',JSON.stringify(locks,null,2));console.log(locks);process.exit(0);
