import{s as Je,n as ae,o as Le,r as ze,f as Be}from"../chunks/scheduler.63274e7e.js";import{S as Pe,i as Ye,g as u,h as f,j as m,f as h,k as r,a as G,s as O,m as ie,y as Z,c as x,n as oe,l as ye,z as U,x as o,A as Ce,o as pe,B as Ve}from"../chunks/index.29189145.js";function le(l){return(l==null?void 0:l.length)!==void 0?l:Array.from(l)}const qe=!0,$e=Object.freeze(Object.defineProperty({__proto__:null,prerender:qe},Symbol.toStringTag,{value:"Module"})),Fe="/strawberria-extensions.github.io/_app/immutable/assets/logo.14185882.png";function ne(l,e){return Math.floor(Math.random()*(e-l))+l}function je(l,e=!1){const t={day:86400,hour:3600,minute:60};e&&(t.second=1);const s={};let n=l;for(const[v,_]of Object.entries(t)){const g=Math.floor(n/_);n-=g*_,s[v]=g}const d=[];for(const[v,_]of Object.entries(s))if(_!==0){const g=_>1?"s":"";d.push(`${_} ${v}${g}`)}let c=d.join(", ");const p=c.split(",").length-1;if(p!==0)if(p===1)c=c.replace(", "," and ");else{let v=c.split("").reverse().join("");v=v.replace(" ,"," dna ,"),c=v.split("").reverse().join("")}return c}function Ae(l,e,t){const s=l.slice();return s[13]=e[t],s[15]=t,s}function Me(l,e,t){const s=l.slice();return s[13]=e[t],s[15]=t,s}function He(l){let e,t,s,n,d="Roll the dice",c,p,v=`If you score lower than the bot, time will be added. If you do better, time will be removed.
                        <br/>
                        Though, upon first glance these dice seem somewhat... unnatural. Still feeling lucky?`,_,g,y,R,k,P,X,w,S="You",j,C,J,A,Q,re,z,me="The bot",ce,L,V,N,ge='<span aria-hidden="true">×</span> <span class="sr-only">Close alert</span>',de,Y,K,ue,q,M,fe,W,he,ve,_e,F=le({length:l[5][0]}),b=[];for(let a=0;a<F.length;a+=1)b[a]=Oe(Me(l,F,a));let H=le({length:l[5][1]}),I=[];for(let a=0;a<H.length;a+=1)I[a]=xe(Ae(l,H,a));let T=l[3]!==""&&Re(l);return{c(){e=u("div"),t=u("div"),s=u("div"),n=u("h4"),n.textContent=d,c=O(),p=u("p"),p.innerHTML=v,_=O(),g=u("div"),y=u("div"),R=u("div"),k=u("div");for(let a=0;a<b.length;a+=1)b[a].c();X=O(),w=u("div"),w.textContent=S,j=O(),C=u("div"),J=u("div"),A=u("div");for(let a=0;a<I.length;a+=1)I[a].c();re=O(),z=u("div"),z.textContent=me,ce=O(),L=u("div"),V=u("div"),N=u("button"),N.innerHTML=ge,de=O(),Y=u("span"),K=ie(l[2]),ue=O(),q=u("div"),M=u("button"),fe=ie("Roll the dice"),he=O(),T&&T.c(),this.h()},l(a){e=f(a,"DIV",{class:!0});var D=m(e);t=f(D,"DIV",{class:!0});var i=m(t);s=f(i,"DIV",{class:!0});var E=m(s);n=f(E,"H4",{"data-svelte-h":!0}),Z(n)!=="svelte-oq3r2j"&&(n.textContent=d),c=x(E),p=f(E,"P",{class:!0,"data-svelte-h":!0}),Z(p)!=="svelte-xkac9u"&&(p.innerHTML=v),_=x(E),g=f(E,"DIV",{class:!0});var $=m(g);y=f($,"DIV",{class:!0});var ee=m(y);R=f(ee,"DIV",{class:!0});var be=m(R);k=f(be,"DIV",{class:!0,"data-side":!0,id:!0,style:!0});var Ie=m(k);for(let B=0;B<b.length;B+=1)b[B].l(Ie);Ie.forEach(h),be.forEach(h),X=x(ee),w=f(ee,"DIV",{class:!0,"data-svelte-h":!0}),Z(w)!=="svelte-12bdzwm"&&(w.textContent=S),ee.forEach(h),j=x($),C=f($,"DIV",{class:!0});var te=m(C);J=f(te,"DIV",{class:!0});var De=m(J);A=f(De,"DIV",{class:!0,"data-side":!0,id:!0,style:!0});var we=m(A);for(let B=0;B<I.length;B+=1)I[B].l(we);we.forEach(h),De.forEach(h),re=x(te),z=f(te,"DIV",{class:!0,"data-svelte-h":!0}),Z(z)!=="svelte-1wc6ghh"&&(z.textContent=me),te.forEach(h),$.forEach(h),ce=x(E),L=f(E,"DIV",{class:!0});var Se=m(L);V=f(Se,"DIV",{role:!0,class:!0});var se=m(V);N=f(se,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),Z(N)!=="svelte-oelkob"&&(N.innerHTML=ge),de=x(se),Y=f(se,"SPAN",{id:!0});var Te=m(Y);K=oe(Te,l[2]),Te.forEach(h),se.forEach(h),Se.forEach(h),ue=x(E),q=f(E,"DIV",{class:!0});var Ee=m(q);M=f(Ee,"BUTTON",{type:!0,class:!0});var ke=m(M);fe=oe(ke,"Roll the dice"),ke.forEach(h),Ee.forEach(h),he=x(E),T&&T.l(E),E.forEach(h),i.forEach(h),D.forEach(h),this.h()},h(){r(p,"class","caption"),r(k,"class","dice"),r(k,"data-side",P=l[5][0]),r(k,"id","diceface-user"),ye(k,"background-color","#f7dcda"),r(R,"class","DiceFace"),r(w,"class","mt-2"),r(y,"class","dice-col"),r(A,"class","dice"),r(A,"data-side",Q=l[5][1]),r(A,"id","diceface-bot"),ye(A,"background-color","#f7dcda"),r(J,"class","DiceFace"),r(z,"class","mt-2"),r(C,"class","dice-col"),r(g,"class","dices w-full"),r(N,"type","button"),r(N,"class","close"),r(Y,"id","dice-alert-text"),r(V,"role","alert"),r(V,"class","alert alert-dismissible"),U(V,"alert-success",l[1]<=0),U(V,"alert-danger",l[1]>0),r(L,"class","mt-4 w-full"),U(L,"hidden",l[2]===""),r(M,"type","button"),r(M,"class","mb-2 btn btn-primary"),M.disabled=W=l[4]||l[3]!=="",r(q,"class","text-center"),r(s,"class","DiceExtension card-content flex flex-col items-center"),r(t,"class","dice-container"),r(e,"class","dice-container-row")},m(a,D){G(a,e,D),o(e,t),o(t,s),o(s,n),o(s,c),o(s,p),o(s,_),o(s,g),o(g,y),o(y,R),o(R,k);for(let i=0;i<b.length;i+=1)b[i]&&b[i].m(k,null);o(y,X),o(y,w),o(g,j),o(g,C),o(C,J),o(J,A);for(let i=0;i<I.length;i+=1)I[i]&&I[i].m(A,null);o(C,re),o(C,z),o(s,ce),o(s,L),o(L,V),o(V,N),o(V,de),o(V,Y),o(Y,K),o(s,ue),o(s,q),o(q,M),o(M,fe),o(s,he),T&&T.m(s,null),ve||(_e=[Ce(N,"click",l[7]),Ce(M,"click",l[6])],ve=!0)},p(a,D){if(D&32){F=le({length:a[5][0]});let i;for(i=0;i<F.length;i+=1){const E=Me(a,F,i);b[i]?b[i].p(E,D):(b[i]=Oe(),b[i].c(),b[i].m(k,null))}for(;i<b.length;i+=1)b[i].d(1);b.length=F.length}if(D&32&&P!==(P=a[5][0])&&r(k,"data-side",P),D&32){H=le({length:a[5][1]});let i;for(i=0;i<H.length;i+=1){const E=Ae(a,H,i);I[i]?I[i].p(E,D):(I[i]=xe(),I[i].c(),I[i].m(A,null))}for(;i<I.length;i+=1)I[i].d(1);I.length=H.length}D&32&&Q!==(Q=a[5][1])&&r(A,"data-side",Q),D&4&&pe(K,a[2]),D&2&&U(V,"alert-success",a[1]<=0),D&2&&U(V,"alert-danger",a[1]>0),D&4&&U(L,"hidden",a[2]===""),D&24&&W!==(W=a[4]||a[3]!=="")&&(M.disabled=W),a[3]!==""?T?T.p(a,D):(T=Re(a),T.c(),T.m(s,null)):T&&(T.d(1),T=null)},d(a){a&&h(e),Ve(b,a),Ve(I,a),T&&T.d(),ve=!1,ze(_e)}}}function Ue(l){let e,t,s,n,d,c;return{c(){e=u("div"),t=u("img"),n=O(),d=u("div"),c=ie(l[0]),this.h()},l(p){e=f(p,"DIV",{class:!0});var v=m(e);t=f(v,"IMG",{src:!0,alt:!0}),n=x(v),d=f(v,"DIV",{class:!0});var _=m(d);c=oe(_,l[0]),_.forEach(h),v.forEach(h),this.h()},h(){Be(t.src,s=Fe)||r(t,"src",s),r(t,"alt","Chaster logo"),r(d,"class","mt-4 caption text-lg"),r(e,"class","w-full h-screen flex flex-col items-center justify-center")},m(p,v){G(p,e,v),o(e,t),o(e,n),o(e,d),o(d,c)},p(p,v){v&1&&pe(c,p[0])},d(p){p&&h(e)}}}function Oe(l){let e;return{c(){e=u("span"),this.h()},l(t){e=f(t,"SPAN",{class:!0}),m(e).forEach(h),this.h()},h(){r(e,"class","dot")},m(t,s){G(t,e,s)},p:ae,d(t){t&&h(e)}}}function xe(l){let e;return{c(){e=u("span"),this.h()},l(t){e=f(t,"SPAN",{class:!0}),m(e).forEach(h),this.h()},h(){r(e,"class","dot")},m(t,s){G(t,e,s)},p:ae,d(t){t&&h(e)}}}function Re(l){let e,t;return{c(){e=u("div"),t=ie(l[3])},l(s){e=f(s,"DIV",{});var n=m(e);t=oe(n,l[3]),n.forEach(h)},m(s,n){G(s,e,n),o(e,t)},p(s,n){n&8&&pe(t,s[3])},d(s){s&&h(e)}}}function Ge(l){let e;function t(d,c){return d[0]!==""?Ue:He}let s=t(l),n=s(l);return{c(){e=u("div"),n.c(),this.h()},l(d){e=f(d,"DIV",{class:!0});var c=m(e);n.l(c),c.forEach(h),this.h()},h(){r(e,"class","container-bg w-full h-screen pl-4 pr-4 svelte-rp1h59")},m(d,c){G(d,e,c),n.m(e,null)},p(d,[c]){s===(s=t(d))&&n?n.p(d,c):(n.d(1),n=s(d),n&&(n.c(),n.m(e,null)))},i:ae,o:ae,d(d){d&&h(e),n.d()}}}const Ne="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4",Xe="https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/token-session-get",Ze="https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/weighted-runtime-roll";function Qe(l,e,t){let s="",n,d="Loading extension data...",c=0,p="",v="",_=!1,g=[ne(1,6),ne(1,6)];Le(async function(){const w=localStorage.getItem("weighted-dice_roll");w!==null&&t(5,g=w.split("").map(C=>parseInt(C)));const S=window.location.hash.substring(1);S!==""&&(s=JSON.parse(decodeURIComponent(S)).mainToken);const j=await fetch(Xe,{method:"POST",headers:{Authorization:`Bearer ${Ne}`},body:JSON.stringify({mainToken:s})});if(j.status!==200){console.error(`Error retrieving session data: ${await j.text()}`);return}n=await j.json(),n.regular.nextActionDate!==void 0&&n.role==="wearer"&&await k(),t(0,d="")});let y=-1;function R(w){const S=Math.floor(new Date().getTime()/1e3);if(S<=0)clearInterval(y),t(3,v=""),y=-1;else{const j=je(w-S,!0);t(3,v=`Next action in ${j}`)}}function k(){if(n.role!=="keyholder"&&n.regular.nextActionDate!==null&&y===-1){const w=Math.floor(new Date().getTime()/1e3),S=Math.floor(new Date(n.regular.nextActionDate).getTime()/1e3);w-S<0&&(R(S),y=setInterval(R,1e3,S))}}async function P(){t(4,_=!0);const w=setInterval(()=>{t(5,g=[ne(1,6),ne(1,6)])},100),S=await fetch(Ze,{method:"POST",headers:{Authorization:`Bearer ${Ne}`},body:JSON.stringify({mainToken:s})});if(S.status!==200){console.error(`Error rolling dice: ${await S.text()}`);return}const[j,C,J]=await S.json();clearInterval(w),t(5,g=j),t(1,c=C),t(2,p=c===0?"Draw!":(c>0?"Added ":"Removed ")+je(Math.abs(c))+"!"),n.role==="wearer"&&(n.regular.nextActionDate=J,k()),t(4,_=!1)}function X(){t(2,p="")}return[d,c,p,v,_,g,P,X]}class et extends Pe{constructor(e){super(),Ye(this,e,Qe,Ge,Je,{})}}export{et as component,$e as universal};