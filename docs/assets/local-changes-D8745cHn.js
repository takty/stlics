var v=s=>{throw TypeError(s)};var p=(s,i,t)=>i.has(s)||v("Cannot "+t);var g=(s,i,t)=>(p(s,i,"read from private field"),t?t.call(s):i.get(s)),m=(s,i,t)=>i.has(s)?v("Cannot add the same private member more than once"):i instanceof WeakSet?i.add(s):i.set(s,t),S=(s,i,t,e)=>(p(s,i,"write to private field"),e?e.call(s,t):i.set(s,t),t),u=(s,i,t)=>(p(s,i,"access private method"),t);import{S as y,A as V}from"./assignment-list-DigcDRg-.js";import"./worker-0tAFThaO.js";var f,c,d,w,D,b,$;class F extends y{constructor(){super();m(this,c);m(this,f)}name(){return"Local Changes"}preprocess(){this.pro.emptyVariableSize()===0&&this.pro.clearAllVariables(),S(this,f,!1),this.monitor.initialize()}exec(){const t=new Set,e=new Set;for(const a of this.pro.variables())(a.isEmpty()?e:t).add(a);const n=new V,o=u(this,c,d).call(this,new Set,t,e),r=this.pro.ratio();return this.monitor.outputDebugString(`Evaluation: ${r}`),o&&(n.setProblem(this.pro),this.monitor.solutionFound(n,r))?!0:o}}f=new WeakMap,c=new WeakSet,d=function(t,e,n){{this.monitor.outputDebugString(`X1 ${t.size}, X2' ${e.size}, X3' ${n.size}`);const o=this.monitor.check(this.pro.degree());if(o!==null)return S(this,f,!0),o;if(n.size===0)return!0;const r=n.values().next().value,a=u(this,c,w).call(this,t,e,r,C(r));return!a||g(this,f)?a:(e=z(e,r),n=A(n,r),u(this,c,d).call(this,t,e,n))}},w=function(t,e,n,o){if(o.size){const r=o.values().next().value,a=V.fromVariables(e);n.assign(r);const l=u(this,c,D).call(this,t,e,n,r);return l||g(this,f)?l:(n.clear(),a.apply(),u(this,c,w).call(this,t,e,n,A(o,r)))}return!1},D=function(t,e,n,o){if(!u(this,c,b).call(this,t,n,o))return!1;const r=t.union(e);if(u(this,c,b).call(this,r,n,o))return!0;const a=u(this,c,$).call(this,r,n,o);return t=z(t,n),e=e.difference(a),u(this,c,d).call(this,t,e,a)},b=function(t,e,n){const o=new Set;for(const a of t){const l=this.pro.constraintsBetween(e,a);for(const h of l)o.add(h)}const r=e.value();e.assign(n);for(const a of o)if(a.isSatisfied()!==1)return e.assign(r),!1;return e.assign(r),!0},$=function(t,e,n){const o=new Set,r=new Set;for(const l of t)for(const h of this.pro.constraintsBetween(e,l))r.add(h);const a=e.value();e.assign(n);for(const l of r)if(l.isSatisfied()!==1)for(const h of l)o.add(h);return e.assign(a),o.delete(e),o};function z(s,i){return new Set(s).add(i)}function A(s,i){const t=new Set(s);return t.delete(i),t}function C(s){return new Set(s.domain())}export{F as LocalChanges};
