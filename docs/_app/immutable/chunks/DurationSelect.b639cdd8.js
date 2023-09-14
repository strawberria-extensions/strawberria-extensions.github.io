import{s as lt,f as P,g as F,h as R,d as D,j as A,i as B,x as S,y as Q,I as rt,e as X,a as C,l as W,C as q,c as T,m as G,E as U,B as x,n as $,N as st}from"./scheduler.1e450469.js";import{e as b}from"./each.9e037287.js";import{S as ot,i as nt}from"./index.1b62e736.js";var it=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ft(p){return p&&p.__esModule&&Object.prototype.hasOwnProperty.call(p,"default")?p.default:p}var at={exports:{}};(function(p,y){(function(_,E){p.exports=E()})(it,function(){return function(){var d={165:function(O,i){Object.defineProperty(i,"__esModule",{value:!0}),i.abs=void 0;function u(v){return(typeof v=="number"||typeof v=="bigint")&&(v=v.toString()),v[0]=="-"?v.substring(1):v}i.abs=u},217:function(O,i){Object.defineProperty(i,"__esModule",{value:!0}),i.pad=i.trim=i.add=void 0;function u(l,o){var f;o===void 0&&(o="0");var n=0,g=-1;l[0]=="-"&&(l=l.substring(1),s(l)||(n++,g=1,l.length)),o[0]=="-"&&(o=o.substring(1),s(o)||(n++,g=2,o.length)),l=w(l),o=w(o),f=r(w(l),w(o)),l=f[0],o=f[1],n==1&&(g===1?l=v(l):g===2&&(o=v(o)));var e=a(l,o);return n?n==2?"-"+w(e):l.length<e.length?w(e.substring(1)):"-"+w(v(e)):w(e)}i.add=u;function v(l){if(s(l))return l;for(var o="",f=l.length,n=l.split(".")[1],g=n?n.length:0,e=0;e<f;e++)l[e]>="0"&&l[e]<="9"?o+=9-parseInt(l[e]):o+=l[e];var t=g>0?"0."+new Array(g).join("0")+"1":"1";return a(o,t)}function w(l){var o=l.split(".");for(o[0]||(o[0]="0");o[0][0]=="0"&&o[0].length>1;)o[0]=o[0].substring(1);return o[0]+(o[1]?"."+o[1]:"")}i.trim=w;function r(l,o){var f=l.split("."),n=o.split("."),g=f[0].length,e=n[0].length;return g>e?n[0]=new Array(Math.abs(g-e)+1).join("0")+(n[0]?n[0]:""):f[0]=new Array(Math.abs(g-e)+1).join("0")+(f[0]?f[0]:""),g=f[1]?f[1].length:0,e=n[1]?n[1].length:0,(g||e)&&(g>e?n[1]=(n[1]?n[1]:"")+new Array(Math.abs(g-e)+1).join("0"):f[1]=(f[1]?f[1]:"")+new Array(Math.abs(g-e)+1).join("0")),l=f[0]+(f[1]?"."+f[1]:""),o=n[0]+(n[1]?"."+n[1]:""),[l,o]}i.pad=r;function a(l,o){var f;f=r(l,o),l=f[0],o=f[1];for(var n="",g=0,e=l.length-1;e>=0;e--){if(l[e]==="."){n="."+n;continue}var t=parseInt(l[e])+parseInt(o[e])+g;n=t%10+n,g=Math.floor(t/10)}return g?g.toString()+n:n}function s(l){return/^0[0]*[.]{0,1}[0]*$/.test(l)}},423:function(O,i,u){var v=u(217),w=u(165),r=u(350),a=u(182),s=u(415),l=u(213),o=u(664),f=u(26),n=u(916),g=function(){function e(t){t===void 0&&(t="0"),this.value=e.validate(t)}return e.validate=function(t){if(t){if(t=t.toString(),isNaN(t))throw Error("Parameter is not a number: "+t);t[0]=="+"&&(t=t.substring(1))}else t="0";if(t.startsWith(".")?t="0"+t:t.startsWith("-.")&&(t="-0"+t.substr(1)),/e/i.test(t)){var c=t.split(/[eE]/),h=c[0],N=c[1];h=(0,v.trim)(h);var M="";h[0]=="-"&&(M="-",h=h.substring(1)),h.indexOf(".")>=0?(N=parseInt(N)+h.indexOf("."),h=h.replace(".","")):N=parseInt(N)+h.length,h.length<N?t=M+h+new Array(N-h.length+1).join("0"):h.length>=N&&N>0?t=M+(0,v.trim)(h.substring(0,N))+(h.length>N?"."+h.substring(N):""):t=M+"0."+new Array(-N+1).join("0")+h}return t},e.prototype.getValue=function(){return this.value},e.prototype.setValue=function(t){this.value=e.validate(t)},e.getPrettyValue=function(t,c,h){if(!(c||h))c=3,h=",";else if(!(c&&h))throw Error("Illegal Arguments. Should pass both digits and separator or pass none");t=e.validate(t);var N=t.charAt(0)=="-";N&&(t=t.substring(1));var M=t.indexOf(".");M=M>0?M:t.length;for(var j="",V=M;V>0;)V<c?(c=V,V=0):V-=c,j=t.substring(V,V+c)+(V<M-c&&V>=0?h:"")+j;return(N?"-":"")+j+t.substring(M)},e.prototype.getPrettyValue=function(t,c){return e.getPrettyValue(this.value,t,c)},e.round=function(t,c,h){if(c===void 0&&(c=0),h===void 0&&(h=n.RoundingModes.HALF_EVEN),t=e.validate(t),isNaN(c))throw Error("Precision is not a number: "+c);return(0,r.roundOff)(t,c,h)},e.prototype.round=function(t,c){if(t===void 0&&(t=0),c===void 0&&(c=n.RoundingModes.HALF_EVEN),isNaN(t))throw Error("Precision is not a number: "+t);return new e((0,r.roundOff)(this.value,t,c))},e.abs=function(t){return t=e.validate(t),(0,w.abs)(t)},e.prototype.abs=function(){return new e((0,w.abs)(this.value))},e.floor=function(t){return t=e.validate(t),t.indexOf(".")===-1?t:e.round(t,0,n.RoundingModes.FLOOR)},e.prototype.floor=function(){return this.value.indexOf(".")===-1?new e(this.value):new e(this.value).round(0,n.RoundingModes.FLOOR)},e.ceil=function(t){return t=e.validate(t),t.indexOf(".")===-1?t:e.round(t,0,n.RoundingModes.CEILING)},e.prototype.ceil=function(){return this.value.indexOf(".")===-1?new e(this.value):new e(this.value).round(0,n.RoundingModes.CEILING)},e.add=function(t,c){return t=e.validate(t),c=e.validate(c),(0,v.add)(t,c)},e.prototype.add=function(t){return new e((0,v.add)(this.value,t.getValue()))},e.subtract=function(t,c){return t=e.validate(t),c=e.validate(c),(0,f.subtract)(t,c)},e.prototype.subtract=function(t){return new e((0,f.subtract)(this.value,t.getValue()))},e.multiply=function(t,c){return t=e.validate(t),c=e.validate(c),(0,a.multiply)(t,c)},e.prototype.multiply=function(t){return new e((0,a.multiply)(this.value,t.getValue()))},e.divide=function(t,c,h){return t=e.validate(t),c=e.validate(c),(0,s.divide)(t,c,h)},e.prototype.divide=function(t,c){return new e((0,s.divide)(this.value,t.getValue(),c))},e.modulus=function(t,c){return t=e.validate(t),c=e.validate(c),(0,l.modulus)(t,c)},e.prototype.modulus=function(t){return new e((0,l.modulus)(this.value,t.getValue()))},e.compareTo=function(t,c){return t=e.validate(t),c=e.validate(c),(0,o.compareTo)(t,c)},e.prototype.compareTo=function(t){return(0,o.compareTo)(this.value,t.getValue())},e.negate=function(t){return t=e.validate(t),(0,f.negate)(t)},e.prototype.negate=function(){return new e((0,f.negate)(this.value))},e.RoundingModes=n.RoundingModes,e}();O.exports=g},664:function(O,i,u){Object.defineProperty(i,"__esModule",{value:!0}),i.compareTo=void 0;var v=u(217);function w(r,a){var s,l=!1;if(r[0]=="-"&&a[0]!="-")return-1;if(r[0]!="-"&&a[0]=="-")return 1;if(r[0]=="-"&&a[0]=="-"&&(r=r.substr(1),a=a.substr(1),l=!0),s=(0,v.pad)(r,a),r=s[0],a=s[1],r.localeCompare(a)==0)return 0;for(var o=0;o<r.length;o++)if(r[o]!=a[o])return r[o]>a[o]?l?-1:1:l?1:-1;return 0}i.compareTo=w},415:function(O,i,u){Object.defineProperty(i,"__esModule",{value:!0}),i.divide=void 0;var v=u(217),w=u(350);function r(a,s,l){if(l===void 0&&(l=8),s==0)throw new Error("Cannot divide by 0");if(a=a.toString(),s=s.toString(),a=a.replace(/(\.\d*?[1-9])0+$/g,"$1").replace(/\.0+$/,""),s=s.replace(/(\.\d*?[1-9])0+$/g,"$1").replace(/\.0+$/,""),a==0)return"0";var o=0;s[0]=="-"&&(s=s.substring(1),o++),a[0]=="-"&&(a=a.substring(1),o++);var f=s.indexOf(".")>0?s.length-s.indexOf(".")-1:-1;if(s=(0,v.trim)(s.replace(".","")),f>=0){var n=a.indexOf(".")>0?a.length-a.indexOf(".")-1:-1;if(n==-1)a=(0,v.trim)(a+new Array(f+1).join("0"));else if(f>n)a=a.replace(".",""),a=(0,v.trim)(a+new Array(f-n+1).join("0"));else if(f<n){a=a.replace(".","");var g=a.length-n+f;a=(0,v.trim)(a.substring(0,g)+"."+a.substring(g))}else f==n&&(a=(0,v.trim)(a.replace(".","")))}var e=0,t=s.length,c="",h=a.indexOf(".")>-1&&a.indexOf(".")<t?a.substring(0,t+1):a.substring(0,t);if(a=a.indexOf(".")>-1&&a.indexOf(".")<t?a.substring(t+1):a.substring(t),h.indexOf(".")>-1){var N=h.length-h.indexOf(".")-1;h=h.replace(".",""),t>h.length&&(N+=t-h.length,h=h+new Array(t-h.length+1).join("0")),e=N,c="0."+new Array(N).join("0")}for(l=l+2;e<=l;){for(var M=0;parseInt(h)>=parseInt(s);)h=(0,v.add)(h,"-"+s),M++;c+=M,a?(a[0]=="."&&(c+=".",e++,a=a.substring(1)),h=h+a.substring(0,1),a=a.substring(1)):(e||(c+="."),e++,h=h+"0")}return(o==1?"-":"")+(0,v.trim)((0,w.roundOff)(c,l-2))}i.divide=r},213:function(O,i,u){Object.defineProperty(i,"__esModule",{value:!0}),i.modulus=void 0;var v=u(415),w=u(350),r=u(182),a=u(26),s=u(916);function l(f,n){if(n==0)throw new Error("Cannot divide by 0");f=f.toString(),n=n.toString(),o(f),o(n);var g="";f[0]=="-"&&(g="-",f=f.substr(1)),n[0]=="-"&&(n=n.substr(1));var e=(0,a.subtract)(f,(0,r.multiply)(n,(0,w.roundOff)((0,v.divide)(f,n),0,s.RoundingModes.FLOOR)));return g+e}i.modulus=l;function o(f){if(f.indexOf(".")!=-1)throw new Error("Modulus of non-integers not supported")}},182:function(O,i){Object.defineProperty(i,"__esModule",{value:!0}),i.multiply=void 0;function u(r,a){r=r.toString(),a=a.toString();var s=0;r[0]=="-"&&(s++,r=r.substr(1)),a[0]=="-"&&(s++,a=a.substr(1)),r=w(r),a=w(a);var l=0,o=0;r.indexOf(".")!=-1&&(l=r.length-r.indexOf(".")-1),a.indexOf(".")!=-1&&(o=a.length-a.indexOf(".")-1);var f=l+o;if(r=w(r.replace(".","")),a=w(a.replace(".","")),r.length<a.length){var n=r;r=a,a=n}if(a=="0")return"0";for(var g=a.length,e=0,t=[],c=g-1,h="",N=0;N<g;N++)t[N]=r.length-1;for(var N=0;N<2*r.length;N++){for(var M=0,j=a.length-1;j>=c&&j>=0;j--)t[j]>-1&&t[j]<r.length&&(M+=parseInt(r[t[j]--])*parseInt(a[j]));M+=e,e=Math.floor(M/10),h=M%10+h,c--}return h=w(v(h,f)),s==1&&(h="-"+h),h}i.multiply=u;function v(r,a){return a==0?r:(r=a>=r.length?new Array(a-r.length+1).join("0")+r:r,r.substr(0,r.length-a)+"."+r.substr(r.length-a,a))}function w(r){for(;r[0]=="0";)r=r.substr(1);if(r.indexOf(".")!=-1)for(;r[r.length-1]=="0";)r=r.substr(0,r.length-1);return r==""||r=="."?r="0":r[r.length-1]=="."&&(r=r.substr(0,r.length-1)),r[0]=="."&&(r="0"+r),r}},350:function(O,i,u){Object.defineProperty(i,"__esModule",{value:!0}),i.roundOff=void 0;var v=u(916);function w(s,l,o){if(l===void 0&&(l=0),o===void 0&&(o=v.RoundingModes.HALF_EVEN),o===v.RoundingModes.UNNECESSARY)throw new Error("UNNECESSARY Rounding Mode has not yet been implemented");(typeof s=="number"||typeof s=="bigint")&&(s=s.toString());var f=!1;s[0]==="-"&&(f=!0,s=s.substring(1));var n=s.split("."),g=n[0],e=n[1];if(l<0){if(l=-l,g.length<=l)return"0";var t=g.substr(0,g.length-l);return s=t+"."+g.substr(g.length-l)+e,t=w(s,0,o),(f?"-":"")+t+new Array(l+1).join("0")}if(l==0)return g.length,r(n[1],g,f,o)&&(g=a(g)),(f&&parseInt(g)?"-":"")+g;if(n[1]){if(n[1].length<l)return(f?"-":"")+g+"."+n[1]+new Array(l-n[1].length+1).join("0")}else return(f?"-":"")+g+"."+new Array(l+1).join("0");e=n[1].substring(0,l);var c=n[1].substring(l);return c&&r(c,e,f,o)&&(e=a(e),e.length>l)?(f?"-":"")+a(g,parseInt(e[0]))+"."+e.substring(1):(f&&(parseInt(g)||parseInt(e))?"-":"")+g+"."+e}i.roundOff=w;function r(s,l,o,f){if(!s||s===new Array(s.length+1).join("0")||f===v.RoundingModes.DOWN||!o&&f===v.RoundingModes.FLOOR||o&&f===v.RoundingModes.CEILING)return!1;if(f===v.RoundingModes.UP||o&&f===v.RoundingModes.FLOOR||!o&&f===v.RoundingModes.CEILING)return!0;var n="5"+new Array(s.length).join("0");if(s>n)return!0;if(s<n)return!1;switch(f){case v.RoundingModes.HALF_DOWN:return!1;case v.RoundingModes.HALF_UP:return!0;case v.RoundingModes.HALF_EVEN:default:return parseInt(l[l.length-1])%2==1}}function a(s,l){l===void 0&&(l=0),l||(l=1),typeof s=="number"&&s.toString();for(var o=s.length-1,f="",n=o;n>=0;n--){var g=parseInt(s[n])+l;g==10?(l=1,g=0):l=0,f+=g}return l&&(f+=l),f.split("").reverse().join("")}},916:function(O,i){Object.defineProperty(i,"__esModule",{value:!0}),i.RoundingModes=void 0,function(u){u[u.CEILING=0]="CEILING",u[u.DOWN=1]="DOWN",u[u.FLOOR=2]="FLOOR",u[u.HALF_DOWN=3]="HALF_DOWN",u[u.HALF_EVEN=4]="HALF_EVEN",u[u.HALF_UP=5]="HALF_UP",u[u.UNNECESSARY=6]="UNNECESSARY",u[u.UP=7]="UP"}(i.RoundingModes||(i.RoundingModes={}))},26:function(O,i,u){Object.defineProperty(i,"__esModule",{value:!0}),i.negate=i.subtract=void 0;var v=u(217);function w(a,s){return a=a.toString(),s=s.toString(),s=r(s),(0,v.add)(a,s)}i.subtract=w;function r(a){return a[0]=="-"?a=a.substr(1):a="-"+a,a}i.negate=r}},_={};function E(O){var i=_[O];if(i!==void 0)return i.exports;var u=_[O]={exports:{}};return d[O](u,u.exports,E),u.exports}var I=E(423);return I}()})})(at);var ut=at.exports;const _t=ft(ut);function m(p,y,d){const _=p.slice();_[10]=y[d];const E=_[2][_[10]];_[11]=E;const I=_[4][_[10]];return _[12]=I,_}function tt(p){let y,d,_,E='<i class="fal fa-plus-circle"></i>',I,O,i,u=p[11].tens+"",v,w,r,a=p[11].ones+"",s,l,o,f=p[10]+"",n,g,e,t,c='<i class="fal fa-minus-circle"></i>',h,N,M;function j(){return p[8](p[12])}function V(){return p[9](p[12])}return{c(){y=P("div"),d=P("button"),_=P("div"),_.innerHTML=E,I=C(),O=P("div"),i=P("div"),v=W(u),w=C(),r=P("div"),s=W(a),l=C(),o=P("div"),n=W(f),g=C(),e=P("button"),t=P("div"),t.innerHTML=c,h=C(),this.h()},l(k){y=F(k,"DIV",{class:!0});var L=R(y);d=F(L,"BUTTON",{role:!0,"aria-label":!0,type:!0,class:!0});var J=R(d);_=F(J,"DIV",{class:!0,"data-svelte-h":!0}),q(_)!=="svelte-jfm9wh"&&(_.innerHTML=E),J.forEach(D),I=T(L),O=F(L,"DIV",{class:!0});var H=R(O);i=F(H,"DIV",{class:!0});var Y=R(i);v=G(Y,u),Y.forEach(D),w=T(H),r=F(H,"DIV",{class:!0});var z=R(r);s=G(z,a),z.forEach(D),H.forEach(D),l=T(L),o=F(L,"DIV",{class:!0});var Z=R(o);n=G(Z,f),Z.forEach(D),g=T(L),e=F(L,"BUTTON",{role:!0,"aria-label":!0,type:!0,class:!0});var K=R(e);t=F(K,"DIV",{class:!0,"data-svelte-h":!0}),q(t)!=="svelte-140olmr"&&(t.innerHTML=c),K.forEach(D),h=T(L),L.forEach(D),this.h()},h(){A(_,"class","duration-btn duration-plus"),A(d,"role","presentation"),A(d,"aria-label",`Add ${p[10]}`),A(d,"type","button"),A(d,"class","sc-ikJzcn fJNrxx"),U(d,"hidden",p[1]===!1),A(i,"class","duration-digit"),A(r,"class","duration-digit"),A(O,"class","duration-digits"),A(o,"class","duration-label"),A(t,"class","duration-btn duration-minus"),A(e,"role","presentation"),A(e,"aria-label",`Remove ${p[10]}`),A(e,"type","button"),A(e,"class","sc-ikJzcn fJNrxx"),U(e,"hidden",p[1]===!1),A(y,"class","DurationSelectorItem duration-item small")},m(k,L){B(k,y,L),S(y,d),S(d,_),S(y,I),S(y,O),S(O,i),S(i,v),S(O,w),S(O,r),S(r,s),S(y,l),S(y,o),S(o,n),S(y,g),S(y,e),S(e,t),S(y,h),N||(M=[x(d,"click",j),x(e,"click",V)],N=!0)},p(k,L){p=k,L&2&&U(d,"hidden",p[1]===!1),L&4&&u!==(u=p[11].tens+"")&&$(v,u),L&4&&a!==(a=p[11].ones+"")&&$(s,a),L&2&&U(e,"hidden",p[1]===!1)},d(k){k&&D(y),N=!1,st(M)}}}function et(p){let y,d=p[0][p[10]]===!0&&tt(p);return{c(){d&&d.c(),y=X()},l(_){d&&d.l(_),y=X()},m(_,E){d&&d.m(_,E),B(_,y,E)},p(_,E){_[0][_[10]]===!0?d?d.p(_,E):(d=tt(_),d.c(),d.m(y.parentNode,y)):d&&(d.d(1),d=null)},d(_){_&&D(y),d&&d.d(_)}}}function ct(p){let y,d,_=b(p[3]),E=[];for(let I=0;I<_.length;I+=1)E[I]=et(m(p,_,I));return{c(){y=P("div"),d=P("div");for(let I=0;I<E.length;I+=1)E[I].c();this.h()},l(I){y=F(I,"DIV",{class:!0});var O=R(y);d=F(O,"DIV",{class:!0,"aria-label":!0});var i=R(d);for(let u=0;u<E.length;u+=1)E[u].l(i);i.forEach(D),O.forEach(D),this.h()},h(){A(d,"class","DurationSelector"),A(d,"aria-label","Select a duration"),A(y,"class","d-flex justify-content-center")},m(I,O){B(I,y,O),S(y,d);for(let i=0;i<E.length;i+=1)E[i]&&E[i].m(d,null)},p(I,[O]){if(O&63){_=b(I[3]);let i;for(i=0;i<_.length;i+=1){const u=m(I,_,i);E[i]?E[i].p(u,O):(E[i]=et(u),E[i].c(),E[i].m(d,null))}for(;i<E.length;i+=1)E[i].d(1);E.length=_.length}},i:Q,o:Q,d(I){I&&D(y),rt(E,I)}}}function gt(p,y,d){const _=["week","day","hour","minute","second"],E={week:604800,day:86400,hour:3600,minute:60,second:1};let I={week:{tens:"0",ones:"0"},day:{tens:"0",ones:"0"},hour:{tens:"0",ones:"0"},minute:{tens:"0",ones:"0"},second:{tens:"0",ones:"0"}},{seconds:O}=y,{settings:i}=y,{buttons:u=!1}=y,{minSeconds:v=1}=y;function w(s){O+s>=v?d(6,O+=s):d(6,O=v)}const r=s=>{w(s)},a=s=>{w(-1*s)};return p.$$set=s=>{"seconds"in s&&d(6,O=s.seconds),"settings"in s&&d(0,i=s.settings),"buttons"in s&&d(1,u=s.buttons),"minSeconds"in s&&d(7,v=s.minSeconds)},p.$$.update=()=>{if(p.$$.dirty&64){let s=O;for(const l of _){const o=E[l],f=Math.floor(s/o);s-=f*o;const[n,g]=`${f}`.padStart(2,"0").split("");d(2,I[l].tens=n,I),d(2,I[l].ones=g,I)}}},[i,u,I,_,E,w,O,v,r,a]}class yt extends ot{constructor(y){super(),nt(this,y,gt,ct,lt,{seconds:6,settings:0,buttons:1,minSeconds:7})}}export{yt as D,_t as b};
