import type { ChasterCustomConfig_ExtendedWheel_Payload, ChasterCustomData_ExtendedWheel } from "./backend";
import { generateOutcomeActionLabel, generateTimeString } from "./utility";

interface WheelTextData {
    displayText:    string;
    regularityText: string;
    settingsText:   string;
    outcomesText:   string;
}

interface OutcomeTextData {
    flavorText:     string;
    percentageText: string;
    actionsText:    string;
}

const wheelSettingsMap: { [key: string]: string } = {
    "disabled": "Disabled",
    "falsePercentages": "False Percentages",
    "hiddenActions": "Hidden Actions",
    "hiddenOutcomes": "Hidden Outcomes",
};

// Generate regularity text for handlebar
function generateRegularityText(data: { interval: number; mode: "unlimited" | "cumulative" | "non_cumulative" }) {
    if(data.mode === "unlimited") {
        return "∞ Unlimited actions"
    } else {
        let text = data.mode === "non_cumulative"
            ? "⏱️ Non cumulative" : "Cumulative"
        text += ": Next action after";
        text += generateTimeString(data.interval);
        return text;
    }
}

// Generate extremely long handlebar text for extended wheel
export function generateExtendedWheelText(config: ChasterCustomConfig_ExtendedWheel_Payload, customData: ChasterCustomData_ExtendedWheel) {
    const wheelsTextArr: string[] = [];
    for(const [wheelID, wheelData] of Object.entries(config.wheels)) {
        const spins = customData[wheelID];
        const wheelTextData: WheelTextData = {
            displayText: `**Wheel: ${wheelData.display}**`,
            regularityText: generateRegularityText(wheelData.regularity),
            settingsText: "",
            outcomesText: "",
        };
        const settingsTexts: string[] = [];
        for(const [settingKey, settingEnabled] of Object.entries(wheelData.settings)) {
            if(settingKey === "availableSpins") {
                settingsTexts.push(`Count Spins (Available: ${spins})`)
            } else {
                settingsTexts.push(wheelSettingsMap[settingKey]);
            }
        }
        wheelTextData.settingsText = settingsTexts.length > 0
            ? `**Enabled Settings**: ${settingsTexts.join(", ")}`
            : "**Enabled Settings**: None";
        const outcomesTextArr: string[] = [];
        for(const outcomeData of wheelData.outcomes) {
            const outcomeTextData: OutcomeTextData = {
                flavorText: outcomeData.text,
                percentageText: `${outcomeData.percentage}%`,
                actionsText: ""
            }
            if(wheelData.settings["falsePercentages"] === true) {
                outcomeTextData.percentageText += `, True ???%`;
            }

            const actionsTextArr: string[] = [];
            for(const actionData of outcomeData.actions) {
                actionsTextArr.push(generateOutcomeActionLabel(actionData, { ...config, text: "" }));
            }
            outcomeTextData.actionsText = actionsTextArr
                .map(text => `  - ${text}`)
                .join("\n");
            outcomesTextArr.push(`- (${outcomeTextData.percentageText}) ${outcomeTextData.flavorText}\n${outcomeTextData.actionsText}`)
        }
        wheelTextData.outcomesText = outcomesTextArr.join("\n");
        wheelsTextArr.push(`${wheelTextData.displayText}\n${wheelTextData.regularityText}\n${wheelTextData.settingsText}\n${wheelTextData.outcomesText}`);
    }
    return wheelsTextArr.join("\n\n");
}