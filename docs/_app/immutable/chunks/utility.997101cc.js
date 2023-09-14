const u={"all-alphanumeric":"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789","upper-alphanumeric":"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789","lower-alphanumeric":"abcdefghijklmnopqrstuvwxyz0123456789","all-alpha":"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ","caps-alpha":"ABCDEFGHIJKLMNOPQRSTUVWXYZ","lower-alpha":"abcdefghijklmnopqrstuvwxyz",numeric:"0123456789"};function d(e,r="upper-alphanumeric"){let s="";const l=u[r],o=l.length;for(let t=0;t<e;t++)s+=l.charAt(Math.floor(Math.random()*o));return s}function y(e,r){return Math.floor(Math.random()*(r-e))+e}async function k(e){return new Promise(r=>{setTimeout(r,e)})}function i(e,r=!1){const s={day:86400,hour:3600,minute:60,second:1};r&&(s.second=1);const l={};let o=e;for(const[n,p]of Object.entries(s)){const h=Math.floor(o/p);o-=h*p,l[n]=h}const t=[];for(const[n,p]of Object.entries(l))if(p!==0){const h=p>1?"s":"";t.push(`${p} ${n}${h}`)}let m=t.join(", ");const f=m.split(",").length-1;if(f!==0)if(f===1)m=m.replace(", "," and ");else{let n=m.split("").reverse().join("");n=n.replace(" ,"," dna ,"),m=n.split("").reverse().join("")}return m}function g(e,r){return e.length<=r?e:e.substr(0,e.lastIndexOf(" ",r))}function a(e,r){let s="";if(e.type==="set_time"?s=`[Time] Set the remaining time to ${i(e.params[0])}`:e.type==="add_time"?s=`[Time] Add ${i(e.params[0])} to the remaining time.`:e.type==="remove_time"?s=`[Time] Remove ${i(e.params[0])} from the remaining time.`:e.type==="multiply_time"?s=`[Time] Multiply remaining time by ${e.params} times.`:e.type==="share_link-requirement-set"?s=`[Share link] Set the share link visit requirement to ${e.params[0]}.`:e.type==="share_link-requirement-modify"?s=`[Share link] Modify the share link visit requirement by ${e.params[0]}.`:e.type==="share_link-requirement-multiply"?s=`[Share link] Multiply the share link visit requirement by ${e.params[0]} times.`:e.type==="share_link-add_time-set"?s=`[Share link] Set share link "Time to add" duration to ${i(e.params[0])}.`:e.type==="share_link-remove_time-set"?s=`[Share link] Set share link "Time to remove" duration to ${i(e.params[0])}.`:e.type==="share_link-logged_in-set"?s=e.params[0]===!0?"[Share link] Only allow logged-in people to vote on share link visits.":"[Share link] Also allow not logged-in people to vote on share link visits.":e.type==="pillory-put"&&(s="[Pillory] Put the wearer into the pillory."),e.type==="pillory-duration-set"?s=`[Pillory] Set pillory add time per vote to ${i(e.params[0])}.`:e.type==="hygiene-unlock"?s="[Hygiene Unlock] Temporarily hygiene unlock through keyholder (doesn't affect interval)":e.type==="dice-regularity-set"&&(s=`[Dice] Set the dice regular action to mode '${e.params[0][0]}'`+(e.params[0][0]!=="unlimited"?` with regularity ${i(e.params[0][1])}`:"")+"."),e.type==="dice-multiplier-set")s=`[Dice] Set the dice time multiplier to ${i(e.params[0][0])}.`;else if(e.type==="tasks-regularity-set")s=`[Tasks] Set the tasks regular action to mode '${e.params[0][0]}'`+(e.params[0][0]!=="unlimited"?` with regularity ${i(e.params[0][1])}`:"")+".";else if(e.type==="tasks-task_points-modify")s=`[Tasks] Modify the task points requirement by ${e.params[0]}.`;else if(e.type==="tasks-task_points-multiply")s=`[Tasks] Multiply the task points requirement by ${e.params[0]} times.`;else if(e.type==="tasks-task-add")s=`[Tasks] Add the following task: ${e.params[0]}`;else if(e.type==="tasks-task-remove")s=`[Tasks] Remove the following task: ${e.params[0]}`;else if(e.type==="extended_wof-wheel"){const l=r.wheels[e.params[0]].display;s=`[Extended Wheel of Fortune] ${e.params[1]===!0?"Enable":"Disable"} the wheel '${l}'`}else if(e.type==="extended_wof-mode-settings"){const l=r.wheels[e.params[0]].display,t={disabled:"Disabled",availableSpins:"Count Spins",falsePercentages:"False Percentages",hiddenActions:"Hidden Actions",hiddenOutcomes:"Hidden Outcomes"}[e.params[1]];s=`[Extended Wheel of Fortune] ${e.params[2]===!0?"Enable":"Disable"} the wheel setting '${t}' for the wheel '${l}'`}else if(e.type==="extended_wof-regularity-set")s=`[Extended Wheel of Fortune] Set the regular action for the wheel '${r.wheels[e.params[0]].display}' to mode '${e.params[1][0]}'`+(e.params[0][1]!=="unlimited"?` with regularity ${i(e.params[1][1])}`:"")+".";else if(e.type==="extended_wof-available-set"){const l=r.wheels[e.params[0]].display;s=`[Extended Wheel of Fortune] Set the number of available spins to ${e.params[1]} for the wheel '${l}'`}else if(e.type==="extended_wof-available-modify"){const l=r.wheels[e.params[0]].display;s=`[Extended Wheel of Fortune] Modify the number of available spins by ${e.params[1]} for the wheel '${l}'`}else e.type==="lock-freeze"?s="[Lock] Freeze the lock (if unfrozen)":e.type==="lock-unfreeze"?s="[Lock] Unfreeze the lock (if frozen)":e.type==="lock-toggle_freeze"?s="[Lock] Toggle freeze on the lock (freeze -> unfreeze, and vice versa)":e.type==="lock-unlock"&&(s="[Lock] Fully unlock the lock");return s}export{d as a,i as b,a as g,y as r,k as s,g as t};
