var B=Object.defineProperty;var L=(e,t,n)=>t in e?B(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var y=(e,t,n)=>(L(e,typeof t!="symbol"?t+"":t,n),n);import{r as p,n as x,j as v,k as I,l as C,m as M,f as N,p as W,q as P,v as A,w as T,x as q,y as D}from"./scheduler.5b079c2b.js";let $=!1;function H(){$=!0}function O(){$=!1}function R(e,t,n,i){for(;e<t;){const s=e+(t-e>>1);n(s)<=i?e=s+1:t=s}return e}function V(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const r=[];for(let l=0;l<t.length;l++){const f=t[l];f.claim_order!==void 0&&r.push(f)}t=r}const n=new Int32Array(t.length+1),i=new Int32Array(t.length);n[0]=-1;let s=0;for(let r=0;r<t.length;r++){const l=t[r].claim_order,f=(s>0&&t[n[s]].claim_order<=l?s+1:R(1,s,_=>t[n[_]].claim_order,l))-1;i[r]=n[f]+1;const u=f+1;n[u]=r,s=Math.max(u,s)}const o=[],a=[];let c=t.length-1;for(let r=n[s]+1;r!=0;r=i[r-1]){for(o.push(t[r-1]);c>=r;c--)a.push(t[c]);c--}for(;c>=0;c--)a.push(t[c]);o.reverse(),a.sort((r,l)=>r.claim_order-l.claim_order);for(let r=0,l=0;r<a.length;r++){for(;l<o.length&&a[r].claim_order>=o[l].claim_order;)l++;const f=l<o.length?o[l]:null;e.insertBefore(a[r],f)}}function k(e,t){e.appendChild(t)}function F(e,t){if($){for(V(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentNode!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function re(e,t,n){$&&!n?F(e,t):(t.parentNode!==e||t.nextSibling!=n)&&e.insertBefore(t,n||null)}function E(e){e.parentNode&&e.parentNode.removeChild(e)}function se(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function j(e){return document.createElement(e)}function g(e){return document.createTextNode(e)}function ae(){return g(" ")}function le(){return g("")}function S(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function oe(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function ce(e){return e.dataset.svelteH}function G(e){return Array.from(e.childNodes)}function J(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function z(e,t,n,i,s=!1){J(e);const o=(()=>{for(let a=e.claim_info.last_index;a<e.length;a++){const c=e[a];if(t(c)){const r=n(c);return r===void 0?e.splice(a,1):e[a]=r,s||(e.claim_info.last_index=a),c}}for(let a=e.claim_info.last_index-1;a>=0;a--){const c=e[a];if(t(c)){const r=n(c);return r===void 0?e.splice(a,1):e[a]=r,s?r===void 0&&e.claim_info.last_index--:e.claim_info.last_index=a,c}}return i()})();return o.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,o}function K(e,t,n,i){return z(e,s=>s.nodeName===t,s=>{const o=[];for(let a=0;a<s.attributes.length;a++){const c=s.attributes[a];n[c.name]||o.push(c.name)}o.forEach(a=>s.removeAttribute(a))},()=>i(t))}function ue(e,t,n){return K(e,t,n,j)}function Q(e,t){return z(e,n=>n.nodeType===3,n=>{const i=""+t;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>g(t),!0)}function fe(e){return Q(e," ")}function de(e,t){t=""+t,e.data!==t&&(e.data=t)}function _e(e,t){e.value=t??""}function me(e,t,n,i){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,i?"important":"")}let m;function U(){if(m===void 0){m=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{m=!0}}return m}function he(e,t){getComputedStyle(e).position==="static"&&(e.style.position="relative");const i=j("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const s=U();let o;return s?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",o=S(window,"message",a=>{a.source===i.contentWindow&&t()})):(i.src="about:blank",i.onload=()=>{o=S(i.contentWindow,"resize",t),t()}),k(e,i),()=>{(s||o&&i.contentWindow)&&o(),E(i)}}function pe(e,t,n){e.classList.toggle(t,!!n)}function $e(e,t){return new e(t)}const h=new Set;let d;function ye(){d={r:0,c:[],p:d}}function xe(){d.r||p(d.c),d=d.p}function X(e,t){e&&e.i&&(h.delete(e),e.i(t))}function ge(e,t,n,i){if(e&&e.o){if(h.has(e))return;h.add(e),d.c.push(()=>{h.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}function we(e){e&&e.c()}function be(e,t){e&&e.l(t)}function Y(e,t,n){const{fragment:i,after_update:s}=e.$$;i&&i.m(t,n),N(()=>{const o=e.$$.on_mount.map(T).filter(C);e.$$.on_destroy?e.$$.on_destroy.push(...o):p(o),e.$$.on_mount=[]}),s.forEach(N)}function Z(e,t){const n=e.$$;n.fragment!==null&&(W(n.after_update),p(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ee(e,t){e.$$.dirty[0]===-1&&(q.push(e),D(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ve(e,t,n,i,s,o,a,c=[-1]){const r=P;A(e);const l=e.$$={fragment:null,ctx:[],props:o,update:x,not_equal:s,bound:v(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(r?r.$$.context:[])),callbacks:v(),dirty:c,skip_bound:!1,root:t.target||r.$$.root};a&&a(l.root);let f=!1;if(l.ctx=n?n(e,t.props||{},(u,_,...w)=>{const b=w.length?w[0]:_;return l.ctx&&s(l.ctx[u],l.ctx[u]=b)&&(!l.skip_bound&&l.bound[u]&&l.bound[u](b),f&&ee(e,u)),_}):[],l.update(),f=!0,p(l.before_update),l.fragment=i?i(l.ctx):!1,t.target){if(t.hydrate){H();const u=G(t.target);l.fragment&&l.fragment.l(u),u.forEach(E)}else l.fragment&&l.fragment.c();t.intro&&X(e.$$.fragment),Y(e,t.target,t.anchor),O(),I()}A(r)}class Ne{constructor(){y(this,"$$");y(this,"$$set")}$destroy(){Z(this,1),this.$destroy=x}$on(t,n){if(!C(n))return x;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(t){this.$$set&&!M(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const te="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(te);export{pe as A,he as B,S as C,se as D,Ne as S,re as a,xe as b,fe as c,X as d,le as e,E as f,j as g,ue as h,ve as i,G as j,oe as k,me as l,g as m,Q as n,de as o,ye as p,$e as q,we as r,ae as s,ge as t,be as u,Y as v,Z as w,F as x,ce as y,_e as z};
