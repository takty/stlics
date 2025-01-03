var k=s=>{throw TypeError(s)};var y=(s,h,t)=>h.has(s)||k("Cannot "+t);var i=(s,h,t)=>(y(s,h,"read from private field"),t?t.call(s):h.get(s)),f=(s,h,t)=>h.has(s)?k("Cannot add the same private member more than once"):h instanceof WeakSet?h.add(s):h.set(s,t),c=(s,h,t,e)=>(y(s,h,"write to private field"),e?e.call(s,t):h.set(s,t),t),p=(s,h,t)=>(y(s,h,"access private method"),t);import{C as P}from"./constraint-DeQkDHBu.js";import{S as R,A as _}from"./assignment-list-WRCWa3GG.js";import{c as N,D as U,i as v}from"./problems-NShnYMbn.js";var l,x,m,g,d,z,w,a,C,A,D,V,E;class I extends R{constructor(){super();f(this,a);f(this,l);f(this,x);f(this,m);f(this,g);f(this,d);f(this,z);f(this,w,!0)}setUsingMinimumRemainingValuesHeuristics(t){c(this,w,t)}name(){return"Forward Checking for Fuzzy CSPs"}preprocess(){c(this,l,[...this.pro.variables()]),c(this,x,N(this.pro,i(this,l))),c(this,m,Array.from(i(this,l),t=>new U(t.domain().size()))),c(this,g,new _),c(this,d,0),this.monitor.initialize()}exec(){let t=null;for(;t===null;)c(this,z,!1),this.pro.clearAllVariables(),t=p(this,a,C).call(this,0),i(this,g).apply();return t===!0}}l=new WeakMap,x=new WeakMap,m=new WeakMap,g=new WeakMap,d=new WeakMap,z=new WeakMap,w=new WeakMap,a=new WeakSet,C=function(t,e=1){if(t===this.pro.variableSize()){const n=this.pro.degree();return i(this,g).setProblem(this.pro),this.monitor.outputDebugString(`	Evaluation ${n}`),i(this,d)<n&&(c(this,d,n),c(this,z,!0),this.monitor.solutionFound(i(this,g),n))?!0:this.monitor.check(n)}let r=null;if((r=this.monitor.check())!==null)return r;const o=i(this,l)[i(this,w)?v(i(this,l),i(this,m)):t],b=o.domain(),u=i(this,m)[o.index()];for(let n=0,S=b.size();n<S;++n){if(u.isPruned(n))continue;o.assign(b.at(n));const F=Math.min(e,p(this,a,E).call(this,o));if(!(F<=i(this,d))){if(p(this,a,A).call(this,t,o)&&(r=p(this,a,C).call(this,t+1,F),r!==null||i(this,z)))break;for(const M of i(this,m))M.recover(t)}}if(r===null){for(const n of i(this,m))n.recover(t);o.clear()}return r},A=function(t,e){for(const r of i(this,l)){if(!r.isEmpty())continue;const o=p(this,a,D).call(this,e.index(),r.index()),b=i(this,m)[r.index()],u=r.domain();for(const n of o)if(n.emptyVariableSize()===1&&!p(this,a,V).call(this,t,r,u,b,n))return!1}return!0},D=function(t,e){return t<e?i(this,x)[e][t]:i(this,x)[t][e]},V=function(t,e,r,o,b){for(let u=0,n=r.size();u<n;++u)o.isPruned(u)||(e.assign(r.at(u)),b.degree()<=i(this,d)&&o.prune(u,t));return e.clear(),!o.isEmpty()},E=function(t){let e=Number.MAX_VALUE;for(const r of t){const o=r.degree();o!==P.UNDEFINED&&o<e&&(e=o)}return e};export{I as FuzzyForwardChecking};
