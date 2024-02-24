import type { LockEffectData } from "./signature-lock_effects.ts";

export interface ExtendedWheelConfig {
    wheels: { [key: string]: ExtendedWheelConfig_WheelData };
}
export type ExtendedWheelConfig_Payload = ExtendedWheelConfig;

export interface ExtendedWheelConfig_WheelData {
    display:  string;
    settings: {
        disabled:          boolean;
        hiddenPercentages: boolean;
        hiddenOutcomes:    boolean;
        hiddenEffects:     boolean;
    }
    regularity:  {
        interval: number; // Seconds, or remaining spins
        mode:     "unlimited" | "cumulative" | "non_cumulative";
    }
    outcomes: ExtendedWheelConfig_OutcomeData[];
}
export interface ExtendedWheelConfig_OutcomeData_Result {
    text:    string;
    effects: LockEffectData[];
}
export interface ExtendedWheelConfig_OutcomeData extends ExtendedWheelConfig_OutcomeData_Result {
    percentage:      string;
}

export interface ExtendedWheelCustom {
    wheels: { [wheelID: string]: 
        {
            lastActionTimeMS: number;
        };
    }
}
/****************************************
 * Extended Wheel Config (User Redacted)
 ***************************************/
export interface ExtendedWheelConfig_User {
    wheels: { [key: string]: ExtendedWheelConfig_WheelData_User };
}
export interface ExtendedWheelConfig_WheelData_User extends Omit<ExtendedWheelConfig_WheelData, "outcomes"> {
    outcomes: ExtendedWheelConfig_OutcomeData_User[];
}
export interface ExtendedWheelConfig_OutcomeData_User extends Omit<ExtendedWheelConfig_OutcomeData, "effects" | "percentage" | "falsePercentage"> {
    text:             string;
    effects:          LockEffectData[];
    percentage:       string;
}