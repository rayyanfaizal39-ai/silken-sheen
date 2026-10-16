import { writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { getChapterQuizQuestions } from '../../src/content/registry';
const banks = Array.from({length:9},(_,i)=>i+1).flatMap(chapter=>['bm','dlp'].map(lang=>({chapter,lang,questions:getChapterQuizQuestions('science','Form 1',`Chapter ${chapter}`,lang as 'bm'|'dlp')})));
writeFileSync(`${tmpdir()}/science-f1-pr65-baseline.json`,JSON.stringify(banks,null,2));
console.log(banks.map(b=>`${b.chapter} ${b.lang}: ${b.questions.length}`).join('\n'));
