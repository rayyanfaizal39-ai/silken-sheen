import {spawn} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const exe='C:/Users/rayya/AppData/Local/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-win64/chrome-headless-shell.exe';
const child=spawn(exe,['--remote-debugging-port=9338','--no-sandbox','--disable-gpu','--allow-file-access-from-files','about:blank'],{windowsHide:true,stdio:'ignore'});
let ws;
try{
 let tabs;
 for(let i=0;i<40;i++){try{tabs=await (await fetch('http://localhost:9338/json')).json();break;}catch{await new Promise(r=>setTimeout(r,250));}}
 ws=new WebSocket(tabs[0].webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));
 let id=0;const pending=new Map();ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(d.id){pending.get(d.id)?.(d);pending.delete(d.id);}});
 const call=(method,params={})=>new Promise((resolve,reject)=>{const i=++id;pending.set(i,d=>d.error?reject(d.error):resolve(d.result));ws.send(JSON.stringify({id:i,method,params}));});
 const js=async expression=>(await call('Runtime.evaluate',{expression,returnByValue:true})).result.value;
 await call('Page.enable');
 for(const width of [390,1280])for(const lang of ['bm','en']){
  await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<500});
  await call('Page.navigate',{url:pathToFileURL(path.resolve('tmp/pdfs/ch8p4/preview.html')).href+'?lang='+lang});
  for(let i=0;i<40;i++){if(await js('!!document.querySelector("[data-dispersion-lesson]")'))break;await new Promise(r=>setTimeout(r,100));}
  const overflow=await js('({width:innerWidth,scroll:document.documentElement.scrollWidth})');console.log(width,lang,overflow);
  for(const [name,selector] of [['prism','[data-dispersion-lesson]'],['basin','[data-activity="8.7"]'],['sky','[data-scattering-lesson]'],['milk','[data-activity="8.8"]']]){
   if(name==='basin')await js('document.querySelectorAll(\'[data-activity="8.7"] button\')[1].click()');
   if(name==='milk')await js('document.querySelectorAll(\'[data-activity="8.8"] button\')[1].click()');
   await new Promise(r=>setTimeout(r,80));await js(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView()`);
   const shot=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync(`tmp/pdfs/ch8p4/${width}-${lang}-${name}.png`,Buffer.from(shot.data,'base64'));
  }
 }
}finally{ws?.close();child.kill();}
