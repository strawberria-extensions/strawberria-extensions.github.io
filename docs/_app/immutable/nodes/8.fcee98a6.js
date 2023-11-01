import{s as Ue,f as p,g as h,h as N,d as c,j as v,i as S,o as Ye,p as Ie,a as k,l as Z,F as Y,c as E,m as Q,k as A,G as Je,x as a,M as oe,C as ae,n as Fe,A as Ne,I as De,J as Ge,y as Pe}from"../chunks/scheduler.6e8049bc.js";import{S as We,i as Be,t as we,c as Ae,a as ye,g as Xe,b as Ze,d as Qe,m as He,e as Ke}from"../chunks/index.0fccc1b3.js";import{e as ue}from"../chunks/each.605e2745.js";import{b as Ce}from"../chunks/js-big-decimal.e03afb0d.js";import{D as $e}from"../chunks/DurationSelect.0ff5c362.js";import{c as et}from"../chunks/logo.0860a6a8.js";const tt=!0,ht=Object.freeze(Object.defineProperty({__proto__:null,prerender:tt},Symbol.toStringTag,{value:"Module"}));function Me(t,e,i){const r=t.slice();return r[20]=e[i],r[21]=e,r[22]=i,r}function ze(t,e,i){const r=t.slice();return r[20]=e[i],r[23]=e,r[24]=i,r}function nt(t){let e,i=`With every action, you and the bot roll a dice. \r
            If you do more than the bot, time is removed. \r
            If the bot does more, time is added.\r
            The dice outcome percentages are configurable and hidden to the wearer.`,r,I,u,f,d="Time multiplier",o,s,g="The difference between the two dice will be multiplied by this time.",O,j,y,L,J,G="Weighted Dice Outcomes",R,D,C="Configure the outcomes of your weighted dice",w,T,q,l,m,X="Wearer Loses",x,te,P,H,Ve="Wearer Wins",de,fe,ne,ie,F,se,Se="Difference =",pe,K,ke="0",he,U,_e,ve,B,re,le,me,Ee;y=new $e({props:{seconds:t[4],settings:{week:!0,day:!0,hour:!0,minute:!0,second:!0},buttons:!0}});let ge=ue([0,1,2,3,4]),M=[];for(let n=0;n<5;n+=1)M[n]=Le(ze(t,ge,n));let be=ue([6,7,8,9,10]),z=[];for(let n=0;n<5;n+=1)z[n]=Re(Me(t,be,n));return{c(){e=p("div"),e.textContent=i,r=k(),I=p("hr"),u=k(),f=p("div"),f.textContent=d,o=k(),s=p("div"),s.textContent=g,O=k(),j=p("div"),Ze(y.$$.fragment),L=k(),J=p("div"),J.textContent=G,R=k(),D=p("div"),D.textContent=C,w=k(),T=p("div"),q=p("div"),l=p("div"),m=p("p"),m.textContent=X,x=k();for(let n=0;n<5;n+=1)M[n].c();te=k(),P=p("div"),H=p("p"),H.textContent=Ve,de=k();for(let n=0;n<5;n+=1)z[n].c();fe=k(),ne=p("div"),ie=p("div"),F=p("div"),se=p("div"),se.textContent=Se,pe=k(),K=p("div"),K.textContent=ke,he=k(),U=p("input"),_e=Z(`\r
                        %`),ve=k(),B=p("p"),re=Z(t[3]),this.h()},l(n){e=h(n,"DIV",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-m7evyo"&&(e.textContent=i),r=E(n),I=h(n,"HR",{}),u=E(n),f=h(n,"DIV",{class:!0,"data-svelte-h":!0}),Y(f)!=="svelte-glcev8"&&(f.textContent=d),o=E(n),s=h(n,"DIV",{class:!0,"data-svelte-h":!0}),Y(s)!=="svelte-pc0ugj"&&(s.textContent=g),O=E(n),j=h(n,"DIV",{class:!0});var b=N(j);Qe(y.$$.fragment,b),b.forEach(c),L=E(n),J=h(n,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(J)!=="svelte-m8e1ps"&&(J.textContent=G),R=E(n),D=h(n,"DIV",{class:!0,"data-svelte-h":!0}),Y(D)!=="svelte-1lwj5p5"&&(D.textContent=C),w=E(n),T=h(n,"DIV",{class:!0});var V=N(T);q=h(V,"DIV",{style:!0});var _=N(q);l=h(_,"DIV",{style:!0,class:!0});var W=N(l);m=h(W,"P",{class:!0,"data-svelte-h":!0}),Y(m)!=="svelte-1bfqlgl"&&(m.textContent=X),x=E(W);for(let ee=0;ee<5;ee+=1)M[ee].l(W);W.forEach(c),te=E(_),P=h(_,"DIV",{style:!0,class:!0});var ce=N(P);H=h(ce,"P",{class:!0,"data-svelte-h":!0}),Y(H)!=="svelte-p4a4ss"&&(H.textContent=Ve),de=E(ce);for(let ee=0;ee<5;ee+=1)z[ee].l(ce);ce.forEach(c),_.forEach(c),fe=E(V),ne=h(V,"DIV",{class:!0});var Oe=N(ne);ie=h(Oe,"DIV",{style:!0});var je=N(ie);F=h(je,"DIV",{class:!0});var $=N(F);se=h($,"DIV",{"data-svelte-h":!0}),Y(se)!=="svelte-z0li4i"&&(se.textContent=Se),pe=E($),K=h($,"DIV",{class:!0,"data-svelte-h":!0}),Y(K)!=="svelte-kcnpjr"&&(K.textContent=ke),he=E($),U=h($,"INPUT",{class:!0,placeholder:!0}),_e=Q($,`\r
                        %`),$.forEach(c),je.forEach(c),Oe.forEach(c),ve=E(V),B=h(V,"P",{class:!0,style:!0});var Te=N(B);re=Q(Te,t[3]),Te.forEach(c),V.forEach(c),this.h()},h(){v(e,"class","caption"),v(f,"class","page-top"),v(s,"class","caption mb-2"),v(j,"class","d-flex justify-content-center"),v(J,"class","page-top"),A(J,"margin-top","1em"),v(D,"class","caption mb-2"),v(m,"class","dice-col-header"),A(l,"padding-right","1em"),A(l,"border-right","thin solid #a4a7b7"),v(l,"class","dice-config-col"),v(H,"class","dice-col-header"),A(P,"padding-left","1em"),v(P,"class","dice-config-col"),A(q,"display","flex"),A(q,"flex-direction","row"),A(q,"width","100%"),v(K,"class","dice-config-diffnum"),v(U,"class","dice-config-input form-control"),v(U,"placeholder","0"),v(F,"class","dice-config-row"),A(ie,"width","50%"),v(ne,"class","dice-config-draw"),v(B,"class","invalid"),A(B,"font-size","100%"),Je(B,"hidden",t[3]===""),v(T,"class","dice-config actions mb-4")},m(n,b){S(n,e,b),S(n,r,b),S(n,I,b),S(n,u,b),S(n,f,b),S(n,o,b),S(n,s,b),S(n,O,b),S(n,j,b),He(y,j,null),S(n,L,b),S(n,J,b),S(n,R,b),S(n,D,b),S(n,w,b),S(n,T,b),a(T,q),a(q,l),a(l,m),a(l,x);for(let V=0;V<5;V+=1)M[V]&&M[V].m(l,null);a(q,te),a(q,P),a(P,H),a(P,de);for(let V=0;V<5;V+=1)z[V]&&z[V].m(P,null);a(T,fe),a(T,ne),a(ne,ie),a(ie,F),a(F,se),a(F,pe),a(F,K),a(F,he),a(F,U),oe(U,t[1][5]),t[14](U),a(F,_e),a(T,ve),a(T,B),a(B,re),le=!0,me||(Ee=[ae(U,"input",t[13]),ae(U,"input",t[15])],me=!0)},p(n,b){const V={};if(b&16&&(V.seconds=n[4]),y.$set(V),b&102){ge=ue([0,1,2,3,4]);let _;for(_=0;_<5;_+=1){const W=ze(n,ge,_);M[_]?M[_].p(W,b):(M[_]=Le(W),M[_].c(),M[_].m(l,null))}for(;_<5;_+=1)M[_].d(1)}if(b&102){be=ue([6,7,8,9,10]);let _;for(_=0;_<5;_+=1){const W=Me(n,be,_);z[_]?z[_].p(W,b):(z[_]=Re(W),z[_].c(),z[_].m(P,null))}for(;_<5;_+=1)z[_].d(1)}b&2&&U.value!==n[1][5]&&oe(U,n[1][5]),(!le||b&8)&&Fe(re,n[3]),(!le||b&8)&&Je(B,"hidden",n[3]==="")},i(n){le||(ye(y.$$.fragment,n),le=!0)},o(n){we(y.$$.fragment,n),le=!1},d(n){n&&(c(e),c(r),c(I),c(u),c(f),c(o),c(s),c(O),c(j),c(L),c(J),c(R),c(D),c(w),c(T)),Ke(y),Ne(M,n),Ne(z,n),t[14](null),me=!1,De(Ee)}}}function it(t){let e,i,r,I,u,f;return{c(){e=p("div"),i=p("img"),I=k(),u=p("div"),f=Z(t[0]),this.h()},l(d){e=h(d,"DIV",{class:!0});var o=N(e);i=h(o,"IMG",{src:!0,alt:!0}),I=E(o),u=h(o,"DIV",{class:!0});var s=N(u);f=Q(s,t[0]),s.forEach(c),o.forEach(c),this.h()},h(){Ge(i.src,r=et)||v(i,"src",r),v(i,"alt","Chaster logo"),v(u,"class","mt-4 caption text-lg"),v(e,"class","w-full h-full flex flex-col items-center justify-center")},m(d,o){S(d,e,o),a(e,i),a(e,I),a(e,u),a(u,f)},p(d,o){o&1&&Fe(f,d[0])},i:Pe,o:Pe,d(d){d&&c(e)}}}function Le(t){let e,i,r="Difference =",I,u,f=t[5][t[20]]+"",d,o,s,g=t[20],O,j,y;function L(){t[7].call(s,t[20])}const J=()=>t[8](s,g),G=()=>t[8](null,g);function R(){return t[9](t[20])}return{c(){e=p("div"),i=p("div"),i.textContent=r,I=k(),u=p("div"),d=Z(f),o=k(),s=p("input"),O=Z(`\r
                            %\r
                        `),this.h()},l(D){e=h(D,"DIV",{class:!0});var C=N(e);i=h(C,"DIV",{"data-svelte-h":!0}),Y(i)!=="svelte-z0li4i"&&(i.textContent=r),I=E(C),u=h(C,"DIV",{class:!0});var w=N(u);d=Q(w,f),w.forEach(c),o=E(C),s=h(C,"INPUT",{class:!0,placeholder:!0}),O=Q(C,`\r
                            %\r
                        `),C.forEach(c),this.h()},h(){v(u,"class","dice-config-diffnum"),v(s,"class","dice-config-input form-control"),v(s,"placeholder","0"),v(e,"class","dice-config-row")},m(D,C){S(D,e,C),a(e,i),a(e,I),a(e,u),a(u,d),a(e,o),a(e,s),oe(s,t[1][t[20]]),J(),a(e,O),j||(y=[ae(s,"input",L),ae(s,"input",R)],j=!0)},p(D,C){t=D,C&2&&s.value!==t[1][t[20]]&&oe(s,t[1][t[20]]),g!==t[20]&&(G(),g=t[20],J())},d(D){D&&c(e),G(),j=!1,De(y)}}}function Re(t){let e,i,r="Difference =",I,u,f,d=t[5][t[20]]+"",o,s,g,O=t[20],j,y,L;function J(){t[10].call(g,t[20])}const G=()=>t[11](g,O),R=()=>t[11](null,O);function D(){return t[12](t[20])}return{c(){e=p("div"),i=p("div"),i.textContent=r,I=k(),u=p("div"),f=Z("+"),o=Z(d),s=k(),g=p("input"),j=Z(`\r
                            %\r
                        `),this.h()},l(C){e=h(C,"DIV",{class:!0});var w=N(e);i=h(w,"DIV",{"data-svelte-h":!0}),Y(i)!=="svelte-z0li4i"&&(i.textContent=r),I=E(w),u=h(w,"DIV",{class:!0});var T=N(u);f=Q(T,"+"),o=Q(T,d),T.forEach(c),s=E(w),g=h(w,"INPUT",{class:!0,placeholder:!0}),j=Q(w,`\r
                            %\r
                        `),w.forEach(c),this.h()},h(){v(u,"class","dice-config-diffnum"),v(g,"class","dice-config-input form-control"),v(g,"placeholder","0"),v(e,"class","dice-config-row")},m(C,w){S(C,e,w),a(e,i),a(e,I),a(e,u),a(u,f),a(u,o),a(e,s),a(e,g),oe(g,t[1][t[20]]),G(),a(e,j),y||(L=[ae(g,"input",J),ae(g,"input",D)],y=!0)},p(C,w){t=C,w&2&&g.value!==t[1][t[20]]&&oe(g,t[1][t[20]]),O!==t[20]&&(R(),O=t[20],G())},d(C){C&&c(e),R(),y=!1,De(L)}}}function st(t){let e,i,r,I;const u=[it,nt],f=[];function d(o,s){return o[0]!==""?0:1}return i=d(t),r=f[i]=u[i](t),{c(){e=p("div"),r.c(),this.h()},l(o){e=h(o,"DIV",{class:!0});var s=N(e);r.l(s),s.forEach(c),this.h()},h(){v(e,"class","container-bg w-full h-screen pl-3 pr-3 svelte-43el3z")},m(o,s){S(o,e,s),f[i].m(e,null),I=!0},p(o,[s]){let g=i;i=d(o),i===g?f[i].p(o,s):(Xe(),we(f[g],1,1,()=>{f[g]=null}),Ae(),r=f[i],r?r.p(o,s):(r=f[i]=u[i](o),r.c()),ye(r,1),r.m(e,null))},i(o){I||(ye(r),I=!0)},o(o){we(r),I=!1},d(o){o&&c(e),f[i].d()}}}const qe="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4",lt="https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/weighted-config-get",ot="https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/weighted-config-put";function xe(t){if(t=="")return!0;if(t.match(/^[0-9\.]+$/)===null)return!1;const e=parseFloat(t);return!(isNaN(e)||e<0||e>100)}function at(t,e,i){const r=[-1,-2,-3,-4,-5,0,1,2,3,4,5];let I="",u,f="Loading extension data...",d=["","","","","","","","","","",""],o=["","","","","","","","","","",""],s=[],g="",O=3600;Ye(async function(){const l=window.location.hash.substring(1);l!==""&&(I=JSON.parse(decodeURIComponent(l)).partnerConfigurationToken),window.parent&&window.parent.postMessage(JSON.stringify({type:"partner_configuration",event:"capabilities",payload:{features:{save:!0}}}),"*"),window.addEventListener("message",async x=>{if(typeof x.data!="string")return;const te=JSON.parse(x.data);te.type==="chaster"&&te.event==="partner_configuration_save"&&(window.parent.postMessage(JSON.stringify({type:"partner_configuration",event:"save_loading"}),"*"),await fetch(ot,{method:"POST",headers:{Authorization:`Bearer ${qe}`},body:JSON.stringify({configurationToken:I,config:{chances:d.map(P=>parseFloat(P)),multiplier:O}})}),window.parent.postMessage(JSON.stringify({type:"partner_configuration",event:"save_success"}),"*"))});const m=await fetch(lt,{method:"POST",headers:{Authorization:`Bearer ${qe}`},body:JSON.stringify({configurationToken:I})});if(m.status!==200){console.error(`Error retrieving extension configuration: ${await m.text()}`);return}const X=await m.json();delete X.multiplierText,u=X,i(1,d=u.chances.map(x=>`${x}`)),o=u.chances.map(x=>`${x}`),i(4,O=u.multiplier),i(0,f="")});function j(){let l=new Ce(0);for(const m of d)xe(m)===!0&&(l=l.add(new Ce(m)));Ce.compareTo(l.getValue(),"100")!==0?i(3,g=`Invalid total percentage, got ${l.getValue()}% but expected 100%`):i(3,g="")}function y(l){const m=s[l],X=m.value;xe(X)===!0?(o[l]=X,m.oldSelectionStart=m.selectionStart,m.oldSelectionEnd=m.selectionEnd):(m.value=o[l],i(1,d[l]=m.value,d),i(1,d),m.setSelectionRange(m.oldSelectionStart,m.oldSelectionEnd)),j()}function L(l){d[l]=this.value,i(1,d)}function J(l,m){Ie[l?"unshift":"push"](()=>{s[m]=l,i(2,s)})}const G=l=>{y(l)};function R(l){d[l]=this.value,i(1,d)}function D(l,m){Ie[l?"unshift":"push"](()=>{s[m]=l,i(2,s)})}const C=l=>{y(l)};function w(){d[5]=this.value,i(1,d)}function T(l){Ie[l?"unshift":"push"](()=>{s[5]=l,i(2,s)})}return[f,d,s,g,O,r,y,L,J,G,R,D,C,w,T,()=>{y(5)}]}class _t extends We{constructor(e){super(),Be(this,e,at,st,Ue,{})}}export{_t as component,ht as universal};
