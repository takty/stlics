var v=n=>{throw TypeError(n)};var d=(n,o,e)=>o.has(n)||v("Cannot "+e);var p=(n,o,e)=>(d(n,o,"read from private field"),e?e.call(n):o.get(n)),g=(n,o,e)=>o.has(n)?v("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(n):o.set(n,e),m=(n,o,e,t)=>(d(n,o,"write to private field"),t?t.call(n,e):o.set(n,e),e),l=(n,o,e)=>(d(n,o,"access private method"),e);import{S as $,A as b}from"./assignment-list-QSne9nWF.js";import"./worker-BaWs3863.js";var u,c,S,V,z,w,A;class D extends ${constructor(){super();g(this,c);g(this,u)}name(){return"Local Changes"}preprocess(){this.pro.emptyVariableSize()===0&&this.pro.clearAllVariables(),m(this,u,!1),this.monitor.initialize()}exec(){const e=new Set,t=new Set;for(const a of this.pro.variables())(a.isEmpty()?t:e).add(a);const s=new b,r=l(this,c,S).call(this,new Set,e,t),i=this.pro.ratio();return this.monitor.outputDebugString(`Evaluation: ${i}`),r&&(s.setProblem(this.pro),this.monitor.solutionFound(s,i))?!0:r}}u=new WeakMap,c=new WeakSet,S=function(e,t,s){for(t=new Set(t),s=new Set(s);;){this.monitor.outputDebugString(`X1 ${e.size}, X2' ${t.size}, X3' ${s.size}`);const r=this.monitor.check(this.pro.degree());if(r!==null)return m(this,u,!0),r;if(s.size===0)return!0;const i=s.values().next().value,a=l(this,c,V).call(this,e,t,i);if(!a||p(this,u))return a;t.add(i),s.delete(i)}},V=function(e,t,s){for(const r of s.domain()){const i=b.fromVariables(t);s.assign(r);const a=l(this,c,z).call(this,e,t,s);if(a||p(this,u))return a;s.clear(),i.apply()}return!1},z=function(e,t,s){if(!l(this,c,w).call(this,e,s,s.value()))return!1;const r=e.union(t);if(l(this,c,w).call(this,r,s,s.value()))return!0;const i=l(this,c,A).call(this,r,s,s.value());return e=y(e,s),t=t.difference(i),l(this,c,S).call(this,e,t,i)},w=function(e,t,s){const r=new Set;for(const a of e){const f=this.pro.constraintsBetween(t,a);for(const h of f)r.add(h)}const i=t.value();t.assign(s);for(const a of r)if(a.isSatisfied()!==1)return t.assign(i),!1;return t.assign(i),!0},A=function(e,t,s){const r=new Set,i=new Set;for(const f of e)for(const h of this.pro.constraintsBetween(t,f))i.add(h);const a=t.value();t.assign(s);for(const f of i)if(f.isSatisfied()!==1)for(const h of f)r.add(h);return t.assign(a),r.delete(t),r};function y(n,o){return new Set(n).add(o)}export{D as LocalChanges};
