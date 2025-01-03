var I=a=>{throw TypeError(a)};var A=(a,d,e)=>d.has(a)||I("Cannot "+e);var p=(a,d,e)=>(A(a,d,"read from private field"),e?e.call(a):d.get(a)),D=(a,d,e)=>d.has(a)?I("Cannot add the same private member more than once"):d instanceof WeakSet?d.add(a):d.set(a,e),S=(a,d,e,o)=>(A(a,d,"write to private field"),o?o.call(a,e):d.set(a,e),e),u=(a,d,e)=>(A(a,d,"access private method"),e);import{C as y}from"./worker-DgaNPRL8.js";import{S as T,A as x}from"./assignment-list-DGHzeCGb.js";var b,w,C,g,l,M,U,j,k,E,B,$,R;class J extends T{constructor(){super();D(this,l);D(this,b);D(this,w);D(this,C);D(this,g)}name(){return"Flexible Local Changes"}preprocess(){u(this,l,U).call(this),S(this,C,this.pro.degree()),this.pro.emptyVariableSize()===0&&this.pro.clearAllVariables(),S(this,g,-1),this.monitor.initialize()}exec(){const e=new Set,o=new Set,t=new Set;for(const m of this.pro.variables())(m.isEmpty()?t:o).add(m);const f=new Set,i=u(this,l,B).call(this,o,f);let n,s=null;t.size===0?(n=i,s=x.fromVariables(o)):n=p(this,w);const r=u(this,l,M).call(this,o,f).union(t),c=o.difference(r);let h=u(this,l,E).call(this,e,c,r,p(this,b),p(this,b),n);return h<n&&s!==null&&s.apply(),h=this.pro.degree(),h>p(this,C)&&h>0&&(p(this,g)!==0||this.monitor.getTarget()===null)}}b=new WeakMap,w=new WeakMap,C=new WeakMap,g=new WeakMap,l=new WeakSet,M=function(e,o){const t=new Map;for(const n of o)if(n.isDefined())for(const s of n)t.has(s)?t.set(s,(t.get(s)??0)+1):t.set(s,1);const f=[...e];f.sort((n,s)=>{let r=0,c=0;return t.has(n)&&(r=t.get(n)??0),t.has(s)&&(c=t.get(s)??0),r<c?1:r>c?-1:0});const i=new Set;for(const n of f){let s=!1;for(const r of o)if(r.isDefined()){s=!0;break}if(!s)break;n.clear(),i.add(n)}return i},U=function(){let e=1,o=0;for(const t of this.pro.variables())for(const f of t){const i=f.lowestConsistencyDegree(),n=f.highestConsistencyDegree();i<e&&(e=i),n>o&&(o=n)}S(this,w,e),S(this,b,o)},j=function(e,o,t,f,i,n,s){const r=u(this,l,M).call(this,o,n),c=L(e,t),h=o.difference(r);return u(this,l,E).call(this,c,h,r,f,Math.min(i,f),s)},k=function(e,o,t,f,i,n){let s=p(this,w);if(t.domain().size()===0)return s;let r=x.fromVariables(o),c=t.domain().at(0);const h=x.fromVariables(o);for(let m=0;m<t.domain().size()&&s<i;++m){const N=t.domain().at(m);t.assign(N);const z=Math.min(f,u(this,l,$).call(this,e,t,s,n));if(z>Math.max(s,n)){const V=new Set,F=Math.min(Math.min(z,i),u(this,l,R).call(this,e,o,t,z,i,V));if(F>s&&(s=F,c=N,r=x.fromVariables(o)),V.size){const v=u(this,l,j).call(this,e,o,t,z,i,V,Math.max(n,s));if(p(this,g)!==-1)return s;v>s&&(s=v,c=N,r=x.fromVariables(o)),h.apply()}}}return r.apply(),t.assign(c),s},E=function(e,o,t,f,i,n){{this.monitor.outputDebugString(`X1 ${e.size}, X2' ${o.size}, X3' ${t.size}`);const s=this.monitor.check(this.pro.degree());if(s!==null)return S(this,g,s?1:0),i;if(t.size===0)return i;const r=t.values().next().value,c=u(this,l,k).call(this,e,o,r,f,i,n);return p(this,g)!==-1?i:c<n?p(this,w):(o=L(o,r),t=_(t,r),u(this,l,E).call(this,e,o,t,f,c,n))}},B=function(e,o){const t=new Set;for(const i of e)for(const n of i)t.add(n);let f=1;for(const i of t){const n=i.degree();n!==y.UNDEFINED&&n<f&&(f=n)}for(const i of this.pro.constraints())i.lowestConsistencyDegree()<p(this,b)&&o.add(i);return f},$=function(e,o,t,f){let i=1;const n=new Set;for(const s of e){const r=this.pro.constraintsBetween(s,o);for(const c of r)n.add(c)}for(const s of n){const r=s.degree();if(r!==y.UNDEFINED&&(r<i&&(i=r),i<=t||i<=f))return i}return i},R=function(e,o,t,f,i,n){let s=1;const r=new Set;for(const c of e){const h=this.pro.constraintsBetween(c,t);for(const m of h)r.add(m)}for(const c of o){const h=this.pro.constraintsBetween(c,t);for(const m of h)r.add(m)}for(const c of r){const h=c.degree();h!==y.UNDEFINED&&h<s&&(s=h)}for(const c of r){const h=c.degree();h!==y.UNDEFINED&&(h<f||h<i)&&n.add(c)}return s};function L(a,d){return new Set(a).add(d)}function _(a,d){const e=new Set(a);return e.delete(d),e}export{J as FlexibleLocalChanges};
