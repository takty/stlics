var ct=Object.defineProperty;var it=n=>{throw TypeError(n)};var lt=(n,e,t)=>e in n?ct(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var R=(n,e,t)=>lt(n,typeof e!="symbol"?e+"":e,t),Y=(n,e,t)=>e.has(n)||it("Cannot "+t);var s=(n,e,t)=>(Y(n,e,"read from private field"),t?t.call(n):e.get(n)),o=(n,e,t)=>e.has(n)?it("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t),a=(n,e,t,i)=>(Y(n,e,"write to private field"),i?i.call(n,t):e.set(n,t),t),rt=(n,e,t)=>(Y(n,e,"access private method"),t);var Z=(n,e,t,i)=>({set _(r){a(n,e,r,t)},get _(){return s(n,e,i)}});var O,L;class ot{constructor(){o(this,O,-1);o(this,L,"");R(this,"userObject",null)}setIndex(e){a(this,O,e)}setName(e){a(this,L,e)}index(){return s(this,O)}name(){return s(this,L)}}O=new WeakMap,L=new WeakMap;var v,I,C,B,f;const z=class z extends ot{constructor(t,i){super();o(this,I);o(this,C);o(this,B,s(z,v));o(this,f,[]);a(this,I,t),a(this,C,i)}toString(){const t=this.name(),i=t?`(${t})`:"",r=this.isEmpty()?"<empty>":""+this.value();return`x${this.index()}${i} = ${r}`}size(){return s(this,f).length}at(t){return s(this,f).at(t)}has(t){return s(this,f).includes(t)}indexOf(t){return s(this,f).indexOf(t)}neighbors(){const t=[];for(const i of s(this,f))for(const r of i)r!==this&&t.push(r);return t}[Symbol.iterator](){return s(this,f)[Symbol.iterator]()}owner(){return s(this,I)}connect(t){if(s(this,f).includes(t))throw new RangeError;s(this,f).push(t)}disconnect(t){if(!s(this,f).includes(t))throw new RangeError;a(this,f,s(this,f).filter(i=>i!==t))}domain(t){if(t===void 0)return s(this,C);a(this,C,t),this.clear()}assign(t){a(this,B,t)}clear(){this.assign(s(z,v))}value(){return s(this,B)}isEmpty(){return this.value()===s(z,v)}};v=new WeakMap,I=new WeakMap,C=new WeakMap,B=new WeakMap,f=new WeakMap,o(z,v,Number.MIN_VALUE);let H=z;class V{static createRangedDomain(e,t){return new mt(e,t)}static createArbitraryDomain(e){return new ft(e)}random(){return this.at(Math.floor(Math.random()*this.size()))}}var p;class ft extends V{constructor(t){super();o(this,p);a(this,p,[...t])}contains(t){return s(this,p).includes(t)}indexOf(t){return s(this,p).indexOf(t)}size(){return s(this,p).length}at(t){return s(this,p)[t]}[Symbol.iterator](){return s(this,p)[Symbol.iterator]()}}p=new WeakMap;var d,w;class mt extends V{constructor(t,i){super();o(this,d);o(this,w);a(this,d,t|0),a(this,w,i|0)}contains(t){return s(this,d)<=t&&t<=s(this,w)}indexOf(t){return s(this,d)<=t&&t<=s(this,w)?t-s(this,d):-1}size(){return s(this,w)-s(this,d)+1}at(t){return s(this,d)+t}[Symbol.iterator](){let t=s(this,d);const i=s(this,w);return{next(){return t<=i?{value:t++,done:!1}:{value:null,done:!0}}}}}d=new WeakMap,w=new WeakMap;class _ extends ot{constructor(t){super();R(this,"r");R(this,"xs",[]);this.r=t}static create(t,i){return i.length===1?new gt(t,i[0]):i.length===2?new dt(t,i[0],i[1]):i.length===3?new pt(t,i[0],i[1],i[2]):new xt(t,...i)}toString(){const t=this.name(),i=t?`(${t})`:"",r=this.degree(),h=r<0?"UNDEFINED":""+r;return`c${this.index()}${i} = ${h}`}size(){return this.xs.length}at(t){return this.xs.at(t)}has(t){return this.xs.includes(t)}indexOf(t){return this.xs.indexOf(t)}neighbors(){const t=[];for(const i of this.xs)for(const r of i)r!==this&&t.push(r);return t}[Symbol.iterator](){return this.xs[Symbol.iterator]()}relation(){return this.r}}class gt extends _{constructor(e,t){super(e),this.xs=[t]}emptyVariableSize(){return this.xs[0].isEmpty()?1:0}isDefined(){return!this.xs[0].isEmpty()}isSatisfied(){return this.xs[0].isEmpty()?-1:this.r(this.xs[0].value())===1?1:0}degree(){return this.xs[0].isEmpty()?-1:this.r(this.xs[0].value())}}class dt extends _{constructor(e,t,i){super(e),this.xs=[t,i]}emptyVariableSize(){let e=0;return this.xs[0].isEmpty()&&++e,this.xs[1].isEmpty()&&++e,e}isDefined(){return!this.xs[0].isEmpty()&&!this.xs[1].isEmpty()}isSatisfied(){return this.xs[0].isEmpty()||this.xs[1].isEmpty()?-1:this.r(this.xs[0].value(),this.xs[1].value())===1?1:0}degree(){return this.xs[0].isEmpty()||this.xs[1].isEmpty()?-1:this.r(this.xs[0].value(),this.xs[1].value())}}class pt extends _{constructor(e,t,i,r){super(e),this.xs=[t,i,r]}emptyVariableSize(){let e=0;return this.xs[0].isEmpty()&&++e,this.xs[1].isEmpty()&&++e,this.xs[2].isEmpty()&&++e,e}isDefined(){return!this.xs[0].isEmpty()&&!this.xs[1].isEmpty()&&!this.xs[2].isEmpty()}isSatisfied(){return this.xs[0].isEmpty()||this.xs[1].isEmpty()||this.xs[2].isEmpty()?-1:this.r(this.xs[0].value(),this.xs[1].value(),this.xs[2].value())===1?1:0}degree(){return this.xs[0].isEmpty()||this.xs[1].isEmpty()||this.xs[2].isEmpty()?-1:this.r(this.xs[0].value(),this.xs[1].value(),this.xs[2].value())}}var y;class xt extends _{constructor(t,...i){super(t);o(this,y);this.xs=[...i],a(this,y,new Array(this.xs.length))}emptyVariableSize(){let t=0;for(const i of this.xs)t+=i.isEmpty()?1:0;return t}isDefined(){for(const t of this.xs)if(t.isEmpty())return!1;return!0}isSatisfied(){for(let t=0;t<this.xs.length;++t){const i=this.xs[t];if(i.isEmpty())return-1;s(this,y)[t]=i.value()}return this.r(...s(this,y))===1?1:0}degree(){for(let t=0;t<this.xs.length;++t){const i=this.xs[t];if(i.isEmpty())return-1;s(this,y)[t]=i.value()}return this.r(...s(this,y))}}y=new WeakMap;var M,G,c,u;class wt{constructor(){o(this,M,(e,t)=>new H(e,t));o(this,G,(e,t)=>_.create(e,t));o(this,c,[]);o(this,u,[])}setVariableFactory(e){a(this,M,e)}setConstraintFactory(e){a(this,G,e)}addVariable(e){e.setIndex(s(this,c).length),s(this,c).push(e)}createDomain(e,t=null){if(Array.isArray(e))return V.createArbitraryDomain(e);if(t!==null)return V.createRangedDomain(e,t);throw new RangeError}createVariable(e,t=null,i){if(e instanceof H){const r=s(this,M).call(this,this,e.domain());return this.addVariable(r),r.setName(r.name()),r.assign(r.value()),r}else if(e instanceof V){if(t!==null&&!e.contains(t))throw new Error;const r=s(this,M).call(this,this,e);return this.addVariable(r),t!==null&&r.assign(t),i&&r.setName(i),r}throw new RangeError}createConstraint(e,t,i){for(const h of t)if(h.owner()!==this)throw new RangeError;const r=s(this,G).call(this,e,t);r.setIndex(s(this,u).length),s(this,u).push(r);for(const h of t)h.connect(r);return i&&r.setName(i),r}removeConstraint(e){const t=s(this,u).indexOf(e);s(this,u).splice(t,1);for(let i=t;i<s(this,u).length;++i)s(this,u)[i].setIndex(i);for(const i of e)i.disconnect(e)}clearAllVariables(){for(const e of s(this,c))e.clear()}reverseVariables(){s(this,c).reverse();for(let e=0;e<s(this,c).length;++e)s(this,c)[e].setIndex(e)}sortVariables(e){s(this,c).sort(e);for(let t=0;t<s(this,c).length;++t)s(this,c)[t].setIndex(t)}variables(){return s(this,c)}variableSize(){return s(this,c).length}variableAt(e){return s(this,c)[e]}variableOf(e){for(const t of s(this,c))if(t.name()===e)return t;return null}hasVariable(e){return s(this,c).includes(e)}constraints(){return s(this,u)}constraintSize(){return s(this,u).length}constraintAt(e){return s(this,u)[e]}constraintOf(e){for(const t of s(this,u))if(t.name()===e)return t;return null}hasConstraint(e){return s(this,u).includes(e)}constraintsBetween(e,t){const i=[];for(const r of e)r.has(t)&&i.push(r);return i}constraintDensity(){return s(this,u).length/s(this,c).length}emptyVariableSize(){let e=0;for(const t of s(this,c))e+=t.isEmpty()?1:0;return e}hasEmptyDomain(){for(const e of s(this,c))if(e.domain().size()===0)return!0;return!1}degree(){let e=1;for(const t of s(this,u)){const i=t.degree();if(i<0)return i;i<e&&(e=i)}return e}constraintsWithDegree(){const e=[];let t=1;for(const i of s(this,u)){const r=i.degree();r<t?(t=r,e.length=0,e.push(i)):r-t<Number.MIN_VALUE*10&&e.push(i)}return[e,t]}averageDegree(){let e=0;for(const t of s(this,u))e+=t.degree();return e/s(this,u).length}ratio(){return this.satisfiedConstraintSize()/s(this,u).length}satisfiedConstraintSize(){let e=0;for(const t of s(this,u))e+=t.isSatisfied()===1?1:0;return e}violatingConstraintSize(){return s(this,u).length-this.satisfiedConstraintSize()}satisfiedConstraints(){const e=[];for(const t of s(this,u))t.isSatisfied()===1&&e.push(t);return e}violatingConstraints(){const e=[];for(const t of s(this,u))t.isSatisfied()===0&&e.push(t);return e}}M=new WeakMap,G=new WeakMap,c=new WeakMap,u=new WeakMap;var D,$,P,U,F,b,k,X,j,q,W;class yt{constructor(){o(this,D,!0);o(this,$,e=>console.log(e));o(this,P,()=>!1);o(this,U,Number.MAX_SAFE_INTEGER);o(this,F,null);o(this,b,.8);o(this,k,null);o(this,X,0);o(this,j,0);o(this,q,-1);o(this,W,0)}initialize(){a(this,X,s(this,F)===null?Number.MAX_VALUE:Date.now()+s(this,F)),a(this,j,0)}check(e=null){if(e!==null&&s(this,b)!==null&&s(this,b)<=e)return this.outputDebugString("Stop: Current evaluation value is above the target"),!0;if(s(this,U)<Z(this,j)._++)return this.outputDebugString("Stop: Number of iterations has reached the limit"),!1;if(s(this,X)<Date.now())return this.outputDebugString("Stop: Time limit has been reached"),!1;if(e!==null&&s(this,k)!==null)if(e!==-1&&s(this,q)===e){if(s(this,k)<Z(this,W)._++)return this.outputDebugString("Stop: Evaluation value has not changed for a certain number of times"),!1}else a(this,q,e),a(this,W,0);return null}solutionFound(e,t){return s(this,P).call(this,e,t)}outputDebugString(e){s(this,D)&&s(this,$).call(this,e)}isDebugMode(){return s(this,D)}isTargetAssigned(){return s(this,b)!==null}getTarget(){return s(this,b)}setIterationLimit(e=null){a(this,U,e===null?Number.MAX_SAFE_INTEGER:e)}setTimeLimit(e=null){a(this,F,e)}setTarget(e=null){a(this,b,e)}setSameEvaluationLimit(e=null){a(this,k,e)}setListener(e){a(this,P,e)}setDebugMode(e){a(this,D,e)}setDebugOutput(e){a(this,$,e)}}D=new WeakMap,$=new WeakMap,P=new WeakMap,U=new WeakMap,F=new WeakMap,b=new WeakMap,k=new WeakMap,X=new WeakMap,j=new WeakMap,q=new WeakMap,W=new WeakMap;class T{static crispSolverNames(){return["Forward Checking","Max Forward Checking","Local Changes","Breakout","GENET","Crisp SRS3"]}static fuzzySolverNames(){return["Full Checking","Fuzzy Forward Checking","Flexible Local Changes","Fuzzy Breakout","Fuzzy GENET","SRS3","SRS3 PF"]}static async createSolver(e){const t=await T.createCrispSolver(e);if(t)return t;const i=await T.createFuzzySolver(e);return i||null}static async createCrispSolver(e){switch(e.replaceAll(" ","")){case"ForwardChecking":case"forward-checking":const{ForwardChecking:t}=await import("./forward-checking-ZD_9XYl2.js");return new t;case"MaxForwardChecking":case"max-forward-checking":const{MaxForwardChecking:i}=await import("./max-forward-checking-BPXdBN9o.js");return new i;case"LocalChanges":case"local-changes":const{LocalChanges:r}=await import("./local-changes-aNiPEHD6.js");return new r;case"Breakout":case"breakout":const{Breakout:h}=await import("./breakout-CTSOfUzj.js");return new h;case"GENET":case"genet":const{GENET:l}=await import("./genet-CVQc4lOv.js");return new l;case"CrispSRS3":case"crisp-srs3":const{CrispSRS3:S}=await import("./crisp-srs3-BP1Q6C6d.js");return new S}return null}static async createFuzzySolver(e){switch(e.replaceAll(" ","")){case"FullChecking":case"full-checking":const{FullChecking:t}=await import("./full-checking-BPcpIveP.js");return new t;case"FuzzyForwardChecking":case"fuzzy-forward-checking":const{FuzzyForwardChecking:i}=await import("./fuzzy-forward-checking-CeavxP7H.js");return new i;case"FlexibleLocalChanges":case"flexible-local-changes":const{FlexibleLocalChanges:r}=await import("./flexible-local-changes-CPZ598y2.js");return new r;case"FuzzyBreakout":case"fuzzy-breakout":const{FuzzyBreakout:h}=await import("./fuzzy-breakout-6Sj61zHf.js");return new h;case"FuzzyGENET":case"fuzzy-genet":const{FuzzyGENET:l}=await import("./fuzzy-genet-DgRkSyI_.js");return new l;case"SRS3":case"srs3":const{SRS3:S}=await import("./srs3-lzs3UD-T.js");return new S;case"SRS3PF":case"SRS3_PF":case"srs3-pf":{const{SRS3:N}=await import("./srs3-lzs3UD-T.js"),{wrapWithPostStabilizer:A}=await import("./post-stabilizer-fpHCu91c.js");return A(new N)}}return null}}function bt(n,e){const t=nt(n);return t/(t+nt(e))}function nt(n){let e,t,i,r,h;if(1<n){e=Math.sqrt(2*n-1);do do{do{do t=Math.random(),i=2*Math.random()-1;while(1<=t*t+i*i||t===0);i=i/t,t=e*i+n-1}while(t<=0);r=(n-1)*Math.log(t/(n-1))-e*i}while(r<=-50);while((1+i*i)*Math.exp(r)<=Math.random())}else{e=Math.E/(n+Math.E);do Math.random()<e?(t=0,i=1,h=Math.random(),0<h&&(t=Math.exp(Math.log(h)/n),i=Math.exp(-t))):(h=Math.random(),t=1,i=0,0<h&&(t=1-Math.log(h),i=Math.exp((n-1)*Math.log(t))));while(Math.random()>=i)}return t}var J;class St{constructor(){R(this,"_debug",!0);o(this,J,e=>console.log(e))}setDebugMode(e){this._debug=e}setDebugOutput(e){this._debugOutput=e}_debugOutput(e){this._debug&&s(this,J).call(this,e)}}J=new WeakMap;var m,E,x,g,K,ht;class Et extends St{constructor(t,i,r,h=null){super();o(this,K);o(this,m);o(this,E);o(this,x);o(this,g);a(this,m,t),a(this,E,i),a(this,x,r),a(this,g,h??t)}getVariableCount(){return s(this,m)}setVariableCount(t){a(this,m,t)}getDensity(){return s(this,E)}setDensity(t){a(this,E,t)}getAverageTightness(){return s(this,x)}setAverageTightness(t){a(this,x,t)}getDomainSize(){return s(this,g)}setDomainSize(t){a(this,g,t)}createProblem(t){const i=s(this,E)*((s(this,m)*s(this,m)-s(this,m))/2)|0,r=[];for(let h=0;h<s(this,m);++h){const l=t.createVariable(t.createDomain(0,s(this,g)-1),0);r.push(l)}for(;t.constraintSize()<i;){const h=at(s(this,m)),l=at(s(this,m));if(h!==l&&t.constraintsBetween(r[h],r[l]).length===0){const N=rt(this,K,ht).call(this);t.createConstraint((A,Q)=>N[A][Q],[r[h],r[l]])}}return t}}m=new WeakMap,E=new WeakMap,x=new WeakMap,g=new WeakMap,K=new WeakSet,ht=function(){const t=[];for(let i=0;i<s(this,g);++i)t.push(new Array(s(this,g)));for(let i=0;i<s(this,g);++i)for(let r=0;r<s(this,g);++r){const h=s(this,x)===0?Number.MAX_VALUE:(1-s(this,x))/s(this,x);t[i][r]=bt(1,h)}return t};function at(n){return Math.floor(Math.random()*Math.floor(n))}onmessage=async n=>{const{task:e,args:t}=n.data;switch(e){case"create":zt(...t);break;case"solve":vt(...t);break}};let tt=null,et=null,st=!1;function zt(n,e,t){tt=new Et(n,e,t),tt.setDebugOutput(ut),et=tt.createProblem(new wt)}async function vt(n,e,t,i){const r=Date.now(),h=T.fuzzySolverNames()[n],l=new yt;l.setTarget(e===-1?null:e),l.setTimeLimit(t===-1?null:t),l.setDebugOutput(ut),l.setDebugMode(i);const S=await T.createSolver(h);st=i;const N=S.solve(et,l),A=Date.now()-r,Q=et.degree();st=!0,postMessage({result:N,time:A,ev:Q,solver:S.name()})}function ut(n){st&&postMessage({log:n})}export{yt as M,H as V};
