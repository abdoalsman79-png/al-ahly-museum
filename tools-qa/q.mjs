import puppeteer from 'puppeteer-core';
const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage(); await p.setViewport({width:1000,height:700});
await p.goto(process.argv[2],{waitUntil:'load'}); await p.evaluate(()=>localStorage.setItem('ahly-quality','low')); await p.reload({waitUntil:'load'});
await p.waitForSelector('[data-testid=enter]:not([disabled])',{timeout:60000}); await p.click('[data-testid=enter]'); await new Promise(r=>setTimeout(r,800));
await p.evaluate(()=>window.__museum.store.getState().inspect({kind:'statue',id:'el-khatib'})); await new Promise(r=>setTimeout(r,2000)); await p.screenshot({path:'/tmp/bust.png'}); await b.close();
