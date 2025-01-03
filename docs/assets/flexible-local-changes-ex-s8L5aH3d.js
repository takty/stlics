var I=a=>{throw TypeError(a)};var V=(a,d,i)=>d.has(a)||I("Cannot "+i);var u=(a,d,i)=>(V(a,d,"read from private field"),i?i.call(a):d.get(a)),S=(a,d,i)=>d.has(a)?I("Cannot add the same private member more than once"):d instanceof WeakSet?d.add(a):d.set(a,i),D=(a,d,i,s)=>(V(a,d,"write to private field"),s?s.call(a,i):d.set(a,i),i),p=(a,d,i)=>(V(a,d,"access private method"),i);import{C as z}from"./worker-0tAFThaO.js";import{S as R,A as x}from"./assignment-list-DigcDRg-.js";var w,b,C,g,h,M,L,U,j,A,k,B,$;class G extends R{constructor(){super();S(this,h);S(this,w);S(this,b);S(this,C);S(this,g)}name(){return"Flexible Local Changes Ex"}preprocess(){p(this,h,L).call(this),D(this,C,this.pro.degree()),this.pro.emptyVariableSize()===0&&this.pro.clearAllVariables(),D(this,g,-1),this.monitor.initialize()}exec(){const i=new Set,s=new Set,t=new Set;for(const m of this.pro.variables())(m.isEmpty()?t:s).add(m);const f=new Set,n=p(this,h,k).call(this,s,f);let o,e=null;t.size===0?(o=n,e=x.fromVariables(s)):o=u(this,b);const r=p(this,h,M).call(this,s,f).union(t),c=s.difference(r);let l=p(this,h,A).call(this,i,c,r,u(this,w),u(this,w),o);return l<o&&e!==null&&e.apply(),l=this.pro.degree(),l>u(this,C)&&l>0&&(u(this,g)!==0||this.monitor.getTarget()===null)}}w=new WeakMap,b=new WeakMap,C=new WeakMap,g=new WeakMap,h=new WeakSet,M=function(i,s){const t=new Map;for(const o of s)if(o.isDefined())for(const e of o)t.has(e)?t.set(e,(t.get(e)??0)+1):t.set(e,1);const f=[...i];f.sort((o,e)=>{let r=0,c=0;return t.has(o)&&(r=t.get(o)??0),t.has(e)&&(c=t.get(e)??0),r<c?1:r>c?-1:0});const n=new Set;for(const o of f){let e=!1;for(const r of s)if(r.isDefined()){e=!0;break}if(!e)break;o.clear(),n.add(o)}return n},L=function(){let i=1,s=0;for(const t of this.pro.variables())for(const f of t){const n=f.lowestConsistencyDegree(),o=f.highestConsistencyDegree();n<i&&(i=n),o>s&&(s=o)}D(this,b,i),D(this,w,s)},U=function(i,s,t,f,n,o,e){const r=p(this,h,M).call(this,s,o),c=T(i,t),l=s.difference(r);return p(this,h,A).call(this,c,l,r,f,Math.min(n,f),e)},j=function(i,s,t,f,n,o){let e=u(this,b);if(t.domain().size()===0)return e;let r=x.fromVariables(s),c=t.domain().at(0);const l=x.fromVariables(s);for(let m=0;m<t.domain().size()&&e<n;++m){const y=t.domain().at(m);t.assign(y);const E=Math.min(f,p(this,h,B).call(this,i,t,e,o));if(E>Math.max(e,o)){const N=new Set,F=Math.min(Math.min(E,n),p(this,h,$).call(this,i,s,t,E,n,N));if(F>e&&(e=F,c=y,r=x.fromVariables(s)),N.size){const v=p(this,h,U).call(this,i,s,t,E,n,N,Math.max(o,e));if(u(this,g)!==-1)return e;v>e&&(e=v,c=y,r=x.fromVariables(s)),l.apply()}}}return r.apply(),t.assign(c),e},A=function(i,s,t,f,n,o){for(s=new Set(s),t=new Set(t);;){this.monitor.outputDebugString(`X1 ${i.size}, X2' ${s.size}, X3' ${t.size}`);const e=this.monitor.check(this.pro.degree());if(e!==null)return D(this,g,e?1:0),n;if(t.size===0)return n;const r=t.values().next().value,c=p(this,h,j).call(this,i,s,r,f,n,o);if(u(this,g)!==-1)return n;if(c<o)return u(this,b);s.add(r),t.delete(r),n=c}},k=function(i,s){const t=new Set;for(const n of i)for(const o of n)t.add(o);let f=1;for(const n of t){const o=n.degree();o!==z.UNDEFINED&&o<f&&(f=o)}for(const n of this.pro.constraints())n.lowestConsistencyDegree()<u(this,w)&&s.add(n);return f},B=function(i,s,t,f){let n=1;const o=new Set;for(const e of i){const r=this.pro.constraintsBetween(e,s);for(const c of r)o.add(c)}for(const e of o){const r=e.degree();if(r!==z.UNDEFINED&&(r<n&&(n=r),n<=t||n<=f))return n}return n},$=function(i,s,t,f,n,o){let e=1;const r=new Set;for(const c of i){const l=this.pro.constraintsBetween(c,t);for(const m of l)r.add(m)}for(const c of s){const l=this.pro.constraintsBetween(c,t);for(const m of l)r.add(m)}for(const c of r){const l=c.degree();l!==z.UNDEFINED&&l<e&&(e=l)}for(const c of r){const l=c.degree();l!==z.UNDEFINED&&(l<f||l<n)&&o.add(c)}return e};function T(a,d){return new Set(a).add(d)}export{G as FlexibleLocalChangesEx};
