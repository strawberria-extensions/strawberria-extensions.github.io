import type { LockEffectData } from "./signature-lock_effects";

// Generate random string of specified length
// const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const characterMappings = {
    "all-alphanumeric": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    "upper-alphanumeric": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    "lower-alphanumeric": "abcdefghijklmnopqrstuvwxyz0123456789",
    "all-alpha": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "upper-alpha": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "lower-alpha": "abcdefghijklmnopqrstuvwxyz",
    "numeric": "0123456789",
    "symbols": "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
} as const;
export function generateRandomString(length: number, charset: keyof typeof characterMappings = "upper-alphanumeric") {
    let result = "";
    const characters = characterMappings[charset]
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

// Generates random integer within range, inclusive
export function randomInt(min: number, max: number) {
    const generated = Math.floor(Math.random() * (max - min)) + min;
    return generated;
}

// Sleep for the given duration in ms
export async function sleep(duration: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
}

// Creates display string for penalties:
// >1 month = More than a month
// >1 day = X days
// >1 hour = X hours
// X minutes and X seconds
export function generateTimeStringPenalties(seconds: number) {
    if(seconds > 2678400) {
        return "More than a month";
    } else if(seconds > 86400) {
        const days = Math.floor(seconds / 86400);
        return `${days} days`;
    } else if(seconds > 3600) {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hours`;
    } else {
        return generateTimeString(seconds, true);
    }
}

// Creates string from given number of seconds
export function generateTimeString(seconds: number, showSeconds: boolean = false) {
    // Generate second multipliers for counting each
    const multipliers: { [key: string]: number } = {
        "day": 60 * 60 * 24,
        "hour": 60 * 60,
        "minute": 60,
        "second": 1,
    };
    if(showSeconds) {
        multipliers["second"] = 1;
    }

    // Generate day, hour, minute and optionally second values
    const values: { [key: string]: number } = {};
    let currentSeconds = seconds;
    for(const [key, multiplier] of Object.entries(multipliers)) {
        const amount = Math.floor(currentSeconds / multiplier);
        currentSeconds -= amount * multiplier;
        values[key] = amount;
    }

    // Turn into string and generate string things
    const finalChunks = [];
    for(const [key, value] of Object.entries(values)) {
        if(value !== 0) {
            const s = value > 1 ? "s" : "";
            finalChunks.push(`${value} ${key}${s}`);
        }
    }
    let finalString = finalChunks.join(", ");
    const numCommas = finalString.split(",").length - 1;
    if(numCommas === 0) { // Single, no commas needed
    } else if(numCommas === 1) { // Replace ", " with " and "
        finalString = finalString.replace(", ", " and ");
    } else { // Weird thing: reverse, replace " ," with " dna ,", then reverse again
        let reversed = finalString.split("").reverse().join("");
        reversed = reversed.replace(" ,", " dna ,");
        finalString = reversed.split("").reverse().join("");
    }

    return finalString !== ""
        ? finalString : "0 seconds";
}
(window as any)["generate"] = generateTimeString;

export function truncateWords(input: string, maxLen: number) {
    if(input.length <= maxLen) { return input; }
    return input.substr(0, input.lastIndexOf(" ", maxLen));
}

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt
// https://gist.github.com/deweller/13015c28ff6ef981693545b664591b01
export async function encryptAES256GCM(text: string, keyStr: string) {
    const pwUtf8 = new TextEncoder().encode(keyStr);
    const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);
    const keyBuf = await crypto.subtle.importKey("raw", pwHash, "AES-GCM", true, ["encrypt"]);
    const encoded = new TextEncoder().encode(text);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ctBuf = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        keyBuf, encoded,
    );
    const ctArray = Array.from(new Uint8Array(ctBuf));
    const ctStr = ctArray.map(byte => String.fromCharCode(byte)).join('');
    const ctBase64 = btoa(ctStr);
    const ivHex = Array.from(iv).map(b => ('00' + b.toString(16)).slice(-2)).join(''); 

    return ivHex + ctBase64;
}

export async function decryptAES256GCM(ciphertext: string, keyStr: string) {
    const pwUtf8 = new TextEncoder().encode(keyStr);
    const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);
    const keyBuf = await crypto.subtle.importKey("raw", pwHash, "AES-GCM", true, ["decrypt"]);
    const iv = (ciphertext.slice(0,24).match(/.{2}/g) ?? []).map(byte => parseInt(byte, 16));
    const ctStr = atob(ciphertext.slice(24));
    const ctUint8 = new Uint8Array(new ArrayBuffer(ctStr.length));
    for (let i = 0; i < ctStr.length; i++) {
        ctUint8[i] = ctStr.charCodeAt(i);
    }
    const plainBuffer = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: new Uint8Array(iv) }, 
        keyBuf, ctUint8
    );                
    const plaintext = new TextDecoder().decode(plainBuffer);

    return plaintext;
}

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
// Incredibly slow for hashing...
export async function hashSHA256(text: string) {
    const msgUint8 = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); 
    const hashArray = Array.from(new Uint8Array(hashBuffer)); 
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""); 
    return hashHex;
}

// https://stackoverflow.com/questions/1655769/fastest-md5-implementation-in-javascript
export function md5(inputString:string) {
    var hc="0123456789abcdef";
    function rh(n:any) {var j,s="";for(j=0;j<=3;j++) s+=hc.charAt((n>>(j*8+4))&0x0F)+hc.charAt((n>>(j*8))&0x0F);return s;}
    function ad(x:any,y:any) {var l=(x&0xFFFF)+(y&0xFFFF);var m=(x>>16)+(y>>16)+(l>>16);return (m<<16)|(l&0xFFFF);}
    function rl(n:any,c:any)            {return (n<<c)|(n>>>(32-c));}
    function cm(q:any,a:any,b:any,x:any,s:any,t:any)    {return ad(rl(ad(ad(a,q),ad(x,t)),s),b);}
    function ff(a:any,b:any,c:any,d:any,x:any,s:any,t:any)  {return cm((b&c)|((~b)&d),a,b,x,s,t);}
    function gg(a:any,b:any,c:any,d:any,x:any,s:any,t:any)  {return cm((b&d)|(c&(~d)),a,b,x,s,t);}
    function hh(a:any,b:any,c:any,d:any,x:any,s:any,t:any)  {return cm(b^c^d,a,b,x,s,t);}
    function ii(a:any,b:any,c:any,d:any,x:any,s:any,t:any)  {return cm(c^(b|(~d)),a,b,x,s,t);}
    function sb(x:any) {
        var i;var nblk=((x.length+8)>>6)+1;var blks=new Array(nblk*16);for(i=0;i<nblk*16;i++) blks[i]=0;
        for(i=0;i<x.length;i++) blks[i>>2]|=x.charCodeAt(i)<<((i%4)*8);
        blks[i>>2]|=0x80<<((i%4)*8);blks[nblk*16-2]=x.length*8;return blks;
    }
    var i,x=sb(""+inputString),a=1732584193,b=-271733879,c=-1732584194,d=271733878,olda,oldb,oldc,oldd;
    for(i=0;i<x.length;i+=16) {olda=a;oldb=b;oldc=c;oldd=d;
        a=ff(a,b,c,d,x[i+ 0], 7, -680876936);d=ff(d,a,b,c,x[i+ 1],12, -389564586);c=ff(c,d,a,b,x[i+ 2],17,  606105819);
        b=ff(b,c,d,a,x[i+ 3],22,-1044525330);a=ff(a,b,c,d,x[i+ 4], 7, -176418897);d=ff(d,a,b,c,x[i+ 5],12, 1200080426);
        c=ff(c,d,a,b,x[i+ 6],17,-1473231341);b=ff(b,c,d,a,x[i+ 7],22,  -45705983);a=ff(a,b,c,d,x[i+ 8], 7, 1770035416);
        d=ff(d,a,b,c,x[i+ 9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,     -42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
        a=ff(a,b,c,d,x[i+12], 7, 1804603682);d=ff(d,a,b,c,x[i+13],12,  -40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);
        b=ff(b,c,d,a,x[i+15],22, 1236535329);a=gg(a,b,c,d,x[i+ 1], 5, -165796510);d=gg(d,a,b,c,x[i+ 6], 9,-1069501632);
        c=gg(c,d,a,b,x[i+11],14,  643717713);b=gg(b,c,d,a,x[i+ 0],20, -373897302);a=gg(a,b,c,d,x[i+ 5], 5, -701558691);
        d=gg(d,a,b,c,x[i+10], 9,   38016083);c=gg(c,d,a,b,x[i+15],14, -660478335);b=gg(b,c,d,a,x[i+ 4],20, -405537848);
        a=gg(a,b,c,d,x[i+ 9], 5,  568446438);d=gg(d,a,b,c,x[i+14], 9,-1019803690);c=gg(c,d,a,b,x[i+ 3],14, -187363961);
        b=gg(b,c,d,a,x[i+ 8],20, 1163531501);a=gg(a,b,c,d,x[i+13], 5,-1444681467);d=gg(d,a,b,c,x[i+ 2], 9,  -51403784);
        c=gg(c,d,a,b,x[i+ 7],14, 1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);a=hh(a,b,c,d,x[i+ 5], 4,    -378558);
        d=hh(d,a,b,c,x[i+ 8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16, 1839030562);b=hh(b,c,d,a,x[i+14],23,  -35309556);
        a=hh(a,b,c,d,x[i+ 1], 4,-1530992060);d=hh(d,a,b,c,x[i+ 4],11, 1272893353);c=hh(c,d,a,b,x[i+ 7],16, -155497632);
        b=hh(b,c,d,a,x[i+10],23,-1094730640);a=hh(a,b,c,d,x[i+13], 4,  681279174);d=hh(d,a,b,c,x[i+ 0],11, -358537222);
        c=hh(c,d,a,b,x[i+ 3],16, -722521979);b=hh(b,c,d,a,x[i+ 6],23,   76029189);a=hh(a,b,c,d,x[i+ 9], 4, -640364487);
        d=hh(d,a,b,c,x[i+12],11, -421815835);c=hh(c,d,a,b,x[i+15],16,  530742520);b=hh(b,c,d,a,x[i+ 2],23, -995338651);
        a=ii(a,b,c,d,x[i+ 0], 6, -198630844);d=ii(d,a,b,c,x[i+ 7],10, 1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);
        b=ii(b,c,d,a,x[i+ 5],21,  -57434055);a=ii(a,b,c,d,x[i+12], 6, 1700485571);d=ii(d,a,b,c,x[i+ 3],10,-1894986606);
        c=ii(c,d,a,b,x[i+10],15,   -1051523);b=ii(b,c,d,a,x[i+ 1],21,-2054922799);a=ii(a,b,c,d,x[i+ 8], 6, 1873313359);
        d=ii(d,a,b,c,x[i+15],10,  -30611744);c=ii(c,d,a,b,x[i+ 6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21, 1309151649);
        a=ii(a,b,c,d,x[i+ 4], 6, -145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+ 2],15,  718787259);
        b=ii(b,c,d,a,x[i+ 9],21, -343485551);a=ad(a,olda);b=ad(b,oldb);c=ad(c,oldc);d=ad(d,oldd);
    }
    return rh(a)+rh(b)+rh(c)+rh(d);
}

// Display name for extensions
export const extensionDisplayNames: { [key: string]: string } = {
    "dice": "Dice",
    "guess-timer": "Guess the Timer",
    "link": "Share Link",
    "pillory": "Pillory",
    "random-events": "Random Events",
    "tasks": "Tasks",
    "temporary-opening": "Hygiene Opening",
    "extended-wheel-of-fortune": "Extended Wheel of Fortune"
}

// Chinese whisper for typing tasks
// A-Z gets replaced with random A-Z character (same case)
// 0-9 gets replaced with random number
// Symbols get replaced by random symbols
export function chineseWhisper(line: string) {
    let newLine = "";
    while(true) {
        // Get random character and check
        const randomIndex = Math.floor(Math.random() * line.length);
        const randomChar = line.charAt(randomIndex);
        const randomCharCode = randomChar.charCodeAt(0);
        let newChar: string = "";
        if(randomCharCode >= 65 && randomCharCode <= 90) {
            // A-Z, generate random A-Z and replace
            do {
                newChar = generateRandomString(1, "upper-alpha");
            } while(newChar === randomChar)
        } else if(randomCharCode >= 97 && randomCharCode <= 122) {
            // a-z, generate random a-z and replace
            do {
                newChar = generateRandomString(1, "lower-alpha");
            } while(newChar === randomChar)
        } else if(randomCharCode >= 48 && randomCharCode <= 57) {
            // 0-9, generate random 0-9 and replace
            do {
                newChar = generateRandomString(1, "numeric");
            } while(newChar === randomChar)
        } else if(randomCharCode >= 33 && randomCharCode <= 126) {
            // Other symbols (not space), generate random symbol and replace
            do {
                newChar = generateRandomString(1, "symbols");
            } while(newChar === randomChar)
        }

        // If new char is defined, replace and break
        if(newChar !== "") {
            const splitLine = line.split("");
            splitLine[randomIndex] = newChar;
            newLine = splitLine.join("");
            break;
        }
    }

    return newLine;
}

// Generate outcome effect label for extended wheel
export function generateOutcomeEffectLabel(actionData: LockEffectData): string {
    let actionText = "";

    if(actionData.key === "customText") {
        actionText = actionData.params[0];
    } else if(actionData.key === "resetLock") {
        actionText = "**[Lock]** Reset the lock";
    } else if(actionData.key === "unlock") {
        actionText = "**[Lock]** Unlock the lock";
    } else if(actionData.key === "freeze") {
        actionText = `**[Lock]** ${actionData.params[0] === true ? "Freeze"
            : actionData.params[0] === false ? "Unfreeze" : "Toggle freeze on"} the lock`;
    } else if(actionData.key === "pillory") {
        const paramDuration = generateTimeString(Math.abs(actionData.params[0]));
        actionText = `**[Lock]** Pillory for ${paramDuration}`;
    } else if(actionData.key === "hygieneUnlock") {
        actionText = "**[Lock]** Perform a hygiene unlock";
    } else if(actionData.key === "requestVerification") {
        actionText = "**[Verification]** Request a verification picture";
    } else if(actionData.key === "assignTask") {
        actionText = `**[Tasks]** Assign the task "${actionData.params[0].task}"`;
    } else if(actionData.key === "assignTaskRandom") {
        actionText = actionData.params[0] === undefined
            ? "**[Tasks]** Assign a random task"
            : "**[Tasks]** Have users vote on a task";
    } else if(actionData.key === "modifyTasks") {
        actionText = "**[Tasks]** Modify the task list (too complex)";
    } else if(actionData.key === "updateLockDuration") {
        const value = `${actionData.params[0] !== "multiply" 
            ? actionData.params[1] < 0 ? "-" : "+" : "x"}` + (actionData.params[0] !== "multiply"
            ? generateTimeString(Math.abs(actionData.params[1])) : `${actionData.params[1]}`);
        const value2 = actionData.params[2]
            ? `${actionData.params[0] !== "multiply" 
                ? actionData.params[2] < 0 ? "-" : "+" : "x"}` + (actionData.params[0] !== "multiply"
                ? generateTimeString(Math.abs(actionData.params[2])) : `${actionData.params[2]}`)
            : "";
        const valueStr = `${value2 ? "between " : ""}${value}${value2 ? " and " : ""}${value2}`;
        actionText = actionData.params[0] === "modify"
            ? `**[Lock]** Modify the remaining lock time by ${valueStr}`
            : actionData.params[0] === "multiply"
                ? `**[Lock]** Multiply the remaining lock time by ${valueStr}`
            : `**[Lock]** Set the remaining lock time to ${valueStr}`;
    } else if(actionData.key === "updateLockSettings") {
        actionText = `**[Lock]** `;
        if(actionData.params[0] !== undefined) {
            actionText += `${actionData.params[0] ? "Display" : "Hide"} remaining lock time`;
            if(actionData.params[1] !== undefined) {
                actionText += " | ";
            }
        }
        if(actionData.params[1] !== undefined) {
            actionText += `${actionData.params[0] ? "Hide" : "Show"} time changes.`;
        }
    } else if(actionData.key === "disableExtension") {
        const extensionDisplayName = extensionDisplayNames[actionData.params[0]];
        actionText = `**[Lock]** Disable the extension "${extensionDisplayName}"`;
    } else if(actionData.key === "enableExtension") {
        const extensionDisplayName = extensionDisplayNames[actionData.params[0]];
        actionText = `**[Lock]** Enable the extension "${extensionDisplayName}"`;
    } else if(actionData.key === "resetTaskPoints") {
        actionText = "**[Tasks]** Reset the gained number of task points";
    } else if(actionData.key === "shareLinkUpdateKey") {
        const value = `${actionData.params[0] !== "nbVisits" && actionData.params[1] !== "multiply" 
            ? actionData.params[2] < 0 ? "-" : "+" : "x"}` + (actionData.params[0] !== "nbVisits" && actionData.params[1] !== "multiply"
            ? generateTimeString(Math.abs(actionData.params[2])) : `${actionData.params[2]}`);
        const value2 = actionData.params[3]
            ? `${actionData.params[0] !== "nbVisits" && actionData.params[1] !== "multiply" 
                ? actionData.params[3] < 0 ? "-" : "+" : "x"}` + (actionData.params[0] !== "nbVisits" && actionData.params[1] !== "multiply"
                ? generateTimeString(Math.abs(actionData.params[3])) : `${actionData.params[3]}`)
            : "";
        const valueStr = `${value2 ? "between " : ""}${value}${value2 ? " and " : ""}${value2}`;
        const affected = actionData.params[0] === "nbVisits" ? "number of required visits"
            : actionData.params[0] === "timeToAdd" ? "link add time" : "link remove time";
        if(actionData.params[1] === "set") {
            actionText = `**[Share Link]** Set the ${affected} to ${valueStr}`;
        } else if(actionData.params[1] === "modify") {
            actionText = `**[Share Link]** ${actionData.params[2] > 0 ? "Increase" : "Decrease"} the ${affected} by ${valueStr}`;
        } else { // multiply
            actionText = `**[Share Link]** Multiply the ${affected} by ${valueStr}`;
        }
    } else if(actionData.key === "shareLinkSetLoggedIn") {
        actionText = actionData.params[0] === undefined
            ? "**[Share Link]** Toggle the logged-in requirement"
            : `**[Share Link]** ${actionData.params ? "Enable" : "Disable"} the logged-in requirement`;
    } else if(actionData.key === "pilloryUpdateDuration") {
        const value = `${actionData.params[0] !== "multiply" 
            ? actionData.params[1] < 0 ? "-" : "+" : "x"}` + (actionData.params[0] !== "multiply"
            ? generateTimeString(Math.abs(actionData.params[1])) : `${actionData.params[1]}`);
        const value2 = actionData.params[2]
            ? `${actionData.params[0] !== "multiply" 
                ? actionData.params[2] < 0 ? "-" : "+" : "x"}` + (actionData.params[0] !== "multiply"
                ? generateTimeString(Math.abs(actionData.params[2])) : `${actionData.params[2]}`)
            : "";
        const valueStr = `${value2 ? "between " : ""}${value}${value2 ? " and " : ""}${value2}`;
        actionText = actionData.params[0] === "modify"
            ? actionData.params[1] > 0
                ? `**[Pillory]** Add ${valueStr} to the per-vote duration`
                : `**[Pillory]** Subtract ${valueStr} from the per-vote duration`
            : actionData.params[0] === "multiply"
                ? `**[Pillory]** Multiply the per-vote duration by ${valueStr}`
            : `**[Pillory]** Set the per-vote duration to ${valueStr}`;
    } else if(actionData.key === "diceUpdateDuration") {
        const value = `${actionData.params[0] !== "multiply" 
            ? actionData.params[1] < 0 ? "-" : "+" : "x"}` + (actionData.params[0] !== "multiply"
            ? generateTimeString(Math.abs(actionData.params[1])) : `${actionData.params[1]}`);
        const value2 = actionData.params[2]
            ? `${actionData.params[0] !== "multiply" 
                ? actionData.params[2] < 0 ? "-" : "+" : "x"}` + (actionData.params[0] !== "multiply"
                ? generateTimeString(Math.abs(actionData.params[2])) : `${actionData.params[2]}`)
            : "";
        const valueStr = `${value2 ? "between " : ""}${value}${value2 ? " and " : ""}${value2}`;
        actionText = actionData.params[0] === "modify"
            ? actionData.params[1] > 0
                ? `**[Dice]** Add ${valueStr} to the duration multiplier`
                : `**[Dice]** Subtract ${valueStr} from the duration multiplier`
            : actionData.params[0] === "multiply"
                ? `**[Dice]** Multiply the duration multiplier by ${valueStr}`
            : `**[Dice]** Set the duration multiplier to ${valueStr}`;
    } else if(actionData.key === "tasksUpdateRequiredPoints") {
        const value = `${actionData.params[0] !== "multiply" 
            ? actionData.params[1] < 0 ? "-" : "+" : "x"}` + (actionData.params[0] !== "multiply"
            ? generateTimeString(Math.abs(actionData.params[1])) : `${actionData.params[1]}`);
        const value2 = actionData.params[2]
            ? `${actionData.params[0] !== "multiply" 
                ? actionData.params[2] < 0 ? "-" : "+" : "x"}` + (actionData.params[0] !== "multiply"
                ? generateTimeString(Math.abs(actionData.params[2])) : `${actionData.params[2]}`)
            : "";
        const valueStr = `${value2 ? "between " : ""}${value}${value2 ? " and " : ""}${value2}`;
        actionText = actionData.params[0] === "modify"
            ? actionData.params[1] > 0
                ? `**[Tasks]** Add ${valueStr} to the required points`
                : `**[Tasks]** Subtract ${valueStr} from the required points`
            : actionData.params[0] === "multiply"
                ? `**[Tasks]** Multiply the required points by ${valueStr}`
            : `**[Tasks]** Set the required points to ${valueStr}`;
    } else if(actionData.key === "randomEventsModifyDifficulty") {
        const firstUpper = actionData.params[0].charAt(0).toUpperCase() + actionData.params[0].slice(1);
        actionText = `**[Random]** Set the difficulty to ${firstUpper}`;
    } else if(actionData.key === "guessTimerUpdateKey") {
        const affected = actionData.params[0] === "minRandomTime"
            ? "minimum added duration" : "maximum added duration";
        const value = `${actionData.params[1] !== "multiply" 
            ? actionData.params[2] < 0 ? "-" : "+" : "x"}` + (actionData.params[1] !== "multiply"
            ? generateTimeString(Math.abs(actionData.params[2])) : `${actionData.params[2]}`);
        const value2 = actionData.params[3]
            ? `${actionData.params[1] !== "multiply" 
                ? actionData.params[3] < 0 ? "-" : "+" : "x"}` + (actionData.params[1] !== "multiply"
                ? generateTimeString(Math.abs(actionData.params[3])) : `${actionData.params[3]}`)
            : "";
        const valueStr = `${value2 ? "between " : ""}${value}${value2 ? " and " : ""}${value2}`;
        actionText = actionData.params[1] === "modify"
            ? actionData.params[2] > 0
                ? `**[Guess]** Add ${valueStr} to the ${affected}`
                : `**[Guess]** Subtract ${valueStr} from the ${affected}`
            : actionData.params[1] === "multiply"
                ? `**[Guess]** Multiply the ${affected} by ${valueStr}`
            : `**[Guess]** Set the ${affected} to ${valueStr}`;
    } else if(actionData.key === "delayLockEffect") {
        // Currently only output first delayed lock effect
        const delayedEffectS = Math.floor(actionData.params[1] / 1000);
        const delayedTimeString = generateTimeString(delayedEffectS, true);
        const restEffectLabel = generateOutcomeEffectLabel(actionData.params[0]);

        actionText = `**Delay activation by ${delayedTimeString}:**\n➜ ${restEffectLabel}`;
    } else if(actionData.key === "partnerAddRemoveReason") {
        const display = actionData.params[0] === "extended-wheel-of-fortune"
            ? "Extended Wheel" : "";
        actionText = `**[${display}]** ${actionData.params[1] === "add" 
            ? "Add" : "Remove"} reason preventing unlocking:\n➜ ${actionData.params[2]}`;
    } else if(actionData.key === "extendedSetDisabled") {
        actionText = `**[Extended Wheel]** ${actionData.params[2] === true ? "Disable"
            : actionData.params[2] === false ? "Enable" : "Toggle access to"} the wheel named "${actionData.params[1]}"`;  
    } else if(actionData.key === "extendedAddOutcome") {
        actionText = `**[Extended Wheel]** Add outcome named "${actionData.params[1].text}"`;
    } else if(actionData.key === "extendedRemoveOutcome") {
        actionText = `**[Extended Wheel]** Remove outcome named "${actionData.params[1]}"`;
    } else if(actionData.key === "extendedUpdatePercentage") {
        const value = `${actionData.params[2] !== "multiply" 
            ? actionData.params[3] < 0 ? "-" : "+" : "x"}` + (actionData.params[2] !== "multiply"
            ? generateTimeString(Math.abs(actionData.params[3])) : `${actionData.params[3]}`);
        const value2 = actionData.params[4]
            ? `${actionData.params[2] !== "multiply" 
                ? actionData.params[4] < 0 ? "-" : "+" : "x"}` + (actionData.params[2] !== "multiply"
                ? generateTimeString(Math.abs(actionData.params[4])) : `${actionData.params[4]}`)
            : "";
        const valueStr = `${value2 ? "between " : ""}${value}${value2 ? " and " : ""}${value2}`;
        actionText = actionData.params[2] === "modify"
            ? actionData.params[3] > 0
                ? `**[Extended Wheel]** Add ${valueStr} to the weight of outcome "${actionData.params[1]}`
                : `**[Extended Wheel]** Subtract ${valueStr} from the weight of outcome "${actionData.params[1]}`
            : actionData.params[2] === "multiply"
                ? `**[Extended Wheel]** Multiply the weight of outcome "${actionData.params[1]} by ${valueStr}`
            : `**[Extended Wheel]** Set the weight of outcome "${actionData.params[1]} to ${valueStr}`;
    }

    return actionText;
}
