import{S,c as $,w as C}from"./style-CXXmotYV.js";/* empty css                   */const u=1,N=0,O=1,U=4e3,R=20;document.addEventListener("DOMContentLoaded",async()=>{const p=document.getElementById("solver-type");p.value=""+N,S.crispSolverNames().forEach((n,o)=>{const t=document.createElement("option");t.textContent=n,t.value=""+o,p.appendChild(t)});const c=document.getElementById("queen-num");c.value=""+R;const f=document.getElementById("target");f.value=""+O;const k=document.getElementById("target-on"),I=document.getElementById("time-limit");I.value=""+U;const w=document.getElementById("time-limit-on"),v=document.getElementById("board"),T=document.getElementById("output"),i=$();let y=null,d=null;const g=document.getElementById("solver-start"),m=document.getElementById("solver-stop");g.addEventListener("click",()=>{g.disabled=!0,m.disabled=!1,40<=parseInt(c.value)?v.classList.add("small"):v.classList.remove("small"),y=h(v,parseInt(c.value)),T.value="",d=b(()=>m.click()),M(d,parseInt(p.value),k.checked?parseFloat(f.value):-1,w.checked?parseInt(I.value):-1,parseInt(c.value))}),m.addEventListener("click",()=>{g.disabled=!1,m.disabled=!0,d&&d.terminate()});function h(n,o){const t=[];n.innerHTML="";for(let s=0;s<o;++s){const a=document.createElement("tr");n.appendChild(a),t.push(a);for(let e=0;e<o;++e){const l=document.createElement("td");a.appendChild(l)}}return t}let r=0;function b(n){let o=0,t=0;const s=new Worker(new URL(""+new URL("worker-nPXDDd-X.js",import.meta.url).href,import.meta.url),{type:"module"});return s.onmessage=a=>{const{data:e}=a;if("log"in e)i(e.log);else if("board"in e){const{x:l,y:E}=e.board;y[E].className="p"+l}else if("result"in e){const{result:l,solver:E,time:L,ev:B}=e;o+=L,t+=B,r+=1,i(`solver: ${E}   ${l?"success":"failure"}`),i(`trial: ${r}   time: ${L}   ratio: ${B}`),u<=r&&(i(`average time: ${o/u}   average ratio: ${t/u}`),n())}},s}async function M(n,o,t,s,a){for(let e=0;e<u;++e){const l=r;n.postMessage({task:"create",args:[a]}),n.postMessage({task:"solve",args:[o,t,s]}),await C(()=>r!==l)}}});
