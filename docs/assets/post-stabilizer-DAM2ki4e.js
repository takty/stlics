var E=t=>{throw TypeError(t)};var v=(t,e,i)=>e.has(t)||E("Cannot "+i);var a=(t,e,i)=>(v(t,e,"read from private field"),i?i.call(t):e.get(t)),h=(t,e,i)=>e.has(t)?E("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),p=(t,e,i,o)=>(v(t,e,"write to private field"),o?o.call(t,i):e.set(t,i),i);import{S as d,A as z}from"./assignment-list-Dz2-jIog.js";import"./worker-BqGrz0Px.js";function f(t,e,i=o=>console.log(o)){i("Start Post-Stabilization");let o,l=0;do{i("	Post-Stabilization: count "+l++),o=!1;let n=t.degree();const b=t.variables();for(let u=0;u<b.length;++u){const m=b[u],g=m.value(),S=e.at(u);g!==S.value()&&(S.apply(),n<=t.degree()?o=!0:m.assign(g))}}while(o);return i("Finish Post-Stabilization"),o}function R(t){return new D(t)}var r,s;class D extends d{constructor(i,o=c.DEGREE){super();h(this,r);h(this,s);p(this,r,i),p(this,s,o)}name(){return a(this,r).name()+" + PF"}exec(){let i=0,o=0;this.monitor.isDebugMode()&&(i=c.DEGREE===a(this,s)?this.pro.degree():this.pro.ratio(),o=this.pro.emptyVariableSize());const l=new z;l.setProblem(this.pro);const n=a(this,r).solve(this.pro,this.monitor);return n&&f(this.pro,l,this.monitor.outputDebugString.bind(this.monitor)),this.monitor.outputDebugString(`Solver result: ${n?"Success":"Failure"}`),this.monitor.outputDebugString(`Evaluation: ${i} -> ${c.DEGREE===a(this,s)?this.pro.degree():this.pro.ratio()}`),this.monitor.outputDebugString(`Empty variable size: ${o} -> ${this.pro.emptyVariableSize()}`),n}}r=new WeakMap,s=new WeakMap;const c={DEGREE:"degree",RATIO:"ratio"};export{D as PostStabilizerWrapper,f as applyPostStabilization,R as wrapWithPostStabilizer};
