function k(){}function w(t,n){for(const e in n)t[e]=n[e];return t}function j(t){return t()}function F(){return Object.create(null)}function E(t){t.forEach(j)}function P(t){return typeof t=="function"}function S(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let i;function U(t,n){return t===n?!0:(i||(i=document.createElement("a")),i.href=n,t===i.href)}function A(t){return Object.keys(t).length===0}function q(t,...n){if(t==null){for(const r of n)r(void 0);return k}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function B(t,n,e){t.$$.on_destroy.push(q(n,e))}function C(t,n,e,r){if(t){const o=m(t,n,e,r);return t[0](o)}}function m(t,n,e,r){return t[1]&&r?w(e.ctx.slice(),t[1](r(n))):e.ctx}function D(t,n,e,r){if(t[2]&&r){const o=t[2](r(e));if(n.dirty===void 0)return o;if(typeof o=="object"){const a=[],_=Math.max(n.dirty.length,o.length);for(let s=0;s<_;s+=1)a[s]=n.dirty[s]|o[s];return a}return n.dirty|o}return n.dirty}function G(t,n,e,r,o,a){if(o){const _=m(n,e,r,a);t.p(_,o)}}function H(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let r=0;r<e;r++)n[r]=-1;return n}return-1}function I(t){return t??""}function J(t,n,e){return t.set(e),n}let f;function h(t){f=t}function y(){if(!f)throw new Error("Function called outside component initialization");return f}function K(t){y().$$.on_mount.push(t)}function L(t){y().$$.after_update.push(t)}const l=[],b=[];let c=[];const g=[],x=Promise.resolve();let p=!1;function v(){p||(p=!0,x.then(z))}function N(){return v(),x}function O(t){c.push(t)}const d=new Set;let u=0;function z(){if(u!==0)return;const t=f;do{try{for(;u<l.length;){const n=l[u];u++,h(n),M(n.$$)}}catch(n){throw l.length=0,u=0,n}for(h(null),l.length=0,u=0;b.length;)b.pop()();for(let n=0;n<c.length;n+=1){const e=c[n];d.has(e)||(d.add(e),e())}c.length=0}while(l.length);for(;g.length;)g.pop()();p=!1,d.clear(),h(t)}function M(t){if(t.fragment!==null){t.update(),E(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(O)}}function Q(t){const n=[],e=[];c.forEach(r=>t.indexOf(r)===-1?n.push(r):e.push(r)),e.forEach(r=>r()),c=n}export{L as a,b,C as c,D as d,B as e,O as f,H as g,J as h,U as i,I as j,F as k,z as l,P as m,k as n,K as o,A as p,Q as q,E as r,S as s,N as t,G as u,f as v,h as w,j as x,l as y,v as z};