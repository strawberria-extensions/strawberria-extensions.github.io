import type { ChasterCustomConfig_ExtendedWheel, ExtendedWheelConfig_ActionData } from "./backend";

// Generate random string of specified length
// const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const characterMappings = {
    "all-alphanumeric": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    "upper-alphanumeric": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    "lower-alphanumeric": "abcdefghijklmnopqrstuvwxyz0123456789",
    "all-alpha": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "caps-alpha": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "lower-alpha": "abcdefghijklmnopqrstuvwxyz",
    "numeric": "0123456789",
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

    return finalString;
}

export function truncateWords(input: string, maxLen: number) {
    if(input.length <= maxLen) { return input; }
    return input.substr(0, input.lastIndexOf(" ", maxLen));
}

// Generate outcome action label for extended wheel
export function generateOutcomeActionLabel(actionData: ExtendedWheelConfig_ActionData, data: ChasterCustomConfig_ExtendedWheel) {
    let actionText = "";
    // Time-related
    if(actionData.type === "set_time") {
        actionText = `[Time] Set the remaining time to ${generateTimeString(actionData.params[0])}`;
    } else if(actionData.type === "add_time") {
        actionText = `[Time] Add ${generateTimeString(actionData.params[0])} to the remaining time.`;
    } else if(actionData.type === "remove_time") {
        actionText = `[Time] Remove ${generateTimeString(actionData.params[0])} from the remaining time.`;
    } else if(actionData.type === "multiply_time") {
        actionText = `[Time] Multiply remaining time by ${actionData.params} times.`;
    } 

    // Share link
    else if(actionData.type === "share_link-requirement-set") {
        actionText = `[Share link] Set the share link visit requirement to ${actionData.params[0]}.`;
    } else if(actionData.type === "share_link-requirement-modify") {
        actionText = `[Share link] Modify the share link visit requirement by ${actionData.params[0]}.`;
    } else if(actionData.type === "share_link-requirement-multiply") {
        actionText = `[Share link] Multiply the share link visit requirement by ${actionData.params[0]} times.`;
    } else if(actionData.type === "share_link-add_time-set") {
        actionText = `[Share link] Set share link "Time to add" duration to ${generateTimeString(actionData.params[0])}.`;
    } else if(actionData.type === "share_link-remove_time-set") {
        actionText = `[Share link] Set share link "Time to remove" duration to ${generateTimeString(actionData.params[0])}.`;
    } else if(actionData.type === "share_link-logged_in-set") {
        actionText = actionData.params[0] === true
            ? `[Share link] Only allow logged-in people to vote on share link visits.`
            : `[Share link] Also allow not logged-in people to vote on share link visits.`;
    }
    // Pillory
    else if(actionData.type === "pillory-put") {
        // Should run after any durations being set?
        actionText = `[Pillory] Put the wearer into the pillory.`;
    } if(actionData.type === "pillory-duration-set") {
        actionText = `[Pillory] Set pillory add time per vote to ${generateTimeString(actionData.params[0])}.`;
    }

    // For safety purposes, don't allow hygiene opening to be changed
    else if(actionData.type === "hygiene-unlock") {
        actionText = `[Hygiene Unlock] Temporarily hygiene unlock through keyholder (doesn't affect interval)`;
    }

    // Dice
    else if(actionData.type === "dice-regularity-set") {
        actionText = `[Dice] Set the dice regular action to mode '${actionData.params[0][0]}'`
            + (actionData.params[0][0] !== "unlimited" ? ` with regularity ${generateTimeString(actionData.params[0][1])}` : "")
            + ".";
    } if(actionData.type === "dice-multiplier-set") {
        // Should run after any durations being set?
        actionText = `[Dice] Set the dice time multiplier to ${generateTimeString(actionData.params[0][0])}.`;
    }

    // Don't allow normal wheel of fortune to be modified, only this one

    // Tasks
    else if(actionData.type === "tasks-regularity-set") {
        actionText = `[Tasks] Set the tasks regular action to mode '${actionData.params[0][0]}'`
            + (actionData.params[0][0] !== "unlimited" ? ` with regularity ${generateTimeString(actionData.params[0][1])}` : "")
            + ".";
    } else if(actionData.type === "tasks-task_points-modify") {
        actionText = `[Tasks] Modify the task points requirement by ${actionData.params[0]}.`;
    } else if(actionData.type === "tasks-task_points-multiply") {
        // Disable can be achieved by multiplying requirement by zero
        actionText = `[Tasks] Multiply the task points requirement by ${actionData.params[0]} times.`;
    } else if(actionData.type === "tasks-task-add") {
        // Don't allow a task to show up more than once
        actionText = `[Tasks] Add the following task: ${actionData.params[0]}`;
    } else if(actionData.type === "tasks-task-remove") {
        actionText = `[Tasks] Remove the following task: ${actionData.params[0]}`;
    } 

    // Extended Wheel of Fortune
    // TODO maybe add different wheel configs to swap between?
    else if(actionData.type === "extended_wof-wheel") {
        const wheelName = data.wheels[actionData.params[0]].display;
        actionText = `[Extended Wheel of Fortune] ${actionData.params[1] === true ? "Enable" : "Disable"} the wheel '${wheelName}'`;
    } else if(actionData.type === "extended_wof-mode-settings") {
        const wheelName = data.wheels[actionData.params[0]].display;
        const mapping = {
            "disabled": "Disabled",
            "availableSpins": "Count Spins",
            "falsePercentages": "False Percentages",
            "hiddenActions": "Hidden Actions",
            "hiddenOutcomes": "Hidden Outcomes",
        } as any;
        const settingName = mapping[actionData.params[1]];
        actionText = `[Extended Wheel of Fortune] ${actionData.params[2] === true ? "Enable" : "Disable"} the wheel setting '${settingName}' for the wheel '${wheelName}'`;
    } else if(actionData.type === "extended_wof-regularity-set") {
        const wheelName = data.wheels[actionData.params[0]].display;
        actionText = `[Extended Wheel of Fortune] Set the regular action for the wheel '${wheelName}' to mode '${actionData.params[1][0]}'`
            + (actionData.params[0][1] !== "unlimited" ? ` with regularity ${generateTimeString(actionData.params[1][1])}` : "")
            + ".";
    } else if(actionData.type === "extended_wof-available-set") {
        const wheelName = data.wheels[actionData.params[0]].display;
        actionText = `[Extended Wheel of Fortune] Set the number of available spins to ${actionData.params[1]} for the wheel '${wheelName}'`;
    } else if(actionData.type === "extended_wof-available-modify") {
        const wheelName = data.wheels[actionData.params[0]].display;
        actionText = `[Extended Wheel of Fortune] Modify the number of available spins by ${actionData.params[1]} for the wheel '${wheelName}'`;
    } 

    // Penalties: no penalty API currently

    // Lock actions - freeze, unfreeze, toggle freeze, unlock
    else if(actionData.type === "lock-freeze") {
        actionText = `[Lock] Freeze the lock (if unfrozen)`;
    } else if(actionData.type === "lock-unfreeze") {
        actionText = `[Lock] Unfreeze the lock (if frozen)`;
    } else if(actionData.type === "lock-toggle_freeze") {
        actionText = `[Lock] Toggle freeze on the lock (freeze -> unfreeze, and vice versa)`;
    } else if(actionData.type === "lock-unlock") {
        actionText = `[Lock] Fully unlock the lock`;
    }

    return actionText;
}