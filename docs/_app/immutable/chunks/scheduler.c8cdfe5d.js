var W=Object.defineProperty;var O=(t,e,n)=>e in t?W(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var f=(t,e,n)=>(O(t,typeof e!="symbol"?e+"":e,n),n);function G(){}function F(t,e){for(const n in e)t[n]=e[n];return t}function R(t){return t()}function lt(){return Object.create(null)}function U(t){t.forEach(R)}function ot(t){return typeof t=="function"}function at(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let p;function ut(t,e){return t===e?!0:(p||(p=document.createElement("a")),p.href=e,t===p.href)}function ft(t){return Object.keys(t).length===0}function H(t,...e){if(t==null){for(const i of e)i(void 0);return G}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function dt(t){let e;return H(t,n=>e=n)(),e}function _t(t,e,n){t.$$.on_destroy.push(H(e,n))}function ht(t,e,n,i){if(t){const r=j(t,e,n,i);return t[0](r)}}function j(t,e,n,i){return t[1]&&i?F(n.ctx.slice(),t[1](i(e))):n.ctx}function mt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const c=[],s=Math.max(e.dirty.length,r.length);for(let o=0;o<s;o+=1)c[o]=e.dirty[o]|r[o];return c}return e.dirty|r}return e.dirty}function pt(t,e,n,i,r,c){if(r){const s=j(e,n,i,c);t.p(s,r)}}function gt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function yt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function bt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function xt(t){return t??""}function wt(t,e,n){return t.set(n),e}let x=!1;function vt(){x=!0}function Et(){x=!1}function J(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function K(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let a=0;a<e.length;a++){const u=e[a];u.claim_order!==void 0&&l.push(u)}e=l}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let l=0;l<e.length;l++){const a=e[l].claim_order,u=(r>0&&e[n[r]].claim_order<=a?r+1:J(1,r,I=>e[n[I]].claim_order,a))-1;i[l]=n[u]+1;const S=u+1;n[S]=l,r=Math.max(S,r)}const c=[],s=[];let o=e.length-1;for(let l=n[r]+1;l!=0;l=i[l-1]){for(c.push(e[l-1]);o>=l;o--)s.push(e[o]);o--}for(;o>=0;o--)s.push(e[o]);c.reverse(),s.sort((l,a)=>l.claim_order-a.claim_order);for(let l=0,a=0;l<s.length;l++){for(;a<c.length&&s[l].claim_order>=c[a].claim_order;)a++;const u=a<c.length?c[a]:null;t.insertBefore(s[l],u)}}function Q(t,e){t.appendChild(e)}function V(t,e){if(x){for(K(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function X(t,e,n){t.insertBefore(e,n||null)}function Y(t,e,n){x&&!n?V(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function y(t){t.parentNode&&t.parentNode.removeChild(t)}function Nt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function k(t){return document.createElement(t)}function P(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function A(t){return document.createTextNode(t)}function Tt(){return A(" ")}function kt(){return A("")}function M(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function At(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function St(t,e,n){t.setAttributeNS("http://www.w3.org/1999/xlink",e,n)}function Mt(t){return t.dataset.svelteH}function Ct(t){return Array.from(t.childNodes)}function q(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function z(t,e,n,i,r=!1){q(t);const c=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const o=t[s];if(e(o)){const l=n(o);return l===void 0?t.splice(s,1):t[s]=l,r||(t.claim_info.last_index=s),o}}for(let s=t.claim_info.last_index-1;s>=0;s--){const o=t[s];if(e(o)){const l=n(o);return l===void 0?t.splice(s,1):t[s]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,o}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function B(t,e,n,i){return z(t,r=>r.nodeName===e,r=>{const c=[];for(let s=0;s<r.attributes.length;s++){const o=r.attributes[s];n[o.name]||c.push(o.name)}c.forEach(s=>r.removeAttribute(s))},()=>i(e))}function Lt(t,e,n){return B(t,e,n,k)}function Ht(t,e,n){return B(t,e,n,P)}function Z(t,e){return z(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>A(e),!0)}function jt(t){return Z(t," ")}function C(t,e,n){for(let i=n;i<t.length;i+=1){const r=t[i];if(r.nodeType===8&&r.textContent.trim()===e)return i}return-1}function Pt(t,e){const n=C(t,"HTML_TAG_START",0),i=C(t,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new w(e);q(t);const r=t.splice(n,i-n+1);y(r[0]),y(r[r.length-1]);const c=r.slice(1,r.length-1);if(c.length===0)return new w(e);for(const s of c)s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new w(e,c)}function qt(t,e){e=""+e,t.data!==e&&(t.data=e)}function zt(t,e){t.value=e??""}function Bt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Dt(t,e,n){for(let i=0;i<t.options.length;i+=1){const r=t.options[i];if(r.__value===e){r.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function It(t){const e=t.querySelector(":checked");return e&&e.__value}let g;function $(){if(g===void 0){g=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{g=!0}}return g}function Wt(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=k("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=$();let c;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",c=M(window,"message",s=>{s.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{c=M(i.contentWindow,"resize",e),e()}),Q(t,i),()=>{(r||c&&i.contentWindow)&&c(),y(i)}}function Ot(t,e,n){t.classList.toggle(e,!!n)}function tt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}class et{constructor(e=!1){f(this,"is_svg",!1);f(this,"e");f(this,"n");f(this,"t");f(this,"a");this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=P(n.nodeName):this.e=k(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)X(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(y)}}class w extends et{constructor(n=!1,i){super(n);f(this,"l");this.e=this.n=null,this.l=i}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let i=0;i<this.n.length;i+=1)Y(this.t,this.n[i],n)}}function Gt(t,e){return new t(e)}let b;function v(t){b=t}function h(){if(!b)throw new Error("Function called outside component initialization");return b}function Ft(t){h().$$.on_mount.push(t)}function Rt(t){h().$$.after_update.push(t)}function Ut(t){h().$$.on_destroy.push(t)}function Jt(){const t=h();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const c=tt(e,n,{cancelable:i});return r.slice().forEach(s=>{s.call(t,c)}),!c.defaultPrevented}return!0}}function Kt(t,e){return h().$$.context.set(t,e),e}function Qt(t){return h().$$.context.get(t)}const m=[],L=[];let _=[];const N=[],D=Promise.resolve();let T=!1;function nt(){T||(T=!0,D.then(rt))}function Vt(){return nt(),D}function it(t){_.push(t)}function Xt(t){N.push(t)}const E=new Set;let d=0;function rt(){if(d!==0)return;const t=b;do{try{for(;d<m.length;){const e=m[d];d++,v(e),st(e.$$)}}catch(e){throw m.length=0,d=0,e}for(v(null),m.length=0,d=0;L.length;)L.pop()();for(let e=0;e<_.length;e+=1){const n=_[e];E.has(n)||(E.add(n),n())}_.length=0}while(m.length);for(;N.length;)N.pop()();T=!1,E.clear(),v(t)}function st(t){if(t.fragment!==null){t.update(),U(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(it)}}function Yt(t){const e=[],n=[];_.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),_=e}export{Wt as $,zt as A,U as B,wt as C,P as D,Ht as E,Nt as F,lt as G,rt as H,ot as I,ft as J,it as K,Yt as L,b as M,v as N,R as O,m as P,nt as Q,vt as R,Et as S,ht as T,pt as U,gt as V,mt as W,xt as X,Ut as Y,It as Z,Dt as _,Tt as a,bt as a0,F as a1,yt as a2,Qt as a3,w as a4,Pt as a5,Jt as a6,Kt as a7,dt as a8,St as a9,Xt as aa,Ct as b,Lt as c,Z as d,k as e,y as f,jt as g,V as h,Y as i,qt as j,_t as k,ut as l,At as m,G as n,Ft as o,Mt as p,M as q,kt as r,at as s,A as t,Rt as u,Bt as v,Vt as w,L as x,Gt as y,Ot as z};
