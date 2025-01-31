var D=o=>{throw TypeError(o)};var w=(o,h,t)=>h.has(o)||D("Cannot "+t);var i=(o,h,t)=>(w(o,h,"read from private field"),t?t.call(o):h.get(o)),f=(o,h,t)=>h.has(o)?D("Cannot add the same private member more than once"):h instanceof WeakSet?h.add(o):h.set(o,t),u=(o,h,t,s)=>(w(o,h,"write to private field"),s?s.call(o,t):h.set(o,t),t),g=(o,h,t)=>(w(o,h,"access private method"),t);import{S as _,A as v}from"./assignment-list-BWqeqhDz.js";import{c as U,D as L,i as W}from"./problems-NShnYMbn.js";import"./worker-Djgd5E2e.js";var d,x,l,b,m,z,y,k,c,F,P,C,V,E,M;class T extends _{constructor(){super();f(this,c);f(this,d);f(this,x);f(this,l);f(this,b);f(this,m);f(this,z);f(this,y,!0);f(this,k,0)}setUsingMinimumRemainingValuesHeuristics(t){u(this,y,t)}setPrePruningDegree(t){u(this,k,t)}name(){return"Fuzzy Forward Checking"}preprocess(){u(this,d,[...this.pro.variables()]),u(this,x,U(this.pro,i(this,d))),u(this,l,Array.from(i(this,d),t=>new L(t.domain().size()))),u(this,b,new v),u(this,m,i(this,k)),this.monitor.initialize()}exec(){let t=null;for(;t===null;){if(u(this,z,!1),this.pro.clearAllVariables(),!g(this,c,F).call(this)){t=!1;break}t=g(this,c,P).call(this,0),i(this,b).apply()}return t===!0}}d=new WeakMap,x=new WeakMap,l=new WeakMap,b=new WeakMap,m=new WeakMap,z=new WeakMap,y=new WeakMap,k=new WeakMap,c=new WeakSet,F=function(){for(const t of this.pro.constraints()){if(t.size()!==1)continue;const s=t.at(0),e=s.domain(),r=i(this,l)[s.index()],p=t.relation();for(let a=0,n=e.size();a<n;++a)r.isPruned(a)||p(e.at(a))<=i(this,m)&&r.prune(a,-1);if(r.isEmpty())return!1}return!0},P=function(t,s=1){if(t===this.pro.variableSize()){const n=this.pro.degree();return i(this,b).setProblem(this.pro),this.monitor.outputDebugString(`	Evaluation ${n}`),i(this,m)<n&&(u(this,m,n),u(this,z,!0),this.monitor.solutionFound(i(this,b),n))?!0:this.monitor.check(n)}let e=null;if((e=this.monitor.check())!==null)return e;const r=i(this,d)[i(this,y)?W(i(this,d),i(this,l)):t],p=r.domain(),a=i(this,l)[r.index()];for(let n=0,R=p.size();n<R;++n){if(a.isPruned(n))continue;r.assign(p.at(n));const A=Math.min(s,g(this,c,M).call(this,r));if(!(A<=i(this,m))){if(g(this,c,C).call(this,t,r)&&(e=g(this,c,P).call(this,t+1,A),e!==null||i(this,z)))break;for(const S of i(this,l))S.recover(t)}}if(e===null){for(const n of i(this,l))n.recover(t);r.clear()}return e},C=function(t,s){for(const e of i(this,d)){if(!e.isEmpty())continue;const r=g(this,c,V).call(this,s.index(),e.index()),p=i(this,l)[e.index()],a=e.domain();for(const n of r)if(n.emptySize()===1&&!g(this,c,E).call(this,t,e,a,p,n))return!1}return!0},V=function(t,s){return t<s?i(this,x)[s][t]:i(this,x)[t][s]},E=function(t,s,e,r,p){for(let a=0,n=e.size();a<n;++a)r.isPruned(a)||(s.assign(e.at(a)),p.degree()<=i(this,m)&&r.prune(a,t));return s.clear(),!r.isEmpty()},M=function(t){let s=Number.MAX_VALUE;for(const e of t){const r=e.degree();0<=r&&r<s&&(s=r)}return s};export{T as FuzzyForwardChecking};
