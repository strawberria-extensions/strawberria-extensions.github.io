function y(e,s){return Math.floor(Math.random()*(s-e))+e}function i(e,s=!1){const a={day:86400,hour:3600,minute:60};s&&(a.second=1);const k={};let p=e;for(const[r,n]of Object.entries(a)){const t=Math.floor(p/n);p-=t*n,k[r]=t}const d=[];for(const[r,n]of Object.entries(k))if(n!==0){const t=n>1?"s":"";d.push(`${n} ${r}${t}`)}let l=d.join(", ");const h=l.split(",").length-1;if(h!==0)if(h===1)l=l.replace(", "," and ");else{let r=l.split("").reverse().join("");r=r.replace(" ,"," dna ,"),l=r.split("").reverse().join("")}return l}function f(e,s){return e.length<=s?e:e.substr(0,e.lastIndexOf(" ",s))}function m(e){let s="";return e.key==="add_time"?s=`[Time] Add ${i(e.params[0])} to the session time.`:e.key==="remove_time"?s=`[Time] Remove ${i(e.params[0])} from the session time.`:e.key==="multiply_time"?s=`[Time] Multiply session time by ${e.params} times.`:e.key==="share_link-requirement-add"?s=`[Share link] Increase the share link visit requirement by ${e.params[0]}.`:e.key==="share_link-requirement-remove"?s=`[Share link] Decrease the share link visit requirement by ${e.params[0]}.`:e.key==="share_link-requirement-multiply"?s=`[Share link] Multiply the share link visit requirement by ${e.params[0]} times.`:e.key==="share_link-add_time-set"?s=`[Share link] Set share link "Time to add" duration to ${i(e.params[0])}.`:e.key==="share_link-remove_time-set"?s=`[Share link] Set share link "Time to remove" duration to ${i(e.params[0])}.`:e.key==="share_link-logged_in-set"?s=e.params[0]===!0?"[Share link] Only allow logged-in people to vote on share link visits.":"[Share link] Also allow not logged-in people to vote on share link visits.":e.key==="pillory-put"&&(s="[Pillory] Put the wearer into the pillory."),e.key==="pillory-duration-set"?s=`[Pillory] Set pillory add time per vote to ${i(e.params[0])}.`:e.key==="dice-regular_actions-set"&&(s=`[Dice] Set the dice regular action to mode '${e.params[0]}'`+(e.params[0]!=="unlimited"?` with regularity ${i(e.params[1])}`:"")+"."),e.key==="dice-multiplier-set"?s=`[Dice] Set the dice time multiplier to ${i(e.params[0])}.`:e.key==="extended_wof-regular_actions-set"?s=`[Extended Wheel of Fortune] Set the regular action for the wheel '${e.params[0]}' to mode '${e.params[0]}'`+(e.params[1]!=="unlimited"?` with regularity ${i(e.params[2])}`:"")+".":e.key==="tasks-regular_actions-set"?s=`[Tasks] Set the tasks regular action to mode '${e.params[0]}'`+(e.params[0]!=="unlimited"?` with regularity ${i(e.params[1])}`:"")+".":e.key==="tasks-task_points-add"?s=`[Tasks] Increase the task points requirement by ${e.params[0]}.`:e.key==="tasks-task_points-remove"?s=`[Tasks] Decrease the task points requirement by ${e.params[0]}.`:e.key==="tasks-task_points-multiply"?s=`[Tasks] Multiply the task points requirement by ${e.params[0]} times.`:e.key==="tasks-task-add"?s=`[Tasks] Add the following task: ${e.params[0]}`:e.key==="tasks-task-remove"&&(s=`[Tasks] Remove the following task: ${e.params[0]}`),s}export{i as a,m as g,y as r,f as t};
