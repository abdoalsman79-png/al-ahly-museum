import puppeteer from 'puppeteer-core';
const url=process.argv[2], mob=process.argv[3]==='m'; const out='/tmp/t3'; import fs from 'fs'; fs.mkdirSync(out,{recursive:true});
const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage(); await p.setViewport(mob?{width:390,height:844,isMobile:true,hasTouch:true}:{width:1440,height:900});
const logs=[]; p.on('console',m=>{if(m.type()==='error')logs.push(m.text().slice(0,140))}); p.on('pageerror',e=>logs.push('ERR '+String(e).slice(0,200)));
await p.goto(url,{waitUntil:'load'}); await p.evaluate(()=>localStorage.setItem('ahly-quality','low')); await p.reload({waitUntil:'load'});
await p.waitForSelector('[data-testid=enter]:not([disabled])',{timeout:60000}); await p.click('[data-testid=enter]'); await new Promise(r=>setTimeout(r,1200));
const S=(f,...a)=>p.evaluate(f,...a); const w=(t)=>new Promise(r=>setTimeout(r,t));
const st=()=>S(()=>{const s=window.__museum.store.getState();return {lang:s.lang,q:s.quality,relics:s.relicsFound.size,mode:s.mode,zone:s.zone,dir:document.documentElement.dir}});
if(!mob){
 await p.click('[data-testid=lang-btn]'); await w(800); console.log('AR',JSON.stringify(await st()));
 await S(()=>window.__museum.store.getState().inspect({kind:'statue',id:'amin-sami'})); await w(2000); await p.screenshot({path:out+'/ar-statue.png'});
 await p.keyboard.press('Escape'); await w(500);
 const r=await S(()=>window.__museum.relics[0]); await S((x,z)=>window.__museum.teleport(x,z,0),r.x,r.z); await w(1500); console.log('relic',JSON.stringify(await st()), 'toast', await S(()=>!!document.querySelector('[data-testid=relic-toast]')));
 await p.screenshot({path:out+'/relic.png'});
 await p.click('[data-testid=q-medium]'); await w(2500); console.log('Q',JSON.stringify(await st()));
 await p.click('[data-testid=lang-btn]'); await w(500);
 await p.click('[data-testid=mode-library]'); await w(1500); console.log('LIB',JSON.stringify(await st()),'library', await S(()=>!!document.querySelector('[data-testid=library]')));
 await p.click('[data-testid=tab-press]'); await w(400); await p.type('[data-testid=press-search]','Palmeiras'); await w(400); console.log('press results', await S(()=>document.querySelectorAll('[data-testid=library] article').length)); await p.screenshot({path:out+'/lib.png'});
 await p.click('[data-testid=library-close]'); await w(500);
 await p.click('[data-testid=mode-tour]'); await w(3500); console.log('TOUR',JSON.stringify(await st()));
} else {
 await S(()=>window.__museum.store.getState().inspect({kind:'trophy',id:'cl-2012'})); await w(2500); await p.screenshot({path:out+'/m-dossier.png'});
 await S(()=>window.__museum.store.getState().inspect(null)); await w(800); await p.screenshot({path:out+'/m-hud.png'});
 console.log('touchpad', await S(()=>!!document.querySelector('[data-testid=touchpad]')));
}
console.log('ERRS',JSON.stringify([...new Set(logs)])); await b.close();
