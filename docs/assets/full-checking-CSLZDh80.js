var B=f=>{throw TypeError(f)};var v=(f,d,i)=>d.has(f)||B("Cannot "+i);var e=(f,d,i)=>(v(f,d,"read from private field"),i?i.call(f):d.get(f)),y=(f,d,i)=>d.has(f)?B("Cannot add the same private member more than once"):d instanceof WeakSet?d.add(f):d.set(f,i),g=(f,d,i,n)=>(v(f,d,"write to private field"),n?n.call(f,i):d.set(f,i),i),x=(f,d,i)=>(v(f,d,"access private method"),i);import{S as X,A as $}from"./assignment-list-DGE13yHI.js";import{c as G,D as J,i as K}from"./problems-NShnYMbn.js";import"./worker-CNI0rxSG.js";var z,j,k,C,E,F,S,b,A,V,M,h,I,D,L,U,N,q,H,O,T;class ti extends X{constructor(){super();y(this,h);y(this,z);y(this,j);y(this,k);y(this,C);y(this,E);y(this,F);y(this,S);y(this,b);y(this,A);y(this,V,!0);y(this,M,!1)}setUsingMinimumRemainingValuesHeuristics(i){g(this,V,i)}setIntensivePruning(i){g(this,M,i)}name(){return"Full Checking"}preprocess(){g(this,z,[...this.pro.variables()]),g(this,j,G(this.pro,e(this,z))),g(this,k,Array.from(e(this,z),i=>new J(i.domain().size()))),g(this,C,new $),g(this,E,new Set),g(this,F,new Array(this.pro.variableSize())),g(this,S,this.pro.constraints().filter(i=>i.size()===1)),g(this,b,0),this.monitor.initialize()}exec(){let i=null;for(;i===null;){if(g(this,A,!1),this.pro.clearAllVariables(),!x(this,h,I).call(this)){i=!1;break}i=x(this,h,D).call(this,0),e(this,C).apply()}return i===!0}}z=new WeakMap,j=new WeakMap,k=new WeakMap,C=new WeakMap,E=new WeakMap,F=new WeakMap,S=new WeakMap,b=new WeakMap,A=new WeakMap,V=new WeakMap,M=new WeakMap,h=new WeakSet,I=function(){for(const i of e(this,S)){const n=i.at(0),r=n.value(),o=n.domain(),a=e(this,k)[n.index()];for(let s=0,t=o.size();s<t;++s)n.assign(o.at(s)),i.degree()<=e(this,b)&&a.prune(s,-1);if(n.assign(r),a.isEmpty())return!1}return!0},D=function(i,n=1){if(i===this.pro.variableSize()){const t=this.pro.degree();return e(this,C).setProblem(this.pro),this.monitor.outputDebugString(`	Evaluation ${t}`),e(this,b)<t&&(g(this,b,t),g(this,A,!0),this.monitor.solutionFound(e(this,C),t))?!0:this.monitor.check(t)}let r=null;if((r=this.monitor.check())!==null)return r;const o=e(this,z)[e(this,V)?K(e(this,z),e(this,k)):i],a=o.domain(),s=e(this,k)[o.index()];e(this,F)[i]=o;for(let t=0,p=a.size();t<p;++t){if(s.isPruned(t))continue;o.assign(a.at(t));const c=Math.min(n,x(this,h,T).call(this,o));if(!(c<=e(this,b))){if(x(this,h,L).call(this,i,o)&&(r=x(this,h,D).call(this,i+1,c),r!==null||e(this,A)))break;for(const u of e(this,k))u.recover(i)}}if(r===null){for(const t of e(this,k))t.recover(i);o.clear()}return r},L=function(i,n){for(const r of e(this,z)){if(!r.isEmpty())continue;const o=x(this,h,U).call(this,n.index(),r.index()),a=e(this,k)[r.index()],s=r.domain();for(const t of o){const p=t.emptySize();if(p===1){if(!x(this,h,N).call(this,i,r,s,a,t))return!1}else if(e(this,M)){if(p===2){if(!x(this,h,q).call(this,i,r,s,a,t))return!1}else if(p===3){if(!x(this,h,H).call(this,i,r,s,a,t))return!1}else if(3<p&&!x(this,h,O).call(this,i,r,s,a,t,p))return!1}}}return!0},U=function(i,n){return i<n?e(this,j)[n][i]:e(this,j)[i][n]},N=function(i,n,r,o,a){for(let s=0,t=r.size();s<t;++s)o.isPruned(s)||(n.assign(r.at(s)),a.degree()<=e(this,b)&&o.prune(s,i));return n.clear(),!o.isEmpty()},q=function(i,n,r,o,a){let s=null;for(const c of a)if(c.isEmpty()&&c!==n){s=c;break}const t=s.domain(),p=e(this,k)[s.index()];i:for(let c=0,u=r.size();c<u;++c)if(!o.isPruned(c)){n.assign(r.at(c));for(let w=0,m=t.size();w<m;++w)if(!p.isPruned(w)&&(s.assign(t.at(w)),e(this,b)<a.degree()))continue i;o.prune(c,i)}return s.clear(),n.clear(),!o.isEmpty()},H=function(i,n,r,o,a){let s=null,t=null;for(const m of a)if(m.isEmpty()&&m!==n)if(s===null)s=m;else{t=m;break}const p=s.domain(),c=t.domain(),u=e(this,k)[s.index()],w=e(this,k)[t.index()];i:for(let m=0,l=r.size();m<l;++m)if(!o.isPruned(m)){n.assign(r.at(m));for(let P=0,_=p.size();P<_;++P)if(!u.isPruned(P)){s.assign(p.at(P));for(let R=0,W=c.size();R<W;++R)if(!w.isPruned(R)&&(t.assign(c.at(R)),e(this,b)<a.degree()))continue i}o.prune(m,i)}return t.clear(),s.clear(),n.clear(),!o.isEmpty()},O=function(i,n,r,o,a,s){const t=new Array(s-1);let p=0;for(const u of a)u.isEmpty()&&u!==n&&(t[p++]=u);const c=new Array(t.length);i:for(let u=0,w=r.size();u<w;++u)if(!o.isPruned(u)){n.assign(r.at(u)),c.fill(0);t:for(;;){let m=!1;for(let l=0;l<t.length;++l){const P=t[l].domain();if(e(this,k)[t[l].index()].isPruned(c[l])){m=!0;break}t[l].assign(P.at(c[l]))}if(!m&&e(this,b)<a.degree())continue i;for(let l=0;l<t.length&&(c[l]+=1,!(c[l]<t[l].domain().size()));++l)if(c[l]=0,l===t.length-1)break t}o.prune(u,i)}for(const u of t)u.clear();return n.clear(),!o.isEmpty()},T=function(i){let n=Number.MAX_VALUE;e(this,E).clear();for(const r of e(this,z)){if(r===i||r.isEmpty())continue;const o=x(this,h,U).call(this,i.index(),r.index());for(const a of o)if(!e(this,E).has(a)){const s=a.degree();0<=s&&s<n&&(n=s),e(this,E).add(a)}}return n};export{ti as FullChecking};
