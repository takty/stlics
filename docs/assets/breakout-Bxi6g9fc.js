var b=o=>{throw TypeError(o)};var g=(o,e,t)=>e.has(o)||b("Cannot "+t);var u=(o,e,t)=>(g(o,e,"read from private field"),t?t.call(o):e.get(o)),m=(o,e,t)=>e.has(o)?b("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,t),x=(o,e,t,i)=>(g(o,e,"write to private field"),i?i.call(o,t):e.set(o,t),t),p=(o,e,t)=>(g(o,e,"access private method"),t);import{S as A,A as S}from"./assignment-list-C1updL4I.js";import"./worker-DsrTQ5Xi.js";var c,a,f,w,k,y;class B extends A{constructor(){super();m(this,f);m(this,c,!0);m(this,a)}setRandomness(t){x(this,c,t)}name(){return"Breakout"}preprocess(){x(this,a,new Array(this.pro.constraintSize())),u(this,a).fill(1);for(const t of this.pro.variables())t.isEmpty()&&t.assign(t.domain().at(0));this.monitor.initialize()}exec(){const t=this.pro.ratio(),i=new S;let s=t;const r=new S;let l=null;for(;;){const h=this.pro.violatingConstraints(),n=this.pro.ratio();if(this.monitor.outputDebugString(`Evaluation: ${n}`),s<n&&(i.setProblem(this.pro),s=n,this.monitor.solutionFound(i,s)))return!0;if((l=this.monitor.check(n))!==null)break;p(this,f,w).call(this,h,r)}return l===!1&&!this.monitor.isTargetAssigned()&&t<s&&(i.apply(),l=!0),l}}c=new WeakMap,a=new WeakMap,f=new WeakSet,w=function(t,i){if(p(this,f,k).call(this,p(this,f,y).call(this,t),i),0<i.size()){const s=u(this,c)?i.random():i.at(0);s.apply(),i.clear(),this.monitor.outputDebugString("	"+s)}else{for(const s of t)u(this,a)[s.index()]+=1;this.monitor.outputDebugString("Breakout")}},k=function(t,i){let s=0;for(const r of t){const l=r.value();let h=0;for(const n of r)h+=(1-n.isSatisfied())*u(this,a)[n.index()];t:for(const n of r.domain()){if(l===n)continue;r.assign(n);let d=h;for(const v of r)if(d-=(1-v.isSatisfied())*u(this,a)[v.index()],d<s)continue t;s<d?(s=d,i.clear(),i.addVariable(r,n)):s!==0&&i.addVariable(r,n)}r.assign(l)}},y=function(t){const i=new Set;for(const s of t)for(const r of s)i.add(r);return Array.from(i)};export{B as Breakout};