import ts from 'typescript';
import {execFileSync} from 'node:child_process';
import vm from 'node:vm';
import {writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
const refs=['d266d9f483c9f61ea097ebfb6026074a819d18d4','1e7a94cd6a0a304e82a6554fa713f0c8156d3113'];
const banks=[];
for(let c=3;c<=9;c++)for(const lang of ['bm','dlp']) {
 const path=`src/content/form1/science/chapter-${c}/quizzes-${lang}.ts`;
 const values=refs.map(ref=>{
 const src=execFileSync('git',['show',`${ref}:${path}`],{encoding:'utf8'});
 const out=ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 const context={exports:{}};vm.runInNewContext(out,context);return Object.values(context.exports)[0];
 });
 banks.push({chapter:c,lang,questions:values[0]});
 if(lang==='dlp')console.log(c,values[0].filter((q,i)=>JSON.stringify(q)!==JSON.stringify(values[1][i])).map(q=>q.id));
}
writeFileSync(`${tmpdir()}/science-f1-pr65-base.json`,JSON.stringify(banks,null,2));
