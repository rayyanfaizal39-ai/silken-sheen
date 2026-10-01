import {build} from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
await build({entryPoints:['tmp/pdfs/ch8p4/preview.tsx'],outfile:'tmp/pdfs/ch8p4/preview.js',bundle:true,jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'}});
const css=fs.readdirSync('dist/client/assets').filter(x=>/^styles-.*\.css$/.test(x)).map(x=>fs.readFileSync('dist/client/assets/'+x,'utf8')).join('\n');
fs.writeFileSync('tmp/pdfs/ch8p4/preview.html',`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style></head><body style="background:#0b1120;color:white;font-family:Arial,sans-serif;margin:0"><div id="root"></div><script src="preview.js"></script></body></html>`);
console.log(path.resolve('tmp/pdfs/ch8p4/preview.html'));
