(function(t){t.ng??={},t.ng.common??={},t.ng.common.locales??={};let e=void 0;function c(n){let a=n,u=Math.floor(Math.abs(n)),g=n.toString().replace(/^[^.]*\.?/,"").length;return u===1&&g===0?1:5}t.ng.common.locales.en=["en",[["a","p"],["AM","PM"],e],[["AM","PM"],e,e],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],e,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],e,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm a","h:mm:ss a","h:mm:ss a z","h:mm:ss a zzzz"],["{1}, {0}",e,"{1} 'at' {0}",e],[".",",",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0%","\xA4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",c,[[["mi","n","in the morning","in the afternoon","in the evening","at night"],["midnight","noon","in the morning","in the afternoon","in the evening","at night"],e],[["midnight","noon","morning","afternoon","evening","night"],e,e],["00:00","12:00",["06:00","12:00"],["12:00","18:00"],["18:00","21:00"],["21:00","06:00"]]]]})(globalThis);var ce=globalThis;function te(t){return(ce.__Zone_symbol_prefix||"__zone_symbol__")+t}function Et(){let t=ce.performance;function e(A){t&&t.mark&&t.mark(A)}function c(A,s){t&&t.measure&&t.measure(A,s)}e("Zone");class n{static{this.__symbol__=te}static assertZonePatched(){if(ce.Promise!==O.ZoneAwarePromise)throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")}static get root(){let s=n.current;for(;s.parent;)s=s.parent;return s}static get current(){return b.zone}static get currentTask(){return N}static __load_patch(s,i,o=!1){if(O.hasOwnProperty(s)){let E=ce[te("forceDuplicateZoneCheck")]===!0;if(!o&&E)throw Error("Already loaded patch: "+s)}else if(!ce["__Zone_disable_"+s]){let E="Zone:"+s;e(E),O[s]=i(ce,n,P),c(E,E)}}get parent(){return this._parent}get name(){return this._name}constructor(s,i){this._parent=s,this._name=i?i.name||"unnamed":"<root>",this._properties=i&&i.properties||{},this._zoneDelegate=new u(this,this._parent&&this._parent._zoneDelegate,i)}get(s){let i=this.getZoneWith(s);if(i)return i._properties[s]}getZoneWith(s){let i=this;for(;i;){if(i._properties.hasOwnProperty(s))return i;i=i._parent}return null}fork(s){if(!s)throw new Error("ZoneSpec required!");return this._zoneDelegate.fork(this,s)}wrap(s,i){if(typeof s!="function")throw new Error("Expecting function got: "+s);let o=this._zoneDelegate.intercept(this,s,i),E=this;return function(){return E.runGuarded(o,this,arguments,i)}}run(s,i,o,E){b={parent:b,zone:this};try{return this._zoneDelegate.invoke(this,s,i,o,E)}finally{b=b.parent}}runGuarded(s,i=null,o,E){b={parent:b,zone:this};try{try{return this._zoneDelegate.invoke(this,s,i,o,E)}catch(H){if(this._zoneDelegate.handleError(this,H))throw H}}finally{b=b.parent}}runTask(s,i,o){if(s.zone!=this)throw new Error("A task can only be run in the zone of creation! (Creation: "+(s.zone||J).name+"; Execution: "+this.name+")");let E=s,{type:H,data:{isPeriodic:ee=!1,isRefreshable:L=!1}={}}=s;if(s.state===W&&(H===V||H===m))return;let he=s.state!=j;he&&E._transitionTo(j,d);let ge=N;N=E,b={parent:b,zone:this};try{H==m&&s.data&&!ee&&!L&&(s.cancelFn=void 0);try{return this._zoneDelegate.invokeTask(this,E,i,o)}catch(Q){if(this._zoneDelegate.handleError(this,Q))throw Q}}finally{let Q=s.state;if(Q!==W&&Q!==q)if(H==V||ee||L&&Q===k)he&&E._transitionTo(d,j,k);else{let _e=E._zoneDelegates;this._updateTaskCount(E,-1),he&&E._transitionTo(W,j,W),L&&(E._zoneDelegates=_e)}b=b.parent,N=ge}}scheduleTask(s){if(s.zone&&s.zone!==this){let o=this;for(;o;){if(o===s.zone)throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${s.zone.name}`);o=o.parent}}s._transitionTo(k,W);let i=[];s._zoneDelegates=i,s._zone=this;try{s=this._zoneDelegate.scheduleTask(this,s)}catch(o){throw s._transitionTo(q,k,W),this._zoneDelegate.handleError(this,o),o}return s._zoneDelegates===i&&this._updateTaskCount(s,1),s.state==k&&s._transitionTo(d,k),s}scheduleMicroTask(s,i,o,E){return this.scheduleTask(new g(B,s,i,o,E,void 0))}scheduleMacroTask(s,i,o,E,H){return this.scheduleTask(new g(m,s,i,o,E,H))}scheduleEventTask(s,i,o,E,H){return this.scheduleTask(new g(V,s,i,o,E,H))}cancelTask(s){if(s.zone!=this)throw new Error("A task can only be cancelled in the zone of creation! (Creation: "+(s.zone||J).name+"; Execution: "+this.name+")");if(!(s.state!==d&&s.state!==j)){s._transitionTo($,d,j);try{this._zoneDelegate.cancelTask(this,s)}catch(i){throw s._transitionTo(q,$),this._zoneDelegate.handleError(this,i),i}return this._updateTaskCount(s,-1),s._transitionTo(W,$),s.runCount=-1,s}}_updateTaskCount(s,i){let o=s._zoneDelegates;i==-1&&(s._zoneDelegates=null);for(let E=0;E<o.length;E++)o[E]._updateTaskCount(s.type,i)}}let a={name:"",onHasTask:(A,s,i,o)=>A.hasTask(i,o),onScheduleTask:(A,s,i,o)=>A.scheduleTask(i,o),onInvokeTask:(A,s,i,o,E,H)=>A.invokeTask(i,o,E,H),onCancelTask:(A,s,i,o)=>A.cancelTask(i,o)};class u{get zone(){return this._zone}constructor(s,i,o){this._taskCounts={microTask:0,macroTask:0,eventTask:0},this._zone=s,this._parentDelegate=i,this._forkZS=o&&(o&&o.onFork?o:i._forkZS),this._forkDlgt=o&&(o.onFork?i:i._forkDlgt),this._forkCurrZone=o&&(o.onFork?this._zone:i._forkCurrZone),this._interceptZS=o&&(o.onIntercept?o:i._interceptZS),this._interceptDlgt=o&&(o.onIntercept?i:i._interceptDlgt),this._interceptCurrZone=o&&(o.onIntercept?this._zone:i._interceptCurrZone),this._invokeZS=o&&(o.onInvoke?o:i._invokeZS),this._invokeDlgt=o&&(o.onInvoke?i:i._invokeDlgt),this._invokeCurrZone=o&&(o.onInvoke?this._zone:i._invokeCurrZone),this._handleErrorZS=o&&(o.onHandleError?o:i._handleErrorZS),this._handleErrorDlgt=o&&(o.onHandleError?i:i._handleErrorDlgt),this._handleErrorCurrZone=o&&(o.onHandleError?this._zone:i._handleErrorCurrZone),this._scheduleTaskZS=o&&(o.onScheduleTask?o:i._scheduleTaskZS),this._scheduleTaskDlgt=o&&(o.onScheduleTask?i:i._scheduleTaskDlgt),this._scheduleTaskCurrZone=o&&(o.onScheduleTask?this._zone:i._scheduleTaskCurrZone),this._invokeTaskZS=o&&(o.onInvokeTask?o:i._invokeTaskZS),this._invokeTaskDlgt=o&&(o.onInvokeTask?i:i._invokeTaskDlgt),this._invokeTaskCurrZone=o&&(o.onInvokeTask?this._zone:i._invokeTaskCurrZone),this._cancelTaskZS=o&&(o.onCancelTask?o:i._cancelTaskZS),this._cancelTaskDlgt=o&&(o.onCancelTask?i:i._cancelTaskDlgt),this._cancelTaskCurrZone=o&&(o.onCancelTask?this._zone:i._cancelTaskCurrZone),this._hasTaskZS=null,this._hasTaskDlgt=null,this._hasTaskDlgtOwner=null,this._hasTaskCurrZone=null;let E=o&&o.onHasTask,H=i&&i._hasTaskZS;(E||H)&&(this._hasTaskZS=E?o:a,this._hasTaskDlgt=i,this._hasTaskDlgtOwner=this,this._hasTaskCurrZone=this._zone,o.onScheduleTask||(this._scheduleTaskZS=a,this._scheduleTaskDlgt=i,this._scheduleTaskCurrZone=this._zone),o.onInvokeTask||(this._invokeTaskZS=a,this._invokeTaskDlgt=i,this._invokeTaskCurrZone=this._zone),o.onCancelTask||(this._cancelTaskZS=a,this._cancelTaskDlgt=i,this._cancelTaskCurrZone=this._zone))}fork(s,i){return this._forkZS?this._forkZS.onFork(this._forkDlgt,this.zone,s,i):new n(s,i)}intercept(s,i,o){return this._interceptZS?this._interceptZS.onIntercept(this._interceptDlgt,this._interceptCurrZone,s,i,o):i}invoke(s,i,o,E,H){return this._invokeZS?this._invokeZS.onInvoke(this._invokeDlgt,this._invokeCurrZone,s,i,o,E,H):i.apply(o,E)}handleError(s,i){return this._handleErrorZS?this._handleErrorZS.onHandleError(this._handleErrorDlgt,this._handleErrorCurrZone,s,i):!0}scheduleTask(s,i){let o=i;if(this._scheduleTaskZS)this._hasTaskZS&&o._zoneDelegates.push(this._hasTaskDlgtOwner),o=this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt,this._scheduleTaskCurrZone,s,i),o||(o=i);else if(i.scheduleFn)i.scheduleFn(i);else if(i.type==B)F(i);else throw new Error("Task is missing scheduleFn.");return o}invokeTask(s,i,o,E){return this._invokeTaskZS?this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt,this._invokeTaskCurrZone,s,i,o,E):i.callback.apply(o,E)}cancelTask(s,i){let o;if(this._cancelTaskZS)o=this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt,this._cancelTaskCurrZone,s,i);else{if(!i.cancelFn)throw Error("Task is not cancelable");o=i.cancelFn(i)}return o}hasTask(s,i){try{this._hasTaskZS&&this._hasTaskZS.onHasTask(this._hasTaskDlgt,this._hasTaskCurrZone,s,i)}catch(o){this.handleError(s,o)}}_updateTaskCount(s,i){let o=this._taskCounts,E=o[s],H=o[s]=E+i;if(H<0)throw new Error("More tasks executed then were scheduled.");if(E==0||H==0){let ee={microTask:o.microTask>0,macroTask:o.macroTask>0,eventTask:o.eventTask>0,change:s};this.hasTask(this._zone,ee)}}}class g{constructor(s,i,o,E,H,ee){if(this._zone=null,this.runCount=0,this._zoneDelegates=null,this._state="notScheduled",this.type=s,this.source=i,this.data=E,this.scheduleFn=H,this.cancelFn=ee,!o)throw new Error("callback is not defined");this.callback=o;let L=this;s===V&&E&&E.useG?this.invoke=g.invokeTask:this.invoke=function(){return g.invokeTask.call(ce,L,this,arguments)}}static invokeTask(s,i,o){s||(s=this),K++;try{return s.runCount++,s.zone.runTask(s,i,o)}finally{K==1&&Y(),K--}}get zone(){return this._zone}get state(){return this._state}cancelScheduleRequest(){this._transitionTo(W,k)}_transitionTo(s,i,o){if(this._state===i||this._state===o)this._state=s,s==W&&(this._zoneDelegates=null);else throw new Error(`${this.type} '${this.source}': can not transition to '${s}', expecting state '${i}'${o?" or '"+o+"'":""}, was '${this._state}'.`)}toString(){return this.data&&typeof this.data.handleId<"u"?this.data.handleId.toString():Object.prototype.toString.call(this)}toJSON(){return{type:this.type,state:this.state,source:this.source,zone:this.zone.name,runCount:this.runCount}}}let T=te("setTimeout"),y=te("Promise"),S=te("then"),_=[],w=!1,M;function Z(A){if(M||ce[y]&&(M=ce[y].resolve(0)),M){let s=M[S];s||(s=M.then),s.call(M,A)}else ce[T](A,0)}function F(A){K===0&&_.length===0&&Z(Y),A&&_.push(A)}function Y(){if(!w){for(w=!0;_.length;){let A=_;_=[];for(let s=0;s<A.length;s++){let i=A[s];try{i.zone.runTask(i,null,null)}catch(o){P.onUnhandledError(o)}}}P.microtaskDrainDone(),w=!1}}let J={name:"NO ZONE"},W="notScheduled",k="scheduling",d="scheduled",j="running",$="canceling",q="unknown",B="microTask",m="macroTask",V="eventTask",O={},P={symbol:te,currentZoneFrame:()=>b,onUnhandledError:G,microtaskDrainDone:G,scheduleMicroTask:F,showUncaughtError:()=>!n[te("ignoreConsoleErrorUncaughtError")],patchEventTarget:()=>[],patchOnProperties:G,patchMethod:()=>G,bindArguments:()=>[],patchThen:()=>G,patchMacroTask:()=>G,patchEventPrototype:()=>G,isIEOrEdge:()=>!1,getGlobalObjects:()=>{},ObjectDefineProperty:()=>G,ObjectGetOwnPropertyDescriptor:()=>{},ObjectCreate:()=>{},ArraySlice:()=>[],patchClass:()=>G,wrapWithCurrentZone:()=>G,filterProperties:()=>[],attachOriginToPatched:()=>G,_redefineProperty:()=>G,patchCallbacks:()=>G,nativeScheduleMicroTask:Z},b={parent:null,zone:new n(null,null)},N=null,K=0;function G(){}return c("Zone","Zone"),n}function mt(){let t=globalThis,e=t[te("forceDuplicateZoneCheck")]===!0;if(t.Zone&&(e||typeof t.Zone.__symbol__!="function"))throw new Error("Zone already loaded.");return t.Zone??=Et(),t.Zone}var be=Object.getOwnPropertyDescriptor,xe=Object.defineProperty,Ze=Object.getPrototypeOf,pt=Object.create,yt=Array.prototype.slice,$e="addEventListener",He="removeEventListener",Me=te($e),Ae=te(He),ae="true",le="false",we=te("");function Be(t,e){return Zone.current.wrap(t,e)}function Ue(t,e,c,n,a){return Zone.current.scheduleMacroTask(t,e,c,n,a)}var x=te,Ne=typeof window<"u",ye=Ne?window:void 0,X=Ne&&ye||globalThis,kt="removeAttribute";function ze(t,e){for(let c=t.length-1;c>=0;c--)typeof t[c]=="function"&&(t[c]=Be(t[c],e+"_"+c));return t}function vt(t,e){let c=t.constructor.name;for(let n=0;n<e.length;n++){let a=e[n],u=t[a];if(u){let g=be(t,a);if(!rt(g))continue;t[a]=(T=>{let y=function(){return T.apply(this,ze(arguments,c+"."+a))};return fe(y,T),y})(u)}}}function rt(t){return t?t.writable===!1?!1:!(typeof t.get=="function"&&typeof t.set>"u"):!0}var ot=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope,Oe=!("nw"in X)&&typeof X.process<"u"&&X.process.toString()==="[object process]",Fe=!Oe&&!ot&&!!(Ne&&ye.HTMLElement),st=typeof X.process<"u"&&X.process.toString()==="[object process]"&&!ot&&!!(Ne&&ye.HTMLElement),Se={},bt=x("enable_beforeunload"),Je=function(t){if(t=t||X.event,!t)return;let e=Se[t.type];e||(e=Se[t.type]=x("ON_PROPERTY"+t.type));let c=this||t.target||X,n=c[e],a;if(Fe&&c===ye&&t.type==="error"){let u=t;a=n&&n.call(this,u.message,u.filename,u.lineno,u.colno,u.error),a===!0&&t.preventDefault()}else a=n&&n.apply(this,arguments),t.type==="beforeunload"&&X[bt]&&typeof a=="string"?t.returnValue=a:a!=null&&!a&&t.preventDefault();return a};function Ke(t,e,c){let n=be(t,e);if(!n&&c&&be(c,e)&&(n={enumerable:!0,configurable:!0}),!n||!n.configurable)return;let a=x("on"+e+"patched");if(t.hasOwnProperty(a)&&t[a])return;delete n.writable,delete n.value;let u=n.get,g=n.set,T=e.slice(2),y=Se[T];y||(y=Se[T]=x("ON_PROPERTY"+T)),n.set=function(S){let _=this;if(!_&&t===X&&(_=X),!_)return;typeof _[y]=="function"&&_.removeEventListener(T,Je),g&&g.call(_,null),_[y]=S,typeof S=="function"&&_.addEventListener(T,Je,!1)},n.get=function(){let S=this;if(!S&&t===X&&(S=X),!S)return null;let _=S[y];if(_)return _;if(u){let w=u.call(this);if(w)return n.set.call(this,w),typeof S[kt]=="function"&&S.removeAttribute(e),w}return null},xe(t,e,n),t[a]=!0}function it(t,e,c){if(e)for(let n=0;n<e.length;n++)Ke(t,"on"+e[n],c);else{let n=[];for(let a in t)a.slice(0,2)=="on"&&n.push(a);for(let a=0;a<n.length;a++)Ke(t,n[a],c)}}var oe=x("originalInstance");function ve(t){let e=X[t];if(!e)return;X[x(t)]=e,X[t]=function(){let a=ze(arguments,t);switch(a.length){case 0:this[oe]=new e;break;case 1:this[oe]=new e(a[0]);break;case 2:this[oe]=new e(a[0],a[1]);break;case 3:this[oe]=new e(a[0],a[1],a[2]);break;case 4:this[oe]=new e(a[0],a[1],a[2],a[3]);break;default:throw new Error("Arg list too long.")}},fe(X[t],e);let c=new e(function(){}),n;for(n in c)t==="XMLHttpRequest"&&n==="responseBlob"||function(a){typeof c[a]=="function"?X[t].prototype[a]=function(){return this[oe][a].apply(this[oe],arguments)}:xe(X[t].prototype,a,{set:function(u){typeof u=="function"?(this[oe][a]=Be(u,t+"."+a),fe(this[oe][a],u)):this[oe][a]=u},get:function(){return this[oe][a]}})}(n);for(n in e)n!=="prototype"&&e.hasOwnProperty(n)&&(X[t][n]=e[n])}function ue(t,e,c){let n=t;for(;n&&!n.hasOwnProperty(e);)n=Ze(n);!n&&t[e]&&(n=t);let a=x(e),u=null;if(n&&(!(u=n[a])||!n.hasOwnProperty(a))){u=n[a]=n[e];let g=n&&be(n,e);if(rt(g)){let T=c(u,a,e);n[e]=function(){return T(this,arguments)},fe(n[e],u)}}return u}function wt(t,e,c){let n=null;function a(u){let g=u.data;return g.args[g.cbIdx]=function(){u.invoke.apply(this,arguments)},n.apply(g.target,g.args),u}n=ue(t,e,u=>function(g,T){let y=c(g,T);return y.cbIdx>=0&&typeof T[y.cbIdx]=="function"?Ue(y.name,T[y.cbIdx],y,a):u.apply(g,T)})}function fe(t,e){t[x("OriginalDelegate")]=e}var Qe=!1,Le=!1;function Pt(){try{let t=ye.navigator.userAgent;if(t.indexOf("MSIE ")!==-1||t.indexOf("Trident/")!==-1)return!0}catch{}return!1}function Rt(){if(Qe)return Le;Qe=!0;try{let t=ye.navigator.userAgent;(t.indexOf("MSIE ")!==-1||t.indexOf("Trident/")!==-1||t.indexOf("Edge/")!==-1)&&(Le=!0)}catch{}return Le}function et(t){return typeof t=="function"}function tt(t){return typeof t=="number"}var pe=!1;if(typeof window<"u")try{let t=Object.defineProperty({},"passive",{get:function(){pe=!0}});window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch{pe=!1}var St={useG:!0},ne={},ct={},at=new RegExp("^"+we+"(\\w+)(true|false)$"),lt=x("propagationStopped");function ut(t,e){let c=(e?e(t):t)+le,n=(e?e(t):t)+ae,a=we+c,u=we+n;ne[t]={},ne[t][le]=a,ne[t][ae]=u}function Nt(t,e,c,n){let a=n&&n.add||$e,u=n&&n.rm||He,g=n&&n.listeners||"eventListeners",T=n&&n.rmAll||"removeAllListeners",y=x(a),S="."+a+":",_="prependListener",w="."+_+":",M=function(k,d,j){if(k.isRemoved)return;let $=k.callback;typeof $=="object"&&$.handleEvent&&(k.callback=m=>$.handleEvent(m),k.originalDelegate=$);let q;try{k.invoke(k,d,[j])}catch(m){q=m}let B=k.options;if(B&&typeof B=="object"&&B.once){let m=k.originalDelegate?k.originalDelegate:k.callback;d[u].call(d,j.type,m,B)}return q};function Z(k,d,j){if(d=d||t.event,!d)return;let $=k||d.target||t,q=$[ne[d.type][j?ae:le]];if(q){let B=[];if(q.length===1){let m=M(q[0],$,d);m&&B.push(m)}else{let m=q.slice();for(let V=0;V<m.length&&!(d&&d[lt]===!0);V++){let O=M(m[V],$,d);O&&B.push(O)}}if(B.length===1)throw B[0];for(let m=0;m<B.length;m++){let V=B[m];e.nativeScheduleMicroTask(()=>{throw V})}}}let F=function(k){return Z(this,k,!1)},Y=function(k){return Z(this,k,!0)};function J(k,d){if(!k)return!1;let j=!0;d&&d.useG!==void 0&&(j=d.useG);let $=d&&d.vh,q=!0;d&&d.chkDup!==void 0&&(q=d.chkDup);let B=!1;d&&d.rt!==void 0&&(B=d.rt);let m=k;for(;m&&!m.hasOwnProperty(a);)m=Ze(m);if(!m&&k[a]&&(m=k),!m||m[y])return!1;let V=d&&d.eventNameToString,O={},P=m[y]=m[a],b=m[x(u)]=m[u],N=m[x(g)]=m[g],K=m[x(T)]=m[T],G;d&&d.prepend&&(G=m[x(d.prepend)]=m[d.prepend]);function A(r,f){return!pe&&typeof r=="object"&&r?!!r.capture:!pe||!f?r:typeof r=="boolean"?{capture:r,passive:!0}:r?typeof r=="object"&&r.passive!==!1?{...r,passive:!0}:r:{passive:!0}}let s=function(r){if(!O.isExisting)return P.call(O.target,O.eventName,O.capture?Y:F,O.options)},i=function(r){if(!r.isRemoved){let f=ne[r.eventName],v;f&&(v=f[r.capture?ae:le]);let R=v&&r.target[v];if(R){for(let p=0;p<R.length;p++)if(R[p]===r){R.splice(p,1),r.isRemoved=!0,r.removeAbortListener&&(r.removeAbortListener(),r.removeAbortListener=null),R.length===0&&(r.allRemoved=!0,r.target[v]=null);break}}}if(r.allRemoved)return b.call(r.target,r.eventName,r.capture?Y:F,r.options)},o=function(r){return P.call(O.target,O.eventName,r.invoke,O.options)},E=function(r){return G.call(O.target,O.eventName,r.invoke,O.options)},H=function(r){return b.call(r.target,r.eventName,r.invoke,r.options)},ee=j?s:o,L=j?i:H,he=function(r,f){let v=typeof f;return v==="function"&&r.callback===f||v==="object"&&r.originalDelegate===f},ge=d&&d.diff?d.diff:he,Q=Zone[x("UNPATCHED_EVENTS")],_e=t[x("PASSIVE_EVENTS")];function h(r){if(typeof r=="object"&&r!==null){let f={...r};return r.signal&&(f.signal=r.signal),f}return r}let l=function(r,f,v,R,p=!1,D=!1){return function(){let C=this||t,I=arguments[0];d&&d.transferEventName&&(I=d.transferEventName(I));let U=arguments[1];if(!U)return r.apply(this,arguments);if(Oe&&I==="uncaughtException")return r.apply(this,arguments);let z=!1;if(typeof U!="function"){if(!U.handleEvent)return r.apply(this,arguments);z=!0}if($&&!$(r,U,C,arguments))return;let de=pe&&!!_e&&_e.indexOf(I)!==-1,se=h(A(arguments[2],de)),Te=se?.signal;if(Te?.aborted)return;if(Q){for(let ie=0;ie<Q.length;ie++)if(I===Q[ie])return de?r.call(C,I,U,se):r.apply(this,arguments)}let Ce=se?typeof se=="boolean"?!0:se.capture:!1,Ge=se&&typeof se=="object"?se.once:!1,Tt=Zone.current,Ie=ne[I];Ie||(ut(I,V),Ie=ne[I]);let We=Ie[Ce?ae:le],Ee=C[We],qe=!1;if(Ee){if(qe=!0,q){for(let ie=0;ie<Ee.length;ie++)if(ge(Ee[ie],U))return}}else Ee=C[We]=[];let Pe,Xe=C.constructor.name,Ye=ct[Xe];Ye&&(Pe=Ye[I]),Pe||(Pe=Xe+f+(V?V(I):I)),O.options=se,Ge&&(O.options.once=!1),O.target=C,O.capture=Ce,O.eventName=I,O.isExisting=qe;let ke=j?St:void 0;ke&&(ke.taskData=O),Te&&(O.options.signal=void 0);let re=Tt.scheduleEventTask(Pe,U,ke,v,R);if(Te){O.options.signal=Te;let ie=()=>re.zone.cancelTask(re);r.call(Te,"abort",ie,{once:!0}),re.removeAbortListener=()=>Te.removeEventListener("abort",ie)}if(O.target=null,ke&&(ke.taskData=null),Ge&&(O.options.once=!0),!pe&&typeof re.options=="boolean"||(re.options=se),re.target=C,re.capture=Ce,re.eventName=I,z&&(re.originalDelegate=U),D?Ee.unshift(re):Ee.push(re),p)return C}};return m[a]=l(P,S,ee,L,B),G&&(m[_]=l(G,w,E,L,B,!0)),m[u]=function(){let r=this||t,f=arguments[0];d&&d.transferEventName&&(f=d.transferEventName(f));let v=arguments[2],R=v?typeof v=="boolean"?!0:v.capture:!1,p=arguments[1];if(!p)return b.apply(this,arguments);if($&&!$(b,p,r,arguments))return;let D=ne[f],C;D&&(C=D[R?ae:le]);let I=C&&r[C];if(I)for(let U=0;U<I.length;U++){let z=I[U];if(ge(z,p)){if(I.splice(U,1),z.isRemoved=!0,I.length===0&&(z.allRemoved=!0,r[C]=null,!R&&typeof f=="string")){let de=we+"ON_PROPERTY"+f;r[de]=null}return z.zone.cancelTask(z),B?r:void 0}}return b.apply(this,arguments)},m[g]=function(){let r=this||t,f=arguments[0];d&&d.transferEventName&&(f=d.transferEventName(f));let v=[],R=ft(r,V?V(f):f);for(let p=0;p<R.length;p++){let D=R[p],C=D.originalDelegate?D.originalDelegate:D.callback;v.push(C)}return v},m[T]=function(){let r=this||t,f=arguments[0];if(f){d&&d.transferEventName&&(f=d.transferEventName(f));let v=ne[f];if(v){let R=v[le],p=v[ae],D=r[R],C=r[p];if(D){let I=D.slice();for(let U=0;U<I.length;U++){let z=I[U],de=z.originalDelegate?z.originalDelegate:z.callback;this[u].call(this,f,de,z.options)}}if(C){let I=C.slice();for(let U=0;U<I.length;U++){let z=I[U],de=z.originalDelegate?z.originalDelegate:z.callback;this[u].call(this,f,de,z.options)}}}}else{let v=Object.keys(r);for(let R=0;R<v.length;R++){let p=v[R],D=at.exec(p),C=D&&D[1];C&&C!=="removeListener"&&this[T].call(this,C)}this[T].call(this,"removeListener")}if(B)return this},fe(m[a],P),fe(m[u],b),K&&fe(m[T],K),N&&fe(m[g],N),!0}let W=[];for(let k=0;k<c.length;k++)W[k]=J(c[k],n);return W}function ft(t,e){if(!e){let u=[];for(let g in t){let T=at.exec(g),y=T&&T[1];if(y&&(!e||y===e)){let S=t[g];if(S)for(let _=0;_<S.length;_++)u.push(S[_])}}return u}let c=ne[e];c||(ut(e),c=ne[e]);let n=t[c[le]],a=t[c[ae]];return n?a?n.concat(a):n.slice():a?a.slice():[]}function Ot(t,e){let c=t.Event;c&&c.prototype&&e.patchMethod(c.prototype,"stopImmediatePropagation",n=>function(a,u){a[lt]=!0,n&&n.apply(a,u)})}function Dt(t,e){e.patchMethod(t,"queueMicrotask",c=>function(n,a){Zone.current.scheduleMicroTask("queueMicrotask",a[0])})}var Re=x("zoneTask");function me(t,e,c,n){let a=null,u=null;e+=n,c+=n;let g={};function T(S){let _=S.data;_.args[0]=function(){return S.invoke.apply(this,arguments)};let w=a.apply(t,_.args);return tt(w)?_.handleId=w:(_.handle=w,_.isRefreshable=et(w.refresh)),S}function y(S){let{handle:_,handleId:w}=S.data;return u.call(t,_??w)}a=ue(t,e,S=>function(_,w){if(et(w[0])){let M={isRefreshable:!1,isPeriodic:n==="Interval",delay:n==="Timeout"||n==="Interval"?w[1]||0:void 0,args:w},Z=w[0];w[0]=function(){try{return Z.apply(this,arguments)}finally{let{handle:j,handleId:$,isPeriodic:q,isRefreshable:B}=M;!q&&!B&&($?delete g[$]:j&&(j[Re]=null))}};let F=Ue(e,w[0],M,T,y);if(!F)return F;let{handleId:Y,handle:J,isRefreshable:W,isPeriodic:k}=F.data;if(Y)g[Y]=F;else if(J&&(J[Re]=F,W&&!k)){let d=J.refresh;J.refresh=function(){let{zone:j,state:$}=F;return $==="notScheduled"?(F._state="scheduled",j._updateTaskCount(F,1)):$==="running"&&(F._state="scheduling"),d.call(this)}}return J??Y??F}else return S.apply(t,w)}),u=ue(t,c,S=>function(_,w){let M=w[0],Z;tt(M)?(Z=g[M],delete g[M]):(Z=M?.[Re],Z?M[Re]=null:Z=M),Z?.type?Z.cancelFn&&Z.zone.cancelTask(Z):S.apply(t,w)})}function Ct(t,e){let{isBrowser:c,isMix:n}=e.getGlobalObjects();if(!c&&!n||!t.customElements||!("customElements"in t))return;let a=["connectedCallback","disconnectedCallback","adoptedCallback","attributeChangedCallback","formAssociatedCallback","formDisabledCallback","formResetCallback","formStateRestoreCallback"];e.patchCallbacks(e,t.customElements,"customElements","define",a)}function It(t,e){if(Zone[e.symbol("patchEventTarget")])return;let{eventNames:c,zoneSymbolEventNames:n,TRUE_STR:a,FALSE_STR:u,ZONE_SYMBOL_PREFIX:g}=e.getGlobalObjects();for(let y=0;y<c.length;y++){let S=c[y],_=S+u,w=S+a,M=g+_,Z=g+w;n[S]={},n[S][u]=M,n[S][a]=Z}let T=t.EventTarget;if(!(!T||!T.prototype))return e.patchEventTarget(t,e,[T&&T.prototype]),!0}function Mt(t,e){e.patchEventPrototype(t,e)}function ht(t,e,c){if(!c||c.length===0)return e;let n=c.filter(u=>u.target===t);if(!n||n.length===0)return e;let a=n[0].ignoreProperties;return e.filter(u=>a.indexOf(u)===-1)}function nt(t,e,c,n){if(!t)return;let a=ht(t,e,c);it(t,a,n)}function je(t){return Object.getOwnPropertyNames(t).filter(e=>e.startsWith("on")&&e.length>2).map(e=>e.substring(2))}function At(t,e){if(Oe&&!st||Zone[t.symbol("patchEvents")])return;let c=e.__Zone_ignore_on_properties,n=[];if(Fe){let a=window;n=n.concat(["Document","SVGElement","Element","HTMLElement","HTMLBodyElement","HTMLMediaElement","HTMLFrameSetElement","HTMLFrameElement","HTMLIFrameElement","HTMLMarqueeElement","Worker"]);let u=Pt()?[{target:a,ignoreProperties:["error"]}]:[];nt(a,je(a),c&&c.concat(u),Ze(a))}n=n.concat(["XMLHttpRequest","XMLHttpRequestEventTarget","IDBIndex","IDBRequest","IDBOpenDBRequest","IDBDatabase","IDBTransaction","IDBCursor","WebSocket"]);for(let a=0;a<n.length;a++){let u=e[n[a]];u&&u.prototype&&nt(u.prototype,je(u.prototype),c)}}function Lt(t){t.__load_patch("legacy",e=>{let c=e[t.__symbol__("legacyPatch")];c&&c()}),t.__load_patch("timers",e=>{let c="set",n="clear";me(e,c,n,"Timeout"),me(e,c,n,"Interval"),me(e,c,n,"Immediate")}),t.__load_patch("requestAnimationFrame",e=>{me(e,"request","cancel","AnimationFrame"),me(e,"mozRequest","mozCancel","AnimationFrame"),me(e,"webkitRequest","webkitCancel","AnimationFrame")}),t.__load_patch("blocking",(e,c)=>{let n=["alert","prompt","confirm"];for(let a=0;a<n.length;a++){let u=n[a];ue(e,u,(g,T,y)=>function(S,_){return c.current.run(g,e,_,y)})}}),t.__load_patch("EventTarget",(e,c,n)=>{Mt(e,n),It(e,n);let a=e.XMLHttpRequestEventTarget;a&&a.prototype&&n.patchEventTarget(e,n,[a.prototype])}),t.__load_patch("MutationObserver",(e,c,n)=>{ve("MutationObserver"),ve("WebKitMutationObserver")}),t.__load_patch("IntersectionObserver",(e,c,n)=>{ve("IntersectionObserver")}),t.__load_patch("FileReader",(e,c,n)=>{ve("FileReader")}),t.__load_patch("on_property",(e,c,n)=>{At(n,e)}),t.__load_patch("customElements",(e,c,n)=>{Ct(e,n)}),t.__load_patch("XHR",(e,c)=>{S(e);let n=x("xhrTask"),a=x("xhrSync"),u=x("xhrListener"),g=x("xhrScheduled"),T=x("xhrURL"),y=x("xhrErrorBeforeScheduled");function S(_){let w=_.XMLHttpRequest;if(!w)return;let M=w.prototype;function Z(P){return P[n]}let F=M[Me],Y=M[Ae];if(!F){let P=_.XMLHttpRequestEventTarget;if(P){let b=P.prototype;F=b[Me],Y=b[Ae]}}let J="readystatechange",W="scheduled";function k(P){let b=P.data,N=b.target;N[g]=!1,N[y]=!1;let K=N[u];F||(F=N[Me],Y=N[Ae]),K&&Y.call(N,J,K);let G=N[u]=()=>{if(N.readyState===N.DONE)if(!b.aborted&&N[g]&&P.state===W){let s=N[c.__symbol__("loadfalse")];if(N.status!==0&&s&&s.length>0){let i=P.invoke;P.invoke=function(){let o=N[c.__symbol__("loadfalse")];for(let E=0;E<o.length;E++)o[E]===P&&o.splice(E,1);!b.aborted&&P.state===W&&i.call(P)},s.push(P)}else P.invoke()}else!b.aborted&&N[g]===!1&&(N[y]=!0)};return F.call(N,J,G),N[n]||(N[n]=P),V.apply(N,b.args),N[g]=!0,P}function d(){}function j(P){let b=P.data;return b.aborted=!0,O.apply(b.target,b.args)}let $=ue(M,"open",()=>function(P,b){return P[a]=b[2]==!1,P[T]=b[1],$.apply(P,b)}),q="XMLHttpRequest.send",B=x("fetchTaskAborting"),m=x("fetchTaskScheduling"),V=ue(M,"send",()=>function(P,b){if(c.current[m]===!0||P[a])return V.apply(P,b);{let N={target:P,url:P[T],isPeriodic:!1,args:b,aborted:!1},K=Ue(q,d,N,k,j);P&&P[y]===!0&&!N.aborted&&K.state===W&&K.invoke()}}),O=ue(M,"abort",()=>function(P,b){let N=Z(P);if(N&&typeof N.type=="string"){if(N.cancelFn==null||N.data&&N.data.aborted)return;N.zone.cancelTask(N)}else if(c.current[B]===!0)return O.apply(P,b)})}}),t.__load_patch("geolocation",e=>{e.navigator&&e.navigator.geolocation&&vt(e.navigator.geolocation,["getCurrentPosition","watchPosition"])}),t.__load_patch("PromiseRejectionEvent",(e,c)=>{function n(a){return function(u){ft(e,a).forEach(T=>{let y=e.PromiseRejectionEvent;if(y){let S=new y(a,{promise:u.promise,reason:u.rejection});T.invoke(S)}})}}e.PromiseRejectionEvent&&(c[x("unhandledPromiseRejectionHandler")]=n("unhandledrejection"),c[x("rejectionHandledHandler")]=n("rejectionhandled"))}),t.__load_patch("queueMicrotask",(e,c,n)=>{Dt(e,n)})}function jt(t){t.__load_patch("ZoneAwarePromise",(e,c,n)=>{let a=Object.getOwnPropertyDescriptor,u=Object.defineProperty;function g(h){if(h&&h.toString===Object.prototype.toString){let l=h.constructor&&h.constructor.name;return(l||"")+": "+JSON.stringify(h)}return h?h.toString():Object.prototype.toString.call(h)}let T=n.symbol,y=[],S=e[T("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")]!==!1,_=T("Promise"),w=T("then"),M="__creationTrace__";n.onUnhandledError=h=>{if(n.showUncaughtError()){let l=h&&h.rejection;l?console.error("Unhandled Promise rejection:",l instanceof Error?l.message:l,"; Zone:",h.zone.name,"; Task:",h.task&&h.task.source,"; Value:",l,l instanceof Error?l.stack:void 0):console.error(h)}},n.microtaskDrainDone=()=>{for(;y.length;){let h=y.shift();try{h.zone.runGuarded(()=>{throw h.throwOriginal?h.rejection:h})}catch(l){F(l)}}};let Z=T("unhandledPromiseRejectionHandler");function F(h){n.onUnhandledError(h);try{let l=c[Z];typeof l=="function"&&l.call(this,h)}catch{}}function Y(h){return h&&h.then}function J(h){return h}function W(h){return L.reject(h)}let k=T("state"),d=T("value"),j=T("finally"),$=T("parentPromiseValue"),q=T("parentPromiseState"),B="Promise.then",m=null,V=!0,O=!1,P=0;function b(h,l){return r=>{try{A(h,l,r)}catch(f){A(h,!1,f)}}}let N=function(){let h=!1;return function(r){return function(){h||(h=!0,r.apply(null,arguments))}}},K="Promise resolved with itself",G=T("currentTaskTrace");function A(h,l,r){let f=N();if(h===r)throw new TypeError(K);if(h[k]===m){let v=null;try{(typeof r=="object"||typeof r=="function")&&(v=r&&r.then)}catch(R){return f(()=>{A(h,!1,R)})(),h}if(l!==O&&r instanceof L&&r.hasOwnProperty(k)&&r.hasOwnProperty(d)&&r[k]!==m)i(r),A(h,r[k],r[d]);else if(l!==O&&typeof v=="function")try{v.call(r,f(b(h,l)),f(b(h,!1)))}catch(R){f(()=>{A(h,!1,R)})()}else{h[k]=l;let R=h[d];if(h[d]=r,h[j]===j&&l===V&&(h[k]=h[q],h[d]=h[$]),l===O&&r instanceof Error){let p=c.currentTask&&c.currentTask.data&&c.currentTask.data[M];p&&u(r,G,{configurable:!0,enumerable:!1,writable:!0,value:p})}for(let p=0;p<R.length;)o(h,R[p++],R[p++],R[p++],R[p++]);if(R.length==0&&l==O){h[k]=P;let p=r;try{throw new Error("Uncaught (in promise): "+g(r)+(r&&r.stack?`
`+r.stack:""))}catch(D){p=D}S&&(p.throwOriginal=!0),p.rejection=r,p.promise=h,p.zone=c.current,p.task=c.currentTask,y.push(p),n.scheduleMicroTask()}}}return h}let s=T("rejectionHandledHandler");function i(h){if(h[k]===P){try{let l=c[s];l&&typeof l=="function"&&l.call(this,{rejection:h[d],promise:h})}catch{}h[k]=O;for(let l=0;l<y.length;l++)h===y[l].promise&&y.splice(l,1)}}function o(h,l,r,f,v){i(h);let R=h[k],p=R?typeof f=="function"?f:J:typeof v=="function"?v:W;l.scheduleMicroTask(B,()=>{try{let D=h[d],C=!!r&&j===r[j];C&&(r[$]=D,r[q]=R);let I=l.run(p,void 0,C&&p!==W&&p!==J?[]:[D]);A(r,!0,I)}catch(D){A(r,!1,D)}},r)}let E="function ZoneAwarePromise() { [native code] }",H=function(){},ee=e.AggregateError;class L{static toString(){return E}static resolve(l){return l instanceof L?l:A(new this(null),V,l)}static reject(l){return A(new this(null),O,l)}static withResolvers(){let l={};return l.promise=new L((r,f)=>{l.resolve=r,l.reject=f}),l}static any(l){if(!l||typeof l[Symbol.iterator]!="function")return Promise.reject(new ee([],"All promises were rejected"));let r=[],f=0;try{for(let p of l)f++,r.push(L.resolve(p))}catch{return Promise.reject(new ee([],"All promises were rejected"))}if(f===0)return Promise.reject(new ee([],"All promises were rejected"));let v=!1,R=[];return new L((p,D)=>{for(let C=0;C<r.length;C++)r[C].then(I=>{v||(v=!0,p(I))},I=>{R.push(I),f--,f===0&&(v=!0,D(new ee(R,"All promises were rejected")))})})}static race(l){let r,f,v=new this((D,C)=>{r=D,f=C});function R(D){r(D)}function p(D){f(D)}for(let D of l)Y(D)||(D=this.resolve(D)),D.then(R,p);return v}static all(l){return L.allWithCallback(l)}static allSettled(l){return(this&&this.prototype instanceof L?this:L).allWithCallback(l,{thenCallback:f=>({status:"fulfilled",value:f}),errorCallback:f=>({status:"rejected",reason:f})})}static allWithCallback(l,r){let f,v,R=new this((I,U)=>{f=I,v=U}),p=2,D=0,C=[];for(let I of l){Y(I)||(I=this.resolve(I));let U=D;try{I.then(z=>{C[U]=r?r.thenCallback(z):z,p--,p===0&&f(C)},z=>{r?(C[U]=r.errorCallback(z),p--,p===0&&f(C)):v(z)})}catch(z){v(z)}p++,D++}return p-=2,p===0&&f(C),R}constructor(l){let r=this;if(!(r instanceof L))throw new Error("Must be an instanceof Promise.");r[k]=m,r[d]=[];try{let f=N();l&&l(f(b(r,V)),f(b(r,O)))}catch(f){A(r,!1,f)}}get[Symbol.toStringTag](){return"Promise"}get[Symbol.species](){return L}then(l,r){let f=this.constructor?.[Symbol.species];(!f||typeof f!="function")&&(f=this.constructor||L);let v=new f(H),R=c.current;return this[k]==m?this[d].push(R,v,l,r):o(this,R,v,l,r),v}catch(l){return this.then(null,l)}finally(l){let r=this.constructor?.[Symbol.species];(!r||typeof r!="function")&&(r=L);let f=new r(H);f[j]=j;let v=c.current;return this[k]==m?this[d].push(v,f,l,l):o(this,v,f,l,l),f}}L.resolve=L.resolve,L.reject=L.reject,L.race=L.race,L.all=L.all;let he=e[_]=e.Promise;e.Promise=L;let ge=T("thenPatched");function Q(h){let l=h.prototype,r=a(l,"then");if(r&&(r.writable===!1||!r.configurable))return;let f=l.then;l[w]=f,h.prototype.then=function(v,R){return new L((D,C)=>{f.call(this,D,C)}).then(v,R)},h[ge]=!0}n.patchThen=Q;function _e(h){return function(l,r){let f=h.apply(l,r);if(f instanceof L)return f;let v=f.constructor;return v[ge]||Q(v),f}}return he&&(Q(he),ue(e,"fetch",h=>_e(h))),Promise[c.__symbol__("uncaughtPromiseErrors")]=y,L})}function xt(t){t.__load_patch("toString",e=>{let c=Function.prototype.toString,n=x("OriginalDelegate"),a=x("Promise"),u=x("Error"),g=function(){if(typeof this=="function"){let _=this[n];if(_)return typeof _=="function"?c.call(_):Object.prototype.toString.call(_);if(this===Promise){let w=e[a];if(w)return c.call(w)}if(this===Error){let w=e[u];if(w)return c.call(w)}}return c.call(this)};g[n]=c,Function.prototype.toString=g;let T=Object.prototype.toString,y="[object Promise]";Object.prototype.toString=function(){return typeof Promise=="function"&&this instanceof Promise?y:T.call(this)}})}function Zt(t,e,c,n,a){let u=Zone.__symbol__(n);if(e[u])return;let g=e[u]=e[n];e[n]=function(T,y,S){return y&&y.prototype&&a.forEach(function(_){let w=`${c}.${n}::`+_,M=y.prototype;try{if(M.hasOwnProperty(_)){let Z=t.ObjectGetOwnPropertyDescriptor(M,_);Z&&Z.value?(Z.value=t.wrapWithCurrentZone(Z.value,w),t._redefineProperty(y.prototype,_,Z)):M[_]&&(M[_]=t.wrapWithCurrentZone(M[_],w))}else M[_]&&(M[_]=t.wrapWithCurrentZone(M[_],w))}catch{}}),g.call(e,T,y,S)},t.attachOriginToPatched(e[n],g)}function $t(t){t.__load_patch("util",(e,c,n)=>{let a=je(e);n.patchOnProperties=it,n.patchMethod=ue,n.bindArguments=ze,n.patchMacroTask=wt;let u=c.__symbol__("BLACK_LISTED_EVENTS"),g=c.__symbol__("UNPATCHED_EVENTS");e[g]&&(e[u]=e[g]),e[u]&&(c[u]=c[g]=e[u]),n.patchEventPrototype=Ot,n.patchEventTarget=Nt,n.isIEOrEdge=Rt,n.ObjectDefineProperty=xe,n.ObjectGetOwnPropertyDescriptor=be,n.ObjectCreate=pt,n.ArraySlice=yt,n.patchClass=ve,n.wrapWithCurrentZone=Be,n.filterProperties=ht,n.attachOriginToPatched=fe,n._redefineProperty=Object.defineProperty,n.patchCallbacks=Zt,n.getGlobalObjects=()=>({globalSources:ct,zoneSymbolEventNames:ne,eventNames:a,isBrowser:Fe,isMix:st,isNode:Oe,TRUE_STR:ae,FALSE_STR:le,ZONE_SYMBOL_PREFIX:we,ADD_EVENT_LISTENER_STR:$e,REMOVE_EVENT_LISTENER_STR:He})})}function Ht(t){jt(t),xt(t),$t(t)}var dt=mt();Ht(dt);Lt(dt);var Bt=":";var Ve=class{visitText(e,c){return e.value}visitContainer(e,c){return`[${e.children.map(n=>n.visit(this)).join(", ")}]`}visitIcu(e,c){let n=Object.keys(e.cases).map(a=>`${a} {${e.cases[a].visit(this)}}`);return`{${e.expression}, ${e.type}, ${n.join(", ")}}`}visitTagPlaceholder(e,c){return e.isVoid?`<ph tag name="${e.startName}"/>`:`<ph tag name="${e.startName}">${e.children.map(n=>n.visit(this)).join(", ")}</ph name="${e.closeName}">`}visitPlaceholder(e,c){return e.value?`<ph name="${e.name}">${e.value}</ph>`:`<ph name="${e.name}"/>`}visitIcuPlaceholder(e,c){return`<ph icu name="${e.name}">${e.value.visit(this)}</ph>`}visitBlockPlaceholder(e,c){return`<ph block name="${e.startName}">${e.children.map(n=>n.visit(this)).join(", ")}</ph name="${e.closeName}">`}},Ft=new Ve;var gt;(function(t){t[t.Little=0]="Little",t[t.Big=1]="Big"})(gt||(gt={}));function Ut(t,e){for(let c=1,n=1;c<t.length;c++,n++)if(e[n]==="\\")n++;else if(t[c]===Bt)return c;throw new Error(`Unterminated $localize metadata block in "${e}".`)}var De=function(t,...e){if(De.translate){let n=De.translate(t,e);t=n[0],e=n[1]}let c=_t(t[0],t.raw[0]);for(let n=1;n<t.length;n++)c+=e[n-1]+_t(t[n],t.raw[n]);return c},zt=":";function _t(t,e){return e.charAt(0)===zt?t.substring(Ut(t,e)+1):t}globalThis.$localize=De;(globalThis.$localize??={}).locale="en-US";
