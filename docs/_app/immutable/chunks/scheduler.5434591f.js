var G=Object.defineProperty;var F=(t,e,n)=>e in t?G(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var f=(t,e,n)=>(F(t,typeof e!="symbol"?e+"":e,n),n);function L(){}const mt=t=>t;function J(t,e){for(const n in e)t[n]=e[n];return t}function K(t){return t()}function pt(){return Object.create(null)}function Q(t){t.forEach(K)}function U(t){return typeof t=="function"}function yt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let p;function gt(t,e){return t===e?!0:(p||(p=document.createElement("a")),p.href=e,t===p.href)}function bt(t){return Object.keys(t).length===0}function P(t,...e){if(t==null){for(const i of e)i(void 0);return L}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function xt(t){let e;return P(t,n=>e=n)(),e}function wt(t,e,n){t.$$.on_destroy.push(P(e,n))}function vt(t,e,n,i){if(t){const s=D(t,e,n,i);return t[0](s)}}function D(t,e,n,i){return t[1]&&i?J(n.ctx.slice(),t[1](i(e))):n.ctx}function Et(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const c=[],r=Math.max(e.dirty.length,s.length);for(let l=0;l<r;l+=1)c[l]=e.dirty[l]|s[l];return c}return e.dirty|s}return e.dirty}function kt(t,e,n,i,s,c){if(s){const r=D(e,n,i,c);t.p(r,s)}}function Nt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Tt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function At(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function Mt(t){const e={};for(const n in t)e[n]=!0;return e}function St(t){return t??""}function jt(t,e,n){return t.set(n),e}function Ct(t){return t&&U(t.destroy)?t.destroy:L}let x=!1;function Lt(){x=!0}function Pt(){x=!1}function V(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function X(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let a=0;a<e.length;a++){const u=e[a];u.claim_order!==void 0&&o.push(u)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let o=0;o<e.length;o++){const a=e[o].claim_order,u=(s>0&&e[n[s]].claim_order<=a?s+1:V(1,s,R=>e[n[R]].claim_order,a))-1;i[o]=n[u]+1;const A=u+1;n[A]=o,s=Math.max(A,s)}const c=[],r=[];let l=e.length-1;for(let o=n[s]+1;o!=0;o=i[o-1]){for(c.push(e[o-1]);l>=o;l--)r.push(e[l]);l--}for(;l>=0;l--)r.push(e[l]);c.reverse(),r.sort((o,a)=>o.claim_order-a.claim_order);for(let o=0,a=0;o<r.length;o++){for(;a<c.length&&r[o].claim_order>=c[a].claim_order;)a++;const u=a<c.length?c[a]:null;t.insertBefore(r[o],u)}}function H(t,e){t.appendChild(e)}function Y(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Dt(t){const e=w("style");return e.textContent="/* empty */",Z(Y(t),e),e.sheet}function Z(t,e){return H(t.head||t,e),e.sheet}function $(t,e){if(x){for(X(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function tt(t,e,n){t.insertBefore(e,n||null)}function et(t,e,n){x&&!n?$(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function g(t){t.parentNode&&t.parentNode.removeChild(t)}function Ht(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function w(t){return document.createElement(t)}function O(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function T(t){return document.createTextNode(t)}function Ot(){return T(" ")}function qt(){return T("")}function M(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function zt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function Bt(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function q(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const nt=["width","height"];function it(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set&&nt.indexOf(i)===-1?t[i]=e[i]:q(t,i,e[i])}function st(t,e){Object.keys(e).forEach(n=>{rt(t,n,e[n])})}function rt(t,e,n){e in t?t[e]=typeof t[e]=="boolean"&&n===""?!0:n:q(t,e,n)}function Wt(t){return/-/.test(t)?st:it}function It(t){return t.dataset.svelteH}function Rt(t){return Array.from(t.childNodes)}function z(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function B(t,e,n,i,s=!1){z(t);const c=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const l=t[r];if(e(l)){const o=n(l);return o===void 0?t.splice(r,1):t[r]=o,s||(t.claim_info.last_index=r),l}}for(let r=t.claim_info.last_index-1;r>=0;r--){const l=t[r];if(e(l)){const o=n(l);return o===void 0?t.splice(r,1):t[r]=o,s?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,l}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function W(t,e,n,i){return B(t,s=>s.nodeName===e,s=>{const c=[];for(let r=0;r<s.attributes.length;r++){const l=s.attributes[r];n[l.name]||c.push(l.name)}c.forEach(r=>s.removeAttribute(r))},()=>i(e))}function Gt(t,e,n){return W(t,e,n,w)}function Ft(t,e,n){return W(t,e,n,O)}function ct(t,e){return B(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>T(e),!0)}function Jt(t){return ct(t," ")}function S(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return-1}function Kt(t,e){const n=S(t,"HTML_TAG_START",0),i=S(t,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new j(e);z(t);const s=t.splice(n,i-n+1);g(s[0]),g(s[s.length-1]);const c=s.slice(1,s.length-1);for(const r of c)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new j(e,c)}function Qt(t,e){e=""+e,t.data!==e&&(t.data=e)}function Ut(t,e){t.value=e??""}function Vt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Xt(t,e,n){for(let i=0;i<t.options.length;i+=1){const s=t.options[i];if(s.__value===e){s.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function Yt(t){const e=t.querySelector(":checked");return e&&e.__value}let y;function ot(){if(y===void 0){y=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{y=!0}}return y}function Zt(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=w("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const s=ot();let c;return s?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",c=M(window,"message",r=>{r.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{c=M(i.contentWindow,"resize",e),e()}),H(t,i),()=>{(s||c&&i.contentWindow)&&c(),g(i)}}function $t(t,e,n){t.classList.toggle(e,!!n)}function lt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}class at{constructor(e=!1){f(this,"is_svg",!1);f(this,"e");f(this,"n");f(this,"t");f(this,"a");this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=O(n.nodeName):this.e=w(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)tt(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(g)}}class j extends at{constructor(n=!1,i){super(n);f(this,"l");this.e=this.n=null,this.l=i}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let i=0;i<this.n.length;i+=1)et(this.t,this.n[i],n)}}function te(t,e){return new t(e)}let b;function v(t){b=t}function m(){if(!b)throw new Error("Function called outside component initialization");return b}function ee(t){m().$$.on_mount.push(t)}function ne(t){m().$$.after_update.push(t)}function ie(t){m().$$.on_destroy.push(t)}function se(){const t=m();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const c=lt(e,n,{cancelable:i});return s.slice().forEach(r=>{r.call(t,c)}),!c.defaultPrevented}return!0}}function re(t,e){return m().$$.context.set(t,e),e}function ce(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const h=[],C=[];let d=[];const k=[],I=Promise.resolve();let N=!1;function ut(){N||(N=!0,I.then(_t))}function oe(){return ut(),I}function ft(t){d.push(t)}function le(t){k.push(t)}const E=new Set;let _=0;function _t(){if(_!==0)return;const t=b;do{try{for(;_<h.length;){const e=h[_];_++,v(e),dt(e.$$)}}catch(e){throw h.length=0,_=0,e}for(v(null),h.length=0,_=0;C.length;)C.pop()();for(let e=0;e<d.length;e+=1){const n=d[e];E.has(n)||(E.add(n),n())}d.length=0}while(h.length);for(;k.length;)k.pop()();N=!1,E.clear(),v(t)}function dt(t){if(t.fragment!==null){t.update(),Q(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(ft)}}function ae(t){const e=[],n=[];d.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),d=e}export{J as $,mt as A,Ct as B,U as C,Ht as D,$t as E,M as F,ft as G,Ut as H,Zt as I,Bt as J,Q as K,se as L,P as M,jt as N,ce as O,zt as P,j as Q,Kt as R,ie as S,It as T,St as U,O as V,Ft as W,xt as X,le as Y,At as Z,re as _,Ot as a,Tt as a0,Wt as a1,m as a2,Mt as a3,Xt as a4,Yt as a5,gt as a6,Y as a7,Dt as a8,lt as a9,pt as aa,_t as ab,bt as ac,ae as ad,b as ae,v as af,K as ag,h as ah,ut as ai,Lt as aj,Pt as ak,ne as b,Jt as c,g as d,qt as e,w as f,Gt as g,Rt as h,et as i,q as j,Vt as k,T as l,ct as m,Qt as n,ee as o,C as p,te as q,vt as r,yt as s,oe as t,kt as u,Nt as v,Et as w,$ as x,L as y,wt as z};
