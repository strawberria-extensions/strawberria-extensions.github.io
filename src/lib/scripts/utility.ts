import type { ChasterCustomConfig_ExtendedWheel, ExtendedWheelConfig_ActionData } from "./backend";
import type { ExtendedWheelConfig_User } from "./signature-extended_wheel";
import type { ExtensionSlug, LockEffectData } from "./signature-lock_effects";

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
export const extensionDisplayNames: { [key in ExtensionSlug]-?: string } = {
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
export function generateOutcomeEffectLabel(actionData: LockEffectData, configData: ExtendedWheelConfig_User) {
    let actionText = "";

    // Extension enabling and disabling
    if(actionData.key === "extension-enable") {
        const extensionDisplayName = extensionDisplayNames[actionData.params[0]];
        actionText = `Enable the extension '${extensionDisplayName}'`;
    } else if(actionData.key === "extension-disable") {
        const extensionDisplayName = extensionDisplayNames[actionData.params[0]];
        actionText = `Disable the extension '${extensionDisplayName}'`;
    }

    // Lock-related
    else if(actionData.key === "lock-time-modify") {
        const paramDuration = generateTimeString(Math.abs(actionData.params[1]));
        actionText = actionData.params[0] === "modify"
            ? actionData.params[1] > 0
                ? `[Lock] Add ${paramDuration} to the remaining time`
                : `[Lock] Remove ${paramDuration} from the remaining time`
            : actionData.params[0] === "multiply"
                ? `[Lock] Multiply the remaining time by ${actionData.params[1]}`
            : `[Lock] Set the remaining time to ${paramDuration}`;
    } else if(actionData.key === "lock-show_timer") {
        actionText = `[Lock] Show remaining time`;
    } else if(actionData.key === "lock-hide_timer") {
        actionText = `[Lock] Hide remaining time`;
    } else if(actionData.key === "lock-show_history") {
        actionText = `[Lock] Show lock history`;
    } else if(actionData.key === "lock-hide_history") {
        actionText = `[Lock] Hide lock history`;
    } else if(actionData.key === "lock-freeze") {
        actionText = `[Lock] Freeze the lock`;
    } else if(actionData.key === "lock-unfreeze") {
        actionText = `[Lock] Unfreeze the lock`;
    } else if(actionData.key === "lock-toggle_freeze") {
        actionText = `[Lock] Toggle the lock freeze status`;
    } else if(actionData.key === "lock-unlock") {
        actionText = `[Lock] Unlock the lock`;
    }

    // Share link
    else if(actionData.key === "share_link-requirement-modify") {
        actionText = actionData.params[0] === "modify"
            ? actionData.params[1] > 0
                ? `[Share Link] Increase the share link requirement by ${actionData.params[1]}`
                : `[Share Link] Decrease the share link requirement by ${actionData.params[1]}`
            : actionData.params[0] === "multiply"
                ? `[Share Link] Multiply the share link requirement by ${actionData.params[1]}`
            : `[Share Link] Set the share link requirement to ${actionData.params[1]}`;
    } else if(actionData.key === "share_link-add_time-modify" || actionData.key === "share_link-remove_time-modify") {
        const addRemoveText = actionData.key === "share_link-add_time-modify"
            ? "Add Time" : "Remove Time";
        const paramDuration = generateTimeString(Math.abs(actionData.params[1]));
        actionText = actionData.params[0] === "modify"
            ? actionData.params[1] > 0
                ? `[Share Link] Increase the share link '${addRemoveText}' duration by ${paramDuration}`
                : `[Share Link] Decrease the share link '${addRemoveText}' duration by ${paramDuration}`
            : actionData.params[0] === "multiply"
                ? `[Share Link] Multiply the share link '${addRemoveText}' duration by ${actionData.params[1]}`
            : `[Share Link] Set the share link '${addRemoveText}' duration to ${paramDuration}`;
    } else if(actionData.key === "share_link-logged_in-set") {
        actionText = actionData.params[0] === true
            ? `[Share Link] Allow only logged-in users to vote on share links`
            : `[Share Link] Allow anyone (including users not logged-in) to vote on share links`;
    }

    // Pillory
    else if(actionData.key === "pillory-duration-modify") {
        const paramDuration = generateTimeString(Math.abs(actionData.params[1]));
        actionText = actionData.params[0] === "modify"
            ? actionData.params[1] > 0
                ? `[Pillory] Increase the pillory per-vote added duration by ${paramDuration}`
                : `[Pillory] Decrease the pillory per-vote added duration by ${paramDuration}`
            : actionData.params[0] === "multiply"
                ? `[Pillory] Multiply the pillory per-vote added duration by ${actionData.params[1]}`
            : `[Pillory] Set the pillory per-vote added duration to ${paramDuration}`;
    } else if(actionData.key === "pillory-put") {
        const paramDuration = generateTimeString(Math.abs(actionData.params[0]));
        actionText = `[Pillory] Put the wearer into the pillory for ${paramDuration} with the reason '${actionData.params[1]}'`
    }

    // Hygiene unlock - disallow any modifications
    else if(actionData.key === "hygiene-unlock") {
        actionText = `[Hygiene Unlock] Perform a keyholder-initiated hygiene unlock`;
    }

    // Dice
    else if(actionData.key === "dice-regularity-set") {
        const paramDuration = generateTimeString(actionData.params[0][1]);
        actionText = `[Dice] Set the dice regularity to mode '${actionData.params[0][0]}'`
            + (actionData.params[0][0] !== "unlimited" ? ` with regularity ${paramDuration}` : "");
    } else if(actionData.key === "dice-multiplier-modify") {
        const paramDuration = generateTimeString(Math.abs(actionData.params[1]));
        actionText = actionData.params[0] === "modify"
            ? actionData.params[1] > 0
                ? `[Dice] Increase the dice multiplier by ${paramDuration}`
                : `[Dice] Decrease the dice multiplier by ${paramDuration}`
            : actionData.params[0] === "multiply"
                ? `[Dice] Multiply the dice multiplier by ${actionData.params[1]}`
            : `[Dice] Set the dice multiplier to ${paramDuration}`;
    }

    // Tasks
    else if(actionData.key === "tasks-regularity-set") {
        const paramDuration = generateTimeString(actionData.params[0][1]);
        actionText = `[Tasks] Set the tasks regularity to mode '${actionData.params[0][0]}'`
            + (actionData.params[0][0] !== "unlimited" ? ` with regularity ${paramDuration}` : "");
    } else if(actionData.key === "tasks-task_points-modify") {
        actionText = actionData.params[0] === "modify"
            ? actionData.params[1] > 0
                ? `[Tasks] Increase the task points requirement by ${actionData.params[1]}`
                : `[Tasks] Decrease the task points requirement by ${actionData.params[1]}`
            : actionData.params[0] === "multiply"
                ? `[Tasks] Multiply the task points requirement by ${actionData.params[1]}`
            : `[Tasks] Set the task points requirement to ${actionData.params[1]}`;
    } else if(actionData.key === "tasks-task-add") {
        actionText = `[Tasks] Add the task with text '${actionData.params[0]}' worth ${actionData.params[1]} points`;
    } else if(actionData.key === "tasks-task-remove") {
        actionText = `[Tasks] Remove the task with text '${actionData.params[0]}'`;
    }

    // Random Events
    else if(actionData.key === "random-events-difficulty") {
        const capitalized = actionData.params[0].charAt(0).toUpperCase() + actionData.params[0].slice(1);
        actionText = `[Random Events] Set the random events difficulty to '${capitalized}'`;
    }

    // Guess the Timer
    else if(actionData.key === "guess_timer-min_time-modify") {
        const paramDuration = generateTimeString(Math.abs(actionData.params[1]));
        actionText = actionData.params[0] === "modify"
            ? actionData.params[1] > 0
                ? `[Guess the Timer] Increase the minimum-added duration by ${paramDuration}`
                : `[Guess the Timer] Decrease the minimum-added duration by ${paramDuration}`
            : actionData.params[0] === "multiply"
                ? `[Guess the Timer] Multiply the minimum-added duration by ${actionData.params[1]}`
            : `[Guess the Timer] Set the minimum-added duration to ${paramDuration}`;
    } else if(actionData.key === "guess_timer-max_time-modify") {
        const paramDuration = generateTimeString(Math.abs(actionData.params[1]));
        actionText = actionData.params[0] === "modify"
            ? actionData.params[1] > 0
                ? `[Guess the Timer] Increase the maximum-added duration by ${paramDuration}`
                : `[Guess the Timer] Decrease the maximum-added duration by ${paramDuration}`
            : actionData.params[0] === "multiply"
                ? `[Guess the Timer] Multiply the maximum-added duration by ${actionData.params[1]}`
            : `[Guess the Timer] Set the maximum-added duration to ${paramDuration}`;
    }

    // Extended Wheel of Fortune
    else if(actionData.key === "extended_wheel-setting") {
        const wheelName = configData.wheels[actionData.params[0]].display;
        const capitalized = actionData.params[1].charAt(0).toUpperCase() + actionData.params[1].slice(1);
        actionText = `[Extended Wheel of Fortune] ${capitalized} the setting ${actionData.params[2]} for the wheel '${wheelName}'`;
    }

    // // Extended Wheel of Fortune
    // // TODO maybe add different wheel configs to swap between?
    // else if(actionData.type === "extended_wof-wheel") {
    //     const wheelName = data.wheels[actionData.params[0]].display;
    //     actionText = `[Extended Wheel of Fortune] ${actionData.params[1] === true ? "Enable" : "Disable"} the wheel '${wheelName}'`;
    // } else if(actionData.type === "extended_wof-mode-settings") {
    //     const wheelName = data.wheels[actionData.params[0]].display;
    //     const mapping = {
    //         "disabled": "Disabled",
    //         "availableSpins": "Count Spins",
    //         "falsePercentages": "False Percentages",
    //         "hiddenActions": "Hidden Actions",
    //         "hiddenOutcomes": "Hidden Outcomes",
    //     } as any;
    //     const settingName = mapping[actionData.params[1]];
    //     actionText = `[Extended Wheel of Fortune] ${actionData.params[2] === true ? "Enable" : "Disable"} the wheel setting '${settingName}' for the wheel '${wheelName}'`;
    // } else if(actionData.type === "extended_wof-regularity-set") {
    //     const wheelName = data.wheels[actionData.params[0]].display;
    //     actionText = `[Extended Wheel of Fortune] Set the regular action for the wheel '${wheelName}' to mode '${actionData.params[1][0]}'`
    //         + (actionData.params[0][1] !== "unlimited" ? ` with regularity ${generateTimeString(actionData.params[1][1])}` : "")
    //         + ".";
    // } else if(actionData.type === "extended_wof-available-set") {
    //     const wheelName = data.wheels[actionData.params[0]].display;
    //     actionText = `[Extended Wheel of Fortune] Set the number of available spins to ${actionData.params[1]} for the wheel '${wheelName}'`;
    // } else if(actionData.type === "extended_wof-available-modify") {
    //     const wheelName = data.wheels[actionData.params[0]].display;
    //     actionText = `[Extended Wheel of Fortune] Modify the number of available spins by ${actionData.params[1]} for the wheel '${wheelName}'`;
    // } 

    return actionText;
}