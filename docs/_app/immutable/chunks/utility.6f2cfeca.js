const f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";function y(e){let s="";const t=f.length;for(let a=0;a<e;a++)s+=f.charAt(Math.floor(Math.random()*t));return s}function m(e,s){return Math.floor(Math.random()*(s-e))+e}async function g(e){return new Promise(s=>{setTimeout(s,e)})}function r(e,s=!1){const t={day:86400,hour:3600,minute:60};s&&(t.second=1);const a={};let h=e;for(const[i,l]of Object.entries(t)){const k=Math.floor(h/l);h-=k*l,a[i]=k}const p=[];for(const[i,l]of Object.entries(a))if(l!==0){const k=l>1?"s":"";p.push(`${l} ${i}${k}`)}let n=p.join(", ");const d=n.split(",").length-1;if(d!==0)if(d===1)n=n.replace(", "," and ");else{let i=n.split("").reverse().join("");i=i.replace(" ,"," dna ,"),n=i.split("").reverse().join("")}return n}function o(e,s){return e.length<=s?e:e.substr(0,e.lastIndexOf(" ",s))}function $(e){let s="";return e.key==="add_time"?s=`[Time] Add ${r(e.params[0])} to the session time.`:e.key==="remove_time"?s=`[Time] Remove ${r(e.params[0])} from the session time.`:e.key==="multiply_time"?s=`[Time] Multiply session time by ${e.params} times.`:e.key==="share_link-requirement-add"?s=`[Share link] Increase the share link visit requirement by ${e.params[0]}.`:e.key==="share_link-requirement-remove"?s=`[Share link] Decrease the share link visit requirement by ${e.params[0]}.`:e.key==="share_link-requirement-multiply"?s=`[Share link] Multiply the share link visit requirement by ${e.params[0]} times.`:e.key==="share_link-add_time-set"?s=`[Share link] Set share link "Time to add" duration to ${r(e.params[0])}.`:e.key==="share_link-remove_time-set"?s=`[Share link] Set share link "Time to remove" duration to ${r(e.params[0])}.`:e.key==="share_link-logged_in-set"?s=e.params[0]===!0?"[Share link] Only allow logged-in people to vote on share link visits.":"[Share link] Also allow not logged-in people to vote on share link visits.":e.key==="pillory-put"&&(s="[Pillory] Put the wearer into the pillory."),e.key==="pillory-duration-set"?s=`[Pillory] Set pillory add time per vote to ${r(e.params[0])}.`:e.key==="dice-regular_actions-set"&&(s=`[Dice] Set the dice regular action to mode '${e.params[0]}'`+(e.params[0]!=="unlimited"?` with regularity ${r(e.params[1])}`:"")+"."),e.key==="dice-multiplier-set"?s=`[Dice] Set the dice time multiplier to ${r(e.params[0])}.`:e.key==="extended_wof-regular_actions-set"?s=`[Extended Wheel of Fortune] Set the regular action for the wheel '${e.params[0]}' to mode '${e.params[0]}'`+(e.params[1]!=="unlimited"?` with regularity ${r(e.params[2])}`:"")+".":e.key==="tasks-regular_actions-set"?s=`[Tasks] Set the tasks regular action to mode '${e.params[0]}'`+(e.params[0]!=="unlimited"?` with regularity ${r(e.params[1])}`:"")+".":e.key==="tasks-task_points-add"?s=`[Tasks] Increase the task points requirement by ${e.params[0]}.`:e.key==="tasks-task_points-remove"?s=`[Tasks] Decrease the task points requirement by ${e.params[0]}.`:e.key==="tasks-task_points-multiply"?s=`[Tasks] Multiply the task points requirement by ${e.params[0]} times.`:e.key==="tasks-task-add"?s=`[Tasks] Add the following task: ${e.params[0]}`:e.key==="tasks-task-remove"&&(s=`[Tasks] Remove the following task: ${e.params[0]}`),s}export{$ as a,r as b,y as g,m as r,g as s,o as t};
