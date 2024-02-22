import{s as z,n as E,e as R,o as V,h as P,r as A,i as L}from"../chunks/scheduler.803aa159.js";import{S as U,i as Y,g as h,h as _,j as b,f as d,k as g,a as w,s as C,B as N,c as J,C as k,x as v,F as x,z as D,m as B,n as X,o as q}from"../chunks/index.78bf47b2.js";import{w as F}from"../chunks/index.636016b2.js";import{c as G}from"../chunks/logo.09e82b80.js";const Z=!0,se=Object.freeze(Object.defineProperty({__proto__:null,prerender:Z},Symbol.toStringTag,{value:"Module"}));function H(c){let t,a,f="Updated JSON Configuration",s,e,n,o,l,p,m,T="Handlebar Text",S,u,O,I;return{c(){t=h("div"),a=h("div"),a.textContent=f,s=C(),e=h("textarea"),n=C(),o=h("hr"),l=C(),p=h("div"),m=h("div"),m.textContent=T,S=C(),u=h("textarea"),this.h()},l(r){t=_(r,"DIV",{class:!0});var i=b(t);a=_(i,"DIV",{"data-svelte-h":!0}),N(a)!=="svelte-mvtttl"&&(a.textContent=f),s=J(i),e=_(i,"TEXTAREA",{class:!0,rows:!0}),b(e).forEach(d),i.forEach(d),n=J(r),o=_(r,"HR",{}),l=J(r),p=_(r,"DIV",{class:!0});var y=b(p);m=_(y,"DIV",{"data-svelte-h":!0}),N(m)!=="svelte-vvi46a"&&(m.textContent=T),S=J(y),u=_(y,"TEXTAREA",{class:!0,rows:!0}),b(u).forEach(d),y.forEach(d),this.h()},h(){g(e,"class","form-control resize-none svelte-1pi0ai7"),g(e,"rows","6"),k(e,"text-invalid",c[3]),g(t,"class","space-y-[0.5em]"),g(u,"class","form-control resize-none"),g(u,"rows","2"),g(p,"class","space-y-[0.5em]")},m(r,i){w(r,t,i),v(t,a),v(t,s),v(t,e),x(e,c[0]),w(r,n,i),w(r,o,i),w(r,l,i),w(r,p,i),v(p,m),v(p,S),v(p,u),x(u,c[1]),O||(I=[D(e,"input",c[5]),D(u,"input",c[6])],O=!0)},p(r,i){i&1&&x(e,r[0]),i&8&&k(e,"text-invalid",r[3]),i&2&&x(u,r[1])},d(r){r&&(d(t),d(n),d(o),d(l),d(p)),O=!1,A(I)}}}function Q(c){let t,a,f,s,e,n;return{c(){t=h("div"),a=h("img"),s=C(),e=h("div"),n=B(c[2]),this.h()},l(o){t=_(o,"DIV",{class:!0});var l=b(t);a=_(l,"IMG",{src:!0,alt:!0}),s=J(l),e=_(l,"DIV",{class:!0});var p=b(e);n=X(p,c[2]),p.forEach(d),l.forEach(d),this.h()},h(){L(a.src,f=G)||g(a,"src",f),g(a,"alt","Chaster logo"),g(e,"class","mt-4 mb-3 caption text-lg"),g(t,"class","w-full h-screen flex flex-col items-center justify-center")},m(o,l){w(o,t,l),v(t,a),v(t,s),v(t,e),v(e,n)},p(o,l){l&4&&q(n,o[2])},d(o){o&&d(t)}}}function K(c){let t;function a(e,n){return e[2]!==""?Q:H}let f=a(c),s=f(c);return{c(){t=h("div"),s.c(),this.h()},l(e){t=_(e,"DIV",{class:!0});var n=b(t);s.l(n),n.forEach(d),this.h()},h(){g(t,"class","container-bg w-full h-screen pl-3 pr-3 svelte-1pi0ai7")},m(e,n){w(e,t,n),s.m(t,null)},p(e,[n]){f===(f=a(e))&&s?s.p(e,n):(s.d(1),s=f(e),s&&(s.c(),s.m(t,null)))},i:E,o:E,d(e){e&&d(t),s.d()}}}const j="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4",M="https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/chaster_utilities";function W(c,t,a){let f,s=F({});R(c,s,u=>a(9,f=u));let e="",n="",o="",l="Loading extension data...",p="";V(async()=>{p=window.location.hash.substring(1).split("?")[0];const u=window.location.search,O=new URLSearchParams(u);if(p!=="")o=JSON.parse(decodeURIComponent(p)).partnerConfigurationToken;else{const i=O.get("state");i!==null&&i!==""&&(o=JSON.parse(decodeURIComponent(i)).partnerConfigurationToken)}window.parent&&window.parent.postMessage(JSON.stringify({type:"partner_configuration",event:"capabilities",payload:{features:{save:!0}}}),"*"),window.addEventListener("message",async i=>{if(typeof i.data!="string")return;const y=JSON.parse(i.data);y.type==="chaster"&&y.event==="partner_configuration_save"&&(window.parent.postMessage(JSON.stringify({type:"partner_configuration",event:"save_loading"}),"*"),await fetch(M,{method:"POST",headers:{Authorization:`Bearer ${j}`},body:JSON.stringify({action:"config-update",config:{...f,handlebar:n},configToken:o})}),window.parent.postMessage(JSON.stringify({type:"partner_configuration",event:"save_success"}),"*"))}),a(2,l="Retrieving extension config...");const I=await fetch(M,{method:"POST",headers:{Authorization:`Bearer ${j}`},body:JSON.stringify({action:"config-get",configToken:o})});if(I.status!==200){console.error(`Error retrieving config data: ${await I.text()}`);return}const r=await I.json();a(1,n=r.handlebar??""),delete r.handlebar,s.set(r.config),a(0,e=JSON.stringify(f)),a(2,l="")});let m=!1;function T(){e=this.value,a(0,e)}function S(){n=this.value,a(1,n)}return c.$$.update=()=>{if(c.$$.dirty&1){a(3,m=!0);try{P(s,f=JSON.parse(e),f),a(3,m=!1)}catch{}}},[e,n,l,m,s,T,S]}class ne extends U{constructor(t){super(),Y(this,t,W,K,z,{})}}export{ne as component,se as universal};