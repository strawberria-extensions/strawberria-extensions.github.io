import{s as X,f as _,a as z,g as v,h as w,F as E,c as A,d as m,j as g,i as k,x as p,y as V,e as Y,C as J,A as G,l as C,m as q,n as W,k as Z,G as H}from"../chunks/scheduler.6e8049bc.js";import{e as M}from"../chunks/each.605e2745.js";import{S as K,i as $}from"../chunks/index.0fccc1b3.js";import{a as ee}from"../chunks/utility.05bba961.js";const te=!0,ye=Object.freeze(Object.defineProperty({__proto__:null,prerender:te},Symbol.toStringTag,{value:"Module"}));let N=[{type:"choice_multiple",prompt:"What forms of activity are allowed within the server?",params:["Looking for chastity belt recommendations and wearing tips","Asking out of nowhere whether anyone is looking for a keyholder","Discussing about why women deserve to stay locked within chastity","Asking for suggestions on keeping your wife honest through chastity","Posting about your experiences wearing a certain chastity belt design"],correct:[0,4]},{type:"choice_single",prompt:"What's the maximum recommended time interval between hygiene unlocks?",note:"Please refer to #guide-safety for hygiene information - this differs for everyone.",params:["1 day","3 day","1 week","1 month","1 year","Indefinite"],correct:[2]},{type:"choice_multiple",prompt:"What actions and traits of a keyholder are *definitely, always, 100%* red flags?",note:"Please read through #guide-safety and the linked Kynk101 articles beforehand - what separates the good keyholders from the bad?",params:["Encouraging you to provide any additional information which would benefit the dynamic.",'Pressuring you to surrender your emergency key to prevent any "cheating" during your chastity.',"Avoiding any discussions regarding emergencies, hygiene, and safety within the dynamic.","Requesting on-demand or periodic verification pictures only if you're completely comfortable.",`Recommending you rules and restrictions beceause "that's what a true submissive would do".`,'Dismissing *any* backtalk or complaints whatsoever as "bratting" and immediately assigning punishment.',"Assigning degrading tasks including self-humiliation, toy play, and worshipping according to negotiated limits."],correct:[1,2,4,5]},{type:"choice_multiple",prompt:"What are valid reasons to unlock during a chastity dynamic?",note:"Think about this carefully, remember that kink dynamics should always be *mutually beneficial* for both parties.",params:[`"I'm currently feeling under the weather, please don't ask - I'm not comfortable sharing."`,`"I'm going out with friends tonight... *really* not comfortable potentially revealing the belt."`,`"I don't really think this dynamic is working out, I'd like to get unlocked."`,`"I'm not really sure whether this belt is wearable while jogging and working out..."`,`"Emergency, can't elaborate further - need unlock now." (that's what the emergency key is for!)`,`"Going on a date tonight, I'd like to get unlocked beforehand - hopefully it goes well!"`,'"Finals are coming up, would like a break from the dynamic - need to pay full attention to studying."'],correct:[0,1,2,3,4,5,6]}];function se(o){const e=new TextEncoder().encode(o);return crypto.subtle.digest("SHA-256",e).then(s=>Array.from(new Uint8Array(s)).map(l=>l.toString(16).padStart(2,"0")).join(""))}async function ne(){for(;;){const o=ee(32);if((await se(o)).endsWith("0000"))return o.split("").reverse().join("")}}function L(o,e,s){const t=o.slice();t[8]=e[s],t[11]=s;const i=t[2][t[11]];return t[9]=i,t}function B(o,e,s){const t=o.slice();t[12]=e[s],t[15]=s;const i=t[9].includes(t[15]);return t[13]=i,t}function ae(o){let e,s,t;function i(a,n){return a[4]()?re:le}let r=i(o)(o);return{c(){e=_("hr"),s=z(),r.c(),t=Y(),this.h()},l(a){e=v(a,"HR",{class:!0}),s=A(a),r.l(a),t=Y(),this.h()},h(){g(e,"class","hr svelte-1yf0asg")},m(a,n){k(a,e,n),k(a,s,n),r.m(a,n),k(a,t,n)},p(a,n){r.p(a,n)},d(a){a&&(m(e),m(s),m(t)),r.d(a)}}}function ie(o){let e,s,t="Submit Quiz",i,l,r=M(N),a=[];for(let n=0;n<r.length;n+=1)a[n]=U(L(o,r,n));return{c(){for(let n=0;n<a.length;n+=1)a[n].c();e=z(),s=_("button"),s.textContent=t,this.h()},l(n){for(let u=0;u<a.length;u+=1)a[u].l(n);e=A(n),s=v(n,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),E(s)!=="svelte-1vq7lh8"&&(s.textContent=t),this.h()},h(){g(s,"type","button"),g(s,"class","btn btn-primary btn-lg mt-3")},m(n,u){for(let h=0;h<a.length;h+=1)a[h]&&a[h].m(n,u);k(n,e,u),k(n,s,u),i||(l=J(s,"click",o[6]),i=!0)},p(n,u){if(u&12){r=M(N);let h;for(h=0;h<r.length;h+=1){const d=L(n,r,h);a[h]?a[h].p(d,u):(a[h]=U(d),a[h].c(),a[h].m(e.parentNode,e))}for(;h<a.length;h+=1)a[h].d(1);a.length=r.length}},d(n){n&&(m(e),m(s)),G(a,n),i=!1,l()}}}function le(o){let e,s,t="Sorry, one or more of your answers are incorrect.",i,l,r=`<span class="caption">Please read through 
                            <a class="span-click" href="https://discord.com/channels/1042651214447386704/1080726771273576468">#server-rules</a>
                            and
                            <a class="span-click" href="https://discord.com/channels/1042651214447386704/1130710505598746645">#guide-safety</a>
                            again, then reattempt the quiz.</span> <span class="caption">Contact 
                            <a class="span-click" href="https://discord.com/channels/@me/777516217216401439">@strawberria</a>
                            through Discord for any bugs, feedback, and incorrect information.</span>`,a,n,u="Go Back",h,d;return{c(){e=_("div"),s=_("h5"),s.textContent=t,i=z(),l=_("div"),l.innerHTML=r,a=z(),n=_("button"),n.textContent=u,this.h()},l(f){e=v(f,"DIV",{class:!0});var c=w(e);s=v(c,"H5",{class:!0,"data-svelte-h":!0}),E(s)!=="svelte-109dhk2"&&(s.textContent=t),i=A(c),l=v(c,"DIV",{class:!0,"data-svelte-h":!0}),E(l)!=="svelte-eho80o"&&(l.innerHTML=r),a=A(c),n=v(c,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),E(n)!=="svelte-uv9pjn"&&(n.textContent=u),c.forEach(m),this.h()},h(){g(s,"class","m-0"),g(l,"class","flex flex-col items-center"),g(n,"type","button"),g(n,"class","btn btn-primary btn-lg mt-3"),g(e,"class","w-full flex flex-col space-y-2 items-center")},m(f,c){k(f,e,c),p(e,s),p(e,i),p(e,l),p(e,a),p(e,n),h||(d=J(n,"click",o[7]),h=!0)},p:V,d(f){f&&m(e),h=!1,d()}}}function re(o){let e,s,t='<h5 class="m-0">Congratulations, you passsed the server entrance quiz!</h5> <span class="caption">Thank you for taking the time to keep our server a safe space for everyone.</span>',i,l,r,a,n,u=(o[1]===""?"[ password generating... ]":o[1])+"",h,d,f=o[1]!==""&&F(o);return{c(){e=_("div"),s=_("div"),s.innerHTML=t,i=z(),l=_("div"),r=_("span"),a=C(`Your unique verification password is: \r
                            `),n=_("span"),h=C(u),d=z(),f&&f.c(),this.h()},l(c){e=v(c,"DIV",{class:!0});var y=w(e);s=v(y,"DIV",{class:!0,"data-svelte-h":!0}),E(s)!=="svelte-kw4tr6"&&(s.innerHTML=t),i=A(y),l=v(y,"DIV",{class:!0});var b=w(l);r=v(b,"SPAN",{});var T=w(r);a=q(T,`Your unique verification password is: \r
                            `),n=v(T,"SPAN",{class:!0});var P=w(n);h=q(P,u),P.forEach(m),T.forEach(m),d=A(b),f&&f.l(b),b.forEach(m),y.forEach(m),this.h()},h(){g(s,"class","flex flex-col items-center"),g(n,"class","caption"),g(l,"class","flex flex-col items-center"),g(e,"class","w-full flex flex-col space-y-1 items-center")},m(c,y){k(c,e,y),p(e,s),p(e,i),p(e,l),p(l,r),p(r,a),p(r,n),p(n,h),p(l,d),f&&f.m(l,null)},p(c,y){y&2&&u!==(u=(c[1]===""?"[ password generating... ]":c[1])+"")&&W(h,u),c[1]!==""?f?f.p(c,y):(f=F(c),f.c(),f.m(l,null)):f&&(f.d(1),f=null)},d(c){c&&m(e),f&&f.d()}}}function F(o){let e,s,t,i,l,r,a,n="#verify-quiz",u,h,d,f="Please don't share this password with anyone as it's one-time use - thank you again!";return{c(){e=_("span"),s=C(`Unlock complete server access by sending\r
                                `),t=_("span"),i=C("?verify "),l=C(o[1]),r=C(`\r
                                within \r
                                `),a=_("a"),a.textContent=n,u=C("."),h=z(),d=_("span"),d.textContent=f,this.h()},l(c){e=v(c,"SPAN",{class:!0});var y=w(e);s=q(y,`Unlock complete server access by sending\r
                                `),t=v(y,"SPAN",{class:!0,style:!0});var b=w(t);i=q(b,"?verify "),l=q(b,o[1]),b.forEach(m),r=q(y,`\r
                                within \r
                                `),a=v(y,"A",{class:!0,href:!0,"data-svelte-h":!0}),E(a)!=="svelte-1vdb7gb"&&(a.textContent=n),u=q(y,"."),y.forEach(m),h=A(c),d=v(c,"SPAN",{class:!0,"data-svelte-h":!0}),E(d)!=="svelte-37is16"&&(d.textContent=f),this.h()},h(){g(t,"class","text-mono"),Z(t,"background-color","#272533"),g(a,"class","span-click"),g(a,"href","https://discord.com/channels/1042651214447386704/1125642946016985178"),g(e,"class","caption"),g(d,"class","caption")},m(c,y){k(c,e,y),p(e,s),p(e,t),p(t,i),p(t,l),p(e,r),p(e,a),p(e,u),k(c,h,y),k(c,d,y)},p(c,y){y&2&&W(l,c[1])},d(c){c&&(m(e),m(h),m(d))}}}function oe(o){let e,s=o[8].note+"",t;return{c(){e=_("span"),t=C(s),this.h()},l(i){e=v(i,"SPAN",{class:!0});var l=w(e);t=q(l,s),l.forEach(m),this.h()},h(){g(e,"class","caption")},m(i,l){k(i,e,l),p(e,t)},p:V,d(i){i&&m(e)}}}function ce(o){let e,s=M(o[8].params),t=[];for(let i=0;i<s.length;i+=1)t[i]=R(B(o,s,i));return{c(){e=_("div");for(let i=0;i<t.length;i+=1)t[i].c();this.h()},l(i){e=v(i,"DIV",{class:!0});var l=w(e);for(let r=0;r<t.length;r+=1)t[r].l(l);l.forEach(m),this.h()},h(){g(e,"class","flex flex-col space-y-0.5")},m(i,l){k(i,e,l);for(let r=0;r<t.length;r+=1)t[r]&&t[r].m(e,null)},p(i,l){if(l&12){s=M(i[8].params);let r;for(r=0;r<s.length;r+=1){const a=B(i,s,r);t[r]?t[r].p(a,l):(t[r]=R(a),t[r].c(),t[r].m(e,null))}for(;r<t.length;r+=1)t[r].d(1);t.length=s.length}},d(i){i&&m(e),G(t,i)}}}function R(o){let e,s=o[12]+"",t,i,l;function r(){return o[5](o[11],o[15])}return{c(){e=_("a"),t=C(s),this.h()},l(a){e=v(a,"A",{class:!0});var n=w(e);t=q(n,s),n.forEach(m),this.h()},h(){g(e,"class","text-lg quiz-answer-base svelte-1yf0asg"),H(e,"quiz-answer-unselected",!o[13]),H(e,"quiz-answer-selected",o[13])},m(a,n){k(a,e,n),p(e,t),i||(l=J(e,"click",r),i=!0)},p(a,n){o=a,n&4&&H(e,"quiz-answer-unselected",!o[13]),n&4&&H(e,"quiz-answer-selected",o[13])},d(a){a&&m(e),i=!1,l()}}}function U(o){let e,s,t,i,l,r,a=o[11]+1+"",n,u,h=o[8].prompt+"",d,f,c,y=(o[8].subtext??"")+"",b,T,P,x=o[8].note!==void 0&&oe(o),D=(o[8].type==="choice_multiple"||o[8].type==="choice_single")&&ce(o);return{c(){e=_("hr"),s=z(),t=_("div"),i=_("div"),l=_("h5"),r=C("Question "),n=C(a),u=C(": "),d=C(h),f=z(),c=_("p"),b=C(y),T=z(),x&&x.c(),P=z(),D&&D.c(),this.h()},l(I){e=v(I,"HR",{class:!0}),s=A(I),t=v(I,"DIV",{class:!0});var S=w(t);i=v(S,"DIV",{class:!0});var j=w(i);l=v(j,"H5",{class:!0});var O=w(l);r=q(O,"Question "),n=q(O,a),u=q(O,": "),d=q(O,h),O.forEach(m),f=A(j),c=v(j,"P",{class:!0});var Q=w(c);b=q(Q,y),Q.forEach(m),T=A(j),x&&x.l(j),j.forEach(m),P=A(S),D&&D.l(S),S.forEach(m),this.h()},h(){g(e,"class","hr svelte-1yf0asg"),g(l,"class","mb-0"),g(c,"class","caption mb-0"),g(i,"class","w-full mb-2"),g(t,"class","w-full flex flex-col")},m(I,S){k(I,e,S),k(I,s,S),k(I,t,S),p(t,i),p(i,l),p(l,r),p(l,n),p(l,u),p(l,d),p(i,f),p(i,c),p(c,b),p(i,T),x&&x.m(i,null),p(t,P),D&&D.m(t,null)},p(I,S){I[8].note!==void 0&&x.p(I,S),(I[8].type==="choice_multiple"||I[8].type==="choice_single")&&D.p(I,S)},d(I){I&&(m(e),m(s),m(t)),x&&x.d(),D&&D.d()}}}function he(o){let e,s,t,i=`<h4>FemChaste Server Entrance Quiz</h4> <span class="caption">Screening quiz for gaining complete server access (with unlimited attempts) - please thoroughly read through
                <a class="span-click" href="https://discord.com/channels/1042651214447386704/1080726771273576468">#server-rules</a>
                and
                <a class="span-click" href="https://discord.com/channels/1042651214447386704/1130710505598746645">#guide-safety</a>
                before attempting. Upon completion, you&#39;ll receive a unique &quot;password&quot; for verifying using the command 
                <span class="font-mono" style="background-color: #272533">?verify {password}</span> (without the curly braces). Please note these rules in particular:
                <br/>✦ <span class="underline">Absolutely no minors (&lt;18) allowed whatsoever</span> - staff members reserve the right to age-check when necessary.
                <br/>✦ <span class="underline">Absolutely zero tolerance</span> for misogyny, objectification, patriarchy, and other abusive behavior.
                <br/>✦ Please don&#39;t openly solicit yourself as a keyholder (including spamming, random DMs, etc.) without discussion context.</span>`,l;function r(u,h){return u[0]==="quiz"?ie:ae}let a=r(o),n=a(o);return{c(){e=_("div"),s=_("div"),t=_("div"),t.innerHTML=i,l=z(),n.c(),this.h()},l(u){e=v(u,"DIV",{class:!0});var h=w(e);s=v(h,"DIV",{class:!0});var d=w(s);t=v(d,"DIV",{class:!0,"data-svelte-h":!0}),E(t)!=="svelte-ljpbdu"&&(t.innerHTML=i),l=A(d),n.l(d),d.forEach(m),h.forEach(m),this.h()},h(){g(t,"class","flex flex-col items-center w-full"),g(s,"class","quiz-container card-content flex flex-col items-center w-full space-y-2 svelte-1yf0asg"),g(e,"class","container-bg min-w-0 min-h-0 p-4 space-y-2 grow svelte-1yf0asg")},m(u,h){k(u,e,h),p(e,s),p(s,t),p(s,l),n.m(s,null)},p(u,[h]){a===(a=r(u))&&n?n.p(u,h):(n.d(1),n=a(u),n&&(n.c(),n.m(s,null)))},i:V,o:V,d(u){u&&m(e),n.d()}}}function ue(o,e,s){let t="quiz",i="",l=N.map(d=>[]);(async function(){s(1,i=await ne())})();function r(d,f){const c=N[d],y=l[d];if(c.type==="choice_multiple"){const b=y.indexOf(f);b!==-1?y.splice(b,1):y.push(f),y.sort(),s(2,l)}else if(c.type==="choice_single"){const b=y.indexOf(f);s(2,l[d]=b===-1?[f]:[],l)}}function a(){for(const[d,f]of Object.entries(N)){const c=parseInt(d);if(JSON.stringify(f.correct)!==JSON.stringify(l[c]))return fetch("https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/misc_utilities",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4"},body:JSON.stringify({action:"discord_quiz-log",quizAnswerData:l})}),!1}return!0}return[t,i,l,r,a,(d,f)=>{r(d,f)},()=>{s(0,t="submit")},()=>{s(0,t="quiz")}]}class ge extends K{constructor(e){super(),$(this,e,ue,he,X,{})}}export{ge as component,ye as universal};
