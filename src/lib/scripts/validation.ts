import { get, writable, type Writable } from "svelte/store";
import { type ChasterCustomConfig_ExtendedWheel, type ExtendedWheelConfig_WheelData, type ExtendedWheelConfig_OutcomeData, type ExtendedWheelConfig_ActionData, extendedWheelActionTemplates, extendedWheelDataStore, type ActionTemplateParamData, extendedWheelSpinsStore } from "./backend";

export type ExtendedValidData = [boolean, {
    [key: string]: ExtendedValidData_Wheel;
}];
export type ExtendedValidData_Wheel = [boolean, {
    display:        boolean;
    initialSpins:   boolean;
    remainingSpins: boolean;
    outcomes:       ExtendedValidData_Outcome[];
}];
export type ExtendedValidData_Outcome = [boolean, {
    percentage:      boolean;
    falsePercentage: boolean;
    actions:         ExtendedValidData_Action[];
}];
export type ExtendedValidData_Action = [boolean, boolean[]];
export const extendedValidDataStore: Writable<ExtendedValidData> = writable([false, {}])

const positiveIntRegex = new RegExp(String.raw`^\d+$`);
const positiveDecimalRegex = new RegExp(String.raw`^\d+(\.\d+)?$`);

export function updateValid(extendedWheelData: ChasterCustomConfig_ExtendedWheel) { 
    const updatedValidData = validateWheels(extendedWheelData);
    extendedValidDataStore.set(updatedValidData);
}

// Validate all wheels within the extension
export function validateWheels(extendedWheelsData: ChasterCustomConfig_ExtendedWheel): ExtendedValidData {
    const extendedValidData: ExtendedValidData = [true, {}]
    for(const [wheelID, wheelData] of Object.entries(extendedWheelsData.wheels)) {
        const spinText = get(extendedWheelSpinsStore)[wheelID]
        const updatedWheelValidData = validateWheel(wheelData, spinText);
        extendedValidData[1][wheelID] = updatedWheelValidData;
        if(updatedWheelValidData[0] === false) { extendedValidData[0] = false; }
    }
    return extendedValidData;
}

// Validate wheel within the extension
export function validateWheel(wheelData: ExtendedWheelConfig_WheelData, spinText: string): ExtendedValidData_Wheel {
    const extendedValidWheelData: ExtendedValidData_Wheel = [true, {
        display: true,
        initialSpins: true,
        remainingSpins: true,
        outcomes: [],
    }];
    if(wheelData.display === "") { 
        extendedValidWheelData[0] = false; 
        extendedValidWheelData[1].display = false;
    }
    const invalidInitialSpins = !positiveIntRegex.test(`${wheelData.settings.initialSpins}`);
    if(invalidInitialSpins === true) {
        extendedValidWheelData[0] = false;
        extendedValidWheelData[1].initialSpins = false;
    }
    const invalidRemainingSpins = !positiveIntRegex.test(spinText);
    if(invalidRemainingSpins === true && spinText !== "") {
        extendedValidWheelData[0] = false;
        extendedValidWheelData[1].remainingSpins = false;
    }
    for(const outcomeData of wheelData.outcomes) {
        const updatedOutcomeValidData = validateOutcome(outcomeData, wheelData.settings.falsePercentages);
        extendedValidWheelData[1].outcomes.push(updatedOutcomeValidData);
        if(updatedOutcomeValidData[0] === false) { extendedValidWheelData[0] = false; }
    }
    return extendedValidWheelData;
}

// Validate outcome data within wheel
export function validateOutcome(outcomeData: ExtendedWheelConfig_OutcomeData, falsePercentageEnabled: boolean): ExtendedValidData_Outcome {
    const extendedValidOutcomeData: ExtendedValidData_Outcome = [true, {
        percentage: true,
        falsePercentage: true,
        actions: []
    }];

    const invalidPercentage = !positiveDecimalRegex.test(outcomeData.percentage);
    const parsedPercentage = invalidPercentage
        ? 0 : parseFloat(outcomeData.percentage);
    if(invalidPercentage === true || parsedPercentage < 0 || parsedPercentage > 100) {
        extendedValidOutcomeData[0] = false;
        extendedValidOutcomeData[1].percentage = false;
    } 

    const invalidFalsePercentage = !positiveDecimalRegex.test(outcomeData.falsePercentage);
    const parsedFalsePercentage = invalidFalsePercentage
        ? 0 : parseFloat(outcomeData.falsePercentage);
    if(falsePercentageEnabled && // Only check false percentages if setting is enabled
        (invalidFalsePercentage === true || parsedFalsePercentage < 0 || parsedFalsePercentage > 100)) {
            extendedValidOutcomeData[0] = false;
            extendedValidOutcomeData[1].falsePercentage = false;
    }

    for(const actionData of outcomeData.actions) {
        const updatedValidActionData = validateAction(actionData);
        extendedValidOutcomeData[1].actions.push(updatedValidActionData);
        if(updatedValidActionData[0] === false) { extendedValidOutcomeData[0] = false; }
    }

    return extendedValidOutcomeData;
}

// Validate action data within outcome
export function validateAction(actionData: ExtendedWheelConfig_ActionData): ExtendedValidData_Action {
    const extendedValidActionData: ExtendedValidData_Action = [true, []];
    const actionTemplateData = extendedWheelActionTemplates[actionData.type];
    for(const paramIndex in actionData.params) {
        const paramData = actionData.params[paramIndex];
        const paramTemplateData = actionTemplateData.params[paramIndex];
        const updatedParamValid = validateParam(paramData, paramTemplateData);
        extendedValidActionData[1].push(updatedParamValid);
        if(updatedParamValid === false) { extendedValidActionData[0] = false; }
    }
    return extendedValidActionData;
}

// Validate param data within action
export function validateParam(paramData: any, paramTemplateData: ActionTemplateParamData): boolean {
    let valid = true;
    if(paramTemplateData.regex !== undefined) {
        const testRegex = paramTemplateData.regex;
        const paramValid = testRegex.test(paramData);
        if(paramValid === false) { valid = false; }
    } 
    if(paramTemplateData.type === "text") {
        const maxLength = paramTemplateData.params["limit"] ?? Math.max;
        if(paramData.length > maxLength) { valid = false; }
    } else if(paramTemplateData.type === "select_wheel") {
        if(!paramData) { valid = false; }
        const extendedWheelData = get(extendedWheelDataStore);
        if(extendedWheelData.wheels[paramData] === undefined) {
            valid = false;
        }
    }
    return valid;
}