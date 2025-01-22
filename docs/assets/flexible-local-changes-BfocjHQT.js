var L=t=>{throw TypeError(t)};var E=(t,s,o)=>s.has(t)||L("Cannot "+o);var m=(t,s,o)=>(E(t,s,"read from private field"),o?o.call(t):s.get(t)),w=(t,s,o)=>s.has(t)?L("Cannot add the same private member more than once"):s instanceof WeakSet?s.add(t):s.set(t,o),x=(t,s,o,n)=>(E(t,s,"write to private field"),n?n.call(t,o):s.set(t,o),o),g=(t,s,o)=>(E(t,s,"access private method"),o);var V=(t,s,o,n)=>({set _(e){x(t,s,e,o)},get _(){return m(t,s,n)}});import{S as O,A as b}from"./assignment-list-BcAdkaeZ.js";function P(t){let s=1,o=0;for(const n of t.constraints()){const e=B(n),r=q(n);e<s&&(s=e),o<r&&(o=r)}return[s,o]}function q(t){const s=t.size();return s===1?G(t):s===2?J(t):s===3?Q(t):W(t)}function B(t){const s=t.size();return s===1?I(t):s===2?K(t):s===3?U(t):Y(t)}function G(t){const s=t.degree();if(0<=s)return s;const o=t.at(0);let n=0;for(const e of o.domain()){const r=t.relation()(e);if(n<r&&(n=r),n===1)return 1}return n}function I(t){const s=t.degree();if(0<=s)return s;const o=t.at(0);let n=1;for(const e of o.domain()){const r=t.relation()(e);if(r<n&&(n=r),n===0)return 0}return n}function J(t){const s=t.degree();if(0<=s)return s;const o=t.at(0),n=t.at(1),e=o.isEmpty()?o.domain():[o.value()],r=n.isEmpty()?n.domain():[n.value()];let f=0;for(const c of e)for(const i of r){const a=t.relation()(c,i);if(f<a&&(f=a),f===1)return 1}return f}function K(t){const s=t.degree();if(0<=s)return s;const o=t.at(0),n=t.at(1),e=o.isEmpty()?o.domain():[o.value()],r=n.isEmpty()?n.domain():[n.value()];let f=1;for(const c of e)for(const i of r){const a=t.relation()(c,i);if(a<f&&(f=a),f===0)return 0}return f}function Q(t){const s=t.degree();if(0<=s)return s;const o=t.at(0),n=t.at(1),e=t.at(2),r=o.isEmpty()?o.domain():[o.value()],f=n.isEmpty()?n.domain():[n.value()],c=e.isEmpty()?e.domain():[e.value()];let i=0;for(const a of r)for(const l of f)for(const u of c){const h=t.relation()(a,l,u);if(i<h&&(i=h),i===1)return 1}return i}function U(t){const s=t.degree();if(0<=s)return s;const o=t.at(0),n=t.at(1),e=t.at(2),r=o.isEmpty()?o.domain():[o.value()],f=n.isEmpty()?n.domain():[n.value()],c=e.isEmpty()?e.domain():[e.value()];let i=1;for(const a of r)for(const l of f)for(const u of c){const h=t.relation()(a,l,u);if(h<i&&(i=h),i===0)return 0}return i}function W(t){const s=t.degree();if(0<=s)return s;const o=new Array(t.emptyVariableSize());let n=0;const e=new Array(t.size());for(let r=0,f=t.size();r<f;++r){const c=t.at(r);c.isEmpty()?o[n++]=r:e[r]=c.value()}return N(t,e,o,0,0)}function Y(t){const s=t.degree();if(0<=s)return s;const o=new Array(t.emptyVariableSize());let n=0;const e=new Array(t.size());for(let r=0,f=t.size();r<f;++r){const c=t.at(r);c.isEmpty()?o[n++]=r:e[r]=c.value()}return $(t,e,o,0,1)}function N(t,s,o,n,e){const r=o[n],f=t.at(r).domain();if(n===o.length-1)for(const c of f){s[r]=c;const i=t.relation()(...s);if(e<i&&(e=i),e===1)return 1}else for(const c of f)s[r]=c,e=N(t,s,o,n+1,e);return e}function $(t,s,o,n,e){const r=o[n],f=t.at(r).domain();if(n===o.length-1)for(const c of f){s[r]=c;const i=t.relation()(...s);if(i<e&&(e=i),e===0)return 0}else for(const c of f)s[r]=c,e=$(t,s,o,n+1,e);return e}var v,y,z,p,d,A,M,F,H,R,T,_;class et extends O{constructor(){super();w(this,d);w(this,v);w(this,y);w(this,z);w(this,p)}name(){return"Flexible Local Changes"}preprocess(){[V(this,y)._,V(this,v)._]=P(this.pro),x(this,z,this.pro.degree()),this.pro.emptyVariableSize()===0&&this.pro.clearAllVariables(),x(this,p,-1),this.monitor.initialize()}exec(){const o=new Set,n=new Set,e=new Set;for(const h of this.pro.variables())(h.isEmpty()?e:n).add(h);const r=new Set,f=g(this,d,R).call(this,n,r);let c,i=null;e.size===0?(c=f,i=b.fromVariables(n)):c=m(this,y);const a=g(this,d,A).call(this,n,r).union(e),l=n.difference(a);let u=g(this,d,M).call(this,o,l,a,m(this,v),m(this,v),c);return u<c&&i!==null&&i.apply(),u=this.pro.degree(),m(this,z)<u&&0<u&&(m(this,p)!==0||this.monitor.getTarget()===null)}}v=new WeakMap,y=new WeakMap,z=new WeakMap,p=new WeakMap,d=new WeakSet,A=function(o,n){const e=new Map;for(const c of n)if(c.isDefined())for(const i of c)e.has(i)?e.set(i,(e.get(i)??0)+1):e.set(i,1);const r=[...o];r.sort((c,i)=>{let a=0,l=0;return e.has(c)&&(a=e.get(c)??0),e.has(i)&&(l=e.get(i)??0),a<l?1:l<a?-1:0});const f=new Set;for(const c of r){let i=!1;for(const a of n)if(a.isDefined()){i=!0;break}if(!i)break;c.clear(),f.add(c)}return f},M=function(o,n,e,r,f,c){for(n=new Set(n),e=new Set(e);;){this.monitor.outputDebugString(`X1 ${o.size}, X2' ${n.size}, X3' ${e.size}`);const i=this.monitor.check(this.pro.degree());if(i!==null)return x(this,p,i?1:0),f;if(e.size===0)return f;const a=e.values().next().value,l=g(this,d,F).call(this,o,n,a,r,f,c);if(m(this,p)!==-1)return f;if(l<c)return m(this,y);n.add(a),e.delete(a),f=l}},F=function(o,n,e,r,f,c){let i=m(this,y);if(e.domain().size()===0)return i;let a=b.fromVariables(n),l=e.domain().at(0);const u=b.fromVariables(n);for(let h=0;h<e.domain().size()&&i<f;++h){const D=e.domain().at(h);e.assign(D);const C=Math.min(r,g(this,d,T).call(this,o,e,i,c));if(Math.max(i,c)<C){const S=new Set,j=Math.min(Math.min(C,f),g(this,d,_).call(this,o,n,e,C,f,S));if(i<j&&(i=j,l=D,a=b.fromVariables(n)),S.size){const k=g(this,d,H).call(this,o,n,e,C,f,S,Math.max(c,i));if(m(this,p)!==-1)return i;i<k&&(i=k,l=D,a=b.fromVariables(n)),u.apply()}}}return a.apply(),e.assign(l),i},H=function(o,n,e,r,f,c,i){const a=g(this,d,A).call(this,n,c),l=Z(o,e),u=n.difference(a);return g(this,d,M).call(this,l,u,a,r,Math.min(f,r),i)},R=function(o,n){const e=new Set;for(const f of o)for(const c of f)e.add(c);let r=1;for(const f of e){const c=f.degree();c<0||c<r&&(r=c)}for(const f of this.pro.constraints())B(f)<m(this,v)&&n.add(f);return r},T=function(o,n,e,r){let f=1;const c=new Set;for(const i of o){const a=this.pro.constraintsBetween(i,n);for(const l of a)c.add(l)}for(const i of c){const a=i.degree();if(!(a<0)&&(a<f&&(f=a),f<=e||f<=r))return f}return f},_=function(o,n,e,r,f,c){let i=1;const a=new Set;for(const l of o){const u=this.pro.constraintsBetween(l,e);for(const h of u)a.add(h)}for(const l of n){const u=this.pro.constraintsBetween(l,e);for(const h of u)a.add(h)}for(const l of a){const u=l.degree();u<0||u<i&&(i=u)}for(const l of a){const u=l.degree();u<0||(u<r||u<f)&&c.add(l)}return i};function Z(t,s){return new Set(t).add(s)}export{et as FlexibleLocalChanges};
