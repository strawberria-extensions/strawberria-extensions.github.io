import type { ChasterExtendedWheelData } from "./backend";

// Generate random string of specified length
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export function generateRandomString(length: number) {
    let result = "";
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
        "minute": 60
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

    return finalString;
}

export function truncateWords(input: string, maxLen: number) {
    if(input.length <= maxLen) { return input; }
    return input.substr(0, input.lastIndexOf(" ", maxLen));
}

// Generate outcome action label for extended wheel
export function generateOutcomeActionLabel(outcomeData: ChasterExtendedWheelData) {
    let actionText = "";
    // Time-related
    if(outcomeData.key === "add_time") {
        actionText = `[Time] Add ${generateTimeString(outcomeData.params[0])} to the session time.`;
    } else if(outcomeData.key === "remove_time") {
        actionText = `[Time] Remove ${generateTimeString(outcomeData.params[0])} from the session time.`;
    } else if(outcomeData.key === "multiply_time") {
        actionText = `[Time] Multiply session time by ${outcomeData.params} times.`;
    } 
    // Share link
    else if(outcomeData.key === "share_link-requirement-add") {
        actionText = `[Share link] Increase the share link visit requirement by ${outcomeData.params[0]}.`;
    } else if(outcomeData.key === "share_link-requirement-remove") {
        actionText = `[Share link] Decrease the share link visit requirement by ${outcomeData.params[0]}.`;
    } else if(outcomeData.key === "share_link-requirement-multiply") {
        actionText = `[Share link] Multiply the share link visit requirement by ${outcomeData.params[0]} times.`;
    } else if(outcomeData.key === "share_link-add_time-set") {
        actionText = `[Share link] Set share link "Time to add" duration to ${generateTimeString(outcomeData.params[0])}.`;
    } else if(outcomeData.key === "share_link-remove_time-set") {
        actionText = `[Share link] Set share link "Time to remove" duration to ${generateTimeString(outcomeData.params[0])}.`;
    } else if(outcomeData.key === "share_link-logged_in-set") {
        actionText = outcomeData.params[0] === true
            ? `[Share link] Only allow logged-in people to vote on share link visits.`
            : `[Share link] Also allow not logged-in people to vote on share link visits.`;
    }
    // Pillory
    else if(outcomeData.key === "pillory-put") {
        // Should run after any durations being set?
        actionText = `[Pillory] Put the wearer into the pillory.`;
    } if(outcomeData.key === "pillory-duration-set") {
        actionText = `[Pillory] Set pillory add time per vote to ${generateTimeString(outcomeData.params[0])}.`;
    }

    // For safety purposes, don't allow hygiene opening to be changed
    else if(outcomeData.key === "hygiene-unlock") {
        actionText = `[Hygiene Unlock] Temporarily hygiene unlock through keyholder (doesn't affect interval)`;
    }

    // Dice
    else if(outcomeData.key === "dice-regular_actions-set") {
        actionText = `[Dice] Set the dice regular action to mode '${outcomeData.params[0]}'`
            + (outcomeData.params[0] !== "unlimited" ? ` with regularity ${generateTimeString(outcomeData.params[1])}` : "")
            + ".";
    } if(outcomeData.key === "dice-multiplier-set") {
        // Should run after any durations being set?
        actionText = `[Dice] Set the dice time multiplier to ${generateTimeString(outcomeData.params[0])}.`;
    }

    // Don't allow normal wheel of fortune to be modified, only this one

    // Extended Wheel of Fortune
    // TODO maybe add different wheel configs to swap between?
    else if(outcomeData.key === "extended_wof-regular_actions-set") {
        actionText = `[Extended Wheel of Fortune] Set the regular action for the wheel '${outcomeData.params[0]}' to mode '${outcomeData.params[0]}'`
            + (outcomeData.params[1] !== "unlimited" ? ` with regularity ${generateTimeString(outcomeData.params[2])}` : "")
            + ".";
    }

    // Tasks
    else if(outcomeData.key === "tasks-regular_actions-set") {
        actionText = `[Tasks] Set the tasks regular action to mode '${outcomeData.params[0]}'`
            + (outcomeData.params[0] !== "unlimited" ? ` with regularity ${generateTimeString(outcomeData.params[1])}` : "")
            + ".";
    } else if(outcomeData.key === "tasks-task_points-add") {
        actionText = `[Tasks] Increase the task points requirement by ${outcomeData.params[0]}.`;
    } else if(outcomeData.key === "tasks-task_points-remove") {
        actionText = `[Tasks] Decrease the task points requirement by ${outcomeData.params[0]}.`;
    } else if(outcomeData.key === "tasks-task_points-multiply") {
        // Disable can be achieved by multiplying requirement by zero
        actionText = `[Tasks] Multiply the task points requirement by ${outcomeData.params[0]} times.`;
    } else if(outcomeData.key === "tasks-task-add") {
        // Don't allow a task to show up more than once
        actionText = `[Tasks] Add the following task: ${outcomeData.params[0]}`;
    } else if(outcomeData.key === "tasks-task-remove") {
        actionText = `[Tasks] Remove the following task: ${outcomeData.params[0]}`;
    } 

    // Penalties: no penalty API currently

    // Lock actions - freeze, unfreeze, toggle freeze, unlock
    else if(outcomeData.key === "lock-freeze") {
        actionText = `[Lock] Freeze the lock (if unfrozen)`;
    } else if(outcomeData.key === "lock-unfreeze") {
        actionText = `[Lock] Unfreeze the lock (if frozen)`;
    } else if(outcomeData.key === "lock-toggle_freeze") {
        actionText = `[Lock] Toggle freeze on the lock (freeze -> unfreeze, and vice versa)`;
    } else if(outcomeData.key === "lock-unlock") {
        actionText = `[Lock] Fully unlock the lock`;
    }

    return actionText;
}