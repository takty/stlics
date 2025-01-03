const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./forward-checking-BJtA6mxb.js","./assignment-list-WRCWa3GG.js","./problems-NShnYMbn.js","./max-forward-checking-BP5mwOwN.js","./local-changes-TAhYnAL6.js","./local-changes-ex-3fbDxCgL.js","./breakout-BefAtdhJ.js","./genet-BYPnU4Px.js","./crisp-srs3-DGzhdnYU.js","./full-checking-azl--ddx.js","./constraint-DeQkDHBu.js","./fuzzy-forward-checking-DTKOb5jw.js","./flexible-local-changes-I5tBWQ-I.js","./flexible-local-changes-ex-CHdBR8CQ.js","./fuzzy-breakout-DK-HMxaM.js","./fuzzy-genet-_rdeXWg8.js","./srs3-NbF4qyoB.js","./post-stabilizer-mGDQuW_A.js"])))=>i.map(i=>d[i]);
(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();const f="modulepreload",g=function(l,r){return new URL(l,r).href},p={},s=function(r,o,i){let t=Promise.resolve();if(o&&o.length>0){const c=document.getElementsByTagName("link"),n=document.querySelector("meta[property=csp-nonce]"),_=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));t=Promise.allSettled(o.map(e=>{if(e=g(e,i),e in p)return;p[e]=!0;const m=e.endsWith(".css"),w=m?'[rel="stylesheet"]':"";if(!!i)for(let d=c.length-1;d>=0;d--){const h=c[d];if(h.href===e&&(!m||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${w}`))return;const u=document.createElement("link");if(u.rel=m?"stylesheet":f,m||(u.as="script"),u.crossOrigin="",u.href=e,_&&u.setAttribute("nonce",_),document.head.appendChild(u),m)return new Promise((d,h)=>{u.addEventListener("load",d),u.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${e}`)))})}))}function a(c){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=c,window.dispatchEvent(n),!n.defaultPrevented)throw c}return t.then(c=>{for(const n of c||[])n.status==="rejected"&&a(n.reason);return r().catch(a)})};class E{static crispSolverNames(){return["Forward Checking","Max Forward Checking","Local Changes","Local Changes Ex","Breakout","GENET","Crisp SRS3"]}static fuzzySolverNames(){return["Full Checking","Fuzzy Forward Checking","Flexible Local Changes","Flexible Local Changes Ex","Fuzzy Breakout","Fuzzy GENET","SRS3","SRS3 PF"]}static async createSolver(r){const o=await E.createCrispSolver(r);if(o)return o;const i=await E.createFuzzySolver(r);return i||null}static async createCrispSolver(r){switch(r.replaceAll(" ","")){case"ForwardChecking":case"forward-checking":const{ForwardChecking:o}=await s(async()=>{const{ForwardChecking:e}=await import("./forward-checking-BJtA6mxb.js");return{ForwardChecking:e}},__vite__mapDeps([0,1,2]),import.meta.url);return new o;case"MaxForwardChecking":case"max-forward-checking":const{MaxForwardChecking:i}=await s(async()=>{const{MaxForwardChecking:e}=await import("./max-forward-checking-BP5mwOwN.js");return{MaxForwardChecking:e}},__vite__mapDeps([3,1,2]),import.meta.url);return new i;case"LocalChanges":case"local-changes":const{LocalChanges:t}=await s(async()=>{const{LocalChanges:e}=await import("./local-changes-TAhYnAL6.js");return{LocalChanges:e}},__vite__mapDeps([4,1]),import.meta.url);return new t;case"LocalChangesEx":case"local-changes-ex":const{LocalChangesEx:a}=await s(async()=>{const{LocalChangesEx:e}=await import("./local-changes-ex-3fbDxCgL.js");return{LocalChangesEx:e}},__vite__mapDeps([5,1]),import.meta.url);return new a;case"Breakout":case"breakout":const{Breakout:c}=await s(async()=>{const{Breakout:e}=await import("./breakout-BefAtdhJ.js");return{Breakout:e}},__vite__mapDeps([6,1]),import.meta.url);return new c;case"GENET":case"genet":const{GENET:n}=await s(async()=>{const{GENET:e}=await import("./genet-BYPnU4Px.js");return{GENET:e}},__vite__mapDeps([7,1]),import.meta.url);return new n;case"CrispSRS3":case"crisp-srs3":const{CrispSRS3:_}=await s(async()=>{const{CrispSRS3:e}=await import("./crisp-srs3-DGzhdnYU.js");return{CrispSRS3:e}},__vite__mapDeps([8,1]),import.meta.url);return new _}return null}static async createFuzzySolver(r){switch(r.replaceAll(" ","")){case"FullChecking":case"full-checking":const{FullChecking:o}=await s(async()=>{const{FullChecking:e}=await import("./full-checking-azl--ddx.js");return{FullChecking:e}},__vite__mapDeps([9,10,1,2]),import.meta.url);return new o;case"FuzzyForwardChecking":case"fuzzy-forward-checking":const{FuzzyForwardChecking:i}=await s(async()=>{const{FuzzyForwardChecking:e}=await import("./fuzzy-forward-checking-DTKOb5jw.js");return{FuzzyForwardChecking:e}},__vite__mapDeps([11,10,1,2]),import.meta.url);return new i;case"FlexibleLocalChanges":case"flexible-local-changes":const{FlexibleLocalChanges:t}=await s(async()=>{const{FlexibleLocalChanges:e}=await import("./flexible-local-changes-I5tBWQ-I.js");return{FlexibleLocalChanges:e}},__vite__mapDeps([12,10,1]),import.meta.url);return new t;case"FlexibleLocalChangesEx":case"flexible-local-changes-ex":const{FlexibleLocalChangesEx:a}=await s(async()=>{const{FlexibleLocalChangesEx:e}=await import("./flexible-local-changes-ex-CHdBR8CQ.js");return{FlexibleLocalChangesEx:e}},__vite__mapDeps([13,10,1]),import.meta.url);return new a;case"FuzzyBreakout":case"fuzzy-breakout":const{FuzzyBreakout:c}=await s(async()=>{const{FuzzyBreakout:e}=await import("./fuzzy-breakout-DK-HMxaM.js");return{FuzzyBreakout:e}},__vite__mapDeps([14,1]),import.meta.url);return new c;case"FuzzyGENET":case"fuzzy-genet":const{FuzzyGENET:n}=await s(async()=>{const{FuzzyGENET:e}=await import("./fuzzy-genet-_rdeXWg8.js");return{FuzzyGENET:e}},__vite__mapDeps([15,1]),import.meta.url);return new n;case"SRS3":case"srs3":const{SRS3:_}=await s(async()=>{const{SRS3:e}=await import("./srs3-NbF4qyoB.js");return{SRS3:e}},__vite__mapDeps([16,1]),import.meta.url);return new _;case"SRS3PF":case"SRS3_PF":case"srs3-pf":{const{SRS3:e}=await s(async()=>{const{SRS3:w}=await import("./srs3-NbF4qyoB.js");return{SRS3:w}},__vite__mapDeps([16,1]),import.meta.url),{wrapWithPostStabilizer:m}=await s(async()=>{const{wrapWithPostStabilizer:w}=await import("./post-stabilizer-mGDQuW_A.js");return{wrapWithPostStabilizer:w}},__vite__mapDeps([17,1]),import.meta.url);return m(new e)}}return null}}function S(l){return new Promise(r=>{const o=setInterval(()=>{l()&&(clearInterval(o),r(null))},100)})}function F(l="output"){const r=document.getElementById(l);return o=>{r.value+=`${o}
`,setTimeout(()=>r.scrollTo(0,r.scrollHeight),100)}}export{E as S,F as c,S as w};
