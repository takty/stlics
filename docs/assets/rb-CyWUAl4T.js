import{S as M,c as N,w as O}from"./style-DJ0JOy-w.js";/* empty css                   */const b=1,C=0,x=.8,R=4e3,U=10,_=.5,z=.5;document.addEventListener("DOMContentLoaded",async()=>{const u=document.getElementById("solver-type");u.value=""+C,M.fuzzySolverNames().forEach((s,t)=>{const e=document.createElement("option");e.textContent=s,e.value=""+t,u.appendChild(e)});const y=document.getElementById("var-num");y.value=""+U;const B=document.getElementById("density");B.value=""+_;const L=document.getElementById("ave-tightness");L.value=""+z;const g=document.getElementById("iter-num");g.value=""+b;const T=document.getElementById("target");T.value=""+x;const S=document.getElementById("target-on"),f=document.getElementById("time-limit");f.value=""+R;const k=document.getElementById("time-limit-on"),w=document.getElementById("debug-on"),F=document.getElementById("output"),c=N(),$=document.getElementById("indicator");let r=null;const v=document.getElementById("solver-start"),d=document.getElementById("solver-stop");v.addEventListener("click",()=>{v.disabled=!0,d.disabled=!1,F.value="",r=h(()=>d.click()),A(r,parseInt(u.value),S.checked?parseFloat(T.value):-1,k.checked?parseInt(f.value):-1,w.checked,parseFloat(y.value),parseFloat(B.value),parseFloat(L.value))}),d.addEventListener("click",()=>{v.disabled=!1,d.disabled=!0,r&&r.terminate()});let o=0;function h(s){let t=0,e=0;o=0;const n=parseInt(g.value),i=new Worker(new URL(""+new URL("worker-wDdSsLIL.js",import.meta.url).href,import.meta.url),{type:"module"});return i.onmessage=E=>{const{data:a}=E;if("log"in a)c(a.log);else if("result"in a){const{result:p,solver:I,time:l,ev:m}=a;t+=l,e+=m,o+=1,c(`Solver: ${I}    ${p?"Success":"Failure"}`),c(`Trial: ${o}    time: ${l}    degree: ${m}`),n<=o&&(c(`Avg. time: ${t/n}    Avg. degree: ${e/n}`),$.innerHTML=`Avg. time: ${(t/n).toFixed(1)}&emsp;Avg. degree: ${(e/n).toFixed(4)}`,s())}},i}async function A(s,t,e,n,i,E,a,p){const I=parseInt(g.value);for(let l=0;l<I;++l){const m=o;s.postMessage({task:"create",args:[E,a,p]}),s.postMessage({task:"solve",args:[t,e,n,i]}),await O(()=>o!==m)}}});
