var B=f=>{throw TypeError(f)};var R=(f,d,i)=>d.has(f)||B("Cannot "+i);var s=(f,d,i)=>(R(f,d,"read from private field"),i?i.call(f):d.get(f)),y=(f,d,i)=>d.has(f)?B("Cannot add the same private member more than once"):d instanceof WeakSet?d.add(f):d.set(f,i),g=(f,d,i,r)=>(R(f,d,"write to private field"),r?r.call(f,i):d.set(f,i),i),x=(f,d,i)=>(R(f,d,"access private method"),i);import{S as X,A as $}from"./assignment-list-Bn_CsjuY.js";import{c as G,D as J,i as K}from"./problems-NShnYMbn.js";import"./worker-Bnks17Ui.js";var z,j,k,w,E,F,b,A,S,D,V,h,I,v,L,U,N,q,H,O,T;class ti extends X{constructor(){super();y(this,h);y(this,z);y(this,j);y(this,k);y(this,w);y(this,E);y(this,F);y(this,b);y(this,A);y(this,S,!0);y(this,D,0);y(this,V,!1)}setUsingMinimumRemainingValuesHeuristics(i){g(this,S,i)}setPrePruningDegree(i){g(this,D,i)}setIntensivePruning(i){g(this,V,i)}name(){return"Full Checking"}preprocess(){g(this,z,[...this.pro.variables()]),g(this,j,G(this.pro,s(this,z))),g(this,k,Array.from(s(this,z),i=>new J(i.domain().size()))),g(this,w,new $),g(this,E,new Set),g(this,F,new Array(this.pro.variableSize())),g(this,b,s(this,D)),this.monitor.initialize()}exec(){let i=null;for(;i===null;){if(g(this,A,!1),this.pro.clearAllVariables(),!x(this,h,I).call(this)){i=!1;break}i=x(this,h,v).call(this,0),s(this,w).apply()}return i===!0}}z=new WeakMap,j=new WeakMap,k=new WeakMap,w=new WeakMap,E=new WeakMap,F=new WeakMap,b=new WeakMap,A=new WeakMap,S=new WeakMap,D=new WeakMap,V=new WeakMap,h=new WeakSet,I=function(){for(const i of this.pro.constraints()){if(i.size()!==1)continue;const r=i.at(0),n=r.domain(),o=s(this,k)[r.index()],a=i.relation();for(let e=0,t=n.size();e<t;++e)o.isPruned(e)||a(n.at(e))<=s(this,b)&&o.prune(e,-1);if(o.isEmpty())return!1}return!0},v=function(i,r=1){if(i===this.pro.variableSize()){const t=this.pro.degree();return s(this,w).setProblem(this.pro),this.monitor.outputDebugString(`	Evaluation ${t}`),s(this,b)<t&&(g(this,b,t),g(this,A,!0),this.monitor.solutionFound(s(this,w),t))?!0:this.monitor.check(t)}let n=null;if((n=this.monitor.check())!==null)return n;const o=s(this,z)[s(this,S)?K(s(this,z),s(this,k)):i],a=o.domain(),e=s(this,k)[o.index()];s(this,F)[i]=o;for(let t=0,p=a.size();t<p;++t){if(e.isPruned(t))continue;o.assign(a.at(t));const c=Math.min(r,x(this,h,T).call(this,o));if(!(c<=s(this,b))){if(x(this,h,L).call(this,i,o)&&(n=x(this,h,v).call(this,i+1,c),n!==null||s(this,A)))break;for(const u of s(this,k))u.recover(i)}}if(n===null){for(const t of s(this,k))t.recover(i);o.clear()}return n},L=function(i,r){for(const n of s(this,z)){if(!n.isEmpty())continue;const o=x(this,h,U).call(this,r.index(),n.index()),a=s(this,k)[n.index()],e=n.domain();for(const t of o){const p=t.emptySize();if(p===1){if(!x(this,h,N).call(this,i,n,e,a,t))return!1}else if(s(this,V)){if(p===2){if(!x(this,h,q).call(this,i,n,e,a,t))return!1}else if(p===3){if(!x(this,h,H).call(this,i,n,e,a,t))return!1}else if(3<p&&!x(this,h,O).call(this,i,n,e,a,t,p))return!1}}}return!0},U=function(i,r){return i<r?s(this,j)[r][i]:s(this,j)[i][r]},N=function(i,r,n,o,a){for(let e=0,t=n.size();e<t;++e)o.isPruned(e)||(r.assign(n.at(e)),a.degree()<=s(this,b)&&o.prune(e,i));return r.clear(),!o.isEmpty()},q=function(i,r,n,o,a){let e=null;for(const c of a)if(c.isEmpty()&&c!==r){e=c;break}const t=e.domain(),p=s(this,k)[e.index()];i:for(let c=0,u=n.size();c<u;++c)if(!o.isPruned(c)){r.assign(n.at(c));for(let P=0,m=t.size();P<m;++P)if(!p.isPruned(P)&&(e.assign(t.at(P)),s(this,b)<a.degree()))continue i;o.prune(c,i)}return e.clear(),r.clear(),!o.isEmpty()},H=function(i,r,n,o,a){let e=null,t=null;for(const m of a)if(m.isEmpty()&&m!==r)if(e===null)e=m;else{t=m;break}const p=e.domain(),c=t.domain(),u=s(this,k)[e.index()],P=s(this,k)[t.index()];i:for(let m=0,l=n.size();m<l;++m)if(!o.isPruned(m)){r.assign(n.at(m));for(let C=0,_=p.size();C<_;++C)if(!u.isPruned(C)){e.assign(p.at(C));for(let M=0,W=c.size();M<W;++M)if(!P.isPruned(M)&&(t.assign(c.at(M)),s(this,b)<a.degree()))continue i}o.prune(m,i)}return t.clear(),e.clear(),r.clear(),!o.isEmpty()},O=function(i,r,n,o,a,e){const t=new Array(e-1);let p=0;for(const u of a)u.isEmpty()&&u!==r&&(t[p++]=u);const c=new Array(t.length);i:for(let u=0,P=n.size();u<P;++u)if(!o.isPruned(u)){r.assign(n.at(u)),c.fill(0);t:for(;;){let m=!1;for(let l=0;l<t.length;++l){const C=t[l].domain();if(s(this,k)[t[l].index()].isPruned(c[l])){m=!0;break}t[l].assign(C.at(c[l]))}if(!m&&s(this,b)<a.degree())continue i;for(let l=0;l<t.length&&(c[l]+=1,!(c[l]<t[l].domain().size()));++l)if(c[l]=0,l===t.length-1)break t}o.prune(u,i)}for(const u of t)u.clear();return r.clear(),!o.isEmpty()},T=function(i){let r=Number.MAX_VALUE;s(this,E).clear();for(const n of s(this,z)){if(n===i||n.isEmpty())continue;const o=x(this,h,U).call(this,i.index(),n.index());for(const a of o)if(!s(this,E).has(a)){const e=a.degree();0<=e&&e<r&&(r=e),s(this,E).add(a)}}return r};export{ti as FullChecking};
