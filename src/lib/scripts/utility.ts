import type { ChasterExtendedWheelData } from "./backend";

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

// Generate outcome action text for extended wheel
export function generateOutcomeActionText(outcomeData: ChasterExtendedWheelData) {
    let actionText = "";
    if(outcomeData.key === "add_time") {
        actionText = `Add ${generateTimeString(outcomeData.params[0])} to the session time.`
    } else if(outcomeData.key === "remove_time") {
        actionText = `Remove ${generateTimeString(outcomeData.params[0])} from the session time.`
    }

    return actionText;
}