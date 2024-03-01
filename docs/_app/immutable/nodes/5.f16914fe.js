import{s as Se,f as m,l as x,a as M,g as _,h as y,m as O,d as h,c as L,D as pe,j as u,M as ve,i as ee,x as o,n as F,N as je,A as Ve,z as qe,o as ze,B as He,E as W,J as Je,y as De}from"../chunks/scheduler.203416a4.js";import{S as Pe,i as Me,a as B,g as ue,t as A,c as de,b as Le,d as Te,m as xe,e as Oe}from"../chunks/index.e2fd86c1.js";import{e as fe}from"../chunks/each.e59479a4.js";import{w as Ne}from"../chunks/index.003e1ef7.js";import{c as Be}from"../chunks/logo.09e82b80.js";import{S as Re}from"../chunks/SvelteMarkdown.5828e8ea.js";import{b as Ue,g as Ye}from"../chunks/utility.1210c4d5.js";const Ae=!0,it=Object.freeze(Object.defineProperty({__proto__:null,prerender:Ae},Symbol.toStringTag,{value:"Module"}));function be(r,e,t){const l=r.slice();l[9]=e[t];const a=Ye(l[9]);return l[10]=a,l}function Ie(r){let e,t,l=fe(r[2].penaltyConfig.effects),a=[];for(let s=0;s<l.length;s+=1)a[s]=ke(be(r,l,s));const c=s=>A(a[s],1,1,()=>{a[s]=null});return{c(){e=m("ul");for(let s=0;s<a.length;s+=1)a[s].c();this.h()},l(s){e=_(s,"UL",{class:!0});var f=y(e);for(let n=0;n<a.length;n+=1)a[n].l(f);f.forEach(h),this.h()},h(){u(e,"class","flex flex-col list effect-list caption pl-[0.25em] mt-[0.125em] svelte-1fe1t23")},m(s,f){ee(s,e,f);for(let n=0;n<a.length;n+=1)a[n]&&a[n].m(e,null);t=!0},p(s,f){if(f&4){l=fe(s[2].penaltyConfig.effects);let n;for(n=0;n<l.length;n+=1){const d=be(s,l,n);a[n]?(a[n].p(d,f),B(a[n],1)):(a[n]=ke(d),a[n].c(),B(a[n],1),a[n].m(e,null))}for(ue(),n=l.length;n<a.length;n+=1)c(n);de()}},i(s){if(!t){for(let f=0;f<l.length;f+=1)B(a[f]);t=!0}},o(s){a=a.filter(Boolean);for(let f=0;f<a.length;f+=1)A(a[f]);t=!1},d(s){s&&h(e),Ve(a,s)}}}function ke(r){let e,t,l;return t=new Re({props:{source:r[10],isInline:!0}}),{c(){e=m("li"),Le(t.$$.fragment)},l(a){e=_(a,"LI",{});var c=y(e);Te(t.$$.fragment,c),c.forEach(h)},m(a,c){ee(a,e,c),xe(t,e,null),l=!0},p(a,c){const s={};c&4&&(s.source=a[10]),t.$set(s)},i(a){l||(B(t.$$.fragment,a),l=!0)},o(a){A(t.$$.fragment,a),l=!1},d(a){a&&h(e),Oe(t)}}}function Fe(r){let e,t,l,a,c=r[2].extensionData.display+"",s,f,n,d,D,E,g,C,j,q,z,U,T,V,H,G,J,P,S,p,ae="Penalty effects:",v,w,i,N=r[2].penaltyData.current+"",Y,K,X=r[2].penaltyConfig.required+"",Z,he,te=r[1].what+"",se,le=r[2].penaltyConfig.required>0?"s":"",ne,re,R,I=r[2].penaltyConfig.effects.length>0&&Ie(r);return{c(){e=m("div"),t=m("div"),l=m("div"),a=m("h5"),s=x(c),f=M(),n=m("div"),d=x(r[6]),D=M(),E=m("div"),g=M(),C=m("a"),j=x("Open"),q=M(),z=m("div"),U=x(r[4]),T=M(),V=m("div"),H=m("div"),J=M(),P=m("div"),S=m("div"),p=m("div"),p.textContent=ae,v=M(),I&&I.c(),w=M(),i=m("div"),Y=x(N),K=x(" / "),Z=x(X),he=M(),se=x(te),ne=x(le),this.h()},l(k){e=_(k,"DIV",{class:!0});var b=y(e);t=_(b,"DIV",{class:!0});var $=y(t);l=_($,"DIV",{class:!0});var oe=y(l);a=_(oe,"H5",{class:!0});var me=y(a);s=O(me,c),me.forEach(h),f=L(oe),n=_(oe,"DIV",{class:!0});var _e=y(n);d=O(_e,r[6]),_e.forEach(h),oe.forEach(h),D=L($),E=_($,"DIV",{class:!0}),y(E).forEach(h),g=L($),C=_($,"A",{href:!0,target:!0,class:!0});var ge=y(C);j=O(ge,"Open"),ge.forEach(h),$.forEach(h),q=L(b),z=_(b,"DIV",{});var ye=y(z);U=O(ye,r[4]),ye.forEach(h),T=L(b),V=_(b,"DIV",{class:!0});var we=y(V);H=_(we,"DIV",{role:!0,class:!0,style:!0}),y(H).forEach(h),we.forEach(h),J=L(b),P=_(b,"DIV",{class:!0});var ie=y(P);S=_(ie,"DIV",{class:!0});var ce=y(S);p=_(ce,"DIV",{"data-svelte-h":!0}),pe(p)!=="svelte-bjs3vd"&&(p.textContent=ae),v=L(ce),I&&I.l(ce),ce.forEach(h),w=L(ie),i=_(ie,"DIV",{class:!0});var Q=y(i);Y=O(Q,N),K=O(Q," / "),Z=O(Q,X),he=L(Q),se=O(Q,te),ne=O(Q,le),Q.forEach(h),ie.forEach(h),b.forEach(h),this.h()},h(){u(a,"class","mb-[0.25em]"),u(n,"class","caption"),u(l,"class","flex flex-col"),u(E,"class","grow"),u(C,"href",r[5]),u(C,"target","_blank"),u(C,"class","btn btn-outline-primary"),u(t,"class","flex flex-row space-x-[1em] items-center mb-[0.75em]"),u(H,"role","progressbar"),u(H,"class","progress-bar"),u(H,"style",G=`width: ${r[3]}%`),u(V,"class","progress"),u(S,"class","flex flex-col grow"),u(i,"class","shrink-0 caption"),u(P,"class","flex flex-row items-start text-sm whitespace-pre-wrap space-x-[1em]"),u(e,"class",re=ve(`card-content flex flex-col space-y-[0.5em] ${r[0]?"w-[32em]":"w-full"}`)+" svelte-1fe1t23")},m(k,b){ee(k,e,b),o(e,t),o(t,l),o(l,a),o(a,s),o(l,f),o(l,n),o(n,d),o(t,D),o(t,E),o(t,g),o(t,C),o(C,j),o(e,q),o(e,z),o(z,U),o(e,T),o(e,V),o(V,H),o(e,J),o(e,P),o(P,S),o(S,p),o(S,v),I&&I.m(S,null),o(P,w),o(P,i),o(i,Y),o(i,K),o(i,Z),o(i,he),o(i,se),o(i,ne),R=!0},p(k,[b]){(!R||b&4)&&c!==(c=k[2].extensionData.display+"")&&F(s,c),(!R||b&16)&&F(U,k[4]),(!R||b&8&&G!==(G=`width: ${k[3]}%`))&&u(H,"style",G),k[2].penaltyConfig.effects.length>0?I?(I.p(k,b),b&4&&B(I,1)):(I=Ie(k),I.c(),B(I,1),I.m(S,null)):I&&(ue(),A(I,1,1,()=>{I=null}),de()),(!R||b&4)&&N!==(N=k[2].penaltyData.current+"")&&F(Y,N),(!R||b&4)&&X!==(X=k[2].penaltyConfig.required+"")&&F(Z,X),(!R||b&2)&&te!==(te=k[1].what+"")&&F(se,te),(!R||b&4)&&le!==(le=k[2].penaltyConfig.required>0?"s":"")&&F(ne,le),(!R||b&1&&re!==(re=ve(`card-content flex flex-col space-y-[0.5em] ${k[0]?"w-[32em]":"w-full"}`)+" svelte-1fe1t23"))&&u(e,"class",re)},i(k){R||(B(I),R=!0)},o(k){A(I),R=!1},d(k){k&&h(e),I&&I.d()}}}function Ge(r,e,t){let{shouldHorizontal:l}=e,{lockID:a}=e,{extensionLookup:c}=e,{individualPenaltyData:s}=e;const f=`https://chaster.app/locks/${a}/extensions/${s.extensionData._id}`,n=c.key==="extended_wheel"?`Spin the wheel named '${s.penaltyConfig.display}'`:"";let d=s.penaltyData.current/s.penaltyConfig.required*100;d>100&&(d=100);let D="",E=setInterval(()=>{const g=new Date().getTime(),C=s.penaltyData.lastPenaltyMS+s.penaltyConfig.interval-g;t(4,D=C>0?Ue(Math.floor(C/1e3)):s.penaltyData.current>s.penaltyConfig.required?"Completed! Waiting for system...":"Too late! Waiting for system...")},200);return je(()=>{clearInterval(E)}),r.$$set=g=>{"shouldHorizontal"in g&&t(0,l=g.shouldHorizontal),"lockID"in g&&t(7,a=g.lockID),"extensionLookup"in g&&t(1,c=g.extensionLookup),"individualPenaltyData"in g&&t(2,s=g.individualPenaltyData)},[l,c,s,d,D,f,n,a]}class Xe extends Pe{constructor(e){super(),Me(this,e,Ge,Fe,Se,{shouldHorizontal:0,lockID:7,extensionLookup:1,individualPenaltyData:2})}}function Ee(r,e,t){const l=r.slice();l[11]=e[t];const a=l[6][l[11].extensionData.slug];return l[12]=a,l}function Ze(r){let e,t,l,a='<h4 class="mb-0">[🍓] Strawberria Penalties</h4> <span class="caption">Developer: <a href="https://chaster.app/user/strawberria" target="_blank">@strawberria</a></span>',c,s,f=`Extended penalty handling for all personally-developed extensions! <br/>
                    Now supporting extended lock effects and dynamic penalty interval with minute-level granularity!`,n,d,D,E,g,C,j,q,z,U,T,V,H,G,J,P,S=fe(r[5]),p=[];for(let v=0;v<S.length;v+=1)p[v]=Ce(Ee(r,S,v));const ae=v=>A(p[v],1,1,()=>{p[v]=null});return{c(){e=m("div"),t=m("div"),l=m("div"),l.innerHTML=a,c=M(),s=m("div"),s.innerHTML=f,n=M(),d=m("div"),D=m("i"),E=M(),g=m("h3"),C=x(r[2]),j=x(" / "),q=x(r[3]),z=x(" completed"),U=M(),T=m("div"),V=m("div"),G=M(),J=m("div");for(let v=0;v<p.length;v+=1)p[v].c();this.h()},l(v){e=_(v,"DIV",{class:!0});var w=y(e);t=_(w,"DIV",{class:!0});var i=y(t);l=_(i,"DIV",{class:!0,"data-svelte-h":!0}),pe(l)!=="svelte-1drm992"&&(l.innerHTML=a),c=L(i),s=_(i,"DIV",{class:!0,"data-svelte-h":!0}),pe(s)!=="svelte-18bx7mj"&&(s.innerHTML=f),n=L(i),d=_(i,"DIV",{class:!0});var N=y(d);D=_(N,"I",{class:!0}),y(D).forEach(h),E=L(N),g=_(N,"H3",{});var Y=y(g);C=O(Y,r[2]),j=O(Y," / "),q=O(Y,r[3]),z=O(Y," completed"),Y.forEach(h),N.forEach(h),U=L(i),T=_(i,"DIV",{class:!0});var K=y(T);V=_(K,"DIV",{role:!0,class:!0,style:!0}),y(V).forEach(h),K.forEach(h),i.forEach(h),G=L(w),J=_(w,"DIV",{class:!0});var X=y(J);for(let Z=0;Z<p.length;Z+=1)p[Z].l(X);X.forEach(h),w.forEach(h),this.h()},h(){u(l,"class","flex items-end justify-between mb-2"),W(l,"flex-row",r[8]),W(l,"flex-col",!r[8]),W(l,"space-x-1",r[8]),W(l,"items-end",r[8]),u(s,"class","caption mb-3"),u(D,"class","fal fa-tasks fa-2x"),u(d,"class","flex flex-row space-x-[0.5em]"),u(V,"role","progressbar"),u(V,"class","progress-bar"),u(V,"style",H=`width: ${r[4]}%;`),u(T,"class","progress"),u(t,"class","card-content svelte-17a10ne"),W(t,"card-wrapper-desktop",r[8]),u(J,"class","grid gap-[1.5em]"),W(J,"grid-cols-2",r[8]),W(J,"grid-cols-1",!r[8]),u(e,"class",ve(`flex flex-col space-y-[1.5em] ${r[8]?"w-[65.5em]":"w-full"}`)+" svelte-17a10ne")},m(v,w){ee(v,e,w),o(e,t),o(t,l),o(t,c),o(t,s),o(t,n),o(t,d),o(d,D),o(d,E),o(d,g),o(g,C),o(g,j),o(g,q),o(g,z),o(t,U),o(t,T),o(T,V),o(e,G),o(e,J);for(let i=0;i<p.length;i+=1)p[i]&&p[i].m(J,null);P=!0},p(v,w){if((!P||w&4)&&F(C,v[2]),(!P||w&8)&&F(q,v[3]),(!P||w&16&&H!==(H=`width: ${v[4]}%;`))&&u(V,"style",H),w&354){S=fe(v[5]);let i;for(i=0;i<S.length;i+=1){const N=Ee(v,S,i);p[i]?(p[i].p(N,w),B(p[i],1)):(p[i]=Ce(N),p[i].c(),B(p[i],1),p[i].m(J,null))}for(ue(),i=S.length;i<p.length;i+=1)ae(i);de()}},i(v){if(!P){for(let w=0;w<S.length;w+=1)B(p[w]);P=!0}},o(v){p=p.filter(Boolean);for(let w=0;w<p.length;w+=1)A(p[w]);P=!1},d(v){v&&h(e),Ve(p,v)}}}function Qe(r){let e,t,l,a,c,s;return{c(){e=m("div"),t=m("img"),a=M(),c=m("div"),s=x(r[0]),this.h()},l(f){e=_(f,"DIV",{class:!0});var n=y(e);t=_(n,"IMG",{src:!0,alt:!0}),a=L(n),c=_(n,"DIV",{class:!0});var d=y(c);s=O(d,r[0]),d.forEach(h),n.forEach(h),this.h()},h(){Je(t.src,l=Be)||u(t,"src",l),u(t,"alt","Chaster logo"),u(c,"class","mt-4 caption text-lg"),u(e,"class","w-full h-screen flex flex-col items-center justify-center")},m(f,n){ee(f,e,n),o(e,t),o(e,a),o(e,c),o(c,s)},p(f,n){n&1&&F(s,f[0])},i:De,o:De,d(f){f&&h(e)}}}function Ce(r){let e,t;return e=new Xe({props:{shouldHorizontal:r[8],lockID:r[1],extensionLookup:r[12],individualPenaltyData:r[11]}}),{c(){Le(e.$$.fragment)},l(l){Te(e.$$.fragment,l)},m(l,a){xe(e,l,a),t=!0},p(l,a){const c={};a&2&&(c.lockID=l[1]),a&32&&(c.extensionLookup=l[12]),a&32&&(c.individualPenaltyData=l[11]),e.$set(c)},i(l){t||(B(e.$$.fragment,l),t=!0)},o(l){A(e.$$.fragment,l),t=!1},d(l){Oe(e,l)}}}function We(r){let e,t,l,a;const c=[Qe,Ze],s=[];function f(n,d){return n[0]!==""?0:1}return t=f(r),l=s[t]=c[t](r),{c(){e=m("div"),l.c(),this.h()},l(n){e=_(n,"DIV",{class:!0});var d=y(e);l.l(d),d.forEach(h),this.h()},h(){u(e,"class","container-bg min-w-0 min-h-0 p-4 space-y-2 grow svelte-17a10ne")},m(n,d){ee(n,e,d),s[t].m(e,null),a=!0},p(n,[d]){let D=t;t=f(n),t===D?s[t].p(n,d):(ue(),A(s[D],1,1,()=>{s[D]=null}),de(),l=s[t],l?l.p(n,d):(l=s[t]=c[t](n),l.c()),B(l,1),l.m(e,null))},i(n){a||(B(l),a=!0)},o(n){A(l),a=!1},d(n){n&&h(e),s[t].d()}}}const Ke="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4",$e="https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/chaster_utilities";function et(r,e,t){let l;const a={"extended-wheel-of-fortune":{key:"extended_wheel",what:"spin"}};let c="Loading extension data...",s="",f=Ne([]);qe(r,f,j=>t(5,l=j));let n="",d="";ze(async()=>{d=window.location.hash.substring(1).split("?")[0];const j=window.location.search,q=new URLSearchParams(j);if(d!=="")s=JSON.parse(decodeURIComponent(d)).mainToken;else{const T=q.get("state");T!==null&&(s=JSON.parse(decodeURIComponent(T)).mainToken)}const z=await fetch($e,{method:"POST",headers:{Authorization:`Bearer ${Ke}`},body:JSON.stringify({action:"strawberria_penalties-page",mainToken:s})});if(z.status!==200)throw console.error(`Error retrieving session data: ${await z.text()}`),new Error("error retrieving session data");const U=await z.json();He(f,l=U.data,l),t(1,n=U.lockID),t(0,c="")});let D=0,E=1,g=0;f.subscribe(j=>{t(2,D=0),t(3,E=0);for(const q of j)t(2,D+=q.penaltyData.current>=q.penaltyConfig.required?1:0),t(3,E++,E);t(4,g=E===0?0:D/E*100)});let C=!/Mobi/i.test(window.navigator.userAgent);return[c,n,D,E,g,l,a,f,C]}class ct extends Pe{constructor(e){super(),Me(this,e,et,We,Se,{})}}export{ct as component,it as universal};
