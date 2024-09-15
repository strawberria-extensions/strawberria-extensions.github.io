const C={"all-alphanumeric":"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789","upper-alphanumeric":"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789","lower-alphanumeric":"abcdefghijklmnopqrstuvwxyz0123456789","all-alpha":"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ","upper-alpha":"ABCDEFGHIJKLMNOPQRSTUVWXYZ","lower-alpha":"abcdefghijklmnopqrstuvwxyz",numeric:"0123456789",symbols:"!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"};function A(e,t="upper-alphanumeric"){let o="";const i=C[t],u=i.length;for(let f=0;f<e;f++)o+=i.charAt(Math.floor(Math.random()*u));return o}function H(e,t){return Math.floor(Math.random()*(t-e))+e}async function P(e){return new Promise(t=>{setTimeout(t,e)})}function W(e){return e>2678400?"More than a month":e>86400?`${Math.floor(e/86400)} days`:e>3600?`${Math.floor(e/3600)} hours`:c(e,!0)}function c(e,t=!1){const o={week:604800,day:86400,hour:3600,minute:60,second:1};t&&(o.second=1);const i={};let u=e;for(const[y,a]of Object.entries(o)){const v=Math.floor(u/a);u-=v*a,i[y]=v}const f=[];for(const[y,a]of Object.entries(i))if(a!==0){const v=a>1?"s":"";f.push(`${a} ${y}${v}`)}let h=f.join(", ");const $=h.split(",").length-1;if($!==0)if($===1)h=h.replace(", "," and ");else{let y=h.split("").reverse().join("");y=y.replace(" ,"," dna ,"),h=y.split("").reverse().join("")}return h!==""?h:"0 seconds"}window.generate=c;function G(e,t){return e.length<=t?e:e.substr(0,e.lastIndexOf(" ",t))}async function j(e,t){const o=new TextEncoder().encode(t),i=await crypto.subtle.digest("SHA-256",o),u=await crypto.subtle.importKey("raw",i,"AES-GCM",!0,["encrypt"]),f=new TextEncoder().encode(e),h=crypto.getRandomValues(new Uint8Array(12)),$=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:h},u,f),a=Array.from(new Uint8Array($)).map(p=>String.fromCharCode(p)).join(""),v=btoa(a);return Array.from(h).map(p=>("00"+p.toString(16)).slice(-2)).join("")+v}async function q(e,t){const o=new TextEncoder().encode(t),i=await crypto.subtle.digest("SHA-256",o),u=await crypto.subtle.importKey("raw",i,"AES-GCM",!0,["decrypt"]),f=(e.slice(0,24).match(/.{2}/g)??[]).map(v=>parseInt(v,16)),h=atob(e.slice(24)),$=new Uint8Array(new ArrayBuffer(h.length));for(let v=0;v<h.length;v++)$[v]=h.charCodeAt(v);const y=await crypto.subtle.decrypt({name:"AES-GCM",iv:new Uint8Array(f)},u,$);return new TextDecoder().decode(y)}async function V(e){const t=new TextEncoder().encode(e),o=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(o)).map(f=>f.toString(16).padStart(2,"0")).join("")}function B(e){var t="0123456789abcdef";function o(k){var d,g="";for(d=0;d<=3;d++)g+=t.charAt(k>>d*8+4&15)+t.charAt(k>>d*8&15);return g}function i(k,d){var g=(k&65535)+(d&65535),b=(k>>16)+(d>>16)+(g>>16);return b<<16|g&65535}function u(k,d){return k<<d|k>>>32-d}function f(k,d,g,b,w,x){return i(u(i(i(d,k),i(b,x)),w),g)}function h(k,d,g,b,w,x,S){return f(d&g|~d&b,k,d,w,x,S)}function $(k,d,g,b,w,x,S){return f(d&b|g&~b,k,d,w,x,S)}function y(k,d,g,b,w,x,S){return f(d^g^b,k,d,w,x,S)}function a(k,d,g,b,w,x,S){return f(g^(d|~b),k,d,w,x,S)}function v(k){var d,g=(k.length+8>>6)+1,b=new Array(g*16);for(d=0;d<g*16;d++)b[d]=0;for(d=0;d<k.length;d++)b[d>>2]|=k.charCodeAt(d)<<d%4*8;return b[d>>2]|=128<<d%4*8,b[g*16-2]=k.length*8,b}var n,p=v(""+e),r=1732584193,s=-271733879,l=-1732584194,m=271733878,M,T,E,L;for(n=0;n<p.length;n+=16)M=r,T=s,E=l,L=m,r=h(r,s,l,m,p[n+0],7,-680876936),m=h(m,r,s,l,p[n+1],12,-389564586),l=h(l,m,r,s,p[n+2],17,606105819),s=h(s,l,m,r,p[n+3],22,-1044525330),r=h(r,s,l,m,p[n+4],7,-176418897),m=h(m,r,s,l,p[n+5],12,1200080426),l=h(l,m,r,s,p[n+6],17,-1473231341),s=h(s,l,m,r,p[n+7],22,-45705983),r=h(r,s,l,m,p[n+8],7,1770035416),m=h(m,r,s,l,p[n+9],12,-1958414417),l=h(l,m,r,s,p[n+10],17,-42063),s=h(s,l,m,r,p[n+11],22,-1990404162),r=h(r,s,l,m,p[n+12],7,1804603682),m=h(m,r,s,l,p[n+13],12,-40341101),l=h(l,m,r,s,p[n+14],17,-1502002290),s=h(s,l,m,r,p[n+15],22,1236535329),r=$(r,s,l,m,p[n+1],5,-165796510),m=$(m,r,s,l,p[n+6],9,-1069501632),l=$(l,m,r,s,p[n+11],14,643717713),s=$(s,l,m,r,p[n+0],20,-373897302),r=$(r,s,l,m,p[n+5],5,-701558691),m=$(m,r,s,l,p[n+10],9,38016083),l=$(l,m,r,s,p[n+15],14,-660478335),s=$(s,l,m,r,p[n+4],20,-405537848),r=$(r,s,l,m,p[n+9],5,568446438),m=$(m,r,s,l,p[n+14],9,-1019803690),l=$(l,m,r,s,p[n+3],14,-187363961),s=$(s,l,m,r,p[n+8],20,1163531501),r=$(r,s,l,m,p[n+13],5,-1444681467),m=$(m,r,s,l,p[n+2],9,-51403784),l=$(l,m,r,s,p[n+7],14,1735328473),s=$(s,l,m,r,p[n+12],20,-1926607734),r=y(r,s,l,m,p[n+5],4,-378558),m=y(m,r,s,l,p[n+8],11,-2022574463),l=y(l,m,r,s,p[n+11],16,1839030562),s=y(s,l,m,r,p[n+14],23,-35309556),r=y(r,s,l,m,p[n+1],4,-1530992060),m=y(m,r,s,l,p[n+4],11,1272893353),l=y(l,m,r,s,p[n+7],16,-155497632),s=y(s,l,m,r,p[n+10],23,-1094730640),r=y(r,s,l,m,p[n+13],4,681279174),m=y(m,r,s,l,p[n+0],11,-358537222),l=y(l,m,r,s,p[n+3],16,-722521979),s=y(s,l,m,r,p[n+6],23,76029189),r=y(r,s,l,m,p[n+9],4,-640364487),m=y(m,r,s,l,p[n+12],11,-421815835),l=y(l,m,r,s,p[n+15],16,530742520),s=y(s,l,m,r,p[n+2],23,-995338651),r=a(r,s,l,m,p[n+0],6,-198630844),m=a(m,r,s,l,p[n+7],10,1126891415),l=a(l,m,r,s,p[n+14],15,-1416354905),s=a(s,l,m,r,p[n+5],21,-57434055),r=a(r,s,l,m,p[n+12],6,1700485571),m=a(m,r,s,l,p[n+3],10,-1894986606),l=a(l,m,r,s,p[n+10],15,-1051523),s=a(s,l,m,r,p[n+1],21,-2054922799),r=a(r,s,l,m,p[n+8],6,1873313359),m=a(m,r,s,l,p[n+15],10,-30611744),l=a(l,m,r,s,p[n+6],15,-1560198380),s=a(s,l,m,r,p[n+13],21,1309151649),r=a(r,s,l,m,p[n+4],6,-145523070),m=a(m,r,s,l,p[n+11],10,-1120210379),l=a(l,m,r,s,p[n+2],15,718787259),s=a(s,l,m,r,p[n+9],21,-343485551),r=i(r,M),s=i(s,T),l=i(l,E),m=i(m,L);return o(r)+o(s)+o(l)+o(m)}const U={dice:"Dice","guess-timer":"Guess the Timer",link:"Share Link",pillory:"Pillory","random-events":"Random Events",tasks:"Tasks","temporary-opening":"Hygiene Opening","extended-wheel-of-fortune":"Extended Wheel of Fortune"};function O(e){let t="";for(;;){const o=Math.floor(Math.random()*e.length),i=e.charAt(o),u=i.charCodeAt(0);let f="";if(u>=65&&u<=90)do f=A(1,"upper-alpha");while(f===i);else if(u>=97&&u<=122)do f=A(1,"lower-alpha");while(f===i);else if(u>=48&&u<=57)do f=A(1,"numeric");while(f===i);else if(u>=33&&u<=126)do f=A(1,"symbols");while(f===i);if(f!==""){const h=e.split("");h[o]=f,t=h.join("");break}}return t}function R(e){let t="";if(e.key==="resetCooldown")t=`**[Extended Wheel]** Reset cooldown for the wheel keyed "${e.params[1]}"`;else if(e.key==="customText")t=e.params[0];else if(e.key==="resetLock")t="**[Lock]** Reset the lock";else if(e.key==="unlock")t="**[Lock]** Unlock the lock";else if(e.key==="freeze")t=`**[Lock]** ${e.params[0]===!0?"Freeze":e.params[0]===!1?"Unfreeze":"Toggle freeze on"} the lock`;else if(e.key==="pillory")t=`**[Lock]** Pillory for ${c(Math.abs(e.params[0]))}`;else if(e.key==="hygieneUnlock")t="**[Lock]** Perform a hygiene unlock";else if(e.key==="requestVerification")t="**[Verification]** Request a verification picture";else if(e.key==="assignTask")t=`**[Tasks]** Assign the task "${e.params[0].task}"`;else if(e.key==="assignTaskRandom")t=e.params[0]===void 0?"**[Tasks]** Assign a random task":"**[Tasks]** Have users vote on a task";else if(e.key==="modifyTasks")t="**[Tasks]** Modify the task list (too complex)";else if(e.key==="updateLockDuration"){const o=`${e.params[0]!=="multiply"?e.params[1]<0?"-":"+":"x"}`+(e.params[0]!=="multiply"?c(Math.abs(e.params[1])):`${e.params[1]}`),i=e.params[2]?`${e.params[0]!=="multiply"?e.params[2]<0?"-":"+":"x"}`+(e.params[0]!=="multiply"?c(Math.abs(e.params[2])):`${e.params[2]}`):"",u=`${i?"between ":""}${o}${i?" and ":""}${i}`;t=e.params[0]==="modify"?`**[Lock]** Modify the remaining lock time by ${u}`:e.params[0]==="multiply"?`**[Lock]** Multiply the remaining lock time by ${u}`:`**[Lock]** Set the remaining lock time to ${u}`}else if(e.key==="updateLockSettings")t="**[Lock]** ",e.params[0]!==void 0&&(t+=`${e.params[0]?"Display":"Hide"} remaining lock time`,e.params[1]!==void 0&&(t+=" | ")),e.params[1]!==void 0&&(t+=`${e.params[0]?"Hide":"Show"} time changes.`);else if(e.key==="disableExtension")t=`**[Lock]** Disable the extension "${U[e.params[0]]}"`;else if(e.key==="enableExtension")t=`**[Lock]** Enable the extension "${U[e.params[0]]}"`;else if(e.key==="resetTaskPoints")t="**[Tasks]** Reset the gained number of task points";else if(e.key==="shareLinkUpdateKey"){const o=`${e.params[0]!=="nbVisits"&&e.params[1]!=="multiply"?e.params[2]<0?"-":"+":"x"}`+(e.params[0]!=="nbVisits"&&e.params[1]!=="multiply"?c(Math.abs(e.params[2])):`${e.params[2]}`),i=e.params[3]?`${e.params[0]!=="nbVisits"&&e.params[1]!=="multiply"?e.params[3]<0?"-":"+":"x"}`+(e.params[0]!=="nbVisits"&&e.params[1]!=="multiply"?c(Math.abs(e.params[3])):`${e.params[3]}`):"",u=`${i?"between ":""}${o}${i?" and ":""}${i}`,f=e.params[0]==="nbVisits"?"number of required visits":e.params[0]==="timeToAdd"?"link add time":"link remove time";e.params[1]==="set"?t=`**[Share Link]** Set the ${f} to ${u}`:e.params[1]==="modify"?t=`**[Share Link]** ${e.params[2]>0?"Increase":"Decrease"} the ${f} by ${u}`:t=`**[Share Link]** Multiply the ${f} by ${u}`}else if(e.key==="shareLinkSetLoggedIn")t=e.params[0]===void 0?"**[Share Link]** Toggle the logged-in requirement":`**[Share Link]** ${e.params?"Enable":"Disable"} the logged-in requirement`;else if(e.key==="pilloryUpdateDuration"){const o=`${e.params[0]!=="multiply"?e.params[1]<0?"-":"+":"x"}`+(e.params[0]!=="multiply"?c(Math.abs(e.params[1])):`${e.params[1]}`),i=e.params[2]?`${e.params[0]!=="multiply"?e.params[2]<0?"-":"+":"x"}`+(e.params[0]!=="multiply"?c(Math.abs(e.params[2])):`${e.params[2]}`):"",u=`${i?"between ":""}${o}${i?" and ":""}${i}`;t=e.params[0]==="modify"?e.params[1]>0?`**[Pillory]** Add ${u} to the per-vote duration`:`**[Pillory]** Subtract ${u} from the per-vote duration`:e.params[0]==="multiply"?`**[Pillory]** Multiply the per-vote duration by ${u}`:`**[Pillory]** Set the per-vote duration to ${u}`}else if(e.key==="diceUpdateDuration"){const o=`${e.params[0]!=="multiply"?e.params[1]<0?"-":"+":"x"}`+(e.params[0]!=="multiply"?c(Math.abs(e.params[1])):`${e.params[1]}`),i=e.params[2]?`${e.params[0]!=="multiply"?e.params[2]<0?"-":"+":"x"}`+(e.params[0]!=="multiply"?c(Math.abs(e.params[2])):`${e.params[2]}`):"",u=`${i?"between ":""}${o}${i?" and ":""}${i}`;t=e.params[0]==="modify"?e.params[1]>0?`**[Dice]** Add ${u} to the duration multiplier`:`**[Dice]** Subtract ${u} from the duration multiplier`:e.params[0]==="multiply"?`**[Dice]** Multiply the duration multiplier by ${u}`:`**[Dice]** Set the duration multiplier to ${u}`}else if(e.key==="tasksUpdateRequiredPoints"){const o=`${e.params[0]!=="multiply"?e.params[1]<0?"-":"+":"x"}`+(e.params[0]!=="multiply"?c(Math.abs(e.params[1])):`${e.params[1]}`),i=e.params[2]?`${e.params[0]!=="multiply"?e.params[2]<0?"-":"+":"x"}`+(e.params[0]!=="multiply"?c(Math.abs(e.params[2])):`${e.params[2]}`):"",u=`${i?"between ":""}${o}${i?" and ":""}${i}`;t=e.params[0]==="modify"?e.params[1]>0?`**[Tasks]** Add ${u} to the required points`:`**[Tasks]** Subtract ${u} from the required points`:e.params[0]==="multiply"?`**[Tasks]** Multiply the required points by ${u}`:`**[Tasks]** Set the required points to ${u}`}else if(e.key==="randomEventsModifyDifficulty")t=`**[Random]** Set the difficulty to ${e.params[0].charAt(0).toUpperCase()+e.params[0].slice(1)}`;else if(e.key==="guessTimerUpdateKey"){const o=e.params[0]==="minRandomTime"?"minimum added duration":"maximum added duration",i=`${e.params[1]!=="multiply"?e.params[2]<0?"-":"+":"x"}`+(e.params[1]!=="multiply"?c(Math.abs(e.params[2])):`${e.params[2]}`),u=e.params[3]?`${e.params[1]!=="multiply"?e.params[3]<0?"-":"+":"x"}`+(e.params[1]!=="multiply"?c(Math.abs(e.params[3])):`${e.params[3]}`):"",f=`${u?"between ":""}${i}${u?" and ":""}${u}`;t=e.params[1]==="modify"?e.params[2]>0?`**[Guess]** Add ${f} to the ${o}`:`**[Guess]** Subtract ${f} from the ${o}`:e.params[1]==="multiply"?`**[Guess]** Multiply the ${o} by ${f}`:`**[Guess]** Set the ${o} to ${f}`}else if(e.key==="delayLockEffect"){const o=Math.floor(e.params[1]/1e3),i=c(o,!0),u=R(e.params[0]);t=`**Delay activation by ${i}:**
➜ ${u}`}else if(e.key==="partnerAddRemoveReason")t=`**[${e.params[0]==="extended-wheel-of-fortune"?"Extended Wheel":""}]** ${e.params[1]==="add"?"Add":"Remove"} reason preventing unlocking:
➜ ${e.params[2]}`;else if(e.key==="extendedSetDisabled")t=`**[Extended Wheel]** ${e.params[2]===!0?"Disable":e.params[2]===!1?"Enable":"Toggle access to"} the wheel named "${e.params[1]}"`;else if(e.key==="extendedAddOutcome")t=`**[Extended Wheel]** Add outcome named "${e.params[1].text}"`;else if(e.key==="extendedRemoveOutcome")t=`**[Extended Wheel]** Remove outcome named "${e.params[1]}"`;else if(e.key==="extendedUpdatePercentage"){const o=`${e.params[2]!=="multiply"?e.params[3]<0?"-":"+":"x"}`+(e.params[2]!=="multiply"?c(Math.abs(e.params[3])):`${e.params[3]}`),i=e.params[4]?`${e.params[2]!=="multiply"?e.params[4]<0?"-":"+":"x"}`+(e.params[2]!=="multiply"?c(Math.abs(e.params[4])):`${e.params[4]}`):"",u=`${i?"between ":""}${o}${i?" and ":""}${i}`;t=e.params[2]==="modify"?e.params[3]>0?`**[Extended Wheel]** Add ${u} to the weight of outcome "${e.params[1]}"`:`**[Extended Wheel]** Subtract ${u} from the weight of outcome "${e.params[1]}"`:e.params[2]==="multiply"?`**[Extended Wheel]** Multiply the weight of outcome "${e.params[1]}" by ${u}`:`**[Extended Wheel]** Set the weight of outcome "${e.params[1]}" to ${u}`}return t}export{A as a,W as b,O as c,R as d,j as e,q as f,c as g,V as h,B as m,H as r,P as s,G as t};