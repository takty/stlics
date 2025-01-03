var c=t=>{throw TypeError(t)};var m=(t,e,i)=>e.has(t)||c("Cannot "+i);var l=(t,e,i)=>(m(t,e,"read from private field"),i?i.call(t):e.get(t)),S=(t,e,i)=>e.has(t)?c("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),g=(t,e,i,o)=>(m(t,e,"write to private field"),o?o.call(t,i):e.set(t,i),i);import{S as z,A as v}from"./assignment-list-5MSHh1Ct.js";import"./worker-Cj0YX52P.js";function d(t,e,i=o=>console.log(o)){i("Start Post-Stabilization");let o,n=0;do{i("	Post-Stabilization: count "+n++),o=!1;let r=t.degree();const u=t.variables();for(let a=0;a<u.length;++a){const p=u[a],h=p.value(),b=e.at(a);h!==b.value()&&(b.apply(),r<=t.degree()?o=!0:p.assign(h))}}while(o);return i("Finish Post-Stabilization"),o}function D(t){return new f(t)}var s;class f extends z{constructor(i){super();S(this,s);g(this,s,i)}name(){return l(this,s).name()+" + PF"}exec(){let i=0,o=0;this.monitor.isDebugMode()&&(i=this.pro.isFuzzy()?this.pro.degree():this.pro.ratio(),o=this.pro.emptyVariableSize());const n=new v;n.setProblem(this.pro);const r=l(this,s).solve(this.pro,this.monitor);return r&&d(this.pro,n,this.monitor.outputDebugString.bind(this.monitor)),this.monitor.outputDebugString(`Solver result: ${r?"Success":"Failure"}`),this.monitor.outputDebugString(`Evaluation: ${i} -> ${this.pro.isFuzzy()?this.pro.degree():this.pro.ratio()}`),this.monitor.outputDebugString(`Empty variable size: ${o} -> ${this.pro.emptyVariableSize()}`),r}}s=new WeakMap;export{f as PostStabilizerWrapper,d as applyPostStabilization,D as wrapWithPostStabilizer};
