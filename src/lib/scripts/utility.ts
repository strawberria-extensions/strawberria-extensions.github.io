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

    // Generate day, hour, minute, and optionally second values
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
export function generateOutcomeEffectLabel(actionData: LockEffectData) {
    let actionText = "";

    if(actionData.key === "resetLock") {
        actionText = "[Lock] Reset the lock";
    } else if(actionData.key === "unlock") {
        actionText = "[Lock] Unlock the lock";
    } else if(actionData.key === "freeze") {
        actionText = `[Lock] ${actionData.params[0] === true ? "Freeze"
            : actionData.params[0] === false ? "Unfreeze" : "Toggle freeze on"} the lock`;
    } else if(actionData.key === "pillory") {
        const paramDuration = generateTimeString(Math.abs(actionData.params[0]));
        actionText = `[Lock] Pillory for ${paramDuration}`;
    } else if(actionData.key === "hygieneUnlock") {
        actionText = "[Lock] Perform a hygiene unlock";
    } else if(actionData.key === "requestVerification") {
        actionText = "[Verification] Request a verification picture";
    } else if(actionData.key === "assignTask") {
        actionText = `[Tasks] Assign the task "${actionData.params[0].task}"`;
    } else if(actionData.key === "assignTaskRandom") {
        actionText = actionData.params[0] === undefined
            ? "[Tasks] Assign a random task"
            : "[Tasks] Have users vote on a task";
    } else if(actionData.key === "modifyTasks") {
        actionText = "[Tasks] Modify the task list (too complex)";
    } else if(actionData.key === "updateLockDuration") {
        const value = `${actionData.params[0] !== "multiply"
            ? generateTimeString(Math.abs(actionData.params[1])) : actionData.params[1]}`;
        const value2 = actionData.params[2] !== undefined 
            ? `${actionData.params[0] !== "multiply"
                ? generateTimeString(Math.abs(actionData.params[2])) : actionData.params[2]}`
            : undefined;
        const valueStr = `${value2 ? "between " : ""}${actionData.params[1] < 0 ? "-" : ""}${value}${value2 ? " and " : ""}${(actionData.params[2] ?? 0) < 0 ? "-" : ""}${value2}`;
        actionText = actionData.params[0] === "modify"
            ? `[Lock] Modify the remaining lock time by ${valueStr}`
            : actionData.params[0] === "multiply"
                ? `[Lock] Multiply the remaining lock time by ${valueStr}`
            : `[Lock] Set the remaining lock time to ${valueStr}`;
    } else if(actionData.key === "updateLockSettings") {
        actionText = `[Lock] `;
        if(actionData.params[0] !== undefined) {
            actionText += `${actionData.params[0] ? "Display" : "Hide"} remaining lock time`;
            if(actionData.params[1] !== undefined) {
                actionText += ", ";
            }
        }
        if(actionData.params[1] !== undefined) {
            actionText += `${actionData.params[0] ? "Hide" : "Show"} time changes.`;
        }
    } else if(actionData.key === "disableExtension") {
        const extensionDisplayName = extensionDisplayNames[actionData.params[0]];
        actionText = `[Lock] Disable the extension '${extensionDisplayName}'`;
    } else if(actionData.key === "enableExtension") {
        const extensionDisplayName = extensionDisplayNames[actionData.params[0]];
        actionText = `[Lock] Enable the extension '${extensionDisplayName}'`;
    } else if(actionData.key === "resetTaskPoints") {
        actionText = "[Tasks] Reset the gained number of task points";
    } else if(actionData.key === "shareLinkModifyKey") {
        const value = `${actionData.params[0] !== "nbVisits" && actionData.params[1] !== "multiply"
            ? generateTimeString(Math.abs(actionData.params[2])) : actionData.params[2]}`;
        const value2 = actionData.params[3] !== undefined 
            ? `${actionData.params[0] !== "nbVisits" && actionData.params[1] !== "multiply"
                ? generateTimeString(Math.abs(actionData.params[3])) : actionData.params[3]}`
            : undefined;
        const valueStr = `${value2 ? "between " : ""}${value}${value2 ? " and " : ""}${value2}`;
        const affected = actionData.params[0] === "nbVisits" ? "number of required visits"
            : actionData.params[0] === "timeToAdd" ? "link add time" : "link remove time";
        if(actionData.params[1] === "set") {
            actionText = `[Share Link] Set the ${affected} to ${valueStr}`;
        } else if(actionData.params[1] === "modify") {
            actionText = `[Share Link] ${actionData.params[2] > 0 ? "Increase" : "Decrease"} the ${affected} by ${valueStr}`;
        } else { // multiply
            actionText = `[Share Link] Multiply the ${affected} by ${valueStr}`;
        }
    } else if(actionData.key === "shareLinkSetLoggedIn") {
        actionText = actionData.params[0] === undefined
            ? "[Share Link] Toggle the logged-in requirement"
            : `[Share Link] ${actionData.params ? "Enable" : "Disable"} the logged-in requirement`;
    } else if(actionData.key === "pilloryModifyDuration") {
        const value = `${actionData.params[0] !== "multiply"
            ? generateTimeString(Math.abs(actionData.params[1])) : actionData.params[1]}`;
        const value2 = actionData.params[2] !== undefined 
            ? `${actionData.params[0] !== "multiply"
                ? generateTimeString(Math.abs(actionData.params[2])) : actionData.params[2]}`
            : undefined;
        const valueStr = `${value2 ? "between " : ""}${value}${value2 ? " and " : ""}${value2}`;
        actionText = actionData.params[0] === "modify"
            ? actionData.params[1] > 0
                ? `[Pillory] Add ${valueStr} to the per-vote duration`
                : `[Pillory] Subtract ${valueStr} from the per-vote duration`
            : actionData.params[0] === "multiply"
                ? `[Pillory] Multiply the per-vote duration by ${valueStr}`
            : `[Pillory] Set the per-vote duration to ${valueStr}`;
    } else if(actionData.key === "diceModifyDuration") {
        const value = `${actionData.params[0] !== "multiply"
            ? generateTimeString(Math.abs(actionData.params[1])) : actionData.params[1]}`;
        const value2 = actionData.params[2] !== undefined 
            ? `${actionData.params[0] !== "multiply"
                ? generateTimeString(Math.abs(actionData.params[2])) : actionData.params[2]}`
            : undefined;
        const valueStr = `${value2 ? "between " : ""}${value}${value2 ? " and " : ""}${value2}`;
        actionText = actionData.params[0] === "modify"
            ? actionData.params[1] > 0
                ? `[Dice] Add ${valueStr} to the duration multiplier`
                : `[Dice] Subtract ${valueStr} from the duration multiplier`
            : actionData.params[0] === "multiply"
                ? `[Dice] Multiply the duration multiplier by ${valueStr}`
            : `[Dice] Set the duration multiplier to ${valueStr}`;
    } else if(actionData.key === "tasksModifyRequiredPoints") {
        const value = `${actionData.params[0] !== "multiply"
            ? generateTimeString(Math.abs(actionData.params[1])) : actionData.params[1]}`;
        const value2 = actionData.params[2] !== undefined 
            ? `${actionData.params[0] !== "multiply"
                ? generateTimeString(Math.abs(actionData.params[2])) : actionData.params[2]}`
            : undefined;
        const valueStr = `${value2 ? "between " : ""}${value}${value2 ? " and " : ""}${value2}`;
        actionText = actionData.params[0] === "modify"
            ? actionData.params[1] > 0
                ? `[Tasks] Add ${valueStr} to the required points`
                : `[Tasks] Subtract ${valueStr} from the required points`
            : actionData.params[0] === "multiply"
                ? `[Tasks] Multiply the required points by ${actionData.params[1]}`
            : `[Tasks] Set the required points to ${valueStr}`;
    } else if(actionData.key === "randomEventsModifyDifficulty") {
        const firstUpper = actionData.params[0].charAt(0).toUpperCase() + actionData.params[0].slice(1);
        actionText = `[Random] Set the difficulty to ${firstUpper}`;
    } else if(actionData.key === "guessTimerModifyKey") {
        const affected = actionData.params[0] === "minRandomTime"
            ? "minimum added duration" : "maximum added duration";
        const value = `${actionData.params[1] !== "multiply"
            ? generateTimeString(Math.abs(actionData.params[2])) : actionData.params[2]}`;
        const value2 = actionData.params[3] !== undefined 
            ? `${actionData.params[1] !== "multiply"
                ? generateTimeString(Math.abs(actionData.params[3])) : actionData.params[3]}`
            : undefined;
        const valueStr = `${value2 ? "between " : ""}${value}${value2 ? " and " : ""}${value2}`;
        actionText = actionData.params[1] === "modify"
            ? actionData.params[2] > 0
                ? `[Guess] Add ${valueStr} to the ${affected}`
                : `[Guess] Subtract ${valueStr} from the ${affected}`
            : actionData.params[1] === "multiply"
                ? `[Guess] Multiply the ${affected} by ${valueStr}`
            : `[Guess] Set the ${affected} to ${valueStr}`;
    }

    return actionText;
}