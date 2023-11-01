import type { LockEffectData } from "./signature-lock_effects";

export interface ExtendedWheelConfig {
    wheels: { [key: string]: ExtendedWheelConfig_WheelData };
    text:   string;
}
export type ExtendedWheelConfig_Payload = ExtendedWheelConfig;

export interface ExtendedWheelConfig_WheelData {
    display:  string;
    settings: {
        disabled:         boolean;
        availableSpins:   boolean;
        falsePercentages: boolean;
        hiddenEffects:    boolean;
        hiddenOutcomes:   boolean;
        initialSpins:     number;
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
    falsePercentage: string; // Default same?
}

export interface ExtendedWheelCustom {
    [wheelID: string]: {
        availableSpins: number;
        lastActionTime: number;
        lastTrackTime:  number; 
    };
}

/****************************************
 * Extended Wheel Config (User Redacted)
 ***************************************/
 export interface ExtendedWheelConfig_User {
    wheels: { [key: string]: ExtendedWheelConfig_WheelData_User };
}
export interface ExtendedWheelConfig_WheelData_User extends Omit<ExtendedWheelConfig_WheelData, "outcomes"> {
    // outcomes?: ExtendedWheelConfig_OutcomeData_User[];
    outcomes: ExtendedWheelConfig_OutcomeData_User[];
}
export interface ExtendedWheelConfig_OutcomeData_User extends Omit<ExtendedWheelConfig_OutcomeData, "effects" | "percentage" | "falsePercentage"> {
    text:             string;
    effects?:         LockEffectData[];
    percentage:       string;
    // falsePercentage?: string; // Only server side
}