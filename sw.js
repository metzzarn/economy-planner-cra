if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const c=e=>i(e,t),l={module:{uri:t},exports:o,require:c};s[t]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-951efa89.js",revision:null},{url:"assets/index-ff3ea6d0.css",revision:null},{url:"assets/web-vitals-9f4c2f45.js",revision:null},{url:"index.html",revision:"a03cca2fc1521e6c6342c81a18195c51"},{url:"registerSW.js",revision:"8dcdd3e6daa0beca2b4b49db88c0c0dc"},{url:"manifest.webmanifest",revision:"3b3b2f11cb7ff27da2567fa1d6d37d8b"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
