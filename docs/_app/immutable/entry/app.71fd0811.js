import{s as C,a as B,o as U,t as j,b as I}from"../chunks/scheduler.803aa159.js";import{S as z,i as W,s as F,e as h,c as G,a as E,t as p,b as P,d as g,f as w,g as H,h as J,j as K,k as O,l as d,m as M,n as Q,o as X,p as D,q as b,r as k,u as T,v as R,w as L}from"../chunks/index.78bf47b2.js";const Y="modulepreload",Z=function(a,e){return new URL(a,e).href},V={},m=function(e,n,i){if(!n||n.length===0)return e();const r=document.getElementsByTagName("link");return Promise.all(n.map(c=>{if(c=Z(c,i),c in V)return;V[c]=!0;const t=c.endsWith(".css"),s=t?'[rel="stylesheet"]':"";if(!!i)for(let l=r.length-1;l>=0;l--){const u=r[l];if(u.href===c&&(!t||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${s}`))return;const o=document.createElement("link");if(o.rel=t?"stylesheet":Y,t||(o.as="script",o.crossOrigin=""),o.href=c,document.head.appendChild(o),t)return new Promise((l,u)=>{o.addEventListener("load",l),o.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${c}`)))})})).then(()=>e()).catch(c=>{const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=c,window.dispatchEvent(t),!t.defaultPrevented)throw c})},se={};function $(a){let e,n,i;var r=a[1][0];function c(t){return{props:{data:t[3],form:t[2]}}}return r&&(e=b(r,c(a)),a[12](e)),{c(){e&&k(e.$$.fragment),n=h()},l(t){e&&T(e.$$.fragment,t),n=h()},m(t,s){e&&R(e,t,s),E(t,n,s),i=!0},p(t,s){const _={};if(s&8&&(_.data=t[3]),s&4&&(_.form=t[2]),s&2&&r!==(r=t[1][0])){if(e){D();const o=e;p(o.$$.fragment,1,0,()=>{L(o,1)}),P()}r?(e=b(r,c(t)),t[12](e),k(e.$$.fragment),g(e.$$.fragment,1),R(e,n.parentNode,n)):e=null}else r&&e.$set(_)},i(t){i||(e&&g(e.$$.fragment,t),i=!0)},o(t){e&&p(e.$$.fragment,t),i=!1},d(t){t&&w(n),a[12](null),e&&L(e,t)}}}function x(a){let e,n,i;var r=a[1][0];function c(t){return{props:{data:t[3],$$slots:{default:[ee]},$$scope:{ctx:t}}}}return r&&(e=b(r,c(a)),a[11](e)),{c(){e&&k(e.$$.fragment),n=h()},l(t){e&&T(e.$$.fragment,t),n=h()},m(t,s){e&&R(e,t,s),E(t,n,s),i=!0},p(t,s){const _={};if(s&8&&(_.data=t[3]),s&8215&&(_.$$scope={dirty:s,ctx:t}),s&2&&r!==(r=t[1][0])){if(e){D();const o=e;p(o.$$.fragment,1,0,()=>{L(o,1)}),P()}r?(e=b(r,c(t)),t[11](e),k(e.$$.fragment),g(e.$$.fragment,1),R(e,n.parentNode,n)):e=null}else r&&e.$set(_)},i(t){i||(e&&g(e.$$.fragment,t),i=!0)},o(t){e&&p(e.$$.fragment,t),i=!1},d(t){t&&w(n),a[11](null),e&&L(e,t)}}}function ee(a){let e,n,i;var r=a[1][1];function c(t){return{props:{data:t[4],form:t[2]}}}return r&&(e=b(r,c(a)),a[10](e)),{c(){e&&k(e.$$.fragment),n=h()},l(t){e&&T(e.$$.fragment,t),n=h()},m(t,s){e&&R(e,t,s),E(t,n,s),i=!0},p(t,s){const _={};if(s&16&&(_.data=t[4]),s&4&&(_.form=t[2]),s&2&&r!==(r=t[1][1])){if(e){D();const o=e;p(o.$$.fragment,1,0,()=>{L(o,1)}),P()}r?(e=b(r,c(t)),t[10](e),k(e.$$.fragment),g(e.$$.fragment,1),R(e,n.parentNode,n)):e=null}else r&&e.$set(_)},i(t){i||(e&&g(e.$$.fragment,t),i=!0)},o(t){e&&p(e.$$.fragment,t),i=!1},d(t){t&&w(n),a[10](null),e&&L(e,t)}}}function A(a){let e,n=a[6]&&y(a);return{c(){e=H("div"),n&&n.c(),this.h()},l(i){e=J(i,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var r=K(e);n&&n.l(r),r.forEach(w),this.h()},h(){O(e,"id","svelte-announcer"),O(e,"aria-live","assertive"),O(e,"aria-atomic","true"),d(e,"position","absolute"),d(e,"left","0"),d(e,"top","0"),d(e,"clip","rect(0 0 0 0)"),d(e,"clip-path","inset(50%)"),d(e,"overflow","hidden"),d(e,"white-space","nowrap"),d(e,"width","1px"),d(e,"height","1px")},m(i,r){E(i,e,r),n&&n.m(e,null)},p(i,r){i[6]?n?n.p(i,r):(n=y(i),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(i){i&&w(e),n&&n.d()}}}function y(a){let e;return{c(){e=M(a[7])},l(n){e=Q(n,a[7])},m(n,i){E(n,e,i)},p(n,i){i&128&&X(e,n[7])},d(n){n&&w(e)}}}function te(a){let e,n,i,r,c;const t=[x,$],s=[];function _(l,u){return l[1][1]?0:1}e=_(a),n=s[e]=t[e](a);let o=a[5]&&A(a);return{c(){n.c(),i=F(),o&&o.c(),r=h()},l(l){n.l(l),i=G(l),o&&o.l(l),r=h()},m(l,u){s[e].m(l,u),E(l,i,u),o&&o.m(l,u),E(l,r,u),c=!0},p(l,[u]){let v=e;e=_(l),e===v?s[e].p(l,u):(D(),p(s[v],1,1,()=>{s[v]=null}),P(),n=s[e],n?n.p(l,u):(n=s[e]=t[e](l),n.c()),g(n,1),n.m(i.parentNode,i)),l[5]?o?o.p(l,u):(o=A(l),o.c(),o.m(r.parentNode,r)):o&&(o.d(1),o=null)},i(l){c||(g(n),c=!0)},o(l){p(n),c=!1},d(l){l&&(w(i),w(r)),s[e].d(l),o&&o.d(l)}}}function ne(a,e,n){let{stores:i}=e,{page:r}=e,{constructors:c}=e,{components:t=[]}=e,{form:s}=e,{data_0:_=null}=e,{data_1:o=null}=e;B(i.page.notify);let l=!1,u=!1,v=null;U(()=>{const f=i.page.subscribe(()=>{l&&(n(6,u=!0),j().then(()=>{n(7,v=document.title||"untitled page")}))});return n(5,l=!0),f});function N(f){I[f?"unshift":"push"](()=>{t[1]=f,n(0,t)})}function S(f){I[f?"unshift":"push"](()=>{t[0]=f,n(0,t)})}function q(f){I[f?"unshift":"push"](()=>{t[0]=f,n(0,t)})}return a.$$set=f=>{"stores"in f&&n(8,i=f.stores),"page"in f&&n(9,r=f.page),"constructors"in f&&n(1,c=f.constructors),"components"in f&&n(0,t=f.components),"form"in f&&n(2,s=f.form),"data_0"in f&&n(3,_=f.data_0),"data_1"in f&&n(4,o=f.data_1)},a.$$.update=()=>{a.$$.dirty&768&&i.page.set(r)},[t,c,s,_,o,l,u,v,i,r,N,S,q]}class oe extends z{constructor(e){super(),W(this,e,ne,te,C,{stores:8,page:9,constructors:1,components:0,form:2,data_0:3,data_1:4})}}const ae=[()=>m(()=>import("../nodes/0.727cad85.js"),["..\\nodes\\0.727cad85.js","..\\chunks\\scheduler.803aa159.js","..\\chunks\\index.78bf47b2.js","..\\assets\\0.0f2f85fa.css"],import.meta.url),()=>m(()=>import("../nodes/1.4e74646b.js"),["..\\nodes\\1.4e74646b.js","..\\chunks\\scheduler.803aa159.js","..\\chunks\\index.78bf47b2.js","..\\chunks\\singletons.689f4996.js","..\\chunks\\index.636016b2.js"],import.meta.url),()=>m(()=>import("../nodes/2.ef09c146.js"),["..\\nodes\\2.ef09c146.js","..\\chunks\\scheduler.803aa159.js","..\\chunks\\index.78bf47b2.js","..\\chunks\\each.e59479a4.js","..\\chunks\\index.636016b2.js","..\\chunks\\logo.09e82b80.js","..\\chunks\\utility.29036dd3.js","..\\chunks\\js-big-decimal.e03afb0d.js","..\\assets\\2.1c1be6f5.css"],import.meta.url),()=>m(()=>import("../nodes/3.d091f726.js"),["..\\nodes\\3.d091f726.js","..\\chunks\\scheduler.803aa159.js","..\\chunks\\index.78bf47b2.js","..\\chunks\\index.636016b2.js","..\\chunks\\logo.09e82b80.js","..\\assets\\3.c0d92064.css"],import.meta.url),()=>m(()=>import("../nodes/4.59ceed1c.js"),["..\\nodes\\4.59ceed1c.js","..\\chunks\\scheduler.803aa159.js","..\\chunks\\index.78bf47b2.js","..\\chunks\\logo.09e82b80.js"],import.meta.url),()=>m(()=>import("../nodes/5.abf47a27.js"),["..\\nodes\\5.abf47a27.js","..\\chunks\\scheduler.803aa159.js","..\\chunks\\index.78bf47b2.js","..\\chunks\\logo.09e82b80.js","..\\chunks\\utility.29036dd3.js","..\\assets\\5.de53d673.css"],import.meta.url),()=>m(()=>import("../nodes/6.f7cefba5.js"),["..\\nodes\\6.f7cefba5.js","..\\chunks\\scheduler.803aa159.js","..\\chunks\\index.78bf47b2.js","..\\chunks\\index.636016b2.js","..\\chunks\\logo.09e82b80.js","..\\assets\\3.c0d92064.css"],import.meta.url),()=>m(()=>import("../nodes/7.1347d93a.js"),["..\\nodes\\7.1347d93a.js","..\\chunks\\scheduler.803aa159.js","..\\chunks\\index.78bf47b2.js","..\\chunks\\each.e59479a4.js","..\\chunks\\utility.29036dd3.js","..\\assets\\7.575ef82f.css"],import.meta.url),()=>m(()=>import("../nodes/8.5cab02c7.js"),["..\\nodes\\8.5cab02c7.js","..\\chunks\\scheduler.803aa159.js","..\\chunks\\index.78bf47b2.js","..\\chunks\\each.e59479a4.js","..\\chunks\\logo.09e82b80.js","..\\chunks\\utility.29036dd3.js","..\\assets\\5.de53d673.css"],import.meta.url),()=>m(()=>import("../nodes/9.88c14324.js"),["..\\nodes\\9.88c14324.js","..\\chunks\\scheduler.803aa159.js","..\\chunks\\index.78bf47b2.js","..\\chunks\\each.e59479a4.js","..\\chunks\\js-big-decimal.e03afb0d.js","..\\chunks\\logo.09e82b80.js","..\\assets\\9.a05b534a.css"],import.meta.url),()=>m(()=>import("../nodes/10.4986317f.js"),["..\\nodes\\10.4986317f.js","..\\chunks\\scheduler.803aa159.js","..\\chunks\\index.78bf47b2.js","..\\chunks\\each.e59479a4.js","..\\chunks\\utility.29036dd3.js","..\\assets\\10.f36190b3.css"],import.meta.url)],le=[],ce={"/chaster/extended-wheel":[2],"/chaster/extended-wheel/configuration":[3],"/chaster/oauth":[4],"/chaster/scavenger-codes":[5],"/chaster/scavenger-codes/configuration":[6],"/chaster/typing-tasks":[7],"/chaster/weighted-dice":[8],"/chaster/weighted-dice/configuration":[9],"/discord-quiz":[10]},fe={handleError:({error:a})=>{console.error(a)}};export{ce as dictionary,fe as hooks,se as matchers,ae as nodes,oe as root,le as server_loads};
