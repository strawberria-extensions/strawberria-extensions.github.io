var L=Object.defineProperty;var j=(e,t,n)=>t in e?L(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var y=(e,t,n)=>(j(e,typeof t!="symbol"?t+"":t,n),n);import{r as p,n as g,k as b,l as M,m as E,p as W,f as N,q,v as H,w as S,x as P,y as T,z as D}from"./scheduler.803aa159.js";let $=!1;function O(){$=!0}function k(){$=!1}function F(e,t,n,i){for(;e<t;){const r=e+(t-e>>1);n(r)<=i?e=r+1:t=r}return e}function G(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const s=[];for(let o=0;o<t.length;o++){const f=t[o];f.claim_order!==void 0&&s.push(f)}t=s}const n=new Int32Array(t.length+1),i=new Int32Array(t.length);n[0]=-1;let r=0;for(let s=0;s<t.length;s++){const o=t[s].claim_order,f=(r>0&&t[n[r]].claim_order<=o?r+1:F(1,r,_=>t[n[_]].claim_order,o))-1;i[s]=n[f]+1;const u=f+1;n[u]=s,r=Math.max(u,r)}const l=[],a=[];let c=t.length-1;for(let s=n[r]+1;s!=0;s=i[s-1]){for(l.push(t[s-1]);c>=s;c--)a.push(t[c]);c--}for(;c>=0;c--)a.push(t[c]);l.reverse(),a.sort((s,o)=>s.claim_order-o.claim_order);for(let s=0,o=0;s<a.length;s++){for(;o<l.length&&a[s].claim_order>=l[o].claim_order;)o++;const f=o<l.length?l[o]:null;e.insertBefore(a[s],f)}}function R(e,t){e.appendChild(t)}function V(e,t){if($){for(G(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentNode!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function se(e,t,n){$&&!n?V(e,t):(t.parentNode!==e||t.nextSibling!=n)&&e.insertBefore(t,n||null)}function C(e){e.parentNode&&e.parentNode.removeChild(e)}function ae(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function z(e){return document.createElement(e)}function J(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function w(e){return document.createTextNode(e)}function oe(){return w(" ")}function le(){return w("")}function A(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function ce(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function ue(e){return e.dataset.svelteH}function K(e){return Array.from(e.childNodes)}function Q(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function B(e,t,n,i,r=!1){Q(e);const l=(()=>{for(let a=e.claim_info.last_index;a<e.length;a++){const c=e[a];if(t(c)){const s=n(c);return s===void 0?e.splice(a,1):e[a]=s,r||(e.claim_info.last_index=a),c}}for(let a=e.claim_info.last_index-1;a>=0;a--){const c=e[a];if(t(c)){const s=n(c);return s===void 0?e.splice(a,1):e[a]=s,r?s===void 0&&e.claim_info.last_index--:e.claim_info.last_index=a,c}}return i()})();return l.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,l}function I(e,t,n,i){return B(e,r=>r.nodeName===t,r=>{const l=[];for(let a=0;a<r.attributes.length;a++){const c=r.attributes[a];n[c.name]||l.push(c.name)}l.forEach(a=>r.removeAttribute(a))},()=>i(t))}function fe(e,t,n){return I(e,t,n,z)}function de(e,t,n){return I(e,t,n,J)}function U(e,t){return B(e,n=>n.nodeType===3,n=>{const i=""+t;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>w(t),!0)}function _e(e){return U(e," ")}function me(e,t){t=""+t,e.data!==t&&(e.data=t)}function he(e,t){e.value=t??""}function pe(e,t,n,i){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,i?"important":"")}function $e(e,t,n){for(let i=0;i<e.options.length;i+=1){const r=e.options[i];if(r.__value===t){r.selected=!0;return}}(!n||t!==void 0)&&(e.selectedIndex=-1)}function ye(e){const t=e.querySelector(":checked");return t&&t.__value}let m;function X(){if(m===void 0){m=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{m=!0}}return m}function ge(e,t){getComputedStyle(e).position==="static"&&(e.style.position="relative");const i=z("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=X();let l;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",l=A(window,"message",a=>{a.source===i.contentWindow&&t()})):(i.src="about:blank",i.onload=()=>{l=A(i.contentWindow,"resize",t),t()}),R(e,i),()=>{(r||l&&i.contentWindow)&&l(),C(i)}}function we(e,t,n){e.classList.toggle(t,!!n)}function xe(e,t){return new e(t)}const h=new Set;let d;function ve(){d={r:0,c:[],p:d}}function be(){d.r||p(d.c),d=d.p}function Y(e,t){e&&e.i&&(h.delete(e),e.i(t))}function Ne(e,t,n,i){if(e&&e.o){if(h.has(e))return;h.add(e),d.c.push(()=>{h.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}function Se(e){e&&e.c()}function Ae(e,t){e&&e.l(t)}function Z(e,t,n){const{fragment:i,after_update:r}=e.$$;i&&i.m(t,n),N(()=>{const l=e.$$.on_mount.map(P).filter(E);e.$$.on_destroy?e.$$.on_destroy.push(...l):p(l),e.$$.on_mount=[]}),r.forEach(N)}function ee(e,t){const n=e.$$;n.fragment!==null&&(q(n.after_update),p(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function te(e,t){e.$$.dirty[0]===-1&&(T.push(e),D(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function Ee(e,t,n,i,r,l,a,c=[-1]){const s=H;S(e);const o=e.$$={fragment:null,ctx:[],props:l,update:g,not_equal:r,bound:b(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(s?s.$$.context:[])),callbacks:b(),dirty:c,skip_bound:!1,root:t.target||s.$$.root};a&&a(o.root);let f=!1;if(o.ctx=n?n(e,t.props||{},(u,_,...x)=>{const v=x.length?x[0]:_;return o.ctx&&r(o.ctx[u],o.ctx[u]=v)&&(!o.skip_bound&&o.bound[u]&&o.bound[u](v),f&&te(e,u)),_}):[],o.update(),f=!0,p(o.before_update),o.fragment=i?i(o.ctx):!1,t.target){if(t.hydrate){O();const u=K(t.target);o.fragment&&o.fragment.l(u),u.forEach(C)}else o.fragment&&o.fragment.c();t.intro&&Y(e.$$.fragment),Z(e,t.target,t.anchor),k(),M()}S(s)}class Ce{constructor(){y(this,"$$");y(this,"$$set")}$destroy(){ee(this,1),this.$destroy=g}$on(t,n){if(!E(n))return g;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(t){this.$$set&&!W(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ne="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ne);export{ye as A,ue as B,we as C,$e as D,ge as E,he as F,J as G,de as H,Ce as S,se as a,be as b,_e as c,Y as d,le as e,C as f,z as g,fe as h,Ee as i,K as j,ce as k,pe as l,w as m,U as n,me as o,ve as p,xe as q,Se as r,oe as s,Ne as t,Ae as u,Z as v,ee as w,V as x,ae as y,A as z};
